// --- VASSOIO DI CARICAMENTO ---
// Al posto del vecchio alert(): ogni file caricato diventa un "libro fantasma"
// che si riempie mentre viene elaborato e si trasforma nel libro vero
// (copertina, titolo, scintille) quando è pronto.

import { t } from './i18n.js';

const STYLE = `
.ks-tray {
    position: fixed; right: 24px; bottom: 96px; z-index: 1200;
    transform: translateY(140%); opacity: 0;
    max-width: max(300px, min(36vw, 480px)); padding: 16px 22px 18px;
    border-radius: 26px; box-sizing: border-box;
    transition: transform .55s cubic-bezier(.2,.9,.25,1.15), opacity .4s ease;
    pointer-events: auto;
}
.ks-tray.open { transform: translateY(0); opacity: 1; }
.ks-tray.leaving { transform: translateY(40px); opacity: 0; transition-duration: .5s; }
.ks-tray-head {
    display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
    font-size: 13px; letter-spacing: 1px; text-transform: uppercase; font-weight: 600;
}
.ks-tray-title { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ks-tray-summary { font-size: 12px; opacity: .85; text-transform: none; letter-spacing: 0; }
.ks-tray-skip {
    flex: 0 0 auto; border: 1px solid rgba(255,255,255,.3); background: rgba(255,255,255,.12); color: inherit;
    border-radius: 50px; padding: 5px 12px; font-size: 11px; font-weight: 700; letter-spacing: .5px;
    text-transform: uppercase; cursor: pointer; white-space: nowrap; display: none;
}
.ks-tray-skip:hover { background: rgba(255,255,255,.25); }
.ks-tray.multi .ks-tray-skip { display: inline-block; }
.ks-tray.skipped .ks-tray-skip, .ks-tray.done .ks-tray-skip { display: none; }
.ks-tray-close {
    background: none; border: none; color: inherit; font-size: 20px; line-height: 1;
    cursor: pointer; opacity: .6; padding: 0 2px; display: none;
}
.ks-tray-close:hover { opacity: 1; }
.ks-tray.done .ks-tray-close { display: block; }
.ks-tray-bar { height: 3px; border-radius: 3px; background: rgba(255,255,255,.12); overflow: hidden; margin-top: -6px; margin-bottom: 14px; }
.ks-tray-bar > div { height: 100%; width: 0; background: linear-gradient(90deg, #4da6ff, #d4af37); transition: width .5s ease; }
.ks-shelf {
    display: flex; gap: 18px; overflow-x: auto; padding: 6px 4px 4px;
    scrollbar-width: none; perspective: 900px;
}
.ks-shelf::-webkit-scrollbar { display: none; }

/* --- Il libro --- */
.ks-item { flex: 0 0 auto; width: 108px; perspective: 520px; display: flex; flex-direction: column; align-items: center; gap: 8px;
    animation: ks-drop-in .6s cubic-bezier(.2,.9,.25,1.3) both; }
.ks-item-label { width: 100%; font-size: 11px; text-align: center; line-height: 1.25; opacity: .85;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 28px; }
.ks-item-status { font-size: 10px; letter-spacing: .4px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; text-transform: uppercase; opacity: .65; white-space: nowrap; }

.ks-book { position: relative; width: 82px; height: 120px; transform-style: preserve-3d;
    transform: rotateY(-28deg); transition: transform .6s ease; }
.ks-face { position: absolute; inset: 0; border-radius: 3px 7px 7px 3px; overflow: hidden; backface-visibility: hidden; }
.ks-front {
    background: rgba(255,255,255,.07);
    border: 1.5px dashed rgba(255,255,255,.35);
    box-sizing: border-box;
}
.ks-spine { position: absolute; top: 0; left: 0; width: 14px; height: 100%;
    transform: rotateY(-90deg) translateZ(0); transform-origin: left center;
    background: rgba(255,255,255,.12); border-radius: 3px 0 0 3px; }
.ks-pages { position: absolute; top: 3px; right: -9px; width: 10px; height: calc(100% - 6px);
    background: repeating-linear-gradient(90deg, rgba(255,255,255,.55) 0 1px, rgba(255,255,255,.25) 1px 2px);
    transform: rotateY(90deg); transform-origin: left center; border-radius: 0 2px 2px 0; opacity: .5; }
.ks-shine { position: absolute; inset: 0; pointer-events: none; }
.ks-fill { position: absolute; left: 0; right: 0; bottom: 0; height: 0;
    background: linear-gradient(0deg, rgba(77,166,255,.45), rgba(77,166,255,.12));
    transition: height .35s ease; }
.ks-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    font-size: 26px; opacity: .55; }
.ks-cover-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .5s ease; }
.ks-cover-text { position: absolute; inset: 0; padding: 10px 8px; box-sizing: border-box; display: flex; flex-direction: column;
    justify-content: center; text-align: center; gap: 6px; background: #1a1a1a; color: #d4af37;
    font-family: Georgia, serif; opacity: 0; transition: opacity .5s ease; }
.ks-cover-text b { font-size: 11px; line-height: 1.2; }
.ks-cover-text span { font-size: 9px; color: #ccc; }
.ks-badge { position: absolute; top: -8px; right: -10px; width: 24px; height: 24px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; color: #fff;
    transform: scale(0) translateZ(20px); transition: transform .45s cubic-bezier(.2,.9,.25,1.6); box-shadow: 0 3px 10px rgba(0,0,0,.35); }

.ks-back { transform: rotateY(180deg); background: linear-gradient(135deg, #2b2b2b, #141414);
    border: 1px solid rgba(212,175,55,.35); box-sizing: border-box; border-radius: 7px 3px 3px 7px; }

/* Partito verso lo scaffale: nel vassoio resta solo il posto vuoto */
.ks-item.landed .ks-book { visibility: hidden; }

/* --- Il libro in volo verso lo scaffale --- */
.ks-flyer { position: fixed; left: 0; top: 0; width: 82px; height: 120px; z-index: 1250;
    transform-origin: 0 0; perspective: 520px; pointer-events: none; will-change: transform;
    transition: opacity .28s ease; }
.ks-flyer .ks-book { width: 100%; height: 100%; animation: none !important; transition: none !important;
    transform: rotateY(calc(var(--rot, -28) * 1deg)) !important; }
.ks-flyer .ks-front { border: none; background: transparent; box-shadow: 0 10px 30px rgba(0,0,0,.45); }
.ks-flyer .ks-spine { background: #2a2a2a; }
.ks-flyer .ks-pages { opacity: 1; }
.ks-flyer .ks-cover-img.loaded, .ks-flyer .ks-cover-text.show { opacity: 1; }
.ks-flyer .ks-fill, .ks-flyer .ks-icon, .ks-flyer .ks-badge, .ks-flyer .ks-spark { display: none; }
.ks-flyer.gone { opacity: 0; }
.ks-land-glow { position: fixed; z-index: 1240; pointer-events: none; border-radius: 6px;
    animation: ks-land 0.9s ease-out forwards; }
.ks-land-glow .ks-spark { width: 9px; height: 9px; animation-duration: 1.1s; }
@keyframes ks-land {
    0% { box-shadow: 0 0 0 0 rgba(212,175,55,.95), inset 0 0 40px rgba(255,217,102,.35); }
    100% { box-shadow: 0 0 0 36px rgba(212,175,55,0), inset 0 0 0 rgba(255,217,102,0); }
}

/* In attesa */
.ks-item.queued .ks-book { opacity: .45; }

/* In invio / elaborazione: respira e brilla */
.ks-item.sending .ks-book, .ks-item.processing .ks-book { animation: ks-breathe 2.2s ease-in-out infinite; }
.ks-item.processing .ks-fill { height: 100% !important; animation: ks-pulse-fill 1.6s ease-in-out infinite; }
.ks-item.sending .ks-shine, .ks-item.processing .ks-shine {
    background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%);
    background-size: 250% 100%; animation: ks-shimmer 1.5s linear infinite; }
.ks-item.processing .ks-icon { animation: ks-wiggle 1.2s ease-in-out infinite; }

/* Pronto! */
.ks-item.ready .ks-book { animation: ks-reveal .9s cubic-bezier(.2,.9,.25,1.2) both; }
.ks-item.ready .ks-front { border: none; background: transparent; box-shadow: 0 0 0 0 rgba(212,175,55,.8); animation: ks-glow 1.4s ease-out .5s both; }
.ks-item.ready .ks-spine { background: #2a2a2a; }
.ks-item.ready .ks-pages { opacity: 1; }
.ks-item.ready .ks-fill, .ks-item.ready .ks-icon { opacity: 0; }
.ks-item.ready .ks-cover-img.loaded, .ks-item.ready .ks-cover-text.show { opacity: 1; }
.ks-item.ready .ks-badge { background: #2ecc71; transform: scale(1) translateZ(20px); transition-delay: .55s; }
.ks-item.ready .ks-item-status { color: #7dffb0; opacity: 1; }

/* Già presente / errore */
.ks-item.duplicate .ks-book, .ks-item.error .ks-book { animation: ks-shake .55s ease both; }
.ks-item.duplicate .ks-front { border-color: rgba(240,173,78,.9); background: rgba(240,173,78,.15); }
.ks-item.duplicate .ks-badge { background: #f0ad4e; transform: scale(1) translateZ(20px); }
.ks-item.duplicate .ks-item-status { color: #ffd08a; opacity: 1; }
.ks-item.error .ks-front { border-color: rgba(217,83,79,.9); background: rgba(217,83,79,.18); }
.ks-item.error .ks-badge { background: #d9534f; transform: scale(1) translateZ(20px); }
.ks-item.error .ks-item-status { color: #ff9c99; opacity: 1; }
.ks-item.duplicate .ks-fill, .ks-item.error .ks-fill { opacity: 0; }


/* Scintille */
.ks-spark { position: absolute; left: 50%; top: 45%; width: 6px; height: 6px; border-radius: 50%;
    background: #ffd966; box-shadow: 0 0 8px #ffd966; pointer-events: none;
    animation: ks-spark .9s ease-out forwards; }

@keyframes ks-drop-in { from { opacity: 0; transform: translateY(30px) scale(.85); } to { opacity: 1; transform: none; } }
@keyframes ks-breathe { 0%,100% { transform: rotateY(-28deg) translateY(0); } 50% { transform: rotateY(-18deg) translateY(-5px); } }
@keyframes ks-shimmer { from { background-position: 150% 0; } to { background-position: -100% 0; } }
@keyframes ks-pulse-fill { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
@keyframes ks-wiggle { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes ks-reveal {
    0% { transform: rotateY(-28deg) scale(1); }
    40% { transform: rotateY(-206deg) scale(1.12) translateY(-10px); }
    100% { transform: rotateY(-388deg) scale(1); }
}
@keyframes ks-glow { 0% { box-shadow: 0 0 0 0 rgba(212,175,55,.9); } 100% { box-shadow: 0 0 0 18px rgba(212,175,55,0); } }
@keyframes ks-shake { 0%,100% { transform: rotateY(-28deg) translateX(0); } 20%,60% { transform: rotateY(-28deg) translateX(-6px); } 40%,80% { transform: rotateY(-28deg) translateX(6px); } }
@keyframes ks-spark { to { transform: translate(var(--dx), var(--dy)) scale(.2); opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
    .ks-land-glow { animation: none !important; }
    .ks-item, .ks-book, .ks-fill, .ks-shine, .ks-icon, .ks-front { animation: none !important; }
}
`;

