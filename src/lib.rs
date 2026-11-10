//! KoreShelf come libreria: il server (API + interfaccia incorporata) e tutto ciò che serve
//! per leggere EPUB, PDF, FB2, CBZ, TXT e Markdown. Lo usano sia l'app desktop (src/main.rs) sia l'app mobile (mobile/).

pub mod assets;
pub mod cbz;
pub mod db;
pub mod dialogs;
pub mod epub;
pub mod epub_writer;
pub mod fb2;
pub mod i18n;
pub mod images;
pub mod isbn;
pub mod logger;
pub mod online;
pub mod paths;
pub mod pdf;
pub mod plaintext;
pub mod server;
pub mod server_mode;
pub mod text;

use server::{AppControl, AppState, Controller};
use std::path::PathBuf;
use std::sync::{mpsc, Arc, RwLock};

/// Avvia KoreShelf in background usando `data_dir` come cartella dei dati e restituisce
/// l'indirizzo dell'interfaccia (es. `http://127.0.0.1:47123/`).
/// `port = 0` sceglie una porta libera; con una porta fissa, se è occupata se ne usa un'altra.
pub fn start_embedded(data_dir: PathBuf, port: u16) -> Result<String, String> {
    start_embedded_with(data_dir, port, Arc::new(|_url: String| {}))
}

/// Come [`start_embedded`], ma i link esterni (Amazon, GitHub...) chiesti dall'interfaccia
/// vengono passati a `open_url`, che li apre nel browser del sistema.
pub fn start_embedded_with(
    data_dir: PathBuf,
    port: u16,
    open_url: Arc<dyn Fn(String) + Send + Sync>,
) -> Result<String, String> {
    let paths = paths::Paths::at(data_dir).map_err(|e| format!("cartella dati: {e}"))?;
    logger::init(&paths.log_file);
    log_info!("Avvio KoreShelf {} (incorporato) — dati in {}", env!("CARGO_PKG_VERSION"), paths.root.display());
    let db = Arc::new(db::Db::open(&paths.db_file).map_err(|e| format!("database: {e}"))?);
    let paths = Arc::new(paths);

    let (tx, rx) = mpsc::channel::<Result<String, String>>();
    std::thread::Builder::new()
        .name("koreshelf-server".into())
        .spawn(move || {
            let runtime = match tokio::runtime::Builder::new_multi_thread().enable_all().build() {
                Ok(rt) => rt,
                Err(e) => {
                    let _ = tx.send(Err(format!("runtime: {e}")));
                    return;
                }
            };
            runtime.block_on(async move {
                let listener = match tokio::net::TcpListener::bind(("127.0.0.1", port)).await {
                    Ok(l) => l,
                    Err(_) => match tokio::net::TcpListener::bind(("127.0.0.1", 0)).await {
                        Ok(l) => l,
                        Err(e) => {
                            let _ = tx.send(Err(format!("porta: {e}")));
                            return;
                        }
                    },
                };
                let url = match listener.local_addr() {
                    Ok(addr) => format!("http://127.0.0.1:{}/", addr.port()),
                    Err(e) => {
                        let _ = tx.send(Err(e.to_string()));
                        return;
                    }
                };
                // Sui dispositivi mobili l'app si chiude dal sistema: niente "spegni" né "porta in primo piano"
                let control: Controller = Arc::new(move |action: AppControl| {
                    if let AppControl::OpenUrl(url) = action {
                        open_url(url);
                    }
                });
                let state = AppState {
                    db,
                    paths,
                    http: online::http_client(),
                    lang: Arc::new(RwLock::new(i18n::DEFAULT_LANG.to_string())),
                    control,
                    public: false,
                    auth: None,
                };
                let _ = tx.send(Ok(url.clone()));
                log_info!("KoreShelf incorporato attivo su {url}");
                server::serve(listener, state).await;
            });
        })
        .map_err(|e| format!("thread: {e}"))?;

    rx.recv().map_err(|_| "il server non è partito".to_string())?
}
