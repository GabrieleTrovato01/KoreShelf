<div align="center">
   
   # KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   **Read this in:** [English](../README.md) | [Italiano](README.it.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

   ## Home
   <img align="center" width="858" height="720" alt="L'écran d'accueil de KoreShelf avec l'étagère 3D" src="https://github.com/user-attachments/assets/c879b004-f214-4541-ad72-9b1071e3fa2d" />
   
   
   ## Reader
  <img align="center" width="858" height="720" alt="La liseuse de KoreShelf" src="https://github.com/user-attachments/assets/edd3273e-25ff-457c-9f31-6f3cf9b871fc" />

</div>

KoreShelf est une bibliothèque 3D pour vos ebooks. Vous importez des fichiers EPUB et PDF, ils apparaissent comme des livres sur une étagère, et vous les lisez dans la liseuse intégrée. KoreShelf fonctionne sous Windows, macOS, Linux et Android, et vous pouvez aussi l'héberger vous-même avec Docker.

### Configuration requise

Depuis la version 4.0.0, KoreShelf tient en un seul fichier. Vous n'avez besoin ni de Node.js ni d'aucun autre logiciel. Pour un serveur domestique, il existe aussi une image Docker (voir plus bas).

- Windows 10 ou 11
- Mac avec puce Apple ou Intel (un seul fichier universel)
- Linux : toute distribution 64 bits récente, sur PC (x86_64) et sur ordinateurs ARM (aarch64) comme le Raspberry Pi 4 et 5
- Téléphones et tablettes Android
- iPhone et iPad : possible, mais réservé aux utilisateurs avancés (voir plus bas)

### Téléchargement et installation

