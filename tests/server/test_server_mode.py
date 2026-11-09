"""
Modalità server (self-hosting, Docker): il binario vero avviato con `--server`, controllato
dall'esterno come lo vedrà chi lo usa. Prima: cargo build --no-default-features

    python tests/server/test_server_mode.py          (ONLY=nome1,nome2 per sceglierne alcuni)
"""

import asyncio
import base64
import json
import os
import shutil
import signal
import socket
import sqlite3
import subprocess
import sys
import tempfile
import time
import traceback
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "e2e"))
import test_ui as T  # noqa: E402  (BINARY, make_epub)
from playwright.async_api import async_playwright  # noqa: E402

BINARY = T.BINARY
BROWSERS = ["xdg-open", "gio", "gnome-open", "kde-open", "wslview", "x-www-browser", "sensible-browser",
            "firefox", "chromium", "google-chrome", "open"]


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def lan_ip():
    """Un indirizzo di questa macchina diverso da 127.0.0.1 (per provare l'accesso dalla rete)."""
    try:
        out = subprocess.run(["hostname", "-I"], capture_output=True, text=True, timeout=5).stdout.split()
        return next((ip for ip in out if "." in ip and not ip.startswith("127.")), None)
    except Exception:
        return None


def request(url, method="GET", body=None, auth=None, headers=None, files=None):
    headers = dict(headers or {})
    data = None
    if files:
        boundary = "----koreshelf"
        name, path = next(iter(files.items()))
        data = (f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"; filename=\"{Path(path).name}\"\r\n"
                f"Content-Type: application/octet-stream\r\n\r\n").encode() + Path(path).read_bytes() + f"\r\n--{boundary}--\r\n".encode()
        headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"
    elif body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = "application/json"
    if auth:
        headers["Authorization"] = "Basic " + base64.b64encode(auth.encode()).decode()
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status, {k.lower(): v for k, v in r.headers.items()}, r.read()
    except urllib.error.HTTPError as e:   # i nomi delle intestazioni HTTP non distinguono maiuscole/minuscole
        return e.code, {k.lower(): v for k, v in e.headers.items()}, e.read()


class ServerMode:
    """`koreshelf --server` con dati, porta e browser finti tutti suoi."""

    def __init__(self, extra_env=None, cwd=None, port=None, expect_start=True):
        self.extra_env = extra_env or {}
        self.cwd = cwd
        self.port = port or free_port()
        self.expect_start = expect_start

    def __enter__(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="koreshelf-server-"))
        self.data = self.tmp / "data"
        self.marker = self.tmp / "browser-aperto"
        fake = self.tmp / "fakebin"
        fake.mkdir()
        for name in BROWSERS:                     # se il server prova ad aprire un browser, lo sappiamo
            script = fake / name
            script.write_text(f"#!/bin/sh\necho \"$0 $@\" >> '{self.marker}'\n")
            script.chmod(0o755)
        self.env = dict(os.environ, PATH=f"{fake}:{os.environ['PATH']}", BROWSER=str(fake / "xdg-open"),
                        HOME=str(self.tmp / "home"), XDG_DATA_HOME=str(self.tmp / "home-data"),
                        KORESHELF_PORT=str(self.port), KORESHELF_DATA=str(self.data))
        self.env.pop("DISPLAY", None)
        self.env.update(self.extra_env)
        self.log = self.tmp / "terminale.log"
        self.proc = subprocess.Popen([str(BINARY), "--server"], env=self.env, cwd=self.cwd or self.tmp,
                                     stdout=open(self.log, "wb"), stderr=subprocess.STDOUT)
        self.base = f"http://127.0.0.1:{self.port}"
        if not self.expect_start:
            return self
        for _ in range(100):
            if self.proc.poll() is not None:
                raise RuntimeError(f"Il server si è fermato subito (codice {self.proc.returncode}):\n{self.output()}")
            try:
                if json.loads(request(self.base + "/api/ping")[2]).get("app") == "KoreShelf":
                    return self
            except Exception:
                pass
            time.sleep(0.1)
        raise RuntimeError(f"Il server non risponde su {self.base}:\n{self.output()}")

    def output(self):
        return self.log.read_text(errors="replace") if self.log.exists() else ""

    def __exit__(self, *exc):
        if self.proc.poll() is None:
            self.proc.terminate()
            try:
                self.proc.wait(10)
            except subprocess.TimeoutExpired:
                self.proc.kill()
        shutil.rmtree(self.tmp, ignore_errors=True)


def sample_epub(folder, title="Libro del Server"):
    path = Path(folder) / f"{title.replace(' ', '_')}.epub"
    T.make_epub(path, title, "Autore Test", (60, 120, 180))
    return path


# ----------------------------------------------------------------------- test

