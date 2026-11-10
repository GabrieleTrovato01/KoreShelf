//! MOBI/AZW3, DOCX/ODT, CBR/CB7 e file protetti da password, sui file VERI di
//! `tests/fixtures/` (creati con LibreOffice, Calibre, RAR, 7-Zip: vedi il README lì).
//! La password dei file protetti è `segreto`.

mod common;

use common::*;
use koreshelf::epub::read_epub;
use serde_json::Value;
use std::io::Read;

const PASSWORD: &str = "segreto";

fn fixture(name: &str) -> Vec<u8> {
    let path = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures").join(name);
    std::fs::read(&path).unwrap_or_else(|e| panic!("{}: {e}", path.display()))
}

/// Testo di tutti i capitoli di un EPUB (dal disco o in memoria).
fn epub_text(bytes: &[u8]) -> String {
    let mut zip = zip::ZipArchive::new(std::io::Cursor::new(bytes)).unwrap();
    let mut out = String::new();
    for i in 0..zip.len() {
        let mut entry = zip.by_index(i).unwrap();
        if entry.name().ends_with(".xhtml") {
            let mut text = String::new();
            entry.read_to_string(&mut text).unwrap();
            roxmltree::Document::parse_with_options(&text, roxmltree::ParsingOptions { allow_dtd: true, ..Default::default() })
                .unwrap_or_else(|e| panic!("{} non è XHTML valido: {e}", entry.name()));
            out.push_str(&text);
        }
    }
    out
}

fn stored(lib: &Library, book: &Value) -> Vec<u8> {
    std::fs::read(lib.dir.join(str_field(book, "epubPath"))).unwrap()
}

fn toc(bytes: &[u8]) -> String {
    let mut zip = zip::ZipArchive::new(std::io::Cursor::new(bytes)).unwrap();
    let mut nav = String::new();
    zip.by_name("OEBPS/nav.xhtml").unwrap().read_to_string(&mut nav).unwrap();
    nav
}

/// GET con (o senza) password nell'intestazione, come fa il lettore.
fn get_with_password(lib: &Library, path: &str, password: Option<&str>) -> (u16, String, Vec<u8>) {
    let header = password.map(|p| format!("X-KoreShelf-Password: {}\r\n", urlencoding::encode(p))).unwrap_or_default();
    lib.request("GET", path, &header, &[])
}

fn json_code(bytes: &[u8]) -> String {
    serde_json::from_slice::<Value>(bytes).ok().and_then(|v| v["code"].as_str().map(str::to_string)).unwrap_or_default()
}

// ------------------------------------------------------------------ Kindle

