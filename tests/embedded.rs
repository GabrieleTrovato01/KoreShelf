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
