//! Documenti Word (DOCX) e LibreOffice (ODT) → EPUB.
//!
//! Teniamo la struttura e la formattazione che contano per leggere: titoli (che diventano
//! i capitoli), paragrafi, grassetto, corsivo, sottolineato, barrato, apici e pedici,
//! elenchi, tabelle, immagini e note a piè di pagina. Impaginazione, caratteri e colori no:
//! nel lettore li decide chi legge.

use crate::blocks::{into_chapters, plain_text, Block, Inline, Style};
use crate::epub_writer::{safe_file_name, sniff_image_type, Book, Image};
use crate::office_crypto::{self, OdfPackage};
use crate::protection::OpenError;
use std::collections::HashMap;
use std::io::{Cursor, Read};

type Node<'a, 'i> = roxmltree::Node<'a, 'i>;

const MAX_PART: u64 = 200 * 1024 * 1024;

#[derive(Debug, Default)]
pub struct DocInfo {
    pub title: Option<String>,
    pub author: Option<String>,
    pub description: Option<String>,
    pub language: Option<String>,
}

fn parse(xml: &[u8]) -> Result<roxmltree::Document<'_>, OpenError> {
    let text = std::str::from_utf8(xml).map_err(|_| OpenError::Other("XML non UTF-8".into()))?;
    roxmltree::Document::parse_with_options(text.trim_start_matches('\u{feff}'), roxmltree::ParsingOptions { allow_dtd: true, ..Default::default() })
        .map_err(|e| OpenError::Other(format!("XML non valido: {e}")))
}

fn text_of(node: Node) -> String {
    let raw: String = node.descendants().filter(|n| n.is_text()).filter_map(|n| n.text()).collect();
    raw.split_whitespace().collect::<Vec<_>>().join(" ")
}

fn attr<'a>(node: Node<'a, '_>, name: &str) -> Option<&'a str> {
    node.attributes().find(|a| a.name() == name).map(|a| a.value())
}

fn child<'a, 'i>(node: Node<'a, 'i>, name: &str) -> Option<Node<'a, 'i>> {
    node.children().find(|n| n.tag_name().name() == name)
}

/// Metadati Dublin Core (docProps/core.xml del DOCX, meta.xml dell'ODT).
fn dublin_core(xml: &[u8]) -> DocInfo {
    let Ok(doc) = parse(xml) else { return DocInfo::default() };
    let field = |names: &[&str]| {
        names.iter().find_map(|name| {
            doc.descendants().find(|n| n.tag_name().name() == *name).map(text_of).filter(|t| !t.is_empty())
        })
    };
    DocInfo {
        title: field(&["title"]),
        author: field(&["creator", "initial-creator"]),
        description: field(&["description", "subject"]).filter(|d| d.chars().count() > 3),
        language: field(&["language"]),
    }
}

fn image_entry(images: &mut Vec<Image>, path: &str, bytes: Vec<u8>) -> Option<String> {
    let media_type = sniff_image_type(&bytes)?;
    if let Some(existing) = images.iter().find(|i| i.name == safe_file_name(path)) {
        return Some(existing.name.clone());
    }
    let name = safe_file_name(path);
    images.push(Image { name: name.clone(), media_type: media_type.into(), bytes });
    Some(name)
}

fn finish(info: DocInfo, fallback_title: &str, blocks: Vec<Block>, images: Vec<Image>) -> Result<Vec<u8>, OpenError> {
    let title = info.title.clone().unwrap_or_else(|| fallback_title.to_string());
    let chapters = into_chapters(blocks, &title);
    if chapters.iter().all(|c| plain_text(&c.body).trim().is_empty() && !c.body.contains("<img")) {
        return Err(OpenError::Other("documento vuoto".into()));
    }
    Book { title, author: info.author, description: info.description, language: info.language, chapters, images, ..Default::default() }
        .to_epub()
        .map_err(OpenError::Other)
}

// ------------------------------------------------------------------ DOCX

struct Zip {
    zip: zip::ZipArchive<Cursor<Vec<u8>>>,
}

