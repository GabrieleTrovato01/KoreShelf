let currentBook = null;
let rendition = null;

// --- VARIABILI GLOBALI PDF.JS ---
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let pdfPagesRendered = {}; // Tiene traccia di quali pagine hanno un canvas attivo { pageNum: true/false }
const scaleBase = 1.5; // Scala di base per una buona risoluzione
let currentPdfId = null; 
let currentPdfUrl = null;

// La variabile globale per ricordare lo stato
let isDarkMode = localStorage.getItem('readerDarkMode') === 'true';

window.openReader = function(epubUrl, bookId) {

    const readerReviewBtn = document.getElementById('reader-review-btn');
    if (readerReviewBtn) {
        readerReviewBtn.style.display = 'none'; // Nascondilo all'apertura del libro
        readerReviewBtn.innerHTML = window.t('readerReviewBtnText'); 
        readerReviewBtn.onclick = () => window.openReviewModal(bookId); 
    }
    // ---------------------------------------------------------
    
    if (!epubUrl) {
        alert(window.t('epubError'));
        return;
    }

    const readerOverlay = document.getElementById('reader-overlay');
    const viewer = document.getElementById('viewer');

    if (!readerOverlay || !viewer) {
        console.error(window.t('readerError'));
        return;
    }

    readerOverlay.style.display = 'block';
    setTimeout(() => readerOverlay.style.opacity = '1', 50);

    if (viewer) {
        viewer.style.width = "90%";            // Adattamento dinamico
        viewer.style.maxWidth = "850px";       // Limite massimo anti-affaticamento

        viewer.style.height = "88vh"; // Altezza totale schermo MENO 120px (spazio per menu sopra e sotto)
        viewer.style.margin = "2vh auto 0 auto";    // Spinge il div giù di 60px e lo centra orizzontalmente
        // Centratura automatica
        viewer.style.padding = "0";            
        viewer.style.boxSizing = "border-box";
        viewer.style.position = "relative";    // Annulla eventuali margini forzati dall'HTML
    }

    currentBook = ePub(epubUrl);

    currentBook.ready.then(() => {
        const cachedLocations = localStorage.getItem(`locations_${bookId}`);
        
        if (cachedLocations) {
            currentBook.locations.load(cachedLocations);
            console.log("⚡ Posizioni caricate dalla cache istantaneamente");
            return Promise.resolve(); 
        } else {
            console.log("⏳ Generazione mappa delle posizioni in corso...");
            return currentBook.locations.generate(1000).then(() => {
                try {
                    localStorage.setItem(`locations_${bookId}`, currentBook.locations.save());
                    console.log("✅ Mappa generata e salvata in cache");
                } catch(e) {
                    console.warn("Spazio insufficiente per salvare le posizioni in cache");
                }
            });
        }
    }).then(() => {
        const currentLocation = rendition.currentLocation();
        
        if (currentLocation && currentLocation.start && currentLocation.start.cfi) {
            const percentage = currentBook.locations.percentageFromCfi(currentLocation.start.cfi);
            const progressEl = document.getElementById('reading-progress');
            
            if (progressEl && percentage > 0) {
                progressEl.innerText = Math.round(percentage * 100) + "%";
            }
        }
    }).catch(err => console.warn("Avviso mappa posizioni:", err));
    const savedFlow = localStorage.getItem('readerFlow') || 'paginated';

    // GESTIONE FRECCE ALL'AVVIO ---
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    if (savedFlow === 'scrolled-doc') {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    } else {
        if (prevBtn) prevBtn.style.display = 'flex'; 
        if (nextBtn) nextBtn.style.display = 'flex';
    }

    if (!document.getElementById('hide-scrollbar-style')) {
        const style = document.createElement('style');
        style.id = 'hide-scrollbar-style';
        style.innerHTML = `
            /* Nasconde le scrollbar native mantenendo lo scorrimento attivo */
            .epub-container, .epub-view, #viewer {
                -ms-overflow-style: none !important;  /* Firefox / Edge vecchi */
                scrollbar-width: none !important;     /* Firefox moderno */
            }
            .epub-container::-webkit-scrollbar, .epub-view::-webkit-scrollbar, #viewer::-webkit-scrollbar {
                display: none !important;             /* Chrome, Safari, Edge moderni */
                width: 0 !important;
                background: transparent !important;
            }
        `;
        document.head.appendChild(style);
    }
    const fontS = document.getElementById('sidebar-font-select');
    const lineS = document.getElementById('sidebar-line-height-slider');
    if (fontS && fontS.parentElement) fontS.parentElement.style.display = 'block';
    if (lineS && lineS.parentElement) lineS.parentElement.style.display = 'block';

    rendition = currentBook.renderTo("viewer", {
        width: "100%",
        height: "100%",
        spread: "none",
        flow: savedFlow,
        manager: "continuous",
        allowScriptedContent: true 
    });

    rendition.hooks.content.register((contents) => {
        const style = contents.document.createElement("style");
        style.innerHTML = `
            /* 1. Reset totale su tutte le immagini (incluse quelle dentro SVG) */
            img, image {
                max-width: 100% !important;
                max-height: 100vh !important;
                object-fit: contain !important;
                margin: 0 auto !important;
                display: block !important;
                width: auto !important;
                height: auto !important;
            }
            
            /* 2. Disinnesco degli SVG giganti o con coordinate sballate */
            svg {
                max-width: 100% !important;
                max-height: 100vh !important;
                width: auto !important;
                height: auto !important;
                margin: 0 auto !important;
                display: block !important;
            }

            /* 3. Il vero trucco: costringiamo i contenitori noti delle copertine a centrare l'immagine */
            body[epub\\:type="cover"], 
            div.cover, 
            div#cover, 
            body#cover,
            .cover-wrap {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                height: 100vh !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
            }
        `;
        contents.document.head.appendChild(style);
    });

    const existingSlider = document.querySelector('.glass-slider');
    if (existingSlider) {
        existingSlider.value = localStorage.getItem('readerZoom') || '100';
    }

    const keyListener = function(e) {
        if (e.key === "ArrowRight") {
            if (pdfDoc) onNextPage();
            else if (rendition) rendition.next();
        }
        if (e.key === "ArrowLeft") {
            if (pdfDoc) onPrevPage();
            else if (rendition) rendition.prev();
        }
    };
    
    document.addEventListener("keydown", keyListener);
    
    if (rendition) {
        rendition.on("keydown", keyListener);
    }

    window.addEventListener('readerClosed', () => {
        document.removeEventListener("keydown", keyListener);
    }, { once: true });


    const rawLocation = localStorage.getItem(`bookmark_${bookId}`);
    const isValidLocation = rawLocation && rawLocation !== "undefined" && rawLocation !== "null";
    
    const displayPromise = isValidLocation ? rendition.display(rawLocation) : rendition.display();

    displayPromise.then(() => {
        window.applyCurrentTheme();
    }).catch(err => {
        console.error("Errore nel caricamento della pagina salvata, forzo la copertina:", err);
        rendition.display(); 
    });

    rendition.on("rendered", () => {
        window.applyCurrentTheme();
        
        const savedZoom = localStorage.getItem('readerZoom') || '100';
        rendition.themes.fontSize(`${savedZoom}%`);
    });

    rendition.on('relocated', function(location) {
        if (location && location.start && location.start.cfi) {
            localStorage.setItem(`bookmark_${bookId}`, location.start.cfi);
            
            const progressEl = document.getElementById('reading-progress');
            if (progressEl) {
                const percentage = location.start.percentage;
                
                if (percentage !== undefined && percentage > 0) {
                    const displayPercent = (percentage * 100).toFixed(1);
                    progressEl.innerText = displayPercent + "%";

                    // --- COMPARSA DEL BOTTONE RECENSIONE AL 100% ---
                    const reviewBtn = document.getElementById('reader-review-btn');
                    if (reviewBtn) {
                        if (percentage >= 0.995) {
                            if (reviewBtn.style.display === 'none') {
                                // Tema Dinamico usando la tua variabile globale isDarkMode
                                reviewBtn.style.background = isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)';
                                reviewBtn.style.color = isDarkMode ? '#d4af37' : '#b89222'; 
                                reviewBtn.style.border = `1px solid ${isDarkMode ? 'rgba(212,175,55,0.4)' : 'rgba(184,146,34,0.4)'}`;
                                reviewBtn.style.boxShadow = isDarkMode ? '0 4px 15px rgba(0,0,0,0.5)' : '0 4px 15px rgba(0,0,0,0.1)';

                                reviewBtn.style.display = 'block';
                                // Nuova animazione morbida adatta alla barra inferiore
                                reviewBtn.animate([
                                    { opacity: 0, transform: 'translateY(10px)' },
                                    { opacity: 1, transform: 'translateY(0)' }
                                ], { duration: 500, fill: 'forwards' });
                            }
                        } else {
                            reviewBtn.style.display = 'none';
                        }
                    }
                } else {
                    progressEl.innerText = "0%";
                }

                if (percentage !== undefined) {
                    fetch(`/api/books/${bookId}/progress`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ progress: percentage })
                    }).catch(err => console.warn("Errore sync progresso 3D:", err));
                }
            }
        }
    });
};

