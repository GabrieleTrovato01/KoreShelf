import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import {exec} from 'child_process';
import { EPub } from 'epub2';
import axios from 'axios';
import sharp from 'sharp';
import pdfParse from 'pdf-parse';
import { fromPath } from 'pdf2pic';
import * as htmlToText from 'html-to-text';
import localeIt from './src/locales/it.js';
import localeEn from './src/locales/en.js';

const locales = { it: localeIt.default || localeIt, en: localeEn.default || localeEn };

// 1. VARIABILE GLOBALE DEL SERVER
// Parte con la lingua del sistema operativo, ma verrà sovrascritta dal browser
let globalServerLang = process.env.LANG && process.env.LANG.startsWith('en') ? 'en' : 'it';

// 2. TLOG AGGIORNATO
function tLog(key, variables = {}, langOverride = null) {
    // Usa la lingua globale del server (che verrà sincronizzata dal browser)
    const lang = langOverride || globalServerLang; 
    const dictionary = locales[lang] || locales['it'];
    
    let text = dictionary[key] || key;
    for (const [varName, varValue] of Object.entries(variables)) {
        text = text.replace(`{${varName}}`, varValue);
    }
    return text;
}

const app = express();
const port = 3000;

// Configurazione cartelle
const uploadDir = path.join(process.cwd(), 'uploads');
const publicDir = path.join(process.cwd(), 'public');
const coversDir = path.join(publicDir, 'covers');
const booksJsonPath = path.join(publicDir, 'books.json');
const delay = ms => new Promise(res => setTimeout(res, ms));

// --- Creiamo le cartelle e i file se non esistono ---
if (!fsSync.existsSync(uploadDir)) {
    fsSync.mkdirSync(uploadDir, { recursive: true });
    console.log(tLog("logUploadDirCreated"));
}

if (!fsSync.existsSync(coversDir)) {
    fsSync.mkdirSync(coversDir, { recursive: true });
    console.log(tLog("logCoversDirCreated"));
}


if (!fsSync.existsSync(booksJsonPath)) {
    fsSync.writeFileSync(booksJsonPath, '[]'); 
    console.log(tLog("logBooksJsonCreated"));
} else if (fsSync.statSync(booksJsonPath).isDirectory()) {
    // Protezione Docker
    console.error(tLog('errDockerBooksJson'));
}
// ----------------------------------------------------

const upload = multer({ dest: uploadDir });
// --- FIX PER I PERCORSI DI PKG ED ESBUILD ---
let distPath;

if (process.pkg) {
    distPath = path.join(__dirname, '../dist');
} else {
    distPath = path.join(process.cwd(), 'dist');
}

app.use(express.json());
app.use(express.static(distPath)); 
app.use(express.static(publicDir));

// --- ROTTA DI SINCRONIZZAZIONE LINGUA ---
app.post('/api/sync-language', (req, res) => {
    const { lang } = req.body;
    if (lang === 'it' || lang === 'en') {
        globalServerLang = lang; // Aggiorna la lingua di tutto il terminale!
        console.log(`🌐 ${tLog('terminal_sync', { lang: lang.toUpperCase() }, lang)}`);
    }
    res.json({ success: true });
});

// Fallback fondamentale per le Single Page Application
app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// --- FUNZIONI HELPER ---

