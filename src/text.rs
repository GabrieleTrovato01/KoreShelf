//! Piccole utility di pulizia testo condivise tra EPUB, PDF e servizi online.

use regex::Regex;
use std::sync::LazyLock;

static TAGS: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"<[^>]*>?").unwrap());
static SCRIPTS: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"(?is)<(script|style)[^>]*>.*?</(script|style)>").unwrap());
static NUMERIC_ENTITY: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"&#(x[0-9a-fA-F]+|[0-9]+);").unwrap());
static SPACES: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"\s+").unwrap());
static NOT_WORD: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"[^\p{L}\p{N}\s]").unwrap());
static HEX_HASH: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"(?i)^[a-f0-9]{20,}$").unwrap());

/// Rimuove i tag HTML.
pub fn strip_tags(html: &str) -> String {
    let without_scripts = SCRIPTS.replace_all(html, " ");
    TAGS.replace_all(&without_scripts, "").into_owned()
}

/// Decodifica le entità HTML più comuni.
pub fn decode_entities(text: &str) -> String {
    let named = text
        .replace("&nbsp;", " ")
        .replace("&quot;", "\"")
        .replace("&apos;", "'")
        .replace("&#39;", "'")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&rsquo;", "’")
        .replace("&lsquo;", "‘")
        .replace("&rdquo;", "”")
        .replace("&ldquo;", "“")
        .replace("&hellip;", "…")
        .replace("&mdash;", "—")
        .replace("&ndash;", "–")
        .replace("&egrave;", "è")
        .replace("&eacute;", "é")
        .replace("&agrave;", "à")
        .replace("&ograve;", "ò")
        .replace("&ugrave;", "ù")
        .replace("&igrave;", "ì");
    let numeric = NUMERIC_ENTITY.replace_all(&named, |caps: &regex::Captures| {
        let code = &caps[1];
        let value = if let Some(hex) = code.strip_prefix('x') {
            u32::from_str_radix(hex, 16).ok()
        } else {
            code.parse().ok()
        };
        value.and_then(char::from_u32).map(String::from).unwrap_or_default()
    });
    numeric.replace("&amp;", "&")
}

/// HTML → testo semplice e leggibile (per le trame).
pub fn html_to_plain(html: &str) -> String {
    let with_breaks = html
        .replace("<br>", "\n")
        .replace("<br/>", "\n")
        .replace("<br />", "\n")
        .replace("</p>", "\n");
    decode_entities(&strip_tags(&with_breaks)).trim().to_string()
}

/// Lunghezza come la calcolerebbe JavaScript (unità UTF-16).
pub fn js_length(text: &str) -> usize {
    text.encode_utf16().count()
}

pub fn collapse_spaces(text: &str) -> String {
    SPACES.replace_all(text, " ").trim().to_string()
}

/// Titoli "spazzatura": hash esadecimali, "Unknown", ecc.
pub fn is_junk_title(title: &str, is_pdf: bool) -> bool {
    let lower = title.to_lowercase();
    let trimmed = title.trim();
    trimmed.is_empty()
        || HEX_HASH.is_match(trimmed)
        || lower.contains("unknown")
        || (is_pdf && (lower.contains("word") || lower.contains("untitled")))
}

fn clean_name_part(part: &str) -> String {
    let spaced = part.replace(['_', '-'], " ");
    collapse_spaces(&NOT_WORD.replace_all(&spaced, " "))
}

/// Ricava titolo e autore dal nome del file, come faceva la versione Node:
/// `Titolo - Autore.epub`, oppure `Parola1-Parola2-Autore.epub`.
pub fn title_author_from_filename(file_name: &str) -> (String, Option<String>) {
    let stem = match file_name.rfind('.') {
        Some(idx) => &file_name[..idx],
        None => file_name,
    };
    if stem.contains('-') {
        let mut parts: Vec<&str> = stem.split('-').collect();
        let (title, author) = if parts.len() > 2 {
            let author = parts.pop().unwrap_or_default();
            (clean_name_part(&parts.join(" ")), clean_name_part(author))
        } else {
            (clean_name_part(parts[0]), clean_name_part(parts.get(1).copied().unwrap_or("")))
        };
        let author = if author.is_empty() { None } else { Some(author) };
        (title, author)
    } else {
        (clean_name_part(stem), None)
    }
}

/// Nome del file senza estensione, per i casi di emergenza.
pub fn plain_title_from_filename(file_name: &str) -> String {
    let stem = match file_name.rfind('.') {
        Some(idx) => &file_name[..idx],
        None => file_name,
    };
    collapse_spaces(&stem.replace(['_', '-'], " "))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn filename_with_author() {
        let (t, a) = title_author_from_filename("Il_nome_della_rosa - Umberto Eco.epub");
        assert_eq!(t, "Il nome della rosa");
        assert_eq!(a.as_deref(), Some("Umberto Eco"));
    }

    #[test]
    fn filename_multi_dash_keeps_accents() {
        let (t, a) = title_author_from_filename("La-città-di-vetro-Auster.pdf");
        assert_eq!(t, "La città di vetro");
        assert_eq!(a.as_deref(), Some("Auster"));
    }

    #[test]
    fn junk_titles() {
        assert!(is_junk_title("a3f9c0d1e2b3a4f5c6d7e8f9", false));
        assert!(is_junk_title("Microsoft Word - Doc1", true));
        assert!(!is_junk_title("Dune", false));
    }

    #[test]
    fn entities() {
        assert_eq!(decode_entities("A &amp; B &#233; &#x41;"), "A & B é A");
    }
}
