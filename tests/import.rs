//! Importazione degli ebook dall'inizio alla fine: il server vero, un file caricato come
//! fa l'interfaccia (multipart su /api/upload) e poi cosa finisce nel database, nella
//! cartella dati e cosa viene servito al lettore.
//!
//! Qui EPUB e PDF; i formati aggiunti dopo (FB2, TXT, Markdown, CBZ) sono in formats.rs.
//! Tutti i caricamenti usano `offline=1`, quindi niente rete.

mod common;

use common::*;
use std::io::Cursor;

// ------------------------------------------------------------------ EPUB

#[test]
fn epub_upload_keeps_metadata_cover_and_file() {
    let lib = Library::new("epub");
    let (status, res) = lib.upload("qualsiasi_nome.epub", &make_epub(&EpubSpec::default()));
    assert_eq!(status, 200, "{res}");
    let book = book_of(&res);

    assert_eq!(str_field(book, "title"), "Il Giardino dei Test");
    assert_eq!(str_field(book, "author"), "Ada Collaudo");
    assert!(str_field(book, "description").starts_with("Una trama abbastanza lunga"));
    assert!(book["pageCount"].as_i64().unwrap() > 0, "numero di pagine stimato: {book}");
    assert_eq!(book["progress"], 0.0);
    assert_eq!(book["tags"], serde_json::json!([]), "un libro nuovo è senza categoria");

    // Il file finisce in ebooks/ con il nome dell'id e la sua estensione
    let id = str_field(book, "id");
    let epub_path = str_field(book, "epubPath");
    assert_eq!(epub_path, format!("ebooks/{id}.epub"));
    assert!(lib.dir.join(epub_path).is_file());

    // La copertina interna viene salvata come JPEG e servita
    let cover_path = str_field(book, "coverPath");
    assert!(cover_path.starts_with("covers/") && cover_path.ends_with(".jpg"), "{cover_path}");
    let (status, head, bytes) = lib.get(&format!("/{cover_path}"));
    assert_eq!(status, 200);
    assert!(head.to_lowercase().contains("image/jpeg"), "{head}");
    image::load_from_memory(&bytes).expect("la copertina è un'immagine valida");

    // Il libro è nella libreria e nel database
    let books = lib.books();
    assert_eq!(books.len(), 1);
    assert_eq!(books[0]["id"], book["id"]);
    lib.assert_no_leftover_uploads();
}

#[test]
fn epub_without_cover_gets_none_offline() {
    let lib = Library::new("nocover");
    let (_, res) = lib.upload("libro.epub", &make_epub(&EpubSpec { cover: false, ..Default::default() }));
    let book = book_of(&res);
    assert!(book["coverPath"].is_null(), "offline nessuna copertina viene inventata: {book}");
    assert!(lib.files_in("covers").is_empty());
}

#[test]
fn epub_without_title_uses_the_file_name() {
    let lib = Library::new("filename");
    let spec = EpubSpec { title: None, author: None, ..Default::default() };
    let (_, res) = lib.upload("Il_nome_della_rosa - Umberto Eco.epub", &make_epub(&spec));
    let book = book_of(&res);
    assert_eq!(str_field(book, "title"), "Il nome della rosa");
    assert_eq!(str_field(book, "author"), "Umberto Eco");
}

#[test]
fn epub_with_junk_title_uses_the_file_name() {
    let lib = Library::new("junk");
    let spec = EpubSpec { title: Some("a3f9c0d1e2b3a4f5c6d7e8f9"), ..Default::default() };
    let (_, res) = lib.upload("Racconti_brevi.epub", &make_epub(&spec));
    assert_eq!(str_field(book_of(&res), "title"), "Racconti brevi");
}

#[test]
fn epub_without_description_gets_the_placeholder() {
    let lib = Library::new("nodesc");
    let (_, res) = lib.upload("x.epub", &make_epub(&EpubSpec { description: None, ..Default::default() }));
    let description = str_field(book_of(&res), "description");
    assert!(!description.is_empty(), "c'è sempre un testo per la trama");
}

