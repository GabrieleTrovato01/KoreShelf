import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const log = (msg) => console.log(`\x1b[36m[Builder]\x1b[0m ${msg}`);

try {
    // 1. Compilazione del Frontend (Vite)
    log("Compilazione del frontend con Vite...");
    execSync('npm run build', { stdio: 'inherit' });

    // 2. Controllo e creazione della cartella di output
    const outputDir = path.join(process.cwd(), 'build-win');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // 3. Compilazione con Pkg
    log("Avvio del packaging con Pkg...");
    execSync('npx pkg package.json --config pkg-config.json', { stdio: 'inherit' });

    // 4. Copia dei moduli nativi di Sharp (Necessari per Windows)
    log("Estrazione dei moduli nativi di Sharp per la distribuzione...");
    const sharpVendorSrc = path.join(process.cwd(), 'node_modules', 'sharp', 'build', 'Release');
    const sharpVendorDst = path.join(outputDir, 'node_modules', 'sharp', 'build', 'Release');

    if (fs.existsSync(sharpVendorSrc)) {
        fs.mkdirSync(sharpVendorDst, { recursive: true });
        fs.readdirSync(sharpVendorSrc).forEach(file => {
            if (file.endsWith('.node') || file.endsWith('.dll')) {
                fs.copyFileSync(path.join(sharpVendorSrc, file), path.join(sharpVendorDst, file));
            }
        });
        log("✅ Moduli nativi Sharp copiati in build-win/node_modules/");
    } else {
        console.warn("⚠️ Attenzione: Cartella build/Release di Sharp non trovata. L'eseguibile potrebbe dare errori con le immagini.");
    }

    log("🎉 Processo completato! Trovi l'eseguibile nella cartella 'build-win'.");

} catch (error) {
    console.error("❌ Errore durante la build dell'eseguibile:", error.message);
    process.exit(1);
}