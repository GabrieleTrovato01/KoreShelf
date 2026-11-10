//! Documenti Office protetti da password.
//!
//! * **DOCX**: Word mette il documento cifrato dentro un contenitore OLE (file "compound")
//!   con due flussi, `EncryptionInfo` ed `EncryptedPackage` (specifica MS-OFFCRYPTO).
//!   Supportiamo la cifratura *Agile* (Word 2010 e successivi: AES-256 + SHA-512) e quella
//!   *Standard* (Word 2007, e quella che scrive LibreOffice: AES-128 + SHA-1).
//! * **ODT**: LibreOffice cifra ogni file del pacchetto con AES-256-CBC, chiave da
//!   PBKDF2-HMAC-SHA1 sullo SHA-256 della password; i parametri sono in
//!   `META-INF/manifest.xml`. Le cifrature più vecchie (Blowfish) e la nuova "a pacchetto
//!   intero" di LibreOffice 25 (Argon2 + AES-GCM) vengono riconosciute ma non aperte.

use crate::protection::OpenError;
use aes::cipher::{BlockDecrypt, BlockDecryptMut, KeyInit, KeyIvInit};
use sha1::Digest;
use std::collections::HashMap;
use std::io::{Cursor, Read};

/// Firma di un file OLE "compound" (anche i vecchi .doc ce l'hanno).
pub const CFB_MAGIC: [u8; 8] = [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1];

fn b64(text: &str) -> Result<Vec<u8>, OpenError> {
    crate::server_mode::decode_base64(text.trim()).ok_or_else(|| OpenError::Other("base64 non valido".into()))
}

#[derive(Clone, Copy)]
enum Hash {
    Sha1,
    Sha256,
    Sha384,
    Sha512,
}

impl Hash {
    fn from_name(name: &str) -> Result<Hash, OpenError> {
        match name.to_ascii_uppercase().replace('-', "").as_str() {
            "SHA1" => Ok(Hash::Sha1),
            "SHA256" => Ok(Hash::Sha256),
            "SHA384" => Ok(Hash::Sha384),
            "SHA512" => Ok(Hash::Sha512),
            other => Err(OpenError::Unsupported(format!("hash {other}"))),
        }
    }

    fn digest(self, parts: &[&[u8]]) -> Vec<u8> {
        fn run<D: Digest>(parts: &[&[u8]]) -> Vec<u8> {
            let mut d = D::new();
            for p in parts {
                d.update(p);
            }
            d.finalize().to_vec()
        }
        match self {
            Hash::Sha1 => run::<sha1::Sha1>(parts),
            Hash::Sha256 => run::<sha2::Sha256>(parts),
            Hash::Sha384 => run::<sha2::Sha384>(parts),
            Hash::Sha512 => run::<sha2::Sha512>(parts),
        }
    }
}

fn aes_cbc_decrypt(key: &[u8], iv: &[u8], data: &[u8]) -> Result<Vec<u8>, OpenError> {
    use cbc::cipher::block_padding::NoPadding;
    if data.len() % 16 != 0 || iv.len() < 16 {
        return Err(OpenError::WrongPassword);
    }
    let iv = &iv[..16];
    let bad = |_| OpenError::WrongPassword;
    match key.len() {
        16 => cbc::Decryptor::<aes::Aes128>::new_from_slices(key, iv).map_err(|_| OpenError::Other("chiave".into()))?.decrypt_padded_vec_mut::<NoPadding>(data).map_err(bad),
        24 => cbc::Decryptor::<aes::Aes192>::new_from_slices(key, iv).map_err(|_| OpenError::Other("chiave".into()))?.decrypt_padded_vec_mut::<NoPadding>(data).map_err(bad),
        32 => cbc::Decryptor::<aes::Aes256>::new_from_slices(key, iv).map_err(|_| OpenError::Other("chiave".into()))?.decrypt_padded_vec_mut::<NoPadding>(data).map_err(bad),
        n => Err(OpenError::Unsupported(format!("chiave AES da {n} byte"))),
    }
}

