"""Genera il libro di esempio di KoreShelf (EPUB) in italiano e inglese.
    python tools/make_sample_book.py
Testo originale del progetto KoreShelf (licenza MIT): nessun problema di diritti."""
import io, zipfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "frontend" / "public" / "sample"

BOOKS = {
 "it": {
  "title": "Benvenuto in KoreShelf",
  "subtitle": "Il primo libro della tua libreria",
  "author": "Il team di KoreShelf",
  "description": "Un piccolo libro per scoprire KoreShelf leggendo: come si sfogliano gli scaffali, come si legge, "
                 "come si cerca una frase e come si aggiungono i propri EPUB e PDF. Quando lo hai finito puoi eliminarlo.",
  "chapters": [
   ("Una libreria vera", [
    "Questo è il primo libro della tua libreria. È qui per mostrarti come funziona KoreShelf, e quando lo avrai finito potrai eliminarlo dal menu Altro.",
    "KoreShelf mette i tuoi ebook su scaffali in tre dimensioni, come in una stanza vera. Ogni libro ha la sua copertina, il suo dorso e il suo spessore: più pagine ha, più è largo.",
    "Tutto resta sul tuo computer. Non serve un account e non c'è nessun abbonamento."]),
   ("Sfogliare gli scaffali", [
    "Con le frecce sinistra e destra scorri i libri della mensola. Con le frecce su e giù passi da uno scaffale all'altro.",
    "Ogni categoria è uno scaffale. Per spostare un libro su un'altra mensola usa Assegna categoria, nel menu Altro sotto il libro.",
    "Se preferisci il mouse, trascina la scena a destra o a sinistra, oppure clicca direttamente su un libro per portarlo al centro."]),
   ("Leggere", [
    "Per aprire un libro premi Inizia a leggere, oppure clicca sulla sua copertina. La volta successiva il pulsante diventerà Riprendi a leggere e ti riporterà esattamente dove eri.",
    "Nel lettore puoi passare al tema scuro, cambiare il modo di sfogliare le pagine e consultare l'indice.",
    "Selezionando una frase puoi sottolinearla: tutte le tue sottolineature finiscono sulla bacheca, sopra gli scaffali."]),
   ("Cercare una frase", [
    "Prova adesso: apri la ricerca del lettore e cerca le parole lanterna d'argento.",
    "Eccola: la lanterna d'argento illumina sempre la pagina che stai cercando.",
    "La ricerca trova parole e frasi in tutto il libro, sia negli EPUB sia nei PDF, e ti porta direttamente al punto giusto."]),
   ("I tuoi libri", [
    "Ora tocca a te. Trascina i tuoi file EPUB e PDF sulla finestra di KoreShelf, oppure usa Carica Ebook in alto.",
    "Copertina, autore e trama vengono cercati automaticamente. Se carichi più libri insieme, li vedrai volare uno a uno sul loro scaffale.",
    "Buona lettura!"]),
  ],
 },
 "en": {
  "title": "Welcome to KoreShelf",
  "subtitle": "The first book in your library",
  "author": "The KoreShelf team",
  "description": "A small book to discover KoreShelf by reading it: how to browse the shelves, how to read, how to search "
                 "for a sentence and how to add your own EPUBs and PDFs. Once you have finished it you can delete it.",
  "chapters": [
   ("A real library", [
    "This is the first book in your library. It is here to show you how KoreShelf works, and once you have finished it you can delete it from the More menu.",
    "KoreShelf puts your ebooks on three-dimensional shelves, like in a real room. Every book has its cover, its spine and its thickness: the more pages, the wider it is.",
    "Everything stays on your computer. No account and no subscription are needed."]),
   ("Browsing the shelves", [
    "Use the left and right arrows to move along the shelf. Use the up and down arrows to move from one shelf to another.",
    "Every category is a shelf. To move a book to another shelf use Assign category, in the More menu below the book.",
    "If you prefer the mouse, drag the scene left or right, or click a book to bring it to the centre."]),
   ("Reading", [
    "To open a book press Start reading, or click its cover. Next time the button becomes Continue reading and takes you back exactly where you were.",
    "In the reader you can switch to the dark theme, change how pages turn and open the table of contents.",
    "Select a sentence to highlight it: all your highlights end up on the board above the shelves."]),
   ("Searching for a sentence", [
    "Try it now: open the reader search and look for the words silver lantern.",
    "Here it is: the silver lantern always lights up the page you are looking for.",
    "Search finds words and sentences in the whole book, in EPUBs and PDFs alike, and takes you straight to the right spot."]),
   ("Your books", [
    "Now it's your turn. Drag your EPUB and PDF files onto the KoreShelf window, or use Upload Ebook at the top.",
    "Cover, author and synopsis are looked up automatically. If you add several books at once, you will see them fly one by one to their shelf.",
    "Happy reading!"]),
  ],
 },
}


