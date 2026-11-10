//! Costruzione di un EPUB 3 (con indice anche in formato NCX per i lettori più vecchi).
//!
//! FB2, TXT e Markdown vengono convertiti in EPUB al momento dell'importazione: così il
//! lettore (epub.js), le sottolineature, la ricerca e la stima delle pagine funzionano per
//! tutti senza codice in più.

use std::io::{Cursor, Write};
use zip::write::SimpleFileOptions;
use zip::{CompressionMethod, ZipWriter};

/// Un'immagine dentro il libro (copertina o illustrazione).
pub struct Image {
    /// Nome del file dentro `OEBPS/images/` (già ripulito, vedi [`safe_file_name`]).
    pub name: String,
    pub media_type: String,
    pub bytes: Vec<u8>,
}

pub struct Chapter {
    pub title: String,
    /// Contenuto del `<body>`, XHTML valido (testo già con l'escape di [`escape`]).
    pub body: String,
}

#[derive(Default)]
pub struct Book {
    pub title: String,
    pub author: Option<String>,
    pub description: Option<String>,
    pub language: Option<String>,
    pub isbn: Option<String>,
    /// Indice in `images` dell'immagine di copertina.
    pub cover: Option<usize>,
    pub images: Vec<Image>,
    pub chapters: Vec<Chapter>,
}

/// Escape per testo e attributi XML.
pub fn escape(text: &str) -> String {
    let mut out = String::with_capacity(text.len());
    for c in text.chars() {
        match c {
            '&' => out.push_str("&amp;"),
            '<' => out.push_str("&lt;"),
            '>' => out.push_str("&gt;"),
            '"' => out.push_str("&quot;"),
            '\'' => out.push_str("&#39;"),
            // Caratteri di controllo non ammessi in XML 1.0
            c if (c as u32) < 0x20 && !matches!(c, '\n' | '\r' | '\t') => {}
            c => out.push(c),
        }
    }
    out
}

/// Nome di file sicuro per lo ZIP: solo lettere, cifre, `-`, `_` e `.`.
pub fn safe_file_name(name: &str) -> String {
    let cleaned: String = name
        .chars()
        .map(|c| if c.is_ascii_alphanumeric() || matches!(c, '-' | '_' | '.') { c } else { '_' })
        .collect();
    let trimmed = cleaned.trim_start_matches('.');
    if trimmed.is_empty() { "img".to_string() } else { trimmed.to_string() }
}

/// Tipo MIME di un'immagine dai suoi primi byte (gli FB2 a volte lo dichiarano sbagliato).
pub fn sniff_image_type(bytes: &[u8]) -> Option<&'static str> {
    if bytes.starts_with(&[0xFF, 0xD8, 0xFF]) {
        Some("image/jpeg")
    } else if bytes.starts_with(b"\x89PNG") {
        Some("image/png")
    } else if bytes.starts_with(b"GIF8") {
        Some("image/gif")
    } else if bytes.len() > 12 && &bytes[..4] == b"RIFF" && &bytes[8..12] == b"WEBP" {
        Some("image/webp")
    } else if bytes.starts_with(b"BM") {
        Some("image/bmp")
    } else {
        None
    }
}

fn page(title: &str, lang: &str, body: &str) -> String {
    format!(
        "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!DOCTYPE html>\n\
         <html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:epub=\"http://www.idpf.org/2007/ops\" xml:lang=\"{lang}\" lang=\"{lang}\">\n\
         <head><meta charset=\"utf-8\"/><title>{}</title><link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\"/></head>\n\
         <body>\n{body}\n</body>\n</html>\n",
        escape(title)
    )
}

const STYLE: &str = "body { line-height: 1.5; }\n\
    h1, h2, h3, h4 { text-align: center; margin: 1.2em 0 0.8em; }\n\
    p { margin: 0 0 0.6em; text-align: justify; }\n\
    .ks-text p { text-indent: 1.2em; }\n\
    blockquote, .epigraph, .cite { margin: 1em 2em; font-style: italic; }\n\
    .poem { margin: 1em 2em; } .poem p { text-indent: 0; text-align: left; margin: 0; }\n\
    .stanza { margin-bottom: 1em; } .text-author { text-align: right; font-style: italic; }\n\
    .subtitle { text-align: center; font-weight: bold; }\n\
    img { max-width: 100%; height: auto; } .ks-image { text-align: center; margin: 1em 0; }\n\
    pre { white-space: pre-wrap; } code { font-family: monospace; }\n\
    table { border-collapse: collapse; } td, th { border: 1px solid #999; padding: 0.2em 0.5em; }\n\
    .ks-cover { text-align: center; margin: 0; padding: 0; } .ks-cover img { max-height: 95vh; }\n";

