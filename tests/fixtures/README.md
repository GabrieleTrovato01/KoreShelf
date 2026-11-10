# File di prova reali

Creati con i programmi veri, così i test controllano KoreShelf sui file che le persone hanno
davvero. La password dei file protetti è `segreto`.

| File | Creato con |
|---|---|
| `plain.odt`, `locked.odt` | LibreOffice 24.2 (cifratura AES-256-CBC + PBKDF2) |
| `plain.docx`, `locked-lo.docx` | LibreOffice 24.2 ("MS Word 2007 XML"; cifratura ECMA-376 *Standard*, AES-128) |
| `locked-word.docx` | msoffcrypto-tool (cifratura ECMA-376 *Agile*, AES-256/SHA-512, quella di Word) |
| `locked.pdf` | LibreOffice 24.2, esportazione PDF con password di apertura |
| `plain.cbr`, `locked.cbr`, `locked-names.cbr`, `solid.cbr` | RAR 7 (`-p`, `-hp` cifra anche i nomi, `-s` archivio solido) |
| `zip-named.cbr` | 7-Zip: uno ZIP con estensione `.cbr` (capita spesso) |
| `plain.cb7`, `locked.cb7`, `locked-names.cb7` | 7-Zip (`-p`, `-mhe=on` cifra anche i nomi) |
| `locked-aes.cbz`, `locked-zipcrypto.cbz` | 7-Zip, ZIP con cifratura AES-256 e ZipCrypto |
| `kf7.mobi`, `joint.mobi`, `kf8.azw3` | Calibre 7 (`--mobi-file-type old`, `both`, e AZW3) |

Tutti i fumetti hanno le stesse 6 pagine (`Pixel_01.jpg` ... `Pixel_06.jpg`) e un `ComicInfo.xml`,
tranne `solid.cbr` e `zip-named.cbr` (solo pagine). I documenti hanno due capitoli, grassetto,
corsivo, sottolineato, un elenco, una tabella, un'immagine e una nota.
