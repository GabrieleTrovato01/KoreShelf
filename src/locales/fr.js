export default {
    // Top Bar
    manageShelf: " Gérer",
    manageShelfTooltip: "Renommer ou supprimer cette catégorie",
    searchPlaceholder: "Rechercher par titre ou auteur...",
    uploadBtn: "+ Uploader Ebook",
    loading: "Chargement...",
    uploadingStatus: "⏳ Chargement en cours",

    // Info Panel (Bottom)
    showSynopsis: "Afficher le synopsis",
    showCover: "Afficher la couverture",

    assignCategory: " Assigner une catégorie",
    moveBookTitle: "Déplacer",
    saveBtn: "Enregistrer",
    categoryPrompt: "Entrez le nom de la nouvelle catégorie pour ce livre :",

    deleteBook: " Supprimer",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer DÉFINITIVEMENT \"{title}\" ?\nCette action supprimera le fichier de votre ordinateur et ne peut pas être annulée.",
    serverError: "Erreur de connexion au serveur.",
    cancelBtn: "Annuler",

    readBook: " Lire le livre",

    // Dynamic labels and states
    uncategorized: "Non classé",
    shelfLabel: "📁 ",
    shelfTitlePrefix: "📁 ",
    noCover: "[ Aucune couverture ]",
    allCategories: "Toutes les catégories",

    // Help Modal
    helpClose: "J'ai compris !",

    // Reader
    epubError: "Fichier EPUB introuvable pour ce livre !",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",

    // Upload Results
    uploadComplete: "Upload terminé !",
    added: "Ajoutés",
    duplicates: "Doublons ignorés",
    errors: "Erreurs",

    // load books 
    textureError: "Impossible de charger la texture : ",
    shelfLog: "Étagère {name} créée à la hauteur {y}",
    texturesSuccess: "Textures de l'étagère active pour {cat} chargées.",
    allTexturesLoaded: "🎉 Toutes les textures ont été chargées en arrière-plan sans lag !",
    loadingPdf: "Chargement du PDF...",

    // 3D Book Back
    backIn: "Dans : ",
    backPages: "Pages est. : ",

    // Action Messages
    categoryCreated: "Catégorie créée !",
    categoryExisting: "Catégorie déjà existante",
    existingCategoriesSubtitle: "Catégories existantes dans la bibliothèque :",
    moveSuccess: "Déplacement terminé !",
    selectBookError: "Veuillez sélectionner au moins un livre.",
    genericError: "Une erreur est survenue.",

    //category manager
    catManagerTitle: "⚙️ Gestion de la bibliothèque",
    catManagerSubtitle: "Sélectionnez l'étagère que vous souhaitez gérer :",
    booksCount: "livres",
    
    // Actions Menu
    shelfOptions: "Options de l'étagère",
    systemShelfNote: "Ceci est l'étagère système. Vous pouvez l'utiliser pour trier des livres dans de nouvelles catégories, mais vous ne pouvez pas la renommer ou la supprimer.",
    renameShelfBtn: "✏️ Renommer la catégorie",
    createNewCatBtn: "📦 Créer une nouvelle catégorie (Déplacer des livres d'ici)",
    addBooksToCatBtn: "📥 Ajouter des livres à cette catégorie",
    deleteShelfBtn: "🗑️ Supprimer la catégorie",

    // Rename View
    renameTitle: "✏️ Renommer l'étagère",
    chooseNewName: "Choisissez un nouveau nom pour",
    emptyNameAlert: "Le nom de l'étagère ne peut pas être vide !",
    sameNameAlert: "Veuillez entrer un nom différent du nom actuel.",
    saving: "Enregistrement...",

    //edit 
    editMetadata: " Modifier les métadonnées",
    editMetadataTitle: "Modifier les métadonnées",
    editTitle: "Titre",
    editAuthor: "Auteur",
    editCategory: "Catégorie",
    editDescription: "Description",
    editCover: "Nouvelle couverture (Optionnel)",
    clickToChooseFile: "📁 Cliquez pour choisir un fichier...",
    errorSaving: "Erreur lors de l'enregistrement :",
    errorGeneric: "Erreur !",
    
    // Create and Move View
    createMoveTitle: "📦 Créer et Déplacer",
    selectToMove: "Sélectionnez les livres à retirer de",
    selectAll: "Tous",
    noBooksOnShelf: "Aucun livre sur cette étagère.",
    newCatNameLabel: "Nouveau nom de catégorie :",
    newCatPlaceholder: "Tapez le nouveau nom...",
    transferBtn: "Transférer",
    selectMoveError: "Sélectionnez au moins un livre à déplacer.",
    writeCatNameError: "Tapez le nom de la nouvelle étagère.",
    
    // Import View
    importTitle: "📥 Ajouter des livres",
    selectToImport: "Sélectionnez les livres à apporter à",
    allBooksAlreadyHere: "Tous les livres sont déjà ici.",
    importSelectedBtn: "📥 Importer la sélection ici",
    selectImportError: "Sélectionnez au moins un livre dans la liste.",
    
    // Delete View
    deleteTitle: "🗑️ Supprimer l'étagère",
    deleteWarningTitle: "Avertissement !",
    deleteWarningText: "Vous êtes sur le point de supprimer la catégorie \"{cat}\".\nAucun fichier ne sera supprimé, mais tous les livres de cette étagère retourneront dans \"Non classé\".",
    confirmDeleteBtn: "Confirmer la suppression",

    credits: "&copy; 2026 KoreShelf - Tous droits réservés. Créé par",

    //help guide 
    closeReader: "Fermer le livre",
    personalizeReader: "Personnaliser",
    defaultfromBook: "Par défaut du livre",
    font: "Police",
    lineHeight: "Hauteur de ligne",
    textSize: "Taille du texte",
    readingMode: "Mode de lecture",
    horizontal: "Paginé (Horizontal)",
    vertical: "Défilement continu (Vertical)",
    textAlignment: "Alignement du texte",
    helpTitle: "📖 Comment ça marche",
    helpContent: `
        <li><b>Uploader un livre :</b> Cliquez sur le bouton de chargement (ou faites glisser un fichier) pour ajouter vos fichiers <b>.epub</b> ou <b>.pdf</b> personnels.</li>
        <li><b>Rechercher :</b> Utilisez la barre supérieure pour trouver rapidement un livre en entrant le titre, l'auteur ou la catégorie.</li>
        <li><b>Navigation :</b> Faites défiler horizontalement (swipe ou flèches ←/→) pour parcourir les ouvrages, et verticalement (↑/↓) pour changer de catégorie.</li>
        <li><b>Organiser et gérer :</b> Utilisez "🏷️ Assigner une catégorie" pour classer vos volumes, ou "⚙️ Gérer" pour les opérations avancées de la bibliothèque.</li>
        <li><b>✏️ Modifier les métadonnées :</b> Cliquez sur le bouton "Modifier" sur n'importe quel livre pour modifier manuellement le titre, l'auteur, la description ou la catégorie. Vous pouvez également télécharger une couverture personnalisée haute résolution, et le modèle 3D sera mis à jour instantanément.</li>
        <li><b>Lecture avancée :</b> Cliquez sur un livre pour l'ouvrir. Le lecteur supporte nativement <b>EPUB</b> (format fluide) et <b>PDF</b> (format fixe).</li>
        <li><b>Personnalisation du lecteur (Menu Hamburger) :</b> Ouvrez le menu latéral (≡) pour ajuster :
            <ul>
                <li><b>Zoom :</b> Agrandissez le texte ou les pages pour une lecture optimale.</li>
                <li><b>Police et interligne :</b> Personnalisez le style typographique (EPUB uniquement).</li>
                <li><b>Mode de défilement :</b> Choisissez entre "Paginé" (horizontal) ou "Défilement continu" (vertical) pour une expérience de type web.</li>
                <li><b>Alignement du texte :</b> Alignez le texte à gauche, à droite ou au centre (EPUB uniquement).</li>
            </ul>
        </li>
        <li><b style="color: #f1c40f;">✍️ Surlignages et Tableau 3D :</b> Sélectionnez n'importe quel texte pendant la lecture pour souligner vos phrases préférées. Vos extraits apparaîtront automatiquement sous forme de <b>post-it sur le tableau 3D</b> flottant au-dessus de votre bibliothèque !</li>
        <li><b>Mode Sombre/Clair :</b> Cliquez sur l'icône en haut à droite pour basculer les thèmes et réduire la fatigue oculaire.</li>
        <li><b>Explorer :</b> Utilisez "Afficher le synopsis" pour faire pivoter le livre 3D et lire le synopsis sur la quatrième de couverture.</li>
        <li><b style="color: #d9534f;"> Éteindre :</b> Utilisez le bouton "Éteindre" en haut à droite pour terminer votre session et fermer le serveur local en toute sécurité.</li>
    `,
    donateBtn: "💙 Faire un don",

    emptyLibraryMessage: "Votre bibliothèque est vide. Cliquez sur '+ Uploader Ebook' pour commencer votre collection !",
    
    //review
    readerReviewBtnText: "⭐ Vous avez terminé ! Écrire une critique",
    reviewModalTitleLong: "Que pensez-vous de ce livre ?",
    reviewPlaceholderHot: "Écrivez vos pensées ici...",
    saveMemoriesBtn: "Sauvegarder dans les Souvenirs",
    selectStarAlert: "Veuillez sélectionner au moins une étoile !",
    savingReview: "⏳ Sauvegarde...",
    reviewSavedBtn: "✅ Critique enregistrée !",
    errorRetry: "Erreur. Réessayez.",

    //synopsis on back of the book
    authorLabel: "Auteur :",
    fullPlotTitle: "Synopsis",
    noDescription: "Aucun synopsis disponible.",
    closeBtn: "Fermer",

    //update 
    updateAvailable: "Mise à jour disponible !",
    updateDownload: "Télécharger maintenant",

    //shutdown server
    shutdownBtn: "Éteindre",
    shutdownTooltip: "Éteindre le serveur local KoreShelf",
    shutdownConfirm: "Voulez-vous vraiment éteindre KoreShelf ? L'application va se fermer.",
    shutdownTitle: "KoreShelf éteint",
    shutdownMessage: "Le serveur local a été éteint. Vous pouvez fermer cette fenêtre en toute sécurité.",

    //server.js locales
    errNoFile: "Aucun fichier uploadé.",
    errFormat: "Format non supporté. Utilisez EPUB ou PDF.",
    errDuplicate: "Ce livre est déjà sur votre étagère !",
    successUpload: "Livre traité et ajouté avec succès !",
    errInternal: "Erreur interne du serveur.",
    errInvalidTag: "Tag invalide.",
    errNotFound: "Livre introuvable.",
    successTagAdded: "Tag ajouté !",
    successTagExists: "Le tag existe déjà.",
    successDelete: "Livre supprimé avec succès !",
    errNoBooksCat: "Aucun livre trouvé pour cette catégorie.",
    successBulkMove: "{count} livres déplacés.",
    errNoBooksUpdated: "Aucun livre mis à jour.",
    successShutdown: "Arrêt du serveur en cours...",

    // cover image generator
    logpdfjs: "⚠️ pdf.js non disponible, impossible de générer les couvertures PDF.",
    logGeneratePdfCovers: "🎨 {count} PDF sans couverture trouvés. Génération en cours...",
    logGeneratePdfCover: "📖 Génération de la couverture pour : {title}",
    logCoverGenerated: "✅ Couverture générée pour : {title}",
    logCoverGenerationError: "⚠️ Erreur lors du chargement de la couverture pour {title} : {statusText}",
    logCoverGenerationFailed: "⚠️ Impossible de générer la couverture pour {title} : {errorMessage}",
    logPdfCoversGenerated: "🎉 Couvertures PDF générées !",

    removeHighlightConfirm: "Voulez-vous supprimer ce surlignage ?",
    manageHighlightsTitle: "Gérer les surlignages",
    moreHighlightsHint: "+{extraCount} de plus... (Cliquez)",
    manageHighlightHint: "Cliquez pour gérer",

    confirmHighlight: "Voulez-vous surligner ce texte ?",

    shareQuoteBtn: "Partager",
    shareQuoteFallback: "Image téléchargée ! Partagez-la où vous voulez.",
    shareQuoteBrand: "Généré par KoreShelf",
    previewTitle: "Personnaliser et Partager",
    previewFormat: "Format",
    previewBgStyle: "Style de Fond",
    previewBgColor: "Fond",
    previewTextColor: "Texte",
    formatPost: "Publication Carrée",
    formatStory: "Story (9:16)",
    bgStyleBlur: "Couverture Floutée",
    bgStyleSolid: "Couleur Unie",
    downloadBtn: "Télécharger", 
    shareNotSupported: "Votre appareil/navigateur ne prend pas en charge le partage natif. Utilisez le bouton Télécharger !",

    tableOfContents: "Table des matières",
    noTocFound: "Aucune table des matières trouvée. Utilisez le saut rapide :",
    searchPlaceholder: "Rechercher dans le livre...",
    noResultsFound: "Aucun résultat trouvé.",
    noMoreResults: "Aucun autre résultat trouvé.",

    //--------------------------------------------------server.js locales-------------------------------------------------------------

    logUploadDirCreated: "📁 Répertoire d'upload créé automatiquement.",
    logCoversDirCreated: "📁 Répertoire des couvertures créé automatiquement.",
    logBooksJsonCreated: "📄 Fichier 'books.json' créé automatiquement.",
    errDockerBooksJson: "⚠️ ERREUR CRITIQUE : Docker a créé 'books.json' en tant que répertoire ! Supprimez-le et redémarrez.",

    logCorruptedMetadata: "⚠️ Métadonnées corrompues détectées ! Utilisation du nom de fichier...",
    logFoundDash: "🪄 Tiret trouvé ! Titre : \"{title}\", Auteur : \"{author}\"",
    unknownAuthor: "Auteur inconnu",
    errEpubImageExtract: "⚠️ Impossible d'extraire l'image de l'EPUB :",
    errEpubParse: "Erreur d'analyse EPUB :",

    logCorruptedPdfMetadata: "⚠️ Métadonnées PDF manquantes ou corrompues ! Utilisation du nom de fichier...",
    logPdfCoverGenerated: "📸 Première page du PDF transformée en couverture avec succès !",
    errPdfCoverGen: "⚠️ Impossible de générer la couverture à partir du PDF :",
    errPdfParse: "Erreur d'analyse PDF :",

    errEpubTimeout: "Délai d'attente : L'EPUB est malformé ou trop complexe et a bloqué le processus de lecture.",
    errPdfTimeout: "⚠️ Délai de {dynamicTimeout}ms dépassé pour le PDF. Extraction interrompue pour libérer la RAM.",

    unknownTitle: "Titre inconnu",
    noPlotFound: "Synopsis introuvable.",
    logContactApple: "🍏 Contact avec Apple Books pour le synopsis : {url}",
    errAppleTimeout: "⚠️ Apple Books n'a pas répondu à temps.",
    logPagesCalculated: "🧮 Pages calculées mathématiquement à partir du texte : {count}",
    logPagesRandom: "⚠️ Impossible de lire le texte, utilisation d'une épaisseur aléatoire.",

    errAppleCoverDownload: "⚠️ Erreur lors du téléchargement de la couverture depuis Apple Books :",

    logUploadStart: "\n📥 Début du traitement de : {file}...",
    logExtractingMetadata: "⚙️ Extraction des métadonnées et de la couverture interne...",
    logUploadBlocked: "🛑 Upload bloqué : \"{title}\" est déjà dans la bibliothèque.",
    logInitialData: "✔️ Données initiales : \"{title}\" par {author}",
    logWaitAppleAPI: "⏳ Attente initiale pour éviter de surcharger les APIs d'Apple...",
    logSearchAppleBooks: "🔍 Recherche sur Apple Books...",
    logAutoCorrectTitle: "✨ Autocorrection : Titre corrigé en \"{finalTitle}\"",
    logDownloadCoverMissing: "🖼️ Couverture manquante. Téléchargement depuis Apple Books...",
    noDescriptionAvailable: "Aucun synopsis disponible pour ce livre.",
    logValidEpubPlot: "📖 Synopsis valide trouvé dans l'EPUB !",
    logPlotDownloaded: "🌐 Synopsis téléchargé depuis Apple Books.",
    logUpdatingLibrary: "📝 Mise à jour de la bibliothèque...",
    logUploadSuccess: "✅ Succès ! \"{title}\" ajouté à l'étagère.\n",
    errCriticalUpload: "❌ Erreur critique lors du traitement du livre :",
    logEpubTimeoutCalc: "📊 Taille EPUB : {fileSizeMB} MB | Délai : {dynamicTimeout}ms",
    logPdfTimeoutCalc: "📊 Taille PDF : {fileSizeMB} MB | Délai : {dynamicTimeout}ms",

    logFilesAlreadyMissing: "⚠️ Livre supprimé de la base de données, mais les fichiers physiques étaient déjà absents.",
    logDeleteSuccess: "🗑️ Supprimé avec succès : \"{title}\"",
    errDeleteBook: "Erreur lors de la suppression du livre :",

    successCatUpdate: "Catégorie mise à jour avec succès pour {count} livres.",
    errCategoryManager: "Erreur de gestion des catégories :",

    errBulkUpdate: "Erreur lors de la mise à jour en masse :",

    errProgressUpdate: "Erreur lors de l'enregistrement de la progression :",

    errSaveReview: "Erreur lors de l'enregistrement de la critique :",

    logShieldActivated: "\n🛡️ BOUCLIER ACTIVÉ : Une erreur critique a tenté de faire planter le serveur !",
    errEpub2Crash: "⚠️ Cause : Un fichier EPUB malformé a fait planter \"epub2\".",
    solutionCalibre: "👉 Solution : Utilisez Calibre pour convertir l'EPUB en EPUB (pour nettoyer son code interne) et ré-uploadez-le.\n",
    errUnexpected: "❌ Erreur inattendue :",

    logShutdownRequest: "🛑 Requête d'arrêt reçue du client. Arrêt du serveur...",

    logServerListening: "🚀 Backend à l'écoute sur http://localhost:{port}",
    errOpenBrowser: "Impossible d'ouvrir le navigateur automatiquement :",
    terminal_sync: "Terminal synchronisé en : {lang}",

    logFoundISBN: "🏷️ [Scanner] ISBN trouvé : {isbn}",
    logNoISBNFound: "🏷️ [Scanner] Aucun ISBN trouvé. Poursuite avec le fallback textuel.",

    shieldUnhandledRejection: "🛡️ BOUCLIER ACTIVÉ : Rejet non géré intercepté !",
    shieldReason: "Raison :",
    shieldServerContinues: "Le serveur continue de fonctionner normalement.",
    monkeyPatchSuccess: "✅ Monkey-patch epub2 appliqué avec succès !",
    monkeyPatchError: "⚠️ Impossible d'appliquer le monkey-patch pour epub2 :",
    epubCorruptedFallback: "⚠️ EPUB corrompu ou malformé. Utilisation du nom de fichier comme fallback.",
    noInternalCover: "🎨 PDF sans couverture interne. Le frontend va générer la couverture.",
    
    walkNavMapWarning: "⚠️ Erreur walkNavMap interceptée et ignorée :",
};