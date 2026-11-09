<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   [![Instagram](https://img.shields.io/badge/Instagram-Follow-1e1e24?style=for-the-badge&logo=instagram&logoColor=E4405F)](https://www.instagram.com/koreshelf/)
   [![TikTok](https://img.shields.io/badge/TikTok-Follow-1e1e24?style=for-the-badge&logo=tiktok&logoColor=000000)](https://www.tiktok.com/@koreshelf1)
   
   🌍 **Read this in:** [🇬🇧 English](../README.md) | [🇮🇹 Italiano](README.it.md) | [🇪🇸 Español](README.es.md) | [🇫🇷 Français](README.fr.md) | [🇩🇪 Deutsch](README.de.md)

   ## Home
   <img align="center" width="800" height="500" alt="Demo of the app" src="https://github.com/user-attachments/assets/4dc13a62-af86-4b1e-a5ed-9dc64050a282" />
   
   
   ## Reader
  <img align="center" width="800" height="500" alt="Demo reader" src="https://github.com/user-attachments/assets/b1fabd7e-3587-4c47-ba02-7fec9696eee6" />

</div>

## 🇪🇸 Español

Una biblioteca digital interactiva en 3D que te permite subir, explorar y organizar tus archivos EPUB y PDF en un entorno gráfico inmersivo.

### ⚙️ Requisitos del Sistema

Desde la versión 4.0.0 KoreShelf es **un solo archivo**: sin Node.js, nada más que instalar. Para un servidor doméstico también hay una imagen Docker (ver más abajo).

- **Windows:** Windows 10 u 11.
- **Mac:** chip Apple e Intel (un único archivo universal).
- **Linux:** cualquier distribución reciente de 64 bits (x86_64).
- **Android:** cualquier móvil o tableta Android.
- **iPhone / iPad:** solo para usuarios avanzados (ver más abajo).

### 🚀 Descarga e Instalación

Lo más sencillo es la web **[koreshelf.github.io](https://koreshelf.github.io)**: reconoce tu dispositivo y te ofrece el archivo adecuado.
También puedes elegir el archivo tú mismo en la [última versión publicada](https://github.com/GabrieleTrovato01/KoreShelf/releases/latest):

| Dispositivo | Archivo |
|---|---|
| Windows | `KoreShelf-<versión>-windows-x64.exe` |
| Mac | `KoreShelf-<versión>-macos-universal.dmg` |
| Linux | `KoreShelf-<versión>-x86_64.AppImage` |
| Android | `KoreShelf-<versión>-android.apk` |
| iPhone / iPad | `KoreShelf-<versión>-ios-unsigned.ipa` |

KoreShelf es gratuito y no tiene un certificado de pago, así que **la primera vez** el sistema pide confirmación. Es normal y solo ocurre una vez.

#### 🪟 Windows
1. Descarga el archivo `.exe` y haz doble clic: KoreShelf se abre en su propia ventana, no hay nada que instalar.
2. Si Windows muestra «Windows protegió su PC», pulsa **Más información → Ejecutar de todas formas**.

#### 🍎 Mac
1. Descarga el archivo `.dmg`, ábrelo y arrastra **KoreShelf** a **Aplicaciones**.
2. La primera vez macOS bloquea la app: abre **Ajustes del Sistema → Privacidad y seguridad**, baja hasta el final y pulsa **Abrir igualmente**.

#### 🐧 Linux
1. Descarga el archivo `.AppImage`.
2. Hazlo ejecutable: clic derecho → **Propiedades → Permitir ejecutar como programa** (o `chmod +x KoreShelf-*.AppImage` en una terminal).
3. Haz doble clic en el archivo.

#### 🤖 Android
1. Descarga el archivo `.apk` en el móvil, ábrelo y pulsa **Instalar**.
2. Si te lo pide, permite que el navegador instale aplicaciones desconocidas.
3. ¿Vienes de la versión 3.x? La nueva app se instala junto a la antigua: vuelve a añadir tus libros y después podrás desinstalar la app antigua.

#### 📱 iPhone y iPad (usuarios avanzados)
Apple solo permite instalar apps fuera de la App Store con herramientas específicas, así que el archivo `.ipa` no está firmado.
1. En un ordenador, instala una herramienta como AltStore, SideStore o Sideloadly e inicia sesión con tu ID de Apple.
2. Descarga el archivo `.ipa` e instálalo en tu iPhone o iPad con esa herramienta.
3. En el dispositivo, confía en el desarrollador en **Ajustes → General → VPN y gestión de dispositivos**. Desde iOS 16 también hay que activar el **Modo de desarrollador** (**Ajustes → Privacidad y seguridad**).

Con un ID de Apple gratuito la app debe renovarse cada 7 días (AltStore lo hace por ti).

### 🐳 Autoalojamiento con Docker (servidor doméstico, NAS, Raspberry Pi)

Mantén KoreShelf encendido en un servidor doméstico y ábrelo desde el navegador de cualquier dispositivo de tu red. La imagen funciona en PC (amd64) y en placas ARM como la Raspberry Pi 4/5 y la mayoría de los NAS (arm64).

1. Instala Docker (Docker Desktop en Windows y Mac, o Docker Engine con el plugin Compose en Linux).
2. Crea una carpeta, coloca en ella el archivo [`docker-compose.yml`](../docker-compose.yml) de este proyecto y ejecuta:
   ```bash
   docker compose up -d
   ```
3. Abre `http://DIRECCIÓN-DEL-SERVIDOR:3000` (en el mismo ordenador: `http://localhost:3000`).

Sin el archivo compose:
```bash
docker run -d --name koreshelf --restart unless-stopped -p 3000:3000 -v koreshelf-data:/data ghcr.io/gabrieletrovato01/koreshelf:latest
```

- **Tus datos** (libros, portadas, base de datos) están en el volumen `koreshelf-data`, montado en `/data`, y se conservan al actualizar. Copia de seguridad: `docker run --rm -v koreshelf-data:/data -v "$PWD":/backup debian:bookworm-slim tar czf /backup/koreshelf-backup.tgz -C /data .`
- **Actualizar:** `docker compose pull && docker compose up -d`
- **Contraseña (opcional):** define `KORESHELF_PASSWORD` (y si quieres `KORESHELF_USERNAME`, por defecto `koreshelf`) en `docker-compose.yml`: el navegador las pedirá.
- **¿Vienes de la versión Docker 3.x?** En `docker-compose.yml` quita el `#` delante de la línea `- ./public:/app/public:ro` (ejecútalo desde la carpeta de la instalación anterior): en el primer arranque tu biblioteca se importa en `/data`.
- **¿El puerto 3000 ya está ocupado en el servidor?** Cambia el número de la izquierda: `"8080:3000"`, y abre `http://DIRECCIÓN-DEL-SERVIDOR:8080`.
- **Ajustes:** `KORESHELF_PORT` (por defecto 3000), `KORESHELF_HOST` (por defecto `0.0.0.0`), `KORESHELF_DATA` (por defecto `/data`).

> [!WARNING]
> KoreShelf está pensado para la red de casa. No lo expongas directamente a internet: para acceder desde fuera, ponlo detrás de un proxy inverso con **HTTPS** (por ejemplo Caddy, Nginx Proxy Manager o Traefik) o usa una VPN como Tailscale, y define una contraseña. Sin HTTPS la contraseña viaja sin cifrar.

Incluso sin Docker, el programa KoreShelf puede funcionar como servidor: `koreshelf --server` (mismos ajustes).

### 🎮 Cómo usar la App

Abre KoreShelf y aparece tu estantería 3D.

- **¿Primera vez?** Pulsa *Prueba con un libro de ejemplo*: llega a la estantería un libro corto que te enseña la app mientras lo lees.
- **Añadir libros:** pulsa *+ Subir Ebook* o arrastra archivos EPUB y PDF a la ventana.
- **Leer:** *Empezar a leer* (o *Seguir leyendo*) bajo el libro del centro. Las acciones menos frecuentes están en el menú *Más*.
- **Organizar:** con *Gestionar* cambias el nombre de las estanterías, creas o eliminas otras y mueves varios libros a la vez.
- **Cerrar:** basta con cerrar la ventana. Si vuelves a abrir KoreShelf mientras está en marcha, la ventana existente pasa al frente.

### 📖 Lector EPUB y PDF Integrado

KoreShelf no es solo un archivo, es un entorno de lectura inmersivo y completo:

* **Lector Inteligente Dual-Engine:** Abre cualquier EPUB (formato fluido) o PDF (formato fijo) directamente en el navegador. Puedes cambiar sin problemas entre el modo de Páginas (Horizontal) y el Desplazamiento Continuo (Vertical).
* **Selección de Texto en PDF:** Gracias al TextLayer integrado, el texto de los PDF se puede seleccionar y subrayar al igual que en los EPUB.
* **Portadas Automáticas para PDF:** Los PDF sin portadas incrustadas obtienen su portada generada automáticamente desde la primera página, directamente en el navegador (no se necesitan dependencias externas como ImageMagick).
* **Subrayado de Texto:** Selecciona cualquier texto en tus libros para subrayar frases memorables. Los subrayados se guardan de forma persistente y pueden revisarse en cualquier momento.
* **Personalización del Lector:** Ajusta la fuente, el tamaño del texto, el interlineado y la alineación del texto (izquierda, centro, derecha, justificado) a través de la barra lateral inteligente.
* **Modo Oscuro/Claro:** Alterna entre temas con un solo clic para reducir la fatiga visual.
* **Progreso de Lectura:** Un marcador de cinta roja física se mueve a lo largo de tu libro 3D en la estantería, mostrando tu porcentaje exacto de lectura de un vistazo.
* **Reseñas Interactivas:** Cuando terminas un libro (100%), un elegante modal te invita a calificarlo (1-5 estrellas) y escribir tu reseña. ¡Tu calificación se imprimirá en oro en la contraportada del libro 3D!
* **Índice inteligente:** Navega sin esfuerzo por textos extensos con el nuevo botón de índice. Es compatible con EPUB y PDF estructurados, y ofrece una alternativa inteligente con un selector rápido de salto de página para PDF escaneados sin navegación interna.

* **Búsqueda de texto**: Usa la barra de búsqueda en la parte superior derecha del lector para encontrar palabras o frases específicas. Los resultados se resaltarán directamente en el texto.

### 📌 Pizarra de Subrayados (Palacio de la Memoria)

Tus anotaciones merecen más que una simple lista. KoreShelf cuenta con una **Pizarra 3D de Subrayados** única que aparece sobre tu biblioteca:

* **Post-its Visuales:** Cada libro con subrayados aparece como un post-it en una pizarra virtual de madera.
* **Navegación Multi-página:** Navega por todos tus subrayados con las flechas izquierda/derecha, incluso cuando tienes cientos de notas.
* **Sincronización en Tiempo Real:** Los subrayados agregados en el lector aparecen instantáneamente en la pizarra sin necesidad de recargar.
* **Gestión Rápida:** Haz clic en cualquier post-it para ver, editar o eliminar subrayados específicos.
- **Compartir citas en redes sociales:** ¡Comparte tus citas favoritas con un solo clic! KoreShelf genera automáticamente una elegante imagen cuadrada (1080x1080) con tu cita, la portada del libro y metadatos, lista para compartir en Instagram, Facebook, X, WhatsApp o descargar localmente.

### 📁 Gestión de Datos (Tus Libros)

Tu biblioteca está en una carpeta propia, así que puedes actualizar o mover KoreShelf sin perder nada:

- **Windows:** `%APPDATA%\KoreShelf` (pégalo en la barra de direcciones del Explorador de archivos)
- **Mac:** `~/Library/Application Support/KoreShelf`
- **Linux:** `~/.local/share/KoreShelf`

Dentro encontrarás `ebooks/` (tus libros), `covers/` (las portadas), `koreshelf.db` (la base de datos SQLite con metadatos, progreso de lectura, categorías y subrayados) y `koreshelf.log` (útil si algo falla).

**💾 Versión portátil (Windows, por ejemplo en una memoria USB):** crea una carpeta llamada `KoreShelf_Data` junto a `KoreShelf.exe`: tus datos se guardarán allí.

**✏️ Metadatos personalizados:** con *Editar metadatos* cambias título, autor, descripción y categoría, o subes tu propia portada. El libro 3D se actualiza al instante.

**⬆️ ¿Vienes de la versión 3.x (ordenador)?**
- **Windows:** coloca el nuevo `.exe` en la carpeta que contiene la antigua carpeta `public` y ábrelo: tu biblioteca se importa sola en el primer inicio.
- **Mac y Linux:** con KoreShelf cerrado, copia `koreshelf.db`, `covers` y `ebooks` de la antigua carpeta `public` a la carpeta indicada arriba (reemplazando los archivos que ya existan).

### 🛡️ Servidor a Prueba de Fallos

KoreShelf está diseñado para manejar cualquier ebook que le lances:

* **Soporte para Archivos Grandes:** Tiempos de espera dinámicos y análisis optimizado permiten procesar EPUBs y PDFs con decenas de miles de páginas sin bloquear el servidor.
* **Protección contra Caídas:** Los archivos dañados o poco habituales se gestionan uno por uno: un libro defectuoso se señala sin detener la app.
* **Extracción Inteligente de Metadatos:** Detección automática de ISBN y respaldo en Apple Books/Google Books para portadas y sinopsis.
* **Detección de Duplicados:** Evita subir el mismo libro dos veces.

### 📱 Interfaz de Usuario Responsiva

Para gestionar mejor tu espacio de trabajo, la interfaz se adapta automáticamente a pantallas o ventanas más pequeñas. El texto de los botones desaparece elegantemente dejando íconos limpios para evitar superposiciones, asegurando una experiencia fluida en cualquier dispositivo.

### 🌍 Soporte Multilingüe (i18n)

KoreShelf está disponible en español, inglés, italiano, francés y alemán. Cambia de idioma con el botón de la barra superior (en el móvil: *Más* → idioma); tu elección se recuerda.

¿Quieres añadir un idioma? Los pasos están en [CONTRIBUTING.md](../CONTRIBUTING.md).

### 🆘 Solución de Problemas Frecuentes

**«Windows protegió su PC» o «Apple no ha podido verificar KoreShelf»**
Es la confirmación del primer inicio descrita arriba: en Windows pulsa **Más información → Ejecutar de todas formas**; en Mac usa **Ajustes del Sistema → Privacidad y seguridad → Abrir igualmente**.

**En Windows KoreShelf se abre en el navegador en lugar de en su propia ventana**
Su ventana usa Microsoft Edge WebView2, incluido en Windows 10 y 11. Si faltara, KoreShelf se abre en el navegador y explica cómo instalarlo.

**Algo no funciona**
Abre `koreshelf.log` en la carpeta de datos (ver *Gestión de Datos*) y adjúntalo a un [informe de error](https://github.com/GabrieleTrovato01/KoreShelf/issues/new?template=bug_report.md).

### 🛠️ Compilar desde el Código Fuente (Desarrolladores)

KoreShelf está escrito en Rust (servidor y ventana) con una interfaz Vite + Three.js; las apps móviles usan Tauri 2.

```bash
cargo build --release      # la app para ordenador, en target/release/
cargo test --no-default-features
```

La estructura del proyecto, las pruebas de extremo a extremo y la creación de paquetes se explican en [CONTRIBUTING.md](../CONTRIBUTING.md).
