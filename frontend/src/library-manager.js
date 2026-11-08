// --- GESTISCI LA LIBRERIA ---
// Due schede con nomi espliciti:
//   Scaffali: rinomina ed elimina ogni scaffale (i libri non vengono mai eliminati con lo
//             scaffale), crea un nuovo scaffale scegliendo i libri da metterci.
//   Libri:    tutti i libri, con ricerca e filtri; si spuntano e si spostano o eliminano insieme.
// Nessun popup di sistema: conferme e domande usano le finestre dell'app.

import { t } from './i18n.js';
import { confirmDialog, promptDialog } from './dialogs.js';

const tr = (key, fallback, vars = {}) => {
    let text = t(key);
    if (!text || text === key) text = fallback;
    for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(v);
    return text;
};
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shelfOf = (book) => (book.tags && book.tags[0]) || '';

const STYLE = `
#ks-manager { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center;
    background: rgba(10, 18, 28, 0.6); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; color: #fff; padding: 24px; box-sizing: border-box; }
#ks-manager .ks-mgr-panel { width: 100%; max-width: 760px; max-height: calc(100vh - 48px); display: flex; flex-direction: column;
    border-radius: 24px; background: #2c3e50; border: 1px solid rgba(255,255,255,0.16); box-shadow: 0 30px 80px rgba(0,0,0,0.45); overflow: hidden; }
#ks-manager header { display: flex; align-items: center; gap: 12px; padding: 18px 22px 12px; }
#ks-manager header h2 { margin: 0; flex: 1; font-size: 21px; font-weight: 700; }
#ks-manager .ks-mgr-icon-btn { width: 44px; height: 44px; border-radius: 50%; border: none; background: rgba(255,255,255,0.08);
    color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; flex: 0 0 auto; }
#ks-manager [role=tablist] { display: grid; grid-template-columns: 1fr 1fr; margin: 0 22px; padding: 4px; border-radius: 14px; background: rgba(255,255,255,0.08); }
#ks-manager [role=tab] { height: 44px; border: none; border-radius: 11px; background: transparent; color: rgba(255,255,255,0.82);
    font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; }
#ks-manager [role=tab][aria-selected=true] { background: #fff; color: #1e2d3b; font-weight: 700; }
#ks-manager .ks-mgr-body { flex: 1; min-height: 0; overflow-y: auto; padding: 14px 18px 12px; }
#ks-manager .ks-mgr-tools { display: flex; flex-direction: column; gap: 10px; padding: 0 4px 10px; }
#ks-mgr-search { height: 46px; padding: 0 18px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.08);
    color: #fff; font-family: inherit; font-size: 15px; outline: none; }
#ks-manager .ks-mgr-chips { display: flex; gap: 8px; flex-wrap: wrap; }
#ks-manager .ks-mgr-chip { height: 36px; padding: 0 14px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.25); background: transparent;
    color: #fff; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
#ks-manager .ks-mgr-chip[aria-pressed=true] { background: #fff; color: #1e2d3b; border-color: #fff; }
#ks-manager ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
#ks-manager .ks-mgr-book label { display: flex; align-items: center; gap: 14px; min-height: 48px; padding: 8px; border-radius: 14px; cursor: pointer; }
#ks-manager .ks-mgr-book label:hover { background: rgba(255,255,255,0.05); }
#ks-manager .ks-mgr-book.selected label { background: rgba(212,175,55,0.14); }
#ks-manager .ks-mgr-book input { width: 22px; height: 22px; accent-color: #d4af37; flex: 0 0 auto; }
#ks-manager .ks-mgr-thumb { width: 34px; height: 51px; flex: 0 0 auto; border-radius: 2px; background: #1a1a1a center / cover no-repeat; }
#ks-manager .ks-mgr-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
#ks-manager .ks-mgr-info b { font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#ks-manager .ks-mgr-info span { font-size: 13px; color: rgba(255,255,255,0.75); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#ks-manager .ks-mgr-pill { padding: 4px 10px; border-radius: 50px; background: rgba(255,255,255,0.1); font-size: 12px; font-weight: 600; white-space: nowrap; max-width: 34%; overflow: hidden; text-overflow: ellipsis; }
#ks-manager .ks-mgr-book.leaving { animation: ks-mgr-leave .45s ease forwards; }
@keyframes ks-mgr-leave { to { opacity: 0; transform: translateX(24px); max-height: 0; } }
#ks-manager .ks-mgr-empty { text-align: center; padding: 26px 0; color: rgba(255,255,255,0.7); font-size: 14px; }
#ks-manager .ks-mgr-shelf { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-height: 56px; padding: 8px 10px; border-radius: 14px; background: rgba(255,255,255,0.05); margin-bottom: 8px; }
#ks-manager .ks-mgr-shelf .ks-mgr-info { min-width: 140px; }
#ks-manager .ks-mgr-shelf button, #ks-mgr-new-shelf, #ks-mgr-bar button { height: 44px; padding: 0 16px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.28);
    background: rgba(255,255,255,0.08); color: #fff; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; }
#ks-manager .ks-mgr-shelf [data-action=delete-shelf] { border-color: rgba(255,140,130,0.5); background: rgba(217,83,79,0.12); color: #ffc9c4; }
#ks-mgr-new-shelf { width: 100%; border-style: dashed; margin-top: 4px; }
#ks-manager .ks-mgr-rename-input { flex: 1; min-width: 140px; height: 44px; padding: 0 14px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.7);
    background: rgba(255,255,255,0.1); color: #fff; font-family: inherit; font-size: 15px; outline: none; }
#ks-mgr-target { margin: 0 4px 10px; padding: 12px 14px; border-radius: 14px; background: rgba(212,175,55,0.16); border: 1px solid rgba(212,175,55,0.55);
    font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
#ks-mgr-target button { margin-left: auto; height: 36px; padding: 0 12px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.3); background: transparent; color: #fff; cursor: pointer; font-family: inherit; }
#ks-mgr-bar { display: none; align-items: center; gap: 10px; flex-wrap: wrap; padding: 12px 18px calc(12px + env(safe-area-inset-bottom, 0px));
    background: #1e2d3b; border-top: 1px solid rgba(255,255,255,0.12); position: relative; }
#ks-mgr-bar.show { display: flex; }
#ks-mgr-bar .ks-mgr-count { margin: 0; flex: 1; font-size: 15px; font-weight: 700; min-width: 110px; }
#ks-mgr-bar [data-action=delete] { background: #d9534f; border-color: #d9534f; font-weight: 700; }
#ks-mgr-bar [data-action=put-into] { background: #fff; color: #1e2d3b; border-color: #fff; font-weight: 700; }
#ks-mgr-move-menu { position: absolute; bottom: calc(100% + 8px); right: 18px; min-width: 240px; max-height: 50vh; overflow-y: auto; padding: 8px;
    border-radius: 16px; background: #22323f; border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 16px 36px rgba(0,0,0,0.45); display: flex; flex-direction: column; gap: 2px; }
#ks-mgr-move-menu button { height: 46px; border: none; border-radius: 10px; background: transparent; text-align: left; padding: 0 14px; font-weight: 500; }
#ks-mgr-move-menu button:hover { background: rgba(255,255,255,0.1); }
#ks-mgr-move-menu [data-action=new-shelf] { color: #e9c46a; font-weight: 700; }
#ks-mgr-toast { position: absolute; left: 50%; bottom: calc(100% + 10px); transform: translateX(-50%); padding: 10px 16px; border-radius: 50px;
    background: #fff; color: #1e2d3b; font-size: 14px; font-weight: 600; white-space: nowrap; box-shadow: 0 8px 20px rgba(0,0,0,0.3); }

/* Telefono: a tutto schermo */
.ks-phone #ks-manager { padding: 0; }
.ks-phone #ks-manager .ks-mgr-panel { max-width: none; max-height: none; width: 100vw; height: 100vh; border-radius: 0; border: none;
    padding-top: env(safe-area-inset-top, 0px); box-sizing: border-box; }
.ks-phone #ks-mgr-bar button { flex: 1 1 auto; }
`;

