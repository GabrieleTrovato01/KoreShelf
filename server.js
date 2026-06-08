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
    console.log("📁 Cartella 'uploads' creata automaticamente.");
}

if (!fsSync.existsSync(coversDir)) {
    fsSync.mkdirSync(coversDir, { recursive: true });
    console.log("📁 Cartella 'covers' creata automaticamente.");
}


if (!fsSync.existsSync(booksJsonPath)) {
    fsSync.writeFileSync(booksJsonPath, '[]'); 
    console.log("📄 File 'books.json' creato automaticamente.");
} else if (fsSync.statSync(booksJsonPath).isDirectory()) {
    // Protezione Docker
    console.error("⚠️ ERRORE CRITICO: Docker ha creato 'books.json' come cartella invece che come file! Elimina la cartella e riavvia.");
}
// ----------------------------------------------------

const upload = multer({ dest: uploadDir });
// --- FIX PER I PERCORSI DI PKG ED ESBUILD ---
let distPath;

if (process.pkg) {
    // Se gira dentro l'eseguibile, esbuild ha creato un ambiente CJS, 
    // quindi __dirname esiste e punta alla cartella invisibile "build-output"
    distPath = path.join(__dirname, '../dist');
} else {
    // Se gira in locale sul tuo PC, usiamo semplicemente process.cwd() 
    // esattamente come hai già fatto brillantemente per uploads e covers
    distPath = path.join(process.cwd(), 'dist');
}

app.use(express.json());
app.use(express.static(distPath)); 
app.use(express.static(publicDir));

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
            console.log(`⚠️ Metadati corrotti rilevati! Uso il nome del file...`);
            
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
                
                console.log(`🪄 Trovato un trattino! Titolo: "${extractedTitle}", Autore: "${extractedAuthor}"`);
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
            author: extractedAuthor || 'Autore Sconosciuto',
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
                console.error("⚠️ Impossibile estrarre l'immagine dall'EPUB:", imgError.message);
            }
        }
        return metadata;
    } catch (error) {
        throw new Error(`Errore di parsing EPUB: ${error.message}`);
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
            console.log(`⚠️ Metadati PDF assenti o corrotti! Uso il nome del file...`);
            let cleanName = originalFileName.replace(/\.pdf$/i, '');
            
            if (cleanName.includes('-')) {
                const parts = cleanName.split('-');
                extractedTitle = parts[0].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                extractedAuthor = parts[1].replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
            } else {
                cleanName = cleanName.replace(/[_-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ');
                extractedTitle = cleanName.replace(/\s+/g, ' ').trim();
                extractedAuthor = 'Autore Sconosciuto';
            }
        }

        const rawTextLength = pdfData.text ? pdfData.text.length : 0;

        const metadata = {
            title: extractedTitle,
            author: extractedAuthor || 'Autore Sconosciuto',
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
            
            console.log("📸 Prima pagina PDF trasformata con successo in copertina!");
            metadata.coverPath = `covers/${resolveImg.name}`;

        } catch (imgError) {
            console.error("⚠️ Impossibile generare la copertina dal PDF:", imgError.message);
        }

        return metadata;

    } catch (error) {
        throw new Error(`Errore di parsing PDF: ${error.message}`);
    }
}

// --- TIMER DI SICUREZZA PER GLI EPUB CORROTTI ---
function parseEpubWithTimeout(filePath, coverFileName, originalFileName, timeoutMs = 8000) {
    return Promise.race([
        parseEpub(filePath, coverFileName, originalFileName),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout: L'EPUB è malformato o troppo complesso e ha bloccato la lettura.")), timeoutMs)
        )
    ]);
}

