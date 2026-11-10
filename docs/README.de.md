<div align="center">
   
   # KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   **Read this in:** [English](../README.md) | [Italiano](README.it.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

   ## Home
   <img align="center" width="858" height="720" alt="Startbildschirm von KoreShelf mit dem 3D-Regal" src="https://github.com/user-attachments/assets/c879b004-f214-4541-ad72-9b1071e3fa2d" />
   
   
   ## Reader
  <img align="center" width="858" height="720" alt="Der Reader von KoreShelf" src="https://github.com/user-attachments/assets/edd3273e-25ff-457c-9f31-6f3cf9b871fc" />

</div>

## Deutsch

KoreShelf ist eine 3D-Bibliothek für Ihre E-Books. Sie laden EPUB- und PDF-Dateien hoch, finden sie als Bücher in einem Regal wieder und lesen sie im eingebauten Reader. KoreShelf läuft unter Windows, macOS, Linux und Android und lässt sich mit Docker auch selbst hosten.

### Systemanforderungen

Seit Version 4.0.0 ist KoreShelf eine einzige Datei. Sie brauchen weder Node.js noch andere Programme. Für einen Heimserver gibt es außerdem ein Docker-Image (siehe unten).

- Windows 10 oder 11
- Mac mit Apple-Chip oder Intel (eine universelle Datei)
- Linux: jede aktuelle 64-Bit-Distribution, auf PCs (x86_64) und auf ARM-Computern (aarch64) wie dem Raspberry Pi 4 und 5
- Android-Smartphones und -Tablets
- iPhone und iPad: möglich, aber nur für Fortgeschrittene (siehe unten)

### Download und Installation