fn aes_ecb_decrypt(key: &[u8], data: &[u8]) -> Result<Vec<u8>, OpenError> {
    fn run<C: BlockDecrypt + KeyInit>(key: &[u8], data: &[u8]) -> Result<Vec<u8>, OpenError> {
        let cipher = C::new_from_slice(key).map_err(|_| OpenError::Other("chiave".into()))?;
        let mut out = data[..data.len() / 16 * 16].to_vec();
        for block in out.chunks_mut(16) {
            cipher.decrypt_block(block.into());
        }
        Ok(out)
    }
    match key.len() {
        16 => run::<aes::Aes128>(key, data),
        24 => run::<aes::Aes192>(key, data),
        32 => run::<aes::Aes256>(key, data),
        n => Err(OpenError::Unsupported(format!("chiave AES da {n} byte"))),
    }
}

fn utf16le(text: &str) -> Vec<u8> {
    text.encode_utf16().flat_map(u16::to_le_bytes).collect()
}

// ------------------------------------------------------------------ DOCX

fn read_stream(cfb: &mut cfb::CompoundFile<Cursor<&[u8]>>, name: &str) -> Option<Vec<u8>> {
    let mut stream = cfb.open_stream(name).ok()?;
    let mut out = Vec::new();
    stream.read_to_end(&mut out).ok()?;
    Some(out)
}

/// Il file è un documento Office cifrato (contenitore OLE con `EncryptionInfo`)?
pub fn is_encrypted_office(bytes: &[u8]) -> bool {
    bytes.starts_with(&CFB_MAGIC)
        && cfb::CompoundFile::open(Cursor::new(bytes)).map(|c| c.exists("EncryptionInfo") && c.exists("EncryptedPackage")).unwrap_or(false)
}

/// Decifra un DOCX protetto e restituisce il pacchetto ZIP normale.
pub fn decrypt_docx(bytes: &[u8], password: Option<&str>) -> Result<Vec<u8>, OpenError> {
    let mut cfb = cfb::CompoundFile::open(Cursor::new(bytes)).map_err(|e| OpenError::Other(format!("contenitore OLE: {e}")))?;
    let info = read_stream(&mut cfb, "EncryptionInfo").ok_or(OpenError::Unsupported("documento Office senza EncryptionInfo".into()))?;
    let package = read_stream(&mut cfb, "EncryptedPackage").ok_or(OpenError::Other("EncryptedPackage mancante".into()))?;
    let password = password.ok_or(OpenError::NeedsPassword)?;
    if info.len() < 8 || package.len() < 8 {
        return Err(OpenError::Other("cifratura Office non valida".into()));
    }
    let major = u16::from_le_bytes([info[0], info[1]]);
    let minor = u16::from_le_bytes([info[2], info[3]]);
    let size = u64::from_le_bytes(package[..8].try_into().unwrap()) as usize;
    let plain = match (major, minor) {
        (4, 4) => agile(&info[8..], &package[8..], password)?,
        (2..=4, 2) => standard(&info, &package[8..], password)?,
        _ => return Err(OpenError::Unsupported(format!("cifratura Office {major}.{minor}"))),
    };
    if plain.len() < size || !plain.starts_with(b"PK") {
        return Err(OpenError::WrongPassword);
    }
    Ok(plain[..size].to_vec())
}

