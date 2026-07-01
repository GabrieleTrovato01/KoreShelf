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
    
    // Filtriamo i libri con sottolineature
    filteredBooks = booksData.filter(b => b.highlights && b.highlights.length > 0);
    
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

    modalBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
            <h3 style="margin: 0; font-family: sans-serif; color: #d4af37; font-size: 19px;">📝 ${t('manageHighlightsTitle') || 'Gestione Sottolineature'}</h3>
            <button id="close-hl-modal" style="background: none; border: none; color: white; font-size: 28px; cursor: pointer; opacity: 0.6;">&times;</button>
        </div>
        <h4 style="margin-top: -5px; margin-bottom: 25px; color: #4da6ff; font-family: sans-serif; font-size: 16px;">${book.title}</h4>
        
        <div id="hl-items-wrapper" style="display: flex; flex-direction: column; gap: 14px;">
            ${book.highlights.map((hl, index) => `
                <div id="hl-card-${index}" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 12px; display: flex; flex-direction: column; gap: 12px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-style: italic; line-height: 1.6; color: #e5e5e5; font-size: 14.5px;">"${hl.text}"</p>
                    <div style="display: flex; justify-content: flex-end;">
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
                    book.highlights = book.highlights.filter(h => h.cfi !== cfiCode);

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