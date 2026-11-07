#!/usr/bin/env sh
# Ricompila l'interfaccia (serve solo se modifichi i file in frontend/src)
set -e
cd "$(dirname "$0")/frontend"
npm install
npm run build