let styleInjected = false;
function injectStyle() {
    if (styleInjected) return;
    const el = document.createElement('style');
    el.textContent = STYLE;
    document.head.appendChild(el);
    styleInjected = true;
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));

function cleanFileName(name) {
    return name.replace(/(\.kepub)?\.(epub|kepub|pdf|mobi|azw3|azw|fb2|fbz|zip|docx|odt|cbz|cbr|cb7|txt|md|markdown)$/i, '').replace(/\.fb2$/i, '').replace(/[_-]+/g, ' ').trim();
}

function burst(container, radius = 45, delay = 0.45) {
    for (let i = 0; i < 12; i++) {
        const s = document.createElement('div');
        s.className = 'ks-spark';
        const angle = (Math.PI * 2 * i) / 12;
        const dist = radius + Math.random() * radius * 0.55;
        s.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        s.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        s.style.animationDelay = `${delay + Math.random() * 0.15}s`;
        container.appendChild(s);
        setTimeout(() => s.remove(), 1600);
    }
}

class TrayItem {
    constructor(tray, file) {
        this.tray = tray;
        this.state = 'queued';
        this.el = document.createElement('div');
        this.el.className = 'ks-item queued';
        this.el.innerHTML = `
            <div class="ks-book">
                <div class="ks-face ks-front">
                    <div class="ks-fill"></div>
                    <img class="ks-cover-img" alt="">
                    <div class="ks-cover-text"><b></b><span></span></div>
                    <div class="ks-icon">${KS_ICON(/\.(cbz|cbr|cb7)$/i.test(file.name) ? 'image' : /\.(pdf|txt|md|markdown|docx|odt)$/i.test(file.name) ? 'file' : 'book', 26)}</div>
                    <div class="ks-shine"></div>
                </div>
                <div class="ks-face ks-back"></div>
                <div class="ks-spine"></div>
                <div class="ks-pages"></div>
                <div class="ks-badge"></div>
            </div>
            <div class="ks-item-label"></div>
            <div class="ks-item-status"></div>`;
        this.book = this.el.querySelector('.ks-book');
        this.fill = this.el.querySelector('.ks-fill');
        this.badge = this.el.querySelector('.ks-badge');
        this.label = this.el.querySelector('.ks-item-label');
        this.status = this.el.querySelector('.ks-item-status');
        this.label.textContent = cleanFileName(file.name);
        this.label.title = file.name;
        this.setStatus('queued', t('uploadQueued'));
    }

