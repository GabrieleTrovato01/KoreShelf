// --- PRESET DI LETTURA (menu laterale del lettore) ---
// Ogni preset applica regole della tipografia editoriale:
// misura 45–75 caratteri per riga (larghezza in em), interlinea adeguata al corpo, giustificato solo con
// sillabazione, allineamento a sinistra per i testi pensati per la leggibilità.

(function () {
    const PRESETS = {
        // Il libro stampato: serif, giustificato e sillabato, ~66 caratteri per riga
        book: { font: "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif", zoom: 100, line: 1.5, align: 'justify', measure: 25 },
        // Lo schermo: sans-serif, bandiera a sinistra (spaziatura regolare), interlinea più ariosa
        modern: { font: "'Segoe UI', system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif", zoom: 100, line: 1.6, align: 'left', measure: 31 },
        // Leggibilità (indicazioni per ipovisione e dislessia): corpo grande, interlinea ampia,
        // sinistra, righe più corte
        comfort: { font: "Verdana, 'Segoe UI', system-ui, sans-serif", zoom: 115, line: 1.75, align: 'left', measure: 28 },
        // Più testo per pagina senza superare i 75 caratteri
        compact: { font: "Georgia, 'Times New Roman', serif", zoom: 92, line: 1.4, align: 'justify', measure: 27 },
    };
    window.KS_READER_PRESETS = PRESETS;

    const style = document.createElement('style');
    style.textContent = `
        #settings-sidebar { font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; overflow-y: auto; }
        #settings-sidebar .ks-rs-section { margin-bottom: 22px; }
        #settings-sidebar .ks-rs-label { display: block; margin-bottom: 8px; font-size: 12px; font-weight: 600;
            letter-spacing: .6px; text-transform: uppercase; opacity: .65; }
        .ks-presets { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .ks-preset { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 8px 12px;
            border-radius: 14px; border: 1px solid rgba(128,128,128,.3); background: rgba(128,128,128,.06);
            color: inherit; cursor: pointer; font-family: inherit; transition: border-color .15s, background .15s; }
        .ks-preset:hover { background: rgba(128,128,128,.13); }
        .ks-preset[aria-pressed="true"] { border-color: #d4af37; background: rgba(212,175,55,.14); box-shadow: inset 0 0 0 1px #d4af37; }
        .ks-preset .ks-aa { font-size: 22px; line-height: 1.1; }
        .ks-preset .ks-preset-name { font-size: 13px; font-weight: 600; }
        .ks-seg { display: grid; grid-template-columns: 1fr 1fr; padding: 4px; border-radius: 12px; background: rgba(128,128,128,.12); }
        .ks-seg button { height: 38px; border: none; border-radius: 9px; background: transparent; color: inherit;
            font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; opacity: .7; }
        .ks-seg button[aria-pressed="true"] { background: rgba(128,128,128,.28); opacity: 1; }
        #ks-advanced summary { cursor: pointer; font-size: 14px; font-weight: 600; opacity: .75; padding: 6px 0; list-style-position: inside; }
        #ks-advanced[open] summary { margin-bottom: 14px; }
    `;
    document.head.appendChild(style);

    const $ = (id) => document.getElementById(id);
    const tr = (key, fallback) => {
        const v = window.t && window.t(key);
        return v && v !== key ? v : fallback;
    };

    function markActive() {
        const current = localStorage.getItem('readerPreset');
        document.querySelectorAll('#settings-sidebar .ks-preset').forEach(b =>
            b.setAttribute('aria-pressed', b.dataset.preset === current ? 'true' : 'false'));
        const flow = localStorage.getItem('readerFlow') || 'paginated';
        document.querySelectorAll('#settings-sidebar .ks-seg button').forEach(b =>
            b.setAttribute('aria-pressed', b.dataset.flow === flow ? 'true' : 'false'));
    }

    function applyPreset(name) {
        const p = PRESETS[name];
        if (!p) return;
        localStorage.setItem('readerPreset', name);
        localStorage.setItem('readerFont', p.font);
        localStorage.setItem('readerZoom', String(p.zoom));
        localStorage.setItem('readerLineHeight', String(p.line));
        localStorage.setItem('readerTextAlign', p.align);
        localStorage.setItem('readerMeasureEm', String(p.measure));
        // I controlli avanzati mostrano i valori del preset
        if ($('sidebar-zoom-input')) $('sidebar-zoom-input').value = `${p.zoom}%`;
        if ($('sidebar-line-input')) $('sidebar-line-input').value = String(p.line);
        if (typeof rendition !== 'undefined' && rendition) rendition.themes.fontSize(`${p.zoom}%`);
        if (window.applyCurrentTheme) window.applyCurrentTheme();
        markActive();
    }
    window.applyReaderPreset = applyPreset;

    function translate() {
        if ($('sidebar-title')) $('sidebar-title').textContent = tr('readingTitle', 'Lettura');
        if ($('sidebar-zoom-label')) $('sidebar-zoom-label').textContent = tr('textSizeShort', 'Dimensione');
        document.querySelectorAll('#settings-sidebar [data-i18n]').forEach(el => {
            el.textContent = tr(el.dataset.i18n, el.textContent);
        });
    }

    function wire() {
        const sidebar = $('settings-sidebar');
        if (!sidebar || sidebar.dataset.presetsWired) return !!sidebar;
        sidebar.dataset.presetsWired = '1';

        sidebar.querySelectorAll('.ks-preset').forEach(b => b.addEventListener('click', () => applyPreset(b.dataset.preset)));

        // Pagine / Scorrimento: usa il selettore esistente (stessa logica di prima)
        sidebar.querySelectorAll('.ks-seg button').forEach(b => b.addEventListener('click', () => {
            const select = $('sidebar-flow-select');
            if (!select || select.value === b.dataset.flow) return;
            select.value = b.dataset.flow;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            setTimeout(markActive, 50);
        }));

        // Toccare le regolazioni avanzate trasforma lo stile in "personalizzato"
        const advanced = $('ks-advanced');
        const toCustom = (e) => {
            if (e.target.closest('summary')) return;
            localStorage.setItem('readerPreset', 'custom');
            markActive();
        };
        if (advanced) {
            advanced.addEventListener('change', toCustom);
            advanced.addEventListener('click', (e) => { if (e.target.closest('button')) toCustom(e); });
        }

        // Ogni volta che il menu si apre mostra lo stato attuale
        const hamburger = $('hamburger-menu-btn');
        if (hamburger) hamburger.addEventListener('click', () => { translate(); markActive(); });

        translate();
        markActive();
        return true;
    }

    // Il menu viene costruito da reader.js all'avvio della pagina
    const originalTranslate = window.translateReaderUI;
    window.translateReaderUI = function () {
        const r = originalTranslate ? originalTranslate.apply(this, arguments) : undefined;
        translate();
        return r;
    };
    const tryWire = () => { if (!wire()) setTimeout(tryWire, 200); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(tryWire, 0));
    else tryWire();
})();
