# KoreShelf (Rust)

La tua libreria 3D di ebook (EPUB e PDF), ora in un **unico file `KoreShelf.exe`**:
doppio clic e si apre. Niente terminale, niente installazioni, niente Node.js.

È la versione Rust di [KoreShelf](https://github.com/GabrieleTrovato01/KoreShelf):
stessa interfaccia, stesse funzioni, stesso database.

## Per chi usa l'app

1. Scarica `KoreShelf.exe` (dalla pagina *Releases* o dalla scheda *Actions* del repo).
2. Fai doppio clic. Fine.

- **Prima volta?** Premi *Prova con un libro di esempio*: arriva sullo scaffale un piccolo libro
  che ti insegna l'app mentre lo leggi.
- **Leggere**: *Inizia a leggere* (o *Riprendi a leggere*) sotto il libro al centro; le azioni
  meno frequenti (categoria, modifica, elimina) sono nel menu *Altro*.
- **Aggiungere libri**: pulsante *Carica Ebook* oppure trascina i file EPUB/PDF
  direttamente sulla finestra. Ogni libro compare come segnaposto animato e si
  trasforma nella sua copertina appena è pronto.
- **Cercare nuovi libri**: se un titolo non è nella tua libreria, la barra di ricerca
  ti propone di cercarlo su Amazon (nel negozio della lingua scelta).
- **Per chiudere** basta chiudere la finestra.
- **Doppio clic di nuovo** mentre è aperto: riporta in primo piano la finestra esistente.
- **I tuoi libri** sono in `%APPDATA%\KoreShelf` (incolla il percorso nella barra di
  Esplora file). Restano lì anche se sposti, aggiorni o elimini l'exe.
- **Versione portatile** (es. chiavetta USB): crea una cartella `KoreShelf_Data`
  accanto a `KoreShelf.exe` e i dati verranno salvati lì.
- **Arrivi dalla vecchia versione Node.js?** Metti l'exe nella cartella che contiene
  `public\koreshelf.db`: al primo avvio la libreria viene importata da sola.
- **Qualcosa non va?** Guarda `koreshelf.log` nella cartella dei dati.

Su Windows 10/11 la finestra usa Microsoft Edge WebView2, già presente nel sistema.
Se mancasse, KoreShelf si apre nel browser e spiega come installarlo.

Windows potrebbe mostrare l'avviso SmartScreen ("app non riconosciuta") perché l'exe
non è firmato: *Ulteriori informazioni → Esegui comunque*.

## Android e iOS

L'app per telefono (cartella `mobile/`, Tauri 2) usa lo stesso motore della versione desktop:
avvia il server interno sul telefono e ne mostra l'interfaccia, con un layout pensato per il
pollice (scaffale 3D a tutto schermo, pannello in basso, lettore con comandi in basso).

- **Android**: il workflow produce `KoreShelf-<versione>-android.apk`, firmato con la chiave di
  debug: si installa abilitando "Installa app sconosciute". Per il Play Store servirà una chiave
  di firma dedicata.
- **iOS**: senza un account Apple Developer il workflow produce un `.ipa` **non firmato**, che va
  firmato prima dell'installazione (con il proprio account Apple tramite strumenti come
  Sideloadly o AltStore). Con l'account si potrà firmare direttamente nel workflow.

## Per chi sviluppa

### Creare i pacchetti (exe, dmg, AppImage)

**Modo facile, senza installare nulla:** fai push su GitHub. Il workflow
`.github/workflows/release.yml` costruisce:

- `KoreShelf-<versione>-windows-x64.exe` (Windows)
- `KoreShelf-<versione>-macos-universal.dmg` (macOS, Mac Intel e Apple Silicon)
- `KoreShelf-<versione>-x86_64.AppImage` (Linux, qualsiasi distribuzione recente)

Li trovi negli *Artifacts* della scheda *Actions* (puoi anche avviarlo a mano con
*Run workflow*). Se pubblichi un tag `v3.1.0` vengono allegati automaticamente alla Release.

