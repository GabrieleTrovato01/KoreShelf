//! FictionBook (FB2, FB2.ZIP / FBZ) → EPUB.
//!
//! Dai metadati (`title-info`) prendiamo titolo, autori, trama, lingua e copertina, l'ISBN da
//! `publish-info`. Ogni `<section>` di primo livello diventa un capitolo; le note (il `<body>`
//! con `name="notes"`) diventano un capitolo finale raggiungibile dai rimandi nel testo.
//! Le immagini (`<binary>` in base64) finiscono nell'EPUB.

use crate::epub_writer::{escape, safe_file_name, sniff_image_type, Book, Chapter, Image};
use std::collections::HashMap;
use std::io::Read;

const MAX_FB2_BYTES: u64 = 300 * 1024 * 1024;

type Node<'a, 'i> = roxmltree::Node<'a, 'i>;

/// Byte dell'FB2 → testo, secondo la codifica dichiarata nell'intestazione XML
/// (molti FB2 sono in Windows-1251).
fn decode(bytes: &[u8]) -> String {
    if let Some((encoding, bom)) = encoding_rs::Encoding::for_bom(bytes) {
        return encoding.decode_without_bom_handling(&bytes[bom..]).0.into_owned();
    }
    let head = String::from_utf8_lossy(&bytes[..bytes.len().min(200)]).to_lowercase();
    let declared = head
        .split("encoding=")
        .nth(1)
        .and_then(|rest| rest.trim_start_matches(['"', '\'']).split(['"', '\'']).next())
        .and_then(|label| encoding_rs::Encoding::for_label(label.trim().as_bytes()));
    let encoding = declared.unwrap_or(encoding_rs::UTF_8);
    encoding.decode_without_bom_handling(bytes).0.into_owned()
}

/// Il primo `.fb2` dentro uno ZIP (FB2.ZIP / FBZ).
pub fn fb2_from_zip(bytes: &[u8]) -> Result<Vec<u8>, String> {
    let mut zip = zip::ZipArchive::new(std::io::Cursor::new(bytes)).map_err(|e| format!("ZIP non valido: {e}"))?;
    let name = zip
        .file_names()
        .find(|n| n.to_lowercase().ends_with(".fb2"))
        .map(str::to_string)
        .ok_or("nessun file .fb2 nello ZIP")?;
    let entry = zip.by_name(&name).map_err(|e| e.to_string())?;
    if entry.size() > MAX_FB2_BYTES {
        return Err("FB2 troppo grande".into());
    }
    let mut out = Vec::new();
    entry.take(MAX_FB2_BYTES).read_to_end(&mut out).map_err(|e| e.to_string())?;
    Ok(out)
}

/// Uno ZIP contiene un FB2? (per accettare i `.zip` generici)
pub fn zip_contains_fb2(bytes: &[u8]) -> bool {
    zip::ZipArchive::new(std::io::Cursor::new(bytes))
        .map(|zip| zip.file_names().any(|n| n.to_lowercase().ends_with(".fb2")))
        .unwrap_or(false)
}

fn child<'a, 'i>(node: Node<'a, 'i>, name: &str) -> Option<Node<'a, 'i>> {
    node.children().find(|n| n.has_tag_name(name))
}

fn text_of(node: Node) -> String {
    let raw: String = node.descendants().filter(|n| n.is_text()).filter_map(|n| n.text()).collect();
    raw.split_whitespace().collect::<Vec<_>>().join(" ")
}

fn href<'a>(node: Node<'a, '_>) -> Option<&'a str> {
    node.attributes().find(|a| a.name() == "href").map(|a| a.value())
}

fn person(node: Node) -> Option<String> {
    let parts: Vec<String> = ["first-name", "middle-name", "last-name"]
        .iter()
        .filter_map(|tag| child(node, tag).map(text_of))
        .filter(|p| !p.is_empty())
        .collect();
    let name = if parts.is_empty() { child(node, "nickname").map(text_of).unwrap_or_default() } else { parts.join(" ") };
    (!name.is_empty()).then_some(name)
}