Le plus simple est de passer par [koreshelf.github.io](https://koreshelf.github.io) : le site reconnaît votre appareil et vous propose le bon fichier. Vous pouvez aussi choisir le fichier vous-même dans la [dernière version](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest) :

| Appareil | Fichier |
|---|---|
| Windows | `KoreShelf-<version>-windows-x64.exe` |
| Mac | `KoreShelf-<version>-macos-universal.dmg` |
| Linux (PC avec Intel ou AMD) | `KoreShelf-<version>-x86_64.AppImage` |
| Linux (ARM, par ex. Raspberry Pi) | `KoreShelf-<version>-aarch64.AppImage` |
| Android | `KoreShelf-<version>-android.apk` |
| iPhone / iPad | `KoreShelf-<version>-ios-unsigned.ipa` |

KoreShelf n'a pas de certificat de signature payant : la première fois que vous l'ouvrez, votre système vous demande une confirmation. Cela n'arrive qu'une fois.

#### Windows
1. Téléchargez le fichier `.exe` et double-cliquez dessus. KoreShelf s'ouvre dans sa propre fenêtre ; il n'y a rien à installer.
2. Si Windows affiche « Windows a protégé votre ordinateur », cliquez sur **Informations complémentaires**, puis sur **Exécuter quand même**.

#### Mac
1. Téléchargez le fichier `.dmg`, ouvrez-le et faites glisser KoreShelf dans Applications.
2. La première fois, macOS bloque l'app. Ouvrez **Réglages Système → Confidentialité et sécurité**, faites défiler vers le bas et cliquez sur **Ouvrir quand même**.

#### Linux
1. Téléchargez le fichier `.AppImage` adapté à votre ordinateur (voir *Quel fichier ?* plus bas).
2. Rendez-le exécutable : clic droit, **Propriétés → Autoriser l'exécution du fichier comme un programme**, ou `chmod +x KoreShelf-*.AppImage` dans un terminal.
3. Double-cliquez sur le fichier.

**Quel fichier ?** Chaque ordinateur a un « cerveau », qu'on appelle le processeur. Il existe deux grandes familles de processeurs, et chaque fichier ne fonctionne qu'avec la sienne :

| Si votre ordinateur a… | on l'appelle | téléchargez |
|---|---|---|
| un processeur Intel ou AMD (presque tous les PC et portables) | x86_64, aussi écrit amd64 ou x64 | `KoreShelf-<version>-x86_64.AppImage` |
| un processeur ARM (Raspberry Pi, certains portables récents) | aarch64, aussi écrit arm64 | `KoreShelf-<version>-aarch64.AppImage` |

Vous ne savez pas ? Ouvrez un terminal, tapez `uname -m` et appuyez sur Entrée. Si vous voyez `x86_64`, prenez le premier fichier ; si vous voyez `aarch64`, le second. Le site [koreshelf.github.io](https://koreshelf.github.io) essaie de le deviner pour vous.

#### Android
1. Téléchargez le fichier `.apk` sur votre téléphone, ouvrez-le et appuyez sur **Installer**.
2. Si on vous le demande, autorisez votre navigateur à installer des applis inconnues.
3. Si vous utilisiez la version 3.x : la nouvelle app s'installe à côté de l'ancienne. Ajoutez de nouveau vos livres, puis désinstallez l'ancienne app.

#### iPhone et iPad
Apple n'autorise les apps hors de l'App Store qu'avec des outils dédiés, c'est pourquoi le fichier `.ipa` n'est pas signé.
1. Sur un ordinateur, installez un outil de sideloading comme AltStore, SideStore ou Sideloadly et connectez-vous avec votre identifiant Apple.
2. Téléchargez le fichier `.ipa` et installez-le sur votre appareil avec cet outil.
3. Sur l'appareil, faites confiance au développeur dans **Réglages → Général → VPN et gestion de l'appareil**. Depuis iOS 16, il faut aussi activer le **Mode développeur** dans **Réglages → Confidentialité et sécurité**.

Avec un identifiant Apple gratuit, l'app doit être renouvelée tous les 7 jours. AltStore peut s'en charger automatiquement.

### Auto-hébergement avec Docker

Vous pouvez faire tourner KoreShelf sur un serveur domestique, un NAS ou un Raspberry Pi et l'ouvrir depuis le navigateur de n'importe quel appareil de votre réseau. L'image est disponible pour PC (amd64) et pour les cartes ARM comme le Raspberry Pi 4/5 et la plupart des NAS (arm64). Docker choisit tout seul la bonne pour votre serveur.

1. Installez Docker : Docker Desktop sous Windows et macOS, ou Docker Engine avec le plugin Compose sous Linux.
2. Créez un dossier, copiez-y le fichier [`docker-compose.yml`](../docker-compose.yml) de ce projet et lancez :
   ```bash
   docker compose up -d
   ```
3. Ouvrez `http://ADRESSE-DU-SERVEUR:3000`, ou `http://localhost:3000` sur le même ordinateur.

Sans fichier compose :
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

Les livres, les couvertures et la base de données sont stockés dans le volume `koreshelf-data`, monté sur `/data`, et sont conservés lors des mises à jour. Pour faire une sauvegarde :
```bash
docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .
```

Mettre à jour : `docker compose pull && docker compose up -d`

Autres options :
- Mot de passe : définissez `KORESHELF_PASSWORD` dans `docker-compose.yml` et, si vous le souhaitez, `KORESHELF_USERNAME` (par défaut `koreshelf`). Le navigateur demandera les deux.
- Passage depuis la version Docker 3.x : dans `docker-compose.yml`, retirez le `#` devant `- ./public:/app/public:ro` et lancez-le depuis le dossier de l'ancienne installation. Au premier démarrage, votre bibliothèque est importée dans `/data`.
- Si le port 3000 est déjà utilisé sur le serveur, changez le nombre de gauche, par exemple `"8080:3000"`, et ouvrez le port 8080 à la place.
- Variables d'environnement : `KORESHELF_PORT` (3000 par défaut), `KORESHELF_HOST` (`0.0.0.0` par défaut), `KORESHELF_DATA` (`/data` par défaut).

> [!WARNING]
> KoreShelf est prévu pour un réseau domestique. Ne l'exposez pas directement sur internet. Pour y accéder de l'extérieur, placez-le derrière un reverse proxy en HTTPS (par exemple Caddy, Nginx Proxy Manager ou Traefik) ou utilisez un VPN comme Tailscale, et définissez un mot de passe. Sans HTTPS, le mot de passe circule en clair.

Le serveur fonctionne aussi sans Docker : `koreshelf --server` accepte les mêmes réglages.

### Utilisation

Quand vous ouvrez KoreShelf, vous voyez votre étagère.

- La première fois, appuyez sur *Essayer un livre d'exemple*. Un livre court arrive sur l'étagère et vous présente l'app pendant que vous le lisez.
- Pour ajouter des livres, appuyez sur *+ Uploader Ebook* ou faites glisser des fichiers EPUB et PDF sur la fenêtre.
- Pour lire, appuyez sur *Commencer la lecture* (ou *Reprendre la lecture*) sous le livre du milieu. Les actions moins fréquentes sont dans le menu *Plus*.
- *Gérer* permet de créer, renommer et supprimer des étagères et de déplacer plusieurs livres à la fois.
- Pour quitter, fermez la fenêtre. Si vous ouvrez KoreShelf alors qu'il tourne déjà, la fenêtre existante revient au premier plan.

### La liseuse

- Elle ouvre les EPUB (texte qui s'adapte à l'écran) et les PDF (mise en page fixe). Vous pouvez lire page par page ou en défilement continu.
- Le texte des PDF peut être sélectionné et souligné comme dans les EPUB.
- Les PDF sans couverture en reçoivent une, tirée de leur première page.
- Sélectionnez une phrase pour la souligner. Les passages soulignés sont enregistrés et vous les retrouvez sur le tableau.
- La police, la taille du texte, l'interligne et l'alignement (gauche, centré, droite, justifié) se règlent dans le panneau latéral.
- Il y a un thème clair et un thème sombre.
- Votre progression apparaît sous la forme d'un ruban rouge sur le livre 3D, au pourcentage exact déjà lu.
- Quand vous terminez un livre, vous pouvez lui donner de 1 à 5 étoiles et écrire un court avis. La note est imprimée en doré au dos de la couverture.
- La table des matières fonctionne avec les EPUB et PDF structurés. Les PDF numérisés qui n'en ont pas disposent d'un sélecteur de page.
- Le champ de recherche en haut à droite trouve des mots et des phrases dans le livre et les surligne dans le texte.

### Le tableau des passages soulignés

Au-dessus des étagères se trouve un tableau en bois. Chaque livre qui contient des passages soulignés y a son propre post-it.

- Les flèches gauche et droite permettent de passer d'une page de post-it à l'autre, même quand il y en a des centaines.
- Les nouveaux passages soulignés apparaissent tout de suite sur le tableau, sans recharger.
- Cliquez sur un post-it pour lire, modifier ou supprimer ses passages soulignés.
- Chaque citation peut être partagée sous forme d'image 1080×1080 avec la couverture et les informations du livre, prête pour Instagram, Facebook, X ou WhatsApp, ou enregistrée sur l'appareil.

### Vos données

La bibliothèque est rangée dans son propre dossier : vous pouvez mettre à jour ou déplacer KoreShelf sans rien perdre.

- Windows : `%APPDATA%\KoreShelf` (à coller dans la barre d'adresse de l'Explorateur de fichiers)
- Mac : `~/Library/Application Support/KoreShelf`
- Linux : `~/.local/share/KoreShelf`

Vous y trouverez `ebooks/` (vos livres), `covers/` (les couvertures), `koreshelf.db` (la base de données SQLite avec les métadonnées, la progression de lecture, les catégories et les passages soulignés) et `koreshelf.log` (utile en cas de problème).

Mode portable sous Windows, par exemple sur une clé USB : créez un dossier nommé `KoreShelf_Data` à côté de `KoreShelf.exe`, et vos données y seront enregistrées.

Avec *Modifier les métadonnées*, vous pouvez changer le titre, l'auteur, la description et la catégorie, ou importer votre propre couverture. Le livre 3D est mis à jour immédiatement.

Passage depuis la version 3.x sur ordinateur :
- Windows : placez le nouveau `.exe` dans le dossier qui contient l'ancien dossier `public` et ouvrez-le. La bibliothèque est importée au premier lancement.
- Mac et Linux : KoreShelf fermé, copiez `koreshelf.db`, `covers` et `ebooks` depuis l'ancien dossier `public` vers le dossier indiqué ci-dessus, en remplaçant les fichiers déjà présents.

### Fichiers volumineux ou endommagés

- Les EPUB et PDF de plusieurs dizaines de milliers de pages sont traités sans bloquer l'app.
- Un fichier endommagé ou inhabituel est signalé à part ; le reste de la bibliothèque continue de fonctionner.
- Quand un ISBN est trouvé, KoreShelf cherche la couverture et le résumé sur Apple Books et Google Books.
- Un même livre ne peut pas être importé deux fois.

### Petits écrans

Dans les fenêtres étroites, le texte des boutons laisse la place à des icônes pour que rien ne se chevauche. Sur téléphone, l'interface passe à une disposition pensée pour le tactile.

### Langues

KoreShelf est disponible en anglais, italien, espagnol, français et allemand. Vous changez de langue dans la barre du haut (sur téléphone : *Plus*, puis langue), et votre choix est mémorisé.

Pour ajouter une langue, consultez [CONTRIBUTING.md](../CONTRIBUTING.md).

### Dépannage

**« Windows a protégé votre ordinateur » ou « Apple n'a pas pu vérifier KoreShelf »**
C'est la confirmation du premier lancement décrite plus haut. Sous Windows, cliquez sur **Informations complémentaires → Exécuter quand même** ; sur Mac, allez dans **Réglages Système → Confidentialité et sécurité → Ouvrir quand même**.

**Sous Windows, KoreShelf s'ouvre dans le navigateur au lieu de sa propre fenêtre**
La fenêtre utilise Microsoft Edge WebView2, fourni avec Windows 10 et 11. S'il manque, KoreShelf s'ouvre dans le navigateur et explique comment l'installer.

**Autre problème**
Ouvrez `koreshelf.log` dans le dossier des données (voir *Vos données*) et joignez-le à un [rapport de bug](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### Compiler depuis les sources

KoreShelf est écrit en Rust (serveur et fenêtre de bureau), avec une interface en Vite et Three.js. Les apps pour téléphone utilisent Tauri 2.

```bash
cargo build --release      # l'app de bureau, dans target/release/
cargo test --no-default-features
```

La structure du projet, les tests de bout en bout et la création des paquets sont décrits dans [CONTRIBUTING.md](../CONTRIBUTING.md).
