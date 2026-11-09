
<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   🌍 **Read this in:** [🇬🇧 English](README.md) | [🇮🇹 Italiano](docs/README.it.md) | [🇪🇸 Español](docs/README.es.md) | [🇫🇷 Français](docs/README.fr.md) | [🇩🇪 Deutsch](docs/README.de.md)

   ## Home
   <img align="center" width="858" height="720" alt="demo_home_rust" src="https://github.com/user-attachments/assets/c879b004-f214-4541-ad72-9b1071e3fa2d" />

   
   ## Reader
  <img width="858" height="720" alt="demo_reader_rust" src="https://github.com/user-attachments/assets/edd3273e-25ff-457c-9f31-6f3cf9b871fc" />


</div>


An interactive 3D digital library that allows you to upload, browse, and organize your EPUB and PDF files in an immersive graphical environment.

### ⚙️ System Requirements

Since version 4.0.0 KoreShelf is **a single file**: no Node.js, nothing else to install. For a home server there is also a Docker image (see below).

- **Windows:** Windows 10 or 11.
- **Mac:** Apple silicon and Intel (one universal file).
- **Linux:** any recent 64-bit (x86_64) distribution.
- **Android:** any Android phone or tablet.
- **iPhone / iPad:** for advanced users only (see below).

### 🚀 Download & Installation

