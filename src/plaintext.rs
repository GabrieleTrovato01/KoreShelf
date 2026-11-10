//! TXT e Markdown → EPUB.
//!
//! * La codifica dei caratteri viene riconosciuta da sola: UTF-8 (con o senza BOM), UTF-16,
//!   Windows-1252 (testi occidentali) e Windows-1251 (cirillico).
//! * Nei TXT i capitoli si riconoscono dalle righe come "Capitolo 3", "Chapter IV",
//!   "Kapitel 2", "Chapitre premier", "Capítulo 1", "Prologo", "Epilogue"... nelle cinque
//!   lingue di KoreShelf. Senza capitoli il testo viene diviso in parti, così il lettore resta
//!   veloce anche con file molto lunghi.
//! * Nei Markdown i capitoli sono i titoli (`#`); il primo `#` (o il front matter YAML) dà il
//!   titolo del libro. L'HTML scritto a mano dentro il Markdown viene mostrato come testo.

use crate::epub_writer::{self, escape, Book, Chapter};
use crate::text::title_author_from_filename;
use regex::Regex;
use std::sync::LazyLock;

/// Un capitolo senza titoli trovati viene spezzato in parti di circa questa lunghezza.
const PART_CHARS: usize = 60_000;
const MAX_TEXT_BYTES: usize = 200 * 1024 * 1024;

// ------------------------------------------------------------------ codifica

/// Byte → testo, riconoscendo la codifica. Le righe finiscono sempre con `\n`.
pub fn decode_text(bytes: &[u8]) -> String {
    let text = decode_raw(bytes);
    text.replace("\r\n", "\n").replace('\r', "\n")
}

fn decode_raw(bytes: &[u8]) -> String {
    use encoding_rs::{UTF_16BE, UTF_16LE, WINDOWS_1251, WINDOWS_1252};
    // 1. Il BOM, se c'è, dice tutto
    if let Some((encoding, bom)) = encoding_rs::Encoding::for_bom(bytes) {
        return encoding.decode_without_bom_handling(&bytes[bom..]).0.into_owned();
    }
    // 2. UTF-16 senza BOM: metà dei byte (pari o dispari) sono zeri
    let sample = &bytes[..bytes.len().min(4096)];
    if sample.len() >= 4 {
        let zeros_even = sample.iter().step_by(2).filter(|&&b| b == 0).count();
        let zeros_odd = sample.iter().skip(1).step_by(2).filter(|&&b| b == 0).count();
        let half = sample.len() / 2;
        if zeros_odd * 10 > half * 4 && zeros_even * 10 < half {
            return UTF_16LE.decode_without_bom_handling(bytes).0.into_owned();
        }
        if zeros_even * 10 > half * 4 && zeros_odd * 10 < half {
            return UTF_16BE.decode_without_bom_handling(bytes).0.into_owned();
        }
    }
    // 3. UTF-8 valido
    if let Ok(text) = std::str::from_utf8(bytes) {
        return text.to_string();
    }
    // 4. Codifiche a un byte: nel cirillico (1251) quasi tutte le lettere sono byte alti,
    //    nei testi occidentali (1252) gli accenti sono pochi rispetto alle lettere ASCII.
    let high = bytes.iter().filter(|&&b| b >= 0xC0).count();
    let ascii_letters = bytes.iter().filter(|b| b.is_ascii_alphabetic()).count();
    let encoding = if high * 10 > (high + ascii_letters) * 4 { WINDOWS_1251 } else { WINDOWS_1252 };
    encoding.decode_without_bom_handling(bytes).0.into_owned()
}

/// I primi byte sono di un file di testo? (niente ZIP, PDF, eseguibili o immagini
/// rinominati in `.txt`). Gli zeri sono ammessi solo nell'UTF-16.
pub fn looks_like_text(head: &[u8]) -> bool {
    if head.is_empty() || head.starts_with(b"PK") || head.starts_with(b"%PDF") || crate::epub_writer::sniff_image_type(head).is_some() {
        return false;
    }
    if encoding_rs::Encoding::for_bom(head).is_some() {
        return true;
    }
    if !head.contains(&0) {
        // Pochi caratteri di controllo (a parte a capo e tabulazioni)
        let control = head.iter().filter(|&&b| b < 0x20 && !matches!(b, b'\n' | b'\r' | b'\t' | 0x0C)).count();
        return control * 100 <= head.len();
    }
    let decoded = decode_raw(head);
    !decoded.contains('\0') && decoded.chars().filter(|c| c.is_control() && !c.is_whitespace()).count() * 100 <= decoded.chars().count()
}

