//! Dove KoreShelf salva i suoi dati.
//!
//! * Modalità normale: `%APPDATA%\KoreShelf` su Windows (la libreria resta lì
//!   anche se sposti o aggiorni il file .exe).
//! * Modalità portatile: se accanto all'eseguibile esiste una cartella
//!   `KoreShelf_Data`, i dati vengono salvati lì (comodo per le chiavette USB).

use std::fs;
use std::path::{Path, PathBuf};

pub struct Paths {
    pub root: PathBuf,
    pub db_file: PathBuf,
    pub covers: PathBuf,
    pub ebooks: PathBuf,
    pub uploads: PathBuf,
    #[allow(dead_code)]
    pub webview: PathBuf,
    pub log_file: PathBuf,
    pub portable: bool,
}

pub const PORTABLE_DIR: &str = "KoreShelf_Data";

fn exe_dir() -> Option<PathBuf> {
    std::env::current_exe().ok()?.parent().map(Path::to_path_buf)
}

impl Paths {
    /// Dati in una cartella precisa (usato dall'app mobile: la cartella la decide il sistema).
    pub fn at(root: PathBuf) -> std::io::Result<Self> {
        Self::build(root, false)
    }

    pub fn resolve() -> std::io::Result<Self> {
        let portable_dir = exe_dir().map(|d| d.join(PORTABLE_DIR));
        let (root, portable) = match &portable_dir {
            Some(dir) if dir.is_dir() => (dir.clone(), true),
            _ => match dirs::data_dir() {
                Some(dir) => (dir.join("KoreShelf"), false),
                None => (portable_dir.unwrap_or_else(|| PathBuf::from(PORTABLE_DIR)), true),
            },
        };

        Self::build(root, portable)
    }

    fn build(root: PathBuf, portable: bool) -> std::io::Result<Self> {
        let paths = Paths {
            db_file: root.join("koreshelf.db"),
            covers: root.join("covers"),
            ebooks: root.join("ebooks"),
            uploads: root.join("uploads"),
            webview: root.join("webview"),
            log_file: root.join("koreshelf.log"),
            root,
            portable,
        };
        for dir in [&paths.root, &paths.covers, &paths.ebooks, &paths.uploads] {
            fs::create_dir_all(dir)?;
        }
        paths.clean_uploads();
        Ok(paths)
    }

    /// Elimina i file temporanei rimasti da un caricamento interrotto.
    fn clean_uploads(&self) {
        if let Ok(entries) = fs::read_dir(&self.uploads) {
            for entry in entries.flatten() {
                let _ = fs::remove_file(entry.path());
            }
        }
    }

    /// Converte un percorso relativo salvato nel DB (es. `covers/x.jpg`)
    /// in un percorso assoluto, rifiutando qualsiasi tentativo di uscire
    /// dalla cartella dati.
    pub fn resolve_relative(&self, relative: &str) -> Option<PathBuf> {
        let rel = Path::new(relative);
        let safe = rel.components().all(|c| matches!(c, std::path::Component::Normal(_)));
        if relative.is_empty() || !safe {
            return None;
        }
        Some(self.root.join(rel))
    }

    /// Se esiste una libreria della vecchia versione Node.js (cartella `public`
    /// con `koreshelf.db`, `covers`, `ebooks`) e quella nuova è ancora vuota,
    /// la copia automaticamente.
    pub fn migrate_legacy_library(&self) {
        if self.db_file.exists() {
            return;
        }
        let mut candidates = Vec::new();
        if let Some(dir) = exe_dir() {
            candidates.push(dir.join("public"));
        }
        if let Ok(cwd) = std::env::current_dir() {
            candidates.push(cwd.join("public"));
        }
        for legacy in candidates {
            let legacy_db = legacy.join("koreshelf.db");
            let has_data = fs::metadata(&legacy_db).map(|m| m.len() > 0).unwrap_or(false);
            if !has_data {
                continue;
            }
            crate::log_info!("Trovata libreria della versione precedente in {}", legacy.display());
            let result = fs::copy(&legacy_db, &self.db_file)
                .and_then(|_| copy_dir(&legacy.join("covers"), &self.covers))
                .and_then(|_| copy_dir(&legacy.join("ebooks"), &self.ebooks));
            match result {
                Ok(()) => crate::log_info!("Libreria importata con successo"),
                Err(e) => crate::log_error!("Importazione libreria fallita: {e}"),
            }
            return;
        }
    }
}

fn copy_dir(from: &Path, to: &Path) -> std::io::Result<()> {
    if !from.is_dir() {
        return Ok(());
    }
    fs::create_dir_all(to)?;
    for entry in fs::read_dir(from)?.flatten() {
        let path = entry.path();
        if path.is_file() {
            fs::copy(&path, to.join(entry.file_name()))?;
        }
    }
    Ok(())
}
