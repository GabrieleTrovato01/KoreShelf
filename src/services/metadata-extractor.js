import { t } from '../i18n.js';

/**
 * Funzione principale: riceve un file (EPUB o PDF) e restituisce i metadati puliti
 * @param {File} file - Il file preso dall'input HTML
 * @returns {Promise<Object>} I metadati del libro e l'immagine di copertina in Base64
 */
export async function extractBookMetadata(file) {
    const fileExt = file.name.split('.').pop().toLowerCase();
    const arrayBuffer = await file.arrayBuffer();

    if (fileExt === 'epub') {
        return await parseEpubClient(arrayBuffer, file.name);
    } else if (fileExt === 'pdf') {
        return await parsePdfClient(arrayBuffer, file.name);
    } else {
        throw new Error(t('errFormat') || 'Formato non supportato');
    }
}

/**
 * PARSER EPUB (Sfrutta EpubJS nel browser)
 */
async function parseEpubClient(arrayBuffer, originalFileName) {
    try {
        // Inizializziamo EpubJS passando l'ArrayBuffer del file caricato
        const book = window.ePub(arrayBuffer);
        await book.opened;

        const metadata = book.package.metadata;
        let title = metadata.title ? metadata.title.trim() : '';
        let author = metadata.creator ? metadata.creator.trim() : '';
        let description = metadata.description ? metadata.description.replace(/<[^>]*>?/gm, '').trim() : '';

        // Fallback sul nome del file se i metadati sono corrotti o assenti (come nel server)
        if (!title || title.toLowerCase().includes('unknown')) {
            const cleanName = originalFileName.replace(/\.epub$/i, '').replace(/[_-]/g, ' ');
            title = cleanName.trim();
            author = t('unknownAuthor') || 'Autore Sconosciuto';
        }

        // Estrazione della copertina tramite le API di EpubJS
        let coverBase64 = null;
        try {
            const coverUrl = await book.coverUrl();
            if (coverUrl) {
                coverBase64 = await convertBlobUrlToBase64(coverUrl);
            }
        } catch (e) {
            console.warn("Impossibile estrarre la copertina dall'EPUB, si userà il placeholder", e);
        }

        // Stima delle pagine basata sul flusso interno dell'EPUB
        let pageCount = 350; // default
        if (book.spine && book.spine.length > 0) {
            pageCount = Math.min(book.spine.length * 15, 1000); // stima generica orientativa
        }

        return {
            title,
            author,
            description: description || t('noDescriptionAvailable') || 'Nessuna descrizione disponibile.',
            coverBase64,
            pageCount
        };
    } catch (error) {
        console.error("Errore durante il parsing client dell'EPUB:", error);
        return getEmergencyMetadata(originalFileName);
    }
}

/**
 * PARSER PDF (Sfrutta PDF.js nel browser)
 */
async function parsePdfClient(arrayBuffer, originalFileName) {
    try {
        // Configuriamo il worker di PDF.js se non già fatto
        if (typeof window.pdfjsLib === 'undefined') {
            throw new Error("PDF.js non è caricato globalmente nel browser.");
        }

        const pdfjsLib = window.pdfjsLib;
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        // 1. Estrazione metadati testuali
        const metadataWrapper = await pdf.getMetadata();
        let title = metadataWrapper.info?.Title;
        let author = metadataWrapper.info?.Author;

        if (!title || title.trim() === '' || title.toLowerCase().includes('untitled')) {
            title = originalFileName.replace(/\.pdf$/i, '').replace(/[_-]/g, ' ').trim();
            author = t('unknownAuthor') || 'Autore Sconosciuto';
        }

        // 2. Generazione Copertina renderizzando la Pagina 1 su un Canvas nascosto
        let coverBase64 = null;
        try {
            const page = await pdf.getPage(1);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Impostiamo una risoluzione standard per la copertina (es. larghezza 512px)
            const unscaledViewport = page.getViewport({ scale: 1.0 });
            const scale = 512 / unscaledViewport.width;
            const viewport = page.getViewport({ scale });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;
            
            // Esportiamo il Canvas direttamente in formato JPEG Base64
            coverBase64 = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
        } catch (imgError) {
            console.warn("Impossibile generare l'immagine di copertina dal PDF:", imgError);
        }

        const pageCount = Math.min(pdf.numPages || 350, 1000);

        return {
            title,
            author,
            description: t('noDescriptionAvailable') || 'Nessuna trama disponibile per questo PDF.',
            coverBase64,
            pageCount
        };
    } catch (error) {
        console.error("Errore durante il parsing client del PDF:", error);
        return getEmergencyMetadata(originalFileName);
    }
}

/**
 * UTILITY: Converte un URL Blob (creato da EpubJS) in una stringa Base64
 */
function convertBlobUrlToBase64(blobUrl) {
    return new Promise((resolve, reject) => {
        fetch(blobUrl)
            .then(res => res.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                };
            })
            .catch(reject);
    });
}

/**
 * METADATI DI EMERGENZA (Se il file è corrotto o il parsing fallisce)
 */
function getEmergencyMetadata(fileName) {
    const title = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ').trim();
    return {
        title: title || t('unknownTitle') || 'Titolo Sconosciuto',
        author: t('unknownAuthor') || 'Autore Sconosciuto',
        description: t('noDescriptionAvailable') || 'Descrizione non disponibile.',
        coverBase64: null,
        pageCount: 350
    };
}