import * as THREE from 'three';
import { t } from './i18n.js';

let boardGroup = new THREE.Group();
let localCamera, localScene;
let filteredBooks = [];
let currentHighestShelfY = 0;

// STATO DEL CAROSELLO
let currentPage = 0;
const POSTITS_PER_PAGE = 5; // Massimo 5 post-it visibili contemporaneamente
let initParams = null ;
let boardInitialized = false;
/**
 * Inizializza la bacheca delle sottolineature
 */
export function initHighlightsBoard(scene, camera, booksData, highestShelfY) {

    initParams = { scene, camera, booksData, highestShelfY };
    localCamera = camera;
    localScene = scene;
    currentHighestShelfY = highestShelfY;
    currentPage = 0; // Reset della pagina ad ogni caricamento/cambio filtro

    // Pulizia
    scene.remove(boardGroup);
    boardGroup = new THREE.Group();
    
    // Filtriamo i libri con sottolineature che hanno effettivamente del testo
    filteredBooks = booksData.filter(b => 
        b.highlights && 
        b.highlights.length > 0 && 
        b.highlights[0].text && 
        b.highlights[0].text.trim() !== ""
    );
    
    if (filteredBooks.length === 0){
        boardInitialized = false;
        return; 
    }

    boardInitialized = true;

    // 1. COSTRUZIONE DELLA BACHECA (Fissa)
    const boardCenterY = highestShelfY + 6.5;
    const boardWidth = 14;
    const boardHeight = 3.2;
    const boardGeometry = new THREE.BoxGeometry(boardWidth, boardHeight, 0.1);
    const boardMaterial = new THREE.MeshStandardMaterial({ 
        color: '#7e5c3a', 
        roughness: 0.9,
        metalness: 0.0
    });
    const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
    boardMesh.position.set(0, boardCenterY, -1.2);
    boardMesh.receiveShadow = true;
    boardMesh.castShadow = true;
    boardGroup.add(boardMesh);

    // Cornice
    const frameGeometry = new THREE.BoxGeometry(boardWidth + 0.4, 0.15, 0.2);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: '#4a3319', roughness: 0.8 });
    const topFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    topFrame.position.set(0, boardCenterY + (boardHeight / 2), -1.15);
    boardGroup.add(topFrame);

    scene.add(boardGroup);

    // Rendering iniziale dei post-it della prima pagina
    renderCurrentPage();
}

function ensureBoardExists() {
    if (!boardInitialized && initParams) {
        // Ricreiamo la bacheca con i parametri salvati
        initHighlightsBoard(
            initParams.scene, 
            initParams.camera, 
            initParams.booksData, 
            initParams.highestShelfY
        );
    }
}

/**
 * Disegna solo i post-it appartenenti alla pagina corrente
 */
function renderCurrentPage() {
    ensureBoardExists();
    // 1. Rimuove solo i vecchi post-it lasciando intatta la bacheca in legno
    const toRemove = [];
    boardGroup.children.forEach(child => {
        if (child.name === "postit_note") toRemove.push(child);
    });
    toRemove.forEach(child => boardGroup.remove(child));

    // 2. Isola i libri della pagina corrente
    const startIdx = currentPage * POSTITS_PER_PAGE;
    const endIdx = Math.min(startIdx + POSTITS_PER_PAGE, filteredBooks.length);
    const pageBooks = filteredBooks.slice(startIdx, endIdx);

    const postItWidth = 1.8;
    const postItHeight = 1.8;
    const margin = 0.4;
    const boardCenterY = currentHighestShelfY + 6.5;
    
    // Centra la fila in base a quanti post-it ci sono in QUESTA pagina
    const totalWidth = pageBooks.length * (postItWidth + margin) - margin;
    let startX = -totalWidth / 2 + postItWidth / 2;

    pageBooks.forEach((book) => {
        const geometry = new THREE.BoxGeometry(postItWidth, postItHeight, 0.01);
        const texture = createPostItTexture(book);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture, 
            roughness: 0.7,
            metalness: 0.0
        });
        
        const postItMesh = new THREE.Mesh(geometry, material);
        postItMesh.position.set(startX, boardCenterY, -1.13);
        postItMesh.name = "postit_note";
        postItMesh.userData = { bookData: book };
        postItMesh.rotation.z = (Math.random() - 0.5) * 0.12;

        boardGroup.add(postItMesh);
        startX += postItWidth + margin;
    });

    // Aggiorna il titolo 2D con l'indicazione della pagina corrente
    updateBoardTitle();
}