// 1. Estrae dati dall'EPUB. ORA ACCETTA ANCHE IL NOME DEL FILE ORIGINALE.
async function parseEpub(filePath, coverFileName, originalFileName) {
    try {
        const epub = await EPub.createAsync(filePath);
        
        let extractedTitle = epub.metadata.title;
        let extractedAuthor = epub.metadata.creator;

        // Rileviamo titoli "spazzatura" (Hash lunghi o "Unknown")
        const isJunkTitle = extractedTitle && (
            /^[a-f0-9]{20,}$/i.test(extractedTitle) || // Cattura stringhe esadecimali lunghissime
            extractedTitle.toLowerCase().includes('unknown')
        );

        // usiamo il nome del file!
        // PIANO B POTENZIATO: Se mancano i metadati o sono spazzatura, usiamo il nome del file!
        if (!extractedTitle || extractedTitle.trim() === '' || isJunkTitle) {
            console.log(tLog('logCorruptedMetadata'));
            
            // Rimuoviamo l'estensione .epub
            let cleanName = originalFileName.replace(/\.epub$/i, '');
            
            // -----------------------------------------------------
            // SEPARAZIONE INTELLIGENTE TITOLO E AUTORE
            // Se nel nome del file c'est un trattino "-", lo usiamo per separare!
            // -----------------------------------------------------
            if (cleanName.includes('-')) {
                const parts = cleanName.split('-'); // Taglia la stringa a metà
                
                // Puliamo la prima metà (Titolo)
                extractedTitle = parts[0].replace(/[_-]/g, ' ').replace(/Ã/g, 'a').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                
                // Puliamo la seconda metà (Autore)
                extractedAuthor = parts[1].replace(/[_-]/g, ' ').replace(/Ã/g, 'a').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                
                console.log(tLog('logFoundDash', { title: extractedTitle, author: extractedAuthor }));
            } else {
                // Se non c'è il trattino, il server è costretto a buttare tutto nel titolo
                cleanName = cleanName.replace(/[_-]/g, ' ');
                cleanName = cleanName.replace(/Ã/g, 'a').replace(/[^a-zA-Z0-9\s]/g, ' ');
                extractedTitle = cleanName.replace(/\s+/g, ' ').trim();
                extractedAuthor = ''; // Lasciamo vuoto, diventerà "Autore Sconosciuto"
            }
        }

        //--- calcolo della lunghezza del testo.
        let rawTextLength = 0;
        // Creiamo un mini-estrattore per leggere i capitoli rapidamente
        const getChapterAsync = (id) => new Promise(resolve => {
            epub.getChapter(id, (err, text) => {
                if (err || !text) resolve('');
                else resolve(text);
            });
        });

        if (epub.flow) {
            for (const chapter of epub.flow) {
                if (chapter.id) {
                    const htmlText = await getChapterAsync(chapter.id);
                    // Rimuoviamo i tag HTML per pesare solo le parole reali
                    const cleanText = htmlText.replace(/<[^>]*>?/gm, '').trim();
                    rawTextLength += cleanText.length;
                }
            }
        }

        const metadata = {
            title: extractedTitle,
            author: extractedAuthor || tLog('unknownAuthor'),
            description: epub.metadata.description ? epub.metadata.description.replace(/<[^>]*>?/gm, '').trim() : null,
            coverPath: null,
            textLength: rawTextLength
        };

        const coverId = epub.metadata.cover;
        if (coverId) {
            try {
                const [imgData, mimeType] = await epub.getImageAsync(coverId);
                if (imgData) {
                    // Convertiamo e ottimizziamo TUTTO in JPG, ignorando il formato originale
                    const finalCoverName = `${coverFileName}.jpg`; 
                    const fullCoverPath = path.join(coversDir, finalCoverName);
                    
                    // Magia di Sharp: ridimensiona e ottimizza
                    await sharp(imgData)
                        .resize(512, 768, { 
                            fit: 'cover', // Ritaglia i bordi in eccesso per riempire il rettangolo perfettamente
                            position: 'center'
                        })
                        .jpeg({ quality: 50, progressive: true }) 
                        .toFile(fullCoverPath);
                    
                    metadata.coverPath = `covers/${finalCoverName}`; 
                }
            } catch (imgError) {
                console.error(tLog('errEpubImageExtract'), imgError.message);
            }
        }
        return metadata;
    } catch (error) {
        throw new Error(`${tLog('errEpubParse')} ${error.message}`);
    }
}