The easiest way is the website **[koreshelf.github.io](https://koreshelf.github.io)**: it recognizes your device and offers the right file.
You can also pick the file yourself from the [latest release](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest):

| Device | File |
|---|---|
| Windows | `KoreShelf-<version>-windows-x64.exe` |
| Mac | `KoreShelf-<version>-macos-universal.dmg` |
| Linux | `KoreShelf-<version>-x86_64.AppImage` |
| Android | `KoreShelf-<version>-android.apk` |
| iPhone / iPad | `KoreShelf-<version>-ios-unsigned.ipa` |

KoreShelf is free and has no paid certificate, so **the first time** your system asks for confirmation. That's normal and only happens once.

#### 🪟 Windows
1. Download the `.exe` file and double-click it: KoreShelf opens in its own window, there's nothing to install.
2. If Windows shows "Windows protected your PC", click **More info → Run anyway**.

#### 🍎 Mac
1. Download the `.dmg` file, open it and drag **KoreShelf** into **Applications**.
2. The first time macOS blocks the app: open **System Settings → Privacy & Security**, scroll down and click **Open Anyway**.

#### 🐧 Linux
1. Download the `.AppImage` file.
2. Make it executable: right-click → **Properties → Allow executing file as program** (or `chmod +x KoreShelf-*.AppImage` in a terminal).
3. Double-click it.

#### 🤖 Android
1. Download the `.apk` file on your phone, open it and tap **Install**.
2. If asked, allow your browser to install unknown apps.
3. Coming from version 3.x? The new app installs next to the old one: add your books again, then you can uninstall the old app.

#### 📱 iPhone and iPad (advanced users)
Apple only allows apps from outside the App Store through dedicated tools, so the `.ipa` file is not signed.
1. On a computer, install a sideloading tool such as AltStore, SideStore or Sideloadly and sign in with your Apple ID.
2. Download the `.ipa` file and install it on your iPhone or iPad with that tool.
3. On the device, trust the developer in **Settings → General → VPN & Device Management**. From iOS 16 you also need to turn on **Developer Mode** (**Settings → Privacy & Security**).

With a free Apple ID the app must be refreshed every 7 days (AltStore does it for you).

### 🐳 Self-hosting with Docker (home server, NAS, Raspberry Pi)

Keep KoreShelf running on a home server and open it from the browser of any device on your network. The image works on PCs (amd64) and on ARM boards such as the Raspberry Pi 4/5 and most NAS (arm64).

1. Install Docker (Docker Desktop on Windows and Mac, or Docker Engine with the Compose plugin on Linux).
2. Create a folder, put this project's [`docker-compose.yml`](docker-compose.yml) in it and run:
   ```bash
   docker compose up -d
   ```
3. Open `http://SERVER-ADDRESS:3000` (on the same computer: `http://localhost:3000`).

Without the compose file:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

- **Your data** (books, covers, database) lives in the `koreshelf-data` volume, mounted at `/data`, and survives updates. Backup: `docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .`
- **Update:** `docker compose pull && docker compose up -d`
- **Password (optional):** set `KORESHELF_PASSWORD` (and, if you like, `KORESHELF_USERNAME`, default `koreshelf`) in `docker-compose.yml`: the browser will ask for them.
- **Coming from the 3.x Docker version?** In `docker-compose.yml` remove the `#` in front of the line `- ./public:/app/public:ro` (run it from the folder of your old setup): on first start your library is imported into `/data`.
- **Port 3000 already in use on the server?** Change the number on the left: `"8080:3000"`, then open `http://SERVER-ADDRESS:8080`.
- **Settings:** `KORESHELF_PORT` (default 3000), `KORESHELF_HOST` (default `0.0.0.0`), `KORESHELF_DATA` (default `/data`).

> [!WARNING]
> KoreShelf is meant for your home network. Do not expose it directly to the internet: to reach it from outside, put it behind a reverse proxy with **HTTPS** (for example Caddy, Nginx Proxy Manager or Traefik) or use a VPN such as Tailscale, and set a password. Without HTTPS the password travels in clear text.

Even without Docker, the KoreShelf program itself can run as a server: `koreshelf --server` (same settings).

### 🎮 How to Use the App

Open KoreShelf and your 3D shelf appears.

- **First time?** Press *Try a sample book*: a short book lands on the shelf and teaches you the app while you read it.
- **Add books:** press *+ Upload Ebook* or drag EPUB and PDF files onto the window.
- **Read:** *Start reading* (or *Continue reading*) under the book in the middle. Less frequent actions are in the *More* menu.
- **Organize:** *Manage* lets you rename, create or delete shelves and move many books at once.
- **Close:** just close the window. Opening KoreShelf again while it's running brings the existing window to the front.

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

Your library lives in a folder of its own, so you can update or move KoreShelf without losing anything:

- **Windows:** `%APPDATA%\KoreShelf` (paste it into the File Explorer address bar)
- **Mac:** `~/Library/Application Support/KoreShelf`
- **Linux:** `~/.local/share/KoreShelf`

Inside you'll find `ebooks/` (your books), `covers/` (the covers), `koreshelf.db` (the SQLite database with metadata, reading progress, categories and highlights) and `koreshelf.log` (useful if something goes wrong).

**💾 Portable mode (Windows, e.g. on a USB stick):** create a folder named `KoreShelf_Data` next to `KoreShelf.exe`: your data will be saved there.

**✏️ Custom metadata:** with *Edit Metadata* you can change title, author, description and category, or upload your own cover. The 3D book updates immediately.

**⬆️ Coming from version 3.x (computer):**
- **Windows:** put the new `.exe` in the folder that contains the old `public` folder and open it: your library is imported automatically on the first launch.
- **Mac and Linux:** with KoreShelf closed, copy `koreshelf.db`, `covers` and `ebooks` from the old `public` folder into the folder listed above (replacing the files already there).

### 🛡️ Bulletproof Server

KoreShelf is designed to handle any ebook you throw at it:

- **Large Files Support:** Dynamic timeouts and optimized parsing allow processing of EPUBs and PDFs with tens of thousands of pages without blocking the server.
- **Crash Protection:** Damaged or unusual files are handled one by one: a bad book is reported without stopping the app.
- **Smart Metadata Extraction:** Automatic ISBN detection and fallback to Apple Books/Google Books for covers and synopses.
- **Duplicate Detection:** Prevents uploading the same book twice.

### 📱 Responsive UI

To best manage your workspace, the interface automatically adapts to smaller screens and windows. Button text gracefully collapses into clean icons to prevent overlap, ensuring a seamless experience on any device or window size.

### 🌍 Multilingual Support (i18n)

KoreShelf is available in English, Italian, Spanish, French and German. Change language with the button in the top bar (on phones: *More* → language); your choice is remembered.

Want to add a new language? The steps are in [CONTRIBUTING.md](CONTRIBUTING.md).

### 🆘 Troubleshooting

**"Windows protected your PC" or "Apple could not verify KoreShelf"**
This is the first-launch confirmation described above: on Windows click **More info → Run anyway**, on Mac use **System Settings → Privacy & Security → Open Anyway**.

**On Windows KoreShelf opens in the browser instead of its own window**
Its window uses Microsoft Edge WebView2, which is part of Windows 10 and 11. If it's missing, KoreShelf opens in the browser and explains how to install it.

**Something doesn't work**
Open `koreshelf.log` in the data folder (see *Data Management*) and attach it to a [bug report](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### 🛠️ Build from Source (Developers)

KoreShelf is written in Rust (server and window) with a Vite + Three.js interface; the phone apps use Tauri 2.

```bash
cargo build --release      # the app for your computer, in target/release/
cargo test --no-default-features
```

Project structure, end-to-end tests and packaging are explained in [CONTRIBUTING.md](CONTRIBUTING.md).
