//! Strumenti condivisi dai test di integrazione: un server KoreShelf vero su una cartella
//! temporanea, richieste HTTP grezze ed ebook sintetici (EPUB e PDF) generati al volo.
#![allow(dead_code)]

use serde_json::Value;
use std::io::{Cursor, Read, Write};
use std::net::TcpStream;
use std::path::PathBuf;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::time::{Duration, SystemTime, UNIX_EPOCH};

// ------------------------------------------------------------------ server e HTTP

pub struct Library {
    pub dir: PathBuf,
    pub url: String,
}

impl Library {
    pub fn new(name: &str) -> Self {
        static COUNTER: AtomicUsize = AtomicUsize::new(0);
        let nanos = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_nanos();
        let n = COUNTER.fetch_add(1, Ordering::SeqCst);
        let dir = std::env::temp_dir().join(format!("koreshelf-import-{name}-{nanos}-{n}"));
        std::fs::create_dir_all(&dir).unwrap();
        let url = koreshelf::start_embedded(dir.clone(), 0).expect("il server deve partire");
        Library { dir, url }
    }

    pub fn addr(&self) -> String {
        self.url.trim_start_matches("http://").trim_end_matches('/').to_string()
    }

    /// Richiesta HTTP grezza: restituisce (stato, intestazioni, corpo).
    pub fn request(&self, method: &str, path: &str, headers: &str, body: &[u8]) -> (u16, String, Vec<u8>) {
        let addr = self.addr();
        let mut stream = TcpStream::connect(&addr).expect("connessione al server");
        stream.set_read_timeout(Some(Duration::from_secs(30))).unwrap();
        let head = format!(
            "{method} {path} HTTP/1.1\r\nHost: {addr}\r\n{headers}Content-Length: {}\r\nConnection: close\r\n\r\n",
            body.len()
        );
        stream.write_all(head.as_bytes()).unwrap();
        stream.write_all(body).unwrap();
        let mut raw = Vec::new();
        stream.read_to_end(&mut raw).unwrap();
        let split = raw.windows(4).position(|w| w == b"\r\n\r\n").expect("risposta HTTP valida");
        let head = String::from_utf8_lossy(&raw[..split]).to_string();
        let status = head.split_whitespace().nth(1).unwrap().parse().unwrap();
        (status, head, raw[split + 4..].to_vec())
    }

    pub fn get(&self, path: &str) -> (u16, String, Vec<u8>) {
        self.request("GET", path, "", b"")
    }

    pub fn json(&self, method: &str, path: &str) -> (u16, Value) {
        let (status, _, body) = self.request(method, path, "", b"");
        (status, serde_json::from_slice(&body).unwrap_or(Value::Null))
    }

    /// Caricamento come lo fa l'interfaccia: campo "ebook" con il file, "offline=1".
    pub fn upload(&self, file_name: &str, bytes: &[u8]) -> (u16, Value) {
        let boundary = "----KoreShelfTestBoundary7MA4YWxkTrZu0gW";
        let mut body = Vec::new();
        write!(body, "--{boundary}\r\nContent-Disposition: form-data; name=\"offline\"\r\n\r\n1\r\n").unwrap();
        write!(
            body,
            "--{boundary}\r\nContent-Disposition: form-data; name=\"ebook\"; filename=\"{file_name}\"\r\n\
             Content-Type: application/octet-stream\r\n\r\n"
        )
        .unwrap();
        body.extend_from_slice(bytes);
        write!(body, "\r\n--{boundary}--\r\n").unwrap();
        let headers = format!("Content-Type: multipart/form-data; boundary={boundary}\r\n");
        let (status, _, response) = self.request("POST", "/api/upload", &headers, &body);
        let value = serde_json::from_slice(&response)
            .unwrap_or_else(|_| panic!("risposta non JSON: {}", String::from_utf8_lossy(&response)));
        (status, value)
    }

    /// Richiesta con corpo JSON: restituisce (stato, risposta JSON).
    pub fn send_json(&self, method: &str, path: &str, body: &Value) -> (u16, Value) {
        let raw = serde_json::to_vec(body).unwrap();
        let (status, _, response) =
            self.request(method, path, "Content-Type: application/json\r\n", &raw);
        (status, serde_json::from_slice(&response).unwrap_or(Value::Null))
    }

