import { openLibraryManager } from './library-manager.js';
import { LibraryLoader } from './loader-optimizer.js';
import { t, initI18n, setLanguage } from './i18n.js';
import { UploadTray, uploadWithProgress } from './upload-tray.js';
import { confirmDialog } from './dialogs.js';
import { dissolveBook } from './dissolve.js';

// Sul telefono (app Tauri) i link esterni non devono far navigare la WebView (su Android
// faceva chiudere l'app): si chiede al server interno, e l'app li apre nel browser del sistema.
function openExternal(url) {
    if (!url) return;
    fetch('/api/open-external', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-KoreShelf': '1' },
        body: JSON.stringify({ url: String(url) }),
    }).catch(err => console.warn('Link esterno non aperto:', err));
}
if (window.__KORESHELF_MOBILE__) {
    window.open = (url) => { openExternal(url); return null; };
    document.addEventListener('click', (e) => {
        const link = e.target.closest && e.target.closest('a[target="_blank"]');
        if (link && link.href) { e.preventDefault(); openExternal(link.href); }
    }, true);
}
import {openHelpModal} from './help-modal.js';
import {openMetadataManager} from './metadata-manager.js';
import './style.css';
import * as THREE from 'three';

window.t = t;

// --- TRADUZIONE ELEMENTI STATICI E UI DINAMICA ---
function translateStaticHTML() {
    // 1. Traduzione Lettore (Reader) e pagina
    const closeReaderBtn = document.getElementById('close-reader-btn');
    const themeBtn = document.getElementById('theme-toggle-btn');
    const lang = localStorage.getItem('KoreShelf_lang') || 'it';

    if (typeof shutdownBtn !== 'undefined') {
        shutdownBtn.innerHTML = '<span class="btn-icon">' + KS_ICON('power', 16) + '</span><span class="btn-text">' + t('shutdownBtn') + '</span>';
        shutdownBtn.title = t('shutdownTooltip');
    }
    
    if (closeReaderBtn) closeReaderBtn.innerHTML = `&times; ${t('closeReader')}`;
    
    if (themeBtn) {
        const isDark = localStorage.getItem('readerDarkMode') === 'true';
        themeBtn.innerText = isDark 
            ? (lang === 'it' ? 'Modalità Chiara' : 'Light Mode')
            : (lang === 'it' ? 'Modalità Scura' : 'Dark Mode');
    }

    document.title = lang === 'it' ? "KoreShelf - Libreria 3D" : "KoreShelf - 3D Library";

    // 2. AGGIORNAMENTO TESTI BOTTONI (La vera soluzione al tuo problema!)
    // Dato che la lingua ora è caricata, applichiamo i testi corretti ai bottoni creati in alto
    if (typeof manageCatBtn !== 'undefined') {
        manageCatBtn.innerHTML = '<span class="btn-icon">' + KS_ICON('folder', 16) + '</span><span class="btn-text">' + t('manageShelf') + '</span>';
        manageCatBtn.title = t('manageShelfTooltip');
    }
    if (typeof searchInput !== 'undefined') searchInput.placeholder = t('searchPlaceholder');
    if (typeof uploadLabel !== 'undefined') uploadLabel.innerHTML = '<span class="btn-icon">' + KS_ICON('upload', 16) + '</span><span class="btn-text">' + t('uploadBtn') + '</span>';
    
    // Bottoni in basso
    if (typeof infoBtn !== 'undefined') {
        // infoBtn cambia icona a seconda di cosa sta mostrando
        infoBtn.innerHTML = isShowingBack 
            ? '<span class="btn-icon">' + KS_ICON('book', 16) + '</span><span class="btn-text">' + t('showCover') + '</span>' 
            : '<span class="btn-icon">' + KS_ICON('eye', 16) + '</span><span class="btn-text">' + t('showSynopsis') + '</span>';
    }
    if (typeof assignCatBtn !== 'undefined') assignCatBtn.innerHTML = '<span class="btn-icon">' + KS_ICON('tag', 16) + '</span><span class="btn-text">' + t('assignCategory') + '</span>';
    if (typeof deleteBookBtn !== 'undefined') deleteBookBtn.innerHTML = '<span class="btn-icon">' + KS_ICON('trash', 16) + '</span><span class="btn-text">' + t('deleteBook') + '</span>';
    if (typeof editMetadataBtn !== 'undefined') editMetadataBtn.innerHTML = '<span class="btn-icon">' + KS_ICON('pencil', 16) + '</span><span class="btn-text">' + (t('editMetadata') || 'Modifica') + '</span>';

    if (typeof creditsFooter !== 'undefined') {
        creditsFooter.innerHTML = creditsHtml();
    }
    if (typeof donateBtn !== 'undefined') donateBtn.innerHTML = '<span class="btn-icon">' + KS_ICON('heart', 16) + '</span><span class="btn-text">' + t('donateBtn') + '</span>';
    if (typeof emptyLibraryHint !== 'undefined') {
        renderEmptyHint();
        updateActiveBookPanel();
    }
}

// --- 1. SETUP BASE ---
const scene = new THREE.Scene();

// Diamo un colore alla scena (la "parete" dietro la libreria)
// Puoi cambiare questo codice esadecimale con il colore che preferisci!
scene.background = new THREE.Color('#2c3e50'); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3.5); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
// Il canvas occupa sempre lo schermo con dimensioni relative: se avesse una larghezza fissa
// in pixel, dopo una rotazione allargherebbe la pagina e la WebView la rimpicciolirebbe.
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.domElement.id = 'ks-scene';
renderer.domElement.style.cssText = 'position: fixed; inset: 0; width: 100%; height: 100%; display: block; touch-action: none;';
// touch-action: none → il browser non "ruba" lo swipe per scorrere la pagina (niente pointercancel):
// swipe verticale = cambia scaffale, orizzontale = cambia libro
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; 
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5); // Spostata un po' più avanti per ombre migliori
directionalLight.castShadow = true; // ABILITA PROIEZIONE

// Ottimizzazione risoluzione e area ombre
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;

scene.add(directionalLight);

let textureLoader = new THREE.TextureLoader();
// --- COSTRUZIONE DELLA MENSOLA (Con Texture Legno Reale) ---
const shelfGeometry = new THREE.BoxGeometry(50, 0.2, 4); 

// 1. Carichiamo la texture del legno (da internet o da un file locale)
const woodTexture = textureLoader.load('/wood.jpg');

// 2. Ripetiamo la texture per evitare che si "stiri" sulla mensola lunghissima
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
// Ripetiamo l'immagine 12 volte in larghezza e 1 volta in profondità
woodTexture.repeat.set(12, 1); 

// 3. Creiamo il materiale applicando la fotografia
const shelfMaterial = new THREE.MeshStandardMaterial({ 
    map: woodTexture,
    roughness: 0.85, // Mantiene quell'aspetto un po' grezzo e non troppo riflettente
    color: '#aaaaaa' // Scuriamo leggermente la foto originale per far risaltare meglio i libri
});

const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
shelf.position.set(0, -1.6, -0.5); 
shelf.receiveShadow = true;
scene.add(shelf);
// ---------------------------------

const libLoader = new LibraryLoader(textureLoader);

const libraryGroup = new THREE.Group();
scene.add(libraryGroup);


const pagesMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc });
const baseCoverColor = '#1a1a1a';
const baseCoverMaterial = new THREE.MeshStandardMaterial({ color: baseCoverColor });

// Variabili di stato
let booksArray = [];
let currentIndex = 0;
let isShowingBack = false;
let targetCameraY = 1.5; // Altezza bersaglio della telecamera

// --- TELEFONO: app mobile o schermo stretto ---
function isPhone() {
    // Schermo stretto, oppure app mobile su un telefono (i tablet usano il layout normale)
    const smallScreen = Math.min(window.screen.width, window.screen.height) < 700;
    return window.matchMedia('(max-width: 700px)').matches || (!!window.__KORESHELF_MOBILE__ && smallScreen);
}
// Inquadratura: sul telefono verticale la telecamera si allontana (libro ≈ metà larghezza)
// e si abbassa, così il libro sta nello spazio libero tra la barra in alto e il pannello.
let cameraFit = { z: 3.5, dx: 0, dy: 0 };
function updateCameraFit() {
    const vw = window.innerWidth, vh = window.innerHeight;
    document.documentElement.classList.toggle('ks-phone', isPhone());
    document.documentElement.classList.toggle('ks-landscape', isPhone() && vw > vh);
    if (typeof placeMoreButton === 'function') placeMoreButton();
    if (!isPhone()) { cameraFit = { z: 3.5, dx: 0, dy: 0 }; return; }

    // Spazio davvero libero per il libro: sotto la barra in alto e fuori dal pannello
    // (pannello in basso in verticale, a destra in orizzontale)
    const top = (document.querySelector('.top-bar')?.getBoundingClientRect().bottom || 70) + 12;
    const panel = document.getElementById('ks-book-panel');
    // (il pannello è "fixed": offsetParent è sempre null, quindi si controlla lo stile)
    const pr = panel && getComputedStyle(panel).display !== 'none' ? panel.getBoundingClientRect() : null;
    const p = pr && pr.width > 0 && pr.height > 0 ? pr : null;
    const landscape = vw > vh;
    const free = {
        left: 12,
        right: landscape && p ? p.left - 12 : vw - 12,
        top,
        bottom: !landscape && p ? p.top - 12 : vh - 12,
    };
    const freeW = Math.max(60, free.right - free.left), freeH = Math.max(60, free.bottom - free.top);

    // Altezza del libro (alto 3, largo 2) sullo schermo: circa metà larghezza in verticale,
    // quasi tutto lo spazio in orizzontale; mai più grande dello spazio libero
    const target = landscape ? Math.min(freeH * 0.82, freeW * 0.8 * 1.5) : Math.min(0.81 * vw, freeH * 0.85, freeW * 0.8 * 1.5);
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dist = (3 * vh) / (2 * tanHalf * target);
    const pxPerUnit = vh / (2 * dist * tanHalf);
    const offX = (free.left + free.right) / 2 - vw / 2;
    const offY = (free.top + free.bottom) / 2 - vh / 2;
    cameraFit = { z: 0.5 + dist, dx: -offX / pxPerUnit, dy: offY / pxPerUnit };
}
let isViewingBoard= false; // Stato della bacheca dei post-it

// --- 2. STILI CSS MODERNI E UI (Menu + Bottone Inferiore) ---
const styleStyle = document.createElement('style');
styleStyle.innerHTML = `
    /* Stili condivisi per l'effetto Glassmorphism */
    .glass-effect {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        color: #ffffff;
        font-family: 'Segoe UI', system-ui, sans-serif;
        transition: all 0.3s ease;
        outline: none;
    }

    /* Bottone moderno */
    .modern-btn {
        padding: 12px 30px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        border-radius: 50px;
        cursor: pointer;
        display: inline-block;
        text-align: center;
    }
    .modern-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-3px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
    .modern-btn:active {
        transform: translateY(0px);
    }

    /* Barra superiore e Input di ricerca */
    .top-bar {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
        align-items: center;
        z-index: 100;
        width: 90%;
        max-width: 700px;
    }
    .modern-input {
        padding: 12px 25px;
        font-size: 14px;
        border-radius: 50px;
        flex-grow: 1; /* Occupa tutto lo spazio rimanente */
    }
    .modern-input::placeholder { color: rgba(255, 255, 255, 0.6); }
    .modern-input:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    /* Nascondiamo l'input file originale brutto da vedere */
    #file-upload { display: none; }

    /* --- NUOVO: Stili per Icone e Responsività --- */
    .btn-icon { display: inline-block; margin-right: 6px; font-size: 15px; }
    .btn-text { display: inline-block; }

    /* --- Barra in alto: tutti i bottoni della stessa misura, su una riga --- */
    .top-bar .tb-btn {
        box-sizing: border-box;
        flex: 0 0 auto;
        width: 200px;
        height: 48px;
        padding: 0 14px !important;
        border-radius: 50px;
        line-height: 46px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .top-bar .tb-btn .btn-icon, .top-bar .tb-btn .btn-text { display: inline; }
    .top-bar .tb-btn .btn-icon { margin-right: 6px; }
    .top-bar .tb-btn:hover { transform: translateY(-2px); }
    .top-bar .modern-input { min-width: 160px; height: 48px; box-sizing: border-box; }

    /* Quando lo schermo scende sotto gli 850px di larghezza... */
    @media (max-width: 950px) {
        .btn-text { display: none !important; } /* Nascondi il testo */
        .btn-icon { margin-right: 0 !important; font-size: 18px; } /* Ingrandisci leggermente l'icona e centrala */
        
        .modern-btn { 
            padding: 12px 15px !important; /* Rendi i bottoni più "quadrati" */
            min-width: 48px;
            display: flex; 
            justify-content: center; 
            align-items: center;
        }
        
        .top-bar { width: 98%; gap: 8px; top: 15px; }
        .top-bar .tb-btn { width: 48px; padding: 0 !important; font-size: 18px; }
        .top-bar .tb-btn .btn-icon { margin-right: 0; }
        .modern-input { padding: 12px 15px; font-size: 13px; }
        
        /* Evita che nomi di categorie lunghissimi rompano la top bar */
        #category-label-id { 
            max-width: 120px; 
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
        }
    }
`;
document.head.appendChild(styleStyle);


// --- COSTRUZIONE MENU SUPERIORE ---
const topBar = document.createElement('div');
topBar.className = 'top-bar';
topBar.style.width = '95%'; 
topBar.style.maxWidth = '1100px'; 
document.body.appendChild(topBar);

// 1. Etichetta Categoria Attuale
const categoryLabel = document.createElement('div');
categoryLabel.className = 'glass-effect tb-btn';
categoryLabel.style.display = 'none';
topBar.appendChild(categoryLabel);


// 2. Bottone per Gestire la Mensola intera
const manageCatBtn = document.createElement('button');
manageCatBtn.innerHTML = t('manageShelf');
manageCatBtn.title = t('manageShelfTooltip');
manageCatBtn.className = 'glass-effect modern-btn tb-btn';
manageCatBtn.style.display = 'none';
topBar.appendChild(manageCatBtn);

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = t('searchPlaceholder');
searchInput.className = 'glass-effect modern-input';
topBar.appendChild(searchInput);

const uploadLabel = document.createElement('label');
uploadLabel.innerText = t('uploadBtn');
uploadLabel.className = 'glass-effect modern-btn tb-btn';
uploadLabel.htmlFor = 'file-upload';
topBar.appendChild(uploadLabel);

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'file-upload';
fileInput.accept = '.epub, .pdf';
fileInput.multiple = true;
topBar.appendChild(fileInput);

// --- BOTTONE SPEGNIMENTO SERVER ---
const shutdownBtn = document.createElement('button');
shutdownBtn.innerHTML = KS_ICON('power', 16) + ' ' + t('shutdownBtn');
shutdownBtn.id = 'shutdown-btn'; 
shutdownBtn.className = 'glass-effect modern-btn tb-btn';
shutdownBtn.title = t('shutdownTooltip');

// Colore rossastro/violaceo per distinguerlo dalla lingua, ma in stile Glassmorphism
shutdownBtn.style.background = 'rgba(217, 83, 79, 0.15)';
shutdownBtn.style.borderColor = 'rgba(217, 83, 79, 0.4)';
shutdownBtn.style.color = '#ff9999';

