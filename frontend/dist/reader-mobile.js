// --- LETTORE SU TELEFONO ---
// "Indietro" in alto a sinistra, ricerca in alto a destra, e in basso (dove arriva il pollice)
// avanzamento + Indice / Stile / Tema. Si gira pagina toccando i bordi del testo.
// I nuovi pulsanti "premono" quelli esistenti: la logica del lettore resta una sola.

(function () {
    const tr = (key, fallback) => {
        const v = window.t && window.t(key);
        return v && v !== key ? v : fallback;
    };
    const isPhone = () => document.documentElement.classList.contains('ks-phone');
    const $ = (id) => document.getElementById(id);

    const style = document.createElement('style');
    style.textContent = `
        #ks-reader-back, #ks-reader-bar { display: none; }
        .ks-phone #prev-page-btn, .ks-phone #next-page-btn, .ks-phone #hamburger-menu-btn,
        .ks-phone #close-reader-btn, .ks-phone #reader-toc-btn, .ks-phone #theme-toggle-btn,
        .ks-phone #reading-progress { display: none !important; }
        /* Il testo sta sempre tra la barra in alto e quella in basso, in entrambe le modalità
           (in "scorrimento" il lettore imposta un'altezza fissa all'88% dello schermo: la annulliamo) */
        .ks-phone #viewer { position: absolute !important; top: calc(60px + env(safe-area-inset-top, 0px)) !important;
            left: 0 !important; right: 0 !important;
            bottom: var(--ks-reader-bar-h, calc(118px + env(safe-area-inset-bottom, 0px))) !important;
            width: auto !important; max-width: none !important; height: auto !important; margin: 0 !important; }
        /* "Cerca" alla stessa altezza della freccia indietro, sotto la barra di stato */
        .ks-phone #reader-top-bar { top: calc(8px + env(safe-area-inset-top, 0px)) !important; right: 8px !important;
            height: 44px; display: flex; align-items: center; }
        .ks-phone #reader-search-btn { height: 44px; min-width: 44px; padding: 0 16px !important;
            display: inline-flex; align-items: center; gap: 6px; box-sizing: border-box; }
        .ks-phone #reader-search-panel { top: calc(60px + env(safe-area-inset-top, 0px)) !important;
            left: 8px; right: 8px; width: auto; }
        .ks-phone #pdf-container { top: calc(60px + env(safe-area-inset-top, 0px)) !important; left: 0 !important; right: 0 !important;
            bottom: var(--ks-reader-bar-h, calc(118px + env(safe-area-inset-bottom, 0px))) !important; }
        .ks-phone #ks-reader-back { display: flex; position: absolute; top: calc(8px + env(safe-area-inset-top, 0px)); left: 8px;
            width: 44px; height: 44px; border: none; border-radius: 50%; background: transparent; color: inherit;
            align-items: center; justify-content: center; cursor: pointer; z-index: 1002; }
        .ks-phone #ks-reader-bar { display: flex; flex-direction: column; gap: 10px; position: absolute; left: 0; right: 0; bottom: 0;
            padding: 10px 16px calc(18px + env(safe-area-inset-bottom, 0px)); z-index: 1002;
            font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; }
        #ks-reader-bar .ks-rb-progress { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 600; opacity: .75; }
        #ks-reader-bar .ks-rb-track { flex: 1; height: 4px; border-radius: 4px; background: rgba(128,128,128,.3); overflow: hidden; }
        #ks-reader-bar .ks-rb-track > div { height: 100%; width: 0; background: currentColor; }
        #ks-reader-bar .ks-rb-buttons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        #ks-reader-bar .ks-rb-buttons button { height: 52px; border-radius: 14px; border: 1px solid rgba(128,128,128,.25);
            background: rgba(128,128,128,.08); color: inherit; font-family: inherit; font-size: 13px; font-weight: 600;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; cursor: pointer; }
        #ks-reader-bar .ks-aa-mini { font-family: Georgia, serif; font-size: 17px; line-height: 18px; }
        /* In orizzontale lo spazio verticale è poco: barra su una sola riga */
        .ks-phone.ks-landscape #ks-reader-bar { flex-direction: row; align-items: center; gap: 16px;
            padding-top: 6px; padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px)); }
        .ks-phone.ks-landscape #ks-reader-bar .ks-rb-progress { flex: 1; }
        .ks-phone.ks-landscape #ks-reader-bar .ks-rb-buttons { flex: 0 0 auto; width: 330px; }
        .ks-phone.ks-landscape #ks-reader-bar .ks-rb-buttons button { height: 44px; flex-direction: row; gap: 6px; }
    `;
    document.head.appendChild(style);

    let back, bar, progressText, progressFill, built = false;

    function applyColors() {
        if (!bar) return;
        const dark = typeof isDarkMode !== 'undefined' && isDarkMode;
        bar.style.background = dark ? '#1b1b1b' : '#f2f0eb';
        bar.style.color = dark ? '#eeeeee' : '#2b2b2b';
        bar.style.borderTop = dark ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(0,0,0,.07)';
        back.style.color = dark ? '#eeeeee' : '#2b2b2b';
        const themeLabel = bar.querySelector('[data-action=theme]');
        if (themeLabel) themeLabel.innerHTML = KS_ICON(dark ? 'sun' : 'moon', 18) + `<span>${tr('themeBtn', 'Tema')}</span>`;
    }

    function translate() {
        if (!built) return;
        back.setAttribute('aria-label', tr('backBtn', 'Indietro'));
        bar.querySelector('[data-action=toc]').innerHTML = KS_ICON('list', 18) + `<span>${tr('tableOfContents', 'Indice')}</span>`;
        bar.querySelector('[data-action=style]').innerHTML = `<span class="ks-aa-mini">Aa</span><span>${tr('styleBtn', 'Stile')}</span>`;
        applyColors();
    }

    function syncProgress() {
        const source = $('reading-progress');
        if (!source || !progressText) return;
        const text = source.innerText.trim();
        progressText.textContent = text;
        const pct = parseFloat(text.replace(',', '.'));
        progressFill.style.width = isNaN(pct) ? '0' : `${Math.max(0, Math.min(100, pct))}%`;
    }

    function build() {
        const overlay = $('reader-overlay');
        if (!overlay || !$('close-reader-btn') || built) return built;
        back = document.createElement('button');
        back.id = 'ks-reader-back';
        back.innerHTML = KS_ICON('chevronLeft', 24);
        back.addEventListener('click', () => $('close-reader-btn').click());

        bar = document.createElement('div');
        bar.id = 'ks-reader-bar';
        bar.innerHTML = `
            <div class="ks-rb-progress"><div class="ks-rb-track"><div></div></div><span></span></div>
            <div class="ks-rb-buttons">
                <button data-action="toc"></button>
                <button data-action="style"></button>
                <button data-action="theme"></button>
            </div>`;
        progressFill = bar.querySelector('.ks-rb-track > div');
        progressText = bar.querySelector('.ks-rb-progress > span');
        bar.querySelector('[data-action=toc]').addEventListener('click', () => $('reader-toc-btn')?.click());
        bar.querySelector('[data-action=style]').addEventListener('click', () => $('hamburger-menu-btn')?.click());
        bar.querySelector('[data-action=theme]').addEventListener('click', () => {
            $('theme-toggle-btn')?.click();
            setTimeout(applyColors, 50);
        });
        overlay.append(back, bar);
        built = true;

        // Lo spazio sotto il testo è esattamente l'altezza della barra (si aggiorna da solo:
        // rotazione, lingua, zone di sistema diverse)
        const reserve = () => {
            if (bar.offsetHeight) document.documentElement.style.setProperty('--ks-reader-bar-h', `${bar.offsetHeight}px`);
        };
        new ResizeObserver(reserve).observe(bar);
        window.addEventListener('resize', reserve);

        const source = $('reading-progress');
        if (source) new MutationObserver(syncProgress).observe(source, { childList: true, characterData: true, subtree: true });
        translate();
        return true;
    }

    // --- Tocchi sui bordi per girare pagina -------------------------------------
    function turnPageAt(x) {
        if (!isPhone()) return false;
        const sel = (window.getSelection && String(window.getSelection())) || '';
        if (sel.trim()) return false;
        if (x > window.innerWidth * 0.72) { $('next-page-btn')?.click(); return true; }
        if (x < window.innerWidth * 0.28) { $('prev-page-btn')?.click(); return true; }
        return false;
    }

    let watched = null;
    setInterval(() => {
        // Ogni nuova apertura di un EPUB crea una nuova "rendition": ci agganciamo ai suoi tocchi
        if (typeof rendition === 'undefined' || !rendition || rendition === watched) return;
        watched = rendition;
        rendition.on('click', (e) => {
            const frame = e.view && e.view.frameElement;
            const inner = e.view && e.view.getSelection && String(e.view.getSelection());
            if (inner && inner.trim()) return;
            if (frame) turnPageAt(frame.getBoundingClientRect().left + e.clientX);
        });
    }, 300);

    document.addEventListener('click', (e) => {
        if (!isPhone() || e.target.closest('button, a, input, #settings-sidebar, #reader-search-panel, #ks-reader-bar')) return;
        if (!e.target.closest('#reader-overlay')) return;
        turnPageAt(e.clientX);
    });

    const originalTranslate = window.translateReaderUI;
    window.translateReaderUI = function () {
        const r = originalTranslate ? originalTranslate.apply(this, arguments) : undefined;
        translate();
        return r;
    };
    const originalTheme = window.applyCurrentTheme;
    window.applyCurrentTheme = function () {
        const r = originalTheme ? originalTheme.apply(this, arguments) : undefined;
        applyColors();
        return r;
    };

    // --- Swipe orizzontale per girare pagina (modalità pagine) ------------------------
    const paginated = () => localStorage.getItem('readerFlow') !== 'scrolled-doc';
    let swipe = null;
    function swipeStart(x, y) { swipe = { x, y, t: performance.now() }; }
    function swipeEnd(x, y, selectionText) {
        if (!swipe) return;
        const dx = x - swipe.x, dy = y - swipe.y;
        swipe = null;
        if (!paginated() || (selectionText && selectionText.trim())) return;
        // Nessun limite di tempo: anche un trascinamento lento è uno swipe, purché lungo e orizzontale
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        $(dx < 0 ? 'next-page-btn' : 'prev-page-btn')?.click();
        swipe = { consumed: performance.now() };
    }

    let swipeWatched = null;
    setInterval(() => {
        if (typeof rendition === 'undefined' || !rendition || rendition === swipeWatched) return;
        swipeWatched = rendition;
        rendition.on('touchstart', (e) => { const t = e.changedTouches[0]; swipeStart(t.clientX, t.clientY); });
        rendition.on('touchend', (e) => {
            const t = e.changedTouches[0];
            swipeEnd(t.clientX, t.clientY, e.view && e.view.getSelection && String(e.view.getSelection()));
        });
        // Nel testo il browser gestisce solo lo scorrimento verticale: lo swipe orizzontale è nostro
        rendition.hooks.content.register((contents) => {
            const st = contents.document.createElement('style');
            st.textContent = 'html, body { touch-action: pan-y pinch-zoom; }';
            contents.document.head.appendChild(st);
            contents.document.addEventListener('selectionchange', () => {
                if (!String(contents.window.getSelection()).trim()) setTimeout(() => {
                    if (!String(contents.window.getSelection()).trim()) hideHighlightButton();
                }, 300);
            });
        });
        rendition.on('relocated', () => hideHighlightButton());
    }, 300);

    // PDF: il contenitore esiste solo a pagina pronta, quindi ci si aggancia quando appare
    const watchPdf = () => {
        const pdfBox = $('pdf-container');
        if (!pdfBox) return setTimeout(watchPdf, 200);
        pdfBox.style.touchAction = 'pan-y pinch-zoom';
        pdfBox.addEventListener('touchstart', (e) => { const t = e.changedTouches[0]; swipeStart(t.clientX, t.clientY); }, { passive: true });
        pdfBox.addEventListener('touchend', (e) => { const t = e.changedTouches[0]; swipeEnd(t.clientX, t.clientY, String(window.getSelection())); }, { passive: true });
    };
    watchPdf();

    // --- Modalità pagine: la vista resta sempre allineata a una pagina intera -------------
    // Quando una selezione arriva al bordo, il browser fa scorrere il testo di una quantità qualsiasi
    // e lascia due pagine tagliate a metà. Lo riportiamo a una pagina intera: avanti se lo
    // scorrimento va avanti (così la selezione continua sulla pagina dopo), indietro se va indietro.
    let alignWatched = null;
    setInterval(() => {
        if (typeof rendition === 'undefined' || !rendition || rendition === alignWatched) return;
        const m = rendition.manager;
        if (!m || !m.container) return;
        alignWatched = rendition;
        let settled = m.container.scrollLeft;   // ultima posizione allineata
        let calmUntil = 0;                      // pausa tra due giri di pagina "automatici"
        m.container.addEventListener('scroll', () => {
            const delta = m.layout && m.layout.delta;
            const left = m.container.scrollLeft;
            if (!paginated() || !delta) { settled = left; return; }
            const pages = left / delta;
            if (Math.abs(pages - Math.round(pages)) < 0.01) { settled = left; return; }   // già allineata
            let target = settled;
            if (performance.now() >= calmUntil) {
                target = left > settled ? settled + delta : settled - delta;
                calmUntil = performance.now() + 700;
            }
            const max = m.container.scrollWidth - m.container.clientWidth;
            if (target < 0 || target > max + 1) target = settled;
            m.container.scrollLeft = target;
            settled = target;
        });
    }, 300);

    // --- Pulsante "Sottolinea" ---------------------------------------------------------
    let highlightAction = null;
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        #ks-highlight-btn { position: fixed; left: 50%; transform: translateX(-50%); bottom: 90px; z-index: 1003;
            height: 48px; padding: 0 22px; border-radius: 50px; border: none; background: #1e2d3b; color: #fff;
            font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; font-size: 15px; font-weight: 700;
            display: none; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 8px 22px rgba(0,0,0,.3); }
        #ks-highlight-btn.show { display: flex; }
        .ks-phone #ks-highlight-btn { bottom: calc(var(--ks-reader-bar-h, 118px) + 14px); }
    `;
    document.head.appendChild(highlightStyle);
    const highlightBtn = document.createElement('button');
    highlightBtn.id = 'ks-highlight-btn';
    // pointerdown: evita che il tocco sul pulsante cancelli prima la selezione
    highlightBtn.addEventListener('pointerdown', (e) => e.preventDefault());
    highlightBtn.addEventListener('click', () => {
        const action = highlightAction;
        hideHighlightButton();
        if (action) action();
    });
    function hideHighlightButton() {
        highlightAction = null;
        highlightBtn.classList.remove('show');
    }
    window.showHighlightButton = (action) => {
        highlightAction = action;
        highlightBtn.innerHTML = KS_ICON('pencil', 18) + `<span>${tr('highlightAction', 'Sottolinea')}</span>`;
        if (!highlightBtn.isConnected) ($('reader-overlay') || document.body).appendChild(highlightBtn);
        highlightBtn.classList.add('show');
    };
    window.addEventListener('readerClosed', hideHighlightButton);

    const tryBuild = () => { if (!build()) setTimeout(tryBuild, 200); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(tryBuild, 0));
    else tryBuild();
})();
