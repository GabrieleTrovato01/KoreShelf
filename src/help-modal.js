import { t } from './i18n.js';

export function openHelpModal() {
    // 1. Setup Overlay
    const overlay = document.createElement('div');
    overlay.id = 'help-modal-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.zIndex = '2000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    // 2. Setup Contenitore Interno (più largo e scrollabile)
    const modalBox = document.createElement('div');
    modalBox.className = 'glass-effect help-modal-content';
    modalBox.style.background = 'rgba(30, 30, 30, 0.85)';
    modalBox.style.padding = '35px';
    modalBox.style.borderRadius = '20px';
    modalBox.style.maxWidth = '700px';
    modalBox.style.width = '90%';
    modalBox.style.maxHeight = '80vh';
    modalBox.style.overflowY = 'auto';
    modalBox.style.color = 'white';
    modalBox.style.border = '1px solid rgba(255,255,255,0.2)';
    modalBox.style.boxShadow = '0 20px 45px rgba(0,0,0,0.6)';

    // 3. Contenuto Tradotto Dinamicamente
    modalBox.innerHTML = `
        <h2 style="margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; text-align: center; font-family: sans-serif;">
            ${t('helpTitle')}
        </h2>
        <ul style="line-height: 1.8; padding-left: 20px; font-family: sans-serif; font-size: 14.5px;">
            ${t('helpContent')}
        </ul>
        <button id="close-help-btn" class="modern-btn glass-effect" style="width: 100%; margin-top: 25px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);">
            ${t('helpClose')}
        </button>
    `;

    // 4. Stile per la scrollbar glassmorphism
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.innerHTML = `
        .help-modal-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .help-modal-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        
        .help-modal-content::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        .help-modal-content::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Firefox */
        .help-modal-content {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
        }
        
        /* Migliora la leggibilità delle liste */
        .help-modal-content ul {
            margin: 0;
        }
        
        .help-modal-content li {
            margin-bottom: 12px;
        }
        
        .help-modal-content li b {
            color: #d4af37;
        }
        
        .help-modal-content ul ul {
            margin-top: 8px;
            margin-bottom: 8px;
            padding-left: 20px;
            opacity: 0.9;
        }
    `;
    
    document.head.appendChild(scrollbarStyle);
    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);

    // Fade In
    setTimeout(() => overlay.style.opacity = '1', 10);

    // 5. Logica di Chiusura
    const closeOverlay = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            scrollbarStyle.remove();
        }, 300);
    };

    document.getElementById('close-help-btn').onclick = closeOverlay;
    overlay.onclick = (e) => { if (e.target === overlay) closeOverlay(); };
}