// Effetto hover
shutdownBtn.onmouseover = () => {
    shutdownBtn.style.background = 'rgba(217, 83, 79, 0.3)';
    shutdownBtn.style.borderColor = 'rgba(217, 83, 79, 0.6)';
    shutdownBtn.style.transform = 'translateY(-3px)';
    shutdownBtn.style.boxShadow = '0 8px 15px rgba(217, 83, 79, 0.2)';
};
shutdownBtn.onmouseout = () => {
    shutdownBtn.style.background = 'rgba(217, 83, 79, 0.15)';
    shutdownBtn.style.borderColor = 'rgba(217, 83, 79, 0.4)';
    shutdownBtn.style.transform = 'translateY(0px)';
    shutdownBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
};

shutdownBtn.onclick = async () => {
    const confermato = confirm(t('shutdownConfirm'));
    
    if (confermato) {
        try {
            await fetch('/api/shutdown', { method: 'POST' });
            
            // Schermata di arrivederci a tutto schermo
            document.body.innerHTML = `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #2c3e50; color: white; font-family: 'Segoe UI', system-ui, sans-serif; margin: 0;">
                    <h1 style="font-size: 2.5rem; margin-bottom: 15px; color: #d4af37;">${t('shutdownTitle')}</h1>
                    <p style="color: #a0aec0; font-size: 1.2rem;">${t('shutdownMessage')}</p>
                </div>
            `;
        } catch (error) {
            console.error("Errore durante lo spegnimento:", error);
        }
    }
};

// Aggiungiamo il bottone alla barra in alto, subito dopo la lingua
if (!window.__KORESHELF_DESKTOP__) topBar.appendChild(shutdownBtn);

// Telefono: due pulsanti rotondi accanto alla categoria (la ricerca si apre a tutta larghezza)
const searchToggle = document.createElement('button');
searchToggle.id = 'ks-search-toggle';
searchToggle.className = 'ks-round-btn';
searchToggle.innerHTML = KS_ICON('search', 18);
const addBtn = document.createElement('button');
addBtn.id = 'ks-add-btn';
addBtn.className = 'ks-round-btn';
addBtn.innerHTML = KS_ICON('plus', 18);
addBtn.addEventListener('click', () => fileInput.click());

// --- PULSANTE CAMBIO LINGUA ---
// --- PULSANTE CAMBIO LINGUA CON MENU A TENDINA ---
const savedLang = localStorage.getItem('KoreShelf_lang') || 'it';

// Dizionario delle lingue disponibili
const availableLangs = {
    it: { icon: KS_ICON('globe', 16), text: 'IT' },
    en: { icon: KS_ICON('globe', 16), text: 'EN' },
    es: { icon: KS_ICON('globe', 16), text: 'ES' },
    fr: { icon: KS_ICON('globe', 16), text: 'FR' },
    de: { icon: KS_ICON('globe', 16), text: 'DE' }
};

// 1. Contenitore relativo per posizionare il menu a tendina
const langContainer = document.createElement('div');
langContainer.style.position = 'relative';
langContainer.style.display = 'inline-block';

// 2. Bottone Principale
const langBtn = document.createElement('button');
const currentLangData = availableLangs[savedLang] || availableLangs['it'];
langBtn.innerHTML = `<span class="btn-icon">${currentLangData.icon}</span><span class="btn-text">${currentLangData.text}</span>`;
langBtn.className = 'glass-effect modern-btn tb-btn';
langBtn.title = 'Cambia lingua / Change language';

// 3. Il menu a tendina (nascosto di default)
const langMenu = document.createElement('div');
langMenu.className = 'glass-effect';
langMenu.style.position = 'absolute';
langMenu.style.top = 'calc(100% + 10px)'; // Spostato leggermente sotto il bottone
langMenu.style.right = '0'; // Allineato a destra per non uscire dallo schermo
langMenu.style.display = 'none';
langMenu.style.flexDirection = 'column';
langMenu.style.borderRadius = '12px';
langMenu.style.overflow = 'hidden';
langMenu.style.zIndex = '2000';
langMenu.style.minWidth = '120px';
langMenu.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';

// 4. Creiamo un'opzione per ogni lingua nel dizionario
Object.entries(availableLangs).forEach(([code, data]) => {
    const optionBtn = document.createElement('button');
    optionBtn.innerHTML = `<span style="margin-right: 8px;">${data.icon}</span>${data.text}`;
    optionBtn.style.padding = '12px 20px';
    optionBtn.style.background = 'transparent';
    optionBtn.style.border = 'none';
    optionBtn.style.color = 'white';
    optionBtn.style.textAlign = 'left';
    optionBtn.style.cursor = 'pointer';
    optionBtn.style.transition = 'background 0.2s';
    optionBtn.style.fontSize = '14px';
    optionBtn.style.width = '100%';
    optionBtn.style.display = 'flex';
    optionBtn.style.alignItems = 'center';
    
    // Evidenzia la lingua attualmente selezionata
    if (code === savedLang) {
        optionBtn.style.background = 'rgba(255, 255, 255, 0.15)';
        optionBtn.style.fontWeight = 'bold';
    }

    // Effetti hover glassmorphism
    optionBtn.onmouseover = () => {
        if (code !== savedLang) optionBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    };
    optionBtn.onmouseout = () => {
        if (code !== savedLang) optionBtn.style.background = 'transparent';
    };

    // Logica di cambio lingua
    optionBtn.dataset.lang = code;
    optionBtn.onclick = async () => {
        localStorage.setItem('KoreShelf_lang', code);
        try {
            await fetch('/api/sync-language', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lang: code })
            });
        } catch(e) {}
        window.location.reload();
    };

    langMenu.appendChild(optionBtn);
});

// Assembliamo il tutto
langContainer.appendChild(langBtn);
langContainer.appendChild(langMenu);
topBar.appendChild(langContainer);

// 5. Logica di apertura/chiusura
langBtn.onclick = (e) => {
    e.stopPropagation(); // Evita che il click venga intercettato subito da "window"
    langMenu.style.display = langMenu.style.display === 'none' ? 'flex' : 'none';
};

// Chiudi il menu se l'utente clicca in qualsiasi altro punto della pagina
window.addEventListener('click', () => {
    if (langMenu.style.display === 'flex') {
        langMenu.style.display = 'none';
    }
});

const KS_ICONS = {
    cover: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h3"/></svg>',
    shelves: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20h18"/><path d="M3 12h18"/><path d="M6 12V5"/><path d="M9 12V6"/><path d="M13 12l2-6"/><path d="M6 20v-5"/><path d="M10 20v-6"/><path d="M14 20v-4"/></svg>',
    read: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg>',
    resume: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg>',
};

const ksUiStyle = document.createElement('style');
ksUiStyle.textContent = `
    #empty-library-hint, #ks-book-panel, .ks-primary-btn, .ks-secondary-btn, #ks-more-menu .ks-menu-item {
        font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; }
    #empty-library-hint { position: fixed; left: 0; right: 0; top: 96px; bottom: 56px; z-index: 50; display: none;
        flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 0 24px;
        text-align: center; color: #fff; pointer-events: none; box-sizing: border-box; }
    #empty-library-hint > * { pointer-events: auto; }
    #empty-library-hint h1 { margin: 0; font-size: 34px; line-height: 1.15; font-weight: 700; }
    #empty-library-hint .ks-empty-sub { margin: 8px 0 0; font-size: 16px; line-height: 1.55; color: rgba(255,255,255,0.84); max-width: 640px; }
    .ks-dropzone { width: 100%; max-width: 940px; box-sizing: border-box; padding: 24px 26px 0; border-radius: 26px;
        border: 2px dashed rgba(212,175,55,0.75); background: rgba(212,175,55,0.06); cursor: pointer;
        transition: background .2s ease, border-color .2s ease; }
    .ks-dropzone:hover { background: rgba(212,175,55,0.11); border-color: rgba(212,175,55,0.95); }
    .ks-slots { display: flex; justify-content: center; align-items: flex-end; gap: 22px; flex-wrap: wrap; }
    .ks-slot-wrap { width: 150px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .ks-slot-caption { margin: 0; font-size: 13px; line-height: 1.4; color: rgba(255,255,255,0.88); min-height: 54px; display: flex; align-items: flex-end; }
    .ks-slot { width: 120px; height: 180px; border: 2px dashed rgba(255,255,255,0.38); border-radius: 6px;
        background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
    .ks-plank { height: 16px; margin: 0 -26px; background: #6e5238; border-top: 3px solid #9a7a58; }
    .ks-empty-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; padding: 22px 0 24px; cursor: default; }
    .ks-primary-btn { height: 52px; padding: 0 28px; border-radius: 50px; border: none; background: #fff; color: #1e2d3b;
        font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 10px;
        box-shadow: 0 8px 22px rgba(0,0,0,0.3); transition: transform .2s ease, box-shadow .2s ease; }
    .ks-primary-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(0,0,0,0.35); }
    .ks-secondary-btn { height: 52px; padding: 0 24px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.35);
        background: rgba(255,255,255,0.08); color: #fff; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; }
    .ks-secondary-btn:hover { background: rgba(255,255,255,0.16); }
    .ks-privacy { margin: 0; font-size: 13px; color: rgba(255,255,255,0.74); }

    #ks-book-panel { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    #ks-active-book { display: flex; flex-direction: column; align-items: center; gap: 6px; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.6); }
    #ks-active-book .ks-book-title { margin: 0; font-size: 17px; font-weight: 700; max-width: min(70vw, 720px);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #ks-active-book .ks-book-title span { font-weight: 500; color: #f3ebe1; }
    #ks-active-book .ks-progress { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; }
    #ks-active-book .ks-bar { width: 220px; height: 6px; border-radius: 6px; background: rgba(0,0,0,0.35); overflow: hidden; }
    #ks-active-book .ks-bar > div { height: 100%; background: #d4af37; }
    .ks-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center; }
    .ks-more { position: relative; }
    #ks-more-menu { position: absolute; bottom: 58px; left: 50%; transform: translateX(-50%); min-width: 230px; padding: 8px;
        box-sizing: border-box; border-radius: 18px; background: rgba(30,45,59,0.97); border: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 16px 36px rgba(0,0,0,0.45); display: none; flex-direction: column; gap: 2px; z-index: 20; }
    #ks-more-menu.open { display: flex; }
    #ks-more-menu .ks-menu-item { height: 44px; padding: 0 14px; border: none; border-radius: 12px; background: transparent;
        color: #fff; font-family: inherit; font-size: 14px; text-align: left; cursor: pointer; white-space: nowrap;
        text-transform: none; letter-spacing: 0; font-weight: 500; box-shadow: none; transform: none; }
    #ks-more-menu .ks-menu-item:hover { background: rgba(255,255,255,0.1); }
    #ks-more-menu .ks-menu-item.danger { color: #ffb3ae; }
    #ks-key-hints { display: flex; flex-wrap: wrap; gap: 18px; justify-content: center; font-size: 12px; font-weight: 600;
        color: rgba(255,255,255,0.85); text-shadow: 0 1px 3px rgba(0,0,0,0.6); }
    #ks-key-hints > span { display: flex; align-items: center; gap: 6px; }
    .ks-key { display: inline-flex; align-items: center; justify-content: center; min-width: 26px; height: 26px; padding: 0 6px;
        box-sizing: border-box; border-radius: 7px; border: 1px solid rgba(255,255,255,0.35); background: rgba(255,255,255,0.12);
        font-size: 12px; font-weight: 700; }
    @media (max-width: 950px) { #ks-key-hints { display: none; } }

    /* ===================== TELEFONO (design A: scaffale 3D a tutto schermo) ===================== */
    #ks-search-toggle, #ks-add-btn, #ks-position, #ks-mobile-actions, .ks-phone-only { display: none; }
    .ks-phone .top-bar { top: calc(10px + env(safe-area-inset-top, 0px)) !important; left: 12px !important; right: 12px !important;
        width: auto !important; max-width: none !important; transform: none !important; gap: 8px !important;
        flex-wrap: nowrap !important; justify-content: flex-start !important; }
    .ks-phone .top-bar > * { display: none !important; }
    .ks-phone .top-bar > div:first-child:not([style*="display: none"]) { display: flex !important; flex: 1 1 auto; min-width: 0; width: auto !important;
        height: 44px; align-items: center; gap: 6px; padding: 0 16px !important; font-size: 13px; }
    .ks-phone .top-bar #ks-search-toggle, .ks-phone .top-bar #ks-add-btn { display: flex !important; }
    .ks-phone .top-bar.ks-search-open > div:first-child, .ks-phone .top-bar.ks-search-open #ks-search-toggle { display: none !important; }
    .ks-phone .top-bar.ks-search-open > .modern-input { display: block !important; flex: 1 1 auto; min-width: 0; height: 44px; font-size: 16px; }
    .ks-round-btn { flex: 0 0 auto; width: 44px; height: 44px; border-radius: 50%; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; }
    #ks-search-toggle { border: 1px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.10); color: #fff; }
    #ks-add-btn { border: none; background: #fff; color: #1e2d3b; }

    .ks-phone #ks-arrow-left, .ks-phone #ks-arrow-right, .ks-phone #credits-footer, .ks-phone #donate-btn,
    .ks-phone #help-btn, .ks-phone #ks-key-hints { display: none !important; }

    .ks-phone #ks-book-panel { position: fixed; left: 0; right: 0; bottom: 0; width: 100%; box-sizing: border-box;
        padding: 12px 20px calc(22px + env(safe-area-inset-bottom, 0px)); gap: 12px !important; align-items: stretch !important;
        border-radius: 26px 26px 0 0; background: rgba(30,45,59,0.97); box-shadow: 0 -10px 30px rgba(0,0,0,0.3); }
    .ks-phone #ks-position { display: block; margin: 0; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.72); }
    .ks-phone #ks-active-book { align-items: stretch; text-shadow: none; }
    .ks-phone #ks-active-book .ks-book-title { font-size: 19px; max-width: none; white-space: normal; }
    .ks-phone #ks-active-book .ks-book-title span { display: block; font-size: 14px; color: rgba(255,255,255,0.78); margin-top: 4px; }
    .ks-phone #ks-active-book .ks-progress { width: 100%; }
    .ks-phone #ks-active-book .ks-bar { flex: 1; width: auto; }
    .ks-phone .ks-actions { flex-direction: column; align-items: stretch; gap: 10px; }
    .ks-phone #ks-read-btn { width: 100%; height: 54px; justify-content: center; font-size: 16px; }
    .ks-phone #ks-info-btn { display: none !important; }
    .ks-phone .ks-more { position: static; }
    .ks-phone #ks-mobile-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .ks-phone #ks-mobile-actions > button { height: 48px; padding: 0 6px !important; border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); color: #fff; font-family: inherit;
        font-size: 13px; font-weight: 600; letter-spacing: 0; text-transform: none; cursor: pointer; box-shadow: none; }
    .ks-phone #ks-more-menu { position: fixed; left: 0; right: 0; bottom: 0; top: auto; transform: none; min-width: 0;
        border-radius: 22px 22px 0 0; padding: 10px 12px calc(20px + env(safe-area-inset-bottom, 0px)); z-index: 60; }
    .ks-phone #ks-more-menu .ks-menu-item { height: 52px; font-size: 16px; }
    .ks-phone #ks-more-menu .ks-phone-only { display: block; }
    #ks-more-menu .ks-menu-sep { height: 1px; margin: 6px 4px; background: rgba(255,255,255,0.12); }
    #ks-lang-list { display: none; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 4px; }
    #ks-lang-list.open { display: grid; }
    #ks-lang-list button { height: 44px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06);
        color: #fff; font-family: inherit; font-weight: 700; cursor: pointer; }

    .ks-phone #empty-library-hint { top: calc(70px + env(safe-area-inset-top, 0px)); bottom: 0; gap: 14px; padding: 0 14px 14px; justify-content: flex-start; }
    .ks-phone #empty-library-hint h1 { font-size: 26px; }
    .ks-phone #empty-library-hint .ks-empty-sub { font-size: 14px; }
    .ks-phone .ks-dropzone { padding: 14px 10px 0; border-radius: 20px; }
    .ks-phone .ks-slots { gap: 8px; flex-wrap: nowrap; }
    .ks-phone .ks-slot-wrap { width: 74px; gap: 6px; }
    .ks-phone .ks-slot-caption { font-size: 10.5px; min-height: 44px; }
    .ks-phone .ks-slot { width: 62px; height: 92px; }
    .ks-phone .ks-slot svg { width: 22px; height: 22px; }
    .ks-phone .ks-plank { margin: 0 -10px; }
    .ks-phone .ks-empty-actions { flex-direction: column; padding: 16px 4px 16px; }
    .ks-phone .ks-empty-actions button { width: 100%; justify-content: center; }
    /* Telefono in orizzontale: pannello a destra, a tutta altezza; il libro sta a sinistra */
    .ks-phone.ks-landscape #ks-book-panel { left: auto; right: 0; top: calc(64px + env(safe-area-inset-top, 0px)); bottom: 0;
        width: min(46vw, 380px); border-radius: 22px 0 0 0; justify-content: flex-end; overflow-y: auto;
        padding: 12px 18px calc(14px + env(safe-area-inset-bottom, 0px)) 18px; }
    .ks-phone.ks-landscape #empty-library-hint { overflow-y: auto; }
    .ks-phone.ks-landscape .ks-empty-actions { flex-direction: row; }
    .ks-phone .ks-tray { left: 12px; right: 12px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); max-width: none; }
`;
document.head.appendChild(ksUiStyle);

