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
            return currentBook.locations.generate(250).then(() => {
                try {
                    localStorage.setItem(`locations_${bookId}`, currentBook.locations.save());
                    console.log("✅ Mappa generata e salvata in cache");
                } catch(e) {
                    console.warn("Spazio insufficiente per salvare le posizioni in cache");
                }
            });
        }
    }).then(() => {
       const progressEl = document.getElementById('reading-progress');
        
        // 1. Prima proviamo a leggere la percentuale "congelata" dal localStorage
        const savedPercentage = localStorage.getItem(`percentage_${bookId}`);
        
        if (savedPercentage && progressEl) {
            // Se c'è, usiamo quella esatta senza farla ricalcolare al motore!
            const displayPercent = (parseFloat(savedPercentage) * 100).toFixed(1);
            progressEl.innerText = displayPercent + "%";
        } else {
            // 2. Fallback: se non c'è (es. prima lettura), la calcoliamo dal CFI
            const currentLocation = rendition.currentLocation();
            if (currentLocation && currentLocation.start && currentLocation.start.cfi) {
                const percentage = currentBook.locations.percentageFromCfi(currentLocation.start.cfi);
                if (progressEl && percentage > 0) {
                    progressEl.innerText = (percentage * 100).toFixed(1) + "%";
                }
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
    const alignS = document.getElementById('alignment-section');

    if (fontS && fontS.parentElement) fontS.parentElement.style.display = 'block';
    if (lineS && lineS.parentElement) lineS.parentElement.style.display = 'block';
    if (alignS) alignS.style.display = 'block';

    rendition = currentBook.renderTo("viewer", {
        width: "100%",
        height: "100%",
        spread: "none",
        flow: savedFlow,
        manager: "continuous",
        allowScriptedContent: true 
    });

    // --- FUNZIONE PER GESTIRE IL CLICK SULLE SOTTOLINEATURE ---
    const handleHighlightClick = function(e, cfi) {
        const msg = window.t('removeHighlightConfirm') || 'Vuoi eliminare questa sottolineatura?';
        
        if (confirm(msg)) {
            // 1. Rimuove visivamente l'highlight dalla pagina
            rendition.annotations.remove(cfi, "highlight");
            
            // 2. Lo elimina dal database in background
            fetch(`/api/books/${bookId}/highlights`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cfi: cfi })
            }).then(res => res.json())
              .then(data => {
                  if(data.success) { 
                      console.log("Sottolineatura rimossa:", data);
                      
                      window.dispatchEvent(new CustomEvent('onHighlightRemoved', { 
                          detail: { bookId: bookId, cfi: cfi } 
                      }));
                  }
              })
              .catch(err => console.error(err));
        }
    };

    // 1. CARICA GLI HIGHLIGHT SALVATI DAL DB
    fetch('/api/books').then(res => res.json()).then(books => {
        const book = books.find(b => b.id === bookId);
        if (book && book.highlights && book.highlights.length > 0) {
            book.highlights.forEach(hl => {
                rendition.annotations.highlight(hl.cfi, {}, (e) => {
                    handleHighlightClick(e, hl.cfi); // Associa il click
                });
            });
        }
    });

    // 2. ASCOLTA LA SELEZIONE DEL TESTO (Nuovi highlight)
    rendition.on("selected", function(cfiRange, contents) {
        
        // Applica l'evidenziazione visiva nel frontend in tempo reale
        rendition.annotations.highlight(cfiRange, {}, (e) => {
            handleHighlightClick(e, cfiRange); 
        });

        // Estrae il testo reale e salva nel database
        currentBook.getRange(cfiRange).then(function (range) {
            const text = range.toString();

            fetch(`/api/books/${bookId}/highlights`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cfi: cfiRange, text: text })
            }).then(res => res.json()).then(data => {
                if(data.success) {
                    console.log("Testo salvato in memoria:", text);
                    
                    // --- LANCIA IL SEGNALE ALLA BACHECA 3D ---
                    window.dispatchEvent(new CustomEvent('onHighlightAdded', { 
                        detail: { bookId: bookId, highlight: { cfi: cfiRange, text: text } } 
                    }));
                }
            });
        });

        // Deseleziona il testo nativo del browser
        contents.window.getSelection().removeAllRanges();
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

    let isLayoutSettling = true; 

    const rawLocation = localStorage.getItem(`bookmark_${bookId}`);
    const isValidLocation = rawLocation && rawLocation !== "undefined" && rawLocation !== "null";

    const savedZoom = localStorage.getItem('readerZoom') || '100';
    rendition.themes.fontSize(`${savedZoom}%`);
    
    // (Nota: abbiamo rimosso applyCurrentTheme() da qui perché l'iframe del libro non esiste ancora)

    const displayPromise = isValidLocation ? rendition.display(rawLocation) : rendition.display();

    displayPromise.then(() => {
        // A questo punto il libro è a schermo e l'evento "rendered" (sotto) ha appena
        // iniettato il CSS personalizzato, causando lo slittamento delle colonne.
        
        setTimeout(() => { 
            // 🚨 IL FIX: Forziamo epub.js a ricalcolare il layout partendo dal segnalibro 
            // ORIGINALE, ora che i font hanno raggiunto la loro dimensione definitiva!
            const cfiCorretto = isValidLocation ? rawLocation : (rendition.location ? rendition.location.start.cfi : null);
            
            if (cfiCorretto) {
                rendition.display(cfiCorretto).then(() => {
                    // Ora la pagina è perfetta e allineata. Sblocchiamo i salvataggi.
                    isLayoutSettling = false; 
                });
            } else {
                isLayoutSettling = false;
            }
        }, 800); // Abbassato a 800ms per rendere l'apertura del libro più scattante

    }).catch(err => {
        console.error("Errore nel caricamento della pagina salvata:", err);
        rendition.display(); 
        isLayoutSettling = false;
    });

    rendition.on("rendered", () => {
        // È qui che il font personalizzato, l'interlinea e i colori vengono applicati
        window.applyCurrentTheme(); 
    });

    // --- AGGIORNAMENTO POSIZIONE E PERCENTUALE ---
    rendition.on('relocated', function(location) {
        if (location && location.start && location.start.cfi) {
            
            let percentage = location.start.percentage;
            const savedPercentage = parseFloat(localStorage.getItem(`percentage_${bookId}`));

            // 🛡️ SE IL LAYOUT SI STA ANCORA ASSESTANDO, FORZIAMO LA PERCENTUALE SALVATA
            if (isLayoutSettling && !isNaN(savedPercentage)) {
                percentage = savedPercentage;
            } else {
                // Altrimenti, se stiamo navigando normalmente, aggiorniamo il salvataggio
                localStorage.setItem(`bookmark_${bookId}`, location.start.cfi);
                if (percentage !== undefined) {
                    localStorage.setItem(`percentage_${bookId}`, percentage);
                }
            }
            
            const progressEl = document.getElementById('reading-progress');
            if (progressEl) {
                if (percentage !== undefined && percentage > 0) {
                    const displayPercent = (percentage * 100).toFixed(1);
                    progressEl.innerText = displayPercent + "%";

                    // --- COMPARSA DEL BOTTONE RECENSIONE AL 100% ---
                    const reviewBtn = document.getElementById('reader-review-btn');
                    if (reviewBtn) {
                        if (percentage >= 0.995) {
                            if (reviewBtn.style.display === 'none') {
                                reviewBtn.style.background = isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)';
                                reviewBtn.style.color = isDarkMode ? '#d4af37' : '#b89222'; 
                                reviewBtn.style.border = `1px solid ${isDarkMode ? 'rgba(212,175,55,0.4)' : 'rgba(184,146,34,0.4)'}`;
                                reviewBtn.style.boxShadow = isDarkMode ? '0 4px 15px rgba(0,0,0,0.5)' : '0 4px 15px rgba(0,0,0,0.1)';

                                reviewBtn.style.display = 'block';
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
                    progressEl.innerText = "0.0%";
                }

                // Sincronizzazione col database (solo quando il layout è stabile)
                if (percentage !== undefined && !isLayoutSettling) {
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
    if(el('sidebar-align-label')) el('sidebar-align-label').innerText = window.t('textAlignment') || 'Allineamento';
};

// --- FUNZIONI DI RENDERING PDF ---
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(async function(page) {
        const canvas = document.getElementById('pdf-canvas');
        const wrapper = document.getElementById('pdf-page-wrapper-single');
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
        
        if (wrapper) {
            wrapper.style.width = `${viewport.width}px`;
            wrapper.style.height = `${viewport.height}px`;
        }

        canvas.style.setProperty('--scale-factor', finalScale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);

        await renderTask.promise; // Aspetta che il rendering finisca prima di procedere
        
        if (wrapper) {
            await renderTextLayer(page, viewport, wrapper, num);
        }

        pageRendering = false;
        if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
        }
        
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
    const alignS = document.getElementById('alignment-section');

    if (fontS && fontS.parentElement) fontS.parentElement.style.display = 'none';
    if (lineS && lineS.parentElement) lineS.parentElement.style.display = 'none';
    if (alignS) alignS.style.display = 'none';
    
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

        const singleWrapper = document.createElement('div');
        singleWrapper.id = 'pdf-page-wrapper-single';
        singleWrapper.style.position = 'relative';
        singleWrapper.style.margin = '0 auto';

        const singleCanvas = document.createElement('canvas');
        singleCanvas.id = 'pdf-canvas';
        singleCanvas.style.display = 'block';
        singleCanvas.style.width = '100%';
        singleCanvas.style.height = '100%';

        singleWrapper.appendChild(singleCanvas);
        pdfContainer.appendChild(singleWrapper);
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

        setupPdfTextSelection();
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

    wrapper.style.position = 'relative';


    pdfDoc.getPage(num).then(function(page) {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        wrapper.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const containerWidth = document.getElementById('pdf-container').clientWidth - 40;
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const bestFitScale = containerWidth / unscaledViewport.width;
        const savedZoom = parseInt(localStorage.getItem('readerZoom') || '100') / 100;
        const finalScale = bestFitScale * savedZoom;
        
        const viewport = page.getViewport({ scale: finalScale });
        canvas.style.setProperty('--scale-factor', finalScale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderContext).promise.then(() => {
            renderTextLayer(page, viewport, wrapper, num);
        });
    });
}

// --- TEXTLAYER: Rende il testo PDF selezionabile ---
async function renderTextLayer(page, viewport, wrapper, pageNum) {
    const existingTextLayer = wrapper.querySelector('.textLayer');
    if (existingTextLayer) existingTextLayer.remove();

    // Crea il contenitore per il testo
    const textLayerDiv = document.createElement('div');
    textLayerDiv.className = 'textLayer';
    textLayerDiv.style.position = 'absolute';
    textLayerDiv.style.top = '0';
    textLayerDiv.style.left = '0';
    textLayerDiv.style.right = '0';
    textLayerDiv.style.bottom = '0';
    textLayerDiv.style.overflow = 'hidden';
    textLayerDiv.style.opacity = '1';
    textLayerDiv.style.lineHeight = '1.0';
    textLayerDiv.style.zIndex = '1'; // Sopra il canvas ma sotto gli highlight
    textLayerDiv.style.setProperty('--scale-factor', viewport.scale);
    wrapper.appendChild(textLayerDiv);

    // Estrai il contenuto testuale dalla pagina
    const textContent = await page.getTextContent();

    // Usa renderTextLayer di pdf.js
    if (pdfjsLib.renderTextLayer) {
        const renderTask = pdfjsLib.renderTextLayer({
            textContentSource: textContent,
            container: textLayerDiv,
            viewport: viewport,
            textDivs: []
        });
        
        await renderTask.promise;
        
        loadPdfHighlights(pageNum, textLayerDiv);
    }
}

// --- GESTIONE CLICK PER ELIMINARE HIGHLIGHT PDF ---
window.handlePdfHighlightClick = function(cfi) {
    const msg = window.t('removeHighlightConfirm') || 'Vuoi eliminare questa sottolineatura?';
    if (confirm(msg)) {
        fetch(`/api/books/${currentPdfId}/highlights`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cfi: cfi })
        }).then(res => res.json())
          .then(data => {
              if(data.success) {
                  // Rimuoviamo visivamente l'evidenziazione dalla pagina
                  const highlights = document.querySelectorAll(`.pdf-highlight[data-cfi="${cfi}"]`);
                  highlights.forEach(el => {
                      el.classList.remove('pdf-highlight');
                      el.style.backgroundColor = 'transparent';
                      el.style.cursor = 'text';
                      el.onclick = null;
                  });
                  window.dispatchEvent(new CustomEvent('onHighlightRemoved', { 
                      detail: { bookId: currentPdfId, cfi: cfi } 
                  }));
              }
          })
          .catch(err => console.error(err));
    }
};

// --- GESTIONE SELEZIONE TESTO PDF ---
function setupPdfTextSelection() {
    const pdfContainer = document.getElementById('pdf-container');
    if (!pdfContainer) return;

    // Ascolta la selezione del testo
    pdfContainer.addEventListener('mouseup', async (e) => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return;

        const selectedText = selection.toString().trim();
        if (!selectedText || selectedText.length < 3) return;

        // Trova la pagina corrente
        const pageNum = getCurrentPdfPage();
        if (!pageNum) return;

        // Chiedi conferma all'utente
        const msg = window.t('confirmHighlight') || 'Vuoi sottolineare questo testo?';
        if (!confirm(msg)) {
            selection.removeAllRanges();
            return;
        }

        const highlightCfi = `pdf_page_${pageNum}_${Date.now()}`;
        // Salva nel database
        try {
            const response = await fetch(`/api/books/${currentPdfId}/highlights`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    cfi: `pdf_page_${pageNum}_${Date.now()}`, 
                    text: selectedText 
                })
            });
            
            const result = await response.json();
            if (result.success) {

                
                // Applica l'evidenziazione visiva
                highlightSelectedText(selection, pageNum, highlightCfi);
                
                // Deseleziona il testo
                selection.removeAllRanges();
                window.dispatchEvent(new CustomEvent('onHighlightAdded', { 
                    detail: { bookId: currentPdfId, highlight: { cfi: highlightCfi, text: selectedText } } 
                }));
            }
        } catch (err) {
            console.error('Errore salvataggio highlight PDF:', err);
        }
    });
}