impl Zip {
    fn read(&mut self, name: &str) -> Option<Vec<u8>> {
        let entry = self.zip.by_name(name).ok()?;
        let mut out = Vec::new();
        entry.take(MAX_PART).read_to_end(&mut out).ok()?;
        Some(out)
    }
}

struct WordStyle {
    heading: Option<u8>,
    list: bool,
    based_on: Option<String>,
}

struct Docx<'d> {
    styles: HashMap<String, WordStyle>,
    rels: HashMap<String, String>,
    zip: &'d mut Zip,
    images: Vec<Image>,
    notes: Vec<(String, String)>,
    note_texts: HashMap<String, String>,
}

fn on(node: Option<Node>) -> bool {
    node.is_some_and(|n| !matches!(attr(n, "val"), Some("0" | "false" | "none" | "off")))
}

impl Docx<'_> {
    fn style_heading(&self, id: &str) -> Option<u8> {
        let mut current = Some(id.to_string());
        for _ in 0..10 {
            let style = self.styles.get(current.as_deref()?)?;
            if style.heading.is_some() {
                return style.heading;
            }
            current = style.based_on.clone();
        }
        None
    }

    fn run_style(&self, run: Node) -> Style {
        let Some(props) = child(run, "rPr") else { return Style::default() };
        Style {
            bold: on(child(props, "b")),
            italic: on(child(props, "i")),
            underline: on(child(props, "u")),
            strike: on(child(props, "strike")) || on(child(props, "dstrike")),
            vertical: match child(props, "vertAlign").and_then(|v| attr(v, "val")) {
                Some("superscript") => 1,
                Some("subscript") => -1,
                _ => 0,
            },
        }
    }

    /// Il contenuto di un paragrafo: testo, a capo, immagini (che diventano blocchi a parte).
    fn inline(&mut self, node: Node, out: &mut Inline, images: &mut Vec<String>) {
        for c in node.children().filter(|n| n.is_element()) {
            match c.tag_name().name() {
                "r" => {
                    let style = self.run_style(c);
                    for part in c.children().filter(|n| n.is_element()) {
                        match part.tag_name().name() {
                            "t" => out.text(part.text().unwrap_or(""), style),
                            "tab" => out.text(" ", style),
                            "br" | "cr" if attr(part, "type") != Some("page") => out.line_break(),
                            "noBreakHyphen" => out.text("-", style),
                            "footnoteReference" | "endnoteReference" => {
                                if let Some(id) = attr(part, "id") {
                                    let n = self.notes.len() + 1;
                                    let text = self.note_texts.get(id).cloned().unwrap_or_default();
                                    self.notes.push((n.to_string(), text));
                                    out.raw(&format!(r##"<sup><a href="#ks-note-{n}">{n}</a></sup>"##));
                                }
                            }
                            "drawing" | "pict" | "object" => self.collect_images(part, images),
                            "AlternateContent" => {
                                if let Some(fallback) = part.children().find(|n| n.tag_name().name() == "Choice") {
                                    self.collect_images(fallback, images);
                                }
                            }
                            _ => {}
                        }
                    }
                }
                "hyperlink" | "smartTag" | "ins" | "fldSimple" | "customXml" | "sdtContent" => self.inline(c, out, images),
                "sdt" => {
                    if let Some(content) = child(c, "sdtContent") {
                        self.inline(content, out, images);
                    }
                }
                _ => {}
            }
        }
    }

    fn collect_images(&mut self, node: Node, found: &mut Vec<String>) {
        for blip in node.descendants().filter(|n| n.tag_name().name() == "blip" || n.tag_name().name() == "imagedata") {
            let Some(id) = attr(blip, "embed").or_else(|| attr(blip, "id")) else { continue };
            let Some(target) = self.rels.get(id).cloned() else { continue };
            let path = if let Some(stripped) = target.strip_prefix('/') { stripped.to_string() } else { format!("word/{target}") };
            if let Some(bytes) = self.zip.read(&path) {
                if let Some(name) = image_entry(&mut self.images, &path, bytes) {
                    found.push(name);
                }
            }
        }
    }

    fn paragraph(&mut self, p: Node, blocks: &mut Vec<Block>) {
        let props = child(p, "pPr");
        let style_id = props.and_then(|pp| child(pp, "pStyle")).and_then(|s| attr(s, "val"));
        let outline = props
            .and_then(|pp| child(pp, "outlineLvl"))
            .and_then(|o| attr(o, "val"))
            .and_then(|v| v.parse::<u8>().ok())
            .filter(|&l| l < 9)
            .map(|l| l + 1);
        let heading = outline.or_else(|| style_id.and_then(|id| self.style_heading(id)));
        let is_list = props.and_then(|pp| child(pp, "numPr")).and_then(|n| child(n, "numId")).and_then(|n| attr(n, "val")).is_some_and(|v| v != "0")
            || style_id.and_then(|id| self.styles.get(id)).is_some_and(|s| s.list);

        let mut inline = Inline::default();
        let mut images = Vec::new();
        self.inline(p, &mut inline, &mut images);
        if !inline.is_blank() {
            let html = inline.take();
            blocks.push(match (heading, is_list) {
                (Some(level), _) => Block::Heading(level.min(6), html),
                (None, true) => Block::Item(html),
                _ => Block::Para(html),
            });
        }
        blocks.extend(images.into_iter().map(Block::Image));
    }

    fn body(&mut self, node: Node, blocks: &mut Vec<Block>) {
        for c in node.children().filter(|n| n.is_element()) {
            match c.tag_name().name() {
                "p" => self.paragraph(c, blocks),
                "tbl" => {
                    let mut rows = Vec::new();
                    for tr in c.children().filter(|n| n.tag_name().name() == "tr") {
                        let mut cells = Vec::new();
                        for tc in tr.children().filter(|n| n.tag_name().name() == "tc") {
                            let mut cell_blocks = Vec::new();
                            self.body(tc, &mut cell_blocks);
                            let parts: Vec<String> = cell_blocks
                                .into_iter()
                                .filter_map(|b| match b {
                                    Block::Para(h) | Block::Item(h) | Block::Heading(_, h) => Some(h),
                                    _ => None,
                                })
                                .collect();
                            cells.push(parts.join("<br/>"));
                        }
                        rows.push(cells);
                    }
                    if !rows.is_empty() {
                        blocks.push(Block::Table(rows));
                    }
                }
                "sdt" => {
                    if let Some(content) = child(c, "sdtContent") {
                        self.body(content, blocks);
                    }
                }
                "customXml" | "ins" => self.body(c, blocks),
                _ => {}
            }
        }
    }
}

fn read_rels(xml: Option<Vec<u8>>) -> HashMap<String, String> {
    let Some(xml) = xml else { return HashMap::new() };
    let Ok(doc) = parse(&xml) else { return HashMap::new() };
    doc.descendants()
        .filter(|n| n.tag_name().name() == "Relationship" && attr(*n, "TargetMode") != Some("External"))
        .filter_map(|n| Some((attr(n, "Id")?.to_string(), attr(n, "Target")?.to_string())))
        .collect()
}

fn read_styles(xml: Option<Vec<u8>>) -> HashMap<String, WordStyle> {
    let Some(xml) = xml else { return HashMap::new() };
    let Ok(doc) = parse(&xml) else { return HashMap::new() };
    doc.descendants()
        .filter(|n| n.tag_name().name() == "style" && attr(*n, "type") == Some("paragraph"))
        .filter_map(|s| {
            let id = attr(s, "styleId")?.to_string();
            let name = child(s, "name").and_then(|n| attr(n, "val")).unwrap_or("").to_lowercase();
            let outline = child(s, "pPr")
                .and_then(|pp| child(pp, "outlineLvl"))
                .and_then(|o| attr(o, "val"))
                .and_then(|v| v.parse::<u8>().ok())
                .filter(|&l| l < 9)
                .map(|l| l + 1);
            // "heading 1" è il nome interno, uguale in tutte le lingue di Word
            let by_name = name.strip_prefix("heading ").and_then(|n| n.trim().parse::<u8>().ok());
            let heading = by_name.or(outline).or((name == "title").then_some(1));
            let list = name.starts_with("list") || child(s, "pPr").and_then(|pp| child(pp, "numPr")).is_some();
            let based_on = child(s, "basedOn").and_then(|b| attr(b, "val")).map(str::to_string);
            Some((id, WordStyle { heading, list, based_on }))
        })
        .collect()
}

/// Testo delle note a piè di pagina (e di chiusura): id → XHTML.
fn read_notes(zip: &mut Zip) -> HashMap<String, String> {
    let mut notes = HashMap::new();
    for part in ["word/footnotes.xml", "word/endnotes.xml"] {
        let Some(xml) = zip.read(part) else { continue };
        let Ok(doc) = parse(&xml) else { continue };
        for note in doc.descendants().filter(|n| matches!(n.tag_name().name(), "footnote" | "endnote")) {
            if matches!(attr(note, "type"), Some("separator" | "continuationSeparator" | "continuationNotice")) {
                continue;
            }
            if let Some(id) = attr(note, "id") {
                let text = text_of(note);
                if !text.is_empty() {
                    notes.insert(id.to_string(), crate::epub_writer::escape(&text));
                }
            }
        }
    }
    notes
}

/// Un DOCX è cifrato? (Word lo salva come contenitore OLE invece che come ZIP)
pub fn docx_is_encrypted(bytes: &[u8]) -> bool {
    office_crypto::is_encrypted_office(bytes)
}

pub fn docx_to_epub(bytes: &[u8], fallback_title: &str, password: Option<&str>) -> Result<Vec<u8>, OpenError> {
    let plain;
    let bytes = if bytes.starts_with(&office_crypto::CFB_MAGIC) {
        plain = office_crypto::decrypt_docx(bytes, password)?;
        &plain[..]
    } else {
        bytes
    };
    let mut zip = Zip { zip: zip::ZipArchive::new(Cursor::new(bytes.to_vec())).map_err(|e| OpenError::Other(format!("DOCX non valido: {e}")))? };
    let document = zip.read("word/document.xml").ok_or("word/document.xml mancante: non è un DOCX")?;
    let info = zip.read("docProps/core.xml").map(|x| dublin_core(&x)).unwrap_or_default();
    let styles = read_styles(zip.read("word/styles.xml"));
    let rels = read_rels(zip.read("word/_rels/document.xml.rels"));
    let note_texts = read_notes(&mut zip);
    let doc = parse(&document)?;
    let body = doc.descendants().find(|n| n.tag_name().name() == "body").ok_or("documento senza corpo")?;

    let mut docx = Docx { styles, rels, zip: &mut zip, images: Vec::new(), notes: Vec::new(), note_texts };
    let mut blocks = Vec::new();
    docx.body(body, &mut blocks);
    append_notes(&mut blocks, &docx.notes);
    let images = std::mem::take(&mut docx.images);
    finish(info, fallback_title, blocks, images)
}

fn append_notes(blocks: &mut Vec<Block>, notes: &[(String, String)]) {
    if notes.is_empty() {
        return;
    }
    blocks.push(Block::Rule);
    for (n, text) in notes {
        blocks.push(Block::Para(format!(r#"<span id="ks-note-{n}"><sup>{n}</sup></span> {text}"#)));
    }
}

// ------------------------------------------------------------------ ODT

struct Odt<'p> {
    /// stile automatico → formattazione
    spans: HashMap<String, Style>,
    /// stile di paragrafo → livello di titolo
    para_heading: HashMap<String, u8>,
    package: &'p mut OdfPackage,
    images: Vec<Image>,
    notes: Vec<(String, String)>,
}

fn odf_text_style(style: Node) -> Option<Style> {
    let props = child(style, "text-properties")?;
    let get = |name: &str| attr(props, name);
    Some(Style {
        bold: get("font-weight").is_some_and(|w| w == "bold" || w.parse::<u32>().is_ok_and(|n| n >= 600)),
        italic: get("font-style").is_some_and(|s| s == "italic" || s == "oblique"),
        underline: get("text-underline-style").is_some_and(|s| s != "none"),
        strike: get("text-line-through-style").is_some_and(|s| s != "none"),
        vertical: match get("text-position").map(|p| p.split_whitespace().next().unwrap_or("")) {
            Some("super") => 1,
            Some("sub") => -1,
            Some(p) if p.trim_end_matches('%').parse::<f32>().is_ok_and(|v| v > 0.0) => 1,
            Some(p) if p.trim_end_matches('%').parse::<f32>().is_ok_and(|v| v < 0.0) => -1,
            _ => 0,
        },
    })
}

fn merge(a: Style, b: Style) -> Style {
    Style {
        bold: a.bold || b.bold,
        italic: a.italic || b.italic,
        underline: a.underline || b.underline,
        strike: a.strike || b.strike,
        vertical: if b.vertical != 0 { b.vertical } else { a.vertical },
    }
}

impl Odt<'_> {
    fn inline(&mut self, node: Node, style: Style, out: &mut Inline, images: &mut Vec<String>) {
        for c in node.children() {
            if c.is_text() {
                out.text(c.text().unwrap_or(""), style);
                continue;
            }
            match c.tag_name().name() {
                "span" | "a" | "ruby" | "ruby-base" | "meta" | "bookmark-ref" | "reference-ref" | "sequence" => {
                    let own = attr(c, "style-name").and_then(|s| self.spans.get(s)).copied().unwrap_or_default();
                    self.inline(c, merge(style, own), out, images);
                }
                "s" => out.text(&" ".repeat(attr(c, "c").and_then(|n| n.parse().ok()).unwrap_or(1).min(50)), style),
                "tab" => out.text(" ", style),
                "line-break" => out.line_break(),
                "note" => {
                    let n = self.notes.len() + 1;
                    let text = child(c, "note-body").map(text_of).unwrap_or_default();
                    self.notes.push((n.to_string(), crate::epub_writer::escape(&text)));
                    out.raw(&format!(r##"<sup><a href="#ks-note-{n}">{n}</a></sup>"##));
                }
                "frame" => self.frame(c, images),
                _ => {}
            }
        }
    }

    fn frame(&mut self, frame: Node, images: &mut Vec<String>) {
        for image in frame.descendants().filter(|n| n.tag_name().name() == "image") {
            let Some(href) = attr(image, "href") else { continue };
            if href.starts_with("http") {
                continue;
            }
            let path = href.trim_start_matches("./").to_string();
            if let Ok(Some(bytes)) = self.package.read(&path) {
                if let Some(name) = image_entry(&mut self.images, &path, bytes) {
                    images.push(name);
                    return;
                }
            }
        }
    }

    fn paragraph(&mut self, p: Node, heading: Option<u8>, item: bool, blocks: &mut Vec<Block>) {
        let own = attr(p, "style-name").and_then(|s| self.spans.get(s)).copied().unwrap_or_default();
        let mut inline = Inline::default();
        let mut images = Vec::new();
        self.inline(p, own, &mut inline, &mut images);
        if !inline.is_blank() {
            let html = inline.take();
            blocks.push(match (heading, item) {
                (Some(level), _) => Block::Heading(level.clamp(1, 6), html),
                (None, true) => Block::Item(html),
                _ => Block::Para(html),
            });
        }
        blocks.extend(images.into_iter().map(Block::Image));
    }

    fn body(&mut self, node: Node, item: bool, blocks: &mut Vec<Block>) {
        for c in node.children().filter(|n| n.is_element()) {
            match c.tag_name().name() {
                "h" => {
                    let level = attr(c, "outline-level").and_then(|l| l.parse::<u8>().ok()).unwrap_or(1);
                    self.paragraph(c, Some(level), false, blocks);
                }
                "p" => {
                    let heading = attr(c, "style-name").and_then(|s| self.para_heading.get(s)).copied();
                    self.paragraph(c, heading, item, blocks);
                }
                "list" | "list-header" => self.body(c, true, blocks),
                "list-item" => self.body(c, true, blocks),
                "section" | "index-body" | "table-of-content" | "illustration-index" | "alphabetical-index" => {
                    if c.tag_name().name() == "section" || c.tag_name().name() == "index-body" {
                        self.body(c, item, blocks)
                    }
                }
                "table" => {
                    let mut rows = Vec::new();
                    for tr in c.descendants().filter(|n| n.tag_name().name() == "table-row") {
                        let mut cells = Vec::new();
                        for tc in tr.children().filter(|n| n.tag_name().name() == "table-cell") {
                            let mut cell_blocks = Vec::new();
                            self.body(tc, false, &mut cell_blocks);
                            let parts: Vec<String> = cell_blocks
                                .into_iter()
                                .filter_map(|b| match b {
                                    Block::Para(h) | Block::Item(h) | Block::Heading(_, h) => Some(h),
                                    _ => None,
                                })
                                .collect();
                            cells.push(parts.join("<br/>"));
                        }
                        rows.push(cells);
                    }
                    if !rows.is_empty() {
                        blocks.push(Block::Table(rows));
                    }
                }
                "frame" => {
                    let mut images = Vec::new();
                    self.frame(c, &mut images);
                    blocks.extend(images.into_iter().map(Block::Image));
                }
                _ => {}
            }
        }
    }
}

/// Lo stato di protezione di un ODT: `Ok(false)` in chiaro, `Ok(true)` cifrato e apribile
/// con una password, errore se la cifratura non è supportata o il file non è un ODT.
pub fn odt_is_encrypted(bytes: &[u8]) -> Result<bool, OpenError> {
    match OdfPackage::open(bytes.to_vec(), None) {
        Ok(_) => Ok(false),
        Err(OpenError::NeedsPassword) => Ok(true),
        Err(e) => Err(e),
    }
}

pub fn odt_to_epub(bytes: &[u8], fallback_title: &str, password: Option<&str>) -> Result<Vec<u8>, OpenError> {
    let mut package = OdfPackage::open(bytes.to_vec(), password)?;
    let content = package.read("content.xml")?.ok_or("content.xml mancante: non è un ODT")?;
    let info = match package.read("meta.xml") {
        Ok(Some(x)) => dublin_core(&x),
        _ => DocInfo::default(),
    };
    let doc = parse(&content)?;
    let mut spans = HashMap::new();
    let mut para_heading = HashMap::new();
    // Gli stili automatici sono in content.xml; quelli con nome (Heading_20_1...) in styles.xml
    let styles_xml = package.read("styles.xml").ok().flatten();
    let styles_doc = styles_xml.as_deref().and_then(|x| parse(x).ok());
    for d in std::iter::once(&doc).chain(styles_doc.iter()) {
        for style in d.descendants().filter(|n| n.tag_name().name() == "style") {
            let Some(name) = attr(style, "name") else { continue };
            if let Some(s) = odf_text_style(style) {
                spans.insert(name.to_string(), s);
            }
            let level = attr(style, "default-outline-level").and_then(|l| l.parse::<u8>().ok()).or_else(|| {
                let parent = attr(style, "parent-style-name").unwrap_or(name).to_lowercase();
                parent.strip_prefix("heading_20_").and_then(|n| n.parse::<u8>().ok())
            });
            if let Some(level) = level.filter(|&l| l > 0) {
                para_heading.insert(name.to_string(), level);
            }
        }
    }
    let text = doc.descendants().find(|n| n.tag_name().name() == "text" && n.parent().is_some_and(|p| p.tag_name().name() == "body"))
        .ok_or("documento ODT senza testo")?;
    let mut odt = Odt { spans, para_heading, package: &mut package, images: Vec::new(), notes: Vec::new() };
    let mut blocks = Vec::new();
    odt.body(text, false, &mut blocks);
    append_notes(&mut blocks, &odt.notes);
    let images = std::mem::take(&mut odt.images);
    finish(info, fallback_title, blocks, images)
}
