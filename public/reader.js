let currentBook = null;
let rendition = null;

// --- VARIABILI GLOBALI PDF.JS ---
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
const scaleBase = 1.5; // Scala di base per una buona risoluzione
let currentPdfId = null;

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
        alert("File EPUB non trovato per questo libro!");
        return;
    }

    const readerOverlay = document.getElementById('reader-overlay');
    const viewer = document.getElementById('viewer');

    if (!readerOverlay || !viewer) {
        console.error("ERRORE: Manca l'HTML del lettore in index.html!");
        return;
    }

    readerOverlay.style.display = 'block';
    setTimeout(() => readerOverlay.style.opacity = '1', 50);

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

    rendition = currentBook.renderTo("viewer", {
        width: "100%",
        height: "100%",
        spread: "none",
        flow: "paginated",
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
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
}

// La funzione che viene chiamata da main.js
window.openPdfReader = function(pdfUrl, bookId) {
    currentPdfId = bookId;
    const readerOverlay = document.getElementById('reader-overlay');
    
    // Resetta il bottone recensione
    const readerReviewBtn = document.getElementById('reader-review-btn');
    if (readerReviewBtn) {
        readerReviewBtn.style.display = 'none';
        readerReviewBtn.innerHTML = window.t('readerReviewBtnText'); 
        readerReviewBtn.onclick = () => window.openReviewModal(bookId); 
    }

    readerOverlay.style.display = 'block'; 

    // --- GESTIONE FRECCE TASTIERA PER PDF ---
    const pdfKeyListener = function(e) {
        if (e.key === "ArrowRight") onNextPage();
        if (e.key === "ArrowLeft") onPrevPage();
    };
    document.addEventListener("keydown", pdfKeyListener);
    
    window.addEventListener('readerClosed', () => {
        document.removeEventListener("keydown", pdfKeyListener);
    }, { once: true });

    setTimeout(() => readerOverlay.style.opacity = '1', 50);

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(function(pdf) {
        pdfDoc = pdf;
        
        // Ripristina l'ultima pagina letta
        const savedPage = localStorage.getItem(`pdf_bookmark_${bookId}`);
        pageNum = savedPage ? parseInt(savedPage) : 1;
        if (pageNum > pdf.numPages) pageNum = pdf.numPages;
        
        renderPage(pageNum);
        window.applyCurrentTheme();
    }).catch(err => {
        alert("Errore caricamento PDF: " + err.message);
    });
};

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
            const canvas = document.getElementById('pdf-canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        const pdfContainer = document.getElementById('pdf-container');
        if (pdfContainer) pdfContainer.style.display = 'none';

        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) scrollIndicator.style.display = 'none';

        window.dispatchEvent(new Event('readerClosed'));
    }, 800); 
};

