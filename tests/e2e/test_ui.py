"""
Test end-to-end di KoreShelf: avviano il vero server Rust su una libreria
temporanea e pilotano l'interfaccia in Chromium.

    pip install playwright pillow && playwright install chromium
    cargo build --no-default-features
    python tests/e2e/test_ui.py [percorso/del/binario]

Variabili utili: CHROME_PATH (Chromium alternativo), KEEP_SHOTS=1 (salva screenshot).
"""

import asyncio
import io
import json
import re
import os
import shutil
import subprocess
import sys
import tempfile
import time
import traceback
import urllib.request
import zipfile
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
BINARY = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "target" / "debug" / ("koreshelf.exe" if os.name == "nt" else "koreshelf")
BASE = "http://127.0.0.1:3000"
SHOTS = Path(tempfile.gettempdir()) / "koreshelf-shots"
CHROME_ARGS = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]


# ----------------------------------------------------------------- fixture

def make_epub(path: Path, title: str, author: str, color: tuple, chapters=None):
    chapters = chapters or ["Testo di prova. " * 3000]
    img = Image.new("RGB", (600, 900), color)
    buf = io.BytesIO()
    img.save(buf, "JPEG")
    with zipfile.ZipFile(path, "w") as z:
        z.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        z.writestr("META-INF/container.xml",
                   '<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">'
                   '<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>')
        z.writestr("OEBPS/content.opf", f'''<?xml version="1.0"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="id">
 <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:title>{title}</dc:title><dc:creator>{author}</dc:creator>
  <dc:description>Una trama abbastanza lunga da essere considerata valida dal server di KoreShelf.</dc:description>
  <meta name="cover" content="cov"/>
 </metadata>
 <manifest><item id="cov" href="cover.jpg" media-type="image/jpeg"/>{"".join(f'<item id="c{i}" href="c{i}.xhtml" media-type="application/xhtml+xml"/>' for i in range(1, len(chapters) + 1))}</manifest>
 <spine>{"".join(f'<itemref idref="c{i}"/>' for i in range(1, len(chapters) + 1))}</spine>
</package>''')
        z.writestr("OEBPS/cover.jpg", buf.getvalue())
        for i, text in enumerate(chapters, 1):
            z.writestr(f"OEBPS/c{i}.xhtml",
                       '<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml">'
                       f"<head><title>Capitolo {i}</title></head><body><h1>Capitolo {i}</h1><p>{text}</p></body></html>")


def make_pdf(path: Path, pages: dict, total: int = 6):
    """PDF di `total` pagine; `pages` = {numero_pagina: testo}."""
    from reportlab.pdfgen import canvas
    c = canvas.Canvas(str(path))
    c.setTitle(path.stem.replace("_", " "))
    for n in range(1, total + 1):
        c.setFont("Helvetica", 14)
        c.drawString(72, 760, f"Pagina {n}")
        c.drawString(72, 720, pages.get(n, "Testo di riempimento qualsiasi."))
        c.showPage()
    c.save()


