<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   🌍 **Read this in:** [🇬🇧 English](../README.md) | [🇮🇹 Italiano](README.it.md) | [🇪🇸 Español](README.es.md) | [🇫🇷 Français](README.fr.md) | [🇩🇪 Deutsch](README.de.md)

   ## Home
   <img align="center" width="800" height="500" alt="Demo of the app" src="https://github.com/user-attachments/assets/4dc13a62-af86-4b1e-a5ed-9dc64050a282" />
   
   
   ## Reader
  <img align="center" width="800" height="500" alt="Demo reader" src="https://github.com/user-attachments/assets/b1fabd7e-3587-4c47-ba02-7fec9696eee6" />

</div>

## 🇮🇹 Italiano

Una libreria digitale interattiva in 3D che ti permette di caricare, sfogliare e organizzare i tuoi file EPUB e PDF in un ambiente grafico immersivo.

### ⚙️ Requisiti di Sistema

Dalla versione 4.0.0 KoreShelf è **un unico file**: niente Node.js, nient'altro da installare. Per un server di casa c'è anche l'immagine Docker (vedi sotto).

- **Windows:** Windows 10 o 11.
- **Mac:** chip Apple e Intel (un solo file universale).
- **Linux:** qualsiasi distribuzione recente a 64 bit (x86_64).
- **Android:** qualsiasi telefono o tablet Android.
- **iPhone / iPad:** solo per utenti esperti (vedi sotto).

### 🚀 Download e Installazione