Am einfachsten geht es über [koreshelf.github.io](https://koreshelf.github.io): Die Seite erkennt Ihr Gerät und bietet die passende Datei an. Sie können die Datei auch selbst aus dem [neuesten Release](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest) wählen:

| Gerät | Datei |
|---|---|
| Windows | `KoreShelf-<Version>-windows-x64.exe` |
| Mac | `KoreShelf-<Version>-macos-universal.dmg` |
| Linux (PC mit Intel oder AMD) | `KoreShelf-<Version>-x86_64.AppImage` |
| Linux (ARM, z. B. Raspberry Pi) | `KoreShelf-<Version>-aarch64.AppImage` |
| Android | `KoreShelf-<Version>-android.apk` |
| iPhone / iPad | `KoreShelf-<Version>-ios-unsigned.ipa` |

KoreShelf hat kein kostenpflichtiges Signaturzertifikat. Deshalb fragt Ihr System beim ersten Öffnen nach einer Bestätigung. Das passiert nur einmal.

#### Windows
1. Laden Sie die `.exe` herunter und doppelklicken Sie darauf. KoreShelf öffnet sich in einem eigenen Fenster; installiert werden muss nichts.
2. Wenn Windows „Der Computer wurde durch Windows geschützt“ anzeigt, klicken Sie auf **Weitere Informationen** und dann auf **Trotzdem ausführen**.

#### Mac
1. Laden Sie die `.dmg` herunter, öffnen Sie sie und ziehen Sie KoreShelf in den Ordner Programme.
2. Beim ersten Mal blockiert macOS die App. Öffnen Sie **Systemeinstellungen → Datenschutz & Sicherheit**, scrollen Sie nach unten und klicken Sie auf **Dennoch öffnen**.

#### Linux
1. Laden Sie die `.AppImage` für Ihren Computertyp herunter (siehe *Welche Datei?* weiter unten).
2. Machen Sie sie ausführbar: Rechtsklick, **Eigenschaften → Ausführen als Programm erlauben**, oder im Terminal `chmod +x KoreShelf-*.AppImage`.
3. Doppelklicken Sie auf die Datei.

**Welche Datei?** Jeder Computer hat ein „Gehirn“, den Prozessor. Es gibt zwei große Familien von Prozessoren, und jede Datei funktioniert nur mit ihrer eigenen Familie:

| Wenn Ihr Computer … hat | heißt das | laden Sie |
|---|---|---|
| einen Intel- oder AMD-Prozessor (fast alle PCs und Laptops) | x86_64, auch amd64 oder x64 geschrieben | `KoreShelf-<Version>-x86_64.AppImage` |
| einen ARM-Prozessor (Raspberry Pi, einige neuere Laptops) | aarch64, auch arm64 geschrieben | `KoreShelf-<Version>-aarch64.AppImage` |

Nicht sicher? Öffnen Sie ein Terminal, geben Sie `uname -m` ein und drücken Sie Enter. Steht dort `x86_64`, nehmen Sie die erste Datei, steht dort `aarch64`, die zweite. Die Seite [koreshelf.github.io](https://koreshelf.github.io) versucht, das für Sie herauszufinden.

#### Android
1. Laden Sie die `.apk` auf Ihr Smartphone, öffnen Sie sie und tippen Sie auf **Installieren**.
2. Erlauben Sie dem Browser bei Nachfrage, unbekannte Apps zu installieren.
3. Falls Sie Version 3.x benutzt haben: Die neue App wird neben der alten installiert. Fügen Sie Ihre Bücher erneut hinzu und deinstallieren Sie danach die alte App.

#### iPhone und iPad
Apple erlaubt Apps außerhalb des App Store nur über spezielle Werkzeuge, deshalb ist die `.ipa` nicht signiert.
1. Installieren Sie auf einem Computer ein Sideloading-Werkzeug wie AltStore, SideStore oder Sideloadly und melden Sie sich mit Ihrer Apple-ID an.
2. Laden Sie die `.ipa` herunter und installieren Sie sie mit diesem Werkzeug auf Ihrem Gerät.
3. Vertrauen Sie auf dem Gerät dem Entwickler unter **Einstellungen → Allgemein → VPN und Geräteverwaltung**. Ab iOS 16 müssen Sie außerdem den **Entwicklermodus** unter **Einstellungen → Datenschutz & Sicherheit** aktivieren.

Mit einer kostenlosen Apple-ID muss die App alle 7 Tage erneuert werden. AltStore kann das automatisch erledigen.

### Self-Hosting mit Docker

Sie können KoreShelf auf einem Heimserver, einem NAS oder einem Raspberry Pi laufen lassen und es im Browser jedes Geräts in Ihrem Netzwerk öffnen. Das Image gibt es für PCs (amd64) und für ARM-Boards wie den Raspberry Pi 4/5 sowie die meisten NAS (arm64). Docker wählt automatisch die passende Variante für Ihren Server.

1. Installieren Sie Docker: Docker Desktop unter Windows und macOS oder Docker Engine mit dem Compose-Plugin unter Linux.
2. Legen Sie einen Ordner an, kopieren Sie die Datei [`docker-compose.yml`](../docker-compose.yml) dieses Projekts hinein und führen Sie aus:
   ```bash
   docker compose up -d
   ```
3. Öffnen Sie `http://SERVER-ADRESSE:3000` oder auf demselben Computer `http://localhost:3000`.

Ohne Compose-Datei:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

Bücher, Cover und Datenbank liegen im Volume `koreshelf-data`, das unter `/data` eingehängt ist, und bleiben bei Updates erhalten. So erstellen Sie eine Sicherung:
```bash
docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .
```

Aktualisieren: `docker compose pull && docker compose up -d`

Weitere Optionen:
- Passwort: Setzen Sie `KORESHELF_PASSWORD` in `docker-compose.yml` und bei Bedarf `KORESHELF_USERNAME` (Standard `koreshelf`). Der Browser fragt dann nach beidem.
- Umstieg von der Docker-Version 3.x: Entfernen Sie in `docker-compose.yml` das `#` vor `- ./public:/app/public:ro` und starten Sie aus dem Ordner Ihrer alten Installation. Beim ersten Start wird Ihre Bibliothek nach `/data` importiert.
- Ist Port 3000 auf dem Server schon belegt, ändern Sie die linke Zahl, zum Beispiel `"8080:3000"`, und öffnen Sie stattdessen Port 8080.
- Umgebungsvariablen: `KORESHELF_PORT` (Standard 3000), `KORESHELF_HOST` (Standard `0.0.0.0`), `KORESHELF_DATA` (Standard `/data`).

> [!WARNING]
> KoreShelf ist für das Heimnetz gedacht. Stellen Sie es nicht direkt ins Internet. Wenn Sie von außen darauf zugreifen möchten, setzen Sie einen Reverse Proxy mit HTTPS davor (zum Beispiel Caddy, Nginx Proxy Manager oder Traefik) oder nutzen Sie ein VPN wie Tailscale, und setzen Sie ein Passwort. Ohne HTTPS wird das Passwort im Klartext übertragen.

Der Server läuft auch ohne Docker: `koreshelf --server` verwendet dieselben Einstellungen.

### Bedienung

Wenn Sie KoreShelf öffnen, sehen Sie Ihr Regal.

- Drücken Sie beim ersten Mal *Beispielbuch ausprobieren*. Ein kurzes Buch landet im Regal und erklärt die App, während Sie es lesen.
- Bücher fügen Sie mit *+ E-Book laden* hinzu oder indem Sie EPUB- und PDF-Dateien auf das Fenster ziehen.
- Zum Lesen drücken Sie *Lesen beginnen* (oder *Weiterlesen*) unter dem Buch in der Mitte. Seltener gebrauchte Aktionen finden Sie im Menü *Mehr*.
- Unter *Verwalten* können Sie Regale anlegen, umbenennen und löschen und mehrere Bücher auf einmal verschieben.
- Zum Beenden schließen Sie das Fenster. Öffnen Sie KoreShelf, während es schon läuft, kommt das vorhandene Fenster in den Vordergrund.

### Der Reader

- Er öffnet EPUB (umbrechender Text) und PDF (festes Layout). Sie können seitenweise oder fortlaufend scrollend lesen.
- Text in PDFs lässt sich wie in EPUBs markieren und unterstreichen.
- PDFs ohne Cover bekommen eines aus ihrer ersten Seite.
- Markieren Sie einen Satz, um ihn zu unterstreichen. Die Markierungen werden gespeichert und erscheinen auf der Pinnwand.
- Schriftart, Schriftgröße, Zeilenabstand und Ausrichtung (links, zentriert, rechts, Blocksatz) stellen Sie in der Seitenleiste ein.
- Es gibt ein helles und ein dunkles Design.
- Ihr Lesefortschritt erscheint als rotes Lesebändchen am 3D-Buch, genau beim gelesenen Prozentsatz.
- Wenn Sie ein Buch beendet haben, können Sie es mit 1 bis 5 Sternen bewerten und eine kurze Rezension schreiben. Die Bewertung wird in Gold auf die Rückseite gedruckt.
- Das Inhaltsverzeichnis funktioniert mit strukturierten EPUBs und PDFs. Für gescannte PDFs ohne Inhaltsverzeichnis gibt es eine Seitenauswahl.
- Das Suchfeld oben rechts findet Wörter und Sätze im Buch und hebt die Treffer im Text hervor.

### Die Pinnwand

Über den Regalen hängt eine Holztafel. Jedes Buch mit Markierungen hat dort seine eigene Haftnotiz.

- Mit den Pfeilen links und rechts blättern Sie durch die Seiten mit Notizen, auch wenn es Hunderte sind.
- Neue Markierungen erscheinen sofort auf der Pinnwand, ohne neu zu laden.
- Klicken Sie auf eine Notiz, um ihre Markierungen zu lesen, zu bearbeiten oder zu löschen.
- Jedes Zitat lässt sich als Bild im Format 1080×1080 mit Cover und Buchdaten teilen, zum Beispiel auf Instagram, Facebook, X oder WhatsApp, oder auf dem Gerät speichern.

### Ihre Daten

Die Bibliothek liegt in einem eigenen Ordner. So können Sie KoreShelf aktualisieren oder verschieben, ohne etwas zu verlieren:

- Windows: `%APPDATA%\KoreShelf` (in die Adressleiste des Datei-Explorers einfügen)
- Mac: `~/Library/Application Support/KoreShelf`
- Linux: `~/.local/share/KoreShelf`

Darin finden Sie `ebooks/` (Ihre Bücher), `covers/` (die Cover), `koreshelf.db` (die SQLite-Datenbank mit Metadaten, Lesefortschritt, Kategorien und Markierungen) und `koreshelf.log` (hilfreich, wenn etwas nicht funktioniert).

Portabler Modus unter Windows, etwa auf einem USB-Stick: Legen Sie neben `KoreShelf.exe` einen Ordner namens `KoreShelf_Data` an, dann werden Ihre Daten dort gespeichert.

Mit *Metadaten bearbeiten* ändern Sie Titel, Autor, Beschreibung und Kategorie oder laden ein eigenes Cover hoch. Das 3D-Buch wird sofort aktualisiert.

Umstieg von Version 3.x auf dem Computer:
- Windows: Legen Sie die neue `.exe` in den Ordner, der den alten Ordner `public` enthält, und öffnen Sie sie. Die Bibliothek wird beim ersten Start importiert.
- Mac und Linux: Kopieren Sie bei geschlossenem KoreShelf `koreshelf.db`, `covers` und `ebooks` aus dem alten Ordner `public` in den oben genannten Ordner und ersetzen Sie die vorhandenen Dateien.

### Große und beschädigte Dateien

- EPUBs und PDFs mit Zehntausenden Seiten werden verarbeitet, ohne dass die App hängt.
- Eine beschädigte oder ungewöhnliche Datei wird einzeln gemeldet; der Rest der Bibliothek funktioniert weiter.
- Wird eine ISBN gefunden, sucht KoreShelf Cover und Inhaltsangabe bei Apple Books und Google Books.
- Dasselbe Buch lässt sich nicht zweimal hochladen.

### Kleine Bildschirme

In schmalen Fenstern werden die Beschriftungen der Schaltflächen zu Symbolen, damit sich nichts überlappt. Auf dem Smartphone wechselt die Oberfläche zu einem Layout für die Bedienung mit dem Finger.

### Sprachen

KoreShelf gibt es auf Englisch, Italienisch, Spanisch, Französisch und Deutsch. Die Sprache wechseln Sie in der oberen Leiste (auf dem Smartphone: *Mehr*, dann Sprache); Ihre Wahl wird gespeichert.

Wie Sie eine Sprache hinzufügen, steht in [CONTRIBUTING.md](../CONTRIBUTING.md).

### Fehlerbehebung

**„Der Computer wurde durch Windows geschützt“ oder „Apple konnte KoreShelf nicht überprüfen“**
Das ist die oben beschriebene Bestätigung beim ersten Start. Unter Windows klicken Sie auf **Weitere Informationen → Trotzdem ausführen**, auf dem Mac gehen Sie zu **Systemeinstellungen → Datenschutz & Sicherheit → Dennoch öffnen**.

**Unter Windows öffnet sich KoreShelf im Browser statt im eigenen Fenster**
Das Fenster verwendet Microsoft Edge WebView2, das zu Windows 10 und 11 gehört. Fehlt es, öffnet sich KoreShelf im Browser und erklärt, wie Sie es installieren.

**Etwas anderes funktioniert nicht**
Öffnen Sie `koreshelf.log` im Datenordner (siehe *Ihre Daten*) und hängen Sie die Datei an einen [Fehlerbericht](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md) an.

### Aus dem Quellcode bauen

KoreShelf ist in Rust geschrieben (Server und Desktop-Fenster), die Oberfläche nutzt Vite und Three.js. Die Smartphone-Apps verwenden Tauri 2.

```bash
cargo build --release      # die Desktop-App, in target/release/
cargo test --no-default-features
```

Projektstruktur, End-to-End-Tests und das Erstellen der Pakete sind in [CONTRIBUTING.md](../CONTRIBUTING.md) beschrieben.