/**
 * Naviga alla pagina successiva di post-it
 */
export function nextHighlightsPage() {
    const maxPage = Math.ceil(filteredBooks.length / POSTITS_PER_PAGE) - 1;
    if (currentPage < maxPage) {
        currentPage++;
        renderCurrentPage();
        return true;
    }
    return false;
}

/**
 * Naviga alla pagina precedente di post-it
 */
export function prevHighlightsPage() {
    if (currentPage > 0) {
        currentPage--;
        renderCurrentPage();
        return true;
    }
    return false;
}

/**
 * Aggiorna il testo dell'interfaccia 2D indicando la pagina attuale
 */
export function updateBoardTitle() {
    const categoryLabel = document.getElementById('category-label'); // Verifica l'ID nel tuo HTML (solitamente inserito nel DOM di main.js)
    if (categoryLabel && filteredBooks.length > 0) {
        const maxPage = Math.ceil(filteredBooks.length / POSTITS_PER_PAGE);
        const baseTitle = t('manageHighlightsTitle') || 'BACHECA SOTTOLINEATURE';
        categoryLabel.innerText = `📝 ${baseTitle.toUpperCase()} (${currentPage + 1}/${maxPage})`;
    }
}

// Genera la texture del foglietto Post-it
function createPostItTexture(book) {
    if (!book.highlights || book.highlights.length === 0 || !book.highlights[0].text || book.highlights[0].text.trim() === "") {
        console.warn("Nessuna sottolineatura valida trovata per il libro:", book.title);
        return new THREE.CanvasTexture(document.createElement('canvas'));
    }
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff9ae';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, 25);

    ctx.fillStyle = '#111111';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    let shortTitle = book.title;
    if (shortTitle.length > 20) shortTitle = shortTitle.substring(0, 18) + '...';
    ctx.fillText(shortTitle.toUpperCase(), canvas.width / 2, 70);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 95);
    ctx.lineTo(472, 95);
    ctx.stroke();

    const firstHighlightText = book.highlights[0].text || "";
    ctx.fillStyle = '#333333';
    ctx.font = 'italic 26px Georgia, serif';
    ctx.textAlign = 'left';
    
    const words = firstHighlightText.split(' ');
    let line = '';
    let y = 150;
    const maxWidth = 432;
    const lineHeight = 36;
    const maxBottomY = canvas.height - 80;

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
            ctx.fillText(line, 40, y);
            line = words[n] + ' ';
            y += lineHeight;
            if (y > maxBottomY) {
                ctx.fillText("...", 40, y - lineHeight);
                break;
            }
        } else {
            line = testLine;
        }
    }
    if (y <= maxBottomY) {
        ctx.fillText(line, 40, y);
    }

    ctx.textAlign = 'center';
    if (book.highlights.length > 1) {
        ctx.fillStyle = '#d9534f'; 
        ctx.font = 'bold 24px sans-serif';
        const extraCount = book.highlights.length - 1;
        const msg = t('moreHighlightsHint') || `+${extraCount} altre... (Clicca)`;
        ctx.fillText(msg, canvas.width / 2, canvas.height - 35);
    } else {
        ctx.fillStyle = '#777777';
        ctx.font = '20px sans-serif';
        const msg = t('manageHighlightHint') || 'Clicca per gestire';
        ctx.fillText(msg, canvas.width / 2, canvas.height - 35);
    }

    return new THREE.CanvasTexture(canvas);
}

// Interazione via Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let pointerStartX = 0, pointerStartY = 0;

window.addEventListener('pointerdown', (e) => {
    pointerStartX = e.clientX;
    pointerStartY = e.clientY;
});

