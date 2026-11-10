//! Un documento come sequenza di blocchi (titoli, paragrafi, elenchi, tabelle, immagini),
//! diviso poi in capitoli EPUB. Lo usano i convertitori di DOCX, ODT e MOBI/AZW3, così
//! hanno tutti lo stesso aspetto e le stesse regole per i capitoli.

use crate::epub_writer::{escape, Chapter};

#[derive(Debug, Clone, PartialEq)]
pub enum Block {
    /// Livello 1-6 e contenuto (XHTML in linea)
    Heading(u8, String),
    Para(String),
    /// Voce di elenco puntato
    Item(String),
    /// Nome del file in `images/`
    Image(String),
    /// Righe e celle (XHTML in linea)
    Table(Vec<Vec<String>>),
    Rule,
    /// Interruzione di capitolo esplicita (es. `<mbp:pagebreak/>` nei MOBI)
    Break,
}

/// Stili di un pezzo di testo.
#[derive(Debug, Clone, Copy, Default, PartialEq)]
pub struct Style {
    pub bold: bool,
    pub italic: bool,
    pub underline: bool,
    pub strike: bool,
    /// +1 apice, -1 pedice
    pub vertical: i8,
}

/// Costruisce l'XHTML in linea di un paragrafo. Ogni pezzo di testo viene chiuso subito,
/// così l'XHTML resta sempre ben formato anche quando gli stili si accavallano.
#[derive(Default)]
pub struct Inline {
    pub html: String,
}

impl Inline {
    pub fn text(&mut self, text: &str, style: Style) {
        if text.is_empty() {
            return;
        }
        let mut tags: Vec<&str> = Vec::new();
        if style.bold {
            tags.push("strong");
        }
        if style.italic {
            tags.push("em");
        }
        if style.underline {
            tags.push("u");
        }
        if style.strike {
            tags.push("del");
        }
        match style.vertical {
            1 => tags.push("sup"),
            -1 => tags.push("sub"),
            _ => {}
        }
        for tag in &tags {
            self.html.push_str(&format!("<{tag}>"));
        }
        self.html.push_str(&escape(text));
        for tag in tags.iter().rev() {
            self.html.push_str(&format!("</{tag}>"));
        }
    }

    pub fn line_break(&mut self) {
        self.html.push_str("<br/>");
    }

    /// Testo già pronto (per esempio un rimando a una nota).
    pub fn raw(&mut self, html: &str) {
        self.html.push_str(html);
    }

    pub fn is_blank(&self) -> bool {
        plain_text(&self.html).trim().is_empty() && !self.html.contains("<img")
    }

    pub fn take(&mut self) -> String {
        std::mem::take(&mut self.html)
    }
}

/// Testo senza tag (per i titoli dei capitoli nell'indice).
pub fn plain_text(html: &str) -> String {
    let mut out = String::new();
    let mut in_tag = false;
    for c in html.chars() {
        match c {
            '<' => in_tag = true,
            '>' => in_tag = false,
            c if !in_tag => out.push(c),
            _ => {}
        }
    }
    out.replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", "\"").replace("&#39;", "'").replace("&amp;", "&")
}

