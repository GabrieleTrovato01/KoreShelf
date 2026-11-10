//! Fumetti: CBZ (ZIP), CBR (RAR) e CB7 (7z), anche protetti da password.
//!
//! Il tipo vero si riconosce dal contenuto, non dall'estensione: molti `.cbr` sono in realtà
//! ZIP e viceversa. All'importazione:
//! * un archivio RAR o 7z **senza password** viene trasformato in CBZ (le pagine si leggono
//!   poi una alla volta, senza dover decomprimere tutto: con i RAR "solidi" sarebbe lento);
//! * un archivio **con password** resta com'è, cifrato. Quando si apre, il lettore manda la
//!   password e le pagine vengono decifrate in memoria (per RAR e 7z tutte insieme la prima
//!   volta, poi restano in una piccola cache); non finiscono mai in chiaro sul disco.

use crate::isbn::find_isbn;
use crate::protection::OpenError;
use std::cmp::Ordering;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, Cursor, Read, Write};
use std::path::{Path, PathBuf};
use std::sync::Mutex;

const MAX_PAGE_BYTES: u64 = 80 * 1024 * 1024;
const IMAGE_EXTENSIONS: [&str; 6] = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];
/// Fumetti cifrati RAR/7z tenuti in memoria dopo la prima apertura
const CACHE_LIMIT_BYTES: usize = 300 * 1024 * 1024;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Kind {
    Zip,
    Rar,
    SevenZ,
}

impl Kind {
    /// Estensione con cui un fumetto di questo tipo viene salvato in libreria.
    pub fn extension(self) -> &'static str {
        match self {
            Kind::Zip => "cbz",
            Kind::Rar => "cbr",
            Kind::SevenZ => "cb7",
        }
    }
}

/// Il tipo di archivio dai primi byte.
pub fn sniff(head: &[u8]) -> Option<Kind> {
    if head.starts_with(b"PK") {
        Some(Kind::Zip)
    } else if head.starts_with(b"Rar!\x1a\x07") {
        Some(Kind::Rar)
    } else if head.starts_with(&[0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C]) {
        Some(Kind::SevenZ)
    } else {
        None
    }
}

pub fn kind_of(path: &Path) -> Result<Kind, OpenError> {
    let mut head = [0u8; 8];
    let n = File::open(path).and_then(|mut f| f.read(&mut head)).map_err(|e| OpenError::Other(e.to_string()))?;
    sniff(&head[..n]).ok_or_else(|| OpenError::Other("non è un archivio ZIP, RAR o 7z".into()))
}

#[derive(Debug, Default)]
pub struct ComicInfo {
    pub title: Option<String>,
    pub author: Option<String>,
    pub description: Option<String>,
    pub isbn: Option<String>,
    pub cover: Option<Vec<u8>>,
    /// `None` se i nomi dei file sono cifrati e non si possono contare senza password
    pub page_count: Option<usize>,
    pub encrypted: bool,
}

/// Confronto "naturale": `pag2.jpg` viene prima di `pag10.jpg`.
pub fn natural_cmp(a: &str, b: &str) -> Ordering {
    let (mut a, mut b) = (a.chars().peekable(), b.chars().peekable());
    loop {
        match (a.peek().copied(), b.peek().copied()) {
            (None, None) => return Ordering::Equal,
            (None, Some(_)) => return Ordering::Less,
            (Some(_), None) => return Ordering::Greater,
            (Some(x), Some(y)) if x.is_ascii_digit() && y.is_ascii_digit() => {
                let take = |it: &mut std::iter::Peekable<std::str::Chars>| {
                    let mut digits = String::new();
                    while let Some(c) = it.peek().copied().filter(char::is_ascii_digit) {
                        digits.push(c);
                        it.next();
                    }
                    digits
                };
                let (da, db) = (take(&mut a), take(&mut b));
                let (ta, tb) = (da.trim_start_matches('0'), db.trim_start_matches('0'));
                let order = ta.len().cmp(&tb.len()).then_with(|| ta.cmp(tb)).then_with(|| da.len().cmp(&db.len()));
                if order != Ordering::Equal {
                    return order;
                }
            }
            (Some(x), Some(y)) => {
                let order = x.to_lowercase().cmp(y.to_lowercase());
                if order != Ordering::Equal {
                    return order;
                }
                a.next();
                b.next();
            }
        }
    }
}