/// Cifratura Agile (MS-OFFCRYPTO 2.3.4.10-13).
fn agile(xml: &[u8], package: &[u8], password: &str) -> Result<Vec<u8>, OpenError> {
    let xml = String::from_utf8_lossy(xml);
    let xml = xml.trim_start_matches('\u{feff}');
    let doc = roxmltree::Document::parse(xml).map_err(|e| OpenError::Other(format!("EncryptionInfo: {e}")))?;
    let key_data = doc.descendants().find(|n| n.has_tag_name("keyData")).ok_or("keyData mancante")?;
    let encrypted_key = doc
        .descendants()
        .find(|n| n.tag_name().name() == "encryptedKey" && n.has_attribute("spinCount"))
        .ok_or(OpenError::Unsupported("documento cifrato senza password (certificato)".into()))?;
    fn attr<'a>(n: roxmltree::Node<'a, '_>, a: &str) -> Result<&'a str, OpenError> {
        n.attribute(a).ok_or_else(|| OpenError::Other(format!("attributo {a} mancante")))
    }

    let hash = Hash::from_name(attr(encrypted_key, "hashAlgorithm")?)?;
    let salt = b64(attr(encrypted_key, "saltValue")?)?;
    let spin: u32 = attr(encrypted_key, "spinCount")?.parse().map_err(|_| "spinCount")?;
    let key_bytes = attr(encrypted_key, "keyBits")?.parse::<usize>().map_err(|_| "keyBits")? / 8;

    let mut h = hash.digest(&[&salt, &utf16le(password)]);
    for i in 0..spin {
        h = hash.digest(&[&i.to_le_bytes(), &h]);
    }
    let derive = |block: &[u8]| {
        let mut k = hash.digest(&[&h, block]);
        k.resize(key_bytes, 0x36);
        k
    };
    const VERIFIER_INPUT: [u8; 8] = [0xfe, 0xa7, 0xd2, 0x76, 0x3b, 0x4b, 0x9e, 0x79];
    const VERIFIER_VALUE: [u8; 8] = [0xd7, 0xaa, 0x0f, 0x6d, 0x30, 0x61, 0x34, 0x4e];
    const KEY_VALUE: [u8; 8] = [0x14, 0x6e, 0x0b, 0xe7, 0xab, 0xac, 0xd0, 0xd6];

    let input = aes_cbc_decrypt(&derive(&VERIFIER_INPUT), &salt, &b64(attr(encrypted_key, "encryptedVerifierHashInput")?)?)?;
    let value = aes_cbc_decrypt(&derive(&VERIFIER_VALUE), &salt, &b64(attr(encrypted_key, "encryptedVerifierHashValue")?)?)?;
    let expected = hash.digest(&[&input[..salt.len().min(input.len())]]);
    if value.len() < expected.len() || value[..expected.len()] != expected[..] {
        return Err(OpenError::WrongPassword);
    }
    let mut secret = aes_cbc_decrypt(&derive(&KEY_VALUE), &salt, &b64(attr(encrypted_key, "encryptedKeyValue")?)?)?;
    secret.truncate(key_bytes);

    // Il pacchetto è cifrato a blocchi di 4096 byte, ognuno con il suo vettore iniziale
    let data_hash = Hash::from_name(attr(key_data, "hashAlgorithm")?)?;
    let data_salt = b64(attr(key_data, "saltValue")?)?;
    let block_size: usize = attr(key_data, "blockSize")?.parse().unwrap_or(16);
    let mut out = Vec::with_capacity(package.len());
    for (i, segment) in package.chunks(4096).enumerate() {
        let mut iv = data_hash.digest(&[&data_salt, &(i as u32).to_le_bytes()]);
        iv.resize(block_size, 0x36);
        let padded_len = segment.len().div_ceil(16) * 16;
        let mut seg = segment.to_vec();
        seg.resize(padded_len, 0);
        out.extend(aes_cbc_decrypt(&secret, &iv, &seg)?);
    }
    Ok(out)
}

