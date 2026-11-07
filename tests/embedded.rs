//! Il backend di KoreShelf si può avviare come libreria su una cartella dati qualsiasi:
//! è così che lo usa l'app mobile (Android/iOS), dove la cartella la decide il sistema.

use std::io::{Read, Write};
use std::net::TcpStream;
use std::path::PathBuf;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

fn temp_dir(name: &str) -> PathBuf {
    let nanos = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_nanos();
    let dir = std::env::temp_dir().join(format!("koreshelf-{name}-{nanos}"));
    std::fs::create_dir_all(&dir).unwrap();
    dir
}

fn http_get(url: &str, path: &str) -> String {
    let addr = url.trim_start_matches("http://").trim_end_matches('/');
    let mut stream = TcpStream::connect(addr).expect("connessione al server");
    stream.set_read_timeout(Some(Duration::from_secs(5))).unwrap();
    write!(stream, "GET {path} HTTP/1.1\r\nHost: {addr}\r\nConnection: close\r\n\r\n").unwrap();
    let mut response = String::new();
    stream.read_to_string(&mut response).unwrap();
    response
}

#[test]
fn embedded_server_runs_in_any_data_dir() {
    let dir = temp_dir("embedded");
    let url = koreshelf::start_embedded(dir.clone(), 0).expect("il server deve partire");
    assert!(url.starts_with("http://127.0.0.1:"), "{url}");

    let ping = http_get(&url, "/api/ping");
    assert!(ping.starts_with("HTTP/1.1 200"), "{ping}");
    assert!(ping.contains("\"KoreShelf\""), "{ping}");

    let books = http_get(&url, "/api/books");
    assert!(books.trim_end().ends_with("[]"), "libreria nuova e vuota: {books}");

    // I dati finiscono nella cartella indicata, non in quella di sistema
    assert!(dir.join("koreshelf.db").is_file());
    assert!(dir.join("covers").is_dir() && dir.join("ebooks").is_dir());

    // L'interfaccia è servita dallo stesso server
    let index = http_get(&url, "/");
    assert!(index.contains("<html") || index.contains("<!DOCTYPE"), "pagina principale mancante");
}

#[test]
fn two_embedded_servers_can_coexist() {
    let a = koreshelf::start_embedded(temp_dir("a"), 0).unwrap();
    let b = koreshelf::start_embedded(temp_dir("b"), 0).unwrap();
    assert_ne!(a, b);
    assert!(http_get(&a, "/api/ping").contains("KoreShelf"));
    assert!(http_get(&b, "/api/ping").contains("KoreShelf"));
}

fn http_post_json(url: &str, path: &str, body: &str, with_app_header: bool) -> String {
    let addr = url.trim_start_matches("http://").trim_end_matches('/');
    let mut stream = TcpStream::connect(addr).expect("connessione al server");
    stream.set_read_timeout(Some(Duration::from_secs(5))).unwrap();
    let header = if with_app_header { "X-KoreShelf: 1\r\n" } else { "" };
    write!(stream, "POST {path} HTTP/1.1\r\nHost: {addr}\r\nContent-Type: application/json\r\n{header}Content-Length: {}\r\nConnection: close\r\n\r\n{body}", body.len()).unwrap();
    let mut response = String::new();
    stream.read_to_string(&mut response).unwrap();
    response
}

/// Sul telefono i link esterni (Amazon, GitHub) li apre l'app, non la WebView: l'interfaccia
/// chiede al server interno, che passa il link all'app. Solo link web, solo dall'interfaccia.
#[test]
fn external_links_are_handed_to_the_app() {
    use std::sync::{Arc, Mutex};
    let opened: Arc<Mutex<Vec<String>>> = Arc::default();
    let sink = opened.clone();
    let url = koreshelf::start_embedded_with(temp_dir("links"), 0, Arc::new(move |link: String| {
        sink.lock().unwrap().push(link);
    }))
    .unwrap();

    let ok = http_post_json(&url, "/api/open-external", r#"{"url":"https://www.amazon.it/s?k=dune"}"#, true);
    assert!(ok.starts_with("HTTP/1.1 200"), "{ok}");

    for bad in [r#"{"url":"javascript:alert(1)"}"#, r#"{"url":"file:///etc/passwd"}"#, r#"{"url":""}"#] {
        let r = http_post_json(&url, "/api/open-external", bad, true);
        assert!(r.starts_with("HTTP/1.1 400"), "schema non permesso: {bad} → {r}");
    }
    let foreign = http_post_json(&url, "/api/open-external", r#"{"url":"https://example.com"}"#, false);
    assert!(foreign.starts_with("HTTP/1.1 403"), "senza l'intestazione dell'app: {foreign}");

    std::thread::sleep(Duration::from_millis(200));
    assert_eq!(*opened.lock().unwrap(), vec!["https://www.amazon.it/s?k=dune".to_string()]);
}
