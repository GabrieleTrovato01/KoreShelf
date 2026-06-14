import { thickness } from 'three/src/nodes/core/PropertyNode.js';
import { openCategoryManager } from './category-manager.js';
import { LibraryLoader } from './loader-optimizer.js';
import { t, initI18n, setLanguage } from './i18n.js';
import {openHelpModal} from './help-modal.js';
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
        shutdownBtn.innerHTML = '⏻ ' + t('shutdownBtn');
        shutdownBtn.title = t('shutdownTooltip');
    }
    
    if (closeReaderBtn) closeReaderBtn.innerHTML = `&times; ${t('closeReader')}`;
    
    if (themeBtn) {
        const isDark = localStorage.getItem('readerDarkMode') === 'true';
        themeBtn.innerText = isDark 
            ? (lang === 'it' ? '☀️ Modalità Chiara' : '☀️ Light Mode')
            : (lang === 'it' ? '🌙 Modalità Scura' : '🌙 Dark Mode');
    }

    document.title = lang === 'it' ? "KoreShelf - Libreria 3D" : "KoreShelf - 3D Library";

    // 2. AGGIORNAMENTO TESTI BOTTONI (La vera soluzione al tuo problema!)
    // Dato che la lingua ora è caricata, applichiamo i testi corretti ai bottoni creati in alto
    if (typeof manageCatBtn !== 'undefined') {
        manageCatBtn.innerHTML = t('manageShelf');
        manageCatBtn.title = t('manageShelfTooltip');
    }
    if (typeof searchInput !== 'undefined') searchInput.placeholder = t('searchPlaceholder');
    if (typeof uploadLabel !== 'undefined') uploadLabel.innerText = t('uploadBtn');
    
    // Bottoni in basso
    if (typeof infoBtn !== 'undefined') infoBtn.innerText = t('showSynopsis');
    if (typeof exportAIBtn !== 'undefined') exportAIBtn.innerHTML = t('exportAI');
    if (typeof assignCatBtn !== 'undefined') assignCatBtn.innerHTML = t('assignCategory');
    if (typeof deleteBookBtn !== 'undefined') deleteBookBtn.innerHTML = t('deleteBook');
    
    if (typeof creditsFooter !== 'undefined') {
        creditsFooter.innerHTML = `${t('credits')} <a href="https://github.com/GabrieleTrovato01" target="_blank">GabrieleTrovato01</a>`;
    }
    if (typeof donateBtn !== 'undefined') donateBtn.innerText = t('donateBtn');
    if (emptyLibraryHint) emptyLibraryHint.innerText = t('emptyLibraryMessage');
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
categoryLabel.className = 'glass-effect';
categoryLabel.style.padding = '12px 20px';
categoryLabel.style.borderRadius = '50px';
categoryLabel.style.fontSize = '13px';
categoryLabel.style.fontWeight = 'bold';
categoryLabel.style.letterSpacing = '1px';
categoryLabel.style.display = 'none';
topBar.appendChild(categoryLabel);


// 2. Bottone per Gestire la Mensola intera
const manageCatBtn = document.createElement('button');
manageCatBtn.innerHTML = t('manageShelf');
manageCatBtn.title = t('manageShelfTooltip');
manageCatBtn.className = 'glass-effect modern-btn';
manageCatBtn.style.padding = '12px 15px';
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

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'file-upload';
fileInput.accept = '.epub, .pdf';
fileInput.multiple = true;
topBar.appendChild(fileInput);

// --- BOTTONE SPEGNIMENTO SERVER ---
const shutdownBtn = document.createElement('button');
shutdownBtn.innerHTML = '⏻ ' + t('shutdownBtn'); 
shutdownBtn.className = 'glass-effect modern-btn';
shutdownBtn.style.padding = '12px 15px';
shutdownBtn.style.fontWeight = 'bold';
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
topBar.appendChild(shutdownBtn);

// --- PULSANTE CAMBIO LINGUA ---
const langBtn = document.createElement('button');
// Leggiamo la lingua salvata (o 'it' di default) per impostare il testo del bottone
const savedLang = localStorage.getItem('KoreShelf_lang') || 'it';
langBtn.innerText = savedLang === 'it' ? '🇬🇧 EN' : '🇮🇹 IT';
langBtn.className = 'glass-effect modern-btn';
langBtn.style.padding = '12px 15px';
langBtn.style.fontWeight = 'bold';
langBtn.title = savedLang === 'it' ? 'Switch to English' : 'Passa all\'Italiano';

