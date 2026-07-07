<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/QZPggpPRd)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   
   Read this in: [English](#english) | [Italiano](#italiano) | [Espanol](#spanish)

   ## Home
   <img align="center" width="800" height="500" alt="demo" src="https://github.com/user-attachments/assets/499a1809-144c-4bc4-b870-f23b3e076ab2" />
   
   
   ## Reader
   <img width="800" height="500" alt="demo-reader" src="https://github.com/user-attachments/assets/8fca0fcd-2a92-40d9-a1cc-f8a2d552e57a" />

</div>




<a name="english"></a>
## 🇬🇧 English

An interactive 3D digital library that allows you to upload, browse, and organize your EPUB and PDF files in an immersive graphical environment.

### ⚙️ System Requirements

To run this project, you do not need to configure servers or install Node.js! The requirements depend entirely on how you choose to run it:

- **Portable App (Recommended):** No external software required. Just download, extract, and run.
- **Docker Version:** You only need one free program: Docker, which will run the web application isolated and securely.

### 🚀 Installation Guide (Step-by-Step)

You have two ways to run KoreShelf.

#### Option 1: The Easy Way (Portable Desktop App - Recommended)

If you want to avoid installing Docker or Node.js, you can use our standalone executable available for Windows, Linux, and macOS (Apple Silicon).

1. Go to the [Releases section](https://github.com/GabrieleTrovato01/KoreShelf/releases) of this repository.
2. Download the `.zip` file for your Operating System.
3. Extract the contents to any folder on your PC.
   - **Windows:** Double-click `koreshelf-win.exe`.
   - **Linux:** Open the terminal in the folder and run `./koreshelf-linux`. (Note: you might need to make it executable first by running `chmod +x koreshelf-linux`).
   - **macOS (Apple Silicon / M1, M2, M3...):** Due to Apple's strict quarantine for unsigned apps, open your terminal in the extracted folder and run these two commands to grant permissions:
     ```bash
     chmod +x koreshelf-macos-arm
     xattr -cr koreshelf-macos-arm
     ```
     Then, simply double-click the file or run `./koreshelf-macos-arm`.

*(Note for Intel Mac users: Pre-built binaries are not available for older Intel Macs. Please use Option 2: Docker, or run the app from source).*

**Note on Security:** As this is an independent open-source project without a paid digital signature, SmartScreen or Gatekeeper may show a warning at the first launch. Simply choose "More info" and "Run anyway" to get started; the source code is fully transparent and available here.

#### Option 2: The Advanced Way (Docker - For Developers/Linux/macOS)

If you prefer to run the project via Docker or are on a non-Windows OS, follow these steps.

**Step 1: Install Docker**
- **Windows / macOS:** Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/). Start it and make sure Docker is running in the background.
- **Linux:** Open the terminal and install Docker Engine and the Compose plugin (e.g., on Ubuntu: `sudo apt install docker.io docker-compose-v2`).

**Step 2: Start the 3D Library**
1. Download this project to your PC (via `git clone` or by downloading the ZIP).
2. Open the terminal exactly inside the project folder (where the `docker-compose.yml` file is located).
3. Type this command and press Enter:
   ```bash
   docker compose up -d --build
   ```

### 🎮 How to Use the App

Once the terminal has finished loading, the library is ready!

Open your favorite browser (Chrome, Edge, Safari) and go to the address:

👉 **http://localhost:3000**

### 📖 Integrated EPUB & PDF Reader

KoreShelf is not just an archive, it's a fully-featured immersive reading environment:

- **Smart Dual-Engine Reader:** Open any EPUB (reflowable) or PDF (fixed-layout) directly in the browser. You can seamlessly switch between Paginated (Horizontal) and Continuous Scroll (Vertical) modes.
- **PDF Text Selection:** Thanks to the integrated TextLayer, PDF text becomes selectable and highlightable just like EPUBs.
- **Automatic PDF Covers:** PDFs without embedded covers get their cover automatically generated from the first page, directly in the browser (no external dependencies like ImageMagick needed).
- **Text Highlighting:** Select any text in your books to underline memorable phrases. Highlights are saved persistently and can be reviewed anytime.
- **Reader Customization:** Adjust font, text size, line height, and text alignment (left, center, right, justify) through the smart sidebar.
- **Dark/Light Mode:** Toggle between themes with one click to reduce eye strain.
- **Reading Progress:** A physical red ribbon bookmark moves along your 3D book on the shelf, showing your exact reading percentage at a glance.
- **Interactive Reviews:** When you finish a book (100%), a seamless modal prompts you to rate it (1-5 stars) and write your review. Your rating will be stamped in gold on the back cover of the 3D book!

### 📌 Highlights Board (Memory Palace)

Your annotations deserve more than a list. KoreShelf features a unique **3D Highlights Board** that appears above your library:

- **Visual Post-its:** Every book with highlights appears as a post-it note on a virtual wooden board.
- **Multi-page Navigation:** Browse through all your highlights with left/right arrows, even when you have hundreds of notes.
- **Real-time Sync:** Highlights added in the reader instantly appear on the board without reloading.
- **Quick Management:** Click any post-it to view, edit, or delete specific highlights.

### 📁 Data Management (Your Books)

The app is smart and syncs data with your computer. Inside the project folder, you will find these folders in the `public/` directory (created automatically on the first run):

- `ebooks/`: Your books (EPUBs/PDFs) are physically saved here.
- `covers/`: Extracted covers for 3D visualization are saved here.
- `koreshelf.db`: This is the robust SQLite database containing your library's metadata, reading progress, tags, and highlights.

**✏️ Custom Metadata (Hot-Swap):**
You are in full control of your data. Click the "Edit" button on any book to manually modify the title, author, description, or assign a custom category. You can even upload a high-definition custom cover. The SQLite database and the `covers/` folder are updated instantly, and the 3D model reflects the changes in real-time without reloading the page!

### 🛡️ Bulletproof Server

KoreShelf is designed to handle any ebook you throw at it:

- **Large Files Support:** Dynamic timeouts and optimized parsing allow processing of EPUBs and PDFs with tens of thousands of pages without blocking the server.
- **Crash Protection:** Global error catchers and monkey-patches for external libraries ensure the server stays running even with malformed files.
- **Smart Metadata Extraction:** Automatic ISBN detection and fallback to Apple Books/Google Books for covers and synopses.
- **Duplicate Detection:** Prevents uploading the same book twice.

### 📱 Responsive UI

To best manage your workspace, the interface automatically adapts to smaller screens and windows. Button text gracefully collapses into clean icons to prevent overlap, ensuring a seamless experience on any device or window size.

**Note:** These folders are protected and ignored by Git (thanks to `.gitignore`). You can add as many books as you want without risking accidentally uploading them online if you publish the code on GitHub!

### 🌍 Multilingual Support (i18n)

KoreShelf supports internationalization (i18n) using an asynchronous loading system to ensure optimal performance without startup lag. Currently, the application is available in **English** and **Italian**.

You can switch languages on the fly using the dedicated button in the top navigation bar. Your language preference is automatically saved in your browser via `localStorage`.

**Want to contribute a new language?**
Adding a new translation is incredibly easy:

1. Navigate to the `src/locales/` folder, duplicate the `en.js` file, and rename it with your language code (e.g., `es.js` for Spanish).
2. Translate the string values within the exported JavaScript object.
3. Update the `langBtn` logic in `src/main.js` to include your new language in the toggle cycle.

### 🆘 Troubleshooting

**Red error during installation: `CustomEvent is not defined`**
You are using an outdated version of Node.js in the Dockerfile. Make sure you are using the updated code, where the `Dockerfile` starts with `FROM node:22-bookworm-slim` to support Vite.

**Terminal error: `port is already allocated`**
You already have another program running that is using port 3000. Turn it off, or open the `docker-compose.yml` file and change the port from `"3000:3000"` to `"8080:3000"`, then access the app by going to `localhost:8080`.

**PDF covers not appearing?**
Covers are generated automatically from the first page of the PDF directly in the browser. If a PDF is particularly large or corrupted, the system will fall back to searching for a cover online via Apple Books.

<br>
<hr>
<br>

<a name="italiano"></a>
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

### 📌 Bacheca Sottolineature (Palazzo della Memoria)

Le tue annotazioni meritano più di una semplice lista. KoreShelf presenta un'unica **Bacheca 3D delle Sottolineature** che appare sopra la tua libreria:

- **Post-it Visivi:** Ogni libro con highlight appare come un post-it su una bacheca virtuale in legno.
- **Navigazione Multi-pagina:** Sfoglia tutti i tuoi highlight con le frecce sinistra/destra, anche quando hai centinaia di note.
- **Sincronizzazione in Tempo Reale:** Gli highlight aggiunti nel lettore appaiono istantaneamente sulla bacheca senza ricaricare.
- **Gestione Rapida:** Clicca su qualsiasi post-it per visualizzare, modificare o eliminare highlight specifici.

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

KoreShelf supporta l'internazionalizzazione (i18n) con un sistema di caricamento asincrono per garantire prestazioni ottimali. Attualmente, l'applicazione è disponibile in **Inglese** e **Italiano**.

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

<a name="spanish"></a>

## 🇪🇸 Español

Una biblioteca digital interactiva en 3D que te permite subir, explorar y organizar tus archivos EPUB y PDF en un entorno gráfico inmersivo.

### ⚙️ Requisitos del Sistema

¡Para ejecutar este proyecto no necesitas configurar servidores ni instalar Node.js! Los requisitos dependen exclusivamente de cómo decidas ejecutarlo:

* **App Portátil (Recomendada):** No se requiere software externo. Solo descarga, extrae y ejecuta.
* **Versión Docker:** Solo necesitas un programa gratuito: Docker, que ejecutará la aplicación web de forma aislada y segura.

### 🚀 Guía de Instalación (Paso a Paso)

Tienes dos formas de ejecutar KoreShelf.

#### Opción 1: La forma más fácil (App Portátil de Escritorio - Recomendada)

Si quieres evitar instalar Docker o Node.js, puedes usar nuestro ejecutable independiente disponible para Windows, Linux y macOS (Apple Silicon).

1. Ve a la sección [Releases](https://github.com/GabrieleTrovato01/KoreShelf/releases) de este repositorio.
2. Descarga el archivo `.zip` correspondiente a tu Sistema Operativo.
3. Extrae el contenido en cualquier carpeta de tu PC.
* **Windows:** Haz doble clic en `koreshelf-win.exe`.
* **Linux:** Abre la terminal en la carpeta y ejecuta `./koreshelf-linux`. (Nota: es posible que debas otorgar permisos de ejecución primero con `chmod +x koreshelf-linux`).
* **macOS (Apple Silicon / M1, M2, M3...):** Debido a la estricta cuarentena de Apple para aplicaciones no firmadas, abre tu terminal en la carpeta extraída y ejecuta estos dos comandos para otorgar permisos:
```bash
chmod +x koreshelf-macos-arm
xattr -cr koreshelf-macos-arm

```


Luego, simplemente haz doble clic en el archivo o ejecuta `./koreshelf-macos-arm`.



*(Nota para usuarios de Mac Intel: Los binarios precompilados no están disponibles para Macs Intel más antiguos. Por favor, usa la Opción 2: Docker, o ejecuta la aplicación desde el código fuente).*

**Nota sobre Seguridad:** Al ser un proyecto independiente de código abierto sin una firma digital de pago, SmartScreen de Windows o Gatekeeper de Apple pueden mostrar una advertencia en el primer inicio. Simplemente elige "Más información" y "Ejecutar de todas formas"; el código fuente es completamente transparente y está disponible aquí.

#### Opción 2: La forma avanzada (Docker - Para Desarrolladores/Linux/macOS)

Si prefieres ejecutar el proyecto a través de Docker o estás en un sistema operativo distinto a Windows, sigue estos pasos.

**Paso 1: Instalar Docker**

* **Windows / macOS:** Descarga e instala [Docker Desktop](https://www.docker.com/products/docker-desktop/). Inícialo y asegúrate de que Docker se esté ejecutando en segundo plano.
* **Linux:** Abre la terminal e instala Docker Engine y el plugin Compose (ej. en Ubuntu: `sudo apt install docker.io docker-compose-v2`).

**Paso 2: Iniciar la Biblioteca 3D**

1. Descarga este proyecto en tu PC (vía `git clone` o descargando el ZIP).
2. Abre la terminal exactamente dentro de la carpeta del proyecto (donde se encuentra el archivo `docker-compose.yml`).
3. Escribe este comando y presiona Enter:
```bash
docker compose up -d --build

```



### 🎮 Cómo usar la App

Una vez que la terminal haya terminado de cargar, ¡la biblioteca está lista!

Abre tu navegador favorito (Chrome, Edge, Safari) y ve a la dirección:

👉 **http://localhost:3000**

### 📖 Lector EPUB y PDF Integrado

KoreShelf no es solo un archivo, es un entorno de lectura inmersivo y completo:

* **Lector Inteligente Dual-Engine:** Abre cualquier EPUB (formato fluido) o PDF (formato fijo) directamente en el navegador. Puedes cambiar sin problemas entre el modo de Páginas (Horizontal) y el Desplazamiento Continuo (Vertical).
* **Selección de Texto en PDF:** Gracias al TextLayer integrado, el texto de los PDF se puede seleccionar y subrayar al igual que en los EPUB.
* **Portadas Automáticas para PDF:** Los PDF sin portadas incrustadas obtienen su portada generada automáticamente desde la primera página, directamente en el navegador (no se necesitan dependencias externas como ImageMagick).
* **Subrayado de Texto:** Selecciona cualquier texto en tus libros para subrayar frases memorables. Los subrayados se guardan de forma persistente y pueden revisarse en cualquier momento.
* **Personalización del Lector:** Ajusta la fuente, el tamaño del texto, el interlineado y la alineación del texto (izquierda, centro, derecha, justificado) a través de la barra lateral inteligente.
* **Modo Oscuro/Claro:** Alterna entre temas con un solo clic para reducir la fatiga visual.
* **Progreso de Lectura:** Un marcador de cinta roja física se mueve a lo largo de tu libro 3D en la estantería, mostrando tu porcentaje exacto de lectura de un vistazo.
* **Reseñas Interactivas:** Cuando terminas un libro (100%), un elegante modal te invita a calificarlo (1-5 estrellas) y escribir tu reseña. ¡Tu calificación se imprimirá en oro en la contraportada del libro 3D!

### 📌 Pizarra de Subrayados (Palacio de la Memoria)

Tus anotaciones merecen más que una simple lista. KoreShelf cuenta con una **Pizarra 3D de Subrayados** única que aparece sobre tu biblioteca:

* **Post-its Visuales:** Cada libro con subrayados aparece como un post-it en una pizarra virtual de madera.
* **Navegación Multi-página:** Navega por todos tus subrayados con las flechas izquierda/derecha, incluso cuando tienes cientos de notas.
* **Sincronización en Tiempo Real:** Los subrayados agregados en el lector aparecen instantáneamente en la pizarra sin necesidad de recargar.
* **Gestión Rápida:** Haz clic en cualquier post-it para ver, editar o eliminar subrayados específicos.

### 📁 Gestión de Datos (Tus Libros)

La aplicación es inteligente y sincroniza los datos con tu computadora. Dentro de la carpeta del proyecto, encontrarás estas carpetas en el directorio `public/` (creadas automáticamente en el primer inicio):

* `ebooks/`: Tus libros (EPUBs/PDFs) se guardan físicamente aquí.
* `covers/`: Las portadas extraídas para la visualización 3D se guardan aquí.
* `koreshelf.db`: Esta es la robusta base de datos SQLite que contiene los metadatos, progreso de lectura, etiquetas y subrayados de tu biblioteca.

**✏️ Metadatos Personalizados (Hot-Swap):**
Tienes el control total de tus datos. Haz clic en el botón "Modifica" en cualquier libro para modificar manualmente el título, autor, descripción o asignar una categoría personalizada. También puedes subir una portada personalizada de alta definición. La base de datos SQLite y la carpeta `covers/` se actualizan al instante, y el modelo 3D refleja los cambios en tiempo real sin recargar la página.

### 🛡️ Servidor a Prueba de Fallos

KoreShelf está diseñado para manejar cualquier ebook que le lances:

* **Soporte para Archivos Grandes:** Tiempos de espera dinámicos y análisis optimizado permiten procesar EPUBs y PDFs con decenas de miles de páginas sin bloquear el servidor.
* **Protección contra Caídas:** Capturadores de errores globales y "monkey-patches" para bibliotecas externas aseguran que el servidor siga funcionando incluso con archivos malformados.
* **Extracción Inteligente de Metadatos:** Detección automática de ISBN y respaldo en Apple Books/Google Books para portadas y sinopsis.
* **Detección de Duplicados:** Evita subir el mismo libro dos veces.

### 📱 Interfaz de Usuario Responsiva

Para gestionar mejor tu espacio de trabajo, la interfaz se adapta automáticamente a pantallas o ventanas más pequeñas. El texto de los botones desaparece elegantemente dejando íconos limpios para evitar superposiciones, asegurando una experiencia fluida en cualquier dispositivo.

**Nota:** Estas carpetas están protegidas e ignoradas por Git (gracias a `.gitignore`). Puedes agregar tantos libros como quieras sin riesgo de subirlos accidentalmente a internet si publicas el código en GitHub.

### 🌍 Soporte Multilingüe (i18n)

KoreShelf soporta internacionalización (i18n) utilizando un sistema de carga asíncrona para garantizar un rendimiento óptimo sin retrasos en el inicio. Actualmente, la aplicación está disponible en **Inglés**, **Italiano** y **Español**.

Puedes cambiar de idioma sobre la marcha utilizando el botón dedicado en la barra de navegación superior. Tu preferencia de idioma se guarda automáticamente en tu navegador a través de `localStorage`.

**¿Quieres contribuir con un nuevo idioma?**
Agregar una nueva traducción es increíblemente fácil:

1. Ve a la carpeta `src/locales/`, duplica el archivo `en.js` y renómbralo con el código de tu idioma (ej., `es.js` para español).
2. Traduce las cadenas de texto dentro del objeto JavaScript exportado.
3. Actualiza la lógica del botón `langBtn` en el archivo `src/main.js` para incluir tu nuevo idioma en el ciclo de selección.

### 🆘 Solución de Problemas Frecuentes

**Error en rojo durante la instalación: `CustomEvent is not defined**`
Estás usando una versión de Node.js demasiado antigua en el Dockerfile. Asegúrate de usar el código actualizado, donde el `Dockerfile` comienza con `FROM node:22-bookworm-slim` para soportar Vite.

**Error en la terminal: `port is already allocated**`
Ya tienes otro programa en ejecución que está usando el puerto 3000. Apágalo, o abre el archivo `docker-compose.yml` y cambia el puerto de `"3000:3000"` a `"8080:3000"`, luego accede a la aplicación yendo a `localhost:8080`.

**¿Las portadas de PDF no aparecen?**
Las portadas se generan automáticamente desde la primera página del PDF directamente en el navegador. Si un PDF es particularmente grande o está dañado, el sistema buscará una portada en línea a través de Apple Books como alternativa.
