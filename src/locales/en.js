export default {
        // Top Bar
        manageShelf: " Manage",
        manageShelfTooltip: "Rename or delete this category",
        searchPlaceholder: "Search by title or author...",
        uploadBtn: "+ Upload Ebook",
        loading: "Loading...",
        uploadingStatus: "⏳ Uploading",

        // Info Panel (Bottom)
        showSynopsis: "Show Synopsis",
        showCover: "Show Cover",

        assignCategory: " Assign Category ",
        moveBookTitle: "Move",
        saveBtn: "Save",
        categoryPrompt: "Enter the new category name for this book:",

        deleteBook: " Delete",
        deleteConfirm: "Are you sure you want to PERMANENTLY delete \"{title}\"?\nThis action will remove the file from your computer and cannot be undone.",
        serverError: "Error connecting to the server.",
        cancelBtn: "Cancel",

        readBook: "Read Book",

        // Dynamic labels and states
        uncategorized: "Uncategorized",
        shelfLabel: "📁 ",
        shelfTitlePrefix: "📁 ",
        noCover: "[ No cover found ]",
        allCategories: "All Categories",

        // Help Modal
        helpClose: "Got it!",

        // Reader
        epubError: "EPUB file not found for this book!",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",

        // Upload Results
        uploadComplete: "Upload complete!",
        added: "Added",
        duplicates: "Duplicates ignored",
        errors: "Errors",

        // load books 
        textureError: "Unable to load texture: ",
        shelfLog: "Created shelf {name} at height {y}",
        texturesSuccess: "Active shelf textures for {cat} loaded.",
        allTexturesLoaded: "🎉 All textures have been loaded in the background without lag!",
        loadingPdf: "Loading PDF...",

        // 3D Book Back
        backIn: "In: ",
        backPages: "Est. Pages: ",

        // Action Messages
        categoryCreated: "Category created!",
        categoryExisting: "Category already exists",
        existingCategoriesSubtitle: "Existing categories in the library:",
        moveSuccess: "Move completed!",
        selectBookError: "Please select at least one book.",
        genericError: "An error occurred.",

        //category manager
        catManagerTitle: "⚙️ Library Management",
        catManagerSubtitle: "Select the shelf you want to manage:",
        booksCount: "books",
        
        // Actions Menu
        shelfOptions: "Shelf Options",
        systemShelfNote: "This is the system shelf. You can use it to sort books into new categories, but you cannot rename or delete it.",
        renameShelfBtn: "✏️ Rename Category",
        createNewCatBtn: "📦 Create New Category (Move books from here)",
        addBooksToCatBtn: "📥 Add books to this category",
        deleteShelfBtn: "🗑️ Delete Category",
        
        // Rename View
        renameTitle: "✏️ Rename Shelf",
        chooseNewName: "Choose a new name for",
        emptyNameAlert: "Shelf name cannot be empty!",
        sameNameAlert: "Please enter a name different from the current one.",
        saving: "Saving...",

        //edit 
        editMetadata: " Edit Metadata",
        editMetadataTitle: "Edit Metadata",
        editTitle: "Title",
        editAuthor: "Author",
        editCategory: "Category",
        editDescription: "Description",
        editCover: "New Cover (Optional)",
        clickToChooseFile: "📁 Click to choose a file...",
        errorSaving: "Error while saving:",
        errorGeneric: "Error!",
        
        // Create and Move View
        createMoveTitle: "📦 Create and Move",
        selectToMove: "Select books to remove from",
        selectAll: "All",
        noBooksOnShelf: "No books on this shelf.",
        newCatNameLabel: "New category name:",
        newCatPlaceholder: "Type the new name...",
        transferBtn: "Transfer",
        selectMoveError: "Select at least one book to move.",
        writeCatNameError: "Type the name of the new shelf.",
        
        // Import View
        importTitle: "📥 Add Books",
        selectToImport: "Select books to bring to",
        allBooksAlreadyHere: "All books are already here.",
        importSelectedBtn: "📥 Import Selected Here",
        selectImportError: "Select at least one book from the list.",
        
        // Delete View
        deleteTitle: "🗑️ Delete Shelf",
        deleteWarningTitle: "Warning!",
        deleteWarningText: "You are about to delete the category \"{cat}\".\nNo files will be deleted, but all books on this shelf will return to \"Uncategorized\".",
        confirmDeleteBtn: "Confirm Deletion",


        credits: "&copy; 2026 KoreShelf - All rights reserved. Created by",

        //help guide 
        closeReader: "Close Book",
        personalizeReader: "Personalize",
        defaultfromBook: "Default from Book",
        font: "Font",
        lineHeight: "Line Height",
        textSize: "Text Size",
        readingMode: "Reading Mode",
        horizontal: "Paginated (Horizontal)",
        vertical: "Continuous Scroll (Vertical)",
        textAlignment: "Text Alignment",
        helpTitle: "📖 How it works",
        helpContent: `
            <h3>📖 Welcome to KoreShelf</h3>
            <p>Your intelligent 3D library. Here's how to make the most of it:</p>
            <ul>
                <li><b>📥 Upload Books:</b> Drag and drop or use the upload button to add your <b>.epub</b> or <b>.pdf</b> files.</li>
                <li><b>🔍 Library Search:</b> Use the top bar to find titles, authors, or categories.</li>
                <li><b>🧭 Navigation:</b> Scroll horizontally (←/→) to browse books and vertically (↑/↓) to switch categories.</li>
                <li><b>🛠️ Library Management:</b> Use "🏷️ Assign Category" to organize volumes or "⚙️ Edit" for advanced metadata operations.</li>
                <li><b>📖 Advanced Reader:</b> Click a book to open it. The reader natively supports both <b>EPUB</b> and <b>PDF</b> formats.</li>
                <li><b>📑 Fast Navigation (TOC):</b> Click the <b>"TOC" (📑)</b> button in the bottom-left corner while reading to jump to chapters.</li>
                <li><b>🔎 Search within text:</b> Use the search bar in the top-right corner of the reader to find specific phrases. Results will be highlighted in the text.</li>
                <li><b>⚙️ Reader Menu (≡):</b> Adjust zoom, font, line height, alignment, and reading flow (paginated/scrolled) via the side menu.</li>
                <li><b style="color: #f1c40f;">✍️ Highlights Board:</b> Select text to underline it. Highlights automatically appear as <b>3D post-it notes</b> on the library wall. Use the side arrows to browse them.</li>
                <li><b>🌓 Visual Mode:</b> Toggle between Dark and Light mode via the icon in the top-right corner.</li>
                <li><b>👁️ Synopsis:</b> Rotate the book or click "Show Plot" to read the summary on the back cover.</li>
                <li><b style="color: #d9534f;">🛑 Shutdown:</b> Use the Shutdown button in the top-right to safely close the local server.</li>
            </ul>
        `,
        donateBtn: "💙 Donate",

        emptyLibraryMessage: "Your library is empty. Click '+ Upload Ebook' to start your collection!",
        
        //review
        readerReviewBtnText: "⭐ You finished! Write a Review",
        reviewModalTitleLong: "What do you think of this book?",
        reviewPlaceholderHot: "Write your fresh thoughts here...",
        saveMemoriesBtn: "Save to Memories",
        selectStarAlert: "Please select at least one star!",
        savingReview: "⏳ Saving...",
        reviewSavedBtn: "✅ Review Saved!",
        errorRetry: "Error. Try again.",

        //synopsis on back of the book
        authorLabel: "Author:",
        fullPlotTitle: "Synopsis",
        noDescription: "No synopsis available.",
        closeBtn: "Close",

        //update 
        updateAvailable: "Update available!",
        updateDownload: "Download now",

        //shutdown server
        shutdownBtn: "Shutdown",
        shutdownTooltip: "Shutdown KoreShelf local server",
        shutdownConfirm: "Do you really want to shutdown KoreShelf? The application will close.",
        shutdownTitle: "KoreShelf Shutdown",
        shutdownMessage: "The local server has been shut down. You can safely close this window.",

        //server.js locales
        errNoFile: "No file uploaded.",
        errFormat: "Unsupported format. Use EPUB or PDF.",
        errDuplicate: "This book is already on your shelf!",
        successUpload: "Book processed and successfully added!",
        errInternal: "Internal server error.",
        errInvalidTag: "Invalid tag.",
        errNotFound: "Book not found.",
        successTagAdded: "Tag added!",
        successTagExists: "Tag already exists.",
        successDelete: "Book successfully deleted!",
        errNoBooksCat: "No books found for this category.",
        successBulkMove: "Moved {count} books.",
        errNoBooksUpdated: "No books updated.",
        successShutdown: "Server shutting down",

         // cover image generator
        logpdfjs: "⚠️ pdf.js not available, unable to generate PDF covers.",
        logGeneratePdfCovers: "🎨 Found {count} PDFs without covers. Generation in progress...",
        logGeneratePdfCover: "📖 Generating cover for: {title}",
        logCoverGenerated: "✅ Cover generated for: {title}",
        logCoverGenerationError: "⚠️ Error loading cover for {title}: {statusText}",
        logCoverGenerationFailed: "⚠️ Unable to generate cover for {title}: {errorMessage}",
        logPdfCoversGenerated: "🎉 PDF covers generated!",

        removeHighlightConfirm: "Do you want to delete this highlight?",
        manageHighlightsTitle: "Manage Highlights",
        moreHighlightsHint: "+{extraCount} more... (Click)",
        manageHighlightHint: "Click to manage",


        confirmHighlight: "Do you want to highlight this text?",

        shareQuoteBtn: "Share",
        shareQuoteFallback: "Image downloaded! Share it wherever you want.",
        shareQuoteBrand: "Generated by KoreShelf",
        previewTitle: "Customize and Share",
        previewFormat: "Format",
        previewBgStyle: "Background Style",
        previewBgColor: "Background",
        previewTextColor: "Text",
        formatPost: "Square Post",
        formatStory: "Story (9:16)",
        bgStyleBlur: "Blurred Cover",
        bgStyleSolid: "Solid Color",
        downloadBtn: "Download",
        shareNotSupported: "Your device/browser does not support native sharing. Use the Download button!",

        tableOfContents: "Table of Contents",
        noTocFound: "No index found. Use quick jump:",
        searchPlaceholder: "Search in the book...",
        noResultsFound: "No results found.",
        noMoreResults: "No more results found.",

        //--------------------------------------------------server.js locales-------------------------------------------------------------

        logUploadDirCreated: "📁 Upload directory created automatically.",
        logCoversDirCreated: "📁 Cover directory created automatically.",
        logBooksJsonCreated: "📄 File 'books.json' created automatically.",
        errDockerBooksJson: "⚠️ CRITICAL ERROR: Docker created 'books.json' as a directory instead of a file! Delete the directory and restart.",

        logCorruptedMetadata: "⚠️ Corrupted metadata detected! Using filename...",
        logFoundDash: "🪄 Found a dash! Title: \"{title}\", Author: \"{author}\"",
        unknownAuthor: "Unknown Author",
        errEpubImageExtract: "⚠️ Unable to extract image from EPUB:",
        errEpubParse: "EPUB parsing error:",

        logCorruptedPdfMetadata: "⚠️ PDF metadata missing or corrupted! Using filename...",
        logPdfCoverGenerated: "📸 First PDF page successfully transformed into a cover!",
        errPdfCoverGen: "⚠️ Unable to generate cover from PDF:",
        errPdfParse: "PDF parsing error:",

        errEpubTimeout: "Timeout: The EPUB is malformed or too complex and blocked the reading process.",
        errPdfTimeout: "⚠️ Timeout of {dynamicTimeout}ms exceeded for the PDF. Extraction interrupted to save RAM.",

        unknownTitle: "Unknown Title",
        noPlotFound: "Plot not found.",
        logContactApple: "🍏 Contacting Apple Books for synopsis: {url}",
        errAppleTimeout: "⚠️ Apple Books did not respond in time.",
        logPagesCalculated: "🧮 Pages calculated mathematically from text: {count}",
        logPagesRandom: "⚠️ Unable to read text for calculation, using random thickness.",

        errAppleCoverDownload: "⚠️ Error downloading cover from Apple Books:",

        logUploadStart: "\n📥 Starting processing of: {file}...",
        logExtractingMetadata: "⚙️  Extracting metadata and internal cover...",
        logUploadBlocked: "🛑 Upload blocked: \"{title}\" is already in the library.",
        logInitialData: "✔️  Initial data: \"{title}\" by {author}",
        logWaitAppleAPI: "⏳ Initial wait to avoid overloading Apple APIs...",
        logSearchAppleBooks: "🔍 Searching data on Apple Books...",
        logAutoCorrectTitle: "✨ Autocorrection: Title corrected to \"{finalTitle}\"",
        logDownloadCoverMissing: "🖼️  Cover missing in EPUB. Downloading from Apple Books...",
        noDescriptionAvailable: "No synopsis available for this book.",
        logValidEpubPlot: "📖 Valid synopsis found inside the EPUB!",
        logPlotDownloaded: "🌐 EPUB synopsis missing or invalid. Synopsis downloaded from Apple Books.",
        logUpdatingLibrary: "📝 Updating library...",
        logUploadSuccess: "✅ Success! \"{title}\" added to the shelf.\n",
        errCriticalUpload: "❌ Critical error during book processing:",
        logEpubTimeoutCalc: "📊 EPUB size: {fileSizeMB} MB | Timeout: {dynamicTimeout}ms",
        logPdfTimeoutCalc: "📊 PDF size: {fileSizeMB} MB | Timeout: {dynamicTimeout}ms",

        logFilesAlreadyMissing: "⚠️ Book removed from database, but physical files were already missing.",
        logDeleteSuccess: "🗑️ Successfully deleted: \"{title}\"",
        errDeleteBook: "Error deleting book:",

        successCatUpdate: "Category successfully updated for {count} books.",
        errCategoryManager: "Error managing categories:",

        errBulkUpdate: "Error during bulk update:",

        errProgressUpdate: "Error saving reading progress:",

        errSaveReview: "Error saving the review:",

        logShieldActivated: "\n🛡️ SHIELD ACTIVATED: A critical error tried to crash the server!",
        errEpub2Crash: "⚠️ Cause: A malformed EPUB file caused the \"epub2\" library to crash.",
        solutionCalibre: "👉 Solution: Use Calibre to convert the EPUB to EPUB (to clean its internal code) and re-upload it.\n",
        errUnexpected: "❌ Unexpected error:",


        logShutdownRequest: "🛑 Shutdown request received from client. Shutting down server...",

        logServerListening: "🚀 Backend listening on http://localhost:{port}",
        errOpenBrowser: "Unable to open the browser automatically (please open it manually):",
        terminal_sync: "Terminal synchronized in: {lang}",

        logFoundISBN: "🏷️ [Scanner] ISBN found: {isbn}",
        logNoISBNFound: "🏷️ [Scanner] No ISBN found in the file. Proceeding with text fallback.",

        shieldUnhandledRejection: "🛡️ SHIELD ACTIVATED: Unhandled Rejection caught!",
        shieldReason: "Reason:",
        shieldServerContinues: "The server continues to function normally.",
        monkeyPatchSuccess: "✅ epub2 monkey-patch applied successfully!",
        monkeyPatchError: "⚠️ Unable to apply epub2 monkey-patch:",
        epubCorruptedFallback: "⚠️ Corrupted or malformed EPUB. Using filename as fallback.",
        noInternalCover: "🎨 PDF without internal cover. The frontend will generate the cover from the first page.",
        
        walkNavMapWarning: "⚠️ walkNavMap error caught and suppressed:",
    };