// In release su Windows niente finestra nera del terminale.
#![cfg_attr(all(windows, not(debug_assertions)), windows_subsystem = "windows")]

mod assets;
mod db;
mod dialogs;
mod epub;
mod i18n;
mod images;
mod isbn;
mod logger;
mod online;
mod paths;
mod pdf;
mod server;
mod text;
#[cfg(feature = "window")]
mod window;

#[cfg(not(feature = "window"))]
use server::AppControl;
use server::{AppState, Controller};
use std::sync::{Arc, RwLock};
use std::time::Duration;

const PREFERRED_PORT: u16 = 3000;
const FALLBACK_PORTS: std::ops::RangeInclusive<u16> = 3001..=3020;

/// Se KoreShelf è già aperto, gli chiediamo di mettersi in primo piano
/// invece di avviarne una seconda copia.
async fn wake_running_instance(client: &reqwest::Client) -> bool {
    let base = format!("http://127.0.0.1:{PREFERRED_PORT}");
    let ping = client.get(format!("{base}/api/ping")).timeout(Duration::from_millis(1500)).send().await;
    let is_koreshelf = match ping {
        Ok(r) => r
            .json::<serde_json::Value>()
            .await
            .map(|v| v.get("app").and_then(|a| a.as_str()) == Some("KoreShelf"))
            .unwrap_or(false),
        Err(_) => false,
    };
    if is_koreshelf {
        let _ = client.post(format!("{base}/api/focus")).timeout(Duration::from_secs(2)).send().await;
    }
    is_koreshelf
}

async fn bind_listener() -> std::io::Result<tokio::net::TcpListener> {
    if let Ok(l) = tokio::net::TcpListener::bind(("127.0.0.1", PREFERRED_PORT)).await {
        return Ok(l);
    }
    for port in FALLBACK_PORTS {
        if let Ok(l) = tokio::net::TcpListener::bind(("127.0.0.1", port)).await {
            return Ok(l);
        }
    }
    tokio::net::TcpListener::bind(("127.0.0.1", 0)).await
}

fn main() {
    // `koreshelf --version`: usato dai controlli automatici dei pacchetti (AppImage, dmg, exe)
    if std::env::args().any(|a| a == "--version" || a == "-V") {
        println!("KoreShelf {}", env!("CARGO_PKG_VERSION"));
        return;
    }

    let paths = match paths::Paths::resolve() {
        Ok(p) => p,
        Err(e) => {
            dialogs::error("KoreShelf", &format!("Impossibile creare la cartella dei dati:\n{e}"));
            return;
        }
    };
    logger::init(&paths.log_file);
    std::panic::set_hook(Box::new(|info| log_error!("PANIC: {info}")));
    log_info!(
        "Avvio KoreShelf {} — dati in {}{}",
        env!("CARGO_PKG_VERSION"),
        paths.root.display(),
        if paths.portable { " (modalità portatile)" } else { "" }
    );

    let runtime = match tokio::runtime::Builder::new_multi_thread().enable_all().build() {
        Ok(rt) => rt,
        Err(e) => {
            dialogs::error("KoreShelf", &format!("Impossibile avviare KoreShelf:\n{e}"));
            return;
        }
    };
    let http = online::http_client();

    if runtime.block_on(wake_running_instance(&http)) {
        log_info!("KoreShelf era già aperto: lo porto in primo piano");
        return;
    }

    let listener = match runtime.block_on(bind_listener()) {
        Ok(l) => l,
        Err(e) => {
            dialogs::error("KoreShelf", &format!("Impossibile avviare il server interno:\n{e}"));
            return;
        }
    };
    let port = listener.local_addr().map(|a| a.port()).unwrap_or(PREFERRED_PORT);
    let url = format!("http://127.0.0.1:{port}/");

    paths.migrate_legacy_library();
    let db = match db::Db::open(&paths.db_file) {
        Ok(db) => Arc::new(db),
        Err(e) => {
            dialogs::error("KoreShelf", &format!("Impossibile aprire la libreria:\n{e}"));
            return;
        }
    };

    #[cfg(feature = "window")]
    let webview_dir = paths.webview.clone();
    let paths = Arc::new(paths);
    let make_state = move |control: Controller| AppState {
        db,
        paths,
        http,
        lang: Arc::new(RwLock::new(i18n::DEFAULT_LANG.to_string())),
        control,
    };

    #[cfg(feature = "window")]
    window::run(runtime, listener, make_state, url, webview_dir);

    #[cfg(not(feature = "window"))]
    {
        // Modalità browser: il server resta acceso finché non si preme "Spegni".
        let browser_url = url.clone();
        let control: Controller = Arc::new(move |action| match action {
            AppControl::Shutdown => std::process::exit(0),
            AppControl::Focus => {
                let _ = open::that_detached(&browser_url);
            }
        });
        let state = make_state(control);
        runtime.block_on(async move {
            let _ = open::that_detached(&url);
            log_info!("KoreShelf avviato su {url}");
            server::serve(listener, state).await;
        });
    }
}
