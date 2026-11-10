//! Compatibilità: i database della vecchia versione Node.js e le traduzioni.
//!
//! * Un `koreshelf.db` creato da server.js deve aprirsi così com'è, anche con i dati "strani"
//!   che la versione Node poteva scriverci.
//! * I messaggi del server (`assets/server_messages.json`) sono una copia di quelli del
//!   frontend: aggiungendo i nuovi formati cambierà almeno `errFormat`, e le due copie
//!   devono restare identiche in tutte e cinque le lingue.

mod common;

use common::*;
use rusqlite::Connection;
use serde_json::{json, Value};
use std::collections::{BTreeMap, BTreeSet};
use std::path::Path;

// ------------------------------------------------------------------ database della versione Node

/// Lo schema originale di server.js, prima che esistesse la colonna `highlights`.
const NODE_SCHEMA_WITHOUT_HIGHLIGHTS: &str = "
    CREATE TABLE books (
        id TEXT PRIMARY KEY, title TEXT NOT NULL, author TEXT, description TEXT,
        coverPath TEXT, epubPath TEXT, pageCount INTEGER DEFAULT 350,
        progress REAL DEFAULT 0, rating INTEGER DEFAULT 0, review TEXT,
        tags TEXT DEFAULT '[]'
    );";

fn legacy_library(name: &str) -> std::path::PathBuf {
    let dir = std::env::temp_dir().join(format!("koreshelf-legacy-{name}-{}", std::process::id()));
    let _ = std::fs::remove_dir_all(&dir);
    std::fs::create_dir_all(&dir).unwrap();
    let conn = Connection::open(dir.join("koreshelf.db")).unwrap();
    conn.execute_batch(NODE_SCHEMA_WITHOUT_HIGHLIGHTS).unwrap();
    // Valori come li lasciava la versione Node: numeri come testo, JSON codificato due volte,
    // tag non stringa, campi nulli.
    conn.execute_batch(
        r#"
        INSERT INTO books VALUES ('1', 'Normale', 'Autore', 'Trama', 'covers/1.jpg', 'ebooks/1.epub',
                                  220, 0.5, 4, 'Bello', '["Gialli","Preferiti"]');
        INSERT INTO books VALUES ('2', 'Numeri come testo', NULL, NULL, NULL, 'ebooks/2.pdf',
                                  '180', '0.25', '3.6', NULL, '"[\"Saggi\"]"');
        INSERT INTO books VALUES ('3', 'Tag strani', NULL, NULL, NULL, 'ebooks/3.epub',
                                  NULL, NULL, NULL, NULL, '[2024, null, "Viaggi"]');
        INSERT INTO books VALUES ('4', 'JSON rotto', NULL, NULL, NULL, 'ebooks/4.epub',
                                  'tante', 'metà', '', NULL, 'non è json');
        "#,
    )
    .unwrap();
    dir
}

#[test]
fn a_node_database_opens_and_reads_every_row() {
    let dir = legacy_library("rows");
    let db = koreshelf::db::Db::open(&dir.join("koreshelf.db")).expect("il vecchio DB si apre");
    let books: BTreeMap<String, koreshelf::db::Book> =
        db.all_books().unwrap().into_iter().map(|b| (b.id.clone(), b)).collect();
    assert_eq!(books.len(), 4, "nessuna riga persa");

    let normal = &books["1"];
    assert_eq!((normal.page_count, normal.progress, normal.rating), (220, 0.5, 4));
    assert_eq!(normal.tags, vec!["Gialli", "Preferiti"]);
    assert!(normal.highlights.is_empty(), "la colonna highlights viene aggiunta vuota");

    let as_text = &books["2"];
    assert_eq!((as_text.page_count, as_text.progress, as_text.rating), (180, 0.25, 4), "numeri salvati come testo");
    assert_eq!(as_text.tags, vec!["Saggi"], "JSON codificato due volte");

    assert_eq!(books["3"].tags, vec!["2024", "Viaggi"], "tag numerici diventano testo, i null spariscono");
    assert_eq!(books["3"].page_count, 350, "pagine mancanti: valore predefinito");

    let broken = &books["4"];
    assert_eq!((broken.page_count, broken.progress, broken.rating), (350, 0.0, 0), "valori illeggibili: predefiniti");
    assert!(broken.tags.is_empty());
    let _ = std::fs::remove_dir_all(dir);
}

#[test]
fn a_node_database_can_be_reopened_and_written() {
    let dir = legacy_library("reopen");
    let path = dir.join("koreshelf.db");
    // Aprirlo più volte non deve fallire (la colonna highlights c'è già dalla seconda volta)
    for _ in 0..3 {
        koreshelf::db::Db::open(&path).unwrap();
    }
    let db = koreshelf::db::Db::open(&path).unwrap();
    let mut book = db.get("2").unwrap().unwrap();
    book.highlights.push(json!({ "cfi": "x", "text": "y", "date": 1 }));
    db.upsert(&book).unwrap();
    db.set_progress("2", 0.9).unwrap();
    let again = koreshelf::db::Db::open(&path).unwrap().get("2").unwrap().unwrap();
    assert_eq!(again.highlights.len(), 1);
    assert_eq!(again.progress, 0.9);
    assert_eq!(again.tags, vec!["Saggi"], "riscritto in JSON normale");

    // Lo schema resta quello di server.js: la vecchia versione potrebbe ancora leggerlo
    let conn = Connection::open(&path).unwrap();
    let columns: Vec<String> = conn
        .prepare("SELECT name FROM pragma_table_info('books') ORDER BY cid")
        .unwrap()
        .query_map([], |r| r.get(0))
        .unwrap()
        .map(Result::unwrap)
        .collect();
    assert_eq!(
        columns,
        ["id", "title", "author", "description", "coverPath", "epubPath", "pageCount", "progress", "rating", "review", "tags", "highlights"]
    );
    let _ = std::fs::remove_dir_all(dir);
}

