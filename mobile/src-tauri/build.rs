fn main() {
    android_link_fixes();
    tauri_build::build()
}

/// I fumetti CBR si leggono con la libreria UnRAR, in C++ (crate `unrar_sys`). Il suo script
/// di compilazione non prevede Android, e questo crea due problemi al collegamento finale:
///
/// 1. chiede sempre `-lpthread`, ma su Android i thread sono nella libc e `libpthread` non
///    esiste ("unable to find library -lpthread"). Gli diamo un `libpthread.a` vuoto;
/// 2. collega la libreria standard C++ solo su Linux, macOS, BSD e Windows. Su Android la
///    prendiamo dall'NDK in versione statica (`c++_static` + `c++abi`), così finisce dentro la
///    `.so` dell'app: l'APK non contiene `libc++_shared.so`.
fn android_link_fixes() {
    // In uno script di build `cfg!(target_os)` descrive il computer che compila: la
    // piattaforma di destinazione è in questa variabile.
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() != Ok("android") {
        return;
    }
    let out = std::path::PathBuf::from(std::env::var("OUT_DIR").expect("OUT_DIR"));
    // Un archivio statico vuoto: soddisfa `-lpthread` senza aggiungere niente
    std::fs::write(out.join("libpthread.a"), b"!<arch>\n").expect("libpthread.a");
    println!("cargo:rustc-link-search=native={}", out.display());
    // `-bundle`: Rust non cerca il file adesso (non conosce la sysroot dell'NDK), lo passa al
    // linker finale, che le trova in sysroot/usr/lib/<architettura>/
    println!("cargo:rustc-link-lib=static:-bundle=c++_static");
    println!("cargo:rustc-link-lib=static:-bundle=c++abi");
}