Il `.dmg` non è firmato con un certificato Apple: al primo avvio *tasto destro → Apri*.

**In locale su Windows:** installa [Rust](https://rustup.rs) e, quando richiesto,
Visual Studio Build Tools con "Sviluppo di applicazioni desktop con C++".
Poi doppio clic su `build.bat`, oppure `cargo build --release`.

**In locale su Linux:** installa `libwebkit2gtk-4.1-dev libgtk-3-dev librsvg2-dev`, poi
`cargo build --release && packaging/linux/build-appimage.sh target/release/koreshelf dist`.

**In locale su macOS:** `cargo build --release`, poi
`packaging/macos/make-app.sh target/release/koreshelf dist` e
`packaging/macos/make-dmg.sh dist/KoreShelf.app dist/KoreShelf.dmg`.

### Struttura

```
frontend/            Interfaccia (Three.js, reader epub.js/pdf.js) compilata con Vite
  src/               Sorgenti JS originali + traduzioni
  public/vendor/     epub.js, JSZip, pdf.js inclusi per funzionare offline
  dist/              Build pronta, incorporata nell'exe al momento della compilazione
src/
  main.rs            Avvio, istanza singola, scelta della porta
  window.rs          Finestra nativa (wry/tao)
  server.rs          Tutte le API (equivalente di server.js)
  db.rs              SQLite, stesso schema della versione Node
  epub.rs, pdf.rs    Lettura metadati, copertina, ISBN, stima pagine
  online.rs          Google Books (ISBN) e Apple Books (titolo/autore)
  images.rs          Copertine 512x768 JPEG
  assets.rs          Serve il frontend incorporato
  paths.rs           Cartella dati, modalità portatile, import vecchia libreria

frontend/src/upload-tray.js   Vassoio di caricamento animato (segnaposto a forma di libro)
frontend/src/dialogs.js       Finestre di conferma nello stile dell'app
frontend/src/dissolve.js      Il libro eliminato si sgretola e il vento ne porta via i frammenti
frontend/public/reader-search.js  Ricerca di parole e frasi nel lettore (EPUB e PDF)
frontend/public/sample/       Libro di esempio (EPUB, it/en), generato da tools/make_sample_book.py
packaging/                    Script per AppImage (Linux), .app e .dmg (macOS), regole di rete Android
mobile/                       App Android/iOS (Tauri 2), guscio attorno alla libreria koreshelf
src/lib.rs                    Il motore come libreria (start_embedded), usato da desktop e mobile
tests/                        Test end-to-end dell'interfaccia e dei pacchetti
```

### Sviluppo con ricarica automatica

```
cargo run                     # backend su http://127.0.0.1:3000
cd frontend && npm run dev    # frontend Vite con proxy verso il backend
```

Dopo aver modificato il frontend, rigenera la build con `npm run build` (o `build-frontend.sh`)
prima di compilare l'exe.

`cargo run --no-default-features` avvia la versione senza finestra, che si apre nel browser.

### Test automatici

Test unitari del backend:

```
cargo test --no-default-features
```

Test end-to-end dell'interfaccia (avviano il vero server su una libreria temporanea
e usano l'app in Chromium: click su Amazon, volo del libro sullo scaffale, barra in alto,
banner aggiornamenti, pulsante Spegni, eliminazione con sgretolamento (anche dell'ultimo libro di una mensola), footer con licenza MIT, ricerca nel lettore
EPUB e PDF, stile dei bottoni del lettore):

```
pip install playwright pillow reportlab
playwright install chromium
cargo build --no-default-features
python tests/e2e/test_ui.py
```

Con `KEEP_SHOTS=1` salva anche gli screenshot di ogni fase; con `ONLY=amazon` lancia un solo test.

Test dei pacchetti (workflow, bundle macOS e AppImage avviato davvero su un display virtuale):

```
pip install pyyaml pillow
python tests/packaging/test_packaging.py
```

## Licenza

MIT, © GabrieleTrovato01
