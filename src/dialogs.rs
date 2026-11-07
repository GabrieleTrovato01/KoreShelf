//! Finestre di messaggio native (servono solo per errori gravi all'avvio,
//! visto che l'app non ha un terminale dove scrivere).

#[cfg(windows)]
fn message_box(title: &str, text: &str, icon: u32) {
    use windows_sys::Win32::UI::WindowsAndMessaging::{MessageBoxW, MB_OK, MB_SETFOREGROUND};
    let wide = |s: &str| s.encode_utf16().chain(std::iter::once(0)).collect::<Vec<u16>>();
    let (title, text) = (wide(title), wide(text));
    unsafe {
        MessageBoxW(
            std::ptr::null_mut(),
            text.as_ptr(),
            title.as_ptr(),
            MB_OK | MB_SETFOREGROUND | icon,
        );
    }
}

pub fn error(title: &str, text: &str) {
    crate::log_error!("{title}: {text}");
    #[cfg(windows)]
    message_box(title, text, windows_sys::Win32::UI::WindowsAndMessaging::MB_ICONERROR);
    #[cfg(not(windows))]
    eprintln!("{title}: {text}");
}

#[allow(dead_code)]
pub fn info(title: &str, text: &str) {
    crate::log_info!("{title}: {text}");
    #[cfg(windows)]
    message_box(title, text, windows_sys::Win32::UI::WindowsAndMessaging::MB_ICONINFORMATION);
    #[cfg(not(windows))]
    eprintln!("{title}: {text}");
}
