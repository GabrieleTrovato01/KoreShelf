import { openCategoryManager } from './category-manager.js';
import { LibraryLoader } from './loader-optimizer.js';
import { t, initI18n, setLanguage } from './i18n.js';
import {openHelpModal} from './help-modal.js';
import {openMetadataManager} from './metadata-manager.js';
import { BookService } from './services/book-service.js';
import { isMobilePlatform } from './services/platform.js';
import './style.css';
import * as THREE from 'three';

window.BookService = BookService;
window.t = t;

if (isMobilePlatform()) {
    document.body.classList.add('platform-mobile');
}

// --- TRADUZIONE ELEMENTI STATICI E UI DINAMICA ---
function translateStaticHTML() {
    // 1. Traduzione Lettore (Reader) e pagina
    const closeReaderBtn = document.getElementById('close-reader-btn');
    const themeBtn = document.getElementById('theme-toggle-btn');
    const lang = localStorage.getItem('KoreShelf_lang') || 'it';

    if (typeof shutdownBtn !== 'undefined' && !isMobilePlatform()) {
        shutdownBtn.innerHTML = '<span class="btn-icon">🛑</span><span class="btn-text">' + t('shutdownBtn') + '</span>';
        shutdownBtn.title = t('shutdownTooltip');
    }
    
    if (closeReaderBtn) {
        closeReaderBtn.innerHTML = '<span class="reader-btn-icon">&times;</span> <span class="reader-btn-text">' + t('closeReader') + '</span>';
    }
    
    if (themeBtn) {
        const isDark = localStorage.getItem('readerDarkMode') === 'true';
        themeBtn.innerHTML = '<span class="reader-btn-icon">' + (isDark ? '🌙' : '☀️') + '</span> <span class="reader-btn-text">' + t(isDark ? 'darkMode' : 'lightMode') + '</span>';
    }

    document.title = t('appTitle');

    // 2. AGGIORNAMENTO TESTI BOTTONI (La vera soluzione al tuo problema!)
    // Dato che la lingua ora è caricata, applichiamo i testi corretti ai bottoni creati in alto
    if (typeof manageCatBtn !== 'undefined') {
        manageCatBtn.innerHTML = '<span class="btn-icon">⚙️</span><span class="btn-text">' + t('manageShelf') + '</span>';
        manageCatBtn.title = t('manageShelfTooltip');
    }
    if (typeof searchInput !== 'undefined') searchInput.placeholder = t('searchPlaceholder');
    if (typeof uploadLabel !== 'undefined') uploadLabel.innerHTML = '<span class="btn-icon">📤</span><span class="btn-text">' + t('uploadBtn') + '</span>';
    
    // Bottoni in basso
    if (typeof infoBtn !== 'undefined') {
        // infoBtn cambia icona a seconda di cosa sta mostrando
        infoBtn.innerHTML = isShowingBack 
            ? '<span class="btn-icon">📖</span><span class="btn-text">' + t('showCover') + '</span>' 
            : '<span class="btn-icon">👁️</span><span class="btn-text">' + t('showSynopsis') + '</span>';
    }
    if (typeof assignCatBtn !== 'undefined') assignCatBtn.innerHTML = '<span class="btn-icon">🏷️</span><span class="btn-text">' + t('assignCategory') + '</span>';
    if (typeof deleteBookBtn !== 'undefined') deleteBookBtn.innerHTML = '<span class="btn-icon">🗑️</span><span class="btn-text">' + t('deleteBook') + '</span>';
    if (typeof moreBtn !== 'undefined') {
        moreBtn.title = t('moreActions');
        moreBtn.setAttribute('aria-label', t('moreActions'));
    }
    if (typeof editMetadataBtn !== 'undefined') editMetadataBtn.innerHTML = '<span class="btn-icon">✏️</span><span class="btn-text">' + (t('editMetadata') || 'Modifica') + '</span>';

    if (typeof creditsFooter !== 'undefined') {
        creditsFooter.innerHTML = `${t('credits')} <a href="https://github.com/GabrieleTrovato01" target="_blank">GabrieleTrovato01</a>`;
    }
    if (typeof donateBtn !== 'undefined') donateBtn.innerHTML = '<span class="btn-icon">☕</span><span class="btn-text">' + t('donateBtn') + '</span>';
    if (typeof emptyMsg !== 'undefined') {
        emptyMsg.innerText = t('emptyLibraryMessage');
        emptyUploadBtn.innerText = '📤 ' + t('emptyUploadBtn');
        emptyDivider.innerText = t('emptyOrDivider');
        emptySearchInput.placeholder = t('emptySearchPlaceholder');
        emptySearchBtn.innerText = '🔍 ' + t('emptySearchBtn');
    }
    if (typeof langBtn !== 'undefined') langBtn.title = t('changeLanguage');
}

// Helper per ripulire i percorsi nativi Capacitor ed evitare il doppio prefisso su mobile
function getSafeBookPath(path) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('file:') || path.startsWith('_capacitor_')) {
        return path;
    }
    if (path.startsWith('/')) {
        return path;
    }
    return '/' + path;
}

// --- 1. SETUP BASE ---
const scene = new THREE.Scene();

// Diamo un colore alla scena (la "parete" dietro la libreria)
// Puoi cambiare questo codice esadecimale con il colore che preferisci!
scene.background = new THREE.Color('#2c3e50'); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3.5); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; 
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
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
let isViewingBoard= false; // Stato della bacheca dei post-it

