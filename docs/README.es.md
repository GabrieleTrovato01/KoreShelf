<div align="center">
   
   # 📚 KoreShelf
   
   [![DevGlobe](https://img.shields.io/badge/Launched%20on-DevGlobe-1e1e24?style=for-the-badge&logo=target&logoColor=4a90e2)](https://devglobe.app/projects/koreshelf)
   [![Discord](https://img.shields.io/badge/Community-Discord-1e1e24?style=for-the-badge&logo=discord&logoColor=5865F2)](https://discord.gg/S2jqFGK7wJ)
   [![Reddit](https://img.shields.io/badge/Subreddit-r%2FKoreShelf-1e1e24?style=for-the-badge&logo=reddit&logoColor=FF4500)](https://www.reddit.com/r/KoreShelf/)
   
   🌍 **Read this in:** [🇬🇧 English](../README.md) | [🇮🇹 Italiano](README.it.md) | [🇪🇸 Español](README.es.md) | [🇫🇷 Français](README.fr.md) | [🇩🇪 Deutsch](README.de.md)

   ## Home
   <img align="center" width="800" height="500" alt="demo" src="https://github.com/user-attachments/assets/499a1809-144c-4bc4-b870-f23b3e076ab2" />
   
   
   ## Reader
   <img width="800" height="500" alt="demo-reader" src="https://github.com/user-attachments/assets/8fca0fcd-2a92-40d9-a1cc-f8a2d552e57a" />

</div>

## 🇪🇸 Español

Una biblioteca digital interactiva en 3D que te permite subir, explorar y organizar tus archivos EPUB y PDF en un entorno gráfico inmersivo.

### ⚙️ Requisitos del Sistema

¡Para ejecutar este proyecto no necesitas configurar servidores ni instalar Node.js! Los requisitos dependen exclusivamente de cómo decidas ejecutarlo:

* **App Portátil (Recomendada):** No se requiere software externo. Solo descarga, extrae y ejecuta.
* **Versión Docker:** Solo necesitas un programa gratuito: Docker, que ejecutará la aplicación web de forma aislada y segura.

### 🚀 Guía de Instalación (Paso a Paso)

Tienes dos formas de ejecutar KoreShelf.

#### Opción 1: La forma más fácil (App Portátil de Escritorio - Recomendada)

Si quieres evitar instalar Docker o Node.js, puedes usar nuestro ejecutable independiente disponible para Windows, Linux y macOS (Apple Silicon).

1. Ve a la sección [Releases](https://github.com/GabrieleTrovato01/KoreShelf/releases) de este repositorio.
2. Descarga el archivo `.zip` correspondiente a tu Sistema Operativo.
3. Extrae el contenido en cualquier carpeta de tu PC.
* **Windows:** Haz doble clic en `koreshelf-win.exe`.
* **Linux:** Abre la terminal en la carpeta y ejecuta `./koreshelf-linux`. (Nota: es posible que debas otorgar permisos de ejecución primero con `chmod +x koreshelf-linux`).
* **macOS (Apple Silicon / M1, M2, M3...):** Debido a las restricciones de seguridad de macOS (Gatekeeper) en el software descargado a través de un navegador, se recomienda instalar KoreShelf directamente desde la terminal. Este procedimiento evita que se apliquen bloqueos automáticos del sistema y garantiza un inicio limpio.
Abre la Terminal y ejecuta los siguientes comandos:
```bash
   # 1. Crea una carpeta dedicada y entra en ella
   mkdir KoreShelf
   cd KoreShelf

   # 2. Descarga y extrae la última versión
   curl -L -o KoreShelf-macOS.zip "https://github.com/gabrieletrovato01/koreshelf/releases/download/v2.2.2/KoreShelf-macOS-AppleSilicon.zip" && unzip KoreShelf-macOS.zip

   # 3. Elimina el archivo comprimido (opcional, para hacer limpieza)
   rm KoreShelf-macOS.zip

```
Una vez hecho esto, simplemente haz doble clic en el archivo o ejecuta `./koreshelf-macos-arm`.

*(Nota para usuarios de Mac Intel: Los binarios precompilados no están disponibles para Macs Intel más antiguos. Por favor, usa la Opción 2: Docker, o ejecuta la aplicación desde el código fuente).*

**Nota sobre Seguridad:** Al ser un proyecto independiente de código abierto sin una firma digital de pago, SmartScreen de Windows o Gatekeeper de Apple pueden mostrar una advertencia en el primer inicio. Simplemente elige "Más información" y "Ejecutar de todas formas"; el código fuente es completamente transparente y está disponible aquí.

#### Opción 2: La forma avanzada (Docker - Para Desarrolladores/Linux/macOS)

Si prefieres ejecutar el proyecto a través de Docker o estás en un sistema operativo distinto a Windows, sigue estos pasos.

**Paso 1: Instalar Docker**

* **Windows / macOS:** Descarga e instala [Docker Desktop](https://www.docker.com/products/docker-desktop/). Inícialo y asegúrate de que Docker se esté ejecutando en segundo plano.
* **Linux:** Abre la terminal e instala Docker Engine y el plugin Compose (ej. en Ubuntu: `sudo apt install docker.io docker-compose-v2`).

**Paso 2: Iniciar la Biblioteca 3D**

1. Descarga este proyecto en tu PC (vía `git clone` o descargando el ZIP).
2. Abre la terminal exactamente dentro de la carpeta del proyecto (donde se encuentra el archivo `docker-compose.yml`).
3. Escribe este comando y presiona Enter:
```bash
docker compose up -d --build

```



### 🎮 Cómo usar la App

Una vez que la terminal haya terminado de cargar, ¡la biblioteca está lista!

Abre tu navegador favorito (Chrome, Edge, Safari) y ve a la dirección:

👉 **http://localhost:3000**

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
- **Índice inteligente:** Navega sin esfuerzo por textos extensos con el nuevo botón de índice. Es compatible con EPUB y PDF estructurados, y ofrece una alternativa inteligente con un selector rápido de salto de página para PDF escaneados sin navegación interna.

### 📌 Pizarra de Subrayados (Palacio de la Memoria)

Tus anotaciones merecen más que una simple lista. KoreShelf cuenta con una **Pizarra 3D de Subrayados** única que aparece sobre tu biblioteca:

* **Post-its Visuales:** Cada libro con subrayados aparece como un post-it en una pizarra virtual de madera.
* **Navegación Multi-página:** Navega por todos tus subrayados con las flechas izquierda/derecha, incluso cuando tienes cientos de notas.
* **Sincronización en Tiempo Real:** Los subrayados agregados en el lector aparecen instantáneamente en la pizarra sin necesidad de recargar.
* **Gestión Rápida:** Haz clic en cualquier post-it para ver, editar o eliminar subrayados específicos.
- **Compartir citas en redes sociales:** ¡Comparte tus citas favoritas con un solo clic! KoreShelf genera automáticamente una elegante imagen cuadrada (1080x1080) con tu cita, la portada del libro y metadatos, lista para compartir en Instagram, Facebook, X, WhatsApp o descargar localmente.

### 📁 Gestión de Datos (Tus Libros)

La aplicación es inteligente y sincroniza los datos con tu computadora. Dentro de la carpeta del proyecto, encontrarás estas carpetas en el directorio `public/` (creadas automáticamente en el primer inicio):

* `ebooks/`: Tus libros (EPUBs/PDFs) se guardan físicamente aquí.
* `covers/`: Las portadas extraídas para la visualización 3D se guardan aquí.
* `koreshelf.db`: Esta es la robusta base de datos SQLite que contiene los metadatos, progreso de lectura, etiquetas y subrayados de tu biblioteca.

**✏️ Metadatos Personalizados (Hot-Swap):**
Tienes el control total de tus datos. Haz clic en el botón "Modifica" en cualquier libro para modificar manualmente el título, autor, descripción o asignar una categoría personalizada. También puedes subir una portada personalizada de alta definición. La base de datos SQLite y la carpeta `covers/` se actualizan al instante, y el modelo 3D refleja los cambios en tiempo real sin recargar la página.

### 🛡️ Servidor a Prueba de Fallos

KoreShelf está diseñado para manejar cualquier ebook que le lances:

* **Soporte para Archivos Grandes:** Tiempos de espera dinámicos y análisis optimizado permiten procesar EPUBs y PDFs con decenas de miles de páginas sin bloquear el servidor.
* **Protección contra Caídas:** Capturadores de errores globales y "monkey-patches" para bibliotecas externas aseguran que el servidor siga funcionando incluso con archivos malformados.
* **Extracción Inteligente de Metadatos:** Detección automática de ISBN y respaldo en Apple Books/Google Books para portadas y sinopsis.
* **Detección de Duplicados:** Evita subir el mismo libro dos veces.

### 📱 Interfaz de Usuario Responsiva

Para gestionar mejor tu espacio de trabajo, la interfaz se adapta automáticamente a pantallas o ventanas más pequeñas. El texto de los botones desaparece elegantemente dejando íconos limpios para evitar superposiciones, asegurando una experiencia fluida en cualquier dispositivo.

**Nota:** Estas carpetas están protegidas e ignoradas por Git (gracias a `.gitignore`). Puedes agregar tantos libros como quieras sin riesgo de subirlos accidentalmente a internet si publicas el código en GitHub.

### 🌍 Soporte Multilingüe (i18n)

KoreShelf soporta internacionalización (i18n) utilizando un sistema de carga asíncrona para garantizar un rendimiento óptimo sin retrasos en el inicio. Actualmente, la aplicación está disponible en inglés, italiano, español, francés y alemán.

Puedes cambiar de idioma sobre la marcha utilizando el botón dedicado en la barra de navegación superior. Tu preferencia de idioma se guarda automáticamente en tu navegador a través de `localStorage`.

**¿Quieres contribuir con un nuevo idioma?**
Agregar una nueva traducción es increíblemente fácil:

1. Ve a la carpeta `src/locales/`, duplica el archivo `en.js` y renómbralo con el código de tu idioma (ej., `es.js` para español).
2. Traduce las cadenas de texto dentro del objeto JavaScript exportado.
3. Actualiza la lógica del botón `langBtn` en el archivo `src/main.js` para incluir tu nuevo idioma en el ciclo de selección.

### 🆘 Solución de Problemas Frecuentes

**Error en rojo durante la instalación: `CustomEvent is not defined**`
Estás usando una versión de Node.js demasiado antigua en el Dockerfile. Asegúrate de usar el código actualizado, donde el `Dockerfile` comienza con `FROM node:22-bookworm-slim` para soportar Vite.

**Error en la terminal: `port is already allocated**`
Ya tienes otro programa en ejecución que está usando el puerto 3000. Apágalo, o abre el archivo `docker-compose.yml` y cambia el puerto de `"3000:3000"` a `"8080:3000"`, luego accede a la aplicación yendo a `localhost:8080`.

**¿Las portadas de PDF no aparecen?**
Las portadas se generan automáticamente desde la primera página del PDF directamente en el navegador. Si un PDF es particularmente grande o está dañado, el sistema buscará una portada en línea a través de Apple Books como alternativa.