fn is_page(name: &str) -> bool {
    let lower = name.to_lowercase().replace('\\', "/");
    let file = lower.rsplit('/').next().unwrap_or(&lower);
    !lower.ends_with('/')
        && !lower.starts_with("__macosx/")
        && !lower.contains("/__macosx/")
        && !file.starts_with('.')
        && file.rsplit_once('.').is_some_and(|(_, ext)| IMAGE_EXTENSIONS.contains(&ext))
}

fn is_comic_info(name: &str) -> bool {
    name.to_lowercase().replace('\\', "/").rsplit('/').next() == Some("comicinfo.xml")
}

fn sorted_pages(names: impl Iterator<Item = String>) -> Vec<String> {
    let mut pages: Vec<String> = names.filter(|n| is_page(n)).collect();
    pages.sort_by(|a, b| natural_cmp(a, b));
    pages.dedup();
    pages
}

fn mime_of(name: &str) -> &'static str {
    match name.rsplit('.').next().map(str::to_lowercase).as_deref() {
        Some("png") => "image/png",
        Some("gif") => "image/gif",
        Some("webp") => "image/webp",
        Some("bmp") => "image/bmp",
        _ => "image/jpeg",
    }
}

// ------------------------------------------------------------------ ZIP

type Zip = zip::ZipArchive<BufReader<File>>;

fn open_zip(path: &Path) -> Result<Zip, OpenError> {
    let file = File::open(path).map_err(|e| OpenError::Other(e.to_string()))?;
    zip::ZipArchive::new(BufReader::new(file)).map_err(|e| OpenError::Other(format!("ZIP non valido: {e}")))
}

fn zip_is_encrypted(zip: &mut Zip) -> bool {
    (0..zip.len()).any(|i| zip.by_index_raw(i).map(|f| f.encrypted()).unwrap_or(false))
}

fn zip_read(zip: &mut Zip, name: &str, password: Option<&str>) -> Result<Vec<u8>, OpenError> {
    let encrypted = zip.index_for_name(name).and_then(|i| zip.by_index_raw(i).ok().map(|f| f.encrypted())).unwrap_or(false);
    let entry = match (encrypted, password) {
        (false, _) => zip.by_name(name).map_err(|e| OpenError::Other(e.to_string()))?,
        (true, None) => return Err(OpenError::NeedsPassword),
        (true, Some(pw)) => zip.by_name_decrypt(name, pw.as_bytes()).map_err(|e| match e {
            zip::result::ZipError::InvalidPassword => OpenError::WrongPassword,
            other => OpenError::Other(other.to_string()),
        })?,
    };
    if entry.size() > MAX_PAGE_BYTES {
        return Err(OpenError::Other("pagina troppo grande".into()));
    }
    let mut out = Vec::new();
    // ZipCrypto lascia passare 1 password sbagliata su 256: lo si scopre dal CRC in fondo
    entry.take(MAX_PAGE_BYTES).read_to_end(&mut out).map_err(|_| if encrypted { OpenError::WrongPassword } else { OpenError::Other("pagina danneggiata".into()) })?;
    Ok(out)
}

// ------------------------------------------------------------------ RAR

fn rar_error(e: unrar::error::UnrarError) -> OpenError {
    use unrar::error::Code;
    match e.code {
        Code::MissingPassword => OpenError::NeedsPassword,
        Code::BadPassword => OpenError::WrongPassword,
        _ => OpenError::Other(format!("RAR: {e}")),
    }
}

fn rar_archive<'a>(path: &'a Path, password: Option<&'a str>) -> unrar::Archive<'a> {
    match password {
        Some(pw) => unrar::Archive::with_password(path, pw.as_bytes()),
        None => unrar::Archive::new(path),
    }
}

/// Nomi dei file e se il contenuto è cifrato.
fn rar_list(path: &Path, password: Option<&str>) -> Result<(Vec<String>, bool), OpenError> {
    let listing = rar_archive(path, password).open_for_listing().map_err(rar_error)?;
    let mut names = Vec::new();
    let mut encrypted = false;
    for entry in listing {
        let entry = entry.map_err(rar_error)?;
        encrypted |= entry.is_encrypted();
        if entry.is_file() {
            names.push(entry.filename.to_string_lossy().replace('\\', "/"));
        }
    }
    Ok((names, encrypted))
}

