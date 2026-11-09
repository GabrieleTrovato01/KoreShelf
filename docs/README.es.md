<div align="center">
   
   # KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   **Read this in:** [English](../README.md) | [Italiano](README.it.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

   ## Home
   <img align="center" width="858" height="720" alt="La pantalla principal de KoreShelf con la estantería 3D" src="https://github.com/user-attachments/assets/c879b004-f214-4541-ad72-9b1071e3fa2d" />
   
   
   ## Reader
  <img align="center" width="858" height="720" alt="El lector de KoreShelf" src="https://github.com/user-attachments/assets/edd3273e-25ff-457c-9f31-6f3cf9b871fc" />

</div>

## Español

KoreShelf es una biblioteca 3D para tus ebooks. Subes archivos EPUB y PDF, aparecen como libros en una estantería y los lees en el lector integrado. Funciona en Windows, macOS, Linux y Android, y también puedes alojarlo tú mismo con Docker.

### Requisitos del sistema

Desde la versión 4.0.0 KoreShelf es un solo archivo. No necesitas Node.js ni ningún otro programa. Para un servidor doméstico también hay una imagen Docker (ver más abajo).

- Windows 10 u 11
- Mac con chip Apple o Intel (un único archivo universal)
- Linux: cualquier distribución reciente de 64 bits (x86_64)
- Teléfonos y tabletas Android
- iPhone y iPad: es posible, pero solo para usuarios avanzados (ver más abajo)

### Descarga e instalación

