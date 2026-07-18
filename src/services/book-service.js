import { isMobilePlatform } from './platform.js';
import { db, getAllBooks, upsertBook, deleteBookFromDb, searchBooks } from './db.js';
import { fileToBase64, saveEbookFile, saveCoverFile, getFileURL, deletePhysicalFiles } from './storage.js';
import { extractBookMetadata } from './metadata-extractor.js';
import { processCoverImage } from './image-processor.js';
import { t } from '../i18n.js';

// Helper di sistema per intercettare qualsiasi traduzione della categoria di default.
// Se un libro corrisponde a uno di questi termini, il suo tag viene salvato vuoto [] 
// in modo da essere risolto dinamicamente in base alla lingua attiva in tempo reale.
function isSystemUncategorized(categoryName) {
    if (!categoryName) return true;
    const lower = categoryName.trim().toLowerCase();
    const systemKeys = [
        'senza categoria', 
        'uncategorized', 
        'sin categoría', 
        'sans catégorie', 
        'ohne kategorie',
        'sin categoria',
        'sans categorie',
        'uncategorised'
    ];
    return systemKeys.includes(lower) || lower === t('uncategorized').toLowerCase();
}

export const BookService = {
    
    // 1. LEGGE TUTTI I LIBRI
    async getAllBooks() {
        if (isMobilePlatform()) {
            console.log("📱 [Mobile] Caricamento libri da IndexedDB locale...");
            const localBooks = await getAllBooks();
            
            // Per ogni libro su mobile, dobbiamo assicurarci che i percorsi interni (file://)
            // siano convertiti in URL sicuri per la WebView
            for (let book of localBooks) {
                if (book.epubPath) book.epubPath = await getFileURL(book.epubPath);
                if (book.coverPath) book.coverPath = await getFileURL(book.coverPath);
            }
            return localBooks;
        } else {
            console.log("💻 [Desktop/Browser] Richiesta libri al server locale...");
            const res = await fetch('/api/books');
            return await res.json();
        }
    },
     async searchBooks(query) {
        if (isMobilePlatform()) {
            console.log(`📱 [Mobile] Esecuzione ricerca locale per: "${query}"`);
            const localMatches = await searchBooks(query);
            
            // Convertiamo i percorsi nativi in URL sicuri per la WebView mobile
            for (let book of localMatches) {
                if (book.epubPath) book.epubPath = await getFileURL(book.epubPath);
                if (book.coverPath) book.coverPath = await getFileURL(book.coverPath);
            }
            return localMatches;
        } else {
            console.log(`💻 [Desktop] Invio richiesta di ricerca al server Express...`);
            const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
            return await res.json();
        }
    },

    // 2. COORDINATORE DI IMPORTAZIONE (UPLOAD)
    async uploadBook(file) {
        if (isMobilePlatform()) {
            console.log(`📱 [Mobile] Elaborazione locale offline del file: ${file.name}`);
            
            // A. Estrazione metadati lato client (Fase 3)
            const metadata = await extractBookMetadata(file);
            
            const timestamp = Date.now();
            const bookId = `book_${timestamp}`;
            const fileExt = file.name.split('.').pop().toLowerCase();
            
            // B. Ottimizzazione immagine copertina con Canvas (Fase 4)
            let finalCoverPath = null;
            if (metadata.coverBase64) {
                try {
                    const optimizedCoverBase64 = await processCoverImage(metadata.coverBase64);
                    const coverFileName = `${bookId}.jpg`;
                    // Salvataggio fisico copertina sul dispositivo (Fase 2)
                    await saveCoverFile(coverFileName, optimizedCoverBase64);
                    finalCoverPath = `covers/${coverFileName}`;
                } catch (err) {
                    console.warn("Risoluzione copertina fallita, si procederà senza copertina", err);
                }
            }

            // C. Salvataggio fisico del file ebook (EPUB o PDF) sul dispositivo (Fase 2)
            const ebookBase64 = await fileToBase64(file);
            const ebookFileName = `${bookId}.${fileExt}`;
            await saveEbookFile(ebookFileName, ebookBase64);
            const finalEbookPath = `ebooks/${ebookFileName}`;

            // D. Creazione dell'oggetto libro nativo
            const newBook = {
                id: bookId,
                title: metadata.title,
                author: metadata.author,
                description: metadata.description,
                coverPath: finalCoverPath,
                epubPath: finalEbookPath,
                pageCount: metadata.pageCount,
                progress: 0,
                rating: 0,
                review: null,
                tags: [],
                highlights: []
            };

            // E. Scrittura nel database locale IndexedDB (Fase 1)
            await upsertBook(newBook);
            
            return { success: true, message: t('successUpload') };
        } else {
            console.log("💻 [Desktop/Browser] Invio file tramite Multipart FormData...");
            const formData = new FormData();
            formData.append('ebook', file);
            
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            return await res.json();
        }
    },

    // 3. AGGIORNA IL PROGRESSO DI LETTURA
    async updateProgress(bookId, progress) {
        if (isMobilePlatform()) {
            const books = await getAllBooks();
            const book = books.find(b => b.id === bookId);
            if (book) {
                book.progress = progress;
                await upsertBook(book);
            }
            return { success: true };
        } else {
            const res = await fetch(`/api/books/${bookId}/progress`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progress })
            });
            return await res.json();
        }
    },

    // 4. ELIMINA UN LIBRO FISICAMENTE E DAL DB
    async deleteBook(bookId) {
        if (isMobilePlatform()) {
            console.log(`📱 [Mobile] Rimozione libro ${bookId}...`);
            const books = await getAllBooks();
            const book = books.find(b => b.id === bookId);
            
            if (book) {
                // Rimuove i file fisici dal dispositivo (EPUB/PDF e la JPG)
                await deletePhysicalFiles(book.epubPath, book.coverPath);
                // Rimuove le informazioni dal database
                await deleteBookFromDb(bookId);
                return { success: true, message: t('successDelete') };
            }
            return { success: false, message: 'Libro non trovato.' };
        } else {
            const res = await fetch(`/api/books/${bookId}`, {
                method: 'DELETE'
            });
            return await res.json();
        }
    },

    // 5. SALVA LA RECENSIONE
    async saveReview(bookId, rating, reviewText) {
        if (isMobilePlatform()) {
            const books = await getAllBooks();
            const book = books.find(b => b.id === bookId);
            if (book) {
                book.rating = rating;
                book.review = reviewText;
                await upsertBook(book);
                return { success: true };
            }
            return { success: false };
        } else {
            const res = await fetch(`/api/books/${bookId}/review`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, reviewText })
            });
            return await res.json();
        }
    },

    // 6. GESTIONE HIGHLIGHTS (Aggiungi)
    async addHighlight(bookId, cfi, text) {
        if (isMobilePlatform()) {
            const books = await getAllBooks();
            const book = books.find(b => b.id === bookId);
            if (book) {
                if (!Array.isArray(book.highlights)) book.highlights = [];
                book.highlights.push({ cfi, text, date: Date.now() });
                await upsertBook(book);
                return { success: true };
            }
            return { success: false };
        } else {
            const res = await fetch(`/api/books/${bookId}/highlights`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cfi, text })
            });
            return await res.json();
        }
    },

    // 7. GESTIONE HIGHLIGHTS (Rimuovi)
    async deleteHighlight(bookId, cfi) {
        if (isMobilePlatform()) {
            const books = await getAllBooks();
            const book = books.find(b => b.id === bookId);
            if (book) {
                if (Array.isArray(book.highlights)) {
                    book.highlights = book.highlights.filter(hl => hl.cfi !== cfi);
                    await upsertBook(book);
                }
                return { success: true };
            }
            return { success: false };
        } else {
            const res = await fetch(`/api/books/${bookId}/highlights`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cfi })
            });
            return await res.json();
        }
    },
    // 8. ASSEGNA CATEGORIA (Prepara i tag in IndexedDB su Mobile o tramite Express su Desktop)
    async assignCategory(bookId, categoryName) {
        const isDefault = isSystemUncategorized(categoryName);

        if (isMobilePlatform()) {
            console.log(`📱 [Mobile] Assegnazione categoria locale per il libro ${bookId}: "${categoryName}"`);
            const books = await getAllBooks();
            const book = books.find(b => b.id === bookId);
            
            if (book) {
                if (isDefault) {
                    book.tags = []; // Salviamo vuoto su IndexedDB
                } else {
                    if (!Array.isArray(book.tags)) book.tags = [];
                    book.tags = book.tags.filter(t => t.toLowerCase() !== categoryName.toLowerCase());
                    book.tags.unshift(categoryName.trim());
                }
                await upsertBook(book);
                return { success: true };
            }
            return { success: false, message: 'Libro non trovato.' };
        } else {
            console.log(`💻 [Desktop] Invio richiesta di categoria al server Express...`);
            const res = await fetch(`/api/books/${bookId}/tags`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Se è la categoria di default, mandiamo una stringa vuota al server Express per azzerare il tag
                body: JSON.stringify({ tag: isDefault ? "" : categoryName })
            });
            return await res.json();
        }
    },
    // 9. AGGIORNA INTERA CATEGORIA (Rinomina o elimina una mensola intera)
    async updateCategory(oldName, newName, action) {
        if (isMobilePlatform()) {
            console.log(`📱 [Mobile] Aggiornamento categoria locale "${oldName}" -> azione: ${action}, nuovo nome: ${newName}`);
            const books = await getAllBooks();
            
            for (let book of books) {
                // Se la categoria principale corrisponde a quella selezionata
                if (book.tags && book.tags.length > 0 && book.tags[0] === oldName) {
                    if (action === 'rename' && newName) {
                        book.tags[0] = newName.trim();
                        await upsertBook(book);
                    } else if (action === 'delete') {
                        // Elimina la categoria rimuovendo il primo elemento dai tag
                        book.tags.shift(); 
                        await upsertBook(book);
                    }
                }
            }
            return { success: true };
        } else {
            console.log(`💻 [Desktop] Invio modifica categoria globale al server Express...`);
            const res = await fetch('/api/categories', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldName, newName, action })
            });
            return await res.json();
        }
    },

    // 10. SPOSTAMENTO MASSIVO LIBRI (Trasferisce o importa più libri contemporaneamente)
    async bulkUpdateTags(bookIds, newTag) {
        if (isMobilePlatform()) {
            console.log(`📱 [Mobile] Spostamento massivo di ${bookIds.length} libri verso la mensola: "${newTag}"`);
            const books = await getAllBooks();
            
            for (let book of books) {
                if (bookIds.includes(book.id)) {
                    if (!book.tags) book.tags = [];
                    // Rimuove eventuali vecchi duplicati case-insensitive dello stesso tag
                    book.tags = book.tags.filter(t => t.toLowerCase() !== newTag.toLowerCase());
                    // Posiziona il nuovo tag in cima come categoria primaria
                    book.tags.unshift(newTag.trim());
                    await upsertBook(book);
                }
            }
            return { success: true };
        } else {
            console.log(`💻 [Desktop] Invio spostamento massivo dei libri al server Express...`);
            const res = await fetch('/api/books/bulk-tags', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookIds, newTag })
            });
            return await res.json();
        }
    },
    // 11. MODIFICA METADATI (Aggiorna i campi su IndexedDB e ottimizza/salva la nuova copertina su Mobile)
    async editBookMetadata(formData) {
        if (isMobilePlatform()) {
            const id = formData.get('id');
            const title = formData.get('title');
            const author = formData.get('author');
            const category = formData.get('category');
            const description = formData.get('description');
            const coverFile = formData.get('cover'); // Oggetto File (Blob) o null

            console.log(`📱 [Mobile] Modifica metadati locale per il libro: ${id}`);
            const books = await getAllBooks();
            const book = books.find(b => b.id === id);
            
            if (book) {
                // Aggiorniamo i campi testuali
                book.title = title || book.title;
                book.author = author || book.author;
                book.description = description || book.description;

                // Gestione Categoria (il primo tag all'indice 0 rappresenta la Categoria)
                if (isDefault){
                    book.tags = []; // Salviamo vuoto su IndexedDB per la categoria di default
                } else {
                    if (!book.tags) book.tags = [];
                    if (book.tags.length > 0) {
                        book.tags[0] = category.trim();
                    } else {
                        book.tags.push(category.trim());
                    }
                }

                // Gestione della nuova Copertina (se l'utente ne ha caricata una nuova)
                if (coverFile) {
                    try {
                        const timestamp = Date.now();
                        const newCoverName = `cover_${id}_${timestamp}.jpg`;
                        
                        // Convertiamo il file in base64 e lo ritagliamo/comprimiamo tramite Canvas (Fase 4)
                        const base64 = await fileToBase64(coverFile);
                        const optimizedBase64 = await processCoverImage(base64);
                        
                        // Scriviamo fisicamente il file sul disco del telefono (Fase 2)
                        await saveCoverFile(newCoverName, optimizedBase64);

                        // Eliminiamo la vecchia copertina per pulizia disco
                        if (book.coverPath) {
                            await deletePhysicalFiles(null, book.coverPath);
                        }

                        book.coverPath = `covers/${newCoverName}`;
                    } catch (coverErr) {
                        console.error("Errore salvataggio nuova copertina su disco:", coverErr);
                    }
                }

                // Salviamo le modifiche nel database IndexedDB
                await upsertBook(book);
                
                // Convertiamo i percorsi per renderli leggibili dal carosello 3D
                const updatedBook = { ...book };
                if (updatedBook.epubPath) updatedBook.epubPath = await getFileURL(updatedBook.epubPath);
                if (updatedBook.coverPath) updatedBook.coverPath = await getFileURL(updatedBook.coverPath);

                return { success: true, updatedBook };
            }
            return { success: false, message: 'Libro non trovato.' };
        } else {
            console.log(`💻 [Desktop] Invio richiesta modifica metadati al server Express...`);
            const res = await fetch('/api/books/edit', {
                method: 'POST',
                body: formData
            });
            return await res.json();
        }
    }
};