struct Ctx<'b> {
    /// id del `<binary>` → nome del file nell'EPUB
    images: &'b HashMap<String, String>,
    /// id di una nota → file del capitolo delle note
    notes_file: Option<String>,
}

impl Ctx<'_> {
    fn image_src(&self, node: Node) -> Option<String> {
        let id = href(node)?.trim_start_matches('#');
        self.images.get(id).map(|name| format!("images/{}", escape(name)))
    }

    fn inline(&self, node: Node, out: &mut String) {
        for c in node.children() {
            if c.is_text() {
                out.push_str(&escape(c.text().unwrap_or("")));
                continue;
            }
            if !c.is_element() {
                continue;
            }
            let wrap = |tag: &str, out: &mut String| {
                out.push_str(&format!("<{tag}>"));
                self.inline(c, out);
                out.push_str(&format!("</{tag}>"));
            };
            match c.tag_name().name() {
                "strong" => wrap("strong", out),
                "emphasis" => wrap("em", out),
                "strikethrough" => wrap("del", out),
                "sub" => wrap("sub", out),
                "sup" => wrap("sup", out),
                "code" => wrap("code", out),
                "image" => {
                    if let Some(src) = self.image_src(c) {
                        out.push_str(&format!(r#"<img src="{src}" alt=""/>"#));
                    }
                }
                "a" => {
                    let target = href(c).unwrap_or("");
                    let link = match (target.strip_prefix('#'), &self.notes_file) {
                        (Some(id), Some(file)) => Some(format!("{file}#{}", escape(&safe_file_name(id)))),
                        (Some(_), None) => None,
                        (None, _) if target.starts_with("http://") || target.starts_with("https://") => Some(escape(target)),
                        _ => None,
                    };
                    let is_note = c.attribute("type") == Some("note");
                    match link {
                        Some(link) => {
                            out.push_str(&format!(r#"<a href="{link}">"#));
                            if is_note {
                                out.push_str("<sup>");
                            }
                            self.inline(c, out);
                            if is_note {
                                out.push_str("</sup>");
                            }
                            out.push_str("</a>");
                        }
                        None => self.inline(c, out),
                    }
                }
                _ => self.inline(c, out),
            }
        }
    }

    fn para(&self, node: Node, class: Option<&str>, out: &mut String) {
        match class {
            Some(class) => out.push_str(&format!(r#"<p class="{class}">"#)),
            None => out.push_str("<p>"),
        }
        self.inline(node, out);
        out.push_str("</p>\n");
    }

    /// Contenuto a blocchi (sezioni, paragrafi, poesie...). `depth` = livello del titolo.
    fn block(&self, node: Node, depth: usize, out: &mut String) {
        for c in node.children().filter(|n| n.is_element()) {
            match c.tag_name().name() {
                "p" => self.para(c, None, out),
                "subtitle" => self.para(c, Some("subtitle"), out),
                "text-author" => self.para(c, Some("text-author"), out),
                "v" => self.para(c, None, out),
                "empty-line" => out.push_str("<p>&#160;</p>\n"),
                "title" => {
                    let h = depth.clamp(1, 6);
                    out.push_str(&format!("<h{h}>"));
                    let lines: Vec<Node> = c.children().filter(|n| n.has_tag_name("p")).collect();
                    for (i, line) in lines.iter().enumerate() {
                        if i > 0 {
                            out.push_str("<br/>");
                        }
                        self.inline(*line, out);
                    }
                    out.push_str(&format!("</h{h}>\n"));
                }
                "section" => {
                    let id = c.attribute("id").map(|id| format!(r#" id="{}""#, escape(&safe_file_name(id)))).unwrap_or_default();
                    out.push_str(&format!("<div{id}>\n"));
                    self.block(c, depth + 1, out);
                    out.push_str("</div>\n");
                }
                "epigraph" => self.wrapped("div class=\"epigraph\"", "div", c, depth, out),
                "cite" => self.wrapped("blockquote class=\"cite\"", "blockquote", c, depth, out),
                "annotation" => self.wrapped("div", "div", c, depth, out),
                "poem" => self.wrapped("div class=\"poem\"", "div", c, depth, out),
                "stanza" => self.wrapped("div class=\"stanza\"", "div", c, depth, out),
                "image" => {
                    if let Some(src) = self.image_src(c) {
                        out.push_str(&format!(r#"<div class="ks-image"><img src="{src}" alt=""/></div>"#));
                        out.push('\n');
                    }
                }
                "table" => {
                    out.push_str("<table>\n");
                    for row in c.children().filter(|n| n.has_tag_name("tr")) {
                        out.push_str("<tr>");
                        for cell in row.children().filter(|n| n.has_tag_name("td") || n.has_tag_name("th")) {
                            let tag = cell.tag_name().name();
                            out.push_str(&format!("<{tag}>"));
                            self.inline(cell, out);
                            out.push_str(&format!("</{tag}>"));
                        }
                        out.push_str("</tr>\n");
                    }
                    out.push_str("</table>\n");
                }
                _ => self.block(c, depth, out),
            }
        }
    }

    fn wrapped(&self, open: &str, close: &str, node: Node, depth: usize, out: &mut String) {
        out.push_str(&format!("<{open}>\n"));
        self.block(node, depth, out);
        out.push_str(&format!("</{close}>\n"));
    }
}

pub fn fb2_to_epub(bytes: &[u8]) -> Result<Vec<u8>, String> {
    if bytes.len() as u64 > MAX_FB2_BYTES {
        return Err("FB2 troppo grande".into());
    }
    let xml = decode(bytes);
    let doc = roxmltree::Document::parse_with_options(&xml, roxmltree::ParsingOptions { allow_dtd: true, ..Default::default() })
        .map_err(|e| format!("FB2 non valido: {e}"))?;
    let root = doc.root_element();
    if !root.has_tag_name("FictionBook") {
        return Err("non è un file FictionBook".into());
    }

    // --- Immagini ---
    let mut images = Vec::new();
    let mut image_names: HashMap<String, String> = HashMap::new();
    for bin in root.children().filter(|n| n.has_tag_name("binary")) {
        let Some(id) = bin.attribute("id") else { continue };
        let compact: String = bin.text().unwrap_or("").chars().filter(|c| !c.is_whitespace()).collect();
        let Some(data) = crate::server_mode::decode_base64(&compact) else { continue };
        let Some(media_type) = sniff_image_type(&data) else { continue };
        let ext = media_type.trim_start_matches("image/").replace("jpeg", "jpg");
        let mut name = safe_file_name(id);
        if !name.to_lowercase().ends_with(&format!(".{ext}")) {
            name = format!("{name}.{ext}");
        }
        while image_names.values().any(|n| *n == name) {
            name = format!("x{name}");
        }
        image_names.insert(id.to_string(), name.clone());
        images.push(Image { name, media_type: media_type.to_string(), bytes: data });
    }

    // --- Metadati ---
    let description = child(root, "description");
    let title_info = description.and_then(|d| child(d, "title-info"));
    let title = title_info.and_then(|t| child(t, "book-title")).map(text_of).filter(|t| !t.is_empty());
    let authors: Vec<String> = title_info
        .map(|t| t.children().filter(|n| n.has_tag_name("author")).filter_map(person).collect())
        .unwrap_or_default();
    let annotation = title_info.and_then(|t| child(t, "annotation")).map(|a| {
        a.descendants().filter(|n| n.has_tag_name("p")).map(text_of).filter(|p| !p.is_empty()).collect::<Vec<_>>().join("\n")
    });
    let language = title_info.and_then(|t| child(t, "lang")).map(text_of);
    let isbn = description.and_then(|d| child(d, "publish-info")).and_then(|p| child(p, "isbn")).map(text_of);
    let cover_id = title_info
        .and_then(|t| child(t, "coverpage"))
        .and_then(|c| c.children().find(|n| n.has_tag_name("image")))
        .and_then(href)
        .map(|h| h.trim_start_matches('#').to_string());
    let cover = cover_id
        .and_then(|id| image_names.get(&id).cloned())
        .and_then(|name| images.iter().position(|i| i.name == name));

    // --- Testo ---
    let bodies: Vec<Node> = root.children().filter(|n| n.has_tag_name("body")).collect();
    let is_notes = |b: &Node| matches!(b.attribute("name"), Some("notes" | "comments" | "footnotes"));
    let main = bodies.iter().find(|b| !is_notes(b)).copied().ok_or("FB2 senza testo")?;
    let notes: Vec<Node> = bodies.iter().filter(|b| is_notes(b)).copied().collect();
    let book_title = title.clone().unwrap_or_else(|| text_of(child(main, "title").unwrap_or(main))).trim().to_string();

    let sections: Vec<Node> = main.children().filter(|n| n.has_tag_name("section")).collect();
    let main_chapters = sections.len().max(1);
    let notes_file = (!notes.is_empty()).then(|| format!("ch{}.xhtml", main_chapters + 1));
    let ctx = Ctx { images: &image_names, notes_file };

    let mut chapters = Vec::new();
    // Quello che sta prima delle sezioni (immagine, titolo, epigrafi) apre il primo capitolo
    let mut intro = String::new();
    for c in main.children().filter(|n| n.is_element() && !n.has_tag_name("section")) {
        let mut wrapper = String::new();
        ctx.block_single(c, &mut wrapper);
        intro.push_str(&wrapper);
    }
    if sections.is_empty() {
        chapters.push(Chapter { title: book_title.clone(), body: intro });
    } else {
        for (i, section) in sections.iter().enumerate() {
            let mut body = if i == 0 { std::mem::take(&mut intro) } else { String::new() };
            if let Some(id) = section.attribute("id") {
                body.push_str(&format!(r#"<div id="{}">"#, escape(&safe_file_name(id))));
            }
            ctx.block(*section, 2, &mut body);
            if section.attribute("id").is_some() {
                body.push_str("</div>");
            }
            let heading = child(*section, "title").map(text_of).filter(|t| !t.is_empty());
            let title = heading.unwrap_or_else(|| format!("{book_title} ({})", i + 1));
            chapters.push(Chapter { title, body });
        }
    }
    if !notes.is_empty() {
        let mut body = String::new();
        let mut title = None;
        for body_node in &notes {
            if title.is_none() {
                title = child(*body_node, "title").map(text_of).filter(|t| !t.is_empty());
            }
            ctx.block(*body_node, 2, &mut body);
        }
        chapters.push(Chapter { title: title.unwrap_or_else(|| "Notes".into()), body });
    }

    Book {
        title: if book_title.is_empty() { "FB2".into() } else { book_title },
        author: (!authors.is_empty()).then(|| authors.join(", ")),
        description: annotation.filter(|a| !a.is_empty()),
        language,
        isbn,
        cover,
        images,
        chapters,
    }
    .to_epub()
}

impl Ctx<'_> {
    /// Un singolo nodo a blocchi (per l'intestazione del `<body>`).
    fn block_single(&self, node: Node, out: &mut String) {
        // `block` lavora sui figli: lo usiamo sul genitore filtrando solo questo nodo
        match node.tag_name().name() {
            "title" => {
                out.push_str("<h1>");
                out.push_str(&escape(&text_of(node)));
                out.push_str("</h1>\n");
            }
            "image" => {
                if let Some(src) = self.image_src(node) {
                    out.push_str(&format!(r#"<div class="ks-image"><img src="{src}" alt=""/></div>"#));
                }
            }
            "epigraph" => self.wrapped("div class=\"epigraph\"", "div", node, 2, out),
            _ => {}
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn declared_encoding_is_used() {
        let mut bytes = b"<?xml version=\"1.0\" encoding=\"windows-1251\"?><a>".to_vec();
        bytes.extend([0xcf, 0xf0, 0xe8, 0xe2, 0xe5, 0xf2]);
        assert!(decode(&bytes).ends_with("Привет"));
    }
}