Lo más sencillo es entrar en [koreshelf.github.io](https://koreshelf.github.io): la web reconoce tu dispositivo y te ofrece el archivo adecuado. También puedes elegir el archivo tú mismo en la [última versión](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest):

| Dispositivo | Archivo |
|---|---|
| Windows | `KoreShelf-<versión>-windows-x64.exe` |
| Mac | `KoreShelf-<versión>-macos-universal.dmg` |
| Linux | `KoreShelf-<versión>-x86_64.AppImage` |
| Android | `KoreShelf-<versión>-android.apk` |
| iPhone / iPad | `KoreShelf-<versión>-ios-unsigned.ipa` |

KoreShelf no tiene un certificado de firma de pago, así que la primera vez que lo abres el sistema te pide una confirmación. Solo ocurre una vez.

#### Windows
1. Descarga el archivo `.exe` y haz doble clic. KoreShelf se abre en su propia ventana; no hay nada que instalar.
2. Si Windows muestra «Windows protegió su PC», haz clic en **Más información** y después en **Ejecutar de todas formas**.

#### Mac
1. Descarga el archivo `.dmg`, ábrelo y arrastra KoreShelf a Aplicaciones.
2. La primera vez, macOS bloquea la app. Abre **Ajustes del Sistema → Privacidad y seguridad**, baja hasta el final y haz clic en **Abrir igualmente**.

#### Linux
1. Descarga el archivo `.AppImage`.
2. Hazlo ejecutable: clic derecho, **Propiedades → Permitir ejecutar el archivo como un programa**, o `chmod +x KoreShelf-*.AppImage` en una terminal.
3. Haz doble clic en el archivo.

#### Android
1. Descarga el archivo `.apk` en el móvil, ábrelo y toca **Instalar**.
2. Si te lo pide, permite que el navegador instale aplicaciones desconocidas.
3. Si usabas la versión 3.x: la nueva app se instala junto a la antigua. Vuelve a añadir tus libros y después desinstala la app antigua.

#### iPhone y iPad
Apple solo permite instalar apps fuera de la App Store con herramientas específicas, por eso el archivo `.ipa` no está firmado.
1. En un ordenador, instala una herramienta de sideloading como AltStore, SideStore o Sideloadly e inicia sesión con tu ID de Apple.
2. Descarga el archivo `.ipa` e instálalo en el dispositivo con esa herramienta.
3. En el dispositivo, confía en el desarrollador en **Ajustes → General → VPN y gestión de dispositivos**. Desde iOS 16 también tienes que activar el **Modo de desarrollador** en **Ajustes → Privacidad y seguridad**.

Con un ID de Apple gratuito, la app tiene que renovarse cada 7 días. AltStore puede hacerlo por ti.

### Autoalojamiento con Docker

Puedes tener KoreShelf funcionando en un servidor doméstico, un NAS o una Raspberry Pi y abrirlo desde el navegador de cualquier dispositivo de tu red. La imagen está disponible para PC (amd64) y para placas ARM como la Raspberry Pi 4/5 y la mayoría de los NAS (arm64).

1. Instala Docker: Docker Desktop en Windows y macOS, o Docker Engine con el plugin Compose en Linux.
2. Crea una carpeta, copia en ella el archivo [`docker-compose.yml`](../docker-compose.yml) de este proyecto y ejecuta:
   ```bash
   docker compose up -d
   ```
3. Abre `http://DIRECCIÓN-DEL-SERVIDOR:3000`, o `http://localhost:3000` en el mismo ordenador.

Sin archivo compose:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

Los libros, las portadas y la base de datos se guardan en el volumen `koreshelf-data`, montado en `/data`, y se conservan al actualizar. Para hacer una copia de seguridad:
```bash
docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .
```

Para actualizar: `docker compose pull && docker compose up -d`

Otras opciones:
- Contraseña: define `KORESHELF_PASSWORD` en `docker-compose.yml` y, si quieres, `KORESHELF_USERNAME` (por defecto `koreshelf`). El navegador pedirá ambos.
- Si vienes de la versión Docker 3.x: en `docker-compose.yml` quita el `#` delante de `- ./public:/app/public:ro` y ejecútalo desde la carpeta de la instalación anterior. En el primer arranque tu biblioteca se importa en `/data`.
- Si el puerto 3000 ya está ocupado en el servidor, cambia el número de la izquierda, por ejemplo `"8080:3000"`, y abre el puerto 8080.
- Variables de entorno: `KORESHELF_PORT` (por defecto 3000), `KORESHELF_HOST` (por defecto `0.0.0.0`), `KORESHELF_DATA` (por defecto `/data`).

> [!WARNING]
> KoreShelf está pensado para la red de casa. No lo expongas directamente a internet. Si necesitas acceder desde fuera, ponlo detrás de un proxy inverso con HTTPS (por ejemplo Caddy, Nginx Proxy Manager o Traefik) o usa una VPN como Tailscale, y define una contraseña. Sin HTTPS la contraseña viaja sin cifrar.

El servidor también funciona sin Docker: `koreshelf --server` usa los mismos ajustes.

### Cómo se usa

Cuando abres KoreShelf ves tu estantería.

- La primera vez, pulsa *Prueba con un libro de ejemplo*. Llega a la estantería un libro corto que te explica la app mientras lo lees.
- Para añadir libros, pulsa *+ Subir Ebook* o arrastra archivos EPUB y PDF a la ventana.
- Para leer, pulsa *Empezar a leer* (o *Seguir leyendo*) debajo del libro del centro. Las acciones menos frecuentes están en el menú *Más*.
- *Gestionar* te permite crear, renombrar y eliminar estanterías y mover varios libros a la vez.
- Para salir, cierra la ventana. Si abres KoreShelf cuando ya está en marcha, vuelve al frente la ventana que ya estaba abierta.

### El lector

- Abre EPUB (texto que se adapta a la pantalla) y PDF (maquetación fija). Puedes leer por páginas o con desplazamiento continuo.
- El texto de los PDF se puede seleccionar y subrayar igual que en los EPUB.
- Los PDF sin portada reciben una creada a partir de su primera página.
- Selecciona una frase para subrayarla. Los subrayados se guardan y los encuentras en el tablón.
- La fuente, el tamaño del texto, el interlineado y la alineación (izquierda, centro, derecha, justificado) se cambian en el panel lateral.
- Hay un tema claro y uno oscuro.
- Tu progreso aparece como una cinta roja en el libro 3D, en el porcentaje exacto que has leído.
- Cuando terminas un libro puedes darle de 1 a 5 estrellas y escribir una reseña breve. La puntuación se imprime en dorado en la contraportada.
- El índice funciona con EPUB y PDF estructurados. Los PDF escaneados que no tienen índice cuentan con un selector de página.
- El campo de búsqueda de arriba a la derecha encuentra palabras y frases en el libro y las resalta en el texto.

### El tablón de subrayados

Encima de las estanterías hay un tablón de madera. Cada libro con subrayados tiene allí su propia nota adhesiva.

- Con las flechas izquierda y derecha pasas de una página de notas a otra, aunque tengas cientos.
- Los subrayados nuevos aparecen en el tablón enseguida, sin recargar.
- Haz clic en una nota para leer, editar o eliminar sus subrayados.
- Cualquier cita se puede compartir como imagen de 1080×1080 con la portada y los datos del libro, lista para Instagram, Facebook, X o WhatsApp, o guardar en el dispositivo.

### Tus datos

La biblioteca se guarda en su propia carpeta, así que puedes actualizar o mover KoreShelf sin perder nada:

- Windows: `%APPDATA%\KoreShelf` (pégalo en la barra de direcciones del Explorador de archivos)
- Mac: `~/Library/Application Support/KoreShelf`
- Linux: `~/.local/share/KoreShelf`

Dentro encontrarás `ebooks/` (tus libros), `covers/` (las portadas), `koreshelf.db` (la base de datos SQLite con metadatos, progreso de lectura, categorías y subrayados) y `koreshelf.log` (útil si algo falla).

Modo portátil en Windows, por ejemplo en un pendrive: crea una carpeta llamada `KoreShelf_Data` junto a `KoreShelf.exe` y tus datos se guardarán ahí.

Con *Editar metadatos* puedes cambiar el título, el autor, la descripción y la categoría, o subir tu propia portada. El libro 3D se actualiza al momento.

Si vienes de la versión 3.x en el ordenador:
- Windows: pon el nuevo `.exe` en la carpeta que contiene la antigua carpeta `public` y ábrelo. La biblioteca se importa en el primer arranque.
- Mac y Linux: con KoreShelf cerrado, copia `koreshelf.db`, `covers` y `ebooks` de la antigua carpeta `public` a la carpeta indicada arriba, sustituyendo los archivos que ya estén.

### Archivos grandes o dañados

- Los EPUB y PDF con decenas de miles de páginas se procesan sin bloquear la app.
- Un archivo dañado o poco habitual se avisa por separado; el resto de la biblioteca sigue funcionando.
- Si encuentra el ISBN, KoreShelf busca la portada y la sinopsis en Apple Books y Google Books.
- El mismo libro no se puede subir dos veces.

### Pantallas pequeñas

En ventanas estrechas, el texto de los botones se convierte en iconos para que nada se superponga. En el móvil la interfaz cambia a un diseño pensado para el tacto.

### Idiomas

KoreShelf está disponible en inglés, italiano, español, francés y alemán. Puedes cambiar el idioma desde la barra superior (en el móvil: *Más* y luego idioma), y tu elección se recuerda.

Para añadir un idioma, consulta [CONTRIBUTING.md](../CONTRIBUTING.md).

### Solución de problemas

**«Windows protegió su PC» o «Apple no pudo verificar KoreShelf»**
Es la confirmación del primer arranque descrita arriba. En Windows haz clic en **Más información → Ejecutar de todas formas**; en Mac ve a **Ajustes del Sistema → Privacidad y seguridad → Abrir igualmente**.

**En Windows, KoreShelf se abre en el navegador en lugar de en su propia ventana**
La ventana usa Microsoft Edge WebView2, que viene con Windows 10 y 11. Si falta, KoreShelf se abre en el navegador y explica cómo instalarlo.

**Otra cosa no funciona**
Abre `koreshelf.log` en la carpeta de datos (ver *Tus datos*) y adjúntalo a un [informe de error](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### Compilar desde el código fuente

KoreShelf está escrito en Rust (servidor y ventana de escritorio), con una interfaz en Vite y Three.js. Las apps para móvil usan Tauri 2.

```bash
cargo build --release      # la app de escritorio, en target/release/
cargo test --no-default-features
```

La estructura del proyecto, las pruebas de extremo a extremo y la creación de los paquetes se explican en [CONTRIBUTING.md](../CONTRIBUTING.md).
