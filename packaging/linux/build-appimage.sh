#!/usr/bin/env bash
# Crea KoreShelf-<versione>-<arch>.AppImage: un unico file eseguibile che contiene
# l'app e tutto WebKitGTK, così funziona su qualunque distribuzione Linux recente.
#   packaging/linux/build-appimage.sh <eseguibile> <cartella-di-uscita>
#
# Richiede (Ubuntu/Debian): libwebkit2gtk-4.1-dev libgtk-3-dev librsvg2-dev file
set -euo pipefail

BIN="$(realpath "$1")"
OUT="$(realpath -m "$2")"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
VERSION="$(grep -m1 '^version' "$ROOT/Cargo.toml" | cut -d'"' -f2)"
ARCH="$(uname -m)"
TOOLS="${KORESHELF_TOOLS:-$ROOT/target/appimage-tools}"
WORK="$(mktemp -d)"
APPDIR="$WORK/AppDir"
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$OUT" "$TOOLS"

# --- Strumenti: linuxdeploy (+ plugin GTK) ---------------------------------
# I server dei download (GitHub release) a volte rispondono 504 per qualche minuto:
# si ritenta a lungo, con pause crescenti, e si salva su un file temporaneo così un
# download interrotto non viene mai scambiato per un file completo (gli strumenti sono in cache).
fetch() {
    local url="$1" dest="$2"
    if [ -s "$dest" ]; then
        echo "In cache: $(basename "$dest")"
    else
        echo "Scarico $(basename "$dest") da $url"
        curl -fsSL --connect-timeout 30 --retry 8 --retry-all-errors --retry-max-time 600 -o "$dest.part" "$url"
        mv "$dest.part" "$dest"
    fi
    chmod +x "$dest"
}
fetch "https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/linuxdeploy-${ARCH}.AppImage" "$TOOLS/linuxdeploy"
fetch "https://raw.githubusercontent.com/linuxdeploy/linuxdeploy-plugin-gtk/master/linuxdeploy-plugin-gtk.sh" "$TOOLS/linuxdeploy-plugin-gtk.sh"
fetch "https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-${ARCH}.AppImage" "$TOOLS/appimagetool"
# Il "runtime" che rende l'AppImage eseguibile: lo scarichiamo noi (con i tentativi) e lo passiamo
# ad appimagetool, che altrimenti lo scaricherebbe da sé senza riprovare
fetch "https://github.com/AppImage/type2-runtime/releases/download/continuous/runtime-${ARCH}" "$TOOLS/runtime-${ARCH}"
export PATH="$TOOLS:$PATH"
export APPIMAGE_EXTRACT_AND_RUN=1   # niente FUSE richiesto (anche nei container della CI)

# --- AppDir ---------------------------------------------------------------
mkdir -p "$APPDIR/usr/bin" "$APPDIR/usr/share/applications" "$APPDIR/usr/share/icons/hicolor/256x256/apps"
install -m 755 "$BIN" "$APPDIR/usr/bin/koreshelf"
cp "$ROOT/assets/icon.png" "$APPDIR/usr/share/icons/hicolor/256x256/apps/koreshelf.png"
cat > "$APPDIR/usr/share/applications/koreshelf.desktop" <<DESKTOP
[Desktop Entry]
Type=Application
Name=KoreShelf
Comment=La tua libreria 3D di ebook (EPUB e PDF)
Exec=koreshelf
Icon=koreshelf
Categories=Office;Viewer;
Terminal=false
DESKTOP

# --- WebKitGTK: processi ausiliari (WebKitWebProcess, NetworkProcess, ...) ---
WEBKIT_LIB="$(ldconfig -p | awk '/libwebkit2gtk-4.1\.so\.0 /{print $NF; exit}')"
[ -n "$WEBKIT_LIB" ] || { echo "WebKitGTK 4.1 non trovato: installa libwebkit2gtk-4.1-dev" >&2; exit 1; }
LIBDIR="$(dirname "$(realpath "$WEBKIT_LIB")")"             # es. /usr/lib/x86_64-linux-gnu
HELPERS="$LIBDIR/webkit2gtk-4.1"
REL="${LIBDIR#/usr}"                                       # es. /lib/x86_64-linux-gnu
mkdir -p "$APPDIR/usr$REL"
cp -a "$HELPERS" "$APPDIR/usr$REL/"
rm -f "$APPDIR/usr$REL/webkit2gtk-4.1/MiniBrowser"

# Script di avvio: va creato PRIMA di linuxdeploy, che genera AppRun elencando gli script
# presenti in quel momento (uno aggiunto dopo non verrebbe mai eseguito)
mkdir -p "$APPDIR/apprun-hooks"
cat > "$APPDIR/apprun-hooks/zz-koreshelf-webkit.sh" <<'HOOK'
# I processi di WebKit vanno cercati dentro l'AppImage
cd "$APPDIR/usr"
HOOK

# linuxdeploy copia app, librerie (compresa libwebkit2gtk) e dipendenze dei processi ausiliari
linuxdeploy --appdir "$APPDIR" \
    --executable "$APPDIR/usr/bin/koreshelf" \
    --desktop-file "$APPDIR/usr/share/applications/koreshelf.desktop" \
    --icon-file "$APPDIR/usr/share/icons/hicolor/256x256/apps/koreshelf.png" \
    --deploy-deps-only "$APPDIR/usr$REL/webkit2gtk-4.1" \
    --plugin gtk

# La libreria WebKit cerca i suoi processi in un percorso assoluto di sistema
# (/usr/lib/.../webkit2gtk-4.1). Lo trasformiamo in un percorso relativo della stessa
# lunghezza ("/usr" -> "././"), che all'avvio punta dentro l'AppImage.
for lib in "$APPDIR"/usr/lib/libwebkit2gtk-4.1.so*; do
    [ -f "$lib" ] && sed -i "s|/usr$REL/webkit2gtk-4.1|././$REL/webkit2gtk-4.1|g" "$lib"
done

# --- Impacchettamento -------------------------------------------------------
OUTPUT="$OUT/KoreShelf-${VERSION}-${ARCH}.AppImage"
rm -f "$OUTPUT"
ARCH="$ARCH" appimagetool --runtime-file "$TOOLS/runtime-${ARCH}" "$APPDIR" "$OUTPUT"
chmod +x "$OUTPUT"
echo "Creato $OUTPUT"