window.addEventListener('pointerup', (e) => {
    if (Math.abs(e.clientX - pointerStartX) > 10 || Math.abs(e.clientY - pointerStartY) > 10) return;
    if (document.getElementById('category-manager-overlay') || 
        document.getElementById('assign-category-overlay') || 
        document.getElementById('metadata-manager-overlay') ||
        document.getElementById('help-modal-overlay') ||
        document.getElementById('highlights-manager-overlay') || 
        document.getElementById('share-preview-overlay') ||
        document.getElementById('reader-overlay')?.style.display === 'block') return;

    if (!localCamera || !boardGroup) return;

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, localCamera);
    const intersects = raycaster.intersectObjects(boardGroup.children);

    if (intersects.length > 0) {
        const targetObj = intersects[0].object;
        if (targetObj.name === "postit_note") {
            openHighlightsManagerModal(targetObj.userData.bookData);
        }
    }
});

// --- AGGIORNAMENTO IN TEMPO REALE DELLA BACHECA ---
export function addHighlightLocally(updatedBookData) {
    const existingIndex = filteredBooks.findIndex(b => b.id === updatedBookData.id);
    if (existingIndex !== -1) {
        filteredBooks[existingIndex] = updatedBookData;
    } else {
        filteredBooks.push(updatedBookData);
    }
    renderCurrentPage(); // Ridisegna i post-it immediatamente
}

export function removeHighlightLocally(bookId, cfi) {
    const existingIndex = filteredBooks.findIndex(b => b.id === bookId);
    if (existingIndex !== -1) {
        filteredBooks[existingIndex].highlights = filteredBooks[existingIndex].highlights.filter(h => h.cfi !== cfi);
        
        // Se non ci sono più sottolineature, rimuoviamo il post-it del libro
        if (filteredBooks[existingIndex].highlights.length === 0) {
            filteredBooks.splice(existingIndex, 1);
            // Se la pagina è rimasta vuota, torniamo indietro di una
            if (currentPage > 0 && (currentPage * 5) >= filteredBooks.length) {
                currentPage--;
            }
        }
        renderCurrentPage();
    }
}