    setStatus(state, text) {
        this.el.classList.remove(this.state);
        this.state = state;
        this.el.classList.add(state);
        this.status.textContent = text;
    }

    sending(fraction) {
        if (this.state !== 'sending') {
            this.setStatus('sending', t('uploadSending'));
            this.el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        this.fill.style.height = `${Math.round(Math.min(1, fraction) * 100)}%`;
    }

    processing() {
        this.setStatus('processing', t('uploadAnalyzing'));
    }

    ready(book) {
        if (book?.id) this.el.dataset.bookId = book.id;
        const title = book?.title || this.label.textContent;
        this.label.textContent = title;
        this.label.title = title;
        if (book?.coverPath) {
            const img = this.el.querySelector('.ks-cover-img');
            img.onload = () => img.classList.add('loaded');
            img.onerror = () => this.showTextCover(title, book.author);
            img.src = `/${book.coverPath}`;
        } else {
            this.showTextCover(title, book?.author);
        }
        this.badge.innerHTML = KS_ICON('check', 14);
        this.setStatus('ready', t('uploadReady'));
        burst(this.book);
    }

    showTextCover(title, author) {
        const box = this.el.querySelector('.ks-cover-text');
        box.querySelector('b').textContent = title;
        box.querySelector('span').textContent = author || '';
        box.classList.add('show');
    }

    /**
     * Stacca dal vassoio una copia del libro che vola verso lo scaffale.
     * place(x, y, larghezza, altezza, rotazione) la muove; land(rettangolo) la fa atterrare.
     */
    launch() {
        const itemRect = this.el.getBoundingClientRect();
        const W = this.book.offsetWidth, H = this.book.offsetHeight;
        const startRect = { x: itemRect.x + this.book.offsetLeft, y: itemRect.y + this.book.offsetTop, width: W, height: H };
        // Con tanti libri il vassoio scorre dietro ai caricamenti, che vanno più veloci dei voli:
        // quando tocca a un libro dei primi, il suo posto può essere già uscito dal vassoio a
        // sinistra (anche fuori dallo schermo). Allora parte dall'angolo in basso a destra della
        // parte visibile del vassoio, dove arrivano i caricamenti.
        const shelfRect = this.tray.shelf.getBoundingClientRect();
        const visible = startRect.x >= shelfRect.left - 1 && startRect.x + W <= shelfRect.right + 1;
        if (!visible && shelfRect.width > 0) {
            startRect.x = Math.max(shelfRect.left, shelfRect.right - W);
            startRect.y = Math.min(startRect.y, shelfRect.bottom - H);
        }

        const flyer = document.createElement('div');
        flyer.className = 'ks-flyer';
        const clone = this.book.cloneNode(true);
        clone.querySelectorAll('.ks-spark').forEach(el => el.remove());
        flyer.appendChild(clone);
        document.body.appendChild(flyer);
        this.el.classList.add('landed');

        const place = (x, y, w, h, rot) => {
            flyer.style.transform = `translate(${x}px, ${y}px) scale(${w / W}, ${h / H})`;
            flyer.style.setProperty('--rot', rot.toFixed(2));
        };
        place(startRect.x, startRect.y, W, H, -28);

        const land = (target, { instant = false } = {}) => {
            if (instant) {            // "Salta animazione": via subito, senza effetti
                flyer.remove();
                return;
            }
            if (target) {
                const glow = document.createElement('div');
                glow.className = 'ks-land-glow';
                Object.assign(glow.style, {
                    left: `${target.x}px`, top: `${target.y}px`,
                    width: `${target.width}px`, height: `${target.height}px`,
                });
                document.body.appendChild(glow);
                burst(glow, Math.max(60, target.width * 0.45), 0);
                setTimeout(() => glow.remove(), 1400);
            }
            flyer.classList.add('gone');
            setTimeout(() => flyer.remove(), 320);
        };
        return { startRect, place, land };
    }

    /** Il libro è sullo scaffale: nel vassoio resta il posto vuoto. */
    landed() {
        this.el.classList.add('landed');
    }

    duplicate() {
        this.badge.textContent = '=';
        this.setStatus('duplicate', t('uploadDuplicate'));
    }

    error(message) {
        this.badge.textContent = '!';
        this.setStatus('error', t('uploadError'));
        if (message) this.el.title = message;
    }
}

export class UploadTray {
    constructor() {
        injectStyle();
        this.items = [];
        this.el = document.createElement('div');
        this.el.className = 'ks-tray glass-effect';
        this.el.innerHTML = `
            <div class="ks-tray-head">
                <span class="ks-tray-title"></span>
                <span class="ks-tray-summary"></span>
                <button class="ks-tray-skip" type="button"></button>
                <button class="ks-tray-close" aria-label="Close">&times;</button>
            </div>
            <div class="ks-tray-bar"><div></div></div>
            <div class="ks-shelf"></div>`;
        this.title = this.el.querySelector('.ks-tray-title');
        this.summary = this.el.querySelector('.ks-tray-summary');
        this.bar = this.el.querySelector('.ks-tray-bar > div');
        this.shelf = this.el.querySelector('.ks-shelf');
        this.closed = new Promise(resolve => { this.resolveClosed = resolve; });
        this.el.querySelector('.ks-tray-close').addEventListener('click', () => this.close());
        this.skipBtn = this.el.querySelector('.ks-tray-skip');
        this.skipBtn.innerHTML = KS_ICON('skip', 12) + ' ' + t('uploadSkip');
        this.skipHandlers = [];
        this.skipBtn.addEventListener('click', () => {
            this.el.classList.add('skipped');
            this.skipHandlers.forEach(fn => fn());
        });
        document.body.appendChild(this.el);
        requestAnimationFrame(() => requestAnimationFrame(() => this.el.classList.add('open')));
    }

