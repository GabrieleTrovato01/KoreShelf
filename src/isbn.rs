//! Ricerca di un codice ISBN valido (10 o 13 cifre) dentro un testo.
//! A differenza della versione JS controlliamo anche la cifra di controllo,
//! così numeri di telefono o codici a caso non vengono scambiati per ISBN.

use regex::Regex;
use std::sync::LazyLock;

static CANDIDATE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"(?i)(?:(ISBN(?:-1[03])?)[\s:#]*|\b)((?:97[89][-\s]?)?(?:\d[-\s]?){9}[\dX])\b")
        .unwrap()
});

fn valid_isbn10(code: &str) -> bool {
    let chars: Vec<char> = code.chars().collect();
    if chars.len() != 10 {
        return false;
    }
    let mut sum = 0;
    for (i, c) in chars.iter().enumerate() {
        let value = match (c, i) {
            ('X', 9) => 10,
            (d, _) if d.is_ascii_digit() => d.to_digit(10).unwrap(),
            _ => return false,
        };
        sum += value * (10 - i as u32);
    }
    sum % 11 == 0
}

fn valid_isbn13(code: &str) -> bool {
    if code.len() != 13 || !code.chars().all(|c| c.is_ascii_digit()) {
        return false;
    }
    if !(code.starts_with("978") || code.starts_with("979")) {
        return false;
    }
    let sum: u32 = code
        .chars()
        .enumerate()
        .map(|(i, c)| c.to_digit(10).unwrap() * if i % 2 == 0 { 1 } else { 3 })
        .sum();
    sum % 10 == 0
}

/// Restituisce il primo ISBN valido trovato, preferendo quelli preceduti
/// dall'etichetta "ISBN".
pub fn find_isbn(text: &str) -> Option<String> {
    let mut first_unlabeled = None;
    for caps in CANDIDATE.captures_iter(text) {
        let cleaned: String = caps[2]
            .chars()
            .filter(|c| c.is_ascii_digit() || *c == 'X' || *c == 'x')
            .map(|c| c.to_ascii_uppercase())
            .collect();
        let valid = match cleaned.len() {
            10 => valid_isbn10(&cleaned),
            13 => valid_isbn13(&cleaned),
            _ => false,
        };
        if !valid {
            continue;
        }
        if caps.get(1).is_some() {
            return Some(cleaned);
        }
        first_unlabeled.get_or_insert(cleaned);
    }
    first_unlabeled
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_labeled_isbn13() {
        assert_eq!(
            find_isbn("Copyright 2019 ... ISBN: 978-88-04-66823-7 tutti i diritti").as_deref(),
            Some("9788804668237")
        );
    }

    #[test]
    fn finds_isbn10() {
        assert_eq!(find_isbn("ISBN 0-306-40615-2").as_deref(), Some("0306406152"));
    }

    #[test]
    fn rejects_bad_checksum() {
        assert_eq!(find_isbn("tel 3331234568 e 9788804668238"), None);
    }

    #[test]
    fn identifier_urn() {
        assert_eq!(find_isbn("urn:isbn:9780306406157").as_deref(), Some("9780306406157"));
    }
}
