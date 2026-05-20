let currentBook = null;
let rendition = null;

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

    const existingSlider = document.querySelector('.glass-slider');
    if (existingSlider) {
        existingSlider.value = localStorage.getItem('readerZoom') || '100';
    }

    const keyListener = function(e) {
        if (e.key === "ArrowRight") rendition.next();
        if (e.key === "ArrowLeft") rendition.prev();
    };
    document.addEventListener("keydown", keyListener);
    rendition.on("keydown", keyListener);

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

        window.dispatchEvent(new Event('readerClosed'));
    }, 800); 
};

window.applyCurrentTheme = function() {
    const readerOverlay = document.getElementById('reader-overlay');
    const themeBtn = document.getElementById('theme-toggle-btn');
    const readingProgress = document.getElementById('reading-progress');
    const bottomBarZoom = document.getElementById('bottom-bar-zoom');

    if (isDarkMode) {
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
        const res = await fetch('/books.json');
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

    if (prevBtn) prevBtn.onclick = () => { if(rendition) rendition.prev(); };
    if (nextBtn) nextBtn.onclick = () => { if(rendition) rendition.next(); };

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
            }
        });
    }
});

window.addEventListener('resize', () => {
    if (rendition) {
        rendition.resize('100%', '100%');
    }
});