    /** Con più libri compare il bottone "Salta animazione". */
    onSkip(handler) {
        this.skipHandlers.push(handler);
    }

    add(file) {
        const item = new TrayItem(this, file);
        this.items.push(item);
        this.shelf.appendChild(item.el);
        this.el.classList.toggle('multi', this.items.length > 1);
        item.el.style.animationDelay = `${Math.min(this.items.length, 8) * 0.06}s`;
        this.progress(0);
        return item;
    }

    progress(done) {
        const total = this.items.length;
        this.title.textContent = t('uploadTrayTitle').replace('{done}', done).replace('{total}', total);
        this.bar.style.width = `${total ? (done / total) * 100 : 0}%`;
    }

    /** Mostra il riepilogo e chiude il vassoio. Resta aperto (con la X) se ci sono stati problemi. */
    async finish({ added, duplicates, errors }) {
        const parts = [`${KS_ICON('check', 13)} ${added}`];
        if (duplicates) parts.push(`${KS_ICON('alert', 13)} ${duplicates}`);
        if (errors) parts.push(`${KS_ICON('x', 13)} ${errors}`);
        this.summary.innerHTML = parts.join('  ·  ');
        this.title.textContent = t('uploadComplete');
        this.el.classList.add('done');

        await wait(1300);
        if (duplicates || errors) {
            setTimeout(() => this.close(), 7000);
        } else {
            this.close();
        }
        return this.closed;
    }

    close() {
        if (this.closing) return;
        this.closing = true;
        this.el.classList.add('leaving');
        setTimeout(() => {
            this.el.remove();
            this.resolveClosed();
        }, 550);
    }
}

/**
 * Invia un file con barra di avanzamento reale (fetch non la offre).
 * Restituisce il JSON del server.
 */
export function uploadWithProgress(file, { offline = false } = {}, onProgress = () => {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const form = new FormData();
        if (offline) form.append('offline', '1');   // prima del file: il server lo legge per primo
        form.append('ebook', file);
        xhr.open('POST', '/api/upload');
        xhr.responseType = 'json';
        xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(e.loaded / e.total); };
        xhr.upload.onload = () => onProgress(1, true);
        xhr.onload = () => resolve(xhr.response || { success: false });
        xhr.onerror = () => reject(new Error('network'));
        xhr.send(form);
    });
}