/// Cifratura Standard (MS-OFFCRYPTO 2.3.4.5-7): AES in modalità ECB, chiave da SHA-1.
fn standard(info: &[u8], package: &[u8], password: &str) -> Result<Vec<u8>, OpenError> {
    let u32_at = |off: usize| info.get(off..off + 4).map(|b| u32::from_le_bytes(b.try_into().unwrap()));
    let header_size = u32_at(8).ok_or("intestazione")? as usize;
    let alg_id = u32_at(12 + 8).ok_or("algoritmo")?;
    if !(0x660E..=0x6610).contains(&alg_id) {
        return Err(OpenError::Unsupported(format!("algoritmo Office 0x{alg_id:x} (RC4?)")));
    }
    let key_bytes = u32_at(12 + 16).ok_or("chiave")? as usize / 8;
    let v = 12 + header_size;
    let salt_size = u32_at(v).ok_or("sale")? as usize;
    let salt = info.get(v + 4..v + 4 + salt_size).ok_or("sale")?;
    let enc_verifier = info.get(v + 4 + salt_size..v + 20 + salt_size).ok_or("verifica")?;
    let hash_size = u32_at(v + 20 + salt_size).ok_or("verifica")? as usize;
    let enc_verifier_hash = info.get(v + 24 + salt_size..v + 24 + salt_size + 32).ok_or("verifica")?;

    let sha1 = |parts: &[&[u8]]| Hash::Sha1.digest(parts);
    let mut h = sha1(&[salt, &utf16le(password)]);
    for i in 0..50_000u32 {
        h = sha1(&[&i.to_le_bytes(), &h]);
    }
    let h_final = sha1(&[&h, &0u32.to_le_bytes()]);
    let xor_pad = |byte: u8| {
        let mut buf = [byte; 64];
        for (b, x) in buf.iter_mut().zip(&h_final) {
            *b ^= x;
        }
        sha1(&[&buf])
    };
    let mut key = xor_pad(0x36);
    key.extend(xor_pad(0x5c));
    key.truncate(key_bytes);

    let verifier = aes_ecb_decrypt(&key, enc_verifier)?;
    let verifier_hash = aes_ecb_decrypt(&key, enc_verifier_hash)?;
    if sha1(&[&verifier])[..hash_size.min(20)] != verifier_hash[..hash_size.min(20)] {
        return Err(OpenError::WrongPassword);
    }
    aes_ecb_decrypt(&key, package)
}

// ------------------------------------------------------------------ ODT

struct OdfEncryption {
    size: usize,
    checksum: Option<(String, Vec<u8>)>,
    iv: Vec<u8>,
    salt: Vec<u8>,
    iterations: u32,
    key_size: usize,
    start_key_sha256: bool,
}

/// Un pacchetto ODF (ODT) da cui leggere i file, decifrandoli se serve.
pub struct OdfPackage {
    zip: zip::ZipArchive<Cursor<Vec<u8>>>,
    encrypted: HashMap<String, OdfEncryption>,
    password: Option<String>,
}

const MAX_PART: u64 = 200 * 1024 * 1024;

impl OdfPackage {
    pub fn open(bytes: Vec<u8>, password: Option<&str>) -> Result<OdfPackage, OpenError> {
        let mut zip = zip::ZipArchive::new(Cursor::new(bytes)).map_err(|e| OpenError::Other(format!("ZIP non valido: {e}")))?;
        let mut encrypted = HashMap::new();
        let manifest = {
            let mut out = String::new();
            if let Ok(mut f) = zip.by_name("META-INF/manifest.xml") {
                let _ = f.read_to_string(&mut out);
            }
            out
        };
        if zip.file_names().any(|n| n == "encrypted-package") {
            return Err(OpenError::Unsupported("cifratura ODF a pacchetto intero (LibreOffice 25)".into()));
        }
        if let Ok(doc) = roxmltree::Document::parse(&manifest) {
            for entry in doc.descendants().filter(|n| n.tag_name().name() == "file-entry") {
                let Some(data) = entry.children().find(|n| n.tag_name().name() == "encryption-data") else { continue };
                let attr = |node: Option<roxmltree::Node>, name: &str| {
                    node.and_then(|n| n.attributes().find(|a| a.name() == name).map(|a| a.value().to_string()))
                };
                let child = |name: &str| data.children().find(|n| n.tag_name().name() == name);
                let path = attr(Some(entry), "full-path").unwrap_or_default();
                let algorithm = attr(child("algorithm"), "algorithm-name").unwrap_or_default().to_lowercase();
                let derivation = attr(child("key-derivation"), "key-derivation-name").unwrap_or_default();
                if !algorithm.contains("aes") || algorithm.contains("gcm") || !derivation.eq_ignore_ascii_case("PBKDF2") {
                    return Err(OpenError::Unsupported(format!("ODF {algorithm} / {derivation}")));
                }
                let start = attr(child("start-key-generation"), "start-key-generation-name").unwrap_or_default().to_lowercase();
                let checksum = match (attr(Some(data), "checksum-type"), attr(Some(data), "checksum")) {
                    (Some(t), Some(c)) => Some((t.to_lowercase(), b64(&c)?)),
                    _ => None,
                };
                encrypted.insert(
                    path,
                    OdfEncryption {
                        size: attr(Some(entry), "size").and_then(|s| s.parse().ok()).unwrap_or(0),
                        checksum,
                        iv: b64(&attr(child("algorithm"), "initialisation-vector").unwrap_or_default())?,
                        salt: b64(&attr(child("key-derivation"), "salt").unwrap_or_default())?,
                        iterations: attr(child("key-derivation"), "iteration-count").and_then(|s| s.parse().ok()).unwrap_or(1024),
                        key_size: attr(child("key-derivation"), "key-size").and_then(|s| s.parse().ok()).unwrap_or(16),
                        start_key_sha256: start.contains("sha256"),
                    },
                );
            }
        }
        let package = OdfPackage { zip, encrypted, password: password.map(str::to_string) };
        if package.is_encrypted() {
            if package.password.is_none() {
                return Err(OpenError::NeedsPassword);
            }
            // Controllo subito la password sul file più importante
            let mut check = package;
            check.read("content.xml")?;
            return Ok(check);
        }
        Ok(package)
    }

