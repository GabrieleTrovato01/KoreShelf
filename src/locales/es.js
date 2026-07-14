export default {
        // Top Bar
        manageShelf: " Gestionar",
        manageShelfTooltip: "Cambiar el nombre o eliminar esta categoría",
        searchPlaceholder: "Buscar por título o autor...",
        uploadBtn: "+ Subir libro electrónico",
        loading: "Cargando...",
        uploadingStatus: "⏳ Subiendo...",

        // Info Panel (Bottom)
        showSynopsis: "Mostrar sinopsis",
        showCover: "Mostrar portada",

        assignCategory: " Asignar categoría ",
        moveBookTitle: "Mover",
        saveBtn: "Guardar",
        categoryPrompt: "Introduce el nuevo nombre de la categoría para este libro:",

        deleteBook: " Eliminar",
        deleteConfirm: "¿Estás seguro de que quieres eliminar DE FORMA DEFINITIVA \"{title}\"?\nEsta acción eliminará el archivo de tu ordenador y no se podrá deshacer.",
        serverError: "Error al conectarse al servidor.",
        cancelBtn: "Cancelar",

        readBook: " Leer Libro",

        // Dynamic labels and states
        uncategorized: "Sin categoría",
        shelfLabel: "📁 ",
        shelfTitlePrefix: "📁 ",
        noCover: "[ Sin Portada]",
        allCategories: "Todas las categorías",

        // Help Modal
        helpClose: "Entendido",

        // Reader
        epubError: "¡No se ha encontrado el archivo EPUB de este libro!",
        darkMode: "Modo Oscuro",
        lightMode: "Modo Claro",

        // Upload Results
        uploadComplete: "Carga completada!",
        added: "Añadido",
        duplicates: "Se ignoran los duplicados",
        errors: "Errores",

        // load books 
        textureError: "No se puede cargar la textura: ",
        shelfLog: "Se ha creado el estante {name} a una altura de {y}",
        texturesSuccess: "Se han cargado las texturas activas de la estantería para {cat}.",
        allTexturesLoaded: "🎉 ¡Todas las texturas se han cargado en segundo plano sin ningún tipo de retraso!",
        loadingPdf: "Cargando el PDF...",

        // 3D Book Back
        backIn: "En: ",
        backPages: "Número estimado de páginas:",

        // Action Messages
        categoryCreated: "¡Categoría creada!",
        categoryExisting: "La categoría ya existe",
        existingCategoriesSubtitle: "Categorías existentes en la biblioteca:",
        moveSuccess: "¡Movimiento completado!",
        selectBookError: "Por favor, selecciona al menos un libro.",
        genericError: "Ocurrió un error.",

        //category manager
        catManagerTitle: "⚙️ Gestión de bibliotecas",
        catManagerSubtitle: "Selecciona la estantería que deseas gestionar:",
        booksCount: "libros",
        
        // Actions Menu
        shelfOptions: "Opciones de estanterías",
        systemShelfNote: "Esta es la estantería del sistema. Puedes utilizarla para clasificar los libros en nuevas categorías, pero no puedes cambiarle el nombre ni eliminarla.",
        renameShelfBtn: "✏️ Cambiar el nombre de la categoría",
        createNewCatBtn: "📦 Crear nueva categoría (Mover los libros desde aquí)",
        addBooksToCatBtn: "📥 Añadir libros a esta categoría",
        deleteShelfBtn: "🗑️ Eliminar Categoría",

        // Rename View
        renameTitle: "✏️ Cambiar el nombre de la estantería",
        chooseNewName: "Elige un nuevo nombre para ",
        emptyNameAlert: "El nombre de la estantería no puede estar vacío!",
        sameNameAlert: "Por favor, introduce un nombre diferente al actual.",
        saving: "Guardando...",

        //edit 
        editMetadata: "Editar metadatos",
        editMetadataTitle: "Editar metadatos",
        editTitle: "Título",
        editAuthor: "Autor",
        editCategory: "Categoría",
        editDescription: "Descripción",
        editCover: "Nueva portada (Opcional)",
        clickToChooseFile: "📁 Haz clic para seleccionar un archivo...",
        errorSaving: "Error al guardar:",
        errorGeneric: "Error!",
        
        // Create and Move View
        createMoveTitle: "📦 Crear y mover",
        selectToMove: "Selecciona los libros que deseas eliminar de",
        selectAll: "Todos",
        noBooksOnShelf: "No hay libros en esta estantería",
        newCatNameLabel: "Nuevo nombre de categoría:",
        newCatPlaceholder: "Escribe el nuevo nombre...",
        transferBtn: "Traspaso",
        selectMoveError: "Selecciona al menos un libro para moverlo.",
        writeCatNameError: "Escribe el nombre de la nueva estantería.",
        
        // Import View
        importTitle: "📥 Añadir libros",
        selectToImport: "Selecciona los libros que deseas añadir a",
        allBooksAlreadyHere: "Todos los libros ya están aquí.",
        importSelectedBtn: "📥 Importar Seleccionados Aquí",
        selectImportError: "Selecciona al menos un libro de la lista.",
        
        // Delete View
        deleteTitle: "🗑️ Eliminar estante",
        deleteWarningTitle: "Advertencia!",
        deleteWarningText: "Estás a punto de eliminar la estantería \"{cat}\".\nNo se eliminarán archivos, pero todos los libros en esta estantería regresarán a \"Sin categorizar\".",
        confirmDeleteBtn: "Confirmar Eliminación",


        credits: "&copy; 2026 KoreShelf - Todos los derechos reservados. Creado por",

        //help guide 
        closeReader: "Cerrar el libro",
        personalizeReader: "Personalizar",
        defaultfromBook: "Texto predeterminado del libro",
        font: "Fuente",
        lineHeight: "Altura de línea",
        textSize: "Tamaño del texto",
        readingMode: "Modo de lectura",
        horizontal: "Paginado (Horizontal)",
        vertical: "Desplazamiento Continuo (Vertical)",
        textAlignment: "Alineación del Texto",
        helpTitle: "📖 Cómo funciona",
        helpContent: `
            <h3>📖 Bienvenido a KoreShelf</h3>
            <p>Tu biblioteca 3D inteligente. Cómo sacar el máximo provecho:</p>
            <ul>
                <li><b>📥 Subir libros:</b> Usa el botón de carga o arrastra tus archivos <b>.epub</b> o <b>.pdf</b>.</li>
                <li><b>🔍 Búsqueda en biblioteca:</b> Usa la barra superior para encontrar títulos, autores o categorías.</li>
                <li><b>🧭 Navegación:</b> Desplázate horizontalmente (←/→) para explorar libros y verticalmente (↑/↓) para cambiar de categoría.</li>
                <li><b>🛠️ Organización:</b> Usa "🏷️ Asignar categoría" para organizar volúmenes o "⚙️ Editar" para los metadatos.</li>
                <li><b>📖 Lector avanzado:</b> Haz clic en un libro para abrirlo. El lector es compatible con formatos <b>EPUB</b> y <b>PDF</b>.</li>
                <li><b>📑 Navegación rápida (Índice):</b> Haz clic en el botón <b>"Índice" (📑)</b> en la esquina inferior izquierda para saltar a cualquier capítulo.</li>
                <li><b>🔎 Búsqueda de texto:</b> Usa la barra de búsqueda en la parte superior derecha del lector para encontrar frases específicas. Los resultados se resaltarán en el texto.</li>
                <li><b>⚙️ Menú del lector (≡):</b> Ajusta el zoom, fuente, interlineado, alineación y flujo de lectura (paginado/continuo) desde el menú lateral.</li>
                <li><b style="color: #f1c40f;">✍️ Tablero de notas:</b> Selecciona texto para subrayarlo. Tus citas aparecerán automáticamente como <b>post-its 3D</b> en la pared de la biblioteca.</li>
                <li><b>🌓 Modo visual:</b> Cambia entre modo oscuro y claro desde el icono en la esquina superior derecha.</li>
                <li><b>👁️ Sinopsis:</b> Gira el libro 3D o haz clic en "Ver sinopsis" para leer el resumen en la contraportada.</li>
                <li><b style="color: #d9534f;">⏻ Apagar:</b> Usa el botón de apagado en la parte superior derecha para cerrar el servidor de forma segura.</li>
            </ul>
        `,
        donateBtn: "💙 Donar",

        // Aggiungi questo in fondo all'oggetto export default
        emptyLibraryMessage: "Tu biblioteca está vacía. ¡Haz clic en «+ Subir libro electrónico» para empezar tu colección!",
        //review
        readerReviewBtnText: "⭐ ¡Ya has terminado! Escribe una reseña",
        reviewModalTitleLong: "¿Qué te parece este libro?",
        reviewPlaceholderHot: "Escribe aquí tus ideas más recientes...",
        saveMemoriesBtn: "Guardar en «Recuerdos»",
        selectStarAlert: "Selecciona al menos una estrella!",
        savingReview: "⏳ Ahorro...",
        reviewSavedBtn: "✅ Opinión guardada!",
        errorRetry: "Error. Inténtalo de nuevo.",

        //synopsis on back of the book
        authorLabel: "Autor:",
        fullPlotTitle: "Sinopsis",
        noDescription: "No hay sinopsis disponible.",
        closeBtn: "Cerrar",

        //update 
        updateAvailable: "¡Actualización disponible!",
        updateDownload: "Descargar actualización",

        //shutdown server
        shutdownBtn: "Apagar",
        shutdownTooltip: "Apagar KoreShelf y cerrar la aplicación.",
        shutdownConfirm: "¿Estás seguro de que quieres apagar KoreShelf? Esto cerrará la aplicación y detendrá el servidor local.",
        shutdownTitle: "Apagar KoreShelf",
        shutdownMessage: "El servidor local ha sido apagado. Puedes cerrar esta ventana de forma segura.",

        //server.js locales
        errNoFile: "No se ha seleccionado ningún archivo.",
        errFormat: "Formato no soportado. Usa EPUB o PDF.",
        errDuplicate: "¡Este libro ya está en tu estante!",
        successUpload: "Libro procesado y agregado con éxito!",
        errInternal: "Error interno del servidor.",
        errInvalidTag: "Etiqueta inválida.",
        errNotFound: "Libro no encontrado.",
        successTagAdded: "¡Etiqueta agregada!",
        successTagExists: "¡La etiqueta ya existe!",
        successDelete: "¡Libro eliminado con éxito!",
        errNoBooksCat: "No se encontraron libros para esta categoría.",
        successBulkMove: "Movidos {count} libros.",
        errNoBooksUpdated: "No se actualizaron libros.",
        successShutdown: "¡Servidor apagado con éxito!",

         // cover image generator
         
        logpdfjs: "⚠️ pdf.js no está disponible, no se pueden generar portadas de PDF.",
        logGeneratePdfCovers: "🎨 Se han encontrado {count} archivos PDF sin portada. Generación en curso...",
        logGeneratePdfCover: "📖 Creación de la portada para: {title}",
        logCoverGenerated: "✅ Portada generada para: {title}",
        logCoverGenerationError: "⚠️ Error cargando portada para {title}: {statusText}",
        logCoverGenerationFailed: "⚠️ No se puede generar portada para {title}: {errorMessage}",
        logPdfCoversGenerated: "🎉 ¡Portadas de PDF generadas!",

        removeHighlightConfirm: "¿Quieres eliminar este resaltado?",
        manageHighlightsTitle: "Gestionar Resaltados",
        moreHighlightsHint: "+{extraCount} más... (Haz clic)",
        manageHighlightHint: "Haz clic para gestionar",


        confirmHighlight: "¿Quieres resaltar este texto?",

        shareQuoteBtn: "Compartir",
        shareQuoteFallback: "¡Imagen descargada! Compártela donde quieras.",
        shareQuoteBrand: "Generado con KoreShelf",
        previewTitle: "Personalizar y Compartir",
        previewFormat: "Formato",
        previewBgStyle: "Estilo de Fondo",
        previewBgColor: "Fondo",
        previewTextColor: "Texto",
        formatPost: "Publicación Cuadrada",
        formatStory: "Historia (9:16)",
        bgStyleBlur: "Portada Desenfocada",
        bgStyleSolid: "Color Sólido",
        downloadBtn: "Descargar",
        shareNotSupported: "Tu dispositivo/navegador no soporta compartir nativamente. ¡Usa el botón Descargar!",

        tableOfContents: "Tabla de Contenidos",
        noTocFound: "No se encontró índice. Usa el salto rápido:",
        searchPlaceholder: "Buscar en el libro...",
        noResultsFound: "No se han encontrado resultados.",
        noMoreResults: "No hay más resultados.",

        //--------------------------------------------------server.js locales-------------------------------------------------------------

        logUploadDirCreated: "📁 Directorio de carga creado automáticamente.",
        logCoversDirCreated: "📁 Directorio de portadas creado automáticamente.",
        logBooksJsonCreated: "📄 Archivo 'books.json' creado automáticamente.",
        errDockerBooksJson: "⚠️ ERROR CRÍTICO: Docker creó 'books.json' como un directorio en lugar de un archivo! Elimina el directorio y reinicia.",

        logCorruptedMetadata: "⚠️ Metadata corrupta detectada! Usando nombre de archivo...",
        logFoundDash: "🪄 Se encontró un guion! Título: \"{title}\", Autor: \"{author}\"",
        unknownAuthor: "Autor Desconocido",
        errEpubImageExtract: "⚠️ No se puede extraer la imagen del EPUB:",
        errEpubParse: "Error al analizar el EPUB:",

        logCorruptedPdfMetadata: "⚠️ ¡Faltan los metadatos del PDF o están dañados! Se utiliza el nombre de archivo...",
        logPdfCoverGenerated: "📸  ¡La primera página del PDF se ha convertido correctamente en una portada!",
        errPdfCoverGen: "⚠️ No se puede generar portada a partir del PDF:",
        errPdfParse: "Error al analizar el PDF:",

        errEpubTimeout: "Tiempo de espera agotado: el archivo EPUB tiene un formato incorrecto o es demasiado complejo, lo que ha bloqueado el proceso de lectura.",
        errPdfTimeout: "⚠️ Se ha superado el tiempo de espera de {dynamicTimeout} ms para el PDF. Se ha interrumpido la extracción para liberar memoria RAM.",

        unknownTitle: "Título desconocido",
        noPlotFound: "No se ha encontrado la trama.",
        logContactApple: "🍏Para solicitar la sinopsis a Apple Books: {url} ",
        errAppleTimeout: "⚠️ Apple Books no respondió a tiempo. ",
        logPagesCalculated: "🧮 Páginas calculadas matemáticamente a partir del texto: {count} ",
        logPagesRandom: "⚠️ No se puede leer el texto para su cálculo, usando grosor aleatorio.",

        errAppleCoverDownload: "⚠️ Error al descargar la portada de Apple Books:",

        logUploadStart: "\n📥  Iniciando el procesamiento de: {file}...",
        logExtractingMetadata: "⚙️ Extraer los metadatos y la portada interna... ",
        logUploadBlocked: "🛑 Subida bloqueada: \"{title}\" ya se encuentra en la biblioteca.",
        logInitialData: "✔️  Datos iniciales: \"{title}\" por {author}",
        logWaitAppleAPI: "⏳ Espera inicial para evitar sobrecargar las APIs de Apple...",
        logSearchAppleBooks: "🔍 Buscando datos en Apple Books...",
        logAutoCorrectTitle: "✨ Autocorrección: Título corregido a \"{finalTitle}\"",
        logDownloadCoverMissing: "🖼️  Portada faltante en EPUB. Descargando desde Apple Books...",
        noDescriptionAvailable: "No hay sinopsis disponible para este libro.",
        logValidEpubPlot: "📖 Sinopsis válida encontrada dentro del EPUB!",
        logPlotDownloaded: "🌐 Sinopsis del EPUB faltante o inválida. Sinopsis descargada de Apple Books.",
        logUpdatingLibrary: "📝 Actualizando biblioteca...",
        logUploadSuccess: "✅ ¡Éxito! \"{title}\" agregado a la estantería.\n",
        errCriticalUpload: "❌ Error crítico durante el procesamiento del libro:",
        logEpubTimeoutCalc: "📊 Tamaño del archivo EPUB: {fileSizeMB} MB | Tiempo de espera: {dynamicTimeout} ms",
        logPdfTimeoutCalc: "📊 Tamaño del archivo PDF: {fileSizeMB} MB | Tiempo de espera: {dynamicTimeout} ms",

        logFilesAlreadyMissing: "⚠️ El libro se ha eliminado de la base de datos, pero los archivos físicos ya no estaban.",
        logDeleteSuccess: "🗑️ Eliminación exitosa: \"{title}\"",
        errDeleteBook: "Error eliminando el libro:",

        successCatUpdate: "Categoría actualizada con éxito para {count} libros.",
        errCategoryManager: "Error gestionando categorías:",

        errBulkUpdate: "Error durante la actualización masiva:",

        errProgressUpdate: "Error guardando el progreso de lectura:",

        errSaveReview: "Error guardando la reseña:",

        logShieldActivated: "\n🛡️SCUD ACTIVADO: ¡Un error crítico ha intentado bloquear el servidor! ",
        errEpub2Crash: "⚠️ Un archivo EPUB con errores de formato provocó un fallo en la biblioteca \"epub2\". ",
        solutionCalibre: "👉Solución: Utiliza Calibre para convertir el archivo EPUB a EPUB (para limpiar su código interno) y vuelve a subirlo.\n",
        errUnexpected: "❌ Error inesperado:",


        logShutdownRequest: "🛑Se ha recibido una solicitud de apagado del cliente. Apagando el servidor... ",

        logServerListening: "🚀 El backend está a la escucha en :  http://localhost:{port}",
        errOpenBrowser: "No se puede abrir el navegador automáticamente (ábrelo manualmente):",
        terminal_sync: "Terminal sincronizado en: {lang}",

        logFoundISBN: "🏷️ [Scanner] ISBN encontrado: {isbn}",
        logNoISBNFound: "🏷️ [Scanner]No se ha encontrado ningún ISBN en el archivo. Se procede con el texto alternativo.",

        shieldUnhandledRejection: "🛡️ SCREEN ACTIVADO: ¡Se ha detectado un rechazo no gestionado!",
        shieldReason: "Motivo:",
        shieldServerContinues: "El servidor continúa funcionando normalmente.",
        monkeyPatchSuccess: "✅ Se ha aplicado correctamente el monkey patch de epub2!",
        monkeyPatchError: "⚠️ No se puede aplicar el monkey patch de epub2:",
        epubCorruptedFallback: "⚠️ EPUB corrupto o mal formado. Utilizando el nombre del archivo como fallback.",
        noInternalCover: "🎨 PDF sin portada interna. El frontend generará la portada a partir de la primera página.",
        
        walkNavMapWarning: "⚠️  Se ha detectado y suprimido un error de walkNavMap:",
};