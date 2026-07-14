<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   
   🌍 **Read this in:** [🇬🇧 English](README.md) | [🇮🇹 Italiano](docs/README.it.md) | [🇪🇸 Español](docs/README.es.md) | [🇫🇷 Français](docs/README.fr.md) | [🇩🇪 Deutsch](docs/README.de.md)

   ## Home
   <img align="center" width="800" height="500" alt="demo" src="https://github.com/user-attachments/assets/499a1809-144c-4bc4-b870-f23b3e076ab2" />
   
   
   ## Reader
   <img width="800" height="500" alt="demo-reader" src="https://github.com/user-attachments/assets/8fca0fcd-2a92-40d9-a1cc-f8a2d552e57a" />

</div>


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
   - **Windows:** Double-click `koreshelf-win.exe`. [Tutorial]( https://github.com/user-attachments/assets/59e2e58f-88b6-419f-b4af-7fb12be551fa)
     

   - **Linux:** Open the terminal in the folder and run `./koreshelf-linux`. (Note: you might need to make it executable first by running `chmod +x koreshelf-linux`).
   - **macOS (Apple Silicon / M1, M2, M3...):** Due to macOS security restrictions (Gatekeeper) on software downloaded via a browser, it is recommended to install KoreShelf directly from the terminal. This procedure prevents automatic system blocks from being applied and ensures a clean startup.
   Open the Terminal and run the following commands:
   ```bash
      # 1. Create a dedicated folder and navigate into it
      mkdir KoreShelf
      cd KoreShelf

      # 2. Download and extract the latest release
      curl -L -o KoreShelf-macOS.zip "https://github.com/gabrieletrovato01/koreshelf/releases/download/v2.2.3/KoreShelf-macOS-AppleSilicon.zip" && unzip KoreShelf-macOS.zip

      # 3. Remove the compressed archive (optional, for cleanup)
      rm KoreShelf-macOS.zip
   ```
   Once done, simply double-click the file or run `./koreshelf-macos-arm`.

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
- **Smart Table of Contents:** Navigate effortlessly through long texts with the new TOC button. It perfectly supports structured EPUBs and PDFs, and provides a smart fallback with a quick page-jump selector for scanned PDFs without internal navigation.
- **Search within text**: Use the search bar in the top-right corner of the reader to find specific words or phrases. Results will be highlighted directly in the text.

### 📌 Highlights Board (Memory Palace)

Your annotations deserve more than a list. KoreShelf features a unique **3D Highlights Board** that appears above your library:

- **Visual Post-its:** Every book with highlights appears as a post-it note on a virtual wooden board.
- **Multi-page Navigation:** Browse through all your highlights with left/right arrows, even when you have hundreds of notes.
- **Real-time Sync:** Highlights added in the reader instantly appear on the board without reloading.
- **Quick Management:** Click any post-it to view, edit, or delete specific highlights.
- **Social Quote Sharing:** Share your favorite quotes with a single click! KoreShelf automatically generates an elegant square image (1080x1080) with your quote, the book cover, and metadata, ready to be shared on Instagram, Facebook, X, WhatsApp, or downloaded locally.

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

KoreShelf supports internationalization (i18n) using an asynchronous loading system to ensure optimal performance without startup lag. Currently, the application is available in other languages:
- [Italiano](docs/README.it.md)
- [Español](docs/README.es.md)
- [Français](docs/README.fr.md)
- [Deutsch](docs/README.de.md)

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
