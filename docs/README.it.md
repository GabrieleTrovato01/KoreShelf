<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   
   🌍 **Read this in:** [🇬🇧 English](../README.md) | [🇮🇹 Italiano](README.it.md) | [🇪🇸 Español](README.es.md) | [🇫🇷 Français](README.fr.md) | [🇩🇪 Deutsch](README.de.md)

   ## Home
   <img align="center" width="800" height="500" alt="demo" src="https://github.com/user-attachments/assets/499a1809-144c-4bc4-b870-f23b3e076ab2" />
   
   
   ## Reader
   <img width="800" height="500" alt="demo-reader" src="https://github.com/user-attachments/assets/8fca0fcd-2a92-40d9-a1cc-f8a2d552e57a" />

</div>

## 🇮🇹 Italiano

Una libreria digitale interattiva in 3D che ti permette di caricare, sfogliare e organizzare i tuoi file EPUB e PDF in un ambiente grafico immersivo.

### ⚙️ Requisiti di Sistema

Per far funzionare questo progetto non devi configurare server o installare Node.js! I requisiti dipendono esclusivamente da come decidi di avviarlo:

- **App Portatile (Consigliata):** Nessun software aggiuntivo richiesto. Basta scaricare, estrarre e avviare il programma.
- **Versione Docker:** Ti serve solo un programma gratuito: Docker, che farà girare l'applicazione web in modo isolato e sicuro.

### 🚀 Guida all'Installazione (Passo Passo)

Hai due modi per avviare KoreShelf.

#### Opzione 1: La via più semplice (App Portatile Desktop - Consigliata)

Se vuoi evitare di installare Docker o Node.js, puoi usare il nostro eseguibile standalone disponibile per Windows, Linux e macOS (Apple Silicon).

