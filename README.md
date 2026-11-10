
<div align="center">
   
   # KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   **Read this in:** [English](README.md) | [Italiano](docs/README.it.md) | [Español](docs/README.es.md) | [Français](docs/README.fr.md) | [Deutsch](docs/README.de.md)

   ## Home
   <img align="center" width="858" height="720" alt="KoreShelf home screen with the 3D shelf" src="https://github.com/user-attachments/assets/c879b004-f214-4541-ad72-9b1071e3fa2d" />
   
   
   ## Reader
  <img align="center" width="858" height="720" alt="KoreShelf reader" src="https://github.com/user-attachments/assets/edd3273e-25ff-457c-9f31-6f3cf9b871fc" />

</div>


KoreShelf is a 3D library for your ebooks. You upload EPUB, PDF, FB2, TXT, Markdown and CBZ comic files, they show up as books on a shelf, and you read them in the built-in reader. It runs on Windows, Mac, Linux and Android, and you can also host it yourself with Docker.

### System requirements

Since version 4.0.0 KoreShelf is a single file. You don't need Node.js or anything else. To run it on a home server there is also a Docker image (see below).

- Windows 10 or 11
- Mac with Apple silicon or Intel (one universal file)
- Linux: any recent 64-bit distribution, on PCs (x86_64) and on ARM computers (aarch64) such as the Raspberry Pi 4 and 5
- Android phones and tablets
- iPhone and iPad: possible, but only for advanced users (see below)

### Download and installation