// --- 2. STILI CSS MODERNI E UI (Menu + Bottone Inferiore) ---
const styleStyle = document.createElement('style');
styleStyle.innerHTML = `
    html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #2c3e50 !important; /* Colore blu notte coerente con la scena 3D */
        touch-action: none;
        }   
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
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.2px;
        border-radius: 50px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        text-align: center;
        box-sizing: border-box;
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

    /* --- Varianti di colore: un solo accento (Carica) e il rosso solo per ciò che è distruttivo --- */
    .btn-primary {
        background: rgba(46, 204, 113, 0.15);
        border-color: rgba(46, 204, 113, 0.45);
        color: #5fe39a;
    }
    .btn-primary:hover {
        background: rgba(46, 204, 113, 0.28);
        border-color: rgba(46, 204, 113, 0.7);
        box-shadow: 0 8px 15px rgba(46, 204, 113, 0.2);
    }
    .btn-danger {
        background: rgba(255, 50, 50, 0.12);
        border-color: rgba(255, 100, 100, 0.3);
        color: #ffb3b3;
    }
    .btn-danger:hover {
        background: rgba(255, 50, 50, 0.28);
        border-color: rgba(255, 100, 100, 0.55);
        box-shadow: 0 8px 15px rgba(255, 0, 0, 0.2);
    }
    /* --- Menu "⋯" delle azioni secondarie sul libro --- */
    .more-wrap { position: relative; display: inline-flex; }
    .more-menu {
        position: absolute;
        bottom: calc(100% + 10px); /* Si apre verso l'alto, sopra la barra */
        right: 0;
        display: none;
        flex-direction: column;
        min-width: 220px;
        padding: 6px;
        border-radius: 16px;
        background: rgba(30, 45, 59, 0.88); /* Più pieno del vetro normale: leggibile sopra la scena 3D */
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        z-index: 2000;
    }
    .more-menu.open { display: flex; }
    .more-menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 11px 14px;
        border: none;
        border-radius: 10px;
        background: transparent;
        color: #ffffff;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 14px;
        text-align: left;
        white-space: nowrap;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    .more-menu-item:hover { background: rgba(255, 255, 255, 0.1); }
    .more-menu-item.danger { color: #ffb3b3; }
    .more-menu-item.danger:hover { background: rgba(255, 50, 50, 0.2); }
    .more-menu-item:disabled { opacity: 0.6; cursor: default; }
    .more-menu-separator { height: 1px; margin: 4px 8px; background: rgba(255, 255, 255, 0.15); }
    /* Nel menu il testo resta sempre visibile, anche su mobile */
    .more-menu .btn-icon, .platform-mobile .more-menu .btn-icon { margin-right: 0 !important; font-size: 16px; }
    .more-menu .btn-text, .platform-mobile .more-menu .btn-text { display: inline !important; }

    /* Neutro a riposo, rosso solo al passaggio del mouse (es. Spegni) */
    .btn-danger-hover:hover {
        background: rgba(217, 83, 79, 0.25);
        border-color: rgba(217, 83, 79, 0.6);
        color: #ffb3b3;
        box-shadow: 0 8px 15px rgba(217, 83, 79, 0.2);
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
    /* Tutti gli elementi della barra hanno la stessa altezza e non vanno mai a capo */
    .top-bar > * {
        flex: 0 0 auto;
        height: 44px;
        box-sizing: border-box;
    }
    .top-bar > .modern-input {
        flex: 1 1 auto; /* La ricerca prende lo spazio che resta */
        min-width: 120px;
    }
    .top-bar > .modern-btn,
    .top-bar > div > .modern-btn {
        height: 44px;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
    #category-label-id {
        align-items: center;
        max-width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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

    /* Quando lo schermo scende sotto gli 950px di larghezza... */
    .platform-mobile .btn-text { display: none !important; }
    .platform-mobile .btn-icon { margin-right: 0 !important; font-size: 18px; }
    
    .platform-mobile .modern-btn { 
        padding: 10px 12px !important;
        min-width: 40px;
        display: flex; 
        justify-content: center; 
        align-items: center;
    }
    
    .platform-mobile .top-bar > *,
    .platform-mobile .top-bar > .modern-btn,
    .platform-mobile .top-bar > div > .modern-btn { height: 40px; }

    .platform-mobile .top-bar { 
        width: 96%; 
        gap: 6px; 
        top: calc(15px + env(safe-area-inset-top, 0px)) !important; 
        justify-content: space-between;
    }
    
    /* Barra di ricerca collassabile ad icona su Mobile (Stato di riposo) */
    .platform-mobile .modern-input { 
        padding: 10px 0 !important; 
        font-size: 12px; 
        max-width: 40px !important; /* Si contrae occupando pochissimo spazio */
        text-align: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* Espansione della barra di ricerca mobile quando viene cliccata/focalizzata */
    .platform-mobile .modern-input:focus {
        max-width: 130px !important; /* Si allarga per permettere la scrittura */
        padding: 10px 15px !important;
        text-align: left;
        cursor: text;
    }
    
    /* Label Categoria estesa per mobile (Stato di riposo) */
    .platform-mobile #category-label-id { 
        max-width: 130px !important; /* Aumentato da 90px a 130px grazie allo spazio recuperato */
        white-space: nowrap !important; 
        overflow: hidden !important; 
        text-overflow: ellipsis !important;
        padding: 10px 12px !important;
        font-size: 11px !important;
        transition: max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; /* Transizione fluida */
    }
    
    /* Quando l'utente sta cercando, la label si contrae automaticamente per fargli spazio */
    .platform-mobile .top-bar:focus-within #category-label-id {
        max-width: 70px !important;
    }

    .platform-mobile #ui-container-id {
        padding: 0 10px !important;
        left: 0 !important;
        width: 100vw !important;
        max-width: 100vw !important;
        box-sizing: border-box !important;
        justify-content: space-between !important;
    }
    
    .platform-mobile #ui-container-id > div {
        gap: 6px !important;
    }

    .platform-mobile #ui-container-id .modern-btn {
        padding: 8px 10px !important;
        min-width: 36px !important;
    }

    /* Consente la selezione del testo all'interno dei contenitori del lettore */
    #viewer, #pdf-container, .epub-container, .epub-view {
        -webkit-user-select: text !important;
        user-select: text !important;
    }

    /* Stile unificato per i crediti inferiori su Desktop */
    #credits-footer {
        position: absolute;
        bottom: 8px; /* Posizionato sotto la linea dei pulsanti */
        left: 50%;
        transform: translateX(-50%);
        font-size: 11px;
        color: rgba(255, 255, 255, 0.4); /* Colore tenue e non distratto */
        text-align: center;
        white-space: nowrap; /* Forza la visualizzazione su un'unica riga */
        z-index: 50; /* Sotto lo z-index dei bottoni (1000) ma sopra il canvas 3D */
        font-family: 'Segoe UI', system-ui, sans-serif;
        pointer-events: none; /* I tocchi passano attraverso il testo alla scena 3D */
    }
    
    #credits-footer a {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: underline;
        pointer-events: auto; /* Riattiva i clic solo sul collegamento ipertestuale */
    }

    /* Adattamento super-compatto specifico per Mobile Nativo */
    .platform-mobile #credits-footer {
        bottom: calc(2px + env(safe-area-inset-bottom, 0px)) !important; /* Quasi a contatto con il bordo */
        font-size: 9px !important; /* Carattere leggermente ridotto per schermi piccoli */
        opacity: 0.8;
    }

`;
document.head.appendChild(styleStyle);


