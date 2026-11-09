# Contributing to KoreShelf

*Read this in: [English](#english) | [Italiano](#italiano)*

---

<a name="english"></a>
## English

Thanks for wanting to help with KoreShelf. Bug reports, ideas, translations and code are all welcome. This guide explains how the project is organised and how to send a change.

### Reporting a bug

1. Check the [Issues](https://github.com/GabrieleTrovato01/KoreShelf/issues) to see whether someone has already reported it.
2. If not, open a new issue with the *Bug report* template.
3. Include:
   - what happened and what you expected instead;
   - the steps to reproduce it;
   - the KoreShelf version (it is in the name of the file you downloaded, for example `KoreShelf-4.0.0-windows-x64.exe`; with Docker run `docker exec koreshelf koreshelf --version`);
   - how you use it: desktop app (Windows, Mac, Linux), phone app (Android, iPhone), or Docker / `koreshelf --server` in a browser;
   - the `koreshelf.log` file. It is in the data folder (see *Your data* in the [README](README.md)); with Docker, use `docker logs koreshelf`.

Security problems should not be reported in public issues: see [SECURITY.md](SECURITY.md).

### Suggesting a feature

Open an issue with the *Feature request* template. Explain what you would like to do, why it would be useful, and how you imagine using it. For larger changes, please open the issue before writing code, so we can agree on the approach first.

### How the project is organised

KoreShelf is a Rust server that serves a web interface. The same server runs inside the desktop window, inside the phone apps and in Docker.

| Folder | What it contains |
|---|---|
| `src/` | The Rust code. `server.rs` is the HTTP API, `db.rs` the SQLite database, `epub.rs` and `pdf.rs` read ebooks, `online.rs` looks up covers and descriptions, `paths.rs` decides where data is stored, `window.rs` is the desktop window, `server_mode.rs` the self-hosting mode, `main.rs` the entry point. `lib.rs` exposes `start_embedded`, used by the phone apps. |
| `frontend/` | The interface, built with Vite and Three.js. `src/main.js` is the 3D library, `src/locales/` holds the translations, `public/reader.js` is the reader (epub.js and pdf.js) and `public/reader-mobile.js` its phone layout. |
| `frontend/dist/` | The built interface. It is committed to the repository and embedded in the executable, so you only need Node.js if you change the interface. |
| `mobile/` | The Tauri 2 shell for Android and iOS, which starts the same server on `127.0.0.1`. |
| `packaging/` | Scripts that build the `.dmg`, the AppImage and the other packages. |
| `assets/` | Icons and `server_messages.json` (messages sent by the server, in every language). |
| `tests/` | Rust tests (`embedded.rs`), interface tests (`e2e/test_ui.py`), server-mode tests (`server/test_server_mode.py`) and packaging tests (`packaging/test_packaging.py`). |
| `.github/workflows/` | `release.yml` builds every package; `docker.yml` builds, tests and publishes the Docker image. |

### Setting up

You need Rust (stable). Node.js is only needed to rebuild the interface, Python 3 only to run the interface tests.

```bash
git clone https://github.com/GabrieleTrovato01/KoreShelf.git
cd KoreShelf
cargo run --no-default-features              # opens KoreShelf in your browser
cargo run --no-default-features -- --server  # self-hosting mode on port 3000
cargo build --release                        # desktop app with its own window
```

The desktop window needs the system WebView: WebView2 on Windows (included in Windows 10 and 11), WebKitGTK on Linux. Without the window (`--no-default-features`) nothing else is required.

If you change files in `frontend/src` or `frontend/public`, rebuild the interface and commit the new `frontend/dist`:

```bash
cd frontend
npm ci
npm run build
```

In debug builds the interface is read from `frontend/dist` on disk, so you don't need to recompile Rust after rebuilding it.

### Tests

Please write a test that fails before your fix and passes after it. For interface changes, also attach before and after screenshots to the pull request.

```bash
# Rust
cargo test --no-default-features

# Interface (real server + Chromium, also with phone emulation and real touch events)
pip install playwright reportlab pyyaml
python -m playwright install chromium
cargo build --no-default-features
python tests/e2e/test_ui.py

# Server mode (Docker / self-hosting)
python tests/server/test_server_mode.py

# Packaging and workflows
python tests/packaging/test_packaging.py
```

The interface suite is long. Run only the tests you need with `ONLY`, for example `ONLY=reader_search,rotation python tests/e2e/test_ui.py`. With `KEEP_SHOTS=1` the screenshots are kept in the system temporary folder (`koreshelf-shots`). The AppImage packaging test needs a release build first.

### Pull requests

1. Fork the repository and create a branch: `feature/short-name` or `fix/short-description`.
2. Keep each pull request to one topic.
3. Run the tests that cover the code you touched.
4. Describe what you changed and why. For bugs, explain the cause you found, not only the fix.
5. Write commit messages in English.

### Coding guidelines

- No text written directly in the code. Interface strings go in every file in `frontend/src/locales/`, server messages in `assets/server_messages.json`.
- Keep the 3D library (`frontend/src/main.js`) separate from the reader (`frontend/public/reader*.js`).
- Check your change on a phone layout too: the interface tests can emulate a phone.
- Comments in English or Italian are both fine. Explain why, not what.

### Adding a language

1. Copy `frontend/src/locales/en.js` to a new file named with the language code (for example `pt.js`) and translate the strings.
2. Add the code to the language list in `frontend/src/main.js` (`['it', 'en', 'es', 'fr', 'de']`).
3. Add the code to `SUPPORTED_LANGS` in `src/i18n.rs`.
4. Add the server messages for the new language in `assets/server_messages.json`.
5. Rebuild the interface (`npm run build` in `frontend/`), run `ONLY=emoji python tests/e2e/test_ui.py`, then open KoreShelf, switch to the new language from the menu and check that every screen is translated.

A translated README in `docs/` is welcome but not required.

### Roadmap

Available in 4.0:

- [x] Rust rewrite: one file to download, nothing to install
- [x] Desktop packages for Windows, Mac (universal) and Linux (AppImage)
- [x] Android app and iPhone/iPad app (sideloading)
- [x] Docker image for PC and ARM, server mode with optional password
- [x] 3D library with shelves, *Manage* and manual metadata editing
- [x] Reader for EPUB and PDF: pages or continuous scrolling, table of contents, search, typography settings
- [x] Highlights board and quote sharing as an image
- [x] Ratings, reviews and reading ribbon on the 3D book
- [x] Five languages: English, Italian, Spanish, French, German
- [x] Website with automatic download: [koreshelf.github.io](https://koreshelf.github.io)
- [x] Automated builds for every platform

Planned or open:

- [ ] Dark mode inverts images in PDFs as well as text
- [ ] Speed-reading mode (RSVP)
- [ ] Bring back the Markdown export of a book (for notes apps and LLMs)
- [ ] Underlining a sentence that continues on the next page

If you want to work on one of these, say so in an issue first.

[Back to top](#contributing-to-koreshelf)

---

<a name="italiano"></a>
## Italiano

Grazie di voler dare una mano a KoreShelf. Segnalazioni, idee, traduzioni e codice sono tutti benvenuti. Questa guida spiega come è organizzato il progetto e come proporre una modifica.

### Segnalare un problema

1. Controlla tra le [Issues](https://github.com/GabrieleTrovato01/KoreShelf/issues) se qualcuno l'ha già segnalato.
2. Se no, apri una nuova issue con il modello *Bug report*.
3. Indica:
   - cosa è successo e cosa ti aspettavi;
   - i passaggi per riprodurlo;
   - la versione di KoreShelf (è nel nome del file che hai scaricato, per esempio `KoreShelf-4.0.0-windows-x64.exe`; con Docker esegui `docker exec koreshelf koreshelf --version`);
   - come lo usi: app per computer (Windows, Mac, Linux), app per telefono (Android, iPhone) oppure Docker / `koreshelf --server` dal browser;
   - il file `koreshelf.log`. Si trova nella cartella dei dati (vedi *I tuoi dati* nel [README](docs/README.it.md)); con Docker usa `docker logs koreshelf`.

I problemi di sicurezza non vanno segnalati nelle issue pubbliche: vedi [SECURITY.md](SECURITY.md).

### Proporre una funzione

Apri una issue con il modello *Feature request*. Spiega cosa vorresti fare, perché sarebbe utile e come immagini di usarla. Per le modifiche più grandi apri la issue prima di scrivere codice, così ci mettiamo d'accordo sull'approccio.

### Come è organizzato il progetto

KoreShelf è un server Rust che serve un'interfaccia web. Lo stesso server gira nella finestra desktop, nelle app per telefono e in Docker.

| Cartella | Cosa contiene |
|---|---|
| `src/` | Il codice Rust. `server.rs` è l'API HTTP, `db.rs` il database SQLite, `epub.rs` e `pdf.rs` leggono gli ebook, `online.rs` cerca copertine e trame, `paths.rs` decide dove stanno i dati, `window.rs` è la finestra desktop, `server_mode.rs` la modalità self-hosting, `main.rs` il punto di avvio. `lib.rs` espone `start_embedded`, usato dalle app per telefono. |
| `frontend/` | L'interfaccia, fatta con Vite e Three.js. `src/main.js` è la libreria 3D, `src/locales/` contiene le traduzioni, `public/reader.js` è il lettore (epub.js e pdf.js) e `public/reader-mobile.js` il suo layout per telefono. |
| `frontend/dist/` | L'interfaccia compilata. È nel repository e viene incorporata nell'eseguibile, quindi Node.js serve solo se modifichi l'interfaccia. |
| `mobile/` | Il guscio Tauri 2 per Android e iOS, che avvia lo stesso server su `127.0.0.1`. |
| `packaging/` | Gli script che creano il `.dmg`, l'AppImage e gli altri pacchetti. |
| `assets/` | Le icone e `server_messages.json` (i messaggi del server, in tutte le lingue). |
| `tests/` | Test Rust (`embedded.rs`), test dell'interfaccia (`e2e/test_ui.py`), test della modalità server (`server/test_server_mode.py`) e test dei pacchetti (`packaging/test_packaging.py`). |
| `.github/workflows/` | `release.yml` costruisce tutti i pacchetti; `docker.yml` costruisce, prova e pubblica l'immagine Docker. |

### Per iniziare

Serve Rust (stabile). Node.js serve solo per ricompilare l'interfaccia, Python 3 solo per i test dell'interfaccia.

```bash
git clone https://github.com/GabrieleTrovato01/KoreShelf.git
cd KoreShelf
cargo run --no-default-features              # apre KoreShelf nel browser
cargo run --no-default-features -- --server  # modalità self-hosting sulla porta 3000
cargo build --release                        # app per computer con la sua finestra
```

La finestra desktop usa la WebView di sistema: WebView2 su Windows (inclusa in Windows 10 e 11), WebKitGTK su Linux. Senza finestra (`--no-default-features`) non serve altro.

Se modifichi file in `frontend/src` o `frontend/public`, ricompila l'interfaccia e includi nel commit la nuova `frontend/dist`:

```bash
cd frontend
npm ci
npm run build
```

Nelle build di debug l'interfaccia viene letta da `frontend/dist` sul disco, quindi dopo averla ricompilata non serve ricompilare Rust.

### Test

Scrivi un test che fallisce prima della correzione e passa dopo. Per le modifiche all'interfaccia allega alla pull request anche le schermate prima e dopo.

```bash
# Rust
cargo test --no-default-features

# Interfaccia (server vero + Chromium, anche con emulazione del telefono e tocchi veri)
pip install playwright reportlab pyyaml
python -m playwright install chromium
cargo build --no-default-features
python tests/e2e/test_ui.py

# Modalità server (Docker / self-hosting)
python tests/server/test_server_mode.py

# Pacchetti e workflow
python tests/packaging/test_packaging.py
```

La suite dell'interfaccia è lunga. Lancia solo i test che ti servono con `ONLY`, per esempio `ONLY=reader_search,rotation python tests/e2e/test_ui.py`. Con `KEEP_SHOTS=1` le schermate restano nella cartella temporanea del sistema (`koreshelf-shots`). Il test dell'AppImage richiede prima una build di release.

### Pull request

1. Fai un fork del repository e crea un branch: `feature/nome-breve` oppure `fix/descrizione-breve`.
2. Un argomento per ogni pull request.
3. Esegui i test che riguardano il codice che hai toccato.
4. Descrivi cosa hai cambiato e perché. Per i bug spiega la causa che hai trovato, non solo la correzione.
5. Scrivi i messaggi di commit in inglese.

### Regole per il codice

- Niente testo scritto direttamente nel codice. Le scritte dell'interfaccia vanno in tutti i file di `frontend/src/locales/`, i messaggi del server in `assets/server_messages.json`.
- Tieni separata la libreria 3D (`frontend/src/main.js`) dal lettore (`frontend/public/reader*.js`).
- Controlla la modifica anche nel layout per telefono: i test dell'interfaccia possono emulare un telefono.
- I commenti vanno bene in inglese o in italiano. Spiega il perché, non il cosa.

### Aggiungere una lingua

1. Copia `frontend/src/locales/en.js` in un nuovo file con il codice della lingua (per esempio `pt.js`) e traduci le scritte.
2. Aggiungi il codice alla lista delle lingue in `frontend/src/main.js` (`['it', 'en', 'es', 'fr', 'de']`).
3. Aggiungi il codice a `SUPPORTED_LANGS` in `src/i18n.rs`.
4. Aggiungi i messaggi del server per la nuova lingua in `assets/server_messages.json`.
5. Ricompila l'interfaccia (`npm run build` in `frontend/`), esegui `ONLY=emoji python tests/e2e/test_ui.py`, poi apri KoreShelf, scegli la nuova lingua dal menu e controlla che ogni schermata sia tradotta.

Un README tradotto in `docs/` è gradito ma non obbligatorio.

### Roadmap

Disponibile nella 4.0:

- [x] Riscrittura in Rust: un solo file da scaricare, niente da installare
- [x] Pacchetti per Windows, Mac (universale) e Linux (AppImage)
- [x] App per Android e per iPhone/iPad (sideloading)
- [x] Immagine Docker per PC e ARM, modalità server con password facoltativa
- [x] Libreria 3D con scaffali, *Gestisci* e modifica manuale dei metadati
- [x] Lettore EPUB e PDF: pagine o scorrimento continuo, indice, ricerca, impostazioni del testo
- [x] Bacheca delle sottolineature e condivisione delle citazioni come immagine
- [x] Voti, recensioni e nastro di lettura sul libro 3D
- [x] Cinque lingue: inglese, italiano, spagnolo, francese, tedesco
- [x] Sito con download automatico: [koreshelf.github.io](https://koreshelf.github.io)
- [x] Build automatiche per tutte le piattaforme

In programma o da risolvere:

- [ ] La modalità scura inverte anche le immagini dei PDF, non solo il testo
- [ ] Modalità di lettura veloce (RSVP)
- [ ] Riportare l'esportazione di un libro in Markdown (per app di appunti e LLM)
- [ ] Sottolineare una frase che continua nella pagina successiva

Se vuoi lavorare su uno di questi punti, scrivilo prima in una issue.

[Torna su](#contributing-to-koreshelf)
