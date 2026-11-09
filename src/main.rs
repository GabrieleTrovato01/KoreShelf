// In release su Windows niente finestra nera del terminale.
#![cfg_attr(all(windows, not(debug_assertions)), windows_subsystem = "windows")]

use koreshelf::{db, dialogs, i18n, log_error, log_info, logger, online, paths, server, server_mode};
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
    // `koreshelf --health`: il controllo di salute di Docker (HEALTHCHECK)
    if std::env::args().any(|a| a == "--health") {
        std::process::exit(if health_check() { 0 } else { 1 });
    }
    // `koreshelf --server` (o KORESHELF_SERVER=1): self-hosting, per esempio in Docker
    let args: Vec<String> = std::env::args().collect();
    if server_mode::is_server_mode(&args, |k| std::env::var(k).ok()) {
        std::process::exit(run_server());
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
        public: false,
        auth: None,
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
            AppControl::OpenUrl(url) => {
                let _ = open::that_detached(url);
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

// ------------------------------------------------------------- modalità server

/// Self-hosting (Docker, server di casa): ascolta su KORESHELF_HOST:KORESHELF_PORT, dati in
/// KORESHELF_DATA, nessun browser aperto, log anche sul terminale, chiusura pulita con SIGTERM.
fn run_server() -> i32 {
    let cfg = match server_mode::ServerConfig::from_env(|k| std::env::var(k).ok()) {
        Ok(cfg) => cfg,
        Err(e) => {
            eprintln!("KoreShelf: {e}");
            return 2;
        }
    };
    let paths = match &cfg.data_dir {
        Some(dir) => paths::Paths::at(dir.clone()),
        None => paths::Paths::resolve(),
    };
    let paths = match paths {
        Ok(p) => p,
        Err(e) => {
            eprintln!("KoreShelf: impossibile usare la cartella dei dati: {e}");
            return 1;
        }
    };
    logger::init(&paths.log_file);
    logger::echo_to_terminal();
    std::panic::set_hook(Box::new(|info| log_error!("PANIC: {info}")));
    log_info!("Avvio KoreShelf {} in modalità server — dati in {}", env!("CARGO_PKG_VERSION"), paths.root.display());

    let runtime = match tokio::runtime::Builder::new_multi_thread().enable_all().build() {
        Ok(rt) => rt,
        Err(e) => {
            log_error!("Impossibile avviare KoreShelf: {e}");
            return 1;
        }
    };
    // Porta fissa: se è occupata lo si dice, invece di sceglierne un'altra che nessuno troverebbe
    let listener = match runtime.block_on(tokio::net::TcpListener::bind((cfg.host.as_str(), cfg.port))) {
        Ok(l) => l,
        Err(e) => {
            log_error!("Impossibile ascoltare su {}:{} — la porta {} è occupata o l'indirizzo non è valido ({e})", cfg.host, cfg.port, cfg.port);
            return 1;
        }
    };

    paths.migrate_legacy_library();
    let db = match db::Db::open(&paths.db_file) {
        Ok(db) => Arc::new(db),
        Err(e) => {
            log_error!("Impossibile aprire la libreria: {e}");
            return 1;
        }
    };
    let protected = cfg.auth.is_some();
    let state = AppState {
        db,
        paths: Arc::new(paths),
        http: online::http_client(),
        lang: Arc::new(RwLock::new(i18n::DEFAULT_LANG.to_string())),
        control: Arc::new(|_| {}), // sul server non si apre e non si spegne niente da remoto
        public: true,
        auth: cfg.auth.map(Arc::new),
    };
    log_info!(
        "KoreShelf è in ascolto su http://{}:{}/ {}",
        cfg.host,
        cfg.port,
        if protected { "(protetto da password)" } else { "(senza password: imposta KORESHELF_PASSWORD per proteggerlo)" }
    );
    runtime.block_on(server::serve_until(listener, state, stop_signal()));
    log_info!("KoreShelf fermato");
    0
}

/// `docker stop` manda SIGTERM, Ctrl+C manda SIGINT: in entrambi i casi ci si ferma puliti.
async fn stop_signal() {
    #[cfg(unix)]
    {
        use tokio::signal::unix::{signal, SignalKind};
        match signal(SignalKind::terminate()) {
            Ok(mut term) => {
                tokio::select! {
                    _ = term.recv() => {}
                    _ = tokio::signal::ctrl_c() => {}
                }
            }
            Err(_) => {
                let _ = tokio::signal::ctrl_c().await;
            }
        }
    }
    #[cfg(not(unix))]
    {
        let _ = tokio::signal::ctrl_c().await;
    }
}

/// `koreshelf --health`: chiede /api/ping al server sulla stessa macchina.
fn health_check() -> bool {
    use std::io::{Read, Write};
    let Ok(cfg) = server_mode::ServerConfig::from_env(|k| std::env::var(k).ok()) else { return false };
    let host = match cfg.host.as_str() {
        "0.0.0.0" | "::" | "[::]" => "127.0.0.1".to_string(),
        other => other.to_string(),
    };
    let Ok(mut addrs) = std::net::ToSocketAddrs::to_socket_addrs(&(host.as_str(), cfg.port)) else { return false };
    let Some(addr) = addrs.next() else { return false };
    let Ok(mut stream) = std::net::TcpStream::connect_timeout(&addr, Duration::from_secs(3)) else { return false };
    let _ = stream.set_read_timeout(Some(Duration::from_secs(3)));
    let request = "GET /api/ping HTTP/1.0\r\nHost: localhost\r\nConnection: close\r\n\r\n";
    if stream.write_all(request.as_bytes()).is_err() {
        return false;
    }
    let mut reply = String::new();
    let _ = stream.read_to_string(&mut reply);
    reply.starts_with("HTTP/1.") && reply.contains(" 200 ") && reply.contains("KoreShelf")
}
