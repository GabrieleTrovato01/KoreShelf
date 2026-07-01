export default {
        // Top Bar
        manageShelf: " Gestisci",
        manageShelfTooltip: "Rinomina o elimina questa categoria",
        searchPlaceholder: "Cerca per titolo o autore...",
        uploadBtn: "+ Carica Ebook",
        loading: "Caricamento...",
        uploadingStatus: "⏳ Carico",

        // Pannello Info (In basso)
        showSynopsis: "Mostra Trama",
        showCover: "Mostra Copertina",
       
        assignCategory: " Assegna Categoria",
        moveBookTitle: "Sposta",
        saveBtn: "Salva",
        categoryPrompt: "Scrivi il nome della categoria...",
        
        deleteBook: " Elimina",
        deleteConfirm: "Sei sicuro di voler eliminare DEFINITIVAMENTE \"{title}\"?\nL'azione cancellerà il file dal tuo computer e non può essere annullata.",
        serverError: "Errore di connessione al server.",
        cancelBtn: "Annulla",

        readBook: "Leggi Libro",

        // Etichette dinamiche e stati
        shelfLabel: "📁 ",
        shelfTitlePrefix: "📁 ",
        noCover: "[ Nessuna copertina trovata ]",
        allCategories: "Tutte le categorie",
        
        // Help Modal (index.html/main.js logic)
        helpClose: "Ho capito!",

        // Reader (reader.js)
        epubError: "File EPUB non trovato per questo libro!",
        darkMode: "Modalità Scura",
        lightMode: "Modalità Chiara",

        // Risultati Upload
        uploadComplete: "Upload completato!",
        added: "Aggiunti",
        duplicates: "Duplicati ignorati",
        errors: "Errori",

        //load books
        textureError: "Impossibile caricare texture: ",
        shelfLog: "Creata mensola {name} ad altezza {y}",
        texturesSuccess: "Texture mensola attiva {cat} caricate.",
        allTexturesLoaded: "🎉 Tutte le texture sono state caricate in background senza lag!",
        loadingPdf: "Caricamento PDF...",
        // Retro Libro 3D
        backIn: "In: ",
        backPages: "Pagine stimate: ",

        // Messaggi Azioni
        categoryCreated: "Categoria creata!",
        categoryExisting: "Categoria già esistente",
        moveSuccess: "Spostamento completato!",
        selectBookError: "Seleziona almeno un libro.",
        genericError: "Si è verificato un errore." , 
        existingCategoriesSubtitle: "Categorie già presenti nella libreria:",

        //category manager
        catManagerTitle: "⚙️ Gestione Libreria",
        catManagerSubtitle: "Seleziona la mensola su cui vuoi operare:",
        booksCount: "libri",
        
        // Menu Azioni
        shelfOptions: "Opzioni Mensola",
        systemShelfNote: "Questa è la mensola di sistema. Puoi usarla per smistare i libri in nuove categorie, ma non puoi rinominarla o eliminarla.",
        renameShelfBtn: "✏️ Rinomina Categoria",
        createNewCatBtn: "📦 Crea Nuova Categoria (Sposta libri da qui)",
        addBooksToCatBtn: "📥 Aggiungi libri a questa categoria",
        deleteShelfBtn: "🗑️ Elimina Categoria",
        
        // Vista Rinomina
        renameTitle: "✏️ Rinomina Mensola",
        chooseNewName: "Scegli un nuovo nome per",
        emptyNameAlert: "Il nome della mensola non può essere vuoto!",
        sameNameAlert: "Inserisci un nome diverso da quello attuale.",
        saving: "Salvataggio...",

        // Vista Modifica Metadati
        editMetadata: " Modifica Metadati",
        editMetadataTitle: "Modifica Metadati",
        editTitle: "Titolo",
        editAuthor: "Autore",
        editCategory: "Categoria",
        editDescription: "Descrizione",
        editCover: "Nuova Copertina (Opzionale)",
        clickToChooseFile: "📁 Clicca per scegliere un file...",
        errorSaving: "Errore durante il salvataggio:",
        errorGeneric: "Errore!",
        
        // Vista Crea e Sposta
        createMoveTitle: "📦 Crea e Sposta",
        selectToMove: "Seleziona i libri da togliere da",
        selectAll: "Tutti",
        noBooksOnShelf: "Nessun libro su questa mensola.",
        newCatNameLabel: "Nome per la nuova categoria:",
        newCatPlaceholder: "Scrivi il nuovo nome...",
        transferBtn: "Trasferisci",
        selectMoveError: "Seleziona almeno un libro da spostare.",
        writeCatNameError: "Scrivi il nome della nuova mensola.",
        
        // Vista Importa
        importTitle: "📥 Aggiungi Libri",
        selectToImport: "Seleziona i libri da portare su",
        allBooksAlreadyHere: "Tutti i libri della libreria sono già qui.",
        importSelectedBtn: "📥 Importa Selezionati Qui",
        selectImportError: "Seleziona almeno un libro dalla lista.",
        
        // Vista Elimina
        deleteTitle: "🗑️ Elimina Mensola",
        deleteWarningTitle: "Attenzione!",
        deleteWarningText: "Stai per eliminare la categoria \"{cat}\".\nNessun file verrà cancellato, ma tutti i libri torneranno in \"Senza Categoria\".",
        confirmDeleteBtn: "Conferma Eliminazione",

        credits: "&copy; 2026 KoreShelf - Tutti i diritti riservati. Creata da",

        // help guide
        // --- LETTORE E HELP MODAL ---
        closeReader: "Chiudi Libro",
        personalizeReader: "Personalizza",
        defaultfromBook: "Predefinito del libro",
        font: "Font",
        lineHeight: "Interlinea",
        textSize: "Dimensione Testo",
        readingMode: "Modalità di Lettura",
        horizontal: "Sfoglia Pagine (Orizzontale)",
        vertical: "Scorrimento (Verticale)",
        readerError: "ERRORE: Manca l'HTML del lettore in index.html!",
        textAlignment: "Allineamento",
        // --- HELP MODAL ---

        helpTitle: "📖 Come funziona",
        helpContent: `
            <li><b>Carica un libro:</b> Clicca sul pulsante di caricamento (o trascina un file) per aggiungere i tuoi file <b>.epub</b> o <b>.pdf</b> personali.</li>
            <li><b>Cerca:</b> Usa la barra in alto per trovare rapidamente un libro scrivendo il titolo, l'autore o la categoria.</li>
            <li><b>Navigazione Mensola:</b> Scorri lateralmente (swipe o frecce ←/→) per le opere, e verticalmente (↑/↓) per cambiare categoria.</li>
            <li><b>Organizza e Gestisci:</b> Usa "🏷️ Assegna Categoria" per classificare i volumi, o "⚙️ Gestisci" per le operazioni avanzate sulla libreria.</li>
            <li><b>✏️ Modifica Metadati:</b> Clicca il pulsante "Modifica" su qualsiasi libro per modificare manualmente il titolo, l'autore, la descrizione o la categoria. Puoi anche caricare una copertina personalizzata, e il modello 3D si aggiornerà istantaneamente.</li>
            <li><b>Lettura Avanzata:</b> Clicca sul libro per aprirlo. Il lettore supporta nativamente sia <b>EPUB</b> (formato fluido) che <b>PDF</b> (formato fisso).</li>
            <li><b>Personalizzazione Lettore (Menu Hamburger):</b> Apri il menu laterale (≡) per regolare:
                <ul>
                    <li><b>Zoom:</b> Ingrandisci il testo o le pagine per una lettura ottimale.</li>
                    <li><b>Font & Interlinea:</b> Personalizza lo stile tipografico (solo per EPUB).</li>
                    <li><b>Modalità di Flusso:</b> Scegli tra "Sfoglia Pagine" (orizzontale) o "Scorrimento Continuo" (verticale) per un'esperienza stile web.</li>
                    <li><b>Allineamento Testo:</b> Allinea il testo a sinistra, destra o al centro (solo EPUB).</li>
                </ul>
            </li>
            <li><b style="color: #f1c40f;">✍️ Sottolineature e Bacheca 3D:</b> Seleziona qualsiasi testo durante la lettura per sottolineare le tue frasi preferite. I tuoi highlight appariranno automaticamente come <b>post-it sulla bacheca 3D</b> che fluttua sopra la tua libreria! Usa le frecce laterali per sfogliare la tua collezione di note.</li>
            <li><b>Dark/Light Mode:</b> Clicca l'icona in alto a destra per alternare i temi ed evitare l'affaticamento visivo.</li>
            <li><b>Esplora:</b> Usa "Mostra Trama" per ruotare il libro 3D e leggere la sinossi sul retro.</li>
            <li><b style="color: #d9534f;">⏻ Spegnimento:</b> Usa il tasto "Spegni" in alto a destra per terminare la sessione e chiudere il server locale in totale sicurezza.</li>
        `,
        donateBtn: " Supporta",
        // Aggiungi questo in fondo all'oggetto export default
        emptyLibraryMessage: "La tua libreria è vuota. Clicca su '+ Carica Ebook' per iniziare la tua collezione!",
        //recensione
        readerReviewBtnText: "⭐ Hai finito! Scrivi una Recensione",
        reviewModalTitleLong: "Cosa ne pensi di questo libro?",
        reviewPlaceholderHot: "Scrivi qui le tue riflessioni a caldo...",
        saveMemoriesBtn: "Salva nei Ricordi",
        selectStarAlert: "Seleziona almeno una stella!",
        savingReview: "⏳ Salvataggio...",
        reviewSavedBtn: "✅ Recensione Salvata!",
        errorRetry: "Errore. Riprova.",
        //trama sul retro del libro 3D

        authorLabel: "Autore:",
        fullPlotTitle: "Trama",
        noDescription: "Nessuna trama disponibile.",
        closeBtn: "Chiudi",

        //update 
        updateAvailable: "Aggiornamento disponibile!",
        updateDownload: "Scarica ora",

        // Spegnimento Server
        shutdownBtn: "Spegni",
        shutdownTooltip: "Spegni il server locale di KoreShelf",
        shutdownConfirm: "Vuoi davvero spegnere KoreShelf? L'applicazione verrà chiusa.",
        shutdownTitle: "KoreShelf disattivato",
        shutdownMessage: "Il server locale è stato spento. Puoi chiudere questa finestra.",

         // cover image generator
         
        logpdfjs: "⚠️ pdf.js non disponibile, impossibile generare copertine PDF.",
        logGeneratePdfCovers: "🎨 Trovati {count} PDF senza copertina. Generazione in corso...",
        logGeneratePdfCover: "📖 Generazione copertina per: {title}",
        logCoverGenerated: "✅ Copertina generata per: {title}",
        logCoverGenerationError: "⚠️ Errore caricamento copertina per {title}: {statusText}",
        logCoverGenerationFailed: "⚠️ Impossibile generare copertina per {title}: {errorMessage}",
        logPdfCoversGenerated: "🎉 Generazione copertine PDF terminata!",

        removeHighlightConfirm: "Vuoi eliminare questa sottolineatura?",
        manageHighlightsTitle: "Gestione Sottolineature",
        moreHighlightsHint: "+{extraCount} altre... (Clicca)",
        manageHighlightHint: "Clicca per gestire",

        confirmHighlight: "Vuoi sottolineare questo testo?",

        //-----------------------------------------------------server.js locales...-----------------------------------------------------
        errNoFile: "Nessun file caricato.",
        errFormat: "Formato non supportato. Usa EPUB o PDF.",
        errDuplicate: "Questo libro è già nella tua libreria!",
        successUpload: "Libro elaborato e aggiunto con successo!",
        errInternal: "Errore interno del server.",
        errInvalidTag: "Tag non valido.",
        errNotFound: "Libro non trovato.",
        successTagAdded: "Tag aggiunto!",
        successTagExists: "Tag già esistente.",
        successDelete: "Libro eliminato con successo!",
        errNoBooksCat: "Nessun libro trovato per questa categoria.",
        successBulkMove: "Spostati {count} libri.",
        errNoBooksUpdated: "Nessun libro aggiornato.",
        successShutdown: "Server in fase di spegnimento",

        logUploadDirCreated: "📁 Cartella 'uploads' creata automaticamente.",
        logCoversDirCreated: "📁 Cartella 'covers' creata automaticamente.",
        logBooksJsonCreated: "📄 File 'books.json' creato automaticamente.",
        errDockerBooksJson: "⚠️ ERRORE CRITICO: Docker ha creato 'books.json' come cartella invece che come file! Elimina la cartella e riavvia.",

        logCorruptedMetadata: "⚠️ Metadati corrotti rilevati! Uso il nome del file...",
        logFoundDash: "🪄 Trovato un trattino! Titolo: \"{title}\", Autore: \"{author}\"",
        unknownAuthor: "Autore Sconosciuto",
        errEpubImageExtract: "⚠️ Impossibile estrarre l'immagine dall'EPUB:",
        errEpubParse: "Errore di parsing EPUB:",

        logCorruptedPdfMetadata: "⚠️ Metadati PDF assenti o corrotti! Uso il nome del file...",
        logPdfCoverGenerated: "📸 Prima pagina PDF trasformata con successo in copertina!",
        errPdfCoverGen: "⚠️ Impossibile generare la copertina dal PDF:",
        errPdfParse: "Errore di parsing PDF:",

        errEpubTimeout: "Timeout: L'EPUB è malformato o troppo complesso e ha bloccato la lettura.",
        errPdfTimeout: "⚠️ Timeout di {dynamicTimeout}ms superato per il PDF. Estrazione interrotta per salvare la RAM.",

        unknownTitle: "Titolo Sconosciuto",
        noPlotFound: "Trama non trovata.",
        logContactApple: "🍏 Contatto Apple Books per la trama: {url}",
        errAppleTimeout: "⚠️ Apple Books non ha risposto in tempo.",
        logPagesCalculated: "🧮 Pagine calcolate matematicamente dal testo: {count}",
        logPagesRandom: "⚠️ Impossibile leggere il testo per il calcolo, uso spessore casuale.",

        errAppleCoverDownload: "⚠️ Errore nel download della copertina da Apple Books:",

        logUploadStart: "\n📥 Inizio elaborazione di: {file}...",
        logExtractingMetadata: "⚙️  Estrazione metadati e copertina interna...",
        logUploadBlocked: "🛑 Upload bloccato: \"{title}\" è già presente in libreria.",
        logInitialData: "✔️  Dati iniziali: \"{title}\" di {author}",
        logWaitAppleAPI: "⏳ Attesa iniziale per non sovraccaricare le API di Apple...",
        logSearchAppleBooks: "🔍 Ricerca dati su Apple Books...",
        logAutoCorrectTitle: "✨ Autocorrezione: Titolo corretto in \"{finalTitle}\"",
        logDownloadCoverMissing: "🖼️  Copertina assente nell'EPUB. Download in corso da Apple Books...",
        noDescriptionAvailable: "Nessuna trama disponibile per questo libro.",
        logValidEpubPlot: "📖 Trama valida trovata all'interno dell'EPUB!",
        logPlotDownloaded: "🌐 Trama EPUB assente o non valida. Trama scaricata da Apple Books.",
        logUpdatingLibrary: "📝 Aggiornamento della libreria...",
        logUploadSuccess: "✅ Successo! \"{title}\" aggiunto allo scaffale.\n",
        errCriticalUpload: "❌ Errore critico durante l'elaborazione del libro:",
        logEpubTimeoutCalc: "📊 Dimensione EPUB: {fileSizeMB} MB | Timeout: {dynamicTimeout}ms",
        logPdfTimeoutCalc: "📊 Dimensione PDF: {fileSizeMB} MB | Timeout: {dynamicTimeout}ms",

        logFilesAlreadyMissing: "⚠️ Libro rimosso dal database, ma i file fisici erano già assenti.",
        logDeleteSuccess: "🗑️ Eliminato con successo: \"{title}\"",
        errDeleteBook: "Errore durante l'eliminazione del libro:",

        successCatUpdate: "Categoria aggiornata con successo su {count} libri.",
        errCategoryManager: "Errore nella gestione categorie:",

        errBulkUpdate: "Errore nell'aggiornamento massivo:",

        errProgressUpdate: "Errore durante il salvataggio dei progressi di lettura:",

        errSaveReview: "Errore durante il salvataggio della recensione:",

        logShieldActivated: "\n🛡️ SCUDO ATTIVATO: Un errore critico ha tentato di far crashare il server!",
        errEpub2Crash: "⚠️ Causa: Un file EPUB malformato ha fatto impazzire la libreria \"epub2\".",
        solutionCalibre: "👉 Soluzione: Usa Calibre per convertire l'EPUB in EPUB (così da pulire il codice interno) e ricaricalo.\n",
        errUnexpected: "❌ Errore imprevisto:",

        uncategorized: "Senza Categoria",
        logPdfExtract: "📄 Lettura PDF rilevata. Estrazione testo grezzo in corso...",
        logEpubExtract: "📚 Lettura EPUB rilevata. Estrazione in corso...",

        logShutdownRequest: "🛑 Richiesta di spegnimento ricevuta dal client. Chiusura del server in corso...",

        logServerListening: "🚀 Backend in ascolto su http://localhost:{port}",
        errOpenBrowser: "Impossibile aprire il browser automaticamente (aprilo manualmente):",

        terminal_sync: "Terminale sincronizzato in:",

        logFoundISBN: "🏷️ [Scanner] ISBN identificato: {isbn}",
        logNoISBNFound: "🏷️ [Scanner] Nessun ISBN trovato nel file. Procedo con fallback testuale.",

        shieldUnhandledRejection: "🛡️ SCUDO ATTIVATO: Unhandled Rejection catturato!",
        shieldReason: "Motivo:",
        shieldServerContinues: "Il server continua a funzionare normalmente.",
        monkeyPatchSuccess: "✅ Monkey-patch epub2 applicato con successo!",
        monkeyPatchError: "⚠️ Impossibile applicare il monkey-patch per epub2:",
        epubCorruptedFallback: "⚠️ EPUB corrotto o malformato. Uso il nome del file come fallback.",
        noInternalCover: "🎨 PDF senza copertina interna. Il frontend genererà la copertina dalla prima pagina.",
        
        monkeyPatchSuccess: "✅ Monkey-patch epub2 applicato con successo!",
        monkeyPatchError: "⚠️ Impossibile applicare il monkey-patch per epub2:",
        walkNavMapWarning: "⚠️ Errore walkNavMap catturato e ignorato:",
    };