def test_server_listens_on_the_network_and_keeps_data_in_its_folder():
    """In un container il server deve essere raggiungibile da fuori (non solo da 127.0.0.1) sulla
    porta scelta, tenere tutto nella cartella KORESHELF_DATA (il volume di Docker) e scrivere i log
    sul terminale (docker logs)."""
    problems = []
    with ServerMode() as srv:
        ip = lan_ip()
        if ip:
            status = request(f"http://{ip}:{srv.port}/api/ping")[0]
            if status != 200:
                problems.append(f"Dalla rete ({ip}) il server non risponde: {status}")
        else:
            problems.append("Nessun indirizzo di rete per provare l'accesso da fuori (hostname -I)")
        if not (srv.data / "koreshelf.db").exists():
            problems.append(f"Il database deve stare in KORESHELF_DATA ({srv.data})")
        res = json.loads(request(srv.base + "/api/upload", "POST", files={"ebook": sample_epub(srv.tmp)})[2])
        if not res.get("success"):
            problems.append(f"Caricamento non riuscito: {res}")
        elif not any((srv.data / "ebooks").iterdir()):
            problems.append("L'ebook caricato deve finire in KORESHELF_DATA/ebooks")
        time.sleep(0.3)
        out = srv.output()
        if str(srv.port) not in out or "KoreShelf" not in out:
            problems.append(f"Sul terminale deve comparire l'avvio con la porta: {out[-300:]!r}")
    assert not problems, "\n".join(problems)


def test_server_never_opens_a_browser_and_cannot_be_turned_off_remotely():
    """Sul server nessuno deve poter spegnere KoreShelf o fargli aprire programmi: niente browser
    all'avvio, e /api/shutdown, /api/focus, /api/open-external non hanno effetto."""
    problems = []
    with ServerMode() as srv:
        time.sleep(1.0)
        if srv.marker.exists():
            problems.append(f"All'avvio il server ha provato ad aprire un browser: {srv.marker.read_text()!r}")
        status = request(srv.base + "/api/shutdown", "POST")[0]
        if status != 403:
            problems.append(f"/api/shutdown deve essere rifiutato (403), risponde {status}")
        request(srv.base + "/api/focus", "POST")
        status = request(srv.base + "/api/open-external", "POST", {"url": "https://example.org"}, headers={"X-KoreShelf": "1"})[0]
        if status != 403:
            problems.append(f"/api/open-external deve essere rifiutato (403), risponde {status}")
        time.sleep(2.0)                                  # lo spegnimento avverrebbe dopo 1,5 s
        if srv.proc.poll() is not None:
            problems.append("Il server si è spento dopo una richiesta da remoto")
        if srv.marker.exists():
            problems.append(f"Il server ha provato ad aprire un programma: {srv.marker.read_text()!r}")
    assert not problems, "\n".join(problems)


def test_server_page_has_no_shutdown_button():
    """Nell'interfaccia servita dal server non c'è il pulsante Spegni (né la sua spiegazione nell'aiuto)."""
    async def run():
        with ServerMode() as srv:
            async with async_playwright() as p:
                browser = await p.chromium.launch()
                page = await browser.new_page(viewport={"width": 1280, "height": 800})
                await page.goto(srv.base + "/")
                await page.wait_for_selector(".top-bar", timeout=15000)
                await page.wait_for_timeout(800)
                button = await page.evaluate("!!document.querySelector('#shutdown-btn')")
                flag = await page.evaluate("window.__KORESHELF_SERVER__ === true")
                await browser.close()
                return button, flag
    button, flag = asyncio.run(run())
    assert not button, "Sul server il pulsante Spegni non deve comparire"
    assert flag, "La pagina deve sapere di essere servita in modalità server (window.__KORESHELF_SERVER__)"


def test_password_protects_the_library_but_not_the_health_check():
    """Con KORESHELF_PASSWORD il browser chiede utente e password per tutto (pagina, API, copertine,
    ebook); solo /api/ping resta libero, perché lo usa il controllo di salute di Docker."""
    problems = []
    with ServerMode({"KORESHELF_PASSWORD": "segreta"}) as srv:
        for path in ("/", "/api/books", "/covers/x.jpg", "/ebooks/x.epub"):
            status, headers, _ = request(srv.base + path)
            challenge = headers.get("www-authenticate", "")
            if status != 401 or "Basic" not in challenge:
                problems.append(f"{path} senza password: {status} {challenge!r} (atteso 401 con WWW-Authenticate: Basic)")
        if request(srv.base + "/api/books", auth="koreshelf:sbagliata")[0] != 401:
            problems.append("Con la password sbagliata deve rispondere 401")
        if request(srv.base + "/api/books", auth="koreshelf:segreta")[0] != 200:
            problems.append("Con la password giusta /api/books deve rispondere 200")
        if request(srv.base + "/api/ping")[0] != 200:
            problems.append("/api/ping deve restare libero per il controllo di salute")

        async def ui():
            async with async_playwright() as p:
                browser = await p.chromium.launch()
                ctx = await browser.new_context(http_credentials={"username": "koreshelf", "password": "segreta"})
                page = await ctx.new_page()
                await page.goto(srv.base + "/")
                await page.wait_for_selector(".top-bar", timeout=15000)
                books = await page.evaluate("fetch('/api/books').then(r => r.status)")
                await browser.close()
                return books
        if asyncio.run(ui()) != 200:
            problems.append("Nel browser, dopo il login, l'interfaccia deve poter usare le API")
    assert not problems, "\n".join(problems)


