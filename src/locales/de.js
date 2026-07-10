export default {
    // Top Bar
    manageShelf: " Verwalten",
    manageShelfTooltip: "Diese Kategorie umbenennen oder löschen",
    searchPlaceholder: "Suche nach Titel oder Autor...",
    uploadBtn: "+ E-Book hochladen",
    loading: "Wird geladen...",
    uploadingStatus: "⏳ Hochladen",

    // Info Panel (Bottom)
    showSynopsis: "Zusammenfassung anzeigen",
    showCover: "Cover anzeigen",

    assignCategory: " Kategorie zuweisen",
    moveBookTitle: "Verschieben",
    saveBtn: "Speichern",
    categoryPrompt: "Geben Sie den neuen Kategorienamen für dieses Buch ein:",

    deleteBook: " Löschen",
    deleteConfirm: "Sind Sie sicher, dass Sie \"{title}\" ENDGÜLTIG löschen möchten?\nDiese Aktion entfernt die Datei von Ihrem Computer und kann nicht rückgängig gemacht werden.",
    serverError: "Fehler bei der Verbindung zum Server.",
    cancelBtn: "Abbrechen",

    readBook: " Buch lesen",

    // Dynamic labels and states
    uncategorized: "Nicht kategorisiert",
    shelfLabel: "📁 ",
    shelfTitlePrefix: "📁 ",
    noCover: "[ Kein Cover gefunden ]",
    allCategories: "Alle Kategorien",

    // Help Modal
    helpClose: "Verstanden!",

    // Reader
    epubError: "EPUB-Datei für dieses Buch nicht gefunden!",
    darkMode: "Dunkler Modus",
    lightMode: "Heller Modus",

    // Upload Results
    uploadComplete: "Upload abgeschlossen!",
    added: "Hinzugefügt",
    duplicates: "Duplikate ignoriert",
    errors: "Fehler",

    // load books 
    textureError: "Textur konnte nicht geladen werden: ",
    shelfLog: "Regal {name} in Höhe {y} erstellt",
    texturesSuccess: "Aktive Regal-Texturen für {cat} geladen.",
    allTexturesLoaded: "🎉 Alle Texturen wurden verzögerungsfrei im Hintergrund geladen!",
    loadingPdf: "PDF wird geladen...",

    // 3D Book Back
    backIn: "In: ",
    backPages: "Geschätzte Seiten: ",

    // Action Messages
    categoryCreated: "Kategorie erstellt!",
    categoryExisting: "Kategorie existiert bereits",
    existingCategoriesSubtitle: "Bestehende Kategorien in der Bibliothek:",
    moveSuccess: "Erfolgreich verschoben!",
    selectBookError: "Bitte wählen Sie mindestens ein Buch aus.",
    genericError: "Ein Fehler ist aufgetreten.",

    //category manager
    catManagerTitle: "⚙️ Bibliotheksverwaltung",
    catManagerSubtitle: "Wählen Sie das Regal aus, das Sie verwalten möchten:",
    booksCount: "Bücher",
    
    // Actions Menu
    shelfOptions: "Regal-Optionen",
    systemShelfNote: "Dies ist das Systemregal. Sie können es verwenden, um Bücher in neue Kategorien zu sortieren, aber Sie können es weder umbenennen noch löschen.",
    renameShelfBtn: "✏️ Kategorie umbenennen",
    createNewCatBtn: "📦 Neue Kategorie erstellen (Bücher von hier verschieben)",
    addBooksToCatBtn: "📥 Bücher zu dieser Kategorie hinzufügen",
    deleteShelfBtn: "🗑️ Kategorie löschen",

    // Rename View
    renameTitle: "✏️ Regal umbenennen",
    chooseNewName: "Wählen Sie einen neuen Namen für",
    emptyNameAlert: "Der Regalname darf nicht leer sein!",
    sameNameAlert: "Bitte geben Sie einen anderen Namen als den aktuellen ein.",
    saving: "Wird gespeichert...",

    //edit 
    editMetadata: " Metadaten bearbeiten",
    editMetadataTitle: "Metadaten bearbeiten",
    editTitle: "Titel",
    editAuthor: "Autor",
    editCategory: "Kategorie",
    editDescription: "Beschreibung",
    editCover: "Neues Cover (Optional)",
    clickToChooseFile: "📁 Klicken, um eine Datei auszuwählen...",
    errorSaving: "Fehler beim Speichern:",
    errorGeneric: "Fehler!",
    
    // Create and Move View
    createMoveTitle: "📦 Erstellen und Verschieben",
    selectToMove: "Wählen Sie Bücher zum Entfernen aus",
    selectAll: "Alle",
    noBooksOnShelf: "Keine Bücher in diesem Regal.",
    newCatNameLabel: "Neuer Kategoriename:",
    newCatPlaceholder: "Tippen Sie den neuen Namen...",
    transferBtn: "Übertragen",
    selectMoveError: "Wählen Sie mindestens ein Buch zum Verschieben aus.",
    writeCatNameError: "Geben Sie den Namen des neuen Regals ein.",
    
    // Import View
    importTitle: "📥 Bücher hinzufügen",
    selectToImport: "Wählen Sie Bücher aus, die importiert werden sollen in",
    allBooksAlreadyHere: "Alle Bücher sind bereits hier.",
    importSelectedBtn: "📥 Ausgewählte hierher importieren",
    selectImportError: "Wählen Sie mindestens ein Buch aus der Liste.",
    
    // Delete View
    deleteTitle: "🗑️ Regal löschen",
    deleteWarningTitle: "Warnung!",
    deleteWarningText: "Sie sind im Begriff, die Kategorie \"{cat}\" zu löschen.\nEs werden keine Dateien gelöscht, aber alle Bücher in diesem Regal werden in \"Nicht kategorisiert\" verschoben.",
    confirmDeleteBtn: "Löschen bestätigen",

    credits: "&copy; 2026 KoreShelf - Alle Rechte vorbehalten. Erstellt von",

    //help guide 
    closeReader: "Buch schließen",
    personalizeReader: "Personalisieren",
    defaultfromBook: "Standard vom Buch",
    font: "Schriftart",
    lineHeight: "Zeilenhöhe",
    textSize: "Textgröße",
    readingMode: "Lesemodus",
    horizontal: "Paginiert (Horizontal)",
    vertical: "Kontinuierliches Scrollen (Vertikal)",
    textAlignment: "Textausrichtung",
    helpTitle: "📖 Wie es funktioniert",
    helpContent: `
        <li><b>Buch hochladen:</b> Klicken Sie auf den Upload-Button (oder ziehen Sie eine Datei per Drag & Drop), um Ihre persönlichen <b>.epub</b>- oder <b>.pdf</b>-Dateien hinzuzufügen.</li>
        <li><b>Suchen:</b> Nutzen Sie die obere Leiste, um schnell ein Buch nach Titel, Autor oder Kategorie zu finden.</li>
        <li><b>Regal-Navigation:</b> Scrollen Sie horizontal (wischen oder ←/→ Pfeile), um Werke zu durchsuchen, und vertikal (↑/↓), um die Kategorien zu wechseln.</li>
        <li><b>Organisieren und Verwalten:</b> Verwenden Sie "🏷️ Kategorie zuweisen", um Bände zu klassifizieren, oder "⚙️ Verwalten" für erweiterte Bibliotheksvorgänge.</li>
        <li><b>✏️ Metadaten bearbeiten:</b> Klicken Sie bei einem beliebigen Buch auf "Bearbeiten", um Titel, Autor, Beschreibung oder Kategorie manuell zu ändern. Sie können auch ein benutzerdefiniertes hochauflösendes Cover hochladen. Das 3D-Modell wird sofort aktualisiert.</li>
        <li><b>Erweitertes Lesen:</b> Klicken Sie auf ein Buch, um es zu öffnen. Der Reader unterstützt nativ sowohl <b>EPUB</b> (fließendes Format) als auch <b>PDF</b> (festes Format).</li>
        <li><b>Reader-Anpassung (Hamburger-Menü):</b> Öffnen Sie das Seitenmenü (≡), um Folgendes anzupassen:
            <ul>
                <li><b>Zoom:</b> Vergrößern Sie Text oder Seiten für optimales Lesen.</li>
                <li><b>Schrift & Zeilenhöhe:</b> Passen Sie den typografischen Stil an (nur EPUB).</li>
                <li><b>Lesemodus:</b> Wählen Sie zwischen "Paginiert" (horizontal) oder "Kontinuierliches Scrollen" (vertikal).</li>
                <li><b>Textausrichtung:</b> Richten Sie den Text links, rechts oder zentriert aus (nur EPUB).</li>
            </ul>
        </li>
        <li><b style="color: #f1c40f;">✍️ Markierungen & 3D-Pinnwand:</b> Wählen Sie beim Lesen Text aus, um Ihre Lieblingssätze zu unterstreichen. Ihre Markierungen erscheinen automatisch als <b>Post-it-Notizen auf der 3D-Pinnwand</b> über Ihrer Bibliothek!</li>
        <li><b>Dunkler/Heller Modus:</b> Klicken Sie auf das Symbol oben rechts, um das Thema umzuschalten und die Augen zu schonen.</li>
        <li><b>Entdecken:</b> Verwenden Sie "Zusammenfassung anzeigen", um das 3D-Buch zu drehen und die Zusammenfassung auf der Rückseite zu lesen.</li>
        <li><b style="color: #d9534f;"> Ausschalten:</b> Verwenden Sie die "Ausschalten"-Taste oben rechts, um Ihre Sitzung zu beenden und den lokalen Server sicher zu schließen.</li>
    `,
    donateBtn: "💙 Spenden",

    emptyLibraryMessage: "Ihre Bibliothek ist leer. Klicken Sie auf '+ E-Book hochladen', um Ihre Sammlung zu beginnen!",
    
    //review
    readerReviewBtnText: "⭐ Sie sind fertig! Schreiben Sie eine Rezension",
    reviewModalTitleLong: "Was denken Sie über dieses Buch?",
    reviewPlaceholderHot: "Schreiben Sie hier Ihre frischen Gedanken...",
    saveMemoriesBtn: "In Erinnerungen speichern",
    selectStarAlert: "Bitte wählen Sie mindestens einen Stern aus!",
    savingReview: "⏳ Wird gespeichert...",
    reviewSavedBtn: "✅ Rezension gespeichert!",
    errorRetry: "Fehler. Versuchen Sie es erneut.",

    //synopsis on back of the book
    authorLabel: "Autor:",
    fullPlotTitle: "Zusammenfassung",
    noDescription: "Keine Zusammenfassung verfügbar.",
    closeBtn: "Schließen",

    //update 
    updateAvailable: "Update verfügbar!",
    updateDownload: "Jetzt herunterladen",

    //shutdown server
    shutdownBtn: "Ausschalten",
    shutdownTooltip: "Lokalen KoreShelf-Server herunterfahren",
    shutdownConfirm: "Möchten Sie KoreShelf wirklich herunterfahren? Die Anwendung wird geschlossen.",
    shutdownTitle: "KoreShelf Ausgeschaltet",
    shutdownMessage: "Der lokale Server wurde heruntergefahren. Sie können dieses Fenster nun sicher schließen.",

    //server.js locales
    errNoFile: "Keine Datei hochgeladen.",
    errFormat: "Nicht unterstütztes Format. Verwenden Sie EPUB oder PDF.",
    errDuplicate: "Dieses Buch befindet sich bereits in Ihrem Regal!",
    successUpload: "Buch verarbeitet und erfolgreich hinzugefügt!",
    errInternal: "Interner Serverfehler.",
    errInvalidTag: "Ungültiger Tag.",
    errNotFound: "Buch nicht gefunden.",
    successTagAdded: "Tag hinzugefügt!",
    successTagExists: "Tag existiert bereits.",
    successDelete: "Buch erfolgreich gelöscht!",
    errNoBooksCat: "Keine Bücher für diese Kategorie gefunden.",
    successBulkMove: "{count} Bücher verschoben.",
    errNoBooksUpdated: "Keine Bücher aktualisiert.",
    successShutdown: "Server fährt herunter...",

    // cover image generator
    logpdfjs: "⚠️ pdf.js nicht verfügbar, PDF-Cover können nicht generiert werden.",
    logGeneratePdfCovers: "🎨 {count} PDFs ohne Cover gefunden. Generierung läuft...",
    logGeneratePdfCover: "📖 Generiere Cover für: {title}",
    logCoverGenerated: "✅ Cover generiert für: {title}",
    logCoverGenerationError: "⚠️ Fehler beim Laden des Covers für {title}: {statusText}",
    logCoverGenerationFailed: "⚠️ Cover für {title} konnte nicht generiert werden: {errorMessage}",
    logPdfCoversGenerated: "🎉 PDF-Cover erfolgreich generiert!",

    removeHighlightConfirm: "Möchten Sie diese Markierung löschen?",
    manageHighlightsTitle: "Markierungen verwalten",
    moreHighlightsHint: "+{extraCount} weitere... (Klicken)",
    manageHighlightHint: "Klicken zum Verwalten",

    confirmHighlight: "Möchten Sie diesen Text markieren?",

    shareQuoteBtn: "🔗 Teilen",
    shareQuoteFallback: "Bild heruntergeladen! Teilen Sie es, wo immer Sie wollen.",
    shareQuoteBrand: "Generiert von KoreShelf",
    previewTitle: "Bildvorschau",
    downloadBtn: "Herunterladen",
    shareNotSupported: "Ihr Gerät/Browser unterstützt kein natives Teilen. Nutzen Sie den Download-Button!",

    tableOfContents: "Inhaltsverzeichnis",
    noTocFound: "Kein Inhaltsverzeichnis gefunden. Schnellsprung nutzen:",

    //--------------------------------------------------server.js locales-------------------------------------------------------------

    logUploadDirCreated: "📁 Upload-Verzeichnis automatisch erstellt.",
    logCoversDirCreated: "📁 Cover-Verzeichnis automatisch erstellt.",
    logBooksJsonCreated: "📄 Datei 'books.json' automatisch erstellt.",
    errDockerBooksJson: "⚠️ KRITISCHER FEHLER: Docker hat 'books.json' als Verzeichnis statt als Datei erstellt! Verzeichnis löschen und neu starten.",

    logCorruptedMetadata: "⚠️ Beschädigte Metadaten erkannt! Dateiname wird verwendet...",
    logFoundDash: "🪄 Bindestrich gefunden! Titel: \"{title}\", Autor: \"{author}\"",
    unknownAuthor: "Unbekannter Autor",
    errEpubImageExtract: "⚠️ Bild konnte nicht aus EPUB extrahiert werden:",
    errEpubParse: "EPUB-Parsing-Fehler:",

    logCorruptedPdfMetadata: "⚠️ PDF-Metadaten fehlen oder sind beschädigt! Dateiname wird verwendet...",
    logPdfCoverGenerated: "📸 Erste PDF-Seite erfolgreich in ein Cover umgewandelt!",
    errPdfCoverGen: "⚠️ Cover konnte nicht aus PDF generiert werden:",
    errPdfParse: "PDF-Parsing-Fehler:",

    errEpubTimeout: "Zeitüberschreitung: Das EPUB ist fehlerhaft oder zu komplex und hat den Lesevorgang blockiert.",
    errPdfTimeout: "⚠️ Zeitüberschreitung von {dynamicTimeout}ms für das PDF überschritten. Extraktion unterbrochen, um RAM zu sparen.",

    unknownTitle: "Unbekannter Titel",
    noPlotFound: "Handlung nicht gefunden.",
    logContactApple: "🍏 Apple Books wird für Zusammenfassung kontaktiert: {url}",
    errAppleTimeout: "⚠️ Apple Books hat nicht rechtzeitig geantwortet.",
    logPagesCalculated: "🧮 Seiten mathematisch aus Text berechnet: {count}",
    logPagesRandom: "⚠️ Text für Berechnung konnte nicht gelesen werden, zufällige Dicke wird verwendet.",

    errAppleCoverDownload: "⚠️ Fehler beim Herunterladen des Covers von Apple Books:",

    logUploadStart: "\n📥 Starte Verarbeitung von: {file}...",
    logExtractingMetadata: "⚙️  Extrahiere Metadaten und internes Cover...",
    logUploadBlocked: "🛑 Upload blockiert: \"{title}\" ist bereits in der Bibliothek.",
    logInitialData: "✔️  Erste Daten: \"{title}\" von {author}",
    logWaitAppleAPI: "⏳ Anfängliche Wartezeit, um Apple-APIs nicht zu überlasten...",
    logSearchAppleBooks: "🔍 Suche Daten bei Apple Books...",
    logAutoCorrectTitle: "✨ Autokorrektur: Titel korrigiert zu \"{finalTitle}\"",
    logDownloadCoverMissing: "🖼️  Cover fehlt im EPUB. Lade von Apple Books herunter...",
    noDescriptionAvailable: "Keine Zusammenfassung für dieses Buch verfügbar.",
    logValidEpubPlot: "📖 Gültige Zusammenfassung im EPUB gefunden!",
    logPlotDownloaded: "🌐 EPUB-Zusammenfassung fehlt oder ist ungültig. Zusammenfassung von Apple Books heruntergeladen.",
    logUpdatingLibrary: "📝 Bibliothek wird aktualisiert...",
    logUploadSuccess: "✅ Erfolg! \"{title}\" zum Regal hinzugefügt.\n",
    errCriticalUpload: "❌ Kritischer Fehler bei der Buchverarbeitung:",
    logEpubTimeoutCalc: "📊 EPUB-Größe: {fileSizeMB} MB | Timeout: {dynamicTimeout}ms",
    logPdfTimeoutCalc: "📊 PDF-Größe: {fileSizeMB} MB | Timeout: {dynamicTimeout}ms",

    logFilesAlreadyMissing: "⚠️ Buch aus Datenbank entfernt, physische Dateien fehlten jedoch bereits.",
    logDeleteSuccess: "🗑️ Erfolgreich gelöscht: \"{title}\"",
    errDeleteBook: "Fehler beim Löschen des Buches:",

    successCatUpdate: "Kategorie für {count} Bücher erfolgreich aktualisiert.",
    errCategoryManager: "Fehler beim Verwalten von Kategorien:",

    errBulkUpdate: "Fehler während des Massen-Updates:",

    errProgressUpdate: "Fehler beim Speichern des Lesefortschritts:",

    errSaveReview: "Fehler beim Speichern der Rezension:",

    logShieldActivated: "\n🛡️ SCHILD AKTIVIERT: Ein kritischer Fehler versuchte, den Server zum Absturz zu bringen!",
    errEpub2Crash: "⚠️ Ursache: Eine fehlerhafte EPUB-Datei brachte die Bibliothek \"epub2\" zum Absturz.",
    solutionCalibre: "👉 Lösung: Verwenden Sie Calibre, um das EPUB in EPUB zu konvertieren (um den internen Code zu bereinigen) und laden Sie es neu hoch.\n",
    errUnexpected: "❌ Unerwarteter Fehler:",

    logShutdownRequest: "🛑 Herunterfahren-Anfrage vom Client empfangen. Server fährt herunter...",

    logServerListening: "🚀 Backend hört auf http://localhost:{port}",
    errOpenBrowser: "Browser konnte nicht automatisch geöffnet werden (bitte manuell öffnen):",
    terminal_sync: "Terminal synchronisiert auf: {lang}",

    logFoundISBN: "🏷️ [Scanner] ISBN gefunden: {isbn}",
    logNoISBNFound: "🏷️ [Scanner] Keine ISBN in der Datei gefunden. Text-Fallback wird verwendet.",

    shieldUnhandledRejection: "🛡️ SCHILD AKTIVIERT: Unhandled Rejection abgefangen!",
    shieldReason: "Grund:",
    shieldServerContinues: "Der Server läuft normal weiter.",
    monkeyPatchSuccess: "✅ epub2 Monkey-Patch erfolgreich angewendet!",
    monkeyPatchError: "⚠️ epub2 Monkey-Patch konnte nicht angewendet werden:",
    epubCorruptedFallback: "⚠️ Beschädigtes oder fehlerhaftes EPUB. Dateiname wird als Fallback verwendet.",
    noInternalCover: "🎨 PDF ohne internes Cover. Das Frontend generiert das Cover aus der ersten Seite.",
    
    walkNavMapWarning: "⚠️ walkNavMap Fehler abgefangen und unterdrückt:"
};