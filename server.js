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
import * as htmlToText from 'html-to-text';
import localeIt from './src/locales/it.js';
import localeEn from './src/locales/en.js';
import localeEs from './src/locales/es.js';
import localeFr from './src/locales/fr.js';
import localeDe from './src/locales/de.js';
import Database from 'better-sqlite3';
import { extractISBN } from './src/metadata-extractor.js';

const locales = { it: localeIt.default || localeIt, 
    en: localeEn.default || localeEn, 
    es: localeEs.default || localeEs, 
    fr: localeFr.default || localeFr,
    de: localeDe.default || localeDe };

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

try {
    const originalWalkNavMap = EPub.prototype.walkNavMap;
    
    EPub.prototype.walkNavMap = function(branch, id, prefix) {
        // Patch robusto: gestisce array, oggetti singoli e valori complessi
        if (branch) {
            // Normalizziamo sempre in array per sicurezza
            const items = Array.isArray(branch) ? branch : [branch];
            
            const fixNavLabel = (item) => {
                if (!item || !item.navLabel) return;
                
                let textValue = item.navLabel.text || item.navLabel;
                
                // Se è un oggetto complesso (es. da XML parsing con xml2js), estraiamo il testo
                if (typeof textValue === 'object' && textValue !== null) {
                    // Prova vari formati comuni di parsing XML
                    textValue = textValue['#text'] || textValue._ || textValue.text || textValue[0] || '';
                }
                
                // Forza la conversione in stringa e rimuovi spazi
                const cleanText = String(textValue || '').trim();
                
                // Ristrutturiamo navLabel come oggetto valido con text stringa
                item.navLabel = { text: cleanText };
            };
            
            // Applichiamo la correzione a tutti gli elementi
            items.forEach(fixNavLabel);
        }
        
        // Chiamata alla funzione originale con try-catch di sicurezza
        try {
            return originalWalkNavMap.call(this, branch, id, prefix);
        } catch (e) {
            // Se comunque crasha, ignoriamo l'errore e continuiamo
            console.warn(tLog('walkNavMapWarning'), e.message);
            return;
        }
    };
    
    console.log(tLog('monkeyPatchSuccess'));
} catch (e) {
    console.warn(tLog('monkeyPatchError'), e.message);
}

const app = express();
const port = 3000;

// Configurazione cartelle
const uploadDir = path.join(process.cwd(), 'uploads');
const publicDir = path.join(process.cwd(), 'public');
const coversDir = path.join(publicDir, 'covers');


//--------------------------------------------------------------------

const delay = ms => new Promise(res => setTimeout(res, ms));

// --- Creiamo le cartelle e i file se non esistono ---
if (!fsSync.existsSync(publicDir)) {
    fsSync.mkdirSync(publicDir, { recursive: true });
}  
if (!fsSync.existsSync(uploadDir)) {
    fsSync.mkdirSync(uploadDir, { recursive: true });
    console.log(tLog("logUploadDirCreated"));
}

if (!fsSync.existsSync(coversDir)) {
    fsSync.mkdirSync(coversDir, { recursive: true });
    console.log(tLog("logCoversDirCreated"));
}

// --------------------DB SQLITE PER LA LIBRERIA-------------------------

const db = new Database(path.join(publicDir, 'koreshelf.db'));
db.exec(`
    CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT,
        description TEXT,
        coverPath TEXT,
        epubPath TEXT,
        pageCount INTEGER DEFAULT 350,
        progress REAL DEFAULT 0,
        rating INTEGER DEFAULT 0,
        review TEXT,
        tags TEXT DEFAULT '[]',
        highlights TEXT DEFAULT '[]'
    )
`);

