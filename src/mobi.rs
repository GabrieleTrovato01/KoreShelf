//! Kindle (MOBI, AZW3, AZW senza DRM) → EPUB.
//!
//! Un file Kindle è un database Palm: il record 0 ha le intestazioni (PalmDOC, MOBI, EXTH con i
//! metadati), poi vengono i record di testo compressi e le immagini. I MOBI "vecchi" (KF7)
//! hanno l'HTML di Mobipocket; gli AZW3 (KF8) un XHTML più moderno, diviso in "flussi". I
//! MOBI prodotti da Amazon e Calibre spesso li contengono tutti e due: usiamo il KF8.
//!
//! I libri con DRM (comprati sul Kindle Store) sono cifrati con una chiave legata al
//! dispositivo: non sono una password e KoreShelf non li apre.

use crate::blocks::{into_chapters, Block, Inline, Style};
use crate::epub_writer::{sniff_image_type, Book, Image};
use crate::protection::OpenError;
use std::collections::HashMap;

const MAX_TEXT: usize = 300 * 1024 * 1024;

fn u16_at(d: &[u8], off: usize) -> Option<u16> {
    d.get(off..off + 2).map(|b| u16::from_be_bytes([b[0], b[1]]))
}
fn u32_at(d: &[u8], off: usize) -> Option<u32> {
    d.get(off..off + 4).map(|b| u32::from_be_bytes([b[0], b[1], b[2], b[3]]))
}

/// Il file è un database Palm di tipo Kindle?
pub fn looks_like_mobi(head: &[u8]) -> bool {
    head.get(60..68).is_some_and(|t| t == b"BOOKMOBI" || t == b"TEXtREAd")
}

struct Pdb<'a> {
    data: &'a [u8],
    offsets: Vec<usize>,
}

impl<'a> Pdb<'a> {
    fn parse(data: &'a [u8]) -> Result<Pdb<'a>, OpenError> {
        let count = u16_at(data, 76).ok_or("file Kindle troppo corto")? as usize;
        let mut offsets = Vec::with_capacity(count);
        for i in 0..count {
            let off = u32_at(data, 78 + 8 * i).ok_or("tabella dei record danneggiata")? as usize;
            offsets.push(off.min(data.len()));
        }
        Ok(Pdb { data, offsets })
    }

    fn record(&self, i: usize) -> Option<&'a [u8]> {
        let start = *self.offsets.get(i)?;
        let end = self.offsets.get(i + 1).copied().unwrap_or(self.data.len());
        self.data.get(start..end.max(start))
    }
}

struct Header {
    compression: u16,
    text_length: usize,
    text_records: usize,
    encryption: u16,
    utf8: bool,
    first_image: usize,
    huff_record: usize,
    huff_count: usize,
    extra_flags: u16,
    fdst: Option<usize>,
    full_name: Option<String>,
    exth: HashMap<u32, Vec<Vec<u8>>>,
    version: u32,
}