impl Book {
    pub fn to_epub(&self) -> Result<Vec<u8>, String> {
        let lang = self.language.as_deref().filter(|l| !l.trim().is_empty()).unwrap_or("und").trim().to_string();
        let lang = escape(&lang);
        let mut zip = ZipWriter::new(Cursor::new(Vec::new()));
        let stored = SimpleFileOptions::default().compression_method(CompressionMethod::Stored);
        let deflated = SimpleFileOptions::default().compression_method(CompressionMethod::Deflated);
        let err = |e: &dyn std::fmt::Display| format!("scrittura EPUB: {e}");

        // Il mimetype deve essere il primo file, non compresso
        zip.start_file("mimetype", stored).map_err(|e| err(&e))?;
        zip.write_all(b"application/epub+zip").map_err(|e| err(&e))?;
        zip.start_file("META-INF/container.xml", deflated).map_err(|e| err(&e))?;
        zip.write_all(
            br#"<?xml version="1.0" encoding="utf-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>"#,
        )
        .map_err(|e| err(&e))?;

        let mut manifest = String::from(
            r#"<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/><item id="css" href="style.css" media-type="text/css"/>"#,
        );
        let mut spine = String::new();
        let mut files: Vec<(String, Vec<u8>)> = vec![("OEBPS/style.css".into(), STYLE.as_bytes().to_vec())];

        for (i, image) in self.images.iter().enumerate() {
            let props = if self.cover == Some(i) { r#" properties="cover-image""# } else { "" };
            manifest += &format!(
                r#"<item id="img{i}" href="images/{}" media-type="{}"{props}/>"#,
                escape(&image.name),
                escape(&image.media_type)
            );
        }

        // Pagina di copertina, prima di tutto il resto
        if let Some(cover) = self.cover.and_then(|i| self.images.get(i)) {
            let body = format!(r#"<div class="ks-cover"><img src="images/{}" alt="{}"/></div>"#, escape(&cover.name), escape(&self.title));
            files.push(("OEBPS/cover.xhtml".into(), page(&self.title, &lang, &body).into_bytes()));
            manifest += r#"<item id="coverpage" href="cover.xhtml" media-type="application/xhtml+xml"/>"#;
            spine += r#"<itemref idref="coverpage" linear="no"/>"#;
        }

        let chapters: Vec<&Chapter> = self.chapters.iter().collect();
        let mut nav_items = String::new();
        let mut ncx_points = String::new();
        for (i, chapter) in chapters.iter().enumerate() {
            let n = i + 1;
            files.push((format!("OEBPS/ch{n}.xhtml"), page(&chapter.title, &lang, &chapter.body).into_bytes()));
            manifest += &format!(r#"<item id="ch{n}" href="ch{n}.xhtml" media-type="application/xhtml+xml"/>"#);
            spine += &format!(r#"<itemref idref="ch{n}"/>"#);
            let label = escape(&chapter.title);
            nav_items += &format!(r#"<li><a href="ch{n}.xhtml">{label}</a></li>"#);
            ncx_points += &format!(
                r#"<navPoint id="np{n}" playOrder="{n}"><navLabel><text>{label}</text></navLabel><content src="ch{n}.xhtml"/></navPoint>"#
            );
        }

        let nav_body = format!(r#"<nav epub:type="toc" id="toc"><ol>{nav_items}</ol></nav>"#);
        files.push(("OEBPS/nav.xhtml".into(), page(&self.title, &lang, &nav_body).into_bytes()));
        let title = escape(&self.title);
        files.push((
            "OEBPS/toc.ncx".into(),
            format!(
                r#"<?xml version="1.0" encoding="utf-8"?><ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="koreshelf"/></head><docTitle><text>{title}</text></docTitle><navMap>{ncx_points}</navMap></ncx>"#
            )
            .into_bytes(),
        ));

        let mut metadata = format!(
            r#"<dc:identifier id="uid">urn:koreshelf:{}</dc:identifier><dc:title>{title}</dc:title><dc:language>{lang}</dc:language><meta property="dcterms:modified">2000-01-01T00:00:00Z</meta>"#,
            fnv_hash(&self.title, chapters.len())
        );
        if let Some(author) = self.author.as_deref().filter(|a| !a.trim().is_empty()) {
            metadata += &format!("<dc:creator>{}</dc:creator>", escape(author.trim()));
        }
        if let Some(description) = self.description.as_deref().filter(|d| !d.trim().is_empty()) {
            metadata += &format!("<dc:description>{}</dc:description>", escape(description.trim()));
        }
        if let Some(isbn) = self.isbn.as_deref().filter(|i| !i.trim().is_empty()) {
            metadata += &format!("<dc:identifier>urn:isbn:{}</dc:identifier>", escape(isbn.trim()));
        }
        if self.cover.is_some() {
            metadata += &format!(r#"<meta name="cover" content="img{}"/>"#, self.cover.unwrap_or(0));
        }
        let opf = format!(
            r#"<?xml version="1.0" encoding="utf-8"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid" xml:lang="{lang}"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/">{metadata}</metadata><manifest>{manifest}</manifest><spine toc="ncx">{spine}</spine></package>"#
        );
        files.push(("OEBPS/content.opf".into(), opf.into_bytes()));

        for (name, bytes) in files {
            zip.start_file(name, deflated).map_err(|e| err(&e))?;
            zip.write_all(&bytes).map_err(|e| err(&e))?;
        }
        for image in &self.images {
            // Le immagini sono già compresse: niente deflate
            zip.start_file(format!("OEBPS/images/{}", image.name), stored).map_err(|e| err(&e))?;
            zip.write_all(&image.bytes).map_err(|e| err(&e))?;
        }
        zip.finish().map(Cursor::into_inner).map_err(|e| err(&e))
    }
}

/// Identificatore stabile del libro (lo stesso file convertito due volte dà lo stesso id).
fn fnv_hash(title: &str, chapters: usize) -> String {
    let mut hash: u64 = 0xcbf29ce484222325;
    for byte in title.bytes().chain(chapters.to_le_bytes()) {
        hash ^= byte as u64;
        hash = hash.wrapping_mul(0x100000001b3);
    }
    format!("{hash:016x}")
}

/// Testo semplice → paragrafi XHTML (righe vuote = nuovo paragrafo).
pub fn paragraphs_html(text: &str) -> String {
    let mut out = String::new();
    for para in split_paragraphs(text) {
        out += "<p>";
        out += &escape(&para);
        out += "</p>\n";
    }
    out
}

/// Spezza un testo in paragrafi. Se il testo non ha righe vuote (un a capo per paragrafo,
/// tipico dei TXT), ogni riga è un paragrafo; altrimenti le righe di un blocco si uniscono.
pub fn split_paragraphs(text: &str) -> Vec<String> {
    let lines: Vec<&str> = text.lines().collect();
    let has_blank_lines = lines.windows(2).any(|w| !w[0].trim().is_empty() && w[1].trim().is_empty());
    let mut out = Vec::new();
    if has_blank_lines {
        let mut current: Vec<&str> = Vec::new();
        for line in lines.iter().chain(std::iter::once(&"")) {
            if line.trim().is_empty() {
                if !current.is_empty() {
                    out.push(current.iter().map(|l| l.trim()).collect::<Vec<_>>().join(" "));
                    current.clear();
                }
            } else {
                current.push(line);
            }
        }
    } else {
        out.extend(lines.iter().map(|l| l.trim()).filter(|l| !l.is_empty()).map(str::to_string));
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn escaping_and_file_names() {
        assert_eq!(escape("a<b & \"c\"\u{1}"), "a&lt;b &amp; &quot;c&quot;");
        assert_eq!(safe_file_name("../cover image?.jpg"), "_cover_image_.jpg");
    }

    #[test]
    fn paragraphs_by_blank_lines_or_by_line() {
        assert_eq!(split_paragraphs("riga uno\nancora uno\n\nriga due\n"), vec!["riga uno ancora uno", "riga due"]);
        assert_eq!(split_paragraphs("uno\ndue\n  \n"), vec!["uno due"]);
        assert_eq!(split_paragraphs("uno\ndue\ntre"), vec!["uno", "due", "tre"]);
    }
}