try {
    db.exec("ALTER TABLE books ADD COLUMN highlights TEXT DEFAULT '[]'");
    console.log("Colonna highlights aggiunta al DB con successo.");
} catch(e) {
    // Se la colonna esiste già, SQLite lancerà un errore che ignoriamo in silenzio
}
// Helper per leggere tutti i libri dal DB
// Helper per leggere tutti i libri dal DB
function getAllBooks() {
    const rows = db.prepare('SELECT * FROM books').all();
    return rows.map(row => {
        let parsedHighlights = [];
        try {
            parsedHighlights = JSON.parse(row.highlights || '[]');
            
            // AUTO-FIX: Se per errore è stata "stringificata" due volte ed è rimasta una stringa
            if (typeof parsedHighlights === 'string') {
                parsedHighlights = JSON.parse(parsedHighlights);
            }
        } catch(e) {
            console.warn("Errore nel parsing degli highlights per il libro:", row.id);
        }

        return {
            ...row,
            tags: JSON.parse(row.tags || '[]'),
            highlights: parsedHighlights
        };
    });
}
// Helper per salvare un libro nel DB
function upsertBook(book) {
    const stmt = db.prepare(`
        INSERT INTO books (id, title, author, description, coverPath, epubPath, pageCount, progress, rating, review, tags)
        VALUES (@id, @title, @author, @description, @coverPath, @epubPath, @pageCount, @progress, @rating, @review, @tags)
        ON CONFLICT(id) DO UPDATE SET
            title = @title,
            author = @author,
            description = @description,
            coverPath = @coverPath,
            epubPath = @epubPath,
            pageCount = @pageCount,
            progress = @progress,
            rating = @rating,
            review = @review,
            tags = @tags,
            highlights = @highlights
    `);
    stmt.run({ 
        ...book, 
        tags: JSON.stringify(book.tags || []),
        highlights: JSON.stringify(book.highlights || []),
        rating: book.rating || 0,
        review: book.review || null,
        progress: book.progress || 0,
        description: book.description || null,
        coverPath: book.coverPath || null
    });
}

// Migrazione dati da books.json a SQLite
function migrateFromJson() {
    const count = db.prepare('SELECT COUNT(*) as count FROM books').get();
    if (count.count > 0) return; // DB già popolato, skip

    try {
        if (fsSync.existsSync(booksJsonPath)) {
            const data = fsSync.readFileSync(booksJsonPath, 'utf-8');
            const books = JSON.parse(data);
            
            const migrate = db.transaction((books) => {
                books.forEach(book => upsertBook(book));
            });
            
            migrate(books);
            console.log(`✅ Migrati ${books.length} libri da books.json a SQLite`);
        }
    } catch(e) {
        console.error('❌ Errore migrazione:', e);
    }
}

migrateFromJson();



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
    const supportedLangs = ['it', 'en', 'es', 'fr', 'de']; // Aggiunto 'es', 'fr' e 'de'
    
    if (supportedLangs.includes(lang)) {
        globalServerLang = lang; 
        console.log(`🌐 ${tLog('terminal_sync', { lang: lang.toUpperCase() }, lang)}`);
    }
    res.json({ success: true });
});