// ------------------------------------------------------------------ TXT

static HEADING: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(
        r"(?ix)^(?:
            (?:capitolo|cap\.|chapter|ch\.|kapitel|chapitre|cap[ií]tulo|parte|part|teil|partie|libro|book|buch|livre)
                (?:\s+(?:[0-9]+|[ivxlcdm]+|\p{L}+))\b.*
          | (?:prologo|prologue|prolog|pr[óo]logo|epilogo|epilogue|epilog|[ée]pilogue|ep[íi]logo
              |introduzione|introduction|einleitung|introducci[óo]n|prefazione|preface|vorwort|pr[ée]face|prefacio
              |postfazione|nachwort|postface|posfacio|afterword|appendice|appendix|anhang|ap[ée]ndice)\b.*
          | (?:[0-9]{1,3}|[ivxlcdm]{1,7})\.?
        )$",
    )
    .unwrap()
});

fn is_heading(line: &str, prev_blank: bool, next_blank: bool) -> bool {
    let line = line.trim();
    let words = line.split_whitespace().count();
    if line.is_empty() || line.chars().count() > 70 || words > 9 || line.ends_with([',', ';', ':']) {
        return false;
    }
    // "Capitolo primo." sì, "Parte della gente uscì." no: una frase finita è un titolo solo se cortissima
    if line.ends_with(['.', '!', '?']) && words > 3 {
        return false;
    }
    // Un numero da solo è un titolo solo se sta isolato tra righe vuote
    let bare_number = line.trim_end_matches('.').chars().all(|c| c.is_ascii_digit() || "ivxlcdmIVXLCDM".contains(c));
    if bare_number {
        return prev_blank && next_blank && HEADING.is_match(line);
    }
    prev_blank && HEADING.is_match(line)
}

/// Divide un testo in capitoli: (titolo, testo). Il testo prima del primo titolo ha titolo vuoto.
pub fn split_chapters(text: &str) -> Vec<(String, String)> {
    let lines: Vec<&str> = text.lines().collect();
    let mut chapters: Vec<(String, String)> = vec![(String::new(), String::new())];
    for (i, line) in lines.iter().enumerate() {
        let prev_blank = i == 0 || lines[i - 1].trim().is_empty();
        let next_blank = lines.get(i + 1).is_none_or(|l| l.trim().is_empty());
        if is_heading(line, prev_blank, next_blank) {
            chapters.push((line.trim().to_string(), String::new()));
        } else if let Some(last) = chapters.last_mut() {
            last.1.push_str(line);
            last.1.push('\n');
        }
    }
    chapters.retain(|(title, body)| !title.is_empty() || !body.trim().is_empty());
    chapters
}

/// Spezza un blocco di testo in parti di circa [`PART_CHARS`] caratteri, tra un paragrafo e l'altro.
fn split_parts(paragraphs: Vec<String>) -> Vec<Vec<String>> {
    let mut parts = vec![Vec::new()];
    let mut size = 0;
    for para in paragraphs {
        if size > PART_CHARS {
            parts.push(Vec::new());
            size = 0;
        }
        size += para.chars().count();
        parts.last_mut().unwrap().push(para);
    }
    parts
}

fn title_and_author(original_name: &str) -> (String, Option<String>) {
    let (title, author) = title_author_from_filename(original_name);
    let title = if title.is_empty() { "Senza titolo".to_string() } else { title };
    (title, author)
}