impl Header {
    fn parse(r0: &[u8]) -> Result<Header, OpenError> {
        let get32 = |off| u32_at(r0, off).unwrap_or(0) as usize;
        let header_len = get32(20);
        let has_mobi = r0.get(16..20) == Some(b"MOBI");
        let mut exth = HashMap::new();
        if has_mobi && get32(0x80) & 0x40 != 0 {
            let mut p = 16 + header_len;
            if r0.get(p..p + 4) == Some(b"EXTH") {
                let count = get32(p + 8);
                p += 12;
                for _ in 0..count {
                    let (Some(kind), Some(len)) = (u32_at(r0, p), u32_at(r0, p + 4)) else { break };
                    let len = len as usize;
                    if len < 8 || p + len > r0.len() {
                        break;
                    }
                    exth.entry(kind).or_insert_with(Vec::new).push(r0[p + 8..p + len].to_vec());
                    p += len;
                }
            }
        }
        let utf8 = has_mobi && get32(28) == 65001;
        let decode = |bytes: &[u8]| {
            if utf8 { String::from_utf8_lossy(bytes).into_owned() } else { encoding_rs::WINDOWS_1252.decode_without_bom_handling(bytes).0.into_owned() }
        };
        let full_name = has_mobi
            .then(|| r0.get(get32(0x54)..get32(0x54) + get32(0x58)).map(decode))
            .flatten()
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty());
        Ok(Header {
            compression: u16_at(r0, 0).unwrap_or(1),
            text_length: get32(4),
            text_records: u16_at(r0, 8).unwrap_or(0) as usize,
            encryption: u16_at(r0, 12).unwrap_or(0),
            utf8,
            first_image: if has_mobi { get32(0x6C) } else { usize::MAX },
            huff_record: if has_mobi { get32(0x70) } else { 0 },
            huff_count: if has_mobi { get32(0x74) } else { 0 },
            extra_flags: if has_mobi && header_len >= 0xE4 { u16_at(r0, 0xF2).unwrap_or(0) } else { 0 },
            fdst: (has_mobi && header_len >= 0xC4).then(|| get32(0xC0)).filter(|&i| i != 0 && i != 0xFFFF_FFFF),
            full_name,
            exth,
            version: if has_mobi { get32(0x24) as u32 } else { 0 },
        })
    }

    fn exth_text(&self, kind: u32) -> Vec<String> {
        self.exth
            .get(&kind)
            .map(|values| {
                values
                    .iter()
                    .map(|v| if self.utf8 { String::from_utf8_lossy(v).into_owned() } else { encoding_rs::WINDOWS_1252.decode_without_bom_handling(v).0.into_owned() })
                    .map(|s| s.trim().to_string())
                    .filter(|s| !s.is_empty())
                    .collect()
            })
            .unwrap_or_default()
    }

    fn exth_u32(&self, kind: u32) -> Option<usize> {
        self.exth.get(&kind)?.first().and_then(|v| u32_at(v, 0)).map(|n| n as usize).filter(|&n| n != 0xFFFF_FFFF)
    }
}

// ------------------------------------------------------------------ decompressione

/// Byte in coda a ogni record di testo (dati per l'indice e caratteri multibyte spezzati).
fn trailing_size(record: &[u8], flags: u16) -> usize {
    let mut size = record.len();
    let mut total = 0usize;
    let mut f = flags >> 1;
    while f != 0 {
        if f & 1 != 0 {
            // valore a lunghezza variabile letto all'indietro
            let mut value = 0usize;
            let mut shift = 0;
            let mut pos = size - total.min(size);
            while pos > 0 {
                let b = record[pos - 1];
                value |= ((b & 0x7F) as usize) << shift;
                shift += 7;
                pos -= 1;
                if b & 0x80 != 0 || shift >= 28 {
                    break;
                }
            }
            total += value;
        }
        f >>= 1;
    }
    if flags & 1 != 0 && total < size {
        total += (record[size - total - 1] & 0x3) as usize + 1;
    }
    size = size.saturating_sub(total);
    record.len() - size
}

/// Compressione PalmDOC (LZ77 semplificato).
fn palmdoc(data: &[u8], out: &mut Vec<u8>) {
    let mut i = 0;
    while i < data.len() {
        let c = data[i];
        i += 1;
        match c {
            0x01..=0x08 => {
                let end = (i + c as usize).min(data.len());
                out.extend_from_slice(&data[i..end]);
                i = end;
            }
            0x80..=0xBF => {
                if i >= data.len() {
                    break;
                }
                let pair = ((c as usize) << 8) | data[i] as usize;
                i += 1;
                let distance = (pair >> 3) & 0x7FF;
                let length = (pair & 7) + 3;
                if distance == 0 || distance > out.len() {
                    continue;
                }
                let start = out.len() - distance;
                for k in 0..length {
                    out.push(out[start + k]);
                }
            }
            0xC0..=0xFF => {
                out.push(b' ');
                out.push(c ^ 0x80);
            }
            _ => out.push(c),
        }
    }
}

