# 🗺️ Project Roadmap

Welcome to the LoreKeeper development roadmap! This document tracks our progress, upcoming features, and the future of our project.

## ✅ Completed (v1.0.0 - v1.3.0)

These features have been successfully implemented and are available in the current release:

* **Core Architecture:** Interactive 3D library environment.
* **eBook Support:** Parsing for EPUB and PDF files.
* **Metadata Integration:** Auto-fetching from Apple Books.
* **Export for AI:** Clean text extraction to Markdown format for LLMs/Obsidian.
* **Portable Build:** Standalone Windows executable for "out-of-the-box" usage.
* **Multilingual Support:** i18n support for English and Italian.
* **UX Features:** Ratings, reviews, and dynamic 3D bookmarks.

---

## 🚧 In Progress / Planned

Based on community feedback and internal development, here is what we are working on next:

### 🛠️ Infrastructure & Usability

* [ ] Standardize terminal/log output to English (or locale-aware).
* [ ] Implement a graceful "Shutdown Library" option (close server + terminal).
* [ ] Create an official "Translation Guide" for community contributions.

---

### 🖥️ Cross-Platform Support

* [ ] **macOS:** Develop and test the `.dmg` packaging strategy for native Apple Silicon/Intel support.
* [ ] **Linux:** Implement distribution via `.AppImage` (or `.deb`/`.flatpak`) to ensure seamless execution on major Linux distributions.
* [ ] **CI/CD:** Automate the build process for Windows, macOS, and Linux executables to streamline future releases.

---

### 📖 Reader UI Overhaul

* [ ] Fix stretched cover page bug in the reader.
* [ ] Fix dark mode image inversion issue.
* [ ] Fix cover page mismatches between library and reader mode.
* [ ] Add single-page and continuous scrolling modes.
* [ ] Add "Open in default application" button for external readers.
* [ ] Fast-Reading Mode (RSVP): Implement a speed-reading feature to help users digest text faster.

---

### 📚 Metadata & Library Management

* [ ] Integrate additional metadata sources (Goodreads, Hardcover, etc.).
* [ ] Implement "Manual Edit" mode for custom metadata.

---

### 🏠 Library Experience & UX
* [ ] Quotes Board: Add a "Quotes Board" above the top shelf, where users can pin their favorite quotes from completed books to keep them always visible.

---

## 📢 How to contribute

LoreKeeper is an open-source project, and we welcome help! If you want to contribute:

1. Check the [Issues page](https://github.com/GabrieleTrovato01/LoreKeeper/issues) to see what needs to be done.
2. Follow our coding guidelines and open a Pull Request.
3. If you have a new idea, open an Issue first so we can discuss it together!

*Note: As this project is developed step-by-step, please be patient as we implement these features. Your support and feedback are what keep this project moving forward!*