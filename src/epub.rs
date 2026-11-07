//! Lettura dei metadati di un EPUB: titolo, autore, trama, ISBN, copertina
//! e stima della lunghezza del testo (per calcolare il numero di pagine).

use crate::isbn::find_isbn;
use crate::text::{html_to_plain, js_length, strip_tags};
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, Read};
use std::path::Path;
use zip::ZipArchive;

const MAX_CHAPTERS_TO_READ: usize = 50;
const MAX_ENTRY_BYTES: u64 = 40 * 1024 * 1024;

#[derive(Debug, Default)]
pub struct EpubInfo {
    pub title: Option<String>,
    pub author: Option<String>,
    pub description: Option<String>,
    pub isbn: Option<String>,
    pub cover: Option<Vec<u8>>,
    pub text_length: usize,
}

struct ManifestItem {
    href: String,
    media_type: String,
    properties: String,
}

type Archive = ZipArchive<BufReader<File>>;

pub fn read_epub(path: &Path) -> Result<EpubInfo, String> {
    let file = File::open(path).map_err(|e| e.to_string())?;
    let mut zip = ZipArchive::new(BufReader::new(file)).map_err(|e| format!("ZIP non valido: {e}"))?;

    let opf_path = find_opf_path(&mut zip).ok_or("File OPF non trovato")?;
    let opf_raw = read_text(&mut zip, &opf_path).ok_or("Impossibile leggere l'OPF")?;
    let opf_xml = parse_xml_lenient(&opf_raw)?;
    let doc = roxmltree::Document::parse_with_options(
        &opf_xml,
        roxmltree::ParsingOptions { allow_dtd: true, ..Default::default() },
    )
    .map_err(|e| format!("OPF non valido: {e}"))?;

    let opf_dir = match opf_path.rfind('/') {
        Some(idx) => opf_path[..=idx].to_string(),
        None => String::new(),
    };

    // --- Metadati ---
    let mut info = EpubInfo::default();
    let mut identifiers: Vec<(bool, String)> = Vec::new();
    let mut cover_id: Option<String> = None;

    for node in doc.descendants().filter(|n| n.is_element()) {
        let name = node.tag_name().name();
        match name {
            "title" if info.title.is_none() => info.title = non_empty(node_text(&node)),
            "creator" if info.author.is_none() => info.author = non_empty(node_text(&node)),
            "description" if info.description.is_none() => {
                info.description = non_empty(html_to_plain(&node_text(&node)))
            }
            "identifier" => {
                let is_isbn_scheme = node
                    .attributes()
                    .any(|a| a.name() == "scheme" && a.value().eq_ignore_ascii_case("isbn"));
                identifiers.push((is_isbn_scheme, node_text(&node)));
            }
            "meta" if node.attribute("name") == Some("cover") => {
                cover_id = node.attribute("content").map(str::to_string);
            }
            _ => {}
        }
    }

    // --- Manifest e ordine di lettura (spine) ---
    let mut manifest: HashMap<String, ManifestItem> = HashMap::new();
    let mut manifest_order: Vec<String> = Vec::new();
    for node in doc.descendants().filter(|n| n.has_tag_name("item")) {
        if let (Some(id), Some(href)) = (node.attribute("id"), node.attribute("href")) {
            manifest_order.push(id.to_string());
            manifest.insert(
                id.to_string(),
                ManifestItem {
                    href: resolve_href(&opf_dir, href),
                    media_type: node.attribute("media-type").unwrap_or("").to_lowercase(),
                    properties: node.attribute("properties").unwrap_or("").to_lowercase(),
                },
            );
        }
    }
    let spine: Vec<&ManifestItem> = doc
        .descendants()
        .filter(|n| n.has_tag_name("itemref"))
        .filter_map(|n| n.attribute("idref"))
        .filter_map(|id| manifest.get(id))
        .filter(|item| item.media_type.contains("html") || item.media_type.contains("xml"))
        .collect();

    // --- Lunghezza del testo (primi 50 capitoli, poi stima) ---
    let mut total_len = 0usize;
    let mut chapters_read = 0usize;
    let mut first_chapters_text = String::new();
    for item in spine.iter().take(MAX_CHAPTERS_TO_READ) {
        if let Some(html) = read_text(&mut zip, &item.href) {
            let text = strip_tags(body_of(&html));
            let trimmed = text.trim();
            total_len += js_length(trimmed);
            chapters_read += 1;
            if chapters_read <= 5 {
                first_chapters_text.push_str(trimmed);
                first_chapters_text.push('\n');
            }
        }
    }
    if spine.len() > MAX_CHAPTERS_TO_READ && chapters_read > 0 {
        total_len = total_len / chapters_read * spine.len();
    }
    info.text_length = total_len;

    // --- ISBN: prima i metadati, poi le prime pagine ---
    identifiers.sort_by_key(|(is_isbn, _)| !*is_isbn);
    info.isbn = identifiers
        .iter()
        .find_map(|(_, value)| find_isbn(value))
        .or_else(|| find_isbn(&first_chapters_text));

    // --- Copertina ---
    let cover_href = find_cover_href(&mut zip, &manifest, &manifest_order, cover_id.as_deref());
    if let Some(href) = cover_href {
        info.cover = read_bytes(&mut zip, &href);
    }

    Ok(info)
}

fn non_empty(s: String) -> Option<String> {
    let trimmed = s.trim();
    if trimmed.is_empty() {
        None
    } else {
        Some(trimmed.to_string())
    }
}

fn node_text(node: &roxmltree::Node) -> String {
    node.descendants()
        .filter(|n| n.is_text())
        .filter_map(|n| n.text())
        .collect::<Vec<_>>()
        .join("")
}

