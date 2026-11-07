// --- FINESTRE DI DIALOGO DELL'APP ---
// Sostituiscono i popup di sistema (confirm/alert): stesso stile "vetro" del resto di KoreShelf.

const STYLE = `
.ks-dialog-backdrop {
    position: fixed; inset: 0; z-index: 4000; display: flex; align-items: center; justify-content: center;
    background: rgba(10, 18, 28, 0.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    opacity: 0; transition: opacity .25s ease;
}
.ks-dialog-backdrop.open { opacity: 1; }
.ks-dialog {
    width: min(440px, calc(100vw - 40px)); padding: 30px 30px 24px; border-radius: 26px; box-sizing: border-box;
    text-align: center; transform: translateY(18px) scale(.96); transition: transform .3s cubic-bezier(.2,.9,.25,1.2);
    background: rgba(30, 45, 59, 0.82) !important;
}
.ks-dialog-backdrop.open .ks-dialog { transform: none; }
.ks-dialog-icon { font-size: 40px; line-height: 1; margin-bottom: 12px; }
.ks-dialog-title { margin: 0 0 10px; font-size: 19px; font-weight: 700; line-height: 1.3; word-break: break-word; }
.ks-dialog-message { margin: 0 0 24px; font-size: 14px; line-height: 1.55; opacity: .8; white-space: pre-line; }
.ks-dialog-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.ks-dialog-actions button { flex: 1 1 140px; padding: 12px 18px !important; }
.ks-dialog-actions .danger { background: rgba(217, 83, 79, 0.28); border-color: rgba(217, 83, 79, 0.65); color: #ffd6d4; }
.ks-dialog-actions .danger:hover { background: rgba(217, 83, 79, 0.45); }
@keyframes ks-dialog-shake { 0%,100% { transform: none; } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
`;

let injected = false;
function injectStyle() {
    if (injected) return;
    const el = document.createElement('style');
    el.textContent = STYLE;
    document.head.appendChild(el);
    injected = true;
}

/**
 * Chiede conferma all'utente. Restituisce una Promise<boolean>.
 * Esc / click fuori = annulla. Il pulsante sicuro (Annulla) ha il focus di default.
 */
export function confirmDialog({ icon = '', title = '', message = '', confirmText = 'OK', cancelText = 'Annulla', danger = false } = {}) {
    injectStyle();
    return new Promise(resolve => {
        const backdrop = document.createElement('div');
        backdrop.className = 'ks-dialog-backdrop';
        backdrop.id = 'ks-confirm';
        backdrop.innerHTML = `
            <div class="ks-dialog glass-effect" role="alertdialog" aria-modal="true">
                <div class="ks-dialog-icon"></div>
                <h2 class="ks-dialog-title"></h2>
                <p class="ks-dialog-message"></p>
                <div class="ks-dialog-actions">
                    <button class="glass-effect modern-btn" data-action="cancel"></button>
                    <button class="glass-effect modern-btn ${danger ? 'danger' : ''}" data-action="confirm"></button>
                </div>
            </div>`;
        backdrop.querySelector('.ks-dialog-icon').innerHTML = icon;   // icona SVG dell'app (mai testo dell'utente)
        backdrop.querySelector('.ks-dialog-title').textContent = title;
        backdrop.querySelector('.ks-dialog-message').textContent = message;
        const cancelBtn = backdrop.querySelector('[data-action=cancel]');
        const confirmBtn = backdrop.querySelector('[data-action=confirm]');
        cancelBtn.textContent = cancelText;
        confirmBtn.textContent = confirmText;

        const close = (result) => {
            document.removeEventListener('keydown', onKey, true);
            backdrop.classList.remove('open');
            setTimeout(() => backdrop.remove(), 250);
            resolve(result);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(false); }
        };
        cancelBtn.addEventListener('click', () => close(false));
        confirmBtn.addEventListener('click', () => close(true));
        backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(false); });
        document.addEventListener('keydown', onKey, true);

        document.body.appendChild(backdrop);
        requestAnimationFrame(() => backdrop.classList.add('open'));
        cancelBtn.focus();
    });
}