#[test]
fn damaged_epub_is_still_imported_by_file_name() {
    let lib = Library::new("damaged");
    // Comincia come uno ZIP ma non lo è: il parser fallisce, l'app no.
    let mut bytes = b"PK\x03\x04".to_vec();
    bytes.extend(std::iter::repeat(0xAB).take(4096));
    let (status, res) = lib.upload("Libro_Rovinato.epub", &bytes);
    assert_eq!(status, 200, "{res}");
    let book = book_of(&res);
    assert_eq!(str_field(book, "title"), "Libro Rovinato");
    assert!(book["coverPath"].is_null());
    lib.assert_no_leftover_uploads();
}

#[test]
fn kepub_is_already_accepted_as_an_epub() {
    // I KEPUB di Kobo si chiamano "nome.kepub.epub": per il server sono già EPUB.
    let lib = Library::new("kepub");
    let spec = EpubSpec { title: Some("Libro Kobo"), ..Default::default() };
    let (status, res) = lib.upload("Libro Kobo.kepub.epub", &make_epub(&spec));
    assert_eq!(status, 200, "{res}");
    let book = book_of(&res);
    assert_eq!(str_field(book, "title"), "Libro Kobo");
    assert!(str_field(book, "epubPath").ends_with(".epub"), "il lettore lo apre con epub.js");
}

// ------------------------------------------------------------------ PDF

#[test]
fn pdf_upload_reads_info_and_page_count() {
    let lib = Library::new("pdf");
    let pdf = make_pdf(Some("Manuale di Collaudo"), Some("Bruno Verifica"), 12, "Testo della pagina.");
    let (status, res) = lib.upload("manuale.pdf", &pdf);
    assert_eq!(status, 200, "{res}");
    let book = book_of(&res);
    assert_eq!(str_field(book, "title"), "Manuale di Collaudo");
    assert_eq!(str_field(book, "author"), "Bruno Verifica");
    assert_eq!(book["pageCount"].as_i64(), Some(12), "le pagine vere del PDF: {book}");
    let id = str_field(book, "id");
    assert_eq!(str_field(book, "epubPath"), format!("ebooks/{id}.pdf"));
    // La copertina dei PDF la fotografa il frontend dalla prima pagina
    assert!(book["coverPath"].is_null());
    lib.assert_no_leftover_uploads();
}

#[test]
fn pdf_without_title_uses_the_file_name() {
    let lib = Library::new("pdfname");
    let (_, res) = lib.upload("La-città-di-vetro-Auster.pdf", &make_pdf(None, None, 3, "x"));
    let book = book_of(&res);
    assert_eq!(str_field(book, "title"), "La città di vetro");
    assert_eq!(str_field(book, "author"), "Auster");
}

// ------------------------------------------------------------------ parser, senza server


#[test]
fn pdf_parser_finds_the_isbn_in_the_first_pages() {
    let path = temp_file("isbn.pdf", &make_pdf(Some("Con ISBN"), None, 2, "ISBN 978-88-04-66860-2"));
    let info = koreshelf::pdf::read_pdf(&path).unwrap();
    let _ = std::fs::remove_file(&path);
    assert_eq!(info.title.as_deref(), Some("Con ISBN"));
    assert_eq!(info.page_count, Some(2));
    assert_eq!(info.isbn.as_deref(), Some("9788804668602"));
    assert!(info.text_length > 0, "il testo delle prime pagine viene letto");
}

#[test]
fn epub_parser_reads_isbn_cover_and_text_length() {
    let spec = EpubSpec { isbn: Some("978-88-04-66860-2"), ..Default::default() };
    let path = temp_file("full.epub", &make_epub(&spec));
    let info = koreshelf::epub::read_epub(&path).unwrap();
    let _ = std::fs::remove_file(&path);
    assert_eq!(info.title.as_deref(), Some("Il Giardino dei Test"));
    assert_eq!(info.author.as_deref(), Some("Ada Collaudo"));
    assert_eq!(info.isbn.as_deref(), Some("9788804668602"));
    let cover = info.cover.expect("copertina trovata tramite <meta name=cover>");
    assert_eq!(image::load_from_memory(&cover).unwrap().width(), 600);
    // 3 capitoli da ~15.000 caratteri ciascuno
    assert!(info.text_length > 40_000, "lunghezza del testo: {}", info.text_length);
}

