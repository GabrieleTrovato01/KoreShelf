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

Une bibliothèque numérique 3D interactive qui vous permet de télécharger, de parcourir et d'organiser vos fichiers EPUB et PDF dans un environnement graphique immersif.

### ⚙️ Configuration système requise

Depuis la version 4.0.0, KoreShelf tient en **un seul fichier** : pas de Node.js, rien d'autre à installer. Pour un serveur domestique, il existe aussi une image Docker (voir plus bas).

- **Windows :** Windows 10 ou 11.
- **Mac :** puces Apple et Intel (un seul fichier universel).
- **Linux :** toute distribution récente 64 bits (x86_64).
- **Android :** tout téléphone ou tablette Android.
- **iPhone / iPad :** réservé aux utilisateurs avancés (voir plus bas).

### 🚀 Téléchargement et installation

Le plus simple est le site **[koreshelf.github.io](https://koreshelf.github.io)** : il reconnaît votre appareil et vous propose le bon fichier.
Vous pouvez aussi choisir le fichier vous-même dans la [dernière version publiée](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest) :

| Appareil | Fichier |
|---|---|
| Windows | `KoreShelf-<version>-windows-x64.exe` |
| Mac | `KoreShelf-<version>-macos-universal.dmg` |
| Linux | `KoreShelf-<version>-x86_64.AppImage` |
| Android | `KoreShelf-<version>-android.apk` |
| iPhone / iPad | `KoreShelf-<version>-ios-unsigned.ipa` |

KoreShelf est gratuit et n'a pas de certificat payant : **la première fois**, votre système demande donc une confirmation. C'est normal et cela n'arrive qu'une fois.

#### 🪟 Windows
1. Téléchargez le fichier `.exe` et double-cliquez dessus : KoreShelf s'ouvre dans sa propre fenêtre, il n'y a rien à installer.
2. Si Windows affiche « Windows a protégé votre ordinateur », cliquez sur **Informations complémentaires → Exécuter quand même**.

#### 🍎 Mac
1. Téléchargez le fichier `.dmg`, ouvrez-le et faites glisser **KoreShelf** dans **Applications**.
2. La première fois, macOS bloque l'app : ouvrez **Réglages Système → Confidentialité et sécurité**, descendez et cliquez sur **Ouvrir quand même**.

#### 🐧 Linux
1. Téléchargez le fichier `.AppImage`.
2. Rendez-le exécutable : clic droit → **Propriétés → Autoriser l'exécution comme un programme** (ou `chmod +x KoreShelf-*.AppImage` dans un terminal).
3. Double-cliquez sur le fichier.

#### 🤖 Android
1. Téléchargez le fichier `.apk` sur votre téléphone, ouvrez-le et appuyez sur **Installer**.
2. Si on vous le demande, autorisez votre navigateur à installer des applis inconnues.
3. Vous venez de la version 3.x ? La nouvelle app s'installe à côté de l'ancienne : ajoutez à nouveau vos livres, puis vous pourrez désinstaller l'ancienne app.

#### 📱 iPhone et iPad (utilisateurs avancés)
Apple n'autorise les apps hors de l'App Store qu'avec des outils dédiés : le fichier `.ipa` n'est donc pas signé.
1. Sur un ordinateur, installez un outil comme AltStore, SideStore ou Sideloadly et connectez-vous avec votre identifiant Apple.
2. Téléchargez le fichier `.ipa` et installez-le sur votre iPhone ou iPad avec cet outil.
3. Sur l'appareil, faites confiance au développeur dans **Réglages → Général → VPN et gestion de l'appareil**. Depuis iOS 16, il faut aussi activer le **Mode développeur** (**Réglages → Confidentialité et sécurité**).

Avec un identifiant Apple gratuit, l'app doit être renouvelée tous les 7 jours (AltStore le fait pour vous).

### 🐳 Auto-hébergement avec Docker (serveur domestique, NAS, Raspberry Pi)

Gardez KoreShelf allumé sur un serveur domestique et ouvrez-le depuis le navigateur de n'importe quel appareil de votre réseau. L'image fonctionne sur PC (amd64) et sur les cartes ARM comme le Raspberry Pi 4/5 et la plupart des NAS (arm64).

1. Installez Docker (Docker Desktop sous Windows et Mac, ou Docker Engine avec le plugin Compose sous Linux).
2. Créez un dossier, placez-y le fichier [`docker-compose.yml`](../docker-compose.yml) de ce projet et lancez :
   ```bash
   docker compose up -d
   ```
3. Ouvrez `http://ADRESSE-DU-SERVEUR:3000` (sur le même ordinateur : `http://localhost:3000`).

Sans le fichier compose :
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

- **Vos données** (livres, couvertures, base de données) sont dans le volume `koreshelf-data`, monté sur `/data`, et sont conservées lors des mises à jour. Sauvegarde : `docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .`
- **Mettre à jour :** `docker compose pull && docker compose up -d`
- **Mot de passe (facultatif) :** définissez `KORESHELF_PASSWORD` (et si vous le souhaitez `KORESHELF_USERNAME`, par défaut `koreshelf`) dans `docker-compose.yml` : le navigateur les demandera.
- **Vous venez de la version Docker 3.x ?** Dans `docker-compose.yml`, retirez le `#` devant la ligne `- ./public:/app/public:ro` (à lancer depuis le dossier de l'ancienne installation) : au premier démarrage, votre bibliothèque est importée dans `/data`.
- **Port 3000 déjà utilisé sur le serveur ?** Changez le nombre de gauche : `"8080:3000"`, puis ouvrez `http://ADRESSE-DU-SERVEUR:8080`.
- **Réglages :** `KORESHELF_PORT` (3000 par défaut), `KORESHELF_HOST` (`0.0.0.0` par défaut), `KORESHELF_DATA` (`/data` par défaut).

> [!WARNING]
> KoreShelf est prévu pour le réseau domestique. Ne l'exposez pas directement sur internet : pour y accéder de l'extérieur, placez-le derrière un reverse proxy en **HTTPS** (par exemple Caddy, Nginx Proxy Manager ou Traefik) ou utilisez un VPN comme Tailscale, et définissez un mot de passe. Sans HTTPS, le mot de passe circule en clair.

Même sans Docker, le programme KoreShelf peut servir de serveur : `koreshelf --server` (mêmes réglages).

### 🎮 Comment utiliser l'application

Ouvrez KoreShelf et votre étagère 3D apparaît.

- **Première fois ?** Appuyez sur *Essayer un livre d'exemple* : un petit livre arrive sur l'étagère et vous explique l'app pendant que vous le lisez.
- **Ajouter des livres :** appuyez sur *+ Uploader Ebook* ou faites glisser des fichiers EPUB et PDF sur la fenêtre.
- **Lire :** *Commencer la lecture* (ou *Reprendre la lecture*) sous le livre du milieu. Les actions moins fréquentes sont dans le menu *Plus*.
- **Ranger :** avec *Gérer*, vous renommez, créez ou supprimez des étagères et déplacez plusieurs livres à la fois.
- **Fermer :** fermez simplement la fenêtre. Si vous rouvrez KoreShelf pendant qu'il tourne, la fenêtre existante revient au premier plan.

### 📖 Lecteur EPUB et PDF intégré

KoreShelf n'est pas qu'une simple archive, c'est un environnement de lecture immersif et complet :

- **Lecteur double moteur intelligent :** Ouvrez directement dans votre navigateur n'importe quel fichier EPUB (mise en page adaptative) ou PDF (mise en page fixe). Basculez facilement entre le mode paginé (horizontal) et le mode défilement continu (vertical).

- **Sélection de texte PDF :** Grâce à TextLayer intégré, le texte des PDF devient sélectionnable et surlignable, comme pour les EPUB.

- **Couvertures PDF automatiques :** Les PDF sans couverture intégrée sont automatiquement générés dès la première page, directement dans le navigateur (sans dépendance externe comme ImageMagick).

- **Surlignage de texte :** Sélectionnez n'importe quel texte dans vos livres pour souligner les passages importants. Les surlignages sont enregistrés et peuvent être consultés à tout moment.

- **Personnalisation du lecteur :** Ajustez la police, la taille du texte, l'interligne et l'alignement (gauche, centré, droite, justifié) grâce à la barre latérale intelligente. - **Mode clair/sombre :** Basculez entre les thèmes en un clic pour réduire la fatigue oculaire.

- **Suivi de lecture :** Un marque-page physique en forme de ruban rouge se déplace le long de votre livre 3D sur l'étagère, affichant en un coup d'œil votre pourcentage de lecture.

- **Avis interactifs :** Une fois votre livre terminé (100 %), une fenêtre contextuelle vous invite à le noter (de 1 à 5 étoiles) et à rédiger votre avis. Votre note sera imprimée en lettres dorées au dos du livre 3D !

- **Table des matières intelligente :** Naviguez facilement dans les textes longs grâce au nouveau bouton Table des matières. Compatible avec les fichiers EPUB et PDF structurés, il offre une solution de repli intelligente avec un sélecteur de page rapide pour les PDF numérisés sans navigation interne.

- **Recherche textuelle** : Utilisez la barre de recherche en haut à droite du lecteur pour trouver des mots ou phrases spécifiques. Les résultats seront mis en surbrillance dans le texte.

### 📌 Tableau des passages surlignés (Palais de la mémoire)

Vos annotations méritent mieux qu'une simple liste. KoreShelf propose un **tableau des passages surlignés 3D** unique qui s'affiche au-dessus de votre bibliothèque :

- **Post-it visuels :** Chaque livre contenant des passages surlignés apparaît sous forme de post-it sur un tableau virtuel en bois.

- **Navigation multipage :** Parcourez tous vos passages surlignés à l'aide des flèches gauche/droite, même si vous en avez des centaines.

- **Synchronisation en temps réel :** Les passages surlignés ajoutés dans le lecteur apparaissent instantanément sur le tableau, sans rechargement.

- **Gestion rapide :** Cliquez sur un post-it pour afficher, modifier ou supprimer un passage surligné.

- **Partage de citations :** Partagez vos citations préférées en un clic ! KoreShelf génère automatiquement une élégante image carrée (1080 x 1080) avec votre citation, la couverture du livre et les métadonnées, prête à être partagée sur Instagram, Facebook, X, WhatsApp ou téléchargée.

### 📁 Gestion des données (Vos livres)

Votre bibliothèque est rangée dans un dossier à part : vous pouvez mettre à jour ou déplacer KoreShelf sans rien perdre.

- **Windows :** `%APPDATA%\KoreShelf` (à coller dans la barre d'adresse de l'Explorateur de fichiers)
- **Mac :** `~/Library/Application Support/KoreShelf`
- **Linux :** `~/.local/share/KoreShelf`

Vous y trouverez `ebooks/` (vos livres), `covers/` (les couvertures), `koreshelf.db` (la base SQLite avec métadonnées, progression de lecture, catégories et passages surlignés) et `koreshelf.log` (utile en cas de problème).

**💾 Version portable (Windows, par exemple sur une clé USB) :** créez un dossier nommé `KoreShelf_Data` à côté de `KoreShelf.exe` : vos données y seront enregistrées.

**✏️ Métadonnées personnalisées :** avec *Modifier les métadonnées*, vous changez titre, auteur, description et catégorie, ou ajoutez votre propre couverture. Le livre 3D se met à jour immédiatement.

**⬆️ Vous venez de la version 3.x (ordinateur) :**
- **Windows :** placez le nouveau `.exe` dans le dossier qui contient l'ancien dossier `public` et ouvrez-le : votre bibliothèque est importée automatiquement au premier lancement.
- **Mac et Linux :** KoreShelf fermé, copiez `koreshelf.db`, `covers` et `ebooks` de l'ancien dossier `public` vers le dossier indiqué ci-dessus (en remplaçant les fichiers existants).

### 🛡️ Serveur à toute épreuve

KoreShelf est conçu pour gérer tous les ebooks :

- **Prise en charge des fichiers volumineux :** Les délais d’attente dynamiques et l’analyse optimisée permettent le traitement des EPUB et PDF de plusieurs dizaines de milliers de pages sans bloquer le serveur.

- **Protection contre les plantages :** La gestion globale des erreurs et les correctifs pour les bibliothèques externes garantissent le fonctionnement continu du serveur, même avec des fichiers corrompus.

- **Extraction intelligente des métadonnées :** Détection automatique de l’ISBN et utilisation d’Apple Books/Google Books pour les couvertures et les résumés.

- **Détection des doublons :** Empêche le chargement du même livre deux fois.

### 📱 Interface utilisateur adaptative

Pour une gestion optimale de votre espace de travail, l'interface s'adapte automatiquement aux écrans et fenêtres de petite taille. Le texte des boutons se réduit élégamment à des icônes épurées pour éviter tout chevauchement, garantissant ainsi une expérience utilisateur fluide sur tous les appareils et toutes les tailles de fenêtre.

### 🌍 Prise en charge multilingue (i18n)

KoreShelf est disponible en français, anglais, italien, espagnol et allemand. Changez de langue avec le bouton de la barre du haut (sur téléphone : *Plus* → langue) ; votre choix est mémorisé.

Vous voulez ajouter une langue ? Les étapes sont dans [CONTRIBUTING.md](../CONTRIBUTING.md).

### 🆘 Dépannage

**« Windows a protégé votre ordinateur » ou « Apple n'a pas pu vérifier KoreShelf »**
C'est la confirmation du premier lancement décrite plus haut : sous Windows, cliquez sur **Informations complémentaires → Exécuter quand même** ; sur Mac, utilisez **Réglages Système → Confidentialité et sécurité → Ouvrir quand même**.

**Sous Windows, KoreShelf s'ouvre dans le navigateur au lieu de sa propre fenêtre**
Sa fenêtre utilise Microsoft Edge WebView2, inclus dans Windows 10 et 11. S'il manque, KoreShelf s'ouvre dans le navigateur et explique comment l'installer.

**Quelque chose ne fonctionne pas**
Ouvrez `koreshelf.log` dans le dossier des données (voir *Gestion des données*) et joignez-le à un [rapport de bug](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### 🛠️ Compiler depuis les sources (développeurs)

KoreShelf est écrit en Rust (serveur et fenêtre) avec une interface Vite + Three.js ; les apps mobiles utilisent Tauri 2.

```bash
cargo build --release      # l'app pour ordinateur, dans target/release/
cargo test --no-default-features
```

La structure du projet, les tests de bout en bout et la création des paquets sont expliqués dans [CONTRIBUTING.md](../CONTRIBUTING.md).