/// Compressione HUFF/CDIC (usata da Amazon, specifica di KindleUnpack).
struct Huff {
    dict1: Vec<(u32, bool, u64)>,
    mincode: Vec<u64>,
    maxcode: Vec<u64>,
    dictionary: Vec<Option<(Vec<u8>, bool)>>,
}

impl Huff {
    fn load(pdb: &Pdb, first: usize, count: usize) -> Result<Huff, OpenError> {
        let huff = pdb.record(first).ok_or("record HUFF mancante")?;
        if huff.get(0..8) != Some(b"HUFF\x00\x00\x00\x18") {
            return Err(OpenError::Other("record HUFF non valido".into()));
        }
        let off1 = u32_at(huff, 8).unwrap_or(0) as usize;
        let off2 = u32_at(huff, 12).unwrap_or(0) as usize;
        let mut dict1 = Vec::with_capacity(256);
        for i in 0..256 {
            let v = u32_at(huff, off1 + 4 * i).ok_or("HUFF corto")?;
            let codelen = v & 0x1F;
            let term = v & 0x80 != 0;
            let maxcode = (((v >> 8) as u64 + 1) << (32 - codelen.max(1))) - 1;
            dict1.push((codelen, term, maxcode));
        }
        let mut mincode = vec![0u64];
        let mut maxcode = vec![0u64];
        for codelen in 1..=32u32 {
            let min = u32_at(huff, off2 + 8 * (codelen as usize - 1)).ok_or("HUFF corto")? as u64;
            let max = u32_at(huff, off2 + 8 * (codelen as usize - 1) + 4).ok_or("HUFF corto")? as u64;
            mincode.push(min << (32 - codelen));
            maxcode.push(((max + 1) << (32 - codelen)) - 1);
        }
        let mut dictionary = Vec::new();
        for r in first + 1..first + count {
            let cdic = pdb.record(r).ok_or("record CDIC mancante")?;
            if cdic.get(0..8) != Some(b"CDIC\x00\x00\x00\x10") {
                return Err(OpenError::Other("record CDIC non valido".into()));
            }
            let phrases = u32_at(cdic, 8).unwrap_or(0) as usize;
            let bits = u32_at(cdic, 12).unwrap_or(0);
            let n = (1usize << bits.min(30)).min(phrases.saturating_sub(dictionary.len()));
            for i in 0..n {
                let off = u16_at(cdic, 16 + 2 * i).ok_or("CDIC corto")? as usize;
                let blen = u16_at(cdic, 16 + off).ok_or("CDIC corto")? as usize;
                let slice = cdic.get(18 + off..18 + off + (blen & 0x7FFF)).ok_or("CDIC corto")?.to_vec();
                dictionary.push(Some((slice, blen & 0x8000 != 0)));
            }
        }
        Ok(Huff { dict1, mincode, maxcode, dictionary })
    }