// --- 1.B Estrae dati e copertina dal PDF ---
async function parsePdf(filePath, coverFileName, originalFileName) {
    try {
        // 1. Estrazione Testo per calcolo pagine e IA
        const dataBuffer = await fsSync.promises.readFile(filePath);
        const pdfData = await pdfParse(dataBuffer);
        let extractedTitle = pdfData.info?.Title;
        let extractedAuthor = pdfData.info?.Author;

        // I PDF spesso hanno metadati spazzatura (es. "Microsoft Word - Documento1")
        const isJunkTitle = extractedTitle && (
            /^[a-f0-9]{20,}$/i.test(extractedTitle) || 
            extractedTitle.toLowerCase().includes('unknown') ||
            extractedTitle.toLowerCase().includes('word') ||
            extractedTitle.toLowerCase().includes('untitled')
        );
        if (!extractedTitle || extractedTitle.trim() === '' || isJunkTitle) {
            
            console.log(tLog('logCorruptedPdfMetadata'));
            let cleanName = originalFileName.replace(/\.pdf$/i, '');
            
            if (cleanName.includes('-')) {
                const parts = cleanName.split('-');
                extractedTitle = parts[0].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                extractedAuthor = parts[1].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
            } else {
                cleanName = cleanName.replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ');
                extractedTitle = cleanName.replace(/\s+/g, ' ').trim();
                extractedAuthor = tLog('unknownAuthor');
            }
        }
        const rawTextLength = pdfData.text ? pdfData.text.length : 0;

        const metadata = {
            title: extractedTitle,
            author: extractedAuthor || tLog('unknownAuthor'),
            description: null, // I PDF raramente includono la trama nei metadati
            coverPath: null,
            textLength: rawTextLength
        };

        // 2. Scattiamo la foto alla prima pagina per la copertina
        try {
            const options = {
                density: 150,           // Risoluzione DPI per nitidezza
                saveFilename: coverFileName,
                savePath: coversDir,
                format: "jpg",
                width: 512,
                height: 768
            };
            
            const storeAsImage = fromPath(filePath, options);
            const resolveImg = await storeAsImage(1); // Fotografiamo la pagina 1        
            console.log(tLog('logPdfCoverGenerated'));
            metadata.coverPath = `covers/${resolveImg.name}`;

        } catch (imgError) {
            console.error(tLog('errPdfCoverGen'), imgError.message);
        }
        return metadata;
    } catch (error) {
        throw new Error(`${tLog('errPdfParse')} ${error.message}`);
    }
}

// --- TIMER DI SICUREZZA PER GLI EPUB CORROTTI ---
function parseEpubWithTimeout(filePath, coverFileName, originalFileName, timeoutMs = 8000) {
    return Promise.race([
        parseEpub(filePath, coverFileName, originalFileName),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error(tLog('errEpubTimeout'))), timeoutMs)
        )
    ]);
}

