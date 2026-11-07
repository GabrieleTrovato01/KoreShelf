//! Messaggi che il server manda al frontend, nelle 5 lingue di KoreShelf.
//! I testi sono estratti dai file `frontend/src/locales/*.js`.

use std::collections::HashMap;
use std::sync::LazyLock;

pub const SUPPORTED_LANGS: [&str; 5] = ["it", "en", "es", "fr", "de"];
pub const DEFAULT_LANG: &str = "it";

type Dictionary = HashMap<String, HashMap<String, String>>;

static MESSAGES: LazyLock<Dictionary> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../assets/server_messages.json"))
        .expect("assets/server_messages.json non valido")
});

pub fn t(lang: &str, key: &str) -> String {
    MESSAGES
        .get(lang)
        .or_else(|| MESSAGES.get(DEFAULT_LANG))
        .and_then(|dict| dict.get(key))
        .cloned()
        .unwrap_or_else(|| key.to_string())
}

pub fn t_with(lang: &str, key: &str, vars: &[(&str, String)]) -> String {
    let mut text = t(lang, key);
    for (name, value) in vars {
        text = text.replace(&format!("{{{name}}}"), value);
    }
    text
}

pub fn is_supported(lang: &str) -> bool {
    SUPPORTED_LANGS.contains(&lang)
}
