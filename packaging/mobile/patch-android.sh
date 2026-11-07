#!/usr/bin/env bash
# Da lanciare dopo `tauri android init`: applica le regole di rete di KoreShelf al progetto Android.
#   packaging/mobile/patch-android.sh <cartella mobile/src-tauri/gen/android>
set -euo pipefail

ANDROID="$1"
HERE="$(cd "$(dirname "$0")" && pwd)"
MANIFEST="$ANDROID/app/src/main/AndroidManifest.xml"
RES_XML="$ANDROID/app/src/main/res/xml"

[ -f "$MANIFEST" ] || { echo "AndroidManifest.xml non trovato in $ANDROID" >&2; exit 1; }

mkdir -p "$RES_XML"
cp "$HERE/network_security_config.xml" "$RES_XML/network_security_config.xml"

# Il manifest di Tauri usa il segnaposto usesCleartextTraffic: la regola fine la dà il file sopra
sed -i.bak -e 's/android:usesCleartextTraffic="[^"]*"/android:usesCleartextTraffic="false"/' "$MANIFEST"
if ! grep -q 'android:networkSecurityConfig' "$MANIFEST"; then
    sed -i.bak -e 's/<application/<application android:networkSecurityConfig="@xml\/network_security_config"/' "$MANIFEST"
fi
rm -f "$MANIFEST.bak"

grep -q 'android:networkSecurityConfig="@xml/network_security_config"' "$MANIFEST" \
    || { echo "Impossibile applicare la configurazione di rete" >&2; exit 1; }
echo "Regole di rete applicate a $MANIFEST"
