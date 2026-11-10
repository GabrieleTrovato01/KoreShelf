//! I parser da soli, senza server, sugli EPUB "difficili" che si trovano in giro.
//!
//! FB2, TXT e Markdown verranno convertiti in EPUB generati da KoreShelf stesso e passeranno
//! da `epub::read_epub`: questi casi fissano cosa il parser sa già fare, così la conversione
//! può contarci e nessuna modifica lo indebolisce.

mod common;

use common::*;
use std::io::{Cursor, Write};

/// Un EPUB costruito file per file: (percorso nello ZIP, contenuto).
fn zip_of(entries: &[(&str, &[u8])]) -> Vec<u8> {
    use zip::write::SimpleFileOptions;
    let mut zip = zip::ZipWriter::new(Cursor::new(Vec::new()));
    let options = SimpleFileOptions::default().compression_method(zip::CompressionMethod::Deflated);
    for (name, bytes) in entries {
        zip.start_file(*name, options).unwrap();
        zip.write_all(bytes).unwrap();
    }
    zip.finish().unwrap().into_inner()
}

fn container(opf_path: &str) -> String {
    format!(
        r#"<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="{opf_path}" media-type="application/oebps-package+xml"/></rootfiles></container>"#
    )
}

fn opf(metadata: &str, manifest: &str, spine: &str) -> String {
    format!(
        r#"<?xml version="1.0"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/">{metadata}</metadata><manifest>{manifest}</manifest><spine>{spine}</spine></package>"#
    )
}

fn chapter(body: &str) -> String {
    format!(r#"<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Titolo nel head</title><style>p {{ color: red }}</style></head><body>{body}</body></html>"#)
}

fn read(name: &str, bytes: &[u8]) -> koreshelf::epub::EpubInfo {
    let path = temp_file(name, bytes);
    let result = koreshelf::epub::read_epub(&path);
    let _ = std::fs::remove_file(&path);
    result.unwrap_or_else(|e| panic!("{name}: {e}"))
}

// ------------------------------------------------------------------ copertine

#[test]
fn epub3_cover_image_property() {
    let cover = jpeg(320, 480, [1, 2, 3]);
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("OPS/package.opf").as_bytes()),
        ("OPS/package.opf", opf(
            "<dc:title>Copertina EPUB 3</dc:title>",
            r#"<item id="img" href="images/front.jpg" media-type="image/jpeg" properties="cover-image"/><item id="c1" href="c1.xhtml" media-type="application/xhtml+xml"/>"#,
            r#"<itemref idref="c1"/>"#,
        ).as_bytes()),
        ("OPS/images/front.jpg", &cover),
        ("OPS/c1.xhtml", chapter("<p>Ciao</p>").as_bytes()),
    ]);
    let info = read("epub3.epub", &bytes);
    assert_eq!(info.cover.as_deref(), Some(cover.as_slice()), "copertina da properties=cover-image");
}

#[test]
fn cover_meta_pointing_to_an_xhtml_page() {
    // Molti EPUB 2 puntano <meta name="cover"> a una pagina che contiene l'immagine.
    let cover = jpeg(200, 300, [9, 9, 9]);
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("OEBPS/content.opf").as_bytes()),
        ("OEBPS/content.opf", opf(
            r#"<dc:title>Copertina in pagina</dc:title><meta name="cover" content="coverpage"/>"#,
            r#"<item id="coverpage" href="Text/cover.xhtml" media-type="application/xhtml+xml"/><item id="img" href="Images/pic.jpg" media-type="image/jpeg"/>"#,
            r#"<itemref idref="coverpage"/>"#,
        ).as_bytes()),
        ("OEBPS/Text/cover.xhtml", chapter(r#"<div><img src="../Images/pic.jpg" alt="cover"/></div>"#).as_bytes()),
        ("OEBPS/Images/pic.jpg", &cover),
    ]);
    let info = read("coverpage.epub", &bytes);
    assert_eq!(info.cover.as_deref(), Some(cover.as_slice()), "immagine trovata dentro la pagina di copertina");
}

