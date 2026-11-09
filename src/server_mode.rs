//! Modalità server (self-hosting, Docker): `koreshelf --server`.
//!
//! Configurazione tramite variabili d'ambiente:
//! * `KORESHELF_HOST`      indirizzo su cui ascoltare (predefinito `0.0.0.0`: tutta la rete)
//! * `KORESHELF_PORT`      porta (predefinita 3000; se è occupata è un errore, non se ne sceglie un'altra)
//! * `KORESHELF_DATA`      cartella dei dati (in Docker `/data`)
//! * `KORESHELF_PASSWORD`  se impostata, il browser chiede nome utente e password
//! * `KORESHELF_USERNAME`  nome utente (predefinito `koreshelf`)

use std::path::PathBuf;

pub const DEFAULT_PORT: u16 = 3000;
pub const DEFAULT_USER: &str = "koreshelf";

#[derive(Debug, Clone, PartialEq)]
pub struct Credentials {
    pub user: String,
    pub password: String,
}

#[derive(Debug, Clone, PartialEq)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
    pub data_dir: Option<PathBuf>,
    pub auth: Option<Credentials>,
}

/// `koreshelf --server` oppure `KORESHELF_SERVER=1`.
pub fn is_server_mode(args: &[String], get: impl Fn(&str) -> Option<String>) -> bool {
    args.iter().skip(1).any(|a| a == "--server") || get("KORESHELF_SERVER").map(|v| v.trim() == "1").unwrap_or(false)
}

/// Valore di una variabile d'ambiente, ignorando quelle vuote o fatte solo di spazi.
fn value(get: &impl Fn(&str) -> Option<String>, key: &str) -> Option<String> {
    get(key).map(|v| v.trim().to_string()).filter(|v| !v.is_empty())
}

impl ServerConfig {
    pub fn from_env(get: impl Fn(&str) -> Option<String>) -> Result<Self, String> {
        let host = value(&get, "KORESHELF_HOST").unwrap_or_else(|| "0.0.0.0".into());
        let port = match value(&get, "KORESHELF_PORT") {
            None => DEFAULT_PORT,
            Some(raw) => match raw.parse::<u16>() {
                Ok(p) if p > 0 => p,
                _ => return Err(format!("KORESHELF_PORT non valida: {raw:?} (serve un numero da 1 a 65535)")),
            },
        };
        let data_dir = value(&get, "KORESHELF_DATA").map(PathBuf::from);
        // la password non si "ripulisce" dagli spazi: potrebbero farne parte
        let auth = get("KORESHELF_PASSWORD").filter(|p| !p.is_empty()).map(|password| Credentials {
            user: value(&get, "KORESHELF_USERNAME").unwrap_or_else(|| DEFAULT_USER.into()),
            password,
        });
        Ok(ServerConfig { host, port, data_dir, auth })
    }
}

impl Credentials {
    /// Controlla l'intestazione `Authorization: Basic ...` inviata dal browser.
    pub fn accepts(&self, authorization: Option<&str>) -> bool {
        let Some(header) = authorization else { return false };
        let mut parts = header.trim().splitn(2, ' ');
        let scheme = parts.next().unwrap_or("");
        let encoded = parts.next().unwrap_or("").trim();
        if !scheme.eq_ignore_ascii_case("basic") {
            return false;
        }
        let Some(decoded) = decode_base64(encoded) else { return false };
        let Ok(text) = String::from_utf8(decoded) else { return false };
        let Some((user, password)) = text.split_once(':') else { return false };
        // confronto a tempo costante: non rivela quanti caratteri sono giusti
        same(user.as_bytes(), self.user.as_bytes()) & same(password.as_bytes(), self.password.as_bytes())
    }
}

fn same(a: &[u8], b: &[u8]) -> bool {
    let mut diff = a.len() ^ b.len();
    for i in 0..a.len().max(b.len()) {
        diff |= (*a.get(i).unwrap_or(&0) ^ *b.get(i).unwrap_or(&0)) as usize;
    }
    diff == 0
}

