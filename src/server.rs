//! API HTTP di KoreShelf: è la traduzione 1:1 delle rotte di `server.js`,
//! così il frontend esistente funziona senza modifiche.

use crate::db::{Book, Db};
use crate::i18n::{self, t, t_with};
use crate::online::{self, OnlineData};
use crate::paths::Paths;
use crate::text;
use crate::{epub, images, log_error, log_info, log_warn, pdf};
use axum::extract::{DefaultBodyLimit, Multipart, Path as UrlPath, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::routing::{delete, get, post, put};
use axum::{Json, Router};
use serde::Deserialize;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::{Arc, RwLock};
use std::time::{Duration, SystemTime, UNIX_EPOCH};
use tokio::io::AsyncWriteExt;
use tower_http::services::ServeDir;

/// Cosa il server può chiedere all'applicazione (finestra) che lo contiene.
#[derive(Debug, Clone, Copy)]
pub enum AppControl {
    Shutdown,
    Focus,
}

pub type Controller = Arc<dyn Fn(AppControl) + Send + Sync>;

#[derive(Clone)]
pub struct AppState {
    pub db: Arc<Db>,
    pub paths: Arc<Paths>,
    pub http: reqwest::Client,
    pub lang: Arc<RwLock<String>>,
    pub control: Controller,
}

impl AppState {
    fn lang(&self) -> String {
        self.lang.read().map(|l| l.clone()).unwrap_or_else(|_| i18n::DEFAULT_LANG.into())
    }
}

pub fn router(state: AppState) -> Router {
    let covers = ServeDir::new(&state.paths.covers);
    let ebooks = ServeDir::new(&state.paths.ebooks);
    Router::new()
        .route("/api/ping", get(ping))
        .route("/api/focus", post(focus))
        .route("/api/sync-language", post(sync_language))
        .route("/books.json", get(list_books))
        .route("/api/books", get(list_books))
        .route("/api/books/search", get(search_books))
        .route("/api/books/bulk-tags", put(bulk_tags))
        .route("/api/books/edit", post(edit_book))
        .route("/api/upload", post(upload))
        .route("/api/categories", put(manage_category))
        .route("/api/books/{id}", delete(delete_book))
        .route("/api/books/{id}/cover", post(upload_cover))
        .route("/api/books/{id}/tags", post(add_tag))
        .route("/api/books/{id}/progress", put(set_progress))
        .route("/api/books/{id}/review", put(set_review))
        .route("/api/books/{id}/highlights", post(add_highlight).delete(remove_highlight))
        .route("/api/store/amazon-link", get(amazon_link))
        .route("/api/shutdown", post(shutdown))
        .nest_service("/covers", covers)
        .nest_service("/ebooks", ebooks)
        .fallback(crate::assets::serve)
        .layer(DefaultBodyLimit::max(upload_limit())) // ebook fino a 4 GB
        .with_state(state)
}

/// Dimensione massima di un ebook caricato.
const MAX_UPLOAD_BYTES: u64 = 4 * 1024 * 1024 * 1024;

/// Il limite, mai oltre il massimo rappresentabile dal sistema: sui telefoni a 32 bit
/// (Android ARMv7) 4 GB non entrano in un `usize`, quindi si usa il massimo possibile.
fn upload_limit_for(platform_max: u64) -> u64 {
    MAX_UPLOAD_BYTES.min(platform_max)
}

fn upload_limit() -> usize {
    upload_limit_for(usize::MAX as u64) as usize
}

pub async fn serve(listener: tokio::net::TcpListener, state: AppState) {
    if let Err(e) = axum::serve(listener, router(state)).await {
        log_error!("Il server si è fermato: {e}");
    }
}

// ---------------------------------------------------------------- helpers

fn now_ms() -> u128 {
    SystemTime::now().duration_since(UNIX_EPOCH).map(|d| d.as_millis()).unwrap_or(0)
}

fn reply(status: StatusCode, success: bool, message: impl Into<String>) -> Response {
    (status, Json(json!({ "success": success, "message": message.into() }))).into_response()
}

fn ok(message: impl Into<String>) -> Response {
    reply(StatusCode::OK, true, message)
}

fn not_found(st: &AppState) -> Response {
    reply(StatusCode::NOT_FOUND, false, t(&st.lang(), "errNotFound"))
}

fn internal(st: &AppState, context: &str, err: impl std::fmt::Display) -> Response {
    log_error!("{context}: {err}");
    reply(StatusCode::INTERNAL_SERVER_ERROR, false, t(&st.lang(), "errInternal"))
}

/// Nome file sicuro a partire da un id del libro.
fn safe_id(id: &str) -> String {
    id.chars().filter(|c| c.is_ascii_alphanumeric() || *c == '_' || *c == '-').collect()
}

fn value_to_f64(v: &Value) -> Option<f64> {
    match v {
        Value::Number(n) => n.as_f64(),
        Value::String(s) => s.trim().parse().ok(),
        _ => None,
    }
    .filter(|f| f.is_finite())
}

/// Elimina un file della cartella dati, ignorando gli errori.
async fn remove_data_file(paths: &Paths, relative: Option<&str>) {
    if let Some(full) = relative.and_then(|r| paths.resolve_relative(r)) {
        let _ = tokio::fs::remove_file(full).await;
    }
}

/// Salva una copertina ottimizzata in `covers/<name>` e ne restituisce il
/// percorso relativo da salvare nel DB.
async fn save_cover(paths: &Paths, bytes: Vec<u8>, file_name: String, quality: u8) -> Result<String, String> {
    let jpeg = tokio::task::spawn_blocking(move || images::make_cover_jpeg(&bytes, quality))
        .await
        .map_err(|e| e.to_string())??;
    tokio::fs::write(paths.covers.join(&file_name), jpeg).await.map_err(|e| e.to_string())?;
    Ok(format!("covers/{file_name}"))
}

/// Cancella un file temporaneo quando esce dallo scope (anche in caso di errore).
struct TempFile(PathBuf);
impl Drop for TempFile {
    fn drop(&mut self) {
        let _ = std::fs::remove_file(&self.0);
    }
}

// ------------------------------------------------------------------ rotte

async fn ping() -> Json<Value> {
    Json(json!({ "app": "KoreShelf", "version": env!("CARGO_PKG_VERSION") }))
}

async fn focus(State(st): State<AppState>) -> Json<Value> {
    (st.control)(AppControl::Focus);
    Json(json!({ "success": true }))
}

#[derive(Deserialize)]
struct LangBody {
    lang: Option<String>,
}

async fn sync_language(State(st): State<AppState>, Json(body): Json<LangBody>) -> Json<Value> {
    if let Some(lang) = body.lang.filter(|l| i18n::is_supported(l)) {
        if let Ok(mut current) = st.lang.write() {
            *current = lang.clone();
        }
        log_info!("Lingua sincronizzata: {}", lang.to_uppercase());
    }
    Json(json!({ "success": true }))
}

async fn list_books(State(st): State<AppState>) -> Response {
    match st.db.all_books() {
        Ok(books) => Json(books).into_response(),
        Err(e) => {
            log_error!("Errore lettura libri dal DB: {e}");
            (StatusCode::INTERNAL_SERVER_ERROR, Json(Vec::<Book>::new())).into_response()
        }
    }
}

async fn search_books(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> Response {
    let query = q.get("q").map(|s| s.trim()).unwrap_or("");
    if query.is_empty() {
        return Json(Vec::<Book>::new()).into_response();
    }
    match st.db.search(query) {
        Ok(books) => Json(books).into_response(),
        Err(e) => {
            log_error!("Errore di ricerca nel DB: {e}");
            (StatusCode::INTERNAL_SERVER_ERROR, Json(Vec::<Book>::new())).into_response()
        }
    }
}

// --- Caricamento di un nuovo ebook --------------------------------------

async fn upload(State(st): State<AppState>, mut multipart: Multipart) -> Response {
    let lang = st.lang();
    let mut received: Option<(TempFile, String)> = None;
    // "offline=1": niente ricerche online (usato dal libro di esempio)
    let mut offline = false;

    loop {
        let mut field = match multipart.next_field().await {
            Ok(Some(field)) => field,
            Ok(None) => break,
            Err(e) => return internal(&st, "Upload interrotto", e),
        };
        if field.name() == Some("offline") {
            offline = field.text().await.map(|v| v.trim() == "1").unwrap_or(false);
            continue;
        }
        if field.name() != Some("ebook") {
            continue;
        }
        let original = field
            .file_name()
            .map(|n| n.rsplit(['/', '\\']).next().unwrap_or(n).to_string())
            .unwrap_or_else(|| "book".into());
        let temp = TempFile(st.paths.uploads.join(format!("upload_{}", now_ms())));
        let mut file = match tokio::fs::File::create(&temp.0).await {
            Ok(f) => f,
            Err(e) => return internal(&st, "Impossibile creare il file temporaneo", e),
        };
        loop {
            match field.chunk().await {
                Ok(Some(chunk)) => {
                    if let Err(e) = file.write_all(&chunk).await {
                        return internal(&st, "Scrittura upload fallita", e);
                    }
                }
                Ok(None) => break,
                Err(e) => return internal(&st, "Upload interrotto", e),
            }
        }
        let _ = file.flush().await;
        received = Some((temp, original));
        break;
    }

    let Some((temp, original)) = received else {
        return reply(StatusCode::BAD_REQUEST, false, t(&lang, "errNoFile"));
    };
    log_info!("Inizio elaborazione di: {original}");
    match process_upload(&st, &lang, &temp.0, &original, offline).await {
        Ok(response) => response,
        Err(e) => internal(&st, "Errore critico durante l'upload", e),
    }
}

/// Dati iniziali estratti dal file, prima dell'arricchimento online.
struct LocalData {
    title: String,
    author: Option<String>,
    description: Option<String>,
    cover_path: Option<String>,
    text_length: usize,
    pdf_pages: Option<i64>,
    isbn: Option<String>,
}

fn timeout_for(path: &Path, secs_per_mb: f64) -> Duration {
    let size_mb = std::fs::metadata(path).map(|m| m.len() as f64 / 1_048_576.0).unwrap_or(0.0);
    Duration::from_secs_f64((15.0 + size_mb * secs_per_mb).min(120.0))
}

/// Esegue un parser in un thread separato, con timeout e protezione dai panic:
/// un file corrotto non può mai bloccare o far crashare l'app.
async fn run_parser<T: Send + 'static>(
    timeout: Duration,
    job: impl FnOnce() -> Result<T, String> + Send + 'static,
) -> Result<T, String> {
    let task = tokio::task::spawn_blocking(move || {
        std::panic::catch_unwind(std::panic::AssertUnwindSafe(job))
            .unwrap_or_else(|_| Err("il parser è andato in errore".into()))
    });
    match tokio::time::timeout(timeout, task).await {
        Ok(Ok(result)) => result,
        Ok(Err(e)) => Err(e.to_string()),
        Err(_) => Err(format!("tempo scaduto dopo {}s", timeout.as_secs())),
    }
}

fn fallback_from_filename(original: &str, lang: &str, use_dash_split: bool) -> (String, Option<String>) {
    let (title, author) = if use_dash_split {
        text::title_author_from_filename(original)
    } else {
        (text::plain_title_from_filename(original), None)
    };
    let title = if title.is_empty() { t(lang, "unknownTitle") } else { title };
    (title, author)
}

async fn extract_local(st: &AppState, lang: &str, file: &Path, original: &str, ext: &str, base: &str) -> LocalData {
    if ext == "epub" {
        let path = file.to_path_buf();
        match run_parser(timeout_for(file, 2.0), move || epub::read_epub(&path)).await {
            Ok(info) => {
                let (title, author) = match info.title.as_deref() {
                    Some(tt) if !text::is_junk_title(tt, false) => (tt.to_string(), info.author.clone()),
                    _ => {
                        log_info!("Metadati EPUB mancanti o corrotti: uso il nome del file");
                        fallback_from_filename(original, lang, true)
                    }
                };
                let mut cover_path = None;
                if let Some(bytes) = info.cover {
                    match save_cover(&st.paths, bytes, format!("{base}.jpg"), 50).await {
                        Ok(p) => cover_path = Some(p),
                        Err(e) => log_warn!("Copertina interna non utilizzabile: {e}"),
                    }
                }
                LocalData {
                    title,
                    author,
                    description: info.description,
                    cover_path,
                    text_length: info.text_length,
                    pdf_pages: None,
                    isbn: info.isbn,
                }
            }
            Err(e) => {
                log_warn!("Impossibile leggere l'EPUB ({e}): uso il nome del file");
                let (title, _) = fallback_from_filename(original, lang, false);
                LocalData { title, author: None, description: None, cover_path: None, text_length: 0, pdf_pages: None, isbn: None }
            }
        }
    } else {
        let path = file.to_path_buf();
        match run_parser(timeout_for(file, 3.0), move || pdf::read_pdf(&path)).await {
            Ok(info) => {
                let (title, author) = match info.title.as_deref() {
                    Some(tt) if !text::is_junk_title(tt, true) => (tt.to_string(), info.author.clone()),
                    _ => {
                        log_info!("Metadati PDF mancanti o corrotti: uso il nome del file");
                        fallback_from_filename(original, lang, true)
                    }
                };
                LocalData {
                    title,
                    author,
                    description: None,
                    cover_path: None,
                    text_length: info.text_length,
                    pdf_pages: info.page_count,
                    isbn: info.isbn,
                }
            }
            Err(e) => {
                log_warn!("Impossibile leggere il PDF ({e}): uso il nome del file");
                let (title, _) = fallback_from_filename(original, lang, false);
                LocalData { title, author: None, description: None, cover_path: None, text_length: 0, pdf_pages: Some(1000), isbn: None }
            }
        }
    }
}

fn unique_base_name(st: &AppState) -> String {
    loop {
        let candidate = format!("book_{}", now_ms());
        if !st.db.exists(&candidate).unwrap_or(false) {
            return candidate;
        }
        std::thread::sleep(Duration::from_millis(2));
    }
}

async fn process_upload(st: &AppState, lang: &str, file: &Path, original: &str, offline: bool) -> Result<Response, String> {
    let ext = Path::new(original)
        .extension()
        .map(|e| e.to_string_lossy().to_lowercase())
        .unwrap_or_default();
    if ext != "epub" && ext != "pdf" {
        return Ok(reply(StatusCode::BAD_REQUEST, false, t(lang, "errFormat")));
    }

    // Controllo del contenuto reale: un .epub è uno ZIP ("PK"), un PDF contiene "%PDF".
    if !looks_like(file, &ext).await {
        log_warn!("{original} non è un {ext} valido");
        return Ok(reply(StatusCode::BAD_REQUEST, false, t(lang, "errFormat")));
    }

    let base = unique_base_name(st);
    let local = extract_local(st, lang, file, original, &ext, &base).await;
    match &local.isbn {
        Some(isbn) => log_info!("ISBN trovato: {isbn}"),
        None => log_info!("Nessun ISBN trovato"),
    }
    log_info!("Dati iniziali: \"{}\" di {:?}", local.title, local.author);

    let online: OnlineData = if offline {
        OnlineData { page_count: online::estimate_pages(local.text_length, local.pdf_pages), ..Default::default() }
    } else { online::fetch_best_book_data(
        &st.http,
        lang,
        local.isbn.as_deref(),
        Some(&local.title).filter(|tt| **tt != t(lang, "unknownTitle")).map(|s| s.as_str()),
        local.author.as_deref(),
        local.text_length,
        local.pdf_pages,
    )
    .await };

    // Correggiamo il titolo solo se quello trovato online "somiglia" al nostro.
    let mut final_title = local.title.clone();
    let mut final_author = local.author.clone();
    if let Some(online_title) = &online.title {
        let online_lower = online_title.to_lowercase();
        let related = local
            .title
            .to_lowercase()
            .split(' ')
            .filter(|w| w.chars().count() > 3)
            .any(|w| online_lower.contains(w));
        if related || local.title == t(lang, "unknownTitle") {
            final_title = online_title.clone();
            final_author = online.author.clone().or(final_author);
            log_info!("Titolo corretto in: {final_title}");
        }
    }
    let final_title = final_title.trim().to_string();

    // Niente doppioni (il frontend riconosce la frase "già presente").
    if st.db.title_exists(&final_title).map_err(|e| e.to_string())? {
        log_info!("[BLOCCATO] \"{final_title}\" è già presente nella libreria");
        remove_data_file(&st.paths, local.cover_path.as_deref()).await;
        // Il frontend riconosce sia il flag sia la frase "già presente".
        return Ok(Json(json!({
            "success": false,
            "duplicate": true,
            "message": "Libro già presente nella libreria.",
        }))
        .into_response());
    }

    // Copertina: quella interna, altrimenti quella trovata online (solo EPUB;
    // per i PDF la genera il frontend fotografando la prima pagina).
    let mut cover_path = local.cover_path.clone();
    if cover_path.is_none() && ext == "epub" {
        if let Some(url) = &online.cover_url {
            log_info!("Copertina mancante: la scarico da internet");
            if let Some(bytes) = online::download_image(&st.http, url).await {
                match save_cover(&st.paths, bytes, format!("{base}_google.jpg"), 80).await {
                    Ok(p) => cover_path = Some(p),
                    Err(e) => log_warn!("Copertina scaricata non valida: {e}"),
                }
            }
        }
    }

    // Trama: quella interna se è sensata, altrimenti quella online.
    let edgt = regex::Regex::new(r"(?i)^EDGT[0-9]+\s*").unwrap();
    let local_desc = local.description.as_deref().map(|d| edgt.replace(d, "").trim().to_string());
    let description = match (local_desc, online.description) {
        (Some(d), _) if d.chars().count() > 30 => d,
        (_, Some(d)) if !d.trim().is_empty() => d,
        _ => t(lang, "noDescriptionAvailable"),
    };

    // Spostiamo il file nella libreria.
    let ebook_rel = format!("ebooks/{base}.{ext}");
    let destination = st.paths.ebooks.join(format!("{base}.{ext}"));
    if tokio::fs::rename(file, &destination).await.is_err() {
        tokio::fs::copy(file, &destination).await.map_err(|e| e.to_string())?;
    }

    let book = Book {
        id: base,
        title: final_title,
        author: Some(final_author.unwrap_or_else(|| t(lang, "unknownAuthor"))),
        description: Some(description),
        cover_path,
        epub_path: Some(ebook_rel),
        page_count: if online.page_count > 0 { online.page_count } else { online::DEFAULT_PAGE_COUNT },
        progress: 0.0,
        rating: 0,
        review: None,
        tags: Vec::new(),
        highlights: Vec::new(),
    };
    st.db.upsert(&book).map_err(|e| e.to_string())?;
    log_info!("Libro aggiunto: {}", book.title);
    // Restituiamo anche il libro: il vassoio di caricamento ne mostra subito copertina e titolo.
    Ok(Json(json!({ "success": true, "message": t(lang, "successUpload"), "book": book })).into_response())
}

async fn looks_like(file: &Path, ext: &str) -> bool {
    use tokio::io::AsyncReadExt;
    let mut head = vec![0u8; 1024];
    let n = match tokio::fs::File::open(file).await {
        Ok(mut f) => f.read(&mut head).await.unwrap_or(0),
        Err(_) => 0,
    };
    let head = &head[..n];
    match ext {
        "epub" => head.starts_with(b"PK"),
        "pdf" => head.windows(4).any(|w| w == b"%PDF"),
        _ => false,
    }
}

fn ok_false(message: &str) -> Response {
    reply(StatusCode::OK, false, message)
}

// --- Copertina generata dal frontend (prima pagina dei PDF) ---------------

async fn upload_cover(State(st): State<AppState>, UrlPath(id): UrlPath<String>, mut multipart: Multipart) -> Response {
    let mut bytes = None;
    while let Ok(Some(field)) = multipart.next_field().await {
        if field.name() == Some("cover") {
            bytes = field.bytes().await.ok().map(|b| b.to_vec());
            break;
        }
    }
    let Some(bytes) = bytes else {
        return reply(StatusCode::BAD_REQUEST, false, t(&st.lang(), "errNoFile"));
    };
    let book = match st.db.get(&id) {
        Ok(Some(b)) => b,
        Ok(None) => return not_found(&st),
        Err(e) => return internal(&st, "Errore DB", e),
    };
    let name = format!("cover_{}_frontend.jpg", safe_id(&id));
    match save_cover(&st.paths, bytes, name, 80).await {
        Ok(cover_path) => {
            if book.cover_path.as_deref().is_some_and(|old| old != cover_path) {
                remove_data_file(&st.paths, book.cover_path.as_deref()).await;
            }
            if let Err(e) = st.db.set_cover(&id, &cover_path) {
                return internal(&st, "Errore salvataggio copertina", e);
            }
            Json(json!({ "success": true, "coverPath": cover_path })).into_response()
        }
        Err(e) => internal(&st, "Errore upload copertina frontend", e),
    }
}

// --- Tag e categorie ------------------------------------------------------

#[derive(Deserialize)]
struct TagBody {
    tag: Option<String>,
}

async fn add_tag(State(st): State<AppState>, UrlPath(id): UrlPath<String>, Json(body): Json<TagBody>) -> Response {
    let lang = st.lang();
    let tag = body.tag.unwrap_or_default().trim().to_string();
    if tag.is_empty() {
        return reply(StatusCode::BAD_REQUEST, false, t(&lang, "errInvalidTag"));
    }
    let mut book = match st.db.get(&id) {
        Ok(Some(b)) => b,
        Ok(None) => return not_found(&st),
        Err(e) => return internal(&st, "Errore DB", e),
    };
    if book.tags.iter().any(|t| t.to_lowercase() == tag.to_lowercase()) {
        return ok(t(&lang, "successTagExists"));
    }
    book.tags.insert(0, tag);
    match st.db.upsert(&book) {
        Ok(()) => ok(t(&lang, "successTagAdded")),
        Err(e) => internal(&st, "Errore aggiunta tag", e),
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct CategoryBody {
    old_name: Option<String>,
    new_name: Option<String>,
    action: Option<String>,
}

async fn manage_category(State(st): State<AppState>, Json(body): Json<CategoryBody>) -> Response {
    let lang = st.lang();
    let books = match st.db.all_books() {
        Ok(b) => b,
        Err(e) => return internal(&st, "Errore gestione categorie", e),
    };
    let old_name = body.old_name.unwrap_or_default();
    let new_name = body.new_name.map(|n| n.trim().to_string()).filter(|n| !n.is_empty());
    let action = body.action.unwrap_or_default();

    let mut updated = Vec::new();
    for mut book in books {
        if book.tags.first() != Some(&old_name) {
            continue;
        }
        match (action.as_str(), &new_name) {
            ("rename", Some(name)) => book.tags[0] = name.clone(),
            ("delete", _) => book.tags.clear(),
            _ => continue,
        }
        updated.push(book);
    }
    if updated.is_empty() {
        return ok_false(&t(&lang, "errNoBooksCat"));
    }
    match st.db.upsert_many(&updated) {
        Ok(()) => ok(t_with(&lang, "successCatUpdate", &[("count", updated.len().to_string())])),
        Err(e) => internal(&st, "Errore gestione categorie", e),
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct BulkBody {
    #[serde(default)]
    book_ids: Vec<Value>,
    new_tag: Option<String>,
}

async fn bulk_tags(State(st): State<AppState>, Json(body): Json<BulkBody>) -> Response {
    let lang = st.lang();
    let Some(new_tag) = body.new_tag.map(|t| t.trim().to_string()).filter(|t| !t.is_empty()) else {
        return reply(StatusCode::BAD_REQUEST, false, t(&lang, "errInvalidTag"));
    };
    let ids: Vec<String> = body
        .book_ids
        .iter()
        .map(|v| v.as_str().map(str::to_string).unwrap_or_else(|| v.to_string()))
        .collect();
    let books = match st.db.all_books() {
        Ok(b) => b,
        Err(e) => return internal(&st, "Errore spostamento libri", e),
    };
    let lower = new_tag.to_lowercase();
    let updated: Vec<Book> = books
        .into_iter()
        .filter(|b| ids.contains(&b.id))
        .map(|mut b| {
            b.tags.retain(|t| t.to_lowercase() != lower);
            b.tags.insert(0, new_tag.clone());
            b
        })
        .collect();
    if updated.is_empty() {
        return ok_false(&t(&lang, "errNoBooksUpdated"));
    }
    match st.db.upsert_many(&updated) {
        Ok(()) => ok(t_with(&lang, "successBulkMove", &[("count", updated.len().to_string())])),
        Err(e) => internal(&st, "Errore spostamento libri", e),
    }
}

// --- Eliminazione ---------------------------------------------------------

async fn delete_book(State(st): State<AppState>, UrlPath(id): UrlPath<String>) -> Response {
    let book = match st.db.get(&id) {
        Ok(Some(b)) => b,
        Ok(None) => return not_found(&st),
        Err(e) => return internal(&st, "Errore eliminazione libro", e),
    };
    if let Err(e) = st.db.delete(&id) {
        return internal(&st, "Errore eliminazione libro", e);
    }
    remove_data_file(&st.paths, book.epub_path.as_deref()).await;
    remove_data_file(&st.paths, book.cover_path.as_deref()).await;
    log_info!("Libro eliminato: {}", book.title);
    ok(t(&st.lang(), "successDelete"))
}

// --- Lettura: progresso, recensioni, sottolineature ----------------------

async fn set_progress(State(st): State<AppState>, UrlPath(id): UrlPath<String>, Json(body): Json<Value>) -> Response {
    let progress = body.get("progress").and_then(value_to_f64).unwrap_or(0.0);
    match st.db.set_progress(&id, progress) {
        Ok(0) => not_found(&st),
        Ok(_) => Json(json!({ "success": true })).into_response(),
        Err(e) => internal(&st, "Errore aggiornamento progresso", e),
    }
}

async fn set_review(State(st): State<AppState>, UrlPath(id): UrlPath<String>, Json(body): Json<Value>) -> Response {
    let rating = body.get("rating").and_then(value_to_f64).map(|r| r.round() as i64).unwrap_or(0);
    let review = body.get("reviewText").and_then(Value::as_str);
    match st.db.set_review(&id, rating, review) {
        Ok(0) => not_found(&st),
        Ok(_) => Json(json!({ "success": true })).into_response(),
        Err(e) => internal(&st, "Errore salvataggio recensione", e),
    }
}

async fn add_highlight(State(st): State<AppState>, UrlPath(id): UrlPath<String>, Json(body): Json<Value>) -> Response {
    let mut book = match st.db.get(&id) {
        Ok(Some(b)) => b,
        Ok(None) => return not_found(&st),
        Err(e) => return internal(&st, "Errore salvataggio highlight", e),
    };
    book.highlights.push(json!({
        "cfi": body.get("cfi").cloned().unwrap_or(Value::Null),
        "text": body.get("text").cloned().unwrap_or(Value::Null),
        "date": now_ms() as u64,
    }));
    match st.db.upsert(&book) {
        Ok(()) => ok("Evidenziazione salvata!"),
        Err(e) => internal(&st, "Errore salvataggio highlight", e),
    }
}

async fn remove_highlight(State(st): State<AppState>, UrlPath(id): UrlPath<String>, Json(body): Json<Value>) -> Response {
    let mut book = match st.db.get(&id) {
        Ok(Some(b)) => b,
        Ok(None) => return not_found(&st),
        Err(e) => return internal(&st, "Errore rimozione highlight", e),
    };
    let cfi = body.get("cfi").cloned().unwrap_or(Value::Null);
    book.highlights.retain(|h| h.get("cfi") != Some(&cfi));
    match st.db.upsert(&book) {
        Ok(()) => ok("Evidenziazione rimossa!"),
        Err(e) => internal(&st, "Errore rimozione highlight", e),
    }
}

// --- Modifica metadati ----------------------------------------------------

async fn edit_book(State(st): State<AppState>, mut multipart: Multipart) -> Response {
    let mut fields: HashMap<String, String> = HashMap::new();
    let mut cover: Option<Vec<u8>> = None;
    loop {
        let field = match multipart.next_field().await {
            Ok(Some(f)) => f,
            Ok(None) => break,
            Err(e) => return internal(&st, "Modifica metadati: dati non validi", e),
        };
        let name = field.name().unwrap_or("").to_string();
        if name == "cover" {
            if field.file_name().is_some() {
                cover = field.bytes().await.ok().map(|b| b.to_vec()).filter(|b| !b.is_empty());
            }
        } else if let Ok(value) = field.text().await {
            fields.insert(name, value);
        }
    }

    let field = |k: &str| fields.get(k).map(|v| v.trim().to_string()).filter(|v| !v.is_empty());
    let Some(id) = field("id") else {
        return reply(StatusCode::BAD_REQUEST, false, "ID mancante");
    };
    let mut book = match st.db.get(&id) {
        Ok(Some(b)) => b,
        Ok(None) => return not_found(&st),
        Err(e) => return internal(&st, "Errore modifica metadati", e),
    };

    if let Some(title) = field("title") {
        book.title = title;
    }
    if let Some(author) = field("author") {
        book.author = Some(author);
    }
    if let Some(description) = field("description") {
        book.description = Some(description);
    }
    if let Some(category) = field("category") {
        match book.tags.first_mut() {
            Some(first) => *first = category,
            None => book.tags.push(category),
        }
    }
    if let Some(bytes) = cover {
        // Nome con timestamp: costringe il browser e Three.js a ricaricare l'immagine.
        let name = format!("cover_{}_{}.jpg", safe_id(&id), now_ms());
        match save_cover(&st.paths, bytes, name, 80).await {
            Ok(path) => {
                remove_data_file(&st.paths, book.cover_path.as_deref()).await;
                book.cover_path = Some(path);
            }
            Err(e) => return internal(&st, "Copertina non valida", e),
        }
    }

    match st.db.upsert(&book) {
        Ok(()) => {
            log_info!("Metadati aggiornati per: {}", book.title);
            Json(json!({ "success": true, "updatedBook": book })).into_response()
        }
        Err(e) => internal(&st, "Errore modifica metadati", e),
    }
}

// --- Amazon ----------------------------------------------------------------

/// Link di ricerca sul negozio Amazon della lingua scelta (sezione Kindle/ebook).
pub fn amazon_search_url(lang: &str, isbn: Option<&str>, title: Option<&str>, author: Option<&str>) -> Option<String> {
    let domain = match lang {
        "en" => "amazon.com",
        "de" => "amazon.de",
        "fr" => "amazon.fr",
        "es" => "amazon.es",
        _ => "amazon.it",
    };
    fn clean(v: Option<&str>) -> Option<&str> {
        v.map(str::trim).filter(|v| !v.is_empty())
    }
    let query = match clean(isbn) {
        Some(isbn) => isbn.to_string(),
        None => [clean(title), clean(author)].into_iter().flatten().collect::<Vec<_>>().join(" "),
    };
    if query.is_empty() {
        return None;
    }
    Some(format!("https://www.{domain}/s?k={}&i=digital-text", urlencoding::encode(&query)))
}

async fn amazon_link(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> Response {
    let get = |k: &str| q.get(k).map(String::as_str);
    match amazon_search_url(&st.lang(), get("isbn"), get("title"), get("author")) {
        Some(url) => Json(json!({ "success": true, "url": url })).into_response(),
        None => (StatusCode::BAD_REQUEST, Json(json!({ "success": false }))).into_response(),
    }
}

#[cfg(test)]
mod tests {
    use super::amazon_search_url;

    #[test]
    fn upload_limit_fits_32_and_64_bit_systems() {
        // 64 bit (PC, telefoni recenti): 4 GB
        assert_eq!(super::upload_limit_for(u64::MAX), 4 * 1024 * 1024 * 1024);
        // 32 bit (Android ARMv7): il massimo rappresentabile, senza traboccare
        assert_eq!(super::upload_limit_for(u32::MAX as u64), u32::MAX as u64);
        // Il valore usato davvero è sempre valido per il sistema su cui gira
        assert!(super::upload_limit() as u64 <= usize::MAX as u64);
        assert!(super::upload_limit() as u64 >= 2 * 1024 * 1024 * 1024 - 1);
    }

    #[test]
    fn amazon_links() {
        assert_eq!(
            amazon_search_url("it", None, Some("Il nome della rosa"), Some("Eco")).unwrap(),
            "https://www.amazon.it/s?k=Il%20nome%20della%20rosa%20Eco&i=digital-text"
        );
        assert_eq!(
            amazon_search_url("de", Some("9788804668237"), Some("x"), None).unwrap(),
            "https://www.amazon.de/s?k=9788804668237&i=digital-text"
        );
        assert!(amazon_search_url("en", None, Some("  "), None).is_none());
    }
}

// --- Spegnimento ------------------------------------------------------------

async fn shutdown(State(st): State<AppState>) -> Response {
    log_info!("Richiesta di spegnimento ricevuta");
    let control = st.control.clone();
    tokio::spawn(async move {
        tokio::time::sleep(Duration::from_millis(1500)).await;
        control(AppControl::Shutdown);
    });
    ok(t(&st.lang(), "successShutdown"))
}