def font(size, bold=False):
    for name in (["DejaVuSerif-Bold.ttf", "DejaVuSans-Bold.ttf"] if bold else ["DejaVuSerif.ttf", "DejaVuSans.ttf"]):
        for base in ["/usr/share/fonts/truetype/dejavu/", ""]:
            try:
                return ImageFont.truetype(base + name, size)
            except OSError:
                pass
    return ImageFont.load_default()


def cover(book):
    W, H = 1200, 1800
    img = Image.new("RGB", (W, H), (30, 45, 59))
    d = ImageDraw.Draw(img)
    d.rectangle([60, 60, W - 60, H - 60], outline=(212, 175, 55), width=6)
    # piccolo scaffale con tre libri
    shelf_y = 1080
    for x, w, h, c in [(380, 110, 330, (212, 175, 55)), (505, 90, 290, (77, 166, 255)), (610, 130, 360, (231, 111, 81))]:
        d.rectangle([x, shelf_y - h, x + w, shelf_y], fill=c)
    d.rectangle([300, shelf_y, 900, shelf_y + 28], fill=(134, 103, 74))
    words = book["title"].split(" ")
    lines = [" ".join(words[:-1]), words[-1]] if len(words) > 1 else words
    y = 260
    for i, line in enumerate(lines):
        f = font(118 if i == len(lines) - 1 else 92, bold=True)
        tw = d.textlength(line, font=f)
        d.text(((W - tw) / 2, y), line, font=f, fill=(212, 175, 55))
        y += 150
    f = font(48)
    tw = d.textlength(book["subtitle"], font=f)
    d.text(((W - tw) / 2, y + 30), book["subtitle"], font=f, fill=(235, 235, 235))
    f = font(52)
    tw = d.textlength(book["author"], font=f)
    d.text(((W - tw) / 2, 1500), book["author"], font=f, fill=(235, 235, 235))
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=85)
    return buf.getvalue()


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build(lang, book):
    path = OUT / f"koreshelf-{lang}.epub"
    chapters = book["chapters"]
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        z.writestr("META-INF/container.xml", '<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>')
        items = "".join(f'<item id="c{i}" href="c{i}.xhtml" media-type="application/xhtml+xml"/>' for i in range(1, len(chapters) + 1))
        spine = "".join(f'<itemref idref="c{i}"/>' for i in range(1, len(chapters) + 1))
        z.writestr("OEBPS/content.opf", f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="id">
 <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
  <dc:title>{esc(book["title"])}</dc:title><dc:creator>{esc(book["author"])}</dc:creator><dc:language>{lang}</dc:language>
  <dc:description>{esc(book["description"])}</dc:description><dc:identifier id="id">urn:koreshelf:sample:{lang}</dc:identifier>
  <dc:rights>MIT License - KoreShelf</dc:rights><meta name="cover" content="cover"/>
 </metadata>
 <manifest><item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/><item id="cover" href="cover.jpg" media-type="image/jpeg"/>{items}</manifest>
 <spine toc="ncx">{spine}</spine>
</package>''')
        nav = "".join(f'<navPoint id="n{i}" playOrder="{i}"><navLabel><text>{esc(t)}</text></navLabel><content src="c{i}.xhtml"/></navPoint>'
                      for i, (t, _) in enumerate(chapters, 1))
        z.writestr("OEBPS/toc.ncx", f'<?xml version="1.0" encoding="utf-8"?><ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="urn:koreshelf:sample:{lang}"/></head><docTitle><text>{esc(book["title"])}</text></docTitle><navMap>{nav}</navMap></ncx>')
        z.writestr("OEBPS/cover.jpg", cover(book))
        for i, (title, paras) in enumerate(chapters, 1):
            body = "".join(f"<p>{esc(p)}</p>" for p in paras)
            z.writestr(f"OEBPS/c{i}.xhtml", f'<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="{lang}"><head><title>{esc(title)}</title></head><body><h1>{esc(title)}</h1>{body}</body></html>')
    print("Creato", path, path.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for lang, book in BOOKS.items():
        build(lang, book)
