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

Seit Version 4.0.0 ist KoreShelf **eine einzige Datei**: kein Node.js, nichts weiter zu installieren. Für einen Heimserver gibt es außerdem ein Docker-Image (siehe unten).

- **Windows:** Windows 10 oder 11.
- **Mac:** Apple-Chip und Intel (eine universelle Datei).
- **Linux:** jede aktuelle 64-Bit-Distribution (x86_64).
- **Android:** jedes Android-Smartphone oder -Tablet.
- **iPhone / iPad:** nur für fortgeschrittene Nutzer (siehe unten).

### 🚀 Download und Installation

Am einfachsten geht es über die Website **[koreshelf.github.io](https://koreshelf.github.io)**: Sie erkennt Ihr Gerät und bietet die passende Datei an.
Sie können die Datei auch selbst aus dem [neuesten Release](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest) wählen:

| Gerät | Datei |
|---|---|
| Windows | `KoreShelf-<Version>-windows-x64.exe` |
| Mac | `KoreShelf-<Version>-macos-universal.dmg` |
| Linux | `KoreShelf-<Version>-x86_64.AppImage` |
| Android | `KoreShelf-<Version>-android.apk` |
| iPhone / iPad | `KoreShelf-<Version>-ios-unsigned.ipa` |

KoreShelf ist kostenlos und hat kein kostenpflichtiges Zertifikat, deshalb fragt Ihr System **beim ersten Mal** nach einer Bestätigung. Das ist normal und passiert nur einmal.

#### 🪟 Windows
1. Laden Sie die `.exe`-Datei herunter und doppelklicken Sie darauf: KoreShelf öffnet sich in einem eigenen Fenster, es muss nichts installiert werden.
2. Wenn Windows „Der Computer wurde durch Windows geschützt“ anzeigt, klicken Sie auf **Weitere Informationen → Trotzdem ausführen**.

#### 🍎 Mac
1. Laden Sie die `.dmg`-Datei herunter, öffnen Sie sie und ziehen Sie **KoreShelf** in den Ordner **Programme**.
2. Beim ersten Mal blockiert macOS die App: Öffnen Sie **Systemeinstellungen → Datenschutz & Sicherheit**, scrollen Sie nach unten und klicken Sie auf **Dennoch öffnen**.

#### 🐧 Linux
1. Laden Sie die `.AppImage`-Datei herunter.
2. Machen Sie sie ausführbar: Rechtsklick → **Eigenschaften → Ausführen als Programm erlauben** (oder `chmod +x KoreShelf-*.AppImage` im Terminal).
3. Doppelklicken Sie auf die Datei.

#### 🤖 Android
1. Laden Sie die `.apk`-Datei auf dem Smartphone herunter, öffnen Sie sie und tippen Sie auf **Installieren**.
2. Erlauben Sie bei Nachfrage Ihrem Browser, unbekannte Apps zu installieren.
3. Sie kommen von Version 3.x? Die neue App wird neben der alten installiert: Fügen Sie Ihre Bücher erneut hinzu, danach können Sie die alte App deinstallieren.

#### 📱 iPhone und iPad (fortgeschrittene Nutzer)
Apple erlaubt Apps außerhalb des App Store nur über spezielle Werkzeuge, deshalb ist die `.ipa`-Datei nicht signiert.
1. Installieren Sie auf einem Computer ein Werkzeug wie AltStore, SideStore oder Sideloadly und melden Sie sich mit Ihrer Apple-ID an.
2. Laden Sie die `.ipa`-Datei herunter und installieren Sie sie mit diesem Werkzeug auf Ihrem iPhone oder iPad.
3. Vertrauen Sie auf dem Gerät dem Entwickler unter **Einstellungen → Allgemein → VPN und Geräteverwaltung**. Ab iOS 16 müssen Sie außerdem den **Entwicklermodus** aktivieren (**Einstellungen → Datenschutz & Sicherheit**).

Mit einer kostenlosen Apple-ID muss die App alle 7 Tage erneuert werden (AltStore erledigt das automatisch).

### 🐳 Self-Hosting mit Docker (Heimserver, NAS, Raspberry Pi)

Lassen Sie KoreShelf auf einem Heimserver laufen und öffnen Sie es im Browser jedes Geräts in Ihrem Netzwerk. Das Image läuft auf PCs (amd64) und auf ARM-Boards wie dem Raspberry Pi 4/5 sowie den meisten NAS (arm64).

1. Installieren Sie Docker (Docker Desktop unter Windows und Mac oder Docker Engine mit dem Compose-Plugin unter Linux).
2. Legen Sie einen Ordner an, kopieren Sie die Datei [`docker-compose.yml`](../docker-compose.yml) dieses Projekts hinein und führen Sie aus:
   ```bash
   docker compose up -d
   ```
3. Öffnen Sie `http://SERVER-ADRESSE:3000` (auf demselben Computer: `http://localhost:3000`).

Ohne Compose-Datei:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

- **Ihre Daten** (Bücher, Cover, Datenbank) liegen im Volume `koreshelf-data`, eingehängt unter `/data`, und bleiben bei Updates erhalten. Sicherung: `docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .`
- **Aktualisieren:** `docker compose pull && docker compose up -d`
- **Passwort (optional):** Setzen Sie `KORESHELF_PASSWORD` (und bei Bedarf `KORESHELF_USERNAME`, Standard `koreshelf`) in `docker-compose.yml`: Der Browser fragt dann danach.
- **Sie kommen von der Docker-Version 3.x?** Entfernen Sie in `docker-compose.yml` das `#` vor der Zeile `- ./public:/app/public:ro` (im Ordner Ihrer alten Installation ausführen): Beim ersten Start wird Ihre Bibliothek nach `/data` importiert.
- **Port 3000 auf dem Server schon belegt?** Ändern Sie die linke Zahl: `"8080:3000"`, und öffnen Sie dann `http://SERVER-ADRESSE:8080`.
- **Einstellungen:** `KORESHELF_PORT` (Standard 3000), `KORESHELF_HOST` (Standard `0.0.0.0`), `KORESHELF_DATA` (Standard `/data`).

> [!WARNING]
> KoreShelf ist für das Heimnetz gedacht. Stellen Sie es nicht direkt ins Internet: Für den Zugriff von außen gehört es hinter einen Reverse Proxy mit **HTTPS** (z. B. Caddy, Nginx Proxy Manager oder Traefik) oder in ein VPN wie Tailscale, und setzen Sie ein Passwort. Ohne HTTPS wird das Passwort im Klartext übertragen.

Auch ohne Docker kann das KoreShelf-Programm als Server laufen: `koreshelf --server` (gleiche Einstellungen).

### 🎮 Bedienung der App

Öffnen Sie KoreShelf und Ihr 3D-Regal erscheint.

- **Zum ersten Mal hier?** Drücken Sie *Beispielbuch ausprobieren*: Ein kurzes Buch landet im Regal und erklärt Ihnen die App, während Sie es lesen.
- **Bücher hinzufügen:** Drücken Sie *+ E-Book laden* oder ziehen Sie EPUB- und PDF-Dateien in das Fenster.
- **Lesen:** *Lesen beginnen* (oder *Weiterlesen*) unter dem Buch in der Mitte. Seltenere Aktionen finden Sie im Menü *Mehr*.
- **Ordnen:** Mit *Verwalten* benennen Sie Regale um, legen neue an, löschen sie und verschieben mehrere Bücher auf einmal.
- **Schließen:** Schließen Sie einfach das Fenster. Wenn Sie KoreShelf erneut öffnen, während es läuft, kommt das bestehende Fenster nach vorne.

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

Ihre Bibliothek liegt in einem eigenen Ordner, sodass Sie KoreShelf aktualisieren oder verschieben können, ohne etwas zu verlieren:

- **Windows:** `%APPDATA%\KoreShelf` (in die Adressleiste des Datei-Explorers einfügen)
- **Mac:** `~/Library/Application Support/KoreShelf`
- **Linux:** `~/.local/share/KoreShelf`

Darin finden Sie `ebooks/` (Ihre Bücher), `covers/` (die Cover), `koreshelf.db` (die SQLite-Datenbank mit Metadaten, Lesefortschritt, Kategorien und Markierungen) und `koreshelf.log` (hilfreich, wenn etwas nicht funktioniert).

**💾 Portable Version (Windows, z. B. auf einem USB-Stick):** Legen Sie neben `KoreShelf.exe` einen Ordner namens `KoreShelf_Data` an: Ihre Daten werden dort gespeichert.

**✏️ Eigene Metadaten:** Mit *Metadaten bearbeiten* ändern Sie Titel, Autor, Beschreibung und Kategorie oder laden ein eigenes Cover hoch. Das 3D-Buch aktualisiert sich sofort.

**⬆️ Sie kommen von Version 3.x (Computer):**
- **Windows:** Legen Sie die neue `.exe` in den Ordner, der den alten Ordner `public` enthält, und öffnen Sie sie: Beim ersten Start wird Ihre Bibliothek automatisch übernommen.
- **Mac und Linux:** Kopieren Sie bei geschlossenem KoreShelf `koreshelf.db`, `covers` und `ebooks` aus dem alten Ordner `public` in den oben genannten Ordner (vorhandene Dateien ersetzen).

### 🌍 Mehrsprachige Unterstützung (i18n)

KoreShelf ist auf Deutsch, Englisch, Italienisch, Spanisch und Französisch verfügbar. Die Sprache wechseln Sie über die Schaltfläche in der oberen Leiste (auf dem Smartphone: *Mehr* → Sprache); Ihre Wahl wird gespeichert.

Sie möchten eine neue Sprache hinzufügen? Die Schritte stehen in [CONTRIBUTING.md](../CONTRIBUTING.md).

### 🆘 Fehlerbehebung

**„Der Computer wurde durch Windows geschützt“ oder „Apple konnte KoreShelf nicht überprüfen“**
Das ist die oben beschriebene Bestätigung beim ersten Start: Unter Windows klicken Sie auf **Weitere Informationen → Trotzdem ausführen**, auf dem Mac auf **Systemeinstellungen → Datenschutz & Sicherheit → Dennoch öffnen**.

**Unter Windows öffnet sich KoreShelf im Browser statt im eigenen Fenster**
Das Fenster verwendet Microsoft Edge WebView2, das in Windows 10 und 11 enthalten ist. Fehlt es, öffnet sich KoreShelf im Browser und erklärt, wie man es installiert.

**Etwas funktioniert nicht**
Öffnen Sie `koreshelf.log` im Datenordner (siehe *Datenverwaltung*) und hängen Sie die Datei an einen [Fehlerbericht](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md) an.

### 🛠️ Aus dem Quellcode bauen (Entwickler)

KoreShelf ist in Rust geschrieben (Server und Fenster), die Oberfläche nutzt Vite + Three.js; die Smartphone-Apps verwenden Tauri 2.

```bash
cargo build --release      # die App für den Computer, in target/release/
cargo test --no-default-features
```

Projektstruktur, End-to-End-Tests und Paketerstellung sind in [CONTRIBUTING.md](../CONTRIBUTING.md) erklärt.
