import Dexie from 'dexie';

export const db = new Dexie('KoreShelfDB');
db.version(1).stores({
    books: 'id, title, author, category' // id è la chiave primaria
});

export async function getAllBooksLocal() {
    return await db.books.toArray();
}

export async function upsertBookLocal(bookData) {
    await db.books.put(bookData);
}