import { Filesystem, Directory } from '@capacitor/filesystem';

// Helper per convertire un oggetto File (da input HTML) in una stringa Base64
// Capacitor richiede il formato Base64 per scrivere i file binari sul disco nativo
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Rimuoviamo l'intestazione iniziale del dataURL (es. "data:application/epub+zip;base64,")
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}

// Salva un ebook (.epub o .pdf) sul dispositivo
export async function saveEbookFile(fileName, base64Data) {
    try {
        const result = await Filesystem.writeFile({
            path: `ebooks/${fileName}`,
            data: base64Data,
            directory: Directory.Data, // Cartella privata dell'app, protetta e persistente
            recursive: true // Crea automaticamente le cartelle intermedie se non esistono
        });
        return result.uri; // Restituisce il percorso nativo interno (es. file://...)
    } catch (error) {
        console.error("Errore nel salvataggio del file ebook nativo:", error);
        throw error;
    }
}

// Salva un'immagine di copertina
export async function saveCoverFile(fileName, base64Data) {
    try {
        const result = await Filesystem.writeFile({
            path: `covers/${fileName}`,
            data: base64Data,
            directory: Directory.Data,
            recursive: true
        });
        return result.uri;
    } catch (error) {
        console.error("Errore nel salvataggio della copertina nativa:", error);
        throw error;
    }
}

// Legge un file e lo restituisce sotto forma di URL sicuro da dare in pasto a Three.js o al Reader
export async function getFileURL(relativePath) {
    try {
        const file = await Filesystem.getUri({
            directory: Directory.Data,
            path: relativePath
        });
        
        // Capacitor.convertFileSrc converte percorsi nativi "file://" in URL utilizzabili dalla WebView
        return window.Capacitor ? window.Capacitor.convertFileSrc(file.uri) : file.uri;
    } catch (error) {
        console.error("Errore nel recupero dell'URL del file:", error);
        return null;
    }
}

// Elimina fisicamente i file dal disco quando un libro viene rimosso
export async function deletePhysicalFiles(epubPath, coverPath) {
    try {
        if (epubPath) {
            await Filesystem.deleteFile({
                directory: Directory.Data,
                path: epubPath
            }).catch(() => console.warn("File Ebook già assente fisicamente."));
        }
        if (coverPath) {
            await Filesystem.deleteFile({
                directory: Directory.Data,
                path: coverPath
            }).catch(() => console.warn("File Copertina già assente fisicamente."));
        }
    } catch (e) {
        console.error("Errore durante la pulizia dei file fisici:", e);
    }
}