    fn unpack(&mut self, data: &[u8], depth: usize, out: &mut Vec<u8>) -> Result<(), OpenError> {
        if depth > 32 {
            return Err(OpenError::Other("HUFF troppo annidato".into()));
        }
        let mut padded = data.to_vec();
        padded.extend_from_slice(&[0; 8]);
        let mut bits_left = data.len() as i64 * 8;
        let mut pos = 0usize;
        let read64 = |p: usize| u64::from_be_bytes(padded[p..p + 8].try_into().unwrap());
        let mut x = read64(pos);
        let mut n: i32 = 32;
        loop {
            if n <= 0 {
                pos += 4;
                if pos + 8 > padded.len() {
                    break;
                }
                x = read64(pos);
                n += 32;
            }
            let code = (x >> n) & 0xFFFF_FFFF;
            let (mut codelen, term, mut maxcode) = self.dict1[(code >> 24) as usize];
            if !term {
                while (codelen as usize) < 32 && code < self.mincode[codelen as usize] {
                    codelen += 1;
                }
                maxcode = self.maxcode[codelen as usize];
            }
            n -= codelen as i32;
            bits_left -= codelen as i64;
            if bits_left < 0 {
                break;
            }
            let r = ((maxcode - code) >> (32 - codelen)) as usize;
            let entry = self.dictionary.get_mut(r).ok_or("HUFF: frase fuori dal dizionario")?.take().ok_or("HUFF ciclico")?;
            let (slice, done) = entry;
            let expanded = if done {
                slice
            } else {
                let mut sub = Vec::new();
                self.unpack(&slice, depth + 1, &mut sub)?;
                sub
            };
            out.extend_from_slice(&expanded);
            self.dictionary[r] = Some((expanded, true));
        }
        Ok(())
    }
}

fn text_of_section(pdb: &Pdb, start: usize, header: &Header) -> Result<Vec<u8>, OpenError> {
    let mut huff = if header.compression == 17480 {
        Some(Huff::load(pdb, start + header.huff_record, header.huff_count)?)
    } else {
        None
    };
    let mut out = Vec::with_capacity(header.text_length.min(MAX_TEXT));
    for i in 1..=header.text_records {
        let record = pdb.record(start + i).ok_or("record di testo mancante")?;
        let body = &record[..record.len() - trailing_size(record, header.extra_flags)];
        match header.compression {
            1 => out.extend_from_slice(body),
            2 => palmdoc(body, &mut out),
            17480 => huff.as_mut().unwrap().unpack(body, 0, &mut out)?,
            other => return Err(OpenError::Unsupported(format!("compressione Kindle {other}"))),
        }
        if out.len() > MAX_TEXT {
            return Err(OpenError::Other("testo troppo lungo".into()));
        }
    }
    out.truncate(header.text_length.max(1).min(out.len()));
    Ok(out)
}

// ------------------------------------------------------------------ HTML Kindle → blocchi

fn decode_entities(text: &str) -> String {
    if !text.contains('&') {
        return text.to_string();
    }
    let mut out = String::with_capacity(text.len());
    let mut rest = text;
    while let Some(i) = rest.find('&') {
        out.push_str(&rest[..i]);
        rest = &rest[i..];
        let end = rest[1..].find(|c: char| c == ';' || c == '&' || c.is_whitespace()).map(|e| e + 1);
        let Some(end) = end.filter(|&e| rest.as_bytes().get(e) == Some(&b';') && e <= 12) else {
            out.push('&');
            rest = &rest[1..];
            continue;
        };
        let name = &rest[1..end];
        let decoded = match name {
            "amp" => Some('&'),
            "lt" => Some('<'),
            "gt" => Some('>'),
            "quot" => Some('"'),
            "apos" => Some('\''),
            "nbsp" => Some('\u{a0}'),
            "rsquo" => Some('’'),
            "lsquo" => Some('‘'),
            "rdquo" => Some('”'),
            "ldquo" => Some('“'),
            "mdash" => Some('—'),
            "ndash" => Some('–'),
            "hellip" => Some('…'),
            "laquo" => Some('«'),
            "raquo" => Some('»'),
            "shy" => Some('\u{ad}'),
            n if n.starts_with("#x") || n.starts_with("#X") => u32::from_str_radix(&n[2..], 16).ok().and_then(char::from_u32),
            n if n.starts_with('#') => n[1..].parse::<u32>().ok().and_then(char::from_u32),
            _ => None,
        };
        match decoded {
            Some(c) => {
                out.push(c);
                rest = &rest[end + 1..];
            }
            None => {
                out.push('&');
                rest = &rest[1..];
            }
        }
    }
    out.push_str(rest);
    out
}