// Fallback fondamentale per le Single Page Application
app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.get('/books.json', (req, res) => {
    const books = getAllBooks();
    res.json(books);
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
            
            if (cleanName.includes('-')) {
                const parts = cleanName.split('-');
                
                // Se ci sono più di 2 parti, assumiamo che l'ultima sia l'autore e il resto il titolo
                if (parts.length > 2) {
                    extractedAuthor = parts.pop().replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                    extractedTitle = parts.join(' ').replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                } else {
                    // Comportamento originale se c'è un solo trattino
                    extractedTitle = parts[0].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                    extractedAuthor = parts[1].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                }
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
        const maxChaptersToRead = 50;
        let chaptersRead = 0;
        // Creiamo un mini-estrattore per leggere i capitoli rapidamente
        const getChapterAsync = (id) => new Promise(resolve => {
            epub.getChapter(id, (err, text) => {
                if (err || !text) resolve('');
                else resolve(text);
            });
        });

        if (epub.flow) {
            for (const chapter of epub.flow) {
                if (chaptersRead >= maxChaptersToRead) break;

                if (chapter.id) {
                    const htmlText = await getChapterAsync(chapter.id);
                    // Rimuoviamo i tag HTML per pesare solo le parole reali
                    const cleanText = htmlText.replace(/<[^>]*>?/gm, '').trim();
                    rawTextLength += cleanText.length;
                    chaptersRead++;
                }
            }
            if (epub.flow.length > maxChaptersToRead) {
                console.log(`⚠️ Large EPUB detected: ${epub.flow.length} chapters. Only analyzed first ${maxChaptersToRead} for performance.`);
                // Stimiamo il totale basandoci sulla media dei capitoli letti
                const avgLength = rawTextLength / chaptersRead;
                rawTextLength = Math.floor(avgLength * epub.flow.length);
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
        // Invece di fare throw (che crasha il server), restituiamo metadati di emergenza
        console.error(tLog('errEpubParse'), error.message);
        
        // Estraiamo un titolo pulito dal nome del file
        let cleanName = originalFileName.replace(/\.epub$/i, '').replace(/[_-]/g, ' ').trim();
        
        return {
            title: cleanName || tLog('unknownTitle'),
            author: tLog('unknownAuthor'),
            description: null,
            coverPath: null,
            textLength: 0
        };
    }
}

// --- 1.B Estrae dati e copertina dal PDF ---
async function parsePdf(filePath, coverFileName, originalFileName) {
    try {
        // 1. Estrazione Testo per calcolo pagine e IA
        const dataBuffer = await fsSync.promises.readFile(filePath);

        const options = {max:50};
        const pdfData = await pdfParse(dataBuffer, options);

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
                
                // Se ci sono più di 2 parti, assumiamo che l'ultima sia l'autore e il resto il titolo
                if (parts.length > 2) {
                    extractedAuthor = parts.pop().replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                    extractedTitle = parts.join(' ').replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                } else {
                    // Comportamento originale se c'è un solo trattino
                    extractedTitle = parts[0].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                    extractedAuthor = parts[1].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                }
                console.log(tLog('logFoundDash', { title: extractedTitle, author: extractedAuthor }));
            }else {
                cleanName = cleanName.replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ');
                extractedTitle = cleanName.replace(/\s+/g, ' ').trim();
                extractedAuthor = tLog('unknownAuthor');
            }
        }
        const rawTextLength = pdfData.text ? pdfData.text.length : 0;
        let estimatedPages = 350;

        if (pdfData.numpages && pdfData.numpages > 0) {
            estimatedPages = pdfData.numpages;
        } else if (rawTextLength > 0) {
            const calculatedPages = Math.ceil(rawTextLength / 1500);
            estimatedPages = Math.floor(calculatedPages * 1.05); // Aggiungiamo un 5% forfettario
        }

        const metadata = {
            title: extractedTitle,
            author: extractedAuthor || tLog('unknownAuthor'),
            description: null, // I PDF raramente includono la trama nei metadati
            coverPath: null,
            textLength: rawTextLength,
            pageCount: Math.min(estimatedPages, 1000) // Limite massimo di sicurezza per il carosello 3D
        };
        return metadata;
    } catch (error) {
        throw new Error(`${tLog('errPdfParse')} ${error.message}`);
    }
}

// --- TIMER DI SICUREZZA PER GLI EPUB CORROTTI ---
function parseEpubWithTimeout(filePath, coverFileName, originalFileName, baseTimeoutMs = 15000) {
    // Calcoliamo la dimensione del file per adattare il timeout
    const stats = fsSync.statSync(filePath);
    const fileSizeMB = stats.size / (1024 * 1024);
    
    // Timeout base + tempo aggiuntivo per MB (es. 2 secondi per MB)
    const dynamicTimeout = Math.min(baseTimeoutMs + (fileSizeMB * 2000), 120000); // Max 2 minuti
    
    console.log(tLog( 'logEpubTimeoutCalc', { fileSizeMB: fileSizeMB.toFixed(2), dynamicTimeout: dynamicTimeout }));
    
    return Promise.race([
        parseEpub(filePath, coverFileName, originalFileName),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(tLog('errEpubTimeout'))), dynamicTimeout)
        )
    ]);
}

// --- TIMER DI SICUREZZA PER I PDF GIGANTI ---
function parsePdfWithTimeout(filePath, coverFileName, originalFileName, baseTimeoutMs = 15000) {
    const stats = fsSync.statSync(filePath);
    const fileSizeMB = stats.size / (1024 * 1024);
    
    // Timeout base + tempo aggiuntivo per MB (es. 3 secondi per MB)
    // Ma con un MAX di 120 secondi (2 minuti) per non bloccare tutto
    const dynamicTimeout = Math.min(baseTimeoutMs + (fileSizeMB * 3000), 120000);
    
    console.log(tLog( 'logPdfTimeoutCalc', { fileSizeMB: fileSizeMB.toFixed(2), dynamicTimeout: dynamicTimeout }));
    
    return Promise.race([
        parsePdf(filePath, coverFileName, originalFileName),
        new Promise((resolve) => 
            setTimeout(() => {
                console.log(tLog('errPdfTimeout', { dynamicTimeout: dynamicTimeout }));
                
                // Puliamo il nome del file da usare come titolo di emergenza
                let cleanName = originalFileName.replace(/\.pdf$/i, '').replace(/[_-]/g, ' ');
                
                resolve({
                    title: cleanName.trim(),
                    author: tLog('unknownAuthor'),
                    description: null,
                    coverPath: null, // Il frontend genererà la copertina 3D di fallback
                    textLength: 0,
                    pageCount: 1000
                });
            }, dynamicTimeout)
        )
    ]);
}