def test_server_stops_cleanly_when_docker_stops_it():
    """`docker stop` manda SIGTERM: il server deve chiudersi da solo e in fretta (codice 0), senza
    lasciare il database rovinato."""
    with ServerMode() as srv:
        request(srv.base + "/api/upload", "POST", files={"ebook": sample_epub(srv.tmp)})
        start = time.time()
        srv.proc.send_signal(signal.SIGTERM)
        try:
            code = srv.proc.wait(5)
        except subprocess.TimeoutExpired:
            raise AssertionError("Dopo SIGTERM il server non si è chiuso entro 5 secondi (Docker lo ucciderebbe)")
        elapsed = time.time() - start
        check = sqlite3.connect(srv.data / "koreshelf.db").execute("PRAGMA integrity_check").fetchone()[0]
    assert code == 0, f"Dopo SIGTERM il codice di uscita deve essere 0, è {code}"
    assert check == "ok", f"Database rovinato dopo lo spegnimento: {check}"
    assert elapsed < 5


def test_health_command_tells_docker_if_the_server_is_alive():
    """`koreshelf --health` (usato da HEALTHCHECK) esce con 0 se il server risponde, altrimenti no.
    Funziona anche con la password attiva."""
    with ServerMode({"KORESHELF_PASSWORD": "segreta"}) as srv:
        alive = subprocess.run([str(BINARY), "--health"], env=srv.env, capture_output=True, timeout=15)
        srv.proc.terminate()
        srv.proc.wait(10)
        dead = subprocess.run([str(BINARY), "--health"], env=srv.env, capture_output=True, timeout=15)
    assert alive.returncode == 0, f"Con il server acceso --health deve uscire con 0: {alive.returncode} {alive.stdout!r} {alive.stderr!r}"
    assert dead.returncode != 0, "Con il server spento --health deve segnalare l'errore"


def test_a_busy_port_is_reported_not_silently_changed():
    """Sul server la porta è quella scritta in docker-compose: se è occupata bisogna dirlo,
    non scegliere di nascosto un'altra porta (nessuno la troverebbe)."""
    port = free_port()
    blocker = socket.socket()
    blocker.bind(("0.0.0.0", port))
    blocker.listen()
    try:
        with ServerMode(port=port, expect_start=False) as srv:
            try:
                code = srv.proc.wait(10)
            except subprocess.TimeoutExpired:
                raise AssertionError("Con la porta occupata il server non deve restare acceso su un'altra porta")
            out = srv.output()
    finally:
        blocker.close()
    assert code != 0, "Con la porta occupata il codice di uscita deve indicare un errore"
    assert str(port) in out, f"Il messaggio deve dire quale porta è occupata: {out[-300:]!r}"


def test_library_of_the_old_docker_version_is_imported():
    """Chi usava la versione Docker 3.x aveva i dati in ./public (database, copertine, ebook):
    montando quella cartella in /app/public, al primo avvio la libreria viene importata in /data."""
    work = Path(tempfile.mkdtemp(prefix="koreshelf-legacy-"))
    try:
        # una "libreria vecchia" fatta dall'app stessa: un libro caricato, poi i file copiati in public/
        with ServerMode() as old:
            request(old.base + "/api/upload", "POST", files={"ebook": sample_epub(old.tmp, "Libro Vecchio")})
            titles = [b["title"] for b in json.loads(request(old.base + "/api/books")[2])]
            old.proc.send_signal(signal.SIGTERM)
            old.proc.wait(10)
            public = work / "public"
            shutil.copytree(old.data, public, ignore=shutil.ignore_patterns("uploads", "*.log"))
        assert titles == ["Libro Vecchio"], titles
        with ServerMode(cwd=work) as new:
            books = json.loads(request(new.base + "/api/books")[2])
            covers_ok = request(new.base + "/" + books[0]["cover"].lstrip("/"))[0] if books and books[0].get("cover") else None
            ebook = list((new.data / "ebooks").iterdir())
        assert [b["title"] for b in books] == ["Libro Vecchio"], f"Libreria non importata: {books}"
        assert ebook, "Gli ebook della libreria vecchia devono essere copiati in KORESHELF_DATA/ebooks"
        assert covers_ok in (None, 200), f"La copertina importata non si apre: {covers_ok}"
    finally:
        shutil.rmtree(work, ignore_errors=True)


def main():
    only = [x for x in os.environ.get("ONLY", "").split(",") if x]
    tests = [v for k, v in globals().items() if k.startswith("test_") and (not only or any(o in k for o in only))]
    failed = 0
    for test in tests:
        start = time.time()
        try:
            test()
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
    main()