// --- COSTRUZIONE MENU SUPERIORE ---
const topBar = document.createElement('div');
topBar.className = 'top-bar';
topBar.style.width = '95%'; 
topBar.style.maxWidth = '1000px'; 
document.body.appendChild(topBar);

// 1. Etichetta Categoria Attuale
const categoryLabel = document.createElement('div');
categoryLabel.id = 'category-label-id';
categoryLabel.className = 'glass-effect';
categoryLabel.style.padding = '0 20px';
categoryLabel.style.borderRadius = '50px';
categoryLabel.style.fontSize = '14px';
categoryLabel.style.fontWeight = '600';
categoryLabel.style.display = 'none';
topBar.appendChild(categoryLabel);


// 2. Bottone per Gestire la Mensola intera
const manageCatBtn = document.createElement('button');
manageCatBtn.innerHTML = t('manageShelf');
manageCatBtn.title = t('manageShelfTooltip');
manageCatBtn.className = 'glass-effect modern-btn';
manageCatBtn.style.padding = '0 15px';
manageCatBtn.style.display = 'none';
topBar.appendChild(manageCatBtn);

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = t('searchPlaceholder');
searchInput.className = 'glass-effect modern-input';
topBar.appendChild(searchInput);

const uploadLabel = document.createElement('label');
uploadLabel.innerText = t('uploadBtn');
uploadLabel.className = 'glass-effect modern-btn';
uploadLabel.htmlFor = 'file-upload';
topBar.appendChild(uploadLabel);

uploadLabel.classList.add('btn-primary'); // Unica azione principale con colore d'accento

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'file-upload';
fileInput.accept = '.epub, .pdf';
fileInput.multiple = true;
topBar.appendChild(fileInput);

// --- BOTTONE SPEGNIMENTO SERVER ---
const shutdownBtn = document.createElement('button');
shutdownBtn.innerHTML = '🛑 ' + t('shutdownBtn'); 
shutdownBtn.className = 'glass-effect modern-btn';
shutdownBtn.style.padding = '0 15px';
shutdownBtn.title = t('shutdownTooltip');
shutdownBtn.classList.add('btn-danger-hover'); // Neutro, diventa rosso solo al passaggio del mouse


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

// Aggiungiamo il bottone alla barra in alto solo se NON siamo su dispositivo mobile nativo
if (!isMobilePlatform()) {
    topBar.appendChild(shutdownBtn);
}

// --- PULSANTE CAMBIO LINGUA CON MENU A TENDINA ---
const savedLang = localStorage.getItem('KoreShelf_lang') || 'it';

// Dizionario delle lingue disponibili
const availableLangs = {
    it: { icon: '🇮🇹', text: 'IT' },
    en: { icon: '🇬🇧', text: 'EN' },
    es: { icon: '🇪🇸', text: 'ES' },
    fr: { icon: '🇫🇷', text: 'FR' },
    de: { icon: '🇩🇪', text: 'DE' }
};

// 1. Contenitore relativo per posizionare il menu a tendina
const langContainer = document.createElement('div');
langContainer.style.position = 'relative';
langContainer.style.display = 'inline-block';

// 2. Bottone Principale
const langBtn = document.createElement('button');
const currentLangData = availableLangs[savedLang] || availableLangs['it'];
langBtn.innerHTML = `<span class="btn-icon">${currentLangData.icon}</span><span class="btn-text">${currentLangData.text}</span>`;
langBtn.className = 'glass-effect modern-btn';
langBtn.style.padding = '0 15px';
langBtn.style.fontWeight = 'bold';
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

// --- MESSAGGIO LIBRERIA VUOTA ---
// --- MESSAGGIO LIBRERIA VUOTA (con upload + ricerca Amazon) ---
const emptyLibraryHint = document.createElement('div');
emptyLibraryHint.id = 'empty-library-hint';
emptyLibraryHint.className = 'glass-effect';
Object.assign(emptyLibraryHint.style, {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    padding: '40px', borderRadius: '30px', textAlign: 'center', fontSize: '18px',
    lineHeight: '1.6', maxWidth: '440px', width: 'calc(100% - 40px)', boxSizing: 'border-box',
    zIndex: '50', display: 'none', flexDirection: 'column', gap: '18px'
});

const emptyMsg = document.createElement('p');
emptyMsg.style.margin = '0';

const emptyUploadBtn = document.createElement('button');
emptyUploadBtn.className = 'glass-effect modern-btn';
emptyUploadBtn.style.cssText = 'padding:12px 20px;font-weight:bold;cursor:pointer;';
emptyUploadBtn.addEventListener('click', () => fileInput.click());

const emptyDivider = document.createElement('div');
emptyDivider.style.cssText = 'font-size:14px;opacity:0.7;';

const emptySearchRow = document.createElement('div');
emptySearchRow.style.cssText = 'display:flex;gap:8px;';

const emptySearchInput = document.createElement('input');
emptySearchInput.type = 'text';
emptySearchInput.style.cssText = 'flex:1;min-width:0;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.1);color:inherit;font-size:15px;';

const emptySearchBtn = document.createElement('button');
emptySearchBtn.className = 'glass-effect modern-btn';
emptySearchBtn.style.cssText = 'padding:10px 16px;font-weight:bold;cursor:pointer;white-space:nowrap;';

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

function searchOnAmazon() {
    const query = emptySearchInput.value.trim();
    if (!query) return emptySearchInput.focus();
    openAmazonSearch(query);
}

emptySearchBtn.addEventListener('click', searchOnAmazon);
emptySearchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchOnAmazon(); });

emptySearchRow.append(emptySearchInput, emptySearchBtn);
emptyLibraryHint.append(emptyMsg, emptyUploadBtn, emptyDivider, emptySearchRow);
document.body.appendChild(emptyLibraryHint);

// --- BOTTONE DONAZIONE PAYPAL ---
const donateBtn = document.createElement('a');

donateBtn.href = 'https://paypal.me/GabrieleTrovato1?locale.x=en_US&country.x=IT'; 
donateBtn.target = '_blank'; 
donateBtn.className = 'glass-effect modern-btn';
donateBtn.style.textDecoration = 'none';


donateBtn.style.position = 'relative'; 
donateBtn.style.zIndex = '1000';
donateBtn.style.padding = '12px 15px';
donateBtn.style.whiteSpace = 'nowrap'; 
// Stile neutro come gli altri pulsanti: l'icona ☕ basta a distinguerlo