#[test]
fn kindle_files_become_epubs_with_metadata_cover_and_chapters() {
    // Lo stesso libro in tre forme: una libreria per file, perché KoreShelf rifiuta i doppioni
    for name in ["kf7.mobi", "joint.mobi", "kf8.azw3"] {
        let lib = Library::new(&format!("kindle-{}", name.replace('.', "-")));
        let book = lib.import(name, &fixture(name));
        assert_eq!(str_field(&book, "title"), "Il Viaggio di Kindle", "{name}");
        assert_eq!(str_field(&book, "author"), "Bruno Amazonio", "{name}");
        assert!(str_field(&book, "description").starts_with("Un libro di prova"), "{name}");
        assert!(str_field(&book, "epubPath").ends_with(".epub"), "{name}: convertito in EPUB");
        let cover = image::open(lib.dir.join(str_field(&book, "coverPath"))).unwrap();
        assert!(cover.to_rgb8().get_pixel(256, 384)[0] > 120, "{name}: la copertina è quella rossa del libro");

        let epub = stored(&lib, &book);
        let text = epub_text(&epub);
        assert!(text.contains("Città, caffè e <strong>grassetto</strong> con <em>corsivo</em>."), "{name}: testo e formattazione");
        assert!(text.contains("Secondo capitolo &amp; fine."), "{name}");
        assert!(text.contains(r#"<img src="images/"#), "{name}: l'illustrazione nel testo");
        let nav = toc(&epub);
        assert!(nav.contains("Il primo viaggio") && nav.contains("Il ritorno"), "{name}: indice:\n{nav}");
        let info = read_epub(&lib.dir.join(str_field(&book, "epubPath"))).unwrap();
        assert_eq!(info.isbn.as_deref(), Some("9780306406157"), "{name}");
    }
}

#[test]
fn kindle_books_with_drm_are_refused_with_their_own_message() {
    let lib = Library::new("drm");
    let mut bytes = fixture("kf7.mobi");
    // Il campo "encryption" del record 0 (offset 12): 2 = DRM Mobipocket
    let r0 = u32::from_be_bytes(bytes[78..82].try_into().unwrap()) as usize;
    bytes[r0 + 13] = 2;
    let (status, res) = lib.upload("comprato.azw", &bytes);
    assert_eq!(status, 400);
    assert!(str_field(&res, "message").contains("DRM"), "{res}");
    assert!(lib.books().is_empty());
    lib.assert_no_leftover_uploads();
}

// ------------------------------------------------------------------ Word e LibreOffice

#[test]
fn docx_and_odt_become_epubs() {
    for name in ["plain.docx", "plain.odt"] {
        let lib = Library::new(&format!("office-{}", name.replace('.', "-")));
        let book = lib.import(name, &fixture(name));
        assert_eq!(str_field(&book, "title"), "Documento di Collaudo", "{name}: titolo dalle proprietà del documento");
        assert_eq!(str_field(&book, "author"), "Ada Collaudo", "{name}");
        let epub = stored(&lib, &book);
        let text = epub_text(&epub);
        assert!(text.contains("<strong>grassetto</strong>") && text.contains("<em>corsivo</em>") && text.contains("<u>sottolineato</u>"), "{name}:\n{text}");
        assert!(text.contains("Città, caffè &amp; perché."), "{name}");
        assert!(text.contains("<li>Punto uno</li>"), "{name}: elenco");
        assert!(text.contains("<td>A1</td><td>B1</td>"), "{name}: tabella");
        assert!(text.contains(r#"<img src="images/"#), "{name}: immagine");
        assert!(text.contains("Una nota a piè di pagina."), "{name}: nota");
        let nav = toc(&epub);
        assert!(nav.contains("Primo capitolo") && nav.contains("Secondo capitolo"), "{name}: capitoli dai titoli:\n{nav}");
        assert!(book["coverPath"].is_null(), "{name}: nessuna copertina presa da internet");
    }
}

#[test]
fn protected_documents_stay_encrypted_and_open_with_the_password() {
    for name in ["locked-word.docx", "locked-lo.docx", "locked.odt"] {
        let lib = Library::new(&format!("lockeddoc-{}", name.replace('.', "-")));
        let original = fixture(name);
        let book = lib.import(name, &original);
        let id = str_field(&book, "id");
        assert_eq!(stored(&lib, &book), original, "{name}: in libreria resta il file cifrato");
        let title = str_field(&book, "title");
        assert!(title.starts_with("locked") && !title.contains('.'), "{name}: senza password il titolo viene dal nome del file: {title}");

        let path = format!("/api/books/{id}/document");
        let (status, _, body) = get_with_password(&lib, &path, None);
        assert_eq!((status, json_code(&body).as_str()), (401, "password_required"), "{name}");
        let (status, _, body) = get_with_password(&lib, &path, Some("sbagliata"));
        assert_eq!((status, json_code(&body).as_str()), (401, "password_wrong"), "{name}");
        let (status, head, body) = get_with_password(&lib, &path, Some(PASSWORD));
        assert_eq!(status, 200, "{name}: {}", String::from_utf8_lossy(&body));
        assert!(head.to_lowercase().contains("application/epub+zip") && head.to_lowercase().contains("no-store"), "{name}: {head}");
        let text = epub_text(&body);
        assert!(text.contains("<strong>grassetto</strong>") && text.contains("Ultimo paragrafo"), "{name}: il documento decifrato");
    }
}

// ------------------------------------------------------------------ fumetti

#[test]
fn cbr_and_cb7_become_cbz_with_pages_in_order() {
    for (name, comic_info) in [("plain.cbr", true), ("solid.cbr", false), ("zip-named.cbr", false), ("plain.cb7", true)] {
        let lib = Library::new(&format!("comic-{}", name.replace('.', "-")));
        let book = lib.import(name, &fixture(name));
        let id = str_field(&book, "id");
        assert!(str_field(&book, "epubPath").ends_with(".cbz"), "{name}: convertito in CBZ");
        assert_eq!(book["pageCount"], 6, "{name}");
        if comic_info {
            assert_eq!(str_field(&book, "title"), "Le avventure di Pixel #1: Il primo giorno", "{name}");
        }
        assert!(lib.dir.join(str_field(&book, "coverPath")).is_file(), "{name}: copertina dalla prima pagina");
        let (_, pages) = lib.json("GET", &format!("/api/books/{id}/pages"));
        assert_eq!((pages["pages"].as_u64(), pages["protected"].as_bool()), (Some(6), Some(false)), "{name}: {pages}");
        let (status, _, page) = lib.get(&format!("/api/books/{id}/pages/5"));
        assert_eq!(status, 200);
        image::load_from_memory(&page).expect("pagina leggibile");
    }
}

#[test]
fn protected_comics_ask_for_the_password_and_then_open() {
    for name in ["locked.cbr", "locked-names.cbr", "locked.cb7", "locked-names.cb7", "locked-aes.cbz", "locked-zipcrypto.cbz"] {
        let lib = Library::new(&format!("lockedcomic-{}", name.replace('.', "-")));
        let original = fixture(name);
        let book = lib.import(name, &original);
        let id = str_field(&book, "id");
        let ext = name.rsplit('.').next().unwrap();
        assert!(str_field(&book, "epubPath").ends_with(&format!(".{ext}")), "{name}: resta nel suo formato, cifrato");
        assert_eq!(stored(&lib, &book), original, "{name}");
        assert!(book["coverPath"].is_null(), "{name}: la copertina la crea il lettore dopo lo sblocco");

        let pages = format!("/api/books/{id}/pages");
        let (status, _, body) = get_with_password(&lib, &pages, None);
        assert_eq!((status, json_code(&body).as_str()), (401, "password_required"), "{name}");
        let (status, _, body) = get_with_password(&lib, &pages, Some("sbagliata"));
        assert_eq!((status, json_code(&body).as_str()), (401, "password_wrong"), "{name}");
        let (status, _, body) = get_with_password(&lib, &pages, Some(PASSWORD));
        let res: Value = serde_json::from_slice(&body).unwrap();
        assert_eq!((status, res["pages"].as_u64(), res["protected"].as_bool()), (200, Some(6), Some(true)), "{name}: {res}");

        let (status, _, _) = get_with_password(&lib, &format!("/api/books/{id}/pages/0"), None);
        assert_eq!(status, 401, "{name}: niente pagine senza password");
        let (status, head, page) = get_with_password(&lib, &format!("/api/books/{id}/pages/5"), Some(PASSWORD));
        assert_eq!(status, 200, "{name}");
        assert!(head.to_lowercase().contains("no-store"), "{name}: le pagine protette non restano nella cache del browser");
        image::load_from_memory(&page).expect("pagina decifrata");
    }
}

#[test]
fn a_password_with_accents_and_symbols_travels_intact() {
    // La password va nell'intestazione HTTP codificata: "è", spazi e simboli devono arrivare uguali
    let lib = Library::new("pw-encoding");
    let book = lib.import("locked-aes.cbz", &fixture("locked-aes.cbz"));
    let id = str_field(&book, "id");
    let (status, _, _) = get_with_password(&lib, &format!("/api/books/{id}/pages"), Some("segretò %&"));
    assert_eq!(status, 401, "una password diversa resta sbagliata");
    let (status, _, _) = get_with_password(&lib, &format!("/api/books/{id}/pages"), Some(PASSWORD));
    assert_eq!(status, 200);
}

#[test]
fn protected_pdf_is_imported() {
    // Il PDF lo decifra pdf.js nel lettore: il server deve solo importarlo senza errori
    let lib = Library::new("lockedpdf");
    let book = lib.import("Manuale Riservato.pdf", &fixture("locked.pdf"));
    assert_eq!(str_field(&book, "title"), "Manuale Riservato");
    assert_eq!(stored(&lib, &book), fixture("locked.pdf"));
}

#[test]
fn deleting_a_protected_book_removes_its_file() {
    let lib = Library::new("delete-locked");
    let book = lib.import("locked.cbr", &fixture("locked.cbr"));
    let id = str_field(&book, "id");
    // Apertura con password: le pagine finiscono nella cache in memoria
    assert_eq!(get_with_password(&lib, &format!("/api/books/{id}/pages/0"), Some(PASSWORD)).0, 200);
    assert_eq!(lib.json("DELETE", &format!("/api/books/{id}")).0, 200);
    assert!(lib.files_in("ebooks").is_empty());
    assert_eq!(get_with_password(&lib, &format!("/api/books/{id}/pages/0"), Some(PASSWORD)).0, 404, "e le pagine non sono più raggiungibili");
}