fn attribute(tag: &str, name: &str) -> Option<String> {
    let lower = tag.to_ascii_lowercase();
    let mut search = 0;
    while let Some(found) = lower[search..].find(name) {
        let at = search + found;
        search = at + name.len();
        let before_ok = at == 0 || lower.as_bytes()[at - 1].is_ascii_whitespace();
        let after = lower[at + name.len()..].trim_start();
        if !before_ok || !after.starts_with('=') {
            continue;
        }
        let value_start = tag.len() - after.len() + 1;
        let value = tag[value_start..].trim_start();
        let (value, _) = match value.chars().next() {
            Some(q @ ('"' | '\'')) => {
                let inner = &value[1..];
                (inner.split(q).next().unwrap_or(""), ())
            }
            _ => (value.split(|c: char| c.is_whitespace() || c == '>' || c == '/').next().unwrap_or(""), ()),
        };
        return Some(decode_entities(value));
    }
    None
}

/// Numero di un'immagine nei riferimenti `kindle:embed:XXXX` (base 32, cifre 0-9 e A-V).
fn base32(text: &str) -> Option<usize> {
    let mut n = 0usize;
    for c in text.chars() {
        n = n * 32 + c.to_digit(32)? as usize;
    }
    Some(n)
}

#[derive(Clone, Copy, PartialEq)]
enum Kind {
    Para,
    Heading(u8),
    Item,
}

struct Converter<'b> {
    blocks: Vec<Block>,
    inline: Inline,
    kind: Kind,
    style_counts: [u32; 6],
    skip: u32,
    /// L'ultimo carattere scritto è uno spazio (gli spazi consecutivi diventano uno)
    pending_space: bool,
    seen_html: bool,
    /// Livello di titolo dei `<font size>` aperti (0 = testo normale): nei MOBI vecchi i
    /// titoli sono paragrafi in carattere grande, non `<h1>`
    font_levels: Vec<u8>,
    /// Il paragrafo in corso ha solo testo in carattere grande? (e di che livello)
    block_big: Option<u8>,
    block_has_text: bool,
    /// numero dell'immagine (da 1) → nome del file nell'EPUB
    image_for: &'b dyn Fn(usize) -> Option<String>,
}

