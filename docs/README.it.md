<div align="center">
   
   # KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   **Read this in:** [English](../README.md) | [Italiano](README.it.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

   ## Home
   <img align="center" width="858" height="720" alt="La schermata principale di KoreShelf con lo scaffale 3D" src="https://github.com/user-attachments/assets/c879b004-f214-4541-ad72-9b1071e3fa2d" />
   
   
   ## Reader
  <img align="center" width="858" height="720" alt="Il lettore di KoreShelf" src="https://github.com/user-attachments/assets/edd3273e-25ff-457c-9f31-6f3cf9b871fc" />

</div>

## Italiano

KoreShelf è una libreria 3D per i tuoi ebook. Carichi file EPUB e PDF, li ritrovi come libri su uno scaffale e li leggi nel lettore integrato. Funziona su Windows, Mac, Linux e Android, e puoi anche ospitarlo tu con Docker.

### Requisiti di sistema

Dalla versione 4.0.0 KoreShelf è un unico file. Non servono Node.js né altri programmi. Per usarlo su un server di casa c'è anche l'immagine Docker (vedi sotto).

- Windows 10 o 11
- Mac con chip Apple o Intel (un solo file universale)
- Linux: qualsiasi distribuzione recente a 64 bit (x86_64)
- Telefoni e tablet Android
- iPhone e iPad: si può, ma solo per utenti esperti (vedi sotto)

### Download e installazione

