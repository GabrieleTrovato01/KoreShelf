//! La vita di un libro DOPO l'importazione: avanzamento della lettura, recensioni,
//! sottolineature, scaffali, ricerca, modifica dei metadati e copertine.
//!
//! Sono le rotte che usano il lettore e la libreria 3D, e devono comportarsi allo stesso modo
//! qualunque sia il formato del file. Per questo quasi ogni test gira su tutti i formati di
//! `formats()`: un formato nuovo si aggiunge lì.

mod common;

use common::*;
use serde_json::{json, Value};

/// Un esemplare di ogni formato supportato oggi: (nome del file, contenuto).
fn formats() -> Vec<(&'static str, Vec<u8>)> {
    vec![
        ("romanzo.epub", make_epub(&EpubSpec { title: Some("Romanzo di Prova"), ..Default::default() })),
        ("Libro Kobo.kepub.epub", make_epub(&EpubSpec { title: Some("Romanzo Kobo"), ..Default::default() })),
        ("manuale.pdf", make_pdf(Some("Manuale di Prova"), Some("Bruno Verifica"), 5, "Testo.")),
        ("racconto.fb2", make_fb2("Racconto FB2", ("Carla", "Fictionbook"), None).into_bytes()),
        ("Appunti di testo.txt", "Capitolo 1\n\nTesto semplice.\n".as_bytes().to_vec()),
        ("note.md", "# Note in Markdown\n\nTesto.\n".as_bytes().to_vec()),
        ("fumetto.cbz", make_cbz(4, Some("<ComicInfo><Title>Fumetto di Collaudo</Title></ComicInfo>"))),
    ]
}

/// Per ogni formato: una libreria nuova con dentro un solo libro di quel formato.
fn for_each_format(check: impl Fn(&str, &Library, &Value)) {
    for (name, bytes) in formats() {
        let lib = Library::new("lib");
        let book = lib.import(name, &bytes);
        check(name, &lib, &book);
    }
}

fn id_of(book: &Value) -> String {
    str_field(book, "id").to_string()
}

// ------------------------------------------------------------------ lettura

#[test]
fn reading_progress_is_saved_and_kept() {
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        let (status, res) = lib.send_json("PUT", &format!("/api/books/{id}/progress"), &json!({ "progress": 0.42 }));
        assert_eq!(status, 200, "{name}: {res}");
        assert_eq!(lib.book(&id)["progress"], 0.42, "{name}");

        // Il frontend a volte manda il numero come testo
        lib.send_json("PUT", &format!("/api/books/{id}/progress"), &json!({ "progress": "0.75" }));
        assert_eq!(lib.book(&id)["progress"], 0.75, "{name}: progresso come stringa");

        // Valori non numerici non rompono nulla: si torna all'inizio
        lib.send_json("PUT", &format!("/api/books/{id}/progress"), &json!({ "progress": "boh" }));
        assert_eq!(lib.book(&id)["progress"], 0.0, "{name}");
    });
}

#[test]
fn review_and_rating_are_saved() {
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        let body = json!({ "rating": 3.6, "reviewText": "Bello, ma il finale è affrettato." });
        let (status, _) = lib.send_json("PUT", &format!("/api/books/{id}/review"), &body);
        assert_eq!(status, 200, "{name}");
        let stored = lib.book(&id);
        assert_eq!(stored["rating"], 4, "{name}: le stelle sono arrotondate");
        assert_eq!(stored["review"], "Bello, ma il finale è affrettato.", "{name}");
    });
}

#[test]
fn highlights_are_added_and_removed_one_by_one() {
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        let path = format!("/api/books/{id}/highlights");
        for (cfi, text) in [("epubcfi(/6/4!/4/2,/1:0,/1:20)", "prima frase"), ("pdf-p2-o10", "seconda frase")] {
            let (status, _) = lib.send_json("POST", &path, &json!({ "cfi": cfi, "text": text }));
            assert_eq!(status, 200, "{name}");
        }
        let highlights = lib.book(&id)["highlights"].as_array().cloned().unwrap();
        assert_eq!(highlights.len(), 2, "{name}");
        assert_eq!(highlights[0]["text"], "prima frase");
        assert!(highlights[0]["date"].as_u64().is_some_and(|d| d > 0), "{name}: c'è la data");

        let (status, _) = lib.send_json("DELETE", &path, &json!({ "cfi": "epubcfi(/6/4!/4/2,/1:0,/1:20)" }));
        assert_eq!(status, 200, "{name}");
        let left = lib.book(&id)["highlights"].as_array().cloned().unwrap();
        assert_eq!(left.len(), 1, "{name}: si toglie solo quella indicata");
        assert_eq!(left[0]["cfi"], "pdf-p2-o10");
    });
}

// ------------------------------------------------------------------ scaffali e ricerca

