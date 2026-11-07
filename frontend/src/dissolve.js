// --- IL LIBRO SI SGRETOLA E IL VENTO LO PORTA VIA ---
// 1. Al posto del libro 3D compare una sua copia identica (fotografata dalla scena):
//    nessun salto visivo.
// 2. Partendo dal lato destro, il libro si sgretola in tanti piccoli frammenti.
// 3. Il vento li solleva e li porta via: ruotano, rimpiccioliscono, diventano
//    cenere grigia e svaniscono.

const HOLD = 220;        // ms di pausa iniziale: il libro "trattiene il respiro"
const SWEEP = 1250;      // ms perché lo sgretolamento attraversi tutto il libro
const LIFE_MIN = 0.85;   // s di vita di un frammento
const LIFE_MAX = 1.35;

/**
 * rect: rettangolo del libro sullo schermo (pixel CSS).
 * options.capture(): disegna la scena e restituisce il canvas WebGL da fotografare.
 * options.onCaptured(): la copia è pronta, il libro 3D può sparire.
 */
export function dissolveBook(rect, { capture, onCaptured } = {}) {
    return new Promise(resolve => {
        const W = window.innerWidth, H = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;

        // --- 1. Fotografia del libro dalla scena 3D -------------------------
        const x0 = Math.max(0, Math.round(rect.x)), y0 = Math.max(0, Math.round(rect.y));
        const bw = Math.max(1, Math.min(W - x0, Math.round(rect.width)));
        const bh = Math.max(1, Math.min(H - y0, Math.round(rect.height)));
        const photo = document.createElement('canvas');
        photo.width = bw; photo.height = bh;
        const source = capture();
        const k = source.width / W;
        photo.getContext('2d').drawImage(source, x0 * k, y0 * k, bw * k, bh * k, 0, 0, bw, bh);

        const canvas = document.createElement('canvas');
        canvas.id = 'ks-dissolve-canvas';
        Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', zIndex: '1500', pointerEvents: 'none' });
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.drawImage(photo, x0, y0);   // stesso frame: la copia sostituisce il libro senza salti
        if (onCaptured) onCaptured();

        // --- 2. Frammenti ---------------------------------------------------
        const size = Math.max(4, Math.round(Math.min(bw, bh) / 42));
        const pieces = [];
        for (let y = 0; y < bh; y += size) {
            for (let x = 0; x < bw; x += size) {
                const fx = x / bw, fy = y / bh;
                pieces.push({
                    sx: x, sy: y, w: Math.min(size, bw - x), h: Math.min(size, bh - y),
                    // Lo sgretolamento parte da destra (e un po' dall'alto), con un bordo irregolare
                    delay: ((1 - fx) * 0.82 + fy * 0.18 + (Math.random() - 0.5) * 0.16) * SWEEP,
                    life: LIFE_MIN + Math.random() * (LIFE_MAX - LIFE_MIN),
                    vx: 40 + Math.random() * 70,            // vento verso destra
                    vy: -(20 + Math.random() * 60),         // e verso l'alto
                    ax: 160 + Math.random() * 180,
                    ay: -(40 + Math.random() * 90),
                    spin: (Math.random() - 0.5) * 9,
                    wobble: Math.random() * Math.PI * 2,
                });
            }
        }

        const t0 = performance.now();
        const frame = (now) => {
            const elapsed = now - t0 - HOLD;
            ctx.clearRect(0, 0, W, H);
            let alive = 0;
            for (const p of pieces) {
                const age = (elapsed - p.delay) / 1000;
                if (age < 0) {
                    // Ancora attaccato al libro
                    ctx.drawImage(photo, p.sx, p.sy, p.w, p.h, x0 + p.sx, y0 + p.sy, p.w, p.h);
                    alive++;
                    continue;
                }
                const life = age / p.life;
                if (life >= 1) continue;
                alive++;
                const px = x0 + p.sx + p.vx * age + 0.5 * p.ax * age * age;
                const py = y0 + p.sy + p.vy * age + 0.5 * p.ay * age * age + Math.sin(p.wobble + age * 7) * 6 * age;
                const scale = 1 - 0.7 * life;
                ctx.save();
                ctx.globalAlpha = Math.pow(1 - life, 1.3);
                ctx.translate(px + p.w / 2, py + p.h / 2);
                ctx.rotate(p.spin * age);
                ctx.scale(scale, scale);
                ctx.drawImage(photo, p.sx, p.sy, p.w, p.h, -p.w / 2, -p.h / 2, p.w, p.h);
                // Diventa cenere: si scolorisce verso il grigio caldo
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = `rgba(190, 178, 160, ${Math.min(0.85, life * 1.4)})`;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            }
            if (alive > 0 || elapsed < 0) return requestAnimationFrame(frame);
            canvas.remove();
            resolve();
        };
        requestAnimationFrame(frame);
    });
}