// Apple Books + calcolo pagine stimato
async function fetchBestBookData(isbn,title, author, rawTextLength, pdfPageCount = null) {
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
    
    // --- STEP 0: RICERCA TRAMITE ISBN SU GOOGLE BOOKS ---

    if (isbn) {
        try {
            console.log(`🔍 [Metadata] Cerco su Google Books con ISBN: ${isbn}`);
            const googleUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
            const response = await axios.get(googleUrl, { timeout: 6000 });

            if (response.data && response.data.items && response.data.items.length > 0) {
                const volumeInfo = response.data.items[0].volumeInfo;
                
                result.googleTitle = volumeInfo.title;
                if (volumeInfo.authors) result.googleAuthor = volumeInfo.authors.join(', ');
                
                if (volumeInfo.description) {
                    result.description = volumeInfo.description.replace(/<[^>]*>?/gm, '').trim();
                }

                if (volumeInfo.pageCount) {
                    result.pageCount = volumeInfo.pageCount;
                }

                // Il trucco della copertina ad Alta Risoluzione di Google Books
                if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
                    let cover = volumeInfo.imageLinks.thumbnail;
                    // Forza zoom=0 (massima risoluzione), togli l'effetto piega e forza HTTPS
                    cover = cover.replace(/zoom=[0-9]/, 'zoom=0').replace('&edge=curl', '').replace(/^http:\/\//i, 'https://');
                    result.coverUrl = cover;
                }
                
                console.log(`✅ [Metadata] Trovato su Google Books: ${result.googleTitle}`);
                return result; // Se troviamo il libro con l'ISBN, usciamo subito e restituiamo i dati!
            } else {
                console.log(`⚠️ [Metadata] ISBN non trovato su Google Books, passo al fallback testuale...`);
            }
        } catch (error) {
            console.error(`❌ [Metadata] Errore API Google Books:`, error.message);
        }
    }

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
    if (pdfPageCount && pdfPageCount > 0) {
        result.pageCount = Math.min(pdfPageCount, 1000);
    } else if (rawTextLength && rawTextLength > 0) {
        // Una cartella editoriale (pagina) è in media 1500 battute
        const calculatedPages = Math.ceil(rawTextLength / 1500);
        
        // Aggiungiamo un 5% forfettario per simulare indici, titoli di capitolo e pagine bianche
        let estimatedPages = Math.floor(calculatedPages * 1.05); 
        
        // LIMITATORE DI SICUREZZA 3D: Massimo 1000 pagine per non rompere il carosello
        result.pageCount = Math.min(estimatedPages, 1000);
        
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

// --- ROTTA PER RICEVERE LA COPERTINA "FOTOGRAFATA" DAL FRONTEND ---
app.post('/api/books/:id/cover', upload.single('cover'), async (req, res) => {
    const bookId = req.params.id;
    const file = req.file;
    if (!file) return res.status(400).json({ success: false, message: 'Nessun file ricevuto.' });

    try {
        const row = db.prepare('SELECT * FROM books WHERE id = ?').get(bookId);
        if (!row) {
            await fs.unlink(file.path).catch(() => {});
            return res.status(404).json({ success: false, message: 'Libro non trovato.' });
        }

        // Ottimizziamo l'immagine con sharp (esattamente come fai per gli EPUB)
        const newCoverName = `cover_${bookId}_frontend.jpg`;
        const fullCoverPath = path.join(coversDir, newCoverName);

        await sharp(file.path)
            .resize(512, 768, { fit: 'cover', position: 'center' }) // Ritaglia e adatta al formato libro
            .jpeg({ quality: 80, progressive: true })
            .toFile(fullCoverPath);

        // Pulizia file temporaneo di multer
        await fs.unlink(file.path).catch(() => {});

        // Aggiorniamo il database
        const book = { ...row, tags: JSON.parse(row.tags || '[]') };
        book.coverPath = `covers/${newCoverName}`;
        upsertBook(book);

        res.json({ success: true, coverPath: book.coverPath });
    } catch (error) {
        console.error("Errore upload copertina frontend:", error);
        if (req.file) await fs.unlink(req.file.path).catch(() => {});
        res.status(500).json({ success: false, message: 'Errore server.' });
    }
});

// --- ROTTA PER LEGGERE TUTTI I LIBRI DAL DB ---
app.get('/api/books', (req, res) => {
    try {
        const books = getAllBooks();
        res.json(books);
    } catch (error) {
        console.error("Errore lettura libri dal DB:", error);
        res.status(500).json([]);
    }
});

// --- ROTTA PER LA RICERCA SQL AVANZATA ---
app.get('/api/books/search', (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]); // Se la query è vuota, restituisci nulla

    try {
        const searchTerm = `%${query}%`; 
        
        // Eseguiamo la query contemporaneamente su Titolo, Autore e Categoria
        const stmt = db.prepare(`
            SELECT * FROM books 
            WHERE title LIKE ? 
               OR author LIKE ? 
               OR tags LIKE ?
        `);
        
        const rows = stmt.all(searchTerm, searchTerm, searchTerm);
        
        // Formattiamo il JSON dei tags come sempre
        const formattedBooks = rows.map(row => ({
            ...row,
            tags: JSON.parse(row.tags || '[]')
        }));

        res.json(formattedBooks);
    } catch (error) {
        console.error("Errore di ricerca nel DB:", error);
        res.status(500).json([]);
    }
});

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

        const isbn = await extractISBN(file.path, fileExt);
        if (isbn) {
            console.log(tLog('logFoundISBN', { isbn }));
        } else {
            console.log(tLog('logNoISBNFound'));
        }

        
        

        if (fileExt === '.epub') {
            const stats = fsSync.statSync(file.path);
            const fileSizeMB = stats.size / (1024 * 1024);
            if (fileSizeMB > 100) {
            console.warn(`⚠️ WARNING: Very large EPUB detected (${fileSizeMB.toFixed(2)} MB). Processing may take a while...`);
            }
            bookData = await parseEpubWithTimeout(file.path, baseName, file.originalname, 15000);
        } else if (fileExt === '.pdf') {
            const stats = fsSync.statSync(file.path);
            const fileSizeMB = stats.size / (1024 * 1024);

            if (fileSizeMB > 100) {
                console.warn(`⚠️ WARNING: Very large PDF detected (${fileSizeMB.toFixed(2)} MB). Processing may take a while...`);
                console.log(`📊 Extracting metadata from first 50 pages only to save RAM...`);
            }
            bookData = await parsePdfWithTimeout(file.path, baseName, file.originalname, 15000);
        } else {
            try { await fs.unlink(file.path); } catch(e){}
            return res.status(400).json({ success: false, message: tLog('errFormat') });
        }

        console.log(tLog('logInitialData', { title: bookData.title, author: bookData.author }));
        console.log(tLog('logWaitAppleAPI'));
        console.log(tLog('logSearchAppleBooks'));
        
        const googleData = await fetchBestBookData(isbn, bookData.title, bookData.author, bookData.textLength, bookData.pageCount);

        let finalTitle = bookData.title;
        let finalAuthor = bookData.author;

        if (googleData.googleTitle) {
            const titleWords = bookData.title.toLowerCase().split(' ').filter(w => w.length > 3);
            const googleTitleLower = googleData.googleTitle.toLowerCase();
            const isRelated = titleWords.some(word => googleTitleLower.includes(word));

            if (isRelated || bookData.title === tLog('unknownTitle')) {
                finalTitle = googleData.googleTitle;
                finalAuthor = googleData.googleAuthor || bookData.author;
                console.log(tLog('logAutoCorrectTitle', { finalTitle: finalTitle }));
            }
        }

        const isDuplicate = db.prepare('SELECT id FROM books WHERE LOWER(title) = LOWER(?)').get(finalTitle.trim());

        if (isDuplicate) {
            console.log(`[BLOCCATO] Il libro "${finalTitle}" è già presente nella libreria!`);
            try { await fs.unlink(file.path); } catch (err) {}
            
            // Restituisce l'errore al frontend in modo che mostri l'alert "già presente"
            return res.json({ success: false, message: 'Libro già presente nella libreria.' });
        }

            let finalCoverPath = bookData.coverPath; 
            const isPdf = fileExt === '.pdf';
            
            if (!finalCoverPath && googleData.coverUrl && !isPdf) {
                console.log(tLog('logDownloadCoverMissing'));
                finalCoverPath = await downloadCoverImage(googleData.coverUrl, baseName);
            } else if (!finalCoverPath && isPdf) {
                console.log(tLog('noInternalCover'));
            }

        let finalDescription = tLog('noDescriptionAvailable');
        let epubDesc = bookData.description;

        if (epubDesc) epubDesc = epubDesc.replace(/^(EDGT[0-9]+[\r\n\s]*)/i, '').trim();

        if (epubDesc && epubDesc.length > 30) {
            console.log(tLog('logValidEpubPlot'));
            finalDescription = epubDesc;
        } else if (googleData.description && googleData.description !== tLog('noPlotFound')) {
            console.log(tLog('logPlotDownloaded'));
            finalDescription = googleData.description;
        }

        const ebooksDir = path.join(publicDir, 'ebooks');
        if (!fsSync.existsSync(ebooksDir)) fsSync.mkdirSync(ebooksDir, { recursive: true });
        
        const finalEpubPath = `ebooks/${baseName}${fileExt}`;
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
            tags: [],
            progress: 0,
            rating: 0,
            review: null
        };

        console.log(tLog('logUpdatingLibrary'));
        upsertBook(newBook);

        res.json({ success: true, message: tLog('successUpload') });

    } catch (error) {
        console.error(tLog('errCriticalUpload'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER AGGIUNGERE TAG PERSONALIZZATI ---
app.post('/api/books/:id/tags', (req, res) => {
    const bookId = req.params.id;
    const { tag } = req.body;

    if (!tag || tag.trim() === '') {
        return res.status(400).json({ success: false, message: tLog('errInvalidTag') });
    }

    try {
        const row = db.prepare('SELECT * FROM books WHERE id = ?').get(bookId);
        if (!row) return res.status(404).json({ success: false, message: tLog('errNotFound') });

        const book = { ...row, tags: JSON.parse(row.tags || '[]') };
        const cleanTag = tag.trim();
        const tagExists = book.tags.some(t => t.toLowerCase() === cleanTag.toLowerCase());
        
        if (!tagExists) {
            book.tags.unshift(cleanTag);
            upsertBook(book);
            return res.json({ success: true, message: tLog('successTagAdded') });
        } else {
            return res.json({ success: true, message: tLog('successTagExists') });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER ELIMINARE UN SINGOLO LIBRO FISICAMENTE ---
app.delete('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const bookToDelete = db.prepare('SELECT * FROM books WHERE id = ?').get(bookId);
        
        if (!bookToDelete) {
            return res.status(404).json({ success: false, message: tLog('errNotFound') });
        }

        // Eliminazione dal database
        db.prepare('DELETE FROM books WHERE id = ?').run(bookId);

        // IGIENE DEL DISCO: Eliminiamo i file fisici
        try {
            if (bookToDelete.epubPath) await fs.unlink(path.join(publicDir, bookToDelete.epubPath));
            if (bookToDelete.coverPath) await fs.unlink(path.join(publicDir, bookToDelete.coverPath));
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
app.put('/api/categories', (req, res) => {
    const { oldName, newName, action } = req.body;

    try {
        const books = getAllBooks();
        const toUpdate = [];

        books.forEach(book => {
            if (book.tags && book.tags.length > 0 && book.tags[0] === oldName) {
                if (action === 'rename' && newName) {
                    book.tags[0] = newName.trim();
                    toUpdate.push(book);
                } else if (action === 'delete') {
                    book.tags = []; 
                    toUpdate.push(book);
                }
            }
        });

        if (toUpdate.length > 0) {
            // Esecuzione in blocco sicura
            const updateMany = db.transaction((booksToSave) => {
                booksToSave.forEach(b => upsertBook(b));
            });
            updateMany(toUpdate);
            
            res.json({ success: true, message: tLog('successCatUpdate', { count: toUpdate.length }) });
        } else {
            res.json({ success: false, message: tLog('errNoBooksCat') });
        }
    } catch (error) {
        console.error(tLog('errCategoryManager'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER SPOSTARE PIU' LIBRI INSIEME (BULK) ---
app.put('/api/books/bulk-tags', (req, res) => {
    const { bookIds, newTag } = req.body;

    try {
        const books = getAllBooks();
        const toUpdate = [];

        books.forEach(book => {
            if (bookIds.includes(book.id)) {
                if (!book.tags) book.tags = [];
                book.tags = book.tags.filter(t => t.toLowerCase() !== newTag.toLowerCase());
                book.tags.unshift(newTag.trim());
                toUpdate.push(book);
            }
        });

        if (toUpdate.length > 0) {
            const updateMany = db.transaction((booksToSave) => {
                booksToSave.forEach(b => upsertBook(b));
            });
            updateMany(toUpdate);

            res.json({ success: true, message: tLog('successBulkMove', { count: toUpdate.length }) });
        } else {
            res.json({ success: false, message: tLog('errNoBooksUpdated') });
        }
    } catch (error) {
        console.error(tLog('errBulkUpdate'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// Aggiorna la percentuale di lettura nel database
app.put('/api/books/:id/progress', (req, res) => {
    const { progress } = req.body;
    try {
        const info = db.prepare('UPDATE books SET progress = ? WHERE id = ?').run(progress, req.params.id);
        
        if (info.changes > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: tLog('errNotFound') });
        }
    } catch (e) { 
        console.error(tLog('errProgressUpdate'), e);
        res.status(500).json({ success: false, message: tLog('errInternal') }); 
    }
});

// --- ROTTA PER SALVARE LA RECENSIONE ---
app.put('/api/books/:id/review', (req, res) => {
    const bookId = req.params.id;
    const { rating, reviewText } = req.body;

    try {
        const info = db.prepare('UPDATE books SET rating = ?, review = ? WHERE id = ?').run(rating, reviewText, bookId);

        if (info.changes > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: tLog('errNotFound') });
        }
    } catch (error) {
        console.error(tLog('errSaveReview'), error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER SALVARE UNA SOTTOLINEATURA ---
app.post('/api/books/:id/highlights', (req, res) => {
    const bookId = req.params.id;
    const { cfi, text } = req.body;
    try {
        const row = db.prepare('SELECT * FROM books WHERE id = ?').get(bookId);
        if (!row) return res.status(404).json({ success: false, message: tLog('errNotFound') });

        // 🔥 FIX ROBUSTO: Parsing sicuro con fallback garantito
        let parsedHighlights = [];
        try {
            const raw = row.highlights;
            // Se è già un array (better-sqlite3 a volte lo fa), usalo direttamente
            if (Array.isArray(raw)) {
                parsedHighlights = raw;
            } 
            // Se è una stringa JSON, parsala
            else if (typeof raw === 'string' && raw.trim() !== '') {
                const parsed = JSON.parse(raw);
                parsedHighlights = Array.isArray(parsed) ? parsed : [];
            }
            // Se è null/undefined/stringa vuota, resta array vuoto
        } catch (parseError) {
            console.warn(`⚠️ Highlight corrotti per libro ${bookId}, resetto a []`);
            parsedHighlights = [];
        }

        // Stessa cosa per i tags (per sicurezza)
        let parsedTags = [];
        try {
            const rawTags = row.tags;
            if (Array.isArray(rawTags)) {
                parsedTags = rawTags;
            } else if (typeof rawTags === 'string' && rawTags.trim() !== '') {
                const parsed = JSON.parse(rawTags);
                parsedTags = Array.isArray(parsed) ? parsed : [];
            }
        } catch (e) {
            parsedTags = [];
        }

        const book = { 
            ...row, 
            tags: parsedTags, 
            highlights: parsedHighlights 
        };
        
        // Aggiungiamo il nuovo highlight
        book.highlights.push({ cfi, text, date: Date.now() });
        
        upsertBook(book);
        res.json({ success: true, message: 'Evidenziazione salvata!' });
    } catch (error) {
        console.error("Errore salvataggio highlight:", error);
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER ELIMINARE UNA SOTTOLINEATURA ---
app.delete('/api/books/:id/highlights', (req, res) => {
    const bookId = req.params.id;
    const { cfi } = req.body; // Riceviamo il CFI esatto da eliminare

    try {
        const row = db.prepare('SELECT * FROM books WHERE id = ?').get(bookId);
        if (!row) return res.status(404).json({ success: false, message: 'Libro non trovato.' });

        const book = { 
            ...row, 
            tags: JSON.parse(row.tags || '[]'), 
            highlights: JSON.parse(row.highlights || '[]') 
        };
        
        // Filtriamo l'array mantenendo solo gli highlight DIVERSI da quello cliccato
        book.highlights = book.highlights.filter(hl => hl.cfi !== cfi);
        
        upsertBook(book); // Aggiorniamo il DB
        res.json({ success: true, message: 'Evidenziazione rimossa!' });
    } catch (error) {
        console.error("Errore rimozione highlight:", error);
        res.status(500).json({ success: false, message: 'Errore interno.' });
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
// --- CATCHER PER PROMISE NON GESTITE (Impedisce il crash asincrono) ---
process.on('unhandledRejection', (reason, promise) => {
    console.warn(`\n${tLog('shieldUnhandledRejection')}`);
    console.warn(`${tLog('shieldReason')}`, reason?.message || reason);
    console.warn(`${tLog('shieldServerContinues')}\n`);
});

// --- ROTTA PER MODIFICARE I METADATI DEL LIBRO ---
app.post('/api/books/edit', upload.single('cover'), async (req, res) => {
    try {
        const { id, title, author, category, description } = req.body;
        const file = req.file; // Può essere undefined se l'utente non ha caricato una nuova foto

        if (!id) return res.status(400).json({ success: false, message: "ID mancante" });

        // 1. Recupera il libro corrente dal database
        const row = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
        if (!row) {
            if (file) await fs.unlink(file.path).catch(()=>{});
            return res.status(404).json({ success: false, message: tLog('errNotFound') });
        }

        // Prepariamo l'oggetto libro aggiornato
        const currentBook = { 
            ...row, 
            tags: JSON.parse(row.tags || '[]'),
            highlights: JSON.parse(row.highlights || '[]') // <-- FIX: decodifica la stringa in array prima del salvataggio
        };

        // 2. Aggiorna i campi di testo
        currentBook.title = title || currentBook.title;
        currentBook.author = author || currentBook.author;
        currentBook.description = description || currentBook.description;

        // In KoreShelf, il primo elemento dell'array 'tags' funge da Categoria principale
        if (category) {
            if (currentBook.tags.length > 0) {
                currentBook.tags[0] = category;
            } else {
                currentBook.tags.push(category);
            }
        }

        // 3. Gestione della nuova Copertina (se presente)
        if (file) {
            console.log(`Aggiornamento copertina per il libro: ${currentBook.title}`);
            
            // Usiamo un timestamp per il nome del file. Questo trucco ("Cache Busting") 
            // costringe il browser e Three.js a caricare la nuova immagine invece di usare quella vecchia in cache
            const timestamp = Date.now();
            const newCoverName = `cover_${id}_${timestamp}.jpg`;
            const fullCoverPath = path.join(coversDir, newCoverName);

            // Magia di Sharp: ritaglia e ottimizza esattamente come nell'upload originale
            await sharp(file.path)
                .resize(512, 768, { 
                    fit: 'cover', 
                    position: 'center'
                })
                .jpeg({ quality: 80, progressive: true })
                .toFile(fullCoverPath);

            // Pulizia: eliminiamo il file temporaneo caricato da Multer
            await fs.unlink(file.path).catch(()=>{});

            // Pulizia del disco: eliminiamo la VECCHIA copertina per non occupare spazio inutile
            if (currentBook.coverPath) {
                const oldCoverPath = path.join(publicDir, currentBook.coverPath);
                await fs.unlink(oldCoverPath).catch(()=>{});
            }

            // Aggiorniamo il percorso nel database
            currentBook.coverPath = `covers/${newCoverName}`;
        }

        // 4. Salviamo tutto nel Database usando il tuo helper
        upsertBook(currentBook);
        console.log(`Metadati aggiornati con successo per: ${currentBook.title}`);

        // Rimandiamo indietro il libro aggiornato al frontend
        res.json({ success: true, updatedBook: currentBook });

    } catch (error) {
        console.error("Errore durante la modifica dei metadati:", error);
        if (req.file) await fs.unlink(req.file.path).catch(()=>{});
        res.status(500).json({ success: false, message: tLog('errInternal') });
    }
});

// --- ROTTA PER SPEGNIMENTO SERVER ---
app.post('/api/shutdown', async (req, res) => {
    console.log(tLog('logShutdownRequest'));

    try {
        // Leggiamo tutti i file presenti nella cartella uploads
        const files = await fs.readdir(uploadDir);
        
        // Cicliamo e cancelliamo ogni singolo file
        for (const file of files) {
            await fs.unlink(path.join(uploadDir, file));
        }
        
        if (files.length > 0) {
            console.log(` Pulizia completata: rimossi ${files.length} file temporanei dalla cartella uploads.`);
        }
    } catch (error) {
        console.error("Errore durante la pulizia della cartella uploads:", error.message);
    }

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