#[test]
fn a_tag_becomes_the_shelf_of_the_book() {
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        let path = format!("/api/books/{id}/tags");
        assert_eq!(lib.send_json("POST", &path, &json!({ "tag": "Gialli" })).0, 200, "{name}");
        assert_eq!(lib.send_json("POST", &path, &json!({ "tag": "Preferiti" })).0, 200, "{name}");
        assert_eq!(lib.book(&id)["tags"], json!(["Preferiti", "Gialli"]), "{name}: l'ultimo tag è lo scaffale");

        // Lo stesso tag con maiuscole diverse non viene duplicato
        let (status, res) = lib.send_json("POST", &path, &json!({ "tag": "gialli" }));
        assert_eq!((status, &res["success"]), (200, &json!(true)), "{name}");
        assert_eq!(lib.book(&id)["tags"].as_array().unwrap().len(), 2, "{name}");

        let (status, _) = lib.send_json("POST", &path, &json!({ "tag": "   " }));
        assert_eq!(status, 400, "{name}: tag vuoto rifiutato");
    });
}

#[test]
fn shelves_can_be_renamed_and_deleted() {
    let lib = Library::new("shelves");
    let mut ids = Vec::new();
    for (name, bytes) in formats() {
        let id = id_of(&lib.import(name, &bytes));
        lib.send_json("POST", &format!("/api/books/{id}/tags"), &json!({ "tag": "Da leggere" }));
        ids.push(id);
    }
    let body = json!({ "oldName": "Da leggere", "newName": "In lettura", "action": "rename" });
    let (status, res) = lib.send_json("PUT", "/api/categories", &body);
    assert_eq!(status, 200, "{res}");
    assert_eq!(res["success"], true);
    for id in &ids {
        assert_eq!(lib.book(id)["tags"], json!(["In lettura"]), "tutti i formati cambiano scaffale");
    }

    let (_, res) = lib.send_json("PUT", "/api/categories", &json!({ "oldName": "In lettura", "action": "delete" }));
    assert_eq!(res["success"], true, "{res}");
    for id in &ids {
        assert_eq!(lib.book(id)["tags"], json!([]), "il libro resta, senza scaffale");
    }
    assert_eq!(lib.books().len(), ids.len(), "eliminare uno scaffale non elimina i libri");

    let (status, res) = lib.send_json("PUT", "/api/categories", &json!({ "oldName": "Inesistente", "action": "delete" }));
    assert_eq!((status, &res["success"]), (200, &json!(false)), "scaffale sconosciuto: {res}");
}

#[test]
fn search_finds_books_of_every_format() {
    let lib = Library::new("search");
    for (name, bytes) in formats() {
        lib.import(name, &bytes);
    }
    let search = |q: &str| {
        let (status, value) = lib.json("GET", &format!("/api/books/search?q={q}"));
        assert_eq!(status, 200);
        let mut titles: Vec<String> =
            value.as_array().unwrap().iter().map(|b| b["title"].as_str().unwrap().to_string()).collect();
        titles.sort();
        titles
    };
    assert_eq!(search("prova"), vec!["Manuale di Prova", "Romanzo di Prova"], "titolo, senza maiuscole");
    assert_eq!(search("Verifica"), vec!["Manuale di Prova"], "per autore");
    assert_eq!(search("kobo"), vec!["Romanzo Kobo"]);
    assert!(search("").is_empty(), "ricerca vuota, nessun risultato");
    assert!(search("zzzzzz").is_empty());
}

#[test]
fn books_json_and_api_books_list_the_same_library() {
    let lib = Library::new("aliases");
    for (name, bytes) in formats() {
        lib.import(name, &bytes);
    }
    let (_, legacy) = lib.json("GET", "/books.json");
    let (_, api) = lib.json("GET", "/api/books");
    assert_eq!(legacy, api, "la vecchia rotta /books.json resta uguale a /api/books");
    assert_eq!(api.as_array().unwrap().len(), formats().len());
}

// ------------------------------------------------------------------ metadati e copertine

#[test]
fn metadata_can_be_edited_with_a_new_cover() {
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        let old_cover = book["coverPath"].as_str().map(str::to_string);
        let cover = jpeg(300, 450, [200, 30, 30]);
        let (status, res) = lib.multipart(
            "/api/books/edit",
            &[("id", &id), ("title", "Titolo Nuovo"), ("author", "Autrice Nuova"),
              ("description", "Trama riscritta a mano."), ("category", "Classici")],
            Some(("cover", "copertina.jpg", &cover)),
        );
        assert_eq!(status, 200, "{name}: {res}");
        let stored = lib.book(&id);
        assert_eq!(stored["title"], "Titolo Nuovo", "{name}");
        assert_eq!(stored["author"], "Autrice Nuova", "{name}");
        assert_eq!(stored["description"], "Trama riscritta a mano.", "{name}");
        assert_eq!(stored["tags"], json!(["Classici"]), "{name}");
        assert_eq!(stored["epubPath"], book["epubPath"], "{name}: il file dell'ebook non cambia");

        let new_cover = str_field(&stored, "coverPath");
        assert!(lib.dir.join(new_cover).is_file(), "{name}: nuova copertina salvata");
        let (status, _, bytes) = lib.get(&format!("/{new_cover}"));
        assert_eq!(status, 200);
        let img = image::load_from_memory(&bytes).unwrap();
        assert_eq!((img.width(), img.height()), (512, 768), "{name}: copertina ritagliata come le altre");
        if let Some(old) = old_cover {
            assert!(!lib.dir.join(old).exists(), "{name}: la vecchia copertina viene cancellata");
        }
        assert_eq!(lib.files_in("covers").len(), 1, "{name}: nessuna copertina orfana");
    });
}