// --- OTTIENE LA PAGINA CORRENTE DEL PDF ---
function getCurrentPdfPage() {
    const pdfContainer = document.getElementById('pdf-container');
    if (!pdfContainer || !pdfDoc) return null;
    
    const savedFlow = localStorage.getItem('readerFlow') || 'paginated';
    
    if (savedFlow === 'scrolled-doc') {
        // Modalità continua: trova la pagina centrale
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
        
        return currentPageNum;
    } else {
        // Modalità paginata: usa la variabile globale
        return pageNum;
    }
}

// --- APPLICA EVIDENZIAZIONE VISIVA ---
function highlightSelectedText(selection, pageNum, cfi) {
    const range = selection.getRangeAt(0);

    // 1. Troviamo tutti i nodi di testo che si incrociano con la selezione
    const nodes = [];
    const treeWalker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (range.intersectsNode(node)) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_REJECT;
            }
        }
    );

    let currentNode;
    while (currentNode = treeWalker.nextNode()) {
        nodes.push(currentNode);
    }

    // 2. Suddividiamo e avvolgiamo ogni nodo di testo individualmente
    nodes.forEach(textNode => {
        const isStart = textNode === range.startContainer;
        const isEnd = textNode === range.endContainer;

        // Calcoliamo da dove a dove tagliare questo specifico nodo
        let startOffset = isStart ? range.startOffset : 0;
        let endOffset = isEnd ? range.endOffset : textNode.length;

        if (startOffset === endOffset) return; // Niente da evidenziare

        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'pdf-highlight';
        highlightSpan.style.backgroundColor = 'rgba(255, 235, 59, 0.4)';
        highlightSpan.style.borderRadius = '3px';
        highlightSpan.dataset.cfi = cfi;
        highlightSpan.onclick = (e) => {
            e.stopPropagation(); // Evita selezioni di testo accidentali
            window.handlePdfHighlightClick(cfi);
        };
        // Estraiamo il testo da avvolgere
        const textToWrap = textNode.textContent.substring(startOffset, endOffset);
        highlightSpan.textContent = textToWrap;

        // Recuperiamo il testo prima e dopo la selezione
        const beforeText = textNode.textContent.substring(0, startOffset);
        const afterText = textNode.textContent.substring(endOffset);

        const parent = textNode.parentNode;

        // Sostituiamo il nodo originale con i frammenti separati
        if (beforeText) parent.insertBefore(document.createTextNode(beforeText), textNode);
        parent.insertBefore(highlightSpan, textNode);
        if (afterText) parent.insertBefore(document.createTextNode(afterText), textNode);

        // Rimuoviamo il nodo vecchio
        parent.removeChild(textNode);
    });
}

