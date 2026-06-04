# 📚 LoreKeeper

*Read this in: [English](#english) | [Italiano](#italiano)*

---

<img align="center" width="800" height="500" alt="demo" src="https://github.com/user-attachments/assets/499a1809-144c-4bc4-b870-f23b3e076ab2" />



---

<a name="english"></a>
## 🇬🇧 English

An interactive 3D digital library that allows you to upload, browse, and organize your EPUB and PDF files in an immersive graphical environment.

But that's not all: thanks to the **Export for AI** feature, you can extract the entire clean text of any book into a ready-to-use Knowledge Base (`.md` file). You can easily upload this file to ChatGPT, Claude, or Gemini to literally "talk" to your books: ask questions about the plot, search for specific concepts, or ask for summaries, leaving the heavy computational lifting to cloud AIs without overloading your PC!

---

### ⚙️ System Requirements

To run this project, you do not need to configure servers or install Node.js! The requirements depend entirely on how you choose to run it:

*   **Portable App (Recommended):** No external software required. Just download, extract, and run.
*   **Docker Version:** You only need one free program: **Docker**, which will run the web application isolated and securely.

---

### 🚀 Installation Guide (Step-by-Step)

You have two ways to run LoreKeeper.

#### Option 1: The Easy Way (Portable Desktop App - Recommended)

If you want to avoid installing Docker or Node.js, you can use our standalone executable available for **Windows, Linux, and macOS (Apple Silicon)**.

1. Go to the [Releases section](https://www.google.com/search?q=https://github.com/GabrieleTrovato01/LoreKeeper/releases) of this repository.
2. Download the `.zip` file for your Operating System.
3. Extract the contents to any folder on your PC.
4. **Windows:** Double-click `lorekeeper-win.exe`.
5. **Linux:** Open the terminal in the folder and run `./lorekeeper-linux`. *(Note: you might need to make it executable first by running `chmod +x lorekeeper-linux`).*
6. **macOS (Apple Silicon / M1, M2, M3...):** Due to Apple's strict quarantine for unsigned apps, open your terminal in the extracted folder and run these two commands to grant permissions:

```bash
chmod +x lorekeeper-macos-arm
xattr -cr lorekeeper-macos-arm

```

*Then, simply double-click the file or run `./lorekeeper-macos-arm`.*

*(Note for Intel Mac users: Pre-built binaries are not available for older Intel Macs. Please use Option 2: Docker, or run the app from source).*

*Note on Security: As this is an independent open-source project without a paid digital signature, SmartScreen or Gatekeeper may show a warning at the first launch. Simply choose "More info" and "Run anyway" to get started; the source code is fully transparent and available here.*

#### Option 2: The Advanced Way (Docker - For Developers/Linux/macOS)

If you prefer to run the project via Docker or are on a non-Windows OS, follow these steps.

**Step 1: Install Docker**

* **Windows / macOS:** Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/). Start it and make sure Docker is running in the background.
* **Linux:** Open the terminal and install Docker Engine and the Compose plugin (e.g., on Ubuntu: `sudo apt install docker.io docker-compose-v2`).

**Step 2: Start the 3D Library**

1. Download this project to your PC (via `git clone` or by downloading the ZIP).
2. Open the terminal **exactly inside the project folder** (where the `docker-compose.yml` file is located).
3. Type this command and press Enter:
`docker compose up -d --build`.
---

### 🎮 How to Use the App

Once the terminal has finished loading, the library is ready!
Open your favorite browser (Chrome, Edge, Safari) and go to the address:

👉 **http://localhost:3000**

**💡 Tip for the ultimate experience:** You don't need to open the browser every time! You can transform this page into a desktop app:
On Google Chrome or Edge, go to the menu (the three dots) -> "Save and share" / "Apps" -> **Install page as App / Create shortcut** (remember to check "Open as window"). You will have an icon on your desktop, and it will look just like a native installed program!

---

### 📖 Integrated EPUB & PDF Reader & Reading Memories

LoreKeeper is not just an archive, it's a fully-featured immersive reading environment designed to build your personal "Memory Palace":

* **Customizable Reader:** Open any EPUB or PDF directly in the browser. Adjust the text size on the fly and toggle between Light and Dark mode. The reader will remember your exact position and aesthetic preferences!
* **Dynamic 3D Bookmarks:** As you progress through a book, a physical red ribbon bookmark will move along your 3D book on the shelf, showing your exact reading percentage at a glance.
* **Interactive Reviews:** When you finish a book (100%), a seamless modal will appear prompting you to rate it (1-5 stars) and write your hot-take review. Your rating will literally be stamped in gold on the back cover of the 3D book in your library!

---


### 🧠 Export for AI (Obsidian & LLM Ready)

LoreKeeper acts as an "AI-Bridge", transforming your EPUBs and PDFs into clean, structured Knowledge Bases.

If you want to analyze a book:
1. Select the book in the 3D library.
2. Click on **"🤖 Esporta per IA"**.
3. The app will instantly download a `LoreKeeper_title.md` file.

**Why Markdown?**
* **Clean Text:** The exported file is stripped of all complex HTML, providing only the raw content, which drastically reduces AI hallucinations.
* **Obsidian/Notion Support:** The file includes YAML Frontmatter (metadata) and hierarchical headers. It is a "Smart Document" ready to be imported and indexed in your Personal Knowledge Management systems.

---

### 📁 Data Management (Your Books)

The app is smart and syncs data with your computer. Inside the project folder, you will find these folders in the `public/` directory (created automatically on the first run):

* `ebooks/`: Your books (EPUBs/PDFs) are physically saved here.
* `covers/`: Extracted covers for 3D visualization are saved here.
* `books.json`: This file is the database of your library.

**Note:** These folders are protected and ignored by Git (thanks to `.gitignore`). You can add as many books as you want without risking accidentally uploading them online if you publish the code on GitHub!

---

### 🌍 Multilingual Support (i18n)

LoreKeeper supports internationalization (i18n) using an asynchronous loading system to ensure optimal performance without startup lag. Currently, the application is available in **English** and **Italian**.

You can switch languages on the fly using the dedicated button in the top navigation bar. Your language preference is automatically saved in your browser via `localStorage`.

**Want to contribute a new language?**
Adding a new translation is incredibly easy:
1. Navigate to the `src/locales/` folder, duplicate the `en.js` file, and rename it with your language code (e.g., `es.js` for Spanish).
2. Translate the string values within the exported JavaScript object.
3. Update the `langBtn` logic in `src/main.js` to include your new language in the toggle cycle.

---

### 🆘 Troubleshooting

* **Red error during installation: `CustomEvent is not defined`**
  You are using an outdated version of Node.js in the Dockerfile. Make sure you are using the updated code, where the `Dockerfile` starts with `FROM node:22-bookworm-slim` to support Vite.
* **Terminal error: `port is already allocated`**
  You already have another program running that is using port 3000. Turn it off, or open the `docker-compose.yml` file and change the port from `"3000:3000"` to `"8080:3000"`, then access the app by going to `localhost:8080`.

<br>
<hr>
<br>

<a name="italiano"></a>
## 🇮🇹 Italiano

Una libreria digitale interattiva in 3D che ti permette di caricare, sfogliare e organizzare i tuoi file EPUB e PDF in un ambiente grafico immersivo.

Ma non è finita qui: grazie alla funzione **Esporta per IA**, puoi estrarre l'intero testo pulito di qualsiasi libro in un file Knowledge Base (`.md`) pronto all'uso. Ti basterà caricare questo file su ChatGPT, Claude o Gemini per letteralmente "parlare" con i tuoi libri: fai domande sulla trama, cerca concetti specifici o chiedi riassunti, lasciando il lavoro pesante ai server cloud senza fondere il tuo PC!

---

### ⚙️ Requisiti di Sistema

Per far funzionare questo progetto non devi configurare server o installare Node.js! I requisiti dipendono esclusivamente da come decidi di avviarlo:

*   **App Portatile (Consigliata):** Nessun software aggiuntivo richiesto. Basta scaricare, estrarre e avviare il programma.
*   **Versione Docker:** Ti serve solo un programma gratuito: **Docker**, che farà girare l'applicazione web in modo isolato e sicuro.

---


### 🚀 Guida all'Installazione (Passo Passo)

Hai due modi per avviare LoreKeeper.

#### Opzione 1: La via più semplice (App Portatile Desktop - Consigliata)

Se vuoi evitare di installare Docker o Node.js, puoi usare il nostro eseguibile standalone disponibile per **Windows, Linux e macOS (Apple Silicon)**.

1. Vai nella sezione [Releases](https://www.google.com/search?q=https://github.com/GabrieleTrovato01/LoreKeeper/releases) di questo repository.
2. Scarica il file `.zip` corrispondente al tuo Sistema Operativo.
3. Estrai il contenuto in una cartella a tua scelta sul PC.
4. **Windows:** Fai doppio clic su `lorekeeper-win.exe`.
5. **Linux:** Apri il terminale nella cartella ed esegui `./lorekeeper-linux`. *(Nota: potrebbe essere necessario dare i permessi di esecuzione digitando `chmod +x lorekeeper-linux`).*
6. **macOS (Apple Silicon / M1, M2, M3...):** A causa delle rigide regole di sicurezza di Apple per le app non firmate a pagamento, apri il terminale nella cartella estratta ed esegui questi due comandi per sbloccare l'app:

```bash
chmod +x lorekeeper-macos-arm
xattr -cr lorekeeper-macos-arm

```

*Fatto ciò, ti basterà fare doppio clic sul file o eseguire `./lorekeeper-macos-arm`.*

*(Nota per gli utenti Mac Intel: L'eseguibile precompilato non è disponibile per i vecchi Mac Intel. Puoi usare l'Opzione 2 con Docker, oppure avviare l'app dal codice sorgente).*

*Nota sulla Sicurezza: Essendo un progetto open-source indipendente privo di firma digitale a pagamento, Windows SmartScreen o Apple Gatekeeper potrebbero mostrare un avviso al primo avvio. Basta cliccare su "Ulteriori informazioni" e poi su "Esegui comunque"; il codice sorgente è completamente trasparente e verificabile in questo repository.*

#### Opzione 2: La via avanzata (Docker - Per Sviluppatori/Linux/macOS)

Se preferisci far girare il progetto tramite Docker o sei su un sistema operativo diverso da Windows, segui questi passaggi.

**Passo 1: Installa Docker**

* **Windows / macOS:** Scarica e installa [Docker Desktop](https://www.docker.com/products/docker-desktop/). Avvialo e assicurati che Docker sia attivo in background.
* **Linux:** Apri il terminale e installa Docker Engine e il plugin Compose (es. su Ubuntu: `sudo apt install docker.io docker-compose-v2`).

**Passo 2: Avvia la Libreria 3D**

1. Scarica questo progetto sul tuo PC (tramite `git clone` o scaricando lo ZIP).
2. Apri il terminale **esattamente all'interno della cartella del progetto** (dove si trova il file `docker-compose.yml`).
3. Digita questo comando e premi Invio:
`docker compose up -d --build`.

### 🎮 Come usare l'App

Una volta che il terminale ha finito di caricare, la libreria è pronta!
Apri il tuo browser preferito (Chrome, Edge, Safari) e vai all'indirizzo:

👉 **http://localhost:3000**

---

### 📖 Lettore EPUB e PDF Integrato e Ricordi di Lettura

LoreKeeper non è solo un archivio, ma un ambiente di lettura immersivo pensato per costruire il tuo personale "Palazzo della Memoria":

* **Lettore Personalizzabile:** Apri gli EPUB o i PDF direttamente nel browser. Regola la grandezza del testo al volo e passa dalla modalità Chiara a quella Scura. Il lettore ricorderà l'esatta pagina in cui ti trovavi e le tue preferenze estetiche!
* **Segnalibri Dinamici in 3D:** Mentre progredisci nella lettura, una fettuccia rossa (segnalibro) si sposterà fisicamente sul tuo libro 3D nella mensola, mostrandoti la percentuale completata a colpo d'occhio.
* **Recensioni Interattive:** Quando finisci un libro (100%), apparirà un elegante pop-up per valutare l'opera (1-5 stelle) e scrivere le tue riflessioni a caldo. La tua valutazione a stelle verrà letteralmente stampata in oro sul retro della copertina 3D del libro!

---

### 🧠 Funzione "Esporta per IA" (Pronto per Obsidian e LLM)

LoreKeeper funge da "AI-Bridge", trasformando i tuoi EPUB e PDF in Knowledge Base strutturate e pulite.

Se vuoi analizzare un libro con l'Intelligenza Artificiale:
1. Seleziona il libro nella libreria 3D.
2. Clicca sul tasto **"🤖 Esporta per IA / Esporta in Markdown"**.
3. L'app scaricherà istantaneamente un file `LoreKeeper_titolo.md`.

**Perché in Markdown?**
* **Testo Pulito:** Il file esportato viene ripulito da tutto l'HTML complesso, offrendo solo il contenuto grezzo, riducendo drasticamente le allucinazioni dell'IA.
* **Supporto Obsidian/Notion:** Il file include YAML Frontmatter (metadati) e titoli gerarchici. È un "Documento Smart" pronto per essere archiviato e indicizzato nei tuoi sistemi di Personal Knowledge Management.

---

### 📁 Gestione dei Dati (I tuoi libri)

L'app è intelligente e sincronizza i dati con il tuo computer. All'interno della cartella del progetto, troverai (o verranno create automaticamente al primo avvio) queste cartelle nella directory `public/`: 

* `ebooks/`: Qui vengono salvati fisicamente i tuoi libri (EPUB).
* `covers/`: Qui vengono salvate le copertine estratte per la visualizzazione 3D.
* `books.json`: Questo file è il database della tua libreria.   

**Nota:** Queste cartelle sono protette e ignorate da Git (grazie al `.gitignore`). Puoi aggiungere quanti libri vuoi senza rischiare di caricarli accidentalmente online se pubblichi il codice su GitHub!

---
### 🌍 Multilingua (i18n)

LoreKeeper supporta l'internazionalizzazione (i18n) con un sistema di caricamento asincrono per garantire prestazioni ottimali. Attualmente, l'applicazione è disponibile in **Italiano** e **Inglese**.

La lingua può essere cambiata istantaneamente tramite l'apposito pulsante nella barra superiore, e la tua preferenza verrà salvata automaticamente nel browser tramite `localStorage`.

**Vuoi contribuire con una nuova lingua?**
Aggiungere una traduzione è semplicissimo:
1. Vai nella cartella `src/locales/` e duplica il file `en.js` (ad esempio, chiamalo `es.js` per lo spagnolo).
2. Traduci le stringhe all'interno dell'oggetto JavaScript.
3. Aggiorna la logica del pulsante `langBtn` nel file `src/main.js` per includere la tua nuova lingua nel ciclo di selezione.
---

### 🆘 Risoluzione dei Problemi Frequenti

* **Errore in rosso durante l'installazione: `CustomEvent is not defined`**
  Stai usando una versione di Node.js troppo vecchia nel Dockerfile. Assicurati di usare il codice aggiornato, dove il `Dockerfile` inizia con `FROM node:22-bookworm-slim` per supportare Vite.
* **Errore nel terminale: `port is already allocated`**
  Hai già un altro programma in esecuzione che sta usando la porta 3000. Spegnilo, oppure apri il file `docker-compose.yml` e cambia la porta da `"3000:3000"` a `"8080:3000"`, poi accedi all'app andando su `localhost:8080`.
