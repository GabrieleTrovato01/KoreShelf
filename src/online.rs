//! Recupero di trama, copertina in alta risoluzione e numero di pagine da
//! Google Books (tramite ISBN) e Apple Books (tramite titolo + autore).

use crate::text::{decode_entities, html_to_plain, strip_tags};
use crate::{log_info, log_warn};
use serde_json::Value;
use std::time::Duration;

pub const DEFAULT_PAGE_COUNT: i64 = 350;
pub const MAX_PAGE_COUNT: i64 = 1000;
const CHARS_PER_PAGE: f64 = 1500.0;

#[derive(Debug, Default)]
pub struct OnlineData {
    pub description: Option<String>,
    pub cover_url: Option<String>,
    pub page_count: i64,
    pub title: Option<String>,
    pub author: Option<String>,
}

pub fn http_client() -> reqwest::Client {
    reqwest::Client::builder()
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 KoreShelf")
        .connect_timeout(Duration::from_secs(5))
        .build()
        .expect("client HTTP")
}

/// Stima delle pagine: una cartella editoriale è ~1500 battute, +5% per
/// indici e pagine bianche. Mai oltre 1000 per non rompere il carosello 3D.
pub fn estimate_pages(text_length: usize, pdf_pages: Option<i64>) -> i64 {
    if let Some(pages) = pdf_pages.filter(|p| *p > 0) {
        return pages.min(MAX_PAGE_COUNT);
    }
    if text_length > 0 {
        let pages = (text_length as f64 / CHARS_PER_PAGE).ceil();
        return ((pages * 1.05).floor() as i64).clamp(1, MAX_PAGE_COUNT);
    }
    DEFAULT_PAGE_COUNT
}

async fn get_json(client: &reqwest::Client, url: &str) -> Option<Value> {
    let response = client.get(url).timeout(Duration::from_secs(6)).send().await;
    match response {
        Ok(r) if r.status().is_success() => r.json().await.ok(),
        Ok(r) => {
            log_warn!("Risposta {} da {url}", r.status());
            None
        }
        Err(e) => {
            log_warn!("Servizio online non raggiungibile ({url}): {e}");
            None
        }
    }
}

async fn google_books_by_isbn(client: &reqwest::Client, isbn: &str) -> Option<OnlineData> {
    log_info!("Cerco su Google Books con ISBN {isbn}");
    let url = format!("https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}");
    let json = get_json(client, &url).await?;
    let info = json.get("items")?.get(0)?.get("volumeInfo")?;

    let mut data = OnlineData {
        title: info.get("title").and_then(Value::as_str).map(str::to_string),
        author: info.get("authors").and_then(Value::as_array).map(|a| {
            a.iter().filter_map(Value::as_str).collect::<Vec<_>>().join(", ")
        }),
        description: info
            .get("description")
            .and_then(Value::as_str)
            .map(|d| decode_entities(&strip_tags(d)).trim().to_string()),
        page_count: info.get("pageCount").and_then(Value::as_i64).unwrap_or(0),
        cover_url: None,
    };
    if let Some(thumb) = info.pointer("/imageLinks/thumbnail").and_then(Value::as_str) {
        // Trucco per la copertina ad alta risoluzione.
        let re = regex::Regex::new(r"zoom=[0-9]").unwrap();
        let hi_res = re.replace(thumb, "zoom=0").replace("&edge=curl", "");
        data.cover_url = Some(hi_res.replacen("http://", "https://", 1));
    }
    log_info!("Trovato su Google Books: {:?}", data.title);
    Some(data)
}

fn apple_country(lang: &str) -> &'static str {
    match lang {
        "en" => "us",
        "es" => "es",
        "fr" => "fr",
        "de" => "de",
        _ => "it",
    }
}

async fn apple_books_search(client: &reqwest::Client, query: &str, lang: &str) -> Option<OnlineData> {
    if query.trim().is_empty() {
        return None;
    }
    let url = format!(
        "https://itunes.apple.com/search?term={}&media=ebook&country={}&limit=1",
        urlencoding::encode(query),
        apple_country(lang)
    );
    log_info!("Contatto Apple Books: {url}");
    let json = get_json(client, &url).await?;
    let best = json.get("results")?.get(0)?;
    Some(OnlineData {
        title: best.get("trackName").and_then(Value::as_str).map(str::to_string),
        author: best.get("artistName").and_then(Value::as_str).map(str::to_string),
        description: best.get("description").and_then(Value::as_str).map(html_to_plain),
        cover_url: best
            .get("artworkUrl100")
            .and_then(Value::as_str)
            .map(|u| u.replace("100x100bb", "600x900bb")),
        page_count: 0,
    })
}

pub async fn fetch_best_book_data(
    client: &reqwest::Client,
    lang: &str,
    isbn: Option<&str>,
    title: Option<&str>,
    author: Option<&str>,
    text_length: usize,
    pdf_pages: Option<i64>,
) -> OnlineData {
    let estimated = estimate_pages(text_length, pdf_pages);

    if let Some(isbn) = isbn {
        if let Some(mut data) = google_books_by_isbn(client, isbn).await {
            if data.page_count <= 0 {
                data.page_count = estimated;
            }
            data.page_count = data.page_count.min(MAX_PAGE_COUNT);
            return data;
        }
        log_info!("ISBN non trovato su Google Books, provo con titolo e autore");
    }

    let query = format!("{} {}", title.unwrap_or(""), author.unwrap_or(""))
        .replace(['_', '-'], " ")
        .trim()
        .to_string();
    let mut data = apple_books_search(client, &query, lang).await.unwrap_or_default();
    data.page_count = estimated;
    data
}

pub async fn download_image(client: &reqwest::Client, url: &str) -> Option<Vec<u8>> {
    let response = client
        .get(url)
        .header("Accept", "image/jpeg, image/png, image/*")
        .timeout(Duration::from_secs(8))
        .send()
        .await
        .ok()?;
    if !response.status().is_success() {
        log_warn!("Download copertina fallito: {}", response.status());
        return None;
    }
    response.bytes().await.ok().map(|b| b.to_vec())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn page_estimates() {
        assert_eq!(estimate_pages(0, None), 350);
        assert_eq!(estimate_pages(0, Some(5000)), 1000);
        assert_eq!(estimate_pages(150_000, None), 105);
    }
}