#[test]
fn epub_parser_rejects_what_is_not_an_epub() {
    let not_zip = temp_file("no.epub", b"niente");
    assert!(koreshelf::epub::read_epub(&not_zip).is_err());
    let empty_zip = {
        let zip = zip::ZipWriter::new(Cursor::new(Vec::new()));
        temp_file("empty.epub", &zip.finish().unwrap().into_inner())
    };
    assert!(koreshelf::epub::read_epub(&empty_zip).is_err(), "uno ZIP senza OPF non è un EPUB");
    let _ = std::fs::remove_file(not_zip);
    let _ = std::fs::remove_file(empty_zip);
}

// ------------------------------------------------------------------ servizio dei file al lettore

#[test]
fn ebook_files_are_served_with_byte_ranges() {
    // pdf.js ed epub.js leggono i file a pezzi: le richieste Range devono funzionare.
    let lib = Library::new("range");
    let original = make_epub(&EpubSpec::default());
    let (_, res) = lib.upload("x.epub", &original);
    let path = format!("/{}", str_field(book_of(&res), "epubPath"));

    let (status, _, whole) = lib.get(&path);
    assert_eq!(status, 200);
    assert_eq!(whole, original, "il file servito è identico a quello caricato");

    let (status, head, part) = lib.request("GET", &path, "Range: bytes=0-3\r\n", b"");
    assert_eq!(status, 206, "{head}");
    assert_eq!(part, b"PK\x03\x04");
    assert!(head.to_lowercase().contains(&format!("content-range: bytes 0-3/{}", original.len())), "{head}");
}

// ------------------------------------------------------------------ rifiuti

#[test]
fn file_whose_content_does_not_match_the_extension_is_rejected() {
    let lib = Library::new("fake");
    for name in ["finto.epub", "finto.pdf"] {
        let (status, res) = lib.upload(name, b"solo testo, nessun ebook qui dentro");
        assert_eq!(status, 400, "{name}: {res}");
        assert_eq!(res["success"], false);
    }
    assert!(lib.books().is_empty());
    assert!(lib.files_in("ebooks").is_empty());
    lib.assert_no_leftover_uploads();
}

#[test]
fn unknown_formats_are_rejected() {
    // Gli altri formati hanno i loro test in formats.rs e protected.rs:
    // qui restano solo quelli che KoreShelf non sa leggere.
    let lib = Library::new("formats");
    for name in ["documento.doc", "programma.exe", "foglio.xlsx", "senza_estensione", "libro.lit", "fumetto.cbt"] {
        let (status, res) = lib.upload(name, b"PK contenuto qualsiasi");
        assert_eq!(status, 400, "{name}: {res}");
        assert_eq!(res["success"], false, "{name}");
        assert!(res["message"].as_str().is_some_and(|m| m.contains("FB2") && m.contains("CBZ")), "{name}: il messaggio elenca i formati: {res}");
    }
    assert!(lib.books().is_empty());
    lib.assert_no_leftover_uploads();
}

#[test]
fn upload_without_file_is_rejected() {
    let lib = Library::new("nofile");
    let boundary = "b0undary";
    let body = format!("--{boundary}\r\nContent-Disposition: form-data; name=\"offline\"\r\n\r\n1\r\n--{boundary}--\r\n");
    let headers = format!("Content-Type: multipart/form-data; boundary={boundary}\r\n");
    let (status, _, _) = lib.request("POST", "/api/upload", &headers, body.as_bytes());
    assert_eq!(status, 400);
}