/// Decodifica base64 standard (con `=` finali), senza dipendenze esterne.
pub fn decode_base64(text: &str) -> Option<Vec<u8>> {
    fn digit(c: u8) -> Option<u32> {
        match c {
            b'A'..=b'Z' => Some((c - b'A') as u32),
            b'a'..=b'z' => Some((c - b'a' + 26) as u32),
            b'0'..=b'9' => Some((c - b'0' + 52) as u32),
            b'+' => Some(62),
            b'/' => Some(63),
            _ => None,
        }
    }
    let bytes = text.as_bytes();
    if bytes.len() % 4 != 0 {
        return None;
    }
    let mut out = Vec::with_capacity(bytes.len() / 4 * 3);
    for (n, chunk) in bytes.chunks(4).enumerate() {
        let last = n == bytes.len() / 4 - 1;
        let pad = chunk.iter().rev().take_while(|&&c| c == b'=').count();
        if pad > 2 || (pad > 0 && !last) {
            return None;
        }
        let mut acc = 0u32;
        for &c in &chunk[..4 - pad] {
            acc = (acc << 6) | digit(c)?;
        }
        acc <<= 6 * pad as u32;
        let decoded = [(acc >> 16) as u8, (acc >> 8) as u8, acc as u8];
        out.extend_from_slice(&decoded[..3 - pad]);
    }
    Some(out)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn env(pairs: &[(&str, &str)]) -> impl Fn(&str) -> Option<String> {
        let map: HashMap<String, String> = pairs.iter().map(|(k, v)| (k.to_string(), v.to_string())).collect();
        move |k: &str| map.get(k).cloned()
    }

    fn basic(user_pass: &str) -> String {
        // base64 di riferimento calcolato a mano per i casi dei test
        let table = [
            ("koreshelf:segreta", "a29yZXNoZWxmOnNlZ3JldGE="),
            ("koreshelf:sbagliata", "a29yZXNoZWxmOnNiYWdsaWF0YQ=="),
            ("altro:segreta", "YWx0cm86c2VncmV0YQ=="),
            ("anna:a:b:c", "YW5uYTphOmI6Yw=="),
        ];
        let b64 = table.iter().find(|(k, _)| *k == user_pass).map(|(_, v)| *v).expect("caso non previsto");
        format!("Basic {b64}")
    }

    #[test]
    fn server_mode_comes_from_the_flag_or_the_environment() {
        let none = env(&[]);
        assert!(is_server_mode(&["koreshelf".into(), "--server".into()], &none));
        assert!(is_server_mode(&["koreshelf".into()], env(&[("KORESHELF_SERVER", "1")])));
        assert!(!is_server_mode(&["koreshelf".into()], env(&[])));
        assert!(!is_server_mode(&["koreshelf".into()], env(&[("KORESHELF_SERVER", "0")])));
    }

    #[test]
    fn defaults_listen_on_the_whole_network_on_port_3000_without_password() {
        let cfg = ServerConfig::from_env(env(&[])).unwrap();
        assert_eq!(cfg, ServerConfig { host: "0.0.0.0".into(), port: 3000, data_dir: None, auth: None });
    }

    #[test]
    fn environment_values_are_used_and_blank_ones_ignored() {
        let cfg = ServerConfig::from_env(env(&[
            ("KORESHELF_HOST", " 127.0.0.1 "),
            ("KORESHELF_PORT", "8080"),
            ("KORESHELF_DATA", "/data"),
            ("KORESHELF_PASSWORD", ""),
        ]))
        .unwrap();
        assert_eq!(cfg.host, "127.0.0.1");
        assert_eq!(cfg.port, 8080);
        assert_eq!(cfg.data_dir, Some(PathBuf::from("/data")));
        assert_eq!(cfg.auth, None, "una password vuota non deve attivare la protezione");
    }

    #[test]
    fn a_wrong_port_is_a_clear_error() {
        for bad in ["abc", "0", "70000", "-1"] {
            let err = ServerConfig::from_env(env(&[("KORESHELF_PORT", bad)])).unwrap_err();
            assert!(err.contains("KORESHELF_PORT"), "messaggio poco chiaro per {bad:?}: {err}");
        }
    }

    #[test]
    fn password_turns_on_protection_with_a_default_user() {
        let cfg = ServerConfig::from_env(env(&[("KORESHELF_PASSWORD", "segreta")])).unwrap();
        assert_eq!(cfg.auth, Some(Credentials { user: "koreshelf".into(), password: "segreta".into() }));
        let cfg = ServerConfig::from_env(env(&[("KORESHELF_PASSWORD", "x"), ("KORESHELF_USERNAME", "anna")])).unwrap();
        assert_eq!(cfg.auth.unwrap().user, "anna");
    }

    #[test]
    fn only_the_right_user_and_password_are_accepted() {
        let creds = Credentials { user: "koreshelf".into(), password: "segreta".into() };
        assert!(creds.accepts(Some(&basic("koreshelf:segreta"))));
        assert!(creds.accepts(Some(&basic("koreshelf:segreta").replacen("Basic", "basic", 1))));
        assert!(!creds.accepts(Some(&basic("koreshelf:sbagliata"))));
        assert!(!creds.accepts(Some(&basic("altro:segreta"))));
        assert!(!creds.accepts(None));
        assert!(!creds.accepts(Some("Bearer a29yZXNoZWxmOnNlZ3JldGE=")));
        assert!(!creds.accepts(Some("Basic @@@")));
        // la password può contenere ':' (solo il primo separa utente e password)
        let anna = Credentials { user: "anna".into(), password: "a:b:c".into() };
        assert!(anna.accepts(Some(&basic("anna:a:b:c"))));
    }

    #[test]
    fn base64_decoding_matches_the_standard() {
        let cases = [("", ""), ("Zg==", "f"), ("Zm8=", "fo"), ("Zm9v", "foo"), ("Zm9vYg==", "foob"), ("Zm9vYmE=", "fooba"), ("Zm9vYmFy", "foobar")];
        for (input, output) in cases {
            assert_eq!(decode_base64(input).as_deref(), Some(output.as_bytes()), "decodifica di {input:?}");
        }
        for bad in ["Zm9", "@@@@", "Zg=a", "Z==="] {
            assert_eq!(decode_base64(bad), None, "{bad:?} non è base64 valido");
        }
    }
}
