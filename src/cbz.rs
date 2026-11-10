//! Fumetti CBZ: uno ZIP di immagini, una per pagina, in ordine di nome.
//!
//! Il file non viene convertito. All'importazione leggiamo i metadati (da `ComicInfo.xml`, lo
//! standard di ComicRack, se c'è), contiamo le pagine e prendiamo la prima come copertina.
//! Durante la lettura il server consegna una pagina alla volta, così anche un fumetto da
//! centinaia di MB si apre subito, pure sul telefono.

use crate::isbn::find_isbn;
use std::cmp::Ordering;
use std::fs::File;
use std::io::{BufReader, Read};
use std::path::Path;
use zip::ZipArchive;

const MAX_PAGE_BYTES: u64 = 80 * 1024 * 1024;
const IMAGE_EXTENSIONS: [&str; 6] = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];

#[derive(Debug, Default)]
pub struct CbzInfo {
    pub title: Option<String>,
    pub author: Option<String>,
    pub description: Option<String>,
    pub isbn: Option<String>,
    pub cover: Option<Vec<u8>>,
    pub page_count: usize,
}

type Archive = ZipArchive<BufReader<File>>;

fn open(path: &Path) -> Result<Archive, String> {
    let file = File::open(path).map_err(|e| e.to_string())?;
    ZipArchive::new(BufReader::new(file)).map_err(|e| format!("ZIP non valido: {e}"))
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

/// Le pagine: le immagini dello ZIP in ordine naturale, senza file nascosti né cartelle di sistema.
pub fn page_names(zip: &Archive) -> Vec<String> {
    let mut pages: Vec<String> = zip
        .file_names()
        .filter(|name| {
            let lower = name.to_lowercase();
            let file = lower.rsplit('/').next().unwrap_or(&lower);
            !lower.ends_with('/')
                && !lower.starts_with("__macosx/")
                && !lower.contains("/__macosx/")
                && !file.starts_with('.')
                && file.rsplit_once('.').is_some_and(|(_, ext)| IMAGE_EXTENSIONS.contains(&ext))
        })
        .map(str::to_string)
        .collect();
    pages.sort_by(|a, b| natural_cmp(a, b));
    pages
}

fn read_entry(zip: &mut Archive, name: &str) -> Option<Vec<u8>> {
    let entry = zip.by_name(name).ok()?;
    if entry.size() > MAX_PAGE_BYTES {
        return None;
    }
    let mut out = Vec::with_capacity(entry.size() as usize);
    entry.take(MAX_PAGE_BYTES).read_to_end(&mut out).ok()?;
    Some(out)
}

pub fn read_cbz(path: &Path) -> Result<CbzInfo, String> {
    let mut zip = open(path)?;
    let pages = page_names(&zip);
    if pages.is_empty() {
        return Err("nessuna immagine nel CBZ".into());
    }
    let mut info = CbzInfo { page_count: pages.len(), ..Default::default() };
    info.cover = read_entry(&mut zip, &pages[0]);

    let comic_info = zip.file_names().find(|n| n.to_lowercase().rsplit('/').next() == Some("comicinfo.xml")).map(str::to_string);
    if let Some(xml) = comic_info.and_then(|name| read_entry(&mut zip, &name)) {
        let xml = String::from_utf8_lossy(&xml).into_owned();
        if let Ok(doc) = roxmltree::Document::parse(xml.trim_start_matches('\u{feff}')) {
            let field = |tag: &str| {
                doc.descendants()
                    .find(|n| n.has_tag_name(tag))
                    .and_then(|n| n.text())
                    .map(|t| t.trim().to_string())
                    .filter(|t| !t.is_empty())
            };
            let series = field("Series").map(|s| match field("Number") {
                Some(n) => format!("{s} #{n}"),
                None => s,
            });
            info.title = match (series, field("Title")) {
                (Some(series), Some(title)) if !series.to_lowercase().contains(&title.to_lowercase()) => {
                    Some(format!("{series}: {title}"))
                }
                (Some(series), _) => Some(series),
                (None, title) => title,
            };
            info.author = field("Writer").or_else(|| field("Penciller"));
            info.description = field("Summary");
            info.isbn = field("GTIN").and_then(|g| find_isbn(&g));
        }
    }
    Ok(info)
}

/// Numero di pagine di un CBZ già in libreria.
pub fn page_count(path: &Path) -> Result<usize, String> {
    Ok(page_names(&open(path)?).len())
}

/// Una pagina (da 0) con il suo tipo MIME.
pub fn read_page(path: &Path, index: usize) -> Result<Option<(Vec<u8>, &'static str)>, String> {
    let mut zip = open(path)?;
    let pages = page_names(&zip);
    let Some(name) = pages.get(index) else { return Ok(None) };
    let mime = match name.rsplit('.').next().map(str::to_lowercase).as_deref() {
        Some("png") => "image/png",
        Some("gif") => "image/gif",
        Some("webp") => "image/webp",
        Some("bmp") => "image/bmp",
        _ => "image/jpeg",
    };
    Ok(read_entry(&mut zip, name).map(|bytes| (bytes, mime)))
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