fn body_of(html: &str) -> &str {
    let lower = html.to_ascii_lowercase();
    let start = lower.find("<body").unwrap_or(0);
    let end = lower.rfind("</body>").filter(|&e| e > start).unwrap_or(html.len());
    &html[start..end]
}

/// Alcuni OPF contengono entità HTML (es. `&nbsp;`) che non sono XML valido:
/// le sostituiamo con l'equivalente numerico prima del parsing.
fn parse_xml_lenient(xml: &str) -> Result<String, String> {
    if roxmltree::Document::parse_with_options(
        xml,
        roxmltree::ParsingOptions { allow_dtd: true, ..Default::default() },
    )
    .is_ok()
    {
        return Ok(xml.to_string());
    }
    let re = regex::Regex::new(r"&([a-zA-Z][a-zA-Z0-9]*);").unwrap();
    Ok(re
        .replace_all(xml, |caps: &regex::Captures| match &caps[1] {
            "amp" | "lt" | "gt" | "quot" | "apos" => caps[0].to_string(),
            _ => "&#160;".to_string(),
        })
        .into_owned())
}

fn find_opf_path(zip: &mut Archive) -> Option<String> {
    if let Some(container) = read_text(zip, "META-INF/container.xml") {
        if let Ok(doc) = roxmltree::Document::parse(&container) {
            if let Some(path) = doc
                .descendants()
                .find(|n| n.has_tag_name("rootfile"))
                .and_then(|n| n.attribute("full-path"))
            {
                return Some(path.to_string());
            }
        }
    }
    zip.file_names()
        .find(|name| name.to_lowercase().ends_with(".opf"))
        .map(str::to_string)
}

/// Risolve un href relativo all'OPF (gestendo `../`, `%20` e i frammenti `#`).
fn resolve_href(base_dir: &str, href: &str) -> String {
    let href = href.split('#').next().unwrap_or(href);
    let decoded = percent_encoding::percent_decode_str(href).decode_utf8_lossy().into_owned();
    let joined = if decoded.starts_with('/') {
        decoded.trim_start_matches('/').to_string()
    } else {
        format!("{base_dir}{decoded}")
    };
    let mut parts: Vec<&str> = Vec::new();
    for segment in joined.split('/') {
        match segment {
            "" | "." => {}
            ".." => {
                parts.pop();
            }
            s => parts.push(s),
        }
    }
    parts.join("/")
}

fn entry_index(zip: &Archive, wanted: &str) -> Option<usize> {
    if let Some(idx) = zip.index_for_name(wanted) {
        return Some(idx);
    }
    // Alcuni EPUB hanno maiuscole/minuscole o codifiche diverse nei nomi.
    let wanted_norm = wanted.to_lowercase();
    zip.file_names()
        .find(|name| {
            let decoded = percent_encoding::percent_decode_str(name).decode_utf8_lossy();
            decoded.to_lowercase() == wanted_norm
        })
        .and_then(|name| zip.index_for_name(&name.to_string()))
}

fn read_bytes(zip: &mut Archive, name: &str) -> Option<Vec<u8>> {
    let idx = entry_index(zip, name)?;
    let entry = zip.by_index(idx).ok()?;
    if entry.size() > MAX_ENTRY_BYTES {
        return None;
    }
    let mut buf = Vec::with_capacity(entry.size() as usize);
    entry.take(MAX_ENTRY_BYTES).read_to_end(&mut buf).ok()?;
    Some(buf)
}

fn read_text(zip: &mut Archive, name: &str) -> Option<String> {
    let bytes = read_bytes(zip, name)?;
    Some(String::from_utf8_lossy(&bytes).into_owned())
}

fn find_cover_href(
    zip: &mut Archive,
    manifest: &HashMap<String, ManifestItem>,
    order: &[String],
    cover_id: Option<&str>,
) -> Option<String> {
    let is_image = |item: &ManifestItem| item.media_type.starts_with("image/") && !item.media_type.contains("svg");

    // 1. <meta name="cover" content="id"> (EPUB 2)
    if let Some(item) = cover_id.and_then(|id| manifest.get(id)) {
        if is_image(item) {
            return Some(item.href.clone());
        }
        if item.media_type.contains("html") {
            if let Some(img) = first_image_in_page(zip, &item.href) {
                return Some(img);
            }
        }
    }
    // 2. properties="cover-image" (EPUB 3)
    if let Some(item) = manifest.values().find(|i| i.properties.contains("cover-image") && is_image(i)) {
        return Some(item.href.clone());
    }
    // 3. Un'immagine che si chiama "cover"
    order
        .iter()
        .filter_map(|id| manifest.get(id).map(|item| (id, item)))
        .find(|(id, item)| {
            is_image(item)
                && (id.to_lowercase().contains("cover") || item.href.to_lowercase().contains("cover"))
        })
        .map(|(_, item)| item.href.clone())
}

fn first_image_in_page(zip: &mut Archive, page_href: &str) -> Option<String> {
    let html = read_text(zip, page_href)?;
    let re = regex::Regex::new(r#"(?i)(?:src|xlink:href|href)\s*=\s*["']([^"']+\.(?:jpe?g|png|gif|webp))["']"#).unwrap();
    let src = re.captures(&html)?.get(1)?.as_str().to_string();
    let dir = match page_href.rfind('/') {
        Some(idx) => &page_href[..=idx],
        None => "",
    };
    Some(resolve_href(dir, &src))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hrefs() {
        assert_eq!(resolve_href("OEBPS/", "../images/c%20over.jpg#x"), "images/c over.jpg");
        assert_eq!(resolve_href("", "text/ch1.xhtml"), "text/ch1.xhtml");
    }
}
