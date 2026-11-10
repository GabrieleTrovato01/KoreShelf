//! Importazione dei formati aggiunti dopo EPUB e PDF: FB2 (anche compresso), TXT, Markdown,
//! fumetti CBZ e KEPUB senza doppia estensione.
//!
//! FB2, TXT e Markdown diventano EPUB: per loro si controlla che il file salvato sia un EPUB
//! vero, leggibile dal parser (quindi da epub.js). I CBZ restano CBZ e il lettore ne chiede
//! una pagina alla volta.

mod common;

use common::*;
use koreshelf::epub::read_epub;
use std::io::Read;

/// I file di un EPUB salvato in libreria: (nome, contenuto testuale).
fn epub_entries(lib: &Library, book: &serde_json::Value) -> Vec<(String, String)> {
    let path = lib.dir.join(str_field(book, "epubPath"));
    let mut zip = zip::ZipArchive::new(std::fs::File::open(path).unwrap()).unwrap();
    (0..zip.len())
        .map(|i| {
            let mut entry = zip.by_index(i).unwrap();
            let mut bytes = Vec::new();
            entry.read_to_end(&mut bytes).unwrap();
            (entry.name().to_string(), String::from_utf8_lossy(&bytes).into_owned())
        })
        .collect()
}

fn chapter_text(lib: &Library, book: &serde_json::Value) -> String {
    epub_entries(lib, book)
        .into_iter()
        .filter(|(name, _)| name.contains("/ch") && name.ends_with(".xhtml"))
        .map(|(_, text)| text)
        .collect::<Vec<_>>()
        .join("\n")
}

fn assert_valid_epub(lib: &Library, book: &serde_json::Value) {
    let path = str_field(book, "epubPath");
    assert!(path.ends_with(".epub"), "convertito in EPUB: {path}");
    for (name, text) in epub_entries(lib, book) {
        if name.ends_with(".xhtml") || name.ends_with(".opf") || name.ends_with(".ncx") {
            roxmltree::Document::parse_with_options(&text, roxmltree::ParsingOptions { allow_dtd: true, ..Default::default() })
                .unwrap_or_else(|e| panic!("{name} non è XML valido ({e}):\n{text}"));
        }
    }
    read_epub(&lib.dir.join(path)).expect("il parser EPUB lo legge");
}

// ------------------------------------------------------------------ FB2

