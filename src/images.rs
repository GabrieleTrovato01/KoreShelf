//! Copertine: ritaglio e ottimizzazione a 512x768 JPEG (come faceva Sharp).

use image::codecs::jpeg::JpegEncoder;
use image::imageops::FilterType;

pub const COVER_WIDTH: u32 = 512;
pub const COVER_HEIGHT: u32 = 768;

pub fn make_cover_jpeg(bytes: &[u8], quality: u8) -> Result<Vec<u8>, String> {
    let img = image::load_from_memory(bytes).map_err(|e| format!("Immagine non valida: {e}"))?;
    let resized = img.resize_to_fill(COVER_WIDTH, COVER_HEIGHT, FilterType::Lanczos3);
    let rgb = resized.to_rgb8();
    let mut out = Vec::new();
    rgb.write_with_encoder(JpegEncoder::new_with_quality(&mut out, quality))
        .map_err(|e| format!("Codifica JPEG fallita: {e}"))?;
    Ok(out)
}