// Modale 2D Overlay di gestione
function openHighlightsManagerModal(book) {
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const overlay = document.createElement('div');
    overlay.id = 'highlights-manager-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0', left: '0', width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: '3000',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backdropFilter: 'blur(6px)',
        opacity: '0', transition: 'opacity 0.3s ease'
    });

    const modalBox = document.createElement('div');
    modalBox.className = 'glass-effect custom-scrollbar';
    Object.assign(modalBox.style, {
        background: 'rgba(25, 25, 25, 0.95)',
        padding: '30px', borderRadius: '20px',
        width: '560px', maxWidth: '92%', maxHeight: '80vh',
        overflowY: 'auto', color: 'white', position: 'relative',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 20px 45px rgba(0,0,0,0.6)'
    });

    let safeHighlights = [];
    try {
        if (Array.isArray(book.highlights)) {
            safeHighlights = book.highlights;
        } else if (typeof book.highlights === 'string') {
            safeHighlights = JSON.parse(book.highlights);
        }
    } catch (e) {
        console.warn("Impossibile leggere le sottolineature", e);
    }

    modalBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
            <h3 style="margin: 0; font-family: sans-serif; color: #d4af37; font-size: 19px;">📝 ${t('manageHighlightsTitle') || 'Gestione Sottolineature'}</h3>
            <button id="close-hl-modal" style="background: none; border: none; color: white; font-size: 28px; cursor: pointer; opacity: 0.6;">&times;</button>
        </div>
        <h4 style="margin-top: -5px; margin-bottom: 25px; color: #4da6ff; font-family: sans-serif; font-size: 16px;">${book.title}</h4>
        
        <div id="hl-items-wrapper" style="display: flex; flex-direction: column; gap: 14px;">
            ${safeHighlights.map((hl, index) => `
                <div id="hl-card-${index}" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 12px; display: flex; flex-direction: column; gap: 12px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-style: italic; line-height: 1.6; color: #e5e5e5; font-size: 14.5px;">"${hl.text}"</p>
                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button class="share-specific-hl-btn modern-btn glass-effect" data-cfi="${hl.cfi}" style="padding: 6px 14px; font-size: 11px; background: rgba(77, 166, 255, 0.15); border-color: rgba(77, 166, 255, 0.3); color: #4da6ff;">
                            🔗 ${t('shareQuoteBtn') || 'Condividi'}
                        </button>
                        <button class="delete-specific-hl-btn modern-btn glass-effect" data-cfi="${hl.cfi}" data-card-id="hl-card-${index}" style="padding: 6px 14px; font-size: 11px; background: rgba(217, 83, 79, 0.15); border-color: rgba(217, 83, 79, 0.3); color: #ff9999;">
                            🗑️ ${t('deleteBook') || 'Elimina'}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);
    modalBox.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
    });
    
    requestAnimationFrame(() => overlay.style.opacity = '1');

    const closeForm = () => {
        overlay.style.opacity = '0';
        document.body.style.overflow = originalBodyOverflow;
        setTimeout(() => overlay.remove(), 300);
    };

    document.getElementById('close-hl-modal').onclick = closeForm;
    overlay.addEventListener('pointerdown', (e) => { 
        if (e.target === overlay) {
            e.stopPropagation();
            closeForm();
        }
    });

    // --- LOGICA TASTO CONDIVIDI (Apre l'anteprima) ---
    modalBox.querySelectorAll('.share-specific-hl-btn').forEach(button => {
        button.onclick = async (event) => {
            const btn = event.currentTarget;
            const originalText = btn.innerHTML;
            btn.innerHTML = '⏳...';
            btn.disabled = true;

            const cfiCode = btn.getAttribute('data-cfi');
            const hl = safeHighlights.find(h => h.cfi === cfiCode);
            
            if (hl) {
                await showSharePreview(book, hl.text);
            }
            
            btn.innerHTML = originalText;
            btn.disabled = false;
        };
    });

    // --- LOGICA TASTO ELIMINA ---
    modalBox.querySelectorAll('.delete-specific-hl-btn').forEach(button => {
        button.onclick = async (event) => {
            const confirmMsg = t('removeHighlightConfirm') || 'Vuoi eliminare questa sottolineatura?';
            if (!confirm(confirmMsg)) return;

            const cfiCode = event.currentTarget.getAttribute('data-cfi');
            const cardElementId = event.currentTarget.getAttribute('data-card-id');

            try {
                const response = await fetch(`/api/books/${book.id}/highlights`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cfi: cfiCode })
                });
                const result = await response.json();

                if (result.success) {
                    document.getElementById(cardElementId).remove();
                    book.highlights = safeHighlights.filter(h => h.cfi !== cfiCode);

                    if (book.highlights.length === 0) {
                        closeForm();
                        location.reload();
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
    });
}


/**
 * Crea il Canvas, genera l'immagine dinamicamente in base alle preferenze 
 * e mostra un Modale di Anteprima interattivo con layout affiancato.
 */
async function showSharePreview(book, highlightText) {
    // 0. Iniezione degli stili CSS per i bottoni e i selettori colore circolari
    if (!document.getElementById('ks-preview-styles')) {
        const style = document.createElement('style');
        style.id = 'ks-preview-styles';
        style.innerHTML = `
            .ks-preview-container { display: flex; gap: 25px; flex-direction: row; align-items: stretch; }
            @media (max-width: 700px) { .ks-preview-container { flex-direction: column; } }
            
            .ks-preview-btn {
                flex: 1; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.05); 
                border: 1px solid rgba(255,255,255,0.1); color: #aaa; cursor: pointer; transition: 0.2s;
                font-family: sans-serif; font-size: 13px; font-weight: bold;
            }
            .ks-preview-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
            .ks-preview-btn.active {
                background: rgba(77, 166, 255, 0.15); border-color: rgba(77, 166, 255, 0.4); color: #4da6ff;
            }
            
            .ks-color-picker {
                -webkit-appearance: none; -moz-appearance: none; appearance: none;
                width: 44px; height: 44px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
                padding: 0; background: transparent; cursor: pointer; transition: 0.2s;
            }
            .ks-color-picker:hover { transform: scale(1.05); border-color: rgba(255,255,255,0.5); }
            .ks-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
            .ks-color-picker::-webkit-color-swatch { border: none; border-radius: 50%; }
            .ks-color-picker::-moz-color-swatch { border: none; border-radius: 50%; }
        `;
        document.head.appendChild(style);
    }

    // 1. Creazione Overlay Anteprima
    const previewOverlay = document.createElement('div');
    previewOverlay.id = 'share-preview-overlay'; // <--- AGGIUNTO ID PER BLOCCO RAYCASTER
    Object.assign(previewOverlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.85)', zIndex: '4000',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backdropFilter: 'blur(10px)', opacity: '0', transition: 'opacity 0.3s ease'
    });

    // 2. Costruzione del Box di Anteprima UI
    const previewBox = document.createElement('div');
    previewBox.className = 'glass-effect custom-scrollbar';
    Object.assign(previewBox.style, {
        background: 'rgba(25, 25, 25, 0.95)',
        padding: '25px', borderRadius: '20px',
        width: '800px', maxWidth: '95%', maxHeight: '95vh',
        overflowY: 'auto', textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
        position: 'relative'
    });

    previewBox.innerHTML = `
        <div class="ks-preview-container">
            <!-- Colonna Sinistra: Immagine -->
            <div style="flex: 1.2; display: flex; justify-content: center; align-items: center; background: #080808; border-radius: 12px; overflow: hidden; box-shadow: inset 0 0 15px rgba(0,0,0,0.8); padding: 15px; min-height: 400px;">
                <img id="preview-image" src="" style="max-height: 500px; max-width: 100%; object-fit: contain; border-radius: 6px;">
            </div>
            
            <!-- Colonna Destra: Controlli -->
            <div style="flex: 1; display: flex; flex-direction: column; text-align: left; justify-content: center; padding: 10px 0;">
                <h3 style="margin-top: 0; margin-bottom: 25px; color: #fff; font-family: sans-serif;">🖼️ ${t('previewTitle') || 'Personalizza'}</h3>
                
                <label style="font-size: 12px; color: #aaa; margin-bottom: 8px;">${t('previewFormat') || 'Formato'}</label>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button id="btn-fmt-post" class="ks-preview-btn active">${t('formatPost') || 'Post Quadrato'}</button>
                    <button id="btn-fmt-story" class="ks-preview-btn">${t('formatStory') || 'Storia (9:16)'}</button>
                </div>

                <label style="font-size: 12px; color: #aaa; margin-bottom: 8px;">${t('previewBgStyle') || 'Stile Sfondo'}</label>
                <div style="display: flex; gap: 10px; margin-bottom: 30px;">
                    <button id="btn-bg-blur" class="ks-preview-btn active">${t('bgStyleBlur') || 'Copertina Sfocata'}</button>
                    <button id="btn-bg-solid" class="ks-preview-btn">${t('bgStyleSolid') || 'Tinta Unita'}</button>
                </div>

                <div style="display: flex; gap: 40px; margin-bottom: 35px; justify-content: center;">
                    <div id="wrap-bg-color" style="display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.3; transition: 0.2s;">
                        <label style="font-size: 12px; color: #aaa;">${t('previewBgColor') || 'Sfondo'}</label>
                        <input type="color" id="export-bg-color" class="ks-color-picker" value="#1c2833" disabled>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                        <label style="font-size: 12px; color: #aaa;">${t('previewTextColor') || 'Testo'}</label>
                        <input type="color" id="export-text-color" class="ks-color-picker" value="#ffffff">
                    </div>
                </div>

                <div style="display: flex; gap: 10px; margin-bottom: 10px; margin-top: auto;">
                    <button id="dl-img-btn" class="modern-btn glass-effect" style="flex: 1; padding: 12px; background: rgba(77, 166, 255, 0.15); border: 1px solid rgba(77, 166, 255, 0.4); color: #4da6ff; font-weight: bold; cursor: pointer;">
                        ⬇️ ${t('downloadBtn') || 'Scarica'}
                    </button>
                    <button id="sh-img-btn" class="modern-btn glass-effect" style="flex: 1; padding: 12px; background: rgba(46, 204, 113, 0.15); border: 1px solid rgba(46, 204, 113, 0.4); color: #2ecc71; font-weight: bold; cursor: pointer;">
                        🔗 ${t('shareQuoteBtn') || 'Condividi'}
                    </button>
                </div>
                
                <button id="close-preview-btn" style="background: none; border: none; color: #888; cursor: pointer; font-size: 14px; padding: 10px; margin-top: 5px;">
                    ${t('cancelBtn') || 'Annulla'}
                </button>
            </div>
        </div>
    `;

    // <--- AGGIUNTI BLOCCHI PROPAGAZIONE CLICK --->
    previewOverlay.addEventListener('pointerdown', (e) => e.stopPropagation());
    previewOverlay.addEventListener('pointerup', (e) => e.stopPropagation());
    previewBox.addEventListener('pointerdown', (e) => e.stopPropagation());
    previewBox.addEventListener('pointerup', (e) => e.stopPropagation());

    previewOverlay.appendChild(previewBox);
    document.body.appendChild(previewOverlay);
    requestAnimationFrame(() => previewOverlay.style.opacity = '1');

    // Chiusura Anteprima
    const closePreview = () => {
        previewOverlay.style.opacity = '0';
        setTimeout(() => previewOverlay.remove(), 300);
    };
    document.getElementById('close-preview-btn').onclick = closePreview;

    // 3. Precaricamento della copertina
    let coverImgObj = null;
    if (book.coverPath) {
        try {
            coverImgObj = new Image();
            coverImgObj.crossOrigin = "Anonymous";
            await new Promise((resolve, reject) => {
                coverImgObj.onload = resolve;
                coverImgObj.onerror = reject;
                coverImgObj.src = '/' + book.coverPath;
            });
        } catch (e) {
            console.warn("Impossibile caricare la copertina per il canvas", e);
        }
    }

    // Variabili di stato dell'UI
    let currentFormat = 'post';
    let currentBgStyle = 'blur';

    // Riferimenti UI
    const btnFmtPost = document.getElementById('btn-fmt-post');
    const btnFmtStory = document.getElementById('btn-fmt-story');
    const btnBgBlur = document.getElementById('btn-bg-blur');
    const btnBgSolid = document.getElementById('btn-bg-solid');
    
    const wrapBgColor = document.getElementById('wrap-bg-color');
    const bgColorInput = document.getElementById('export-bg-color');
    const textColorInput = document.getElementById('export-text-color');
    const previewImg = document.getElementById('preview-image');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Gestione Eventi Bottoni Formato
    btnFmtPost.onclick = () => {
        currentFormat = 'post';
        btnFmtPost.classList.add('active');
        btnFmtStory.classList.remove('active');
        generateCanvas();
    };
    btnFmtStory.onclick = () => {
        currentFormat = 'story';
        btnFmtStory.classList.add('active');
        btnFmtPost.classList.remove('active');
        generateCanvas();
    };

    // Gestione Eventi Bottoni Sfondo
    btnBgBlur.onclick = () => {
        currentBgStyle = 'blur';
        btnBgBlur.classList.add('active');
        btnBgSolid.classList.remove('active');
        bgColorInput.disabled = true;
        wrapBgColor.style.opacity = '0.3';
        generateCanvas();
    };
    btnBgSolid.onclick = () => {
        currentBgStyle = 'solid';
        btnBgSolid.classList.add('active');
        btnBgBlur.classList.remove('active');
        bgColorInput.disabled = false;
        wrapBgColor.style.opacity = '1';
        generateCanvas();
    };

    // Gestione Colori
    bgColorInput.addEventListener('input', generateCanvas);
    textColorInput.addEventListener('input', generateCanvas);

    // 4. FUNZIONE DI RENDERING DINAMICO
    function generateCanvas() {
        const bgColor = bgColorInput.value;
        const textColor = textColorInput.value;

        // Imposta dimensioni
        canvas.width = 1080;
        canvas.height = currentFormat === 'story' ? 1920 : 1350;

        // --- SFONDO ---
        if (currentBgStyle === 'blur' && coverImgObj) {
            ctx.save();
            ctx.filter = 'blur(60px) brightness(0.4)';
            const scale = Math.max(canvas.width / coverImgObj.width, canvas.height / coverImgObj.height) * 1.2;
            const x = (canvas.width / 2) - (coverImgObj.width / 2) * scale;
            const y = (canvas.height / 2) - (coverImgObj.height / 2) * scale;
            ctx.drawImage(coverImgObj, x, y, coverImgObj.width * scale, coverImgObj.height * scale);
            ctx.restore();
        } else {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // --- VIRGOLETTE DECORATIVE ---
        ctx.save();
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 0.3; 
        ctx.font = 'bold 180px Georgia, serif';
        ctx.fillText('“', 60, 160);
        ctx.restore();

        // --- TESTO DELLA SOTTOLINEATURA ---
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        
        let cleanText = highlightText.trim();
        const maxWidth = 920;
        const maxTextHeight = currentFormat === 'story' ? 1100 : 450; 
        const words = cleanText.split(' ');
        
        let fontSize = currentFormat === 'story' ? 65 : 55; 
        let lineHeight = fontSize * 1.4;
        let lines = [];

        while (fontSize > 18) {
            ctx.font = `italic ${fontSize}px Georgia, serif`;
            lineHeight = fontSize * 1.4;
            lines = [];
            let currentLine = '';

            for (let n = 0; n < words.length; n++) {
                let testLine = currentLine + words[n] + ' ';
                if (ctx.measureText(testLine).width > maxWidth && n > 0) {
                    lines.push(currentLine);
                    currentLine = words[n] + ' ';
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);

            if (lines.length * lineHeight <= maxTextHeight) {
                break; 
            }
            fontSize -= 2; 
        }

        let totalBlockHeight = lines.length * lineHeight;
        let textY = 220 + Math.max(0, (maxTextHeight - totalBlockHeight) / 2); 

        lines.forEach(line => {
            ctx.fillText(line, 80, textY);
            textY += lineHeight;
        });

        // --- SEZIONE INFERIORE (Copertina e Info Libro) ---
        const bottomY = canvas.height - 80; 
        const coverWidth = 180;
        const coverHeight = 270;
        const coverX = 80;
        const coverY = bottomY - coverHeight;

        if (coverImgObj) {
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
            ctx.drawImage(coverImgObj, coverX, coverY, coverWidth, coverHeight);
            ctx.shadowColor = 'transparent';
        } else {
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(coverX, coverY, coverWidth, coverHeight);
        }

        const textStartX = coverX + coverWidth + 40;
        let infoY = coverY + (coverHeight / 2) - 20;

        ctx.fillStyle = textColor; 
        ctx.font = 'bold 40px sans-serif';
        let displayTitle = book.title.toUpperCase();
        if (ctx.measureText(displayTitle).width > (1080 - textStartX - 40)) {
            displayTitle = displayTitle.substring(0, 30) + "...";
        }
        ctx.fillText(displayTitle, textStartX, infoY);

        ctx.save();
        ctx.fillStyle = textColor;
        ctx.globalAlpha = 0.7;
        ctx.font = '32px sans-serif';
        ctx.fillText(book.author, textStartX, infoY + 50);

        ctx.globalAlpha = 0.3;
        ctx.font = '22px sans-serif';
        ctx.fillText(window.t ? t('shareQuoteBrand') : "Generato con KoreShelf", textStartX, coverY + coverHeight);
        ctx.restore();

        previewImg.src = canvas.toDataURL('image/jpeg', 0.95);
    }

    // Esegue il primo rendering
    generateCanvas();

    // --- AZIONI ---
    document.getElementById('dl-img-btn').onclick = () => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/jpeg', 0.95);
        a.download = `KoreShelf_${book.title.replace(/\s+/g, '_')}_Quote.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    document.getElementById('sh-img-btn').onclick = async () => {
        canvas.toBlob(async (blob) => {
            const file = new File([blob], `KoreShelf_Quote_${Date.now()}.jpg`, { type: 'image/jpeg' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: book.title,
                        text: `"${cleanText}"\n— ${book.author}`
                    });
                } catch (err) {
                    console.warn("Condivisione annullata dall'utente", err);
                }
            } else {
                alert(t('shareNotSupported') || "Il tuo dispositivo/browser non supporta la condivisione nativa. Usa il tasto Scarica!");
            }
        }, 'image/jpeg', 0.95);
    };
}