impl Converter<'_> {
    fn style(&self) -> Style {
        let c = &self.style_counts;
        Style { bold: c[0] > 0, italic: c[1] > 0, underline: c[2] > 0, strike: c[3] > 0, vertical: if c[4] > 0 { 1 } else if c[5] > 0 { -1 } else { 0 } }
    }

    fn flush(&mut self) {
        let big = self.block_big.take().filter(|&l| self.block_has_text && l > 0);
        self.block_has_text = false;
        if !self.inline.is_blank() {
            let html = self.inline.take();
            let html = html.trim().trim_end_matches("<br/>").to_string();
            let short = crate::blocks::plain_text(&html).chars().count() <= 150;
            self.blocks.push(match self.kind {
                Kind::Para if big.is_some() && short => Block::Heading(big.unwrap(), html),
                Kind::Para => Block::Para(html),
                Kind::Heading(l) => Block::Heading(l, html),
                Kind::Item => Block::Item(html),
            });
        } else {
            self.inline.take();
        }
        self.pending_space = false;
    }

    fn text(&mut self, raw: &str) {
        if self.skip > 0 {
            return;
        }
        let text = decode_entities(raw);
        let mut collapsed = String::with_capacity(text.len());
        for c in text.chars() {
            if c.is_whitespace() && c != '\u{a0}' {
                let at_start = self.inline.html.is_empty() && collapsed.is_empty();
                if !at_start && !self.pending_space {
                    collapsed.push(' ');
                    self.pending_space = true;
                }
            } else {
                collapsed.push(c);
                self.pending_space = false;
            }
        }
        if !collapsed.trim().is_empty() {
            let level = self.font_levels.iter().copied().filter(|&l| l > 0).min();
            self.block_big = match (self.block_has_text, level) {
                (_, None) => Some(0),
                (false, Some(l)) => Some(l),
                (true, Some(l)) => self.block_big.map(|b| if b == 0 { 0 } else { b.min(l) }),
            };
            self.block_has_text = true;
        }
        let style = self.style();
        self.inline.text(&collapsed, style);
    }

    fn tag(&mut self, raw: &str) {
        let closing = raw.starts_with('/');
        let body = raw.trim_start_matches('/');
        let name: String = body.chars().take_while(|c| !c.is_whitespace() && *c != '/' && *c != '>').collect::<String>().to_ascii_lowercase();
        let self_closing = raw.trim_end().ends_with('/');
        const SKIP: [&str; 4] = ["head", "style", "script", "title"];
        if SKIP.contains(&name.as_str()) {
            if closing {
                self.skip = self.skip.saturating_sub(1);
            } else if !self_closing {
                self.skip += 1;
            }
            return;
        }
        if self.skip > 0 {
            return;
        }
        let style_index = match name.as_str() {
            "b" | "strong" => Some(0),
            "i" | "em" | "cite" | "var" => Some(1),
            "u" | "ins" => Some(2),
            "s" | "strike" | "del" => Some(3),
            "sup" => Some(4),
            "sub" => Some(5),
            _ => None,
        };
        if let Some(i) = style_index {
            if closing {
                self.style_counts[i] = self.style_counts[i].saturating_sub(1);
            } else if !self_closing {
                self.style_counts[i] += 1;
            }
            return;
        }
        match name.as_str() {
            "font" => {
                if closing {
                    self.font_levels.pop();
                } else if !self_closing {
                    let size = attribute(body, "size").unwrap_or_default();
                    let size = size.trim();
                    let level = match size {
                        "7" | "+3" | "+4" => 1,
                        "6" | "+2" => 2,
                        "5" => 3,
                        _ => 0,
                    };
                    self.font_levels.push(level);
                }
            }
            "html" if !closing => {
                // Negli AZW3 ogni file del libro originale comincia con il suo <html>
                if self.seen_html {
                    self.flush();
                    self.blocks.push(Block::Break);
                }
                self.seen_html = true;
            }
            "mbp:pagebreak" => {
                self.flush();
                self.blocks.push(Block::Break);
            }
            "br" => {
                self.inline.line_break();
                self.pending_space = true;
            }
            "hr" => {
                self.flush();
                self.blocks.push(Block::Rule);
            }
            "img" | "image" => {
                let index = attribute(body, "recindex")
                    .and_then(|r| r.trim().parse::<usize>().ok())
                    .or_else(|| {
                        let src = attribute(body, "src").or_else(|| attribute(body, "xlink:href"))?;
                        let id = src.strip_prefix("kindle:embed:")?;
                        base32(id.split('?').next().unwrap_or(""))
                    });
                if let Some(name) = index.and_then(|i| (self.image_for)(i)) {
                    self.flush();
                    self.blocks.push(Block::Image(name));
                }
            }
            "p" | "div" | "blockquote" | "center" | "section" | "article" | "pre" | "dt" | "dd" | "tr" | "table" | "ul" | "ol" | "body" | "figure" | "figcaption" | "aside" | "header" | "footer" | "nav" => {
                self.flush();
                self.kind = Kind::Para;
            }
            "li" => {
                self.flush();
                self.kind = if closing { Kind::Para } else { Kind::Item };
            }
            "td" | "th" if !closing && !self.inline.html.is_empty() => self.inline.text(" · ", Style::default()),
            h if h.len() == 2 && h.starts_with('h') && h.as_bytes()[1].is_ascii_digit() => {
                self.flush();
                let level = (h.as_bytes()[1] - b'0').clamp(1, 6);
                self.kind = if closing { Kind::Para } else { Kind::Heading(level) };
            }
            _ => {}
        }
    }
}

