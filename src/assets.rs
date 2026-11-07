//! Il frontend (HTML, JS, CSS, texture, pdf.js, epub.js...) viene compilato
//! con Vite e incorporato direttamente dentro l'eseguibile.

use axum::body::Body;
use axum::http::{header, StatusCode, Uri};
use axum::response::{IntoResponse, Response};
use rust_embed::RustEmbed;

#[derive(RustEmbed)]
#[folder = "frontend/dist/"]
struct Frontend;

fn respond(path: &str, file: rust_embed::EmbeddedFile) -> Response {
    let cache = if path.starts_with("assets/") || path.starts_with("vendor/") {
        "public, max-age=31536000, immutable"
    } else {
        "no-cache"
    };
    Response::builder()
        .header(header::CONTENT_TYPE, file.metadata.mimetype())
        .header(header::CACHE_CONTROL, cache)
        .body(Body::from(file.data))
        .unwrap_or_else(|_| StatusCode::INTERNAL_SERVER_ERROR.into_response())
}

pub async fn serve(uri: Uri) -> Response {
    let raw = uri.path().trim_start_matches('/');
    let path = percent_encoding::percent_decode_str(raw).decode_utf8_lossy().into_owned();

    if path.starts_with("api/") {
        return (StatusCode::NOT_FOUND, axum::Json(serde_json::json!({ "success": false }))).into_response();
    }
    let path = if path.is_empty() { "index.html".to_string() } else { path };

    if let Some(file) = Frontend::get(&path) {
        return respond(&path, file);
    }
    // Rotte "da single page application": tutto ciò che non è un file torna index.html
    let last = path.rsplit('/').next().unwrap_or("");
    if !last.contains('.') {
        if let Some(index) = Frontend::get("index.html") {
            return respond("index.html", index);
        }
    }
    StatusCode::NOT_FOUND.into_response()
}