/// Estrae i file scelti da `wanted` in un solo passaggio (gli archivi RAR si leggono in ordine).
fn rar_extract(path: &Path, password: Option<&str>, wanted: &dyn Fn(&str) -> bool) -> Result<HashMap<String, Vec<u8>>, OpenError> {
    let mut archive = rar_archive(path, password).open_for_processing().map_err(rar_error)?;
    let mut out = HashMap::new();
    let mut total = 0usize;
    while let Some(header) = archive.read_header().map_err(rar_error)? {
        let name = header.entry().filename.to_string_lossy().replace('\\', "/");
        let take = header.entry().is_file() && wanted(&name) && header.entry().unpacked_size <= MAX_PAGE_BYTES;
        archive = if take {
            let (data, next) = header.read().map_err(rar_error)?;
            total += data.len();
            if total > CACHE_LIMIT_BYTES {
                return Err(OpenError::Other("fumetto troppo grande".into()));
            }
            out.insert(name, data);
            next
        } else {
            header.skip().map_err(rar_error)?
        };
    }
    Ok(out)
}

// ------------------------------------------------------------------ 7z

fn seven_password(password: Option<&str>) -> sevenz_rust2::Password {
    password.map(sevenz_rust2::Password::from).unwrap_or_else(sevenz_rust2::Password::empty)
}

fn seven_error(e: sevenz_rust2::Error) -> OpenError {
    match e {
        sevenz_rust2::Error::PasswordRequired => OpenError::NeedsPassword,
        sevenz_rust2::Error::MaybeBadPassword(_) => OpenError::WrongPassword,
        other => {
            let text = other.to_string();
            if text.to_lowercase().contains("password") { OpenError::WrongPassword } else { OpenError::Other(format!("7z: {text}")) }
        }
    }
}

fn seven_reader(path: &Path, password: Option<&str>) -> Result<sevenz_rust2::ArchiveReader<File>, OpenError> {
    sevenz_rust2::ArchiveReader::open(path, seven_password(password)).map_err(|e| match (e, password) {
        // Con i nomi cifrati e una password sbagliata l'indice non si decodifica
        (sevenz_rust2::Error::PasswordRequired, _) => OpenError::NeedsPassword,
        (_, Some(_)) => OpenError::WrongPassword,
        (other, None) => seven_error(other),
    })
}

fn seven_extract(path: &Path, password: Option<&str>, wanted: &dyn Fn(&str) -> bool) -> Result<HashMap<String, Vec<u8>>, OpenError> {
    let mut reader = seven_reader(path, password)?;
    let mut out = HashMap::new();
    let mut total = 0usize;
    let mut failure: Option<OpenError> = None;
    let result = reader.for_each_entries(|entry, data| {
        let name = entry.name().replace('\\', "/");
        if entry.is_directory() || !entry.has_stream() || !wanted(&name) {
            std::io::copy(data, &mut std::io::sink())?;
            return Ok(true);
        }
        let mut bytes = Vec::new();
        data.take(MAX_PAGE_BYTES).read_to_end(&mut bytes)?;
        total += bytes.len();
        if total > CACHE_LIMIT_BYTES {
            failure = Some(OpenError::Other("fumetto troppo grande".into()));
            return Ok(false);
        }
        out.insert(name, bytes);
        Ok(true)
    });
    if let Some(f) = failure {
        return Err(f);
    }
    result.map_err(|e| if password.is_some() { OpenError::WrongPassword } else { seven_error(e) })?;
    Ok(out)
}

fn seven_is_encrypted(path: &Path) -> Result<bool, OpenError> {
    match seven_reader(path, None) {
        Err(OpenError::NeedsPassword) => Ok(true),
        Err(e) => Err(e),
        Ok(mut reader) => {
            // Contenuto cifrato con nomi in chiaro: lo si scopre provando a leggere il primo file
            let first = reader.archive().files.iter().find(|f| f.has_stream() && !f.is_directory()).map(|f| f.name().to_string());
            match first {
                None => Ok(false),
                Some(name) => match reader.read_file(&name) {
                    Ok(_) => Ok(false),
                    Err(sevenz_rust2::Error::PasswordRequired) => Ok(true),
                    Err(sevenz_rust2::Error::MaybeBadPassword(_)) => Ok(true),
                    Err(e) => Err(seven_error(e)),
                },
            }
        }
    }
}

