import fs from 'fs';
import { EPub } from 'epub2';
import pdfParse from 'pdf-parse';

/**
 * Funzione utility: Cerca un ISBN in una stringa di testo, 
 * rimuove i trattini e valida che sia lungo 10 o 13 caratteri.
 */
function extractAndCleanISBN(rawString) {
    if (!rawString || typeof rawString !== 'string') return null;
    
    // Regex universale per ISBN-10 e ISBN-13
    const isbnRegex = /(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]/gi;
    const matches = rawString.match(isbnRegex);
    
    if (matches && matches.length > 0) {
        // Togliamo tutto ciò che non è un numero o la lettera X
        const cleaned = matches[0].replace(/[^0-9X]/gi, '');
        if (cleaned.length === 10 || cleaned.length === 13) {
            return cleaned;
        }
    }
    return null;
}

/**
 * ESTRATTORE EPUB
 * Piano A: Parsing dei metadati XML (.opf)
 * Piano B: Forza bruta sul primo capitolo
 */
async function getIsbnFromEpub(filePath) {
    try {
        // Usa createAsync fornito da epub2
        const epub = await EPub.createAsync(filePath);
        
        // TENTATIVO 1: Lettura pulita dei metadati strutturati
        let isbn = epub.metadata.ISBN || epub.metadata.identifier;
        let cleanIsbn = extractAndCleanISBN(isbn);
        
        if (cleanIsbn) {
            return cleanIsbn;
        }

        // TENTATIVO 2: Fallback sul primo capitolo
        if (epub.flow && epub.flow.length > 0) {
            const firstChapterId = epub.flow[0].id;
            
            // Estraiamo il testo avvolgendo la callback in una Promise
            const text = await new Promise((resolve) => {
                epub.getChapter(firstChapterId, (err, text) => {
                    if (err || !text) resolve('');
                    else resolve(text);
                });
            });

            if (text) {
                return extractAndCleanISBN(text);
            }
        }
        return null;
        
    } catch (error) {
        console.error("Errore lettura EPUB:", error);
        return null;
    }
}

/**
 * ESTRATTORE PDF
 * Piano A: Metadati nascosti del documento
 * Piano B: Forza bruta sulle prime 10 pagine
 */
async function getIsbnFromPdf(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        
        // Leggiamo solo le prime 10 pagine per non fondere la RAM e velocizzare il processo
        const options = { max: 10 }; 
        const data = await pdfParse(dataBuffer, options);
        
        // TENTATIVO 1: Controlliamo se ci sono metadati PDF validi
        if (data.info) {
            // Uniamo i valori dei metadati in un'unica stringa e cerchiamo un ISBN
            const infoString = Object.values(data.info).join(' ');
            const metaIsbn = extractAndCleanISBN(infoString);
            if (metaIsbn) return metaIsbn;
        }

        // TENTATIVO 2: Fallback. Nessun metadato. 
        // Passiamo il testo estratto delle prime 10 pagine al setaccio della Regex
        const textIsbn = extractAndCleanISBN(data.text);
        return textIsbn; 

    } catch (error) {
        console.error("Errore durante l'estrazione dal PDF:", error);
        return null;
    }
}

/**
 * ENTRY POINT PRINCIPALE
 * Questa è la funzione che chiamerai dal tuo server o dal category-manager
 * @param {string} filePath - Il percorso del file nel file system
 * @param {string} extension - Estensione (es: 'epub', 'pdf')
 * @returns {Promise<string|null>} L'ISBN pulito o null
 */
export async function extractISBN(filePath, extension) {
    const ext = extension.toLowerCase().replace('.', '');
    
    if (ext === 'epub') {
        return await getIsbnFromEpub(filePath);
    } else if (ext === 'pdf') {
        return await getIsbnFromPdf(filePath);
    } else {
        console.warn(`Formato ${ext} al momento non supportato per l'estrazione automatica ISBN.`);
        return null;
    }
}