    /// Modulo multipart generico: campi di testo e, facoltativo, un file (campo, nome, byte).
    pub fn multipart(&self, path: &str, fields: &[(&str, &str)], file: Option<(&str, &str, &[u8])>) -> (u16, Value) {
        let boundary = "----KoreShelfTestBoundaryForms0123456789";
        let mut body = Vec::new();
        for (name, value) in fields {
            write!(body, "--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"\r\n\r\n{value}\r\n").unwrap();
        }
        if let Some((field, file_name, bytes)) = file {
            write!(
                body,
                "--{boundary}\r\nContent-Disposition: form-data; name=\"{field}\"; filename=\"{file_name}\"\r\n\
                 Content-Type: application/octet-stream\r\n\r\n"
            )
            .unwrap();
            body.extend_from_slice(bytes);
            body.extend_from_slice(b"\r\n");
        }
        write!(body, "--{boundary}--\r\n").unwrap();
        let headers = format!("Content-Type: multipart/form-data; boundary={boundary}\r\n");
        let (status, _, response) = self.request("POST", path, &headers, &body);
        (status, serde_json::from_slice(&response).unwrap_or(Value::Null))
    }

    /// Un libro dalla libreria, per id.
    pub fn book(&self, id: &str) -> Value {
        self.books()
            .into_iter()
            .find(|b| b["id"] == id)
            .unwrap_or_else(|| panic!("libro {id} non trovato nella libreria"))
    }

    /// Importa un ebook e restituisce il libro creato.
    pub fn import(&self, file_name: &str, bytes: &[u8]) -> Value {
        let (status, res) = self.upload(file_name, bytes);
        assert_eq!(status, 200, "{file_name}: {res}");
        book_of(&res).clone()
    }

    pub fn books(&self) -> Vec<Value> {
        let (status, value) = self.json("GET", "/api/books");
        assert_eq!(status, 200);
        value.as_array().cloned().unwrap_or_default()
    }

    pub fn files_in(&self, sub: &str) -> Vec<String> {
        let mut names: Vec<String> = std::fs::read_dir(self.dir.join(sub))
            .map(|rd| rd.filter_map(|e| e.ok()).map(|e| e.file_name().to_string_lossy().into_owned()).collect())
            .unwrap_or_default();
        names.sort();
        names
    }

    /// Dopo ogni caricamento, riuscito o no, la cartella dei file temporanei resta vuota.
    pub fn assert_no_leftover_uploads(&self) {
        let left = self.files_in("uploads");
        assert!(left.is_empty(), "file temporanei rimasti in uploads/: {left:?}");
    }
}

impl Drop for Library {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.dir);
    }
}

// ------------------------------------------------------------------ file sintetici

pub fn jpeg(width: u32, height: u32, rgb: [u8; 3]) -> Vec<u8> {
    let img = image::RgbImage::from_pixel(width, height, image::Rgb(rgb));
    let mut out = Cursor::new(Vec::new());
    image::DynamicImage::ImageRgb8(img).write_to(&mut out, image::ImageFormat::Jpeg).unwrap();
    out.into_inner()
}

pub struct EpubSpec<'a> {
    pub title: Option<&'a str>,
    pub author: Option<&'a str>,
    pub description: Option<&'a str>,
    pub isbn: Option<&'a str>,
    pub cover: bool,
    pub chapters: usize,
}

impl Default for EpubSpec<'_> {
    fn default() -> Self {
        EpubSpec {
            title: Some("Il Giardino dei Test"),
            author: Some("Ada Collaudo"),
            description: Some("Una trama abbastanza lunga da essere considerata valida dal server di KoreShelf."),
            isbn: None,
            cover: true,
            chapters: 3,
        }
    }
}

