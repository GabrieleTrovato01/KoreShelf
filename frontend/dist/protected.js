// File protetti da password (PDF, DOCX, ODT, fumetti CBZ/CBR/CB7).
//
// La password non va mai sul server per essere salvata: viaggia solo con la richiesta che
// apre il file. Se chi legge lo chiede, resta su QUESTO dispositivo (localStorage) e alle
// aperture successive viene inserita da sola; se smette di funzionare viene dimenticata e
// si richiede.
(function () {
    const KEY = (id) => `ks_password_${id}`;
    const tt = (key, fallback) => {
        const value = typeof window.t === 'function' ? window.t(key) : '';
        return value && value !== key ? value : fallback;
    };

    function saved(id) {
        try { return localStorage.getItem(KEY(id)); } catch (e) { return null; }
    }
    function remember(id, password) {
        try { localStorage.setItem(KEY(id), password); } catch (e) { /* memoria piena o disattivata */ }
    }
    function forget(id) {
        try { localStorage.removeItem(KEY(id)); } catch (e) { /* niente */ }
    }
    // Intestazione per il server (percent-encoding: le intestazioni HTTP sono solo ASCII)
    function header(password) {
        return password ? { 'X-KoreShelf-Password': encodeURIComponent(password) } : {};
    }

    function injectStyle() {
        if (document.getElementById('ks-password-style')) return;
        const style = document.createElement('style');
        style.id = 'ks-password-style';
        style.textContent = `
            #ks-password-dialog { position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center;
                background: rgba(10, 16, 24, 0.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
                padding: env(safe-area-inset-top, 0px) 16px env(safe-area-inset-bottom, 0px);
                font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; }
            #ks-password-dialog .ks-pw-card { width: 100%; max-width: 380px; box-sizing: border-box; padding: 24px; border-radius: 20px;
                background: rgba(30, 45, 59, 0.97); color: #fff; box-shadow: 0 20px 50px rgba(0,0,0,0.45);
                border: 1px solid rgba(255,255,255,0.12); display: flex; flex-direction: column; gap: 14px; }
            #ks-password-dialog h2 { margin: 0; font-size: 19px; display: flex; align-items: center; gap: 10px; }
            #ks-password-dialog p { margin: 0; font-size: 14px; line-height: 1.45; color: rgba(255,255,255,0.8); }
            #ks-password-dialog .ks-pw-error { color: #ffb3ae; font-weight: 600; }
            #ks-password-input { height: 46px; padding: 0 14px; border-radius: 12px; font-size: 16px; box-sizing: border-box; width: 100%;
                border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); color: #fff; outline: none; }
            #ks-password-input:focus { border-color: #d4af37; }
            #ks-password-dialog label { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; cursor: pointer; }
            #ks-password-dialog label input { width: 18px; height: 18px; margin: 1px 0 0; flex: 0 0 auto; accent-color: #d4af37; }
            #ks-password-dialog .ks-pw-hint { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: -6px; padding-left: 28px; }
            #ks-password-dialog .ks-pw-buttons { display: flex; gap: 10px; justify-content: flex-end; margin-top: 4px; }
            #ks-password-dialog button { height: 44px; padding: 0 18px; border-radius: 22px; font-size: 15px; font-weight: 600; cursor: pointer;
                border: 1px solid rgba(255,255,255,0.25); background: transparent; color: #fff; }
            #ks-password-dialog button.ks-pw-primary { background: #d4af37; border-color: #d4af37; color: #1e2d3b; }
            #ks-password-dialog button:disabled { opacity: 0.5; cursor: default; }
        `;
        document.head.appendChild(style);
    }

    // Chiede la password. Risolve con { password, remember } oppure null se si annulla.
    function ask({ wrong = false, fileName = '' } = {}) {
        injectStyle();
        document.getElementById('ks-password-dialog')?.remove();
        return new Promise((resolve) => {
            const dialog = document.createElement('div');
            dialog.id = 'ks-password-dialog';
            dialog.setAttribute('role', 'dialog');
            dialog.setAttribute('aria-modal', 'true');
            const icon = typeof KS_ICON === 'function' ? KS_ICON('alert', 20) : '';
            dialog.innerHTML = `
                <div class="ks-pw-card">
                    <h2>${icon}<span></span></h2>
                    <p class="ks-pw-message"></p>
                    <input id="ks-password-input" type="password" autocomplete="current-password" spellcheck="false">
                    <label><input id="ks-password-remember" type="checkbox"><span></span></label>
                    <p class="ks-pw-hint"></p>
                    <div class="ks-pw-buttons">
                        <button id="ks-password-cancel" type="button"></button>
                        <button id="ks-password-ok" type="button" class="ks-pw-primary" disabled></button>
                    </div>
                </div>`;
            dialog.querySelector('h2 span').textContent = tt('passwordTitle', 'File protetto');
            const message = dialog.querySelector('.ks-pw-message');
            message.textContent = wrong ? tt('passwordWrong', 'Password errata, riprova.') : tt('passwordRequired', 'Questo file è protetto da password.');
            message.classList.toggle('ks-pw-error', wrong);
            if (fileName) {
                const name = document.createElement('strong');
                name.textContent = ' ' + fileName;
                message.appendChild(name);
            }
            const input = dialog.querySelector('#ks-password-input');
            input.placeholder = tt('passwordPlaceholder', 'Password');
            input.setAttribute('aria-label', tt('passwordPlaceholder', 'Password'));
            dialog.querySelector('label span').textContent = tt('passwordRemember', 'Ricorda la password su questo dispositivo');
            dialog.querySelector('.ks-pw-hint').textContent = tt('passwordRememberHint', '');
            const ok = dialog.querySelector('#ks-password-ok');
            const cancel = dialog.querySelector('#ks-password-cancel');
            ok.textContent = tt('passwordUnlock', 'Sblocca');
            cancel.textContent = tt('passwordCancel', 'Annulla');

            const close = (result) => {
                document.removeEventListener('keydown', onKey, true);
                dialog.remove();
                resolve(result);
            };
            const submit = () => {
                if (!input.value) return;
                close({ password: input.value, remember: dialog.querySelector('#ks-password-remember').checked });
            };
            const onKey = (e) => {
                if (e.key === 'Escape') { e.stopPropagation(); close(null); }
                // Le frecce non devono girare pagina nel lettore sotto la finestra
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.stopPropagation();
            };
            input.addEventListener('input', () => { ok.disabled = !input.value; });
            input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
            ok.addEventListener('click', submit);
            cancel.addEventListener('click', () => close(null));
            document.addEventListener('keydown', onKey, true);
            document.body.appendChild(dialog);
            setTimeout(() => input.focus(), 30);
        });
    }

    // Apre un file protetto. `attempt(password)` prova ad aprirlo (password null = nessuna) e
    // risolve con { status: 'ok', value } | { status: 'needs' } | { status: 'wrong' } |
    // { status: 'error', message }. Prima si prova la password salvata; se non va, si chiede.
    // Risolve con { password, value } oppure null (annullato o errore).
    async function unlock(id, attempt, { fileName = '', tryWithout = true } = {}) {
        let password = saved(id);
        let fromSaved = !!password;
        let rememberIt = false;
        let wrong = false;
        if (!password && !tryWithout) {
            const answer = await ask({ fileName });
            if (!answer) return null;
            password = answer.password;
            rememberIt = answer.remember;
        }
        for (;;) {
            const result = await attempt(password || null);
            if (result.status === 'ok') {
                if (password && rememberIt) remember(id, password);
                return { password: password || null, value: result.value };
            }
            if (result.status === 'error') {
                if (result.message) alert(result.message);
                return null;
            }
            if (fromSaved) forget(id);           // la password salvata non va più bene
            wrong = result.status === 'wrong' || (!!password && result.status === 'needs');
            fromSaved = false;
            const answer = await ask({ wrong, fileName });
            if (!answer) return null;
            password = answer.password;
            rememberIt = answer.remember;
        }
    }

    // Risposta del server per una richiesta con password → stato per unlock()
    async function statusOf(response) {
        if (response.ok) return 'ok';
        let body = {};
        try { body = await response.clone().json(); } catch (e) { /* non JSON */ }
        if (response.status === 401) return body.code === 'password_wrong' ? 'wrong' : 'needs';
        return 'error';
    }

    window.KSPassword = { saved, remember, forget, header, ask, unlock, statusOf };
})();