const CLOSE_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';

/**
 * Apre il pannello. `onChanged(focusBookId?)` viene chiamata dopo ogni modifica (per aggiornare
 * la libreria 3D); `onDeleted(ids)` dopo un'eliminazione.
 */
export function openLibraryManager({ onChanged = () => {}, initialTab = 'shelves' } = {}) {
    if (document.getElementById('ks-manager')) return;
    if (!document.getElementById('ks-manager-style')) {
        const style = document.createElement('style');
        style.id = 'ks-manager-style';
        style.textContent = STYLE;
        document.head.appendChild(style);
    }

    const state = { tab: initialTab, books: [], query: '', shelfFilter: null, selected: new Set(), target: null, renaming: null };
    const uncategorized = tr('uncategorized', 'Senza categoria');

    const root = document.createElement('div');
    root.id = 'ks-manager';
    root.innerHTML = `
        <div class="ks-mgr-panel" role="dialog" aria-modal="true" aria-labelledby="ks-mgr-title">
            <header>
                <h2 id="ks-mgr-title">${esc(tr('mgrTitle', 'Gestisci la libreria'))}</h2>
                <button id="ks-mgr-close" class="ks-mgr-icon-btn" aria-label="${esc(tr('closeBtn', 'Chiudi'))}">${CLOSE_ICON}</button>
            </header>
            <div role="tablist">
                <button role="tab" data-tab="shelves"></button>
                <button role="tab" data-tab="books"></button>
            </div>
            <div class="ks-mgr-body"></div>
            <div id="ks-mgr-bar"></div>
        </div>`;
    document.body.appendChild(root);
    const body = root.querySelector('.ks-mgr-body');
    const bar = root.querySelector('#ks-mgr-bar');

    const close = () => {
        document.removeEventListener('keydown', onKey, true);
        root.remove();
    };
    const onKey = (e) => {
        if (e.key !== 'Escape' || document.getElementById('ks-confirm') || document.getElementById('ks-prompt')) return;
        e.preventDefault();
        e.stopPropagation();
        const menu = document.getElementById('ks-mgr-move-menu');
        if (menu) menu.remove(); else close();
    };
    document.addEventListener('keydown', onKey, true);
    root.querySelector('#ks-mgr-close').addEventListener('click', close);
    root.addEventListener('click', (e) => { if (e.target === root) close(); });
    root.querySelectorAll('[role=tab]').forEach(tab => tab.addEventListener('click', () => {
        state.tab = tab.dataset.tab;
        if (state.tab === 'shelves') state.target = null;
        render();
    }));

    // ------------------------------------------------------------- dati
    const shelves = () => {
        const map = new Map();
        state.books.forEach(b => map.set(shelfOf(b), (map.get(shelfOf(b)) || 0) + 1));
        if (!map.has('')) map.set('', 0);
        return [...map.entries()].sort((a, b) => (a[0] === '') - (b[0] === '') || a[0].localeCompare(b[0]));
    };
    const shelfName = (s) => s || uncategorized;

    async function load() {
        state.books = await (await fetch('/api/books')).json();
        const ids = new Set(state.books.map(b => b.id));
        state.selected.forEach(id => { if (!ids.has(id)) state.selected.delete(id); });
        render();
    }

    function toast(message) {
        bar.classList.add('show');
        const old = document.getElementById('ks-mgr-toast');
        if (old) old.remove();
        const el = document.createElement('div');
        el.id = 'ks-mgr-toast';
        el.setAttribute('role', 'status');
        el.textContent = message;
        bar.appendChild(el);
        setTimeout(() => { el.remove(); renderBar(); }, 2200);
    }

    // ------------------------------------------------------------ disegno
    function render() {
        const [shelvesTab, booksTab] = root.querySelectorAll('[role=tab]');
        shelvesTab.textContent = `${tr('mgrShelves', 'Scaffali')} (${shelves().length})`;
        booksTab.textContent = `${tr('mgrBooks', 'Libri')} (${state.books.length})`;
        shelvesTab.setAttribute('aria-selected', state.tab === 'shelves');
        booksTab.setAttribute('aria-selected', state.tab === 'books');
        if (state.tab === 'shelves') renderShelves(); else renderBooks();
        renderBar();
    }

    function renderShelves() {
        body.innerHTML = `<ul>${shelves().map(([name, count]) => {
            const isDefault = name === '';
            const renaming = state.renaming === name && !isDefault;
            return `<li class="ks-mgr-shelf" data-shelf="${esc(name)}">
                ${renaming
                    ? `<input class="ks-mgr-rename-input" value="${esc(name)}" aria-label="${esc(tr('mgrRename', 'Rinomina'))}">
                       <button data-action="save">${esc(tr('mgrSave', 'Salva'))}</button>
                       <button data-action="cancel-rename">${esc(tr('mgrCancel', 'Annulla'))}</button>`
                    : `<div class="ks-mgr-info"><b>${esc(shelfName(name))}</b>
                         <span>${esc(tr('mgrBooksCount', '{n} libri', { n: count }))}${isDefault ? ' · ' + esc(tr('mgrDefaultShelfNote', 'Qui finiscono i libri senza scaffale')) : ''}</span></div>
                       ${isDefault ? '' : `<button data-action="rename">${esc(tr('mgrRename', 'Rinomina'))}</button>
                       <button data-action="delete-shelf">${esc(tr('mgrDeleteShelf', 'Elimina scaffale'))}</button>`}`}
            </li>`;
        }).join('')}</ul>
        <button id="ks-mgr-new-shelf">+ ${esc(tr('mgrNewShelf', 'Nuovo scaffale'))}</button>`;

        body.querySelectorAll('.ks-mgr-shelf').forEach(row => {
            const name = row.dataset.shelf;
            row.querySelector('[data-action=rename]')?.addEventListener('click', () => { state.renaming = name; render(); });
            row.querySelector('[data-action=cancel-rename]')?.addEventListener('click', () => { state.renaming = null; render(); });
            row.querySelector('[data-action=delete-shelf]')?.addEventListener('click', () => deleteShelf(name));
            const input = row.querySelector('.ks-mgr-rename-input');
            if (input) {
                input.focus();
                input.select();
                const save = () => renameShelf(name, input.value.trim());
                row.querySelector('[data-action=save]').addEventListener('click', save);
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { e.preventDefault(); save(); }
                    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); state.renaming = null; render(); }
                });
            }
        });
        body.querySelector('#ks-mgr-new-shelf').addEventListener('click', newShelf);
    }

    function renderBooks() {
        const names = shelves().map(([n]) => n);
        body.innerHTML = `
            ${state.target !== null ? `<div id="ks-mgr-target">${esc(tr('mgrPickBooks', 'Scegli i libri da mettere in «{name}»', { name: state.target }))}
                <button data-action="cancel-target">${esc(tr('mgrCancel', 'Annulla'))}</button></div>` : ''}
            <div class="ks-mgr-tools">
                <input id="ks-mgr-search" type="search" placeholder="${esc(tr('mgrSearch', 'Cerca tra i tuoi libri'))}" aria-label="${esc(tr('mgrSearch', 'Cerca tra i tuoi libri'))}" value="${esc(state.query)}">
                <div class="ks-mgr-chips">
                    <button class="ks-mgr-chip" data-shelf="" data-all="1" aria-pressed="${state.shelfFilter === null}">${esc(tr('mgrAll', 'Tutti'))}</button>
                    ${names.map(n => `<button class="ks-mgr-chip" data-shelf="${esc(n)}" aria-pressed="${state.shelfFilter === n}">${esc(shelfName(n))}</button>`).join('')}
                </div>
            </div>
            <ul>${state.books.map(b => `
                <li class="ks-mgr-book ${state.selected.has(b.id) ? 'selected' : ''}" data-id="${esc(b.id)}">
                    <label>
                        <input type="checkbox" ${state.selected.has(b.id) ? 'checked' : ''} aria-label="${esc(b.title)}">
                        <span class="ks-mgr-thumb" ${b.coverPath ? `style="background-image:url('/${esc(b.coverPath)}')"` : ''}></span>
                        <span class="ks-mgr-info"><b>${esc(b.title)}</b><span>${esc(b.author || '')}</span></span>
                        <span class="ks-mgr-pill">${esc(shelfName(shelfOf(b)))}</span>
                    </label>
                </li>`).join('')}</ul>
            <p class="ks-mgr-empty" hidden>${esc(tr('mgrNoResults', 'Nessun libro trovato'))}</p>`;

        // Il filtro "Tutti" ha data-shelf="" come "Senza categoria": si distinguono con data-all
        body.querySelectorAll('.ks-mgr-chip').forEach(chip => chip.addEventListener('click', () => {
            state.shelfFilter = chip.dataset.all ? null : chip.dataset.shelf;
            body.querySelectorAll('.ks-mgr-chip').forEach(c => c.setAttribute('aria-pressed', c === chip));
            applyFilters();
        }));
        const search = body.querySelector('#ks-mgr-search');
        search.addEventListener('input', () => { state.query = search.value; applyFilters(); });
        body.querySelectorAll('.ks-mgr-book').forEach(row => {
            row.querySelector('input').addEventListener('change', (e) => {
                if (e.target.checked) state.selected.add(row.dataset.id); else state.selected.delete(row.dataset.id);
                row.classList.toggle('selected', e.target.checked);
                renderBar();
            });
        });
        body.querySelector('[data-action=cancel-target]')?.addEventListener('click', () => { state.target = null; render(); });
        applyFilters();
    }

    function applyFilters() {
        const q = state.query.trim().toLowerCase();
        let shown = 0;
        body.querySelectorAll('.ks-mgr-book').forEach(row => {
            const book = state.books.find(b => b.id === row.dataset.id);
            const okShelf = state.shelfFilter === null || shelfOf(book) === state.shelfFilter;
            const okQuery = !q || `${book.title} ${book.author || ''}`.toLowerCase().includes(q);
            row.style.display = okShelf && okQuery ? '' : 'none';
            if (okShelf && okQuery) shown++;
        });
        const empty = body.querySelector('.ks-mgr-empty');
        if (empty) empty.hidden = shown > 0;
    }

    function renderBar() {
        const n = state.selected.size;
        const toastEl = document.getElementById('ks-mgr-toast');
        if (state.tab !== 'books' || (n === 0 && state.target === null)) {
            bar.innerHTML = '';
            if (toastEl) bar.appendChild(toastEl);
            bar.classList.toggle('show', !!toastEl);
            return;
        }
        bar.classList.add('show');
        const count = n === 1 ? tr('mgrSelectedOne', '1 selezionato') : tr('mgrSelected', '{n} selezionati', { n });
        if (state.target !== null) {
            bar.innerHTML = `<p class="ks-mgr-count">${esc(count)}</p>
                <button data-action="put-into" ${n ? '' : 'disabled style="opacity:.5"'}>${esc(tr('mgrPutInto', 'Metti in «{name}»', { name: state.target }))}</button>`;
            bar.querySelector('[data-action=put-into]').addEventListener('click', () => n && moveSelected(state.target));
        } else {
            bar.innerHTML = `<p class="ks-mgr-count">${esc(count)}</p>
                <button data-action="deselect">${esc(tr('mgrDeselect', 'Deseleziona'))}</button>
                <button data-action="move">${esc(tr('mgrMove', 'Sposta in…'))}</button>
                <button data-action="delete">${esc(n === 1 ? tr('mgrDeleteOne', 'Elimina 1 libro') : tr('mgrDeleteN', 'Elimina {n} libri', { n }))}</button>`;
            bar.querySelector('[data-action=deselect]').addEventListener('click', () => { state.selected.clear(); render(); });
            bar.querySelector('[data-action=move]').addEventListener('click', (e) => { e.stopPropagation(); openMoveMenu(); });
            bar.querySelector('[data-action=delete]').addEventListener('click', deleteSelected);
        }
        if (toastEl) bar.appendChild(toastEl);
    }

    function openMoveMenu() {
        const existing = document.getElementById('ks-mgr-move-menu');
        if (existing) { existing.remove(); return; }
        const menu = document.createElement('div');
        menu.id = 'ks-mgr-move-menu';
        menu.setAttribute('role', 'menu');
        menu.innerHTML = shelves().map(([n]) => `<button role="menuitem" data-shelf="${esc(n)}">${esc(shelfName(n))}</button>`).join('')
            + `<button role="menuitem" data-action="new-shelf">+ ${esc(tr('mgrNewShelf', 'Nuovo scaffale'))}</button>`;
        bar.appendChild(menu);
        menu.querySelectorAll('[data-shelf]').forEach(b => b.addEventListener('click', () => { menu.remove(); moveSelected(b.dataset.shelf); }));
        menu.querySelector('[data-action=new-shelf]').addEventListener('click', async () => {
            menu.remove();
            const name = await askShelfName();
            if (name) moveSelected(name);
        });
    }

    // ----------------------------------------------------------- azioni
    const askShelfName = () => promptDialog({
        title: tr('mgrNewShelf', 'Nuovo scaffale'),
        message: tr('mgrNewShelfPrompt', 'Come vuoi chiamare il nuovo scaffale?'),
        placeholder: tr('mgrNewShelfPlaceholder', 'Es. Romanzi, Da leggere, Lavoro'),
        confirmText: tr('mgrCreate', 'Crea'),
        cancelText: tr('mgrCancel', 'Annulla'),
    });

    async function newShelf() {
        const name = await askShelfName();
        if (!name) return;
        state.target = name;
        state.tab = 'books';
        state.selected.clear();
        render();
    }

    async function moveSelected(shelf) {
        const ids = [...state.selected];
        if (!ids.length) return;
        // Uno scaffale vuoto ('') = "Senza categoria": il server toglie lo scaffale ai libri
        await fetch('/api/books/bulk-tags', { method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookIds: ids, newTag: shelf }) });
        state.selected.clear();
        state.target = null;
        await load();
        toast(tr('mgrMoved', '{n} libri spostati in «{name}»', { n: ids.length, name: shelfName(shelf) }));
        onChanged(ids[0]);
    }

    async function deleteSelected() {
        const ids = [...state.selected];
        const titles = ids.map(id => state.books.find(b => b.id === id)?.title).filter(Boolean);
        const shown = titles.slice(0, 5).join('\n');
        const more = titles.length > 5 ? '\n' + tr('mgrAndMore', 'e altri {n}', { n: titles.length - 5 }) : '';
        const ok = await confirmDialog({
            icon: KS_ICON('trash', 36),
            title: tr('mgrDeleteBooksTitle', 'Eliminare {n} libri?', { n: ids.length }),
            message: `${shown}${more}\n\n${tr('mgrDeleteBooksMsg', "I file verranno cancellati dal tuo computer. L'operazione non si può annullare.")}`,
            confirmText: ids.length === 1 ? tr('mgrDeleteOne', 'Elimina 1 libro') : tr('mgrDeleteN', 'Elimina {n} libri', { n: ids.length }),
            cancelText: tr('mgrCancel', 'Annulla'),
            danger: true,
        });
        if (!ok) return;
        // Le righe scivolano via mentre il server elimina i file
        ids.forEach(id => body.querySelector(`.ks-mgr-book[data-id="${CSS.escape(id)}"]`)?.classList.add('leaving'));
        await Promise.all(ids.map(id => fetch(`/api/books/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => null)));
        await new Promise(r => setTimeout(r, 450));
        state.selected.clear();
        await load();
        toast(tr('mgrDeleted', '{n} libri eliminati', { n: ids.length }));
        onChanged(null);
    }

    async function renameShelf(oldName, newName) {
        if (!newName || newName === oldName) { state.renaming = null; render(); return; }
        await fetch('/api/categories', { method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldName, newName, action: 'rename' }) });
        state.renaming = null;
        await load();
        toast(tr('mgrRenamed', 'Scaffale rinominato in «{name}»', { name: newName }));
        onChanged(null);
    }

    async function deleteShelf(name) {
        const count = state.books.filter(b => shelfOf(b) === name).length;
        const ok = await confirmDialog({
            icon: KS_ICON('folder', 36),
            title: tr('mgrDeleteShelfTitle', 'Eliminare lo scaffale «{name}»?', { name }),
            message: tr('mgrDeleteShelfMsg', 'I {n} libri NON verranno eliminati: finiranno in «Senza categoria».', { n: count }),
            confirmText: tr('mgrDeleteShelf', 'Elimina scaffale'),
            cancelText: tr('mgrCancel', 'Annulla'),
            danger: true,
        });
        if (!ok) return;
        await fetch('/api/categories', { method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldName: name, action: 'delete' }) });
        await load();
        toast(tr('mgrShelfDeleted', 'Scaffale eliminato: i libri sono in «Senza categoria»'));
        onChanged(null);
    }

    render();
    load();
}