langBtn.onclick = async () => {
    const newLang = savedLang === 'it' ? 'en' : 'it';
    localStorage.setItem('KoreShelf_lang', newLang);
    
    try {
        await fetch('/api/sync-language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lang: newLang })
        });
    } catch(e) {}

    window.location.reload();
};
topBar.appendChild(langBtn);

// --- MESSAGGIO LIBRERIA VUOTA ---
const emptyLibraryHint = document.createElement('div');
emptyLibraryHint.id = 'empty-library-hint';
emptyLibraryHint.className = 'glass-effect';
emptyLibraryHint.style.position = 'fixed';
emptyLibraryHint.style.top = '50%';
emptyLibraryHint.style.left = '50%';
emptyLibraryHint.style.transform = 'translate(-50%, -50%)';
emptyLibraryHint.style.padding = '40px';
emptyLibraryHint.style.borderRadius = '30px';
emptyLibraryHint.style.textAlign = 'center';
emptyLibraryHint.style.fontSize = '18px';
emptyLibraryHint.style.lineHeight = '1.6';
emptyLibraryHint.style.maxWidth = '400px';
emptyLibraryHint.style.zIndex = '50';
emptyLibraryHint.style.display = 'none'; // Nascosto di default
document.body.appendChild(emptyLibraryHint);

// --- BOTTONE DONAZIONE PAYPAL ---
const donateBtn = document.createElement('a');

donateBtn.href = 'https://paypal.me/GabrieleTrovato1?locale.x=en_US&country.x=IT'; 
donateBtn.target = '_blank'; 
donateBtn.className = 'glass-effect modern-btn';
donateBtn.style.textDecoration = 'none';


// --- NUOVO POSIZIONAMENTO ---
donateBtn.style.position = 'fixed';
donateBtn.style.bottom = '50px';
donateBtn.style.left = '20px';
donateBtn.style.zIndex = '1000';// Assicura che sia cliccabile e stia sopra il canvas 3D

// Allineiamo struttura e spaziature
donateBtn.style.padding = '12px 15px';
donateBtn.style.fontWeight = 'bold';
donateBtn.style.whiteSpace = 'nowrap'; 

// Manteniamo la variazione di colore azzurro/blu
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
    helpBtn.onclick = () => {
        openHelpModal(); // Richiama la funzione dal file help-modal.js
    };
}


// --- COSTRUZIONE MENU INFERIORE ---
const uiContainer = document.createElement('div');
uiContainer.style.position = 'absolute';
uiContainer.style.bottom = '40px';
uiContainer.style.left = '50%';
uiContainer.style.transform = 'translateX(-50%)';
uiContainer.style.display = 'flex'; 
uiContainer.style.gap = '15px';     
uiContainer.style.alignItems = 'center';
document.body.appendChild(uiContainer);

const infoBtn = document.createElement('button');
infoBtn.innerText = t('showSynopsis');
infoBtn.className = 'glass-effect modern-btn';
uiContainer.appendChild(infoBtn);

const exportAIBtn = document.createElement('button');
exportAIBtn.innerHTML = t('exportAI');
exportAIBtn.className = 'glass-effect modern-btn';
// Diamo un tocco di colore distintivo per la feature IA (es. un viola/indaco)
uiContainer.appendChild(exportAIBtn);

// 3. Bottone per Assegnare la Categoria al Libro
const assignCatBtn = document.createElement('button');
assignCatBtn.innerHTML = t('assignCategory');
assignCatBtn.className = 'glass-effect modern-btn';
uiContainer.appendChild(assignCatBtn);

const deleteBookBtn = document.createElement('button');
deleteBookBtn.innerHTML = t('deleteBook');
deleteBookBtn.className = 'glass-effect modern-btn';
// Diamo un colore rossastro coerente col design glassmorphism
deleteBookBtn.style.background = 'rgba(255, 50, 50, 0.15)';
deleteBookBtn.style.borderColor = 'rgba(255, 100, 100, 0.3)';
deleteBookBtn.style.color = '#ffb3b3';

