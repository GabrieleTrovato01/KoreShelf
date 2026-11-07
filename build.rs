use std::path::Path;
use std::process::Command;

fn main() {
    println!("cargo:rerun-if-changed=frontend/dist");
    println!("cargo:rerun-if-changed=assets/icon.ico");

    // Il frontend viene incorporato nell'exe: se manca la build di Vite la creiamo.
    if !Path::new("frontend/dist/index.html").exists() {
        let npm = if cfg!(windows) { "npm.cmd" } else { "npm" };
        let run = |args: &[&str]| {
            Command::new(npm)
                .args(args)
                .current_dir("frontend")
                .status()
                .map(|s| s.success())
                .unwrap_or(false)
        };
        if !(run(&["install"]) && run(&["run", "build"])) {
            panic!(
                "\n\nManca la cartella frontend/dist.\n\
                 Installa Node.js (https://nodejs.org) e lancia:\n\
                 \tcd frontend && npm install && npm run build\n\n"
            );
        }
    }

    // Icona e informazioni di versione dentro il file .exe
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() == Ok("windows") {
        let mut res = winresource::WindowsResource::new();
        res.set_icon("assets/icon.ico")
            .set("ProductName", "KoreShelf")
            .set("FileDescription", "KoreShelf - Libreria 3D di ebook")
            .set("LegalCopyright", "GabrieleTrovato01 - MIT License");
        if let Err(e) = res.compile() {
            println!("cargo:warning=Icona dell'exe non applicata: {e}");
        }
    }
}