fn html_to_blocks(html: &str, image_for: &dyn Fn(usize) -> Option<String>) -> Vec<Block> {
    let mut c = Converter {
        blocks: Vec::new(),
        inline: Inline::default(),
        kind: Kind::Para,
        style_counts: [0; 6],
        skip: 0,
        pending_space: false,
        seen_html: false,
        font_levels: Vec::new(),
        block_big: None,
        block_has_text: false,
        image_for,
    };
    let mut rest = html;
    while let Some(lt) = rest.find('<') {
        c.text(&rest[..lt]);
        rest = &rest[lt..];
        if rest.starts_with("<!--") {
            rest = rest.find("-->").map(|e| &rest[e + 3..]).unwrap_or("");
            continue;
        }
        let Some(gt) = rest.find('>') else { break };
        let inner = &rest[1..gt];
        if !inner.starts_with('!') && !inner.starts_with('?') {
            c.tag(inner);
        }
        rest = &rest[gt + 1..];
    }
    c.text(rest);
    c.flush();
    c.blocks
}

// ------------------------------------------------------------------ libro

#[derive(Debug, Default)]
pub struct MobiInfo {
    pub title: Option<String>,
    pub author: Option<String>,
    pub description: Option<String>,
    pub isbn: Option<String>,
    pub language: Option<String>,
}