pub fn txt_to_epub(bytes: &[u8], original_name: &str) -> Result<Vec<u8>, String> {
    if bytes.len() > MAX_TEXT_BYTES {
        return Err("file di testo troppo grande".into());
    }
    let text = decode_text(bytes);
    if text.trim().is_empty() {
        return Err("file di testo vuoto".into());
    }
    let (title, author) = title_and_author(original_name);
    let mut book = Book { title: title.clone(), author, ..Default::default() };

    for (heading, body) in split_chapters(&text) {
        let paragraphs = epub_writer::split_paragraphs(&body);
        let parts = split_parts(paragraphs);
        let many = parts.len() > 1;
        for (n, part) in parts.into_iter().enumerate() {
            let chapter_title = match (heading.is_empty(), many) {
                (false, false) => heading.clone(),
                (false, true) => format!("{heading} ({})", n + 1),
                (true, false) => title.clone(),
                (true, true) => format!("{title} ({})", n + 1),
            };
            let mut body = String::from("<div class=\"ks-text\">\n");
            if !heading.is_empty() && n == 0 {
                body += &format!("<h2>{}</h2>\n", escape(&heading));
            }
            for para in part {
                body += &format!("<p>{}</p>\n", escape(&para));
            }
            body += "</div>";
            book.chapters.push(Chapter { title: chapter_title, body });
        }
    }
    book.to_epub()
}

// ------------------------------------------------------------------ Markdown

/// Front matter YAML semplice in cima al file: `title:`, `author:`, `description:`, `lang:`.
fn front_matter(text: &str) -> (Vec<(String, String)>, &str) {
    let Some(rest) = text.strip_prefix("---\n") else { return (Vec::new(), text) };
    let Some(end) = rest.find("\n---") else { return (Vec::new(), text) };
    let block = &rest[..end];
    let after = rest[end + 4..].trim_start_matches(|c| c != '\n').trim_start_matches('\n');
    let pairs = block
        .lines()
        .filter_map(|line| line.split_once(':'))
        .map(|(k, v)| (k.trim().to_lowercase(), v.trim().trim_matches(['"', '\'']).to_string()))
        .filter(|(_, v)| !v.is_empty())
        .collect();
    (pairs, after)
}

fn heading_number(level: pulldown_cmark::HeadingLevel) -> usize {
    use pulldown_cmark::HeadingLevel::*;
    match level {
        H1 => 1,
        H2 => 2,
        H3 => 3,
        H4 => 4,
        H5 => 5,
        H6 => 6,
    }
}