// Apple Books + calcolo pagine stimato
async function fetchBestBookData(title, author, rawTextLength) {
    let result = {
        description: "Trama non trovata.",
        coverUrl: null,
        pageCount: 350, 
        googleTitle: null, 
        googleAuthor: null,
        categories: []
    };

    const searchTitle = title === 'Titolo Sconosciuto' ? '' : title;
    const searchAuthor = author === 'Autore Sconosciuto' ? '' : author;
    const cleanQuery = `${searchTitle} ${searchAuthor}`.replace(/[_-]/g, ' ').trim();

    // --- STEP 1: APPLE BOOKS (Per Copertina HQ e Trama in Italiano) ---
    try {
        const appleUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanQuery)}&media=ebook&country=it&limit=1`;
        console.log(`🍏 Contatto Apple Books per la trama: ${appleUrl}`);
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
        console.error("⚠️ Apple Books non ha risposto in tempo.");
    }

    if (rawTextLength && rawTextLength > 0) {
        // Una cartella editoriale (pagina) è in media 1500 battute
        const calculatedPages = Math.ceil(rawTextLength / 1500);
        
        // Aggiungiamo un 5% forfettario per simulare indici, titoli di capitolo e pagine bianche
        result.pageCount = Math.floor(calculatedPages * 1.05); 
        console.log(`🧮 Pagine calcolate matematicamente dal testo: ${result.pageCount}`);
    } else {
        // Se l'EPUB era vuoto o rotto
        result.pageCount = 350; // Valore di default più realistico per un libro medio
        console.log(`⚠️ Impossibile leggere il testo per il calcolo, uso spessore casuale.`);
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
        console.error("⚠️ Errore nel download della copertina da Apple Books:", error.message);
        return null;
    }
}

// --- API UPLOAD ---
app.post('/api/upload', upload.single('ebook'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ success: false, message: 'Nessun file caricato.' });

        console.log(`\n📥 Inizio elaborazione di: ${file.originalname}...`);

        const timestamp = Date.now();
        const baseName = `book_${timestamp}`;

        console.log(`⚙️  Estrazione metadati e copertina interna...`);
        const fileExt = path.extname(file.originalname).toLowerCase();
        let bookData;

        if (fileExt === '.epub') {
            bookData = await parseEpubWithTimeout(file.path, baseName, file.originalname, 8000);
        } else if (fileExt === '.pdf') {
            bookData = await parsePdf(file.path, baseName, file.originalname);
        } else {
            // Se qualcuno forza il caricamento di un file non supportato
            try { await fs.unlink(file.path); } catch(e){}
            return res.status(400).json({ success: false, message: 'Formato non supportato. Usa EPUB o PDF.' });
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
            console.log(`🛑 Upload bloccato: "${bookData.title}" è già presente in libreria.`);
            try { await fs.unlink(file.path); } catch (err) {}
            return res.json({ success: false, message: 'Questo libro è già presente nel tuo scaffale!' });
        }

        console.log(`✔️  Dati iniziali: "${bookData.title}" di ${bookData.author}`);
        
        console.log(`⏳ Attesa iniziale di 2 secondi per non sovraccaricare le API di Google...`);
        
        console.log(`🔍 Ricerca dati su  Books...`);
        const googleData = await fetchBestBookData(bookData.title, bookData.author, bookData.textLength);

        let finalTitle = bookData.title;
        let finalAuthor = bookData.author;

        if (googleData.googleTitle) {
            const titleWords = bookData.title.toLowerCase().split(' ').filter(w => w.length > 3);
            const googleTitleLower = googleData.googleTitle.toLowerCase();
            const isRelated = titleWords.some(word => googleTitleLower.includes(word));

            if (isRelated || bookData.title === 'Titolo Sconosciuto') {
                finalTitle = googleData.googleTitle;
                finalAuthor = googleData.googleAuthor || bookData.author;
                console.log(`✨ Autocorrezione: Titolo corretto in "${finalTitle}"`);
            }
        }

        let finalCoverPath = bookData.coverPath; 
        if (!finalCoverPath && googleData.coverUrl) {
            console.log(`🖼️  Copertina assente nell'EPUB. Download in corso da Google Books...`);
            finalCoverPath = await downloadCoverImage(googleData.coverUrl, baseName);
        }

        let finalDescription = "Nessuna trama disponibile per questo libro.";
        let epubDesc = bookData.description;

        if (epubDesc) epubDesc = epubDesc.replace(/^(EDGT[0-9]+[\r\n\s]*)/i, '').trim();

        if (epubDesc && epubDesc.length > 30) {
            console.log(`📖 Trama valida trovata all'interno dell'EPUB!`);
            finalDescription = epubDesc;
        } else if (googleData.description && googleData.description !== "Trama non trovata su Google Books.") {
            console.log(`🌐 Trama EPUB assente o non valida. Trama scaricata da Google Books.`);
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

        console.log(`📝 Aggiornamento della libreria...`);
        currentBooks.push(newBook);
        await fs.writeFile(booksJsonPath, JSON.stringify(currentBooks, null, 4));

        try { await fs.unlink(file.path); } catch (unlinkError) {}

        console.log(`✅ Successo! "${newBook.title}" aggiunto allo scaffale.\n`);
        res.json({ success: true, message: 'Libro elaborato e aggiunto con successo!' });

    } catch (error) {
        console.error("❌ Errore critico durante l'elaborazione del libro:", error);
        res.status(500).json({ success: false, message: 'Errore interno del server.' });
    }
});

