#!/usr/bin/env bash
# Crea KoreShelf.app a partire dall'eseguibile.
#   packaging/macos/make-app.sh <eseguibile> <cartella-di-uscita>
set -euo pipefail

BIN="$1"
OUT="$2"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
VERSION="$(grep -m1 '^version' "$ROOT/Cargo.toml" | cut -d'"' -f2)"

APP="$OUT/KoreShelf.app"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"

install -m 755 "$BIN" "$APP/Contents/MacOS/koreshelf"
cp "$ROOT/assets/icon.icns" "$APP/Contents/Resources/KoreShelf.icns"

cat > "$APP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>                 <string>KoreShelf</string>
    <key>CFBundleDisplayName</key>          <string>KoreShelf</string>
    <key>CFBundleIdentifier</key>           <string>io.github.gabrieletrovato01.koreshelf</string>
    <key>CFBundleExecutable</key>           <string>koreshelf</string>
    <key>CFBundleIconFile</key>             <string>KoreShelf.icns</string>
    <key>CFBundlePackageType</key>          <string>APPL</string>
    <key>CFBundleShortVersionString</key>   <string>${VERSION}</string>
    <key>CFBundleVersion</key>              <string>${VERSION}</string>
    <key>CFBundleInfoDictionaryVersion</key><string>6.0</string>
    <key>LSMinimumSystemVersion</key>       <string>10.15</string>
    <key>LSApplicationCategoryType</key>    <string>public.app-category.books</string>
    <key>NSHighResolutionCapable</key>      <true/>
    <key>NSHumanReadableCopyright</key>     <string>GabrieleTrovato01 - MIT License</string>
</dict>
</plist>
PLIST

echo "Creato $APP (versione $VERSION)"
