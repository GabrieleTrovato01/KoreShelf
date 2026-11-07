//! KoreShelf per Android e iOS.
//!
//! È solo un "guscio": avvia lo stesso server della versione desktop (la libreria `koreshelf`)
//! nella cartella dati dell'app e mostra la sua interfaccia in una WebView.
//! I link esterni (Amazon, GitHub, ...) vengono aperti nel browser del sistema.

use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_opener::OpenerExt;

/// Porta fissa: l'interfaccia salva lingua e preferenze per indirizzo, quindi deve restare
/// la stessa a ogni avvio (se fosse occupata, la libreria ne sceglie un'altra).
const PORT: u16 = 47123;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let data_dir = app.path().app_data_dir()?;
            // I link esterni chiesti dall'interfaccia si aprono nel browser del sistema, su un
            // thread a parte: mai dentro le callback della WebView (su Android bloccherebbe l'app)
            let opener_handle = app.handle().clone();
            let url = koreshelf::start_embedded_with(data_dir, PORT, std::sync::Arc::new(move |link: String| {
                let h = opener_handle.clone();
                std::thread::spawn(move || {
                    let _ = h.opener().open_url(link, None::<&str>);
                });
            }))?;
            let origin = url.trim_end_matches('/').to_string();
            let handle = app.handle().clone();

            let builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::External(url.parse()?))
                // L'interfaccia sa di essere un'app (niente pulsante "Spegni", link esterni via navigazione)
                .initialization_script("window.__KORESHELF_DESKTOP__ = true; window.__KORESHELF_MOBILE__ = true;")
                .on_navigation(move |target| {
                    let target = target.as_str();
                    let internal = target.starts_with(&origin)
                        || target.starts_with("about:")
                        || target.starts_with("blob:")
                        || target.starts_with("data:");
                    if !internal && (target.starts_with("https://") || target.starts_with("http://") || target.starts_with("mailto:")) {
                        // Rete di sicurezza: anche qui niente lavoro dentro la callback della WebView
                        let (h, link) = (handle.clone(), target.to_string());
                        std::thread::spawn(move || {
                            let _ = h.opener().open_url(link, None::<&str>);
                        });
                    }
                    internal
                });
            #[cfg(desktop)]
            let builder = builder.title("KoreShelf").inner_size(420.0, 860.0);
            builder.build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("KoreShelf non è riuscito ad avviarsi");
}