#[test]
fn editing_with_empty_fields_keeps_the_old_values() {
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        let (status, _) = lib.multipart("/api/books/edit", &[("id", &id), ("title", "  "), ("author", "")], None);
        assert_eq!(status, 200, "{name}");
        let stored = lib.book(&id);
        assert_eq!(stored["title"], book["title"], "{name}");
        assert_eq!(stored["author"], book["author"], "{name}");
        assert_eq!(stored["coverPath"], book["coverPath"], "{name}: senza file la copertina resta");
    });
}

#[test]
fn the_frontend_can_send_a_cover_for_any_book() {
    // Per i PDF la copertina la fotografa il frontend dalla prima pagina; lo stesso servirà
    // ai formati senza copertina interna. Una seconda foto sostituisce la prima.
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        for color in [[10, 120, 10], [10, 10, 120]] {
            let (status, res) =
                lib.multipart(&format!("/api/books/{id}/cover"), &[], Some(("cover", "c.jpg", &jpeg(400, 600, color))));
            assert_eq!(status, 200, "{name}: {res}");
            let path = str_field(&res, "coverPath");
            assert_eq!(lib.book(&id)["coverPath"], path, "{name}");
            assert!(lib.dir.join(path).is_file(), "{name}");
        }
        assert_eq!(lib.files_in("covers").len(), 1, "{name}: la copertina precedente non resta su disco");
    });
}

#[test]
fn an_invalid_cover_image_is_refused_without_damage() {
    for_each_format(|name, lib, book| {
        let id = id_of(book);
        let (status, _) =
            lib.multipart(&format!("/api/books/{id}/cover"), &[], Some(("cover", "c.jpg", b"non sono un'immagine")));
        assert_eq!(status, 500, "{name}");
        assert_eq!(lib.book(&id)["coverPath"], book["coverPath"], "{name}: la copertina resta quella di prima");
    });
}

// ------------------------------------------------------------------ libri inesistenti

#[test]
fn unknown_books_get_404_everywhere() {
    let lib = Library::new("missing");
    let id = "book_inesistente";
    let checks = [
        lib.send_json("PUT", &format!("/api/books/{id}/progress"), &json!({ "progress": 0.5 })).0,
        lib.send_json("PUT", &format!("/api/books/{id}/review"), &json!({ "rating": 3 })).0,
        lib.send_json("POST", &format!("/api/books/{id}/highlights"), &json!({ "cfi": "x", "text": "y" })).0,
        lib.send_json("DELETE", &format!("/api/books/{id}/highlights"), &json!({ "cfi": "x" })).0,
        lib.send_json("POST", &format!("/api/books/{id}/tags"), &json!({ "tag": "Gialli" })).0,
        lib.json("DELETE", &format!("/api/books/{id}")).0,
        lib.multipart(&format!("/api/books/{id}/cover"), &[], Some(("cover", "c.jpg", &jpeg(10, 10, [0, 0, 0])))).0,
        lib.multipart("/api/books/edit", &[("id", id), ("title", "X")], None).0,
    ];
    assert!(checks.iter().all(|&s| s == 404), "ogni rotta risponde 404: {checks:?}");
    assert!(lib.files_in("covers").is_empty(), "nessuna copertina salvata per un libro che non c'è");
}

// ------------------------------------------------------------------ più caricamenti insieme

#[test]
fn simultaneous_uploads_do_not_overwrite_each_other() {
    // L'interfaccia carica un file alla volta, ma in modalità server (Docker) più persone o
    // più schede possono caricare nello stesso momento.
    let lib = std::sync::Arc::new(Library::new("parallel"));
    let handles: Vec<_> = (0..6)
        .map(|i| {
            let lib = lib.clone();
            std::thread::spawn(move || {
                let title = format!("Volume parallelo {i}");
                lib.upload(&format!("p{i}.epub"), &make_epub(&EpubSpec { title: Some(&title), ..Default::default() }))
            })
        })
        .collect();
    for handle in handles {
        let (status, res) = handle.join().unwrap();
        assert_eq!(status, 200, "{res}");
        assert_eq!(res["success"], true, "{res}");
    }
    let books = lib.books();
    let mut titles: Vec<&str> = books.iter().map(|b| b["title"].as_str().unwrap()).collect();
    titles.sort();
    assert_eq!(titles.len(), 6, "tutti e sei i libri sono in libreria: {titles:?}");
    assert_eq!(lib.files_in("ebooks").len(), 6, "sei file distinti");
    for book in &books {
        let id = book["id"].as_str().unwrap();
        let path = std::path::Path::new(&lib.dir).join(str_field(book, "epubPath"));
        let info = koreshelf::epub::read_epub(&path).expect("ogni file è leggibile");
        assert_eq!(info.title.as_deref(), book["title"].as_str(), "il file di {id} è proprio il suo");
    }
    lib.assert_no_leftover_uploads();
}
