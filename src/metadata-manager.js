import { t } from './i18n.js';
import { BookService } from './services/book-service.js';

export async function openMetadataManager(selectedBookUserData, onSaveSuccess) {
    // --- Salva lo stato dello scroll e bloccalo ---
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 1. Setup dell'Overlay principale
    const overlay = document.createElement('div');
    overlay.id = 'metadata-manager-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.zIndex = '2000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    // 2. Recuperiamo le categorie ESISTENTI leggendo i libri dal database
    let categories = [];
    try {
        const allBooks = await BookService.getAllBooks();
        categories = [...new Set(allBooks.map(b => (b.tags && b.tags.length > 0) ? b.tags[0] : t('uncategorized')))]
                     .filter(c => c !== t('uncategorized') && c !== 'Senza Categoria');
    } catch (e) {
        console.error("Errore nel caricamento delle categorie", e);
    }

    // 3. Creazione del Box Modale
    const modalBox = document.createElement('div');
    modalBox.className = 'glass-effect custom-scrollbar';
    modalBox.style.background = 'rgba(30, 30, 30, 0.85)';
    modalBox.style.padding = '30px';
    modalBox.style.borderRadius = '20px';
    modalBox.style.maxWidth = '500px';
    modalBox.style.width = '90%';
    modalBox.style.maxHeight = '90vh';
    modalBox.style.overflowY = 'auto';
    modalBox.style.color = 'white';
    modalBox.style.border = '1px solid rgba(255,255,255,0.2)';

    const currentCat = selectedBookUserData.category || t('uncategorized');

    modalBox.innerHTML = `
        <h2 style="margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; font-family: sans-serif;">
            ✏️ ${t('editMetadataTitle') || 'Modifica Metadati'}
        </h2>
        
        <form id="metadata-form" style="display: flex; flex-direction: column; gap: 15px; font-family: sans-serif;">
            
            <div>
                <label style="font-size: 14px; color: #ccc;">${t('editTitle') || 'Titolo'}</label>
                <input type="text" id="meta-title" value="${selectedBookUserData.title || ''}" required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${t('editAuthor') || 'Autore'}</label>
                <input type="text" id="meta-author" value="${selectedBookUserData.author || ''}" required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${t('editCategory') || 'Categoria'}</label>
                
                <input type="text" id="meta-category" value="${currentCat}" 
                    ${categories.length > 0 ? 'list="meta-category-list"' : ''}
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
                
                ${categories.length > 0 ? `
                <datalist id="meta-category-list">
                    ${categories.map(c => `<option value="${c}">`).join('')}
                </datalist>
                ` : ''}
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${t('editDescription') || 'Descrizione'}</label>
                <textarea id="meta-desc" rows="4" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; resize: vertical; box-sizing: border-box;">${selectedBookUserData.description || ''}</textarea>
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc; display: block; margin-bottom: 5px;">${t('editCover') || 'Nuova Copertina (Opzionale)'}</label>
                <input type="file" id="meta-cover" accept="image/png, image/jpeg, image/webp" style="display: none;">
                <label for="meta-cover" id="meta-cover-preview" style="display: block; width: 100%; padding: 12px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.4); background: rgba(0,0,0,0.3); color: #aaa; text-align: center; cursor: pointer; box-sizing: border-box; transition: all 0.3s; font-size: 13px;">
                    ${t('clickToChooseFile') || '📁 Clicca per scegliere un file...'}
                </label>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button type="button" id="meta-cancel-btn" class="modern-btn glass-effect" style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); box-sizing: border-box;">${t('cancelBtn') || 'Annulla'}</button>
                <button type="submit" id="meta-save-btn" class="modern-btn glass-effect" style="flex: 1; background: rgba(100, 200, 100, 0.3); border: 1px solid rgba(100, 200, 100, 0.5); box-sizing: border-box;">${t('saveBtn') || 'Salva'}</button>
            </div>
        </form>
    `;

    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);

    // --- Gestione grafica del file upload ---
    const coverInput = document.getElementById('meta-cover');
    const coverPreview = document.getElementById('meta-cover-preview');
    
    coverPreview.onmouseover = () => coverPreview.style.background = 'rgba(255,255,255,0.1)';
    coverPreview.onmouseout = () => coverPreview.style.background = 'rgba(0,0,0,0.3)';

    coverInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            coverPreview.innerHTML = `🖼️ ${fileName}`;
            coverPreview.style.border = '1px solid rgba(100, 200, 100, 0.5)';
            coverPreview.style.color = '#fff';
            coverPreview.style.background = 'rgba(100, 200, 100, 0.1)';
        } else {
            coverPreview.innerHTML = t('clickToChooseFile') || '📁 Clicca per scegliere un file...';
            coverPreview.style.border = '1px dashed rgba(255,255,255,0.4)';
            coverPreview.style.color = '#aaa';
            coverPreview.style.background = 'rgba(0,0,0,0.3)';
        }
    });

    // --- Blocca la propagazione degli eventi verso il 3D ---
    overlay.addEventListener('wheel', (e) => {
        if (!modalBox.contains(e.target)) e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    overlay.addEventListener('touchmove', (e) => {
        if (!modalBox.contains(e.target)) e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    requestAnimationFrame(() => { overlay.style.opacity = '1'; });

    // --- Gestione Eventi ---
    const closeForm = () => {
        overlay.style.opacity = '0';
        document.body.style.overflow = originalBodyOverflow;
        setTimeout(() => overlay.remove(), 300);
    };

    document.getElementById('meta-cancel-btn').onclick = closeForm;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeForm(); });

    document.getElementById('metadata-form').onsubmit = async (e) => {
        e.preventDefault();
        
        const saveBtn = document.getElementById('meta-save-btn');
        saveBtn.innerText = t('savingBtn') || "⏳...";
        saveBtn.disabled = true;

        const formData = new FormData();
        formData.append('id', selectedBookUserData.id);
        formData.append('title', document.getElementById('meta-title').value);
        formData.append('author', document.getElementById('meta-author').value);
        formData.append('category', document.getElementById('meta-category').value);
        formData.append('description', document.getElementById('meta-desc').value);

        const coverFile = document.getElementById('meta-cover').files[0];
        if (coverFile) {
            formData.append('cover', coverFile);
        }

        try {
            const result = await BookService.editBookMetadata(formData);
            
            if (result.success) {
                closeForm();
                
                // Mantiene il comportamento originale se hai passato una callback
                if (onSaveSuccess) onSaveSuccess(result.updatedBook);
                
                // --- NUOVO: Lancia un evento globale per far aggiornare il 3D ---
                window.dispatchEvent(new CustomEvent('bookMetadataUpdated', {
                    detail: result.updatedBook
                }));

            } else {
                alert(`${t('errorSaving') || 'Errore durante il salvataggio:'} ${result.message}`);
                saveBtn.innerText = t('saveBtn') || 'Salva';
                saveBtn.disabled = false;
            }
        } catch (error) {
            console.error("Errore di rete:", error);
            saveBtn.innerText = t('errorGeneric') || "Errore!";
        }
    };
}