pub fn make_epub(spec: &EpubSpec) -> Vec<u8> {
    use zip::write::SimpleFileOptions;
    let mut zip = zip::ZipWriter::new(Cursor::new(Vec::new()));
    let stored = SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
    let deflated = SimpleFileOptions::default().compression_method(zip::CompressionMethod::Deflated);

    zip.start_file("mimetype", stored).unwrap();
    zip.write_all(b"application/epub+zip").unwrap();
    zip.start_file("META-INF/container.xml", deflated).unwrap();
    zip.write_all(
        br#"<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>"#,
    )
    .unwrap();

    let mut meta = String::new();
    if let Some(t) = spec.title {
        meta += &format!("<dc:title>{t}</dc:title>");
    }
    if let Some(a) = spec.author {
        meta += &format!("<dc:creator>{a}</dc:creator>");
    }
    if let Some(d) = spec.description {
        meta += &format!("<dc:description>{d}</dc:description>");
    }
    if let Some(i) = spec.isbn {
        meta += &format!("<dc:identifier opf:scheme=\"ISBN\">{i}</dc:identifier>");
    }
    let mut manifest = String::new();
    let mut spine = String::new();
    if spec.cover {
        meta += r#"<meta name="cover" content="cov"/>"#;
        manifest += r#"<item id="cov" href="cover.jpg" media-type="image/jpeg"/>"#;
    }
    for i in 1..=spec.chapters {
        manifest += &format!(r#"<item id="c{i}" href="c{i}.xhtml" media-type="application/xhtml+xml"/>"#);
        spine += &format!(r#"<itemref idref="c{i}"/>"#);
    }
    let opf = format!(
        r#"<?xml version="1.0"?><package xmlns="http://www.idpf.org/2007/opf" xmlns:opf="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/">{meta}</metadata><manifest>{manifest}</manifest><spine>{spine}</spine></package>"#
    );
    zip.start_file("OEBPS/content.opf", deflated).unwrap();
    zip.write_all(opf.as_bytes()).unwrap();
    if spec.cover {
        zip.start_file("OEBPS/cover.jpg", stored).unwrap();
        zip.write_all(&jpeg(600, 900, [40, 90, 160])).unwrap();
    }
    for i in 1..=spec.chapters {
        zip.start_file(format!("OEBPS/c{i}.xhtml"), deflated).unwrap();
        let text = "Testo di prova per contare le pagine. ".repeat(400);
        write!(
            zip,
            r#"<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Capitolo {i}</title></head><body><h1>Capitolo {i}</h1><p>{text}</p></body></html>"#
        )
        .unwrap();
    }
    zip.finish().unwrap().into_inner()
}

pub fn make_pdf(title: Option<&str>, author: Option<&str>, pages: usize, page_text: &str) -> Vec<u8> {
    use lopdf::content::{Content, Operation};
    use lopdf::{dictionary, Document, Object, Stream};

    let mut doc = Document::with_version("1.5");
    let pages_id = doc.new_object_id();
    let font_id = doc.add_object(dictionary! {
        "Type" => "Font", "Subtype" => "Type1", "BaseFont" => "Helvetica",
    });
    let resources_id = doc.add_object(dictionary! { "Font" => dictionary! { "F1" => font_id } });
    let mut kids = Vec::new();
    for n in 1..=pages {
        let content = Content {
            operations: vec![
                Operation::new("BT", vec![]),
                Operation::new("Tf", vec!["F1".into(), 14.into()]),
                Operation::new("Td", vec![72.into(), 720.into()]),
                Operation::new("Tj", vec![Object::string_literal(format!("Pagina {n}. {page_text}"))]),
                Operation::new("ET", vec![]),
            ],
        };
        let content_id = doc.add_object(Stream::new(dictionary! {}, content.encode().unwrap()));
        let page_id = doc.add_object(dictionary! {
            "Type" => "Page", "Parent" => pages_id, "Contents" => content_id,
        });
        kids.push(page_id.into());
    }
    doc.objects.insert(
        pages_id,
        Object::Dictionary(dictionary! {
            "Type" => "Pages", "Kids" => kids, "Count" => pages as i64,
            "Resources" => resources_id, "MediaBox" => vec![0.into(), 0.into(), 595.into(), 842.into()],
        }),
    );
    let catalog_id = doc.add_object(dictionary! { "Type" => "Catalog", "Pages" => pages_id });
    doc.trailer.set("Root", catalog_id);
    let mut info = lopdf::Dictionary::new();
    if let Some(t) = title {
        info.set("Title", Object::string_literal(t));
    }
    if let Some(a) = author {
        info.set("Author", Object::string_literal(a));
    }
    let info_id = doc.add_object(info);
    doc.trailer.set("Info", info_id);
    let mut out = Vec::new();
    doc.save_to(&mut out).unwrap();
    out
}

pub fn book_of(response: &Value) -> &Value {
    assert_eq!(response["success"], true, "caricamento riuscito: {response}");
    &response["book"]
}

pub fn str_field<'a>(book: &'a Value, key: &str) -> &'a str {
    book[key].as_str().unwrap_or_else(|| panic!("campo {key} mancante in {book}"))
}


