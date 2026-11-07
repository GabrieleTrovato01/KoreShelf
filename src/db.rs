//! Database SQLite della libreria. Stesso schema della versione Node.js,
//! quindi un `koreshelf.db` esistente funziona senza modifiche.

use rusqlite::types::Value as SqlValue;
use rusqlite::{params, Connection, OptionalExtension, Row};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::path::Path;
use std::sync::{Mutex, MutexGuard};
use std::time::Duration;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Book {
    pub id: String,
    pub title: String,
    pub author: Option<String>,
    pub description: Option<String>,
    pub cover_path: Option<String>,
    pub epub_path: Option<String>,
    pub page_count: i64,
    pub progress: f64,
    pub rating: i64,
    pub review: Option<String>,
    /// Il primo tag è la categoria (scaffale) del libro.
    pub tags: Vec<String>,
    /// Sottolineature: `{ cfi, text, date }`.
    pub highlights: Vec<Value>,
}

pub struct Db {
    conn: Mutex<Connection>,
}

const SCHEMA: &str = "
    CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT,
        description TEXT,
        coverPath TEXT,
        epubPath TEXT,
        pageCount INTEGER DEFAULT 350,
        progress REAL DEFAULT 0,
        rating INTEGER DEFAULT 0,
        review TEXT,
        tags TEXT DEFAULT '[]',
        highlights TEXT DEFAULT '[]'
    );
";

type Result<T> = rusqlite::Result<T>;

impl Db {
    pub fn open(path: &Path) -> Result<Self> {
        let conn = Connection::open(path)?;
        conn.busy_timeout(Duration::from_secs(5))?;
        conn.execute_batch(SCHEMA)?;
        // Database creati da versioni molto vecchie non hanno la colonna highlights.
        let _ = conn.execute("ALTER TABLE books ADD COLUMN highlights TEXT DEFAULT '[]'", []);
        Ok(Db { conn: Mutex::new(conn) })
    }

    fn lock(&self) -> MutexGuard<'_, Connection> {
        self.conn.lock().unwrap_or_else(|e| e.into_inner())
    }

    pub fn all_books(&self) -> Result<Vec<Book>> {
        let conn = self.lock();
        let mut stmt = conn.prepare("SELECT * FROM books")?;
        let books = stmt.query_map([], row_to_book)?.collect();
        books
    }

    pub fn search(&self, query: &str) -> Result<Vec<Book>> {
        let term = format!("%{query}%");
        let conn = self.lock();
        let mut stmt = conn.prepare(
            "SELECT * FROM books WHERE title LIKE ?1 OR author LIKE ?1 OR tags LIKE ?1",
        )?;
        let books = stmt.query_map([term], row_to_book)?.collect();
        books
    }

    pub fn get(&self, id: &str) -> Result<Option<Book>> {
        self.lock()
            .query_row("SELECT * FROM books WHERE id = ?1", [id], row_to_book)
            .optional()
    }

    pub fn exists(&self, id: &str) -> Result<bool> {
        self.lock()
            .query_row("SELECT 1 FROM books WHERE id = ?1", [id], |_| Ok(()))
            .optional()
            .map(|r| r.is_some())
    }

    pub fn title_exists(&self, title: &str) -> Result<bool> {
        self.lock()
            .query_row("SELECT 1 FROM books WHERE LOWER(title) = LOWER(?1)", [title], |_| Ok(()))
            .optional()
            .map(|r| r.is_some())
    }

    pub fn upsert(&self, book: &Book) -> Result<()> {
        upsert_with(&self.lock(), book)
    }

    pub fn upsert_many(&self, books: &[Book]) -> Result<()> {
        let mut conn = self.lock();
        let tx = conn.transaction()?;
        for book in books {
            upsert_with(&tx, book)?;
        }
        tx.commit()
    }

    pub fn delete(&self, id: &str) -> Result<usize> {
        self.lock().execute("DELETE FROM books WHERE id = ?1", [id])
    }

    pub fn set_progress(&self, id: &str, progress: f64) -> Result<usize> {
        self.lock()
            .execute("UPDATE books SET progress = ?1 WHERE id = ?2", params![progress, id])
    }

    pub fn set_review(&self, id: &str, rating: i64, review: Option<&str>) -> Result<usize> {
        self.lock().execute(
            "UPDATE books SET rating = ?1, review = ?2 WHERE id = ?3",
            params![rating, review, id],
        )
    }

    pub fn set_cover(&self, id: &str, cover_path: &str) -> Result<usize> {
        self.lock()
            .execute("UPDATE books SET coverPath = ?1 WHERE id = ?2", params![cover_path, id])
    }
}