// Effetto hover personalizzato (rosso acceso)
deleteBookBtn.onmouseover = () => {
    deleteBookBtn.style.background = 'rgba(255, 50, 50, 0.3)';
    deleteBookBtn.style.transform = 'translateY(-3px)';
    deleteBookBtn.style.boxShadow = '0 8px 15px rgba(255, 0, 0, 0.2)';
};
deleteBookBtn.onmouseout = () => {
    deleteBookBtn.style.background = 'rgba(255, 50, 50, 0.15)';
    deleteBookBtn.style.transform = 'translateY(0px)';
    deleteBookBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
};
uiContainer.appendChild(deleteBookBtn);

// --- CREAZIONE CREDITI INFERIORI ---
const creditsFooter = document.createElement('div');
creditsFooter.id = 'credits-footer';
creditsFooter.innerHTML = `${t('credits')} <a href="https://github.com/GabrieleTrovato01" target="_blank">GabrieleTrovato01</a>`;
document.body.appendChild(creditsFooter);

exportAIBtn.onclick = () => {
    if (booksArray.length === 0) return;
    const activeBook = booksArray[currentIndex];
    
    // Feedback visivo: usiamo lo spinner e specifichiamo il formato MD
    const originalText = exportAIBtn.innerHTML;
    exportAIBtn.innerHTML = t('generatingMD');
    exportAIBtn.disabled = true;

    
    if (typeof showToast === "function") {
        showToast(t('exportToastMessage'), 'info');
    }

    // Chiama la rotta di esportazione
    window.location.href = `/api/books/${activeBook.userData.id}/export-ai`;

    // Ripristiniamo il pulsante dopo 4 secondi
    setTimeout(() => {
        exportAIBtn.innerHTML = originalText;
        exportAIBtn.disabled = false;
    }, 4000);
};

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
deleteBookBtn.onclick = async () => {
    if (booksArray.length === 0) return;
    const activeBook = booksArray[currentIndex];
    
    const confirmMessage = t('deleteConfirm')
        .replace('{title}', activeBook.userData.title);
    // Popup di sistema per evitare click accidentali
    const isConfirmed = confirm(confirmMessage);
    
    if (isConfirmed) {
        deleteBookBtn.innerHTML = '⏳...';
        deleteBookBtn.disabled = true;

        try {
            const response = await fetch(`/api/books/${activeBook.userData.id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            
            if (result.success) {
                // Ricarichiamo la pagina per ricostruire la libreria senza il libro eliminato
                location.reload(); 
            } else {
                alert(result.message);
                deleteBookBtn.innerHTML = t('deleteBook');
                deleteBookBtn.disabled = false;
            }
        } catch (e) {
            console.error(e);
            alert(t('serverError'));
            deleteBookBtn.innerHTML = t('deleteBook');
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
        // VAI ALLA MENSOLA SOPRA: Cerca in avanti il primo libro di una categoria diversa
        for (let i = currentIndex; i < booksArray.length; i++) {
            if (booksArray[i].userData.category !== currentCategory) {
                targetIndex = i;
                break;
            }
        }
    } else { 
        // VAI ALLA MENSOLA SOTTO: Trova l'inizio della mensola precedente
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
    infoBtn.innerText = isShowingBack ? t('showCover') : t('showSynopsis');
    updateCarousel();
};
// --- LOGICA DI RICERCA (Connessa al Database e Debounce) ---
let searchTimeout = null;

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // 1. Annulliamo la ricerca precedente se l'utente sta ancora digitando
    if (searchTimeout) clearTimeout(searchTimeout);
    
    if (!query) return; // Non facciamo query inutili se l'input è vuoto

    // 2. Impostiamo un timer di 400ms. Il server verrà interrogato solo 
    // quando l'utente smette di digitare per quasi mezzo secondo.
    searchTimeout = setTimeout(async () => {
        try {
            // Chiediamo a SQLite i risultati perfetti
            const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
            const matches = await res.json();

            // Se il database ha trovato qualcosa...
            if (matches.length > 0) {
                // Prendiamo l'ID del miglior risultato (il primo)
                const targetBookId = matches[0].id;

                // Cerchiamo a che indice si trova quel libro nel nostro scaffale 3D
                const foundIndex = booksArray.findIndex(book => book.userData.id === targetBookId);

                // Se lo troviamo, facciamo "volare" la telecamera su quel libro!
                if (foundIndex !== -1 && foundIndex !== currentIndex) {
                    currentIndex = foundIndex;
                    isShowingBack = false;
                    
                    if (typeof infoBtn !== 'undefined') infoBtn.innerText = t('showSynopsis');
                    
                    updateCarousel();
                }
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
        uploadLabel.innerText = `${t('uploadingStatus')} ${i + 1}/${files.length}...`;
        console.log(`Caricamento ${i + 1} di ${files.length}: ${file.name}...`);
        
        const formData = new FormData();
        formData.append('ebook', file); 

        try {
            // Aspettiamo che il server finisca QUESTO libro prima di passare al prossimo
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
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
    uploadLabel.innerText = t('uploadBtn');
    searchInput.disabled = false;

    // Ricarichiamo la pagina per posizionare i nuovi libri sullo scaffale 3D!
    location.reload(); 
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
        let starsText = '';
        
        for (let s = 1; s <= 5; s++) {
            starsText += s <= rating ? '★ ' : '☆ ';
        }
        
        ctx.fillStyle = '#d4af37'; // Oro brillante
        // Posizionate sempre a 80px dal fondo, indipendentemente dalla trama
        ctx.fillText(starsText.trim(), canvas.width / 2, canvas.height - 80);
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
async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        const booksData = await response.json();

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
            emptyLibraryHint.style.display = 'block';
            uiContainer.style.display = 'none'; // Nasconde i tasti (Elimina, Trama, etc)
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        } else {
            emptyLibraryHint.style.display = 'none';
            uiContainer.style.display = 'flex';
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'block';
        }

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
    categoryLabel.innerText = `📁 ${activeCategory.toUpperCase()}`;

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
    if (document.getElementById('category-manager-overlay')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') return;
    if (document.getElementById('help-modal-overlay')) return;


    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    isDragging = true;
});

window.addEventListener('pointerup', (event) => {
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay && readerOverlay.style.display !== 'none') return;
    if (document.getElementById('category-manager-overlay')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (document.getElementById('help-modal-overlay')) return;
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
            let obj = intersects[0].object;
            //trama
            if (obj.name === "backCover_mesh") {
                // Mostriamo il modale passandogli i dati salvati
                window.showFullPlotModal(obj.userData);
                return; // Fermiamo qui: il libro non deve aprirsi o girarsi
            }

            while (obj.parent !== libraryGroup) obj = obj.parent;
            
            const clickedIndex = obj.userData.index;

            if (clickedIndex !== currentIndex) {
                currentIndex = clickedIndex;
                isShowingBack = false;
                infoBtn.innerText = t('showSynopsis');
                updateCarousel();
            } else {
                // APERTURA DEL LIBRO
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
                        console.log("📄 Apertura PDF rilevata...");
                        // Puliamo il viewer EPUB per sicurezza
                        document.getElementById('viewer').style.display = 'none';
                        document.getElementById('pdf-container').style.display = 'flex'; 
                        
                        
                        window.openPdfReader(bookPath, activeBook.userData.id);
                    } else {
                        console.log("📚 Apertura EPUB rilevata...");
                        document.getElementById('pdf-container').style.display = 'none'; 
                        document.getElementById('viewer').style.display = 'block';
                        
                        window.openReader(bookPath, activeBook.userData.id);
                    }
                }, 400);
            }
        }
    }
});

// Aggiungiamo il supporto alla ROTELLINA DEL MOUSE e al TRACKPAD
let scrollTimeout = null; 
window.addEventListener('wheel', (event) => {
    if (document.getElementById('category-manager-overlay')) return;
    if (document.getElementById('assign-category-overlay')) return;
    if (document.getElementById('help-modal-overlay')) return;
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
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY, 0.05);
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

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 7. CONTROLLO AGGIORNAMENTI GITHUB ---
const CURRENT_VERSION = "v2.0.4"; 
const GITHUB_API_URL = "https://api.github.com/repos/GabrieleTrovato01/LoreKeeper/releases/latest";

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

        // 2. Traduci l'interfaccia statica (ora che initI18n è fatto, t() funzionerà)
        translateStaticHTML();

        // 3. Carica i libri
        if (loadingText) {
            loadingText.innerText = savedLang === 'it' ? "Allestimento scaffali..." : "Setting up shelves...";
        }
        await loadBooks();

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

startApp();