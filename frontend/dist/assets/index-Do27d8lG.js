(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Od="modulepreload",Bd=function(n){return"/"+n},fl={},_i=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(c=>{if(c=Bd(c),c in fl)return;fl[c]=!0;const l=c.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const f=document.createElement("link");if(f.rel=l?"stylesheet":Od,l||(f.as="script"),f.crossOrigin="",f.href=c,o&&f.setAttribute("nonce",o),document.head.appendChild(f),l)return new Promise((d,p)=>{f.addEventListener("load",d),f.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},zd=(n,e,t)=>{const i=n[e];return i?typeof i=="function"?i():Promise.resolve(i):new Promise((r,s)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==t?". Note that variables only represent file names one level deep.":""))))})};let Zs=localStorage.getItem("KoreShelf_lang")||"en",Zi={};async function Hd(){Zs=localStorage.getItem("KoreShelf_lang")||"it";try{Zi=(await zd(Object.assign({"./locales/de.js":()=>_i(()=>import("./de-CTxzewZU.js"),[]),"./locales/en.js":()=>_i(()=>import("./en-CJ3bD6OA.js"),[]),"./locales/es.js":()=>_i(()=>import("./es-Bko6tGz3.js"),[]),"./locales/fr.js":()=>_i(()=>import("./fr-Bw7-kFma.js"),[]),"./locales/it.js":()=>_i(()=>import("./it-BF22jrC0.js"),[])}),`./locales/${Zs}.js`,3)).default,console.log(`Lingua caricata: ${Zs}`)}catch(n){console.error("Errore nel caricamento della lingua:",n),Zi=(await _i(()=>import("./it-BF22jrC0.js"),[])).default}}function X(n){return!Zi||Object.keys(Zi).length===0?"":Zi[n]?Zi[n]:(console.warn(`Traduzione mancante per: ${n}`),n)}const Gd=`
.ks-dialog-backdrop {
    position: fixed; inset: 0; z-index: 4000; display: flex; align-items: center; justify-content: center;
    background: rgba(10, 18, 28, 0.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    opacity: 0; transition: opacity .25s ease;
}
.ks-dialog-backdrop.open { opacity: 1; }
/* Sopra un pannello già sfocato (es. Gestisci) niente seconda sfocatura: due backdrop-filter
   sovrapposti sono pesantissimi da disegnare e rallentano l'apertura sui telefoni */
#ks-manager ~ .ks-dialog-backdrop { backdrop-filter: none; -webkit-backdrop-filter: none; background: rgba(10, 18, 28, 0.45); }
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
`;let hl=!1;function wc(){if(hl)return;const n=document.createElement("style");n.textContent=Gd,document.head.appendChild(n),hl=!0}function Lr({icon:n="",title:e="",message:t="",confirmText:i="OK",cancelText:r="Annulla",danger:s=!1}={}){return wc(),new Promise(a=>{const o=document.createElement("div");o.className="ks-dialog-backdrop",o.id="ks-confirm",o.innerHTML=`
            <div class="ks-dialog glass-effect" role="alertdialog" aria-modal="true">
                <div class="ks-dialog-icon"></div>
                <h2 class="ks-dialog-title"></h2>
                <p class="ks-dialog-message"></p>
                <div class="ks-dialog-actions">
                    <button class="glass-effect modern-btn" data-action="cancel"></button>
                    <button class="glass-effect modern-btn ${s?"danger":""}" data-action="confirm"></button>
                </div>
            </div>`,o.querySelector(".ks-dialog-icon").innerHTML=n,o.querySelector(".ks-dialog-title").textContent=e,o.querySelector(".ks-dialog-message").textContent=t;const c=o.querySelector("[data-action=cancel]"),l=o.querySelector("[data-action=confirm]");c.textContent=r,l.textContent=i;const u=d=>{document.removeEventListener("keydown",f,!0),o.classList.remove("open"),setTimeout(()=>o.remove(),250),a(d)},f=d=>{d.key==="Escape"&&(d.preventDefault(),d.stopPropagation(),u(!1))};c.addEventListener("click",()=>u(!1)),l.addEventListener("click",()=>u(!0)),o.addEventListener("click",d=>{d.target===o&&u(!1)}),document.addEventListener("keydown",f,!0),document.body.appendChild(o),requestAnimationFrame(()=>o.classList.add("open")),c.focus()})}function Vd({title:n="",message:e="",placeholder:t="",value:i="",confirmText:r="OK",cancelText:s="Annulla"}={}){return wc(),new Promise(a=>{const o=document.createElement("div");o.className="ks-dialog-backdrop",o.id="ks-prompt",o.innerHTML=`
            <div class="ks-dialog glass-effect" role="dialog" aria-modal="true">
                <h2 class="ks-dialog-title"></h2>
                <p class="ks-dialog-message"></p>
                <input type="text" class="modern-input" style="width: 100%; box-sizing: border-box; height: 48px; margin: 0 0 20px; font-size: 16px;">
                <div class="ks-dialog-actions">
                    <button class="glass-effect modern-btn" data-action="cancel"></button>
                    <button class="glass-effect modern-btn" data-action="confirm"></button>
                </div>
            </div>`,o.querySelector(".ks-dialog-title").textContent=n;const c=o.querySelector(".ks-dialog-message");c.textContent=e,e||(c.style.display="none");const l=o.querySelector("input");l.placeholder=t,l.value=i,l.setAttribute("aria-label",n);const u=o.querySelector("[data-action=cancel]"),f=o.querySelector("[data-action=confirm]");u.textContent=s,f.textContent=r;const d=()=>{f.disabled=!l.value.trim(),f.style.opacity=f.disabled?"0.5":"1"};d();const p=b=>{document.removeEventListener("keydown",x,!0),o.classList.remove("open"),setTimeout(()=>o.remove(),250),a(b)},x=b=>{b.key==="Escape"&&(b.preventDefault(),b.stopPropagation(),p(null)),b.key==="Enter"&&l.value.trim()&&(b.preventDefault(),b.stopPropagation(),p(l.value.trim()))};l.addEventListener("input",d),u.addEventListener("click",()=>p(null)),f.addEventListener("click",()=>{l.value.trim()&&p(l.value.trim())}),o.addEventListener("click",b=>{b.target===o&&p(null)}),document.addEventListener("keydown",x,!0),document.body.appendChild(o),requestAnimationFrame(()=>o.classList.add("open")),l.focus()})}const Re=(n,e,t={})=>{let i=X(n);(!i||i===n)&&(i=e);for(const[r,s]of Object.entries(t))i=i.split(`{${r}}`).join(s);return i},ze=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),br=n=>n.tags&&n.tags[0]||"",Wd=`
#ks-manager { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center;
    background: rgba(10, 18, 28, 0.6); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; color: #fff; padding: 24px; box-sizing: border-box; }
#ks-manager .ks-mgr-panel { width: 100%; max-width: 760px; max-height: calc(100vh - 48px); display: flex; flex-direction: column;
    border-radius: 24px; background: #2c3e50; border: 1px solid rgba(255,255,255,0.16); box-shadow: 0 30px 80px rgba(0,0,0,0.45); overflow: hidden; }
#ks-manager header { display: flex; align-items: center; gap: 12px; padding: 18px 22px 12px; }
#ks-manager header h2 { margin: 0; flex: 1; font-size: 21px; font-weight: 700; }
#ks-manager .ks-mgr-icon-btn { width: 44px; height: 44px; border-radius: 50%; border: none; background: rgba(255,255,255,0.08);
    color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; flex: 0 0 auto; }
#ks-manager [role=tablist] { display: grid; grid-template-columns: 1fr 1fr; margin: 0 22px; padding: 4px; border-radius: 14px; background: rgba(255,255,255,0.08); }
#ks-manager [role=tab] { height: 44px; border: none; border-radius: 11px; background: transparent; color: rgba(255,255,255,0.82);
    font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; }
#ks-manager [role=tab][aria-selected=true] { background: #fff; color: #1e2d3b; font-weight: 700; }
#ks-manager .ks-mgr-body { flex: 1; min-height: 0; overflow-y: auto; padding: 14px 18px 12px; }
#ks-manager .ks-mgr-tools { display: flex; flex-direction: column; gap: 10px; padding: 0 4px 10px; }
#ks-mgr-search { height: 46px; padding: 0 18px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.08);
    color: #fff; font-family: inherit; font-size: 15px; outline: none; }
#ks-manager .ks-mgr-chips { display: flex; gap: 8px; flex-wrap: wrap; }
#ks-manager .ks-mgr-chip { height: 36px; padding: 0 14px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.25); background: transparent;
    color: #fff; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
#ks-manager .ks-mgr-chip[aria-pressed=true] { background: #fff; color: #1e2d3b; border-color: #fff; }
#ks-manager ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
#ks-manager .ks-mgr-book label { display: flex; align-items: center; gap: 14px; min-height: 48px; padding: 8px; border-radius: 14px; cursor: pointer; }
#ks-manager .ks-mgr-book label:hover { background: rgba(255,255,255,0.05); }
#ks-manager .ks-mgr-book.selected label { background: rgba(212,175,55,0.14); }
#ks-manager .ks-mgr-book input { width: 22px; height: 22px; accent-color: #d4af37; flex: 0 0 auto; }
#ks-manager .ks-mgr-thumb { width: 34px; height: 51px; flex: 0 0 auto; border-radius: 2px; background: #1a1a1a center / cover no-repeat; }
#ks-manager .ks-mgr-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
#ks-manager .ks-mgr-info b { font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#ks-manager .ks-mgr-info span { font-size: 13px; color: rgba(255,255,255,0.75); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#ks-manager .ks-mgr-pill { padding: 4px 10px; border-radius: 50px; background: rgba(255,255,255,0.1); font-size: 12px; font-weight: 600; white-space: nowrap; max-width: 34%; overflow: hidden; text-overflow: ellipsis; }
#ks-manager .ks-mgr-book.leaving { animation: ks-mgr-leave .45s ease forwards; }
@keyframes ks-mgr-leave { to { opacity: 0; transform: translateX(24px); max-height: 0; } }
#ks-manager .ks-mgr-empty { text-align: center; padding: 26px 0; color: rgba(255,255,255,0.7); font-size: 14px; }
#ks-manager .ks-mgr-shelf { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-height: 56px; padding: 8px 10px; border-radius: 14px; background: rgba(255,255,255,0.05); margin-bottom: 8px; }
#ks-manager .ks-mgr-shelf .ks-mgr-info { min-width: 140px; }
#ks-manager .ks-mgr-shelf button, #ks-mgr-new-shelf, #ks-mgr-bar button { height: 44px; padding: 0 16px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.28);
    background: rgba(255,255,255,0.08); color: #fff; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; }
#ks-manager .ks-mgr-shelf [data-action=delete-shelf] { border-color: rgba(255,140,130,0.5); background: rgba(217,83,79,0.12); color: #ffc9c4; }
#ks-mgr-new-shelf { width: 100%; border-style: dashed; margin-top: 4px; }
#ks-manager .ks-mgr-rename-input { flex: 1; min-width: 140px; height: 44px; padding: 0 14px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.7);
    background: rgba(255,255,255,0.1); color: #fff; font-family: inherit; font-size: 15px; outline: none; }
#ks-mgr-target { margin: 0 4px 10px; padding: 12px 14px; border-radius: 14px; background: rgba(212,175,55,0.16); border: 1px solid rgba(212,175,55,0.55);
    font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
#ks-mgr-target button { margin-left: auto; height: 36px; padding: 0 12px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.3); background: transparent; color: #fff; cursor: pointer; font-family: inherit; }
#ks-mgr-bar { display: none; align-items: center; gap: 10px; flex-wrap: wrap; padding: 12px 18px calc(12px + env(safe-area-inset-bottom, 0px));
    background: #1e2d3b; border-top: 1px solid rgba(255,255,255,0.12); position: relative; }
#ks-mgr-bar.show { display: flex; }
#ks-mgr-bar .ks-mgr-count { margin: 0; flex: 1; font-size: 15px; font-weight: 700; min-width: 110px; }
#ks-mgr-bar [data-action=delete] { background: #d9534f; border-color: #d9534f; font-weight: 700; }
#ks-mgr-bar [data-action=put-into] { background: #fff; color: #1e2d3b; border-color: #fff; font-weight: 700; }
#ks-mgr-move-menu { position: absolute; bottom: calc(100% + 8px); right: 18px; min-width: 240px; max-height: 50vh; overflow-y: auto; padding: 8px;
    border-radius: 16px; background: #22323f; border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 16px 36px rgba(0,0,0,0.45); display: flex; flex-direction: column; gap: 2px; }
#ks-mgr-move-menu button { height: 46px; border: none; border-radius: 10px; background: transparent; text-align: left; padding: 0 14px; font-weight: 500; }
#ks-mgr-move-menu button:hover { background: rgba(255,255,255,0.1); }
#ks-mgr-move-menu [data-action=new-shelf] { color: #e9c46a; font-weight: 700; }
#ks-mgr-toast { position: absolute; left: 50%; bottom: calc(100% + 10px); transform: translateX(-50%); padding: 10px 16px; border-radius: 50px;
    background: #fff; color: #1e2d3b; font-size: 14px; font-weight: 600; white-space: nowrap; box-shadow: 0 8px 20px rgba(0,0,0,0.3); }

/* Telefono: a tutto schermo */
.ks-phone #ks-manager { padding: 0; }
.ks-phone #ks-manager .ks-mgr-panel { max-width: none; max-height: none; width: 100vw; height: 100vh; border-radius: 0; border: none;
    padding-top: env(safe-area-inset-top, 0px); box-sizing: border-box; }
.ks-phone #ks-mgr-bar button { flex: 1 1 auto; }
`,Xd='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';function qd({onChanged:n=()=>{},initialTab:e="shelves"}={}){if(document.getElementById("ks-manager"))return;if(!document.getElementById("ks-manager-style")){const S=document.createElement("style");S.id="ks-manager-style",S.textContent=Wd,document.head.appendChild(S)}const t={tab:e,books:[],query:"",shelfFilter:null,selected:new Set,target:null,renaming:null},i=Re("uncategorized","Senza categoria"),r=document.createElement("div");r.id="ks-manager",r.innerHTML=`
        <div class="ks-mgr-panel" role="dialog" aria-modal="true" aria-labelledby="ks-mgr-title">
            <header>
                <h2 id="ks-mgr-title">${ze(Re("mgrTitle","Gestisci la libreria"))}</h2>
                <button id="ks-mgr-close" class="ks-mgr-icon-btn" aria-label="${ze(Re("closeBtn","Chiudi"))}">${Xd}</button>
            </header>
            <div role="tablist">
                <button role="tab" data-tab="shelves"></button>
                <button role="tab" data-tab="books"></button>
            </div>
            <div class="ks-mgr-body"></div>
            <div id="ks-mgr-bar"></div>
        </div>`,document.body.appendChild(r);const s=r.querySelector(".ks-mgr-body"),a=r.querySelector("#ks-mgr-bar"),o=()=>{document.removeEventListener("keydown",c,!0),r.remove()},c=S=>{if(S.key!=="Escape"||document.getElementById("ks-confirm")||document.getElementById("ks-prompt"))return;S.preventDefault(),S.stopPropagation();const C=document.getElementById("ks-mgr-move-menu");C?C.remove():o()};document.addEventListener("keydown",c,!0),r.querySelector("#ks-mgr-close").addEventListener("click",o),r.addEventListener("click",S=>{S.target===r&&o()}),r.querySelectorAll("[role=tab]").forEach(S=>S.addEventListener("click",()=>{t.tab=S.dataset.tab,t.tab==="shelves"&&(t.target=null),p()}));const l=()=>{const S=new Map;return t.books.forEach(C=>S.set(br(C),(S.get(br(C))||0)+1)),S.has("")||S.set("",0),[...S.entries()].sort((C,A)=>(C[0]==="")-(A[0]==="")||C[0].localeCompare(A[0]))},u=S=>S||i;async function f(){t.books=await(await fetch("/api/books")).json();const S=new Set(t.books.map(C=>C.id));t.selected.forEach(C=>{S.has(C)||t.selected.delete(C)}),p()}function d(S){a.classList.add("show");const C=document.getElementById("ks-mgr-toast");C&&C.remove();const A=document.createElement("div");A.id="ks-mgr-toast",A.setAttribute("role","status"),A.textContent=S,a.appendChild(A),setTimeout(()=>{A.remove(),h()},2200)}function p(){const[S,C]=r.querySelectorAll("[role=tab]");S.textContent=`${Re("mgrShelves","Scaffali")} (${l().length})`,C.textContent=`${Re("mgrBooks","Libri")} (${t.books.length})`,S.setAttribute("aria-selected",t.tab==="shelves"),C.setAttribute("aria-selected",t.tab==="books"),t.tab==="shelves"?x():b(),h()}function x(){s.innerHTML=`<ul>${l().map(([S,C])=>{const A=S==="",D=t.renaming===S&&!A;return`<li class="ks-mgr-shelf" data-shelf="${ze(S)}">
                ${D?`<input class="ks-mgr-rename-input" value="${ze(S)}" aria-label="${ze(Re("mgrRename","Rinomina"))}">
                       <button data-action="save">${ze(Re("mgrSave","Salva"))}</button>
                       <button data-action="cancel-rename">${ze(Re("mgrCancel","Annulla"))}</button>`:`<div class="ks-mgr-info"><b>${ze(u(S))}</b>
                         <span>${ze(Re("mgrBooksCount","{n} libri",{n:C}))}${A?" · "+ze(Re("mgrDefaultShelfNote","Qui finiscono i libri senza scaffale")):""}</span></div>
                       ${A?"":`<button data-action="rename">${ze(Re("mgrRename","Rinomina"))}</button>
                       <button data-action="delete-shelf">${ze(Re("mgrDeleteShelf","Elimina scaffale"))}</button>`}`}
            </li>`}).join("")}</ul>
        <button id="ks-mgr-new-shelf">+ ${ze(Re("mgrNewShelf","Nuovo scaffale"))}</button>`,s.querySelectorAll(".ks-mgr-shelf").forEach(S=>{var D,V,W;const C=S.dataset.shelf;(D=S.querySelector("[data-action=rename]"))==null||D.addEventListener("click",()=>{t.renaming=C,p()}),(V=S.querySelector("[data-action=cancel-rename]"))==null||V.addEventListener("click",()=>{t.renaming=null,p()}),(W=S.querySelector("[data-action=delete-shelf]"))==null||W.addEventListener("click",()=>_(C));const A=S.querySelector(".ks-mgr-rename-input");if(A){A.focus(),A.select();const U=()=>R(C,A.value.trim());S.querySelector("[data-action=save]").addEventListener("click",U),A.addEventListener("keydown",F=>{F.key==="Enter"&&(F.preventDefault(),U()),F.key==="Escape"&&(F.preventDefault(),F.stopPropagation(),t.renaming=null,p())})}}),s.querySelector("#ks-mgr-new-shelf").addEventListener("click",E)}function b(){var A;const S=l().map(([D])=>D);s.innerHTML=`
            ${t.target!==null?`<div id="ks-mgr-target">${ze(Re("mgrPickBooks","Scegli i libri da mettere in «{name}»",{name:t.target}))}
                <button data-action="cancel-target">${ze(Re("mgrCancel","Annulla"))}</button></div>`:""}
            <div class="ks-mgr-tools">
                <input id="ks-mgr-search" type="search" placeholder="${ze(Re("mgrSearch","Cerca tra i tuoi libri"))}" aria-label="${ze(Re("mgrSearch","Cerca tra i tuoi libri"))}" value="${ze(t.query)}">
                <div class="ks-mgr-chips">
                    <button class="ks-mgr-chip" data-shelf="" data-all="1" aria-pressed="${t.shelfFilter===null}">${ze(Re("mgrAll","Tutti"))}</button>
                    ${S.map(D=>`<button class="ks-mgr-chip" data-shelf="${ze(D)}" aria-pressed="${t.shelfFilter===D}">${ze(u(D))}</button>`).join("")}
                </div>
            </div>
            <ul>${t.books.map(D=>`
                <li class="ks-mgr-book ${t.selected.has(D.id)?"selected":""}" data-id="${ze(D.id)}">
                    <label>
                        <input type="checkbox" ${t.selected.has(D.id)?"checked":""} aria-label="${ze(D.title)}">
                        <span class="ks-mgr-thumb" ${D.coverPath?`style="background-image:url('/${ze(D.coverPath)}')"`:""}></span>
                        <span class="ks-mgr-info"><b>${ze(D.title)}</b><span>${ze(D.author||"")}</span></span>
                        <span class="ks-mgr-pill">${ze(u(br(D)))}</span>
                    </label>
                </li>`).join("")}</ul>
            <p class="ks-mgr-empty" hidden>${ze(Re("mgrNoResults","Nessun libro trovato"))}</p>`,s.querySelectorAll(".ks-mgr-chip").forEach(D=>D.addEventListener("click",()=>{t.shelfFilter=D.dataset.all?null:D.dataset.shelf,s.querySelectorAll(".ks-mgr-chip").forEach(V=>V.setAttribute("aria-pressed",V===D)),m()}));const C=s.querySelector("#ks-mgr-search");C.addEventListener("input",()=>{t.query=C.value,m()}),s.querySelectorAll(".ks-mgr-book").forEach(D=>{D.querySelector("input").addEventListener("change",V=>{V.target.checked?t.selected.add(D.dataset.id):t.selected.delete(D.dataset.id),D.classList.toggle("selected",V.target.checked),h()})}),(A=s.querySelector("[data-action=cancel-target]"))==null||A.addEventListener("click",()=>{t.target=null,p()}),m()}function m(){const S=t.query.trim().toLowerCase();let C=0;s.querySelectorAll(".ks-mgr-book").forEach(D=>{const V=t.books.find(F=>F.id===D.dataset.id),W=t.shelfFilter===null||br(V)===t.shelfFilter,U=!S||`${V.title} ${V.author||""}`.toLowerCase().includes(S);D.style.display=W&&U?"":"none",W&&U&&C++});const A=s.querySelector(".ks-mgr-empty");A&&(A.hidden=C>0)}function h(){const S=t.selected.size,C=document.getElementById("ks-mgr-toast");if(t.tab!=="books"||S===0&&t.target===null){a.innerHTML="",C&&a.appendChild(C),a.classList.toggle("show",!!C);return}a.classList.add("show");const A=S===1?Re("mgrSelectedOne","1 selezionato"):Re("mgrSelected","{n} selezionati",{n:S});t.target!==null?(a.innerHTML=`<p class="ks-mgr-count">${ze(A)}</p>
                <button data-action="put-into" ${S?"":'disabled style="opacity:.5"'}>${ze(Re("mgrPutInto","Metti in «{name}»",{name:t.target}))}</button>`,a.querySelector("[data-action=put-into]").addEventListener("click",()=>S&&L(t.target))):(a.innerHTML=`<p class="ks-mgr-count">${ze(A)}</p>
                <button data-action="deselect">${ze(Re("mgrDeselect","Deseleziona"))}</button>
                <button data-action="move">${ze(Re("mgrMove","Sposta in…"))}</button>
                <button data-action="delete">${ze(S===1?Re("mgrDeleteOne","Elimina 1 libro"):Re("mgrDeleteN","Elimina {n} libri",{n:S}))}</button>`,a.querySelector("[data-action=deselect]").addEventListener("click",()=>{t.selected.clear(),p()}),a.querySelector("[data-action=move]").addEventListener("click",D=>{D.stopPropagation(),y()}),a.querySelector("[data-action=delete]").addEventListener("click",w)),C&&a.appendChild(C)}function y(){const S=document.getElementById("ks-mgr-move-menu");if(S){S.remove();return}const C=document.createElement("div");C.id="ks-mgr-move-menu",C.setAttribute("role","menu"),C.innerHTML=l().map(([A])=>`<button role="menuitem" data-shelf="${ze(A)}">${ze(u(A))}</button>`).join("")+`<button role="menuitem" data-action="new-shelf">+ ${ze(Re("mgrNewShelf","Nuovo scaffale"))}</button>`,a.appendChild(C),C.querySelectorAll("[data-shelf]").forEach(A=>A.addEventListener("click",()=>{C.remove(),L(A.dataset.shelf)})),C.querySelector("[data-action=new-shelf]").addEventListener("click",async()=>{C.remove();const A=await T();A&&L(A)})}const T=()=>Vd({title:Re("mgrNewShelf","Nuovo scaffale"),message:Re("mgrNewShelfPrompt","Come vuoi chiamare il nuovo scaffale?"),placeholder:Re("mgrNewShelfPlaceholder","Es. Romanzi, Da leggere, Lavoro"),confirmText:Re("mgrCreate","Crea"),cancelText:Re("mgrCancel","Annulla")});async function E(){const S=await T();S&&(t.target=S,t.tab="books",t.selected.clear(),p())}async function L(S){const C=[...t.selected];C.length&&(await fetch("/api/books/bulk-tags",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({bookIds:C,newTag:S})}),t.selected.clear(),t.target=null,await f(),d(Re("mgrMoved","{n} libri spostati in «{name}»",{n:C.length,name:u(S)})),n(C[0]))}async function w(){const S=[...t.selected],C=S.map(W=>{var U;return(U=t.books.find(F=>F.id===W))==null?void 0:U.title}).filter(Boolean),A=C.slice(0,5).join(`
`),D=C.length>5?`
`+Re("mgrAndMore","e altri {n}",{n:C.length-5}):"";await Lr({icon:KS_ICON("trash",36),title:Re("mgrDeleteBooksTitle","Eliminare {n} libri?",{n:S.length}),message:`${A}${D}

${Re("mgrDeleteBooksMsg","I file verranno cancellati dal tuo computer. L'operazione non si può annullare.")}`,confirmText:S.length===1?Re("mgrDeleteOne","Elimina 1 libro"):Re("mgrDeleteN","Elimina {n} libri",{n:S.length}),cancelText:Re("mgrCancel","Annulla"),danger:!0})&&(S.forEach(W=>{var U;return(U=s.querySelector(`.ks-mgr-book[data-id="${CSS.escape(W)}"]`))==null?void 0:U.classList.add("leaving")}),await Promise.all(S.map(W=>fetch(`/api/books/${encodeURIComponent(W)}`,{method:"DELETE"}).catch(()=>null))),await new Promise(W=>setTimeout(W,450)),t.selected.clear(),await f(),d(Re("mgrDeleted","{n} libri eliminati",{n:S.length})),n(null))}async function R(S,C){if(!C||C===S){t.renaming=null,p();return}await fetch("/api/categories",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldName:S,newName:C,action:"rename"})}),t.renaming=null,await f(),d(Re("mgrRenamed","Scaffale rinominato in «{name}»",{name:C})),n(null)}async function _(S){const C=t.books.filter(D=>br(D)===S).length;await Lr({icon:KS_ICON("folder",36),title:Re("mgrDeleteShelfTitle","Eliminare lo scaffale «{name}»?",{name:S}),message:Re("mgrDeleteShelfMsg","I {n} libri NON verranno eliminati: finiranno in «Senza categoria».",{n:C}),confirmText:Re("mgrDeleteShelf","Elimina scaffale"),cancelText:Re("mgrCancel","Annulla"),danger:!0})&&(await fetch("/api/categories",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldName:S,action:"delete"})}),await f(),d(Re("mgrShelfDeleted","Scaffale eliminato: i libri sono in «Senza categoria»")),n(null))}p(),f()}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Co="184",Yd=0,pl=1,$d=2,Dr=1,Kd=2,Rr=3,oi=0,Vt=1,Bn=2,Gn=0,er=1,ml=2,gl=3,xl=4,jd=5,bi=100,Zd=101,Jd=102,Qd=103,eu=104,tu=200,nu=201,iu=202,ru=203,Na=204,ka=205,su=206,au=207,ou=208,lu=209,cu=210,du=211,uu=212,fu=213,hu=214,Fa=0,Oa=1,Ba=2,sr=3,za=4,Ha=5,Ga=6,Va=7,Ac=0,pu=1,mu=2,Mn=0,Cc=1,Rc=2,Pc=3,Lc=4,Dc=5,Ic=6,Uc=7,Nc=300,wi=301,ar=302,Js=303,Qs=304,Ns=306,kr=1e3,Hn=1001,Wa=1002,Lt=1003,gu=1004,Zr=1005,xt=1006,ea=1007,Si=1008,Kt=1009,kc=1010,Fc=1011,Fr=1012,Ro=1013,wn=1014,bn=1015,Xn=1016,Po=1017,Lo=1018,Or=1020,Oc=35902,Bc=35899,zc=1021,Hc=1022,dn=1023,qn=1026,Mi=1027,Gc=1028,Do=1029,Ai=1030,Io=1031,Uo=1033,vs=33776,bs=33777,ys=33778,Ss=33779,Xa=35840,qa=35841,Ya=35842,$a=35843,Ka=36196,ja=37492,Za=37496,Ja=37488,Qa=37489,ws=37490,eo=37491,to=37808,no=37809,io=37810,ro=37811,so=37812,ao=37813,oo=37814,lo=37815,co=37816,uo=37817,fo=37818,ho=37819,po=37820,mo=37821,go=36492,xo=36494,_o=36495,vo=36283,bo=36284,As=36285,yo=36286,xu=3200,So=0,_u=1,ri="",Jt="srgb",Cs="srgb-linear",Rs="linear",Je="srgb",Ni=7680,_l=519,vu=512,bu=513,yu=514,No=515,Su=516,Mu=517,ko=518,Eu=519,vl=35044,bl="300 es",yn=2e3,Br=2001;function Tu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function zr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function wu(){const n=zr("canvas");return n.style.display="block",n}const yl={};function Sl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Vc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ae(...n){n=Vc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function qe(...n){n=Vc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Mo(...n){const e=n.join(" ");e in yl||(yl[e]=!0,Ae(...n))}function Au(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Cu={[Fa]:Oa,[Ba]:Ga,[za]:Va,[sr]:Ha,[Oa]:Fa,[Ga]:Ba,[Va]:za,[Ha]:sr};class Di{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ml=1234567;const Ir=Math.PI/180,Hr=180/Math.PI;function hr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Ve(n,e,t){return Math.max(e,Math.min(t,n))}function Fo(n,e){return(n%e+e)%e}function Ru(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Pu(n,e,t){return n!==e?(t-n)/(e-n):0}function Ur(n,e,t){return(1-t)*n+t*e}function Lu(n,e,t,i){return Ur(n,e,1-Math.exp(-t*i))}function Du(n,e=1){return e-Math.abs(Fo(n,e*2)-e)}function Iu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Uu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Nu(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ku(n,e){return n+Math.random()*(e-n)}function Fu(n){return n*(.5-Math.random())}function Ou(n){n!==void 0&&(Ml=n);let e=Ml+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bu(n){return n*Ir}function zu(n){return n*Hr}function Hu(n){return(n&n-1)===0&&n!==0}function Gu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Vu(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Wu(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),u=a((e+i)/2),f=s((e-i)/2),d=a((e-i)/2),p=s((i-e)/2),x=a((i-e)/2);switch(r){case"XYX":n.set(o*u,c*f,c*d,o*l);break;case"YZY":n.set(c*d,o*u,c*f,o*l);break;case"ZXZ":n.set(c*f,c*d,o*u,o*l);break;case"XZX":n.set(o*u,c*x,c*p,o*l);break;case"YXY":n.set(c*p,o*u,c*x,o*l);break;case"ZYZ":n.set(c*x,c*p,o*u,o*l);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ji(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const On={DEG2RAD:Ir,RAD2DEG:Hr,generateUUID:hr,clamp:Ve,euclideanModulo:Fo,mapLinear:Ru,inverseLerp:Pu,lerp:Ur,damp:Lu,pingpong:Du,smoothstep:Iu,smootherstep:Uu,randInt:Nu,randFloat:ku,randFloatSpread:Fu,seededRandom:Ou,degToRad:Bu,radToDeg:zu,isPowerOfTwo:Hu,ceilPowerOfTwo:Gu,floorPowerOfTwo:Vu,setQuaternionFromProperEuler:Wu,normalize:Bt,denormalize:ji},Qo=class Qo{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Qo.prototype.isVector2=!0;let je=Qo;class pr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],p=s[a+1],x=s[a+2],b=s[a+3];if(f!==b||c!==d||l!==p||u!==x){let m=c*d+l*p+u*x+f*b;m<0&&(d=-d,p=-p,x=-x,b=-b,m=-m);let h=1-o;if(m<.9995){const y=Math.acos(m),T=Math.sin(y);h=Math.sin(h*y)/T,o=Math.sin(o*y)/T,c=c*h+d*o,l=l*h+p*o,u=u*h+x*o,f=f*h+b*o}else{c=c*h+d*o,l=l*h+p*o,u=u*h+x*o,f=f*h+b*o;const y=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=y,l*=y,u*=y,f*=y}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[a],d=s[a+1],p=s[a+2],x=s[a+3];return e[t]=o*x+u*f+c*p-l*d,e[t+1]=c*x+u*d+l*f-o*p,e[t+2]=l*x+u*p+o*d-c*f,e[t+3]=u*x-o*f-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),f=o(s/2),d=c(i/2),p=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=d*u*f+l*p*x,this._y=l*p*f-d*u*x,this._z=l*u*x+d*p*f,this._w=l*u*f-d*p*x;break;case"YXZ":this._x=d*u*f+l*p*x,this._y=l*p*f-d*u*x,this._z=l*u*x-d*p*f,this._w=l*u*f+d*p*x;break;case"ZXY":this._x=d*u*f-l*p*x,this._y=l*p*f+d*u*x,this._z=l*u*x+d*p*f,this._w=l*u*f-d*p*x;break;case"ZYX":this._x=d*u*f-l*p*x,this._y=l*p*f+d*u*x,this._z=l*u*x-d*p*f,this._w=l*u*f+d*p*x;break;case"YZX":this._x=d*u*f+l*p*x,this._y=l*p*f+d*u*x,this._z=l*u*x-d*p*f,this._w=l*u*f-d*p*x;break;case"XZY":this._x=d*u*f-l*p*x,this._y=l*p*f-d*u*x,this._z=l*u*x+d*p*f,this._w=l*u*f+d*p*x;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const el=class el{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(El.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(El.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+c*l+a*f-o*u,this.y=i+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ta.copy(this).projectOnVector(e),this.sub(ta)}reflect(e){return this.sub(ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};el.prototype.isVector3=!0;let z=el;const ta=new z,El=new pr,tl=class tl{constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],p=i[5],x=i[8],b=r[0],m=r[3],h=r[6],y=r[1],T=r[4],E=r[7],L=r[2],w=r[5],R=r[8];return s[0]=a*b+o*y+c*L,s[3]=a*m+o*T+c*w,s[6]=a*h+o*E+c*R,s[1]=l*b+u*y+f*L,s[4]=l*m+u*T+f*w,s[7]=l*h+u*E+f*R,s[2]=d*b+p*y+x*L,s[5]=d*m+p*T+x*w,s[8]=d*h+p*E+x*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*s,p=l*s-a*c,x=t*f+i*d+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/x;return e[0]=f*b,e[1]=(r*l-u*i)*b,e[2]=(o*i-r*a)*b,e[3]=d*b,e[4]=(u*t-r*c)*b,e[5]=(r*s-o*t)*b,e[6]=p*b,e[7]=(i*c-l*t)*b,e[8]=(a*t-i*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};tl.prototype.isMatrix3=!0;let De=tl;const na=new De,Tl=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wl=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xu(){const n={enabled:!0,workingColorSpace:Cs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Je&&(r.r=Vn(r.r),r.g=Vn(r.g),r.b=Vn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(r.r=tr(r.r),r.g=tr(r.g),r.b=tr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ri?Rs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Mo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Mo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Cs]:{primaries:e,whitePoint:i,transfer:Rs,toXYZ:Tl,fromXYZ:wl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Jt},outputColorSpaceConfig:{drawingBufferColorSpace:Jt}},[Jt]:{primaries:e,whitePoint:i,transfer:Je,toXYZ:Tl,fromXYZ:wl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Jt}}}),n}const We=Xu();function Vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function tr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ki;class qu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ki===void 0&&(ki=zr("canvas")),ki.width=e.width,ki.height=e.height;const r=ki.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ki}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Vn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vn(t[i]/255)*255):t[i]=Vn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yu=0;class Oo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ia(r[a].image)):s.push(ia(r[a]))}else s=ia(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?qu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let $u=0;const ra=new z;class At extends Di{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,i=Hn,r=Hn,s=xt,a=Si,o=dn,c=Kt,l=At.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=hr(),this.name="",this.source=new Oo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ra).x}get height(){return this.source.getSize(ra).y}get depth(){return this.source.getSize(ra).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kr:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kr:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=Nc;At.DEFAULT_ANISOTROPY=1;const nl=class nl{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],p=c[5],x=c[9],b=c[2],m=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-b)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+b)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,E=(p+1)/2,L=(h+1)/2,w=(u+d)/4,R=(f+b)/4,_=(x+m)/4;return T>E&&T>L?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=w/i,s=R/i):E>L?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=w/r,s=_/r):L<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),i=R/s,r=_/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-x)*(m-x)+(f-b)*(f-b)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(f-b)/y,this.z=(d-u)/y,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nl.prototype.isVector4=!0;let mt=nl;class Ku extends Di{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new At(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:xt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Oo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends Ku{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Wc extends At{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ju extends At{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Us=class Us{constructor(e,t,i,r,s,a,o,c,l,u,f,d,p,x,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,f,d,p,x,b,m)}set(e,t,i,r,s,a,o,c,l,u,f,d,p,x,b,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=x,h[11]=b,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Us().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Fi.setFromMatrixColumn(e,0).length(),s=1/Fi.setFromMatrixColumn(e,1).length(),a=1/Fi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*f,x=o*u,b=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=p+x*l,t[5]=d-b*l,t[9]=-o*c,t[2]=b-d*l,t[6]=x+p*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,p=c*f,x=l*u,b=l*f;t[0]=d+b*o,t[4]=x*o-p,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-x,t[6]=b+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,p=c*f,x=l*u,b=l*f;t[0]=d-b*o,t[4]=-a*f,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*u,t[9]=b-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,p=a*f,x=o*u,b=o*f;t[0]=c*u,t[4]=x*l-p,t[8]=d*l+b,t[1]=c*f,t[5]=b*l+d,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,p=a*l,x=o*c,b=o*l;t[0]=c*u,t[4]=b-d*f,t[8]=x*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*f+x,t[10]=d-b*f}else if(e.order==="XZY"){const d=a*c,p=a*l,x=o*c,b=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+b,t[5]=a*u,t[9]=p*f-x,t[2]=x*f-p,t[6]=o*u,t[10]=b*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zu,e,Ju)}lookAt(e,t,i){const r=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Zn.crossVectors(i,Yt),Zn.lengthSq()===0&&(Math.abs(i.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Zn.crossVectors(i,Yt)),Zn.normalize(),Jr.crossVectors(Yt,Zn),r[0]=Zn.x,r[4]=Jr.x,r[8]=Yt.x,r[1]=Zn.y,r[5]=Jr.y,r[9]=Yt.y,r[2]=Zn.z,r[6]=Jr.z,r[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],p=i[13],x=i[2],b=i[6],m=i[10],h=i[14],y=i[3],T=i[7],E=i[11],L=i[15],w=r[0],R=r[4],_=r[8],S=r[12],C=r[1],A=r[5],D=r[9],V=r[13],W=r[2],U=r[6],F=r[10],G=r[14],Z=r[3],ee=r[7],le=r[11],ge=r[15];return s[0]=a*w+o*C+c*W+l*Z,s[4]=a*R+o*A+c*U+l*ee,s[8]=a*_+o*D+c*F+l*le,s[12]=a*S+o*V+c*G+l*ge,s[1]=u*w+f*C+d*W+p*Z,s[5]=u*R+f*A+d*U+p*ee,s[9]=u*_+f*D+d*F+p*le,s[13]=u*S+f*V+d*G+p*ge,s[2]=x*w+b*C+m*W+h*Z,s[6]=x*R+b*A+m*U+h*ee,s[10]=x*_+b*D+m*F+h*le,s[14]=x*S+b*V+m*G+h*ge,s[3]=y*w+T*C+E*W+L*Z,s[7]=y*R+T*A+E*U+L*ee,s[11]=y*_+T*D+E*F+L*le,s[15]=y*S+T*V+E*G+L*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],p=e[14],x=e[3],b=e[7],m=e[11],h=e[15],y=c*p-l*d,T=o*p-l*f,E=o*d-c*f,L=a*p-l*u,w=a*d-c*u,R=a*f-o*u;return t*(b*y-m*T+h*E)-i*(x*y-m*L+h*w)+r*(x*T-b*L+h*R)-s*(x*E-b*w+m*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],p=e[11],x=e[12],b=e[13],m=e[14],h=e[15],y=t*o-i*a,T=t*c-r*a,E=t*l-s*a,L=i*c-r*o,w=i*l-s*o,R=r*l-s*c,_=u*b-f*x,S=u*m-d*x,C=u*h-p*x,A=f*m-d*b,D=f*h-p*b,V=d*h-p*m,W=y*V-T*D+E*A+L*C-w*S+R*_;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/W;return e[0]=(o*V-c*D+l*A)*U,e[1]=(r*D-i*V-s*A)*U,e[2]=(b*R-m*w+h*L)*U,e[3]=(d*w-f*R-p*L)*U,e[4]=(c*C-a*V-l*S)*U,e[5]=(t*V-r*C+s*S)*U,e[6]=(m*E-x*R-h*T)*U,e[7]=(u*R-d*E+p*T)*U,e[8]=(a*D-o*C+l*_)*U,e[9]=(i*C-t*D-s*_)*U,e[10]=(x*w-b*E+h*y)*U,e[11]=(f*E-u*w-p*y)*U,e[12]=(o*S-a*A-c*_)*U,e[13]=(t*A-i*S+r*_)*U,e[14]=(b*T-x*L-m*y)*U,e[15]=(u*L-f*T+d*y)*U,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,f=o+o,d=s*l,p=s*u,x=s*f,b=a*u,m=a*f,h=o*f,y=c*l,T=c*u,E=c*f,L=i.x,w=i.y,R=i.z;return r[0]=(1-(b+h))*L,r[1]=(p+E)*L,r[2]=(x-T)*L,r[3]=0,r[4]=(p-E)*w,r[5]=(1-(d+h))*w,r[6]=(m+y)*w,r[7]=0,r[8]=(x+T)*R,r[9]=(m-y)*R,r[10]=(1-(d+b))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Fi.set(r[0],r[1],r[2]).length();const o=Fi.set(r[4],r[5],r[6]).length(),c=Fi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),sn.copy(this);const l=1/a,u=1/o,f=1/c;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=f,sn.elements[9]*=f,sn.elements[10]*=f,t.setFromRotationMatrix(sn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=yn,c=!1){const l=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let x,b;if(c)x=s/(a-s),b=a*s/(a-s);else if(o===yn)x=-(a+s)/(a-s),b=-2*a*s/(a-s);else if(o===Br)x=-a/(a-s),b=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=yn,c=!1){const l=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let x,b;if(c)x=1/(a-s),b=a/(a-s);else if(o===yn)x=-2/(a-s),b=-(a+s)/(a-s);else if(o===Br)x=-1/(a-s),b=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Us.prototype.isMatrix4=!0;let _t=Us;const Fi=new z,sn=new _t,Zu=new z(0,0,0),Ju=new z(1,1,1),Zn=new z,Jr=new z,Yt=new z,Al=new _t,Cl=new pr;class li{constructor(e=0,t=0,i=0,r=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ve(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Al.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Al,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cl.setFromEuler(this),this.setFromQuaternion(Cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class Bo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qu=0;const Rl=new z,Oi=new pr,In=new _t,Qr=new z,yr=new z,ef=new z,tf=new pr,Pl=new z(1,0,0),Ll=new z(0,1,0),Dl=new z(0,0,1),Il={type:"added"},nf={type:"removed"},Bi={type:"childadded",child:null},sa={type:"childremoved",child:null};class Ft extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ft.DEFAULT_UP.clone();const e=new z,t=new li,i=new pr,r=new z(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new De}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(Pl,e)}rotateY(e){return this.rotateOnAxis(Ll,e)}rotateZ(e){return this.rotateOnAxis(Dl,e)}translateOnAxis(e,t){return Rl.copy(e).applyQuaternion(this.quaternion),this.position.add(Rl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pl,e)}translateY(e){return this.translateOnAxis(Ll,e)}translateZ(e){return this.translateOnAxis(Dl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Qr.copy(e):Qr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(yr,Qr,this.up):In.lookAt(Qr,yr,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),Oi.setFromRotationMatrix(In),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Il),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nf),sa.child=e,this.dispatchEvent(sa),sa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Il),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,e,ef),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,tf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ft.DEFAULT_UP=new z(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ji extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rf={type:"move"};class aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ji,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ji,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ji,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,i),h=this._getHandJoint(l,b);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,x=.005;l.inputState.pinching&&d>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rf)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ji;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},es={h:0,s:0,l:0};function oa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ke{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=We.workingColorSpace){return this.r=e,this.g=t,this.b=i,We.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=We.workingColorSpace){if(e=Fo(e,1),t=Ve(t,0,1),i=Ve(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=oa(a,s,e+1/3),this.g=oa(a,s,e),this.b=oa(a,s,e-1/3)}return We.colorSpaceToWorking(this,r),this}setStyle(e,t=Jt){function i(s){s!==void 0&&parseFloat(s)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jt){const i=Xc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vn(e.r),this.g=Vn(e.g),this.b=Vn(e.b),this}copyLinearToSRGB(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jt){return We.workingToColorSpace(kt.copy(this),e),Math.round(Ve(kt.r*255,0,255))*65536+Math.round(Ve(kt.g*255,0,255))*256+Math.round(Ve(kt.b*255,0,255))}getHexString(e=Jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.workingToColorSpace(kt.copy(this),t);const i=kt.r,r=kt.g,s=kt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=We.workingColorSpace){return We.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=Jt){We.workingToColorSpace(kt.copy(this),e);const t=kt.r,i=kt.g,r=kt.b;return e!==Jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Jn),this.setHSL(Jn.h+e,Jn.s+t,Jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(es);const i=Ur(Jn.h,es.h,t),r=Ur(Jn.s,es.s,t),s=Ur(Jn.l,es.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new Ke;Ke.NAMES=Xc;class sf extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const an=new z,Un=new z,la=new z,Nn=new z,zi=new z,Hi=new z,Ul=new z,ca=new z,da=new z,ua=new z,fa=new mt,ha=new mt,pa=new mt;class cn{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),an.subVectors(e,t),r.cross(an);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){an.subVectors(r,t),Un.subVectors(i,t),la.subVectors(e,t);const a=an.dot(an),o=an.dot(Un),c=an.dot(la),l=Un.dot(Un),u=Un.dot(la),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(l*c-o*u)*d,x=(a*u-o*c)*d;return s.set(1-p-x,x,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Nn.x),c.addScaledVector(a,Nn.y),c.addScaledVector(o,Nn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return fa.setScalar(0),ha.setScalar(0),pa.setScalar(0),fa.fromBufferAttribute(e,t),ha.fromBufferAttribute(e,i),pa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(fa,s.x),a.addScaledVector(ha,s.y),a.addScaledVector(pa,s.z),a}static isFrontFacing(e,t,i,r){return an.subVectors(i,t),Un.subVectors(e,t),an.cross(Un).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),an.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return cn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;zi.subVectors(r,i),Hi.subVectors(s,i),ca.subVectors(e,i);const c=zi.dot(ca),l=Hi.dot(ca);if(c<=0&&l<=0)return t.copy(i);da.subVectors(e,r);const u=zi.dot(da),f=Hi.dot(da);if(u>=0&&f<=u)return t.copy(r);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(zi,a);ua.subVectors(e,s);const p=zi.dot(ua),x=Hi.dot(ua);if(x>=0&&p<=x)return t.copy(s);const b=p*l-c*x;if(b<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(Hi,o);const m=u*x-p*f;if(m<=0&&f-u>=0&&p-x>=0)return Ul.subVectors(s,r),o=(f-u)/(f-u+(p-x)),t.copy(r).addScaledVector(Ul,o);const h=1/(m+b+d);return a=b*h,o=d*h,t.copy(i).addScaledVector(zi,a).addScaledVector(Hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Wr{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,on):on.fromBufferAttribute(s,a),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ts.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ts.copy(i.boundingBox)),ts.applyMatrix4(e.matrixWorld),this.union(ts)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),ns.subVectors(this.max,Sr),Gi.subVectors(e.a,Sr),Vi.subVectors(e.b,Sr),Wi.subVectors(e.c,Sr),Qn.subVectors(Vi,Gi),ei.subVectors(Wi,Vi),pi.subVectors(Gi,Wi);let t=[0,-Qn.z,Qn.y,0,-ei.z,ei.y,0,-pi.z,pi.y,Qn.z,0,-Qn.x,ei.z,0,-ei.x,pi.z,0,-pi.x,-Qn.y,Qn.x,0,-ei.y,ei.x,0,-pi.y,pi.x,0];return!ma(t,Gi,Vi,Wi,ns)||(t=[1,0,0,0,1,0,0,0,1],!ma(t,Gi,Vi,Wi,ns))?!1:(is.crossVectors(Qn,ei),t=[is.x,is.y,is.z],ma(t,Gi,Vi,Wi,ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const kn=[new z,new z,new z,new z,new z,new z,new z,new z],on=new z,ts=new Wr,Gi=new z,Vi=new z,Wi=new z,Qn=new z,ei=new z,pi=new z,Sr=new z,ns=new z,is=new z,mi=new z;function ma(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){mi.fromArray(n,s);const o=r.x*Math.abs(mi.x)+r.y*Math.abs(mi.y)+r.z*Math.abs(mi.z),c=e.dot(mi),l=t.dot(mi),u=i.dot(mi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const St=new z,rs=new je;let af=0;class Tn extends Di{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:af++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=vl,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)rs.fromBufferAttribute(this,t),rs.applyMatrix3(e),this.setXY(t,rs.x,rs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ji(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class qc extends Tn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yc extends Tn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Wn extends Tn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const of=new Wr,Mr=new z,ga=new z;class zo{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):of.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mr.subVectors(e,this.center);const t=Mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Mr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mr.copy(e.center).add(ga)),this.expandByPoint(Mr.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let lf=0;const Zt=new _t,xa=new Ft,Xi=new z,$t=new Wr,Er=new Wr,Pt=new z;class Yn extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tu(e)?Yc:qc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new De().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,i){return Zt.makeTranslation(e,t,i),this.applyMatrix4(Zt),this}scale(e,t,i){return Zt.makeScale(e,t,i),this.applyMatrix4(Zt),this}lookAt(e){return xa.lookAt(e),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Wn(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];$t.setFromBufferAttribute(s),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Er.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors($t.min,Er.min),$t.expandByPoint(Pt),Pt.addVectors($t.max,Er.max),$t.expandByPoint(Pt)):($t.expandByPoint(Er.min),$t.expandByPoint(Er.max))}$t.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Pt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Pt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Pt.fromBufferAttribute(o,l),c&&(Xi.fromBufferAttribute(e,l),Pt.add(Xi)),r=Math.max(r,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new z,c[_]=new z;const l=new z,u=new z,f=new z,d=new je,p=new je,x=new je,b=new z,m=new z;function h(_,S,C){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,S),f.fromBufferAttribute(i,C),d.fromBufferAttribute(s,_),p.fromBufferAttribute(s,S),x.fromBufferAttribute(s,C),u.sub(l),f.sub(l),p.sub(d),x.sub(d);const A=1/(p.x*x.y-x.x*p.y);isFinite(A)&&(b.copy(u).multiplyScalar(x.y).addScaledVector(f,-p.y).multiplyScalar(A),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(A),o[_].add(b),o[S].add(b),o[C].add(b),c[_].add(m),c[S].add(m),c[C].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,S=y.length;_<S;++_){const C=y[_],A=C.start,D=C.count;for(let V=A,W=A+D;V<W;V+=3)h(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const T=new z,E=new z,L=new z,w=new z;function R(_){L.fromBufferAttribute(r,_),w.copy(L);const S=o[_];T.copy(S),T.sub(L.multiplyScalar(L.dot(S))).normalize(),E.crossVectors(w,S);const A=E.dot(c[_])<0?-1:1;a.setXYZW(_,T.x,T.y,T.z,A)}for(let _=0,S=y.length;_<S;++_){const C=y[_],A=C.start,D=C.count;for(let V=A,W=A+D;V<W;V+=3)R(e.getX(V+0)),R(e.getX(V+1)),R(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new z,s=new z,a=new z,o=new z,c=new z,l=new z,u=new z,f=new z;if(e)for(let d=0,p=e.count;d<p;d+=3){const x=e.getX(d+0),b=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,b),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(b,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u);let p=0,x=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?p=c[b]*o.data.stride+o.offset:p=c[b]*u;for(let h=0;h<u;h++)d[x++]=l[p++]}return new Tn(d,u,f)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Yn,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const d=l[u],p=e(d,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let cf=0;class Xr extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=hr(),this.name="",this.type="Material",this.blending=er,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Na,this.blendDst=ka,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_l,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Na&&(i.blendSrc=this.blendSrc),this.blendDst!==ka&&(i.blendDst=this.blendDst),this.blendEquation!==bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_l&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fn=new z,_a=new z,ss=new z,ti=new z,va=new z,as=new z,ba=new z;class $c{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){_a.copy(e).add(t).multiplyScalar(.5),ss.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(_a);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ss),o=ti.dot(this.direction),c=-ti.dot(ss),l=ti.lengthSq(),u=Math.abs(1-a*a);let f,d,p,x;if(u>0)if(f=a*c-o,d=a*o-c,x=s*u,f>=0)if(d>=-x)if(d<=x){const b=1/u;f*=b,d*=b,p=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;else d<=-x?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+l):d<=x?(f=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(_a).addScaledVector(ss,d),p}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const i=Fn.dot(this.direction),r=Fn.dot(Fn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,r,s){va.subVectors(t,e),as.subVectors(i,e),ba.crossVectors(va,as);let a=this.direction.dot(ba),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ti.subVectors(this.origin,e);const c=o*this.direction.dot(as.crossVectors(ti,as));if(c<0)return null;const l=o*this.direction.dot(va.cross(ti));if(l<0||c+l>a)return null;const u=-o*ti.dot(ba);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kc extends Xr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=Ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nl=new _t,gi=new $c,os=new zo,kl=new z,ls=new z,cs=new z,ds=new z,ya=new z,us=new z,Fl=new z,fs=new z;class Ht extends Ft{constructor(e=new Yn,t=new Kc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){us.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(ya.fromBufferAttribute(f,e),a?us.addScaledVector(ya,u):us.addScaledVector(ya.sub(t),u))}t.add(us)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),os.copy(i.boundingSphere),os.applyMatrix4(s),gi.copy(e.ray).recast(e.near),!(os.containsPoint(gi.origin)===!1&&(gi.intersectSphere(os,kl)===null||gi.origin.distanceToSquared(kl)>(e.far-e.near)**2))&&(Nl.copy(s).invert(),gi.copy(e.ray).applyMatrix4(Nl),!(i.boundingBox!==null&&gi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,b=d.length;x<b;x++){const m=d[x],h=a[m.materialIndex],y=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=y,L=T;E<L;E+=3){const w=o.getX(E),R=o.getX(E+1),_=o.getX(E+2);r=hs(this,h,e,i,l,u,f,w,R,_),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let m=x,h=b;m<h;m+=3){const y=o.getX(m),T=o.getX(m+1),E=o.getX(m+2);r=hs(this,a,e,i,l,u,f,y,T,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,b=d.length;x<b;x++){const m=d[x],h=a[m.materialIndex],y=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=y,L=T;E<L;E+=3){const w=E,R=E+1,_=E+2;r=hs(this,h,e,i,l,u,f,w,R,_),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=x,h=b;m<h;m+=3){const y=m,T=m+1,E=m+2;r=hs(this,a,e,i,l,u,f,y,T,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function df(n,e,t,i,r,s,a,o){let c;if(e.side===Vt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===oi,o),c===null)return null;fs.copy(o),fs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(fs);return l<t.near||l>t.far?null:{distance:l,point:fs.clone(),object:n}}function hs(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,ls),n.getVertexPosition(c,cs),n.getVertexPosition(l,ds);const u=df(n,e,t,i,ls,cs,ds,Fl);if(u){const f=new z;cn.getBarycoord(Fl,ls,cs,ds,f),r&&(u.uv=cn.getInterpolatedAttribute(r,o,c,l,f,new je)),s&&(u.uv1=cn.getInterpolatedAttribute(s,o,c,l,f,new je)),a&&(u.normal=cn.getInterpolatedAttribute(a,o,c,l,f,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new z,materialIndex:0};cn.getNormal(ls,cs,ds,d.normal),u.face=d,u.barycoord=f}return u}class uf extends At{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Lt,u=Lt,f,d){super(null,a,o,c,l,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sa=new z,ff=new z,hf=new De;class vi{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Sa.subVectors(i,t).cross(ff.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Sa),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||hf.getNormalMatrix(e),r=this.coplanarPoint(Sa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new zo,pf=new je(.5,.5),ps=new z;class Ho{constructor(e=new vi,t=new vi,i=new vi,r=new vi,s=new vi,a=new vi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=yn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],f=s[5],d=s[6],p=s[7],x=s[8],b=s[9],m=s[10],h=s[11],y=s[12],T=s[13],E=s[14],L=s[15];if(r[0].setComponents(l-a,p-u,h-x,L-y).normalize(),r[1].setComponents(l+a,p+u,h+x,L+y).normalize(),r[2].setComponents(l+o,p+f,h+b,L+T).normalize(),r[3].setComponents(l-o,p-f,h-b,L-T).normalize(),i)r[4].setComponents(c,d,m,E).normalize(),r[5].setComponents(l-c,p-d,h-m,L-E).normalize();else if(r[4].setComponents(l-c,p-d,h-m,L-E).normalize(),t===yn)r[5].setComponents(l+c,p+d,h+m,L+E).normalize();else if(t===Br)r[5].setComponents(c,d,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){xi.center.set(0,0,0);const t=pf.distanceTo(e.center);return xi.radius=.7071067811865476+t,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ps.x=r.normal.x>0?e.max.x:e.min.x,ps.y=r.normal.y>0?e.max.y:e.min.y,ps.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class jc extends At{constructor(e=[],t=wi,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Go extends At{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class or extends At{constructor(e,t,i=wn,r,s,a,o=Lt,c=Lt,l,u=qn,f=1){if(u!==qn&&u!==Mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Oo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class mf extends or{constructor(e,t=wn,i=wi,r,s,a=Lt,o=Lt,c,l=qn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Zc extends At{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ci extends Yn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let d=0,p=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Wn(l,3)),this.setAttribute("normal",new Wn(u,3)),this.setAttribute("uv",new Wn(f,2));function x(b,m,h,y,T,E,L,w,R,_,S){const C=E/R,A=L/_,D=E/2,V=L/2,W=w/2,U=R+1,F=_+1;let G=0,Z=0;const ee=new z;for(let le=0;le<F;le++){const ge=le*A-V;for(let be=0;be<U;be++){const Xe=be*C-D;ee[b]=Xe*y,ee[m]=ge*T,ee[h]=W,l.push(ee.x,ee.y,ee.z),ee[b]=0,ee[m]=0,ee[h]=w>0?1:-1,u.push(ee.x,ee.y,ee.z),f.push(be/R),f.push(1-le/_),G+=1}}for(let le=0;le<_;le++)for(let ge=0;ge<R;ge++){const be=d+ge+U*le,Xe=d+ge+U*(le+1),Ze=d+(ge+1)+U*(le+1),Ie=d+(ge+1)+U*le;c.push(be,Xe,Ie),c.push(Xe,Ze,Ie),Z+=6}o.addGroup(p,Z,S),p+=Z,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class mr extends Yn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,f=e/o,d=t/c,p=[],x=[],b=[],m=[];for(let h=0;h<u;h++){const y=h*d-a;for(let T=0;T<l;T++){const E=T*f-s;x.push(E,-y,0),b.push(0,0,1),m.push(T/o),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let y=0;y<o;y++){const T=y+l*h,E=y+l*(h+1),L=y+1+l*(h+1),w=y+1+l*h;p.push(T,E,w),p.push(E,L,w)}this.setIndex(p),this.setAttribute("position",new Wn(x,3)),this.setAttribute("normal",new Wn(b,3)),this.setAttribute("uv",new Wn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.width,e.height,e.widthSegments,e.heightSegments)}}function lr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Ol(r))r.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Ol(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function zt(n){const e={};for(let t=0;t<n.length;t++){const i=lr(n[t]);for(const r in i)e[r]=i[r]}return e}function Ol(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function gf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Jc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const xf={clone:lr,merge:zt};var _f=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Xr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_f,this.fragmentShader=vf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lr(e.uniforms),this.uniformsGroups=gf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class bf extends An{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class si extends Xr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=So,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yf extends Xr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sf extends Xr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ei={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Bl(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Bl(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Bl(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Mf{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=l.length;f<d;f+=2){const p=l[f],x=l[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ef=new Mf;class ks{constructor(e){this.manager=e!==void 0?e:Ef,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ks.DEFAULT_MATERIAL_NAME="__DEFAULT";const qi=new WeakMap;class Tf extends ks{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Ei.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let f=qi.get(a);f===void 0&&(f=[],qi.set(a,f)),f.push({onLoad:t,onError:r})}return a}const o=zr("img");function c(){u(),t&&t(this);const f=qi.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onLoad&&p.onLoad(this)}qi.delete(this),s.manager.itemEnd(e)}function l(f){u(),r&&r(f),Ei.remove(`image:${e}`);const d=qi.get(this)||[];for(let p=0;p<d.length;p++){const x=d[p];x.onError&&x.onError(f)}qi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ei.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class wf extends ks{constructor(e){super(e)}load(e,t,i,r){const s=new At,a=new Tf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Qc extends Ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Ma=new _t,zl=new z,Hl=new z;class Af{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new je(512,512),this.mapType=Kt,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ho,this._frameExtents=new je(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;zl.setFromMatrixPosition(e.matrixWorld),t.position.copy(zl),Hl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hl),t.updateMatrixWorld(),Ma.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ma,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Br||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ma)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ms=new z,gs=new pr,xn=new z;class ed extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ms,gs,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ms,gs,xn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ms,gs,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ms,gs,xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ni=new z,Gl=new je,Vl=new je;class Qt extends ed{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ir*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hr*2*Math.atan(Math.tan(Ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,Gl,Vl),t.subVectors(Vl,Gl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ir*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Vo extends ed{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cf extends Af{constructor(){super(new Vo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rf extends Qc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.shadow=new Cf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Pf extends Qc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ea=new WeakMap;class td extends ks{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Ei.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{Ea.has(a)===!0?(r&&r(Ea.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){Ei.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){r&&r(l),Ea.set(c,l),Ei.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Ei.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Yi=-90,$i=1;class Lf extends Ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Qt(Yi,$i,e,t);r.layers=this.layers,this.add(r);const s=new Qt(Yi,$i,e,t);s.layers=this.layers,this.add(s);const a=new Qt(Yi,$i,e,t);a.layers=this.layers,this.add(a);const o=new Qt(Yi,$i,e,t);o.layers=this.layers,this.add(o);const c=new Qt(Yi,$i,e,t);c.layers=this.layers,this.add(c);const l=new Qt(Yi,$i,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===yn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Br)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Df extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Wl=new _t;class If{constructor(e,t,i=0,r=1/0){this.ray=new $c(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Bo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Wl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wl),this}intersectObject(e,t=!0,i=[]){return Eo(e,this,i,t),i.sort(Xl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Eo(e[r],this,i,t);return i.sort(Xl),i}}function Xl(n,e){return n.distance-e.distance}function Eo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Eo(s[a],e,t,!0)}}const il=class il{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};il.prototype.isMatrix2=!0;let ql=il;function Yl(n,e,t,i){const r=Uf(i);switch(t){case zc:return n*e;case Gc:return n*e/r.components*r.byteLength;case Do:return n*e/r.components*r.byteLength;case Ai:return n*e*2/r.components*r.byteLength;case Io:return n*e*2/r.components*r.byteLength;case Hc:return n*e*3/r.components*r.byteLength;case dn:return n*e*4/r.components*r.byteLength;case Uo:return n*e*4/r.components*r.byteLength;case vs:case bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ys:case Ss:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qa:case $a:return Math.max(n,16)*Math.max(e,8)/4;case Xa:case Ya:return Math.max(n,8)*Math.max(e,8)/2;case Ka:case ja:case Ja:case Qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Za:case ws:case eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case to:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case no:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case io:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case so:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ao:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case oo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case lo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case co:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case uo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case fo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ho:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case po:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case mo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case go:case xo:case _o:return Math.ceil(n/4)*Math.ceil(e/4)*16;case vo:case bo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case As:case yo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uf(n){switch(n){case Kt:case kc:return{byteLength:1,components:1};case Fr:case Fc:case Xn:return{byteLength:2,components:1};case Po:case Lo:return{byteLength:2,components:4};case wn:case Ro:case bn:return{byteLength:4,components:1};case Oc:case Bc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Co}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Co);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nd(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Nf(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,u);else{f.sort((p,x)=>p.start-x.start);let d=0;for(let p=1;p<f.length;p++){const x=f[d],b=f[p];b.start<=x.start+x.count+1?x.count=Math.max(x.count,b.start+b.count-x.start):(++d,f[d]=b)}f.length=d+1;for(let p=0,x=f.length;p<x;p++){const b=f[p];n.bufferSubData(l,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ff=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Of=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$f=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Kf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,th=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ih=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,rh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,sh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ah=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,oh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ch=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fh="gl_FragColor = linearToOutputTexel( gl_FragColor );",hh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ph=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,mh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_h=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Eh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Th=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ah=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ch=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Rh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ph=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ih=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Uh=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Oh=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Bh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$h=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ep=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ap=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,op=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,up=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,fp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,vp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Np=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Vp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Zp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,im=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,om=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,um=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:kf,alphahash_pars_fragment:Ff,alphamap_fragment:Of,alphamap_pars_fragment:Bf,alphatest_fragment:zf,alphatest_pars_fragment:Hf,aomap_fragment:Gf,aomap_pars_fragment:Vf,batching_pars_vertex:Wf,batching_vertex:Xf,begin_vertex:qf,beginnormal_vertex:Yf,bsdfs:$f,iridescence_fragment:Kf,bumpmap_pars_fragment:jf,clipping_planes_fragment:Zf,clipping_planes_pars_fragment:Jf,clipping_planes_pars_vertex:Qf,clipping_planes_vertex:eh,color_fragment:th,color_pars_fragment:nh,color_pars_vertex:ih,color_vertex:rh,common:sh,cube_uv_reflection_fragment:ah,defaultnormal_vertex:oh,displacementmap_pars_vertex:lh,displacementmap_vertex:ch,emissivemap_fragment:dh,emissivemap_pars_fragment:uh,colorspace_fragment:fh,colorspace_pars_fragment:hh,envmap_fragment:ph,envmap_common_pars_fragment:mh,envmap_pars_fragment:gh,envmap_pars_vertex:xh,envmap_physical_pars_fragment:Ch,envmap_vertex:_h,fog_vertex:vh,fog_pars_vertex:bh,fog_fragment:yh,fog_pars_fragment:Sh,gradientmap_pars_fragment:Mh,lightmap_pars_fragment:Eh,lights_lambert_fragment:Th,lights_lambert_pars_fragment:wh,lights_pars_begin:Ah,lights_toon_fragment:Rh,lights_toon_pars_fragment:Ph,lights_phong_fragment:Lh,lights_phong_pars_fragment:Dh,lights_physical_fragment:Ih,lights_physical_pars_fragment:Uh,lights_fragment_begin:Nh,lights_fragment_maps:kh,lights_fragment_end:Fh,lightprobes_pars_fragment:Oh,logdepthbuf_fragment:Bh,logdepthbuf_pars_fragment:zh,logdepthbuf_pars_vertex:Hh,logdepthbuf_vertex:Gh,map_fragment:Vh,map_pars_fragment:Wh,map_particle_fragment:Xh,map_particle_pars_fragment:qh,metalnessmap_fragment:Yh,metalnessmap_pars_fragment:$h,morphinstance_vertex:Kh,morphcolor_vertex:jh,morphnormal_vertex:Zh,morphtarget_pars_vertex:Jh,morphtarget_vertex:Qh,normal_fragment_begin:ep,normal_fragment_maps:tp,normal_pars_fragment:np,normal_pars_vertex:ip,normal_vertex:rp,normalmap_pars_fragment:sp,clearcoat_normal_fragment_begin:ap,clearcoat_normal_fragment_maps:op,clearcoat_pars_fragment:lp,iridescence_pars_fragment:cp,opaque_fragment:dp,packing:up,premultiplied_alpha_fragment:fp,project_vertex:hp,dithering_fragment:pp,dithering_pars_fragment:mp,roughnessmap_fragment:gp,roughnessmap_pars_fragment:xp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:vp,shadowmap_vertex:bp,shadowmask_pars_fragment:yp,skinbase_vertex:Sp,skinning_pars_vertex:Mp,skinning_vertex:Ep,skinnormal_vertex:Tp,specularmap_fragment:wp,specularmap_pars_fragment:Ap,tonemapping_fragment:Cp,tonemapping_pars_fragment:Rp,transmission_fragment:Pp,transmission_pars_fragment:Lp,uv_pars_fragment:Dp,uv_pars_vertex:Ip,uv_vertex:Up,worldpos_vertex:Np,background_vert:kp,background_frag:Fp,backgroundCube_vert:Op,backgroundCube_frag:Bp,cube_vert:zp,cube_frag:Hp,depth_vert:Gp,depth_frag:Vp,distance_vert:Wp,distance_frag:Xp,equirect_vert:qp,equirect_frag:Yp,linedashed_vert:$p,linedashed_frag:Kp,meshbasic_vert:jp,meshbasic_frag:Zp,meshlambert_vert:Jp,meshlambert_frag:Qp,meshmatcap_vert:em,meshmatcap_frag:tm,meshnormal_vert:nm,meshnormal_frag:im,meshphong_vert:rm,meshphong_frag:sm,meshphysical_vert:am,meshphysical_frag:om,meshtoon_vert:lm,meshtoon_frag:cm,points_vert:dm,points_frag:um,shadow_vert:fm,shadow_frag:hm,sprite_vert:pm,sprite_frag:mm},de={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},vn={basic:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:zt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:zt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:zt([de.points,de.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:zt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:zt([de.common,de.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:zt([de.sprite,de.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distance:{uniforms:zt([de.common,de.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distance_vert,fragmentShader:Fe.distance_frag},shadow:{uniforms:zt([de.lights,de.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};vn.physical={uniforms:zt([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const xs={r:0,b:0,g:0},gm=new _t,id=new De;id.set(-1,0,0,0,1,0,0,0,1);function xm(n,e,t,i,r,s){const a=new Ke(0);let o=r===!0?0:1,c,l,u=null,f=0,d=null;function p(y){let T=y.isScene===!0?y.background:null;if(T&&T.isTexture){const E=y.backgroundBlurriness>0;T=e.get(T,E)}return T}function x(y){let T=!1;const E=p(y);E===null?m(a,o):E&&E.isColor&&(m(E,1),T=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?t.buffers.color.setClear(0,0,0,1,s):L==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function b(y,T){const E=p(T);E&&(E.isCubeTexture||E.mapping===Ns)?(l===void 0&&(l=new Ht(new ci(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:lr(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(L,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gm.makeRotationFromEuler(T.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(id),l.material.toneMapped=We.getTransfer(E.colorSpace)!==Je,(u!==E||f!==E.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Ht(new mr(2,2),new An({name:"BackgroundMaterial",uniforms:lr(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=We.getTransfer(E.colorSpace)!==Je,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,T){y.getRGB(xs,Jc(n)),t.buffers.color.setClear(xs.r,xs.g,xs.b,T,s)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,T=1){a.set(y),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:x,addToRenderList:b,dispose:h}}function _m(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(A,D,V,W,U){let F=!1;const G=f(A,W,V,D);s!==G&&(s=G,l(s.object)),F=p(A,W,V,U),F&&x(A,W,V,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,E(A,D,V,W),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function u(A){return n.deleteVertexArray(A)}function f(A,D,V,W){const U=W.wireframe===!0;let F=i[D.id];F===void 0&&(F={},i[D.id]=F);const G=A.isInstancedMesh===!0?A.id:0;let Z=F[G];Z===void 0&&(Z={},F[G]=Z);let ee=Z[V.id];ee===void 0&&(ee={},Z[V.id]=ee);let le=ee[U];return le===void 0&&(le=d(c()),ee[U]=le),le}function d(A){const D=[],V=[],W=[];for(let U=0;U<t;U++)D[U]=0,V[U]=0,W[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:V,attributeDivisors:W,object:A,attributes:{},index:null}}function p(A,D,V,W){const U=s.attributes,F=D.attributes;let G=0;const Z=V.getAttributes();for(const ee in Z)if(Z[ee].location>=0){const ge=U[ee];let be=F[ee];if(be===void 0&&(ee==="instanceMatrix"&&A.instanceMatrix&&(be=A.instanceMatrix),ee==="instanceColor"&&A.instanceColor&&(be=A.instanceColor)),ge===void 0||ge.attribute!==be||be&&ge.data!==be.data)return!0;G++}return s.attributesNum!==G||s.index!==W}function x(A,D,V,W){const U={},F=D.attributes;let G=0;const Z=V.getAttributes();for(const ee in Z)if(Z[ee].location>=0){let ge=F[ee];ge===void 0&&(ee==="instanceMatrix"&&A.instanceMatrix&&(ge=A.instanceMatrix),ee==="instanceColor"&&A.instanceColor&&(ge=A.instanceColor));const be={};be.attribute=ge,ge&&ge.data&&(be.data=ge.data),U[ee]=be,G++}s.attributes=U,s.attributesNum=G,s.index=W}function b(){const A=s.newAttributes;for(let D=0,V=A.length;D<V;D++)A[D]=0}function m(A){h(A,0)}function h(A,D){const V=s.newAttributes,W=s.enabledAttributes,U=s.attributeDivisors;V[A]=1,W[A]===0&&(n.enableVertexAttribArray(A),W[A]=1),U[A]!==D&&(n.vertexAttribDivisor(A,D),U[A]=D)}function y(){const A=s.newAttributes,D=s.enabledAttributes;for(let V=0,W=D.length;V<W;V++)D[V]!==A[V]&&(n.disableVertexAttribArray(V),D[V]=0)}function T(A,D,V,W,U,F,G){G===!0?n.vertexAttribIPointer(A,D,V,U,F):n.vertexAttribPointer(A,D,V,W,U,F)}function E(A,D,V,W){b();const U=W.attributes,F=V.getAttributes(),G=D.defaultAttributeValues;for(const Z in F){const ee=F[Z];if(ee.location>=0){let le=U[Z];if(le===void 0&&(Z==="instanceMatrix"&&A.instanceMatrix&&(le=A.instanceMatrix),Z==="instanceColor"&&A.instanceColor&&(le=A.instanceColor)),le!==void 0){const ge=le.normalized,be=le.itemSize,Xe=e.get(le);if(Xe===void 0)continue;const Ze=Xe.buffer,Ie=Xe.type,j=Xe.bytesPerElement,ue=Ie===n.INT||Ie===n.UNSIGNED_INT||le.gpuType===Ro;if(le.isInterleavedBufferAttribute){const te=le.data,we=te.stride,Le=le.offset;if(te.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ee.locationSize;Ce++)h(ee.location+Ce,te.meshPerAttribute);A.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ce=0;Ce<ee.locationSize;Ce++)m(ee.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let Ce=0;Ce<ee.locationSize;Ce++)T(ee.location+Ce,be/ee.locationSize,Ie,ge,we*j,(Le+be/ee.locationSize*Ce)*j,ue)}else{if(le.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)h(ee.location+te,le.meshPerAttribute);A.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let te=0;te<ee.locationSize;te++)m(ee.location+te);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let te=0;te<ee.locationSize;te++)T(ee.location+te,be/ee.locationSize,Ie,ge,be*j,be/ee.locationSize*te*j,ue)}}else if(G!==void 0){const ge=G[Z];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(ee.location,ge);break;case 3:n.vertexAttrib3fv(ee.location,ge);break;case 4:n.vertexAttrib4fv(ee.location,ge);break;default:n.vertexAttrib1fv(ee.location,ge)}}}}y()}function L(){S();for(const A in i){const D=i[A];for(const V in D){const W=D[V];for(const U in W){const F=W[U];for(const G in F)u(F[G].object),delete F[G];delete W[U]}}delete i[A]}}function w(A){if(i[A.id]===void 0)return;const D=i[A.id];for(const V in D){const W=D[V];for(const U in W){const F=W[U];for(const G in F)u(F[G].object),delete F[G];delete W[U]}}delete i[A.id]}function R(A){for(const D in i){const V=i[D];for(const W in V){const U=V[W];if(U[A.id]===void 0)continue;const F=U[A.id];for(const G in F)u(F[G].object),delete F[G];delete U[A.id]}}}function _(A){for(const D in i){const V=i[D],W=A.isInstancedMesh===!0?A.id:0,U=V[W];if(U!==void 0){for(const F in U){const G=U[F];for(const Z in G)u(G[Z].object),delete G[Z];delete U[F]}delete V[W],Object.keys(V).length===0&&delete i[D]}}}function S(){C(),a=!0,s!==r&&(s=r,l(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:S,resetDefaultState:C,dispose:L,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:m,disableUnusedAttributes:y}}function vm(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let p=0;p<u;p++)d+=l[p];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function bm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==dn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Kt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==bn&&!_)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ae("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:x,maxTextureSize:b,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:y,maxVaryings:T,maxFragmentUniforms:E,maxSamples:L,samples:w}}function ym(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new vi,o=new De,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const x=f.clippingPlanes,b=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!r||x===null||x.length===0||s&&!m)s?u(null):l();else{const y=s?0:i,T=y*4;let E=h.clippingState||null;c.value=E,E=u(x,d,T,p);for(let L=0;L!==T;++L)E[L]=t[L];h.clippingState=E,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,x){const b=f!==null?f.length:0;let m=null;if(b!==0){if(m=c.value,x!==!0||m===null){const h=p+b*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<h)&&(m=new Float32Array(h));for(let T=0,E=p;T!==b;++T,E+=4)a.copy(f[T]).applyMatrix4(y,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}const ai=4,$l=[.125,.215,.35,.446,.526,.582],yi=20,Sm=256,Tr=new Vo,Kl=new Ke;let Ta=null,wa=0,Aa=0,Ca=!1;const Mm=new z;class jl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Mm}=s;Ta=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ql(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ta,wa,Aa),this._renderer.xr.enabled=Ca,e.scissorTest=!1,Ki(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ta=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:xt,minFilter:xt,generateMipmaps:!1,type:Xn,format:dn,colorSpace:Cs,depthBuffer:!1},r=Zl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Em(s)),this._blurMaterial=wm(s,e,t),this._ggxMaterial=Tm(s,e,t)}return r}_compileMaterial(e){const t=new Ht(new Yn,e);this._renderer.compile(t,Tr)}_sceneToCubeUV(e,t,i,r,s){const c=new Qt(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(Kl),f.toneMapping=Mn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ht(new ci,new Kc({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let h=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,h=!0):(m.color.copy(Kl),h=!0);for(let T=0;T<6;T++){const E=T%3;E===0?(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[T],s.y,s.z)):E===1?(c.up.set(0,0,l[T]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[T],s.z)):(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[T]));const L=this._cubeSize;Ki(r,E*L,T>2?L:0,L,L),f.setRenderTarget(r),h&&f.render(b,c),f.render(e,c)}f.toneMapping=p,f.autoClear=d,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===wi||e.mapping===ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ql()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Ki(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Tr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=0+l*1.25,p=f*d,{_lodMax:x}=this,b=this._sizeLods[i],m=3*b*(i>x-ai?i-x+ai:0),h=4*(this._cubeSize-b);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=x-t,Ki(s,m,h,3*b,2*b),r.setRenderTarget(s),r.render(o,Tr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=x-i,Ki(e,m,h,3*b,2*b),r.setRenderTarget(e),r.render(o,Tr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&qe("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=l;const d=l.uniforms,p=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*yi-1),b=s/x,m=isFinite(s)?1+Math.floor(u*b):yi;m>yi&&Ae(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${yi}`);const h=[];let y=0;for(let R=0;R<yi;++R){const _=R/b,S=Math.exp(-_*_/2);h.push(S),R===0?y+=S:R<m&&(y+=2*S)}for(let R=0;R<h.length;R++)h[R]=h[R]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:T}=this;d.dTheta.value=x,d.mipInt.value=T-i;const E=this._sizeLods[r],L=3*E*(r>T-ai?r-T+ai:0),w=4*(this._cubeSize-E);Ki(t,L,w,3*E,2*E),c.setRenderTarget(t),c.render(f,Tr)}}function Em(n){const e=[],t=[],i=[];let r=n;const s=n-ai+1+$l.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-ai?c=$l[a-n+ai-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,x=6,b=3,m=2,h=1,y=new Float32Array(b*x*p),T=new Float32Array(m*x*p),E=new Float32Array(h*x*p);for(let w=0;w<p;w++){const R=w%3*2/3-1,_=w>2?0:-1,S=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];y.set(S,b*x*w),T.set(d,m*x*w);const C=[w,w,w,w,w,w];E.set(C,h*x*w)}const L=new Yn;L.setAttribute("position",new Tn(y,b)),L.setAttribute("uv",new Tn(T,m)),L.setAttribute("faceIndex",new Tn(E,h)),i.push(new Ht(L,null)),r>ai&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Zl(n,e,t){const i=new En(n,e,t);return i.texture.mapping=Ns,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ki(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Tm(n,e,t){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Sm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function wm(n,e,t){const i=new Float32Array(yi),r=new z(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Jl(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ql(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Fs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class rd extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new jc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ci(5,5,5),s=new An({name:"CubemapFromEquirect",uniforms:lr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vt,blending:Gn});s.uniforms.tEquirect.value=t;const a=new Ht(r,s),o=t.minFilter;return t.minFilter===Si&&(t.minFilter=xt),new Lf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Am(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===Js||p===Qs)if(e.has(d)){const x=e.get(d).texture;return o(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const b=new rd(x.height);return b.fromEquirectangularTexture(n,d),e.set(d,b),d.addEventListener("dispose",l),o(b.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,x=p===Js||p===Qs,b=p===wi||p===ar;if(x||b){let m=t.get(d);const h=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new jl(n)),m=x?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const y=d.image;return x&&y&&y.height>0||b&&y&&c(y)?(i===null&&(i=new jl(n)),m=x?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,p){return p===Js?d.mapping=wi:p===Qs&&(d.mapping=ar),d}function c(d){let p=0;const x=6;for(let b=0;b<x;b++)d[b]!==void 0&&p++;return p===x}function l(d){const p=d.target;p.removeEventListener("dispose",l);const x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Cm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Mo("WebGLRenderer: "+i+" extension not supported."),r}}}function Rm(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function l(f){const d=[],p=f.index,x=f.attributes.position;let b=0;if(x===void 0)return;if(p!==null){const y=p.array;b=p.version;for(let T=0,E=y.length;T<E;T+=3){const L=y[T+0],w=y[T+1],R=y[T+2];d.push(L,w,w,R,R,L)}}else{const y=x.array;b=x.version;for(let T=0,E=y.length/3-1;T<E;T+=3){const L=T+0,w=T+1,R=T+2;d.push(L,w,w,R,R,L)}}const m=new(x.count>=65535?Yc:qc)(d,1);m.version=b;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Pm(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,d){n.drawElements(i,d,s,f*a),t.update(d,i,1)}function l(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,s,f*a,p),t.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,p);let b=0;for(let m=0;m<p;m++)b+=d[m];t.update(b,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Lm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:qe("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Dm(n,e,t){const i=new WeakMap,r=new mt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let S=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let T=0;p===!0&&(T=1),x===!0&&(T=2),b===!0&&(T=3);let E=o.attributes.position.count*T,L=1;E>e.maxTextureSize&&(L=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const w=new Float32Array(E*L*4*f),R=new Wc(w,E,L,f);R.type=bn,R.needsUpdate=!0;const _=T*4;for(let C=0;C<f;C++){const A=m[C],D=h[C],V=y[C],W=E*L*4*C;for(let U=0;U<A.count;U++){const F=U*_;p===!0&&(r.fromBufferAttribute(A,U),w[W+F+0]=r.x,w[W+F+1]=r.y,w[W+F+2]=r.z,w[W+F+3]=0),x===!0&&(r.fromBufferAttribute(D,U),w[W+F+4]=r.x,w[W+F+5]=r.y,w[W+F+6]=r.z,w[W+F+7]=0),b===!0&&(r.fromBufferAttribute(V,U),w[W+F+8]=r.x,w[W+F+9]=r.y,w[W+F+10]=r.z,w[W+F+11]=V.itemSize===4?r.w:1)}}d={count:f,texture:R,size:new je(E,L)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];const x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Im(n,e,t,i,r){let s=new WeakMap;function a(l){const u=r.render.frame,f=l.geometry,d=e.get(l,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return d}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Um={[Cc]:"LINEAR_TONE_MAPPING",[Rc]:"REINHARD_TONE_MAPPING",[Pc]:"CINEON_TONE_MAPPING",[Lc]:"ACES_FILMIC_TONE_MAPPING",[Ic]:"AGX_TONE_MAPPING",[Uc]:"NEUTRAL_TONE_MAPPING",[Dc]:"CUSTOM_TONE_MAPPING"};function Nm(n,e,t,i,r){const s=new En(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new or(e,t):void 0}),a=new En(e,t,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),o=new Yn;o.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Wn([0,2,0,0,2,0],2));const c=new bf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new Ht(o,c),u=new Vo(-1,1,1,-1,0,1);let f=null,d=null,p=!1,x,b=null,m=[],h=!1;this.setSize=function(y,T){s.setSize(y,T),a.setSize(y,T);for(let E=0;E<m.length;E++){const L=m[E];L.setSize&&L.setSize(y,T)}},this.setEffects=function(y){m=y,h=m.length>0&&m[0].isRenderPass===!0;const T=s.width,E=s.height;for(let L=0;L<m.length;L++){const w=m[L];w.setSize&&w.setSize(T,E)}},this.begin=function(y,T){if(p||y.toneMapping===Mn&&m.length===0)return!1;if(b=T,T!==null){const E=T.width,L=T.height;(s.width!==E||s.height!==L)&&this.setSize(E,L)}return h===!1&&y.setRenderTarget(s),x=y.toneMapping,y.toneMapping=Mn,!0},this.hasRenderPass=function(){return h},this.end=function(y,T){y.toneMapping=x,p=!0;let E=s,L=a;for(let w=0;w<m.length;w++){const R=m[w];if(R.enabled!==!1&&(R.render(y,L,E,T),R.needsSwap!==!1)){const _=E;E=L,L=_}}if(f!==y.outputColorSpace||d!==y.toneMapping){f=y.outputColorSpace,d=y.toneMapping,c.defines={},We.getTransfer(f)===Je&&(c.defines.SRGB_TRANSFER="");const w=Um[d];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,y.setRenderTarget(b),y.render(l,u),b=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const sd=new At,To=new or(1,1),ad=new Wc,od=new ju,ld=new jc,ec=[],tc=[],nc=new Float32Array(16),ic=new Float32Array(9),rc=new Float32Array(4);function gr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ec[r];if(s===void 0&&(s=new Float32Array(r),ec[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ct(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Os(n,e){let t=tc[e];t===void 0&&(t=new Int32Array(e),tc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function km(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function Om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function Bm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function zm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;rc.set(i),n.uniformMatrix2fv(this.addr,!1,rc),Rt(t,i)}}function Hm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;ic.set(i),n.uniformMatrix3fv(this.addr,!1,ic),Rt(t,i)}}function Gm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;nc.set(i),n.uniformMatrix4fv(this.addr,!1,nc),Rt(t,i)}}function Vm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function Ym(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function Km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function Zm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(To.compareFunction=t.isReversedDepthBuffer()?ko:No,s=To):s=sd,t.setTexture2D(e||s,r)}function Jm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||od,r)}function Qm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ld,r)}function eg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||ad,r)}function tg(n){switch(n){case 5126:return km;case 35664:return Fm;case 35665:return Om;case 35666:return Bm;case 35674:return zm;case 35675:return Hm;case 35676:return Gm;case 5124:case 35670:return Vm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return qm;case 5125:return Ym;case 36294:return $m;case 36295:return Km;case 36296:return jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Zm;case 35679:case 36299:case 36307:return Jm;case 35680:case 36300:case 36308:case 36293:return Qm;case 36289:case 36303:case 36311:case 36292:return eg}}function ng(n,e){n.uniform1fv(this.addr,e)}function ig(n,e){const t=gr(e,this.size,2);n.uniform2fv(this.addr,t)}function rg(n,e){const t=gr(e,this.size,3);n.uniform3fv(this.addr,t)}function sg(n,e){const t=gr(e,this.size,4);n.uniform4fv(this.addr,t)}function ag(n,e){const t=gr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function og(n,e){const t=gr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function lg(n,e){const t=gr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function cg(n,e){n.uniform1iv(this.addr,e)}function dg(n,e){n.uniform2iv(this.addr,e)}function ug(n,e){n.uniform3iv(this.addr,e)}function fg(n,e){n.uniform4iv(this.addr,e)}function hg(n,e){n.uniform1uiv(this.addr,e)}function pg(n,e){n.uniform2uiv(this.addr,e)}function mg(n,e){n.uniform3uiv(this.addr,e)}function gg(n,e){n.uniform4uiv(this.addr,e)}function xg(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=To:a=sd;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function _g(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||od,s[a])}function vg(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ld,s[a])}function bg(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Ct(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||ad,s[a])}function yg(n){switch(n){case 5126:return ng;case 35664:return ig;case 35665:return rg;case 35666:return sg;case 35674:return ag;case 35675:return og;case 35676:return lg;case 5124:case 35670:return cg;case 35667:case 35671:return dg;case 35668:case 35672:return ug;case 35669:case 35673:return fg;case 5125:return hg;case 36294:return pg;case 36295:return mg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return vg;case 36289:case 36303:case 36311:case 36292:return bg}}class Sg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=tg(t.type)}}class Mg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yg(t.type)}}class Eg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ra=/(\w+)(\])?(\[|\.)?/g;function sc(n,e){n.seq.push(e),n.map[e.id]=e}function Tg(n,e,t){const i=n.name,r=i.length;for(Ra.lastIndex=0;;){const s=Ra.exec(i),a=Ra.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){sc(t,l===void 0?new Sg(o,n,e):new Mg(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Eg(o),sc(t,f)),t=f}}}class Ms{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Tg(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function ac(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const wg=37297;let Ag=0;function Cg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const oc=new De;function Rg(n){We._getMatrix(oc,We.workingColorSpace,n);const e=`mat3( ${oc.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(n)){case Rs:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function lc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Cg(n.getShaderSource(e),o)}else return s}function Pg(n,e){const t=Rg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Lg={[Cc]:"Linear",[Rc]:"Reinhard",[Pc]:"Cineon",[Lc]:"ACESFilmic",[Ic]:"AgX",[Uc]:"Neutral",[Dc]:"Custom"};function Dg(n,e){const t=Lg[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _s=new z;function Ig(){We.getLuminanceCoefficients(_s);const n=_s.x.toFixed(4),e=_s.y.toFixed(4),t=_s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ug(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pr).join(`
`)}function Ng(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function kg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Pr(n){return n!==""}function cc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Fg=/^[ \t]*#include +<([\w\d./]+)>/gm;function wo(n){return n.replace(Fg,Bg)}const Og=new Map;function Bg(n,e){let t=Fe[e];if(t===void 0){const i=Og.get(e);if(i!==void 0)t=Fe[i],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return wo(t)}const zg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uc(n){return n.replace(zg,Hg)}function Hg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Gg={[Dr]:"SHADOWMAP_TYPE_PCF",[Rr]:"SHADOWMAP_TYPE_VSM"};function Vg(n){return Gg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Wg={[wi]:"ENVMAP_TYPE_CUBE",[ar]:"ENVMAP_TYPE_CUBE",[Ns]:"ENVMAP_TYPE_CUBE_UV"};function Xg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Wg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const qg={[ar]:"ENVMAP_MODE_REFRACTION"};function Yg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":qg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $g={[Ac]:"ENVMAP_BLENDING_MULTIPLY",[pu]:"ENVMAP_BLENDING_MIX",[mu]:"ENVMAP_BLENDING_ADD"};function Kg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":$g[n.combine]||"ENVMAP_BLENDING_NONE"}function jg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Zg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Vg(t),l=Xg(t),u=Yg(t),f=Kg(t),d=jg(t),p=Ug(t),x=Ng(s),b=r.createProgram();let m,h,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Pr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Pr).join(`
`),h.length>0&&(h+=`
`)):(m=[fc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),h=[fc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mn?"#define TONE_MAPPING":"",t.toneMapping!==Mn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Mn?Dg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Pg("linearToOutputTexel",t.outputColorSpace),Ig(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pr).join(`
`)),a=wo(a),a=cc(a,t),a=dc(a,t),o=wo(o),o=cc(o,t),o=dc(o,t),a=uc(a),o=uc(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===bl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const T=y+m+a,E=y+h+o,L=ac(r,r.VERTEX_SHADER,T),w=ac(r,r.FRAGMENT_SHADER,E);r.attachShader(b,L),r.attachShader(b,w),t.index0AttributeName!==void 0?r.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function R(A){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(b)||"",V=r.getShaderInfoLog(L)||"",W=r.getShaderInfoLog(w)||"",U=D.trim(),F=V.trim(),G=W.trim();let Z=!0,ee=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,b,L,w);else{const le=lc(r,L,"vertex"),ge=lc(r,w,"fragment");qe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+U+`
`+le+`
`+ge)}else U!==""?Ae("WebGLProgram: Program Info Log:",U):(F===""||G==="")&&(ee=!1);ee&&(A.diagnostics={runnable:Z,programLog:U,vertexShader:{log:F,prefix:m},fragmentShader:{log:G,prefix:h}})}r.deleteShader(L),r.deleteShader(w),_=new Ms(r,b),S=kg(r,b)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(b,wg)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ag++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=L,this.fragmentShader=w,this}let Jg=0;class Qg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new e0(e),t.set(e,i)),i}}class e0{constructor(e){this.id=Jg++,this.code=e,this.usedTimes=0}}function t0(n){return n===Ai||n===ws||n===As}function n0(n,e,t,i,r,s){const a=new Bo,o=new Qg,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return c.add(_),_===0?"uv":`uv${_}`}function b(_,S,C,A,D,V){const W=A.fog,U=D.geometry,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?A.environment:null,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Z=e.get(_.envMap||F,G),ee=Z&&Z.mapping===Ns?Z.image.height:null,le=p[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&Ae("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const ge=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,be=ge!==void 0?ge.length:0;let Xe=0;U.morphAttributes.position!==void 0&&(Xe=1),U.morphAttributes.normal!==void 0&&(Xe=2),U.morphAttributes.color!==void 0&&(Xe=3);let Ze,Ie,j,ue;if(le){const Ue=vn[le];Ze=Ue.vertexShader,Ie=Ue.fragmentShader}else Ze=_.vertexShader,Ie=_.fragmentShader,o.update(_),j=o.getVertexShaderID(_),ue=o.getFragmentShaderID(_);const te=n.getRenderTarget(),we=n.state.buffers.depth.getReversed(),Le=D.isInstancedMesh===!0,Ce=D.isBatchedMesh===!0,dt=!!_.map,He=!!_.matcap,Qe=!!Z,lt=!!_.aoMap,Be=!!_.lightMap,Tt=!!_.bumpMap,ut=!!_.normalMap,Xt=!!_.displacementMap,I=!!_.emissiveMap,wt=!!_.metalnessMap,Ge=!!_.roughnessMap,st=_.anisotropy>0,ce=_.clearcoat>0,ft=_.dispersion>0,M=_.iridescence>0,g=_.sheen>0,k=_.transmission>0,$=st&&!!_.anisotropyMap,Q=ce&&!!_.clearcoatMap,ne=ce&&!!_.clearcoatNormalMap,oe=ce&&!!_.clearcoatRoughnessMap,q=M&&!!_.iridescenceMap,K=M&&!!_.iridescenceThicknessMap,pe=g&&!!_.sheenColorMap,_e=g&&!!_.sheenRoughnessMap,se=!!_.specularMap,ie=!!_.specularColorMap,Pe=!!_.specularIntensityMap,ke=k&&!!_.transmissionMap,$e=k&&!!_.thicknessMap,P=!!_.gradientMap,re=!!_.alphaMap,Y=_.alphaTest>0,me=!!_.alphaHash,ae=!!_.extensions;let J=Mn;_.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(J=n.toneMapping);const Me={shaderID:le,shaderType:_.type,shaderName:_.name,vertexShader:Ze,fragmentShader:Ie,defines:_.defines,customVertexShaderID:j,customFragmentShaderID:ue,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Ce,batchingColor:Ce&&D._colorsTexture!==null,instancing:Le,instancingColor:Le&&D.instanceColor!==null,instancingMorph:Le&&D.morphTexture!==null,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:We.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:dt,matcap:He,envMap:Qe,envMapMode:Qe&&Z.mapping,envMapCubeUVHeight:ee,aoMap:lt,lightMap:Be,bumpMap:Tt,normalMap:ut,displacementMap:Xt,emissiveMap:I,normalMapObjectSpace:ut&&_.normalMapType===_u,normalMapTangentSpace:ut&&_.normalMapType===So,packedNormalMap:ut&&_.normalMapType===So&&t0(_.normalMap.format),metalnessMap:wt,roughnessMap:Ge,anisotropy:st,anisotropyMap:$,clearcoat:ce,clearcoatMap:Q,clearcoatNormalMap:ne,clearcoatRoughnessMap:oe,dispersion:ft,iridescence:M,iridescenceMap:q,iridescenceThicknessMap:K,sheen:g,sheenColorMap:pe,sheenRoughnessMap:_e,specularMap:se,specularColorMap:ie,specularIntensityMap:Pe,transmission:k,transmissionMap:ke,thicknessMap:$e,gradientMap:P,opaque:_.transparent===!1&&_.blending===er&&_.alphaToCoverage===!1,alphaMap:re,alphaTest:Y,alphaHash:me,combine:_.combine,mapUv:dt&&x(_.map.channel),aoMapUv:lt&&x(_.aoMap.channel),lightMapUv:Be&&x(_.lightMap.channel),bumpMapUv:Tt&&x(_.bumpMap.channel),normalMapUv:ut&&x(_.normalMap.channel),displacementMapUv:Xt&&x(_.displacementMap.channel),emissiveMapUv:I&&x(_.emissiveMap.channel),metalnessMapUv:wt&&x(_.metalnessMap.channel),roughnessMapUv:Ge&&x(_.roughnessMap.channel),anisotropyMapUv:$&&x(_.anisotropyMap.channel),clearcoatMapUv:Q&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:ne&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:K&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:_e&&x(_.sheenRoughnessMap.channel),specularMapUv:se&&x(_.specularMap.channel),specularColorMapUv:ie&&x(_.specularColorMap.channel),specularIntensityMapUv:Pe&&x(_.specularIntensityMap.channel),transmissionMapUv:ke&&x(_.transmissionMap.channel),thicknessMapUv:$e&&x(_.thicknessMap.channel),alphaMapUv:re&&x(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ut||st),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&(dt||re),fog:!!W,useFog:_.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&ut===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:we,skinning:D.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Xe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:J,decodeVideoTexture:dt&&_.map.isVideoTexture===!0&&We.getTransfer(_.map.colorSpace)===Je,decodeVideoTextureEmissive:I&&_.emissiveMap.isVideoTexture===!0&&We.getTransfer(_.emissiveMap.colorSpace)===Je,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Bn,flipSided:_.side===Vt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ae&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&_.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function m(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)S.push(C),S.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(h(S,_),y(S,_),S.push(n.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function h(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function y(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),_.push(a.mask)}function T(_){const S=p[_.type];let C;if(S){const A=vn[S];C=xf.clone(A.uniforms)}else C=_.uniforms;return C}function E(_,S){let C=u.get(S);return C!==void 0?++C.usedTimes:(C=new Zg(n,S,_,r),l.push(C),u.set(S,C)),C}function L(_){if(--_.usedTimes===0){const S=l.indexOf(_);l[S]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function R(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:T,acquireProgram:E,releaseProgram:L,releaseShaderCache:w,programs:l,dispose:R}}function i0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function r0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function hc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function pc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,x,b,m,h){let y=n[e];return y===void 0?(y={id:d.id,object:d,geometry:p,material:x,materialVariant:a(d),groupOrder:b,renderOrder:d.renderOrder,z:m,group:h},n[e]=y):(y.id=d.id,y.object=d,y.geometry=p,y.material=x,y.materialVariant=a(d),y.groupOrder=b,y.renderOrder=d.renderOrder,y.z=m,y.group=h),e++,y}function c(d,p,x,b,m,h){const y=o(d,p,x,b,m,h);x.transmission>0?i.push(y):x.transparent===!0?r.push(y):t.push(y)}function l(d,p,x,b,m,h){const y=o(d,p,x,b,m,h);x.transmission>0?i.unshift(y):x.transparent===!0?r.unshift(y):t.unshift(y)}function u(d,p){t.length>1&&t.sort(d||r0),i.length>1&&i.sort(p||hc),r.length>1&&r.sort(p||hc)}function f(){for(let d=e,p=n.length;d<p;d++){const x=n[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:u}}function s0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new pc,n.set(i,[a])):r>=s.length?(a=new pc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function a0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Ke};break;case"SpotLight":t={position:new z,direction:new z,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function o0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let l0=0;function c0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function d0(n){const e=new a0,t=o0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new z);const r=new z,s=new _t,a=new _t;function o(l){let u=0,f=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,x=0,b=0,m=0,h=0,y=0,T=0,E=0,L=0,w=0,R=0;l.sort(c0);for(let S=0,C=l.length;S<C;S++){const A=l[S],D=A.color,V=A.intensity,W=A.distance;let U=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Ai?U=A.shadow.map.texture:U=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)u+=D.r*V,f+=D.g*V,d+=D.b*V;else if(A.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(A.sh.coefficients[F],V);R++}else if(A.isDirectionalLight){const F=e.get(A);if(F.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const G=A.shadow,Z=t.get(A);Z.shadowIntensity=G.intensity,Z.shadowBias=G.bias,Z.shadowNormalBias=G.normalBias,Z.shadowRadius=G.radius,Z.shadowMapSize=G.mapSize,i.directionalShadow[p]=Z,i.directionalShadowMap[p]=U,i.directionalShadowMatrix[p]=A.shadow.matrix,y++}i.directional[p]=F,p++}else if(A.isSpotLight){const F=e.get(A);F.position.setFromMatrixPosition(A.matrixWorld),F.color.copy(D).multiplyScalar(V),F.distance=W,F.coneCos=Math.cos(A.angle),F.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),F.decay=A.decay,i.spot[b]=F;const G=A.shadow;if(A.map&&(i.spotLightMap[L]=A.map,L++,G.updateMatrices(A),A.castShadow&&w++),i.spotLightMatrix[b]=G.matrix,A.castShadow){const Z=t.get(A);Z.shadowIntensity=G.intensity,Z.shadowBias=G.bias,Z.shadowNormalBias=G.normalBias,Z.shadowRadius=G.radius,Z.shadowMapSize=G.mapSize,i.spotShadow[b]=Z,i.spotShadowMap[b]=U,E++}b++}else if(A.isRectAreaLight){const F=e.get(A);F.color.copy(D).multiplyScalar(V),F.halfWidth.set(A.width*.5,0,0),F.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=F,m++}else if(A.isPointLight){const F=e.get(A);if(F.color.copy(A.color).multiplyScalar(A.intensity),F.distance=A.distance,F.decay=A.decay,A.castShadow){const G=A.shadow,Z=t.get(A);Z.shadowIntensity=G.intensity,Z.shadowBias=G.bias,Z.shadowNormalBias=G.normalBias,Z.shadowRadius=G.radius,Z.shadowMapSize=G.mapSize,Z.shadowCameraNear=G.camera.near,Z.shadowCameraFar=G.camera.far,i.pointShadow[x]=Z,i.pointShadowMap[x]=U,i.pointShadowMatrix[x]=A.shadow.matrix,T++}i.point[x]=F,x++}else if(A.isHemisphereLight){const F=e.get(A);F.skyColor.copy(A.color).multiplyScalar(V),F.groundColor.copy(A.groundColor).multiplyScalar(V),i.hemi[h]=F,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const _=i.hash;(_.directionalLength!==p||_.pointLength!==x||_.spotLength!==b||_.rectAreaLength!==m||_.hemiLength!==h||_.numDirectionalShadows!==y||_.numPointShadows!==T||_.numSpotShadows!==E||_.numSpotMaps!==L||_.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=m,i.point.length=x,i.hemi.length=h,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=E+L-w,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,_.directionalLength=p,_.pointLength=x,_.spotLength=b,_.rectAreaLength=m,_.hemiLength=h,_.numDirectionalShadows=y,_.numPointShadows=T,_.numSpotShadows=E,_.numSpotMaps=L,_.numLightProbes=R,i.version=l0++)}function c(l,u){let f=0,d=0,p=0,x=0,b=0;const m=u.matrixWorldInverse;for(let h=0,y=l.length;h<y;h++){const T=l[h];if(T.isDirectionalLight){const E=i.directional[f];E.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),f++}else if(T.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const E=i.rectArea[x];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),a.identity(),s.copy(T.matrixWorld),s.premultiply(m),a.extractRotation(s),E.halfWidth.set(T.width*.5,0,0),E.halfHeight.set(0,T.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){const E=i.point[d];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const E=i.hemi[b];E.direction.setFromMatrixPosition(T.matrixWorld),E.direction.transformDirection(m),b++}}}return{setup:o,setupView:c,state:i}}function mc(n){const e=new d0(n),t=[],i=[],r=[];function s(d){f.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function c(d){r.push(d)}function l(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function u0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new mc(n),e.set(r,[o])):s>=a.length?(o=new mc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const f0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,p0=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],m0=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],gc=new _t,wr=new z,Pa=new z;function g0(n,e,t){let i=new Ho;const r=new je,s=new je,a=new mt,o=new yf,c=new Sf,l={},u=t.maxTextureSize,f={[oi]:Vt,[Vt]:oi,[Bn]:Bn},d=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:f0,fragmentShader:h0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const x=new Yn;x.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Ht(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dr;let h=this.type;this.render=function(w,R,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Kd&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Dr);const S=n.getRenderTarget(),C=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Gn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const V=h!==this.type;V&&R.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(U=>U.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,U=w.length;W<U;W++){const F=w[W],G=F.shadow;if(G===void 0){Ae("WebGLShadowMap:",F,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const Z=G.getFrameExtents();r.multiply(Z),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,G.mapSize.y=s.y));const ee=n.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ee,G.map===null||V===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Rr){if(F.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new En(r.x,r.y,{format:Ai,type:Xn,minFilter:xt,magFilter:xt,generateMipmaps:!1}),G.map.texture.name=F.name+".shadowMap",G.map.depthTexture=new or(r.x,r.y,bn),G.map.depthTexture.name=F.name+".shadowMapDepth",G.map.depthTexture.format=qn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt}else F.isPointLight?(G.map=new rd(r.x),G.map.depthTexture=new mf(r.x,wn)):(G.map=new En(r.x,r.y),G.map.depthTexture=new or(r.x,r.y,wn)),G.map.depthTexture.name=F.name+".shadowMap",G.map.depthTexture.format=qn,this.type===Dr?(G.map.depthTexture.compareFunction=ee?ko:No,G.map.depthTexture.minFilter=xt,G.map.depthTexture.magFilter=xt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt);G.camera.updateProjectionMatrix()}const le=G.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<le;ge++){if(G.map.isWebGLCubeRenderTarget)n.setRenderTarget(G.map,ge),n.clear();else{ge===0&&(n.setRenderTarget(G.map),n.clear());const be=G.getViewport(ge);a.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),D.viewport(a)}if(F.isPointLight){const be=G.camera,Xe=G.matrix,Ze=F.distance||be.far;Ze!==be.far&&(be.far=Ze,be.updateProjectionMatrix()),wr.setFromMatrixPosition(F.matrixWorld),be.position.copy(wr),Pa.copy(be.position),Pa.add(p0[ge]),be.up.copy(m0[ge]),be.lookAt(Pa),be.updateMatrixWorld(),Xe.makeTranslation(-wr.x,-wr.y,-wr.z),gc.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),G._frustum.setFromProjectionMatrix(gc,be.coordinateSystem,be.reversedDepth)}else G.updateMatrices(F);i=G.getFrustum(),E(R,_,G.camera,F,this.type)}G.isPointLightShadow!==!0&&this.type===Rr&&y(G,_),G.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(S,C,A)};function y(w,R){const _=e.update(b);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new En(r.x,r.y,{format:Ai,type:Xn})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,_,d,b,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,_,p,b,null)}function T(w,R,_,S){let C=null;const A=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)C=A;else if(C=_.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=C.uuid,V=R.uuid;let W=l[D];W===void 0&&(W={},l[D]=W);let U=W[V];U===void 0&&(U=C.clone(),W[V]=U,R.addEventListener("dispose",L)),C=U}if(C.visible=R.visible,C.wireframe=R.wireframe,S===Rr?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:f[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const D=n.properties.get(C);D.light=_}return C}function E(w,R,_,S,C){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&C===Rr)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);const V=e.update(w),W=w.material;if(Array.isArray(W)){const U=V.groups;for(let F=0,G=U.length;F<G;F++){const Z=U[F],ee=W[Z.materialIndex];if(ee&&ee.visible){const le=T(w,ee,S,C);w.onBeforeShadow(n,w,R,_,V,le,Z),n.renderBufferDirect(_,null,V,le,w,Z),w.onAfterShadow(n,w,R,_,V,le,Z)}}}else if(W.visible){const U=T(w,W,S,C);w.onBeforeShadow(n,w,R,_,V,U,null),n.renderBufferDirect(_,null,V,U,w,null),w.onAfterShadow(n,w,R,_,V,U,null)}}const D=w.children;for(let V=0,W=D.length;V<W;V++)E(D[V],R,_,S,C)}function L(w){w.target.removeEventListener("dispose",L);for(const _ in l){const S=l[_],C=w.target.uuid;C in S&&(S[C].dispose(),delete S[C])}}}function x0(n,e){function t(){let P=!1;const re=new mt;let Y=null;const me=new mt(0,0,0,0);return{setMask:function(ae){Y!==ae&&!P&&(n.colorMask(ae,ae,ae,ae),Y=ae)},setLocked:function(ae){P=ae},setClear:function(ae,J,Me,Ue,vt){vt===!0&&(ae*=Ue,J*=Ue,Me*=Ue),re.set(ae,J,Me,Ue),me.equals(re)===!1&&(n.clearColor(ae,J,Me,Ue),me.copy(re))},reset:function(){P=!1,Y=null,me.set(-1,0,0,0)}}}function i(){let P=!1,re=!1,Y=null,me=null,ae=null;return{setReversed:function(J){if(re!==J){const Me=e.get("EXT_clip_control");J?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),re=J;const Ue=ae;ae=null,this.setClear(Ue)}},getReversed:function(){return re},setTest:function(J){J?te(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(J){Y!==J&&!P&&(n.depthMask(J),Y=J)},setFunc:function(J){if(re&&(J=Cu[J]),me!==J){switch(J){case Fa:n.depthFunc(n.NEVER);break;case Oa:n.depthFunc(n.ALWAYS);break;case Ba:n.depthFunc(n.LESS);break;case sr:n.depthFunc(n.LEQUAL);break;case za:n.depthFunc(n.EQUAL);break;case Ha:n.depthFunc(n.GEQUAL);break;case Ga:n.depthFunc(n.GREATER);break;case Va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=J}},setLocked:function(J){P=J},setClear:function(J){ae!==J&&(ae=J,re&&(J=1-J),n.clearDepth(J))},reset:function(){P=!1,Y=null,me=null,ae=null,re=!1}}}function r(){let P=!1,re=null,Y=null,me=null,ae=null,J=null,Me=null,Ue=null,vt=null;return{setTest:function(et){P||(et?te(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(et){re!==et&&!P&&(n.stencilMask(et),re=et)},setFunc:function(et,Dn,mn){(Y!==et||me!==Dn||ae!==mn)&&(n.stencilFunc(et,Dn,mn),Y=et,me=Dn,ae=mn)},setOp:function(et,Dn,mn){(J!==et||Me!==Dn||Ue!==mn)&&(n.stencilOp(et,Dn,mn),J=et,Me=Dn,Ue=mn)},setLocked:function(et){P=et},setClear:function(et){vt!==et&&(n.clearStencil(et),vt=et)},reset:function(){P=!1,re=null,Y=null,me=null,ae=null,J=null,Me=null,Ue=null,vt=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},f={},d={},p=new WeakMap,x=[],b=null,m=!1,h=null,y=null,T=null,E=null,L=null,w=null,R=null,_=new Ke(0,0,0),S=0,C=!1,A=null,D=null,V=null,W=null,U=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Z=0;const ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ee)[1]),G=Z>=1):ee.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),G=Z>=2);let le=null,ge={};const be=n.getParameter(n.SCISSOR_BOX),Xe=n.getParameter(n.VIEWPORT),Ze=new mt().fromArray(be),Ie=new mt().fromArray(Xe);function j(P,re,Y,me){const ae=new Uint8Array(4),J=n.createTexture();n.bindTexture(P,J),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Me=0;Me<Y;Me++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,ae):n.texImage2D(re+Me,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ae);return J}const ue={};ue[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),ue[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ue[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(n.DEPTH_TEST),a.setFunc(sr),Tt(!1),ut(pl),te(n.CULL_FACE),lt(Gn);function te(P){u[P]!==!0&&(n.enable(P),u[P]=!0)}function we(P){u[P]!==!1&&(n.disable(P),u[P]=!1)}function Le(P,re){return d[P]!==re?(n.bindFramebuffer(P,re),d[P]=re,P===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=re),P===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=re),!0):!1}function Ce(P,re){let Y=x,me=!1;if(P){Y=p.get(re),Y===void 0&&(Y=[],p.set(re,Y));const ae=P.textures;if(Y.length!==ae.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let J=0,Me=ae.length;J<Me;J++)Y[J]=n.COLOR_ATTACHMENT0+J;Y.length=ae.length,me=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,me=!0);me&&n.drawBuffers(Y)}function dt(P){return b!==P?(n.useProgram(P),b=P,!0):!1}const He={[bi]:n.FUNC_ADD,[Zd]:n.FUNC_SUBTRACT,[Jd]:n.FUNC_REVERSE_SUBTRACT};He[Qd]=n.MIN,He[eu]=n.MAX;const Qe={[tu]:n.ZERO,[nu]:n.ONE,[iu]:n.SRC_COLOR,[Na]:n.SRC_ALPHA,[cu]:n.SRC_ALPHA_SATURATE,[ou]:n.DST_COLOR,[su]:n.DST_ALPHA,[ru]:n.ONE_MINUS_SRC_COLOR,[ka]:n.ONE_MINUS_SRC_ALPHA,[lu]:n.ONE_MINUS_DST_COLOR,[au]:n.ONE_MINUS_DST_ALPHA,[du]:n.CONSTANT_COLOR,[uu]:n.ONE_MINUS_CONSTANT_COLOR,[fu]:n.CONSTANT_ALPHA,[hu]:n.ONE_MINUS_CONSTANT_ALPHA};function lt(P,re,Y,me,ae,J,Me,Ue,vt,et){if(P===Gn){m===!0&&(we(n.BLEND),m=!1);return}if(m===!1&&(te(n.BLEND),m=!0),P!==jd){if(P!==h||et!==C){if((y!==bi||L!==bi)&&(n.blendEquation(n.FUNC_ADD),y=bi,L=bi),et)switch(P){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ml:n.blendFunc(n.ONE,n.ONE);break;case gl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:qe("WebGLState: Invalid blending: ",P);break}else switch(P){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ml:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case gl:qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xl:qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qe("WebGLState: Invalid blending: ",P);break}T=null,E=null,w=null,R=null,_.set(0,0,0),S=0,h=P,C=et}return}ae=ae||re,J=J||Y,Me=Me||me,(re!==y||ae!==L)&&(n.blendEquationSeparate(He[re],He[ae]),y=re,L=ae),(Y!==T||me!==E||J!==w||Me!==R)&&(n.blendFuncSeparate(Qe[Y],Qe[me],Qe[J],Qe[Me]),T=Y,E=me,w=J,R=Me),(Ue.equals(_)===!1||vt!==S)&&(n.blendColor(Ue.r,Ue.g,Ue.b,vt),_.copy(Ue),S=vt),h=P,C=!1}function Be(P,re){P.side===Bn?we(n.CULL_FACE):te(n.CULL_FACE);let Y=P.side===Vt;re&&(Y=!Y),Tt(Y),P.blending===er&&P.transparent===!1?lt(Gn):lt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const me=P.stencilWrite;o.setTest(me),me&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),I(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(P){A!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),A=P)}function ut(P){P!==Yd?(te(n.CULL_FACE),P!==D&&(P===pl?n.cullFace(n.BACK):P===$d?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),D=P}function Xt(P){P!==V&&(G&&n.lineWidth(P),V=P)}function I(P,re,Y){P?(te(n.POLYGON_OFFSET_FILL),(W!==re||U!==Y)&&(W=re,U=Y,a.getReversed()&&(re=-re),n.polygonOffset(re,Y))):we(n.POLYGON_OFFSET_FILL)}function wt(P){P?te(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function Ge(P){P===void 0&&(P=n.TEXTURE0+F-1),le!==P&&(n.activeTexture(P),le=P)}function st(P,re,Y){Y===void 0&&(le===null?Y=n.TEXTURE0+F-1:Y=le);let me=ge[Y];me===void 0&&(me={type:void 0,texture:void 0},ge[Y]=me),(me.type!==P||me.texture!==re)&&(le!==Y&&(n.activeTexture(Y),le=Y),n.bindTexture(P,re||ue[P]),me.type=P,me.texture=re)}function ce(){const P=ge[le];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ft(){try{n.compressedTexImage2D(...arguments)}catch(P){qe("WebGLState:",P)}}function M(){try{n.compressedTexImage3D(...arguments)}catch(P){qe("WebGLState:",P)}}function g(){try{n.texSubImage2D(...arguments)}catch(P){qe("WebGLState:",P)}}function k(){try{n.texSubImage3D(...arguments)}catch(P){qe("WebGLState:",P)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(P){qe("WebGLState:",P)}}function Q(){try{n.compressedTexSubImage3D(...arguments)}catch(P){qe("WebGLState:",P)}}function ne(){try{n.texStorage2D(...arguments)}catch(P){qe("WebGLState:",P)}}function oe(){try{n.texStorage3D(...arguments)}catch(P){qe("WebGLState:",P)}}function q(){try{n.texImage2D(...arguments)}catch(P){qe("WebGLState:",P)}}function K(){try{n.texImage3D(...arguments)}catch(P){qe("WebGLState:",P)}}function pe(P){return f[P]!==void 0?f[P]:n.getParameter(P)}function _e(P,re){f[P]!==re&&(n.pixelStorei(P,re),f[P]=re)}function se(P){Ze.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),Ze.copy(P))}function ie(P){Ie.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),Ie.copy(P))}function Pe(P,re){let Y=l.get(re);Y===void 0&&(Y=new WeakMap,l.set(re,Y));let me=Y.get(P);me===void 0&&(me=n.getUniformBlockIndex(re,P.name),Y.set(P,me))}function ke(P,re){const me=l.get(re).get(P);c.get(re)!==me&&(n.uniformBlockBinding(re,me,P.__bindingPointIndex),c.set(re,me))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},le=null,ge={},d={},p=new WeakMap,x=[],b=null,m=!1,h=null,y=null,T=null,E=null,L=null,w=null,R=null,_=new Ke(0,0,0),S=0,C=!1,A=null,D=null,V=null,W=null,U=null,Ze.set(0,0,n.canvas.width,n.canvas.height),Ie.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:we,bindFramebuffer:Le,drawBuffers:Ce,useProgram:dt,setBlending:lt,setMaterial:Be,setFlipSided:Tt,setCullFace:ut,setLineWidth:Xt,setPolygonOffset:I,setScissorTest:wt,activeTexture:Ge,bindTexture:st,unbindTexture:ce,compressedTexImage2D:ft,compressedTexImage3D:M,texImage2D:q,texImage3D:K,pixelStorei:_e,getParameter:pe,updateUBOMapping:Pe,uniformBlockBinding:ke,texStorage2D:ne,texStorage3D:oe,texSubImage2D:g,texSubImage3D:k,compressedTexSubImage2D:$,compressedTexSubImage3D:Q,scissor:se,viewport:ie,reset:$e}}function _0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new je,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(M,g){return x?new OffscreenCanvas(M,g):zr("canvas")}function m(M,g,k){let $=1;const Q=ft(M);if((Q.width>k||Q.height>k)&&($=k/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const ne=Math.floor($*Q.width),oe=Math.floor($*Q.height);d===void 0&&(d=b(ne,oe));const q=g?b(ne,oe):d;return q.width=ne,q.height=oe,q.getContext("2d").drawImage(M,0,0,ne,oe),Ae("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ne+"x"+oe+")."),q}else return"data"in M&&Ae("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),M;return M}function h(M){return M.generateMipmaps}function y(M){n.generateMipmap(M)}function T(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(M,g,k,$,Q,ne=!1){if(M!==null){if(n[M]!==void 0)return n[M];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let oe;$&&(oe=e.get("EXT_texture_norm16"),oe||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=g;if(g===n.RED&&(k===n.FLOAT&&(q=n.R32F),k===n.HALF_FLOAT&&(q=n.R16F),k===n.UNSIGNED_BYTE&&(q=n.R8),k===n.UNSIGNED_SHORT&&oe&&(q=oe.R16_EXT),k===n.SHORT&&oe&&(q=oe.R16_SNORM_EXT)),g===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.R8UI),k===n.UNSIGNED_SHORT&&(q=n.R16UI),k===n.UNSIGNED_INT&&(q=n.R32UI),k===n.BYTE&&(q=n.R8I),k===n.SHORT&&(q=n.R16I),k===n.INT&&(q=n.R32I)),g===n.RG&&(k===n.FLOAT&&(q=n.RG32F),k===n.HALF_FLOAT&&(q=n.RG16F),k===n.UNSIGNED_BYTE&&(q=n.RG8),k===n.UNSIGNED_SHORT&&oe&&(q=oe.RG16_EXT),k===n.SHORT&&oe&&(q=oe.RG16_SNORM_EXT)),g===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.RG8UI),k===n.UNSIGNED_SHORT&&(q=n.RG16UI),k===n.UNSIGNED_INT&&(q=n.RG32UI),k===n.BYTE&&(q=n.RG8I),k===n.SHORT&&(q=n.RG16I),k===n.INT&&(q=n.RG32I)),g===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.RGB8UI),k===n.UNSIGNED_SHORT&&(q=n.RGB16UI),k===n.UNSIGNED_INT&&(q=n.RGB32UI),k===n.BYTE&&(q=n.RGB8I),k===n.SHORT&&(q=n.RGB16I),k===n.INT&&(q=n.RGB32I)),g===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),k===n.UNSIGNED_INT&&(q=n.RGBA32UI),k===n.BYTE&&(q=n.RGBA8I),k===n.SHORT&&(q=n.RGBA16I),k===n.INT&&(q=n.RGBA32I)),g===n.RGB&&(k===n.UNSIGNED_SHORT&&oe&&(q=oe.RGB16_EXT),k===n.SHORT&&oe&&(q=oe.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),g===n.RGBA){const K=ne?Rs:We.getTransfer(Q);k===n.FLOAT&&(q=n.RGBA32F),k===n.HALF_FLOAT&&(q=n.RGBA16F),k===n.UNSIGNED_BYTE&&(q=K===Je?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&oe&&(q=oe.RGBA16_EXT),k===n.SHORT&&oe&&(q=oe.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function L(M,g){let k;return M?g===null||g===wn||g===Or?k=n.DEPTH24_STENCIL8:g===bn?k=n.DEPTH32F_STENCIL8:g===Fr&&(k=n.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===wn||g===Or?k=n.DEPTH_COMPONENT24:g===bn?k=n.DEPTH_COMPONENT32F:g===Fr&&(k=n.DEPTH_COMPONENT16),k}function w(M,g){return h(M)===!0||M.isFramebufferTexture&&M.minFilter!==Lt&&M.minFilter!==xt?Math.log2(Math.max(g.width,g.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?g.mipmaps.length:1}function R(M){const g=M.target;g.removeEventListener("dispose",R),S(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&f.delete(g)}function _(M){const g=M.target;g.removeEventListener("dispose",_),A(g)}function S(M){const g=i.get(M);if(g.__webglInit===void 0)return;const k=M.source,$=p.get(k);if($){const Q=$[g.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&C(M),Object.keys($).length===0&&p.delete(k)}i.remove(M)}function C(M){const g=i.get(M);n.deleteTexture(g.__webglTexture);const k=M.source,$=p.get(k);delete $[g.__cacheKey],a.memory.textures--}function A(M){const g=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(g.__webglFramebuffer[$]))for(let Q=0;Q<g.__webglFramebuffer[$].length;Q++)n.deleteFramebuffer(g.__webglFramebuffer[$][Q]);else n.deleteFramebuffer(g.__webglFramebuffer[$]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[$])}else{if(Array.isArray(g.__webglFramebuffer))for(let $=0;$<g.__webglFramebuffer.length;$++)n.deleteFramebuffer(g.__webglFramebuffer[$]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let $=0;$<g.__webglColorRenderbuffer.length;$++)g.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[$]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const k=M.textures;for(let $=0,Q=k.length;$<Q;$++){const ne=i.get(k[$]);ne.__webglTexture&&(n.deleteTexture(ne.__webglTexture),a.memory.textures--),i.remove(k[$])}i.remove(M)}let D=0;function V(){D=0}function W(){return D}function U(M){D=M}function F(){const M=D;return M>=r.maxTextures&&Ae("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),D+=1,M}function G(M){const g=[];return g.push(M.wrapS),g.push(M.wrapT),g.push(M.wrapR||0),g.push(M.magFilter),g.push(M.minFilter),g.push(M.anisotropy),g.push(M.internalFormat),g.push(M.format),g.push(M.type),g.push(M.generateMipmaps),g.push(M.premultiplyAlpha),g.push(M.flipY),g.push(M.unpackAlignment),g.push(M.colorSpace),g.join()}function Z(M,g){const k=i.get(M);if(M.isVideoTexture&&st(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&k.__version!==M.version){const $=M.image;if($===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{we(k,M,g);return}}else M.isExternalTexture&&(k.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+g)}function ee(M,g){const k=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&k.__version!==M.version){we(k,M,g);return}else M.isExternalTexture&&(k.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+g)}function le(M,g){const k=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&k.__version!==M.version){we(k,M,g);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+g)}function ge(M,g){const k=i.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&k.__version!==M.version){Le(k,M,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+g)}const be={[kr]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[Wa]:n.MIRRORED_REPEAT},Xe={[Lt]:n.NEAREST,[gu]:n.NEAREST_MIPMAP_NEAREST,[Zr]:n.NEAREST_MIPMAP_LINEAR,[xt]:n.LINEAR,[ea]:n.LINEAR_MIPMAP_NEAREST,[Si]:n.LINEAR_MIPMAP_LINEAR},Ze={[vu]:n.NEVER,[Eu]:n.ALWAYS,[bu]:n.LESS,[No]:n.LEQUAL,[yu]:n.EQUAL,[ko]:n.GEQUAL,[Su]:n.GREATER,[Mu]:n.NOTEQUAL};function Ie(M,g){if(g.type===bn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===xt||g.magFilter===ea||g.magFilter===Zr||g.magFilter===Si||g.minFilter===xt||g.minFilter===ea||g.minFilter===Zr||g.minFilter===Si)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,be[g.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,be[g.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,be[g.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,Xe[g.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,Xe[g.minFilter]),g.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,Ze[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Lt||g.minFilter!==Zr&&g.minFilter!==Si||g.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(M,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function j(M,g){let k=!1;M.__webglInit===void 0&&(M.__webglInit=!0,g.addEventListener("dispose",R));const $=g.source;let Q=p.get($);Q===void 0&&(Q={},p.set($,Q));const ne=G(g);if(ne!==M.__cacheKey){Q[ne]===void 0&&(Q[ne]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Q[ne].usedTimes++;const oe=Q[M.__cacheKey];oe!==void 0&&(Q[M.__cacheKey].usedTimes--,oe.usedTimes===0&&C(g)),M.__cacheKey=ne,M.__webglTexture=Q[ne].texture}return k}function ue(M,g,k){return Math.floor(Math.floor(M/k)/g)}function te(M,g,k,$){const ne=M.updateRanges;if(ne.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,k,$,g.data);else{ne.sort((_e,se)=>_e.start-se.start);let oe=0;for(let _e=1;_e<ne.length;_e++){const se=ne[oe],ie=ne[_e],Pe=se.start+se.count,ke=ue(ie.start,g.width,4),$e=ue(se.start,g.width,4);ie.start<=Pe+1&&ke===$e&&ue(ie.start+ie.count-1,g.width,4)===ke?se.count=Math.max(se.count,ie.start+ie.count-se.start):(++oe,ne[oe]=ie)}ne.length=oe+1;const q=t.getParameter(n.UNPACK_ROW_LENGTH),K=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let _e=0,se=ne.length;_e<se;_e++){const ie=ne[_e],Pe=Math.floor(ie.start/4),ke=Math.ceil(ie.count/4),$e=Pe%g.width,P=Math.floor(Pe/g.width),re=ke,Y=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(n.UNPACK_SKIP_ROWS,P),t.texSubImage2D(n.TEXTURE_2D,0,$e,P,re,Y,k,$,g.data)}M.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,K),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function we(M,g,k){let $=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&($=n.TEXTURE_3D);const Q=j(M,g),ne=g.source;t.bindTexture($,M.__webglTexture,n.TEXTURE0+k);const oe=i.get(ne);if(ne.version!==oe.__version||Q===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const Y=We.getPrimaries(We.workingColorSpace),me=g.colorSpace===ri?null:We.getPrimaries(g.colorSpace),ae=g.colorSpace===ri||Y===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae)}t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment);let K=m(g.image,!1,r.maxTextureSize);K=ce(g,K);const pe=s.convert(g.format,g.colorSpace),_e=s.convert(g.type);let se=E(g.internalFormat,pe,_e,g.normalized,g.colorSpace,g.isVideoTexture);Ie($,g);let ie;const Pe=g.mipmaps,ke=g.isVideoTexture!==!0,$e=oe.__version===void 0||Q===!0,P=ne.dataReady,re=w(g,K);if(g.isDepthTexture)se=L(g.format===Mi,g.type),$e&&(ke?t.texStorage2D(n.TEXTURE_2D,1,se,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,se,K.width,K.height,0,pe,_e,null));else if(g.isDataTexture)if(Pe.length>0){ke&&$e&&t.texStorage2D(n.TEXTURE_2D,re,se,Pe[0].width,Pe[0].height);for(let Y=0,me=Pe.length;Y<me;Y++)ie=Pe[Y],ke?P&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(n.TEXTURE_2D,Y,se,ie.width,ie.height,0,pe,_e,ie.data);g.generateMipmaps=!1}else ke?($e&&t.texStorage2D(n.TEXTURE_2D,re,se,K.width,K.height),P&&te(g,K,pe,_e)):t.texImage2D(n.TEXTURE_2D,0,se,K.width,K.height,0,pe,_e,K.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){ke&&$e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,se,Pe[0].width,Pe[0].height,K.depth);for(let Y=0,me=Pe.length;Y<me;Y++)if(ie=Pe[Y],g.format!==dn)if(pe!==null)if(ke){if(P)if(g.layerUpdates.size>0){const ae=Yl(ie.width,ie.height,g.format,g.type);for(const J of g.layerUpdates){const Me=ie.data.subarray(J*ae/ie.data.BYTES_PER_ELEMENT,(J+1)*ae/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,J,ie.width,ie.height,1,pe,Me)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,ie.width,ie.height,K.depth,pe,ie.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,se,ie.width,ie.height,K.depth,0,ie.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?P&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,ie.width,ie.height,K.depth,pe,_e,ie.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Y,se,ie.width,ie.height,K.depth,0,pe,_e,ie.data)}else{ke&&$e&&t.texStorage2D(n.TEXTURE_2D,re,se,Pe[0].width,Pe[0].height);for(let Y=0,me=Pe.length;Y<me;Y++)ie=Pe[Y],g.format!==dn?pe!==null?ke?P&&t.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,ie.width,ie.height,pe,ie.data):t.compressedTexImage2D(n.TEXTURE_2D,Y,se,ie.width,ie.height,0,ie.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?P&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(n.TEXTURE_2D,Y,se,ie.width,ie.height,0,pe,_e,ie.data)}else if(g.isDataArrayTexture)if(ke){if($e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,se,K.width,K.height,K.depth),P)if(g.layerUpdates.size>0){const Y=Yl(K.width,K.height,g.format,g.type);for(const me of g.layerUpdates){const ae=K.data.subarray(me*Y/K.data.BYTES_PER_ELEMENT,(me+1)*Y/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,K.width,K.height,1,pe,_e,ae)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,pe,_e,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,se,K.width,K.height,K.depth,0,pe,_e,K.data);else if(g.isData3DTexture)ke?($e&&t.texStorage3D(n.TEXTURE_3D,re,se,K.width,K.height,K.depth),P&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,pe,_e,K.data)):t.texImage3D(n.TEXTURE_3D,0,se,K.width,K.height,K.depth,0,pe,_e,K.data);else if(g.isFramebufferTexture){if($e)if(ke)t.texStorage2D(n.TEXTURE_2D,re,se,K.width,K.height);else{let Y=K.width,me=K.height;for(let ae=0;ae<re;ae++)t.texImage2D(n.TEXTURE_2D,ae,se,Y,me,0,pe,_e,null),Y>>=1,me>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in n){const Y=n.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),K.parentNode!==Y){Y.appendChild(K),f.add(g),Y.onpaint=Ue=>{const vt=Ue.changedElements;for(const et of f)vt.includes(et.image)&&(et.needsUpdate=!0)},Y.requestPaint();return}const me=0,ae=n.RGBA,J=n.RGBA,Me=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,me,ae,J,Me,K),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(ke&&$e){const Y=ft(Pe[0]);t.texStorage2D(n.TEXTURE_2D,re,se,Y.width,Y.height)}for(let Y=0,me=Pe.length;Y<me;Y++)ie=Pe[Y],ke?P&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,pe,_e,ie):t.texImage2D(n.TEXTURE_2D,Y,se,pe,_e,ie);g.generateMipmaps=!1}else if(ke){if($e){const Y=ft(K);t.texStorage2D(n.TEXTURE_2D,re,se,Y.width,Y.height)}P&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,_e,K)}else t.texImage2D(n.TEXTURE_2D,0,se,pe,_e,K);h(g)&&y($),oe.__version=ne.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function Le(M,g,k){if(g.image.length!==6)return;const $=j(M,g),Q=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+k);const ne=i.get(Q);if(Q.version!==ne.__version||$===!0){t.activeTexture(n.TEXTURE0+k);const oe=We.getPrimaries(We.workingColorSpace),q=g.colorSpace===ri?null:We.getPrimaries(g.colorSpace),K=g.colorSpace===ri||oe===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const pe=g.isCompressedTexture||g.image[0].isCompressedTexture,_e=g.image[0]&&g.image[0].isDataTexture,se=[];for(let J=0;J<6;J++)!pe&&!_e?se[J]=m(g.image[J],!0,r.maxCubemapSize):se[J]=_e?g.image[J].image:g.image[J],se[J]=ce(g,se[J]);const ie=se[0],Pe=s.convert(g.format,g.colorSpace),ke=s.convert(g.type),$e=E(g.internalFormat,Pe,ke,g.normalized,g.colorSpace),P=g.isVideoTexture!==!0,re=ne.__version===void 0||$===!0,Y=Q.dataReady;let me=w(g,ie);Ie(n.TEXTURE_CUBE_MAP,g);let ae;if(pe){P&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,$e,ie.width,ie.height);for(let J=0;J<6;J++){ae=se[J].mipmaps;for(let Me=0;Me<ae.length;Me++){const Ue=ae[Me];g.format!==dn?Pe!==null?P?Y&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,Ue.width,Ue.height,Pe,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,$e,Ue.width,Ue.height,0,Ue.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,Ue.width,Ue.height,Pe,ke,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,$e,Ue.width,Ue.height,0,Pe,ke,Ue.data)}}}else{if(ae=g.mipmaps,P&&re){ae.length>0&&me++;const J=ft(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,$e,J.width,J.height)}for(let J=0;J<6;J++)if(_e){P?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,se[J].width,se[J].height,Pe,ke,se[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,se[J].width,se[J].height,0,Pe,ke,se[J].data);for(let Me=0;Me<ae.length;Me++){const vt=ae[Me].image[J].image;P?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,vt.width,vt.height,Pe,ke,vt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,$e,vt.width,vt.height,0,Pe,ke,vt.data)}}else{P?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pe,ke,se[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Pe,ke,se[J]);for(let Me=0;Me<ae.length;Me++){const Ue=ae[Me];P?Y&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,Pe,ke,Ue.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,$e,Pe,ke,Ue.image[J])}}}h(g)&&y(n.TEXTURE_CUBE_MAP),ne.__version=Q.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function Ce(M,g,k,$,Q,ne){const oe=s.convert(k.format,k.colorSpace),q=s.convert(k.type),K=E(k.internalFormat,oe,q,k.normalized,k.colorSpace),pe=i.get(g),_e=i.get(k);if(_e.__renderTarget=g,!pe.__hasExternalTextures){const se=Math.max(1,g.width>>ne),ie=Math.max(1,g.height>>ne);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,ne,K,se,ie,g.depth,0,oe,q,null):t.texImage2D(Q,ne,K,se,ie,0,oe,q,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),Ge(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,Q,_e.__webglTexture,0,wt(g)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,Q,_e.__webglTexture,ne),t.bindFramebuffer(n.FRAMEBUFFER,null)}function dt(M,g,k){if(n.bindRenderbuffer(n.RENDERBUFFER,M),g.depthBuffer){const $=g.depthTexture,Q=$&&$.isDepthTexture?$.type:null,ne=L(g.stencilBuffer,Q),oe=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ge(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,wt(g),ne,g.width,g.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,wt(g),ne,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ne,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,M)}else{const $=g.textures;for(let Q=0;Q<$.length;Q++){const ne=$[Q],oe=s.convert(ne.format,ne.colorSpace),q=s.convert(ne.type),K=E(ne.internalFormat,oe,q,ne.normalized,ne.colorSpace);Ge(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,wt(g),K,g.width,g.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,wt(g),K,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,K,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function He(M,g,k){const $=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(g.depthTexture);if(Q.__renderTarget=g,(!Q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),$){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,g.depthTexture.addEventListener("dispose",R)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,g.depthTexture);const pe=s.convert(g.depthTexture.format),_e=s.convert(g.depthTexture.type);let se;g.depthTexture.format===qn?se=n.DEPTH_COMPONENT24:g.depthTexture.format===Mi&&(se=n.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,se,g.width,g.height,0,pe,_e,null)}}else Z(g.depthTexture,0);const ne=Q.__webglTexture,oe=wt(g),q=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,K=g.depthTexture.format===Mi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===qn)Ge(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,q,ne,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,K,q,ne,0);else if(g.depthTexture.format===Mi)Ge(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,q,ne,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,K,q,ne,0);else throw new Error("Unknown depthTexture format")}function Qe(M){const g=i.get(M),k=M.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==M.depthTexture){const $=M.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),$){const Q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),g.__depthDisposeCallback=Q}g.__boundDepthTexture=$}if(M.depthTexture&&!g.__autoAllocateDepthBuffer)if(k)for(let $=0;$<6;$++)He(g.__webglFramebuffer[$],M,$);else{const $=M.texture.mipmaps;$&&$.length>0?He(g.__webglFramebuffer[0],M,0):He(g.__webglFramebuffer,M,0)}else if(k){g.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[$]),g.__webglDepthbuffer[$]===void 0)g.__webglDepthbuffer[$]=n.createRenderbuffer(),dt(g.__webglDepthbuffer[$],M,!1);else{const Q=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,ne)}}else{const $=M.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),dt(g.__webglDepthbuffer,M,!1);else{const Q=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,ne)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(M,g,k){const $=i.get(M);g!==void 0&&Ce($.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Qe(M)}function Be(M){const g=M.texture,k=i.get(M),$=i.get(g);M.addEventListener("dispose",_);const Q=M.textures,ne=M.isWebGLCubeRenderTarget===!0,oe=Q.length>1;if(oe||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=g.version,a.memory.textures++),ne){k.__webglFramebuffer=[];for(let q=0;q<6;q++)if(g.mipmaps&&g.mipmaps.length>0){k.__webglFramebuffer[q]=[];for(let K=0;K<g.mipmaps.length;K++)k.__webglFramebuffer[q][K]=n.createFramebuffer()}else k.__webglFramebuffer[q]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){k.__webglFramebuffer=[];for(let q=0;q<g.mipmaps.length;q++)k.__webglFramebuffer[q]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(oe)for(let q=0,K=Q.length;q<K;q++){const pe=i.get(Q[q]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),a.memory.textures++)}if(M.samples>0&&Ge(M)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let q=0;q<Q.length;q++){const K=Q[q];k.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[q]);const pe=s.convert(K.format,K.colorSpace),_e=s.convert(K.type),se=E(K.internalFormat,pe,_e,K.normalized,K.colorSpace,M.isXRRenderTarget===!0),ie=wt(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,se,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,k.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),dt(k.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ne){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,g);for(let q=0;q<6;q++)if(g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)Ce(k.__webglFramebuffer[q][K],M,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,K);else Ce(k.__webglFramebuffer[q],M,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);h(g)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let q=0,K=Q.length;q<K;q++){const pe=Q[q],_e=i.get(pe);let se=n.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(se=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,_e.__webglTexture),Ie(se,pe),Ce(k.__webglFramebuffer,M,pe,n.COLOR_ATTACHMENT0+q,se,0),h(pe)&&y(se)}t.unbindTexture()}else{let q=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(q=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(q,$.__webglTexture),Ie(q,g),g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)Ce(k.__webglFramebuffer[K],M,g,n.COLOR_ATTACHMENT0,q,K);else Ce(k.__webglFramebuffer,M,g,n.COLOR_ATTACHMENT0,q,0);h(g)&&y(q),t.unbindTexture()}M.depthBuffer&&Qe(M)}function Tt(M){const g=M.textures;for(let k=0,$=g.length;k<$;k++){const Q=g[k];if(h(Q)){const ne=T(M),oe=i.get(Q).__webglTexture;t.bindTexture(ne,oe),y(ne),t.unbindTexture()}}}const ut=[],Xt=[];function I(M){if(M.samples>0){if(Ge(M)===!1){const g=M.textures,k=M.width,$=M.height;let Q=n.COLOR_BUFFER_BIT;const ne=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(M),q=g.length>1;if(q)for(let pe=0;pe<g.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const K=M.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let pe=0;pe<g.length;pe++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=i.get(g[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,_e,0)}n.blitFramebuffer(0,0,k,$,0,0,k,$,Q,n.NEAREST),c===!0&&(ut.length=0,Xt.length=0,ut.push(n.COLOR_ATTACHMENT0+pe),M.depthBuffer&&M.resolveDepthBuffer===!1&&(ut.push(ne),Xt.push(ne),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Xt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ut))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let pe=0;pe<g.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=i.get(g[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,_e,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&c){const g=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function wt(M){return Math.min(r.maxSamples,M.samples)}function Ge(M){const g=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function st(M){const g=a.render.frame;u.get(M)!==g&&(u.set(M,g),M.update())}function ce(M,g){const k=M.colorSpace,$=M.format,Q=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||k!==Cs&&k!==ri&&(We.getTransfer(k)===Je?($!==dn||Q!==Kt)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qe("WebGLTextures: Unsupported texture color space:",k)),g}function ft(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=V,this.getTextureUnits=W,this.setTextureUnits=U,this.setTexture2D=Z,this.setTexture2DArray=ee,this.setTexture3D=le,this.setTextureCube=ge,this.rebindTextures=lt,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function v0(n,e){function t(i,r=ri){let s;const a=We.getTransfer(r);if(i===Kt)return n.UNSIGNED_BYTE;if(i===Po)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Lo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Oc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Bc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===kc)return n.BYTE;if(i===Fc)return n.SHORT;if(i===Fr)return n.UNSIGNED_SHORT;if(i===Ro)return n.INT;if(i===wn)return n.UNSIGNED_INT;if(i===bn)return n.FLOAT;if(i===Xn)return n.HALF_FLOAT;if(i===zc)return n.ALPHA;if(i===Hc)return n.RGB;if(i===dn)return n.RGBA;if(i===qn)return n.DEPTH_COMPONENT;if(i===Mi)return n.DEPTH_STENCIL;if(i===Gc)return n.RED;if(i===Do)return n.RED_INTEGER;if(i===Ai)return n.RG;if(i===Io)return n.RG_INTEGER;if(i===Uo)return n.RGBA_INTEGER;if(i===vs||i===bs||i===ys||i===Ss)if(a===Je)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===vs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===vs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ys)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ss)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xa||i===qa||i===Ya||i===$a)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Xa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ya)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$a)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ka||i===ja||i===Za||i===Ja||i===Qa||i===ws||i===eo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ka||i===ja)return a===Je?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Za)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ja)return s.COMPRESSED_R11_EAC;if(i===Qa)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ws)return s.COMPRESSED_RG11_EAC;if(i===eo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===to||i===no||i===io||i===ro||i===so||i===ao||i===oo||i===lo||i===co||i===uo||i===fo||i===ho||i===po||i===mo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===to)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===no)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===io)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ro)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===so)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ao)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===oo)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===lo)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===co)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===uo)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fo)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ho)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===po)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===mo)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===go||i===xo||i===_o)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===go)return a===Je?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_o)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===vo||i===bo||i===As||i===yo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===vo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===bo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===As)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Or?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const b0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class S0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Zc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new An({vertexShader:b0,fragmentShader:y0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ht(new mr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class M0 extends Di{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,p=null,x=null;const b=typeof XRWebGLBinding<"u",m=new S0,h={},y=t.getContextAttributes();let T=null,E=null;const L=[],w=[],R=new je;let _=null;const S=new Qt;S.viewport=new mt;const C=new Qt;C.viewport=new mt;const A=[S,C],D=new Df;let V=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ue=L[j];return ue===void 0&&(ue=new aa,L[j]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(j){let ue=L[j];return ue===void 0&&(ue=new aa,L[j]=ue),ue.getGripSpace()},this.getHand=function(j){let ue=L[j];return ue===void 0&&(ue=new aa,L[j]=ue),ue.getHandSpace()};function U(j){const ue=w.indexOf(j.inputSource);if(ue===-1)return;const te=L[ue];te!==void 0&&(te.update(j.inputSource,j.frame,l||a),te.dispatchEvent({type:j.type,data:j.inputSource}))}function F(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",F),r.removeEventListener("inputsourceschange",G);for(let j=0;j<L.length;j++){const ue=w[j];ue!==null&&(w[j]=null,L[j].disconnect(ue))}V=null,W=null,m.reset();for(const j in h)delete h[j];e.setRenderTarget(T),p=null,d=null,f=null,r=null,E=null,Ie.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",F),r.addEventListener("inputsourceschange",G),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,we=null,Le=null;y.depth&&(Le=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=y.stencil?Mi:qn,we=y.stencil?Or:wn);const Ce={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Ce),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new En(d.textureWidth,d.textureHeight,{format:dn,type:Kt,depthTexture:new or(d.textureWidth,d.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new En(p.framebufferWidth,p.framebufferHeight,{format:dn,type:Kt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(j){for(let ue=0;ue<j.removed.length;ue++){const te=j.removed[ue],we=w.indexOf(te);we>=0&&(w[we]=null,L[we].disconnect(te))}for(let ue=0;ue<j.added.length;ue++){const te=j.added[ue];let we=w.indexOf(te);if(we===-1){for(let Ce=0;Ce<L.length;Ce++)if(Ce>=w.length){w.push(te),we=Ce;break}else if(w[Ce]===null){w[Ce]=te,we=Ce;break}if(we===-1)break}const Le=L[we];Le&&Le.connect(te)}}const Z=new z,ee=new z;function le(j,ue,te){Z.setFromMatrixPosition(ue.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const we=Z.distanceTo(ee),Le=ue.projectionMatrix.elements,Ce=te.projectionMatrix.elements,dt=Le[14]/(Le[10]-1),He=Le[14]/(Le[10]+1),Qe=(Le[9]+1)/Le[5],lt=(Le[9]-1)/Le[5],Be=(Le[8]-1)/Le[0],Tt=(Ce[8]+1)/Ce[0],ut=dt*Be,Xt=dt*Tt,I=we/(-Be+Tt),wt=I*-Be;if(ue.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(wt),j.translateZ(I),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Le[10]===-1)j.projectionMatrix.copy(ue.projectionMatrix),j.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const Ge=dt+I,st=He+I,ce=ut-wt,ft=Xt+(we-wt),M=Qe*He/st*Ge,g=lt*He/st*Ge;j.projectionMatrix.makePerspective(ce,ft,M,g,Ge,st),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ge(j,ue){ue===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ue.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ue=j.near,te=j.far;m.texture!==null&&(m.depthNear>0&&(ue=m.depthNear),m.depthFar>0&&(te=m.depthFar)),D.near=C.near=S.near=ue,D.far=C.far=S.far=te,(V!==D.near||W!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),V=D.near,W=D.far),D.layers.mask=j.layers.mask|6,S.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;const we=j.parent,Le=D.cameras;ge(D,we);for(let Ce=0;Ce<Le.length;Ce++)ge(Le[Ce],we);Le.length===2?le(D,S,C):D.projectionMatrix.copy(S.projectionMatrix),be(j,D,we)};function be(j,ue,te){te===null?j.matrix.copy(ue.matrixWorld):(j.matrix.copy(te.matrixWorld),j.matrix.invert(),j.matrix.multiply(ue.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ue.projectionMatrix),j.projectionMatrixInverse.copy(ue.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Hr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(j){return h[j]};let Xe=null;function Ze(j,ue){if(u=ue.getViewerPose(l||a),x=ue,u!==null){const te=u.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let we=!1;te.length!==D.cameras.length&&(D.cameras.length=0,we=!0);for(let He=0;He<te.length;He++){const Qe=te[He];let lt=null;if(p!==null)lt=p.getViewport(Qe);else{const Tt=f.getViewSubImage(d,Qe);lt=Tt.viewport,He===0&&(e.setRenderTargetTextures(E,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(E))}let Be=A[He];Be===void 0&&(Be=new Qt,Be.layers.enable(He),Be.viewport=new mt,A[He]=Be),Be.matrix.fromArray(Qe.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Qe.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(lt.x,lt.y,lt.width,lt.height),He===0&&(D.matrix.copy(Be.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),we===!0&&D.cameras.push(Be)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&b){f=i.getBinding();const He=f.getDepthInformation(te[0]);He&&He.isValid&&He.texture&&m.init(He,r.renderState)}if(Le&&Le.includes("camera-access")&&b){e.state.unbindTexture(),f=i.getBinding();for(let He=0;He<te.length;He++){const Qe=te[He].camera;if(Qe){let lt=h[Qe];lt||(lt=new Zc,h[Qe]=lt);const Be=f.getCameraImage(Qe);lt.sourceTexture=Be}}}}for(let te=0;te<L.length;te++){const we=w[te],Le=L[te];we!==null&&Le!==void 0&&Le.update(we,ue,l||a)}Xe&&Xe(j,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),x=null}const Ie=new nd;Ie.setAnimationLoop(Ze),this.setAnimationLoop=function(j){Xe=j},this.dispose=function(){}}}const E0=new _t,cd=new De;cd.set(-1,0,0,0,1,0,0,0,1);function T0(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Jc(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,y,T,E){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(m,h):h.isMeshLambertMaterial?(s(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,E)):h.isMeshMatcapMaterial?(s(m,h),x(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),b(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?c(m,h,y,T):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Vt&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Vt&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const y=e.get(h),T=y.envMap,E=y.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(E0.makeRotationFromEuler(E)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(cd),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,y,T){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*y,m.scale.value=T*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,y){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Vt&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,h){h.matcap&&(m.matcap.value=h.matcap)}function b(m,h){const y=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function w0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,T){const E=T.program;i.uniformBlockBinding(y,E)}function l(y,T){let E=r[y.id];E===void 0&&(x(y),E=u(y),r[y.id]=E,y.addEventListener("dispose",m));const L=T.program;i.updateUBOMapping(y,L);const w=e.render.frame;s[y.id]!==w&&(d(y),s[y.id]=w)}function u(y){const T=f();y.__bindingPointIndex=T;const E=n.createBuffer(),L=y.__size,w=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,L,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const T=r[y.id],E=y.uniforms,L=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let w=0,R=E.length;w<R;w++){const _=Array.isArray(E[w])?E[w]:[E[w]];for(let S=0,C=_.length;S<C;S++){const A=_[S];if(p(A,w,S,L)===!0){const D=A.__offset,V=Array.isArray(A.value)?A.value:[A.value];let W=0;for(let U=0;U<V.length;U++){const F=V[U],G=b(F);typeof F=="number"||typeof F=="boolean"?(A.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,D+W,A.__data)):F.isMatrix3?(A.__data[0]=F.elements[0],A.__data[1]=F.elements[1],A.__data[2]=F.elements[2],A.__data[3]=0,A.__data[4]=F.elements[3],A.__data[5]=F.elements[4],A.__data[6]=F.elements[5],A.__data[7]=0,A.__data[8]=F.elements[6],A.__data[9]=F.elements[7],A.__data[10]=F.elements[8],A.__data[11]=0):ArrayBuffer.isView(F)?A.__data.set(new F.constructor(F.buffer,F.byteOffset,A.__data.length)):(F.toArray(A.__data,W),W+=G.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,T,E,L){const w=y.value,R=T+"_"+E;if(L[R]===void 0)return typeof w=="number"||typeof w=="boolean"?L[R]=w:ArrayBuffer.isView(w)?L[R]=w.slice():L[R]=w.clone(),!0;{const _=L[R];if(typeof w=="number"||typeof w=="boolean"){if(_!==w)return L[R]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(_.equals(w)===!1)return _.copy(w),!0}}return!1}function x(y){const T=y.uniforms;let E=0;const L=16;for(let R=0,_=T.length;R<_;R++){const S=Array.isArray(T[R])?T[R]:[T[R]];for(let C=0,A=S.length;C<A;C++){const D=S[C],V=Array.isArray(D.value)?D.value:[D.value];for(let W=0,U=V.length;W<U;W++){const F=V[W],G=b(F),Z=E%L,ee=Z%G.boundary,le=Z+ee;E+=ee,le!==0&&L-le<G.storage&&(E+=L-le),D.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=G.storage}}}const w=E%L;return w>0&&(E+=L-w),y.__size=E,y.__cache={},this}function b(y){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",y),T}function m(y){const T=y.target;T.removeEventListener("dispose",m);const E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function h(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:c,update:l,dispose:h}}const A0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _n=null;function C0(){return _n===null&&(_n=new uf(A0,16,16,Ai,Xn),_n.name="DFG_LUT",_n.minFilter=xt,_n.magFilter=xt,_n.wrapS=Hn,_n.wrapT=Hn,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}class R0{constructor(e={}){const{canvas:t=wu(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Kt}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;const b=p,m=new Set([Uo,Io,Do]),h=new Set([Kt,wn,Fr,Or,Po,Lo]),y=new Uint32Array(4),T=new Int32Array(4),E=new z;let L=null,w=null;const R=[],_=[];let S=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let A=!1,D=null;this._outputColorSpace=Jt;let V=0,W=0,U=null,F=-1,G=null;const Z=new mt,ee=new mt;let le=null;const ge=new Ke(0);let be=0,Xe=t.width,Ze=t.height,Ie=1,j=null,ue=null;const te=new mt(0,0,Xe,Ze),we=new mt(0,0,Xe,Ze);let Le=!1;const Ce=new Ho;let dt=!1,He=!1;const Qe=new _t,lt=new z,Be=new mt,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function Xt(){return U===null?Ie:1}let I=i;function wt(v,N){return t.getContext(v,N)}try{const v={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Co}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",Ue,!1),I===null){const N="webgl2";if(I=wt(N,v),I===null)throw wt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw qe("WebGLRenderer: "+v.message),v}let Ge,st,ce,ft,M,g,k,$,Q,ne,oe,q,K,pe,_e,se,ie,Pe,ke,$e,P,re,Y;function me(){Ge=new Cm(I),Ge.init(),P=new v0(I,Ge),st=new bm(I,Ge,e,P),ce=new x0(I,Ge),st.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),ft=new Lm(I),M=new i0,g=new _0(I,Ge,ce,M,st,P,ft),k=new Am(C),$=new Nf(I),re=new _m(I,$),Q=new Rm(I,$,ft,re),ne=new Im(I,Q,$,re,ft),Pe=new Dm(I,st,g),_e=new ym(M),oe=new n0(C,k,Ge,st,re,_e),q=new T0(C,M),K=new s0,pe=new u0(Ge),ie=new xm(C,k,ce,ne,x,c),se=new g0(C,ne,st),Y=new w0(I,ft,st,ce),ke=new vm(I,Ge,ft),$e=new Pm(I,Ge,ft),ft.programs=oe.programs,C.capabilities=st,C.extensions=Ge,C.properties=M,C.renderLists=K,C.shadowMap=se,C.state=ce,C.info=ft}me(),b!==Kt&&(S=new Nm(b,t.width,t.height,r,s));const ae=new M0(C,I);this.xr=ae,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const v=Ge.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ge.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(v){v!==void 0&&(Ie=v,this.setSize(Xe,Ze,!1))},this.getSize=function(v){return v.set(Xe,Ze)},this.setSize=function(v,N,H=!0){if(ae.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}Xe=v,Ze=N,t.width=Math.floor(v*Ie),t.height=Math.floor(N*Ie),H===!0&&(t.style.width=v+"px",t.style.height=N+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,v,N)},this.getDrawingBufferSize=function(v){return v.set(Xe*Ie,Ze*Ie).floor()},this.setDrawingBufferSize=function(v,N,H){Xe=v,Ze=N,Ie=H,t.width=Math.floor(v*H),t.height=Math.floor(N*H),this.setViewport(0,0,v,N)},this.setEffects=function(v){if(b===Kt){qe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let N=0;N<v.length;N++)if(v[N].isOutputPass===!0){Ae("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(Z)},this.getViewport=function(v){return v.copy(te)},this.setViewport=function(v,N,H,O){v.isVector4?te.set(v.x,v.y,v.z,v.w):te.set(v,N,H,O),ce.viewport(Z.copy(te).multiplyScalar(Ie).round())},this.getScissor=function(v){return v.copy(we)},this.setScissor=function(v,N,H,O){v.isVector4?we.set(v.x,v.y,v.z,v.w):we.set(v,N,H,O),ce.scissor(ee.copy(we).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(v){ce.setScissorTest(Le=v)},this.setOpaqueSort=function(v){j=v},this.setTransparentSort=function(v){ue=v},this.getClearColor=function(v){return v.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(v=!0,N=!0,H=!0){let O=0;if(v){let B=!1;if(U!==null){const he=U.texture.format;B=m.has(he)}if(B){const he=U.texture.type,ve=h.has(he),fe=ie.getClearColor(),ye=ie.getClearAlpha(),Ee=fe.r,Ne=fe.g,Oe=fe.b;ve?(y[0]=Ee,y[1]=Ne,y[2]=Oe,y[3]=ye,I.clearBufferuiv(I.COLOR,0,y)):(T[0]=Ee,T[1]=Ne,T[2]=Oe,T[3]=ye,I.clearBufferiv(I.COLOR,0,T))}else O|=I.COLOR_BUFFER_BIT}N&&(O|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(O|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&I.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),D=v},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",Ue,!1),ie.dispose(),K.dispose(),pe.dispose(),M.dispose(),k.dispose(),ne.dispose(),re.dispose(),Y.dispose(),oe.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",rl),ae.removeEventListener("sessionend",sl),hi.stop()};function J(v){v.preventDefault(),Sl("WebGLRenderer: Context Lost."),A=!0}function Me(){Sl("WebGLRenderer: Context Restored."),A=!1;const v=ft.autoReset,N=se.enabled,H=se.autoUpdate,O=se.needsUpdate,B=se.type;me(),ft.autoReset=v,se.enabled=N,se.autoUpdate=H,se.needsUpdate=O,se.type=B}function Ue(v){qe("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function vt(v){const N=v.target;N.removeEventListener("dispose",vt),et(N)}function et(v){Dn(v),M.remove(v)}function Dn(v){const N=M.get(v).programs;N!==void 0&&(N.forEach(function(H){oe.releaseProgram(H)}),v.isShaderMaterial&&oe.releaseShaderCache(v))}this.renderBufferDirect=function(v,N,H,O,B,he){N===null&&(N=Tt);const ve=B.isMesh&&B.matrixWorld.determinant()<0,fe=Dd(v,N,H,O,B);ce.setMaterial(O,ve);let ye=H.index,Ee=1;if(O.wireframe===!0){if(ye=Q.getWireframeAttribute(H),ye===void 0)return;Ee=2}const Ne=H.drawRange,Oe=H.attributes.position;let Te=Ne.start*Ee,tt=(Ne.start+Ne.count)*Ee;he!==null&&(Te=Math.max(Te,he.start*Ee),tt=Math.min(tt,(he.start+he.count)*Ee)),ye!==null?(Te=Math.max(Te,0),tt=Math.min(tt,ye.count)):Oe!=null&&(Te=Math.max(Te,0),tt=Math.min(tt,Oe.count));const bt=tt-Te;if(bt<0||bt===1/0)return;re.setup(B,O,fe,H,ye);let ht,nt=ke;if(ye!==null&&(ht=$.get(ye),nt=$e,nt.setIndex(ht)),B.isMesh)O.wireframe===!0?(ce.setLineWidth(O.wireframeLinewidth*Xt()),nt.setMode(I.LINES)):nt.setMode(I.TRIANGLES);else if(B.isLine){let Ut=O.linewidth;Ut===void 0&&(Ut=1),ce.setLineWidth(Ut*Xt()),B.isLineSegments?nt.setMode(I.LINES):B.isLineLoop?nt.setMode(I.LINE_LOOP):nt.setMode(I.LINE_STRIP)}else B.isPoints?nt.setMode(I.POINTS):B.isSprite&&nt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(Ge.get("WEBGL_multi_draw"))nt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ut=B._multiDrawStarts,xe=B._multiDrawCounts,qt=B._multiDrawCount,Ye=ye?$.get(ye).bytesPerElement:1,jt=M.get(O).currentProgram.getUniforms();for(let gn=0;gn<qt;gn++)jt.setValue(I,"_gl_DrawID",gn),nt.render(Ut[gn]/Ye,xe[gn])}else if(B.isInstancedMesh)nt.renderInstances(Te,bt,B.count);else if(H.isInstancedBufferGeometry){const Ut=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,xe=Math.min(H.instanceCount,Ut);nt.renderInstances(Te,bt,xe)}else nt.render(Te,bt)};function mn(v,N,H){v.transparent===!0&&v.side===Bn&&v.forceSinglePass===!1?(v.side=Vt,v.needsUpdate=!0,jr(v,N,H),v.side=oi,v.needsUpdate=!0,jr(v,N,H),v.side=Bn):jr(v,N,H)}this.compile=function(v,N,H=null){H===null&&(H=v),w=pe.get(H),w.init(N),_.push(w),H.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),v!==H&&v.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),w.setupLights();const O=new Set;return v.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const he=B.material;if(he)if(Array.isArray(he))for(let ve=0;ve<he.length;ve++){const fe=he[ve];mn(fe,H,B),O.add(fe)}else mn(he,H,B),O.add(he)}),w=_.pop(),O},this.compileAsync=function(v,N,H=null){const O=this.compile(v,N,H);return new Promise(B=>{function he(){if(O.forEach(function(ve){M.get(ve).currentProgram.isReady()&&O.delete(ve)}),O.size===0){B(v);return}setTimeout(he,10)}Ge.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Ks=null;function Pd(v){Ks&&Ks(v)}function rl(){hi.stop()}function sl(){hi.start()}const hi=new nd;hi.setAnimationLoop(Pd),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(v){Ks=v,ae.setAnimationLoop(v),v===null?hi.stop():hi.start()},ae.addEventListener("sessionstart",rl),ae.addEventListener("sessionend",sl),this.render=function(v,N){if(N!==void 0&&N.isCamera!==!0){qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;D!==null&&D.renderStart(v,N);const H=ae.enabled===!0&&ae.isPresenting===!0,O=S!==null&&(U===null||H)&&S.begin(C,U);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(N),N=ae.getCamera()),v.isScene===!0&&v.onBeforeRender(C,v,N,U),w=pe.get(v,_.length),w.init(N),w.state.textureUnits=g.getTextureUnits(),_.push(w),Qe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ce.setFromProjectionMatrix(Qe,yn,N.reversedDepth),He=this.localClippingEnabled,dt=_e.init(this.clippingPlanes,He),L=K.get(v,R.length),L.init(),R.push(L),ae.enabled===!0&&ae.isPresenting===!0){const ve=C.xr.getDepthSensingMesh();ve!==null&&js(ve,N,-1/0,C.sortObjects)}js(v,N,0,C.sortObjects),L.finish(),C.sortObjects===!0&&L.sort(j,ue),ut=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,ut&&ie.addToRenderList(L,v),this.info.render.frame++,dt===!0&&_e.beginShadows();const B=w.state.shadowsArray;if(se.render(B,v,N),dt===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset(),(O&&S.hasRenderPass())===!1){const ve=L.opaque,fe=L.transmissive;if(w.setupLights(),N.isArrayCamera){const ye=N.cameras;if(fe.length>0)for(let Ee=0,Ne=ye.length;Ee<Ne;Ee++){const Oe=ye[Ee];ol(ve,fe,v,Oe)}ut&&ie.render(v);for(let Ee=0,Ne=ye.length;Ee<Ne;Ee++){const Oe=ye[Ee];al(L,v,Oe,Oe.viewport)}}else fe.length>0&&ol(ve,fe,v,N),ut&&ie.render(v),al(L,v,N)}U!==null&&W===0&&(g.updateMultisampleRenderTarget(U),g.updateRenderTargetMipmap(U)),O&&S.end(C),v.isScene===!0&&v.onAfterRender(C,v,N),re.resetDefaultState(),F=-1,G=null,_.pop(),_.length>0?(w=_[_.length-1],g.setTextureUnits(w.state.textureUnits),dt===!0&&_e.setGlobalState(C.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?L=R[R.length-1]:L=null,D!==null&&D.renderEnd()};function js(v,N,H,O){if(v.visible===!1)return;if(v.layers.test(N.layers)){if(v.isGroup)H=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(N);else if(v.isLightProbeGrid)w.pushLightProbeGrid(v);else if(v.isLight)w.pushLight(v),v.castShadow&&w.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Ce.intersectsSprite(v)){O&&Be.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Qe);const ve=ne.update(v),fe=v.material;fe.visible&&L.push(v,ve,fe,H,Be.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Ce.intersectsObject(v))){const ve=ne.update(v),fe=v.material;if(O&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Be.copy(v.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Be.copy(ve.boundingSphere.center)),Be.applyMatrix4(v.matrixWorld).applyMatrix4(Qe)),Array.isArray(fe)){const ye=ve.groups;for(let Ee=0,Ne=ye.length;Ee<Ne;Ee++){const Oe=ye[Ee],Te=fe[Oe.materialIndex];Te&&Te.visible&&L.push(v,ve,Te,H,Be.z,Oe)}}else fe.visible&&L.push(v,ve,fe,H,Be.z,null)}}const he=v.children;for(let ve=0,fe=he.length;ve<fe;ve++)js(he[ve],N,H,O)}function al(v,N,H,O){const{opaque:B,transmissive:he,transparent:ve}=v;w.setupLightsView(H),dt===!0&&_e.setGlobalState(C.clippingPlanes,H),O&&ce.viewport(Z.copy(O)),B.length>0&&Kr(B,N,H),he.length>0&&Kr(he,N,H),ve.length>0&&Kr(ve,N,H),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function ol(v,N,H,O){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[O.id]===void 0){const Te=Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[O.id]=new En(1,1,{generateMipmaps:!0,type:Te?Xn:Kt,minFilter:Si,samples:Math.max(4,st.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace})}const he=w.state.transmissionRenderTarget[O.id],ve=O.viewport||Z;he.setSize(ve.z*C.transmissionResolutionScale,ve.w*C.transmissionResolutionScale);const fe=C.getRenderTarget(),ye=C.getActiveCubeFace(),Ee=C.getActiveMipmapLevel();C.setRenderTarget(he),C.getClearColor(ge),be=C.getClearAlpha(),be<1&&C.setClearColor(16777215,.5),C.clear(),ut&&ie.render(H);const Ne=C.toneMapping;C.toneMapping=Mn;const Oe=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),w.setupLightsView(O),dt===!0&&_e.setGlobalState(C.clippingPlanes,O),Kr(v,H,O),g.updateMultisampleRenderTarget(he),g.updateRenderTargetMipmap(he),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let tt=0,bt=N.length;tt<bt;tt++){const ht=N[tt],{object:nt,geometry:Ut,material:xe,group:qt}=ht;if(xe.side===Bn&&nt.layers.test(O.layers)){const Ye=xe.side;xe.side=Vt,xe.needsUpdate=!0,ll(nt,H,O,Ut,xe,qt),xe.side=Ye,xe.needsUpdate=!0,Te=!0}}Te===!0&&(g.updateMultisampleRenderTarget(he),g.updateRenderTargetMipmap(he))}C.setRenderTarget(fe,ye,Ee),C.setClearColor(ge,be),Oe!==void 0&&(O.viewport=Oe),C.toneMapping=Ne}function Kr(v,N,H){const O=N.isScene===!0?N.overrideMaterial:null;for(let B=0,he=v.length;B<he;B++){const ve=v[B],{object:fe,geometry:ye,group:Ee}=ve;let Ne=ve.material;Ne.allowOverride===!0&&O!==null&&(Ne=O),fe.layers.test(H.layers)&&ll(fe,N,H,ye,Ne,Ee)}}function ll(v,N,H,O,B,he){v.onBeforeRender(C,N,H,O,B,he),v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),B.onBeforeRender(C,N,H,O,v,he),B.transparent===!0&&B.side===Bn&&B.forceSinglePass===!1?(B.side=Vt,B.needsUpdate=!0,C.renderBufferDirect(H,N,O,B,v,he),B.side=oi,B.needsUpdate=!0,C.renderBufferDirect(H,N,O,B,v,he),B.side=Bn):C.renderBufferDirect(H,N,O,B,v,he),v.onAfterRender(C,N,H,O,B,he)}function jr(v,N,H){N.isScene!==!0&&(N=Tt);const O=M.get(v),B=w.state.lights,he=w.state.shadowsArray,ve=B.state.version,fe=oe.getParameters(v,B.state,he,N,H,w.state.lightProbeGridArray),ye=oe.getProgramCacheKey(fe);let Ee=O.programs;O.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,O.fog=N.fog;const Ne=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;O.envMap=k.get(v.envMap||O.environment,Ne),O.envMapRotation=O.environment!==null&&v.envMap===null?N.environmentRotation:v.envMapRotation,Ee===void 0&&(v.addEventListener("dispose",vt),Ee=new Map,O.programs=Ee);let Oe=Ee.get(ye);if(Oe!==void 0){if(O.currentProgram===Oe&&O.lightsStateVersion===ve)return dl(v,fe),Oe}else fe.uniforms=oe.getUniforms(v),D!==null&&v.isNodeMaterial&&D.build(v,H,fe),v.onBeforeCompile(fe,C),Oe=oe.acquireProgram(fe,ye),Ee.set(ye,Oe),O.uniforms=fe.uniforms;const Te=O.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Te.clippingPlanes=_e.uniform),dl(v,fe),O.needsLights=Ud(v),O.lightsStateVersion=ve,O.needsLights&&(Te.ambientLightColor.value=B.state.ambient,Te.lightProbe.value=B.state.probe,Te.directionalLights.value=B.state.directional,Te.directionalLightShadows.value=B.state.directionalShadow,Te.spotLights.value=B.state.spot,Te.spotLightShadows.value=B.state.spotShadow,Te.rectAreaLights.value=B.state.rectArea,Te.ltc_1.value=B.state.rectAreaLTC1,Te.ltc_2.value=B.state.rectAreaLTC2,Te.pointLights.value=B.state.point,Te.pointLightShadows.value=B.state.pointShadow,Te.hemisphereLights.value=B.state.hemi,Te.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Te.spotLightMatrix.value=B.state.spotLightMatrix,Te.spotLightMap.value=B.state.spotLightMap,Te.pointShadowMatrix.value=B.state.pointShadowMatrix),O.lightProbeGrid=w.state.lightProbeGridArray.length>0,O.currentProgram=Oe,O.uniformsList=null,Oe}function cl(v){if(v.uniformsList===null){const N=v.currentProgram.getUniforms();v.uniformsList=Ms.seqWithValue(N.seq,v.uniforms)}return v.uniformsList}function dl(v,N){const H=M.get(v);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Ld(v,N){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;E.setFromMatrixPosition(N.matrixWorld);for(let H=0,O=v.length;H<O;H++){const B=v[H];if(B.texture!==null&&B.boundingBox.containsPoint(E))return B}return null}function Dd(v,N,H,O,B){N.isScene!==!0&&(N=Tt),g.resetTextureUnits();const he=N.fog,ve=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?N.environment:null,fe=U===null?C.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:We.workingColorSpace,ye=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Ee=k.get(O.envMap||ve,ye),Ne=O.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Oe=!!H.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Te=!!H.morphAttributes.position,tt=!!H.morphAttributes.normal,bt=!!H.morphAttributes.color;let ht=Mn;O.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ht=C.toneMapping);const nt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ut=nt!==void 0?nt.length:0,xe=M.get(O),qt=w.state.lights;if(dt===!0&&(He===!0||v!==G)){const at=v===G&&O.id===F;_e.setState(O,v,at)}let Ye=!1;O.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==qt.state.version||xe.outputColorSpace!==fe||B.isBatchedMesh&&xe.batching===!1||!B.isBatchedMesh&&xe.batching===!0||B.isBatchedMesh&&xe.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&xe.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&xe.instancing===!1||!B.isInstancedMesh&&xe.instancing===!0||B.isSkinnedMesh&&xe.skinning===!1||!B.isSkinnedMesh&&xe.skinning===!0||B.isInstancedMesh&&xe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&xe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&xe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&xe.instancingMorph===!1&&B.morphTexture!==null||xe.envMap!==Ee||O.fog===!0&&xe.fog!==he||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==_e.numPlanes||xe.numIntersection!==_e.numIntersection)||xe.vertexAlphas!==Ne||xe.vertexTangents!==Oe||xe.morphTargets!==Te||xe.morphNormals!==tt||xe.morphColors!==bt||xe.toneMapping!==ht||xe.morphTargetsCount!==Ut||!!xe.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ye=!0):(Ye=!0,xe.__version=O.version);let jt=xe.currentProgram;Ye===!0&&(jt=jr(O,N,B),D&&O.isNodeMaterial&&D.onUpdateProgram(O,jt,xe));let gn=!1,$n=!1,Ii=!1;const it=jt.getUniforms(),yt=xe.uniforms;if(ce.useProgram(jt.program)&&(gn=!0,$n=!0,Ii=!0),O.id!==F&&(F=O.id,$n=!0),xe.needsLights){const at=Ld(w.state.lightProbeGridArray,B);xe.lightProbeGrid!==at&&(xe.lightProbeGrid=at,$n=!0)}if(gn||G!==v){ce.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),it.setValue(I,"projectionMatrix",v.projectionMatrix),it.setValue(I,"viewMatrix",v.matrixWorldInverse);const jn=it.map.cameraPosition;jn!==void 0&&jn.setValue(I,lt.setFromMatrixPosition(v.matrixWorld)),st.logarithmicDepthBuffer&&it.setValue(I,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&it.setValue(I,"isOrthographic",v.isOrthographicCamera===!0),G!==v&&(G=v,$n=!0,Ii=!0)}if(xe.needsLights&&(qt.state.directionalShadowMap.length>0&&it.setValue(I,"directionalShadowMap",qt.state.directionalShadowMap,g),qt.state.spotShadowMap.length>0&&it.setValue(I,"spotShadowMap",qt.state.spotShadowMap,g),qt.state.pointShadowMap.length>0&&it.setValue(I,"pointShadowMap",qt.state.pointShadowMap,g)),B.isSkinnedMesh){it.setOptional(I,B,"bindMatrix"),it.setOptional(I,B,"bindMatrixInverse");const at=B.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),it.setValue(I,"boneTexture",at.boneTexture,g))}B.isBatchedMesh&&(it.setOptional(I,B,"batchingTexture"),it.setValue(I,"batchingTexture",B._matricesTexture,g),it.setOptional(I,B,"batchingIdTexture"),it.setValue(I,"batchingIdTexture",B._indirectTexture,g),it.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&it.setValue(I,"batchingColorTexture",B._colorsTexture,g));const Kn=H.morphAttributes;if((Kn.position!==void 0||Kn.normal!==void 0||Kn.color!==void 0)&&Pe.update(B,H,jt),($n||xe.receiveShadow!==B.receiveShadow)&&(xe.receiveShadow=B.receiveShadow,it.setValue(I,"receiveShadow",B.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&N.environment!==null&&(yt.envMapIntensity.value=N.environmentIntensity),yt.dfgLUT!==void 0&&(yt.dfgLUT.value=C0()),$n){if(it.setValue(I,"toneMappingExposure",C.toneMappingExposure),xe.needsLights&&Id(yt,Ii),he&&O.fog===!0&&q.refreshFogUniforms(yt,he),q.refreshMaterialUniforms(yt,O,Ie,Ze,w.state.transmissionRenderTarget[v.id]),xe.needsLights&&xe.lightProbeGrid){const at=xe.lightProbeGrid;yt.probesSH.value=at.texture,yt.probesMin.value.copy(at.boundingBox.min),yt.probesMax.value.copy(at.boundingBox.max),yt.probesResolution.value.copy(at.resolution)}Ms.upload(I,cl(xe),yt,g)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ms.upload(I,cl(xe),yt,g),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&it.setValue(I,"center",B.center),it.setValue(I,"modelViewMatrix",B.modelViewMatrix),it.setValue(I,"normalMatrix",B.normalMatrix),it.setValue(I,"modelMatrix",B.matrixWorld),O.uniformsGroups!==void 0){const at=O.uniformsGroups;for(let jn=0,Ui=at.length;jn<Ui;jn++){const ul=at[jn];Y.update(ul,jt),Y.bind(ul,jt)}}return jt}function Id(v,N){v.ambientLightColor.needsUpdate=N,v.lightProbe.needsUpdate=N,v.directionalLights.needsUpdate=N,v.directionalLightShadows.needsUpdate=N,v.pointLights.needsUpdate=N,v.pointLightShadows.needsUpdate=N,v.spotLights.needsUpdate=N,v.spotLightShadows.needsUpdate=N,v.rectAreaLights.needsUpdate=N,v.hemisphereLights.needsUpdate=N}function Ud(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(v,N,H){const O=M.get(v);O.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),M.get(v.texture).__webglTexture=N,M.get(v.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:H,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,N){const H=M.get(v);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0};const Nd=I.createFramebuffer();this.setRenderTarget=function(v,N=0,H=0){U=v,V=N,W=H;let O=null,B=!1,he=!1;if(v){const fe=M.get(v);if(fe.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(I.FRAMEBUFFER,fe.__webglFramebuffer),Z.copy(v.viewport),ee.copy(v.scissor),le=v.scissorTest,ce.viewport(Z),ce.scissor(ee),ce.setScissorTest(le),F=-1;return}else if(fe.__webglFramebuffer===void 0)g.setupRenderTarget(v);else if(fe.__hasExternalTextures)g.rebindTextures(v,M.get(v.texture).__webglTexture,M.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ne=v.depthTexture;if(fe.__boundDepthTexture!==Ne){if(Ne!==null&&M.has(Ne)&&(v.width!==Ne.image.width||v.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");g.setupDepthRenderbuffer(v)}}const ye=v.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(he=!0);const Ee=M.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ee[N])?O=Ee[N][H]:O=Ee[N],B=!0):v.samples>0&&g.useMultisampledRTT(v)===!1?O=M.get(v).__webglMultisampledFramebuffer:Array.isArray(Ee)?O=Ee[H]:O=Ee,Z.copy(v.viewport),ee.copy(v.scissor),le=v.scissorTest}else Z.copy(te).multiplyScalar(Ie).floor(),ee.copy(we).multiplyScalar(Ie).floor(),le=Le;if(H!==0&&(O=Nd),ce.bindFramebuffer(I.FRAMEBUFFER,O)&&ce.drawBuffers(v,O),ce.viewport(Z),ce.scissor(ee),ce.setScissorTest(le),B){const fe=M.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,H)}else if(he){const fe=N;for(let ye=0;ye<v.textures.length;ye++){const Ee=M.get(v.textures[ye]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+ye,Ee.__webglTexture,H,fe)}}else if(v!==null&&H!==0){const fe=M.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,fe.__webglTexture,H)}F=-1},this.readRenderTargetPixels=function(v,N,H,O,B,he,ve,fe=0){if(!(v&&v.isWebGLRenderTarget)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=M.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){ce.bindFramebuffer(I.FRAMEBUFFER,ye);try{const Ee=v.textures[fe],Ne=Ee.format,Oe=Ee.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe),!st.textureFormatReadable(Ne)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!st.textureTypeReadable(Oe)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=v.width-O&&H>=0&&H<=v.height-B&&I.readPixels(N,H,O,B,P.convert(Ne),P.convert(Oe),he)}finally{const Ee=U!==null?M.get(U).__webglFramebuffer:null;ce.bindFramebuffer(I.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(v,N,H,O,B,he,ve,fe=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=M.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye)if(N>=0&&N<=v.width-O&&H>=0&&H<=v.height-B){ce.bindFramebuffer(I.FRAMEBUFFER,ye);const Ee=v.textures[fe],Ne=Ee.format,Oe=Ee.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe),!st.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!st.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.bufferData(I.PIXEL_PACK_BUFFER,he.byteLength,I.STREAM_READ),I.readPixels(N,H,O,B,P.convert(Ne),P.convert(Oe),0);const tt=U!==null?M.get(U).__webglFramebuffer:null;ce.bindFramebuffer(I.FRAMEBUFFER,tt);const bt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Au(I,bt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,he),I.deleteBuffer(Te),I.deleteSync(bt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,N=null,H=0){const O=Math.pow(2,-H),B=Math.floor(v.image.width*O),he=Math.floor(v.image.height*O),ve=N!==null?N.x:0,fe=N!==null?N.y:0;g.setTexture2D(v,0),I.copyTexSubImage2D(I.TEXTURE_2D,H,0,0,ve,fe,B,he),ce.unbindTexture()};const kd=I.createFramebuffer(),Fd=I.createFramebuffer();this.copyTextureToTexture=function(v,N,H=null,O=null,B=0,he=0){let ve,fe,ye,Ee,Ne,Oe,Te,tt,bt;const ht=v.isCompressedTexture?v.mipmaps[he]:v.image;if(H!==null)ve=H.max.x-H.min.x,fe=H.max.y-H.min.y,ye=H.isBox3?H.max.z-H.min.z:1,Ee=H.min.x,Ne=H.min.y,Oe=H.isBox3?H.min.z:0;else{const yt=Math.pow(2,-B);ve=Math.floor(ht.width*yt),fe=Math.floor(ht.height*yt),v.isDataArrayTexture?ye=ht.depth:v.isData3DTexture?ye=Math.floor(ht.depth*yt):ye=1,Ee=0,Ne=0,Oe=0}O!==null?(Te=O.x,tt=O.y,bt=O.z):(Te=0,tt=0,bt=0);const nt=P.convert(N.format),Ut=P.convert(N.type);let xe;N.isData3DTexture?(g.setTexture3D(N,0),xe=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(g.setTexture2DArray(N,0),xe=I.TEXTURE_2D_ARRAY):(g.setTexture2D(N,0),xe=I.TEXTURE_2D),ce.activeTexture(I.TEXTURE0),ce.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),ce.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),ce.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const qt=ce.getParameter(I.UNPACK_ROW_LENGTH),Ye=ce.getParameter(I.UNPACK_IMAGE_HEIGHT),jt=ce.getParameter(I.UNPACK_SKIP_PIXELS),gn=ce.getParameter(I.UNPACK_SKIP_ROWS),$n=ce.getParameter(I.UNPACK_SKIP_IMAGES);ce.pixelStorei(I.UNPACK_ROW_LENGTH,ht.width),ce.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ht.height),ce.pixelStorei(I.UNPACK_SKIP_PIXELS,Ee),ce.pixelStorei(I.UNPACK_SKIP_ROWS,Ne),ce.pixelStorei(I.UNPACK_SKIP_IMAGES,Oe);const Ii=v.isDataArrayTexture||v.isData3DTexture,it=N.isDataArrayTexture||N.isData3DTexture;if(v.isDepthTexture){const yt=M.get(v),Kn=M.get(N),at=M.get(yt.__renderTarget),jn=M.get(Kn.__renderTarget);ce.bindFramebuffer(I.READ_FRAMEBUFFER,at.__webglFramebuffer),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let Ui=0;Ui<ye;Ui++)Ii&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,M.get(v).__webglTexture,B,Oe+Ui),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,M.get(N).__webglTexture,he,bt+Ui)),I.blitFramebuffer(Ee,Ne,ve,fe,Te,tt,ve,fe,I.DEPTH_BUFFER_BIT,I.NEAREST);ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(B!==0||v.isRenderTargetTexture||M.has(v)){const yt=M.get(v),Kn=M.get(N);ce.bindFramebuffer(I.READ_FRAMEBUFFER,kd),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,Fd);for(let at=0;at<ye;at++)Ii?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,yt.__webglTexture,B,Oe+at):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,yt.__webglTexture,B),it?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Kn.__webglTexture,he,bt+at):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Kn.__webglTexture,he),B!==0?I.blitFramebuffer(Ee,Ne,ve,fe,Te,tt,ve,fe,I.COLOR_BUFFER_BIT,I.NEAREST):it?I.copyTexSubImage3D(xe,he,Te,tt,bt+at,Ee,Ne,ve,fe):I.copyTexSubImage2D(xe,he,Te,tt,Ee,Ne,ve,fe);ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else it?v.isDataTexture||v.isData3DTexture?I.texSubImage3D(xe,he,Te,tt,bt,ve,fe,ye,nt,Ut,ht.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(xe,he,Te,tt,bt,ve,fe,ye,nt,ht.data):I.texSubImage3D(xe,he,Te,tt,bt,ve,fe,ye,nt,Ut,ht):v.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,he,Te,tt,ve,fe,nt,Ut,ht.data):v.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,he,Te,tt,ht.width,ht.height,nt,ht.data):I.texSubImage2D(I.TEXTURE_2D,he,Te,tt,ve,fe,nt,Ut,ht);ce.pixelStorei(I.UNPACK_ROW_LENGTH,qt),ce.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ye),ce.pixelStorei(I.UNPACK_SKIP_PIXELS,jt),ce.pixelStorei(I.UNPACK_SKIP_ROWS,gn),ce.pixelStorei(I.UNPACK_SKIP_IMAGES,$n),he===0&&N.generateMipmaps&&I.generateMipmap(xe),ce.unbindTexture()},this.initRenderTarget=function(v){M.get(v).__webglFramebuffer===void 0&&g.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?g.setTextureCube(v,0):v.isData3DTexture?g.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?g.setTexture2DArray(v,0):g.setTexture2D(v,0),ce.unbindTexture()},this.resetState=function(){V=0,W=0,U=null,ce.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}class P0{constructor(e){this.textureLoader=e,this.cache=new Map}async loadTexture(e){return this.cache.has(e)?this.cache.get(e):new Promise((t,i)=>{this.textureLoader.load(e,r=>{this.cache.set(e,r),t(r)},void 0,r=>i(r))})}async loadShelfResources(e){var i,r;console.log(`Caricamento risorse per la mensola: ${(r=(i=e[0])==null?void 0:i.userData)==null?void 0:r.category}`);const t=e.map(async s=>{if(s.userData.coverPath)try{const a=await this.loadTexture(`/${s.userData.coverPath}`);s.material[4].map=a,s.material[4].needsUpdate=!0}catch{console.warn("Impossibile caricare copertina per:",s.userData.title)}});return Promise.all(t)}}const L0=`
.ks-tray {
    position: fixed; right: 24px; bottom: 96px; z-index: 1200;
    transform: translateY(140%); opacity: 0;
    max-width: max(300px, min(36vw, 480px)); padding: 16px 22px 18px;
    border-radius: 26px; box-sizing: border-box;
    transition: transform .55s cubic-bezier(.2,.9,.25,1.15), opacity .4s ease;
    pointer-events: auto;
}
.ks-tray.open { transform: translateY(0); opacity: 1; }
.ks-tray.leaving { transform: translateY(40px); opacity: 0; transition-duration: .5s; }
.ks-tray-head {
    display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
    font-size: 13px; letter-spacing: 1px; text-transform: uppercase; font-weight: 600;
}
.ks-tray-title { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ks-tray-summary { font-size: 12px; opacity: .85; text-transform: none; letter-spacing: 0; }
.ks-tray-skip {
    flex: 0 0 auto; border: 1px solid rgba(255,255,255,.3); background: rgba(255,255,255,.12); color: inherit;
    border-radius: 50px; padding: 5px 12px; font-size: 11px; font-weight: 700; letter-spacing: .5px;
    text-transform: uppercase; cursor: pointer; white-space: nowrap; display: none;
}
.ks-tray-skip:hover { background: rgba(255,255,255,.25); }
.ks-tray.multi .ks-tray-skip { display: inline-block; }
.ks-tray.skipped .ks-tray-skip, .ks-tray.done .ks-tray-skip { display: none; }
.ks-tray-close {
    background: none; border: none; color: inherit; font-size: 20px; line-height: 1;
    cursor: pointer; opacity: .6; padding: 0 2px; display: none;
}
.ks-tray-close:hover { opacity: 1; }
.ks-tray.done .ks-tray-close { display: block; }
.ks-tray-bar { height: 3px; border-radius: 3px; background: rgba(255,255,255,.12); overflow: hidden; margin-top: -6px; margin-bottom: 14px; }
.ks-tray-bar > div { height: 100%; width: 0; background: linear-gradient(90deg, #4da6ff, #d4af37); transition: width .5s ease; }
.ks-shelf {
    display: flex; gap: 18px; overflow-x: auto; padding: 6px 4px 4px;
    scrollbar-width: none; perspective: 900px;
}
.ks-shelf::-webkit-scrollbar { display: none; }

/* --- Il libro --- */
.ks-item { flex: 0 0 auto; width: 108px; perspective: 520px; display: flex; flex-direction: column; align-items: center; gap: 8px;
    animation: ks-drop-in .6s cubic-bezier(.2,.9,.25,1.3) both; }
.ks-item-label { width: 100%; font-size: 11px; text-align: center; line-height: 1.25; opacity: .85;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 28px; }
.ks-item-status { font-size: 10px; letter-spacing: .4px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; text-transform: uppercase; opacity: .65; white-space: nowrap; }

.ks-book { position: relative; width: 82px; height: 120px; transform-style: preserve-3d;
    transform: rotateY(-28deg); transition: transform .6s ease; }
.ks-face { position: absolute; inset: 0; border-radius: 3px 7px 7px 3px; overflow: hidden; backface-visibility: hidden; }
.ks-front {
    background: rgba(255,255,255,.07);
    border: 1.5px dashed rgba(255,255,255,.35);
    box-sizing: border-box;
}
.ks-spine { position: absolute; top: 0; left: 0; width: 14px; height: 100%;
    transform: rotateY(-90deg) translateZ(0); transform-origin: left center;
    background: rgba(255,255,255,.12); border-radius: 3px 0 0 3px; }
.ks-pages { position: absolute; top: 3px; right: -9px; width: 10px; height: calc(100% - 6px);
    background: repeating-linear-gradient(90deg, rgba(255,255,255,.55) 0 1px, rgba(255,255,255,.25) 1px 2px);
    transform: rotateY(90deg); transform-origin: left center; border-radius: 0 2px 2px 0; opacity: .5; }
.ks-shine { position: absolute; inset: 0; pointer-events: none; }
.ks-fill { position: absolute; left: 0; right: 0; bottom: 0; height: 0;
    background: linear-gradient(0deg, rgba(77,166,255,.45), rgba(77,166,255,.12));
    transition: height .35s ease; }
.ks-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    font-size: 26px; opacity: .55; }
.ks-cover-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .5s ease; }
.ks-cover-text { position: absolute; inset: 0; padding: 10px 8px; box-sizing: border-box; display: flex; flex-direction: column;
    justify-content: center; text-align: center; gap: 6px; background: #1a1a1a; color: #d4af37;
    font-family: Georgia, serif; opacity: 0; transition: opacity .5s ease; }
.ks-cover-text b { font-size: 11px; line-height: 1.2; }
.ks-cover-text span { font-size: 9px; color: #ccc; }
.ks-badge { position: absolute; top: -8px; right: -10px; width: 24px; height: 24px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; color: #fff;
    transform: scale(0) translateZ(20px); transition: transform .45s cubic-bezier(.2,.9,.25,1.6); box-shadow: 0 3px 10px rgba(0,0,0,.35); }

.ks-back { transform: rotateY(180deg); background: linear-gradient(135deg, #2b2b2b, #141414);
    border: 1px solid rgba(212,175,55,.35); box-sizing: border-box; border-radius: 7px 3px 3px 7px; }

/* Partito verso lo scaffale: nel vassoio resta solo il posto vuoto */
.ks-item.landed .ks-book { visibility: hidden; }

/* --- Il libro in volo verso lo scaffale --- */
.ks-flyer { position: fixed; left: 0; top: 0; width: 82px; height: 120px; z-index: 1250;
    transform-origin: 0 0; perspective: 520px; pointer-events: none; will-change: transform;
    transition: opacity .28s ease; }
.ks-flyer .ks-book { width: 100%; height: 100%; animation: none !important; transition: none !important;
    transform: rotateY(calc(var(--rot, -28) * 1deg)) !important; }
.ks-flyer .ks-front { border: none; background: transparent; box-shadow: 0 10px 30px rgba(0,0,0,.45); }
.ks-flyer .ks-spine { background: #2a2a2a; }
.ks-flyer .ks-pages { opacity: 1; }
.ks-flyer .ks-cover-img.loaded, .ks-flyer .ks-cover-text.show { opacity: 1; }
.ks-flyer .ks-fill, .ks-flyer .ks-icon, .ks-flyer .ks-badge, .ks-flyer .ks-spark { display: none; }
.ks-flyer.gone { opacity: 0; }
.ks-land-glow { position: fixed; z-index: 1240; pointer-events: none; border-radius: 6px;
    animation: ks-land 0.9s ease-out forwards; }
.ks-land-glow .ks-spark { width: 9px; height: 9px; animation-duration: 1.1s; }
@keyframes ks-land {
    0% { box-shadow: 0 0 0 0 rgba(212,175,55,.95), inset 0 0 40px rgba(255,217,102,.35); }
    100% { box-shadow: 0 0 0 36px rgba(212,175,55,0), inset 0 0 0 rgba(255,217,102,0); }
}

/* In attesa */
.ks-item.queued .ks-book { opacity: .45; }

/* In invio / elaborazione: respira e brilla */
.ks-item.sending .ks-book, .ks-item.processing .ks-book { animation: ks-breathe 2.2s ease-in-out infinite; }
.ks-item.processing .ks-fill { height: 100% !important; animation: ks-pulse-fill 1.6s ease-in-out infinite; }
.ks-item.sending .ks-shine, .ks-item.processing .ks-shine {
    background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%);
    background-size: 250% 100%; animation: ks-shimmer 1.5s linear infinite; }
.ks-item.processing .ks-icon { animation: ks-wiggle 1.2s ease-in-out infinite; }

/* Pronto! */
.ks-item.ready .ks-book { animation: ks-reveal .9s cubic-bezier(.2,.9,.25,1.2) both; }
.ks-item.ready .ks-front { border: none; background: transparent; box-shadow: 0 0 0 0 rgba(212,175,55,.8); animation: ks-glow 1.4s ease-out .5s both; }
.ks-item.ready .ks-spine { background: #2a2a2a; }
.ks-item.ready .ks-pages { opacity: 1; }
.ks-item.ready .ks-fill, .ks-item.ready .ks-icon { opacity: 0; }
.ks-item.ready .ks-cover-img.loaded, .ks-item.ready .ks-cover-text.show { opacity: 1; }
.ks-item.ready .ks-badge { background: #2ecc71; transform: scale(1) translateZ(20px); transition-delay: .55s; }
.ks-item.ready .ks-item-status { color: #7dffb0; opacity: 1; }

/* Già presente / errore */
.ks-item.duplicate .ks-book, .ks-item.error .ks-book { animation: ks-shake .55s ease both; }
.ks-item.duplicate .ks-front { border-color: rgba(240,173,78,.9); background: rgba(240,173,78,.15); }
.ks-item.duplicate .ks-badge { background: #f0ad4e; transform: scale(1) translateZ(20px); }
.ks-item.duplicate .ks-item-status { color: #ffd08a; opacity: 1; }
.ks-item.error .ks-front { border-color: rgba(217,83,79,.9); background: rgba(217,83,79,.18); }
.ks-item.error .ks-badge { background: #d9534f; transform: scale(1) translateZ(20px); }
.ks-item.error .ks-item-status { color: #ff9c99; opacity: 1; }
.ks-item.duplicate .ks-fill, .ks-item.error .ks-fill { opacity: 0; }


/* Scintille */
.ks-spark { position: absolute; left: 50%; top: 45%; width: 6px; height: 6px; border-radius: 50%;
    background: #ffd966; box-shadow: 0 0 8px #ffd966; pointer-events: none;
    animation: ks-spark .9s ease-out forwards; }

@keyframes ks-drop-in { from { opacity: 0; transform: translateY(30px) scale(.85); } to { opacity: 1; transform: none; } }
@keyframes ks-breathe { 0%,100% { transform: rotateY(-28deg) translateY(0); } 50% { transform: rotateY(-18deg) translateY(-5px); } }
@keyframes ks-shimmer { from { background-position: 150% 0; } to { background-position: -100% 0; } }
@keyframes ks-pulse-fill { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
@keyframes ks-wiggle { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes ks-reveal {
    0% { transform: rotateY(-28deg) scale(1); }
    40% { transform: rotateY(-206deg) scale(1.12) translateY(-10px); }
    100% { transform: rotateY(-388deg) scale(1); }
}
@keyframes ks-glow { 0% { box-shadow: 0 0 0 0 rgba(212,175,55,.9); } 100% { box-shadow: 0 0 0 18px rgba(212,175,55,0); } }
@keyframes ks-shake { 0%,100% { transform: rotateY(-28deg) translateX(0); } 20%,60% { transform: rotateY(-28deg) translateX(-6px); } 40%,80% { transform: rotateY(-28deg) translateX(6px); } }
@keyframes ks-spark { to { transform: translate(var(--dx), var(--dy)) scale(.2); opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
    .ks-land-glow { animation: none !important; }
    .ks-item, .ks-book, .ks-fill, .ks-shine, .ks-icon, .ks-front { animation: none !important; }
}
`;let xc=!1;function D0(){if(xc)return;const n=document.createElement("style");n.textContent=L0,document.head.appendChild(n),xc=!0}const I0=n=>new Promise(e=>setTimeout(e,n));function U0(n){return n.replace(/(\.kepub)?\.(epub|kepub|pdf|fb2|fbz|zip|cbz|txt|md|markdown)$/i,"").replace(/\.fb2$/i,"").replace(/[_-]+/g," ").trim()}function _c(n,e=45,t=.45){for(let i=0;i<12;i++){const r=document.createElement("div");r.className="ks-spark";const s=Math.PI*2*i/12,a=e+Math.random()*e*.55;r.style.setProperty("--dx",`${Math.cos(s)*a}px`),r.style.setProperty("--dy",`${Math.sin(s)*a}px`),r.style.animationDelay=`${t+Math.random()*.15}s`,n.appendChild(r),setTimeout(()=>r.remove(),1600)}}class N0{constructor(e,t){this.tray=e,this.state="queued",this.el=document.createElement("div"),this.el.className="ks-item queued",this.el.innerHTML=`
            <div class="ks-book">
                <div class="ks-face ks-front">
                    <div class="ks-fill"></div>
                    <img class="ks-cover-img" alt="">
                    <div class="ks-cover-text"><b></b><span></span></div>
                    <div class="ks-icon">${KS_ICON(/\.cbz$/i.test(t.name)?"image":/\.(pdf|txt|md|markdown)$/i.test(t.name)?"file":"book",26)}</div>
                    <div class="ks-shine"></div>
                </div>
                <div class="ks-face ks-back"></div>
                <div class="ks-spine"></div>
                <div class="ks-pages"></div>
                <div class="ks-badge"></div>
            </div>
            <div class="ks-item-label"></div>
            <div class="ks-item-status"></div>`,this.book=this.el.querySelector(".ks-book"),this.fill=this.el.querySelector(".ks-fill"),this.badge=this.el.querySelector(".ks-badge"),this.label=this.el.querySelector(".ks-item-label"),this.status=this.el.querySelector(".ks-item-status"),this.label.textContent=U0(t.name),this.label.title=t.name,this.setStatus("queued",X("uploadQueued"))}setStatus(e,t){this.el.classList.remove(this.state),this.state=e,this.el.classList.add(e),this.status.textContent=t}sending(e){this.state!=="sending"&&(this.setStatus("sending",X("uploadSending")),this.el.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})),this.fill.style.height=`${Math.round(Math.min(1,e)*100)}%`}processing(){this.setStatus("processing",X("uploadAnalyzing"))}ready(e){e!=null&&e.id&&(this.el.dataset.bookId=e.id);const t=(e==null?void 0:e.title)||this.label.textContent;if(this.label.textContent=t,this.label.title=t,e!=null&&e.coverPath){const i=this.el.querySelector(".ks-cover-img");i.onload=()=>i.classList.add("loaded"),i.onerror=()=>this.showTextCover(t,e.author),i.src=`/${e.coverPath}`}else this.showTextCover(t,e==null?void 0:e.author);this.badge.innerHTML=KS_ICON("check",14),this.setStatus("ready",X("uploadReady")),_c(this.book)}showTextCover(e,t){const i=this.el.querySelector(".ks-cover-text");i.querySelector("b").textContent=e,i.querySelector("span").textContent=t||"",i.classList.add("show")}launch(){const e=this.el.getBoundingClientRect(),t=this.book.offsetWidth,i=this.book.offsetHeight,r={x:e.x+this.book.offsetLeft,y:e.y+this.book.offsetTop,width:t,height:i},s=document.createElement("div");s.className="ks-flyer";const a=this.book.cloneNode(!0);a.querySelectorAll(".ks-spark").forEach(l=>l.remove()),s.appendChild(a),document.body.appendChild(s),this.el.classList.add("landed");const o=(l,u,f,d,p)=>{s.style.transform=`translate(${l}px, ${u}px) scale(${f/t}, ${d/i})`,s.style.setProperty("--rot",p.toFixed(2))};return o(r.x,r.y,t,i,-28),{startRect:r,place:o,land:(l,{instant:u=!1}={})=>{if(u){s.remove();return}if(l){const f=document.createElement("div");f.className="ks-land-glow",Object.assign(f.style,{left:`${l.x}px`,top:`${l.y}px`,width:`${l.width}px`,height:`${l.height}px`}),document.body.appendChild(f),_c(f,Math.max(60,l.width*.45),0),setTimeout(()=>f.remove(),1400)}s.classList.add("gone"),setTimeout(()=>s.remove(),320)}}}landed(){this.el.classList.add("landed")}duplicate(){this.badge.textContent="=",this.setStatus("duplicate",X("uploadDuplicate"))}error(e){this.badge.textContent="!",this.setStatus("error",X("uploadError")),e&&(this.el.title=e)}}class k0{constructor(){D0(),this.items=[],this.el=document.createElement("div"),this.el.className="ks-tray glass-effect",this.el.innerHTML=`
            <div class="ks-tray-head">
                <span class="ks-tray-title"></span>
                <span class="ks-tray-summary"></span>
                <button class="ks-tray-skip" type="button"></button>
                <button class="ks-tray-close" aria-label="Close">&times;</button>
            </div>
            <div class="ks-tray-bar"><div></div></div>
            <div class="ks-shelf"></div>`,this.title=this.el.querySelector(".ks-tray-title"),this.summary=this.el.querySelector(".ks-tray-summary"),this.bar=this.el.querySelector(".ks-tray-bar > div"),this.shelf=this.el.querySelector(".ks-shelf"),this.closed=new Promise(e=>{this.resolveClosed=e}),this.el.querySelector(".ks-tray-close").addEventListener("click",()=>this.close()),this.skipBtn=this.el.querySelector(".ks-tray-skip"),this.skipBtn.innerHTML=KS_ICON("skip",12)+" "+X("uploadSkip"),this.skipHandlers=[],this.skipBtn.addEventListener("click",()=>{this.el.classList.add("skipped"),this.skipHandlers.forEach(e=>e())}),document.body.appendChild(this.el),requestAnimationFrame(()=>requestAnimationFrame(()=>this.el.classList.add("open")))}onSkip(e){this.skipHandlers.push(e)}add(e){const t=new N0(this,e);return this.items.push(t),this.shelf.appendChild(t.el),this.el.classList.toggle("multi",this.items.length>1),t.el.style.animationDelay=`${Math.min(this.items.length,8)*.06}s`,this.progress(0),t}progress(e){const t=this.items.length;this.title.textContent=X("uploadTrayTitle").replace("{done}",e).replace("{total}",t),this.bar.style.width=`${t?e/t*100:0}%`}async finish({added:e,duplicates:t,errors:i}){const r=[`${KS_ICON("check",13)} ${e}`];return t&&r.push(`${KS_ICON("alert",13)} ${t}`),i&&r.push(`${KS_ICON("x",13)} ${i}`),this.summary.innerHTML=r.join("  ·  "),this.title.textContent=X("uploadComplete"),this.el.classList.add("done"),await I0(1300),t||i?setTimeout(()=>this.close(),7e3):this.close(),this.closed}close(){this.closing||(this.closing=!0,this.el.classList.add("leaving"),setTimeout(()=>{this.el.remove(),this.resolveClosed()},550))}}function F0(n,{offline:e=!1}={},t=()=>{}){return new Promise((i,r)=>{const s=new XMLHttpRequest,a=new FormData;e&&a.append("offline","1"),a.append("ebook",n),s.open("POST","/api/upload"),s.responseType="json",s.upload.onprogress=o=>{o.lengthComputable&&t(o.loaded/o.total)},s.upload.onload=()=>t(1,!0),s.onload=()=>i(s.response||{success:!1}),s.onerror=()=>r(new Error("network")),s.send(a)})}const O0=220,B0=1250,vc=.85,z0=1.35;function H0(n,{capture:e,onCaptured:t}={}){return new Promise(i=>{const r=window.innerWidth,s=window.innerHeight,a=window.devicePixelRatio||1,o=Math.max(0,Math.round(n.x)),c=Math.max(0,Math.round(n.y)),l=Math.max(1,Math.min(r-o,Math.round(n.width))),u=Math.max(1,Math.min(s-c,Math.round(n.height))),f=document.createElement("canvas");f.width=l,f.height=u;const d=e(),p=d.width/r;f.getContext("2d").drawImage(d,o*p,c*p,l*p,u*p,0,0,l,u);const x=document.createElement("canvas");x.id="ks-dissolve-canvas",Object.assign(x.style,{position:"fixed",inset:"0",width:"100vw",height:"100vh",zIndex:"1500",pointerEvents:"none"}),x.width=Math.round(r*a),x.height=Math.round(s*a),document.body.appendChild(x);const b=x.getContext("2d");b.scale(a,a),b.drawImage(f,o,c),t&&t();const m=Math.max(4,Math.round(Math.min(l,u)/42)),h=[];for(let E=0;E<u;E+=m)for(let L=0;L<l;L+=m){const w=L/l,R=E/u;h.push({sx:L,sy:E,w:Math.min(m,l-L),h:Math.min(m,u-E),delay:((1-w)*.82+R*.18+(Math.random()-.5)*.16)*B0,life:vc+Math.random()*(z0-vc),vx:40+Math.random()*70,vy:-(20+Math.random()*60),ax:160+Math.random()*180,ay:-(40+Math.random()*90),spin:(Math.random()-.5)*9,wobble:Math.random()*Math.PI*2})}const y=performance.now(),T=E=>{const L=E-y-O0;b.clearRect(0,0,r,s);let w=0;for(const R of h){const _=(L-R.delay)/1e3;if(_<0){b.drawImage(f,R.sx,R.sy,R.w,R.h,o+R.sx,c+R.sy,R.w,R.h),w++;continue}const S=_/R.life;if(S>=1)continue;w++;const C=o+R.sx+R.vx*_+.5*R.ax*_*_,A=c+R.sy+R.vy*_+.5*R.ay*_*_+Math.sin(R.wobble+_*7)*6*_,D=1-.7*S;b.save(),b.globalAlpha=Math.pow(1-S,1.3),b.translate(C+R.w/2,A+R.h/2),b.rotate(R.spin*_),b.scale(D,D),b.drawImage(f,R.sx,R.sy,R.w,R.h,-R.w/2,-R.h/2,R.w,R.h),b.globalCompositeOperation="source-atop",b.fillStyle=`rgba(190, 178, 160, ${Math.min(.85,S*1.4)})`,b.fillRect(-R.w/2,-R.h/2,R.w,R.h),b.restore()}if(w>0||L<0)return requestAnimationFrame(T);x.remove(),i()};requestAnimationFrame(T)})}function G0(){const n=document.createElement("div");n.id="help-modal-overlay",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100vh",n.style.background="rgba(0,0,0,0.7)",n.style.zIndex="2000",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.backdropFilter="blur(5px)",n.style.opacity="0",n.style.transition="opacity 0.3s ease";const e=document.createElement("div");e.className="glass-effect help-modal-content",e.style.background="rgba(30, 30, 30, 0.85)",e.style.padding="35px",e.style.borderRadius="20px",e.style.maxWidth="700px",e.style.width="90%",e.style.maxHeight="80vh",e.style.overflowY="auto",e.style.color="white",e.style.border="1px solid rgba(255,255,255,0.2)",e.style.boxShadow="0 20px 45px rgba(0,0,0,0.6)",e.innerHTML=`
        <h2 style="margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; text-align: center; font-family: sans-serif;">
            ${X("helpTitle")}
        </h2>
        <ul style="line-height: 1.8; padding-left: 20px; font-family: sans-serif; font-size: 14.5px;">
            ${X("helpContent")}
        </ul>
        <button id="close-help-btn" class="modern-btn glass-effect" style="width: 100%; margin-top: 25px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);">
            ${X("helpClose")}
        </button>
    `,(window.__KORESHELF_DESKTOP__||window.__KORESHELF_SERVER__)&&e.querySelectorAll("li").forEach(r=>{r.querySelector('b[style*="d9534f"]')&&r.remove()});const t=document.createElement("style");t.innerHTML=`
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
    `,document.head.appendChild(t),n.appendChild(e),document.body.appendChild(n),setTimeout(()=>n.style.opacity="1",10);const i=()=>{n.style.opacity="0",setTimeout(()=>{n.remove(),t.remove()},300)};document.getElementById("close-help-btn").onclick=i,n.onclick=r=>{r.target===n&&i()}}async function V0(n,e){const t=document.body.style.overflow;document.body.style.overflow="hidden";const i=document.createElement("div");i.id="metadata-manager-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100vw",i.style.height="100vh",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="2000",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.backdropFilter="blur(5px)",i.style.opacity="0",i.style.transition="opacity 0.3s ease";let r=[];try{const f=await(await fetch("/api/books")).json();r=[...new Set(f.map(d=>d.tags&&d.tags.length>0?d.tags[0]:X("uncategorized")))].filter(d=>d!==X("uncategorized")&&d!=="Senza Categoria")}catch(u){console.error("Errore nel caricamento delle categorie",u)}const s=document.createElement("div");s.className="glass-effect custom-scrollbar",s.style.background="rgba(30, 30, 30, 0.85)",s.style.padding="30px",s.style.borderRadius="20px",s.style.maxWidth="500px",s.style.width="90%",s.style.maxHeight="90vh",s.style.overflowY="auto",s.style.color="white",s.style.border="1px solid rgba(255,255,255,0.2)";const a=n.category||X("uncategorized");s.innerHTML=`
        <h2 style="margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; font-family: sans-serif;">
            ${X("editMetadataTitle")||"Modifica Metadati"}
        </h2>
        
        <form id="metadata-form" style="display: flex; flex-direction: column; gap: 15px; font-family: sans-serif;">
            
            <div>
                <label style="font-size: 14px; color: #ccc;">${X("editTitle")||"Titolo"}</label>
                <input type="text" id="meta-title" value="${n.title||""}" required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${X("editAuthor")||"Autore"}</label>
                <input type="text" id="meta-author" value="${n.author||""}" required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${X("editCategory")||"Categoria"}</label>
                
                <input type="text" id="meta-category" value="${a}" 
                    ${r.length>0?'list="meta-category-list"':""}
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
                
                ${r.length>0?`
                <datalist id="meta-category-list">
                    ${r.map(u=>`<option value="${u}">`).join("")}
                </datalist>
                `:""}
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${X("editDescription")||"Descrizione"}</label>
                <textarea id="meta-desc" rows="4" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; resize: vertical; box-sizing: border-box;">${n.description||""}</textarea>
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc; display: block; margin-bottom: 5px;">${X("editCover")||"Nuova Copertina (Opzionale)"}</label>
                <input type="file" id="meta-cover" accept="image/png, image/jpeg, image/webp" style="display: none;">
                <label for="meta-cover" id="meta-cover-preview" style="display: block; width: 100%; padding: 12px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.4); background: rgba(0,0,0,0.3); color: #aaa; text-align: center; cursor: pointer; box-sizing: border-box; transition: all 0.3s; font-size: 13px;">
                    ${X("clickToChooseFile")||"Clicca per scegliere un file…"}
                </label>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button type="button" id="meta-cancel-btn" class="modern-btn glass-effect" style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); box-sizing: border-box;">${X("cancelBtn")||"Annulla"}</button>
                <button type="submit" id="meta-save-btn" class="modern-btn glass-effect" style="flex: 1; background: rgba(100, 200, 100, 0.3); border: 1px solid rgba(100, 200, 100, 0.5); box-sizing: border-box;">${X("saveBtn")||"Salva"}</button>
            </div>
        </form>
    `,i.appendChild(s),document.body.appendChild(i);const o=document.getElementById("meta-cover"),c=document.getElementById("meta-cover-preview");c.onmouseover=()=>c.style.background="rgba(255,255,255,0.1)",c.onmouseout=()=>c.style.background="rgba(0,0,0,0.3)",o.addEventListener("change",u=>{if(u.target.files&&u.target.files.length>0){const f=u.target.files[0].name;c.innerHTML=`${KS_ICON("image",16)} ${f}`,c.style.border="1px solid rgba(100, 200, 100, 0.5)",c.style.color="#fff",c.style.background="rgba(100, 200, 100, 0.1)"}else c.innerHTML=X("clickToChooseFile")||"Clicca per scegliere un file…",c.style.border="1px dashed rgba(255,255,255,0.4)",c.style.color="#aaa",c.style.background="rgba(0,0,0,0.3)"}),i.addEventListener("wheel",u=>{s.contains(u.target)||u.preventDefault(),u.stopPropagation()},{passive:!1}),i.addEventListener("touchmove",u=>{s.contains(u.target)||u.preventDefault(),u.stopPropagation()},{passive:!1}),requestAnimationFrame(()=>{i.style.opacity="1"});const l=()=>{i.style.opacity="0",document.body.style.overflow=t,setTimeout(()=>i.remove(),300)};document.getElementById("meta-cancel-btn").onclick=l,i.addEventListener("click",u=>{u.target===i&&l()}),document.getElementById("metadata-form").onsubmit=async u=>{u.preventDefault();const f=document.getElementById("meta-save-btn");f.innerText=X("savingBtn")||"…",f.disabled=!0;const d=new FormData;d.append("id",n.id),d.append("title",document.getElementById("meta-title").value),d.append("author",document.getElementById("meta-author").value),d.append("category",document.getElementById("meta-category").value),d.append("description",document.getElementById("meta-desc").value);const p=document.getElementById("meta-cover").files[0];p&&d.append("cover",p);try{const b=await(await fetch("/api/books/edit",{method:"POST",body:d})).json();b.success?(l(),e&&e(b.updatedBook),window.dispatchEvent(new CustomEvent("bookMetadataUpdated",{detail:b.updatedBook}))):(alert(`${X("errorSaving")||"Errore durante il salvataggio:"} ${b.message}`),f.innerText=X("saveBtn")||"Salva",f.disabled=!1)}catch(x){console.error("Errore di rete:",x),f.innerText=X("errorGeneric")||"Errore!"}}}function bc(n){n&&fetch("/api/open-external",{method:"POST",headers:{"Content-Type":"application/json","X-KoreShelf":"1"},body:JSON.stringify({url:String(n)})}).catch(e=>console.warn("Link esterno non aperto:",e))}window.__KORESHELF_MOBILE__&&(window.open=n=>(bc(n),null),document.addEventListener("click",n=>{const e=n.target.closest&&n.target.closest('a[target="_blank"]');e&&e.href&&(n.preventDefault(),bc(e.href))},!0));window.t=X;function W0(){const n=document.getElementById("close-reader-btn"),e=document.getElementById("theme-toggle-btn"),t=localStorage.getItem("KoreShelf_lang")||"it";if(typeof gt<"u"&&(gt.innerHTML='<span class="btn-icon">'+KS_ICON("power",16)+'</span><span class="btn-text">'+X("shutdownBtn")+"</span>",gt.title=X("shutdownTooltip")),n&&(n.innerHTML=`&times; ${X("closeReader")}`),e){const i=localStorage.getItem("readerDarkMode")==="true";e.innerText=i?t==="it"?"Modalità Chiara":"Light Mode":t==="it"?"Modalità Scura":"Dark Mode"}document.title=t==="it"?"KoreShelf - Libreria 3D":"KoreShelf - 3D Library",typeof Gt<"u"&&(Gt.innerHTML='<span class="btn-icon">'+KS_ICON("folder",16)+'</span><span class="btn-text">'+X("manageShelf")+"</span>",Gt.title=X("manageShelfTooltip")),typeof Ot<"u"&&(Ot.placeholder=X("searchPlaceholder")),typeof Sn<"u"&&(Sn.innerHTML='<span class="btn-icon">'+KS_ICON("upload",16)+'</span><span class="btn-text">'+X("uploadBtn")+"</span>"),typeof Dt<"u"&&(Dt.innerHTML=Wt?'<span class="btn-icon">'+KS_ICON("book",16)+'</span><span class="btn-text">'+X("showCover")+"</span>":'<span class="btn-icon">'+KS_ICON("eye",16)+'</span><span class="btn-text">'+X("showSynopsis")+"</span>"),typeof di<"u"&&(di.innerHTML='<span class="btn-icon">'+KS_ICON("tag",16)+'</span><span class="btn-text">'+X("assignCategory")+"</span>"),typeof nn<"u"&&(nn.innerHTML='<span class="btn-icon">'+KS_ICON("trash",16)+'</span><span class="btn-text">'+X("deleteBook")+"</span>"),typeof Ri<"u"&&(Ri.innerHTML='<span class="btn-icon">'+KS_ICON("pencil",16)+'</span><span class="btn-text">'+(X("editMetadata")||"Modifica")+"</span>"),typeof Pi<"u"&&(Pi.innerHTML=vd()),typeof rt<"u"&&(rt.innerHTML='<span class="btn-icon">'+KS_ICON("heart",16)+'</span><span class="btn-text">'+X("donateBtn")+"</span>"),typeof tn<"u"&&(gd(),Zo())}const fn=new sf;fn.background=new Ke("#2c3e50");const pt=new Qt(75,window.innerWidth/window.innerHeight,.1,1e3);pt.position.set(0,1.5,3.5);const hn=new R0({antialias:!0});hn.setSize(window.innerWidth,window.innerHeight,!1);hn.domElement.id="ks-scene";hn.domElement.style.cssText="position: fixed; inset: 0; width: 100%; height: 100%; display: block; touch-action: none;";hn.shadowMap.enabled=!0;hn.shadowMap.type=Dr;document.body.appendChild(hn.domElement);const X0=new Pf(16777215,.5);fn.add(X0);const Pn=new Rf(16777215,.8);Pn.position.set(5,10,7.5);Pn.castShadow=!0;Pn.shadow.mapSize.width=1024;Pn.shadow.mapSize.height=1024;Pn.shadow.camera.left=-10;Pn.shadow.camera.right=10;Pn.shadow.camera.top=10;Pn.shadow.camera.bottom=-10;fn.add(Pn);let Wo=new wf;const dd=new ci(50,.2,4),Bs=Wo.load("/wood.jpg");Bs.wrapS=kr;Bs.wrapT=kr;Bs.repeat.set(12,1);const Xo=new si({map:Bs,roughness:.85,color:"#aaaaaa"}),qo=new Ht(dd,Xo);qo.position.set(0,-1.6,-.5);qo.receiveShadow=!0;fn.add(qo);const q0=new P0(Wo),cr=new Ji;fn.add(cr);const La=new si({color:16119260}),ud="#1a1a1a",Y0=new si({color:ud});let Se=[],ot=0,Wt=!1,zs=1.5;function nr(){const n=Math.min(window.screen.width,window.screen.height)<700,e=!!window.__KORESHELF_MOBILE__||window.matchMedia("(pointer: coarse)").matches;return window.matchMedia("(max-width: 700px)").matches||e&&n}let ir={z:3.5,dx:0,dy:0};function Yo(){var m;const n=window.innerWidth,e=window.innerHeight;if(document.documentElement.classList.toggle("ks-phone",nr()),document.documentElement.classList.toggle("ks-landscape",nr()&&n>e),typeof Sc=="function"&&Sc(),!nr()){ir={z:3.5,dx:0,dy:0};return}const t=(((m=document.querySelector(".top-bar"))==null?void 0:m.getBoundingClientRect().bottom)||70)+12,i=document.getElementById("ks-book-panel"),r=i&&getComputedStyle(i).display!=="none"?i.getBoundingClientRect():null,s=r&&r.width>0&&r.height>0?r:null,a=n>e,o={left:12,right:a&&s?s.left-12:n-12,top:t,bottom:!a&&s?s.top-12:e-12},c=Math.max(60,o.right-o.left),l=Math.max(60,o.bottom-o.top),u=a?Math.min(l*.82,c*.8*1.5):Math.min(.81*n,l*.85,c*.8*1.5),f=Math.tan(On.degToRad(pt.fov/2)),d=3*e/(2*f*u),p=e/(2*d*f),x=(o.left+o.right)/2-n/2,b=(o.top+o.bottom)/2-e/2;ir={z:.5+d,dx:-x/p,dy:b/p}}let Ci=!1;function Ps(n){Ci=n,typeof ct<"u"&&(ct.style.visibility=n?"hidden":"",ct.style.pointerEvents=n?"none":"")}const fd=document.createElement("style");fd.innerHTML=`
    /* Stili condivisi per l'effetto Glassmorphism */
    .glass-effect {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        color: #ffffff;
        font-family: 'Segoe UI', system-ui, sans-serif;
        transition: all 0.3s ease;
        outline: none;
    }

    /* Bottone moderno */
    .modern-btn {
        padding: 12px 30px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        border-radius: 50px;
        cursor: pointer;
        display: inline-block;
        text-align: center;
    }
    .modern-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-3px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
    .modern-btn:active {
        transform: translateY(0px);
    }

    /* Barra superiore e Input di ricerca */
    .top-bar {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
        align-items: center;
        z-index: 100;
        width: 90%;
        max-width: 700px;
    }
    .modern-input {
        padding: 12px 25px;
        font-size: 14px;
        border-radius: 50px;
        flex-grow: 1; /* Occupa tutto lo spazio rimanente */
    }
    .modern-input::placeholder { color: rgba(255, 255, 255, 0.6); }
    .modern-input:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    /* Nascondiamo l'input file originale brutto da vedere */
    #file-upload { display: none; }

    /* --- NUOVO: Stili per Icone e Responsività --- */
    .btn-icon { display: inline-block; margin-right: 6px; font-size: 15px; }
    .btn-text { display: inline-block; }

    /* --- Barra in alto: tutti i bottoni della stessa misura, su una riga --- */
    .top-bar .tb-btn {
        box-sizing: border-box;
        flex: 0 0 auto;
        width: 200px;
        height: 48px;
        padding: 0 14px !important;
        border-radius: 50px;
        line-height: 46px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .top-bar .tb-btn .btn-icon, .top-bar .tb-btn .btn-text { display: inline; }
    .top-bar .tb-btn .btn-icon { margin-right: 6px; }
    .top-bar .tb-btn:hover { transform: translateY(-2px); }
    .top-bar .modern-input { min-width: 160px; height: 48px; box-sizing: border-box; }

    /* Quando lo schermo scende sotto gli 850px di larghezza... */
    @media (max-width: 950px) {
        .btn-text { display: none !important; } /* Nascondi il testo */
        .btn-icon { margin-right: 0 !important; font-size: 18px; } /* Ingrandisci leggermente l'icona e centrala */
        
        .modern-btn { 
            padding: 12px 15px !important; /* Rendi i bottoni più "quadrati" */
            min-width: 48px;
            display: flex; 
            justify-content: center; 
            align-items: center;
        }
        
        .top-bar { width: 98%; gap: 8px; top: 15px; }
        .top-bar .tb-btn { width: 48px; padding: 0 !important; font-size: 18px; }
        .top-bar .tb-btn .btn-icon { margin-right: 0; }
        .modern-input { padding: 12px 15px; font-size: 13px; }
        
        /* Evita che nomi di categorie lunghissimi rompano la top bar */
        #category-label-id { 
            max-width: 120px; 
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
        }
    }
`;document.head.appendChild(fd);const pn=document.createElement("div");pn.className="top-bar";pn.style.width="95%";pn.style.maxWidth="1100px";document.body.appendChild(pn);const zn=document.createElement("div");zn.id="category-label";zn.className="glass-effect tb-btn";zn.style.display="none";pn.appendChild(zn);const Gt=document.createElement("button");Gt.innerHTML=X("manageShelf");Gt.title=X("manageShelfTooltip");Gt.className="glass-effect modern-btn tb-btn";Gt.style.display="none";pn.appendChild(Gt);const Ot=document.createElement("input");Ot.type="text";Ot.placeholder=X("searchPlaceholder");Ot.className="glass-effect modern-input";pn.appendChild(Ot);const Sn=document.createElement("label");Sn.innerText=X("uploadBtn");Sn.className="glass-effect modern-btn tb-btn";Sn.htmlFor="file-upload";pn.appendChild(Sn);const Cn=document.createElement("input");Cn.type="file";Cn.id="file-upload";const hd=[".epub",".kepub",".pdf",".fb2",".fbz",".zip",".cbz",".txt",".md",".markdown"],$0=new RegExp("("+hd.map(n=>n.replace(".","\\.")).join("|")+")$","i");Cn.accept=hd.join(", ");Cn.multiple=!0;pn.appendChild(Cn);const gt=document.createElement("button");gt.innerHTML=KS_ICON("power",16)+" "+X("shutdownBtn");gt.id="shutdown-btn";gt.className="glass-effect modern-btn tb-btn";gt.title=X("shutdownTooltip");gt.style.background="rgba(217, 83, 79, 0.15)";gt.style.borderColor="rgba(217, 83, 79, 0.4)";gt.style.color="#ff9999";gt.onmouseover=()=>{gt.style.background="rgba(217, 83, 79, 0.3)",gt.style.borderColor="rgba(217, 83, 79, 0.6)",gt.style.transform="translateY(-3px)",gt.style.boxShadow="0 8px 15px rgba(217, 83, 79, 0.2)"};gt.onmouseout=()=>{gt.style.background="rgba(217, 83, 79, 0.15)",gt.style.borderColor="rgba(217, 83, 79, 0.4)",gt.style.transform="translateY(0px)",gt.style.boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"};gt.onclick=async()=>{if(confirm(X("shutdownConfirm")))try{await fetch("/api/shutdown",{method:"POST"}),document.body.innerHTML=`
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #2c3e50; color: white; font-family: 'Segoe UI', system-ui, sans-serif; margin: 0;">
                    <h1 style="font-size: 2.5rem; margin-bottom: 15px; color: #d4af37;">${X("shutdownTitle")}</h1>
                    <p style="color: #a0aec0; font-size: 1.2rem;">${X("shutdownMessage")}</p>
                </div>
            `}catch(e){console.error("Errore durante lo spegnimento:",e)}};!window.__KORESHELF_DESKTOP__&&!window.__KORESHELF_SERVER__&&pn.appendChild(gt);const xr=document.createElement("button");xr.id="ks-search-toggle";xr.className="ks-round-btn";xr.innerHTML=KS_ICON("search",18);const _r=document.createElement("button");_r.id="ks-add-btn";_r.className="ks-round-btn";_r.innerHTML=KS_ICON("plus",18);_r.addEventListener("click",()=>Cn.click());const Es=localStorage.getItem("KoreShelf_lang")||"it",Ao={it:{icon:KS_ICON("globe",16),text:"IT"},en:{icon:KS_ICON("globe",16),text:"EN"},es:{icon:KS_ICON("globe",16),text:"ES"},fr:{icon:KS_ICON("globe",16),text:"FR"},de:{icon:KS_ICON("globe",16),text:"DE"}},qr=document.createElement("div");qr.style.position="relative";qr.style.display="inline-block";const Yr=document.createElement("button"),yc=Ao[Es]||Ao.it;Yr.innerHTML=`<span class="btn-icon">${yc.icon}</span><span class="btn-text">${yc.text}</span>`;Yr.className="glass-effect modern-btn tb-btn";Yr.title="Cambia lingua / Change language";const It=document.createElement("div");It.className="glass-effect";It.style.position="absolute";It.style.top="calc(100% + 10px)";It.style.right="0";It.style.display="none";It.style.flexDirection="column";It.style.borderRadius="12px";It.style.overflow="hidden";It.style.zIndex="2000";It.style.minWidth="120px";It.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)";Object.entries(Ao).forEach(([n,e])=>{const t=document.createElement("button");t.innerHTML=`<span style="margin-right: 8px;">${e.icon}</span>${e.text}`,t.style.padding="12px 20px",t.style.background="transparent",t.style.border="none",t.style.color="white",t.style.textAlign="left",t.style.cursor="pointer",t.style.transition="background 0.2s",t.style.fontSize="14px",t.style.width="100%",t.style.display="flex",t.style.alignItems="center",n===Es&&(t.style.background="rgba(255, 255, 255, 0.15)",t.style.fontWeight="bold"),t.onmouseover=()=>{n!==Es&&(t.style.background="rgba(255, 255, 255, 0.1)")},t.onmouseout=()=>{n!==Es&&(t.style.background="transparent")},t.dataset.lang=n,t.onclick=async()=>{localStorage.setItem("KoreShelf_lang",n);try{await fetch("/api/sync-language",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lang:n})})}catch{}window.location.reload()},It.appendChild(t)});qr.appendChild(Yr);qr.appendChild(It);pn.appendChild(qr);Yr.onclick=n=>{n.stopPropagation(),It.style.display=It.style.display==="none"?"flex":"none"};window.addEventListener("click",()=>{It.style.display==="flex"&&(It.style.display="none")});const pd={cover:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h3"/></svg>',shelves:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20h18"/><path d="M3 12h18"/><path d="M6 12V5"/><path d="M9 12V6"/><path d="M13 12l2-6"/><path d="M6 20v-5"/><path d="M10 20v-6"/><path d="M14 20v-4"/></svg>',read:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg>',resume:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',book:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg>'},md=document.createElement("style");md.textContent=`
    #empty-library-hint, #ks-book-panel, .ks-primary-btn, .ks-secondary-btn, #ks-more-menu .ks-menu-item {
        font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; }
    #empty-library-hint { position: fixed; left: 0; right: 0; top: 96px; bottom: 56px; z-index: 50; display: none;
        flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 0 24px;
        text-align: center; color: #fff; pointer-events: none; box-sizing: border-box; }
    #empty-library-hint > * { pointer-events: auto; }
    #empty-library-hint h1 { margin: 0; font-size: 34px; line-height: 1.15; font-weight: 700; }
    #empty-library-hint .ks-empty-sub { margin: 8px 0 0; font-size: 16px; line-height: 1.55; color: rgba(255,255,255,0.84); max-width: 640px; }
    .ks-dropzone { width: 100%; max-width: 940px; box-sizing: border-box; padding: 24px 26px 0; border-radius: 26px;
        border: 2px dashed rgba(212,175,55,0.75); background: rgba(212,175,55,0.06); cursor: pointer;
        transition: background .2s ease, border-color .2s ease; }
    .ks-dropzone:hover { background: rgba(212,175,55,0.11); border-color: rgba(212,175,55,0.95); }
    .ks-slots { display: flex; justify-content: center; align-items: flex-end; gap: 22px; flex-wrap: wrap; }
    .ks-slot-wrap { width: 150px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .ks-slot-caption { margin: 0; font-size: 13px; line-height: 1.4; color: rgba(255,255,255,0.88); min-height: 54px; display: flex; align-items: flex-end; }
    .ks-slot { width: 120px; height: 180px; border: 2px dashed rgba(255,255,255,0.38); border-radius: 6px;
        background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
    .ks-plank { height: 16px; margin: 0 -26px; background: #6e5238; border-top: 3px solid #9a7a58; }
    .ks-empty-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; padding: 22px 0 24px; cursor: default; }
    .ks-primary-btn { height: 52px; padding: 0 28px; border-radius: 50px; border: none; background: #fff; color: #1e2d3b;
        font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 10px;
        box-shadow: 0 8px 22px rgba(0,0,0,0.3); transition: transform .2s ease, box-shadow .2s ease; }
    .ks-primary-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(0,0,0,0.35); }
    .ks-secondary-btn { height: 52px; padding: 0 24px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.35);
        background: rgba(255,255,255,0.08); color: #fff; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; }
    .ks-secondary-btn:hover { background: rgba(255,255,255,0.16); }
    .ks-privacy { margin: 0; font-size: 13px; color: rgba(255,255,255,0.74); }

    #ks-book-panel { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    #ks-active-book { display: flex; flex-direction: column; align-items: center; gap: 6px; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.6); }
    #ks-active-book .ks-book-title { margin: 0; font-size: 17px; font-weight: 700; max-width: min(70vw, 720px);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #ks-active-book .ks-book-title span { font-weight: 500; color: #f3ebe1; }
    #ks-active-book .ks-progress { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; }
    #ks-active-book .ks-bar { width: 220px; height: 6px; border-radius: 6px; background: rgba(0,0,0,0.35); overflow: hidden; }
    #ks-active-book .ks-bar > div { height: 100%; background: #d4af37; }
    .ks-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center; }
    .ks-more { position: relative; }
    #ks-more-menu { position: absolute; bottom: 58px; left: 50%; transform: translateX(-50%); min-width: 230px; padding: 8px;
        box-sizing: border-box; border-radius: 18px; background: rgba(30,45,59,0.97); border: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 16px 36px rgba(0,0,0,0.45); display: none; flex-direction: column; gap: 2px; z-index: 20; }
    #ks-more-menu.open { display: flex; }
    #ks-more-menu .ks-menu-item { height: 44px; padding: 0 14px; border: none; border-radius: 12px; background: transparent;
        color: #fff; font-family: inherit; font-size: 14px; text-align: left; cursor: pointer; white-space: nowrap;
        text-transform: none; letter-spacing: 0; font-weight: 500; box-shadow: none; transform: none; }
    #ks-more-menu .ks-menu-item:hover { background: rgba(255,255,255,0.1); }
    #ks-more-menu .ks-menu-item.danger { color: #ffb3ae; }
    #ks-key-hints { display: flex; flex-wrap: wrap; gap: 18px; justify-content: center; font-size: 12px; font-weight: 600;
        color: rgba(255,255,255,0.85); text-shadow: 0 1px 3px rgba(0,0,0,0.6); }
    #ks-key-hints > span { display: flex; align-items: center; gap: 6px; }
    .ks-key { display: inline-flex; align-items: center; justify-content: center; min-width: 26px; height: 26px; padding: 0 6px;
        box-sizing: border-box; border-radius: 7px; border: 1px solid rgba(255,255,255,0.35); background: rgba(255,255,255,0.12);
        font-size: 12px; font-weight: 700; }
    @media (max-width: 950px) { #ks-key-hints { display: none; } }

    /* ===================== TELEFONO (design A: scaffale 3D a tutto schermo) ===================== */
    #ks-search-toggle, #ks-add-btn, #ks-position, #ks-mobile-actions, .ks-phone-only { display: none; }
    .ks-phone .top-bar { top: calc(10px + env(safe-area-inset-top, 0px)) !important; left: 12px !important; right: 12px !important;
        width: auto !important; max-width: none !important; transform: none !important; gap: 8px !important;
        flex-wrap: nowrap !important; justify-content: flex-start !important; }
    .ks-phone .top-bar > * { display: none !important; }
    .ks-phone .top-bar > div:first-child:not([style*="display: none"]) { display: flex !important; flex: 1 1 auto; min-width: 0; width: auto !important;
        height: 44px; align-items: center; gap: 6px; padding: 0 16px !important; font-size: 13px; }
    .ks-phone .top-bar #ks-search-toggle, .ks-phone .top-bar #ks-add-btn { display: flex !important; }
    .ks-phone .top-bar.ks-search-open > div:first-child, .ks-phone .top-bar.ks-search-open #ks-search-toggle { display: none !important; }
    .ks-phone .top-bar.ks-search-open > .modern-input { display: block !important; flex: 1 1 auto; min-width: 0; height: 44px; font-size: 16px; }
    .ks-round-btn { flex: 0 0 auto; width: 44px; height: 44px; border-radius: 50%; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; }
    #ks-search-toggle { border: 1px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.10); color: #fff; }
    #ks-add-btn { border: none; background: #fff; color: #1e2d3b; }

    .ks-phone #ks-arrow-left, .ks-phone #ks-arrow-right, .ks-phone #credits-footer, .ks-phone #donate-btn,
    .ks-phone #help-btn, .ks-phone #ks-key-hints { display: none !important; }

    .ks-phone #ks-book-panel { position: fixed; left: 0; right: 0; bottom: 0; width: 100%; box-sizing: border-box;
        padding: 12px 20px calc(22px + env(safe-area-inset-bottom, 0px)); gap: 12px !important; align-items: stretch !important;
        border-radius: 26px 26px 0 0; background: rgba(30,45,59,0.97); box-shadow: 0 -10px 30px rgba(0,0,0,0.3); }
    .ks-phone #ks-position { display: block; margin: 0; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.72); }
    .ks-phone #ks-active-book { align-items: stretch; text-shadow: none; }
    .ks-phone #ks-active-book .ks-book-title { font-size: 19px; max-width: none; white-space: normal; }
    .ks-phone #ks-active-book .ks-book-title span { display: block; font-size: 14px; color: rgba(255,255,255,0.78); margin-top: 4px; }
    .ks-phone #ks-active-book .ks-progress { width: 100%; }
    .ks-phone #ks-active-book .ks-bar { flex: 1; width: auto; }
    .ks-phone .ks-actions { flex-direction: column; align-items: stretch; gap: 10px; }
    .ks-phone #ks-read-btn { width: 100%; height: 54px; justify-content: center; font-size: 16px; }
    .ks-phone #ks-info-btn { display: none !important; }
    .ks-phone .ks-more { position: static; }
    .ks-phone #ks-mobile-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .ks-phone #ks-mobile-actions > button { height: 48px; padding: 0 6px !important; border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); color: #fff; font-family: inherit;
        font-size: 13px; font-weight: 600; letter-spacing: 0; text-transform: none; cursor: pointer; box-shadow: none; }
    .ks-phone #ks-more-menu { position: fixed; left: 0; right: 0; bottom: 0; top: auto; transform: none; min-width: 0;
        border-radius: 22px 22px 0 0; padding: 10px 12px calc(20px + env(safe-area-inset-bottom, 0px)); z-index: 60; }
    .ks-phone #ks-more-menu .ks-menu-item { height: 52px; font-size: 16px; }
    .ks-phone #ks-more-menu .ks-phone-only { display: block; }
    #ks-more-menu .ks-menu-sep { height: 1px; margin: 6px 4px; background: rgba(255,255,255,0.12); }
    #ks-lang-list { display: none; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 4px; }
    #ks-lang-list.open { display: grid; }
    #ks-lang-list button { height: 44px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06);
        color: #fff; font-family: inherit; font-weight: 700; cursor: pointer; }

    .ks-phone #empty-library-hint { top: calc(70px + env(safe-area-inset-top, 0px)); bottom: 0; gap: 14px; padding: 0 14px 14px; justify-content: flex-start; }
    .ks-phone #empty-library-hint h1 { font-size: 26px; }
    .ks-phone #empty-library-hint .ks-empty-sub { font-size: 14px; }
    .ks-phone .ks-dropzone { padding: 14px 10px 0; border-radius: 20px; }
    .ks-phone .ks-slots { gap: 8px; flex-wrap: nowrap; }
    .ks-phone .ks-slot-wrap { width: 74px; gap: 6px; }
    .ks-phone .ks-slot-caption { font-size: 10.5px; min-height: 44px; }
    .ks-phone .ks-slot { width: 62px; height: 92px; }
    .ks-phone .ks-slot svg { width: 22px; height: 22px; }
    .ks-phone .ks-plank { margin: 0 -10px; }
    .ks-phone .ks-empty-actions { flex-direction: column; padding: 16px 4px 16px; }
    .ks-phone .ks-empty-actions button { width: 100%; justify-content: center; }
    /* Telefono in orizzontale: pannello a destra, a tutta altezza; il libro sta a sinistra */
    .ks-phone.ks-landscape #ks-book-panel { left: auto; right: 0; top: calc(64px + env(safe-area-inset-top, 0px)); bottom: 0;
        width: min(46vw, 380px); border-radius: 22px 0 0 0; justify-content: flex-end; overflow-y: auto;
        padding: 12px 18px calc(14px + env(safe-area-inset-bottom, 0px)) 18px; }
    .ks-phone.ks-landscape #empty-library-hint { overflow-y: auto; }
    .ks-phone.ks-landscape .ks-empty-actions { flex-direction: row; }
    .ks-phone .ks-tray { left: 12px; right: 12px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); max-width: none; }
`;document.head.appendChild(md);const tn=document.createElement("div");tn.id="empty-library-hint";function gd(){const n=[["cover","slotCover"],["shelves","slotShelves"],["read","slotRead"],["resume","slotResume"]].map(([e,t])=>`<div class="ks-slot-wrap"><p class="ks-slot-caption">${X(t)}</p><div class="ks-slot">${pd[e]}</div></div>`).join("");tn.innerHTML=`
        <div><h1>${X("emptyTitle")}</h1><p class="ks-empty-sub">${X("emptySubtitle")}</p></div>
        <div class="ks-dropzone" id="ks-dropzone">
            <div class="ks-slots">${n}</div>
            <div class="ks-plank"></div>
            <div class="ks-empty-actions">
                <button class="ks-primary-btn" id="ks-choose-files">${X("chooseFiles")}</button>
                <button class="ks-secondary-btn" id="ks-sample-book">${X("sampleBook")}</button>
            </div>
        </div>
        <p class="ks-privacy">${X("privacyNote")}</p>`,tn.querySelector("#ks-choose-files").addEventListener("click",e=>{e.stopPropagation(),Cn.click()}),tn.querySelector("#ks-sample-book").addEventListener("click",e=>{e.stopPropagation(),K0()}),tn.querySelector("#ks-dropzone").addEventListener("click",()=>Cn.click())}gd();document.body.appendChild(tn);async function K0(){const n=localStorage.getItem("KoreShelf_lang")==="it"?"it":"en";try{const e=await(await fetch(`/sample/koreshelf-${n}.epub`)).blob(),t=n==="it"?"Benvenuto in KoreShelf.epub":"Welcome to KoreShelf.epub";await Jo([new File([e],t,{type:"application/epub+zip"})],{offline:!0})}catch(e){console.error("Libro di esempio non disponibile:",e)}}async function xd(n){if(n)try{const t=await(await fetch(`/api/store/amazon-link?title=${encodeURIComponent(n)}`)).json();t.success&&window.open(t.url,"_blank")}catch(e){console.error("Errore ricerca Amazon:",e)}}const rt=document.createElement("a");rt.id="donate-btn";rt.href="https://paypal.me/GabrieleTrovato1?locale.x=en_US&country.x=IT";rt.target="_blank";rt.className="glass-effect modern-btn";rt.style.textDecoration="none";rt.style.position="relative";rt.style.zIndex="1000";rt.style.padding="12px 15px";rt.style.fontWeight="bold";rt.style.whiteSpace="nowrap";rt.style.background="rgba(0, 112, 186, 0.15)";rt.style.borderColor="rgba(0, 112, 186, 0.4)";rt.style.color="#66b3ff";rt.onmouseover=()=>{rt.style.background="rgba(0, 112, 186, 0.3)",rt.style.borderColor="rgba(0, 112, 186, 0.6)"};rt.onmouseout=()=>{rt.style.background="rgba(0, 112, 186, 0.15)",rt.style.borderColor="rgba(0, 112, 186, 0.4)"};document.body.appendChild(rt);const ln=document.getElementById("help-btn");ln&&(ln.style.position="static",ln.style.margin="0",ln.style.transform="none",ln.style.top="auto",ln.style.bottom="auto",ln.style.left="auto",ln.style.right="auto",ln.onclick=()=>{G0()});const ct=document.createElement("div");ct.style.position="absolute";ct.style.bottom="42px";ct.style.left="0";ct.style.width="100%";ct.style.display="flex";ct.style.justifyContent="space-between";ct.style.alignItems="center";ct.style.padding="0 30px";ct.style.boxSizing="border-box";ct.style.pointerEvents="none";document.body.appendChild(ct);const Hs=document.createElement("div");Hs.style.display="flex";Hs.style.pointerEvents="auto";ct.appendChild(Hs);Hs.appendChild(rt);const rn=document.createElement("div");rn.style.display="flex";rn.style.gap="15px";rn.style.alignItems="center";rn.style.pointerEvents="auto";ct.appendChild(rn);const Gs=document.createElement("div");Gs.style.display="flex";Gs.style.pointerEvents="auto";ct.appendChild(Gs);ln&&Gs.appendChild(ln);xr.addEventListener("click",()=>{document.querySelector(".top-bar").classList.add("ks-search-open"),Ot.focus()});Ot.addEventListener("blur",()=>{setTimeout(()=>{Ot.value.trim()||document.querySelector(".top-bar").classList.remove("ks-search-open")},150)});document.querySelector(".top-bar").append(xr,_r);rn.id="ks-book-panel";rn.style.flexDirection="column";rn.style.gap="12px";const $o=document.createElement("div");$o.id="ks-key-hints";rn.appendChild($o);const Ko=document.createElement("p");Ko.id="ks-position";rn.appendChild(Ko);const Ti=document.createElement("div");Ti.id="ks-active-book";Ti.innerHTML='<p class="ks-book-title"></p><div class="ks-progress"><div class="ks-bar"><div></div></div><span class="ks-pct"></span></div>';rn.appendChild(Ti);const vr=document.createElement("div");vr.className="ks-actions";rn.appendChild(vr);const $r=document.createElement("button");$r.id="ks-read-btn";$r.className="ks-primary-btn";$r.addEventListener("click",()=>Ad());vr.appendChild($r);const Dt=document.createElement("button");Dt.id="ks-info-btn";Dt.innerText=X("showSynopsis");Dt.className="glass-effect modern-btn";vr.appendChild(Dt);const dr=document.createElement("div");dr.className="ks-more";const un=document.createElement("button");un.id="ks-more-btn";un.className="glass-effect modern-btn";un.setAttribute("aria-haspopup","menu");const Ln=document.createElement("div");Ln.id="ks-more-menu";Ln.setAttribute("role","menu");dr.append(un,Ln);vr.appendChild(dr);const di=document.createElement("button");di.className="ks-menu-item";di.dataset.action="assign";const Ri=document.createElement("button");Ri.className="ks-menu-item";Ri.dataset.action="edit";const nn=document.createElement("button");nn.className="ks-menu-item danger";nn.dataset.action="delete";[di,Ri,nn].forEach(n=>{n.setAttribute("role","menuitem"),Ln.appendChild(n)});const _d=document.createElement("div");_d.className="ks-menu-sep ks-phone-only";const Vs=document.createElement("button");Vs.className="ks-menu-item ks-phone-only";Vs.addEventListener("click",()=>Gt.click());const Ws=document.createElement("button");Ws.className="ks-menu-item ks-phone-only";const Xs=document.createElement("div");Xs.id="ks-lang-list";Ws.addEventListener("click",n=>{n.stopPropagation(),Xs.classList.toggle("open")});["it","en","es","fr","de"].forEach(n=>{const e=document.createElement("button");e.textContent=n.toUpperCase(),e.addEventListener("click",()=>{var t;return(t=document.querySelector(`[data-lang="${n}"]`))==null?void 0:t.click()}),Xs.appendChild(e)});Ln.append(_d,Vs,Ws,Xs);const Gr=document.createElement("div");Gr.id="ks-mobile-actions";const jo=document.createElement("button");jo.addEventListener("click",()=>Dt.click());const qs=document.createElement("button");qs.id="ks-mobile-category";qs.addEventListener("click",()=>di.click());Gr.append(jo,qs);vr.appendChild(Gr);function Sc(){nr()?un.parentElement!==Gr&&Gr.appendChild(un):un.parentElement!==dr&&dr.insertBefore(un,Ln)}const Ys=n=>{Ln.classList.toggle("open",n),un.setAttribute("aria-expanded",n?"true":"false")};un.addEventListener("click",n=>{n.stopPropagation(),Ys(!Ln.classList.contains("open"))});Ln.addEventListener("click",()=>setTimeout(()=>Ys(!1),0));document.addEventListener("click",n=>{dr.contains(n.target)||Ys(!1)});document.addEventListener("keydown",n=>{n.key==="Escape"&&Ln.classList.contains("open")&&Ys(!1)});function Zo(){un.textContent=nr()?X("moreActions")||"Altro":(X("moreActions")||"Altro")+" ▾",jo.textContent=Wt?X("hideSynopsisShort")||"Copertina":X("synopsisShort")||"Trama",qs.textContent=X("categoryShort")||"Categoria",Vs.textContent=X("manageShelves")||"Gestisci scaffali",Ws.textContent=(X("languageMenu")||"Lingua")+" · "+(localStorage.getItem("KoreShelf_lang")||"it").toUpperCase(),xr.setAttribute("aria-label",X("searchBtn")||"Cerca"),_r.setAttribute("aria-label",X("addBooks")||"Aggiungi libri"),di.innerHTML=X("assignCategory"),Ri.innerHTML=X("editMetadata"),nn.disabled||(nn.innerHTML=X("deleteBook")),$o.innerHTML=`
        <span><span class="ks-key">←</span><span class="ks-key">→</span> ${X("keyBrowse")}</span>
        <span><span class="ks-key">↑</span><span class="ks-key">↓</span> ${X("keyShelf")}</span>
        <span>${X("keyDrop")}</span>`;const n=Se[ot];if(!n)return;const e=n.userData,t=Se.filter(s=>s.userData.category===e.category);Ko.textContent=(X("positionOf")||"{n} di {m}").replace("{n}",t.indexOf(n)+1).replace("{m}",t.length)+(t.length>1?" · "+(X("swipeToBrowse")||"scorri per sfogliare"):"");const i=Ti.querySelector(".ks-book-title");if(i.textContent=e.title||"",e.author){const s=document.createElement("span");s.textContent=nr()?e.author:` · ${e.author}`,i.appendChild(s)}const r=Math.round(Math.max(0,Math.min(1,Number(e.progress)||0))*100);Ti.querySelector(".ks-progress").style.display=r>0?"flex":"none",Ti.querySelector(".ks-bar > div").style.width=`${r}%`,Ti.querySelector(".ks-pct").textContent=(X("percentRead")||"{n}%").replace("{n}",r),$r.innerHTML=`${pd.book}<span>${r>0&&r<100?X("continueReading"):X("startReading")}</span>`}Ri.onclick=()=>{if(Se.length===0)return;const n=Se[ot];V0(n.userData,e=>{console.log("Metadati salvati! Aggiornamento 3D in corso...",e);const t=n.userData.category,i=e.tags&&e.tags.length>0?e.tags[0]:X("uncategorized");if(t!==i){fr();return}n.userData={...n.userData,...e};const r=yd(e.title,e.author);if(n.material[1].map=r,n.material[1].needsUpdate=!0,e.coverPath)Wo.load(`/${e.coverPath}`,a=>{a.generateMipmaps=!1,a.minFilter=xt,a.magFilter=xt,n.material[4].map=a,n.material[4].color.setHex(16777215),n.material[4].needsUpdate=!0});else{const a=Md(e.title,e.author);n.material[4].map=a,n.material[4].needsUpdate=!0}const s=n.children.find(a=>a.name==="backCover_mesh");if(s){s.userData={...s.userData,...e};const a=Sd(e.description,e.tags,e.rating);s.material.map=a,s.material.needsUpdate=!0}})};function vd(){return`${X("credits").replace("{mit}",'<a href="https://github.com/GabrieleTrovato01/KoreShelf/blob/main/LICENSE" target="_blank">MIT</a>')} <a href="https://github.com/GabrieleTrovato01" target="_blank">GabrieleTrovato01</a>`}const Pi=document.createElement("div");Pi.id="credits-footer";Pi.innerHTML=vd();document.body.appendChild(Pi);di.onclick=()=>{if(Se.length===0)return;const n=Se[ot],e=[...new Set(Se.map(u=>u.userData.category))].filter(u=>u!==X("uncategorized")),t=document.createElement("div");t.id="assign-category-overlay",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100vw",t.style.height="100vh",t.style.backgroundColor="rgba(0,0,0,0.6)",t.style.zIndex="2000",t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.backdropFilter="blur(5px)",document.body.appendChild(t);const i=document.createElement("div");i.className="glass-effect",i.style.padding="30px",i.style.borderRadius="20px",i.style.width="90%",i.style.maxWidth="400px",i.style.textAlign="center",t.appendChild(i);const r=document.createElement("h3");r.innerText=`${X("moveBookTitle")} "${n.userData.title}"`,r.style.margin="0 0 15px 0",i.appendChild(r);const s=document.createElement("div");s.style.display="flex",s.style.gap="10px",s.style.marginBottom="20px";const a=document.createElement("input");a.type="text",a.placeholder=X("categoryPrompt"),a.className="glass-effect modern-input",a.style.flexGrow="1";const o=document.createElement("button");if(o.innerText=X("saveBtn"),o.className="glass-effect modern-btn",o.style.padding="10px 20px",s.appendChild(a),s.appendChild(o),i.appendChild(s),e.length>0){const u=document.createElement("div");u.innerText=X("existingCategoriesSubtitle"),u.style.fontSize="12px",u.style.opacity="0.7",u.style.marginBottom="10px",i.appendChild(u);const f=document.createElement("div");f.style.display="flex",f.style.flexWrap="wrap",f.style.gap="8px",f.style.justifyContent="center",e.forEach(d=>{const p=document.createElement("button");p.innerText=d,p.className="glass-effect",p.style.padding="8px 15px",p.style.borderRadius="50px",p.style.fontSize="12px",p.style.cursor="pointer",p.onmouseover=()=>p.style.background="rgba(255,255,255,0.2)",p.onmouseout=()=>p.style.background="rgba(255,255,255,0.08)",p.onclick=()=>l(d),f.appendChild(p)}),i.appendChild(f)}const c=document.createElement("button");c.innerText=X("cancelBtn"),c.className="glass-effect modern-btn",c.style.marginTop="20px",c.style.padding="8px 20px",c.style.fontSize="11px",c.style.background="rgba(255, 50, 50, 0.1)",c.style.borderColor="rgba(255, 100, 100, 0.3)",c.style.color="#ffb3b3",c.onclick=()=>t.remove(),c.onmouseover=()=>{c.style.background="rgba(255, 50, 50, 0.2)",c.style.transform="translateY(-2px)"},c.onmouseout=()=>{c.style.background="rgba(255, 50, 50, 0.1)",c.style.transform="translateY(0px)"},i.appendChild(c);const l=async u=>{if(!(!u||u.trim()==="")){o.innerText="…",o.disabled=!0;try{const d=await(await fetch(`/api/books/${n.userData.id}/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:u.trim()})})).json();d.success?location.reload():(alert(d.message),o.innerText="Salva",o.disabled=!1)}catch(f){console.error(f),t.remove()}}};o.onclick=()=>l(a.value),a.addEventListener("keypress",u=>{u.key==="Enter"&&l(a.value)}),t.addEventListener("pointerdown",u=>{u.target===t&&t.remove()}),setTimeout(()=>a.focus(),100)};function j0(n){var r;const e=Se.filter(s=>s.userData.category===n.userData.category),t=e.indexOf(n),i=e[t+1]||e[t-1];return i?i.userData.id:((r=Se.find(s=>s!==n))==null?void 0:r.userData.id)??null}const Da=()=>{nn.innerHTML=X("deleteBook"),nn.disabled=!1};nn.onclick=async()=>{if(Se.length===0||nn.disabled)return;const n=Se[ot],e=n.userData.title;if(!await Lr({icon:KS_ICON("trash",36),title:e,message:X("deleteConfirm").replace("{title}",e),confirmText:(X("deleteBook")||"Elimina").trim(),cancelText:X("cancelBtn")||"Annulla",danger:!0}))return;nn.disabled=!0;try{const a=await(await fetch(`/api/books/${n.userData.id}`,{method:"DELETE"})).json();if(!a.success){await Lr({icon:KS_ICON("alert",36),title:e,message:a.message||X("serverError"),confirmText:"OK",cancelText:X("cancelBtn")}),Da();return}}catch(s){console.error(s),await Lr({icon:KS_ICON("alert",36),title:e,message:X("serverError"),confirmText:"OK",cancelText:X("cancelBtn")}),Da();return}const i=j0(n),r=Is(n);await H0(r,{capture:()=>(hn.render(fn,pt),hn.domElement),onCaptured:()=>{n.visible=!1}}),await fr({focusBookId:i}),Da()};Gt.onclick=()=>{Se.length!==0&&(Se[ot].userData.category,qd({onChanged:n=>fr(n?{focusBookId:n}:{})}))};const Mt=document.createElement("button");Mt.innerHTML=KS_ICON("chevronLeft",26);Mt.id="ks-arrow-left";Mt.className="glass-effect modern-btn";Mt.style.position="absolute";Mt.style.left="20px";Mt.style.top="50%";Mt.style.transform="translateY(-50%)";Mt.style.fontSize="24px";Mt.style.padding="15px 20px";Mt.style.borderRadius="50%";document.body.appendChild(Mt);const Et=document.createElement("button");Et.innerHTML=KS_ICON("chevronRight",26);Et.id="ks-arrow-right";Et.className="glass-effect modern-btn";Et.style.position="absolute";Et.style.right="20px";Et.style.top="50%";Et.style.transform="translateY(-50%)";Et.style.fontSize="24px";Et.style.padding="15px 20px";Et.style.borderRadius="50%";document.body.appendChild(Et);function ui(n){var t,i;if(Se.length===0)return;if(Ci){n===1?(t=window.highlightsBoardModule)==null||t.nextHighlightsPage():n===-1&&((i=window.highlightsBoardModule)==null||i.prevHighlightsPage());return}const e=ot+n;e>=0&&e<Se.length&&(ot=e,Wt=!1,Dt.innerText=X("showSynopsis"),Rn())}function ur(n){if(Se.length===0)return;const e=Se[ot].userData.category;let t=-1;if(n===1){if(Ci)return;for(let i=ot;i<Se.length;i++)if(Se[i].userData.category!==e){t=i;break}if(t===-1&&Se.some(r=>r.userData.highlights&&r.userData.highlights.length>0)){Ps(!0),zs=Se[Se.length-1].userData.baseShelfY+4.5,Gt.style.display="none",ct.style.opacity="0",Mt.style.opacity="1",Et.style.opacity="1",window.highlightsBoardModule&&window.highlightsBoardModule.updateBoardTitle();return}}else{if(Ci){Ps(!1),ct.style.opacity="1",Mt.style.opacity="1",Et.style.opacity="1",Gt.style.display="block",Rn();return}let i=ot;for(;i>0&&Se[i-1].userData.category===e;)i--;if(i>0){const r=Se[i-1].userData.category;let s=i-1;for(;s>0&&Se[s-1].userData.category===r;)s--;t=s}}t!==-1&&(ot=t,Wt=!1,Dt.innerText=X("showSynopsis"),Rn())}Mt.onclick=()=>ui(-1);Et.onclick=()=>ui(1);Dt.onclick=()=>{Wt=!Wt,Dt.innerHTML=Wt?'<span class="btn-icon">'+KS_ICON("book",16)+'</span><span class="btn-text">'+(X("showCover")||"Copertina")+"</span>":'<span class="btn-icon">'+KS_ICON("eye",16)+'</span><span class="btn-text">'+X("showSynopsis")+"</span>",Rn()};const en=document.createElement("div");en.className="glass-effect";Object.assign(en.style,{position:"fixed",display:"none",zIndex:"1100",padding:"10px 14px",borderRadius:"14px",fontSize:"14px",lineHeight:"1.4",cursor:"pointer",maxWidth:"320px",boxSizing:"border-box"});document.body.appendChild(en);en.addEventListener("mousedown",n=>n.preventDefault());let Vr="";function Z0(n){Vr=n;const e=Ot.getBoundingClientRect();en.style.top=`${e.bottom+8}px`,en.style.left=`${e.left}px`,en.style.minWidth=`${e.width}px`,en.innerHTML="";const t=document.createElement("div");t.style.opacity="0.7",t.textContent=X("searchNoResults");const i=document.createElement("div");i.style.fontWeight="bold",i.innerHTML=KS_ICON("search",15)+" ",i.append(X("amazonSuggestion").replace("{q}",n)),en.append(t,i),en.style.display="block"}function fi(){en.style.display="none",Vr=""}en.addEventListener("click",()=>{xd(Vr),fi()});Ot.addEventListener("blur",fi);window.addEventListener("resize",fi);Ot.addEventListener("keydown",n=>{n.key==="Enter"&&Vr?(xd(Vr),fi()):n.key==="Escape"&&fi()});let Ia=null;Ot.addEventListener("input",n=>{const e=n.target.value.trim();if(Ia&&clearTimeout(Ia),!e){fi();return}Ia=setTimeout(async()=>{try{const i=await(await fetch(`/api/books/search?q=${encodeURIComponent(e)}`)).json();if(Ot.value.trim()!==e)return;if(i.length>0){fi();const r=i[0].id,s=Se.findIndex(a=>a.userData.id===r);s!==-1&&s!==ot&&(ot=s,Wt=!1,Ci&&(Ps(!1),ct.style.opacity="1",Mt.style.opacity="1",Et.style.opacity="1",Gt.style.display="block"),typeof Dt<"u"&&(Dt.innerText=X("showSynopsis")),Rn())}else Z0(e)}catch(t){console.error("Errore durante la ricerca backend:",t)}},150)});let Ua=!1,ii=null;async function Jo(n,{offline:e=!1}={}){var x;const t=Array.from(n).filter(b=>$0.test(b.name));if(t.length===0||Ua)return;Ua=!0,Ot.disabled=!0,fi(),Sn.style.pointerEvents="none",Sn.style.opacity="0.6";const i=tn.style.display!=="none";tn.style.display="none";const r=new k0,s=t.map(b=>r.add(b));let a=0,o=0,c=0,l=Promise.resolve();const u={requested:!1};ii=u;const f=[];let d=null;r.onSkip(()=>{u.requested=!0;const b=f.splice(0);b.forEach(({item:m,book:h})=>{Qi.delete(h.id),m.landed()}),b.length&&(l=l.then(()=>fr({focusBookId:d})))});for(let b=0;b<t.length;b++){const m=s[b];m.sending(0);try{const h=await F0(t[b],{offline:e},(y,T)=>{T?m.processing():m.sending(y)});if(h.success){a++,(x=h.book)!=null&&x.id&&Qi.add(h.book.id),m.ready(h.book);const y=h.book;y!=null&&y.id&&(d=y.id);const T={item:m,book:y};y&&f.push(T),l=l.then(()=>u.requested?null:new Promise(E=>setTimeout(E,1100))).then(()=>{const E=f.indexOf(T);if(!y)return m.landed();if(E!==-1)return f.splice(E,1),u.requested?(Qi.delete(y.id),m.landed(),fr({focusBookId:y.id})):rx(m,y)}).catch(E=>{console.warn("Animazione di atterraggio:",E),y&&Qi.delete(y.id),m.landed()})}else h.duplicate||h.message&&h.message.includes("già presente")?(o++,m.duplicate()):(c++,m.error(h.message))}catch(h){console.error("Errore di rete con",t[b].name,h),c++,m.error()}r.progress(b+1)}await l,a>0&&Rd().catch(b=>console.warn("Errore generazione copertine PDF:",b));const p=r.finish({added:a,duplicates:o,errors:c});a===0&&i&&p.then(()=>{Se.length===0&&(tn.style.display="flex")}),ii=null,Cn.value="",Ot.disabled=!1,Sn.style.pointerEvents="",Sn.style.opacity="",Ua=!1,await p}Cn.addEventListener("change",n=>Jo(n.target.files));const Li=document.createElement("div");Li.className="glass-effect";Object.assign(Li.style,{position:"fixed",inset:"18px",zIndex:"1300",display:"none",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"14px",borderRadius:"30px",border:"2px dashed rgba(255,255,255,0.6)",background:"rgba(30,45,59,0.55)",fontSize:"22px",letterSpacing:"1px",pointerEvents:"none"});document.body.appendChild(Li);let Ls=0;const $s=n=>{var e;return Array.from(((e=n.dataTransfer)==null?void 0:e.types)||[]).includes("Files")},bd=()=>{var n;return((n=document.getElementById("reader-overlay"))==null?void 0:n.style.display)==="block"};window.addEventListener("dragenter",n=>{!$s(n)||bd()||(n.preventDefault(),++Ls===1&&(Li.innerHTML=`<div>${KS_ICON("books",64)}</div><div>${X("dropFilesHere")}</div>`,Li.style.display="flex"))});window.addEventListener("dragover",n=>{$s(n)&&n.preventDefault()});window.addEventListener("dragleave",n=>{$s(n)&&--Ls<=0&&(Ls=0,Li.style.display="none")});window.addEventListener("drop",n=>{$s(n)&&(n.preventDefault(),Ls=0,Li.style.display="none",bd()||Jo(n.dataTransfer.files))});function yd(n,e){const t=document.createElement("canvas");t.width=128,t.height=1024;const i=t.getContext("2d");i.fillStyle=ud,i.fillRect(0,0,t.width,t.height),i.textAlign="center",i.textBaseline="middle",i.translate(t.width/2,t.height/2),i.rotate(Math.PI/2);let r=40;const s=t.height-60;for(i.font=`bold ${r}px Arial, sans-serif`;i.measureText(n).width>s&&r>12;)r-=2,i.font=`bold ${r}px Arial, sans-serif`;i.fillStyle="#ffffff",i.fillText(n,0,-15);let a=30;for(i.font=`italic ${a}px Arial, sans-serif`;i.measureText(e).width>s&&a>10;)a-=2,i.font=`italic ${a}px Arial, sans-serif`;return i.fillStyle="#cccccc",i.fillText(e,0,30),new Go(t)}function Sd(n,e,t){const i=document.createElement("canvas");i.width=512,i.height=768;const r=i.getContext("2d");r.fillStyle="#1e1e1e",r.fillRect(0,0,i.width,i.height),r.strokeStyle="#d4af37",r.lineWidth=4,r.strokeRect(15,15,i.width-30,i.height-30);let s=70;e&&e.length>0&&(r.fillStyle="#d4af37",r.font="bold 24px Arial",r.textAlign="center",r.fillText(e[0].toUpperCase(),i.width/2,s),s+=40,r.beginPath(),r.moveTo(100,s-20),r.lineTo(i.width-100,s-20),r.stroke());const a=i.height-120;if(n){r.fillStyle="#ecf0f1",r.font="22px serif",r.textAlign="left";const c=n.replace(/<[^>]*>?/gm,"").split(" ");let l="";const u=i.width-80,f=40,d=32;for(let p=0;p<c.length;p++){const x=l+c[p]+" ";if(r.measureText(x).width>u&&p>0){if(r.fillText(l,f,s),l=c[p]+" ",s+=d,s>a){r.fillText("...",f,s-d+10);break}}else l=x}s<=a&&r.fillText(l,f,s)}if(t&&t>0){r.textAlign="center",r.font="45px Arial";const o=(c,l,u,f)=>{r.beginPath();for(let d=0;d<10;d++){const p=d%2===0?u:u*.45,x=-Math.PI/2+d*Math.PI/5;r[d===0?"moveTo":"lineTo"](c+Math.cos(x)*p,l+Math.sin(x)*p)}r.closePath(),r.lineWidth=3,r.strokeStyle="#d4af37",r.fillStyle="#d4af37",f?r.fill():r.stroke()};for(let c=1;c<=5;c++)o(i.width/2+(c-3)*56,i.height-95,20,c<=t)}return new Go(i)}function Md(n,e){const t=document.createElement("canvas");t.width=512,t.height=768;const i=t.getContext("2d");i.fillStyle="#1e2d3b",i.fillRect(0,0,t.width,t.height),i.strokeStyle="#d4af37",i.lineWidth=4,i.strokeRect(30,30,t.width-60,t.height-60),i.strokeRect(40,40,t.width-80,t.height-80),i.textAlign="center",i.fillStyle="#f5f5dc",i.font='bold 36px "Times New Roman", Times, serif';const r=n.split(" ");let s="",a=250;const o=380;for(let c=0;c<r.length;c++){let l=s+r[c]+" ";i.measureText(l).width>o&&c>0?(i.fillText(s,t.width/2,a),s=r[c]+" ",a+=45):s=l}return i.fillText(s,t.width/2,a),i.font='italic 28px "Times New Roman", Times, serif',i.fillStyle="#d4af37",i.fillText(e,t.width/2,a+80),i.font="16px Arial, sans-serif",i.fillStyle="rgba(255, 255, 255, 0.3)",i.fillText(X("noCover"),t.width/2,t.height-80),new Go(t)}async function Ed(n=null){try{const t=(n??await(await fetch("/api/books")).json()).filter(h=>!Qi.has(h.id)),i=new Map;t.forEach(h=>{const y=h.tags&&h.tags.length>0?h.tags[0]:X("uncategorized");i.has(y)||i.set(y,[]),i.get(y).push(h)});const r=Array.from(i.keys()).sort((h,y)=>h===X("uncategorized")?-1:y===X("uncategorized")?1:h.localeCompare(y));let s=0,a=0;const o=[];let c=0;const l=new td;l.setOptions({imageOrientation:"flipY"});const u=h=>new Promise(y=>{l.load(h,T=>{const E=new At(T);E.generateMipmaps=!1,E.minFilter=xt,E.magFilter=xt,E.needsUpdate=!0,y(E)},void 0,()=>{console.warn(`${X("textureError")} ${h}`),y(null)})});if(r.forEach(h=>{const y=i.get(h);h===X("uncategorized")&&y.length>0&&(c=a);const T=-1.6+s*4.2,E=new Ht(dd,Xo);E.position.set(0,T,-.5),E.receiveShadow=!0,fn.add(E),console.log(`${X("shelfLog")}`,{name:h,y:T});const L=[];y.forEach((w,R)=>{const A=(w.pageCount||350)*.001,D=new ci(2,3,A),V=yd(w.title,w.author),W=new si({map:V,roughness:.7}),U=Md(w.title,w.author),F=new si({map:U,roughness:.8});let G=[La,W,La,La,F,Y0];const Z=new Ht(D,G);Z.castShadow=!0,Z.receiveShadow=!0;const ee=new mr(2,3),le=new si({map:Sd(w.description,w.tags,w.rating),roughness:.8}),ge=new Ht(ee,le);ge.name="backCover_mesh",ge.userData={...w},ge.position.z=-(A/2)-.001,ge.rotation.y=Math.PI,Z.add(ge);const be=T+1.6;if(Z.userData={...w,index:a,category:h,indexInShelf:R,thickness:A,baseShelfY:be,targetY:be},w.progress>0&&w.progress<.99){const j=new ci(.3,.6,.05),ue=new si({color:"#c0392b",roughness:.7,metalness:.1}),te=new Ht(j,ue),we=-.9+.3/2;te.position.set(we,1.5,.04),Z.add(te)}Z.position.y=be,cr.add(Z),Se.push(Z),L.push(Z),a++}),o.push({categoryName:h,meshes:L}),s++}),Se.length>0&&(ot=c,Ts)){const h=Se.findIndex(y=>y.userData.id===Ts);h!==-1&&(ot=h)}Ts=null,Rn();const f=Se.length>0?Se[ot].userData.category:null,d=o.find(h=>h.categoryName===f),p=o.filter(h=>h.categoryName!==f),x=async h=>{if(!h)return;const y=h.meshes.map(async T=>{if(T.userData.coverPath){const E=await u(`/${T.userData.coverPath}`);E&&(T.material[4].map=E,T.material[4].color.setHex(16777215),T.material[4].needsUpdate=!0)}});await Promise.all(y)},b=async h=>{if(h){for(const y of h.meshes)if(y.userData.coverPath){const T=await u(`/${y.userData.coverPath}`);T&&(y.material[4].map=T,y.material[4].color.setHex(16777215),y.material[4].needsUpdate=!0,await new Promise(E=>requestAnimationFrame(E)))}}};Se.length===0?(tn.style.display="flex",ct.style.display="none",Mt.style.display="none",Et.style.display="none"):(tn.style.display="none",ct.style.display="flex",Mt.style.display="block",Et.style.display="block");const m=-1.6+(s-1)*4.2;_i(()=>import("./highlights-board-CCDoQYiW.js"),[]).then(h=>{window.highlightsBoardModule=h,h.initHighlightsBoard(fn,pt,t,m)}).catch(h=>console.warn("Errore caricamento bacheca:",h)),(async()=>{d&&(await x(d),console.log(`${X("texturesSuccess")}`,{cat:f}));for(const h of p)await b(h);console.log(`${X("allTexturesLoaded")}d`)})()}catch(e){console.error(e)}}function Rn(){if(Zo(),Yo(),Se.length===0)return;const n=Se[ot],e=n.userData.category,i=e==="Senza Categoria"?X("uncategorized"):e.toUpperCase();zn.innerText=`${X("shelfTitlePrefix")}${i}`,zn.style.display="block",Gt.style.display="block",zn.innerHTML=KS_ICON("folder",15)+" ",zn.append(i.toUpperCase()),zn.title=i,zs=n.userData.baseShelfY;const r=Se.filter(f=>f.userData.category===e),s=Se.filter(f=>f.userData.category!==e),a=1.6,o=.08;n.userData.targetX=0,n.userData.targetZ=.5,n.userData.targetRotY=Wt?Math.PI:0;let c=a;for(let f=n.userData.indexInShelf+1;f<r.length;f++){let d=r[f];d.userData.targetX=c+d.userData.thickness/2,d.userData.targetZ=-1.5,d.userData.targetRotY=Math.PI/2,c+=d.userData.thickness+o}let l=-a;for(let f=n.userData.indexInShelf-1;f>=0;f--){let d=r[f];d.userData.targetX=l-d.userData.thickness/2,d.userData.targetZ=-1.5,d.userData.targetRotY=Math.PI/2,l-=d.userData.thickness+o}[...new Set(s.map(f=>f.userData.category))].forEach(f=>{const d=s.filter(b=>b.userData.category===f);let x=-(d.reduce((b,m)=>b+m.userData.thickness+o,0)/2);d.forEach(b=>{b.userData.targetX=x+b.userData.thickness/2,b.userData.targetZ=-1.5,b.userData.targetRotY=Math.PI/2,x+=b.userData.thickness+o})})}window.showFullPlotModal=function(n){const e=document.createElement("div");e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.backgroundColor="rgba(0,0,0,0.8)",e.style.zIndex="2000",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.backdropFilter="blur(8px)",e.onclick=l=>{l.target===e&&e.remove()},document.body.appendChild(e);const t=document.createElement("div");t.className="glass-effect",t.style.padding="40px",t.style.borderRadius="20px",t.style.width="90%",t.style.maxWidth="600px",t.style.maxHeight="80vh",t.style.overflowY="auto",t.style.color="white",t.style.textAlign="left",e.appendChild(t);const i=document.createElement("h2");i.innerText=n.title||"Titolo Sconosciuto",i.style.marginTop="0",i.style.marginBottom="10px",i.style.color="#d4af37",t.appendChild(i);const r=document.createElement("h4");r.innerText=`${X("authorLabel")} ${n.author||"Sconosciuto"}`,r.style.marginTop="0",r.style.marginBottom="30px",r.style.color="#ccc",t.appendChild(r);const s=document.createElement("h3");s.innerText=X("fullPlotTitle"),s.style.borderBottom="1px solid rgba(255,255,255,0.2)",s.style.paddingBottom="10px",t.appendChild(s);const a=document.createElement("p");a.innerHTML=n.description||`<i>${X("noDescription")}</i>`,a.style.lineHeight="1.8",a.style.fontSize="16px",a.style.color="#e0e0e0",t.appendChild(a);const o=document.createElement("div");o.style.textAlign="center",o.style.marginTop="40px";const c=document.createElement("button");c.innerText=X("closeBtn"),c.className="glass-effect modern-btn",c.onclick=()=>e.remove(),o.appendChild(c),t.appendChild(o)};const Ds=new If,rr=new je;let Td=0,wd=0,Mc=0,Ec=0,Nr=!1;window.addEventListener("pointerdown",n=>{const e=document.getElementById("reader-overlay");e&&e.style.display!=="none"||document.getElementById("ks-manager")||document.getElementById("assign-category-overlay")||n.target.tagName==="BUTTON"||n.target.tagName==="INPUT"||n.target.tagName==="LABEL"||document.getElementById("help-modal-overlay")||document.getElementById("metadata-manager-overlay")||document.getElementById("highlights-manager-overlay")||n.target.closest("button, input, label, a")||n.target===hn.domElement&&(Td=n.clientX,wd=n.clientY,Nr=!0)});function Ad(){if(Se.length===0)return;Wt&&(Wt=!1,Rn());const n=Se[ot];if(n.userData.targetZ=2.8,n.userData.targetRotY=0,!n.userData.hasHinge){const e=new mr(2,3),t=n.material[4],i=new Ji;i.position.set(-1,0,n.userData.thickness/2+.002);const r=new Ht(e,t);r.position.set(1,0,0),i.add(r),n.add(i),n.userData.hinge=i,n.userData.hasHinge=!0,n.material[4]=new si({color:16119260,roughness:.9})}document.querySelector(".top-bar").style.opacity="0",ct.style.opacity="0",Mt.style.opacity="0",Et.style.opacity="0",Pi.style.opacity="0",rt.style.opacity="0",rt.style.pointerEvents="none",n.userData.hinge.userData={targetRotY:-Math.PI*.85},setTimeout(()=>{const e=n.userData.epubPath,t=e.toLowerCase().endsWith(".pdf");e.toLowerCase().endsWith(".cbz")?(console.log("Apertura fumetto"),document.getElementById("viewer").style.display="none",document.getElementById("pdf-container").style.display="none",window.openComicReader(e,n.userData.id)):t?(console.log("Apertura PDF"),document.getElementById("viewer").style.display="none",document.getElementById("pdf-container").style.display="flex",window.openPdfReader(e,n.userData.id)):(console.log("Apertura EPUB"),document.getElementById("pdf-container").style.display="none",document.getElementById("viewer").style.display="block",window.openReader(e,n.userData.id))},400)}window.addEventListener("pointercancel",()=>{Nr=!1});window.addEventListener("pointerup",n=>{const e=document.getElementById("reader-overlay");if(e&&e.style.display!=="none"||document.getElementById("ks-manager")||document.getElementById("assign-category-overlay")||document.getElementById("help-modal-overlay")||document.getElementById("metadata-manager-overlay")||document.getElementById("highlights-manager-overlay"))return;if(n.target.closest("button, input, label, a")){Nr=!1;return}if(!Nr)return;Nr=!1,Mc=n.clientX,Ec=n.clientY;const t=Td-Mc,i=wd-Ec;if(Math.abs(t)>Math.abs(i)&&Math.abs(t)>50)t>0?ui(1):ui(-1);else if(Math.abs(i)>Math.abs(t)&&Math.abs(i)>50)i>0?ur(-1):ur(1);else if(Math.abs(t)<10&&Math.abs(i)<10){rr.x=n.clientX/window.innerWidth*2-1,rr.y=-(n.clientY/window.innerHeight)*2+1,Ds.setFromCamera(rr,pt);const r=Ds.intersectObjects(cr.children,!0);if(r.length>0){const s=r[0].object;let a=s;for(;a.parent!==cr&&a.parent!==null;)a=a.parent;const o=a.userData.index;if(o!==ot){ot=o,Wt=!1,typeof Dt<"u"&&Dt&&(Dt.innerText=X("showSynopsis")),Rn();return}if(s.name==="backCover_mesh"){window.showFullPlotModal(a.userData);return}Ad()}}});let Ar=null;window.addEventListener("wheel",n=>{document.getElementById("ks-manager")||document.getElementById("assign-category-overlay")||document.getElementById("help-modal-overlay")||document.getElementById("metadata-manager-overlay")||document.getElementById("highlights-manager-overlay")||Ar||(Math.abs(n.deltaX)>Math.abs(n.deltaY)&&Math.abs(n.deltaX)>20?(n.deltaX>0?ui(1):ui(-1),Ar=setTimeout(()=>{Ar=null},300)):Math.abs(n.deltaY)>Math.abs(n.deltaX)&&Math.abs(n.deltaY)>20&&(n.deltaY>0?ur(-1):ur(1),Ar=setTimeout(()=>{Ar=null},500)))});window.addEventListener("keydown",n=>{if(document.activeElement.tagName==="INPUT")return;const e=document.getElementById("reader-overlay");if(!(e&&e.style.display==="block")&&!document.getElementById("ks-manager")&&!document.getElementById("assign-category-overlay")&&!document.getElementById("help-modal-overlay")&&!document.getElementById("metadata-manager-overlay")&&!document.getElementById("highlights-manager-overlay")){if(n.key==="ArrowRight")ui(1);else if(n.key==="ArrowLeft")ui(-1);else if(n.key==="ArrowUp")ur(1);else if(n.key==="ArrowDown")ur(-1);else if((n.key==="Enter"||n.key===" ")&&(n.preventDefault(),Se.length>0))if(!Wt)Dt.click();else{const t=Se[ot];t&&t.userData.epubPath&&window.openReader(t.userData.epubPath,t.userData.id)}}});window.addEventListener("pointermove",n=>{rr.x=n.clientX/window.innerWidth*2-1,rr.y=-(n.clientY/window.innerHeight)*2+1,Ds.setFromCamera(rr,pt);const e=Ds.intersectObjects(cr.children,!0);e.length>0&&e[0].object.name==="backCover_mesh"?document.body.style.cursor="pointer":document.body.style.cursor="auto"});window.addEventListener("readerClosed",()=>{fetch("/api/books").then(e=>e.json()).then(e=>{const t=new Map(e.map(i=>[i.id,i]));Se.forEach(i=>{const r=t.get(i.userData.id);r&&(i.userData.progress=r.progress)}),Zo()}).catch(()=>{}),document.querySelector(".top-bar").style.opacity="1",ct.style.opacity="1",Mt.style.opacity="1",Et.style.opacity="1",Pi.style.opacity="1",rt.style.opacity="1",rt.style.pointerEvents="auto";const n=Se[ot];n&&n.userData.hasHinge&&(n.userData.hinge.userData.targetRotY=0),Rn()});function Cd(){requestAnimationFrame(Cd),pt.position.x=On.lerp(pt.position.x,ir.dx,.08),pt.position.y=On.lerp(pt.position.y,zs+ir.dy,.05),pt.position.z=On.lerp(pt.position.z,ir.z,.08),Pn.position.y=pt.position.y+10,Se.forEach(n=>{n.userData.targetX!==void 0&&(n.position.x=On.lerp(n.position.x,n.userData.targetX,.1),n.position.y=On.lerp(n.position.y,n.userData.targetY,.1),n.position.z=On.lerp(n.position.z,n.userData.targetZ,.1),n.rotation.y=On.lerp(n.rotation.y,n.userData.targetRotY,.1)),n.userData.hasHinge&&n.userData.hinge.userData.targetRotY!==void 0&&(n.userData.hinge.rotation.y=On.lerp(n.userData.hinge.rotation.y,n.userData.hinge.userData.targetRotY,.08))}),document.getElementById("ks-manager")||hn.render(fn,pt)}window.addEventListener("resize",()=>{pt.aspect=window.innerWidth/window.innerHeight,Yo(),pt.updateProjectionMatrix(),hn.setSize(window.innerWidth,window.innerHeight,!1)});const J0="https://api.github.com/repos/GabrieleTrovato01/KoreShelf/releases/latest";function Tc(n){const e=String(n||"").match(/(\d+)\.(\d+)(?:\.(\d+))?/);return e?[Number(e[1]),Number(e[2]),Number(e[3]||0)]:null}function Q0(n,e){const t=Tc(n),i=Tc(e);if(!t||!i)return!1;for(let r=0;r<3;r++)if(t[r]!==i[r])return t[r]>i[r];return!1}async function ex(){try{const n=(await(await fetch("/api/ping")).json()).version,e=await fetch(J0);if(!e.ok)throw new Error("Network response was not ok");const t=await e.json();Q0(t.tag_name,n)&&tx(t.tag_name,t.html_url)}catch(n){console.warn("Controllo aggiornamenti non riuscito:",n)}}async function Rd(){if(typeof pdfjsLib>"u"){console.warn(X("logpdfjs"));return}const t=(await(await fetch("/api/books")).json()).filter(i=>i.epubPath&&i.epubPath.toLowerCase().endsWith(".pdf")&&!i.coverPath);if(t.length!==0){console.log(X("logGeneratePdfCovers",{count:t.length})),pdfjsLib.GlobalWorkerOptions.workerSrc||(pdfjsLib.GlobalWorkerOptions.workerSrc="/vendor/pdf.worker.min.js");for(const i of t)try{console.log(X("logGeneratePdfCover",{title:i.title}));const a=await(await pdfjsLib.getDocument(`/${i.epubPath}`).promise).getPage(1),c=512/a.getViewport({scale:1}).width,l=a.getViewport({scale:c}),u=document.createElement("canvas");u.width=l.width,u.height=l.height;const f=u.getContext("2d");await a.render({canvasContext:f,viewport:l}).promise;const d=await new Promise(p=>u.toBlob(p,"image/jpeg",.85));if(d){const p=new FormData;p.append("cover",d,`cover_${i.id}.jpg`);const x=await fetch(`/api/books/${i.id}/cover`,{method:"POST",body:p});if(x.ok){const b=await x.json();console.log(X("logCoverGenerated",{title:i.title}));const m=Se.find(h=>h.userData.id===i.id);if(m){const h=`/${b.coverPath}`,y=await q0.loadTexture(h);m.material[4].map=y,m.material[4].color.setHex(16777215),m.material[4].needsUpdate=!0}}else console.warn(X("logCoverGenerationError",{title:i.title,statusText:x.statusText}))}}catch(r){console.warn(X("logCoverGenerationFailed",{title:i.title,errorMessage:r.message}))}console.log(X("logPdfCoversGenerated"))}}function tx(n,e){if(document.getElementById("lorekeeper-update-banner"))return;const t=document.createElement("div");t.id="lorekeeper-update-banner",Object.assign(t.style,{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",backgroundColor:"rgba(43, 43, 43, 0.85)",backdropFilter:"blur(10px)",webkitBackdropFilter:"blur(10px)",color:"#ffffff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0, 0, 0, 0.3)",zIndex:"9999",display:"flex",alignItems:"center",gap:"20px",fontFamily:"'Segoe UI', system-ui, sans-serif",border:"1px solid rgba(255, 255, 255, 0.2)"});const i=X("updateAvailable").replace("{version}",n),r=X("updateDownload");t.innerHTML=`
        <span style="font-size: 14px; letter-spacing: 0.5px;">${i}</span>
        <a href="${e}" target="_blank" class="modern-btn" style="
            background-color: rgba(76, 175, 80, 0.2); 
            border: 1px solid rgba(76, 175, 80, 0.5);
            color: #81c784; 
            padding: 8px 20px; 
            text-decoration: none; 
            font-size: 12px;
            margin-left: 10px;
        " onmouseover="this.style.backgroundColor='rgba(76, 175, 80, 0.4)'; this.style.transform='translateY(-2px)';" 
           onmouseout="this.style.backgroundColor='rgba(76, 175, 80, 0.2)'; this.style.transform='translateY(0)';">
           ${r}
        </a>
        <button id="close-update-banner" style="
            background: transparent; 
            border: none; 
            color: rgba(255,255,255,0.5); 
            font-size: 20px; 
            cursor: pointer; 
            padding: 0; 
            transition: color 0.3s;
        " onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">×</button>
    `,document.body.appendChild(t),document.getElementById("close-update-banner").addEventListener("click",()=>{t.style.opacity="0",t.style.transform="translateX(-50%) translateY(-20px)",t.style.transition="all 0.4s ease",setTimeout(()=>t.remove(),400)})}let Ts=null;const Qi=new Set;async function fr({focusBookId:n=null}={}){var r;const e=await(await fetch("/api/books")).json(),t=new Map(Se.map(s=>[s.userData.id,{x:s.position.x,y:s.position.y,z:s.position.z,rotY:s.rotation.y,cover:s.material[4]&&s.material[4].map&&!s.material[4].map.isCanvasTexture?s.material[4].map:null}]));Ts=n??((r=Se[ot])==null?void 0:r.userData.id)??null,cr.clear(),Se=[];const i=[];fn.children.forEach(s=>{s.material===Xo&&i.push(s)}),i.forEach(s=>{fn.remove(s),s.geometry&&s.geometry.dispose()}),await Ed(e),Se.forEach(s=>{const a=t.get(s.userData.id);a&&(s.position.set(a.x,a.y,a.z),s.rotation.y=a.rotY,a.cover&&s.material[4]&&(s.material[4].map=a.cover,s.material[4].color.setHex(16777215),s.material[4].needsUpdate=!0))})}function Is(n){n.updateMatrixWorld(!0),pt.updateMatrixWorld(!0);const e=n.userData.thickness/2;let t=1/0,i=1/0,r=-1/0,s=-1/0;for(const[a,o]of[[-1,-1.5],[1,-1.5],[-1,1.5],[1,1.5]]){const c=new z(a,o,e);n.localToWorld(c),c.project(pt);const l=(c.x+1)/2*window.innerWidth,u=(1-c.y)/2*window.innerHeight;t=Math.min(t,l),r=Math.max(r,l),i=Math.min(i,u),s=Math.max(s,u)}return{x:t,y:i,width:r-t,height:s-i}}function nx(n){return new Promise(e=>{const t=new td;t.setOptions({imageOrientation:"flipY"}),t.load(n,i=>{const r=new At(i);r.generateMipmaps=!1,r.minFilter=xt,r.magFilter=xt,r.needsUpdate=!0,e(r)},void 0,()=>e(null))})}const ix=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2,Cr=(n,e,t)=>n+(e-n)*t;async function rx(n,e){Qi.delete(e.id),await fr();const t=Se.findIndex(p=>p.userData.id===e.id);if(t===-1){n.landed();return}const i=Se[t],r=e.coverPath?nx(`/${e.coverPath}`):Promise.resolve(null);i.visible=!1,Ci&&(Ps(!1),ct.style.opacity="1",Mt.style.opacity="1",Et.style.opacity="1",Gt.style.display="block"),ot=t,Wt=!1,Rn(),i.position.set(i.userData.targetX,i.userData.targetY,i.userData.targetZ),i.rotation.y=i.userData.targetRotY;const s=n.launch(),a=s.startRect,o=1900,c=performance.now();let l=null,u=0;await new Promise(p=>{const x=b=>{const m=!!(ii&&ii.requested),h=m?1:Math.min(1,(b-c)/o),y=ix(h),T=Is(i),E=Math.sin(Math.PI*h)*Math.min(140,window.innerHeight*.18);if(s.place(Cr(a.x,T.x,y),Cr(a.y,T.y,y)-E,Cr(a.width,T.width,y),Cr(a.height,T.height,y),Cr(-28,-360,y)),h<1)return requestAnimationFrame(x);const L=l?Math.abs(T.x-l.x)+Math.abs(T.y-l.y)+Math.abs(T.height-l.height):1/0;l=T,u=L<.75?u+1:0,m||u>=2||b-c>o+2500?p():requestAnimationFrame(x)};requestAnimationFrame(x)});const f=ii&&ii.requested?0:600,d=await Promise.race([r,new Promise(p=>setTimeout(()=>p(null),f))]);d&&i.material[4]&&(i.material[4].map=d,i.material[4].color.setHex(16777215),i.material[4].needsUpdate=!0),i.visible=!0,s.land(Is(i),{instant:!!(ii&&ii.requested)}),n.landed()}window.__koreshelf={activeBookId:()=>{var n;return((n=Se[ot])==null?void 0:n.userData.id)??null},bookScreenRect:n=>{const e=Se.find(t=>t.userData.id===n);return e?Is(e):null},isBookVisible:n=>{var e;return!!((e=Se.find(t=>t.userData.id===n))!=null&&e.visible)},visibleBookIds:()=>Se.filter(n=>n.visible).map(n=>n.userData.id),cameraY:()=>pt.position.y,cameraTargetY:()=>zs,cameraState:()=>({x:pt.position.x,y:pt.position.y,z:pt.position.z,fit:{...ir}}),viewingBoard:()=>Ci,shelfSize:()=>{const n=Se[ot];return n?Se.filter(e=>e.userData.category===n.userData.category).length:0}};async function sx(){const n=document.getElementById("loading-screen"),e=document.getElementById("loading-text"),t=localStorage.getItem("KoreShelf_lang")||"it";try{fetch("/api/sync-language",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lang:t})}).catch(i=>{}),e&&(e.innerText=t==="it"?"Caricamento lingua...":"Loading language..."),await Hd(),W0(),typeof window.translateReaderUI=="function"&&window.translateReaderUI(),e&&(e.innerText=t==="it"?"Allestimento scaffali...":"Setting up shelves..."),await Ed(),Rd().catch(i=>{console.warn("Errore generazione copertine PDF:",i)}),Cd(),ex(),n&&(n.style.opacity="0",setTimeout(()=>{n.style.display="none"},500))}catch(i){console.error("Errore durante l'avvio dell'app:",i),e&&(e.innerText="Error / Errore")}}Yo();sx();window.addEventListener("onHighlightAdded",n=>{const{bookId:e,highlight:t}=n.detail,i=Se.find(r=>r.userData.id===e);i&&(i.userData.highlights||(i.userData.highlights=[]),i.userData.highlights.push(t),window.highlightsBoardModule&&window.highlightsBoardModule.addHighlightLocally(i.userData))});window.addEventListener("onHighlightRemoved",n=>{const{bookId:e,cfi:t}=n.detail,i=Se.find(r=>r.userData.id===e);i&&i.userData.highlights&&(i.userData.highlights=i.userData.highlights.filter(r=>r.cfi!==t),window.highlightsBoardModule&&window.highlightsBoardModule.removeHighlightLocally(e,t))});export{ci as B,Go as C,Ji as G,si as M,If as R,z as V,Ht as a,Wr as b,je as c,X as t};