pub fn temp_file(name: &str, bytes: &[u8]) -> PathBuf {
    let nanos = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_nanos();
    let path = std::env::temp_dir().join(format!("koreshelf-parser-{nanos}-{name}"));
    std::fs::write(&path, bytes).unwrap();
    path
}

// ------------------------------------------------------------------ nuovi formati

/// Base64 standard, per le immagini dentro gli FB2.
pub fn base64(bytes: &[u8]) -> String {
    const ABC: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut out = String::new();
    for chunk in bytes.chunks(3) {
        let n = chunk.iter().fold(0u32, |acc, &b| acc << 8 | b as u32) << (8 * (3 - chunk.len()));
        for i in 0..4 {
            out.push(if i <= chunk.len() { ABC[(n >> (18 - 6 * i) & 63) as usize] as char } else { '=' });
        }
    }
    out
}

/// Un FB2 con due capitoli, una nota, una copertina e (facoltativo) un ISBN.
pub fn make_fb2(title: &str, author: (&str, &str), isbn: Option<&str>) -> String {
    let cover = base64(&jpeg(300, 450, [20, 120, 60]));
    let isbn = isbn.map(|i| format!("<publish-info><isbn>{i}</isbn></publish-info>")).unwrap_or_default();
    format!(
        r##"<?xml version="1.0" encoding="UTF-8"?>
<FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:l="http://www.w3.org/1999/xlink">
 <description>
  <title-info>
   <genre>sf</genre>
   <author><first-name>{}</first-name><last-name>{}</last-name></author>
   <book-title>{title}</book-title>
   <annotation><p>Una trama in FB2 abbastanza lunga da essere tenuta dal server.</p><p>Seconda riga.</p></annotation>
   <lang>it</lang>
   <coverpage><image l:href="#cover.jpg"/></coverpage>
  </title-info>
  {isbn}
 </description>
 <body>
  <title><p>{title}</p></title>
  <section><title><p>Capitolo primo</p></title>
   <p>Il <emphasis>primo</emphasis> paragrafo<a l:href="#n1" type="note">1</a>.</p>
   <empty-line/>
   <poem><stanza><v>Verso uno</v><v>Verso due</v></stanza></poem>
  </section>
  <section><title><p>Capitolo secondo</p></title><p>{}</p></section>
 </body>
 <body name="notes"><title><p>Note</p></title><section id="n1"><title><p>1</p></title><p>Testo della nota.</p></section></body>
 <binary id="cover.jpg" content-type="image/jpeg">{cover}</binary>
</FictionBook>"##,
        author.0,
        author.1,
        "Testo del secondo capitolo. ".repeat(200)
    )
}

/// Uno ZIP con i file indicati: (nome, contenuto).
pub fn make_zip(entries: &[(&str, &[u8])]) -> Vec<u8> {
    use zip::write::SimpleFileOptions;
    let mut zip = zip::ZipWriter::new(Cursor::new(Vec::new()));
    for (name, bytes) in entries {
        zip.start_file(*name, SimpleFileOptions::default()).unwrap();
        zip.write_all(bytes).unwrap();
    }
    zip.finish().unwrap().into_inner()
}

/// Un fumetto: `pages` immagini di colori diversi (nomi scelti per provare l'ordine naturale)
/// e, se indicato, un ComicInfo.xml.
pub fn make_cbz(pages: usize, comic_info: Option<&str>) -> Vec<u8> {
    let images: Vec<(String, Vec<u8>)> = (1..=pages)
        .map(|n| (format!("pagine/p{n}.jpg"), jpeg(200, 300, [(n * 20 % 255) as u8, 10, 200])))
        .collect();
    let mut entries: Vec<(&str, &[u8])> = images.iter().rev().map(|(n, b)| (n.as_str(), b.as_slice())).collect();
    entries.push(("__MACOSX/pagine/._p1.jpg", b"risorsa macOS, non una pagina"));
    if let Some(xml) = comic_info {
        entries.push(("ComicInfo.xml", xml.as_bytes()));
    }
    make_zip(&entries)
}
