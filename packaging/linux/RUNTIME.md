# runtime-x86_64

Il "runtime" che rende eseguibile l'AppImage: è il programma che, all'avvio, monta (o estrae)
l'archivio compresso dell'app e la avvia.

- Origine: https://github.com/AppImage/type2-runtime (release "continuous")
- Licenza: MIT (progetto AppImage)
- Impronta: `runtime-x86_64.sha256`, verificata da `build-appimage.sh` prima di ogni uso

È incluso nel repository perché i server di download di GitHub, visti da GitHub Actions, a volte
rispondono 503/504 per ore: così la build dell'AppImage non dipende da quel download.

Per aggiornarlo: scaricare il nuovo file nella stessa posizione e rigenerare l'impronta con
`sha256sum runtime-x86_64 > runtime-x86_64.sha256`.
