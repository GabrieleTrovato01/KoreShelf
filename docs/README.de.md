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

## 🇩🇪 Deutsch

Eine interaktive digitale 3D-Bibliothek, mit der Sie Ihre EPUB- und PDF-Dateien in einer immersiven grafischen Umgebung hochladen, durchsuchen und organisieren können.

### ⚙️ Systemanforderungen

Um dieses Projekt auszuführen, müssen Sie keine Server konfigurieren oder Node.js installieren! Die Anforderungen hängen vollständig davon ab, wie Sie es ausführen möchten:

- **Portable App (Empfohlen):** Keine externe Software erforderlich. Einfach herunterladen, entpacken und ausführen.
- **Docker-Version:** Sie benötigen nur ein kostenloses Programm: Docker, das die Webanwendung isoliert und sicher ausführt.

### 🚀 Installationsanleitung (Schritt für Schritt)

Sie haben drei Möglichkeiten, KoreShelf auszuführen.

#### Option 1: Der einfache Weg (Portable Desktop App - Empfohlen)

Wenn Sie Docker oder Node.js nicht installieren möchten, können Sie unser eigenständiges Programm verwenden, das für Windows, Linux und macOS (Apple Silicon) verfügbar ist.

1. Gehen Sie zum [Releases-Bereich](https://github.com/GabrieleTrovato01/KoreShelf/releases) dieses Repositorys.
2. Laden Sie die `.zip`-Datei für Ihr Betriebssystem herunter.
3. Extrahieren Sie den Inhalt in einen beliebigen Ordner auf Ihrem PC.
   - **Windows:** Doppelklicken Sie auf `koreshelf-win.exe`. [Tutorial]( https://github.com/user-attachments/assets/59e2e58f-88b6-419f-b4af-7fb12be551fa)
   - **Linux:** Öffnen Sie das Terminal im Ordner und führen Sie `./koreshelf-linux` aus. (Hinweis: Möglicherweise müssen Sie die Datei zuerst mit `chmod +x koreshelf-linux` ausführbar machen).
   - **macOS (Apple Silicon / M1, M2, M3...):** Aufgrund von macOS-Sicherheitsbeschränkungen (Gatekeeper) für Software, die über einen Browser heruntergeladen wurde, wird empfohlen, KoreShelf direkt über das Terminal zu installieren. Dieses Vorgehen verhindert automatische Systemblockaden und sorgt für einen sauberen Start.
   Öffne das Terminal und führe die folgenden Befehle aus:
   ```bash
      # 1. Erstelle einen eigenen Ordner und wechsle dorthin
      mkdir KoreShelf
      cd KoreShelf

      # 2. Lade die neueste Version herunter und entpacke sie
      curl -L -o KoreShelf-macOS.zip "https://github.com/gabrieletrovato01/koreshelf/releases/download/v3.0.0/KoreShelf-macOS-AppleSilicon.zip" && unzip KoreShelf-macOS.zip

      # 3. Entferne das komprimierte Archiv (optional, zum Aufräumen)
      rm KoreShelf-macOS.zip

   ```
   Sobald dies erledigt ist, mache einfach einen Doppelklick auf die Datei oder führe `./koreshelf-macos-arm` aus.

*(Hinweis für Intel-Mac-Nutzer: Vorkompilierte Binärdateien sind für ältere Intel-Macs nicht verfügbar. Bitte verwenden Sie Option 2: Docker oder führen Sie die App aus dem Quellcode aus).*

**Sicherheitshinweis:** Da es sich um ein unabhängiges Open-Source-Projekt ohne kostenpflichtige digitale Signatur handelt, zeigen Windows SmartScreen oder Apple Gatekeeper beim ersten Start möglicherweise eine Warnung an. Wählen Sie einfach "Weitere Informationen" und "Trotzdem ausführen", um loszulegen. Der Quellcode ist hier transparent verfügbar.

#### Option 2 : Applications Mobiles (Android & iOS)

KoreShelf peut être installé nativement sur votre smartphone ou tablette !

- 🤖 **Android (.apk) :**
  1. Accédez à la page des [Versions (Releases)](https://github.com/GabrieleTrovato01/KoreShelf/releases) et téléchargez `KoreShelf.apk`.
  2. Ouvrez le fichier `.apk` sur votre appareil Android et appuyez sur **Installer** (autorisez "Installer des applications de sources inconnues" dans vos paramètres si demandé).

- 🍎 **iOS / iPhone (.ipa) :**
  1. Accédez à la page des [Versions (Releases)](https://github.com/GabrieleTrovato01/KoreShelf/releases) et téléchargez `KoreShelf.ipa`.
  2. Installez le fichier `.ipa` sur votre iPhone ou iPad en utilisant votre méthode de sideloading préférée telle que **AltStore**, **SideStore**, **Sideloadly** ou **Scarlet**.

#### Option 3: Der fortgeschrittene Weg (Docker - Für Entwickler/Linux/macOS)

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
* **Textsuche**: Nutze die Suchleiste oben rechts im Reader, um gezielt nach Wörtern oder Phrasen zu suchen. Die Ergebnisse werden direkt im Text markiert.

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