pub fn markdown_to_epub(bytes: &[u8], original_name: &str) -> Result<Vec<u8>, String> {
    use pulldown_cmark::{Event, Options, Parser, Tag, TagEnd};
    if bytes.len() > MAX_TEXT_BYTES {
        return Err("file Markdown troppo grande".into());
    }
    let text = decode_text(bytes);
    if text.trim().is_empty() {
        return Err("file Markdown vuoto".into());
    }
    let (meta, body) = front_matter(&text);
    let meta_get = |key: &str| meta.iter().find(|(k, _)| k == key).map(|(_, v)| v.clone());

    let options = Options::ENABLE_TABLES | Options::ENABLE_STRIKETHROUGH | Options::ENABLE_FOOTNOTES | Options::ENABLE_TASKLISTS;
    // L'HTML grezzo diventa testo (XHTML sempre valido); le immagini, che non possiamo
    // includere, lasciano solo il loro testo alternativo.
    let events: Vec<Event> = Parser::new_ext(body, options)
        .filter(|e| !matches!(e, Event::Start(Tag::Image { .. }) | Event::End(TagEnd::Image)))
        .map(|e| match e {
            Event::Html(html) | Event::InlineHtml(html) => Event::Text(html),
            other => other,
        })
        .collect();

    // Livello dei capitoli: il titolo più grande usato; se ce n'è uno solo è il titolo del
    // libro e i capitoli sono quelli del livello sotto.
    let levels: Vec<usize> = events
        .iter()
        .filter_map(|e| match e {
            Event::Start(Tag::Heading { level, .. }) => Some(heading_number(*level)),
            _ => None,
        })
        .collect();
    let top = levels.iter().copied().min();
    let mut book_heading: Option<String> = None;
    let split_level = match top {
        Some(top) if levels.iter().filter(|&&l| l == top).count() == 1 && levels.iter().any(|&l| l > top) => {
            book_heading = Some(top.to_string());
            levels.iter().copied().filter(|&l| l > top).min()
        }
        other => other,
    };

    let file_title = title_and_author(original_name);
    let mut chapters: Vec<(String, Vec<Event>)> = vec![(String::new(), Vec::new())];
    let mut in_heading: Option<usize> = None;
    let mut heading_text = String::new();
    let mut book_title: Option<String> = None;
    for event in events {
        match &event {
            Event::Start(Tag::Heading { level, .. }) => {
                let n = heading_number(*level);
                in_heading = Some(n);
                heading_text.clear();
                if Some(n) == split_level {
                    chapters.push((String::new(), Vec::new()));
                }
            }
            Event::End(TagEnd::Heading(level)) => {
                let n = heading_number(*level);
                if book_heading.as_deref() == Some(&n.to_string()) && book_title.is_none() {
                    book_title = Some(heading_text.trim().to_string());
                }
                if Some(n) == split_level {
                    if let Some(last) = chapters.last_mut() {
                        last.0 = heading_text.trim().to_string();
                    }
                }
                in_heading = None;
            }
            Event::Text(t) | Event::Code(t) if in_heading.is_some() => heading_text.push_str(t),
            _ => {}
        }
        chapters.last_mut().unwrap().1.push(event);
    }

    let title = meta_get("title").or(book_title).filter(|t| !t.is_empty()).unwrap_or(file_title.0);
    let author = meta_get("author").or(file_title.1);
    let mut book = Book {
        title: title.clone(),
        author,
        description: meta_get("description"),
        language: meta_get("lang").or_else(|| meta_get("language")),
        ..Default::default()
    };
    for (heading, events) in chapters {
        let mut html = String::new();
        pulldown_cmark::html::push_html(&mut html, events.into_iter());
        if html.trim().is_empty() {
            continue;
        }
        let chapter_title = if heading.is_empty() { title.clone() } else { heading };
        book.chapters.push(Chapter { title: chapter_title, body: html });
    }
    book.to_epub()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encodings_are_recognised() {
        assert_eq!(decode_text("città\r\n".as_bytes()), "città\n");
        assert_eq!(decode_text(b"\xEF\xBB\xBFciao"), "ciao");
        assert_eq!(decode_text(b"citt\xE0 e caff\xE8 per tutti quanti"), "città e caffè per tutti quanti", "Windows-1252");
        assert_eq!(decode_text(b"\xcf\xf0\xe8\xe2\xe5\xf2 \xec\xe8\xf0"), "Привет мир", "Windows-1251");
        let utf16: Vec<u8> = "Ciao mondo".encode_utf16().flat_map(u16::to_le_bytes).collect();
        assert_eq!(decode_text(&utf16), "Ciao mondo", "UTF-16 senza BOM");
        let mut with_bom = vec![0xFF, 0xFE];
        with_bom.extend(&utf16);
        assert_eq!(decode_text(&with_bom), "Ciao mondo");
    }

    #[test]
    fn chapter_headings_in_five_languages() {
        for heading in ["Capitolo 1", "CHAPTER IV", "Kapitel 2", "Chapitre premier", "Capítulo 3", "Prologo", "Epilogue", "XII"] {
            let text = format!("Inizio del libro.\n\n{heading}\n\nTesto del capitolo.\n");
            let chapters = split_chapters(&text);
            assert_eq!(chapters.len(), 2, "{heading}: {chapters:?}");
            assert_eq!(chapters[1].0, heading);
        }
    }

    #[test]
    fn ordinary_sentences_are_not_headings() {
        let text = "Parte della gente uscì.\n\nParte della gente era già uscita, e il resto aspettava.\n\nIl capitolo 3 del regolamento dice che si paga.\n\n12 persone erano presenti.\n";
        assert_eq!(split_chapters(text).len(), 1, "{:?}", split_chapters(text));
        // Un numero dentro il testo, senza righe vuote attorno, non è un titolo
        assert_eq!(split_chapters("Totale:\n12\nfine\n").len(), 1);
    }
}