    pub fn is_encrypted(&self) -> bool {
        !self.encrypted.is_empty()
    }

    pub fn names(&self) -> Vec<String> {
        self.zip.file_names().map(str::to_string).collect()
    }

    /// Un file del pacchetto, in chiaro. `None` se non c'è.
    pub fn read(&mut self, name: &str) -> Result<Option<Vec<u8>>, OpenError> {
        let raw = match self.zip.by_name(name) {
            Ok(entry) => {
                let mut out = Vec::new();
                entry.take(MAX_PART).read_to_end(&mut out).map_err(|e| OpenError::Other(e.to_string()))?;
                out
            }
            Err(_) => return Ok(None),
        };
        let Some(enc) = self.encrypted.get(name) else { return Ok(Some(raw)) };
        let password = self.password.as_deref().ok_or(OpenError::NeedsPassword)?;
        let start_key = if enc.start_key_sha256 {
            Hash::Sha256.digest(&[password.as_bytes()])
        } else {
            Hash::Sha1.digest(&[password.as_bytes()])
        };
        let mut key = vec![0u8; enc.key_size];
        pbkdf2::pbkdf2_hmac::<sha1::Sha1>(&start_key, &enc.salt, enc.iterations, &mut key);
        let padded = aes_cbc_decrypt(&key, &enc.iv, &raw)?;
        // Riempimento W3C: l'ultimo byte dice quanti byte togliere
        let pad = *padded.last().unwrap_or(&0) as usize;
        let unpadded = if (1..=16).contains(&pad) && pad <= padded.len() { &padded[..padded.len() - pad] } else { &padded[..] };
        if let Some((kind, expected)) = &enc.checksum {
            let check = |data: &[u8]| {
                let first = &data[..data.len().min(1024)];
                if kind.contains("sha256") { Hash::Sha256.digest(&[first]) } else { Hash::Sha1.digest(&[first]) }
            };
            if check(unpadded) != *expected && check(&padded) != *expected {
                return Err(OpenError::WrongPassword);
            }
        }
        // I file già compressi (immagini) sono cifrati così come sono, gli altri dopo deflate
        if unpadded.len() == enc.size {
            return Ok(Some(unpadded.to_vec()));
        }
        let mut out = Vec::new();
        flate2::read::DeflateDecoder::new(unpadded)
            .take(MAX_PART)
            .read_to_end(&mut out)
            .map_err(|_| OpenError::WrongPassword)?;
        Ok(Some(out))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn utf16_password() {
        assert_eq!(utf16le("aè"), vec![0x61, 0, 0xe8, 0]);
    }
}