// --- CARICA GLI HIGHLIGHT SALVATI ---
async function loadPdfHighlights(pageNum, textLayerDiv) {
    if (!currentPdfId) return;
    
    try {
        const response = await fetch('/api/books');
        const books = await response.json();
        const book = books.find(b => b.id === currentPdfId);
        
        if (!book || !book.highlights || book.highlights.length === 0) return;
        
        // Filtra gli highlight di questa pagina
        const pageHighlights = book.highlights.filter(hl => 
            hl.cfi && hl.cfi.startsWith(`pdf_page_${pageNum}_`)
        );
        
        if (pageHighlights.length === 0) return;
        
        // Applica l'evidenziazione a ogni testo salvato
        pageHighlights.forEach(hl => {
            highlightTextInLayer(textLayerDiv, hl.text, hl.cfi);
        });
        
    } catch (err) {
        console.error('Errore caricamento highlight PDF:', err);
    }
}

// --- EVIDENZIA UN TESTO SPECIFICO NEL TEXTLAYER ---
function highlightTextInLayer(textLayerDiv, targetText, cfi) {
    // 1. Raccogliamo TUTTI i nodi di puro testo (ignorando i div e gli span contenitori)
    const treeWalker = document.createTreeWalker(textLayerDiv, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let currentNode;
    while (currentNode = treeWalker.nextNode()) {
        textNodes.push(currentNode);
    }

    // 2. Puliamo il bersaglio dagli spazi per una ricerca infallibile
    const cleanTarget = targetText.replace(/\s+/g, '').toLowerCase();
    if (!cleanTarget) return;

    let currentString = '';
    const charMap = [];

    // 3. Mappiamo ogni singolo carattere al suo specifico "nodo di testo" e alla sua posizione esatta
    textNodes.forEach(node => {
        const text = node.textContent;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            // Ignoriamo gli spazi vuoti generati da pdf.js per la mappatura
            if (char.trim() !== '') {
                charMap.push({ node: node, offset: i, char: char.toLowerCase() });
                currentString += char.toLowerCase();
            }
        }
    });

    // 4. Troviamo dove inizia la frase
    const matchIndex = currentString.indexOf(cleanTarget);
    if (matchIndex === -1) return;

    // 5. Raggruppiamo i caratteri trovati in base al Nodo di appartenenza
    const matchedChars = charMap.slice(matchIndex, matchIndex + cleanTarget.length);
    const nodeGroups = new Map();

    matchedChars.forEach(match => {
        if (!nodeGroups.has(match.node)) {
            nodeGroups.set(match.node, { minOffset: match.offset, maxOffset: match.offset });
        } else {
            const group = nodeGroups.get(match.node);
            if (match.offset < group.minOffset) group.minOffset = match.offset;
            if (match.offset > group.maxOffset) group.maxOffset = match.offset;
        }
    });

    // 6. Tagliamo e avvolgiamo il testo (Esattamente come fa il cursore del mouse!)
    const groupsArray = Array.from(nodeGroups.entries());
    
    groupsArray.forEach(([textNode, offsets]) => {
        const startOffset = offsets.minOffset;
        const endOffset = offsets.maxOffset + 1; // +1 per includere l'ultima lettera nel taglio

        const originalText = textNode.textContent;
        const beforeText = originalText.substring(0, startOffset);
        const wrapText = originalText.substring(startOffset, endOffset);
        const afterText = originalText.substring(endOffset);

        const parent = textNode.parentNode; // Questo è lo span di pdf.js con position: absolute

        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'pdf-highlight';
        highlightSpan.dataset.cfi = cfi;
        highlightSpan.textContent = wrapText;
        highlightSpan.style.backgroundColor = 'rgba(255, 235, 59, 0.4)';
        highlightSpan.style.borderRadius = '3px';
        
        // Attacchiamo l'evento click per l'eliminazione
        highlightSpan.onclick = (e) => {
            e.stopPropagation();
            window.handlePdfHighlightClick(cfi);
        };

        // Inseriamo i nuovi frammenti senza toccare lo stile del "parent"
        if (beforeText) parent.insertBefore(document.createTextNode(beforeText), textNode);
        parent.insertBefore(highlightSpan, textNode);
        if (afterText) parent.insertBefore(document.createTextNode(afterText), textNode);

        // Rimuoviamo il vecchio pezzo unico
        parent.removeChild(textNode);
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
    const savedAlign = localStorage.getItem('readerTextAlign') || 'justify'; 

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
        }
        if (fontSelect) {
            fontSelect.style.color = '#ffffff';
            fontSelect.style.backgroundColor = '#222222';
        }
        if (flowSelect) {
            flowSelect.style.color = '#ffffff';
            flowSelect.style.backgroundColor = '#222222';
        }
        const alignButtons = [
            document.getElementById('align-left-btn'),
            document.getElementById('align-center-btn'),
            document.getElementById('align-right-btn'),
            document.getElementById('align-justify-btn')
        ];
        alignButtons.forEach(btn => {
            if (btn) {
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                btn.style.color = '#ffffff';
            }
        });
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
            fontSelect.style.color = '#000000';
            fontSelect.style.backgroundColor = '#f0f0f0';
        }
        if (flowSelect) {
            flowSelect.style.color = '#000000';
            flowSelect.style.backgroundColor = '#f0f0f0';
        }

        const alignButtons = [
            document.getElementById('align-left-btn'),
            document.getElementById('align-center-btn'),
            document.getElementById('align-right-btn'),
            document.getElementById('align-justify-btn')
        ];
        alignButtons.forEach(btn => {
            if (btn) {
                btn.style.background = 'rgba(0, 0, 0, 0.08)';
                btn.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                btn.style.color = '#000000';
            }
        });
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
                        -ms-overflow-style: none !important;
                        scrollbar-width: none !important;
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
                    p { text-align: ${savedAlign} !important; }
                    a, a * { color: #4da6ff !important; }
                    img, svg { filter: brightness(0.85); }

                    ::selection {
                        background: rgba(255, 235, 59, 0.3) !important;
                        color: #fff !important;
                    }
                    
                    .epubjs-hl, .epubjs-hl rect {
                        fill: rgba(255, 235, 59, 0.25) !important;
                        cursor: pointer !important;
                        pointer-events: all !important;
                        transition: fill 0.2s ease, fill-opacity 0.2s ease !important;
                    }
                    
                    .epubjs-hl:hover, .epubjs-hl:hover rect {
                        fill: rgba(255, 80, 80, 0.5) !important;
                        fill-opacity: 0.5 !important;
                    }
                `;
            } else {
                styleTag.innerHTML = `
                    html, body { 
                        background-color: #faf9f6 !important; 
                        line-height: ${savedLineHeight} !important; 
                        font-family: ${savedFont} !important;
                        -ms-overflow-style: none !important;
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
                    p { text-align: ${savedAlign} !important; }
                    a, a * { color: #0066cc !important; }
                    img, svg { filter: brightness(1); }

                    ::selection {
                        background: rgba(255, 235, 59, 0.4) !important;
                    }
                    
                    .epubjs-hl, .epubjs-hl rect {
                        fill: yellow !important; 
                        fill-opacity: 0.4 !important;
                        mix-blend-mode: multiply !important;
                        cursor: pointer !important;
                        pointer-events: all !important;
                        transition: fill 0.2s ease, fill-opacity 0.2s ease !important;
                    }
                    
                    .epubjs-hl:hover, .epubjs-hl:hover rect {
                        fill: #ff4d4d !important;
                        fill-opacity: 0.5 !important;
                    }
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
    
    // Stili per il TextLayer PDF
    const pdfTextLayerStyle = document.createElement('style');
    pdfTextLayerStyle.innerHTML = `
        .textLayer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            opacity: 1;
            line-height: 1.0;
            z-index: 1;
        }
        
        /* MODIFICA: Usa '>' per colpire solo gli span nativi di pdf.js */
        .textLayer > span {
            color: transparent;
            position: absolute;
            white-space: pre;
            cursor: text;
            transform-origin: 0% 0%;
        }
        
        .textLayer > span::selection {
            background: rgba(0, 0, 255, 0.3);
        }
        
        .pdf-highlight {
            background-color: rgba(255, 235, 59, 0.4) !important;
            border-radius: 3px;
            cursor: pointer;
            position: static !important; 
            color: transparent !important;
        }
        
        .pdf-highlight:hover {
            background-color: rgba(255, 80, 80, 0.5) !important;
        }
        
        .dark-mode .pdf-highlight {
            background-color: rgba(255, 235, 59, 0.3) !important;
        }
    `;
    document.head.appendChild(pdfTextLayerStyle);
    
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

            <!-- NUOVA SEZIONE ALLINEAMENTO TESTO -->
            <div id="alignment-section" style="margin-bottom: 25px;">
                <label id="sidebar-align-label" style="display: block; margin-bottom: 10px; font-weight: bold; font-size: 14px; opacity: 0.8;"></label>
                <div style="display: flex; gap: 8px; justify-content: space-between; width: 100%;">
                    
                    <button id="align-left-btn" class="glass-effect modern-btn" style="flex: 1; padding: 10px 0; display: flex; justify-content: center; align-items: center;" title="Sinistra">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="15" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    <button id="align-center-btn" class="glass-effect modern-btn" style="flex: 1; padding: 10px 0; display: flex; justify-content: center; align-items: center;" title="Centro">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="7" y1="12" x2="17" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    <button id="align-right-btn" class="glass-effect modern-btn" style="flex: 1; padding: 10px 0; display: flex; justify-content: center; align-items: center;" title="Destra">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="9" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    <button id="align-justify-btn" class="glass-effect modern-btn" style="flex: 1; padding: 10px 0; display: flex; justify-content: center; align-items: center;" title="Giustificato">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    
                </div>
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

        // Impostazioni Allineamento Testo
        const btnAlignLeft = document.getElementById('align-left-btn');
        const btnAlignCenter = document.getElementById('align-center-btn');
        const btnAlignRight = document.getElementById('align-right-btn');
        const btnAlignJustify = document.getElementById('align-justify-btn');

        const updateAlignment = (alignment) => {
            localStorage.setItem('readerTextAlign', alignment);
            window.applyCurrentTheme(); // Riapplica il tema CSS istantaneamente
        };

        if (btnAlignLeft) btnAlignLeft.onclick = () => updateAlignment('left');
        if (btnAlignCenter) btnAlignCenter.onclick = () => updateAlignment('center');
        if (btnAlignRight) btnAlignRight.onclick = () => updateAlignment('right');
        if (btnAlignJustify) btnAlignJustify.onclick = () => updateAlignment('justify');
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