Il modo più semplice è il sito **[koreshelf.github.io](https://koreshelf.github.io)**: riconosce il tuo dispositivo e ti propone il file giusto.
Puoi anche scegliere il file tu dall'[ultima release](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest):

| Dispositivo | File |
|---|---|
| Windows | `KoreShelf-<versione>-windows-x64.exe` |
| Mac | `KoreShelf-<versione>-macos-universal.dmg` |
| Linux | `KoreShelf-<versione>-x86_64.AppImage` |
| Android | `KoreShelf-<versione>-android.apk` |
| iPhone / iPad | `KoreShelf-<versione>-ios-unsigned.ipa` |

KoreShelf è gratuito e non ha un certificato a pagamento, quindi **la prima volta** il sistema chiede conferma. È normale e succede una volta sola.

#### 🪟 Windows
1. Scarica il file `.exe` e fai doppio clic: KoreShelf si apre nella sua finestra, non c'è niente da installare.
2. Se Windows mostra "Windows ha protetto il PC", premi **Ulteriori informazioni → Esegui comunque**.

#### 🍎 Mac
1. Scarica il file `.dmg`, aprilo e trascina **KoreShelf** in **Applicazioni**.
2. La prima volta macOS blocca l'app: apri **Impostazioni di Sistema → Privacy e sicurezza**, scorri in basso e premi **Apri comunque**.

#### 🐧 Linux
1. Scarica il file `.AppImage`.
2. Rendilo eseguibile: tasto destro → **Proprietà → Consenti l'esecuzione come programma** (oppure `chmod +x KoreShelf-*.AppImage` nel terminale).
3. Fai doppio clic sul file.

#### 🤖 Android
1. Scarica il file `.apk` sul telefono, aprilo e premi **Installa**.
2. Se richiesto, consenti al browser di installare app sconosciute.
3. Arrivi dalla versione 3.x? La nuova app si installa accanto alla vecchia: ricarica i tuoi libri, poi puoi disinstallare l'app vecchia.

#### 📱 iPhone e iPad (utenti esperti)
Apple permette di installare app fuori dall'App Store solo con strumenti appositi, quindi il file `.ipa` non è firmato.
1. Su un computer installa uno strumento come AltStore, SideStore o Sideloadly e accedi con il tuo Apple ID.
2. Scarica il file `.ipa` e installalo sull'iPhone o sull'iPad con quello strumento.
3. Sul dispositivo autorizza lo sviluppatore in **Impostazioni → Generali → VPN e gestione dispositivi**. Da iOS 16 serve anche attivare la **Modalità sviluppatore** (**Impostazioni → Privacy e sicurezza**).

Con un Apple ID gratuito l'app va rinnovata ogni 7 giorni (AltStore lo fa da solo).

### 🐳 Self-hosting con Docker (server di casa, NAS, Raspberry Pi)

Tieni KoreShelf acceso su un server di casa e usalo dal browser di qualsiasi dispositivo della tua rete. L'immagine funziona sui PC (amd64) e sulle schede ARM come Raspberry Pi 4/5 e la maggior parte dei NAS (arm64).

1. Installa Docker (Docker Desktop su Windows e Mac, oppure Docker Engine con il plugin Compose su Linux).
2. Crea una cartella, mettici il file [`docker-compose.yml`](../docker-compose.yml) di questo progetto e lancia:
   ```bash
   docker compose up -d
   ```
3. Apri `http://INDIRIZZO-DEL-SERVER:3000` (sullo stesso computer: `http://localhost:3000`).

Senza il file compose:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

- **I tuoi dati** (libri, copertine, database) stanno nel volume `koreshelf-data`, montato su `/data`, e restano anche quando aggiorni. Backup: `docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .`
- **Aggiornare:** `docker compose pull && docker compose up -d`
- **Password (facoltativa):** imposta `KORESHELF_PASSWORD` (e se vuoi `KORESHELF_USERNAME`, predefinito `koreshelf`) in `docker-compose.yml`: il browser le chiederà.
- **Arrivi dalla versione Docker 3.x?** In `docker-compose.yml` togli il `#` davanti alla riga `- ./public:/app/public:ro` (lanciandolo dalla cartella della vecchia installazione): al primo avvio la libreria viene importata in `/data`.
- **Porta 3000 già occupata sul server?** Cambia il numero a sinistra: `"8080:3000"`, poi apri `http://INDIRIZZO-DEL-SERVER:8080`.
- **Impostazioni:** `KORESHELF_PORT` (predefinita 3000), `KORESHELF_HOST` (predefinito `0.0.0.0`), `KORESHELF_DATA` (predefinita `/data`).

> [!WARNING]
> KoreShelf è pensato per la rete di casa. Non esporlo direttamente su internet: per raggiungerlo da fuori mettilo dietro un reverse proxy con **HTTPS** (per esempio Caddy, Nginx Proxy Manager o Traefik) oppure usa una VPN come Tailscale, e imposta una password. Senza HTTPS la password viaggia in chiaro.

Anche senza Docker, il programma KoreShelf può fare da server: `koreshelf --server` (stesse impostazioni).

### 🎮 Come usare l'App

Apri KoreShelf e compare il tuo scaffale 3D.

- **Prima volta?** Premi *Prova con un libro di esempio*: arriva sullo scaffale un piccolo libro che ti insegna l'app mentre lo leggi.
- **Aggiungere libri:** premi *+ Carica Ebook* oppure trascina i file EPUB e PDF sulla finestra.
- **Leggere:** *Inizia a leggere* (o *Riprendi a leggere*) sotto il libro al centro. Le azioni meno frequenti sono nel menu *Altro*.
- **Organizzare:** con *Gestisci* rinomini, crei o elimini scaffali e sposti più libri insieme.
- **Chiudere:** basta chiudere la finestra. Se riapri KoreShelf mentre è già aperto, torna in primo piano la finestra esistente.

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
- **Ricerca nel testo**: Utilizza la barra di ricerca integrata nel lettore (in alto a destra) per trovare istantaneamente una parola o una frase specifica all'interno del libro. I risultati verranno evidenziati nel testo.

### 📌 Bacheca Sottolineature (Palazzo della Memoria)

Le tue annotazioni meritano più di una semplice lista. KoreShelf presenta un'unica **Bacheca 3D delle Sottolineature** che appare sopra la tua libreria:

- **Post-it Visivi:** Ogni libro con highlight appare come un post-it su una bacheca virtuale in legno.
- **Navigazione Multi-pagina:** Sfoglia tutti i tuoi highlight con le frecce sinistra/destra, anche quando hai centinaia di note.
- **Sincronizzazione in Tempo Reale:** Gli highlight aggiunti nel lettore appaiono istantaneamente sulla bacheca senza ricaricare.
- **Gestione Rapida:** Clicca su qualsiasi post-it per visualizzare, modificare o eliminare highlight specifici.
- **Condivisione di citazioni sui social:** Condividi le tue citazioni preferite con un solo clic! KoreShelf genera automaticamente un'elegante immagine quadrata (1080x1080) con la tua citazione, la copertina del libro e i metadati, pronta per essere condivisa su Instagram, Facebook, X, WhatsApp o scaricata localmente.

### 📁 Gestione dei Dati (I tuoi libri)

La tua libreria sta in una cartella tutta sua, così puoi aggiornare o spostare KoreShelf senza perdere nulla:

- **Windows:** `%APPDATA%\KoreShelf` (incollalo nella barra degli indirizzi di Esplora file)
- **Mac:** `~/Library/Application Support/KoreShelf`
- **Linux:** `~/.local/share/KoreShelf`

Dentro trovi `ebooks/` (i tuoi libri), `covers/` (le copertine), `koreshelf.db` (il database SQLite con metadati, avanzamento della lettura, categorie e sottolineature) e `koreshelf.log` (utile se qualcosa non va).

**💾 Versione portatile (Windows, per esempio su una chiavetta USB):** crea una cartella chiamata `KoreShelf_Data` accanto a `KoreShelf.exe`: i dati verranno salvati lì.

**✏️ Metadati personalizzati:** con *Modifica Metadati* cambi titolo, autore, descrizione e categoria, o carichi una copertina tua. Il libro 3D si aggiorna subito.

**⬆️ Arrivi dalla versione 3.x (computer):**
- **Windows:** metti il nuovo `.exe` nella cartella che contiene la vecchia cartella `public` e aprilo: al primo avvio la libreria viene importata da sola.
- **Mac e Linux:** con KoreShelf chiuso, copia `koreshelf.db`, `covers` ed `ebooks` dalla vecchia cartella `public` nella cartella indicata sopra (sostituendo i file già presenti).

### 🛡️ Server a Prova di Proiettile

KoreShelf è progettato per gestire qualsiasi ebook tu gli lanci contro:

- **Supporto File Grandi:** Timeout dinamici e parsing ottimizzato permettono di processare EPUB e PDF con decine di migliaia di pagine senza bloccare il server.
- **Protezione dai Crash:** I file danneggiati o insoliti vengono gestiti uno per uno: un libro difettoso viene segnalato senza fermare l'app.
- **Estrazione Metadati Intelligente:** Rilevamento automatico dell'ISBN e fallback su Apple Books/Google Books per copertine e trame.
- **Rilevamento Duplicati:** Impedisce di caricare lo stesso libro due volte.

### 📱 Interfaccia Responsive

Per gestire al meglio il tuo spazio di lavoro, l'interfaccia si adatta automaticamente agli schermi o alle finestre più piccole. Il testo dei bottoni scompare lasciando spazio a icone pulite ed eleganti per evitare sovrapposizioni, garantendo un'esperienza fluida ovunque.

### 🌍 Multilingua (i18n)

KoreShelf è disponibile in italiano, inglese, spagnolo, francese e tedesco. Cambi lingua con il pulsante nella barra in alto (sul telefono: *Altro* → lingua); la scelta viene ricordata.

Vuoi aggiungere una lingua? I passaggi sono in [CONTRIBUTING.md](../CONTRIBUTING.md).

### 🆘 Risoluzione dei Problemi Frequenti

**"Windows ha protetto il PC" oppure "Apple non può verificare KoreShelf"**
È la conferma della prima apertura descritta sopra: su Windows premi **Ulteriori informazioni → Esegui comunque**, sul Mac usa **Impostazioni di Sistema → Privacy e sicurezza → Apri comunque**.

**Su Windows KoreShelf si apre nel browser invece che nella sua finestra**
La finestra usa Microsoft Edge WebView2, già presente in Windows 10 e 11. Se mancasse, KoreShelf si apre nel browser e spiega come installarlo.

**Qualcosa non funziona**
Apri `koreshelf.log` nella cartella dei dati (vedi *Gestione dei Dati*) e allegalo a una [segnalazione di bug](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### 🛠️ Compilare dal Codice Sorgente (Sviluppatori)

KoreShelf è scritto in Rust (server e finestra) con un'interfaccia Vite + Three.js; le app per telefono usano Tauri 2.

```bash
cargo build --release      # l'app per il computer, in target/release/
cargo test --no-default-features
```

Struttura del progetto, test end-to-end e creazione dei pacchetti sono spiegati in [CONTRIBUTING.md](../CONTRIBUTING.md).