pub fn mobi_to_epub(data: &[u8], fallback_title: &str) -> Result<(Vec<u8>, MobiInfo), OpenError> {
    if data.get(60..68) == Some(b"TEXtREAd") {
        // Vecchio PalmDOC senza intestazione MOBI: solo testo
    } else if !looks_like_mobi(data) {
        return Err(OpenError::Other("non è un file Kindle".into()));
    }
    let pdb = Pdb::parse(data)?;
    let r0 = pdb.record(0).ok_or("record 0 mancante")?;
    let kf7 = Header::parse(r0)?;
    if kf7.encryption != 0 {
        return Err(OpenError::Unsupported("DRM".into()));
    }
    // Sezione KF8: da sola (AZW3) o dopo il segnaposto BOUNDARY (MOBI "doppi")
    let boundary = kf7.exth_u32(121).filter(|&b| pdb.record(b.wrapping_sub(1)).is_some_and(|r| r.starts_with(b"BOUNDARY")));
    let kf8 = match boundary {
        Some(b) => {
            let kf8 = Header::parse(pdb.record(b).ok_or("sezione KF8 mancante")?)?;
            if kf8.encryption != 0 {
                return Err(OpenError::Unsupported("DRM".into()));
            }
            Some((b, kf8))
        }
        None => None,
    };
    // Nei MOBI "doppi" le immagini sono condivise: sono quelle della parte KF7
    let image_base = kf7.first_image;
    let (start, header) = match &kf8 {
        Some((b, h)) => (*b, h),
        None => (0, &kf7),
    };
    let mut raw = text_of_section(&pdb, start, header)?;
    // Negli AZW3 il testo è il primo "flusso"; gli altri (CSS, SVG) vengono dopo
    if header.version >= 8 {
        if let Some(fdst) = header.fdst.and_then(|i| pdb.record(start + i)).filter(|r| r.starts_with(b"FDST")) {
            if let Some(end) = u32_at(fdst, 16) {
                raw.truncate((end as usize).min(raw.len()));
            }
        }
    }
    let html = if header.utf8 { String::from_utf8_lossy(&raw).into_owned() } else { encoding_rs::WINDOWS_1252.decode_without_bom_handling(&raw).0.into_owned() };

    let mut images: Vec<Image> = Vec::new();
    let image_names = std::cell::RefCell::new(HashMap::<usize, Option<String>>::new());
    let image_store = std::cell::RefCell::new(&mut images);
    let image_for = |n: usize| -> Option<String> {
        if n == 0 || image_base == usize::MAX {
            return None;
        }
        if let Some(found) = image_names.borrow().get(&n) {
            return found.clone();
        }
        let record = pdb.record(image_base + n - 1);
        let name = record.and_then(|bytes| {
            let mime = sniff_image_type(bytes)?;
            let ext = mime.trim_start_matches("image/").replace("jpeg", "jpg");
            let name = format!("image{n:04}.{ext}");
            image_store.borrow_mut().push(Image { name: name.clone(), media_type: mime.to_string(), bytes: bytes.to_vec() });
            Some(name)
        });
        image_names.borrow_mut().insert(n, name.clone());
        name
    };
    let blocks = html_to_blocks(&html, &image_for);
    let cover_name = header.exth_u32(201).or(kf7.exth_u32(201)).and_then(|offset| image_for(offset + 1));

    let title = header.exth_text(503).into_iter().next().or(header.full_name.clone()).or(kf7.full_name.clone());
    let authors = header.exth_text(100);
    let description = header.exth_text(103).into_iter().next().map(|d| crate::text::html_to_plain(&d)).filter(|d| !d.trim().is_empty());
    let isbn = header.exth_text(104).into_iter().find_map(|i| crate::isbn::find_isbn(&i));
    let language = header.exth_text(524).into_iter().next();
    let info = MobiInfo {
        title: title.clone(),
        author: (!authors.is_empty()).then(|| authors.join(", ")),
        description,
        isbn,
        language: language.clone(),
    };

    let book_title = title.unwrap_or_else(|| fallback_title.to_string());
    let chapters = into_chapters(blocks, &book_title);
    let cover = cover_name.and_then(|name| images.iter().position(|i| i.name == name));
    let epub = Book {
        title: book_title,
        author: info.author.clone(),
        description: info.description.clone(),
        language,
        isbn: info.isbn.clone(),
        cover,
        images,
        chapters,
    }
    .to_epub()
    .map_err(OpenError::Other)?;
    Ok((epub, info))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn palmdoc_literals_spaces_and_copies() {
        let mut out = Vec::new();
        // "ab", poi 0xE3 = spazio + 'c', poi 0x80 0x18 = copia 3 byte da 3 posizioni indietro
        palmdoc(&[b'a', b'b', 0xE3, 0x80, 0x18], &mut out);
        assert_eq!(out, b"ab cb c");
    }

    #[test]
    fn big_font_paragraphs_are_headings() {
        let none = |_n: usize| None;
        let blocks = html_to_blocks(r#"<p><font size="7"><b>Titolo</b></font></p><p>Testo <font size="7">grande</font> in mezzo</p>"#, &none);
        assert_eq!(blocks, vec![Block::Heading(1, "<strong>Titolo</strong>".into()), Block::Para("Testo grande in mezzo".into())]);
    }

    #[test]
    fn entities_and_attributes() {
        assert_eq!(decode_entities("a &amp; b &#233; &#x41; &nbsp;&bogus;"), "a & b é A \u{a0}&bogus;");
        assert_eq!(attribute(r#"img src="kindle:embed:000A?mime=image/jpeg" alt=x"#, "src").as_deref(), Some("kindle:embed:000A?mime=image/jpeg"));
        assert_eq!(base32("000A"), Some(10));
        assert_eq!(base32("0010"), Some(32));
    }

    #[test]
    fn kindle_html_becomes_blocks() {
        let none = |_n: usize| None;
        let blocks = html_to_blocks(
            "<html><head><title>x</title></head><body><h1>Uno</h1><p>Ciao <b>mondo</b>\n  e <i>tutti</i></p><mbp:pagebreak/><p>Due &amp; tre</p></body></html>",
            &none,
        );
        assert_eq!(
            blocks,
            vec![
                Block::Heading(1, "Uno".into()),
                Block::Para("Ciao <strong>mondo</strong> e <em>tutti</em>".into()),
                Block::Break,
                Block::Para("Due &amp; tre".into()),
            ]
        );
    }
}
