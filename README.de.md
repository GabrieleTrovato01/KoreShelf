<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   
   🌍 **Read this in:** [🇬🇧 English](README.md) | [🇮🇹 Italiano](README.it.md) | [🇪🇸 Español](README.es.md) | [🇫🇷 Français](README.fr.md) | [🇩🇪 Deutsch](README.de.md)

   ## Home
   <img align="center" width="800" height="500" alt="demo" src="https://github.com/user-attachments/assets/499a1809-144c-4bc4-b870-f23b3e076ab2" />
   
   
   ## Reader
   <img width="800" height="500" alt="demo-reader" src="https://github.com/user-attachments/assets/8fca0fcd-2a92-40d9-a1cc-f8a2d552e57a" />

</div>

## 🇩🇪 Deutsch

Eine interaktive digitale 3D-Bibliothek, mit der Sie Ihre EPUB- und PDF-Dateien in einer immersiven grafischen Umgebung hochladen, durchsuchen und organisieren können.

### ⚙️ Systemanforderungen

Um dieses Projekt auszuführen, müssen Sie keine Server konfigurieren oder Node.js installieren! Die Anforderungen hängen vollständig davon ab, wie Sie es ausführen möchten:

- **Portable App (Empfohlen):** Keine externe Software erforderlich. Einfach herunterladen, entpacken und ausführen.
- **Docker-Version:** Sie benötigen nur ein kostenloses Programm: Docker, das die Webanwendung isoliert und sicher ausführt.

### 🚀 Installationsanleitung (Schritt für Schritt)

Sie haben zwei Möglichkeiten, KoreShelf auszuführen.

#### Option 1: Der einfache Weg (Portable Desktop App - Empfohlen)

Wenn Sie Docker oder Node.js nicht installieren möchten, können Sie unser eigenständiges Programm verwenden, das für Windows, Linux und macOS (Apple Silicon) verfügbar ist.