// Aggiungiamo il bottone al BODY invece che alla topBar
document.body.appendChild(donateBtn);

// --- GESTIONE BOTTONE HELP ---
const helpBtn = document.getElementById('help-btn');
if (helpBtn) {
    // Reset totale (Uccidiamo qualsiasi vecchia regola ereditata dal CSS)
    helpBtn.style.position = 'static'; 
    helpBtn.style.border = '';    // Bordo standard del vetro invece di quello più marcato
    helpBtn.style.boxShadow = ''; // Ombra standard dei pulsanti
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
uiContainer.id = 'ui-container-id';
uiContainer.style.position = 'absolute';
uiContainer.style.bottom = isMobilePlatform() 
    ? 'calc(15px + env(safe-area-inset-bottom, 0px))' 
    : '40px';
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

const infoBtn = document.createElement('button');
infoBtn.innerHTML = '<span class="btn-icon">👁️</span><span class="btn-text">' + t('showSynopsis') + '</span>';
infoBtn.className = 'glass-effect modern-btn';
centerUiGroup.appendChild(infoBtn);

// 3. Bottone per Assegnare la Categoria al Libro
const assignCatBtn = document.createElement('button');
assignCatBtn.innerHTML = t('assignCategory');
assignCatBtn.className = 'more-menu-item';

const deleteBookBtn = document.createElement('button');
deleteBookBtn.innerHTML = t('deleteBook');
deleteBookBtn.className = 'more-menu-item danger'; // Rosso: azione distruttiva

const editMetadataBtn = document.createElement('button');
// Puoi aggiungere la traduzione in i18n, per ora usiamo un testo fisso con fallback
editMetadataBtn.innerHTML = t('editMetadata') || '✏️ Modifica'; 
editMetadataBtn.className = 'more-menu-item';

// --- MENU "⋯": raccoglie le azioni meno frequenti (Elimina in fondo, separata) ---
const moreWrap = document.createElement('div');
moreWrap.className = 'more-wrap';

const moreBtn = document.createElement('button');
moreBtn.className = 'glass-effect modern-btn';
moreBtn.innerHTML = '<span class="btn-icon" style="margin-right:0;font-size:18px;line-height:1;">⋯</span>';
moreBtn.style.padding = '12px 18px';
moreBtn.setAttribute('aria-haspopup', 'menu');
moreBtn.setAttribute('aria-expanded', 'false');

const moreMenu = document.createElement('div');
moreMenu.className = 'more-menu glass-effect';
moreMenu.setAttribute('role', 'menu');

const moreSeparator = document.createElement('div');
moreSeparator.className = 'more-menu-separator';

[assignCatBtn, editMetadataBtn].forEach(btn => btn.setAttribute('role', 'menuitem'));
deleteBookBtn.setAttribute('role', 'menuitem');
moreMenu.append(assignCatBtn, editMetadataBtn, moreSeparator, deleteBookBtn);
moreWrap.append(moreBtn, moreMenu);
centerUiGroup.appendChild(moreWrap);

function setMoreMenuOpen(open) {
    moreMenu.classList.toggle('open', open);
    moreBtn.setAttribute('aria-expanded', String(open));
}
moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMoreMenuOpen(!moreMenu.classList.contains('open'));
});
// Dopo aver scelto una voce il menu si chiude (l'azione della voce parte prima)
moreMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.closest('.more-menu-item')) setMoreMenuOpen(false);
});
window.addEventListener('click', () => setMoreMenuOpen(false));
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMoreMenuOpen(false); });


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
        const newSpineTex = createSpineTexture(updatedData.title, updatedData.author, activeBook.userData.thickness);
        if (activeBook.material[1].map) activeBook.material[1].map.dispose(); // Libera la texture precedente
        activeBook.material[1].map = newSpineTex;
        activeBook.material[1].needsUpdate = true;

        // 4. HOT-SWAP DELLA COPERTINA FRONTALE
        if (updatedData.coverPath) {
            // Se c'è un'immagine reale, la scarichiamo e la applichiamo subito
            textureLoader.load(getSafeBookPath(updatedData.coverPath), (tex) => {
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
            redrawBackCover(activeBook);
        }
    });
};

// --- CREAZIONE CREDITI INFERIORI ---
const creditsFooter = document.createElement('div');
creditsFooter.id = 'credits-footer';
creditsFooter.innerHTML = `${t('credits')} <a href="https://github.com/GabrieleTrovato01" target="_blank">GabrieleTrovato01</a>`;
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
        
        saveBtn.innerText = '⏳...';
        saveBtn.disabled = true;

        try {
            const result = await BookService.assignCategory(activeBook.userData.id, newTag);
            if (result.success) {
                location.reload(); // Ricarica per spostare il libro fisicamente sulla nuova mensola
            } else {
                alert(result.message);
                saveBtn.innerText = t('saveBtn');
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

    window.addEventListener('touchmove', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
}, { passive: false }); 

    // Focus automatico sull'input
    setTimeout(() => catInput.focus(), 100);
};

// --- LOGICA DEL BOTTONE ELIMINA LIBRO ---
deleteBookBtn.onclick = async () => {
    if (booksArray.length === 0) return;
    const activeBook = booksArray[currentIndex];
    
    const confirmMessage = t('deleteConfirm')
        .replace('{title}', activeBook.userData.title);
    // Popup di sistema per evitare click accidentali
    const isConfirmed = confirm(confirmMessage);
    
    if (isConfirmed) {
        deleteBookBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">...</span>';
        deleteBookBtn.disabled = true;

        try {
             const result = await BookService.deleteBook(activeBook.userData.id);
            
            if (result.success) {
                // Ricarichiamo la pagina per ricostruire la libreria senza il libro eliminato
                location.reload(); 
            } else {
                alert(result.message);
                deleteBookBtn.innerHTML = '<span class="btn-icon">🗑️</span><span class="btn-text">' + t('deleteBook') + '</span>';
                deleteBookBtn.disabled = false;
            }
        } catch (e) {
            console.error(e);
            alert(t('serverError'));
            deleteBookBtn.innerHTML = '<span class="btn-icon">🗑️</span><span class="btn-text">' + t('deleteBook') + '</span>';
            deleteBookBtn.disabled = false;
        }
    }
};

