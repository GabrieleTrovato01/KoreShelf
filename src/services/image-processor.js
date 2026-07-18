/**
 * Ridimensiona e ritaglia una copertina grezza a un formato fisso (512x768)
 * riproducendo il comportamento di Sharp (ritaglio centrale 'cover').
 * 
 * @param {string} sourceBase64 - Immagine di origine in Base64 (con o senza intestazione)
 * @param {number} targetWidth - Larghezza desiderata (default 512)
 * @param {number} targetHeight - Altezza desiderata (default 768)
 * @param {number} quality - Qualità di compressione JPEG da 0.1 a 1.0 (default 0.7)
 * @returns {Promise<string>} Immagine ottimizzata in formato Base64 (senza intestazione data:)
 */
export function processCoverImage(sourceBase64, targetWidth = 512, targetHeight = 768, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        // Aggiungiamo l'intestazione data: if non presente
        if (!sourceBase64.startsWith('data:')) {
            img.src = `data:image/jpeg;base64,${sourceBase64}`;
        } else {
            img.src = sourceBase64;
        }

        img.onload = () => {
            // Creiamo un canvas invisibile delle dimensioni target desiderate
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            // --- ALGORITMO DI RITAGLIO PROPORZIONALE ('cover') ---
            const sourceRatio = img.width / img.height;
            const targetRatio = targetWidth / targetHeight;

            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = img.width;
            let sourceHeight = img.height;

            if (sourceRatio > targetRatio) {
                // L'immagine originale è più larga del formato target (ritagliamo i lati)
                sourceWidth = img.height * targetRatio;
                sourceX = (img.width - sourceWidth) / 2;
            } else {
                // L'immagine originale è più alta del formato target (ritagliamo sopra e sotto)
                sourceHeight = img.width / targetRatio;
                sourceY = (img.height - sourceHeight) / 2;
            }

            // Disegniamo la porzione calcolata dell'immagine sul canvas ridimensionandola
            ctx.drawImage(
                img,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight, // Porzione sorgente
                0,
                0,
                targetWidth,
                targetHeight // Dimensioni sul canvas di destinazione
            );

            // Esportiamo in formato JPEG compresso
            // toDataURL restituisce "data:image/jpeg;base64,...."
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            const optimizedBase64 = dataUrl.split(',')[1];

            resolve(optimizedBase64);
        };

        img.onerror = (error) => {
            reject(new Error("Impossibile caricare o elaborare l'immagine di copertina sorgente: " + error.message));
        };
    });
}