1. Gehen Sie zum [Releases-Bereich](https://github.com/GabrieleTrovato01/KoreShelf/releases) dieses Repositorys.
2. Laden Sie die `.zip`-Datei für Ihr Betriebssystem herunter.
3. Extrahieren Sie den Inhalt in einen beliebigen Ordner auf Ihrem PC.
   - **Windows:** Doppelklicken Sie auf `koreshelf-win.exe`.
   - **Linux:** Öffnen Sie das Terminal im Ordner und führen Sie `./koreshelf-linux` aus. (Hinweis: Möglicherweise müssen Sie die Datei zuerst mit `chmod +x koreshelf-linux` ausführbar machen).
   - **macOS (Apple Silicon / M1, M2, M3...):** Aufgrund der strengen Sicherheitsregeln von Apple für nicht signierte Apps öffnen Sie das Terminal im extrahierten Ordner und führen Sie diese beiden Befehle aus:
     ```bash
     chmod +x koreshelf-macos-arm
     xattr -cr koreshelf-macos-arm
     ```
     Anschließend können Sie einfach auf die Datei doppelklicken oder `./koreshelf-macos-arm` im Terminal ausführen.

*(Hinweis für Intel-Mac-Nutzer: Vorkompilierte Binärdateien sind für ältere Intel-Macs nicht verfügbar. Bitte verwenden Sie Option 2: Docker oder führen Sie die App aus dem Quellcode aus).*

**Sicherheitshinweis:** Da es sich um ein unabhängiges Open-Source-Projekt ohne kostenpflichtige digitale Signatur handelt, zeigen Windows SmartScreen oder Apple Gatekeeper beim ersten Start möglicherweise eine Warnung an. Wählen Sie einfach "Weitere Informationen" und "Trotzdem ausführen", um loszulegen. Der Quellcode ist hier transparent verfügbar.

#### Option 2: Der fortgeschrittene Weg (Docker - Für Entwickler/Linux/macOS)

Wenn Sie das Projekt lieber über Docker ausführen möchten oder ein anderes Betriebssystem als Windows verwenden, folgen Sie diesen Schritten.

**Schritt 1: Docker installieren**
- **Windows / macOS:** Laden Sie [Docker Desktop](https://www.docker.com/products/docker-desktop/) herunter und installieren Sie es. Starten Sie es und stellen Sie sicher, dass Docker im Hintergrund läuft.
- **Linux:** Öffnen Sie das Terminal und installieren Sie Docker Engine und das Compose-Plugin (z. B. unter Ubuntu: `sudo apt install docker.io docker-compose-v2`).

**Schritt 2: Die 3D-Bibliothek starten**
1. Laden Sie dieses Projekt auf Ihren PC herunter (via `git clone` oder als ZIP).
2. Öffnen Sie das Terminal genau im Projektordner (wo sich die `docker-compose.yml`-Datei befindet).
3. Geben Sie folgenden Befehl ein und drücken Sie Enter:
   ```bash
   docker compose up -d --build
   ```

### 🎮 Bedienung der App

Sobald das Terminal geladen hat, ist die Bibliothek einsatzbereit!

Öffnen Sie Ihren bevorzugten Browser (Chrome, Edge, Safari) und gehen Sie zu:

👉 **http://localhost:3000**

### 📖 Integrierter EPUB & PDF Reader

KoreShelf ist nicht nur ein Archiv, sondern eine immersive Leseumgebung:

* **Smart Dual-Engine Reader:** Öffnen Sie EPUBs (fließendes Format) oder PDFs (festes Format) direkt im Browser. Wechseln Sie nahtlos zwischen paginiertem (horizontal) und kontinuierlichem (vertikal) Scroll-Modus.
* **PDF-Textauswahl:** Dank des integrierten TextLayers ist PDF-Text genauso auswählbar und markierbar wie bei EPUBs.
* **Automatische PDF-Cover:** PDFs ohne eingebettetes Cover erhalten automatisch ein Cover von der ersten Seite, direkt im Browser generiert.
* **Textmarkierungen:** Unterstreichen Sie Text in Ihren Büchern. Die Markierungen werden dauerhaft gespeichert und sind jederzeit abrufbar.
* **Smart Table of Contents:** Navigieren Sie einfach durch lange Bücher mit dem neuen Inhaltsverzeichnis-Button. Er unterstützt strukturierte EPUBs/PDFs und bietet einen Schnellsprung-Selektor für gescannte PDFs.
* **Social Quote Sharing:** Teilen Sie Ihre Lieblingszitate als elegantes, quadratisches Bild (1080x1080), optimiert für Social Media.
* **Reader-Anpassung:** Schriftart, Größe, Zeilenhöhe und Ausrichtung über eine intelligente Seitenleiste anpassen.
* **Dunkler/Heller Modus:** Zwischen Themen wechseln, um die Augen zu schonen.
* **Lese-Fortschritt:** Ein rotes Lesezeichenband zeigt den Fortschritt direkt am 3D-Buch im Regal.
* **Interaktive Rezensionen:** Wenn Sie ein Buch beenden, können Sie es bewerten und eine Rezension schreiben, die goldgeprägt auf der Rückseite des 3D-Buches erscheint.
* **Intelligentes Inhaltsverzeichnis:** Navigieren Sie mühelos durch lange Texte mit der neuen Inhaltsverzeichnis-Schaltfläche. Strukturierte EPUBs und PDFs werden optimal unterstützt. Für gescannte PDFs ohne interne Navigation bietet die Funktion eine praktische Schnellnavigation.

### 📌 Markierungen & 3D-Pinnwand

Ihre Anmerkungen verdienen mehr als nur eine Liste. KoreShelf bietet eine einzigartige **3D-Pinnwand**, die über Ihrer Bibliothek schwebt:

* **Visuelle Post-its:** Jedes Buch mit Markierungen erscheint als Post-it-Notiz auf einer virtuellen Holztafel.
* **Mehrseiten-Navigation:** Blättern Sie durch alle Ihre Notizen mit den Pfeiltasten.
* **Echtzeit-Synchronisierung:** Markierungen aus dem Reader erscheinen sofort auf der Pinnwand.
* **Schnellverwaltung:** Klicken Sie auf ein Post-it, um Notizen anzusehen oder zu löschen.
* **Zitate teilen:** Teilen Sie Ihre Lieblingszitate mit nur einem Klick! KoreShelf erstellt automatisch ein elegantes quadratisches Bild (1080x1080) mit Ihrem Zitat, dem Buchcover und den Metadaten. Dieses können Sie direkt auf Instagram, Facebook, X oder WhatsApp teilen oder lokal herunterladen.

### 📁 Datenverwaltung

Ihre Daten werden automatisch mit Ihrem PC synchronisiert. Im `public/`-Verzeichnis finden Sie:

* `ebooks/`: Ihre E-Books.
* `covers/`: Generierte Cover-Bilder.
* `koreshelf.db`: SQLite-Datenbank mit Ihren Daten.

**✏️ Metadaten-Hot-Swap:** Bearbeiten Sie Titel, Autor oder Kategorien direkt in der App. Das 3D-Modell und die Datenbank aktualisieren sich in Echtzeit!

### 🌍 Mehrsprachige Unterstützung (i18n)

KoreShelf ist internationalisiert. Aktuell verfügbar in: **Englisch**, **Italienisch**, **Spanisch**, **Französisch** und **Deutsch**. Die Sprache kann über die obere Navigationsleiste geändert werden.

### 🆘 Fehlerbehebung

* **Fehler `CustomEvent is not defined`:** Aktualisieren Sie Ihre Node.js-Version im Dockerfile (verwenden Sie `node:22-bookworm-slim`).
* **Fehler `port is already allocated`:** Ein anderes Programm nutzt Port 3000. Ändern Sie den Port in der `docker-compose.yml` (z.B. `"8080:3000"`).
* **Keine PDF-Cover:** Diese werden automatisch aus der ersten Seite generiert. Bei sehr großen Dateien sucht das System alternativ online nach Covern.