#[test]
fn the_server_serves_a_node_library_as_is() {
    let dir = legacy_library("served");
    let url = koreshelf::start_embedded(dir.clone(), 0).unwrap();
    let lib = Library { dir: dir.clone(), url };
    let books = lib.books();
    assert_eq!(books.len(), 4);
    let two = lib.book("2");
    assert_eq!(two["pageCount"], 180);
    assert_eq!(two["tags"], json!(["Saggi"]));
    assert_eq!(two["highlights"], json!([]));
    // e le rotte di scrittura funzionano sui libri importati dal vecchio DB
    assert_eq!(lib.send_json("PUT", "/api/books/4/progress", &json!({ "progress": 0.3 })).0, 200);
    assert_eq!(lib.book("4")["progress"], 0.3);
    // `lib` cancella la cartella quando esce dallo scope
}

// ------------------------------------------------------------------ traduzioni

const LANGS: [&str; 5] = ["it", "en", "es", "fr", "de"];

/// Chiavi presenti SOLO nel file italiano ad oggi. Sono messaggi di console, mai mostrati
/// nell'interfaccia. Questa lista può solo accorciarsi: una chiave nuova che manca in qualche
/// lingua fa fallire il test, e una chiave di questa lista che viene tradotta va tolta da qui.
const KNOWN_ONLY_IN_ITALIAN: [&str; 3] = ["logEpubExtract", "logPdfExtract", "readerError"];

fn root() -> &'static Path {
    Path::new(env!("CARGO_MANIFEST_DIR"))
}

/// Legge `frontend/src/locales/<lang>.js` (righe `chiave: "testo",`) come mappa.
fn frontend_locale(lang: &str) -> BTreeMap<String, String> {
    let source = std::fs::read_to_string(root().join(format!("frontend/src/locales/{lang}.js"))).unwrap();
    let entry = regex::Regex::new(r#"(?m)^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)"#).unwrap();
    entry
        .captures_iter(&source)
        .map(|c| {
            let raw = c.get(2).or(c.get(3)).or(c.get(4)).unwrap().as_str();
            let value = raw.replace("\\\"", "\"").replace("\\'", "'").replace("\\n", "\n").replace("\\\\", "\\");
            (c[1].to_string(), value)
        })
        .collect()
}

fn frontend_keys(lang: &str) -> BTreeSet<String> {
    // Tutte le chiavi, anche quelle con valori non stringa (funzioni, numeri)
    let source = std::fs::read_to_string(root().join(format!("frontend/src/locales/{lang}.js"))).unwrap();
    regex::Regex::new(r"(?m)^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:")
        .unwrap()
        .captures_iter(&source)
        .map(|c| c[1].to_string())
        .collect()
}

#[test]
fn every_language_has_the_same_interface_keys() {
    let italian = frontend_keys("it");
    assert!(italian.len() > 100, "il file italiano è stato letto: {} chiavi", italian.len());
    for lang in &LANGS[1..] {
        let keys = frontend_keys(lang);
        let missing: Vec<&String> =
            italian.difference(&keys).filter(|k| !KNOWN_ONLY_IN_ITALIAN.contains(&k.as_str())).collect();
        let extra: Vec<&String> = keys.difference(&italian).collect();
        assert!(missing.is_empty(), "{lang}.js non traduce: {missing:?}");
        assert!(extra.is_empty(), "{lang}.js ha chiavi che l'italiano non ha: {extra:?}");
        for known in KNOWN_ONLY_IN_ITALIAN {
            assert!(
                !keys.contains(known),
                "{lang}.js ora traduce {known}: toglilo da KNOWN_ONLY_IN_ITALIAN"
            );
        }
    }
}

#[test]
fn server_messages_match_the_frontend_translations() {
    let raw = std::fs::read_to_string(root().join("assets/server_messages.json")).unwrap();
    let server: BTreeMap<String, BTreeMap<String, String>> = serde_json::from_str(&raw).unwrap();
    assert_eq!(server.keys().cloned().collect::<BTreeSet<_>>(), LANGS.iter().map(|l| l.to_string()).collect());

    let italian_keys: BTreeSet<&String> = server["it"].keys().collect();
    for lang in LANGS {
        let messages = &server[lang];
        assert_eq!(messages.keys().collect::<BTreeSet<_>>(), italian_keys, "{lang}: stesse chiavi dell'italiano");
        let frontend = frontend_locale(lang);
        for (key, text) in messages {
            let front = frontend.get(key).unwrap_or_else(|| panic!("{lang}: {key} manca nel frontend"));
            assert_eq!(front, text, "{lang}.{key}: server_messages.json e {lang}.js devono coincidere");
        }
    }
}

#[test]
fn the_server_answers_in_the_chosen_language() {
    let lib = Library::new("lang");
    let raw = std::fs::read_to_string(root().join("assets/server_messages.json")).unwrap();
    let server: Value = serde_json::from_str(&raw).unwrap();
    for lang in LANGS {
        assert_eq!(lib.send_json("POST", "/api/sync-language", &json!({ "lang": lang })).0, 200);
        let (status, res) = lib.upload("formato.docx", b"PK");
        assert_eq!(status, 400);
        assert_eq!(res["message"], server[lang]["errFormat"], "{lang}");
    }
    // Una lingua sconosciuta viene ignorata: resta l'ultima valida
    lib.send_json("POST", "/api/sync-language", &json!({ "lang": "xx" }));
    assert_eq!(lib.upload("formato.docx", b"PK").1["message"], server["de"]["errFormat"]);
}