Il modo più semplice è [koreshelf.github.io](https://koreshelf.github.io): il sito riconosce il tuo dispositivo e ti propone il file giusto. Puoi anche scegliere il file da solo nell'[ultima release](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest):

| Dispositivo | File |
|---|---|
| Windows | `KoreShelf-<versione>-windows-x64.exe` |
| Mac | `KoreShelf-<versione>-macos-universal.dmg` |
| Linux | `KoreShelf-<versione>-x86_64.AppImage` |
| Android | `KoreShelf-<versione>-android.apk` |
| iPhone / iPad | `KoreShelf-<versione>-ios-unsigned.ipa` |

KoreShelf non ha un certificato di firma a pagamento, quindi la prima volta che lo apri il sistema ti chiede una conferma. Succede una volta sola.

#### Windows
1. Scarica il file `.exe` e fai doppio clic. KoreShelf si apre nella sua finestra: non c'è niente da installare.
2. Se Windows mostra "Windows ha protetto il PC", fai clic su **Ulteriori informazioni** e poi su **Esegui comunque**.

#### Mac
1. Scarica il file `.dmg`, aprilo e trascina KoreShelf in Applicazioni.
2. La prima volta macOS blocca l'app. Vai in **Impostazioni di Sistema → Privacy e sicurezza**, scorri in basso e fai clic su **Apri comunque**.

#### Linux
1. Scarica il file `.AppImage`.
2. Rendilo eseguibile: clic destro, **Proprietà → Consenti l'esecuzione come programma**, oppure `chmod +x KoreShelf-*.AppImage` da terminale.
3. Fai doppio clic sul file.

#### Android
1. Scarica il file `.apk` sul telefono, aprilo e tocca **Installa**.
2. Se richiesto, consenti al browser di installare app sconosciute.
3. Se usavi la versione 3.x: la nuova app si installa accanto a quella vecchia. Aggiungi di nuovo i tuoi libri, poi puoi disinstallare la vecchia.

#### iPhone e iPad
Apple permette di installare app fuori dall'App Store solo con strumenti appositi, per questo il file `.ipa` non è firmato.
1. Su un computer installa uno strumento di sideloading come AltStore, SideStore o Sideloadly e accedi con il tuo Apple ID.
2. Scarica il file `.ipa` e installalo sul dispositivo con quello strumento.
3. Sul dispositivo autorizza lo sviluppatore in **Impostazioni → Generali → VPN e gestione dispositivi**. Da iOS 16 devi anche attivare la **Modalità sviluppatore** in **Impostazioni → Privacy e sicurezza**.

Con un Apple ID gratuito l'app va rinnovata ogni 7 giorni. AltStore può farlo al posto tuo.

### Self-hosting con Docker

Puoi tenere KoreShelf acceso su un server di casa, un NAS o un Raspberry Pi e aprirlo dal browser di qualsiasi dispositivo della tua rete. L'immagine è pronta per i PC (amd64) e per le schede ARM come Raspberry Pi 4/5 e la maggior parte dei NAS (arm64).

1. Installa Docker: Docker Desktop su Windows e Mac, oppure Docker Engine con il plugin Compose su Linux.
2. Crea una cartella, copiaci il file [`docker-compose.yml`](../docker-compose.yml) di questo progetto e lancia:
   ```bash
   docker compose up -d
   ```
3. Apri `http://INDIRIZZO-DEL-SERVER:3000`, oppure `http://localhost:3000` sullo stesso computer.

Senza il file compose:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

Libri, copertine e database stanno nel volume `koreshelf-data`, montato su `/data`, e restano quando aggiorni. Per fare un backup:
```bash
docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .
```

Per aggiornare: `docker compose pull && docker compose up -d`

Altre opzioni:
- Password: imposta `KORESHELF_PASSWORD` in `docker-compose.yml` e, se vuoi, `KORESHELF_USERNAME` (predefinito `koreshelf`). Il browser li chiederà entrambi.
- Arrivi dalla versione Docker 3.x: in `docker-compose.yml` togli il `#` davanti a `- ./public:/app/public:ro` e avvialo dalla cartella della vecchia installazione. Al primo avvio la libreria viene importata in `/data`.
- Se sul server la porta 3000 è già occupata, cambia il numero a sinistra, per esempio `"8080:3000"`, e apri la porta 8080.
- Variabili d'ambiente: `KORESHELF_PORT` (predefinita 3000), `KORESHELF_HOST` (predefinito `0.0.0.0`), `KORESHELF_DATA` (predefinita `/data`).

> [!WARNING]
> KoreShelf è pensato per la rete di casa. Non esporlo direttamente su internet. Se ti serve raggiungerlo da fuori, mettilo dietro un reverse proxy con HTTPS (per esempio Caddy, Nginx Proxy Manager o Traefik) oppure usa una VPN come Tailscale, e imposta una password. Senza HTTPS la password viaggia in chiaro.

Il server funziona anche senza Docker: `koreshelf --server` usa le stesse impostazioni.

### Come si usa

Quando apri KoreShelf vedi il tuo scaffale.

- La prima volta premi *Prova con un libro di esempio*. Sullo scaffale arriva un libro breve che ti spiega l'app mentre lo leggi.
- Per aggiungere libri premi *+ Carica Ebook* oppure trascina file EPUB e PDF sulla finestra.
- Per leggere premi *Inizia a leggere* (o *Riprendi a leggere*) sotto il libro al centro. Le azioni meno frequenti sono nel menu *Altro*.
- *Gestisci* ti permette di creare, rinominare ed eliminare scaffali e di spostare più libri insieme.
- Per uscire chiudi la finestra. Se apri KoreShelf quando è già aperto, torna in primo piano la finestra esistente.

### Il lettore

- Apre EPUB (testo che si adatta allo schermo) e PDF (impaginazione fissa). Puoi leggere a pagine o con lo scorrimento continuo.
- Il testo dei PDF si può selezionare e sottolineare come negli EPUB.
- I PDF senza copertina ne ricevono una ricavata dalla prima pagina.
- Seleziona una frase per sottolinearla. Le sottolineature vengono salvate e le ritrovi nella bacheca.
- Carattere, dimensione del testo, interlinea e allineamento (sinistra, centro, destra, giustificato) si cambiano dal pannello laterale.
- C'è un tema chiaro e uno scuro.
- Il punto in cui sei arrivato si vede come un nastro rosso sul libro 3D, alla percentuale esatta.
- Quando finisci un libro puoi dargli da 1 a 5 stelle e scrivere una breve recensione. Il voto viene stampato in oro sul retro della copertina.
- L'indice funziona con EPUB e PDF strutturati. Per i PDF scansionati che non ne hanno uno c'è un selettore di pagina.
- Il campo di ricerca in alto a destra trova parole e frasi nel libro e le evidenzia nel testo.

### La bacheca delle sottolineature

Sopra gli scaffali c'è una bacheca di legno. Ogni libro con delle sottolineature ha il suo post-it.

- Con le frecce sinistra e destra passi da una pagina di post-it all'altra, anche quando sono centinaia.
- Le nuove sottolineature compaiono sulla bacheca subito, senza ricaricare.
- Fai clic su un post-it per leggere, modificare o eliminare le sue sottolineature.
- Ogni citazione si può condividere come immagine 1080×1080 con la copertina e i dati del libro, pronta per Instagram, Facebook, X o WhatsApp, oppure salvare sul dispositivo.

### I tuoi dati

La libreria sta in una cartella tutta sua, quindi puoi aggiornare o spostare KoreShelf senza perdere niente:

- Windows: `%APPDATA%\KoreShelf` (incollalo nella barra degli indirizzi di Esplora file)
- Mac: `~/Library/Application Support/KoreShelf`
- Linux: `~/.local/share/KoreShelf`

Dentro trovi `ebooks/` (i tuoi libri), `covers/` (le copertine), `koreshelf.db` (il database SQLite con metadati, avanzamento della lettura, categorie e sottolineature) e `koreshelf.log` (utile se qualcosa non va).

Modalità portatile su Windows, per esempio su una chiavetta USB: crea una cartella chiamata `KoreShelf_Data` accanto a `KoreShelf.exe` e i dati verranno salvati lì.

Con *Modifica Metadati* puoi cambiare titolo, autore, descrizione e categoria, oppure caricare una copertina tua. Il libro 3D si aggiorna subito.

Se arrivi dalla versione 3.x sul computer:
- Windows: metti il nuovo `.exe` nella cartella che contiene la vecchia cartella `public` e aprilo. La libreria viene importata al primo avvio.
- Mac e Linux: con KoreShelf chiuso, copia `koreshelf.db`, `covers` ed `ebooks` dalla vecchia cartella `public` nella cartella indicata sopra, sostituendo i file già presenti.

### File grandi o danneggiati

- EPUB e PDF con decine di migliaia di pagine vengono elaborati senza bloccare l'app.
- Un file danneggiato o insolito viene segnalato da solo; il resto della libreria continua a funzionare.
- Se trova l'ISBN, KoreShelf cerca copertina e trama su Apple Books e Google Books.
- Lo stesso libro non si può caricare due volte.

### Schermi piccoli

Nelle finestre strette le scritte dei pulsanti diventano icone, così niente si sovrappone. Sul telefono l'interfaccia passa a un layout pensato per le dita.

### Lingue

KoreShelf è disponibile in inglese, italiano, spagnolo, francese e tedesco. Puoi cambiare lingua dalla barra in alto (sul telefono: *Altro*, poi lingua) e la scelta viene ricordata.

Per aggiungere una lingua, vedi [CONTRIBUTING.md](../CONTRIBUTING.md).

### Risoluzione dei problemi

**"Windows ha protetto il PC" oppure "Apple non può verificare KoreShelf"**
È la conferma del primo avvio descritta sopra. Su Windows fai clic su **Ulteriori informazioni → Esegui comunque**; sul Mac vai in **Impostazioni di Sistema → Privacy e sicurezza → Apri comunque**.

**Su Windows KoreShelf si apre nel browser invece che nella sua finestra**
La finestra usa Microsoft Edge WebView2, che fa parte di Windows 10 e 11. Se manca, KoreShelf si apre nel browser e spiega come installarlo.

**Qualcos'altro non funziona**
Apri `koreshelf.log` nella cartella dei dati (vedi *I tuoi dati*) e allegalo a una [segnalazione](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### Compilare dal codice sorgente

KoreShelf è scritto in Rust (server e finestra desktop) con un'interfaccia in Vite e Three.js. Le app per telefono usano Tauri 2.

```bash
cargo build --release      # l'app per il computer, in target/release/
cargo test --no-default-features
```

Struttura del progetto, test end-to-end e creazione dei pacchetti sono spiegati in [CONTRIBUTING.md](../CONTRIBUTING.md).