#[test]
fn the_same_title_is_not_imported_twice() {
    let lib = Library::new("dup");
    let epub = make_epub(&EpubSpec::default());
    let (_, first) = lib.upload("uno.epub", &epub);
    book_of(&first);
    let (status, second) = lib.upload("due.epub", &epub);
    assert_eq!(status, 200);
    assert_eq!(second["success"], false);
    assert_eq!(second["duplicate"], true, "{second}");
    assert!(second["message"].as_str().unwrap().contains("già presente"), "il frontend riconosce questa frase");

    assert_eq!(lib.books().len(), 1);
    assert_eq!(lib.files_in("ebooks").len(), 1, "nessun file in più");
    assert_eq!(lib.files_in("covers").len(), 1, "la copertina del doppione viene scartata");
    lib.assert_no_leftover_uploads();
}

#[test]
fn several_books_of_both_formats_live_together() {
    let lib = Library::new("many");
    for i in 1..=3 {
        let title = format!("Volume numero {i}");
        let spec = EpubSpec { title: Some(&title), ..Default::default() };
        book_of(&lib.upload(&format!("v{i}.epub"), &make_epub(&spec)).1);
    }
    book_of(&lib.upload("doc.pdf", &make_pdf(Some("Un documento PDF"), None, 4, "x")).1);
    let books = lib.books();
    assert_eq!(books.len(), 4);
    let mut ids: Vec<&str> = books.iter().map(|b| b["id"].as_str().unwrap()).collect();
    ids.sort();
    ids.dedup();
    assert_eq!(ids.len(), 4, "ogni libro ha un id diverso");
    assert_eq!(lib.files_in("ebooks").len(), 4);
}

// ------------------------------------------------------------------ dopo l'importazione

#[test]
fn deleting_a_book_removes_its_files() {
    let lib = Library::new("delete");
    let (_, res) = lib.upload("x.epub", &make_epub(&EpubSpec::default()));
    let book = book_of(&res).clone();
    let id = str_field(&book, "id");
    assert_eq!(lib.files_in("ebooks").len(), 1);
    assert_eq!(lib.files_in("covers").len(), 1);

    let (status, value) = lib.json("DELETE", &format!("/api/books/{id}"));
    assert_eq!(status, 200, "{value}");
    assert!(lib.books().is_empty());
    assert!(lib.files_in("ebooks").is_empty(), "il file dell'ebook viene cancellato");
    assert!(lib.files_in("covers").is_empty(), "anche la copertina");
    let (status, _, _) = lib.get(&format!("/{}", str_field(&book, "epubPath")));
    assert_eq!(status, 404);
}

#[test]
fn imported_book_survives_a_restart() {
    // Il database è su disco: riaprendo la stessa cartella il libro c'è ancora.
    let lib = Library::new("restart");
    let (_, res) = lib.upload("x.epub", &make_epub(&EpubSpec::default()));
    let id = str_field(book_of(&res), "id").to_string();
    let db = koreshelf::db::Db::open(&lib.dir.join("koreshelf.db")).unwrap();
    let stored = db.get(&id).unwrap().expect("il libro è nel database");
    assert_eq!(stored.title, "Il Giardino dei Test");
    assert_eq!(stored.epub_path.as_deref(), Some(format!("ebooks/{id}.epub").as_str()));
}

#[test]
fn files_with_unusual_names_are_handled() {
    let lib = Library::new("names");
    let spec = |t| EpubSpec { title: Some(t), ..Default::default() };
    for (name, title) in [
        ("Città & Caffè (2ª ed.).epub", "Primo titolo strano"),
        ("..\\..\\fuori.epub", "Secondo titolo strano"),
        ("cartella/sotto/libro.EPUB", "Terzo titolo strano"),
    ] {
        let (status, res) = lib.upload(name, &make_epub(&spec(title)));
        assert_eq!(status, 200, "{name}: {res}");
        let book = book_of(&res);
        let path = str_field(book, "epubPath");
        assert!(path.starts_with("ebooks/book_") && path.ends_with(".epub"), "{name} → {path}");
    }
    // Nessun file è uscito dalla cartella dati
    assert_eq!(lib.files_in("ebooks").len(), 3);
    assert!(!lib.dir.parent().unwrap().join("fuori.epub").exists());
}