The simplest way is [koreshelf.github.io](https://koreshelf.github.io): the site detects your device and offers the right file. You can also pick the file yourself from the [latest release](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest):

| Device | File |
|---|---|
| Windows | `KoreShelf-<version>-windows-x64.exe` |
| Mac | `KoreShelf-<version>-macos-universal.dmg` |
| Linux (PC with Intel or AMD) | `KoreShelf-<version>-x86_64.AppImage` |
| Linux (ARM, e.g. Raspberry Pi) | `KoreShelf-<version>-aarch64.AppImage` |
| Android | `KoreShelf-<version>-android.apk` |
| iPhone / iPad | `KoreShelf-<version>-ios-unsigned.ipa` |

KoreShelf has no paid code-signing certificate, so the first time you open it your system asks you to confirm. This only happens once.

#### Windows
1. Download the `.exe` and double-click it. KoreShelf opens in its own window; there is nothing to install.
2. If Windows shows "Windows protected your PC", click **More info**, then **Run anyway**.

#### Mac
1. Download the `.dmg`, open it and drag KoreShelf into Applications.
2. The first time, macOS blocks the app. Go to **System Settings → Privacy & Security**, scroll down and click **Open Anyway**.

#### Linux
1. Download the `.AppImage` for your type of computer (see *Which file?* below).
2. Make it executable: right-click it and choose **Properties → Allow executing file as program**, or run `chmod +x KoreShelf-*.AppImage`.
3. Double-click it.

**Which file?** Every computer has a "brain", called the processor. There are two big families of processors, and each file only works with its own family:

| If your computer has... | it is called | download |
|---|---|---|
| an Intel or AMD processor (almost all PCs and laptops) | x86_64, also written amd64 or x64 | `KoreShelf-<version>-x86_64.AppImage` |
| an ARM processor (Raspberry Pi, some newer laptops) | aarch64, also written arm64 | `KoreShelf-<version>-aarch64.AppImage` |

Not sure? Open a terminal, type `uname -m` and press Enter. If it says `x86_64`, take the first file; if it says `aarch64`, take the second. The website [koreshelf.github.io](https://koreshelf.github.io) tries to work it out for you.

#### Android
1. Download the `.apk` on your phone, open it and tap **Install**.
2. If asked, allow your browser to install unknown apps.
3. If you used version 3.x: the new app installs next to the old one. Add your books again, then uninstall the old app.

#### iPhone and iPad
Apple only allows apps from outside the App Store through dedicated tools, so the `.ipa` is not signed.
1. On a computer, install a sideloading tool such as AltStore, SideStore or Sideloadly and sign in with your Apple ID.
2. Download the `.ipa` and install it on your device with that tool.
3. On the device, trust the developer in **Settings → General → VPN & Device Management**. On iOS 16 and later you also need to turn on **Developer Mode** in **Settings → Privacy & Security**.

With a free Apple ID the app has to be refreshed every 7 days. AltStore can do this for you.

### Self-hosting with Docker

You can keep KoreShelf running on a home server, a NAS or a Raspberry Pi and open it from the browser of any device on your network. The image is built for PCs (amd64) and for ARM boards such as the Raspberry Pi 4/5 and most NAS (arm64). Docker picks the right one for your server by itself.

1. Install Docker: Docker Desktop on Windows and Mac, or Docker Engine with the Compose plugin on Linux.
2. Create a folder, copy this project's [`docker-compose.yml`](docker-compose.yml) into it and run:
   ```bash
   docker compose up -d
   ```
3. Open `http://SERVER-ADDRESS:3000`, or `http://localhost:3000` on the same computer.

Without a compose file:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

Books, covers and the database are stored in the `koreshelf-data` volume, mounted at `/data`, so they survive updates. To make a backup:
```bash
docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .
```

To update: `docker compose pull && docker compose up -d`

Other options:
- Password: set `KORESHELF_PASSWORD` in `docker-compose.yml`, and optionally `KORESHELF_USERNAME` (default `koreshelf`). The browser will ask for both.
- Moving from the 3.x Docker version: in `docker-compose.yml`, remove the `#` in front of `- ./public:/app/public:ro` and run it from the folder of your old setup. Your library is imported into `/data` on first start.
- If port 3000 is already taken on the server, change the number on the left, for example `"8080:3000"`, and open port 8080 instead.
- Environment variables: `KORESHELF_PORT` (default 3000), `KORESHELF_HOST` (default `0.0.0.0`), `KORESHELF_DATA` (default `/data`).

> [!WARNING]
> KoreShelf is meant for a home network. Don't expose it directly to the internet. If you need to reach it from outside, put it behind a reverse proxy with HTTPS (for example Caddy, Nginx Proxy Manager or Traefik) or use a VPN such as Tailscale, and set a password. Without HTTPS the password is sent in clear text.

You can also run the server without Docker: `koreshelf --server` takes the same settings.

### Using the app

When you open KoreShelf you see your shelf.

- The first time, press *Try a sample book*. A short book is added to the shelf and explains the app while you read it.
- To add books, press *+ Upload Ebook* or drag your files onto the window: EPUB (also Kobo KEPUB), PDF, FB2 (also zipped), TXT, Markdown and CBZ comics.
- To read, press *Start reading* (or *Continue reading*) under the book in the middle. Less common actions are in the *More* menu.
- *Manage* lets you create, rename and delete shelves and move several books at once.
- To quit, close the window. If you open KoreShelf while it is already running, the existing window comes to the front.

### The reader

- It opens EPUB (reflowable) and PDF (fixed layout). You can read page by page or scroll continuously.
- FB2, TXT and Markdown are converted to EPUB when uploaded, so they get the same reader, search and highlights. TXT files are split into chapters automatically and their character encoding is detected.
- CBZ comics open in a page viewer: arrow keys or swipes, fit to page or to width, and a right-to-left mode for manga.
- Text in PDFs can be selected and underlined, as in EPUBs.
- PDFs without a cover get one made from their first page.
- Select a sentence to underline it. Highlights are saved, and you can find them again on the board.
- Font, text size, line spacing and alignment (left, centre, right, justified) can be changed from the side panel.
- There is a light and a dark theme.
- Your progress shows up as a red ribbon on the 3D book, at the exact percentage you have read.
- When you finish a book you can rate it from 1 to 5 stars and write a short review. The rating is printed in gold on the back cover.
- The table of contents works with structured EPUBs and PDFs. Scanned PDFs without one get a page selector instead.
- The search field in the top right finds words and phrases in the book and highlights the results in the text.

### Highlights board

Above the shelves there is a wooden board. Every book with highlights has its own sticky note on it.

- Use the left and right arrows to move between pages of notes, even when you have hundreds.
- New highlights appear on the board straight away, without reloading.
- Click a note to read, edit or delete its highlights.
- Any quote can be shared as a 1080×1080 image with the cover and the book details, ready for Instagram, Facebook, X or WhatsApp, or saved to your device.

### Your data

The library is kept in its own folder, so you can update or move KoreShelf without losing anything:

- Windows: `%APPDATA%\KoreShelf` (paste it into the File Explorer address bar)
- Mac: `~/Library/Application Support/KoreShelf`
- Linux: `~/.local/share/KoreShelf`

Inside you'll find `ebooks/` (your books), `covers/` (the covers), `koreshelf.db` (the SQLite database with metadata, reading progress, categories and highlights) and `koreshelf.log` (useful if something goes wrong).

Portable mode on Windows, for example on a USB stick: create a folder called `KoreShelf_Data` next to `KoreShelf.exe` and your data will be saved there.

With *Edit Metadata* you can change title, author, description and category, or upload your own cover. The 3D book updates immediately.

Moving from version 3.x on a computer:
- Windows: put the new `.exe` in the folder that contains the old `public` folder and open it. The library is imported on first launch.
- Mac and Linux: with KoreShelf closed, copy `koreshelf.db`, `covers` and `ebooks` from the old `public` folder into the folder listed above, replacing the files already there.

### Large and damaged files

- EPUBs and PDFs with tens of thousands of pages are processed without freezing the app.
- A damaged or unusual file is reported on its own; the rest of the library keeps working.
- When an ISBN is found, covers and descriptions are looked up on Apple Books and Google Books.
- The same book can't be uploaded twice.

### Small screens

In narrow windows the button labels turn into icons, so nothing overlaps. On phones the interface switches to a layout made for touch.

### Languages

KoreShelf is available in English, Italian, Spanish, French and German. You can change language from the top bar (on phones: *More*, then language), and your choice is remembered.

To add a language, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Troubleshooting

**"Windows protected your PC" or "Apple could not verify KoreShelf"**
This is the first-launch confirmation described above. On Windows click **More info → Run anyway**; on Mac go to **System Settings → Privacy & Security → Open Anyway**.

**On Windows, KoreShelf opens in the browser instead of its own window**
The window uses Microsoft Edge WebView2, which comes with Windows 10 and 11. If it's missing, KoreShelf opens in the browser and explains how to install it.

**Something else doesn't work**
Open `koreshelf.log` in the data folder (see *Your data*) and attach it to a [bug report](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### Building from source

KoreShelf is written in Rust (server and desktop window) with a Vite and Three.js interface. The phone apps use Tauri 2.

```bash
cargo build --release      # the desktop app, in target/release/
cargo test --no-default-features
```

Project structure, end-to-end tests and packaging are described in [CONTRIBUTING.md](CONTRIBUTING.md).