#[test]
fn an_image_called_cover_is_used_as_last_resort() {
    let cover = jpeg(100, 150, [5, 5, 5]);
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("content.opf").as_bytes()),
        ("content.opf", opf(
            "<dc:title>Copertina per nome</dc:title>",
            r#"<item id="a" href="pic1.png" media-type="image/png"/><item id="b" href="my-cover.jpg" media-type="image/jpeg"/><item id="c1" href="c1.xhtml" media-type="application/xhtml+xml"/>"#,
            r#"<itemref idref="c1"/>"#,
        ).as_bytes()),
        ("pic1.png", b"non usata"),
        ("my-cover.jpg", &cover),
        ("c1.xhtml", chapter("<p>x</p>").as_bytes()),
    ]);
    let info = read("byname.epub", &bytes);
    assert_eq!(info.cover.as_deref(), Some(cover.as_slice()));
}

// ------------------------------------------------------------------ struttura e testo

#[test]
fn missing_container_xml_falls_back_to_any_opf() {
    let bytes = zip_of(&[
        ("book/the.opf", opf("<dc:title>Senza container</dc:title><dc:creator>Anonimo</dc:creator>", r#"<item id="c1" href="c1.xhtml" media-type="application/xhtml+xml"/>"#, r#"<itemref idref="c1"/>"#).as_bytes()),
        ("book/c1.xhtml", chapter("<p>Testo</p>").as_bytes()),
    ]);
    let info = read("nocontainer.epub", &bytes);
    assert_eq!(info.title.as_deref(), Some("Senza container"));
    assert_eq!(info.author.as_deref(), Some("Anonimo"));
    assert!(info.text_length > 0, "il capitolo accanto all'OPF viene trovato");
}

#[test]
fn html_entities_in_the_opf_do_not_break_parsing() {
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("content.opf").as_bytes()),
        ("content.opf", opf("<dc:title>Titolo&nbsp;con&nbsp;spazi &amp; altro</dc:title>", "", "").as_bytes()),
    ]);
    let info = read("entities.epub", &bytes);
    let title = info.title.expect("titolo letto nonostante &nbsp;");
    assert!(title.contains("con") && title.contains("& altro"), "{title}");
}

#[test]
fn hrefs_with_spaces_and_odd_case_are_found() {
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("OEBPS/content.opf").as_bytes()),
        ("OEBPS/content.opf", opf("<dc:title>Nomi strani</dc:title>", r#"<item id="c1" href="Capitolo%20Uno.xhtml" media-type="application/xhtml+xml"/><item id="c2" href="CAP2.XHTML" media-type="application/xhtml+xml"/>"#, r#"<itemref idref="c1"/><itemref idref="c2"/>"#).as_bytes()),
        ("OEBPS/Capitolo Uno.xhtml", chapter(&"<p>uno</p>".repeat(100)).as_bytes()),
        ("OEBPS/cap2.xhtml", chapter(&"<p>due</p>".repeat(100)).as_bytes()),
    ]);
    let info = read("odd.epub", &bytes);
    assert_eq!(info.text_length, 600, "entrambi i capitoli vengono letti (300 + 300 caratteri)");
}