1. Vai nella sezione [Releases](https://github.com/GabrieleTrovato01/KoreShelf/releases) di questo repository.
2. Scarica il file `.zip` corrispondente al tuo Sistema Operativo.
3. Estrai il contenuto in una cartella a tua scelta sul PC.
   - **Windows:** Fai doppio clic su `koreshelf-win.exe`.
   - **Linux:** Apri il terminale nella cartella ed esegui `./koreshelf-linux`. (Nota: potrebbe essere necessario dare i permessi di esecuzione digitando `chmod +x koreshelf-linux`).
   - **macOS (Apple Silicon / M1, M2, M3...):** A causa delle rigide regole di sicurezza di Apple per le app non firmate a pagamento, apri il terminale nella cartella estratta ed esegui questi due comandi per sbloccare l'app:
     ```bash
     chmod +x koreshelf-macos-arm
     xattr -cr koreshelf-macos-arm
     ```
     Fatto ciò, ti basterà fare doppio clic sul file o eseguire `./koreshelf-macos-arm`.

*(Nota per gli utenti Mac Intel: L'eseguibile precompilato non è disponibile per i vecchi Mac Intel. Puoi usare l'Opzione 2 con Docker, oppure avviare l'app dal codice sorgente).*

**Nota sulla Sicurezza:** Essendo un progetto open-source indipendente privo di firma digitale a pagamento, Windows SmartScreen o Apple Gatekeeper potrebbero mostrare un avviso al primo avvio. Basta cliccare su "Ulteriori informazioni" e poi su "Esegui comunque"; il codice sorgente è completamente trasparente e verificabile in questo repository.

#### Opzione 2: La via avanzata (Docker - Per Sviluppatori/Linux/macOS)

Se preferisci far girare il progetto tramite Docker o sei su un sistema operativo diverso da Windows, segui questi passaggi.

**Passo 1: Installa Docker**
- **Windows / macOS:** Scarica e installa [Docker Desktop](https://www.docker.com/products/docker-desktop/). Avvialo e assicurati che Docker sia attivo in background.
- **Linux:** Apri il terminale e installa Docker Engine e il plugin Compose (es. su Ubuntu: `sudo apt install docker.io docker-compose-v2`).

**Passo 2: Avvia la Libreria 3D**
1. Scarica questo progetto sul tuo PC (tramite `git clone` o scaricando lo ZIP).
2. Apri il terminale esattamente all'interno della cartella del progetto (dove si trova il file `docker-compose.yml`).
3. Digita questo comando e premi Invio:
   ```bash
   docker compose up -d --build
   ```

### 🎮 Come usare l'App

Una volta che il terminale ha finito di caricare, la libreria è pronta!

Apri il tuo browser preferito (Chrome, Edge, Safari) e vai all'indirizzo:

👉 **http://localhost:3000**

### 📖 Lettore EPUB e PDF Integrato

KoreShelf non è solo un archivio, ma un ambiente di lettura immersivo:

- **Lettore Dual-Engine Intelligente:** Apri gli EPUB (formato fluido) o i PDF (formato fisso) direttamente nel browser. Puoi passare in un istante dalla modalità Sfoglia Pagine (Orizzontale) allo Scorrimento Continuo (Verticale).
- **Selezione Testo PDF:** Grazie al TextLayer integrato, il testo dei PDF diventa selezionabile ed evidenziabile proprio come negli EPUB.
- **Copertine PDF Automatiche:** I PDF senza copertina interna ottengono automaticamente la copertina generata dalla prima pagina, direttamente nel browser (nessuna dipendenza esterna come ImageMagick necessaria).
- **Sottolineatura Testo:** Seleziona qualsiasi testo nei tuoi libri per sottolineare le frasi memorabili. Gli highlight vengono salvati in modo persistente e possono essere rivisti in qualsiasi momento.
- **Personalizzazione Lettore:** Regola font, dimensione testo, interlinea e allineamento del testo (sinistra, centro, destra, giustificato) tramite la sidebar intelligente.
- **Modalità Scura/Chiara:** Passa tra i temi con un clic per ridurre l'affaticamento visivo.
- **Progresso di Lettura:** Una fettuccia rossa (segnalibro) si sposta fisicamente sul tuo libro 3D nella mensola, mostrandoti la percentuale completata a colpo d'occhio.
- **Recensioni Interattive:** Quando finisci un libro (100%), appare un elegante pop-up per valutare l'opera (1-5 stelle) e scrivere le tue riflessioni a caldo. La tua valutazione a stelle verrà letteralmente stampata in oro sul retro della copertina 3D del libro!
- **Indice intelligente:** Naviga facilmente tra testi lunghi con il nuovo pulsante Indice. È perfettamente compatibile con EPUB e PDF strutturati e offre un pratico menu di accesso rapido con selettore di pagina per i PDF scansionati privi di navigazione interna.

### 📌 Bacheca Sottolineature (Palazzo della Memoria)

Le tue annotazioni meritano più di una semplice lista. KoreShelf presenta un'unica **Bacheca 3D delle Sottolineature** che appare sopra la tua libreria:

- **Post-it Visivi:** Ogni libro con highlight appare come un post-it su una bacheca virtuale in legno.
- **Navigazione Multi-pagina:** Sfoglia tutti i tuoi highlight con le frecce sinistra/destra, anche quando hai centinaia di note.
- **Sincronizzazione in Tempo Reale:** Gli highlight aggiunti nel lettore appaiono istantaneamente sulla bacheca senza ricaricare.
- **Gestione Rapida:** Clicca su qualsiasi post-it per visualizzare, modificare o eliminare highlight specifici.
- **Condivisione di citazioni sui social:** Condividi le tue citazioni preferite con un solo clic! KoreShelf genera automaticamente un'elegante immagine quadrata (1080x1080) con la tua citazione, la copertina del libro e i metadati, pronta per essere condivisa su Instagram, Facebook, X, WhatsApp o scaricata localmente.

### 📁 Gestione dei Dati (I tuoi libri)

L'app è intelligente e sincronizza i dati con il tuo computer. All'interno della cartella del progetto, troverai (o verranno create automaticamente al primo avvio) queste cartelle nella directory `public/`:

- `ebooks/`: Qui vengono salvati fisicamente i tuoi libri (EPUB/PDF).
- `covers/`: Qui vengono salvate le copertine estratte per la visualizzazione 3D.
- `koreshelf.db`: Questo è il solido database SQLite che contiene i metadati, il progresso di lettura, le categorie e gli highlight della tua libreria.

**✏️ Metadati Personalizzati (Hot-Swap):**
Hai il pieno controllo sui tuoi dati. Clicca su "Modifica" su qualsiasi libro per correggere manualmente titolo, autore, descrizione o assegnare una categoria personalizzata. Puoi anche caricare una copertina in alta definizione. Il database SQLite e la cartella `covers/` si aggiornano all'istante, e il modello 3D riflette le modifiche in tempo reale senza ricaricare la pagina!

### 🛡️ Server a Prova di Proiettile

KoreShelf è progettato per gestire qualsiasi ebook tu gli lanci contro:

- **Supporto File Grandi:** Timeout dinamici e parsing ottimizzato permettono di processare EPUB e PDF con decine di migliaia di pagine senza bloccare il server.
- **Protezione dai Crash:** Catcher di errori globali e monkey-patch per librerie esterne garantiscono che il server rimanga attivo anche con file malformati.
- **Estrazione Metadati Intelligente:** Rilevamento automatico dell'ISBN e fallback su Apple Books/Google Books per copertine e trame.
- **Rilevamento Duplicati:** Impedisce di caricare lo stesso libro due volte.

### 📱 Interfaccia Responsive

Per gestire al meglio il tuo spazio di lavoro, l'interfaccia si adatta automaticamente agli schermi o alle finestre più piccole. Il testo dei bottoni scompare lasciando spazio a icone pulite ed eleganti per evitare sovrapposizioni, garantendo un'esperienza fluida ovunque.

**Nota:** Queste cartelle sono protette e ignorate da Git (grazie al `.gitignore`). Puoi aggiungere quanti libri vuoi senza rischiare di caricarli accidentalmente online se pubblichi il codice su GitHub!

### 🌍 Multilingua (i18n)

KoreShelf supporta l'internazionalizzazione (i18n) con un sistema di caricamento asincrono per garantire prestazioni ottimali.  Attualmente, l'applicazione è disponibile in inglese, italiano, spagnolo, francese e tedesco.

La lingua può essere cambiata istantaneamente tramite l'apposito pulsante nella barra superiore, e la tua preferenza verrà salvata automaticamente nel browser tramite `localStorage`.

**Vuoi contribuire con una nuova lingua?**
Aggiungere una traduzione è semplicissimo:

1. Vai nella cartella `src/locales/` e duplica il file `en.js` (ad esempio, chiamalo `es.js` per lo spagnolo).
2. Traduci le stringhe all'interno dell'oggetto JavaScript.
3. Aggiorna la logica del pulsante `langBtn` nel file `src/main.js` per includere la tua nuova lingua nel ciclo di selezione.

### 🆘 Risoluzione dei Problemi Frequenti

**Errore in rosso durante l'installazione: `CustomEvent is not defined`**
Stai usando una versione di Node.js troppo vecchia nel Dockerfile. Assicurati di usare il codice aggiornato, dove il `Dockerfile` inizia con `FROM node:22-bookworm-slim` per supportare Vite.

**Errore nel terminale: `port is already allocated`**
Hai già un altro programma in esecuzione che sta usando la porta 3000. Spegnilo, oppure apri il file `docker-compose.yml` e cambia la porta da `"3000:3000"` a `"8080:3000"`, poi accedi all'app andando su `localhost:8080`.

**Le copertine PDF non appaiono?**
Le copertine vengono generate automaticamente dalla prima pagina del PDF direttamente nel browser. Se un PDF è particolarmente grande o corrotto, il sistema farà fallback cercando una copertina online tramite Apple Books.
