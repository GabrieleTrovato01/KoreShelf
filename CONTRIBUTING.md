# 📚 LoreKeeper

*Read this in: [English](#english) | [Italiano](#italiano)*

---

<a name="italiano"></a>
# 🤝 Guida al Contributo per LoreKeeper

Grazie per l'interesse nel contribuire a **LoreKeeper**! La tua collaborazione è fondamentale per rendere questa libreria 3D ancora più potente e immersiva.

## 🐛 Segnalazione Bug

Hai trovato qualcosa che non va? Prima di aprire una nuova segnalazione:

1. Verifica che il bug non sia già stato segnalato tra le [Issues](https://github.com/GabrieleTrovato01/LoreKeeper/issues).
2. Se non c'è, apri una nuova Issue.
3. Descrivi chiaramente il problema:
* **Cosa succede:** (es. "Il segnalibro non sparisce al 100%")
* **Passaggi per riprodurlo:** (es. "Apri il libro X, leggi fino alla fine, chiudi il reader")
* **Sistema:** (es. Windows 11, Docker Desktop)

## 💡 Proposta di Nuove Feature

LoreKeeper è in continua evoluzione. Se hai un'idea per una nuova funzione:

1. Apri una Issue e usa il tag `enhancement`.
2. Spiega perché la feature sarebbe utile e come immagini che l'utente interagisca con essa.

## 🛠️ Come Contribuire al Codice (Pull Requests)

1. **Fork** della repository.
2. Crea un branch dedicato alla tua modifica: `git checkout -b feature/nome-feature` o `fix/descrizione-bug`.
3. Apporta le modifiche seguendo la struttura esistente (es. usa `main.js` per la UI e `reader.js` per il lettore EPUB).
4. **Testa:** Assicurati che le modifiche non rompano il rendering 3D (Three.js) o la sincronizzazione via Docker.
5. Invia una **Pull Request** descrivendo brevemente cosa hai aggiunto o corretto.

## 🎨 Stile di Programmazione

* **i18n:** Ogni nuova stringa testuale deve essere inserita nei file in `src/locales/`. Non scrivere testo "hardcoded".
* **Modularità:** Mantieni la logica 3D (Three.js) separata dalla logica del lettore (ePub.js).
* **Commenti:** Se aggiungi una funzione complessa, un commento veloce in italiano o inglese è molto apprezzato.
---

## 🗺️ Roadmap del Progetto

Benvenuto nella roadmap di sviluppo di LoreKeeper! Questo documento traccia i nostri progressi, le funzionalità in arrivo e il futuro del nostro progetto.

## ✅ Completato (v1.0.0 - v1.3.0)

Queste funzionalità sono state implementate con successo e sono disponibili nella release attuale:

* **Architettura Core:** Ambiente libreria 3D interattivo.
* **Supporto eBook:** Parsing per file EPUB e PDF.
* **Integrazione Metadati:** Auto-fetch da Apple Books.
* **Esportazione per IA:** Estrazione di testo pulito in formato Markdown per LLM/Obsidian.
* **Build Portatile:** Eseguibile Windows standalone per un utilizzo immediato.
* **Supporto Multilingua:** Supporto i18n per inglese e italiano.
* **Funzionalità UX:** Valutazioni, recensioni e segnalibri 3D dinamici.

---

## 🚧 In Corso / Pianificato

Basandoci sul feedback della community e sullo sviluppo interno, ecco su cosa lavoreremo prossimamente:

### 🛠️ Infrastruttura & Usabilità

* [ ] Standardizzare l'output del terminale/log in inglese (o adattivo in base alla lingua).
* [ ] Implementare un'opzione di "Chiusura Libreria" semplificata (chiusura server + terminale).
* [ ] Creare una "Guida alle Traduzioni" ufficiale per i contributi della community.

---

### 🖥️ Supporto Cross-Platform

* [ ] **macOS:** Sviluppare e testare la strategia di packaging `.dmg` per il supporto nativo Apple Silicon/Intel.
* [ ] **Linux:** Implementare la distribuzione tramite `.AppImage` (o `.deb`/`.flatpak`) per garantire un'esecuzione fluida sulle principali distribuzioni Linux.
* [ ] **CI/CD:** Automatizzare il processo di build per gli eseguibili Windows, macOS e Linux per velocizzare le future release.

---

### 📖 Revisione UI del Reader

* [ ] Risolvere il bug della copertina distorta nel lettore.
* [ ] Risolvere il problema dell'inversione dei colori in modalità scura.
* [ ] Correggere le discrepanze tra la copertina nella libreria e quella nel lettore.
* [ ] Aggiungere modalità di scorrimento a pagina singola e continua.
* [ ] Aggiungere il pulsante "Apri nell'applicazione predefinita" per lettori esterni.
* [ ] Modalità Lettura Veloce (RSVP): Implementare una funzione di speed-reading per aiutare gli utenti a leggere più velocemente.

---

### 📚 Gestione Metadati & Libreria

* [ ] Integrare ulteriori fonti di metadati (Goodreads, Hardcover, ecc.).
* [ ] Implementare una modalità "Modifica Manuale" per i metadati personalizzati.

---

### 🏠 Esperienza Libreria & UX

* [ ] Bacheca delle Citazioni: Aggiungere una bacheca sopra lo scaffale più alto, dove gli utenti possono appuntare le loro citazioni preferite dai libri completati per tenerle sempre in vista.

---

## 📢 Come contribuire

LoreKeeper è un progetto open-source e ogni aiuto è benvenuto! Se vuoi contribuire:

1. Controlla la pagina delle [Issues](https://www.google.com/search?q=https://github.com/GabrieleTrovato01/LoreKeeper/issues) per vedere cosa c'è da fare.
2. Segui le nostre linee guida di programmazione e apri una Pull Request.
3. Se hai una nuova idea, apri prima una Issue in modo da poterne discutere insieme!

Nota: Poiché questo progetto viene sviluppato passo dopo passo, ti chiediamo di avere pazienza mentre implementiamo queste funzionalità. Il tuo supporto e il tuo feedback sono ciò che fa avanzare il progetto!

[⬆ Back to Top](#lorekeeper)

---

<a name="english"></a>
# 🤝 LoreKeeper Contribution Guide

Thanks for your interest in contributing to **LoreKeeper**! Your collaboration is key to making this 3D library even more powerful and immersive.

## 🐛 Bug Reporting

Found something that isn't working as expected? Before opening a new report:

1. Check if the bug has already been reported in the [Issues](https://github.com/GabrieleTrovato01/LoreKeeper/issues) section.
2. If it hasn't, open a new Issue.
3. Clearly describe the problem:
   * **What happens:** (e.g., "The bookmark doesn't disappear at 100%")
   * **Steps to reproduce:** (e.g., "Open book X, read to the end, close the reader")
   * **System:** (e.g., Windows 11, Docker Desktop)

## 💡 New Feature Proposals

LoreKeeper is constantly evolving. If you have an idea for a new feature:

1. Open an Issue and use the `enhancement` label.
2. Explain why the feature would be useful and how you envision the user interacting with it.

## 🛠️ How to Contribute Code (Pull Requests)

1. **Fork** the repository.
2. Create a branch dedicated to your changes: `git checkout -b feature/feature-name` or `fix/bug-description`.
3. Make your changes following the existing structure.
4. **Test:** Ensure your changes don't break the 3D rendering (Three.js) or the Docker synchronization.
5. Submit a **Pull Request** briefly describing what you added or fixed.

## 🎨 Coding Style

* **i18n:** Every new text string must be added to the files in `src/locales/`. Do not write "hardcoded" text.
* **Modularity:** Try to keep the 3D logic (Three.js) separate from the reader logic (ePub.js).
* **Comments:** If you add a complex function, a quick comment in English or Italian is highly appreciated.


## 🗺️ Project Roadmap

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

[⬆ Back to Top](#lorekeeper)