#[test]
fn text_length_counts_only_the_body_text() {
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("content.opf").as_bytes()),
        ("content.opf", opf("<dc:title>Conta</dc:title>", r#"<item id="c1" href="c1.xhtml" media-type="application/xhtml+xml"/>"#, r#"<itemref idref="c1"/>"#).as_bytes()),
        ("c1.xhtml", chapter(r#"<h1>Ciao</h1><p class="lungo">mondo <b>è</b></p><script>var x = "nascosto";</script>"#).as_bytes()),
    ]);
    let info = read("count.epub", &bytes);
    // "Ciaomondo è": niente tag, niente <head>, niente script
    assert_eq!(info.text_length, "Ciaomondo è".encode_utf16().count(), "testo: {}", info.text_length);
}

#[test]
fn long_books_are_estimated_from_the_first_50_chapters() {
    let n = 120;
    let mut manifest = String::new();
    let mut spine = String::new();
    let mut entries: Vec<(String, Vec<u8>)> = vec![("META-INF/container.xml".into(), container("content.opf").into_bytes())];
    for i in 0..n {
        manifest += &format!(r#"<item id="c{i}" href="c{i}.xhtml" media-type="application/xhtml+xml"/>"#);
        spine += &format!(r#"<itemref idref="c{i}"/>"#);
        entries.push((format!("c{i}.xhtml"), chapter(&"a".repeat(1000)).into_bytes()));
    }
    entries.push(("content.opf".into(), opf("<dc:title>Lunghissimo</dc:title>", &manifest, &spine).into_bytes()));
    let refs: Vec<(&str, &[u8])> = entries.iter().map(|(n, b)| (n.as_str(), b.as_slice())).collect();
    let info = read("long.epub", &zip_of(&refs));
    assert_eq!(info.text_length, 1000 * n, "media dei primi 50 moltiplicata per tutti i capitoli");
}

#[test]
fn description_html_becomes_plain_text_and_urn_isbn_is_read() {
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("content.opf").as_bytes()),
        ("content.opf", opf(
            "<dc:title>Trama</dc:title><dc:identifier>urn:isbn:9780306406157</dc:identifier><dc:description>&lt;p&gt;Prima riga&lt;/p&gt;&lt;p&gt;Seconda &amp;amp; ultima&lt;/p&gt;</dc:description>",
            "", "",
        ).as_bytes()),
    ]);
    let info = read("desc.epub", &bytes);
    assert_eq!(info.description.as_deref(), Some("Prima riga\nSeconda & ultima"));
    assert_eq!(info.isbn.as_deref(), Some("9780306406157"));
}

#[test]
fn isbn_in_the_text_is_found_when_metadata_has_none() {
    let bytes = zip_of(&[
        ("META-INF/container.xml", container("content.opf").as_bytes()),
        ("content.opf", opf("<dc:title>Colophon</dc:title><dc:identifier>uuid:1234</dc:identifier>", r#"<item id="c1" href="c1.xhtml" media-type="application/xhtml+xml"/>"#, r#"<itemref idref="c1"/>"#).as_bytes()),
        ("c1.xhtml", chapter("<p>Prima edizione. ISBN 978-88-04-66823-7. Tutti i diritti riservati.</p>").as_bytes()),
    ]);
    assert_eq!(read("colophon.epub", &bytes).isbn.as_deref(), Some("9788804668237"));
}

// ------------------------------------------------------------------ cartella dati e pagine

#[test]
fn data_paths_never_leave_the_data_folder() {
    let dir = std::env::temp_dir().join(format!("koreshelf-paths-{}", std::process::id()));
    let paths = koreshelf::paths::Paths::at(dir.clone()).unwrap();
    assert_eq!(paths.resolve_relative("ebooks/book_1.epub"), Some(dir.join("ebooks/book_1.epub")));
    for bad in ["", "../fuori.epub", "ebooks/../../fuori", "/etc/passwd", "./ebooks/x.epub"] {
        assert_eq!(paths.resolve_relative(bad), None, "{bad:?} deve essere rifiutato");
    }
    let _ = std::fs::remove_dir_all(dir);
}

#[test]
fn page_estimates_for_text_formats() {
    use koreshelf::online::estimate_pages;
    // TXT e FB2 non hanno pagine vere: conta la lunghezza del testo, ~1500 battute a pagina.
    assert_eq!(estimate_pages(1, None), 1, "un testo minuscolo è almeno una pagina");
    assert_eq!(estimate_pages(1500, None), 1);
    assert_eq!(estimate_pages(1501, None), 2);
    assert_eq!(estimate_pages(10_000_000, None), 1000, "mai oltre 1000 pagine");
    // Pagine vere (PDF, e domani i fumetti CBZ): vincono sulla stima
    assert_eq!(estimate_pages(999_999, Some(24)), 24);
    assert_eq!(estimate_pages(3000, Some(0)), 2, "zero pagine vere = si stima dal testo");
}