// --- LOGICA DEL BOTTONE GESTISCI CATEGORIA (Intera Mensola) ---
manageCatBtn.onclick = () => {
    if (booksArray.length === 0) return;
    const activeCategory = booksArray[currentIndex].userData.category;
    
    openCategoryManager(activeCategory, booksArray);
};

// --- COSTRUZIONE FRECCE LATERALI ---
const leftArrow = document.createElement('button');
leftArrow.innerHTML = '&#10094;'; // Simbolo freccia sinistra
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
rightArrow.innerHTML = '&#10095;'; // Simbolo freccia destra
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
        if (typeof infoBtn !== 'undefined') {
            infoBtn.innerHTML = '<span class="btn-icon">👁️</span><span class="btn-text">' + t('showSynopsis') + '</span>';
        }
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
                
                categoryLabel.style.display = 'none';
                manageCatBtn.style.display = 'none';
                // Aggiorniamo l'interfaccia 2D
                manageCatBtn.style.display = 'none'; 
                uiContainer.style.opacity = '0'; 
                uiContainer.style.display = 'none';
                
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
            categoryLabel.style.display = 'inline-flex';
            manageCatBtn.style.display = 'inline-flex';

            uiContainer.style.display = 'flex';
            uiContainer.style.opacity = '1';
            leftArrow.style.opacity = '1';
            rightArrow.style.opacity = '1';
            manageCatBtn.style.display = 'inline-flex';
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
        if (typeof infoBtn !== 'undefined') {
            infoBtn.innerHTML = '<span class="btn-icon">👁️</span><span class="btn-text">' + t('showSynopsis') + '</span>';
        }
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
        ? '<span class="btn-icon">📖</span><span class="btn-text">' + (t('showCover') || 'Copertina') + '</span>' 
        : '<span class="btn-icon">👁️</span><span class="btn-text">' + t('showSynopsis') + '</span>';
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
    link.textContent = '🔍 ' + t('amazonSuggestion').replace('{q}', query);
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
           const matches = await BookService.searchBooks(query);

            // Se il database ha trovato qualcosa...
            if (matches && matches.length > 0) {
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
                        manageCatBtn.style.display = 'inline-flex';
                    }
                    
                    if (typeof infoBtn !== 'undefined') {
                        infoBtn.innerHTML = '<span class="btn-icon">👁️</span><span class="btn-text">' + t('showSynopsis') + '</span>';
                    }
                    
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

// --- GESTIONE UPLOAD MULTIPLO ---
fileInput.addEventListener('change', async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    // Blocchiamo temporaneamente la barra di ricerca per evitare problemi durante l'upload
    searchInput.disabled = true;

    let successCount = 0;
    let duplicateCount = 0;
    let errorCount = 0;

    // Manda i file in coda, uno dopo l'altro
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Aggiorniamo il testo del bottone per mostrare il progresso
        uploadLabel.innerHTML = `<span class="btn-icon">⏳</span><span class="btn-text">${t('uploadingStatus')} ${i + 1}/${files.length}...</span>`;
        console.log(`Caricamento ${i + 1} di ${files.length}: ${file.name}...`);
        
        const formData = new FormData();
        formData.append('ebook', file); 

        try {
            // Aspettiamo che il server finisca QUESTO libro prima di passare al prossimo
            const result = await BookService.uploadBook(file);
            
            
            if (result.success) {
                successCount++;
            } else if (result.message && result.message.includes('già presente')) {
                duplicateCount++;
            } else {
                errorCount++;
            }
        } catch (error) {
            console.error("Errore di rete con", file.name);
            errorCount++;
        }
    }

    // Finito il ciclo, diamo il resoconto!
    let finalMessage = `${t('uploadComplete')}\n✅ ${t('added')}: ${successCount}`;
    if (duplicateCount > 0) finalMessage += `\n🛑 ${t('duplicates')}: ${duplicateCount}`;
    if (errorCount > 0) finalMessage += `\n❌ ${t('errors')}: ${errorCount}`;
    
    alert(finalMessage);

    // Puliamo e ripristiniamo l'interfaccia
    fileInput.value = '';
    uploadLabel.innerHTML = '<span class="btn-icon">📤</span><span class="btn-text">' + t('uploadBtn') + '</span>';
    searchInput.disabled = false;

    // Ricarichiamo la pagina per posizionare i nuovi libri sullo scaffale 3D!
    location.reload(); 
});

// --- 3. GENERATORI DI TEXTURE ---
// --- DORSO DEL LIBRO ---
// La canvas ha le stesse proporzioni del dorso reale (spessore × altezza), così il testo
// non viene schiacciato sui libri sottili. Titolo in alto, autore in fondo, come sui dorsi veri.
function createSpineTexture(title, author, thickness = 0.35) {
    const SPINE_HEIGHT_PX = 2048;
    const BOOK_HEIGHT = 3.0; // Deve corrispondere a bookHeight dei libri 3D
    const W = Math.round(THREE.MathUtils.clamp(SPINE_HEIGHT_PX * (thickness / BOOK_HEIGHT), 64, 768));
    const H = SPINE_HEIGHT_PX;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const SERIF = "Georgia, 'Times New Roman', serif";
    const GOLD = '#d4af37';

    // Sfondo scuro con una leggera sfumatura laterale, per dare volume al dorso
    const bg = ctx.createLinearGradient(0, 0, W, 0);
    bg.addColorStop(0, '#151515');
    bg.addColorStop(0.5, '#262626');
    bg.addColorStop(1, '#151515');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Due sottili fasce dorate vicino alle estremità, come sui dorsi rilegati
    ctx.fillStyle = GOLD;
    const band = THREE.MathUtils.clamp(W * 0.03, 3, 8);
    [70, 70 + band * 3, H - 70 - band, H - 70 - band * 4].forEach(yBand => ctx.fillRect(0, yBand, W, band));

    // Da qui in poi disegniamo ruotati: l'asse x corre lungo il dorso, dall'alto verso il basso
    ctx.translate(W / 2, H / 2);
    ctx.rotate(Math.PI / 2);
    ctx.textBaseline = 'middle';

    const lengthStart = -H / 2 + 150; // Dopo le fasce in alto
    const lengthEnd = H / 2 - 150;    // Prima delle fasce in basso
    const usableLength = lengthEnd - lengthStart;

    // Riduce il font finché il testo non entra nello spazio dato
    const fitFont = (text, style, startSize, minSize, maxLength) => {
        let size = startSize;
        ctx.font = `${style} ${size}px ${SERIF}`;
        while (ctx.measureText(text).width > maxLength && size > minSize) {
            size -= 2;
            ctx.font = `${style} ${size}px ${SERIF}`;
        }
        return size;
    };

    // Tronca con i puntini se, anche alla dimensione minima, il testo non entra
    const fitText = (text, maxLength) => {
        if (ctx.measureText(text).width <= maxLength) return text;
        let cut = text;
        while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxLength) cut = cut.slice(0, -1).trimEnd();
        return `${cut}…`;
    };

    const hasAuthor = Boolean(author && author.trim());
    const titleLength = hasAuthor ? usableLength * 0.66 : usableLength;
    const authorLength = usableLength * 0.28;

    // Titolo: avorio, serif in grassetto, allineato in alto
    if (title) {
        fitFont(title, 'bold', Math.min(W * 0.5, 88), Math.max(16, Math.min(W * 0.22, 36)), titleLength);
        ctx.fillStyle = '#f3ead8';
        ctx.textAlign = 'left';
        ctx.fillText(fitText(title, titleLength), lengthStart, 0);
    }

    // Autore: avorio attenuato, corsivo, allineato in fondo
    if (hasAuthor) {
        fitFont(author, 'italic', Math.min(W * 0.36, 60), Math.max(14, Math.min(W * 0.18, 28)), authorLength);
        ctx.fillStyle = 'rgba(243, 234, 216, 0.72)';
        ctx.textAlign = 'right';
        ctx.fillText(fitText(author, authorLength), lengthEnd, 0);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Testo nitido anche visto di sbieco
    return texture;
}

