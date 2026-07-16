import Dexie from 'dexie';

// Inizializza il database IndexedDB nel browser/device mobile
export const db = new Dexie('KoreShelfDB');

// Definiamo lo schema. Dexie indicizza solo i campi su cui faremo ricerche (es. id, title, tags)
db.version(1).stores({
    books: 'id, title, author, progress, *tags' // l'asterisco indica un array multi-indice
});

// Helper per leggere tutti i libri
export async function getAllBooks() {
    return await db.books.toArray();
}

// Helper per salvare/aggiornare un libro (sostituisce l'upsert del server)
export async function upsertBook(book) {
    // IndexedDB accetta oggetti nativi, non serve convertire array in stringhe JSON
    await db.books.put({
        id: book.id,
        title: book.title,
        author: book.author || 'Autore Sconosciuto',
        description: book.description || null,
        coverPath: book.coverPath || null, // conterrà il percorso del file nativo o un Base64
        epubPath: book.epubPath || null,   // conterrà il percorso del file nativo
        pageCount: book.pageCount || 350,
        progress: book.progress || 0,
        rating: book.rating || 0,
        review: book.review || null,
        tags: Array.isArray(book.tags) ? book.tags : [],
        highlights: Array.isArray(book.highlights) ? book.highlights : []
    });
}

// Helper per eliminare un libro
export async function deleteBookFromDb(id) {
    await db.books.delete(id);
}

// Helper per la ricerca avanzata
export async function searchBooks(query) {
    if (!query) return await getAllBooks();
    const lowerQuery = query.toLowerCase();
    
    // Filtro avanzato sul database locale
    return await db.books.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(lowerQuery);
        const authorMatch = book.author.toLowerCase().includes(lowerQuery);
        const tagMatch = book.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        return titleMatch || authorMatch || tagMatch;
    }).toArray();
}