fn upsert_with(conn: &Connection, book: &Book) -> Result<()> {
    conn.execute(
        "INSERT INTO books (id, title, author, description, coverPath, epubPath, pageCount,
                            progress, rating, review, tags, highlights)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
         ON CONFLICT(id) DO UPDATE SET
            title = excluded.title, author = excluded.author,
            description = excluded.description, coverPath = excluded.coverPath,
            epubPath = excluded.epubPath, pageCount = excluded.pageCount,
            progress = excluded.progress, rating = excluded.rating,
            review = excluded.review, tags = excluded.tags,
            highlights = excluded.highlights",
        params![
            book.id,
            book.title,
            book.author,
            book.description,
            book.cover_path,
            book.epub_path,
            book.page_count,
            book.progress,
            book.rating,
            book.review,
            serde_json::to_string(&book.tags).unwrap_or_else(|_| "[]".into()),
            serde_json::to_string(&book.highlights).unwrap_or_else(|_| "[]".into()),
        ],
    )?;
    Ok(())
}

// --- Lettura tollerante: i DB creati dalla versione Node possono contenere
// tipi "strani" (numeri salvati come testo, JSON doppiamente codificato...).

fn as_string(v: SqlValue) -> Option<String> {
    match v {
        SqlValue::Null => None,
        SqlValue::Integer(i) => Some(i.to_string()),
        SqlValue::Real(f) => Some(f.to_string()),
        SqlValue::Text(s) => Some(s),
        SqlValue::Blob(b) => Some(String::from_utf8_lossy(&b).into_owned()),
    }
}

fn as_f64(v: SqlValue) -> Option<f64> {
    match v {
        SqlValue::Integer(i) => Some(i as f64),
        SqlValue::Real(f) => Some(f),
        SqlValue::Text(s) => s.trim().parse().ok(),
        _ => None,
    }
    .filter(|f: &f64| f.is_finite())
}

fn parse_json_array(raw: Option<String>) -> Vec<Value> {
    let Some(raw) = raw else { return Vec::new() };
    match serde_json::from_str::<Value>(&raw) {
        Ok(Value::Array(items)) => items,
        // JSON codificato due volte da vecchi bug: "\"[...]\""
        Ok(Value::String(inner)) => parse_json_array(Some(inner)),
        _ => Vec::new(),
    }
}

fn row_to_book(row: &Row) -> Result<Book> {
    let get = |name: &str| row.get::<_, SqlValue>(name).unwrap_or(SqlValue::Null);
    let tags = parse_json_array(as_string(get("tags")))
        .into_iter()
        .filter_map(|v| match v {
            Value::String(s) => Some(s),
            Value::Null => None,
            other => Some(other.to_string()),
        })
        .collect();

    Ok(Book {
        id: as_string(get("id")).unwrap_or_default(),
        title: as_string(get("title")).unwrap_or_default(),
        author: as_string(get("author")),
        description: as_string(get("description")),
        cover_path: as_string(get("coverPath")),
        epub_path: as_string(get("epubPath")),
        page_count: as_f64(get("pageCount")).map(|f| f as i64).unwrap_or(350),
        progress: as_f64(get("progress")).unwrap_or(0.0),
        rating: as_f64(get("rating")).map(|f| f.round() as i64).unwrap_or(0),
        review: as_string(get("review")),
        tags,
        highlights: parse_json_array(as_string(get("highlights"))),
    })
}