// --- ROTTA PER AGGIUNGERE TAG PERSONALIZZATI ---
app.post('/api/books/:id/tags', async (req, res) => {
    const bookId = req.params.id;
    const { tag } = req.body;

    if (!tag || tag.trim() === '') {
        return res.status(400).json({ success: false, message: 'Tag non valido.' });
    }

    try {
        const fileData = await fs.readFile(booksJsonPath, 'utf-8');
        let books = JSON.parse(fileData);
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) return res.status(404).json({ success: false, message: 'Libro non trovato.' });

        // Inizializza l'array se non esiste
        if (!books[bookIndex].tags) books[bookIndex].tags = [];

        const cleanTag = tag.trim();
        // Aggiungiamo il tag in cima, così diventa la categoria "Principale" per la mensola
        const tagExists = books[bookIndex].tags.some(t => t.toLowerCase() === cleanTag.toLowerCase());
        
        if (!tagExists) {
            books[bookIndex].tags.unshift(cleanTag); // unshift lo mette al primo posto
            await fs.writeFile(booksJsonPath, JSON.stringify(books, null, 4));
            return res.json({ success: true, message: 'Tag aggiunto!' });
        } else {
            return res.json({ success: true, message: 'Tag già presente.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Errore interno del server.' });
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
            return res.status(404).json({ success: false, message: 'Libro non trovato.' });
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
            console.log(`⚠️ Libro rimosso dal database, ma i file fisici erano già assenti.`);
        }

        console.log(`🗑️ Eliminato con successo: "${bookToDelete.title}"`);
        res.json({ success: true, message: 'Libro eliminato con successo!' });

    } catch (error) {
        console.error("Errore durante l'eliminazione del libro:", error);
        res.status(500).json({ success: false, message: 'Errore interno del server.' });
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
            res.json({ success: true, message: `Categoria aggiornata con successo su ${updatedCount} libri.` });
        } else {
            res.json({ success: false, message: 'Nessun libro trovato per questa categoria.' });
        }
    } catch (error) {
        console.error("Errore nella gestione categorie:", error);
        res.status(500).json({ success: false, message: 'Errore interno del server.' });
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
            res.json({ success: true, message: `Spostati ${updatedCount} libri.` });
        } else {
            res.json({ success: false, message: 'Nessun libro aggiornato.' });
        }
    } catch (error) {
        console.error("Errore nell'aggiornamento massivo:", error);
        res.status(500).json({ success: false, message: 'Errore interno del server.' });
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
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false });
        }
    } catch (e) { res.status(500).json({ success: false }); }
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
            res.status(404).json({ success: false, message: 'Libro non trovato.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Errore interno.' });
    }
});