// -- FUNZINI DI TRADUZIONE
window.translateReaderUI = function() {
    const el = (id) => document.getElementById(id);
    
    if(el('sidebar-title')) el('sidebar-title').innerText = window.t('personalizeReader');
    if(el('sidebar-font-label')) el('sidebar-font-label').innerText = window.t('font');
    if(el('sidebar-font-default')) el('sidebar-font-default').innerText = window.t('defaultfromBook');
    if(el('sidebar-zoom-label')) el('sidebar-zoom-label').innerText = window.t('textSize');
    if(el('sidebar-line-label')) el('sidebar-line-label').innerText = window.t('lineHeight');
    if(el('sidebar-flow-label')) el('sidebar-flow-label').innerText = window.t('readingMode');
    if(el('sidebar-flow-horiz')) el('sidebar-flow-horiz').innerText = window.t('horizontal');
    if(el('sidebar-flow-vert')) el('sidebar-flow-vert').innerText = window.t('vertical');
};

// --- FUNZIONI DI RENDERING PDF ---
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const canvas = document.getElementById('pdf-canvas');
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('pdf-container');
        
        // Calcoliamo lo spazio disponibile, togliendo 20px per non toccare i bordi fisici
        const containerWidth = container.clientWidth - 20;
        const containerHeight = container.clientHeight - 20;

        // Prendiamo le proporzioni originali del PDF (scala 1.0)
        const unscaledViewport = page.getViewport({ scale: 1.0 });

        // Troviamo il moltiplicatore perfetto per farlo entrare in altezza o in larghezza
        const scaleWidth = containerWidth / unscaledViewport.width;
        const scaleHeight = containerHeight / unscaledViewport.height;
        const bestFitScale = Math.min(scaleWidth, scaleHeight);

        // Applichiamo lo zoom utente (100% sulla barra = Adatta perfettamente allo schermo)
        const savedZoom = parseInt(localStorage.getItem('readerZoom') || '100') / 100;
        const finalScale = bestFitScale * savedZoom;
        
        const viewport = page.getViewport({scale: finalScale});
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
        setTimeout(window.updateScrollIndicator, 100);
    });
    
    // Sincronizza progresso e bottone recensione
    const percentage = num / pdfDoc.numPages;
    const progressEl = document.getElementById('reading-progress');
    if (progressEl) {
        progressEl.innerText = Math.round(percentage * 100) + "%";
    }
    
    // Mostra il bottone recensione se siamo all'ultima pagina
    const reviewBtn = document.getElementById('reader-review-btn');
    if (reviewBtn) {
        if (num === pdfDoc.numPages) {
            reviewBtn.style.display = 'block';
            window.applyCurrentTheme(); // Riapplica il tema per colorare il bottone
        } else {
            reviewBtn.style.display = 'none';
        }
    }

    // Salva il segnalibro e invia al server
    localStorage.setItem(`pdf_bookmark_${currentPdfId}`, num);
    fetch(`/api/books/${currentPdfId}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: percentage })
    }).catch(e => console.warn(e));
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// --- LOGICA INDICATORE DI SCORRIMENTO (FRECCIA) ---
window.updateScrollIndicator = function() {
    const container = document.getElementById('pdf-container');
    const indicator = document.getElementById('scroll-indicator');

    // Se uno dei due non esiste, esci subito senza fare nulla (evita l'errore)
    if (!container || !indicator) return;

    // Se il container è nascosto, nascondi anche l'indicatore
    if (container.style.display === 'none') {
        indicator.style.display = 'none';
        return;
    }

    const canScroll = container.scrollHeight > container.clientHeight;
    const atBottom = Math.ceil(container.scrollTop) + container.clientHeight >= container.scrollHeight - 5;

    indicator.style.display = (canScroll && !atBottom) ? 'block' : 'none';
};

function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    if (localStorage.getItem('readerFlow') === 'scrolled-doc') {
        const target = document.getElementById(`pdf-page-wrapper-${pageNum}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        queueRenderPage(pageNum);
    }
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    if (localStorage.getItem('readerFlow') === 'scrolled-doc') {
        const target = document.getElementById(`pdf-page-wrapper-${pageNum}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        queueRenderPage(pageNum);
    }
}
// La funzione che viene chiamata da main.js
window.openPdfReader = function(pdfUrl, bookId) {
    currentPdfUrl = pdfUrl; 
    currentPdfId = bookId;
    const readerOverlay = document.getElementById('reader-overlay');
    const pdfContainer = document.getElementById('pdf-container');
    
    const savedFlow = localStorage.getItem('readerFlow') || 'paginated';
    const isContinuous = (savedFlow === 'scrolled-doc');

    const readerReviewBtn = document.getElementById('reader-review-btn');
    if (readerReviewBtn) {
        readerReviewBtn.style.display = 'none';
        readerReviewBtn.innerHTML = window.t('readerReviewBtnText'); 
        readerReviewBtn.onclick = () => window.openReviewModal(bookId); 
    }

    if (readerOverlay) readerOverlay.style.display = 'block'; 
    setTimeout(() => { if (readerOverlay) readerOverlay.style.opacity = '1'; }, 50);

    if (!pdfContainer) return;
    pdfContainer.innerHTML = ''; 
    pdfContainer.style.display = 'block';

    const fontS = document.getElementById('sidebar-font-select');
    const lineS = document.getElementById('sidebar-line-height-slider');

    if (fontS && fontS.parentElement) fontS.parentElement.style.display = 'none';
    if (lineS && lineS.parentElement) lineS.parentElement.style.display = 'none';

    // --- GESTIONE LAYOUT (CONTINUO vs PAGINATO) ---
    const pBtn = document.getElementById('prev-page-btn');
    const nBtn = document.getElementById('next-page-btn');

    if (isContinuous) {
        if (pBtn) pBtn.style.display = 'none';
        if (nBtn) nBtn.style.display = 'none';
        pdfContainer.style.overflowY = 'auto'; // Abilita rotellina
    } else {
        if (pBtn) pBtn.style.display = 'flex';
        if (nBtn) nBtn.style.display = 'flex';
        pdfContainer.style.overflowY = 'auto'; // Blocca rotellina
        
        // Ricrea il canvas singolo per la modalità paginata
        const singleCanvas = document.createElement('canvas');
        singleCanvas.id = 'pdf-canvas';
        singleCanvas.style.display = 'block';
        singleCanvas.style.margin = '0 auto';
        pdfContainer.appendChild(singleCanvas);
    }
    
    pdfPagesRendered = {}; 

    const pdfKeyListener = function(e) {
        if (e.key === "ArrowRight") onNextPage();
        if (e.key === "ArrowLeft") onPrevPage();
    };
    document.addEventListener("keydown", pdfKeyListener);
    window.addEventListener('readerClosed', () => {
        document.removeEventListener("keydown", pdfKeyListener);
    }, { once: true });

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(function(pdf) {
        pdfDoc = pdf;
        const savedPage = localStorage.getItem(`pdf_bookmark_${bookId}`);
        pageNum = savedPage ? parseInt(savedPage) : 1;
        if (pageNum > pdf.numPages) pageNum = pdf.numPages;

        if (isContinuous) {
            // Costruzione Colonna Infinita
            pdf.getPage(1).then(function(firstPage) {
                const containerWidth = pdfContainer.clientWidth - 40;
                const unscaledViewport = firstPage.getViewport({ scale: 1.0 });
                const bestFitScale = containerWidth / unscaledViewport.width;
                const savedZoom = parseInt(localStorage.getItem('readerZoom') || '100') / 100;
                const finalScale = bestFitScale * savedZoom;
                const viewport = firstPage.getViewport({ scale: finalScale });

                for (let i = 1; i <= pdf.numPages; i++) {
                    const pageWrapper = document.createElement('div');
                    pageWrapper.id = `pdf-page-wrapper-${i}`;
                    pageWrapper.className = 'pdf-page-wrapper';
                    pageWrapper.style.width = `${viewport.width}px`;
                    pageWrapper.style.height = `${viewport.height}px`;
                    pageWrapper.style.margin = '25px auto';
                    pageWrapper.style.position = 'relative';
                    pageWrapper.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#ffffff';
                    pageWrapper.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                    pageWrapper.setAttribute('data-page-num', i);
                    pdfContainer.appendChild(pageWrapper);
                }

                setupPdfLazyLoading();

                if (pageNum > 1) {
                    const targetWrapper = document.getElementById(`pdf-page-wrapper-${pageNum}`);
                    if (targetWrapper) setTimeout(() => targetWrapper.scrollIntoView({ block: 'start' }), 150);
                }
                window.applyCurrentTheme();
            });
        } else {
            // Rendering Classico Singolo
            renderPage(pageNum);
            window.applyCurrentTheme();
        }
    }).catch(err => {
        alert("Errore caricamento PDF: " + err.message);
    });
};

window.updatePdfZoom = function() {
    if (!pdfDoc) return;
    if (localStorage.getItem('readerFlow') !== 'scrolled-doc') {
        queueRenderPage(pageNum);
        return;
    }
    
    const pdfContainer = document.getElementById('pdf-container');
    if (!pdfContainer) return;

    // Ricalcoliamo le dimensioni ottimali in base al nuovo livello di zoom
    pdfDoc.getPage(1).then(function(firstPage) {
        const containerWidth = pdfContainer.clientWidth - 40;
        const unscaledViewport = firstPage.getViewport({ scale: 1.0 });
        const bestFitScale = containerWidth / unscaledViewport.width;
        const savedZoom = parseInt(localStorage.getItem('readerZoom') || '100') / 100;
        const finalScale = bestFitScale * savedZoom;
        const viewport = firstPage.getViewport({ scale: finalScale });

        // Aggiorniamo tutti i contenitori (wrapper) nel documento
        const wrappers = document.querySelectorAll('.pdf-page-wrapper');
        wrappers.forEach(wrapper => {
            wrapper.style.width = `${viewport.width}px`;
            wrapper.style.height = `${viewport.height}px`;
            
            const num = parseInt(wrapper.getAttribute('data-page-num'));
            
            // Se la pagina è attualmente visibile a schermo, la ridisegniamo ad alta risoluzione
            if (pdfPagesRendered[num]) {
                wrapper.innerHTML = ''; // Puliamo la vecchia tela
                renderContinuousPdfPage(num, wrapper);
            }
        });
    });
};

function setupPdfLazyLoading() {
    const pdfContainer = document.getElementById('pdf-container');
    if (!pdfContainer) return;

    const options = {
        root: pdfContainer,
        rootMargin: '600px 0px', // Inizia a renderizzare 600px prima che appaia nello schermo
        threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const num = parseInt(entry.target.getAttribute('data-page-num'));
            if (entry.isIntersecting) {
                // Se la pagina è vicina allo schermo e non è renderizzata, creiamo il canvas
                if (!pdfPagesRendered[num]) {
                    renderContinuousPdfPage(num, entry.target);
                }
            } else {
                // Se la pagina è lontana, distruggiamo il canvas per liberare istantaneamente la RAM
                if (pdfPagesRendered[num]) {
                    entry.target.innerHTML = ''; 
                    pdfPagesRendered[num] = false;
                }
            }
        });
    }, options);

    // Colleghiamo l'observer a tutti i wrapper generati
    document.querySelectorAll('.pdf-page-wrapper').forEach(wrapper => observer.observe(wrapper));

    // Monitoriamo lo scroll per aggiornare la percentuale e i segnalibri in tempo reale
    pdfContainer.addEventListener('scroll', updatePdfScrollProgress);
}

function renderContinuousPdfPage(num, wrapper) {
    pdfPagesRendered[num] = true;
    wrapper.innerHTML = '';

    pdfDoc.getPage(num).then(function(page) {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        wrapper.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const containerWidth = document.getElementById('pdf-container').clientWidth - 40;
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const bestFitScale = containerWidth / unscaledViewport.width;
        const savedZoom = parseInt(localStorage.getItem('readerZoom') || '100') / 100;
        const finalScale = bestFitScale * savedZoom;
        
        const viewport = page.getViewport({ scale: finalScale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderContext);
    });
}

function updatePdfScrollProgress() {
    const pdfContainer = document.getElementById('pdf-container');
    if (!pdfContainer || !pdfDoc) return;

    // Calcoliamo la pagina centrale rispetto al viewport attuale del container
    const containerCenter = pdfContainer.scrollTop + (pdfContainer.clientHeight / 2);
    const wrappers = document.querySelectorAll('.pdf-page-wrapper');
    let currentPageNum = 1;

    wrappers.forEach(wrapper => {
        const top = wrapper.offsetTop;
        const bottom = top + wrapper.clientHeight;
        if (containerCenter >= top && containerCenter <= bottom) {
            currentPageNum = parseInt(wrapper.getAttribute('data-page-num'));
        }
    });

    // Sincronizziamo la variabile di pagina globale
    pageNum = currentPageNum;

    // Aggiorna percentuale visiva
    const percentage = currentPageNum / pdfDoc.numPages;
    const progressEl = document.getElementById('reading-progress');
    if (progressEl) {
        progressEl.innerText = Math.round(percentage * 100) + "%";
    }

    // Gestione bottone recensione a fine documento
    const reviewBtn = document.getElementById('reader-review-btn');
    if (reviewBtn) {
        if (currentPageNum === pdfDoc.numPages) {
            reviewBtn.style.display = 'block';
        } else {
            reviewBtn.style.display = 'none';
        }
    }

    // Salva la posizione
    localStorage.setItem(`pdf_bookmark_${currentPdfId}`, currentPageNum);
}

window.closeReader = function() {
    const readerOverlay = document.getElementById('reader-overlay');
    const viewer = document.getElementById('viewer');
    
    if (readerOverlay) readerOverlay.style.opacity = '0';
    
    setTimeout(() => {
        if (readerOverlay) readerOverlay.style.display = 'none';
        if (viewer) viewer.innerHTML = ''; 
        
        if (currentBook) {
            currentBook.destroy();
            currentBook = null;
            rendition = null;
        }

        // Pulisci il PDF
        if (pdfDoc) {
            pdfDoc = null;
            pdfPagesRendered = {};
        }

        const pdfContainer = document.getElementById('pdf-container');
        if (pdfContainer) pdfContainer.innerHTML = '';

        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) scrollIndicator.style.display = 'none';

        window.dispatchEvent(new Event('readerClosed'));
    }, 800); 
};

window.applyCurrentTheme = function() {
    const readerOverlay = document.getElementById('reader-overlay');
    const themeBtn = document.getElementById('theme-toggle-btn');
    const readingProgress = document.getElementById('reading-progress');
    const closeReaderBtn = document.getElementById('close-reader-btn');

    // Riferimenti al nuovo Menu Laterale
    const sidebar = document.getElementById('settings-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const fontSelect = document.getElementById('sidebar-font-select');
    const flowSelect = document.getElementById('sidebar-flow-select');
    const pdfContainer = document.getElementById('pdf-container');

    // Recupera i settaggi salvati per l'EPUB
    const savedFont = localStorage.getItem('readerFont') || 'inherit';
    const savedLineHeight = localStorage.getItem('readerLineHeight') || '1.65';

    if (isDarkMode) {
        if (pdfContainer) {
            // Applica il filtro a tutto il contenitore (anche ai futuri canvas dinamici)
            pdfContainer.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.85)';
            pdfContainer.style.mixBlendMode = 'screen'; 
        }
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.background = 'rgba(255, 255, 255, 0.15)';
            scrollIndicator.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            scrollIndicator.style.color = '#ffffff';
            scrollIndicator.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
        }
        if (readerOverlay) readerOverlay.style.background = '#121212';
        if (themeBtn) {
            themeBtn.innerText = '☀️ Light Mode';
            themeBtn.style.color = '#ffffff';
            themeBtn.style.background = 'rgba(255, 255, 255, 0.08)';
            themeBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        }
        if (readingProgress) {
            readingProgress.style.color = '#ffffff';
            readingProgress.style.background = 'rgba(255, 255, 255, 0.08)';
        }
        if (closeReaderBtn) {
            closeReaderBtn.style.color = '#ffffff';
            closeReaderBtn.style.background = 'rgba(255, 255, 255, 0.08)';
            closeReaderBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        }
        if (sidebar) {
            sidebar.style.background = 'rgba(25, 25, 25, 0.95)';
            sidebar.style.color = '#ffffff';
            sidebar.style.borderRight = '1px solid rgba(255, 255, 255, 0.1)';
        }
        if (closeSidebarBtn) closeSidebarBtn.style.color = '#ffffff';
        if (hamburgerBtn) {
            hamburgerBtn.style.color = '#ffffff';
            hamburgerBtn.style.background = 'rgba(255, 255, 255, 0.08)';
        }if (fontSelect) {
            fontSelect.style.color = '#ffffff';
            fontSelect.style.backgroundColor = '#222222'; // Sfondo solido scuro
        }
        if (flowSelect) {
            flowSelect.style.color = '#ffffff';
            flowSelect.style.backgroundColor = '#222222';
        }
    } else {
        if (pdfContainer) {
            pdfContainer.style.filter = 'none';
            pdfContainer.style.mixBlendMode = 'multiply'; 
        }
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.background = 'rgba(0, 0, 0, 0.08)';
            scrollIndicator.style.border = '1px solid rgba(0, 0, 0, 0.1)';
            scrollIndicator.style.color = '#333333';
            scrollIndicator.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }
        if (readerOverlay) readerOverlay.style.background = '#faf9f6';
        if (themeBtn) {
            themeBtn.innerText = '🌙 Dark Mode';
            themeBtn.style.color = '#000000';
            themeBtn.style.background = 'rgba(0, 0, 0, 0.1)';
            themeBtn.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        }
        if (readingProgress) {
            readingProgress.style.color = '#000000';
            readingProgress.style.background = 'rgba(0, 0, 0, 0.1)';
        }
        if (closeReaderBtn) {
            closeReaderBtn.style.color = '#000000';
            closeReaderBtn.style.background = 'rgba(0, 0, 0, 0.1)';
            closeReaderBtn.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        }
        if (sidebar) {
            sidebar.style.background = 'rgba(245, 245, 245, 0.95)';
            sidebar.style.color = '#000000';
            sidebar.style.borderRight = '1px solid rgba(0, 0, 0, 0.1)';
        }
        if (closeSidebarBtn) closeSidebarBtn.style.color = '#000000';
        if (hamburgerBtn) {
            hamburgerBtn.style.color = '#000000';
            hamburgerBtn.style.background = 'rgba(0, 0, 0, 0.1)';
        }
        if (fontSelect) {
            fontSelect.style.color = '#000000'; // Testo nero leggibile
            fontSelect.style.backgroundColor = '#f0f0f0'; // Sfondo solido chiaro
        }
        if (flowSelect) {
            flowSelect.style.color = '#000000';
            flowSelect.style.backgroundColor = '#f0f0f0';
        }
    }

    if (rendition && typeof rendition.getContents === 'function') {
        const activePages = rendition.getContents();
        
        activePages.forEach(contents => {
            if (!contents || !contents.document || !contents.document.head) return;

            let styleTag = contents.document.getElementById("custom-bulletproof-theme");
            if (!styleTag) {
                styleTag = contents.document.createElement("style");
                styleTag.id = "custom-bulletproof-theme";
                contents.document.head.appendChild(styleTag);
            }

            if (isDarkMode) {
                styleTag.innerHTML = `
                    html, body { 
                        background-color: #121212 !important; 
                        line-height: ${savedLineHeight} !important; 
                        font-family: ${savedFont} !important;
                        -ms-overflow-style: none !important;  /* Firefox / Edge vecchi */
                        scrollbar-width: none !important;     /* Firefox moderno */
                    }
                    
                    ::-webkit-scrollbar { 
                        display: none !important; 
                        width: 0 !important; 
                    }

                    h1, h2, h3, h4, h5, h6, p, span, li, blockquote, div, section { 
                        color: #e0e0e0 !important; 
                        background-color: transparent; 
                        font-family: ${savedFont} !important;
                    }
                    p { text-align: justify !important; }
                    a, a * { color: #4da6ff !important; }
                    img, svg { filter: brightness(0.85); }
                `;
            } else {
                styleTag.innerHTML = `
                    html, body { 
                        background-color: #faf9f6 !important; 
                        line-height: ${savedLineHeight} !important; 
                        font-family: ${savedFont} !important;
                        -ms-overflow-style: none !important;  /* Firefox / Edge vecchi */
                        scrollbar-width: none !important; 
                    }

                    ::-webkit-scrollbar { 
                        display: none !important; 
                        width: 0 !important; 
                    }

                    h1, h2, h3, h4, h5, h6, p, span, li, blockquote, div, section { 
                        color: #2b2b2b !important; 
                        background-color: transparent; 
                        font-family: ${savedFont} !important;
                    }
                    p { text-align: justify !important; }
                    a, a * { color: #0066cc !important; }
                    img, svg { filter: brightness(1); }
                `;
            }
        });
    }
};

// --- FUNZIONE PER APRIRE LA RECENSIONE DIRETTAMENTE DAL LETTORE ---
window.openReviewModal = async function(bookId) {
    // 1. Palette dinamica basata sul tema attuale
    const overlayBg = isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';
    const modalBg = isDarkMode ? 'rgba(30,30,30,0.85)' : 'rgba(240,240,240,0.85)';
    const textColor = isDarkMode ? '#ffffff' : '#222222';
    const inputBg = isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)';
    const inputBorder = isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
    const btnBg = isDarkMode ? 'rgba(50,50,50,0.8)' : 'rgba(220,220,220,0.9)';

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0'; overlay.style.left = '0';
    overlay.style.width = '100vw'; overlay.style.height = '100vh';
    overlay.style.backgroundColor = overlayBg;
    overlay.style.zIndex = '2000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backdropFilter = 'blur(8px)';
    document.body.appendChild(overlay);

    const modal = document.createElement('div');
    modal.className = 'glass-effect';
    modal.style.padding = '35px';
    modal.style.borderRadius = '20px';
    modal.style.width = '90%';
    modal.style.maxWidth = '500px';
    modal.style.textAlign = 'center';
    modal.style.color = textColor;
    modal.style.backgroundColor = modalBg;
    overlay.appendChild(modal);

    const title = document.createElement('h2');
    title.innerText = window.t('reviewModalTitleLong'); 
    title.style.marginTop = '0';
    modal.appendChild(title);

    let selectedRating = 0;
    let textArea = document.createElement('textarea');

    try {
        const res = await fetch('/api/books');
        const books = await res.json();
        const book = books.find(b => b.id === bookId);
        if (book) {
            selectedRating = book.rating || 0;
            textArea.value = book.review || '';
        }
    } catch(e) {}

    const starsContainer = document.createElement('div');
    starsContainer.style.fontSize = '45px';
    starsContainer.style.cursor = 'pointer';
    starsContainer.style.marginBottom = '20px';
    
    const updateStars = () => {
        starsContainer.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = i <= selectedRating ? '★' : '☆';
            star.style.color = i <= selectedRating ? '#d4af37' : (isDarkMode ? '#555' : '#ccc');
            star.style.transition = 'color 0.2s';
            star.onclick = () => { selectedRating = i; updateStars(); };
            starsContainer.appendChild(star);
        }
    };
    updateStars();
    modal.appendChild(starsContainer);

    textArea.placeholder = window.t('reviewPlaceholderHot');
    textArea.className = 'modern-input';
    textArea.style.width = '90%';
    textArea.style.height = '120px';
    textArea.style.background = inputBg;
    textArea.style.color = textColor;
    textArea.style.border = `1px solid ${inputBorder}`;
    textArea.style.borderRadius = '12px';
    textArea.style.padding = '15px';
    textArea.style.resize = 'none';
    textArea.style.fontFamily = 'inherit';
    modal.appendChild(textArea);

    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '15px';
    btnContainer.style.justifyContent = 'center';
    btnContainer.style.marginTop = '25px';

    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = window.t('cancelBtn'); 
    cancelBtn.className = 'glass-effect modern-btn';
    cancelBtn.style.background = btnBg;
    cancelBtn.style.color = textColor;
    cancelBtn.onclick = () => overlay.remove();

    const saveBtn = document.createElement('button');
    saveBtn.innerText = window.t('saveMemoriesBtn');
    saveBtn.className = 'glass-effect modern-btn';
    saveBtn.style.background = isDarkMode ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.4)';
    saveBtn.style.borderColor = 'rgba(212, 175, 55, 0.8)';
    saveBtn.style.color = isDarkMode ? '#fff' : '#000';
    
    saveBtn.onclick = async () => {
        if (selectedRating === 0) {
            alert(window.t('selectStarAlert'));
            return;
        }
        
        saveBtn.innerText = window.t('savingReview'); 
        saveBtn.disabled = true;
        
        try {
            const res = await fetch(`/api/books/${bookId}/review`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: selectedRating, reviewText: textArea.value })
            });
            const result = await res.json();
            if (result.success) {
                overlay.remove();
                document.getElementById('reader-review-btn').innerHTML = window.t('reviewSavedBtn');
            }
        } catch(e) { 
            console.error(e);
            saveBtn.innerText = window.t('errorRetry'); 
            saveBtn.disabled = false;
        }
    };

    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(saveBtn);
    modal.appendChild(btnContainer);
};

document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('next-page-btn');
    const prevBtn = document.getElementById('prev-page-btn');
    const pdfContainer = document.getElementById('pdf-container');

    if (pdfContainer) {
        pdfContainer.addEventListener('scroll', window.updateScrollIndicator);
    }

    if (prevBtn) prevBtn.onclick = () => { 
        if (pdfDoc) onPrevPage();
        else if (rendition) rendition.prev(); 
    };
    if (nextBtn) nextBtn.onclick = () => { 
        if (pdfDoc) onNextPage();
        else if (rendition) rendition.next(); 
    };
    

    
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay) {
        
        // --- 1. BARRA SUPERIORE DESTRA (Tema e Chiudi) ---
        const topBar = document.createElement('div');
        topBar.style.position = 'absolute';
        topBar.style.top = '10px';
        topBar.style.right = '20px';
        topBar.style.zIndex = '1000';
        topBar.style.display = 'flex';
        topBar.style.gap = '10px';

        const themeBtn = document.createElement('button');
        themeBtn.id = 'theme-toggle-btn';
        themeBtn.className = 'glass-effect modern-btn';
        themeBtn.innerText = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
        themeBtn.style.padding = '8px 20px';
        themeBtn.style.borderRadius = '50px';
        themeBtn.style.fontWeight = 'bold';
        themeBtn.style.cursor = 'pointer';
        themeBtn.style.backdropFilter = 'blur(10px)';

        const closeReaderBtn = document.createElement('button');
        closeReaderBtn.id = 'close-reader-btn';
        closeReaderBtn.className = 'glass-effect modern-btn';
        closeReaderBtn.innerHTML = '&times; ' + window.t('closeReader');
        closeReaderBtn.style.padding = '8px 20px';
        closeReaderBtn.style.borderRadius = '50px';
        closeReaderBtn.style.fontWeight = 'bold';
        closeReaderBtn.style.cursor = 'pointer';
        closeReaderBtn.style.backdropFilter = 'blur(10px)';

        themeBtn.onclick = () => {
            isDarkMode = !isDarkMode; 
            localStorage.setItem('readerDarkMode', isDarkMode); 
            window.applyCurrentTheme(); 
            
            const reviewBtn = document.getElementById('reader-review-btn');
            if (reviewBtn && reviewBtn.style.display !== 'none') {
                reviewBtn.style.background = isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)';
                reviewBtn.style.color = isDarkMode ? '#d4af37' : '#b89222'; 
                reviewBtn.style.border = `1px solid ${isDarkMode ? 'rgba(212,175,55,0.4)' : 'rgba(184,146,34,0.4)'}`;
                reviewBtn.style.boxShadow = isDarkMode ? '0 4px 15px rgba(0,0,0,0.5)' : '0 4px 15px rgba(0,0,0,0.1)';
            }
        };

        closeReaderBtn.onclick = () => window.closeReader();

        topBar.appendChild(themeBtn);
        topBar.appendChild(closeReaderBtn);
        readerOverlay.appendChild(topBar);

        // --- 2. BARRA INFERIORE DESTRA (Recensione + Percentuale) ---
        const bottomBar = document.createElement('div');
        bottomBar.style.position = 'fixed';
        bottomBar.style.bottom = '20px';
        bottomBar.style.right = '20px';
        bottomBar.style.display = 'flex';
        bottomBar.style.alignItems = 'center';
        bottomBar.style.gap = '15px';
        bottomBar.style.zIndex = '1000';

        const readerReviewBtn = document.createElement('button');
        readerReviewBtn.id = 'reader-review-btn';
        readerReviewBtn.className = 'glass-effect modern-btn';
        readerReviewBtn.style.display = 'none'; 
        readerReviewBtn.style.padding = '8px 20px'; 
        readerReviewBtn.style.fontWeight = 'bold';

        const progressText = document.createElement('div');
        progressText.id = 'reading-progress'; 
        progressText.className = 'glass-effect';
        progressText.style.padding = '8px 20px';
        progressText.style.borderRadius = '50px';
        progressText.style.fontSize = '14px';
        progressText.style.fontWeight = 'bold';
        progressText.innerText = '0%';

        bottomBar.appendChild(readerReviewBtn);
        bottomBar.appendChild(progressText);
        readerOverlay.appendChild(bottomBar);

        // --- 3. MENU HAMBURGER E SIDEBAR (In alto a sinistra) ---
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.id = 'hamburger-menu-btn';
        hamburgerBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>`;
        hamburgerBtn.className = 'glass-effect modern-btn';
        hamburgerBtn.style.position = 'absolute';
        hamburgerBtn.style.top = '10px';
        hamburgerBtn.style.left = '20px';
        hamburgerBtn.style.zIndex = '1001';
        hamburgerBtn.style.padding = '8px 12px';
        hamburgerBtn.style.borderRadius = '12px';
        hamburgerBtn.style.cursor = 'pointer';
        hamburgerBtn.style.display = 'flex';
        hamburgerBtn.style.alignItems = 'center';

        const sidebar = document.createElement('div');
        sidebar.id = 'settings-sidebar';
        sidebar.className = 'glass-effect';
        sidebar.style.position = 'fixed';
        sidebar.style.top = '0';
        sidebar.style.left = '0';
        sidebar.style.width = '320px';
        sidebar.style.maxWidth = '80vw';
        sidebar.style.height = '100vh';
        sidebar.style.transform = 'translateX(-100%)'; 
        sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        sidebar.style.zIndex = '2000';
        sidebar.style.padding = '25px';
        sidebar.style.boxSizing = 'border-box';
        sidebar.style.backdropFilter = 'blur(20px)';

        sidebar.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <h2 id="sidebar-title" style="margin: 0; font-size: 22px;"></h2>
                <button id="close-sidebar-btn" style="background: transparent; border: none; font-size: 28px; cursor: pointer;">&times;</button>
            </div>

            <div style="margin-bottom: 25px;">
                <label id="sidebar-font-label" style="display: block; margin-bottom: 10px; font-weight: bold; font-size: 14px; opacity: 0.8;"></label>
                <select id="sidebar-font-select" class="modern-input glass-effect" style="width: 100%; padding: 12px; border-radius: 12px; outline: none; cursor: pointer;">
                    <option id="sidebar-font-default" value="inherit"></option>
                    <option value="'Georgia', serif">Georgia (Serif)</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Arial', sans-serif">Arial (Sans-serif)</option>
                    <option value="'Courier New', monospace">Courier</option>
                </select>
            </div>

            <div style="margin-bottom: 25px;">
                <label id="sidebar-zoom-label" style="display: block; margin-bottom: 10px; font-weight: bold; font-size: 14px; opacity: 0.8;"></label>
                <input type="range" id="sidebar-zoom-slider" class="glass-slider" min="80" max="250" value="${localStorage.getItem('readerZoom') || '100'}" style="width: 100%;">
            </div>

            <div style="margin-bottom: 25px;">
                <label id="sidebar-line-label" style="display: block; margin-bottom: 10px; font-weight: bold; font-size: 14px; opacity: 0.8;"></label>
                <input type="range" id="sidebar-line-height-slider" class="glass-slider" min="1.0" max="3.0" step="0.1" value="${localStorage.getItem('readerLineHeight') || '1.65'}" style="width: 100%;">
            </div>

            <div style="margin-bottom: 25px;">
                <label id="sidebar-flow-label" style="display: block; margin-bottom: 10px; font-weight: bold; font-size: 14px; opacity: 0.8;"></label>
                <select id="sidebar-flow-select" class="modern-input glass-effect" style="width: 100%; padding: 12px; border-radius: 12px; outline: none; cursor: pointer;">
                    <option id="sidebar-flow-horiz" value="paginated"></option>
                    <option id="sidebar-flow-vert" value="scrolled-doc"></option>
                </select>
            </div>
        `;

        const sidebarBackdrop = document.createElement('div');
        sidebarBackdrop.style.position = 'fixed';
        sidebarBackdrop.style.top = '0';
        sidebarBackdrop.style.left = '0';
        sidebarBackdrop.style.width = '100vw';
        sidebarBackdrop.style.height = '100vh';
        sidebarBackdrop.style.background = 'rgba(0,0,0,0.4)';
        sidebarBackdrop.style.zIndex = '1999';
        sidebarBackdrop.style.opacity = '0';
        sidebarBackdrop.style.pointerEvents = 'none';
        sidebarBackdrop.style.transition = 'opacity 0.3s ease';

        readerOverlay.appendChild(hamburgerBtn);
        readerOverlay.appendChild(sidebarBackdrop);
        readerOverlay.appendChild(sidebar);

        const chiudiSidebar = () => {
            sidebar.style.transform = 'translateX(-100%)';
            sidebarBackdrop.style.opacity = '0';
            sidebarBackdrop.style.pointerEvents = 'none';
        };

        hamburgerBtn.onclick = () => {
            sidebar.style.transform = 'translateX(0)';
            sidebarBackdrop.style.opacity = '1';
            sidebarBackdrop.style.pointerEvents = 'auto';
        };

        document.getElementById('close-sidebar-btn').onclick = chiudiSidebar;
        sidebarBackdrop.onclick = chiudiSidebar;

        // --- 4. COLLEGAMENTO EVENTI SIDEBAR (Font, Zoom, Interlinea) ---
        const fontSelect = document.getElementById('sidebar-font-select');
        const zoomSideSlider = document.getElementById('sidebar-zoom-slider');
        const lineSlider = document.getElementById('sidebar-line-height-slider');
        const flowSelect = document.getElementById('sidebar-flow-select');

        // Impostazioni Font
        if (fontSelect) {
            fontSelect.value = localStorage.getItem('readerFont') || 'inherit';
            fontSelect.addEventListener('change', (e) => {
                localStorage.setItem('readerFont', e.target.value);
                window.applyCurrentTheme(); 
            });
        }

        // Impostazioni Zoom
        if (zoomSideSlider) {
            zoomSideSlider.value = localStorage.getItem('readerZoom') || '100';
            zoomSideSlider.addEventListener('input', (e) => {
                const val = e.target.value;
                localStorage.setItem('readerZoom', val);
                if (typeof rendition !== 'undefined' && rendition) {
                    rendition.themes.fontSize(`${val}%`);
                } else if (typeof pdfDoc !== 'undefined' && pdfDoc) {
                    window.updatePdfZoom();
                }
            });
        }

        // Impostazioni Interlinea
        if (lineSlider) {
            lineSlider.value = localStorage.getItem('readerLineHeight') || '1.65';
            lineSlider.addEventListener('input', (e) => {
                localStorage.setItem('readerLineHeight', e.target.value);
                window.applyCurrentTheme();
            });
        }

        // Impostazioni Modalità Scorrimento (IBRIDO EPUB E PDF)
        if (flowSelect) {
            flowSelect.value = localStorage.getItem('readerFlow') || 'paginated';
            flowSelect.addEventListener('change', async (e) => {
                const newFlow = e.target.value;
                localStorage.setItem('readerFlow', newFlow);
                
                // Nascondi o mostra le frecce istantaneamente
                const pBtn = document.getElementById('prev-page-btn');
                const nBtn = document.getElementById('next-page-btn');
                if (newFlow === 'scrolled-doc') {
                    if (pBtn) pBtn.style.display = 'none';
                    if (nBtn) nBtn.style.display = 'none';
                } else {
                    if (pBtn) pBtn.style.display = 'flex';
                    if (nBtn) nBtn.style.display = 'flex';
                }
                
                // Aggiornamento EPUB
                if (typeof rendition !== 'undefined' && rendition) {
                    let currentCfi = null;
                    try { currentCfi = rendition.currentLocation().start.cfi; } catch(err) {}
                    rendition.flow(newFlow);
                    if (currentCfi) rendition.display(currentCfi);
                } 
                // Aggiornamento PDF
                else if (typeof pdfDoc !== 'undefined' && pdfDoc) {
                    // Ricarica tutto il PDF nella nuova veste grafica mantenendo la pagina salvata!
                    window.openPdfReader(currentPdfUrl, currentPdfId);
                }
            });
        }
    }
});

window.addEventListener('resize', () => {
    // 1. Gestione ridimensionamento EPUB
    if (rendition) {
        rendition.resize('100%', '100%');
    }
    
    // 2. Gestione ridimensionamento PDF
    const pdfContainer = document.getElementById('pdf-container');
    if (pdfDoc && pdfContainer && pdfContainer.style.display !== 'none') {
        queueRenderPage(pageNum);
        setTimeout(window.updateScrollIndicator, 100);
    }
});