#[test]
fn fb2_becomes_an_epub_with_metadata_cover_and_notes() {
    let lib = Library::new("fb2");
    let book = lib.import("romanzo.fb2", make_fb2("La Città d'Ottone", ("Ada", "Collaudo"), Some("978-88-04-66823-7")).as_bytes());
    assert_eq!(str_field(&book, "title"), "La Città d'Ottone");
    assert_eq!(str_field(&book, "author"), "Ada Collaudo");
    assert!(str_field(&book, "description").starts_with("Una trama in FB2"), "{book}");
    let cover = str_field(&book, "coverPath");
    assert!(lib.dir.join(cover).is_file(), "copertina dal <coverpage> dell'FB2");
    assert_valid_epub(&lib, &book);

    let text = chapter_text(&lib, &book);
    assert!(text.contains("<em>primo</em>"), "la formattazione resta");
    assert!(text.contains("Verso uno") && text.contains("Testo della nota."));
    assert!(text.contains(r##"href="ch3.xhtml#n1""##), "il rimando porta al capitolo delle note:\n{text}");
    let info = read_epub(&lib.dir.join(str_field(&book, "epubPath"))).unwrap();
    assert_eq!(info.isbn.as_deref(), Some("9788804668237"), "ISBN da publish-info");
    lib.assert_no_leftover_uploads();
}

#[test]
fn fb2_in_windows_1251_is_read_correctly() {
    let lib = Library::new("fb2-1251");
    let xml = make_fb2("Мастер и Маргарита", ("Михаил", "Булгаков"), None)
        .replace(r#"encoding="UTF-8""#, r#"encoding="windows-1251""#);
    let (bytes, _, _) = encoding_rs::WINDOWS_1251.encode(&xml);
    let book = lib.import("master.fb2", &bytes);
    assert_eq!(str_field(&book, "title"), "Мастер и Маргарита");
    assert_eq!(str_field(&book, "author"), "Михаил Булгаков");
}

#[test]
fn compressed_fb2_is_accepted_with_every_usual_name() {
    let lib = Library::new("fb2zip");
    for (i, name) in ["libro.fb2.zip", "libro.fbz", "libro.zip"].iter().enumerate() {
        let title = format!("Libro compresso {i}");
        let fb2 = make_fb2(&title, ("Bruno", "Zip"), None);
        let book = lib.import(name, &make_zip(&[("dentro/libro.fb2", fb2.as_bytes())]));
        assert_eq!(str_field(&book, "title"), title, "{name}");
        assert_valid_epub(&lib, &book);
    }
}

// ------------------------------------------------------------------ TXT e Markdown

#[test]
fn txt_is_split_into_chapters_and_keeps_its_accents() {
    let lib = Library::new("txt");
    let text = "Prefazione dell'autore, città e caffè.\r\n\r\nCapitolo 1\r\n\r\nPrimo paragrafo del primo capitolo.\r\n\r\nCapitolo 2\r\n\r\nSecondo capitolo & <altro>.\r\n";
    let (latin1, _, _) = encoding_rs::WINDOWS_1252.encode(text);
    let book = lib.import("Il_mio_diario - Ada Collaudo.txt", &latin1);
    assert_eq!(str_field(&book, "title"), "Il mio diario", "titolo e autore dal nome del file");
    assert_eq!(str_field(&book, "author"), "Ada Collaudo");
    assert!(book["coverPath"].is_null(), "nessuna copertina inventata");
    assert_valid_epub(&lib, &book);

    let entries = epub_entries(&lib, &book);
    let toc = &entries.iter().find(|(n, _)| n.ends_with("nav.xhtml")).unwrap().1;
    assert!(toc.contains("Capitolo 1") && toc.contains("Capitolo 2"), "indice con i capitoli:\n{toc}");
    let text = chapter_text(&lib, &book);
    assert!(text.contains("città e caffè"), "Windows-1252 decodificato");
    assert!(text.contains("Secondo capitolo &amp; &lt;altro&gt;"), "caratteri speciali al sicuro");
}

#[test]
fn markdown_takes_title_and_chapters_from_headings() {
    let lib = Library::new("md");
    let md = "# Guida alla Collaudo\n\nIntroduzione con **grassetto**.\n\n## Primo passo\n\nTesto <script>alert(1)</script> e una tabella:\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n## Secondo passo\n\n![figura](img.png) Fine.\n";
    let book = lib.import("appunti.md", md.as_bytes());
    assert_eq!(str_field(&book, "title"), "Guida alla Collaudo", "dal titolo #");
    assert_valid_epub(&lib, &book);
    let text = chapter_text(&lib, &book);
    assert!(text.contains("<strong>grassetto</strong>") && text.contains("<table>"));
    assert!(text.contains("&lt;script&gt;"), "l'HTML scritto nel Markdown diventa testo");
    assert!(!text.contains("<img"), "immagini esterne non incluse");
    let toc = epub_entries(&lib, &book).into_iter().find(|(n, _)| n.ends_with("nav.xhtml")).unwrap().1;
    assert!(toc.contains("Primo passo") && toc.contains("Secondo passo"), "{toc}");
}

#[test]
fn markdown_front_matter_wins() {
    let lib = Library::new("md-front");
    let md = "---\ntitle: \"Titolo dal front matter\"\nauthor: Carla Markdown\n---\n# Altro titolo\n\nTesto.\n";
    let book = lib.import("x.markdown", md.as_bytes());
    assert_eq!(str_field(&book, "title"), "Titolo dal front matter");
    assert_eq!(str_field(&book, "author"), "Carla Markdown");
}

// ------------------------------------------------------------------ CBZ

const COMIC_INFO: &str = r#"<?xml version="1.0"?><ComicInfo><Series>Le Avventure di Test</Series><Number>3</Number><Title>Il ritorno</Title><Writer>Dario Fumetti</Writer><Summary>Un fumetto con una trama abbastanza lunga da essere tenuta.</Summary></ComicInfo>"#;

#[test]
fn cbz_keeps_its_pages_and_reads_comicinfo() {
    let lib = Library::new("cbz");
    let book = lib.import("qualsiasi.cbz", &make_cbz(12, Some(COMIC_INFO)));
    assert_eq!(str_field(&book, "title"), "Le Avventure di Test #3: Il ritorno");
    assert_eq!(str_field(&book, "author"), "Dario Fumetti");
    assert!(str_field(&book, "description").starts_with("Un fumetto"));
    assert_eq!(book["pageCount"], 12, "le pagine vere");
    let id = str_field(&book, "id");
    assert_eq!(str_field(&book, "epubPath"), format!("ebooks/{id}.cbz"), "il fumetto non viene convertito");
    let cover = image::open(lib.dir.join(str_field(&book, "coverPath"))).expect("copertina dalla prima pagina");
    assert_eq!((cover.width(), cover.height()), (512, 768));

    let (status, pages) = lib.json("GET", &format!("/api/books/{id}/pages"));
    assert_eq!(status, 200);
    assert_eq!(pages["pages"], 12, "i file di __MACOSX non sono pagine: {pages}");
    // Ordine naturale: p1, p2 ... p10 (non p1, p10, p11, p2)
    let red = |index: usize| {
        let (status, head, bytes) = lib.get(&format!("/api/books/{id}/pages/{index}"));
        assert_eq!(status, 200, "pagina {index}");
        assert!(head.to_lowercase().contains("content-type: image/jpeg"), "{head}");
        image::load_from_memory(&bytes).unwrap().to_rgb8().get_pixel(100, 150)[0] as i32
    };
    for (index, n) in [(0, 1), (1, 2), (9, 10), (11, 12)] {
        assert!((red(index) - (n * 20 % 255) as i32).abs() < 12, "la pagina {index} è p{n}.jpg");
    }
    assert_eq!(lib.get(&format!("/api/books/{id}/pages/12")).0, 404, "oltre l'ultima pagina");
    assert_eq!(lib.get(&format!("/api/books/{id}/pages/abc")).0, 404);
}

#[test]
fn cbz_without_comicinfo_uses_the_file_name() {
    let lib = Library::new("cbz-name");
    let book = lib.import("Dylan_Test_042 - Sclavi.cbz", &make_cbz(3, None));
    assert_eq!(str_field(&book, "title"), "Dylan Test 042");
    assert_eq!(str_field(&book, "author"), "Sclavi");
}

#[test]
fn comic_pages_exist_only_for_comics() {
    let lib = Library::new("cbz-only");
    let epub = lib.import("libro.epub", &make_epub(&EpubSpec::default()));
    let id = str_field(&epub, "id");
    assert_eq!(lib.json("GET", &format!("/api/books/{id}/pages")).0, 404);
    assert_eq!(lib.json("GET", "/api/books/inesistente/pages").0, 404);
}

// ------------------------------------------------------------------ KEPUB e rifiuti

#[test]
fn bare_kepub_extension_is_an_epub() {
    let lib = Library::new("kepub");
    let book = lib.import("Libro.kepub", &make_epub(&EpubSpec { title: Some("Solo kepub"), ..Default::default() }));
    assert_eq!(str_field(&book, "title"), "Solo kepub");
    assert!(str_field(&book, "epubPath").ends_with(".epub"), "salvato come .epub: il lettore lo apre con epub.js");
}

#[test]
fn fake_or_broken_files_of_the_new_formats_are_rejected() {
    let lib = Library::new("fake-new");
    let not_fb2 = br#"<?xml version="1.0"?><html><body>no</body></html>"#.to_vec();
    let broken_fb2 = b"<?xml version=\"1.0\"?><FictionBook><description>".to_vec();
    let zip_without_fb2 = make_zip(&[("leggimi.txt", b"ciao")]);
    let cbz_without_images = make_zip(&[("ComicInfo.xml", COMIC_INFO.as_bytes())]);
    let pdf_named_txt = make_pdf(Some("x"), None, 1, "x");
    let png_named_md = {
        let mut out = std::io::Cursor::new(Vec::new());
        image::DynamicImage::new_rgb8(4, 4).write_to(&mut out, image::ImageFormat::Png).unwrap();
        out.into_inner()
    };
    let cases: Vec<(&str, Vec<u8>)> = vec![
        ("non-fb2.fb2", not_fb2),
        ("rotto.fb2", broken_fb2),
        ("archivio.zip", zip_without_fb2),
        ("vuoto.cbz", cbz_without_images),
        ("finto.cbz", b"non sono uno zip".to_vec()),
        ("documento.txt", pdf_named_txt),
        ("immagine.md", png_named_md),
        ("vuoto.txt", Vec::new()),
        ("spazi.txt", b"   \n\n  ".to_vec()),
    ];
    for (name, bytes) in cases {
        let (status, res) = lib.upload(name, &bytes);
        assert_eq!(status, 400, "{name}: {res}");
        assert_eq!(res["success"], false, "{name}");
    }
    assert!(lib.books().is_empty());
    assert!(lib.files_in("ebooks").is_empty() && lib.files_in("covers").is_empty());
    lib.assert_no_leftover_uploads();
}