// --- SCUDO ANTI-CRASH GLOBALE ---
// Cattura gli errori critici non gestiti dalle librerie esterne (come epub2) 
// per evitare che il server Node.js si spenga improvvisamente.
process.on('uncaughtException', (err) => {
    console.warn('\n🛡️ SCUDO ATTIVATO: Un errore critico ha tentato di far crashare il server!');
    
    if (err.message && err.message.includes('linkparts.shift')) {
        console.warn('⚠️ Causa: Un file EPUB malformato ha fatto impazzire la libreria "epub2".');
        console.warn('👉 Soluzione: Usa Calibre per convertire l\'EPUB in EPUB (così da pulire il codice interno) e ricaricalo.\n');
    } else {
        console.warn('❌ Errore imprevisto:', err);
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
            return res.status(404).json({ success: false, message: 'Libro non trovato.' });
        }



        const physicalEpubPath = path.join(publicDir, book.epubPath);
        
        console.log(`📦 Generazione Knowledge Base Markdown per: ${book.title}...`);

        let fullText = "";

        // Bivio: Estrazione testo in base al formato
        if (book.epubPath.toLowerCase().endsWith('.pdf')) {
            console.log(`📄 Lettura PDF rilevata. Estrazione testo grezzo in corso...`);
            const dataBuffer = await fs.readFile(physicalEpubPath);
            const pdfData = await pdfParse(dataBuffer);
            fullText = pdfData.text;
        } else {
            console.log(`📚 Lettura EPUB rilevata. Estrazione tramite LangChain in corso...`);
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
        const fileName = `LoreKeeper_${safeTitle}.md`; // Estensione .md

        // Configurazione Header per il download di un file Markdown
        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-type', 'text/markdown');
        res.charset = 'UTF-8';
        
        // --- COSTRUZIONE DEL DOCUMENTO MARKDOWN (Self-Instructing) ---
        const now = new Date().toISOString().split('T')[0];
        const mainCategory = (book.tags && book.tags.length > 0) ? book.tags[0] : "Senza Categoria";

        const markdownHeader = `---
        title: "${book.title.replace(/"/g, '\\"')}"
        author: "${book.author.replace(/"/g, '\\"')}"
        category: "${mainCategory}"
        exported_from: "LoreKeeper"
        export_date: ${now}
        tags: [LoreKeeper, KnowledgeBase, ${mainCategory.replace(/\s+/g, '')}]
        ---

        # ${book.title}

        > **LoreKeeper Smart Document:** Questo file è stato generato automaticamente da LoreKeeper come una Knowledge Base in formato Markdown, 
        pronta per essere importata in qualsiasi sistema di gestione della conoscenza o IA esterna.
        Contiene i metadati essenziali del libro, la trama (se disponibile) e il testo completo estratto dall'EPUB, pulito da qualsiasi formattazione HTML.

        ---

        ## 📖 Dettagli e Trama
        - **Autore:** ${book.author}
        - **Pagine stimante:** ${book.pageCount}

        ### Trama originale
        ${book.description}

        ---

        ## 📂 Contenuto del Libro

        ${fullText}

        ---
        *Fine del documento - Generato da LoreKeeper*
        `;

        res.write(markdownHeader);
        res.end();

    } catch (error) {
        console.error("Errore durante l'esportazione Markdown:", error);
        res.status(500).json({ success: false, message: 'Errore interno del server durante la generazione del Markdown.' });
    }
});

// --- ROTTA PER SPEGNIMENTO SERVER ---
app.post('/api/shutdown', (req, res) => {
    console.log("🛑 Richiesta di spegnimento ricevuta dal client. Chiusura del server in corso...");
    res.json({ success: true, message: "Server in chiusura" });
    
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});

app.listen(port, () => {
    console.log(`🚀 Backend in ascolto su http://localhost:${port}`);

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
            console.error("Impossibile aprire il browser automaticamente:", error);
        }
    });
});