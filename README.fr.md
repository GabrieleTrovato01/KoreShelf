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

Une bibliothèque numérique 3D interactive qui vous permet de télécharger, de parcourir et d'organiser vos fichiers EPUB et PDF dans un environnement graphique immersif.

### ⚙️ Configuration système requise
Pour exécuter ce projet, aucune configuration de serveur ni installation de Node.js n'est requise ! Les prérequis dépendent entièrement de votre choix :

- **Application portable (recommandée) :** Aucun logiciel externe n'est nécessaire. Il suffit de télécharger, d'extraire et d'exécuter le projet.

- **Version Docker :** Un seul programme gratuit est nécessaire : Docker, qui exécutera l'application web de manière isolée et sécurisée.


### 🚀 Guide d'installation (étape par étape)

Il existe deux façons d'exécuter KoreShelf.

#### Option 1 : La solution de facilité (Application de bureau portable - Recommandée)

Si vous souhaitez éviter d'installer Docker ou Node.js, vous pouvez utiliser notre exécutable autonome disponible pour Windows, Linux et macOS (Apple Silicon).

1. Rendez-vous dans la section [Releases](https://github.com/GabrieleTrovato01/KoreShelf/releases) de ce dépôt.

2. Téléchargez le fichier `.zip` correspondant à votre système d'exploitation.

3. Extrayez le contenu dans un dossier de votre choix sur votre ordinateur.

- **Windows :** Double-cliquez sur `koreshelf-win.exe`.

- **Linux :** Ouvrez le terminal dans le dossier et exécutez `./koreshelf-linux`. (Remarque : vous devrez peut-être le rendre exécutable au préalable avec la commande `chmod +x koreshelf-linux`).

- **macOS (Apple Silicon / M1, M2, M3...) :** En raison de la mise en quarantaine stricte des applications non signées par Apple, ouvrez votre terminal dans le dossier extrait et exécutez les deux commandes suivantes pour accorder les autorisations :

    ```bash

    chmod +x koreshelf-macos-arm

    xattr -cr koreshelf-macos-arm
    ```

    Double-cliquez ensuite sur le fichier ou exécutez `./koreshelf-macos-arm`.

*(Remarque pour les utilisateurs de Mac Intel : les binaires précompilés ne sont pas disponibles pour les anciens Mac Intel. Veuillez utiliser l’option 2 : Docker, ou exécuter l’application à partir du code source.)*

**Remarque concernant la sécurité :** Ce projet étant un projet open source indépendant sans signature numérique payante, SmartScreen ou Gatekeeper peuvent afficher un avertissement au premier lancement. Cliquez simplement sur « Plus d’infos » puis sur « Exécuter quand même » pour commencer ; le code source est entièrement transparent et disponible ici.

#### Option 2 : Méthode avancée (Docker - Pour développeurs/Linux/macOS)

Si vous préférez exécuter le projet via Docker ou si vous utilisez un système d'exploitation autre que Windows, suivez les étapes ci-dessous.

**Étape 1 : Installation de Docker**

- **Windows / macOS :** Téléchargez et installez [Docker Desktop](https://www.docker.com/products/docker-desktop/). Lancez-le et assurez-vous que Docker est en cours d'exécution en arrière-plan.

- **Linux :** Ouvrez le terminal et installez Docker Engine et le plugin Compose (par exemple, sous Ubuntu : `sudo apt install docker.io docker-compose-v2`).

**Étape 2 : Lancement de la bibliothèque 3D**

1. Téléchargez ce projet sur votre ordinateur (via `git clone` ou en téléchargeant le fichier ZIP).

2. Ouvrez le terminal directement dans le dossier du projet (où se trouve le fichier `docker-compose.yml`). 3. Saisissez cette commande et appuyez sur Entrée :

    ```bash

    docker compose up -d --build
    ```

### 🎮 Comment utiliser l'application

Une fois le terminal chargé, la bibliothèque est prête !

Ouvrez votre navigateur préféré (Chrome, Edge, Safari) et rendez-vous à l'adresse :

👉 **http://localhost:3000**

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

### 📌 Tableau des passages surlignés (Palais de la mémoire)

Vos annotations méritent mieux qu'une simple liste. KoreShelf propose un **tableau des passages surlignés 3D** unique qui s'affiche au-dessus de votre bibliothèque :

- **Post-it visuels :** Chaque livre contenant des passages surlignés apparaît sous forme de post-it sur un tableau virtuel en bois.

- **Navigation multipage :** Parcourez tous vos passages surlignés à l'aide des flèches gauche/droite, même si vous en avez des centaines.

- **Synchronisation en temps réel :** Les passages surlignés ajoutés dans le lecteur apparaissent instantanément sur le tableau, sans rechargement.

- **Gestion rapide :** Cliquez sur un post-it pour afficher, modifier ou supprimer un passage surligné.

- **Partage de citations :** Partagez vos citations préférées en un clic ! KoreShelf génère automatiquement une élégante image carrée (1080 x 1080) avec votre citation, la couverture du livre et les métadonnées, prête à être partagée sur Instagram, Facebook, X, WhatsApp ou téléchargée.

### 📁 Gestion des données (Vos livres)

L'application est intelligente et synchronise vos données avec votre ordinateur. Dans le dossier du projet, vous trouverez les dossiers suivants dans le répertoire `public/` (créé automatiquement au premier lancement) :

- `ebooks/` : Vos livres (EPUB/PDF) sont enregistrés ici.

- `covers/` : Les couvertures extraites pour la visualisation 3D sont enregistrées ici.

- `koreshelf.db` : Il s'agit de la base de données SQLite robuste contenant les métadonnées de votre bibliothèque, votre progression de lecture, vos étiquettes et vos passages surlignés.

**✏️ Métadonnées personnalisées (modification à chaud) :**

Vous contrôlez entièrement vos données. Cliquez sur le bouton « Modifier » de n'importe quel livre pour modifier manuellement le titre, l'auteur, la description ou lui attribuer une catégorie personnalisée. Vous pouvez même importer une couverture personnalisée en haute définition. La base de données SQLite et le dossier `covers/` sont mis à jour instantanément, et le modèle 3D reflète les changements en temps réel sans recharger la page !

### 🛡️ Serveur à toute épreuve

KoreShelf est conçu pour gérer tous les ebooks :

- **Prise en charge des fichiers volumineux :** Les délais d’attente dynamiques et l’analyse optimisée permettent le traitement des EPUB et PDF de plusieurs dizaines de milliers de pages sans bloquer le serveur.

- **Protection contre les plantages :** La gestion globale des erreurs et les correctifs pour les bibliothèques externes garantissent le fonctionnement continu du serveur, même avec des fichiers corrompus.

- **Extraction intelligente des métadonnées :** Détection automatique de l’ISBN et utilisation d’Apple Books/Google Books pour les couvertures et les résumés.

- **Détection des doublons :** Empêche le chargement du même livre deux fois.

### 📱 Interface utilisateur adaptative

Pour une gestion optimale de votre espace de travail, l'interface s'adapte automatiquement aux écrans et fenêtres de petite taille. Le texte des boutons se réduit élégamment à des icônes épurées pour éviter tout chevauchement, garantissant ainsi une expérience utilisateur fluide sur tous les appareils et toutes les tailles de fenêtre.

**Remarque :** Ces dossiers sont protégés et ignorés par Git (grâce au fichier `.gitignore`). Vous pouvez ajouter autant de livres que vous le souhaitez sans risquer de les publier accidentellement en ligne si vous publiez le code sur GitHub !

### 🌍 Prise en charge multilingue (i18n)

KoreShelf prend en charge l'internationalisation (i18n) grâce à un système de chargement asynchrone garantissant des performances optimales et un démarrage instantané. Actuellement, l'application est disponible en anglais, italien, espagnol, français et allemand.

Vous pouvez changer de langue instantanément grâce au bouton dédié dans la barre de navigation supérieure. Votre préférence linguistique est automatiquement enregistrée dans votre navigateur via `localStorage`.

**Vous souhaitez ajouter une nouvelle langue ?**

Ajouter une traduction est très simple :

1. Accédez au dossier `src/locales/`, dupliquez le fichier `en.js` et renommez-le avec le code de votre langue (par exemple, `es.js` pour l'espagnol).

2. Traduisez les chaînes de caractères dans l'objet JavaScript exporté.

3. Mettez à jour la logique de `langBtn` dans `src/main.js` pour inclure votre nouvelle langue dans le cycle de basculement.

### 🆘 Dépannage

**Erreur rouge lors de l'installation : `CustomEvent is not defined`**
Vous utilisez une version obsolète de Node.js dans le Dockerfile. Assurez-vous d'utiliser le code mis à jour, où le `Dockerfile` commence par `FROM node:22-bookworm-slim` pour prendre en charge Vite.

**Erreur de terminal : `port is already allocated`**
Un autre programme utilise déjà le port 3000. Fermez-le ou ouvrez le fichier `docker-compose.yml` et remplacez le port `"3000:3000"` par `"8080:3000"`, puis accédez à l'application via `localhost:8080`.

**Les couvertures des PDF ne s'affichent pas ?**
Les couvertures sont générées automatiquement à partir de la première page du PDF directement dans le navigateur. Si un fichier PDF est particulièrement volumineux ou corrompu, le système effectuera une recherche de couverture en ligne via Apple Books.


<br>
<hr>
<br>