def api(method, path, data=None, files=None):
    if files:
        boundary = "----ks" + str(time.time_ns())
        body = b""
        for name, fpath in files.items():
            body += (f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"; filename=\"{Path(fpath).name}\"\r\n"
                     "Content-Type: application/octet-stream\r\n\r\n").encode() + Path(fpath).read_bytes() + b"\r\n"
        body += f"--{boundary}--\r\n".encode()
        req = urllib.request.Request(BASE + path, data=body, method=method,
                                     headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    else:
        req = urllib.request.Request(BASE + path, data=json.dumps(data).encode() if data is not None else None,
                                     method=method, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read() or b"null")


class Server:
    """Server KoreShelf con una libreria temporanea tutta sua."""

    def __enter__(self):
        self.home = Path(tempfile.mkdtemp(prefix="koreshelf-test-"))
        env = dict(os.environ, HOME=str(self.home), XDG_DATA_HOME=str(self.home / "data"),
                   APPDATA=str(self.home / "data"))
        self.proc = subprocess.Popen([str(BINARY)], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(100):
            try:
                if api("GET", "/api/ping")["app"] == "KoreShelf":
                    return self
            except Exception:
                time.sleep(0.1)
        raise RuntimeError("Il server non è partito")

    def seed(self):
        """Libreria con due mensole: 'Saggi' (2 libri) e 'Senza categoria' (1 libro)."""
        books = self.home / "books"
        books.mkdir()
        ids = {}
        for title, color, tag in [("Alpha Saggio", (40, 90, 160), "Saggi"),
                                  ("Beta Saggio", (160, 60, 60), "Saggi"),
                                  ("Gamma Romanzo", (60, 140, 80), None)]:
            path = books / f"{title.replace(' ', '_')}.epub"
            make_epub(path, title, "Autore Test", color)
            res = api("POST", "/api/upload", files={"ebook": path})
            assert res["success"], res
            ids[title] = res["book"]["id"]
            if tag:
                api("POST", f"/api/books/{ids[title]}/tags", {"tag": tag})
        new_book = books / "Delta_Nuovo.epub"
        make_epub(new_book, "Delta Nuovo", "Autore Test", (200, 160, 30))
        return ids, new_book

    def __exit__(self, *exc):
        self.proc.terminate()
        self.proc.wait(10)
        shutil.rmtree(self.home, ignore_errors=True)


async def open_app(p, viewport=(1280, 700), desktop=False, lang="it", github_tag=None):
    browser = await p.chromium.launch(executable_path=os.environ.get("CHROME_PATH") or None, args=CHROME_ARGS)
    ctx = await browser.new_context(viewport={"width": viewport[0], "height": viewport[1]})

    # Niente rete vera nei test: la "ultima release" su GitHub la decidiamo noi.
    async def fake_github(route):
        if github_tag is None:
            await route.fulfill(status=404, body="{}")
        else:
            await route.fulfill(status=200, content_type="application/json",
                                body=json.dumps({"tag_name": github_tag, "html_url": "https://github.com/x/releases"}))
    await ctx.route("https://api.github.com/**", fake_github)
    await ctx.add_init_script(f"localStorage.setItem('KoreShelf_lang','{lang}')")
    if desktop:
        # Quello che fa la finestra nativa (wry) prima di caricare la pagina
        await ctx.add_init_script("window.__KORESHELF_DESKTOP__ = true;")
    page = await ctx.new_page()
    await page.goto(BASE)
    await page.wait_for_function("document.getElementById('loading-screen').style.display === 'none'", timeout=30000)
    await page.wait_for_timeout(2500)  # carosello e telecamera a riposo
    return browser, ctx, page


async def shot(page, name):
    if os.environ.get("KEEP_SHOTS"):
        SHOTS.mkdir(exist_ok=True)
        await page.screenshot(path=str(SHOTS / f"{name}.png"))


# ------------------------------------------------------------------- test

def cover_bbox(png: bytes):
    """Riquadro della copertina verde di 'Gamma Romanzo' trovato dai pixel dello screenshot."""
    img = Image.open(io.BytesIO(png)).convert("RGB")
    w, h = img.size
    px = img.load()
    xs, ys = [], []
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b = px[x, y]
            if g > r + 25 and g > b + 15 and g > 80:
                xs.append(x)
                ys.append(y)
    if not xs:
        return None
    return {"x": min(xs), "y": min(ys), "width": max(xs) - min(xs), "height": max(ys) - min(ys)}


async def test_amazon_click_does_not_open_book_underneath(p):
    """Bug: cliccando «Cerca su Amazon» si apriva il libro che stava sotto il suggerimento."""
    with Server() as srv:
        srv.seed()
        # Finestra bassa: la copertina del libro attivo arriva sotto la barra di ricerca.
        browser, ctx, page = await open_app(p, viewport=(1280, 460))
        await stable_camera(page)
        book = cover_bbox(await page.screenshot())
        assert book, "Setup: copertina del libro attivo non trovata"

        search = page.locator("input[placeholder^='Cerca per']")
        await search.click()
        await search.type("stephen king", delay=20)
        suggestion = page.get_by_text("Cerca «stephen king» su Amazon")
        await suggestion.wait_for(state="visible", timeout=5000)
        await shot(page, "amazon_1_suggestion")

        box = await page.evaluate("(() => { const r = [...document.querySelectorAll('div.glass-effect')]"
                                  ".find(d => d.innerText.includes('stephen king')).getBoundingClientRect(); return r.toJSON(); })()")
        top, bottom = max(box["y"], book["y"]), min(box["y"] + box["height"], book["y"] + book["height"])
        left, right = max(box["x"], book["x"]), min(box["x"] + box["width"], book["x"] + book["width"])
        assert bottom - top >= 6 and right - left >= 20, (
            f"Setup non valido: il suggerimento {box} non copre la copertina {book}")

        popups = []
        ctx.on("page", lambda pg: popups.append(pg))
        # Click sul suggerimento, esattamente sopra la copertina
        await page.mouse.click((left + right) / 2, (top + bottom) / 2)
        await page.wait_for_timeout(2500)
        await shot(page, "amazon_2_after_click")

        reader = await page.evaluate("document.getElementById('reader-overlay').style.display")
        topbar = await page.evaluate("getComputedStyle(document.querySelector('.top-bar')).opacity")
        await browser.close()
        assert popups, "Il click sul suggerimento deve aprire Amazon"
        assert reader in ("none", ""), f"Si è aperto il lettore del libro sottostante (reader-overlay={reader})"
        assert topbar == "1", "La barra in alto è sparita: è partita l'animazione di apertura del libro"


async def test_upload_flies_book_into_its_shelf(p):
    """Alla spunta verde il libro ruota, vola nel suo posto sullo scaffale ingrandendosi,
    mentre la vista scorre tra mensole e libri (senza ricaricare la pagina)."""
    with Server() as srv:
        ids, new_book = srv.seed()
        browser, ctx, page = await open_app(p)
        await page.evaluate("window.__noReload = true")

        # Partiamo dalla mensola 'Saggi': il nuovo libro (senza categoria) atterra su un'altra mensola.
        start_label = (await page.locator(".top-bar > div").first.inner_text()).strip()
        if "SAGGI" not in start_label.upper():
            await page.mouse.move(640, 300)
            await page.mouse.down()
            await page.mouse.move(640, 380, steps=5)
            await page.mouse.move(640, 460, steps=5)
            await page.mouse.up()
            await page.wait_for_timeout(2500)
        start_label = (await page.locator(".top-bar > div").first.inner_text()).strip()
        assert "SAGGI" in start_label.upper(), f"Setup: dovevamo partire da Saggi, siamo su {start_label}"

        # Registriamo, frame per frame, il libro volante e la telecamera
        await page.evaluate("""() => {
            window.__samples = [];
            const tick = () => {
                const f = document.querySelector('.ks-flyer');
                const item = document.querySelector('.ks-item.ready .ks-book') || document.querySelector('.ks-item .ks-book');
                window.__samples.push({
                    t: performance.now(),
                    flyer: f ? f.getBoundingClientRect().toJSON() : null,
                    rot: f ? parseFloat(f.style.getPropertyValue('--rot')) : null,
                    item: item ? item.getBoundingClientRect().toJSON() : null,
                    camY: window.__koreshelf ? window.__koreshelf.cameraY() : null,
                    ready: !!document.querySelector('.ks-item.ready'),
                });
                if (window.__samples.length < 900) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }""")
        await page.set_input_files("#file-upload", str(new_book))

        await page.wait_for_selector(".ks-item.ready", timeout=20000)
        assert not await page.locator(".ks-tray-skip").is_visible(), "Con un solo libro non serve 'Salta animazione'"
        await shot(page, "flight_1_ready")
        await page.wait_for_selector(".ks-flyer", timeout=4000)
        await page.wait_for_timeout(600)
        await shot(page, "flight_2_midair")
        await page.wait_for_selector(".ks-flyer", state="detached", timeout=8000)
        await page.wait_for_timeout(300)
        await shot(page, "flight_3_landed")

        samples = await page.evaluate("window.__samples")
        state = await page.evaluate("""() => ({
            active: window.__koreshelf.activeBookId(),
            rect: window.__koreshelf.bookScreenRect(window.__koreshelf.activeBookId()),
            visible: window.__koreshelf.isBookVisible(window.__koreshelf.activeBookId()),
            label: document.querySelector('.top-bar > div').innerText,
            noReload: window.__noReload === true,
        })""")
        await browser.close()

        flight = [s for s in samples if s["flyer"]]
        # Criterio indipendente dagli fps (senza GPU Chromium va a ~7 fps, su un PC vero a 60)
        assert flight, "Nessun libro volante"
        first, last = flight[0], flight[-1]
        duration = (last["t"] - first["t"]) / 1000 if flight else 0
        assert len(flight) >= 6 and duration >= 1.2, (
            f"Il volo deve essere un'animazione, non un salto (frame: {len(flight)}, durata: {duration:.2f}s)")

        # 1. Parte dal vassoio, nel punto in cui c'era il libro con la spunta
        ready_item = next(s["item"] for s in samples if s["ready"] and s["item"])
        cx = lambda r: (r["x"] + r["width"] / 2, r["y"] + r["height"] / 2)
        dx, dy = (a - b for a, b in zip(cx(first["flyer"]), cx(ready_item)))
        assert abs(dx) < 40 and abs(dy) < 40, f"Il volo deve partire dal vassoio (scarto {dx:.0f},{dy:.0f}px)"

        # 2. Si ingrandisce
        assert last["flyer"]["height"] > 2.5 * first["flyer"]["height"], "Il libro deve ingrandirsi durante il volo"

        # 3. Ruota mentre vola, e arriva dritto (di fronte, come il libro attivo)
        rots = [s["rot"] for s in flight if s["rot"] is not None]
        assert rots and max(rots) - min(rots) >= 300, f"Il libro deve ruotare in volo (escursione {max(rots, default=0) - min(rots, default=0):.0f}°)"
        assert abs(((rots[-1] + 180) % 360) - 180) < 15, f"Deve atterrare dritto (rotazione finale {rots[-1]:.0f}°)"

        # 4. Atterra esattamente sul libro 3D nello scaffale
        r, f = state["rect"], last["flyer"]
        ix = max(0, min(r["x"] + r["width"], f["x"] + f["width"]) - max(r["x"], f["x"]))
        iy = max(0, min(r["y"] + r["height"], f["y"] + f["height"]) - max(r["y"], f["y"]))
        inter = ix * iy
        iou = inter / (r["width"] * r["height"] + f["width"] * f["height"] - inter)
        assert iou > 0.75, f"Il libro volante deve sovrapporsi al libro 3D all'atterraggio (IoU {iou:.2f})"

        # 5. La vista scorre fino al nuovo libro, sulla sua mensola
        cams = [round(s["camY"], 3) for s in flight if s["camY"] is not None]
        assert len(set(cams)) >= 5, "La telecamera deve scorrere in modo fluido tra le mensole"
        assert "SAGGI" not in state["label"].upper(), "Alla fine siamo sulla mensola del nuovo libro"
        assert state["active"] not in ids.values(), "Il libro attivo deve essere quello appena caricato"
        assert state["visible"], "Il libro 3D deve essere visibile dopo l'atterraggio"
        assert state["noReload"], "La pagina non deve essere ricaricata"


async def test_multiple_upload_books_appear_on_shelf_only_after_their_flight(p):
    """Caricamento multiplo: ogni libro compare sullo scaffale solo quando ci atterra.
    Un libro ancora in attesa nel vassoio non deve essere già visibile nella libreria."""
    with Server() as srv:
        srv.seed()
        books = srv.home / "multi"
        books.mkdir()
        files = []
        for title, color in [("Primo Volo", (200, 40, 40)), ("Secondo Volo", (40, 160, 200)), ("Terzo Volo", (230, 200, 40))]:
            path = books / f"{title.replace(' ', '_')}.epub"
            make_epub(path, title, "Autore Test", color)
            files.append(str(path))
        browser, ctx, page = await open_app(p)
        await page.evaluate("window.__noReload = true")
        before = set(await page.evaluate("window.__koreshelf.visibleBookIds()"))

        await page.evaluate("""() => {
            window.__multi = [];
            const tick = () => {
                const waiting = [...document.querySelectorAll('.ks-item.ready:not(.landed)')]
                    .map(el => el.dataset.bookId).filter(Boolean);
                window.__multi.push({ visible: window.__koreshelf.visibleBookIds(), waiting,
                                      flyer: !!document.querySelector('.ks-flyer') });
                if (window.__multi.length < 4000) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }""")
        await page.set_input_files("#file-upload", files)
        # aspettiamo che il vassoio abbia finito e si sia chiuso
        await page.wait_for_selector(".ks-tray", state="attached", timeout=10000)
        await page.wait_for_selector(".ks-tray", state="detached", timeout=60000)
        await page.wait_for_timeout(500)
        samples = await page.evaluate("window.__multi")
        final = set(await page.evaluate("window.__koreshelf.visibleBookIds()"))
        no_reload = await page.evaluate("window.__noReload === true")
        await browser.close()

        new_ids = final - before
        assert len(new_ids) == 3, f"Alla fine i 3 libri nuovi devono essere sullo scaffale: {new_ids}"
        assert no_reload, "La pagina non deve ricaricarsi"
        assert any(s["waiting"] for s in samples), "Setup: almeno un libro deve aver aspettato nel vassoio"
        doubles = [(set(s["visible"]) & set(s["waiting"])) for s in samples]
        doubles = [d for d in doubles if d]
        assert not doubles, (f"Libri visibili sullo scaffale mentre aspettano ancora nel vassoio "
                             f"(in {len(doubles)} fotogrammi): {doubles[0]}")
        flights = sum(1 for a, b in zip(samples, samples[1:]) if not a["flyer"] and b["flyer"])
        assert flights == 3, f"Ogni libro deve fare il suo volo: {flights} voli"


async def test_multiple_upload_can_skip_the_animation(p):
    """Caricamento multiplo: un bottone 'Salta animazione' fa comparire subito tutti i libri,
    senza altri voli e senza ricaricare la pagina."""
    with Server() as srv:
        srv.seed()
        books = srv.home / "skip"
        books.mkdir()
        files = []
        for i, color in enumerate([(200, 40, 40), (40, 160, 200), (230, 200, 40), (120, 60, 180)], 1):
            path = books / f"Libro_Veloce_{i}.epub"
            make_epub(path, f"Libro Veloce {i}", "Autore Test", color)
            files.append(str(path))
        browser, ctx, page = await open_app(p)
        await page.evaluate("window.__noReload = true")
        before = set(await page.evaluate("window.__koreshelf.visibleBookIds()"))
        await page.evaluate("""() => {
            window.__skip = [];
            const tick = () => {
                const waiting = [...document.querySelectorAll('.ks-item.ready:not(.landed)')]
                    .map(el => el.dataset.bookId).filter(Boolean);
                window.__skip.push({ t: performance.now(), visible: window.__koreshelf.visibleBookIds(), waiting,
                                     flyer: !!document.querySelector('.ks-flyer') });
                if (window.__skip.length < 5000) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }""")
        await page.set_input_files("#file-upload", files)

        skip = page.locator(".ks-tray-skip")
        await skip.wait_for(state="visible", timeout=5000)
        await page.wait_for_timeout(700)
        await shot(page, "skip_1_button")
        await page.wait_for_selector(".ks-flyer", timeout=20000)   # il primo volo è partito
        t_click = await page.evaluate("performance.now()")
        await skip.click()

        # tutti i libri devono comparire in fretta
        await page.wait_for_function(f"window.__koreshelf.visibleBookIds().length >= {len(before) + 4}", timeout=15000)
        t_done = await page.evaluate("performance.now()")
        await shot(page, "skip_2_done")
        await page.wait_for_selector(".ks-tray", state="detached", timeout=20000)
        samples = await page.evaluate("window.__skip")
        no_reload = await page.evaluate("window.__noReload === true")
        await browser.close()

        after = [s for s in samples if s["t"] > t_click]
        new_flights = sum(1 for a, b in zip(after, after[1:]) if not a["flyer"] and b["flyer"])
        assert new_flights == 0, f"Dopo 'Salta animazione' non devono partire altri voli ({new_flights})"
        # Misurato in fotogrammi: senza GPU il browser qui scende fino a ~1 fotogramma al secondo
        gone_frame = next((i for i, s in enumerate(after) if not s["flyer"]), None)
        assert gone_frame is not None and gone_frame <= 3, \
            f"Il volo in corso deve concludersi subito (sparito dopo {gone_frame} fotogrammi)"
        frames_to_done = sum(1 for s in samples if t_click < s["t"] <= t_done)
        assert frames_to_done <= 12, f"I libri devono comparire subito ({frames_to_done} fotogrammi)"
        doubles = [set(s["visible"]) & set(s["waiting"]) for s in samples]
        doubles = [d for d in doubles if d]
        assert not doubles, f"Mai un libro sia nel vassoio sia sullo scaffale: {doubles[0]}"
        assert no_reload, "La pagina non deve ricaricarsi"


async def test_topbar_buttons_same_size_and_no_shutdown_in_app(p):
    """Barra in alto: bottoni tutti uguali, su una riga e senza testo tagliato (in tutte le lingue);
    niente 'Spegni' nell'app desktop."""
    with Server() as srv:
        srv.seed()
        for lang in ["it", "en", "es", "fr", "de"]:
            browser, ctx, page = await open_app(p, viewport=(1377, 760), desktop=True, lang=lang)
            await shot(page, f"topbar_{lang}")
            sizes = await page.evaluate("""() => [...document.querySelectorAll('.top-bar .tb-btn')]
                .filter(el => el.offsetParent !== null)
                .map(el => ({ text: el.innerText.trim(), w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height,
                              lines: Math.round(el.scrollHeight / parseFloat(getComputedStyle(el).lineHeight || 1)),
                              cut: el.scrollWidth > el.clientWidth + 1 }))""")
            shutdown = await page.evaluate("!!document.querySelector('.top-bar #shutdown-btn')")
            await browser.close()

            assert len(sizes) >= 4, f"[{lang}] Attesi categoria, gestisci, carica e lingua: {sizes}"
            ws, hs = {round(s["w"]) for s in sizes}, {round(s["h"]) for s in sizes}
            assert max(ws) - min(ws) <= 1, f"[{lang}] Larghezze diverse: {[(s['text'], round(s['w'])) for s in sizes]}"
            assert max(hs) - min(hs) <= 1, f"[{lang}] Altezze diverse: {[(s['text'], round(s['h'])) for s in sizes]}"
            assert all(s["lines"] <= 1 for s in sizes), f"[{lang}] Testo su più righe: {sizes}"
            assert not any(s["cut"] for s in sizes), f"[{lang}] Testo troncato: {[s['text'] for s in sizes if s['cut']]}"
            assert not shutdown, f"[{lang}] Nell'app desktop il pulsante Spegni non serve più"


async def test_update_banner_only_for_newer_versions(p):
    """Il banner 'Aggiornamento disponibile' deve comparire solo se su GitHub c'è una versione
    PIÙ NUOVA di quella installata (non una qualunque versione diversa)."""
    with Server() as srv:
        version = api("GET", "/api/ping")["version"]
        major, minor, patch = (int(x) for x in version.split("."))
        cases = {
            f"v{major}.{minor}.{patch}": False,          # stessa versione
            f"v{major - 1}.9.9": False,                  # più vecchia
            f"v{major}.{minor}.{patch + 1}": True,       # più nuova
        }
        for tag, expected in cases.items():
            browser, ctx, page = await open_app(p, github_tag=tag)
            await page.wait_for_timeout(1000)
            shown = await page.evaluate("!!document.querySelector('[id$=update-banner]')")
            await browser.close()
            assert shown == expected, f"GitHub {tag}, installata v{version}: banner {'mostrato' if shown else 'assente'}"


async def test_mobile_external_links_open_by_navigation(p):
    """Sul telefono (Tauri) window.open non apre nulla: i link esterni devono diventare una
    navigazione, che l'app intercetta e passa al browser del sistema."""
    with Server() as srv:
        srv.seed()
        browser = await p.chromium.launch(executable_path=os.environ.get("CHROME_PATH") or None, args=CHROME_ARGS)
        ctx = await browser.new_context(viewport={"width": 1280, "height": 700})
        await ctx.add_init_script("localStorage.setItem('KoreShelf_lang','it'); window.__KORESHELF_DESKTOP__ = true; window.__KORESHELF_MOBILE__ = true;")
        page = await ctx.new_page()
        await page.goto(BASE)
        await page.wait_for_function("document.getElementById('loading-screen').style.display === 'none'", timeout=30000)
        popups, requests = [], []
        ctx.on("page", lambda pg: popups.append(pg))
        page.on("request", lambda r: requests.append(r.url) if r.is_navigation_request() else None)
        await page.route("https://www.amazon.it/**", lambda route: route.abort())
        search = page.locator("input[placeholder^='Cerca per']")
        await search.click()
        await search.type("stephen king", delay=20)
        await page.get_by_text("Cerca «stephen king» su Amazon").click()
        await page.wait_for_timeout(1500)
        await browser.close()
        assert not popups, "Sul telefono niente finestre popup"
        assert any("amazon.it" in u for u in requests), f"Il link deve diventare una navigazione: {requests}"


PHONES = {"iPhone": (390, 844), "Android": (412, 915)}


async def open_phone(p, size, lang="it"):
    """L'app come la vede il telefono (Tauri): schermo stretto, touch, flag dell'app mobile."""
    browser = await p.chromium.launch(executable_path=os.environ.get("CHROME_PATH") or None, args=CHROME_ARGS)
    ctx = await browser.new_context(viewport={"width": size[0], "height": size[1]}, device_scale_factor=1,
                                    is_mobile=True, has_touch=True)
    await ctx.route("https://api.github.com/**", lambda route: route.fulfill(status=404, body="{}"))
    await ctx.add_init_script(f"localStorage.setItem('KoreShelf_lang','{lang}'); "
                              "window.__KORESHELF_DESKTOP__ = true; window.__KORESHELF_MOBILE__ = true;")
    page = await ctx.new_page()
    await page.goto(BASE)
    await page.wait_for_function("document.getElementById('loading-screen').style.display === 'none'", timeout=30000)
    await page.wait_for_timeout(1500)
    return browser, ctx, page


VISIBLE_RECT = """(sel) => { const el = document.querySelector(sel); if (!el) return null;
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    const shown = cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.05 && r.width > 0 && r.height > 0;
    return shown ? r.toJSON() : null; }"""


async def rect(page, sel):
    return await page.evaluate(VISIBLE_RECT, sel)


async def test_mobile_library_follows_design_A(p):
    """Telefono, design A: scaffale 3D a tutto schermo, pochi comandi grandi in alto e un
    pannello in basso con 'Riprendi a leggere'. Niente di superfluo, niente scorrimento laterale."""
    with Server() as srv:
        srv.seed()
        problems = []
        for name, (vw, vh) in PHONES.items():
            browser, ctx, page = await open_phone(p, (vw, vh))
            await stable_camera(page)
            await shot(page, f"mobile_A_{name}")
            overflow = await page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            if overflow > 1:
                problems.append(f"{name}: la pagina scorre in orizzontale di {overflow}px")
            for sel, label in [(".top-bar > div:first-child", "categoria"), ("#ks-search-toggle", "cerca"),
                               ("#ks-add-btn", "aggiungi")]:
                r = await rect(page, sel)
                if not r:
                    problems.append(f"{name}: in alto manca '{label}'")
                elif r["height"] < 44 or r["right"] > vw or r["left"] < 0:
                    problems.append(f"{name}: '{label}' troppo piccolo o fuori schermo {r}")
            for sel, label in [("#ks-key-hints", "suggerimenti tasti"), ("#ks-arrow-left", "freccia sinistra"),
                               ("#ks-arrow-right", "freccia destra"), ("#credits-footer", "footer"),
                               ("#donate-btn", "Supporta"), ("#help-btn", "?")]:
                if await rect(page, sel):
                    problems.append(f"{name}: '{label}' non serve sul telefono")
            sheet = await rect(page, "#ks-book-panel")
            read = await rect(page, "#ks-read-btn")
            if not sheet or sheet["left"] > 1 or sheet["right"] < vw - 1 or abs(sheet["bottom"] - vh) > 2:
                problems.append(f"{name}: il pannello deve occupare tutta la parte bassa {sheet}")
            elif not read or read["width"] < 0.8 * sheet["width"] or read["height"] < 48:
                problems.append(f"{name}: 'Riprendi a leggere' deve essere grande, a tutta larghezza {read}")
            row = await page.evaluate("""() => [...document.querySelectorAll('#ks-mobile-actions > button')]
                .map(b => b.getBoundingClientRect().height)""")
            if len(row) != 3 or min(row) < 44:
                problems.append(f"{name}: servono 3 pulsanti (Trama, Categoria, Altro) da almeno 44px: {row}")
            pos = await page.evaluate("document.getElementById('ks-position')?.innerText || ''")
            if not re.search(r"\d+ di \d+", pos):
                problems.append(f"{name}: manca l'indicazione 'N di M' ({pos!r})")
            active = await page.evaluate("window.__koreshelf.activeBookId()")
            book = await stable_rect(page, active)
            if not 0.40 * vw <= book["width"] <= 0.68 * vw:
                problems.append(f"{name}: il libro deve occupare circa metà larghezza ({book['width']:.0f}px su {vw})")
            if sheet and book["y"] + book["height"] > sheet["top"] + 1:
                problems.append(f"{name}: il pannello copre il libro")
            # Swipe orizzontale: si passa al libro successivo
            y = book["y"] + book["height"] / 2
            await page.mouse.move(vw * 0.8, y)
            await page.mouse.down()
            await page.mouse.move(vw * 0.5, y, steps=4)
            await page.mouse.move(vw * 0.15, y, steps=4)
            await page.mouse.up()
            await page.wait_for_timeout(800)
            if await page.evaluate("window.__koreshelf.activeBookId()") == active and \
                    await page.evaluate("window.__koreshelf.shelfSize()") > 1:
                problems.append(f"{name}: lo swipe deve sfogliare i libri")
            await browser.close()
        assert not problems, "\n".join(problems)


async def test_mobile_more_sheet_category_and_search(p):
    """Telefono: 'Altro' si apre dal basso con voci grandi (anche Gestisci scaffali e Lingua),
    'Categoria' apre l'assegnazione, la ricerca si apre a tutta larghezza dall'icona."""
    with Server() as srv:
        srv.seed()
        vw, vh = PHONES["iPhone"]
        browser, ctx, page = await open_phone(p, (vw, vh))
        problems = []
        await page.click("#ks-more-btn")
        await page.wait_for_timeout(400)
        await shot(page, "mobile_more")
        menu = await rect(page, "#ks-more-menu")
        items = await page.evaluate("""() => [...document.querySelectorAll('#ks-more-menu button')]
            .filter(b => b.offsetParent).map(b => ({ text: b.innerText.trim(), h: b.getBoundingClientRect().height }))""")
        if not menu or menu["left"] < 0 or menu["right"] > vw or menu["bottom"] > vh or vh - menu["bottom"] > 40:
            problems.append(f"'Altro' deve aprirsi dal basso, dentro lo schermo: {menu}")
        texts = " ".join(i["text"].lower() for i in items)
        for word in ["modifica", "elimina", "gestisci", "lingua"]:
            if word not in texts:
                problems.append(f"Nel menu 'Altro' manca '{word}': {texts}")
        if any(i["h"] < 44 for i in items):
            problems.append(f"Voci del menu troppo piccole per il dito: {items}")
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(300)

        await page.click("#ks-mobile-category")
        await page.wait_for_timeout(500)
        if not await rect(page, "#assign-category-overlay"):
            problems.append("'Categoria' deve aprire l'assegnazione della categoria")
        await page.keyboard.press("Escape")
        await page.evaluate("document.getElementById('assign-category-overlay')?.remove()")

        await page.click("#ks-search-toggle")
        await page.wait_for_timeout(300)
        search = await rect(page, ".top-bar > input.modern-input")
        focused = await page.evaluate("document.activeElement && document.activeElement.tagName === 'INPUT'")
        if not search or search["width"] < 0.7 * vw or not focused:
            problems.append(f"La ricerca deve aprirsi a tutta larghezza e pronta a scrivere: {search}")
        await page.keyboard.type("stephen king", delay=15)
        await page.wait_for_timeout(1200)
        sug = await page.evaluate("""() => {
            const d = [...document.querySelectorAll('div.glass-effect')].find(x => x.innerText.includes('su Amazon')
                && getComputedStyle(x).display !== 'none');
            return d ? d.getBoundingClientRect().toJSON() : null; }""")
        if not sug or sug["right"] > vw + 1 or sug["left"] < -1:
            problems.append(f"Il suggerimento Amazon deve stare dentro lo schermo: {sug}")
        await shot(page, "mobile_search")
        await browser.close()
        assert not problems, "\n".join(problems)


async def test_mobile_empty_library_fits_the_screen(p):
    """Telefono, libreria vuota: tutto dentro lo schermo, pulsanti grandi."""
    with Server() as srv:
        problems = []
        for name, (vw, vh) in PHONES.items():
            browser, ctx, page = await open_phone(p, (vw, vh))
            await shot(page, f"mobile_empty_{name}")
            overflow = await page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            slots = await page.evaluate("""() => [...document.querySelectorAll('#empty-library-hint .ks-slot')]
                .map(s => s.getBoundingClientRect().toJSON())""")
            for sel in ["#ks-choose-files", "#ks-sample-book"]:
                r = await rect(page, sel)
                if not r or r["height"] < 44 or r["bottom"] > vh or r["right"] > vw:
                    problems.append(f"{name}: {sel} deve essere visibile e grande {r}")
            if overflow > 1:
                problems.append(f"{name}: scorrimento orizzontale di {overflow}px")
            if len(slots) != 4 or any(s["right"] > vw or s["left"] < 0 for s in slots):
                problems.append(f"{name}: i 4 posti vuoti devono stare nello schermo")
            await browser.close()
        assert not problems, "\n".join(problems)


async def test_mobile_reader_has_thumb_friendly_controls(p):
    """Telefono, lettore: 'indietro' in alto, in basso Indice / Stile / Tema, tocco sul bordo per
    girare pagina; il menu Stile sta nello schermo."""
    with Server() as srv:
        path = srv.home / "Tipografia.epub"
        make_epub(path, "Manuale di Tipografia", "Autore Test", (60, 60, 60), chapters=LONG_PARAGRAPHS)
        book = api("POST", "/api/upload", files={"ebook": path})["book"]
        vw, vh = PHONES["iPhone"]
        browser, ctx, page = await open_phone(p, (vw, vh))
        await open_reader(page, book)
        await shot(page, "mobile_reader")
        problems = []
        bar = await rect(page, "#ks-reader-bar")
        if not bar or abs(bar["bottom"] - vh) > 2 or bar["width"] < vw - 2:
            problems.append(f"Serve la barra in basso a tutta larghezza: {bar}")
        for action in ["toc", "style", "theme"]:
            r = await rect(page, f"#ks-reader-bar [data-action={action}]")
            if not r or r["height"] < 44:
                problems.append(f"Nella barra manca '{action}' (o è troppo piccolo): {r}")
        back = await rect(page, "#ks-reader-back")
        if not back or back["left"] > 24 or back["height"] < 44:
            problems.append(f"Serve 'indietro' in alto a sinistra: {back}")
        for sel in ["#prev-page-btn", "#next-page-btn", "#hamburger-menu-btn", "#close-reader-btn"]:
            if await rect(page, sel):
                problems.append(f"Sul telefono {sel} è sostituito dalla barra")

        before = await page.evaluate("rendition.currentLocation().start.cfi")
        await page.mouse.click(vw - 25, vh * 0.45)
        await page.wait_for_timeout(900)
        after = await page.evaluate("rendition.currentLocation().start.cfi")
        if before == after:
            problems.append("Toccare il bordo destro deve girare pagina")

        await page.click("#ks-reader-bar [data-action=style]")
        await page.wait_for_timeout(500)
        side = await rect(page, "#settings-sidebar")
        presets = await page.locator("#settings-sidebar .ks-preset").count()
        if not side or side["right"] > vw + 1 or presets < 3:
            problems.append(f"'Stile' apre i preset dentro lo schermo: {side}")
        await page.click("#close-sidebar-btn")
        await page.wait_for_timeout(400)
        await page.click("#ks-reader-back")
        await page.wait_for_function("document.getElementById('reader-overlay').style.display === 'none'", timeout=8000)
        await browser.close()
        assert not problems, "\n".join(problems)


ANDROID_SYSTEM_BARS = {"top": 32, "bottom": 24}   # barra di stato e barra di navigazione


async def emulate_system_bars(ctx, page, insets=ANDROID_SYSTEM_BARS):
    """Come su Android: lo schermo arriva sotto la barra di stato e quella di navigazione
    (safe-area-inset-top / -bottom)."""
    cdp = await ctx.new_cdp_session(page)
    await cdp.send("Emulation.setSafeAreaInsetsOverride", {"insets": {"top": insets["top"], "bottom": insets["bottom"],
                                                                      "left": 0, "right": 0}})
    probe = await page.evaluate("""() => { const d = document.createElement('div');
        d.style.cssText = 'position:fixed;top:0;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)';
        document.body.appendChild(d); const cs = getComputedStyle(d);
        const r = [parseFloat(cs.paddingTop), parseFloat(cs.paddingBottom)]; d.remove(); return r; }""")
    assert probe == [insets["top"], insets["bottom"]], f"Setup: zone di sistema non simulate ({probe})"


async def test_mobile_reader_search_is_aligned_with_back_below_status_bar(p):
    """Android: 'Cerca' sta alla stessa altezza della freccia indietro, sotto la barra di stato."""
    with Server() as srv:
        path = srv.home / "Tipografia.epub"
        make_epub(path, "Manuale di Tipografia", "Autore Test", (60, 60, 60), chapters=LONG_PARAGRAPHS)
        book = api("POST", "/api/upload", files={"ebook": path})["book"]
        vw, vh = PHONES["Android"]
        browser, ctx, page = await open_phone(p, (vw, vh))
        await emulate_system_bars(ctx, page)
        await open_reader(page, book)
        await shot(page, "android_reader_top")
        back = await rect(page, "#ks-reader-back")
        search = await rect(page, "#reader-search-btn")
        await browser.close()
        top = ANDROID_SYSTEM_BARS["top"]
        problems = []
        if not back or not search:
            problems.append(f"Freccia indietro o Cerca non visibili: {back} {search}")
        else:
            if back["top"] < top or search["top"] < top:
                problems.append(f"Sotto la barra di stato (alta {top}px): indietro {back['top']:.0f}, cerca {search['top']:.0f}")
            centre = lambda r: r["top"] + r["height"] / 2
            if abs(centre(back) - centre(search)) > 2:
                problems.append(f"Cerca deve stare alla stessa altezza della freccia: {centre(search):.0f} vs {centre(back):.0f}")
            if search["height"] < 44 or search["right"] > vw:
                problems.append(f"Cerca troppo piccolo o fuori schermo: {search}")
        assert not problems, "\n".join(problems)


async def test_mobile_reader_scroll_mode_text_never_under_bottom_bar(p):
    """Android, modalità scorrimento: il testo non finisce mai sotto la barra Indice/Stile/Tema,
    nemmeno arrivando in fondo al capitolo."""
    with Server() as srv:
        path = srv.home / "Tipografia.epub"
        make_epub(path, "Manuale di Tipografia", "Autore Test", (60, 60, 60), chapters=LONG_PARAGRAPHS)
        book = api("POST", "/api/upload", files={"ebook": path})["book"]
        vw, vh = PHONES["Android"]
        browser, ctx, page = await open_phone(p, (vw, vh))
        await page.evaluate("localStorage.setItem('readerFlow', 'scrolled-doc')")
        await emulate_system_bars(ctx, page)
        await open_reader(page, book)
        bar = await rect(page, "#ks-reader-bar")
        geo = await page.evaluate("""() => {
            const viewer = document.getElementById('viewer');
            const scroller = [viewer, ...viewer.querySelectorAll('*')]
                .find(el => el.scrollHeight > el.clientHeight + 20 && /(auto|scroll)/.test(getComputedStyle(el).overflowY));
            const area = (scroller || viewer).getBoundingClientRect();
            return { area: area.toJSON(), found: !!scroller };
        }""")
        # Fino in fondo: epub.js aggiunge capitoli mentre si scorre, quindi si scorre finché
        # il contenuto non finisce davvero
        end = await page.evaluate("""async () => {
            const scroller = [...document.querySelectorAll('#viewer *')]
                .find(el => el.scrollHeight > el.clientHeight + 20 && /(auto|scroll)/.test(getComputedStyle(el).overflowY));
            if (!scroller) return null;
            // epub.js può star caricando il capitolo successivo: fermi solo dopo 3 controlli uguali
            let last = -1, still = 0;
            for (let i = 0; i < 80 && still < 3; i++) {
                scroller.scrollTop = scroller.scrollHeight;
                await new Promise(r => setTimeout(r, 300));
                still = scroller.scrollTop === last ? still + 1 : 0;
                last = scroller.scrollTop;
            }
            return { atEnd: scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2,
                     bottom: scroller.getBoundingClientRect().bottom };
        }""")
        await page.wait_for_timeout(500)
        await shot(page, "android_reader_scroll_end")
        bar_top = (await rect(page, "#ks-reader-bar"))["top"]
        hits = await page.evaluate("""(y) => {
            const x = window.innerWidth / 2;
            const above = document.elementFromPoint(x, y - 6);
            const inside = document.elementFromPoint(x, y + 12);
            return { above: above && (above.tagName + (above.closest('#viewer') ? ' in viewer' : '')),
                     inside: inside && (inside.closest('#ks-reader-bar') ? 'barra' : inside.tagName) };
        }""", bar_top)
        await browser.close()
        problems = []
        if not bar:
            problems.append("Barra in basso non visibile")
        else:
            if geo["area"]["bottom"] > bar["top"] + 1:
                problems.append(f"L'area che scorre finisce sotto la barra: {geo['area']['bottom']:.0f} > {bar['top']:.0f}")
            if not end or not end["atEnd"] or end["bottom"] > bar["top"] + 1:
                problems.append(f"Arrivati in fondo, l'area del testo deve finire sopra la barra: {end}")
            if "in viewer" not in str(hits["above"]):
                problems.append(f"Appena sopra la barra deve vedersi il testo del libro: {hits}")
            if hits["inside"] != "barra":
                problems.append(f"Dentro la barra ci sono i suoi pulsanti, non il testo: {hits}")
            if abs(bar["bottom"] - vh) > 1:
                problems.append(f"La barra deve arrivare in fondo allo schermo: {bar}")
        assert not problems, "\n".join(problems)


async def test_shutdown_still_available_in_browser_mode(p):
    """Se manca WebView2 l'app si apre nel browser: lì serve ancora il pulsante per chiuderla."""
    with Server() as srv:
        srv.seed()
        browser, ctx, page = await open_app(p, desktop=False)
        shutdown = await page.evaluate("!!document.querySelector('.top-bar #shutdown-btn')")
        await browser.close()
        assert shutdown, "In modalità browser il pulsante Spegni deve restare"


async def test_delete_dissolves_book_and_waits_before_leaving_the_shelf(p):
    """Eliminare un libro: finestra dell'app (niente popup), niente ricaricamento.
    Il libro si sgretola in frammenti a partire da un lato e il vento li porta via.
    Se è l'ultimo libro della mensola, la vista resta su quella mensola finché
    l'animazione non è finita, e solo dopo passa a un'altra."""
    with Server() as srv:
        ids, _ = srv.seed()
        browser, ctx, page = await open_app(p)
        native = []
        page.on("dialog", lambda d: (native.append(d.message), asyncio.ensure_future(d.dismiss())))
        await page.evaluate("window.__noReload = true")

        victim = await page.evaluate("window.__koreshelf.activeBookId()")
        assert victim == ids["Gamma Romanzo"], "Setup: partiamo dall'unico libro della mensola 'Senza categoria'"
        label_before = await page.evaluate("document.querySelector('.top-bar > div').innerText")
        delete_btn = DeleteAction(page)

        # 1. Annulla: non succede nulla
        await delete_btn.click()
        dialog = page.locator("#ks-confirm")
        await dialog.wait_for(state="visible", timeout=3000)
        await page.wait_for_timeout(400)
        await shot(page, "delete_1_dialog")
        await dialog.locator("[data-action=cancel]").click()
        await dialog.wait_for(state="detached", timeout=3000)
        assert len(api("GET", "/api/books")) == 3, "Annullando il libro deve restare"

        # 2. Conferma. Registriamo frame per frame: pixel dell'effetto, telecamera ed etichetta mensola.
        await delete_btn.click()
        rect = await stable_rect(page, victim)
        cam_before = await stable_camera(page)
        target_before = await page.evaluate("window.__koreshelf.cameraTargetY()")
        await page.evaluate("""(rect) => {
            window.__fx = [];
            const t0 = performance.now();
            const probe = () => {
                const c = document.getElementById('ks-dissolve-canvas');
                const sample = { t: performance.now() - t0, on: !!c,
                    cam: window.__koreshelf.cameraY(),
                    target: window.__koreshelf.cameraTargetY(),
                    label: document.querySelector('.top-bar > div').innerText };
                if (c) {
                    // Solo la zona attorno al libro (dove avviene l'effetto): la sonda resta leggera
                    const k = c.width / window.innerWidth;
                    const x0 = Math.max(0, Math.floor((rect.x - 60) * k)), y0 = Math.max(0, Math.floor((rect.y - 260) * k));
                    const x1 = Math.min(c.width, Math.ceil((rect.x + rect.width + 420) * k)), y1 = Math.min(c.height, Math.ceil((rect.y + rect.height + 60) * k));
                    const w = x1 - x0, h = y1 - y0;
                    const d = c.getContext('2d').getImageData(x0, y0, w, h).data;
                    let inside = 0, outside = 0, left = 0, right = 0, green = 0;
                    const cx = rect.x + rect.width / 2;
                    for (let y = 0; y < h; y += 4) for (let x = 0; x < w; x += 4) {
                        const i = (y * w + x) * 4;
                        if (d[i + 3] < 40) continue;
                        const X = (x + x0) / k, Y = (y + y0) / k;
                        const inRect = X >= rect.x && X <= rect.x + rect.width && Y >= rect.y && Y <= rect.y + rect.height;
                        if (inRect) { inside++; if (X < cx) left++; else right++; }
                        else if (X < rect.x - 12 || X > rect.x + rect.width + 12 || Y < rect.y - 12 || Y > rect.y + rect.height + 12) outside++;
                        if (inRect && d[i + 1] > d[i] + 25 && d[i + 1] > d[i + 2] + 15) green++;
                    }
                    Object.assign(sample, { inside, outside, left, right, green });
                }
                window.__fx.push(sample);
                if (performance.now() - t0 < 9000) setTimeout(probe, 60);
            };
            probe();
        }""", rect)
        await dialog.locator("[data-action=confirm]").click()
        await page.wait_for_selector("#ks-dissolve-canvas", state="attached", timeout=4000)
        await page.wait_for_timeout(700)
        await shot(page, "delete_2_dissolve")
        await page.wait_for_selector("#ks-dissolve-canvas", state="detached", timeout=10000)
        await page.wait_for_timeout(2500)
        await shot(page, "delete_3_after")

        fx = await page.evaluate("window.__fx")
        state = await page.evaluate("""() => ({
            noReload: window.__noReload === true,
            loading: document.getElementById('loading-screen').style.display,
            active: window.__koreshelf.activeBookId(),
            label: document.querySelector('.top-bar > div').innerText,
            cam: window.__koreshelf.cameraY(),
            target: window.__koreshelf.cameraTargetY(),
        })""")
        gone = await page.evaluate(f"window.__koreshelf.bookScreenRect('{victim}')")
        await browser.close()

        books = api("GET", "/api/books")
        assert not native, f"Nessun popup di sistema, trovati: {native}"
        assert state["noReload"] and state["loading"] == "none", "La pagina non deve ricaricarsi"
        assert len(books) == 2 and victim not in [b["id"] for b in books], "Il libro va eliminato dal server"
        assert gone is None, "Il libro non deve più essere nello scaffale 3D"

        during = [f for f in fx if f["on"] and "inside" in f]
        on_all = [f for f in fx if f["on"]]
        span = (on_all[-1]["t"] - on_all[0]["t"]) / 1000 if on_all else 0
        gaps = [round(b["t"] - a["t"]) for a, b in zip(fx, fx[1:])][:12]
        assert len(during) >= 3 and span >= 1.5, \
            f"L'animazione deve durare (campioni: {len(during)}, durata {span:.2f}s, intervalli {gaps})"
        first = during[0]
        # a. All'inizio l'effetto mostra proprio il libro (copertina verde), senza salti
        assert first["green"] > 0.3 * first["inside"] and first["inside"] > 100, \
            f"All'inizio si deve vedere il libro stesso: {first}"
        # b. Si sgretola progressivamente
        insides = [f["inside"] for f in during]
        assert insides[-1] < 0.25 * insides[0], f"Il libro deve sgretolarsi del tutto: {insides}"
        # c. A partire da un lato
        mid = [f for f in during if 0.25 * first["inside"] < f["inside"] < 0.75 * first["inside"]]
        assert mid and any(abs(f["left"] - f["right"]) > 0.3 * (f["left"] + f["right"]) for f in mid), \
            f"Lo sgretolamento deve procedere da un lato all'altro: {[(f['left'], f['right']) for f in mid]}"
        # d. I frammenti volano via fuori dal libro
        assert max(f["outside"] for f in during) > 30, "I frammenti devono essere portati via dal vento"

        # e. Ultimo libro della mensola: la vista resta lì finché l'animazione non finisce...
        assert all(f["label"] == label_before for f in fx if f["on"]), "Durante l'animazione si resta sulla mensola"
        on = [f for f in fx if f["on"]]
        assert all(f["target"] == target_before for f in on), \
            f"Durante l'animazione la telecamera punta sempre la stessa mensola: {[f['target'] for f in on]}"
        dist = [abs(f["cam"] - target_before) for f in on]
        assert all(b <= a + 0.01 for a, b in zip(dist, dist[1:])), \
            f"La telecamera non deve allontanarsi dalla mensola durante l'animazione: {[round(f['cam'], 2) for f in on]}"
        # ...e solo dopo passa a un'altra mensola
        assert state["label"] != label_before and state["active"] != victim, "Dopo l'animazione si va su un'altra mensola"
        switched = next((i for i, f in enumerate(fx) if f["label"] != label_before), None)
        last_on = max(i for i, f in enumerate(fx) if f["on"])
        assert switched is not None and switched > last_on, \
            "Il passaggio all'altra mensola deve avvenire solo dopo la fine dell'animazione"


async def test_delete_neighbour_waits_until_dissolve_has_finished(p):
    """Mensola con più libri: mentre il libro cancellato si sgretola, il vicino resta fermo
    al suo posto; solo quando l'animazione è finita scivola dove c'era il libro cancellato."""
    with Server() as srv:
        ids, _ = srv.seed()
        browser, ctx, page = await open_app(p)
        # Andiamo sulla mensola 'Saggi' (Alpha e Beta)
        await page.mouse.move(640, 300)
        await page.mouse.down()
        await page.mouse.move(640, 380, steps=5)
        await page.mouse.move(640, 460, steps=5)
        await page.mouse.up()
        victim = await page.evaluate("window.__koreshelf.activeBookId()")
        saggi = {ids["Alpha Saggio"], ids["Beta Saggio"]}
        assert victim in saggi, "Setup: il libro attivo deve essere sulla mensola Saggi"
        neighbour = (saggi - {victim}).pop()

        victim_rect = await stable_rect(page, victim)
        await stable_rect(page, neighbour)
        await DeleteAction(page).click()
        dialog = page.locator("#ks-confirm")
        await dialog.wait_for(state="visible", timeout=3000)
        neighbour_before = await stable_rect(page, neighbour)
        await page.evaluate("""(id) => {
            window.__nb = [];
            const t0 = performance.now();
            const tick = () => {
                window.__nb.push({ t: performance.now() - t0, on: !!document.getElementById('ks-dissolve-canvas'),
                                   rect: window.__koreshelf.bookScreenRect(id),
                                   active: window.__koreshelf.activeBookId() });
                if (performance.now() - t0 < 12000) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }""", neighbour)
        await dialog.locator("[data-action=confirm]").click()
        await page.wait_for_selector("#ks-dissolve-canvas", state="attached", timeout=4000)
        await page.wait_for_timeout(600)
        await shot(page, "neighbour_1_during")
        await page.wait_for_selector("#ks-dissolve-canvas", state="detached", timeout=10000)
        neighbour_after = await stable_rect(page, neighbour)
        await shot(page, "neighbour_2_after")
        samples = await page.evaluate("window.__nb")
        active = await page.evaluate("window.__koreshelf.activeBookId()")
        await browser.close()

        during = [s for s in samples if s["on"] and s["rect"]]
        assert len(during) >= 5, f"Campioni durante l'animazione: {len(during)}"
        cx = lambda r: r["x"] + r["width"] / 2
        moved = [round(cx(s["rect"]) - cx(neighbour_before)) for s in during]
        assert all(abs(m) <= 3 for m in moved), \
            f"Durante lo sgretolamento il libro accanto deve restare fermo (spostamento in px: {moved})"
        assert all(s["active"] != neighbour for s in samples if s["on"]), \
            "Il libro accanto diventa quello attivo solo a fine animazione"

        # Dopo: il vicino prende il posto del libro cancellato
        r, f = victim_rect, neighbour_after
        ix = max(0, min(r["x"] + r["width"], f["x"] + f["width"]) - max(r["x"], f["x"]))
        iy = max(0, min(r["y"] + r["height"], f["y"] + f["height"]) - max(r["y"], f["y"]))
        iou = ix * iy / (r["width"] * r["height"] + f["width"] * f["height"] - ix * iy)
        assert active == neighbour and iou > 0.75, \
            f"Finita l'animazione il libro accanto si mette al posto di quello cancellato (IoU {iou:.2f})"


async def test_footer_shows_mit_license(p):
    """Il footer dice che KoreShelf è open source con licenza MIT (non 'tutti i diritti riservati')."""
    reserved = ["riservati", "reserved", "reservados", "réservés", "vorbehalten"]
    with Server() as srv:
        for lang in ["it", "en", "es", "fr", "de"]:
            browser, ctx, page = await open_app(p, lang=lang)
            text = await page.evaluate("document.getElementById('credits-footer').innerText")
            link = await page.evaluate("[...document.querySelectorAll('#credits-footer a')].map(a => a.href).join(' ')")
            await browser.close()
            assert "MIT" in text, f"[{lang}] Manca la licenza MIT: {text!r}"
            assert not any(w in text.lower() for w in reserved), f"[{lang}] Non è 'tutti i diritti riservati': {text!r}"
            assert "GabrieleTrovato01" in text, f"[{lang}] Il credito all'autore deve restare: {text!r}"
            assert "LICENSE" in link or "licenses/MIT" in link, f"[{lang}] 'MIT' deve portare al testo della licenza: {link}"


async def stable_camera(page, timeout=30):
    """Altezza della telecamera quando è ferma da 4 fotogrammi effettivamente disegnati."""
    return await page.evaluate("""async (timeout) => {
        const frame = () => new Promise(r => requestAnimationFrame(() => r()));
        const end = performance.now() + timeout * 1000;
        let last = null, still = 0;
        while (performance.now() < end) {
            await frame();
            const y = window.__koreshelf.cameraY();
            still = (last !== null && Math.abs(y - last) < 0.0005) ? still + 1 : 0;
            if (still >= 4) return y;
            last = y;
        }
        return last;
    }""", timeout)


async def stable_rect(page, book_id, timeout=20):
    """Rettangolo del libro sullo schermo quando carosello e telecamera sono fermi.
    'Fermo' = immobile per 4 fotogrammi effettivamente disegnati (senza GPU il browser
    può restare a lungo senza disegnare: un controllo a tempo si farebbe ingannare)."""
    return await page.evaluate("""async ([id, timeout]) => {
        const frame = () => new Promise(r => requestAnimationFrame(() => r()));
        const end = performance.now() + timeout * 1000;
        let last = null, still = 0;
        while (performance.now() < end) {
            await frame();
            const r = window.__koreshelf.bookScreenRect(id);
            if (!r) return null;
            const same = last && ['x', 'y', 'width', 'height'].every(k => Math.abs(r[k] - last[k]) < 0.3);
            still = same ? still + 1 : 0;
            if (still >= 4) return r;
            last = r;
        }
        return last;
    }""", [book_id, timeout])


class DeleteAction:
    """'Elimina' si trova nel menu 'Altro' sotto il libro attivo."""
    def __init__(self, page):
        self.page = page

    async def click(self):
        await self.page.click("#ks-more-btn")
        await self.page.locator("#ks-more-menu [data-action=delete]").click()


async def test_empty_library_explains_itself(p):
    """Libreria vuota (design B): uno scaffale con i posti vuoti che spiegano cosa farà l'app,
    'Scegli i file', 'Prova con un libro di esempio' e la rassicurazione sulla privacy."""
    with Server() as srv:
        browser, ctx, page = await open_app(p)
        hint = page.locator("#empty-library-hint")
        await hint.wait_for(state="visible", timeout=5000)
        await shot(page, "empty_B")
        text = await hint.inner_text()
        slots = await page.locator("#empty-library-hint .ks-slot").count()
        captions = await page.locator("#empty-library-hint .ks-slot-caption").all_inner_texts()
        has_old_amazon_box = await page.locator("#empty-library-hint input").count()
        async with page.expect_file_chooser(timeout=3000) as chooser:
            await page.click("#ks-choose-files")
        chosen = await chooser.value
        await browser.close()
        assert "Il tuo scaffale ti aspetta" in text, text
        assert slots == 4 and all(c.strip() for c in captions), f"4 posti vuoti con la loro spiegazione: {captions}"
        assert "Prova con un libro di esempio" in text
        assert "computer" in text, "Serve la frase sulla privacy (i libri restano sul computer)"
        assert has_old_amazon_box == 0, "La ricerca Amazon sta nella barra in alto, non nel riquadro"
        assert chosen.is_multiple(), "'Scegli i file' apre la scelta di più file"


async def test_sample_book_lands_on_the_shelf(p):
    """'Prova con un libro di esempio': il libro di esempio arriva sullo scaffale con il suo volo,
    e un secondo clic non crea doppioni."""
    with Server() as srv:
        browser, ctx, page = await open_app(p)
        await page.click("#ks-sample-book")
        await page.wait_for_selector(".ks-flyer", timeout=20000)
        await page.wait_for_selector(".ks-tray", state="detached", timeout=30000)
        await page.wait_for_timeout(500)
        await shot(page, "sample_landed")
        visible = await page.evaluate("window.__koreshelf.visibleBookIds()")
        hint_visible = await page.locator("#empty-library-hint").is_visible()
        books = api("GET", "/api/books")
        await browser.close()
        assert len(books) == 1 and len(visible) == 1, f"Un libro sullo scaffale: {books}"
        assert "KoreShelf" in books[0]["title"], f"È il libro di esempio: {books[0]['title']}"
        assert books[0]["coverPath"], "Il libro di esempio ha la sua copertina"
        assert len(books[0]["description"]) > 60, "E una trama"
        assert not hint_visible, "Con un libro sullo scaffale il riquadro 'libreria vuota' sparisce"


async def test_library_shows_a_clear_primary_action(p):
    """Libreria con libri (design C): sotto il libro attivo titolo, autore, avanzamento e un grande
    'Riprendi a leggere' che apre il libro; le azioni rare stanno nel menu 'Altro'."""
    with Server() as srv:
        ids, _ = srv.seed()
        api("PUT", f"/api/books/{ids['Gamma Romanzo']}/progress", {"progress": 0.34})
        browser, ctx, page = await open_app(p)
        await shot(page, "library_C")
        read = page.locator("#ks-read-btn")
        await read.wait_for(state="visible", timeout=5000)
        caption = await page.locator("#ks-active-book").inner_text()
        read_text = await read.inner_text()
        hints = await page.locator("#ks-key-hints").inner_text()
        more_hidden = not await page.locator("#ks-more-menu [data-action=delete]").is_visible()
        await page.click("#ks-more-btn")
        menu = await page.locator("#ks-more-menu").inner_text()
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(300)
        menu_closed = not await page.locator("#ks-more-menu").is_visible()
        old_toolbar = await page.locator("button", has_text="Modifica metadati").locator("visible=true").count()

        # Il libro attivo cambia: la didascalia lo segue
        await page.keyboard.press("ArrowUp")
        await page.wait_for_timeout(1500)
        caption_after = await page.locator("#ks-active-book").inner_text()
        await page.keyboard.press("ArrowDown")
        await page.wait_for_timeout(1500)

        await read.click()
        await page.wait_for_function("document.getElementById('reader-overlay').style.display === 'block'", timeout=15000)
        await browser.close()

        assert "Gamma Romanzo" in caption and "Autore Test" in caption and "34%" in caption, caption
        assert "Riprendi a leggere" in read_text, read_text
        assert "←" in hints and "↑" in hints, hints
        assert more_hidden, "Elimina non è a vista: sta nel menu 'Altro'"
        for item in ["Assegna categoria", "Modifica", "Elimina"]:
            assert item.lower() in menu.lower(), f"Nel menu 'Altro' manca {item}: {menu}"
        assert menu_closed, "Esc chiude il menu"
        assert old_toolbar == 0, "La vecchia barra con 4 bottoni uguali non c'è più"
        assert caption_after != caption, "La didascalia segue il libro attivo"


EMOJI = re.compile("[\U0001F000-\U0001FAFF\U0001F1E6-\U0001F1FF\u2600-\u27BF\u2B00-\u2BFF\u2300-\u23FF\uFE0F]")


def test_sources_have_no_emoji():
    """Nessuna emoji nei sorgenti dell'interfaccia (traduzioni comprese): un'app professionale
    usa icone disegnate, non emoji."""
    front = ROOT / "frontend"
    files = [*front.glob("src/**/*.js"), *front.glob("public/*.js"), front / "index.html"]
    found = []
    for f in files:
        for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            # anche le entità HTML (&#10094; ecc.)
            line = re.sub(r"&#(\d+);", lambda m: chr(int(m.group(1))), line)
            line = re.sub(r"&#x([0-9a-fA-F]+);", lambda m: chr(int(m.group(1), 16)), line)
            for ch in set(EMOJI.findall(line)):
                found.append(f"{f.relative_to(ROOT)}:{n} {ch}")
    assert not found, f"{len(found)} emoji trovate, ad esempio: {found[:8]}"


async def test_interface_shows_no_emoji(p):
    """Nemmeno a schermo: libreria, guida, menu 'Altro', lettore e suo menu laterale."""
    with Server() as srv:
        ids, _ = srv.seed()
        browser, ctx, page = await open_app(p)
        texts = {"libreria": await page.evaluate("document.body.innerText")}
        await page.click("#ks-more-btn")
        texts["menu Altro"] = await page.locator("#ks-more-menu").inner_text()
        await page.keyboard.press("Escape")
        help_btn = page.locator("#help-btn")
        if await help_btn.count():
            await help_btn.click()
            await page.wait_for_timeout(500)
            texts["guida"] = await page.evaluate("document.body.innerText")
            await page.click("#close-help-btn")
            await page.wait_for_timeout(400)
        book = next(b for b in api("GET", "/api/books") if b["id"] == ids["Gamma Romanzo"])
        await open_reader(page, book)
        await page.click("#hamburger-menu-btn")
        await page.wait_for_timeout(500)
        texts["lettore"] = await page.locator("#reader-overlay").inner_text()
        await browser.close()
        bad = {k: sorted(set(EMOJI.findall(v))) for k, v in texts.items() if EMOJI.search(v)}
        assert not bad, f"Emoji a schermo: {bad}"


async def test_bottom_panel_does_not_overlap(p):
    """Pannello sotto il libro: suggerimenti dei tasti più in alto, sopra i pulsanti, e nessuna
    sovrapposizione con didascalia, pulsanti e footer della licenza."""
    with Server() as srv:
        srv.seed()
        problems = []
        for vw, vh in [(1280, 700), (1377, 760), (1600, 900)]:
            browser, ctx, page = await open_app(p, viewport=(vw, vh))
            r = await page.evaluate("""() => Object.fromEntries([
                    ['tasti', '#ks-key-hints'], ['didascalia', '#ks-active-book'],
                    ['pulsanti', '.ks-actions'], ['footer', '#credits-footer']]
                .map(([k, sel]) => [k, document.querySelector(sel).getBoundingClientRect().toJSON()]))""")
            await shot(page, f"bottom_{vw}x{vh}")
            await browser.close()
            names = list(r)
            for i in range(len(names)):
                for j in range(i + 1, len(names)):
                    a, b = r[names[i]], r[names[j]]
                    if a["width"] and b["width"] and a["left"] < b["right"] and b["left"] < a["right"] \
                            and a["top"] < b["bottom"] and b["top"] < a["bottom"]:
                        problems.append(f"{vw}x{vh}: {names[i]} si sovrappone a {names[j]}")
            if not r["tasti"]["bottom"] <= r["pulsanti"]["top"]:
                problems.append(f"{vw}x{vh}: i suggerimenti dei tasti devono stare sopra i pulsanti")
        assert not problems, "\n".join(problems)


LONG_PARAGRAPHS = [" ".join(["Il lettore attento osserva come la riga di testo, se troppo lunga, affatica l'occhio "
                             "e rende difficile ritrovare l'inizio della riga successiva."] * 12)] * 3


async def measure_typography(page):
    """Misura sul testo vero del libro: caratteri per riga, interlinea, allineamento, sillabazione."""
    return await page.evaluate("""() => {
        const frame = document.querySelector('#viewer iframe');
        const doc = frame.contentDocument;
        const p = [...doc.querySelectorAll('p')].find(el => el.textContent.length > 400);
        const text = p.firstChild;
        const range = doc.createRange();
        const tops = [];
        let lineChars = [], count = 0, top = null;
        for (let i = 0; i < Math.min(text.length, 1500); i++) {
            range.setStart(text, i); range.setEnd(text, i + 1);
            const rect = range.getClientRects()[0];
            if (!rect) continue;
            if (top === null) top = rect.top;
            if (Math.abs(rect.top - top) > 2) { lineChars.push(count); count = 0; top = rect.top; }
            count++;
            if (lineChars.length >= 4) break;
        }
        const cs = frame.contentWindow.getComputedStyle(p);
        const fs = parseFloat(cs.fontSize);
        return {
            chars: lineChars.slice(0, 3),
            lineHeight: parseFloat(cs.lineHeight) / fs,
            fontSize: fs, family: cs.fontFamily, align: cs.textAlign,
            hyphens: cs.hyphens || cs.webkitHyphens,
        };
    }""")


async def test_reader_sidebar_is_simple_with_typographic_presets(p):
    """Menu laterale del lettore: poche parole e preset di lettura che rispettano le regole
    della tipografia editoriale (45–75 caratteri per riga, interlinea 1,3–1,9, giustificato solo
    con sillabazione). La scelta resta memorizzata."""
    with Server() as srv:
        path = srv.home / "Tipografia.epub"
        make_epub(path, "Manuale di Tipografia", "Autore Test", (60, 60, 60), chapters=LONG_PARAGRAPHS)
        book = api("POST", "/api/upload", files={"ebook": path})["book"]
        browser, ctx, page = await open_app(p)
        await open_reader(page, book)
        await page.click("#hamburger-menu-btn")
        sidebar = page.locator("#settings-sidebar")
        await page.wait_for_timeout(500)
        await shot(page, "sidebar")
        words = len((await sidebar.inner_text()).split())
        presets = page.locator("#settings-sidebar .ks-preset")
        count = await presets.count()
        assert count >= 3, f"Servono almeno 3 preset di lettura (trovati {count})"
        assert words <= 40, f"Il menu deve essere essenziale: {words} parole a vista"

        results, problems = {}, []
        for i in range(count):
            preset = presets.nth(i)
            name = (await preset.get_attribute("data-preset")) or str(i)
            await preset.click()
            await page.wait_for_timeout(900)
            m = await measure_typography(page)
            results[name] = m
            pressed = await preset.get_attribute("aria-pressed")
            if pressed != "true":
                problems.append(f"{name}: il preset scelto deve risultare selezionato")
            if not m["chars"] or not all(45 <= c <= 75 for c in m["chars"]):
                problems.append(f"{name}: caratteri per riga {m['chars']} (servono 45–75)")
            if not 1.3 <= m["lineHeight"] <= 1.9:
                problems.append(f"{name}: interlinea {m['lineHeight']:.2f} (serve 1,3–1,9)")
            if m["align"] == "justify" and m["hyphens"] != "auto":
                problems.append(f"{name}: testo giustificato senza sillabazione")
        signatures = {(round(m["fontSize"]), m["family"], m["align"], round(m["lineHeight"], 2)) for m in results.values()}
        if len(signatures) < count:
            problems.append(f"I preset devono essere diversi tra loro: {results}")

        # La scelta resta: si riapre il lettore e il preset (l'ultimo) è ancora attivo
        last = await presets.nth(count - 1).get_attribute("data-preset")
        await page.reload()
        await page.wait_for_function("document.getElementById('loading-screen').style.display === 'none'", timeout=30000)
        await open_reader(page, book)
        await page.click("#hamburger-menu-btn")
        await page.wait_for_timeout(500)
        active = await page.locator("#settings-sidebar .ks-preset[aria-pressed=true]").get_attribute("data-preset")
        again = await measure_typography(page)
        await browser.close()
        if active != last:
            problems.append(f"Dopo la riapertura il preset attivo è {active}, atteso {last}")
        if round(again["fontSize"]) != round(results[last]["fontSize"]) or again["align"] != results[last]["align"]:
            problems.append("Dopo la riapertura il testo deve avere lo stesso stile")
        assert not problems, "\n".join(problems)


SEARCH_CHAPTERS = [
    "Nel primo capitolo un drago rosso vola sopra il villaggio. " + "Parole di riempimento. " * 200,
    "Capitolo di passaggio: arriva il <i>cavaliere</i> nero. " + "Altre parole qualunque. " * 200,
    "Alla fine il drago d'argento dorme sotto la montagna. " + "Coda del libro. " * 200,
]


async def open_reader(page, book):
    if book["epubPath"].endswith(".pdf"):
        await page.evaluate(f"window.openPdfReader('/{book['epubPath']}', '{book['id']}')")
        await page.wait_for_function("typeof pdfDoc !== 'undefined' && pdfDoc && document.querySelector('.textLayer span')", timeout=20000)
    else:
        await page.evaluate(f"window.openReader('/{book['epubPath']}', '{book['id']}')")
        await page.wait_for_function("typeof rendition !== 'undefined' && rendition && rendition.location", timeout=20000)
    await page.wait_for_timeout(800)


async def run_search(page, query):
    await page.fill("#reader-search-input", query)
    await page.press("#reader-search-input", "Enter")
    await page.wait_for_selector("#reader-search-results[data-done]", timeout=15000)
    return await page.evaluate("""() => [...document.querySelectorAll('#reader-search-results .ks-search-result')]
        .map(el => el.innerText)""")


async def test_reader_search_epub(p):
    """Mentre si legge un EPUB si può cercare una parola o una frase e saltare al punto trovato."""
    with Server() as srv:
        path = srv.home / "Draghi.epub"
        make_epub(path, "Il Libro dei Draghi", "Autore Test", (90, 40, 120), chapters=SEARCH_CHAPTERS)
        book = api("POST", "/api/upload", files={"ebook": path})["book"]
        browser, ctx, page = await open_app(p)
        await open_reader(page, book)

        await page.click("#reader-search-btn")
        await page.wait_for_selector("#reader-search-input", state="visible", timeout=3000)

        phrase = await run_search(page, "drago d'argento")
        assert len(phrase) == 1 and "drago d'argento" in phrase[0].lower(), f"Frase: {phrase}"
        word = await run_search(page, "DRAGO")
        assert len(word) >= 2, f"Parola (senza distinguere maiuscole) in più capitoli: {word}"
        styled = await run_search(page, "cavaliere nero")
        assert len(styled) == 1, f"Frase spezzata da un corsivo: {styled}"
        none = await run_search(page, "zzzqqq")
        assert none == [] and await page.locator("#reader-search-results [data-empty]").is_visible(), \
            "Senza risultati serve un messaggio"

        await run_search(page, "drago d'argento")
        await page.click("#reader-search-results .ks-search-result")
        await page.wait_for_function("rendition.currentLocation().start && rendition.currentLocation().start.href.includes('c3')", timeout=10000)
        await page.wait_for_timeout(600)
        await shot(page, "search_epub")
        marked = await page.evaluate("!!document.querySelector('.ks-search-hit')")
        await browser.close()
        assert marked, "Il punto trovato va evidenziato"


async def test_reader_search_pdf(p):
    """La ricerca funziona anche nei PDF: mostra la pagina e porta lì."""
    with Server() as srv:
        path = srv.home / "Manuale_Unicorni.pdf"
        make_pdf(path, {4: "Il unicorno viola balla sul prato."})
        book = api("POST", "/api/upload", files={"ebook": path})["book"]
        browser, ctx, page = await open_app(p)
        await open_reader(page, book)

        await page.click("#reader-search-btn")
        results = await run_search(page, "unicorno viola")
        assert len(results) == 1 and "4" in results[0], f"Risultato con il numero di pagina: {results}"
        await page.click("#reader-search-results .ks-search-result")
        await page.wait_for_function("pageNum === 4 && document.querySelector('.textLayer .ks-search-hit')", timeout=10000)
        await shot(page, "search_pdf")
        await browser.close()


async def test_reader_buttons_share_the_same_style(p):
    """Nel lettore Indice (e Cerca) hanno lo stesso aspetto di 'Chiudi libro', in tema chiaro e scuro."""
    with Server() as srv:
        path = srv.home / "Draghi.epub"
        make_epub(path, "Il Libro dei Draghi", "Autore Test", (90, 40, 120), chapters=SEARCH_CHAPTERS)
        book = api("POST", "/api/upload", files={"ebook": path})["book"]
        browser, ctx, page = await open_app(p)
        await open_reader(page, book)
        props = ["color", "backgroundColor", "borderTopColor", "borderTopWidth", "borderTopLeftRadius",
                 "fontWeight", "fontSize", "letterSpacing", "paddingTop", "paddingLeft", "textTransform"]
        problems = []
        for theme in ["chiaro", "scuro"]:
            styles = await page.evaluate("""(props) => Object.fromEntries(
                ['close-reader-btn', 'reader-toc-btn', 'reader-search-btn'].map(id => {
                    const el = document.getElementById(id);
                    if (!el) return [id, null];
                    const cs = getComputedStyle(el);
                    return [id, Object.fromEntries(props.map(k => [k, cs[k]]))];
                }))""", props)
            ref = styles["close-reader-btn"]
            for other in ["reader-toc-btn", "reader-search-btn"]:
                if styles[other] is None:
                    problems.append(f"[{theme}] manca #{other}")
                    continue
                diff = {k: (styles[other][k], ref[k]) for k in props if styles[other][k] != ref[k]}
                if diff:
                    problems.append(f"[{theme}] #{other} diverso da Chiudi: {diff}")
            await shot(page, f"reader_buttons_{theme}")
            await page.click("#theme-toggle-btn")
            await page.wait_for_timeout(400)
        await browser.close()
        assert not problems, "\n".join(problems)


# ----------------------------------------------------------------- runner

async def main():
    only = [x for x in os.environ.get("ONLY", "").split(",") if x]   # es. ONLY=amazon,reader
    tests = [v for k, v in globals().items() if k.startswith("test_") and (not only or any(o in k for o in only))]
    failed = 0
    async with async_playwright() as p:
        for test in tests:
            start = time.time()
            try:
                result = test(p) if test.__code__.co_argcount else test()
                if asyncio.iscoroutine(result):
                    await result
                print(f"PASS  {test.__name__} ({time.time() - start:.1f}s)")
            except AssertionError as e:
                failed += 1
                print(f"FAIL  {test.__name__}: {e}")
            except Exception as e:
                failed += 1
                print(f"ERROR {test.__name__}: {e!r}")
                traceback.print_exc(limit=2)
    print(f"\n{len(tests) - failed}/{len(tests)} test superati")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    asyncio.run(main())