// --- RETRO DEL LIBRO ---
// Disegna il retro con struttura: categoria, titolo, autore, trama (con dimensione adattiva) e voto.
// scale = 1 per tutti i libri (leggero in memoria), 2 solo per il libro di cui si sta guardando il retro.
function createBackCoverTexture(description, tags, rating, info = {}, scale = 1) {
    const S = scale;
    const W = 512 * S;
    const H = 768 * S;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const SERIF = "Georgia, 'Times New Roman', serif";
    const SANS = "'Segoe UI', system-ui, sans-serif";
    const GOLD = '#d4af37';
    const IVORY = '#f3ead8';

    // Sfondo con una leggera sfumatura verticale
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#262626');
    bg.addColorStop(1, '#191919');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Cornice dorata sottile
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2 * S;
    ctx.strokeRect(16 * S, 16 * S, W - 32 * S, H - 32 * S);

    const padX = 44 * S;
    const contentW = W - padX * 2;
    const centerX = W / 2;

    // Divide un testo in righe che stanno nella larghezza data (gestisce anche parole lunghissime)
    const wrap = (text, maxWidth) => {
        const words = text.split(/\s+/).filter(Boolean);
        const lines = [];
        let line = '';
        for (const word of words) {
            const test = line ? `${line} ${word}` : word;
            if (ctx.measureText(test).width <= maxWidth) {
                line = test;
            } else {
                if (line) lines.push(line);
                line = word;
                while (ctx.measureText(line).width > maxWidth && line.length > 1) {
                    let cut = line.length - 1;
                    while (cut > 1 && ctx.measureText(line.slice(0, cut)).width > maxWidth) cut--;
                    lines.push(line.slice(0, cut));
                    line = line.slice(cut);
                }
            }
        }
        if (line) lines.push(line);
        return lines;
    };

    // Tronca le righe al numero massimo, chiudendo l'ultima con i puntini
    const clampLines = (lines, maxLines, maxWidth) => {
        if (lines.length <= maxLines) return lines;
        const kept = lines.slice(0, maxLines);
        let last = kept[maxLines - 1];
        while (last.length > 0 && ctx.measureText(`${last}…`).width > maxWidth) {
            last = last.slice(0, -1).trimEnd();
        }
        kept[maxLines - 1] = `${last}…`;
        return kept;
    };

    let y = 58 * S;

    // 1. Categoria (piccola etichetta dorata)
    if (tags && tags.length > 0 && tags[0]) {
        const category = tags[0] === 'Senza Categoria' ? t('uncategorized') : tags[0];
        ctx.fillStyle = GOLD;
        ctx.font = `600 ${13 * S}px ${SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        const label = clampLines(wrap(category.toUpperCase(), contentW), 1, contentW)[0];
        ctx.fillText(label, centerX, y);
        y += 34 * S;
    } else {
        y += 10 * S;
    }

    // 2. Titolo (al massimo 2 righe)
    if (info.title) {
        ctx.fillStyle = IVORY;
        ctx.font = `bold ${26 * S}px ${SERIF}`;
        ctx.textAlign = 'center';
        const titleLines = clampLines(wrap(info.title, contentW), 2, contentW);
        titleLines.forEach(l => { ctx.fillText(l, centerX, y); y += 32 * S; });
    }

    // 3. Autore
    if (info.author) {
        ctx.fillStyle = 'rgba(243, 234, 216, 0.7)';
        ctx.font = `italic ${18 * S}px ${SERIF}`;
        ctx.textAlign = 'center';
        const authorLine = clampLines(wrap(info.author, contentW), 1, contentW)[0];
        ctx.fillText(authorLine, centerX, y);
        y += 22 * S;
    }

    // 4. Separatore dorato corto
    if (info.title || info.author || (tags && tags.length > 0)) {
        y += 6 * S;
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 1.5 * S;
        ctx.beginPath();
        ctx.moveTo(centerX - 40 * S, y);
        ctx.lineTo(centerX + 40 * S, y);
        ctx.stroke();
        y += 22 * S;
    }

    // Spazio riservato in fondo alle stelle (solo se c'è un voto)
    const hasRating = rating && rating > 0;
    const bottomLimit = H - (hasRating ? 96 : 48) * S;

    // 5. Trama: sceglie la dimensione più grande che entra nello spazio, poi la centra in verticale
    if (description) {
        const decoder = document.createElement('textarea');
        decoder.innerHTML = description.replace(/<[^>]*>?/gm, ' ');
        const cleanDesc = decoder.value.replace(/\s+/g, ' ').trim();

        const available = bottomLimit - y;
        let fontSize = 22;
        let lines = [];
        let lineHeight = 0;
        for (fontSize = 22; fontSize >= 14; fontSize--) {
            ctx.font = `${fontSize * S}px ${SERIF}`;
            lineHeight = fontSize * 1.45 * S;
            lines = wrap(cleanDesc, contentW);
            if (lines.length * lineHeight <= available) break;
        }
        // Se non entra neanche alla dimensione minima, tronchiamo con i puntini
        const maxLines = Math.max(1, Math.floor(available / lineHeight));
        lines = clampLines(lines, maxLines, contentW);

        const blockHeight = lines.length * lineHeight;
        let textY = y + Math.max(0, (available - blockHeight) / 2) + fontSize * S;

        ctx.fillStyle = '#e8e2d6';
        ctx.textAlign = 'left';
        lines.forEach(l => { ctx.fillText(l, padX, textY); textY += lineHeight; });
    }

    // 6. Voto in stelle, fisso in basso
    if (hasRating) {
        ctx.textAlign = 'center';
        ctx.font = `${34 * S}px ${SANS}`;
        let starsText = '';
        for (let s = 1; s <= 5; s++) starsText += s <= rating ? '★' : '☆';
        ctx.fillStyle = GOLD;
        ctx.fillText(starsText.split('').join(' '), centerX, H - 50 * S);
    }

    return new THREE.CanvasTexture(canvas);
}

// Il libro di cui si sta guardando il retro usa la texture ad alta risoluzione;
// tutti gli altri restano a risoluzione normale per non occupare troppa memoria video.
let hiResBackBook = null;

function redrawBackCover(book) {
    const backMesh = book.children.find(child => child.name === "backCover_mesh");
    if (!backMesh) return;
    const d = backMesh.userData;
    const oldTex = backMesh.material.map;
    backMesh.material.map = createBackCoverTexture(
        d.description, d.tags, d.rating,
        { title: d.title, author: d.author },
        book === hiResBackBook ? 2 : 1
    );
    backMesh.material.needsUpdate = true;
    if (oldTex) oldTex.dispose(); // Libera la memoria della texture precedente
}

function setHiResBackBook(book) {
    if (hiResBackBook === book) return;
    const previous = hiResBackBook;
    hiResBackBook = book;
    if (previous) redrawBackCover(previous);
    if (book) redrawBackCover(book);
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
async function loadBooks() {
    try {
        const booksData = await BookService.getAllBooks();

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

                const MAX_PAGES = 1000;
                const effectivePages = Math.min(pages, MAX_PAGES);

                const bookThickness = Math.max(0.1, effectivePages * 0.001); 

                const geometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookThickness);
                const spineTexture = createSpineTexture(bookData.title, bookData.author, bookThickness);
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
                const planeMat = new THREE.MeshStandardMaterial({ map: createBackCoverTexture(bookData.description, bookData.tags, bookData.rating, { title: bookData.title, author: bookData.author }), roughness: 0.8 });
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
        }
        
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
                    const tex = await loadTextureAsync(getSafeBookPath(mesh.userData.coverPath));
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
                    const tex = await loadTextureAsync(getSafeBookPath(mesh.userData.coverPath));
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
            console.log(`${t('allTexturesLoaded')}`);
        })();

    } catch (e) { console.error(e); }
}

function updateCarousel() {
    if (booksArray.length === 0) return;

     if (isViewingBoard) {
        categoryLabel.style.display = 'none';
        manageCatBtn.style.display = 'none';
    } else {
        categoryLabel.style.display = 'inline-flex';
        manageCatBtn.style.display = 'inline-flex';
    }
    
    const activeBook = booksArray[currentIndex];
    const activeCategory = activeBook.userData.category;

    // Retro ad alta risoluzione solo mentre lo si sta guardando
    setHiResBackBook(isShowingBack ? activeBook : null);

    const isUncategorized = (activeCategory === 'Senza Categoria');

    const displayCategory = isUncategorized 
        ? t('uncategorized') 
        : activeCategory;

    categoryLabel.innerText = `${t('shelfTitlePrefix')}${displayCategory}`;

    categoryLabel.style.display = 'inline-flex'; 
    manageCatBtn.style.display = 'inline-flex'; // Mostriamo anche il bottoncino
    categoryLabel.innerText = `📁 ${displayCategory}`;
    categoryLabel.title = displayCategory; // Nome completo se viene troncato

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
    title.innerText = bookData.title || t('unknownTitle');
    title.style.marginTop = '0';
    title.style.marginBottom = '10px';
    title.style.color = '#d4af37';
    modal.appendChild(title);

    const author = document.createElement('h4');
    author.innerText = `${t('authorLabel')} ${bookData.author || t('unknownAuthor')}`;
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
    if (document.getElementById('category-manager-overlay')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') return;
    if (document.getElementById('help-modal-overlay')) return;
    if (document.getElementById('metadata-manager-overlay')) return;
    if (document.getElementById('highlights-manager-overlay')) return;

    if (event.target.closest('button, input, label, a')) return;

    // Catturiamo la posizione iniziale del tocco
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerEndX = event.clientX; // Inizializza uguali per evitare calcoli errati
    pointerEndY = event.clientY;
    isDragging = true;
});

window.addEventListener('pointerup', (event) => {
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay && readerOverlay.style.display !== 'none') return;
    if (document.getElementById('category-manager-overlay')) return;
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

    // Calcoliamo lo spostamento su entrambi gli assi
    const deltaX = pointerStartX - pointerEndX;
    const deltaY = pointerStartY - pointerEndY;

    // 1. SWIPE ORIZZONTALE (Cambio Libro - tolleranza minima 50px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) changeBook(1); 
        else changeBook(-1);           
    } 
    // 2. SWIPE VERTICALE (Cambio Mensola e accesso alla Bacheca - tolleranza minima 50px)
    else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
            changeShelf(-1); // Swipe verso l'alto con il dito -> Scendi alla mensola sotto
        } else {
            changeShelf(1);  // Swipe verso il basso con il dito -> Sali alla mensola sopra (o accedi alla bacheca)
        }
    } 
    // 3. EVENTO TAP / CLICK PURO (Nessun trascinamento significativo)
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
                    infoBtn.innerHTML = '<span class="btn-icon">👁️</span><span class="btn-text">' + t('showSynopsis') + '</span>';
                }
                updateCarousel();
                return; 
            }
            if (originalMesh.name === "backCover_mesh") {
                window.showFullPlotModal(bookObj.userData);
                return; 
            }
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
            uiContainer.style.display = 'none';
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
                    document.getElementById('viewer').style.display = 'none';
                    document.getElementById('pdf-container').style.display = 'flex'; 
                    window.openPdfReader(bookPath, activeBook.userData.id);
                } else {
                    document.getElementById('pdf-container').style.display = 'none'; 
                    document.getElementById('viewer').style.display = 'block';
                    window.openReader(bookPath, activeBook.userData.id);
                }
            }, 400);
        }
    }
});

// Aggiungiamo il supporto alla ROTELLINA DEL MOUSE e al TRACKPAD
let scrollTimeout = null; 
window.addEventListener('wheel', (event) => {
    if (document.getElementById('category-manager-overlay')) return;
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

    if (document.getElementById('category-manager-overlay')) return;
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
    // Gestione cursore sopra copertina
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(libraryGroup.children, true);
    
    if (intersects.length > 0 && intersects[0].object.name === "backCover_mesh") {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'auto';
    }

    // TRACCIAMENTO CONTINUO MOBILE: Aggiorna costantemente la posizione del dito durante il movimento
    if (isDragging) {
        pointerEndX = event.clientX;
        pointerEndY = event.clientY;
    }
});


// Quando il lettore viene chiuso, ripristiniamo la vista 3D
window.addEventListener('readerClosed', () => {
    // Rendi l'interfaccia 3D visibile
    document.querySelector('.top-bar').style.opacity = '1';
    uiContainer.style.display = 'flex';
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
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY, 0.05);
    // Spostiamo anche la luce per mantenere le ombre perfette!
    const targetCameraZ = (isMobilePlatform() && window.innerWidth < window.innerHeight) ? 5.5 : 3.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraZ, 0.05);
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

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 7. CONTROLLO AGGIORNAMENTI GITHUB ---
const CURRENT_VERSION = "v3.0.0"; 
const GITHUB_API_URL = "https://api.github.com/repos/GabrieleTrovato01/KoreShelf/releases/latest";

async function checkForUpdates() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const latestVersion = data.tag_name;

        if (latestVersion && latestVersion !== CURRENT_VERSION) {
            showUpdateNotification(latestVersion, data.html_url);
        }
    } catch (error) {
        console.error("Errore nel controllo aggiornamenti:", error);
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
    let booksData = [];
    try {
        booksData = await BookService.getAllBooks();
    } catch(e) {
        return;
    }

    // 3. Filtra solo i PDF che NON hanno ancora una copertina
    const pdfsMissingCover = booksData.filter(b => 
        b.epubPath && b.epubPath.toLowerCase().endsWith('.pdf') && !b.coverPath
    );

    if (pdfsMissingCover.length === 0) return;

    console.log(t('logGeneratePdfCovers', { count: pdfsMissingCover.length }));

    // Assicuriamoci che il worker di pdf.js sia configurato
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
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
                // Su mobile la copertina generata viene gestita localmente
                if (!isMobilePlatform()) {
                    const formData = new FormData();
                    formData.append('cover', blob, `cover_${book.id}.jpg`);
                    
                    const uploadRes = await fetch(`/api/books/${book.id}/cover`, {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (uploadRes.ok) {
                        const result = await uploadRes.json();
                        const mesh = booksArray.find(b => b.userData.id === book.id);
                        if (mesh) {
                            const newUrl = getSafeBookPath(result.coverPath);
                            const tex = await libLoader.loadTexture(newUrl);
                            mesh.material[4].map = tex;
                            mesh.material[4].color.setHex(0xffffff);
                            mesh.material[4].needsUpdate = true;
                        }
                    }
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
        " onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">✖</button>
    `;

    document.body.appendChild(banner);

    document.getElementById('close-update-banner').addEventListener('click', () => {
        banner.style.opacity = '0';
        banner.style.transform = 'translateX(-50%) translateY(-20px)';
        banner.style.transition = 'all 0.4s ease';
        setTimeout(() => banner.remove(), 400);
    });
}
async function reloadLibrary() {
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

    // 3. Ricostruisci la libreria aggiornata
    await loadBooks();
}

// --- AVVIO DELL'APPLICAZIONE ---

async function startApp() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    
    // Recuperiamo la lingua salvata per i testi di caricamento
    const savedLang = localStorage.getItem('KoreShelf_lang') || 'it';

        // Testi mostrati prima che le traduzioni siano caricate (t() non è ancora disponibile)
    const bootTexts = {
        it: { language: 'Caricamento lingua...', error: 'Errore durante l\'avvio' },
        en: { language: 'Loading language...', error: 'Startup error' },
        es: { language: 'Cargando idioma...', error: 'Error al iniciar' },
        fr: { language: 'Chargement de la langue...', error: 'Erreur au démarrage' },
        de: { language: 'Sprache wird geladen...', error: 'Fehler beim Start' }
    };
    const boot = bootTexts[savedLang] || bootTexts.it;


    try {
        // sync della lingua con il server.
        fetch('/api/sync-language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lang: savedLang })
        }).catch(e => {});

        // 1. Carica le traduzioni dal server
        if (loadingText) {
            loadingText.innerText = boot.language;
        }
        await initI18n(); 

        // 2. Traduci l'interfaccia statica
        translateStaticHTML();

        if (typeof window.translateReaderUI === 'function') {
            window.translateReaderUI();
        }

        // 3. Carica i libri
        if (loadingText) {
            loadingText.innerText = t('loadingShelves');
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
        if (loadingText) loadingText.innerText = boot.error;
    }
}

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

// --- ASCOLTO SALVATAGGIO RECENSIONI IN TEMPO REALE (Aggiorna le stelline sul retro del libro 3D) ---
window.addEventListener('onBookReviewSaved', (e) => {
    const { bookId, rating, review } = e.detail;
    
    // 1. Trova l'oggetto 3D del libro corrispondente nella libreria corrente
    const activeBook = booksArray.find(b => b.userData.id === bookId);
    
    if (activeBook) {
        console.log(`✨ [3D Hot-Swap] Aggiornamento stelle recensione per: "${activeBook.userData.title}"`);
        
        // 2. Aggiorna i dati in memoria dell'oggetto 3D
        activeBook.userData.rating = rating;
        activeBook.userData.review = review;

        // 3. Trova la mesh del retro copertina e rigenera la sua texture al volo
        const backMesh = activeBook.children.find(child => child.name === "backCover_mesh");
        if (backMesh) {
            backMesh.userData.rating = rating;
            backMesh.userData.review = review;
            
            // Rigenera la texture piatta includendo le nuove stelle dorate lucide
            redrawBackCover(activeBook);
        }
    }
});