fn render(blocks: &[Block]) -> String {
    let mut out = String::new();
    let mut in_list = false;
    for block in blocks {
        let is_item = matches!(block, Block::Item(_));
        if in_list && !is_item {
            out.push_str("</ul>\n");
            in_list = false;
        }
        match block {
            Block::Heading(level, html) => {
                let h = (*level).clamp(1, 6);
                out.push_str(&format!("<h{h}>{html}</h{h}>\n"));
            }
            Block::Para(html) => out.push_str(&format!("<p>{html}</p>\n")),
            Block::Item(html) => {
                if !in_list {
                    out.push_str("<ul>\n");
                    in_list = true;
                }
                out.push_str(&format!("<li>{html}</li>\n"));
            }
            Block::Image(name) => {
                out.push_str(&format!(r#"<div class="ks-image"><img src="images/{}" alt=""/></div>"#, escape(name)));
                out.push('\n');
            }
            Block::Table(rows) => {
                out.push_str("<table>\n");
                for row in rows {
                    out.push_str("<tr>");
                    for cell in row {
                        out.push_str(&format!("<td>{cell}</td>"));
                    }
                    out.push_str("</tr>\n");
                }
                out.push_str("</table>\n");
            }
            Block::Rule => out.push_str("<hr/>\n"),
            Block::Break => {}
        }
    }
    if in_list {
        out.push_str("</ul>\n");
    }
    out
}

fn heading_level(block: &Block) -> Option<u8> {
    match block {
        Block::Heading(level, _) => Some(*level),
        _ => None,
    }
}

/// Divide i blocchi in capitoli: alle interruzioni esplicite se ci sono, altrimenti al
/// livello di titolo più grande (se c'è un solo titolo di quel livello è il titolo del
/// libro e si divide al livello sotto). Senza titoli: un capitolo ogni ~60.000 caratteri.
pub fn into_chapters(blocks: Vec<Block>, book_title: &str) -> Vec<Chapter> {
    let mut groups: Vec<Vec<Block>> = Vec::new();
    if blocks.iter().any(|b| *b == Block::Break) {
        groups.push(Vec::new());
        for block in blocks {
            if block == Block::Break {
                groups.push(Vec::new());
            } else {
                groups.last_mut().unwrap().push(block);
            }
        }
    } else {
        let levels: Vec<u8> = blocks.iter().filter_map(heading_level).collect();
        let split_level = match levels.iter().copied().min() {
            Some(top) if levels.iter().filter(|&&l| l == top).count() == 1 && levels.iter().any(|&l| l > top) => {
                levels.iter().copied().filter(|&l| l > top).min()
            }
            other => other,
        };
        groups.push(Vec::new());
        let mut size = 0usize;
        for block in blocks {
            let starts_chapter = match split_level {
                Some(level) => heading_level(&block) == Some(level),
                None => size > 60_000,
            };
            if starts_chapter && !groups.last().unwrap().is_empty() {
                groups.push(Vec::new());
                size = 0;
            }
            size += match &block {
                Block::Para(h) | Block::Item(h) | Block::Heading(_, h) => h.len(),
                _ => 50,
            };
            groups.last_mut().unwrap().push(block);
        }
    }

    let groups: Vec<Vec<Block>> = groups
        .into_iter()
        .filter(|g| g.iter().any(|b| !matches!(b, Block::Para(h) if plain_text(h).trim().is_empty())))
        .collect();
    let many = groups.len() > 1;
    groups
        .into_iter()
        .enumerate()
        .map(|(i, group)| {
            let heading = group.iter().find_map(|b| match b {
                Block::Heading(_, html) => Some(plain_text(html).trim().to_string()),
                _ => None,
            });
            let title = match heading.filter(|h| !h.is_empty()) {
                Some(h) => h,
                None if many => format!("{book_title} ({})", i + 1),
                None => book_title.to_string(),
            };
            Chapter { title, body: render(&group) }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn overlapping_styles_stay_well_formed() {
        let mut inline = Inline::default();
        inline.text("a", Style { bold: true, ..Default::default() });
        inline.text("b & c", Style { bold: true, italic: true, ..Default::default() });
        assert_eq!(inline.html, "<strong>a</strong><strong><em>b &amp; c</em></strong>");
    }

    #[test]
    fn chapters_follow_headings() {
        let blocks = vec![
            Block::Heading(1, "Libro".into()),
            Block::Para("intro".into()),
            Block::Heading(2, "Uno".into()),
            Block::Para("a".into()),
            Block::Item("x".into()),
            Block::Item("y".into()),
            Block::Heading(2, "Due".into()),
            Block::Para("b".into()),
        ];
        let chapters = into_chapters(blocks, "T");
        let titles: Vec<&str> = chapters.iter().map(|c| c.title.as_str()).collect();
        assert_eq!(titles, ["Libro", "Uno", "Due"]);
        assert!(chapters[1].body.contains("<ul>\n<li>x</li>\n<li>y</li>\n</ul>"));
    }

    #[test]
    fn explicit_breaks_win() {
        let blocks = vec![Block::Para("a".into()), Block::Break, Block::Heading(3, "B".into()), Block::Para("b".into())];
        let titles: Vec<String> = into_chapters(blocks, "T").into_iter().map(|c| c.title).collect();
        assert_eq!(titles, ["T (1)", "B"]);
    }
}
