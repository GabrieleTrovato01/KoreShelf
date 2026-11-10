# runtime-x86_64 e runtime-aarch64

Il "runtime" che rende eseguibile l'AppImage: è il programma che, all'avvio, monta (o estrae)
l'archivio compresso dell'app e la avvia. Ce n'è uno per ogni tipo di processore:

- `runtime-x86_64`: PC con processore Intel o AMD (detti anche amd64)
- `runtime-aarch64`: computer ARM a 64 bit (detti anche arm64), per esempio Raspberry Pi con il desktop

- Origine: https://github.com/AppImage/type2-runtime (release "continuous")
- Licenza: MIT (progetto AppImage)
- Impronte: `runtime-<arch>.sha256`, verificate da `build-appimage.sh` prima di ogni uso

Sono inclusi nel repository perché i server di download di GitHub, visti da GitHub Actions, a volte
rispondono 503/504 per ore: così la build dell'AppImage non dipende da quel download.

Per aggiornarli: scaricare il nuovo file nella stessa posizione e rigenerare l'impronta, per esempio
`sha256sum runtime-aarch64 > runtime-aarch64.sha256`.
