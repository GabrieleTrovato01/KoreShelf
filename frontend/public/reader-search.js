// --- RICERCA NEL LIBRO + STILE UNIFORME DEI BOTTONI DEL LETTORE ---
// Script classico caricato dopo reader.js: usa le sue variabili globali
// (currentBook, rendition, pdfDoc, pageNum, queueRenderPage, isDarkMode).

(function () {
    const tt = (key, fallback, vars = {}) => {
        let text = (window.t && window.t(key)) || fallback;
        if (!text || text === key) text = fallback;
        for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v);
        return text;
    };
    const escapeHtml = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const normalize = (s) => String(s).replace(/[’‘`´]/g, "'").replace(/\s+/g, ' ').toLowerCase();
    const MAX_RESULTS = 300;

    const style = document.createElement('style');
    style.textContent = `
        #reader-search-panel {
            position: absolute; top: 62px; right: 20px; z-index: 1001; width: min(380px, calc(100vw - 40px));
            border-radius: 18px; padding: 14px; box-sizing: border-box; display: none; flex-direction: column; gap: 10px;
            max-height: calc(100vh - 140px); font-family: 'Segoe UI', system-ui, sans-serif;
            box-shadow: 0 12px 35px rgba(0,0,0,.25);
        }
        #reader-search-panel.open { display: flex; }
        #reader-search-panel .row { display: flex; gap: 8px; align-items: center; }
        #reader-search-input {
            flex: 1; min-width: 0; padding: 10px 14px; border-radius: 50px; font-size: 14px; outline: none;
            border: 1px solid rgba(128,128,128,.35); background: rgba(128,128,128,.08); color: inherit;
        }
        #reader-search-close { background: none; border: none; color: inherit; font-size: 24px; cursor: pointer; opacity: .6; padding: 0 4px; }
        #reader-search-close:hover { opacity: 1; }
        #reader-search-status { font-size: 12px; opacity: .7; padding: 0 4px; min-height: 16px; }
        #reader-search-results { overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 2px; }
        .ks-search-result {
            text-align: left; border: 1px solid rgba(128,128,128,.2); background: rgba(128,128,128,.07); color: inherit;
            border-radius: 12px; padding: 9px 12px; cursor: pointer; font-size: 13px; line-height: 1.45;
        }
        .ks-search-result:hover, .ks-search-result.active { background: rgba(77,166,255,.18); border-color: rgba(77,166,255,.5); }
        .ks-search-result .where { display: block; font-size: 11px; font-weight: 700; letter-spacing: .5px; opacity: .65; margin-bottom: 3px; text-transform: uppercase; }
        .ks-search-result mark { background: rgba(255,193,7,.55); color: inherit; border-radius: 3px; padding: 0 1px; }
        #reader-search-results [data-empty] { text-align: center; opacity: .7; padding: 14px 6px; font-size: 13px; }
        .textLayer .ks-search-hit { background: rgba(255, 179, 0, 0.45) !important; border-radius: 2px; }
    `;
    document.head.appendChild(style);

    // ---------------------------------------------------- stile dei bottoni
    // Indice e Cerca copiano sempre colori e bordo di "Chiudi libro", in entrambi i temi.
    function syncReaderButtons() {
        const ref = document.getElementById('close-reader-btn');
        if (!ref) return;
        ['reader-toc-btn', 'reader-search-btn'].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.style.color = ref.style.color;
            btn.style.background = ref.style.background;
            btn.style.border = ref.style.border;
            btn.style.padding = ref.style.padding;
            btn.style.borderRadius = ref.style.borderRadius;
            btn.style.fontWeight = ref.style.fontWeight;
            btn.style.backdropFilter = ref.style.backdropFilter;
        });
        const panel = document.getElementById('reader-search-panel');
        if (panel) {
            panel.style.background = isDarkMode ? 'rgba(30, 30, 30, 0.92)' : 'rgba(250, 249, 246, 0.95)';
            panel.style.color = isDarkMode ? '#ffffff' : '#111111';
            panel.style.border = isDarkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)';
        }
    }
    const originalApplyTheme = window.applyCurrentTheme;
    window.applyCurrentTheme = function () {
        const result = originalApplyTheme ? originalApplyTheme.apply(this, arguments) : undefined;
        syncReaderButtons();
        return result;
    };

    // ------------------------------------------------------- interfaccia
    let panel, input, status, list, searchToken = 0, lastEpubHit = null;

    function buildUi() {
        const closeBtn = document.getElementById('close-reader-btn');
        if (!closeBtn || document.getElementById('reader-search-btn')) return false;

        const btn = document.createElement('button');
        btn.id = 'reader-search-btn';
        btn.className = 'glass-effect modern-btn';
        btn.style.cursor = 'pointer';
        btn.innerHTML = KS_ICON('search', 15) + ' ' + escapeHtml(tt('readerSearch', 'Cerca'));
        closeBtn.parentElement.insertBefore(btn, closeBtn.parentElement.firstChild);

        panel = document.createElement('div');
        panel.id = 'reader-search-panel';
        panel.className = 'glass-effect';
        panel.innerHTML = `
            <div class="row">
                <input id="reader-search-input" type="search" autocomplete="off" spellcheck="false">
                <button id="reader-search-close" aria-label="Chiudi">&times;</button>
            </div>
            <div id="reader-search-status"></div>
            <div id="reader-search-results"></div>`;
        document.getElementById('reader-overlay').appendChild(panel);
        input = panel.querySelector('#reader-search-input');
        status = panel.querySelector('#reader-search-status');
        list = panel.querySelector('#reader-search-results');
        input.placeholder = tt('readerSearchPlaceholder', 'Cerca una parola o una frase…');

        btn.addEventListener('click', () => {
            const open = !panel.classList.contains('open');
            panel.classList.toggle('open', open);
            syncReaderButtons();
            if (open) { input.focus(); input.select(); }
        });
        panel.querySelector('#reader-search-close').addEventListener('click', () => panel.classList.remove('open'));

        let debounce = null;
        input.addEventListener('keydown', (e) => {
            e.stopPropagation(); // le frecce/lettere non devono girare pagina
            if (e.key === 'Enter') { clearTimeout(debounce); startSearch(input.value); }
            if (e.key === 'Escape') panel.classList.remove('open');
        });
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => startSearch(input.value), 450);
        });

        // Il lettore si chiude o cambia libro: pannello pulito
        window.addEventListener('readerClosed', () => {
            panel.classList.remove('open');
            input.value = '';
            list.innerHTML = '';
            status.textContent = '';
            list.removeAttribute('data-done');
            lastEpubHit = null;
            searchToken++;
        });
        syncReaderButtons();
        return true;
    }

    function excerptHtml(text, query) {
        const norm = normalize(text);
        const q = normalize(query);
        const pos = norm.indexOf(q);
        if (pos === -1) return escapeHtml(text);
        // normalize() non cambia la lunghezza tranne per gli spazi multipli: lavoriamo sul testo normalizzato
        const clean = String(text).replace(/\s+/g, ' ');
        const start = Math.max(0, pos - 60), end = Math.min(clean.length, pos + q.length + 60);
        return (start > 0 ? '…' : '') + escapeHtml(clean.slice(start, pos)) + '<mark>' +
            escapeHtml(clean.slice(pos, pos + q.length)) + '</mark>' + escapeHtml(clean.slice(pos + q.length, end)) +
            (end < clean.length ? '…' : '');
    }

    function renderResults(results, query) {
        list.innerHTML = '';
        if (results.length === 0) {
            list.innerHTML = `<div data-empty>${escapeHtml(tt('readerSearchNoResults', 'Nessun risultato nel libro.'))}</div>`;
            status.textContent = '';
        } else {
            status.textContent = results.length === 1 ? tt('readerSearchOne', '1 risultato')
                : tt('readerSearchCount', '{n} risultati', { n: results.length >= MAX_RESULTS ? `${MAX_RESULTS}+` : results.length });
            results.forEach(r => {
                const item = document.createElement('button');
                item.className = 'ks-search-result';
                item.innerHTML = `<span class="where">${escapeHtml(r.where)}</span>${excerptHtml(r.excerpt, query)}`;
                item.addEventListener('click', () => {
                    list.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                    goTo(r, query);
                });
                list.appendChild(item);
            });
        }
        list.setAttribute('data-done', '');
    }

    async function startSearch(raw) {
        const query = raw.trim();
        const token = ++searchToken;
        list.removeAttribute('data-done');
        if (query.length < 2) {
            list.innerHTML = '';
            status.textContent = '';
            return;
        }
        status.textContent = tt('readerSearching', 'Cerco nel libro…');
        list.innerHTML = '';
        let results = [];
        try {
            if (typeof pdfDoc !== 'undefined' && pdfDoc) results = await searchPdf(query, token);
            else if (typeof currentBook !== 'undefined' && currentBook) results = await searchEpub(query, token);
        } catch (e) {
            console.warn('Ricerca non riuscita:', e);
        }
        if (token !== searchToken || results === null) return; // superata da una ricerca più recente
        renderResults(results, query);
    }

    // ------------------------------------------------------------- EPUB
    function chapterLabels(book) {
        const labels = new Map();
        const walk = (items) => (items || []).forEach(it => {
            const href = (it.href || '').split('#')[0];
            if (href && !labels.has(href)) labels.set(href, (it.label || '').trim());
            walk(it.subitems);
        });
        walk(book.navigation && book.navigation.toc);
        return labels;
    }

    // Normalizzazione che conserva la lunghezza (serve per risalire ai nodi di testo)
    const fold = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/\s/g, ' ');

    // Cerca nel testo di un capitolo, anche quando la frase attraversa più elementi
    // (corsivi, grassetti, link...), e restituisce posizione (CFI) ed estratto.
    function searchSection(section, query) {
        const doc = section.document;
        const root = doc && (doc.body || doc.documentElement);
        if (!root) return [];
        const nodes = [];
        let full = '';
        const walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            nodes.push({ node: n, start: full.length });
            full += n.nodeValue;
        }
        const hay = fold(full);
        const q = fold(query);
        if (hay.length !== full.length) return null; // caso esotico: lasciamo fare a epub.js
        const locate = (offset) => {
            let lo = 0, hi = nodes.length - 1;
            while (lo < hi) {
                const mid = (lo + hi + 1) >> 1;
                if (nodes[mid].start <= offset) lo = mid; else hi = mid - 1;
            }
            return nodes[lo];
        };
        const out = [];
        for (let pos = hay.indexOf(q); pos !== -1 && out.length < MAX_RESULTS; pos = hay.indexOf(q, pos + q.length)) {
            const a = locate(pos), b = locate(pos + q.length - 1);
            const range = doc.createRange();
            range.setStart(a.node, pos - a.start);
            range.setEnd(b.node, pos + q.length - b.start);
            const start = Math.max(0, pos - 70), end = Math.min(full.length, pos + q.length + 70);
            out.push({ cfi: section.cfiFromRange(range), excerpt: full.slice(start, end) });
        }
        return out;
    }

    async function searchEpub(query, token) {
        const book = currentBook;
        await book.ready;
        const labels = chapterLabels(book);
        const results = [];
        for (const section of book.spine.spineItems) {
            if (token !== searchToken) return null;
            try {
                await section.load(book.load.bind(book));
                let found = searchSection(section, query);
                if (found === null) found = section.find(query);
                const label = [...labels.entries()].find(([href]) => section.href.endsWith(href) || href.endsWith(section.href));
                for (const f of found) {
                    results.push({
                        type: 'epub', cfi: f.cfi, excerpt: f.excerpt,
                        where: (label && label[1]) || tt('readerSearchChapter', 'Capitolo {n}', { n: section.index + 1 }),
                    });
                }
            } catch (e) {
                console.warn('Sezione non ricercabile:', section.href, e);
            } finally {
                section.unload();
            }
            if (results.length >= MAX_RESULTS) break;
            await new Promise(r => setTimeout(r, 0)); // l'interfaccia resta reattiva
        }
        return results;
    }

    async function goToEpub(result) {
        if (!rendition) return;
        await rendition.display(result.cfi);
        const userHighlights = (typeof activeHighlights !== 'undefined' ? activeHighlights : []).map(h => h.cfi);
        if (lastEpubHit && !userHighlights.includes(lastEpubHit)) {
            try { rendition.annotations.remove(lastEpubHit, 'highlight'); } catch (e) { /* già rimosso */ }
        }
        rendition.annotations.highlight(result.cfi, {}, null, 'ks-search-hit',
            { fill: '#ffb300', 'fill-opacity': '0.45', 'mix-blend-mode': 'multiply' });
        lastEpubHit = result.cfi;
    }

    // -------------------------------------------------------------- PDF
    async function searchPdf(query, token) {
        const q = normalize(query);
        const results = [];
        for (let n = 1; n <= pdfDoc.numPages; n++) {
            if (token !== searchToken) return null;
            const page = await pdfDoc.getPage(n);
            const content = await page.getTextContent();
            const text = content.items.map(it => it.str + (it.hasEOL ? ' ' : '')).join(' ').replace(/\s+/g, ' ');
            const norm = normalize(text);
            let pos = norm.indexOf(q);
            while (pos !== -1 && results.length < MAX_RESULTS) {
                const start = Math.max(0, pos - 70), end = Math.min(text.length, pos + q.length + 70);
                results.push({ type: 'pdf', page: n, excerpt: text.slice(start, end),
                    where: tt('readerSearchPage', 'Pagina {n}', { n }) });
                pos = norm.indexOf(q, pos + q.length);
            }
            if (results.length >= MAX_RESULTS) break;
        }
        return results;
    }

    function markPdfHits(query, pageNumber) {
        const q = normalize(query);
        const container = localStorage.getItem('readerFlow') === 'scrolled-doc'
            ? document.getElementById(`pdf-page-wrapper-${pageNumber}`)
            : document.getElementById('pdf-page-wrapper-single');
        const layer = container && container.querySelector('.textLayer');
        if (!layer) return false;
        const spans = [...layer.querySelectorAll('span')];
        if (spans.length === 0) return false;
        document.querySelectorAll('.textLayer .ks-search-hit').forEach(el => el.classList.remove('ks-search-hit'));
        let marked = 0;
        spans.forEach(span => {
            const t = normalize(span.textContent).trim();
            if (t && (t.includes(q) || (t.length >= 3 && q.includes(t)))) {
                span.classList.add('ks-search-hit');
                marked++;
            }
        });
        if (marked) layer.querySelector('.ks-search-hit').scrollIntoView({ block: 'center', behavior: 'smooth' });
        return marked > 0;
    }

    async function goToPdf(result, query) {
        if (localStorage.getItem('readerFlow') === 'scrolled-doc') {
            const target = document.getElementById(`pdf-page-wrapper-${result.page}`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            pageNum = result.page;
            if (typeof queueRenderPage === 'function') queueRenderPage(pageNum);
            else renderPage(pageNum);
        }
        // Aspettiamo che la pagina (e il suo livello di testo) sia disegnata, poi evidenziamo
        for (let i = 0; i < 60; i++) {
            await new Promise(r => setTimeout(r, 100));
            if (markPdfHits(query, result.page)) return;
        }
    }

    function goTo(result, query) {
        return result.type === 'pdf' ? goToPdf(result, query) : goToEpub(result);
    }

    // Quando le traduzioni sono pronte (o cambia lingua) aggiorniamo i testi
    const originalTranslate = window.translateReaderUI;
    window.translateReaderUI = function () {
        const result = originalTranslate ? originalTranslate.apply(this, arguments) : undefined;
        const btn = document.getElementById('reader-search-btn');
        if (btn) btn.innerHTML = KS_ICON('search', 15) + ' ' + escapeHtml(tt('readerSearch', 'Cerca'));
        if (input) input.placeholder = tt('readerSearchPlaceholder', 'Cerca una parola o una frase…');
        return result;
    };

    // Il lettore costruisce i suoi bottoni al caricamento della pagina
    const tryBuild = () => { if (!buildUi() && !document.getElementById('reader-search-btn')) setTimeout(tryBuild, 200); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(tryBuild, 0));
    else tryBuild();
})();