window.applyCurrentTheme = function() {
    const readerOverlay = document.getElementById('reader-overlay');
    const themeBtn = document.getElementById('theme-toggle-btn');
    const readingProgress = document.getElementById('reading-progress');
    const bottomBarZoom = document.getElementById('bottom-bar-zoom');

    if (isDarkMode) {
        const pdfCanvas = document.getElementById('pdf-canvas');
        if (pdfCanvas) {
            pdfCanvas.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.85)';
            pdfCanvas.style.mixBlendMode = 'screen'; 
        }
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.background = 'rgba(255, 255, 255, 0.15)';
            scrollIndicator.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            scrollIndicator.style.color = '#ffffff';
            scrollIndicator.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
        }
        if (readerOverlay) readerOverlay.style.background = '#121212';
        if (themeBtn) themeBtn.innerText = '☀️ Light Mode';
        if (readingProgress) {
            readingProgress.style.color = '#ffffff';
            readingProgress.style.background = 'rgba(255, 255, 255, 0.08)';
        }
        if (bottomBarZoom) {
            bottomBarZoom.style.color = '#ffffff';
            bottomBarZoom.style.background = 'rgba(255, 255, 255, 0.08)';
        }
    } else {
        const pdfCanvas = document.getElementById('pdf-canvas');
        if (pdfCanvas) {
            pdfCanvas.style.filter = 'none';
            pdfCanvas.style.mixBlendMode = 'multiply'; 
        }
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.background = 'rgba(0, 0, 0, 0.08)';
            scrollIndicator.style.border = '1px solid rgba(0, 0, 0, 0.1)';
            scrollIndicator.style.color = '#333333';
            scrollIndicator.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }
        if (readerOverlay) readerOverlay.style.background = '#faf9f6';
        if (themeBtn) themeBtn.innerText = '🌙 Dark Mode';
        if (readingProgress) {
            readingProgress.style.color = '#000000';
            readingProgress.style.background = 'rgba(0, 0, 0, 0.1)';
        }
        if (bottomBarZoom) {
            bottomBarZoom.style.color = '#000000';
            bottomBarZoom.style.background = 'rgba(0, 0, 0, 0.1)';
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
                    html, body { background-color: #121212 !important; }
                    * { color: #e0e0e0 !important; background-color: transparent !important; }
                    a, a * { color: #4da6ff !important; }
                    img, svg { filter: brightness(0.85); }
                `;
            } else {
                styleTag.innerHTML = `
                    html, body { background-color: #faf9f6 !important; }
                    * { color: #000000 !important; background-color: transparent !important; }
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
    const themeBtn = document.getElementById('theme-toggle-btn');
    const closeReaderBtn = document.getElementById('close-reader-btn');
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

    if (themeBtn) {
        themeBtn.onclick = () => {
            isDarkMode = !isDarkMode; 
            localStorage.setItem('readerDarkMode', isDarkMode); 
            window.applyCurrentTheme(); 
            
            // Se il bottone recensione è visibile, aggiorniamogli il tema in tempo reale!
            const reviewBtn = document.getElementById('reader-review-btn');
            if (reviewBtn && reviewBtn.style.display !== 'none') {
                reviewBtn.style.background = isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)';
                reviewBtn.style.color = isDarkMode ? '#d4af37' : '#b89222'; 
                reviewBtn.style.border = `1px solid ${isDarkMode ? 'rgba(212,175,55,0.4)' : 'rgba(184,146,34,0.4)'}`;
                reviewBtn.style.boxShadow = isDarkMode ? '0 4px 15px rgba(0,0,0,0.5)' : '0 4px 15px rgba(0,0,0,0.1)';
            }
        };
    }

    if (closeReaderBtn) {
        closeReaderBtn.onclick = () => window.closeReader();
    }

    // --- COSTRUZIONE BARRA INFERIORE (Zoom + Recensione + Percentuale) ---
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay) {
        const bottomBar = document.createElement('div');
        bottomBar.style.position = 'fixed';
        bottomBar.style.bottom = '20px';
        bottomBar.style.left = '50%';
        bottomBar.style.transform = 'translateX(-50%)';
        bottomBar.style.width = '90%';
        bottomBar.style.maxWidth = '800px';
        bottomBar.style.display = 'flex';
        bottomBar.style.justifyContent = 'space-between'; 
        bottomBar.style.alignItems = 'center';
        bottomBar.style.zIndex = '1000';

        // 1. Blocco Zoom (A sinistra)
        const zoomContainer = document.createElement('div');
        zoomContainer.id = 'bottom-bar-zoom';
        zoomContainer.className = 'glass-effect';
        zoomContainer.style.display = 'flex';
        zoomContainer.style.alignItems = 'center';
        zoomContainer.style.gap = '12px';
        zoomContainer.style.padding = '8px 20px';
        zoomContainer.style.borderRadius = '50px';

        const zoomLabelSmall = document.createElement('span');
        zoomLabelSmall.innerText = 'A';
        zoomLabelSmall.style.fontSize = '12px';

        const zoomSlider = document.createElement('input');
        zoomSlider.type = 'range';
        zoomSlider.className = 'glass-slider'; 
        zoomSlider.min = '80';
        zoomSlider.max = '250';
        zoomSlider.value = localStorage.getItem('readerZoom') || '100'; 

        const zoomLabelBig = document.createElement('span');
        zoomLabelBig.innerText = 'A';
        zoomLabelBig.style.fontSize = '18px';
        zoomLabelBig.style.fontWeight = 'bold';

        zoomContainer.appendChild(zoomLabelSmall);
        zoomContainer.appendChild(zoomSlider);
        zoomContainer.appendChild(zoomLabelBig);

        // --- 2. IL NUOVO BOTTONE RECENSIONE (Al centro!) ---
        const readerReviewBtn = document.createElement('button');
        readerReviewBtn.id = 'reader-review-btn';
        readerReviewBtn.className = 'glass-effect modern-btn';
        readerReviewBtn.style.display = 'none'; // Nascosto di default
        readerReviewBtn.style.padding = '8px 20px'; // Stesso spessore della barra
        readerReviewBtn.style.margin = '0 15px'; 
        readerReviewBtn.style.fontWeight = 'bold';
        // ----------------------------------------------------

        // 3. Blocco Percentuale (A destra)
        const progressText = document.createElement('div');
        progressText.id = 'reading-progress'; 
        progressText.className = 'glass-effect';
        progressText.style.padding = '8px 20px';
        progressText.style.borderRadius = '50px';
        progressText.style.fontSize = '14px';
        progressText.style.fontWeight = 'bold';
        progressText.innerText = '0%';

        // Le aggiungiamo in ordine: Sinistra, Centro, Destra
        bottomBar.appendChild(zoomContainer);
        bottomBar.appendChild(readerReviewBtn);
        bottomBar.appendChild(progressText);
        readerOverlay.appendChild(bottomBar);

        zoomSlider.addEventListener('input', (e) => {
            const zoomValue = e.target.value;
            localStorage.setItem('readerZoom', zoomValue); 
            if (rendition) {
                rendition.themes.fontSize(`${zoomValue}%`);
            } else if (pdfDoc) {
                queueRenderPage(pageNum); 
            }
        });
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