// ------------------------------------------------------------------ comuni

/// Le pagine, in ordine.
pub fn page_names(path: &Path, password: Option<&str>) -> Result<Vec<String>, OpenError> {
    match kind_of(path)? {
        Kind::Zip => {
            let zip = open_zip(path)?;
            Ok(sorted_pages(zip.file_names().map(str::to_string)))
        }
        Kind::Rar => Ok(sorted_pages(rar_list(path, password)?.0.into_iter())),
        Kind::SevenZ => {
            let reader = seven_reader(path, password)?;
            Ok(sorted_pages(reader.archive().files.iter().filter(|f| f.has_stream() && !f.is_directory()).map(|f| f.name().replace('\\', "/"))))
        }
    }
}

/// Il fumetto è protetto da password?
pub fn is_encrypted(path: &Path) -> Result<bool, OpenError> {
    match kind_of(path)? {
        Kind::Zip => Ok(zip_is_encrypted(&mut open_zip(path)?)),
        Kind::Rar => match rar_list(path, None) {
            Ok((_, encrypted)) => Ok(encrypted),
            Err(OpenError::NeedsPassword) => Ok(true),
            Err(e) => Err(e),
        },
        Kind::SevenZ => seven_is_encrypted(path),
    }
}

fn parse_comic_info(xml: &[u8], info: &mut ComicInfo) {
    let xml = String::from_utf8_lossy(xml).into_owned();
    let Ok(doc) = roxmltree::Document::parse(xml.trim_start_matches('\u{feff}')) else { return };
    let field = |tag: &str| {
        doc.descendants().find(|n| n.has_tag_name(tag)).and_then(|n| n.text()).map(|t| t.trim().to_string()).filter(|t| !t.is_empty())
    };
    let series = field("Series").map(|s| match field("Number") {
        Some(n) => format!("{s} #{n}"),
        None => s,
    });
    info.title = match (series, field("Title")) {
        (Some(series), Some(title)) if !series.to_lowercase().contains(&title.to_lowercase()) => Some(format!("{series}: {title}")),
        (Some(series), _) => Some(series),
        (None, title) => title,
    };
    info.author = field("Writer").or_else(|| field("Penciller"));
    info.description = field("Summary");
    info.isbn = field("GTIN").and_then(|g| find_isbn(&g));
}

/// Metadati, copertina e numero di pagine per l'importazione. Un fumetto protetto viene
/// importato senza copertina (la crea il lettore alla prima apertura) e, se anche i nomi
/// sono cifrati, senza sapere quante pagine ha.
pub fn read_comic(path: &Path) -> Result<ComicInfo, OpenError> {
    let encrypted = is_encrypted(path)?;
    let mut info = ComicInfo { encrypted, ..Default::default() };
    if encrypted {
        info.page_count = page_names(path, None).ok().map(|p| p.len()).filter(|&n| n > 0);
        return Ok(info);
    }
    let pages = page_names(path, None)?;
    if pages.is_empty() {
        return Err(OpenError::Other("nessuna immagine nel fumetto".into()));
    }
    info.page_count = Some(pages.len());
    let first = pages[0].clone();
    let wanted = |n: &str| n == first || is_comic_info(n);
    let mut files = match kind_of(path)? {
        Kind::Zip => {
            let mut zip = open_zip(path)?;
            let mut out = HashMap::new();
            let names: Vec<String> = zip.file_names().filter(|n| wanted(n)).map(str::to_string).collect();
            for name in names {
                if let Ok(bytes) = zip_read(&mut zip, &name, None) {
                    out.insert(name, bytes);
                }
            }
            out
        }
        Kind::Rar => rar_extract(path, None, &wanted)?,
        Kind::SevenZ => seven_extract(path, None, &wanted)?,
    };
    info.cover = files.remove(&first);
    if let Some(xml) = files.iter().find(|(n, _)| is_comic_info(n)).map(|(_, x)| x.clone()) {
        parse_comic_info(&xml, &mut info);
    }
    Ok(info)
}