// --- LIBRERIA VUOTA (design B): lo scaffale che si spiega da solo ---
const emptyLibraryHint = document.createElement('div');
emptyLibraryHint.id = 'empty-library-hint';

function renderEmptyHint() {
    const slots = [['cover', 'slotCover'], ['shelves', 'slotShelves'], ['read', 'slotRead'], ['resume', 'slotResume']]
        .map(([icon, key]) => `<div class="ks-slot-wrap"><p class="ks-slot-caption">${t(key)}</p><div class="ks-slot">${KS_ICONS[icon]}</div></div>`)
        .join('');
    emptyLibraryHint.innerHTML = `
        <div><h1>${t('emptyTitle')}</h1><p class="ks-empty-sub">${t('emptySubtitle')}</p></div>
        <div class="ks-dropzone" id="ks-dropzone">
            <div class="ks-slots">${slots}</div>
            <div class="ks-plank"></div>
            <div class="ks-empty-actions">
                <button class="ks-primary-btn" id="ks-choose-files">${t('chooseFiles')}</button>
                <button class="ks-secondary-btn" id="ks-sample-book">${t('sampleBook')}</button>
            </div>
        </div>
        <p class="ks-privacy">${t('privacyNote')}</p>`;
    emptyLibraryHint.querySelector('#ks-choose-files').addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
    emptyLibraryHint.querySelector('#ks-sample-book').addEventListener('click', (e) => { e.stopPropagation(); addSampleBook(); });
    emptyLibraryHint.querySelector('#ks-dropzone').addEventListener('click', () => fileInput.click());
}
renderEmptyHint();
document.body.appendChild(emptyLibraryHint);

// "Prova con un libro di esempio": un piccolo libro (testo originale, licenza MIT) che insegna l'app
async function addSampleBook() {
    const lang = localStorage.getItem('KoreShelf_lang') === 'it' ? 'it' : 'en';
    try {
        const blob = await (await fetch(`/sample/koreshelf-${lang}.epub`)).blob();
        const name = lang === 'it' ? 'Benvenuto in KoreShelf.epub' : 'Welcome to KoreShelf.epub';
        await uploadFiles([new File([blob], name, { type: 'application/epub+zip' })], { offline: true });
    } catch (e) {
        console.error('Libro di esempio non disponibile:', e);
    }
}

