//! Finestra nativa dell'app (WebView2 su Windows, WebKit su Linux/macOS).
//! Chiudere la finestra spegne tutto: niente server "fantasma" in background.

use koreshelf::server::{AppControl, AppState, Controller};
use koreshelf::{dialogs, log_error, log_info};
use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use tao::dpi::LogicalSize;
use tao::event::{Event, WindowEvent};
use tao::event_loop::{ControlFlow, EventLoopBuilder};
use tao::window::{Icon, Window, WindowBuilder};
use wry::{NewWindowResponse, WebContext, WebView, WebViewBuilder};

#[derive(Debug)]
enum UserEvent {
    Focus,
    Quit,
}

fn window_icon() -> Option<Icon> {
    let img = image::load_from_memory(include_bytes!("../assets/icon.png")).ok()?.to_rgba8();
    let (w, h) = img.dimensions();
    Icon::from_rgba(img.into_raw(), w, h).ok()
}

/// Link esterni (GitHub, PayPal, ...) si aprono nel browser predefinito.
fn open_external(url: &str) {
    if url.starts_with("http://") || url.starts_with("https://") || url.starts_with("mailto:") {
        if let Err(e) = open::that_detached(url) {
            log_error!("Impossibile aprire {url}: {e}");
        }
    }
}

fn build_webview(window: &Window, context: &mut WebContext, url: &str) -> wry::Result<WebView> {
    let origin = url.trim_end_matches('/').to_string();
    let builder = WebViewBuilder::new_with_web_context(context)
        .with_url(url)
        // L'interfaccia sa di essere nell'app desktop: niente pulsante "Spegni",
        // basta chiudere la finestra.
        .with_initialization_script("window.__KORESHELF_DESKTOP__ = true;")
        .with_background_color((30, 45, 59, 255))
        .with_devtools(cfg!(debug_assertions))
        .with_new_window_req_handler(|target, _features| {
            open_external(&target);
            NewWindowResponse::Deny
        })
        .with_navigation_handler(move |target| {
            let internal = target.starts_with(&origin)
                || target.starts_with("about:")
                || target.starts_with("blob:")
                || target.starts_with("data:");
            if !internal {
                open_external(&target);
            }
            internal
        });

    #[cfg(any(target_os = "windows", target_os = "macos"))]
    {
        builder.build(window)
    }
    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    {
        use tao::platform::unix::WindowExtUnix;
        use wry::WebViewBuilderExtUnix;
        let vbox = window.default_vbox().expect("gtk vbox");
        builder.build_gtk(vbox)
    }
}

pub fn run(
    runtime: tokio::runtime::Runtime,
    listener: tokio::net::TcpListener,
    make_state: impl FnOnce(Controller) -> AppState,
    url: String,
    webview_dir: PathBuf,
) -> ! {
    let event_loop = EventLoopBuilder::<UserEvent>::with_user_event().build();
    let proxy = Mutex::new(event_loop.create_proxy());
    let control: Controller = Arc::new(move |action| {
        let event = match action {
            AppControl::Shutdown => UserEvent::Quit,
            AppControl::Focus => UserEvent::Focus,
        };
        if let Ok(p) = proxy.lock() {
            let _ = p.send_event(event);
        }
    });

    let state = make_state(control);
    runtime.spawn(koreshelf::server::serve(listener, state));

    let window = WindowBuilder::new()
        .with_title("KoreShelf")
        .with_window_icon(window_icon())
        .with_inner_size(LogicalSize::new(1280.0, 800.0))
        .with_min_inner_size(LogicalSize::new(800.0, 550.0))
        .with_background_color((30, 45, 59, 255))
        .with_maximized(true)
        .build(&event_loop)
        .expect("Impossibile creare la finestra");

    let mut context = WebContext::new(Some(webview_dir));
    let mut webview = match build_webview(&window, &mut context, &url) {
        Ok(view) => Some(view),
        Err(e) => {
            // Su Windows succede solo se manca WebView2 (rarissimo su Windows 10/11).
            log_error!("WebView non disponibile: {e}");
            window.set_visible(false);
            let _ = open::that_detached(&url);
            dialogs::info(
                "KoreShelf",
                "Il componente Microsoft Edge WebView2 non è installato, quindi KoreShelf si è \
                 aperto nel tuo browser.\n\nPer chiudere KoreShelf usa il pulsante \"Spegni\" \
                 in alto nella libreria.\n\nPer avere la finestra dedicata installa WebView2 da:\n\
                 https://go.microsoft.com/fwlink/p/?LinkId=2124703",
            );
            None
        }
    };
    let mut window = webview.is_some().then_some(window);
    log_info!("KoreShelf avviato su {url}");

    event_loop.run(move |event, _, control_flow| {
        *control_flow = ControlFlow::Wait;
        let _keep_alive = (&runtime, &context);
        match event {
            Event::WindowEvent { event: WindowEvent::CloseRequested, .. } | Event::UserEvent(UserEvent::Quit) => {
                log_info!("KoreShelf chiuso");
                webview.take();
                window.take();
                *control_flow = ControlFlow::Exit;
            }
            Event::UserEvent(UserEvent::Focus) => match &window {
                Some(w) => {
                    w.set_minimized(false);
                    w.set_visible(true);
                    w.set_focus();
                }
                None => {
                    let _ = open::that_detached(&url);
                }
            },
            _ => {}
        }
    })
}
