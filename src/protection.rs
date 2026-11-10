//! File protetti da password (PDF, DOCX, ODT, fumetti CBZ/CBR/CB7).
//!
//! KoreShelf non salva mai le password: il file resta cifrato nella libreria e il lettore
//! manda la password a ogni apertura nell'intestazione `X-KoreShelf-Password`. È il
//! frontend, se l'utente lo chiede, a ricordarla sul dispositivo.

use std::fmt;

/// Nome dell'intestazione HTTP con la password (codificata con percent-encoding, per i caratteri non ASCII).
pub const PASSWORD_HEADER: &str = "x-koreshelf-password";

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum OpenError {
    /// Il file è cifrato e non è stata data una password
    NeedsPassword,
    /// La password data non è quella giusta
    WrongPassword,
    /// Cifratura che KoreShelf non sa aprire (es. la nuova di LibreOffice 25, o un DRM)
    Unsupported(String),
    Other(String),
}

impl fmt::Display for OpenError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            OpenError::NeedsPassword => f.write_str("password richiesta"),
            OpenError::WrongPassword => f.write_str("password errata"),
            OpenError::Unsupported(what) => write!(f, "cifratura non supportata: {what}"),
            OpenError::Other(e) => f.write_str(e),
        }
    }
}

impl From<String> for OpenError {
    fn from(e: String) -> Self {
        OpenError::Other(e)
    }
}

impl From<&str> for OpenError {
    fn from(e: &str) -> Self {
        OpenError::Other(e.to_string())
    }
}

/// La password dall'intestazione della richiesta (vuota = nessuna).
pub fn password_from_header(value: Option<&str>) -> Option<String> {
    let raw = value?.trim();
    if raw.is_empty() {
        return None;
    }
    let decoded = urlencoding::decode(raw).map(|c| c.into_owned()).unwrap_or_else(|_| raw.to_string());
    (!decoded.is_empty()).then_some(decoded)
}
