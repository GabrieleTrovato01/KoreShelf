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

[⬆ Back to Top](#lorekeeper)
