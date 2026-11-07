#!/usr/bin/env bash
# Crea il .dmg con dentro KoreShelf.app e il collegamento ad Applicazioni
# (si installa trascinando l'icona). Solo su macOS.
#   packaging/macos/make-dmg.sh <KoreShelf.app> <file.dmg>
set -euo pipefail

APP="$1"
DMG="$2"

# Firma "ad-hoc": senza, i Mac Apple Silicon rifiutano di avviare l'app
codesign --force --deep --sign - "$APP"

STAGE="$(mktemp -d)"
cp -R "$APP" "$STAGE/"
ln -s /Applications "$STAGE/Applications"

rm -f "$DMG"
hdiutil create -volname "KoreShelf" -srcfolder "$STAGE" -ov -format UDZO "$DMG"
rm -rf "$STAGE"
echo "Creato $DMG"
