//! Lettura dei metadati di un PDF: titolo, autore, numero di pagine e ISBN.

use crate::isbn::find_isbn;
use crate::text::js_length;
use lopdf::Document;
use std::path::Path;

const PAGES_FOR_ISBN: u32 = 10;

#[derive(Debug, Default)]
pub struct PdfInfo {
    pub title: Option<String>,
    pub author: Option<String>,
    pub page_count: Option<i64>,
    pub isbn: Option<String>,
    pub text_length: usize,
}

pub fn read_pdf(path: &Path) -> Result<PdfInfo, String> {
    // Lettura veloce: solo il dizionario Info e il numero di pagine.
    let meta = Document::load_metadata(path).map_err(|e| format!("PDF non leggibile: {e}"))?;

    let clean = |s: Option<String>| {
        s.map(|v| v.trim_matches(|c: char| c.is_whitespace() || c == '\0').to_string())
            .filter(|v| !v.is_empty())
    };
    let mut info = PdfInfo {
        title: clean(meta.title.clone()),
        author: clean(meta.author.clone()),
        page_count: (meta.page_count > 0).then_some(meta.page_count as i64),
        ..Default::default()
    };

    // ISBN dai metadati...
    let meta_text = [&meta.title, &meta.author, &meta.subject, &meta.keywords]
        .iter()
        .filter_map(|v| v.as_deref())
        .collect::<Vec<_>>()
        .join(" ");
    info.isbn = find_isbn(&meta_text);

    // ...oppure dal testo delle prime pagine (copyright, frontespizio).
    if info.isbn.is_none() || info.page_count.is_none() {
        if let Ok(doc) = Document::load(path) {
            let pages: Vec<u32> = doc.get_pages().keys().copied().take(PAGES_FOR_ISBN as usize).collect();
            if info.page_count.is_none() {
                let total = doc.get_pages().len();
                info.page_count = (total > 0).then_some(total as i64);
            }
            let text: String = doc
                .extract_text_chunks(&pages)
                .into_iter()
                .filter_map(Result::ok)
                .collect::<Vec<_>>()
                .join("\n");
            info.text_length = js_length(&text);
            if info.isbn.is_none() {
                info.isbn = find_isbn(&text);
            }
        }
    }
    Ok(info)
}