/// Un RAR o 7z senza password diventa un CBZ (pagine e ComicInfo.xml, senza ricomprimere le immagini).
pub fn convert_to_cbz(path: &Path) -> Result<Vec<u8>, OpenError> {
    let wanted = |n: &str| is_page(n) || is_comic_info(n);
    let files = match kind_of(path)? {
        Kind::Rar => rar_extract(path, None, &wanted)?,
        Kind::SevenZ => seven_extract(path, None, &wanted)?,
        Kind::Zip => return Err(OpenError::Other("è già uno ZIP".into())),
    };
    let mut names: Vec<&String> = files.keys().collect();
    names.sort_by(|a, b| natural_cmp(a, b));
    let mut zip = zip::ZipWriter::new(Cursor::new(Vec::new()));
    let stored = zip::write::SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
    for name in names {
        zip.start_file(name.as_str(), stored).map_err(|e| OpenError::Other(e.to_string()))?;
        zip.write_all(&files[name]).map_err(|e| OpenError::Other(e.to_string()))?;
    }
    zip.finish().map(Cursor::into_inner).map_err(|e| OpenError::Other(e.to_string()))
}

/// Pagine già decifrate dei fumetti RAR/7z protetti: (file, impronta della password) → pagine.
type CacheKey = (PathBuf, Vec<u8>);
static CACHE: Mutex<Vec<(CacheKey, HashMap<String, Vec<u8>>)>> = Mutex::new(Vec::new());

fn password_fingerprint(password: Option<&str>) -> Vec<u8> {
    use sha2::Digest;
    sha2::Sha256::digest(password.unwrap_or("").as_bytes()).to_vec()
}

/// Una pagina (da 0) con il suo tipo MIME. `Ok(None)` se la pagina non esiste.
pub fn read_page(path: &Path, index: usize, password: Option<&str>) -> Result<Option<(Vec<u8>, &'static str)>, OpenError> {
    let kind = kind_of(path)?;
    if kind == Kind::Zip {
        let mut zip = open_zip(path)?;
        let pages = sorted_pages(zip.file_names().map(str::to_string));
        let Some(name) = pages.get(index).cloned() else { return Ok(None) };
        return zip_read(&mut zip, &name, password).map(|b| Some((b, mime_of(&name))));
    }
    let key = (path.to_path_buf(), password_fingerprint(password));
    {
        let cache = CACHE.lock().unwrap_or_else(|e| e.into_inner());
        if let Some((_, files)) = cache.iter().find(|(k, _)| *k == key) {
            let pages = sorted_pages(files.keys().cloned());
            return Ok(pages.get(index).map(|n| (files[n].clone(), mime_of(n))));
        }
    }
    let files = match kind {
        Kind::Rar => rar_extract(path, password, &|n| is_page(n))?,
        _ => seven_extract(path, password, &|n| is_page(n))?,
    };
    let pages = sorted_pages(files.keys().cloned());
    let page = pages.get(index).map(|n| (files[n].clone(), mime_of(n)));
    let mut cache = CACHE.lock().unwrap_or_else(|e| e.into_inner());
    cache.retain(|(k, _)| k.0 != key.0);
    cache.insert(0, (key, files));
    // Al massimo due fumetti protetti in memoria
    cache.truncate(2);
    Ok(page)
}

/// Dimentica le pagine decifrate di un file (per esempio quando il libro viene eliminato).
pub fn forget(path: &Path) {
    CACHE.lock().unwrap_or_else(|e| e.into_inner()).retain(|(k, _)| k.0 != path);
}

#[cfg(test)]
mod tests {
    use super::natural_cmp;
    use std::cmp::Ordering::*;

    #[test]
    fn natural_order() {
        assert_eq!(natural_cmp("p2.jpg", "p10.jpg"), Less);
        assert_eq!(natural_cmp("Cap 1/010.png", "Cap 1/9.png"), Greater);
        assert_eq!(natural_cmp("a.jpg", "B.jpg"), Less);
        let mut v = vec!["10.jpg", "1.jpg", "02.jpg", "cover.jpg"];
        v.sort_by(|a, b| natural_cmp(a, b));
        assert_eq!(v, ["1.jpg", "02.jpg", "10.jpg", "cover.jpg"]);
    }
}