// Il server costruisce il link sul negozio Amazon della lingua scelta (it, com, de, fr, es)
async function openAmazonSearch(query) {
    if (!query) return;
    try {
        const res = await fetch(`/api/store/amazon-link?title=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) window.open(data.url, '_blank');
    } catch (e) {
        console.error('Errore ricerca Amazon:', e);
    }
}



// --- BOTTONE DONAZIONE PAYPAL ---
const donateBtn = document.createElement('a');
donateBtn.id = 'donate-btn';

donateBtn.href = 'https://paypal.me/GabrieleTrovato1?locale.x=en_US&country.x=IT'; 
donateBtn.target = '_blank'; 
donateBtn.className = 'glass-effect modern-btn';
donateBtn.style.textDecoration = 'none';


donateBtn.style.position = 'relative'; 
donateBtn.style.zIndex = '1000';
donateBtn.style.padding = '12px 15px';
donateBtn.style.fontWeight = 'bold';
donateBtn.style.whiteSpace = 'nowrap'; 
donateBtn.style.background = 'rgba(0, 112, 186, 0.15)'; 
donateBtn.style.borderColor = 'rgba(0, 112, 186, 0.4)';
donateBtn.style.color = '#66b3ff';

// Gestiamo solo il cambio di colore su hover
donateBtn.onmouseover = () => {
    donateBtn.style.background = 'rgba(0, 112, 186, 0.3)';
    donateBtn.style.borderColor = 'rgba(0, 112, 186, 0.6)';
};
donateBtn.onmouseout = () => {
    donateBtn.style.background = 'rgba(0, 112, 186, 0.15)';
    donateBtn.style.borderColor = 'rgba(0, 112, 186, 0.4)';
};

// Aggiungiamo il bottone al BODY invece che alla topBar
document.body.appendChild(donateBtn);

// --- GESTIONE BOTTONE HELP ---
const helpBtn = document.getElementById('help-btn');
if (helpBtn) {
    // Reset totale (Uccidiamo qualsiasi vecchia regola ereditata dal CSS)
    helpBtn.style.position = 'static'; 
    helpBtn.style.margin = '0';
    helpBtn.style.transform = 'none'; // <-- È questo che lo spostava in alto!
    helpBtn.style.top = 'auto';
    helpBtn.style.bottom = 'auto';
    helpBtn.style.left = 'auto';
    helpBtn.style.right = 'auto';
    
    helpBtn.onclick = () => {
        openHelpModal(); // Richiama la funzione dal file help-modal.js
    };
}


// --- COSTRUZIONE MENU INFERIORE (FLEXBOX MACRO-CONTENITORE) ---
const uiContainer = document.createElement('div');
uiContainer.style.position = 'absolute';
uiContainer.style.bottom = '42px';   // spazio per il footer della licenza
uiContainer.style.left = '0';
uiContainer.style.width = '100%'; // Occupa tutta la larghezza dello schermo
uiContainer.style.display = 'flex'; 
uiContainer.style.justifyContent = 'space-between'; // Spinge i gruppi a Sinistra, Centro e Destra
uiContainer.style.alignItems = 'center';
uiContainer.style.padding = '0 30px'; // Distanza dai bordi dello schermo
uiContainer.style.boxSizing = 'border-box';
uiContainer.style.pointerEvents = 'none'; // Importante: non blocca i click sul 3D negli spazi vuoti!
document.body.appendChild(uiContainer);

// 1. Gruppo Sinistro (Donazione)
const leftUiGroup = document.createElement('div');
leftUiGroup.style.display = 'flex';
leftUiGroup.style.pointerEvents = 'auto'; // Riabilita i click per questo blocco
uiContainer.appendChild(leftUiGroup);
leftUiGroup.appendChild(donateBtn);

// 2. Gruppo Centrale (Azioni Libro)
const centerUiGroup = document.createElement('div');
centerUiGroup.style.display = 'flex';
centerUiGroup.style.gap = '15px';
centerUiGroup.style.alignItems = 'center';
centerUiGroup.style.pointerEvents = 'auto'; // Riabilita i click per questo blocco
uiContainer.appendChild(centerUiGroup);

// 3. Gruppo Destro (Help)
const rightUiGroup = document.createElement('div');
rightUiGroup.style.display = 'flex';
rightUiGroup.style.pointerEvents = 'auto'; // Riabilita i click per questo blocco
uiContainer.appendChild(rightUiGroup);
if (helpBtn) rightUiGroup.appendChild(helpBtn);

// Ricerca a tutta larghezza sul telefono
searchToggle.addEventListener('click', () => {
    document.querySelector('.top-bar').classList.add('ks-search-open');
    searchInput.focus();
});
searchInput.addEventListener('blur', () => {
    setTimeout(() => { if (!searchInput.value.trim()) document.querySelector('.top-bar').classList.remove('ks-search-open'); }, 150);
});
document.querySelector('.top-bar').append(searchToggle, addBtn);

// --- PANNELLO DEL LIBRO ATTIVO (design C): un'azione principale chiara ---
centerUiGroup.id = 'ks-book-panel';
centerUiGroup.style.flexDirection = 'column';
centerUiGroup.style.gap = '12px';

const keyHints = document.createElement('div');
keyHints.id = 'ks-key-hints';
centerUiGroup.appendChild(keyHints);

const positionInfo = document.createElement('p');
positionInfo.id = 'ks-position';
centerUiGroup.appendChild(positionInfo);

const activeBookInfo = document.createElement('div');
activeBookInfo.id = 'ks-active-book';
activeBookInfo.innerHTML = '<p class="ks-book-title"></p><div class="ks-progress"><div class="ks-bar"><div></div></div><span class="ks-pct"></span></div>';
centerUiGroup.appendChild(activeBookInfo);

const actionsRow = document.createElement('div');
actionsRow.className = 'ks-actions';
centerUiGroup.appendChild(actionsRow);

const readBtn = document.createElement('button');
readBtn.id = 'ks-read-btn';
readBtn.className = 'ks-primary-btn';
readBtn.addEventListener('click', () => openActiveBook());
actionsRow.appendChild(readBtn);

const infoBtn = document.createElement('button');
infoBtn.id = 'ks-info-btn';
infoBtn.innerText = t('showSynopsis');
infoBtn.className = 'glass-effect modern-btn';
actionsRow.appendChild(infoBtn);

// Menu "Altro": le azioni che servono di rado
const moreWrap = document.createElement('div');
moreWrap.className = 'ks-more';
const moreBtn = document.createElement('button');
moreBtn.id = 'ks-more-btn';
moreBtn.className = 'glass-effect modern-btn';
moreBtn.setAttribute('aria-haspopup', 'menu');
const moreMenu = document.createElement('div');
moreMenu.id = 'ks-more-menu';
moreMenu.setAttribute('role', 'menu');
moreWrap.append(moreBtn, moreMenu);
actionsRow.appendChild(moreWrap);

const assignCatBtn = document.createElement('button');
assignCatBtn.className = 'ks-menu-item';
assignCatBtn.dataset.action = 'assign';
const editMetadataBtn = document.createElement('button');
editMetadataBtn.className = 'ks-menu-item';
editMetadataBtn.dataset.action = 'edit';
const deleteBookBtn = document.createElement('button');
deleteBookBtn.className = 'ks-menu-item danger';
deleteBookBtn.dataset.action = 'delete';
[assignCatBtn, editMetadataBtn, deleteBookBtn].forEach(b => { b.setAttribute('role', 'menuitem'); moreMenu.appendChild(b); });

// Telefono: nel menu anche "Gestisci scaffali" e "Lingua" (la barra in alto ha solo 3 comandi)
const menuSep = document.createElement('div');
menuSep.className = 'ks-menu-sep ks-phone-only';
const manageItem = document.createElement('button');
manageItem.className = 'ks-menu-item ks-phone-only';
manageItem.addEventListener('click', () => manageCatBtn.click());
const langItem = document.createElement('button');
langItem.className = 'ks-menu-item ks-phone-only';
const langList = document.createElement('div');
langList.id = 'ks-lang-list';
langItem.addEventListener('click', (e) => { e.stopPropagation(); langList.classList.toggle('open'); });
['it', 'en', 'es', 'fr', 'de'].forEach(code => {
    const b = document.createElement('button');
    b.textContent = code.toUpperCase();
    b.addEventListener('click', () => document.querySelector(`[data-lang="${code}"]`)?.click());
    langList.appendChild(b);
});
moreMenu.append(menuSep, manageItem, langItem, langList);

// Telefono: riga Trama / Categoria / Altro sotto "Riprendi a leggere"
const mobileActions = document.createElement('div');
mobileActions.id = 'ks-mobile-actions';
const mobilePlot = document.createElement('button');
mobilePlot.addEventListener('click', () => infoBtn.click());
const mobileCategory = document.createElement('button');
mobileCategory.id = 'ks-mobile-category';
mobileCategory.addEventListener('click', () => assignCatBtn.click());
mobileActions.append(mobilePlot, mobileCategory);
actionsRow.appendChild(mobileActions);

// Su telefono "Altro" si sposta nella riga; il suo menu si apre dal basso
function placeMoreButton() {
    if (isPhone()) { if (moreBtn.parentElement !== mobileActions) mobileActions.appendChild(moreBtn); }
    else if (moreBtn.parentElement !== moreWrap) moreWrap.insertBefore(moreBtn, moreMenu);
}

const setMoreMenu = (open) => {
    moreMenu.classList.toggle('open', open);
    moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
};
moreBtn.addEventListener('click', (e) => { e.stopPropagation(); setMoreMenu(!moreMenu.classList.contains('open')); });
moreMenu.addEventListener('click', () => setTimeout(() => setMoreMenu(false), 0));
document.addEventListener('click', (e) => { if (!moreWrap.contains(e.target)) setMoreMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && moreMenu.classList.contains('open')) setMoreMenu(false); });

function updateActiveBookPanel() {
    // Testi (cambiano con la lingua)
    moreBtn.textContent = isPhone() ? (t('moreActions') || 'Altro') : (t('moreActions') || 'Altro') + ' ▾';
    mobilePlot.textContent = isShowingBack ? (t('hideSynopsisShort') || 'Copertina') : (t('synopsisShort') || 'Trama');
    mobileCategory.textContent = t('categoryShort') || 'Categoria';
    manageItem.textContent = t('manageShelves') || 'Gestisci scaffali';
    langItem.textContent = (t('languageMenu') || 'Lingua') + ' · ' + (localStorage.getItem('KoreShelf_lang') || 'it').toUpperCase();
    searchToggle.setAttribute('aria-label', t('searchBtn') || 'Cerca');
    addBtn.setAttribute('aria-label', t('addBooks') || 'Aggiungi libri');
    assignCatBtn.innerHTML = t('assignCategory');
    editMetadataBtn.innerHTML = t('editMetadata');
    if (!deleteBookBtn.disabled) deleteBookBtn.innerHTML = t('deleteBook');
    keyHints.innerHTML = `
        <span><span class="ks-key">←</span><span class="ks-key">→</span> ${t('keyBrowse')}</span>
        <span><span class="ks-key">↑</span><span class="ks-key">↓</span> ${t('keyShelf')}</span>
        <span>${t('keyDrop')}</span>`;

    const book = booksArray[currentIndex];
    if (!book) return;
    const d = book.userData;
    const shelf = booksArray.filter(b => b.userData.category === d.category);
    positionInfo.textContent = (t('positionOf') || '{n} di {m}').replace('{n}', shelf.indexOf(book) + 1).replace('{m}', shelf.length)
        + (shelf.length > 1 ? ' · ' + (t('swipeToBrowse') || 'scorri per sfogliare') : '');
    const title = activeBookInfo.querySelector('.ks-book-title');
    title.textContent = d.title || '';
    if (d.author) {
        const author = document.createElement('span');
        author.textContent = isPhone() ? d.author : ` · ${d.author}`;   // sul telefono va a capo
        title.appendChild(author);
    }
    const pct = Math.round(Math.max(0, Math.min(1, Number(d.progress) || 0)) * 100);
    activeBookInfo.querySelector('.ks-progress').style.display = pct > 0 ? 'flex' : 'none';
    activeBookInfo.querySelector('.ks-bar > div').style.width = `${pct}%`;
    activeBookInfo.querySelector('.ks-pct').textContent = (t('percentRead') || '{n}%').replace('{n}', pct);
    readBtn.innerHTML = `${KS_ICONS.book}<span>${pct > 0 && pct < 100 ? t('continueReading') : t('startReading')}</span>`;
}


editMetadataBtn.onclick = () => {
    if (booksArray.length === 0) return;
    const activeBook = booksArray[currentIndex];
    
    openMetadataManager(activeBook.userData, (updatedData) => {
        console.log("Metadati salvati! Aggiornamento 3D in corso...", updatedData);
        
        // 1. Gestione Categoria: Se è cambiata, la struttura delle mensole cambia. 
        // L'approccio più sicuro e pulito è ricaricare la pagina.
        const oldCategory = activeBook.userData.category;
        const newCategory = (updatedData.tags && updatedData.tags.length > 0) ? updatedData.tags[0] : t('uncategorized');
        
        if (oldCategory !== newCategory) {
            reloadLibrary();
            return;
        }

        // 2. Aggiorniamo i dati base nell'oggetto 3D
        activeBook.userData = { ...activeBook.userData, ...updatedData };

        // 3. HOT-SWAP DEL DORSO (Ridisegnamo titolo e autore sul lato)
        const newSpineTex = createSpineTexture(updatedData.title, updatedData.author);
        activeBook.material[1].map = newSpineTex;
        activeBook.material[1].needsUpdate = true;

        // 4. HOT-SWAP DELLA COPERTINA FRONTALE
        if (updatedData.coverPath) {
            // Se c'è un'immagine reale, la scarichiamo e la applichiamo subito
            textureLoader.load(`/${updatedData.coverPath}`, (tex) => {
                tex.generateMipmaps = false;
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                activeBook.material[4].map = tex;
                activeBook.material[4].color.setHex(0xffffff); // Togliamo eventuali scurimenti del placeholder
                activeBook.material[4].needsUpdate = true;
            });
        } else {
            // Se non c'è, generiamo il fallback testuale con i nuovi dati
            const placeholderTex = createFrontPlaceholderTexture(updatedData.title, updatedData.author);
            activeBook.material[4].map = placeholderTex;
            activeBook.material[4].needsUpdate = true;
        }

        // 5. HOT-SWAP DEL RETRO (Ridisegnamo la nuova trama e i tag dietro)
        const backMesh = activeBook.children.find(child => child.name === "backCover_mesh");
        if (backMesh) {
            backMesh.userData = { ...backMesh.userData, ...updatedData }; // Aggiorna anche per il click della trama
            const newBackTex = createBackCoverTexture(updatedData.description, updatedData.tags, updatedData.rating);
            backMesh.material.map = newBackTex;
            backMesh.material.needsUpdate = true;
        }
    });
};

// --- CREAZIONE CREDITI INFERIORI ---
// Testo del footer: licenza MIT (con link al testo) e autore
function creditsHtml() {
    const mit = '<a href="https://github.com/GabrieleTrovato01/KoreShelf/blob/main/LICENSE" target="_blank">MIT</a>';
    return `${t('credits').replace('{mit}', mit)} <a href="https://github.com/GabrieleTrovato01" target="_blank">GabrieleTrovato01</a>`;
}
const creditsFooter = document.createElement('div');
creditsFooter.id = 'credits-footer';
creditsFooter.innerHTML = creditsHtml();
document.body.appendChild(creditsFooter);

// --- LOGICA DEL BOTTONE ASSEGNA CATEGORIA (Modale Custom con Chips) ---
assignCatBtn.onclick = () => {
    if (booksArray.length === 0) return;
    const activeBook = booksArray[currentIndex];
    
    // 1. Estraiamo tutte le categorie UNICHE attualmente esistenti
    const existingCategories = [...new Set(booksArray.map(b => b.userData.category))]
                                .filter(cat => cat !== t('uncategorized')); 

    // 2. Creiamo l'Overlay (Sfondo scuro)
    const overlay = document.createElement('div');
    overlay.id = 'assign-category-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0'; overlay.style.left = '0';
    overlay.style.width = '100vw'; overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
    overlay.style.zIndex = '2000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backdropFilter = 'blur(5px)'; // Sfocatura dello sfondo 3D
    document.body.appendChild(overlay);

    // 3. Creiamo la Finestra Modale
    const modal = document.createElement('div');
    modal.className = 'glass-effect';
    modal.style.padding = '30px';
    modal.style.borderRadius = '20px';
    modal.style.width = '90%';
    modal.style.maxWidth = '400px';
    modal.style.textAlign = 'center';
    overlay.appendChild(modal);

    // Titolo
    const title = document.createElement('h3');
    title.innerText = `${t('moveBookTitle')} "${activeBook.userData.title}"`;
    title.style.margin = '0 0 15px 0';
    modal.appendChild(title);

    // Input per creare una NUOVA categoria
    const inputWrapper = document.createElement('div');
    inputWrapper.style.display = 'flex';
    inputWrapper.style.gap = '10px';
    inputWrapper.style.marginBottom = '20px';
    
    const catInput = document.createElement('input');
    catInput.type = 'text';
    catInput.placeholder = t('categoryPrompt');
    catInput.className = 'glass-effect modern-input';
    catInput.style.flexGrow = '1';
    
    const saveBtn = document.createElement('button');
    saveBtn.innerText = t('saveBtn');
    saveBtn.className = 'glass-effect modern-btn';
    saveBtn.style.padding = '10px 20px';
    
    inputWrapper.appendChild(catInput);
    inputWrapper.appendChild(saveBtn);
    modal.appendChild(inputWrapper);

    // Sezione delle categorie ESISTENTI (I bottoncini veloci)
    if (existingCategories.length > 0) {
        const subtitle = document.createElement('div');
        subtitle.innerText = t('existingCategoriesSubtitle');
        subtitle.style.fontSize = '12px';
        subtitle.style.opacity = '0.7';
        subtitle.style.marginBottom = '10px';
        modal.appendChild(subtitle);

        const chipsContainer = document.createElement('div');
        chipsContainer.style.display = 'flex';
        chipsContainer.style.flexWrap = 'wrap';
        chipsContainer.style.gap = '8px';
        chipsContainer.style.justifyContent = 'center';

        existingCategories.forEach(cat => {
            const chip = document.createElement('button');
            chip.innerText = cat;
            chip.className = 'glass-effect';
            chip.style.padding = '8px 15px';
            chip.style.borderRadius = '50px';
            chip.style.fontSize = '12px';
            chip.style.cursor = 'pointer';
            
            // Effetto hover per i bottoncini
            chip.onmouseover = () => chip.style.background = 'rgba(255,255,255,0.2)';
            chip.onmouseout = () => chip.style.background = 'rgba(255,255,255,0.08)';

            // Cliccando il bottoncino veloce, inviamo subito al server
            chip.onclick = () => submitCategory(cat);
            
            chipsContainer.appendChild(chip);
        });
        modal.appendChild(chipsContainer);
    }

    // Bottone Annulla
    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = t('cancelBtn');
    cancelBtn.className = 'glass-effect modern-btn'; 
    cancelBtn.style.marginTop = '20px';
    cancelBtn.style.padding = '8px 20px';
    cancelBtn.style.fontSize = '11px'; // Leggermente più piccolo del tasto Salva
    cancelBtn.style.background = 'rgba(255, 50, 50, 0.1)'; // Sfondo rossastro semi-trasparente
    cancelBtn.style.borderColor = 'rgba(255, 100, 100, 0.3)'; // Bordo rossastro
    cancelBtn.style.color = '#ffb3b3'; // Testo rosa/rosso chiaro
    cancelBtn.onclick = () => overlay.remove();
    
    // Effetto hover personalizzato per l'annullamento
    cancelBtn.onmouseover = () => {
        cancelBtn.style.background = 'rgba(255, 50, 50, 0.2)';
        cancelBtn.style.transform = 'translateY(-2px)';
    };
    cancelBtn.onmouseout = () => {
        cancelBtn.style.background = 'rgba(255, 50, 50, 0.1)';
        cancelBtn.style.transform = 'translateY(0px)';
    };

    modal.appendChild(cancelBtn);

    // --- FUNZIONE DI INVIO AL SERVER ---
    const submitCategory = async (newTag) => {
        if (!newTag || newTag.trim() === '') return;
        
        saveBtn.innerText = '…';
        saveBtn.disabled = true;

        try {
            const response = await fetch(`/api/books/${activeBook.userData.id}/tags`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: newTag.trim() })
            });
            const result = await response.json();
            if (result.success) {
                location.reload(); // Ricarica per spostare il libro fisicamente sulla nuova mensola
            } else {
                alert(result.message);
                saveBtn.innerText = 'Salva';
                saveBtn.disabled = false;
            }
        } catch (e) { 
            console.error(e); 
            overlay.remove();
        }
    };

    // Colleghiamo l'invio all'input testuale (Click su Salva o tasto Invio)
    saveBtn.onclick = () => submitCategory(catInput.value);
    catInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitCategory(catInput.value);
    });

    // Chiudi cliccando fuori dal modale
    overlay.addEventListener('pointerdown', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    // Focus automatico sull'input
    setTimeout(() => catInput.focus(), 100);
};

// --- LOGICA DEL BOTTONE ELIMINA LIBRO ---
// Libro su cui spostarsi dopo un'eliminazione: il vicino sulla stessa mensola, se c'è.
function neighbourBookId(mesh) {
    const shelf = booksArray.filter(b => b.userData.category === mesh.userData.category);
    const pos = shelf.indexOf(mesh);
    const near = shelf[pos + 1] || shelf[pos - 1];
    if (near) return near.userData.id;
    return booksArray.find(b => b !== mesh)?.userData.id ?? null;
}

const restoreDeleteBtn = () => {
    deleteBookBtn.innerHTML = t('deleteBook');
    deleteBookBtn.disabled = false;
};

deleteBookBtn.onclick = async () => {
    if (booksArray.length === 0 || deleteBookBtn.disabled) return;
    const activeBook = booksArray[currentIndex];
    const title = activeBook.userData.title;

    // Conferma nello stile dell'app (niente popup di sistema)
    const confirmed = await confirmDialog({
        icon: KS_ICON('trash', 36),
        title,
        message: t('deleteConfirm').replace('{title}', title),
        confirmText: (t('deleteBook') || 'Elimina').trim(),
        cancelText: t('cancelBtn') || 'Annulla',
        danger: true,
    });
    if (!confirmed) return;

    deleteBookBtn.disabled = true;
    try {
        const response = await fetch(`/api/books/${activeBook.userData.id}`, { method: 'DELETE' });
        const result = await response.json();
        if (!result.success) {
            await confirmDialog({ icon: KS_ICON('alert', 36), title, message: result.message || t('serverError'), confirmText: 'OK', cancelText: t('cancelBtn') });
            restoreDeleteBtn();
            return;
        }
    } catch (e) {
        console.error(e);
        await confirmDialog({ icon: KS_ICON('alert', 36), title, message: t('serverError'), confirmText: 'OK', cancelText: t('cancelBtn') });
        restoreDeleteBtn();
        return;
    }

    // Il libro si sgretola e il vento lo porta via. Finché l'animazione non è finita
    // nulla si muove: la vista resta su questa mensola e i libri accanto restano al loro posto.
    // Solo dopo, il vicino scivola dove c'era il libro cancellato (o si passa a un'altra mensola).
    const nextId = neighbourBookId(activeBook);
    const rect = projectBookFront(activeBook);
    await dissolveBook(rect, {
        capture: () => { renderer.render(scene, camera); return renderer.domElement; },
        onCaptured: () => { activeBook.visible = false; },
    });
    await reloadLibrary({ focusBookId: nextId });
    restoreDeleteBtn();
};

// --- LOGICA DEL BOTTONE GESTISCI CATEGORIA (Intera Mensola) ---
manageCatBtn.onclick = () => {
    if (booksArray.length === 0) return;
    const activeCategory = booksArray[currentIndex].userData.category;
    
    // Gestisci: schede Scaffali e Libri; a ogni modifica la libreria 3D si aggiorna senza ricaricare
    openLibraryManager({ onChanged: (focusBookId) => reloadLibrary(focusBookId ? { focusBookId } : {}) });
};

// --- COSTRUZIONE FRECCE LATERALI ---
const leftArrow = document.createElement('button');
leftArrow.innerHTML = KS_ICON('chevronLeft', 26);
leftArrow.id = 'ks-arrow-left';
leftArrow.className = 'glass-effect modern-btn';
leftArrow.style.position = 'absolute';
leftArrow.style.left = '20px';
leftArrow.style.top = '50%';
leftArrow.style.transform = 'translateY(-50%)';
leftArrow.style.fontSize = '24px';
leftArrow.style.padding = '15px 20px';
leftArrow.style.borderRadius = '50%';
document.body.appendChild(leftArrow);

const rightArrow = document.createElement('button');
rightArrow.innerHTML = KS_ICON('chevronRight', 26);
rightArrow.id = 'ks-arrow-right';
rightArrow.className = 'glass-effect modern-btn';
rightArrow.style.position = 'absolute';
rightArrow.style.right = '20px';
rightArrow.style.top = '50%';
rightArrow.style.transform = 'translateY(-50%)';
rightArrow.style.fontSize = '24px';
rightArrow.style.padding = '15px 20px';
rightArrow.style.borderRadius = '50%';
document.body.appendChild(rightArrow);

// Funzione unificata per scorrere i libri
function changeBook(direction) {
    if (booksArray.length === 0) return;
    if (isViewingBoard) {
        if (direction === 1) { // Freccia destra
            window.highlightsBoardModule?.nextHighlightsPage();
        } else if (direction === -1) { // Freccia sinistra
            window.highlightsBoardModule?.prevHighlightsPage();
        }
        return; // Interrompiamo la funzione per non far scorrere anche i libri di sotto
    }
    const newIndex = currentIndex + direction;

    // Controlliamo di non andare oltre i limiti della libreria
    if (newIndex >= 0 && newIndex < booksArray.length) {
        currentIndex = newIndex;
        isShowingBack = false;
        infoBtn.innerText = t('showSynopsis');
        updateCarousel();
    }
}

function changeShelf(direction) {
    if (booksArray.length === 0) return;
    const currentCategory = booksArray[currentIndex].userData.category;
    let targetIndex = -1;

    if (direction === 1) { 
        if (isViewingBoard) return; // Siamo già in cima sulla bacheca

        // VAI ALLA MENSOLA SOPRA
        for (let i = currentIndex; i < booksArray.length; i++) {
            if (booksArray[i].userData.category !== currentCategory) {
                targetIndex = i;
                break;
            }
        }

        // Se non ci sono altre mensole sopra, andiamo alla bacheca!
        if (targetIndex === -1) {
            const hasHighlights = booksArray.some(b => b.userData.highlights && b.userData.highlights.length > 0);
            if (hasHighlights) {
                isViewingBoard = true;
                targetCameraY = booksArray[booksArray.length - 1].userData.baseShelfY + 4.5;
                
                // Aggiorniamo l'interfaccia 2D
                manageCatBtn.style.display = 'none'; 
                uiContainer.style.opacity = '0'; 
                
                // LASCIAMO LE FRECCE VISIBILI PER GIRARE LE PAGINE!
                leftArrow.style.opacity = '1';   
                rightArrow.style.opacity = '1';

                // Applica il titolo "(1/x)" iniziale
                if (window.highlightsBoardModule) window.highlightsBoardModule.updateBoardTitle();
                
                return;
            }
        }
    } else { 
        if (isViewingBoard) {
            // SCENDIAMO DALLA BACHECA ALLA MENSOLA PIU' ALTA
            isViewingBoard = false;
            uiContainer.style.opacity = '1';
            leftArrow.style.opacity = '1';
            rightArrow.style.opacity = '1';
            manageCatBtn.style.display = 'block';
            updateCarousel(); // Ripristina i dati del libro
            return;
        }

        // VAI ALLA MENSOLA SOTTO
        let firstOfCurrent = currentIndex;
        while (firstOfCurrent > 0 && booksArray[firstOfCurrent - 1].userData.category === currentCategory) {
            firstOfCurrent--;
        }
        if (firstOfCurrent > 0) {
            const prevCategory = booksArray[firstOfCurrent - 1].userData.category;
            let firstOfPrev = firstOfCurrent - 1;
            while (firstOfPrev > 0 && booksArray[firstOfPrev - 1].userData.category === prevCategory) {
                firstOfPrev--;
            }
            targetIndex = firstOfPrev;
        }
    }

    if (targetIndex !== -1) {
        currentIndex = targetIndex;
        isShowingBack = false;
        infoBtn.innerText = t('showSynopsis');
        updateCarousel();
    }
}

// Eventi click sulle frecce
leftArrow.onclick = () => changeBook(-1);
rightArrow.onclick = () => changeBook(1);

// --- EVENTI UI ---
infoBtn.onclick = () => {
    isShowingBack = !isShowingBack;
    infoBtn.innerHTML = isShowingBack 
        ? '<span class="btn-icon">' + KS_ICON('book', 16) + '</span><span class="btn-text">' + (t('showCover') || 'Copertina') + '</span>' 
        : '<span class="btn-icon">' + KS_ICON('eye', 16) + '</span><span class="btn-text">' + t('showSynopsis') + '</span>';
    updateCarousel();
};
// --- SUGGERIMENTO AMAZON QUANDO LA RICERCA LOCALE NON TROVA NULLA ---
const amazonSuggest = document.createElement('div');
amazonSuggest.className = 'glass-effect';
Object.assign(amazonSuggest.style, {
    position: 'fixed', display: 'none', zIndex: '1100', padding: '10px 14px',
    borderRadius: '14px', fontSize: '14px', lineHeight: '1.4', cursor: 'pointer',
    maxWidth: '320px', boxSizing: 'border-box'
});
document.body.appendChild(amazonSuggest);

// Evita che il click sul suggerimento tolga il focus alla barra prima del tempo
amazonSuggest.addEventListener('mousedown', (e) => e.preventDefault());

let amazonSuggestQuery = '';

function showAmazonSuggest(query) {
    amazonSuggestQuery = query;
    const r = searchInput.getBoundingClientRect();
    amazonSuggest.style.top = `${r.bottom + 8}px`;
    amazonSuggest.style.left = `${r.left}px`;
    amazonSuggest.style.minWidth = `${r.width}px`;

    amazonSuggest.innerHTML = '';
    const note = document.createElement('div');
    note.style.opacity = '0.7';
    note.textContent = t('searchNoResults');
    const link = document.createElement('div');
    link.style.fontWeight = 'bold';
    link.innerHTML = KS_ICON('search', 15) + ' ';
    link.append(t('amazonSuggestion').replace('{q}', query));
    amazonSuggest.append(note, link);

    amazonSuggest.style.display = 'block';
}

function hideAmazonSuggest() {
    amazonSuggest.style.display = 'none';
    amazonSuggestQuery = '';
}

amazonSuggest.addEventListener('click', () => {
    openAmazonSearch(amazonSuggestQuery);
    hideAmazonSuggest();
});

searchInput.addEventListener('blur', hideAmazonSuggest);
window.addEventListener('resize', hideAmazonSuggest);

// Invio: se c'è il suggerimento attivo, apre Amazon
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && amazonSuggestQuery) {
        openAmazonSearch(amazonSuggestQuery);
        hideAmazonSuggest();
    } else if (e.key === 'Escape') {
        hideAmazonSuggest();
    }
});

// --- LOGICA DI RICERCA (Connessa al Database e Debounce) ---
let searchTimeout = null;

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // 1. Annulliamo la ricerca precedente se l'utente sta ancora digitando
    if (searchTimeout) clearTimeout(searchTimeout);
    
    if (!query) { hideAmazonSuggest(); return; } // Non facciamo query inutili se l'input è vuoto

    // 2. Impostiamo un timer di 400ms. Il server verrà interrogato solo 
    // quando l'utente smette di digitare per quasi mezzo secondo.
    searchTimeout = setTimeout(async () => {
        try {
            // Chiediamo a SQLite i risultati perfetti
            const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
            const matches = await res.json();

            // La ricerca è vecchia: l'utente nel frattempo ha cambiato testo
            if (searchInput.value.trim() !== query) return;

            // Se il database ha trovato qualcosa...
            if (matches.length > 0) {
                hideAmazonSuggest();
                // Prendiamo l'ID del miglior risultato (il primo)
                const targetBookId = matches[0].id;

                // Cerchiamo a che indice si trova quel libro nel nostro scaffale 3D
                const foundIndex = booksArray.findIndex(book => book.userData.id === targetBookId);

                // Se lo troviamo, facciamo "volare" la telecamera su quel libro!
                if (foundIndex !== -1 && foundIndex !== currentIndex) {
                    currentIndex = foundIndex;
                    isShowingBack = false;

                    if (isViewingBoard) { 
                        isViewingBoard = false;
                        uiContainer.style.opacity = '1';
                        leftArrow.style.opacity = '1';
                        rightArrow.style.opacity = '1';
                        manageCatBtn.style.display = 'block';
                    }
                    
                    if (typeof infoBtn !== 'undefined') infoBtn.innerText = t('showSynopsis');
                    
                    updateCarousel();
                }
            } else {
                showAmazonSuggest(query);
            }
        } catch (err) {
            console.error("Errore durante la ricerca backend:", err);
        }
    }, 150); // 400 millisecondi di anti-spam
});

// --- GESTIONE UPLOAD MULTIPLO (con vassoio animato) ---
let uploadInProgress = false;
let activeUploadSkip = null;   // { requested } del caricamento in corso

async function uploadFiles(fileList, { offline = false } = {}) {
    const files = Array.from(fileList).filter(f => /\.(epub|pdf)$/i.test(f.name));
    if (files.length === 0 || uploadInProgress) return;
    uploadInProgress = true;

    // Blocchiamo temporaneamente la barra di ricerca per evitare problemi durante l'upload
    searchInput.disabled = true;
    hideAmazonSuggest();
    uploadLabel.style.pointerEvents = 'none';
    uploadLabel.style.opacity = '0.6';

    const emptyHintWasVisible = emptyLibraryHint.style.display !== 'none';
    emptyLibraryHint.style.display = 'none';

    const tray = new UploadTray();
    const items = files.map(file => tray.add(file));
    let added = 0, duplicates = 0, errors = 0;
    let landing = Promise.resolve();

    // "Salta animazione": i libri pronti compaiono subito sullo scaffale, senza volo
    const skip = { requested: false };
    activeUploadSkip = skip;
    const readyQueue = [];   // libri con la spunta che aspettano ancora il loro volo
    let lastAddedId = null;
    tray.onSkip(() => {
        skip.requested = true;
        const waiting = readyQueue.splice(0);
        waiting.forEach(({ item, book }) => { booksAwaitingLanding.delete(book.id); item.landed(); });
        if (waiting.length) {
            landing = landing.then(() => reloadLibrary({ focusBookId: lastAddedId }));
        }
    });

    // Mandiamo i file uno alla volta: il server elabora un libro per volta
    for (let i = 0; i < files.length; i++) {
        const item = items[i];
        item.sending(0);
        try {
            const result = await uploadWithProgress(files[i], { offline }, (fraction, uploaded) => {
                if (uploaded) item.processing(); else item.sending(fraction);
            });
            if (result.success) {
                added++;
                if (result.book?.id) booksAwaitingLanding.add(result.book.id);
                item.ready(result.book);
                // Appena compare la spunta, il libro parte verso lo scaffale
                // (uno alla volta, mentre gli altri file continuano a caricarsi).
                const book = result.book;
                if (book?.id) lastAddedId = book.id;
                const entry = { item, book };
                if (book) readyQueue.push(entry);
                landing = landing
                    .then(() => skip.requested ? null : new Promise(r => setTimeout(r, 1100)))
                    .then(() => {
                        const pos = readyQueue.indexOf(entry);
                        if (!book) return item.landed();
                        if (pos === -1) return;          // già mostrato da "Salta animazione"
                        readyQueue.splice(pos, 1);
                        if (skip.requested) {             // dopo "Salta": compare subito, senza volo
                            booksAwaitingLanding.delete(book.id);
                            item.landed();
                            return reloadLibrary({ focusBookId: book.id });
                        }
                        return landNewBook(item, book);
                    })
                    .catch(err => {
                        console.warn('Animazione di atterraggio:', err);
                        if (book) booksAwaitingLanding.delete(book.id);
                        item.landed();
                    });
            } else if (result.duplicate || (result.message && result.message.includes('già presente'))) {
                duplicates++;
                item.duplicate();
            } else {
                errors++;
                item.error(result.message);
            }
        } catch (error) {
            console.error("Errore di rete con", files[i].name, error);
            errors++;
            item.error();
        }
        tray.progress(i + 1);
    }

    await landing;
    if (added > 0) {
        generateMissingPdfCovers().catch(err => console.warn("Errore generazione copertine PDF:", err));
    }
    const closing = tray.finish({ added, duplicates, errors });
    if (added === 0 && emptyHintWasVisible) {
        closing.then(() => { if (booksArray.length === 0) emptyLibraryHint.style.display = 'flex'; });
    }

    activeUploadSkip = null;
    fileInput.value = '';
    searchInput.disabled = false;
    uploadLabel.style.pointerEvents = '';
    uploadLabel.style.opacity = '';
    uploadInProgress = false;
    await closing;
}

fileInput.addEventListener('change', (event) => uploadFiles(event.target.files));

// --- TRASCINA E RILASCIA I FILE SULLA FINESTRA ---
const dropOverlay = document.createElement('div');
dropOverlay.className = 'glass-effect';
Object.assign(dropOverlay.style, {
    position: 'fixed', inset: '18px', zIndex: '1300', display: 'none',
    alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '14px',
    borderRadius: '30px', border: '2px dashed rgba(255,255,255,0.6)',
    background: 'rgba(30,45,59,0.55)', fontSize: '22px', letterSpacing: '1px', pointerEvents: 'none'
});
document.body.appendChild(dropOverlay);

let dragDepth = 0;
const hasFiles = (e) => Array.from(e.dataTransfer?.types || []).includes('Files');
const readerOpen = () => document.getElementById('reader-overlay')?.style.display === 'block';

window.addEventListener('dragenter', (e) => {
    if (!hasFiles(e) || readerOpen()) return;
    e.preventDefault();
    if (++dragDepth === 1) {
        dropOverlay.innerHTML = `<div>${KS_ICON('books', 64)}</div><div>${t('dropFilesHere')}</div>`;
        dropOverlay.style.display = 'flex';
    }
});
window.addEventListener('dragover', (e) => { if (hasFiles(e)) e.preventDefault(); });
window.addEventListener('dragleave', (e) => {
    if (!hasFiles(e)) return;
    if (--dragDepth <= 0) { dragDepth = 0; dropOverlay.style.display = 'none'; }
});
window.addEventListener('drop', (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    dragDepth = 0;
    dropOverlay.style.display = 'none';
    if (!readerOpen()) uploadFiles(e.dataTransfer.files);
});

// --- 3. GENERATORI DI TEXTURE ---
function createSpineTexture(title, author) {
    const canvas = document.createElement('canvas');
    canvas.width = 128; 
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Sfondo e rotazione
    ctx.fillStyle = baseCoverColor; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';
    ctx.translate(canvas.width / 2, canvas.height / 2); 
    ctx.rotate(Math.PI / 2); 
    
    // --- 1. RIDIMENSIONAMENTO DINAMICO TITOLO ---
    let titleFontSize = 40; // Partiamo dalla grandezza massima desiderata
    const maxWidth = canvas.height - 60; // 1024px meno un po' di margine ai bordi
    
    ctx.font = `bold ${titleFontSize}px Arial, sans-serif`;
    
    // Finché il testo è troppo largo, rimpiccioliscilo!
    while (ctx.measureText(title).width > maxWidth && titleFontSize > 12) {
        titleFontSize -= 2;
        ctx.font = `bold ${titleFontSize}px Arial, sans-serif`;
    }
    
    ctx.fillStyle = '#ffffff'; 
    ctx.fillText(title, 0, -15);
    
    // --- 2. RIDIMENSIONAMENTO DINAMICO AUTORE ---
    let authorFontSize = 30;
    
    ctx.font = `italic ${authorFontSize}px Arial, sans-serif`;
    
    while (ctx.measureText(author).width > maxWidth && authorFontSize > 10) {
        authorFontSize -= 2;
        ctx.font = `italic ${authorFontSize}px Arial, sans-serif`;
    }
    
    ctx.fillStyle = '#cccccc'; 
    ctx.fillText(author, 0, 30); 
    
    return new THREE.CanvasTexture(canvas);
}

function createBackCoverTexture(description, tags, rating) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Sfondo elegante per il retro
    ctx.fillStyle = '#1e1e1e'; // Grigio scuro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bordo dorato opzionale
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);

    let currentY = 70;

    // --- DISEGNA I TAG ---
    if (tags && tags.length > 0) {
        ctx.fillStyle = '#d4af37';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(tags[0].toUpperCase(), canvas.width / 2, currentY);
        currentY += 40;
        
        // Linea separatrice
        ctx.beginPath();
        ctx.moveTo(100, currentY - 20);
        ctx.lineTo(canvas.width - 100, currentY - 20);
        ctx.stroke();
    }

    // --- LIMITE DI SICUREZZA PER LE STELLE ---
    // Riserviamo gli ultimi 120 pixel del canvas esclusivamente per le stelle
    const maxBottomY = canvas.height - 120; 

    // --- DISEGNA LA TRAMA (Con Word Wrap e Truncation) ---
    if (description) {
        ctx.fillStyle = '#ecf0f1';
        ctx.font = '22px serif';
        ctx.textAlign = 'left';
        
        // Puliamo l'HTML dalla trama (es. <i>, <b>)
        const cleanDesc = description.replace(/<[^>]*>?/gm, '');
        const words = cleanDesc.split(' ');
        
        let line = '';
        const maxWidth = canvas.width - 80;
        const x = 40;
        const lineHeight = 32;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
                
                // Se la prossima riga invade l'area delle stelle, ci fermiamo!
                if (currentY > maxBottomY) {
                    ctx.fillText("...", x, currentY - lineHeight + 10);
                    break; 
                }
            } else {
                line = testLine;
            }
        }
        
        // Disegna l'ultima riga se non abbiamo superato il limite
        if (currentY <= maxBottomY) {
            ctx.fillText(line, x, currentY);
        }
    }

    // --- DISEGNA LE STELLE (Fisse in basso) ---
    if (rating && rating > 0) {
        ctx.textAlign = 'center';
        ctx.font = '45px Arial';
        // Stelle disegnate come tracciati (piene = voto, vuote = il resto)
        const drawStar = (cx, cy, r, filled) => {
            ctx.beginPath();
            for (let k = 0; k < 10; k++) {
                const rad = k % 2 === 0 ? r : r * 0.45;
                const ang = -Math.PI / 2 + k * Math.PI / 5;
                ctx[k === 0 ? 'moveTo' : 'lineTo'](cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad);
            }
            ctx.closePath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#d4af37';
            ctx.fillStyle = '#d4af37';
            if (filled) ctx.fill(); else ctx.stroke();
        };
        // Posizionate sempre a 95px dal fondo, indipendentemente dalla trama
        for (let s = 1; s <= 5; s++) {
            drawStar(canvas.width / 2 + (s - 3) * 56, canvas.height - 95, 20, s <= rating);
        }
    }

    return new THREE.CanvasTexture(canvas);
}

function createFrontPlaceholderTexture(title, author) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; 
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Sfondo
    ctx.fillStyle = '#1e2d3b'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bordo decorativo interno dorato
    ctx.strokeStyle = '#d4af37'; // Colore oro
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80); // Doppio bordo

    // Stile del Testo Principale
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f5f5dc'; // Bianco panna

    // --- Disegna il Titolo ---
    ctx.font = 'bold 36px "Times New Roman", Times, serif';
    const words = title.split(' ');
    let line = '';
    let y = 250; // Altezza di partenza
    const maxWidth = 380;

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && i > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[i] + ' ';
            y += 45; // Spazio tra le righe
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // --- Disegna l'Autore ---
    ctx.font = 'italic 28px "Times New Roman", Times, serif';
    ctx.fillStyle = '#d4af37'; // Autore in oro
    ctx.fillText(author, canvas.width / 2, y + 80);

    // --- Etichetta di servizio ---
    ctx.font = '16px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillText(t('noCover'), canvas.width / 2, canvas.height - 80);

    return new THREE.CanvasTexture(canvas);
}

// --- 4. CARICAMENTO E LOGICA CAROSELLO (Con Modellazione Reale dello spessore) ---
async function loadBooks(prefetchedBooks = null) {
    try {
        const allBooks = prefetchedBooks ?? await (await fetch('/api/books')).json();
        // I libri appena caricati che aspettano ancora il loro volo non sono ancora "sullo scaffale"
        const booksData = allBooks.filter(b => !booksAwaitingLanding.has(b.id));

        // 1. Raggruppiamo i libri per Categoria
        const categoriesMap = new Map();
        booksData.forEach(book => {
            const cat = (book.tags && book.tags.length > 0) ? book.tags[0] : t('uncategorized');
            if (!categoriesMap.has(cat)) categoriesMap.set(cat, []);
            categoriesMap.get(cat).push(book);
        });

        // 2. ORDINE DELLE MENSOLE
        // Vogliamo che "Senza Categoria" sia creata per PRIMA, così otterrà la coordinata Y più bassa (shelfIndex 0).
        // Le altre categorie verranno impilate sopra in ordine alfabetico.
        const sortedCategories = Array.from(categoriesMap.keys()).sort((a, b) => {
            if (a === t('uncategorized')) return -1; // Sposta "Senza Categoria" all'INIZIO della lista
            if (b === t('uncategorized')) return 1;
            return a.localeCompare(b); // Ordina le altre alfabeticamente
        });

        let shelfIndex = 0;
        let globalBookIndex = 0;
        const shelvesToLoad = [];
        let startingIndexForCarousel = 0; // Memorizzeremo qui da quale libro partire

        // Helper per caricare le texture in modo asincrono con Promise
        // Sostituiamo il TextureLoader classico con ImageBitmapLoader
        const bitmapLoader = new THREE.ImageBitmapLoader();
        bitmapLoader.setOptions({ imageOrientation: 'flipY' }); 

        const loadTextureAsync = (url) => {
            return new Promise((resolve) => {
                bitmapLoader.load(
                    url, 
                    (imageBitmap) => {
                        const texture = new THREE.Texture(imageBitmap);
                        
                        // 1. Spegniamo i MipMap (evita che la GPU debba ricalcolare 10 copie dell'immagine, azzerando il lag)
                        texture.generateMipmaps = false;
                        
                        // 2. Usiamo il filtro lineare: mantiene i testi delle copertine leggibili senza calcoli extra
                        texture.minFilter = THREE.LinearFilter;
                        texture.magFilter = THREE.LinearFilter;
                        
                        texture.needsUpdate = true;
                        resolve(texture);
                    }, 
                    undefined, 
                    () => {
                        console.warn(`${t('textureError')} ${url}`);
                        resolve(null);
                    }
                );
            });
        };

        // 3. Creiamo le mensole e posizioniamo i placeholder 3D in un lampo
        sortedCategories.forEach(categoryName => {
            const booksInShelf = categoriesMap.get(categoryName);
            
            // Salviamo l'indice del primo libro della mensola di partenza (Senza Categoria)
            if (categoryName === t('uncategorized') && booksInShelf.length > 0) {
                startingIndexForCarousel = globalBookIndex;
            }

            // Essendo la prima del ciclo, "Senza Categoria" avrà shelfIndex = 0 e quindi l'altezza minima (-1.6)
            const shelfY = -1.6 + (shelfIndex * 4.2);
            
            const shelfMesh = new THREE.Mesh(shelfGeometry, shelfMaterial);
            shelfMesh.position.set(0, shelfY, -0.5);
            shelfMesh.receiveShadow = true;
            scene.add(shelfMesh);

            console.log(`${t('shelfLog')}`, { name: categoryName, y: shelfY });

            const currentShelfMeshes = [];

            // Posizioniamo i libri sulla mensola attuale
            booksInShelf.forEach((bookData, indexInShelf) => {
                const bookWidth = 2.0;
                const bookHeight = 3.0;
                const pages = bookData.pageCount || 350;
                const bookThickness = pages * 0.001; 

                const geometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookThickness);
                const spineTexture = createSpineTexture(bookData.title, bookData.author);
                const spineMaterial = new THREE.MeshStandardMaterial({ map: spineTexture, roughness: 0.7 });

                // Materiale placeholder: invece di un blocco nero, generiamo una copertina di testo!
                const frontCoverTexture = createFrontPlaceholderTexture(bookData.title, bookData.author);
                const frontCoverMaterial = new THREE.MeshStandardMaterial({ 
                    map: frontCoverTexture, 
                    roughness: 0.8 
                });

                let materials = [pagesMaterial, spineMaterial, pagesMaterial, pagesMaterial, frontCoverMaterial, baseCoverMaterial];

                const bookMesh = new THREE.Mesh(geometry, materials);
                bookMesh.castShadow = true;
                bookMesh.receiveShadow = true;

                // Modifica anche il retro per stampare i tag personalizzati e la trama
                const planeGeo = new THREE.PlaneGeometry(bookWidth, bookHeight); 
                const planeMat = new THREE.MeshStandardMaterial({ map: createBackCoverTexture(bookData.description, bookData.tags,bookData.rating), roughness: 0.8 });
                const backPlane = new THREE.Mesh(planeGeo, planeMat);

                backPlane.name = "backCover_mesh";
                backPlane.userData = { ...bookData };

                backPlane.position.z = -(bookThickness / 2) - 0.001; 
                backPlane.rotation.y = Math.PI; 
                bookMesh.add(backPlane);

                const baseShelfY = shelfY + 1.6;
                bookMesh.userData = { 
                    ...bookData, 
                    index: globalBookIndex, 
                    category: categoryName,
                    indexInShelf: indexInShelf,
                    thickness: bookThickness,
                    baseShelfY: baseShelfY,
                    targetY: baseShelfY 
                };

                                // Se il libro è in fase di lettura (tra l'1% e il 99%)
                if (bookData.progress > 0 && bookData.progress < 0.99) {
                    const ribbonWidth = 0.3;
                    const ribbonHeight = 0.6; 
                    const ribbonDepth = 0.05;
                    const ribbonGeo = new THREE.BoxGeometry(ribbonWidth, ribbonHeight, ribbonDepth);
                    const ribbonMat = new THREE.MeshStandardMaterial({ 
                        color: '#c0392b', // Un bel rosso scuro
                        roughness: 0.7, 
                        metalness: 0.1
                    });
                    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
                    
                    const fixedX = -0.9 + (ribbonWidth / 2);
                    
                    ribbon.position.set(fixedX, 1.5, 0.04); 
                    
                    bookMesh.add(ribbon);
                }

                bookMesh.position.y = baseShelfY;

                libraryGroup.add(bookMesh);
                booksArray.push(bookMesh);
                currentShelfMeshes.push(bookMesh); 
                globalBookIndex++;
            });

            // Salviamo la coda per i download delle immagini in background
            shelvesToLoad.push({
                categoryName: categoryName,
                meshes: currentShelfMeshes
            });

            shelfIndex++;
        });

        // 4. Impostiamo il libro iniziale sulla mensola più in basso PRIMA di aggiornare la scena
        if (booksArray.length > 0) {
            currentIndex = startingIndexForCarousel;
            if (keepActiveBookId) {
                const keep = booksArray.findIndex(b => b.userData.id === keepActiveBookId);
                if (keep !== -1) currentIndex = keep;
            }
        }
        keepActiveBookId = null;
        
        // Costruiamo e mostriamo immediatamente l'ambiente 3D (così l'utente non aspetta)
        updateCarousel();

        // 5. CARICAMENTO SEQUENZIALE E ANTI-LAG DELLE COPERTINE
        const activeCategory = booksArray.length > 0 ? booksArray[currentIndex].userData.category : null;
        const activeShelf = shelvesToLoad.find(s => s.categoryName === activeCategory);
        const otherShelves = shelvesToLoad.filter(s => s.categoryName !== activeCategory);

        // A. Carica la mensola attiva velocemente (per farla vedere subito all'utente)
        const loadActiveShelfFast = async (shelf) => {
            if (!shelf) return;
            const promises = shelf.meshes.map(async (mesh) => {
                if (mesh.userData.coverPath) {
                    const tex = await loadTextureAsync(`/${mesh.userData.coverPath}`);
                    if (tex) {
                        mesh.material[4].map = tex;
                        mesh.material[4].color.setHex(0xffffff); // Ripristina i colori vividi
                        mesh.material[4].needsUpdate = true; 
                    }
                }
            });
            await Promise.all(promises);
        };

        // B. Carica le altre mensole UNO ALLA VOLTA, dal basso verso l'alto
        const loadShelfCoversOneByOne = async (shelf) => {
            if (!shelf) return;
            for (const mesh of shelf.meshes) {
                if (mesh.userData.coverPath) {
                    const tex = await loadTextureAsync(`/${mesh.userData.coverPath}`);
                    if (tex) {
                        mesh.material[4].map = tex;
                        mesh.material[4].color.setHex(0xffffff); // Ripristina i colori vividi
                        mesh.material[4].needsUpdate = true; 
                        
                        //Aspettiamo il prossimo frame prima di caricare il libro successivo.
                        await new Promise(resolve => requestAnimationFrame(resolve));
                    }
                }
            }
        };
        if (booksArray.length === 0) {
            emptyLibraryHint.style.display = 'flex';
            uiContainer.style.display = 'none'; // Nasconde i tasti (Elimina, Trama, etc)
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        } else {
            emptyLibraryHint.style.display = 'none';
            uiContainer.style.display = 'flex';
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'block';
        }

        const highestShelfY = -1.6 + ((shelfIndex - 1) * 4.2);
        
        // Importiamo il nuovo file in modo asincrono per non appesantire l'avvio della pagina
        import('./highlights-board.js').then(module => {
            window.highlightsBoardModule = module;
            module.initHighlightsBoard(scene, camera, booksData, highestShelfY);
        }).catch(err => console.warn("Errore caricamento bacheca:", err));

        // Esecuzione invisibile in background
        (async () => {
            if (activeShelf) {
                await loadActiveShelfFast(activeShelf);
                console.log(`${t('texturesSuccess')}`, { cat: activeCategory });
            }
            
            // "otherShelves" è già ordinato dal basso verso l'alto (grazie a sortedCategories)
            // Li processiamo uno ad uno silenziosamente mentre l'utente naviga
            for (const shelf of otherShelves) {
                await loadShelfCoversOneByOne(shelf);
            }
            console.log(`${t('allTexturesLoaded')}d`);
        })();

    } catch (e) { console.error(e); }
}

function updateCarousel() {
    updateActiveBookPanel();
    updateCameraFit();
    if (booksArray.length === 0) return;
    
    const activeBook = booksArray[currentIndex];
    const activeCategory = activeBook.userData.category;

    const isUncategorized = (activeCategory === 'Senza Categoria');

    const displayCategory = isUncategorized 
        ? t('uncategorized') 
        : activeCategory.toUpperCase();

    categoryLabel.innerText = `${t('shelfTitlePrefix')}${displayCategory}`;

    categoryLabel.style.display = 'block'; 
    manageCatBtn.style.display = 'block'; // Mostriamo anche il bottoncino
    categoryLabel.innerHTML = KS_ICON('folder', 15) + ' ';
    categoryLabel.append(displayCategory.toUpperCase());
    categoryLabel.title = displayCategory;

    // SPOSTA LA TELECAMERA sull'asse Y della mensola attiva
    targetCameraY = activeBook.userData.baseShelfY;

    // Filtriamo i libri che si trovano sulla STESSA mensola del libro attivo
    const booksOnActiveShelf = booksArray.filter(b => b.userData.category === activeCategory);
    
    // Filtriamo i libri che NON sono su questa mensola
    const booksOnOtherShelves = booksArray.filter(b => b.userData.category !== activeCategory);

    // 1. GESTIONE DELLA MENSOLA ATTIVA (Apre il buco al centro)
    const centerGap = 1.6; 
    const margin = 0.08; 

    // Posizioniamo il libro centrale
    activeBook.userData.targetX = 0;
    activeBook.userData.targetZ = 0.5;
    activeBook.userData.targetRotY = isShowingBack ? Math.PI : 0;

    // Impiliamo i libri verso DESTRA sulla mensola attiva
    let currentXRight = centerGap;
    for (let i = activeBook.userData.indexInShelf + 1; i < booksOnActiveShelf.length; i++) {
        let book = booksOnActiveShelf[i];
        book.userData.targetX = currentXRight + (book.userData.thickness / 2);
        book.userData.targetZ = -1.5;
        book.userData.targetRotY = Math.PI / 2; 
        currentXRight += book.userData.thickness + margin;
    }

    // Impiliamo i libri verso SINISTRA sulla mensola attiva
    let currentXLeft = -centerGap;
    for (let i = activeBook.userData.indexInShelf - 1; i >= 0; i--) {
        let book = booksOnActiveShelf[i];
        book.userData.targetX = currentXLeft - (book.userData.thickness / 2);
        book.userData.targetZ = -1.5;
        book.userData.targetRotY = Math.PI / 2; 
        currentXLeft -= (book.userData.thickness + margin);
    }

    // 2. GESTIONE DELLE ALTRE MENSOLE (Libri compatti e messi via)
    // Raggruppiamo gli altri libri per categoria
    const otherCategories = [...new Set(booksOnOtherShelves.map(b => b.userData.category))];
    
    otherCategories.forEach(cat => {
        const shelfBooks = booksOnOtherShelves.filter(b => b.userData.category === cat);
        // Calcoliamo la larghezza totale per centrarli
        const totalWidth = shelfBooks.reduce((sum, b) => sum + b.userData.thickness + margin, 0);
        
        let startX = -(totalWidth / 2); // Partiamo da sinistra per centrarli sulla mensola
        shelfBooks.forEach(book => {
            book.userData.targetX = startX + (book.userData.thickness / 2);
            book.userData.targetZ = -1.5;
            book.userData.targetRotY = Math.PI / 2;
            startX += book.userData.thickness + margin;
        });
    });
}

// --- FUNZIONE PER MOSTRARE LA TRAMA COMPLETA SCORREVOLE ---
window.showFullPlotModal = function(bookData) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0'; overlay.style.left = '0';
    overlay.style.width = '100vw'; overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '2000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backdropFilter = 'blur(8px)';
    
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);

    const modal = document.createElement('div');
    modal.className = 'glass-effect';
    modal.style.padding = '40px';
    modal.style.borderRadius = '20px';
    modal.style.width = '90%';
    modal.style.maxWidth = '600px';
    modal.style.maxHeight = '80vh'; 
    modal.style.overflowY = 'auto'; // Abilita lo scroll se il testo è lungo
    modal.style.color = 'white';
    modal.style.textAlign = 'left';
    overlay.appendChild(modal);

    const title = document.createElement('h2');
    title.innerText = bookData.title || "Titolo Sconosciuto";
    title.style.marginTop = '0';
    title.style.marginBottom = '10px';
    title.style.color = '#d4af37';
    modal.appendChild(title);

    const author = document.createElement('h4');
    author.innerText = `${t('authorLabel')} ${bookData.author || "Sconosciuto"}`;
    author.style.marginTop = '0';
    author.style.marginBottom = '30px';
    author.style.color = '#ccc';
    modal.appendChild(author);

    const plotTitle = document.createElement('h3');
    plotTitle.innerText = t('fullPlotTitle');
    plotTitle.style.borderBottom = '1px solid rgba(255,255,255,0.2)';
    plotTitle.style.paddingBottom = '10px';
    modal.appendChild(plotTitle);

    const description = document.createElement('p');
    description.innerHTML = bookData.description || `<i>${t('noDescription')}</i>`;
    description.style.lineHeight = '1.8';
    description.style.fontSize = '16px';
    description.style.color = '#e0e0e0';
    modal.appendChild(description);

    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.style.textAlign = 'center';
    closeBtnContainer.style.marginTop = '40px';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerText = t('closeBtn'); 
    closeBtn.className = 'glass-effect modern-btn';
    closeBtn.onclick = () => overlay.remove();
    
    closeBtnContainer.appendChild(closeBtn);
    modal.appendChild(closeBtnContainer);
};

// --- 5. INTERAZIONI UNIFICATE (Click, Swipe, Trackpad) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Variabili per riconoscere lo swipe (trascinamento)
let pointerStartX = 0;
let pointerStartY = 0; // Tracciamo anche la Y
let pointerEndX = 0;
let pointerEndY = 0;   // Tracciamo anche la Y
let isDragging = false;

window.addEventListener('pointerdown', (event) => {
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay && readerOverlay.style.display !== 'none') return;
    if (document.getElementById('ks-manager')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') return;
    if (document.getElementById('help-modal-overlay')) return;
    if (document.getElementById('metadata-manager-overlay')) return;
    if (document.getElementById('highlights-manager-overlay')) return;

    if (event.target.closest('button, input, label, a')) return;

    // Solo i click sulla scena 3D vera e propria: tutto ciò che le sta sopra
    // (suggerimento Amazon, vassoio di caricamento, finestre...) non deve "bucare" fino ai libri.
    if (event.target !== renderer.domElement) return;

    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    isDragging = true;
});

// Apre il libro attivo: animazione della copertina e poi il lettore
function openActiveBook() {
    if (booksArray.length === 0) return;
    if (isShowingBack) { isShowingBack = false; updateCarousel(); }
    const activeBook = booksArray[currentIndex];
    activeBook.userData.targetZ = 2.8; 
    activeBook.userData.targetRotY = 0; 
    
    if (!activeBook.userData.hasHinge) {
        const coverGeo = new THREE.PlaneGeometry(2.0, 3.0);
        const coverMat = activeBook.material[4]; 
        const hinge = new THREE.Group();
        hinge.position.set(-1.0, 0, activeBook.userData.thickness / 2 + 0.002);
        const movingCover = new THREE.Mesh(coverGeo, coverMat);
        movingCover.position.set(1.0, 0, 0);
        hinge.add(movingCover);
        activeBook.add(hinge);
        activeBook.userData.hinge = hinge;
        activeBook.userData.hasHinge = true;
        activeBook.material[4] = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.9 });
    }

    document.querySelector('.top-bar').style.opacity = '0';
    uiContainer.style.opacity = '0';
    leftArrow.style.opacity = '0';
    rightArrow.style.opacity = '0';
    creditsFooter.style.opacity = '0';

    donateBtn.style.opacity = '0';
    donateBtn.style.pointerEvents = 'none';
    
    activeBook.userData.hinge.userData = { targetRotY: -Math.PI * 0.85 };

    setTimeout(() => {
        const bookPath = activeBook.userData.epubPath;
        const isPdf = bookPath.toLowerCase().endsWith('.pdf');

        if (isPdf) {
            console.log("Apertura PDF");
            document.getElementById('viewer').style.display = 'none';
            document.getElementById('pdf-container').style.display = 'flex'; 
            window.openPdfReader(bookPath, activeBook.userData.id);
        } else {
            console.log("Apertura EPUB");
            document.getElementById('pdf-container').style.display = 'none'; 
            document.getElementById('viewer').style.display = 'block';
            window.openReader(bookPath, activeBook.userData.id);
        }
    }, 400);
}

// Un gesto annullato dal sistema non deve lasciare lo scaffale "agganciato" al dito
window.addEventListener('pointercancel', () => { isDragging = false; });

window.addEventListener('pointerup', (event) => {
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay && readerOverlay.style.display !== 'none') return;
    if (document.getElementById('ks-manager')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (document.getElementById('help-modal-overlay')) return;
    if (document.getElementById('metadata-manager-overlay')) return;
    if (document.getElementById('highlights-manager-overlay')) return;
    if (event.target.closest('button, input, label, a')) {
        isDragging = false; 
        return;
    }
    if (!isDragging) return;
    isDragging = false;
    pointerEndX = event.clientX;
    pointerEndY = event.clientY;
    
    // Calcoliamo lo spostamento su entrambi gli assi
    const deltaX = pointerStartX - pointerEndX;
    const deltaY = pointerStartY - pointerEndY;

    // 1. SWIPE ORIZZONTALE (Cambio Libro)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) changeBook(1); 
        else changeBook(-1);           
    } 
    // 2. SWIPE VERTICALE (Cambio Mensola)
    else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0) changeShelf(-1); // Swipe in Su -> Guarda la mensola sotto
        else changeShelf(1);             // Swipe in Giù -> Guarda la mensola sopra
    } 
    // 2. È UN CLICK PURO? (Nessuno spostamento reale, o piccolissimo tremolio del dito)
    else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(libraryGroup.children, true);

        if (intersects.length > 0) {
            const originalMesh = intersects[0].object;
            let bookObj = originalMesh;

            while (bookObj.parent !== libraryGroup && bookObj.parent !== null) {
                bookObj = bookObj.parent;
            }
            
            const clickedIndex = bookObj.userData.index;

            if (clickedIndex !== currentIndex) {
                currentIndex = clickedIndex;
                isShowingBack = false;
                if (typeof infoBtn !== 'undefined' && infoBtn) {
                    infoBtn.innerText = t('showSynopsis');
                }
                updateCarousel();
                return; 
            }
            if (originalMesh.name === "backCover_mesh") {
                window.showFullPlotModal(bookObj.userData);
                return; 
            }
            openActiveBook();
        }
    }
});

// Aggiungiamo il supporto alla ROTELLINA DEL MOUSE e al TRACKPAD
let scrollTimeout = null; 
window.addEventListener('wheel', (event) => {
    if (document.getElementById('ks-manager')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (document.getElementById('help-modal-overlay')) return;
    if (document.getElementById('metadata-manager-overlay')) return;
    if (document.getElementById('highlights-manager-overlay')) return;
    if (scrollTimeout) return;

    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > 20) {
        if (event.deltaX > 0) changeBook(1); 
        else changeBook(-1); 
        scrollTimeout = setTimeout(() => { scrollTimeout = null; }, 300);
    } 
    else if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && Math.abs(event.deltaY) > 20) {
        if (event.deltaY > 0) changeShelf(-1); // Rotellina giù -> Guarda mensola sotto
        else changeShelf(1);                   // Rotellina su -> Guarda mensola sopra
        scrollTimeout = setTimeout(() => { scrollTimeout = null; }, 500); // Pausa più lunga per non far schizzare le mensole
    }
});

// --- 8. NAVIGAZIONE CON TASTIERA (Frecce Direzionali) ---
window.addEventListener('keydown', (event) => {
    if (document.activeElement.tagName === 'INPUT') return;
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay && readerOverlay.style.display === 'block') return;

    if (document.getElementById('ks-manager')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (document.getElementById('help-modal-overlay')) return;
    if (document.getElementById('metadata-manager-overlay')) return;
    if (document.getElementById('highlights-manager-overlay')) return;
    if (event.key === 'ArrowRight') {
        changeBook(1); 
    } else if (event.key === 'ArrowLeft') {
        changeBook(-1); 
    } else if (event.key === 'ArrowUp') {
        changeShelf(1); // Freccia su -> Sali di un piano
    } else if (event.key === 'ArrowDown') {
        changeShelf(-1); // Freccia giù -> Scendi di un piano
    } 
    else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); 
        if (booksArray.length > 0) {
            if (!isShowingBack) {
                infoBtn.click();
            } else {
                const activeBook = booksArray[currentIndex];
                if (activeBook && activeBook.userData.epubPath) {
                    window.openReader(activeBook.userData.epubPath, activeBook.userData.id);
                }
            }
        }
    }
});

window.addEventListener('pointermove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(libraryGroup.children, true);
    
    // Cambiamo il cursore se siamo sopra una backCover_mesh
    if (intersects.length > 0 && intersects[0].object.name === "backCover_mesh") {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'auto';
    }
});

// Quando il lettore viene chiuso, ripristiniamo la vista 3D
window.addEventListener('readerClosed', () => {
    fetch('/api/books').then(r => r.json()).then(list => {
        const byId = new Map(list.map(b => [b.id, b]));
        booksArray.forEach(b => { const fresh = byId.get(b.userData.id); if (fresh) b.userData.progress = fresh.progress; });
        updateActiveBookPanel();
    }).catch(() => {});
    // Rendi l'interfaccia 3D visibile
    document.querySelector('.top-bar').style.opacity = '1';
    uiContainer.style.opacity = '1';
    leftArrow.style.opacity = '1';
    rightArrow.style.opacity = '1';
    creditsFooter.style.opacity = '1';

    donateBtn.style.opacity = '1';
    donateBtn.style.pointerEvents = 'auto';

    const activeBook = booksArray[currentIndex];
    if (activeBook && activeBook.userData.hasHinge) {
        activeBook.userData.hinge.userData.targetRotY = 0; 
    }

    // Rimetti il libro al suo posto nel carosello
    updateCarousel(); 
});

// --- 6. ANIMAZIONE ---
function animate() {
    requestAnimationFrame(animate);
    
    // Movimento fluido della telecamera in verticale verso la mensola attiva
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraFit.dx, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY + cameraFit.dy, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraFit.z, 0.08);
    // Spostiamo anche la luce per mantenere le ombre perfette!
    directionalLight.position.y = camera.position.y + 10;
    
    booksArray.forEach(book => {
        if (book.userData.targetX !== undefined) {
            book.position.x = THREE.MathUtils.lerp(book.position.x, book.userData.targetX, 0.1);
            book.position.y = THREE.MathUtils.lerp(book.position.y, book.userData.targetY, 0.1);
            book.position.z = THREE.MathUtils.lerp(book.position.z, book.userData.targetZ, 0.1);
            book.rotation.y = THREE.MathUtils.lerp(book.rotation.y, book.userData.targetRotY, 0.1);
        }
        if (book.userData.hasHinge && book.userData.hinge.userData.targetRotY !== undefined) {
            book.userData.hinge.rotation.y = THREE.MathUtils.lerp(book.userData.hinge.rotation.y, book.userData.hinge.userData.targetRotY, 0.08);
        }
    });

    // Con "Gestisci" aperto la scena è coperta e sfocata: non la ridisegniamo (risparmia batteria
    // e rende fluide le finestre sopra il pannello). Riparte da sola alla chiusura.
    if (!document.getElementById('ks-manager')) renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    updateCameraFit();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
});

// --- 7. CONTROLLO AGGIORNAMENTI GITHUB ---
// Repository dove vengono pubblicate le release dell'app (Releases → KoreShelf.exe)
const GITHUB_API_URL = "https://api.github.com/repos/GabrieleTrovato01/KoreShelf/releases/latest";

// "v3.1.0" → [3, 1, 0]
function parseVersion(tag) {
    const m = String(tag || '').match(/(\d+)\.(\d+)(?:\.(\d+))?/);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3] || 0)] : null;
}

function isNewerVersion(latest, current) {
    const a = parseVersion(latest), b = parseVersion(current);
    if (!a || !b) return false;
    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) return a[i] > b[i];
    }
    return false;
}

async function checkForUpdates() {
    try {
        // La versione installata è quella vera dell'eseguibile, non una scritta a mano
        const current = (await (await fetch('/api/ping')).json()).version;

        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        if (isNewerVersion(data.tag_name, current)) {
            showUpdateNotification(data.tag_name, data.html_url);
        }
    } catch (error) {
        console.warn("Controllo aggiornamenti non riuscito:", error);
    }
}
// --- GENERATORE COPERTINE PDF IN BACKGROUND (Frontend) ---
async function generateMissingPdfCovers() {
    // 1. Controlliamo se pdf.js è disponibile nel browser
    if (typeof pdfjsLib === 'undefined') {
        console.warn(t('logpdfjs'));
        return;
    }

    // 2. Chiediamo al server la lista aggiornata dei libri
    const res = await fetch('/api/books');
    const booksData = await res.json();

    // 3. Filtra solo i PDF che NON hanno ancora una copertina
    const pdfsMissingCover = booksData.filter(b => 
        b.epubPath && b.epubPath.toLowerCase().endsWith('.pdf') && !b.coverPath
    );

    if (pdfsMissingCover.length === 0) return;

    console.log(t('logGeneratePdfCovers', { count: pdfsMissingCover.length }));

    // Assicuriamoci che il worker di pdf.js sia configurato
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdf.worker.min.js';
    }

    // 4. Processiamo i PDF uno alla volta per non affollare la rete
    for (const book of pdfsMissingCover) {
        try {
            console.log(t('logGeneratePdfCover', { title: book.title }));

            const loadingTask = pdfjsLib.getDocument(`/${book.epubPath}`);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            
            // Calcoliamo la scala per ottenere un'immagine larga circa 512px
            const unscaledViewport = page.getViewport({ scale: 1.0 });
            const scale = 512 / unscaledViewport.width;
            const viewport = page.getViewport({ scale });

            // Creiamo un canvas "fantasma" (non serve aggiungerlo al DOM)
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');

            // Renderizziamo la prima pagina
            await page.render({ canvasContext: ctx, viewport }).promise;

            // Convertiamo il canvas in un'immagine JPEG
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85));
            
            if (blob) {
                const formData = new FormData();
                formData.append('cover', blob, `cover_${book.id}.jpg`);
                
                // Inviamo al server
                const uploadRes = await fetch(`/api/books/${book.id}/cover`, {
                    method: 'POST',
                    body: formData
                });
                
                if (uploadRes.ok) {
                    const result = await uploadRes.json();
                    console.log(t('logCoverGenerated', { title: book.title }));
                    
                    // BONUS: Aggiorniamo la texture 3D in tempo reale senza ricaricare la pagina!
                    const mesh = booksArray.find(b => b.userData.id === book.id);
                    if (mesh) {
                        const newUrl = `/${result.coverPath}`;
                        const tex = await libLoader.loadTexture(newUrl);
                        mesh.material[4].map = tex;
                        mesh.material[4].color.setHex(0xffffff); // Rimuovi il colore scuro del placeholder
                        mesh.material[4].needsUpdate = true;
                    }
                } else {
                    console.warn(t('logCoverGenerationError', { title: book.title, statusText: uploadRes.statusText }));
                }
            }
        } catch (err) {
            console.warn(t('logCoverGenerationFailed', { title: book.title, errorMessage: err.message }));
        }
    }
    console.log(t('logPdfCoversGenerated'));
}

function showUpdateNotification(newVersion, downloadUrl) {
    if (document.getElementById('lorekeeper-update-banner')) return; 

    const banner = document.createElement('div');
    banner.id = 'lorekeeper-update-banner';
    
    Object.assign(banner.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(43, 43, 43, 0.85)',
        backdropFilter: 'blur(10px)',
        webkitBackdropFilter: 'blur(10px)',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '50px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        zIndex: '9999', 
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        border: '1px solid rgba(255, 255, 255, 0.2)'
    });

    const msgText = t('updateAvailable').replace('{version}', newVersion);
    const btnText = t('updateDownload');

    banner.innerHTML = `
        <span style="font-size: 14px; letter-spacing: 0.5px;">${msgText}</span>
        <a href="${downloadUrl}" target="_blank" class="modern-btn" style="
            background-color: rgba(76, 175, 80, 0.2); 
            border: 1px solid rgba(76, 175, 80, 0.5);
            color: #81c784; 
            padding: 8px 20px; 
            text-decoration: none; 
            font-size: 12px;
            margin-left: 10px;
        " onmouseover="this.style.backgroundColor='rgba(76, 175, 80, 0.4)'; this.style.transform='translateY(-2px)';" 
           onmouseout="this.style.backgroundColor='rgba(76, 175, 80, 0.2)'; this.style.transform='translateY(0)';">
           ${btnText}
        </a>
        <button id="close-update-banner" style="
            background: transparent; 
            border: none; 
            color: rgba(255,255,255,0.5); 
            font-size: 20px; 
            cursor: pointer; 
            padding: 0; 
            transition: color 0.3s;
        " onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">×</button>
    `;

    document.body.appendChild(banner);

    document.getElementById('close-update-banner').addEventListener('click', () => {
        banner.style.opacity = '0';
        banner.style.transform = 'translateX(-50%) translateY(-20px)';
        banner.style.transition = 'all 0.4s ease';
        setTimeout(() => banner.remove(), 400);
    });
}
let keepActiveBookId = null;

// Libri già caricati sul server ma ancora nel vassoio, in attesa del loro volo
const booksAwaitingLanding = new Set();

// Ricostruisce la libreria 3D SENZA salti: i libri restano dove sono, con le loro
// copertine già caricate, e la vista resta sul libro che si stava guardando.
async function reloadLibrary({ focusBookId = null } = {}) {
    const booksData = await (await fetch('/api/books')).json();

    const previous = new Map(booksArray.map(b => [b.userData.id, {
        x: b.position.x, y: b.position.y, z: b.position.z, rotY: b.rotation.y,
        cover: (b.material[4] && b.material[4].map && !b.material[4].map.isCanvasTexture) ? b.material[4].map : null,
    }]));
    keepActiveBookId = focusBookId ?? booksArray[currentIndex]?.userData.id ?? null;

    // 1. Svuota il gruppo dei libri
    libraryGroup.clear();
    booksArray = [];

    // 2. Trova e rimuovi tutte le mensole dalla scena
    const shelvesToRemove = [];
    scene.children.forEach(child => {
        // Identifichiamo le mensole grazie al materiale specifico
        if (child.material === shelfMaterial) {
            shelvesToRemove.push(child);
        }
    });

    shelvesToRemove.forEach(shelf => {
        scene.remove(shelf);
        if (shelf.geometry) shelf.geometry.dispose();
    });

    // 3. Ricostruisci la libreria aggiornata (nello stesso frame: nessuno sfarfallio)
    await loadBooks(booksData);

    // 4. Ogni libro riparte dalla posizione in cui era, così il carosello scorre invece di saltare
    booksArray.forEach(book => {
        const old = previous.get(book.userData.id);
        if (!old) return;
        book.position.set(old.x, old.y, old.z);
        book.rotation.y = old.rotY;
        if (old.cover && book.material[4]) {
            book.material[4].map = old.cover;
            book.material[4].color.setHex(0xffffff);
            book.material[4].needsUpdate = true;
        }
    });
}

// --- PROIEZIONE DI UN LIBRO 3D SULLO SCHERMO ---
// Rettangolo (in pixel) occupato dalla copertina di un libro, così com'è inquadrato ora.
function projectBookFront(mesh) {
    mesh.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    const half = mesh.userData.thickness / 2;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of [[-1, -1.5], [1, -1.5], [-1, 1.5], [1, 1.5]]) {
        const v = new THREE.Vector3(x, y, half);
        mesh.localToWorld(v);
        v.project(camera);
        const sx = (v.x + 1) / 2 * window.innerWidth;
        const sy = (1 - v.y) / 2 * window.innerHeight;
        minX = Math.min(minX, sx); maxX = Math.max(maxX, sx);
        minY = Math.min(minY, sy); maxY = Math.max(maxY, sy);
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function loadCoverTexture(url) {
    return new Promise(resolve => {
        const loader = new THREE.ImageBitmapLoader();
        loader.setOptions({ imageOrientation: 'flipY' });
        loader.load(url, (bitmap) => {
            const texture = new THREE.Texture(bitmap);
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            resolve(texture);
        }, undefined, () => resolve(null));
    });
}

// --- ATTERRAGGIO DI UN LIBRO APPENA CARICATO ---
// Il libro del vassoio ruota e vola fino al suo posto nello scaffale, ingrandendosi,
// mentre il carosello scorre tra i libri e la telecamera tra le mensole.
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerpNum = (a, b, t) => a + (b - a) * t;

async function landNewBook(item, book) {
    booksAwaitingLanding.delete(book.id);
    await reloadLibrary();
    const index = booksArray.findIndex(b => b.userData.id === book.id);
    if (index === -1) { item.landed(); return; }
    const mesh = booksArray[index];
    const coverPromise = book.coverPath ? loadCoverTexture(`/${book.coverPath}`) : Promise.resolve(null);

    // Il libro 3D resta nascosto finché quello "volante" non lo raggiunge
    mesh.visible = false;
    if (isViewingBoard) {
        isViewingBoard = false;
        uiContainer.style.opacity = '1';
        leftArrow.style.opacity = '1';
        rightArrow.style.opacity = '1';
        manageCatBtn.style.display = 'block';
    }
    currentIndex = index;
    isShowingBack = false;
    updateCarousel();
    mesh.position.set(mesh.userData.targetX, mesh.userData.targetY, mesh.userData.targetZ);
    mesh.rotation.y = mesh.userData.targetRotY;

    const flyer = item.launch();
    const start = flyer.startRect;
    const duration = 1900;
    const t0 = performance.now();
    let lastTarget = null;
    let stableFrames = 0;

    await new Promise(resolve => {
        const frame = (now) => {
            const skipped = !!(activeUploadSkip && activeUploadSkip.requested);
            const t = skipped ? 1 : Math.min(1, (now - t0) / duration);
            const e = easeInOutCubic(t);
            const target = projectBookFront(mesh); // il bersaglio si muove con la telecamera
            const arc = Math.sin(Math.PI * t) * Math.min(140, window.innerHeight * 0.18);
            flyer.place(
                lerpNum(start.x, target.x, e),
                lerpNum(start.y, target.y, e) - arc,
                lerpNum(start.width, target.width, e),
                lerpNum(start.height, target.height, e),
                lerpNum(-28, -360, e) // una piroetta completa: arriva dritto, di fronte
            );
            if (t < 1) return requestAnimationFrame(frame);

            // Traiettoria finita: restiamo agganciati al libro 3D finché il carosello
            // non si ferma (su PC lenti scorre più a lungo), poi passiamo il testimone.
            const moved = lastTarget
                ? Math.abs(target.x - lastTarget.x) + Math.abs(target.y - lastTarget.y) + Math.abs(target.height - lastTarget.height)
                : Infinity;
            lastTarget = target;
            stableFrames = moved < 0.75 ? stableFrames + 1 : 0;
            if (skipped || stableFrames >= 2 || now - t0 > duration + 2500) resolve();
            else requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
    });

    const coverWait = (activeUploadSkip && activeUploadSkip.requested) ? 0 : 600;
    const texture = await Promise.race([coverPromise, new Promise(r => setTimeout(() => r(null), coverWait))]);
    if (texture && mesh.material[4]) {
        mesh.material[4].map = texture;
        mesh.material[4].color.setHex(0xffffff);
        mesh.material[4].needsUpdate = true;
    }
    mesh.visible = true;
    flyer.land(projectBookFront(mesh), { instant: !!(activeUploadSkip && activeUploadSkip.requested) });
    item.landed();
}

// Piccolo pannello di controllo usato dai test automatici (tests/e2e)
window.__koreshelf = {
    activeBookId: () => booksArray[currentIndex]?.userData.id ?? null,
    bookScreenRect: (id) => {
        const mesh = booksArray.find(b => b.userData.id === id);
        return mesh ? projectBookFront(mesh) : null;
    },
    isBookVisible: (id) => !!booksArray.find(b => b.userData.id === id)?.visible,
    visibleBookIds: () => booksArray.filter(b => b.visible).map(b => b.userData.id),
    cameraY: () => camera.position.y,
    cameraTargetY: () => targetCameraY,   // altezza della mensola verso cui si muove la telecamera
    cameraState: () => ({ x: camera.position.x, y: camera.position.y, z: camera.position.z, fit: { ...cameraFit } }),
    shelfSize: () => { const b = booksArray[currentIndex]; return b ? booksArray.filter(x => x.userData.category === b.userData.category).length : 0; },
};

// --- AVVIO DELL'APPLICAZIONE ---

async function startApp() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    
    // Recuperiamo la lingua salvata per i testi di caricamento
    const savedLang = localStorage.getItem('KoreShelf_lang') || 'it';

    try {
        // sync della lingua con il server.
        fetch('/api/sync-language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lang: savedLang })
        }).catch(e => {});

        // 1. Carica le traduzioni dal server
        if (loadingText) {
            loadingText.innerText = savedLang === 'it' ? "Caricamento lingua..." : "Loading language...";
        }
        await initI18n(); 

        // 2. Traduci l'interfaccia statica
        translateStaticHTML();

        if (typeof window.translateReaderUI === 'function') {
            window.translateReaderUI();
        }

        // 3. Carica i libri
        if (loadingText) {
            loadingText.innerText = savedLang === 'it' ? "Allestimento scaffali..." : "Setting up shelves...";
        }
        await loadBooks();

        generateMissingPdfCovers().catch(err => {console.warn("Errore generazione copertine PDF:", err);}); 

        // 4. Avvia l'animazione 3D
        animate();

        checkForUpdates(); // Controlla se ci sono aggiornamenti disponibili su GitHub

        // 5. Rimuovi lo splash screen
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }

    } catch (error) {
        console.error("Errore durante l'avvio dell'app:", error);
        if (loadingText) loadingText.innerText = "Error / Errore";
    }
}

updateCameraFit();
startApp();

// --- ASCOLTO EVENTI SOTTOLINEATURE IN TEMPO REALE ---
window.addEventListener('onHighlightAdded', (e) => {
    const { bookId, highlight } = e.detail;
    // Aggiorniamo la memoria del libro nel mondo 3D
    const bookMesh = booksArray.find(b => b.userData.id === bookId);
    if (bookMesh) {
        if (!bookMesh.userData.highlights) bookMesh.userData.highlights = [];
        bookMesh.userData.highlights.push(highlight);
        
        // Se la bacheca esiste, le diciamo di aggiungere il post-it
        if (window.highlightsBoardModule) {
            window.highlightsBoardModule.addHighlightLocally(bookMesh.userData);
        }
    }
});

window.addEventListener('onHighlightRemoved', (e) => {
    const { bookId, cfi } = e.detail;
    // Aggiorniamo la memoria del libro nel mondo 3D
    const bookMesh = booksArray.find(b => b.userData.id === bookId);
    if (bookMesh && bookMesh.userData.highlights) {
        bookMesh.userData.highlights = bookMesh.userData.highlights.filter(h => h.cfi !== cfi);
        
        // Se la bacheca esiste, le diciamo di rimuovere il post-it (o accorciarlo)
        if (window.highlightsBoardModule) {
            window.highlightsBoardModule.removeHighlightLocally(bookId, cfi);
        }
    }
});