// Apple Books + calcolo pagine stimato
async function fetchBestBookData(title, author, rawTextLength) {
    let result = {
        description: tLog('noPlotFound'),
        coverUrl: null,
        pageCount: 350, 
        googleTitle: null, 
        googleAuthor: null,
        categories: []
    };

    const searchTitle = title === tLog('unknownTitle') ? '' : title;
    const searchAuthor = author === tLog('unknownAuthor') ? '' : author;
    const cleanQuery = `${searchTitle} ${searchAuthor}`.replace(/[_-]/g, ' ').trim();

    // --- STEP 1: APPLE BOOKS (Per Copertina HQ e Trama) ---
    try {
        const storeCountry = globalServerLang === 'en' ? 'us' : 'it';
        const appleUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanQuery)}&media=ebook&country=${storeCountry}&limit=1`;
        
        console.log(tLog('logContactApple', { url: appleUrl }));
        
        const appleResponse = await axios.get(appleUrl, { timeout: 6000 });

        if (appleResponse.data && appleResponse.data.results && appleResponse.data.results.length > 0) {
            const bestMatch = appleResponse.data.results[0];

            if (bestMatch.trackName) result.googleTitle = bestMatch.trackName;
            if (bestMatch.artistName) result.googleAuthor = bestMatch.artistName;
            
            if (bestMatch.description) {
                let cleanDesc = bestMatch.description.replace(/<[^>]*>?/gm, '').trim();
                cleanDesc = cleanDesc.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                result.description = cleanDesc;
            }

            if (bestMatch.artworkUrl100) {
                result.coverUrl = bestMatch.artworkUrl100.replace('100x100bb', '600x900bb'); // Hack Alta Risoluzione
            }
        }
    } catch (error) {
        console.error(tLog('errAppleTimeout'));
    }

    if (rawTextLength && rawTextLength > 0) {
        // Una cartella editoriale (pagina) è in media 1500 battute
        const calculatedPages = Math.ceil(rawTextLength / 1500);
        
        // Aggiungiamo un 5% forfettario per simulare indici, titoli di capitolo e pagine bianche
        result.pageCount = Math.floor(calculatedPages * 1.05); 
        
        console.log(tLog('logPagesCalculated', { count: result.pageCount }));
    } else {
        // Se l'EPUB era vuoto o rotto
        result.pageCount = 350; // Valore di default più realistico per un libro medio
        
        console.log(tLog('logPagesRandom'));
    }

    return result;
}

// 3. Scarica l'immagine da internet
async function downloadCoverImage(url, fileName) {
    try {
        const response = await axios({ 
            url, 
            method: 'GET', 
            responseType: 'arraybuffer', // Axios ci restituisce i dati grezzi
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'image/jpeg, image/png, image/*'
            },
            timeout: 8000
        });
        
        const finalCoverName = `${fileName}_google.jpg`; 
        const fullCoverPath = path.join(coversDir, finalCoverName);
        
        // Magia di Sharp anche per i download
        await sharp(response.data)
            .resize(512, 768, { 
                fit: 'cover', 
                position: 'center',
                withoutEnlargement: true // Se Apple Books ci dà un'immagine piccolissima, non la sgrana forzando l'ingrandimento
            })
            .jpeg({ quality: 80, progressive: true })
            .toFile(fullCoverPath);
            
        return `covers/${finalCoverName}`; 
    } catch (error) {
        console.error(tLog('errAppleCoverDownload'), error.message);
        return null;
    }
}

// --- API UPLOAD ---
app.post('/api/upload', upload.single('ebook'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ success: false, message: tLog('errNoFile') });

        console.log(tLog('logUploadStart', { file: file.originalname }));

        const timestamp = Date.now();
        const baseName = `book_${timestamp}`;

        console.log(tLog('logExtractingMetadata'));
        const fileExt = path.extname(file.originalname).toLowerCase();
        let bookData;

        if (fileExt === '.epub') {
            // Qui non serve passare lang, usiamo globalServerLang
            bookData = await parseEpubWithTimeout(file.path, baseName, file.originalname, 8000);
        } else if (fileExt === '.pdf') {
            bookData = await parsePdf(file.path, baseName, file.originalname);
        } else {
            // Se qualcuno forza il caricamento di un file non supportato
            try { await fs.unlink(file.path); } catch(e){}
            return res.status(400).json({ success: false, message: tLog('errFormat') });
        }

        let currentBooks = [];
        try {
            const fileData = await fs.readFile(booksJsonPath, 'utf-8');
            currentBooks = JSON.parse(fileData);
        } catch (e) {}

        const isDuplicate = currentBooks.some(book => 
            book.title.toLowerCase().trim() === bookData.title.toLowerCase().trim() && 
            book.author.toLowerCase().trim() === bookData.author.toLowerCase().trim()
        );

        if (isDuplicate) {
            console.log(tLog('logUploadBlocked', { title: bookData.title }));
            try { await fs.unlink(file.path); } catch (err) {}
            return res.json({ success: false, message: tLog('errDuplicate') });
        }

        console.log(tLog('logInitialData', { title: bookData.title, author: bookData.author }));
        
        console.log(tLog('logWaitAppleAPI'));
        
        console.log(tLog('logSearchAppleBooks'));
        const googleData = await fetchBestBookData(bookData.title, bookData.author, bookData.textLength);

        let finalTitle = bookData.title;
        let finalAuthor = bookData.author;

        if (googleData.googleTitle) {
            const titleWords = bookData.title.toLowerCase().split(' ').filter(w => w.length > 3);
            const googleTitleLower = googleData.googleTitle.toLowerCase();
            const isRelated = titleWords.some(word => googleTitleLower.includes(word));

            // Confrontiamo con la stringa localizzata generata negli step precedenti
            if (isRelated || bookData.title === tLog('unknownTitle')) {
                finalTitle = googleData.googleTitle;
                finalAuthor = googleData.googleAuthor || bookData.author;
                console.log(tLog('logAutoCorrectTitle', { finalTitle: finalTitle }));
            }
        }

        let finalCoverPath = bookData.coverPath; 
        if (!finalCoverPath && googleData.coverUrl) {
            console.log(tLog('logDownloadCoverMissing'));
            finalCoverPath = await downloadCoverImage(googleData.coverUrl, baseName);
        }

        let finalDescription = tLog('noDescriptionAvailable');
        let epubDesc = bookData.description;

        if (epubDesc) epubDesc = epubDesc.replace(/^(EDGT[0-9]+[\r\n\s]*)/i, '').trim();

        if (epubDesc && epubDesc.length > 30) {
            console.log(tLog('logValidEpubPlot'));
            finalDescription = epubDesc;
        } else if (googleData.description && googleData.description !== tLog('noPlotFound')) {
            // Usiamo il tLog('noPlotFound') per verificare se fetchBestBookData ha fallito
            console.log(tLog('logPlotDownloaded'));
            finalDescription = googleData.description;
        }

        const ebooksDir = path.join(publicDir, 'ebooks');
        if (!fsSync.existsSync(ebooksDir)) fsSync.mkdirSync(ebooksDir, { recursive: true });
        
        const finalEpubPath = `ebooks/${baseName}${fileExt}`;
        // SOLUZIONE EXDEV: Copiamo il file e poi cancelliamo l'originale
        await fs.copyFile(file.path, path.join(publicDir, finalEpubPath));
        await fs.unlink(file.path);
        
        const newBook = {
            id: baseName,
            title: finalTitle,
            author: finalAuthor,
            description: finalDescription, 
            coverPath: finalCoverPath,
            pageCount: googleData.pageCount || 350,
            epubPath: finalEpubPath,
            tags: []
        };

        console.log(tLog('logUpdatingLibrary'));
        currentBooks.push(newBook);
        await fs.writeFile(booksJsonPath, JSON.stringify(currentBooks, null, 4));

        try { await fs.unlink(file.path); } catch (unlinkError) {}

        console.log(tLog('logUploadSuccess', { title: newBook.title }));
        res.json({ success: true, message: tLog('successUpload') });

    } catch (error) {
        console.error(tLog('errCriticalUpload'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER AGGIUNGERE TAG PERSONALIZZATI ---
app.post('/api/books/:id/tags', async (req, res) => {
    const bookId = req.params.id;
    const { tag } = req.body;

    if (!tag || tag.trim() === '') {
        return res.status(400).json({ success: false, message: tLog('errInvalidTag') });
    }

    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        let books = JSON.parse(fileData);
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) return res.status(404).json({ success: false, message: tLog('errNotFound') });

        // Inizializza l'array se non esiste
        if (!books[bookIndex].tags) books[bookIndex].tags = [];

        const cleanTag = tag.trim();
        // Aggiungiamo il tag in cima, così diventa la categoria "Principale" per la mensola
        const tagExists = books[bookIndex].tags.some(t => t.toLowerCase() === cleanTag.toLowerCase());
        
        if (!tagExists) {
            books[bookIndex].tags.unshift(cleanTag); // unshift lo mette al primo posto
            await fs.writeFile(booksJsonPath, JSON.stringify(books, null, 4));
            return res.json({ success: true, message: tLog('successTagAdded') });
        } else {
            return res.json({ success: true, message: tLog('successTagExists') });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER ELIMINARE UN SINGOLO LIBRO FISICAMENTE ---
app.delete('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        let books = JSON.parse(fileData);
        
        // Troviamo l'indice del libro
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) {
            return res.status(404).json({ success: false, message: tLog('errNotFound') });
        }

        const bookToDelete = books[bookIndex];

        // 1. Rimuoviamo il libro dall'array
        books.splice(bookIndex, 1);
        
        // 2. Salviamo il database JSON aggiornato
        await fs.writeFile(booksJsonPath, JSON.stringify(books, null, 4));

        // 3. IGIENE DEL DISCO: Eliminiamo i file fisici!
        try {
            if (bookToDelete.epubPath) {
                await fs.unlink(path.join(publicDir, bookToDelete.epubPath));
            }
            if (bookToDelete.coverPath) {
                await fs.unlink(path.join(publicDir, bookToDelete.coverPath));
            }
        } catch (fileError) {
            console.log(tLog('logFilesAlreadyMissing'));
        }

        console.log(tLog('logDeleteSuccess', { title: bookToDelete.title }));
        res.json({ success: true, message: tLog('successDelete') });

    } catch (error) {
        console.error(tLog('errDeleteBook'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER GESTIRE LE CATEGORIE IN BLOCCO (Rinomina/Elimina) ---
app.put('/api/categories', async (req, res) => {
    const { oldName, newName, action } = req.body;

    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        let books = JSON.parse(fileData);
        let updatedCount = 0;

        books.forEach(book => {
            // Se il libro ha tag e il primo tag corrisponde alla categoria che stiamo modificando
            if (book.tags && book.tags.length > 0 && book.tags[0] === oldName) {
                if (action === 'rename' && newName) {
                    book.tags[0] = newName.trim();
                    updatedCount++;
                } else if (action === 'delete') {
                    book.tags = []; // Resettiamo i tag: il libro tornerà "Senza Categoria"
                    updatedCount++;
                }
            }
        });

        if (updatedCount > 0) {
            await fs.writeFile(booksJsonPath, JSON.stringify(books, null, 4));
            res.json({ success: true, message: tLog('successCatUpdate', { count: updatedCount }) });
        } else {
            res.json({ success: false, message: tLog('errNoBooksCat') });
        }
    } catch (error) {
        console.error(tLog('errCategoryManager'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER SPOSTARE PIU' LIBRI INSIEME (BULK) ---
app.put('/api/books/bulk-tags', async (req, res) => {
    const { bookIds, newTag } = req.body;

    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        let books = JSON.parse(fileData);
        let updatedCount = 0;

        books.forEach(book => {
            if (bookIds.includes(book.id)) {
                if (!book.tags) book.tags = [];
                // Rimuoviamo il tag se per caso ce l'aveva già in seconda posizione
                book.tags = book.tags.filter(t => t.toLowerCase() !== newTag.toLowerCase());
                // Inseriamo la nuova categoria in prima posizione
                book.tags.unshift(newTag.trim());
                updatedCount++;
            }
        });

        if (updatedCount > 0) {
            await fs.writeFile(booksJsonPath, JSON.stringify(books, null, 4));
            res.json({ success: true, message: tLog('successBulkMove', { count: updatedCount }) });
        } else {
            res.json({ success: false, message: tLog('errNoBooksUpdated') });
        }
    } catch (error) {
        console.error(tLog('errBulkUpdate'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// Aggiorna la percentuale di lettura nel database
app.put('/api/books/:id/progress', async (req, res) => {
    const { progress } = req.body;
    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        let books = JSON.parse(fileData);
        const bookIndex = books.findIndex(b => b.id === req.params.id);
        
        if (bookIndex !== -1) {
            books[bookIndex].progress = progress; // Salviamo un valore tra 0 e 1
            await fs.writeFile(booksJsonPath, JSON.stringify(books, null, 4));
            res.json({ success: true }); // Nessun messaggio necessario per il frontend in caso di successo silenzioso
        } else {
            res.status(404).json({ success: false, message: tLog('errNotFound') });
        }
    } catch (e) { 
        console.error(tLog('errProgressUpdate'), e);
        res.status(500).json({ success: false, message: tLog('errInternal') }); 
    }
});

// --- ROTTA PER SALVARE LA RECENSIONE ---
app.put('/api/books/:id/review', async (req, res) => {
    const bookId = req.params.id;
    const { rating, reviewText } = req.body;

    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        let books = JSON.parse(fileData);
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex !== -1) {
            books[bookIndex].rating = rating; // Numero da 1 a 5
            books[bookIndex].review = reviewText; // Testo della recensione
            await fs.writeFile(booksJsonPath, JSON.stringify(books, null, 4));
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: tLog('errNotFound') });
        }
    } catch (error) {
        console.error(tLog('errSaveReview'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- SCUDO ANTI-CRASH GLOBALE ---
// Cattura gli errori critici non gestiti dalle librerie esterne (come epub2) 
// per evitare che il server Node.js si spenga improvvisamente.
process.on('uncaughtException', (err) => {
    console.warn(tLog('logShieldActivated'));
    
    if (err.message && err.message.includes('linkparts.shift')) {
        console.warn(tLog('errEpub2Crash'));
        console.warn(tLog('solutionCalibre'));
    } else {
        console.warn(tLog('errUnexpected'), err);
    }
});

// --- ROTTA PER ESPORTARE IL LIBRO COME KNOWLEDGE BASE IN FORMATO MARKDOWN (.md) ---
app.get('/api/books/:id/export-ai', async (req, res) => {
    const bookId = req.params.id;

    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        const books = JSON.parse(fileData);
        const book = books.find(b => b.id === bookId);

        if (!book || !book.epubPath) {
            return res.status(404).json({ success: false, message: tLog('errNotFound') });
        }

        const physicalEpubPath = path.join(publicDir, book.epubPath);
        
        console.log(tLog('logExportStart', { title: book.title }));

        let fullText = "";

        // Bivio: Estrazione testo in base al formato
        if (book.epubPath.toLowerCase().endsWith('.pdf')) {
            console.log(tLog('logPdfExtract'));
            const dataBuffer = await fs.readFile(physicalEpubPath);
            const pdfData = await pdfParse(dataBuffer);
            fullText = pdfData.text;
        } else {
            console.log(tLog('logEpubExtract'));
            const epub = await EPub.createAsync(physicalEpubPath);
            const getChapterAsync = (id) => new Promise(resolve => {
                epub.getChapter(id, (err, text) => {
                    if (err || !text) resolve('');
                    else resolve(text);
                });
            });
            let chaptersText = [];
            if (epub.flow) {
                for (const chapter of epub.flow) {
                    if (chapter.id) {
                        const htmlText = await getChapterAsync(chapter.id);
                        if (htmlText && htmlText.trim() !== '') {
                            // Usiamo html-to-text per pulire l'HTML in un Markdown perfetto
                            const cleanText = htmlToText.convert(htmlText, {
                                wordwrap: false,
                                selectors: [ 
                                    { selector: 'img', format: 'skip' }, 
                                    { selector: 'a', options: { ignoreHref: true } } 
                                ]
                            });
                            chaptersText.push(cleanText);
                        }
                    }
                }
            }
            
            fullText = chaptersText.join("\n\n---\n\n");
        }

        // Prepariamo il nome del file
        const safeTitle = book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `KoreShelf_${safeTitle}.md`; // Estensione .md

        // Configurazione Header per il download di un file Markdown
        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-type', 'text/markdown');
        res.charset = 'UTF-8';
        
        // --- COSTRUZIONE DEL DOCUMENTO MARKDOWN (Self-Instructing) ---
        const now = new Date().toISOString().split('T')[0];
        
        const mainCategory = (book.tags && book.tags.length > 0) ? book.tags[0] : tLog('uncategorized');

        const markdownHeader = `---
        title: "${book.title.replace(/"/g, '\\"')}"
        author: "${book.author.replace(/"/g, '\\"')}"
        category: "${mainCategory}"
        exported_from: "KoreShelf"
        export_date: ${now}
        tags: [KoreShelf, KnowledgeBase, ${mainCategory.replace(/\s+/g, '')}]
        ---

        # ${book.title}

        ${tLog('mdSmartDoc')}

        ---

        ${tLog('mdDetailsPlot')}
        ${tLog('mdAuthor', { author: book.author })}
        ${tLog('mdPages', { count: book.pageCount })}

        ${tLog('mdOriginalPlot')}
        ${book.description}

        ---

        ${tLog('mdBookContent')}

        ${fullText}

        ---
        ${tLog('mdEndOfDoc')}
        `;

        res.write(markdownHeader);
        res.end();

    } catch (error) {
        console.error(tLog('errExportMD'), error);
        res.status(500).json({ success: false, message: tLog('errGenerateMD') });
    }
});

// --- ROTTA PER SPEGNIMENTO SERVER ---
app.post('/api/shutdown', (req, res) => {
    console.log(tLog('logShutdownRequest'));

    res.json({ success: true, message: tLog('successShutdown') });
    
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});

app.listen(port, () => {

    console.log(tLog('logServerListening', { port: port }));

    // --- LOGICA PER APRIRE IL BROWSER IN AUTOMATICO ---
    const url = `http://localhost:${port}`;
    
    let command;
    switch (process.platform) {
        case 'darwin': // macOS
            command = `open ${url}`;
            break;
        case 'win32':  // Windows
            command = `start "" "${url}"`; // Le virgolette vuote evitano bug su Windows
            break;
        default:       // Linux e altri (inclusi gli ambienti pacchettizzati)
            command = `xdg-open ${url}`;
            break;
    }

    exec(command, (error) => {
        if (error) {
            console.error(tLog('errOpenBrowser'), error);
        }
    });
});