(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Dd="modulepreload",Id=function(i){return"/"+i},ll={},xi=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(l=>{if(l=Id(l),l in ll)return;ll[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Dd,c||(h.as="script"),h.crossOrigin="",h.href=l,o&&h.setAttribute("nonce",o),document.head.appendChild(h),c)return new Promise((d,p)=>{h.addEventListener("load",d),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},Ud=(i,e,t)=>{const n=i[e];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((r,s)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==t?". Note that variables only represent file names one level deep.":""))))})};let qs=localStorage.getItem("KoreShelf_lang")||"en",Ki={};async function Nd(){qs=localStorage.getItem("KoreShelf_lang")||"it";try{Ki=(await Ud(Object.assign({"./locales/de.js":()=>xi(()=>import("./de-CS3YEn0w.js"),[]),"./locales/en.js":()=>xi(()=>import("./en-CRx5MBi2.js"),[]),"./locales/es.js":()=>xi(()=>import("./es-CW4WmjE9.js"),[]),"./locales/fr.js":()=>xi(()=>import("./fr-xyiSCuPn.js"),[]),"./locales/it.js":()=>xi(()=>import("./it-D5aMtZ-i.js"),[])}),`./locales/${qs}.js`,3)).default,console.log(`Lingua caricata: ${qs}`)}catch(i){console.error("Errore nel caricamento della lingua:",i),Ki=(await xi(()=>import("./it-D5aMtZ-i.js"),[])).default}}function N(i){return!Ki||Object.keys(Ki).length===0?"":Ki[i]?Ki[i]:(console.warn(`Traduzione mancante per: ${i}`),i)}function Fd(i,e){let t=i;const n=document.createElement("div");n.id="category-manager-overlay",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100vh",n.style.background="rgba(0,0,0,0.7)",n.style.zIndex="2000",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.backdropFilter="blur(5px)",n.style.opacity="0",n.style.transition="opacity 0.3s ease";const r=document.createElement("style");r.innerHTML=`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
        .menu-btn { width: 100%; text-align: left; padding: 15px 20px; font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
        .menu-btn:hover { background: rgba(255,255,255,0.15) !important; transform: translateX(5px); }
        .cat-select-btn { justify-content: space-between; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }
    `,document.head.appendChild(r);const s=document.createElement("div");s.className="glass-effect",s.style.background="rgba(30, 30, 30, 0.95)",s.style.padding="30px",s.style.borderRadius="20px",s.style.width="500px",s.style.maxWidth="90%",s.style.position="relative",s.style.boxShadow="0 15px 35px rgba(0,0,0,0.5)";const a=document.createElement("button");a.innerHTML="&times;",a.style.position="absolute",a.style.top="15px",a.style.right="20px",a.style.background="none",a.style.border="none",a.style.color="white",a.style.fontSize="26px",a.style.cursor="pointer",a.style.opacity="0.7";const o=document.createElement("div");s.appendChild(a),s.appendChild(o),n.appendChild(s),document.body.appendChild(n),setTimeout(()=>n.style.opacity="1",10);const l=()=>{n.style.opacity="0",setTimeout(()=>{n.remove(),r.remove()},300)};a.onclick=l,n.addEventListener("click",E=>{E.target===n&&l()});const c=E=>`
        <div style="display: flex; align-items: center; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
            <button id="back-btn" style="background: none; border: none; color: #4da6ff; font-size: 20px; cursor: pointer; padding: 0 10px 0 0;" aria-label="Indietro">${KS_ICON("chevronLeft",20)}</button>
            <h3 style="margin: 0; font-family: sans-serif;">${E}</h3>
        </div>
    `,u=()=>e.filter(E=>E.userData.category===t),h=()=>e.filter(E=>E.userData.category!==t),d=()=>[...new Set(e.map(S=>S.userData.category))].sort((S,C)=>S==="Senza Categoria"?-1:C==="Senza Categoria"?1:S.localeCompare(C));function p(){const E=d();let S=`
            <h2 style="margin-top: 0; margin-bottom: 10px; text-align: center; font-family: sans-serif;">${N("catManagerTitle")}</h2>
            <p style="text-align: center; color: #aaa; font-size: 14px; margin-bottom: 25px;">${N("catManagerSubtitle")}</p>
            <div class="custom-scrollbar" style="max-height: 350px; overflow-y: auto; padding-right: 5px;">
        `;E.forEach(C=>{const T=e.filter(_=>_.userData.category===C).length,A=C==="Senza Categoria";S+=`
                <button class="modern-btn glass-effect menu-btn cat-select-btn" data-cat="${C}">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 18px;">${KS_ICON(A?"inbox":"folder",18)}</span>
                        <span>${C.toUpperCase()}</span>
                    </div>
                    <span style="background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 20px; font-size: 12px; color: #ddd;">${T} ${N("booksCount")}</span>
                </button>
            `}),S+="</div>",o.innerHTML=S,document.querySelectorAll(".cat-select-btn").forEach(C=>{C.onclick=T=>{t=T.currentTarget.getAttribute("data-cat"),x()}})}function x(){const E=t==="Senza Categoria";let S=c(N("shelfOptions"));S+=`<h4 style="margin-top: -10px; margin-bottom: 25px; color: #4da6ff; text-align: center; font-size: 18px; letter-spacing: 1px;">${t.toUpperCase()}</h4>`,E?S+=`<div style="text-align: center; color: #aaa; font-size: 13px; margin-bottom: 20px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px;">${N("systemShelfNote")}</div>`:S+=`<button id="nav-rename" class="modern-btn glass-effect menu-btn" style="background: rgba(0, 150, 255, 0.2); border: 1px solid rgba(0, 150, 255, 0.4);">${N("renameShelfBtn")}</button>`,S+=`
            <button id="nav-create" class="modern-btn glass-effect menu-btn" style="background: rgba(255, 165, 0, 0.2); border: 1px solid rgba(255, 165, 0, 0.4);">${N("createNewCatBtn")}</button>
            <button id="nav-import" class="modern-btn glass-effect menu-btn" style="background: rgba(40, 167, 69, 0.2); border: 1px solid rgba(40, 167, 69, 0.4);">${N("addBooksToCatBtn")}</button>
        `,E||(S+=`<button id="nav-delete" class="modern-btn glass-effect menu-btn" style="background: rgba(200, 50, 50, 0.2); border: 1px solid rgba(200, 50, 50, 0.4); color: #ff8888;">${N("deleteShelfBtn")}</button>`),o.innerHTML=S,document.getElementById("back-btn").onclick=p,E||(document.getElementById("nav-rename").onclick=b),document.getElementById("nav-create").onclick=m,document.getElementById("nav-import").onclick=f,E||(document.getElementById("nav-delete").onclick=y)}function b(){o.innerHTML=`
            ${c(N("renameTitle"))}
            <label style="display: block; margin-bottom: 8px; font-weight: bold; font-size: 14px; color: #ccc;">${N("chooseNewName")} <span style="color:white">${t}</span>:</label>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <input type="text" id="rename-input" class="modern-input" value="${t}" style="flex-grow: 1; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <button id="action-rename" class="modern-btn glass-effect" style="padding: 10px 20px; background: rgba(0, 150, 255, 0.4); border: 1px solid rgba(0, 150, 255, 0.6);">${N("saveBtn")}</button>
            </div>
        `,document.getElementById("back-btn").onclick=x,document.getElementById("action-rename").onclick=async()=>{const E=document.getElementById("rename-input").value.trim();if(!E){alert(N("emptyNameAlert"));return}if(E===t){alert(N("sameNameAlert"));return}const S=document.getElementById("action-rename");S.innerText=N("savingBtn"),S.disabled=!0;try{const C=await fetch("/api/categories",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldName:t,newName:E,action:"rename"})});if(!C.ok)throw new Error(`Errore di rete. Codice: ${C.status}`);const T=await C.json();T.success?location.reload():(alert("Ops: "+T.message),S.innerText=N("saveBtn"),S.disabled=!1)}catch(C){console.error(C),alert(N("serverError")),S.innerText=N("saveBtn"),S.disabled=!1}}}function m(){const E=u(),S=d().filter(T=>T!==t&&T!=="Senza Categoria");o.innerHTML=`
            ${c(N("createMoveTitle"))}
            
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px;">
                <label style="font-size: 14px; color: #ccc;">${N("selectToMove")} <span style="color:white">${t}</span>:</label>
                ${E.length>0?`
                <label style="font-size: 12px; color: #ffaa00; cursor: pointer; display: flex; align-items: center; gap: 5px; background: rgba(255,170,0,0.1); padding: 4px 8px; border-radius: 6px;">
                    <input type="checkbox" id="select-all-export" style="accent-color: #ffaa00; cursor: pointer; width: 14px; height: 14px;"> ${N("selectAll")}
                </label>`:""}
            </div>

            <div class="custom-scrollbar" style="max-height: 200px; overflow-y: auto; background: rgba(0,0,0,0.5); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 15px;">
                ${E.length===0?'<div style="padding: 15px; text-align: center; color: #888; font-size: 13px;">'+N("noBooksOnShelf")+"</div>":""}
                ${E.map(T=>`
                    <label style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;">
                        <input type="checkbox" class="export-checkbox" value="${T.userData.id}" style="width: 16px; height: 16px; accent-color: #ffaa00; cursor: pointer;">
                        <span style="font-weight: bold; font-size: 13px; color: white;">${T.userData.title}</span>
                    </label>
                `).join("")}
            </div>
            
            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #ccc;">${N("newCatNameLabel")}</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="new-cat-input" list="cat-suggestions" placeholder="${N("newCatPlaceholder")}" class="modern-input" style="flex-grow: 1; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <datalist id="cat-suggestions">${S.map(T=>`<option value="${T}">`).join("")}</datalist>
                <button id="action-create" class="modern-btn glass-effect" style="padding: 10px 20px; background: rgba(255, 165, 0, 0.4); border: 1px solid rgba(255, 165, 0, 0.6);">${N("transferBtn")}</button>
            </div>
        `,document.getElementById("back-btn").onclick=x;const C=document.getElementById("select-all-export");C&&(C.onchange=T=>{document.querySelectorAll(".export-checkbox").forEach(A=>A.checked=T.target.checked)}),document.getElementById("action-create").onclick=async()=>{const T=Array.from(document.querySelectorAll(".export-checkbox:checked")).map(_=>_.value),A=document.getElementById("new-cat-input").value.trim();if(T.length===0){alert(N("selectMoveError"));return}if(!A){alert(N("writeCatNameError"));return}try{const w=await(await fetch("/api/books/bulk-tags",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({bookIds:T,newTag:A})})).json();w.success?location.reload():alert(w.message)}catch(_){console.error(_)}}}function f(){const E=h();o.innerHTML=`
            ${c(N("importTitle"))}
            
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px;">
                <label style="font-size: 14px; color: #ccc;">${N("selectToImport")} <span style="color:white">${t}</span>:</label>
                ${E.length>0?`
                <label style="font-size: 12px; color: #4da6ff; cursor: pointer; display: flex; align-items: center; gap: 5px; background: rgba(77,166,255,0.1); padding: 4px 8px; border-radius: 6px;">
                    <input type="checkbox" id="select-all-import" style="accent-color: #4da6ff; cursor: pointer; width: 14px; height: 14px;"> ${N("selectAll")}
                </label>`:""}
            </div>

            <div class="custom-scrollbar" style="max-height: 250px; overflow-y: auto; background: rgba(0,0,0,0.5); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 15px;">
                ${E.length===0?'<div style="padding: 15px; text-align: center; color: #888; font-size: 13px;">'+N("allBooksAlreadyHere")+"</div>":""}
                ${E.map(C=>`
                    <label style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;">
                        <input type="checkbox" class="import-checkbox" value="${C.userData.id}" style="width: 16px; height: 16px; accent-color: #4da6ff; cursor: pointer;">
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-weight: bold; font-size: 13px; color: white;">${C.userData.title}</span>
                            <span style="font-size: 11px; color: #aaa;">In: ${C.userData.category}</span>
                        </div>
                    </label>
                `).join("")}
            </div>
            <button id="action-import" class="modern-btn glass-effect" style="width: 100%; background: rgba(40, 167, 69, 0.4); border: 1px solid rgba(40, 167, 69, 0.6);">${N("importSelectedBtn")}</button>
        `,document.getElementById("back-btn").onclick=x;const S=document.getElementById("select-all-import");S&&(S.onchange=C=>{document.querySelectorAll(".import-checkbox").forEach(T=>T.checked=C.target.checked)}),document.getElementById("action-import").onclick=async()=>{const C=Array.from(document.querySelectorAll(".import-checkbox:checked")).map(T=>T.value);if(C.length===0){alert(N("selectImportError"));return}try{const A=await(await fetch("/api/books/bulk-tags",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({bookIds:C,newTag:t})})).json();A.success?location.reload():alert(A.message)}catch(T){console.error(T)}}}function y(){o.innerHTML=`
            ${c(N("deleteTitle"))}
            <div style="background: rgba(200, 50, 50, 0.2); border: 1px solid rgba(200, 50, 50, 0.4); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
                <h3 style="color: #ff8888; margin-top: 0;">${N("deleteWarningTitle")}</h3>
                <p style="font-size: 14px; line-height: 1.5; margin-bottom: 0;">${N("deleteWarningText").replace("{cat}",t)}</p>
            </div>
            <button id="action-delete" class="modern-btn glass-effect" style="width: 100%; background: rgba(200, 50, 50, 0.5); color: white; border: 1px solid rgba(200, 50, 50, 0.8);">${N("confirmDeleteBtn")}</button>
        `,document.getElementById("back-btn").onclick=x,document.getElementById("action-delete").onclick=async()=>{try{const S=await(await fetch("/api/categories",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldName:t,newName:null,action:"delete"})})).json();S.success?location.reload():alert(S.message)}catch(E){console.error(E)}}}p()}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Eo="184",kd=0,cl=1,Od=2,Ar=1,Bd=2,Tr=3,ai=0,Ht=1,kn=2,zn=0,Ji=1,dl=2,ul=3,hl=4,zd=5,vi=100,Hd=101,Gd=102,Vd=103,Wd=104,Xd=200,qd=201,Yd=202,$d=203,La=204,Da=205,Kd=206,jd=207,Zd=208,Jd=209,Qd=210,eu=211,tu=212,nu=213,iu=214,Ia=0,Ua=1,Na=2,ir=3,Fa=4,ka=5,Oa=6,Ba=7,Sc=0,ru=1,su=2,bn=0,Mc=1,Ec=2,Tc=3,wc=4,Ac=5,Cc=6,Rc=7,Pc=300,Ti=301,rr=302,Ys=303,$s=304,Ps=306,Pr=1e3,On=1001,za=1002,Rt=1003,au=1004,qr=1005,pt=1006,Ks=1007,bi=1008,Yt=1009,Lc=1010,Dc=1011,Lr=1012,To=1013,En=1014,_n=1015,Vn=1016,wo=1017,Ao=1018,Dr=1020,Ic=35902,Uc=35899,Nc=1021,Fc=1022,ln=1023,Wn=1026,Si=1027,kc=1028,Co=1029,wi=1030,Ro=1031,Po=1033,ps=33776,ms=33777,gs=33778,xs=33779,Ha=35840,Ga=35841,Va=35842,Wa=35843,Xa=36196,qa=37492,Ya=37496,$a=37488,Ka=37489,Ss=37490,ja=37491,Za=37808,Ja=37809,Qa=37810,eo=37811,to=37812,no=37813,io=37814,ro=37815,so=37816,ao=37817,oo=37818,lo=37819,co=37820,uo=37821,ho=36492,fo=36494,po=36495,mo=36283,go=36284,Ms=36285,xo=36286,ou=3200,_o=0,lu=1,ni="",jt="srgb",Es="srgb-linear",Ts="linear",je="srgb",Ii=7680,fl=519,cu=512,du=513,uu=514,Lo=515,hu=516,fu=517,Do=518,pu=519,pl=35044,ml="300 es",vn=2e3,Ir=2001;function mu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gu(){const i=Ur("canvas");return i.style.display="block",i}const gl={};function xl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Oc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ae(...i){i=Oc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=Oc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function vo(...i){const e=i.join(" ");e in gl||(gl[e]=!0,Ae(...i))}function xu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const _u={[Ia]:Ua,[Na]:Oa,[Fa]:Ba,[ir]:ka,[Ua]:Ia,[Oa]:Na,[Ba]:Fa,[ka]:ir};class Pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _l=1234567;const Cr=Math.PI/180,Nr=180/Math.PI;function dr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function Io(i,e){return(i%e+e)%e}function vu(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function yu(i,e,t){return i!==e?(t-i)/(e-i):0}function Rr(i,e,t){return(1-t)*i+t*e}function bu(i,e,t,n){return Rr(i,e,1-Math.exp(-t*n))}function Su(i,e=1){return e-Math.abs(Io(i,e*2)-e)}function Mu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Eu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Tu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function wu(i,e){return i+Math.random()*(e-i)}function Au(i){return i*(.5-Math.random())}function Cu(i){i!==void 0&&(_l=i);let e=_l+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ru(i){return i*Cr}function Pu(i){return i*Nr}function Lu(i){return(i&i-1)===0&&i!==0}function Du(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Iu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Uu(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),x=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*x,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*x,o*c);break;case"ZYZ":i.set(l*x,l*p,o*u,o*c);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function $i(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Fn={DEG2RAD:Cr,RAD2DEG:Nr,generateUUID:dr,clamp:He,euclideanModulo:Io,mapLinear:vu,inverseLerp:yu,lerp:Rr,damp:bu,pingpong:Su,smoothstep:Mu,smootherstep:Eu,randInt:Tu,randFloat:wu,randFloatSpread:Au,seededRandom:Cu,degToRad:Ru,radToDeg:Pu,isPowerOfTwo:Lu,ceilPowerOfTwo:Du,floorPowerOfTwo:Iu,setQuaternionFromProperEuler:Uu,normalize:kt,denormalize:$i},Ko=class Ko{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ko.prototype.isVector2=!0;let $e=Ko;class ur{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],d=s[a+0],p=s[a+1],x=s[a+2],b=s[a+3];if(h!==b||l!==d||c!==p||u!==x){let m=l*d+c*p+u*x+h*b;m<0&&(d=-d,p=-p,x=-x,b=-b,m=-m);let f=1-o;if(m<.9995){const y=Math.acos(m),E=Math.sin(y);f=Math.sin(f*y)/E,o=Math.sin(o*y)/E,l=l*f+d*o,c=c*f+p*o,u=u*f+x*o,h=h*f+b*o}else{l=l*f+d*o,c=c*f+p*o,u=u*f+x*o,h=h*f+b*o;const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],d=s[a+1],p=s[a+2],x=s[a+3];return e[t]=o*x+u*h+l*p-c*d,e[t+1]=l*x+u*d+c*h-o*p,e[t+2]=c*x+u*p+o*d-l*h,e[t+3]=u*x-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),d=l(n/2),p=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*p*x,this._y=c*p*h-d*u*x,this._z=c*u*x+d*p*h,this._w=c*u*h-d*p*x;break;case"YXZ":this._x=d*u*h+c*p*x,this._y=c*p*h-d*u*x,this._z=c*u*x-d*p*h,this._w=c*u*h+d*p*x;break;case"ZXY":this._x=d*u*h-c*p*x,this._y=c*p*h+d*u*x,this._z=c*u*x+d*p*h,this._w=c*u*h-d*p*x;break;case"ZYX":this._x=d*u*h-c*p*x,this._y=c*p*h+d*u*x,this._z=c*u*x-d*p*h,this._w=c*u*h+d*p*x;break;case"YZX":this._x=d*u*h+c*p*x,this._y=c*p*h+d*u*x,this._z=c*u*x-d*p*h,this._w=c*u*h-d*p*x;break;case"XZY":this._x=d*u*h-c*p*x,this._y=c*p*h-d*u*x,this._z=c*u*x+d*p*h,this._w=c*u*h+d*p*x;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const jo=class jo{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return js.copy(this).projectOnVector(e),this.sub(js)}reflect(e){return this.sub(js.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};jo.prototype.isVector3=!0;let z=jo;const js=new z,vl=new ur,Zo=class Zo{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],p=n[5],x=n[8],b=r[0],m=r[3],f=r[6],y=r[1],E=r[4],S=r[7],C=r[2],T=r[5],A=r[8];return s[0]=a*b+o*y+l*C,s[3]=a*m+o*E+l*T,s[6]=a*f+o*S+l*A,s[1]=c*b+u*y+h*C,s[4]=c*m+u*E+h*T,s[7]=c*f+u*S+h*A,s[2]=d*b+p*y+x*C,s[5]=d*m+p*E+x*T,s[8]=d*f+p*S+x*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,p=c*s-a*l,x=t*h+n*d+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/x;return e[0]=h*b,e[1]=(r*c-u*n)*b,e[2]=(o*n-r*a)*b,e[3]=d*b,e[4]=(u*t-r*l)*b,e[5]=(r*s-o*t)*b,e[6]=p*b,e[7]=(n*l-c*t)*b,e[8]=(a*t-n*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Zs.makeScale(e,t)),this}rotate(e){return this.premultiply(Zs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Zo.prototype.isMatrix3=!0;let Le=Zo;const Zs=new Le,yl=new Le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bl=new Le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nu(){const i={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===je&&(r.r=Hn(r.r),r.g=Hn(r.g),r.b=Hn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===je&&(r.r=Qi(r.r),r.g=Qi(r.g),r.b=Qi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ni?Ts:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return vo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return vo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Es]:{primaries:e,whitePoint:n,transfer:Ts,toXYZ:yl,fromXYZ:bl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:n,transfer:je,toXYZ:yl,fromXYZ:bl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),i}const Ge=Nu();function Hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ui;class Fu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ui===void 0&&(Ui=Ur("canvas")),Ui.width=e.width,Ui.height=e.height;const r=Ui.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Ui}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ur("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Hn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hn(t[n]/255)*255):t[n]=Hn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ku=0;class Uo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=dr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Js(r[a].image)):s.push(Js(r[a]))}else s=Js(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Js(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let Ou=0;const Qs=new z;class Tt extends Pi{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=On,r=On,s=pt,a=bi,o=ln,l=Yt,c=Tt.DEFAULT_ANISOTROPY,u=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=dr(),this.name="",this.source=new Uo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Qs).x}get height(){return this.source.getSize(Qs).y}get depth(){return this.source.getSize(Qs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pr:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pr:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Pc;Tt.DEFAULT_ANISOTROPY=1;const Jo=class Jo{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],x=l[9],b=l[2],m=l[6],f=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-b)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+b)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,S=(p+1)/2,C=(f+1)/2,T=(u+d)/4,A=(h+b)/4,_=(x+m)/4;return E>S&&E>C?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=T/n,s=A/n):S>C?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=T/r,s=_/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=A/s,r=_/s),this.set(n,r,s,t),this}let y=Math.sqrt((m-x)*(m-x)+(h-b)*(h-b)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(h-b)/y,this.z=(d-u)/y,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Jo.prototype.isVector4=!0;let ht=Jo;class Bu extends Pi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Tt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Uo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sn extends Bu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bc extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zu extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Rs=class Rs{constructor(e,t,n,r,s,a,o,l,c,u,h,d,p,x,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,h,d,p,x,b,m)}set(e,t,n,r,s,a,o,l,c,u,h,d,p,x,b,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=x,f[11]=b,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rs().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),a=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*h,x=o*u,b=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+x*c,t[5]=d-b*c,t[9]=-o*l,t[2]=b-d*c,t[6]=x+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,x=c*u,b=c*h;t[0]=d+b*o,t[4]=x*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-x,t[6]=b+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,x=c*u,b=c*h;t[0]=d-b*o,t[4]=-a*h,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*u,t[9]=b-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*h,x=o*u,b=o*h;t[0]=l*u,t[4]=x*c-p,t[8]=d*c+b,t[1]=l*h,t[5]=b*c+d,t[9]=p*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,x=o*l,b=o*c;t[0]=l*u,t[4]=b-d*h,t[8]=x*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+x,t[10]=d-b*h}else if(e.order==="XZY"){const d=a*l,p=a*c,x=o*l,b=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+b,t[5]=a*u,t[9]=p*h-x,t[2]=x*h-p,t[6]=o*u,t[10]=b*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hu,e,Gu)}lookAt(e,t,n){const r=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Kn.crossVectors(n,Xt),Kn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Kn.crossVectors(n,Xt)),Kn.normalize(),Yr.crossVectors(Xt,Kn),r[0]=Kn.x,r[4]=Yr.x,r[8]=Xt.x,r[1]=Kn.y,r[5]=Yr.y,r[9]=Xt.y,r[2]=Kn.z,r[6]=Yr.z,r[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],p=n[13],x=n[2],b=n[6],m=n[10],f=n[14],y=n[3],E=n[7],S=n[11],C=n[15],T=r[0],A=r[4],_=r[8],w=r[12],U=r[1],R=r[5],B=r[9],X=r[13],q=r[2],I=r[6],H=r[10],V=r[14],Z=r[3],ee=r[7],le=r[11],ge=r[15];return s[0]=a*T+o*U+l*q+c*Z,s[4]=a*A+o*R+l*I+c*ee,s[8]=a*_+o*B+l*H+c*le,s[12]=a*w+o*X+l*V+c*ge,s[1]=u*T+h*U+d*q+p*Z,s[5]=u*A+h*R+d*I+p*ee,s[9]=u*_+h*B+d*H+p*le,s[13]=u*w+h*X+d*V+p*ge,s[2]=x*T+b*U+m*q+f*Z,s[6]=x*A+b*R+m*I+f*ee,s[10]=x*_+b*B+m*H+f*le,s[14]=x*w+b*X+m*V+f*ge,s[3]=y*T+E*U+S*q+C*Z,s[7]=y*A+E*R+S*I+C*ee,s[11]=y*_+E*B+S*H+C*le,s[15]=y*w+E*X+S*V+C*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],x=e[3],b=e[7],m=e[11],f=e[15],y=l*p-c*d,E=o*p-c*h,S=o*d-l*h,C=a*p-c*u,T=a*d-l*u,A=a*h-o*u;return t*(b*y-m*E+f*S)-n*(x*y-m*C+f*T)+r*(x*E-b*C+f*A)-s*(x*S-b*T+m*A)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],x=e[12],b=e[13],m=e[14],f=e[15],y=t*o-n*a,E=t*l-r*a,S=t*c-s*a,C=n*l-r*o,T=n*c-s*o,A=r*c-s*l,_=u*b-h*x,w=u*m-d*x,U=u*f-p*x,R=h*m-d*b,B=h*f-p*b,X=d*f-p*m,q=y*X-E*B+S*R+C*U-T*w+A*_;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/q;return e[0]=(o*X-l*B+c*R)*I,e[1]=(r*B-n*X-s*R)*I,e[2]=(b*A-m*T+f*C)*I,e[3]=(d*T-h*A-p*C)*I,e[4]=(l*U-a*X-c*w)*I,e[5]=(t*X-r*U+s*w)*I,e[6]=(m*S-x*A-f*E)*I,e[7]=(u*A-d*S+p*E)*I,e[8]=(a*B-o*U+c*_)*I,e[9]=(n*U-t*B-s*_)*I,e[10]=(x*T-b*S+f*y)*I,e[11]=(h*S-u*T-p*y)*I,e[12]=(o*w-a*R-l*_)*I,e[13]=(t*R-n*w+r*_)*I,e[14]=(b*E-x*C-m*y)*I,e[15]=(u*C-h*E+d*y)*I,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,p=s*u,x=s*h,b=a*u,m=a*h,f=o*h,y=l*c,E=l*u,S=l*h,C=n.x,T=n.y,A=n.z;return r[0]=(1-(b+f))*C,r[1]=(p+S)*C,r[2]=(x-E)*C,r[3]=0,r[4]=(p-S)*T,r[5]=(1-(d+f))*T,r[6]=(m+y)*T,r[7]=0,r[8]=(x+E)*A,r[9]=(m-y)*A,r[10]=(1-(d+b))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Ni.set(r[0],r[1],r[2]).length();const o=Ni.set(r[4],r[5],r[6]).length(),l=Ni.set(r[8],r[9],r[10]).length();s<0&&(a=-a),nn.copy(this);const c=1/a,u=1/o,h=1/l;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=u,nn.elements[5]*=u,nn.elements[6]*=u,nn.elements[8]*=h,nn.elements[9]*=h,nn.elements[10]*=h,t.setFromRotationMatrix(nn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=vn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),p=(n+r)/(n-r);let x,b;if(l)x=s/(a-s),b=a*s/(a-s);else if(o===vn)x=-(a+s)/(a-s),b=-2*a*s/(a-s);else if(o===Ir)x=-a/(a-s),b=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=vn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-r),d=-(t+e)/(t-e),p=-(n+r)/(n-r);let x,b;if(l)x=1/(a-s),b=a/(a-s);else if(o===vn)x=-2/(a-s),b=-(a+s)/(a-s);else if(o===Ir)x=-1/(a-s),b=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Rs.prototype.isMatrix4=!0;let mt=Rs;const Ni=new z,nn=new mt,Hu=new z(0,0,0),Gu=new z(1,1,1),Kn=new z,Yr=new z,Xt=new z,Sl=new mt,Ml=new ur;class oi{constructor(e=0,t=0,n=0,r=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ml.setFromEuler(this),this.setFromQuaternion(Ml,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class No{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Vu=0;const El=new z,Fi=new ur,Ln=new mt,$r=new z,xr=new z,Wu=new z,Xu=new ur,Tl=new z(1,0,0),wl=new z(0,1,0),Al=new z(0,0,1),Cl={type:"added"},qu={type:"removed"},ki={type:"childadded",child:null},ea={type:"childremoved",child:null};class Nt extends Pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=dr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new z,t=new oi,n=new ur,r=new z(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new Le}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new No,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(Tl,e)}rotateY(e){return this.rotateOnAxis(wl,e)}rotateZ(e){return this.rotateOnAxis(Al,e)}translateOnAxis(e,t){return El.copy(e).applyQuaternion(this.quaternion),this.position.add(El.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tl,e)}translateY(e){return this.translateOnAxis(wl,e)}translateZ(e){return this.translateOnAxis(Al,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$r.copy(e):$r.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(xr,$r,this.up):Ln.lookAt($r,xr,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),Fi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cl),ki.child=e,this.dispatchEvent(ki),ki.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qu),ea.child=e,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cl),ki.child=e,this.dispatchEvent(ki),ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,e,Wu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,Xu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Nt.DEFAULT_UP=new z(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ji extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yu={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ji,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ji,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ji,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,n),f=this._getHandJoint(c,b);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,x=.005;c.inputState.pinching&&d>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yu)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ji;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function na(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ge.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ge.workingColorSpace){if(e=Io(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=na(a,s,e+1/3),this.g=na(a,s,e),this.b=na(a,s,e-1/3)}return Ge.colorSpaceToWorking(this,r),this}setStyle(e,t=jt){function n(s){s!==void 0&&parseFloat(s)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=zc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return Ge.workingToColorSpace(Ut.copy(this),e),Math.round(He(Ut.r*255,0,255))*65536+Math.round(He(Ut.g*255,0,255))*256+Math.round(He(Ut.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(Ut.copy(this),t);const n=Ut.r,r=Ut.g,s=Ut.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=jt){Ge.workingToColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,r=Ut.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(Kr);const n=Rr(jn.h,Kr.h,t),r=Rr(jn.s,Kr.s,t),s=Rr(jn.l,Kr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Ye;Ye.NAMES=zc;class $u extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const rn=new z,Dn=new z,ia=new z,In=new z,Oi=new z,Bi=new z,Rl=new z,ra=new z,sa=new z,aa=new z,oa=new ht,la=new ht,ca=new ht;class on{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),rn.subVectors(e,t),r.cross(rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){rn.subVectors(r,t),Dn.subVectors(n,t),ia.subVectors(e,t);const a=rn.dot(rn),o=rn.dot(Dn),l=rn.dot(ia),c=Dn.dot(Dn),u=Dn.dot(ia),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(c*l-o*u)*d,x=(a*u-o*l)*d;return s.set(1-p-x,x,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,In.x),l.addScaledVector(a,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return oa.setScalar(0),la.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(e,t),la.fromBufferAttribute(e,n),ca.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(oa,s.x),a.addScaledVector(la,s.y),a.addScaledVector(ca,s.z),a}static isFrontFacing(e,t,n,r){return rn.subVectors(n,t),Dn.subVectors(e,t),rn.cross(Dn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),rn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return on.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Oi.subVectors(r,n),Bi.subVectors(s,n),ra.subVectors(e,n);const l=Oi.dot(ra),c=Bi.dot(ra);if(l<=0&&c<=0)return t.copy(n);sa.subVectors(e,r);const u=Oi.dot(sa),h=Bi.dot(sa);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Oi,a);aa.subVectors(e,s);const p=Oi.dot(aa),x=Bi.dot(aa);if(x>=0&&p<=x)return t.copy(s);const b=p*c-l*x;if(b<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(n).addScaledVector(Bi,o);const m=u*x-p*h;if(m<=0&&h-u>=0&&p-x>=0)return Rl.subVectors(s,r),o=(h-u)/(h-u+(p-x)),t.copy(r).addScaledVector(Rl,o);const f=1/(m+b+d);return a=b*f,o=d*f,t.copy(n).addScaledVector(Oi,a).addScaledVector(Bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Br{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(s,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)),jr.applyMatrix4(e.matrixWorld),this.union(jr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_r),Zr.subVectors(this.max,_r),zi.subVectors(e.a,_r),Hi.subVectors(e.b,_r),Gi.subVectors(e.c,_r),Zn.subVectors(Hi,zi),Jn.subVectors(Gi,Hi),fi.subVectors(zi,Gi);let t=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-fi.z,fi.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,fi.z,0,-fi.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-fi.y,fi.x,0];return!da(t,zi,Hi,Gi,Zr)||(t=[1,0,0,0,1,0,0,0,1],!da(t,zi,Hi,Gi,Zr))?!1:(Jr.crossVectors(Zn,Jn),t=[Jr.x,Jr.y,Jr.z],da(t,zi,Hi,Gi,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new z,new z,new z,new z,new z,new z,new z,new z],sn=new z,jr=new Br,zi=new z,Hi=new z,Gi=new z,Zn=new z,Jn=new z,fi=new z,_r=new z,Zr=new z,Jr=new z,pi=new z;function da(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){pi.fromArray(i,s);const o=r.x*Math.abs(pi.x)+r.y*Math.abs(pi.y)+r.z*Math.abs(pi.z),l=e.dot(pi),c=t.dot(pi),u=n.dot(pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const yt=new z,Qr=new $e;let Ku=0;class Mn extends Pi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ku++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pl,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$i(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$i(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$i(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Hc extends Mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Gc extends Mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Gn extends Mn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const ju=new Br,vr=new z,ua=new z;class Fo{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ju.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);const t=vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(vr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ua.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(ua)),this.expandByPoint(vr.copy(e.center).sub(ua))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Zu=0;const Kt=new mt,ha=new Nt,Vi=new z,qt=new Br,yr=new Br,Ct=new z;class Xn extends Pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=dr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mu(e)?Gc:Hc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Le().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,n){return Kt.makeTranslation(e,t,n),this.applyMatrix4(Kt),this}scale(e,t,n){return Kt.makeScale(e,t,n),this.applyMatrix4(Kt),this}lookAt(e){return ha.lookAt(e),ha.updateMatrix(),this.applyMatrix4(ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Gn(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Br);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];yr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(qt.min,yr.min),qt.expandByPoint(Ct),Ct.addVectors(qt.max,yr.max),qt.expandByPoint(Ct)):(qt.expandByPoint(yr.min),qt.expandByPoint(yr.max))}qt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ct.fromBufferAttribute(o,c),l&&(Vi.fromBufferAttribute(e,c),Ct.add(Vi)),r=Math.max(r,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new z,l[_]=new z;const c=new z,u=new z,h=new z,d=new $e,p=new $e,x=new $e,b=new z,m=new z;function f(_,w,U){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,w),h.fromBufferAttribute(n,U),d.fromBufferAttribute(s,_),p.fromBufferAttribute(s,w),x.fromBufferAttribute(s,U),u.sub(c),h.sub(c),p.sub(d),x.sub(d);const R=1/(p.x*x.y-x.x*p.y);isFinite(R)&&(b.copy(u).multiplyScalar(x.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(R),o[_].add(b),o[w].add(b),o[U].add(b),l[_].add(m),l[w].add(m),l[U].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,w=y.length;_<w;++_){const U=y[_],R=U.start,B=U.count;for(let X=R,q=R+B;X<q;X+=3)f(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const E=new z,S=new z,C=new z,T=new z;function A(_){C.fromBufferAttribute(r,_),T.copy(C);const w=o[_];E.copy(w),E.sub(C.multiplyScalar(C.dot(w))).normalize(),S.crossVectors(T,w);const R=S.dot(l[_])<0?-1:1;a.setXYZW(_,E.x,E.y,E.z,R)}for(let _=0,w=y.length;_<w;++_){const U=y[_],R=U.start,B=U.count;for(let X=R,q=R+B;X<q;X+=3)A(e.getX(X+0)),A(e.getX(X+1)),A(e.getX(X+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new z,s=new z,a=new z,o=new z,l=new z,c=new z,u=new z,h=new z;if(e)for(let d=0,p=e.count;d<p;d+=3){const x=e.getX(d+0),b=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(b,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,x=0;for(let b=0,m=l.length;b<m;b++){o.isInterleavedBufferAttribute?p=l[b]*o.data.stride+o.offset:p=l[b]*u;for(let f=0;f<u;f++)d[x++]=c[p++]}return new Mn(d,u,h)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xn,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Ju=0;class zr extends Pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=dr(),this.name="",this.type="Material",this.blending=Ji,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Da,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==La&&(n.blendSrc=this.blendSrc),this.blendDst!==Da&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Nn=new z,fa=new z,es=new z,Qn=new z,pa=new z,ts=new z,ma=new z;class Vc{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Nn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Nn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Nn.copy(this.origin).addScaledVector(this.direction,t),Nn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){fa.copy(e).add(t).multiplyScalar(.5),es.copy(t).sub(e).normalize(),Qn.copy(this.origin).sub(fa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(es),o=Qn.dot(this.direction),l=-Qn.dot(es),c=Qn.lengthSq(),u=Math.abs(1-a*a);let h,d,p,x;if(u>0)if(h=a*l-o,d=a*o-l,x=s*u,h>=0)if(d>=-x)if(d<=x){const b=1/u;h*=b,d*=b,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-x?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=x?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(fa).addScaledVector(es,d),p}intersectSphere(e,t){Nn.subVectors(e.center,this.origin);const n=Nn.dot(this.direction),r=Nn.dot(Nn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Nn)!==null}intersectTriangle(e,t,n,r,s){pa.subVectors(t,e),ts.subVectors(n,e),ma.crossVectors(pa,ts);let a=this.direction.dot(ma),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,e);const l=o*this.direction.dot(ts.crossVectors(Qn,ts));if(l<0)return null;const c=o*this.direction.dot(pa.cross(Qn));if(c<0||l+c>a)return null;const u=-o*Qn.dot(ma);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wc extends zr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pl=new mt,mi=new Vc,ns=new Fo,Ll=new z,is=new z,rs=new z,ss=new z,ga=new z,as=new z,Dl=new z,os=new z;class Bt extends Nt{constructor(e=new Xn,t=new Wc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){as.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(ga.fromBufferAttribute(h,e),a?as.addScaledVector(ga,u):as.addScaledVector(ga.sub(t),u))}t.add(as)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(s),mi.copy(e.ray).recast(e.near),!(ns.containsPoint(mi.origin)===!1&&(mi.intersectSphere(ns,Ll)===null||mi.origin.distanceToSquared(Ll)>(e.far-e.near)**2))&&(Pl.copy(s).invert(),mi.copy(e.ray).applyMatrix4(Pl),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,mi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,b=d.length;x<b;x++){const m=d[x],f=a[m.materialIndex],y=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,C=E;S<C;S+=3){const T=o.getX(S),A=o.getX(S+1),_=o.getX(S+2);r=ls(this,f,e,n,c,u,h,T,A,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let m=x,f=b;m<f;m+=3){const y=o.getX(m),E=o.getX(m+1),S=o.getX(m+2);r=ls(this,a,e,n,c,u,h,y,E,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,b=d.length;x<b;x++){const m=d[x],f=a[m.materialIndex],y=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,C=E;S<C;S+=3){const T=S,A=S+1,_=S+2;r=ls(this,f,e,n,c,u,h,T,A,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let m=x,f=b;m<f;m+=3){const y=m,E=m+1,S=m+2;r=ls(this,a,e,n,c,u,h,y,E,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Qu(i,e,t,n,r,s,a,o){let l;if(e.side===Ht?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===ai,o),l===null)return null;os.copy(o),os.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(os);return c<t.near||c>t.far?null:{distance:c,point:os.clone(),object:i}}function ls(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,is),i.getVertexPosition(l,rs),i.getVertexPosition(c,ss);const u=Qu(i,e,t,n,is,rs,ss,Dl);if(u){const h=new z;on.getBarycoord(Dl,is,rs,ss,h),r&&(u.uv=on.getInterpolatedAttribute(r,o,l,c,h,new $e)),s&&(u.uv1=on.getInterpolatedAttribute(s,o,l,c,h,new $e)),a&&(u.normal=on.getInterpolatedAttribute(a,o,l,c,h,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new z,materialIndex:0};on.getNormal(is,rs,ss,d.normal),u.face=d,u.barycoord=h}return u}class eh extends Tt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Rt,u=Rt,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xa=new z,th=new z,nh=new Le;class _i{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=xa.subVectors(n,t).cross(th.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(xa),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||nh.getNormalMatrix(e),r=this.coplanarPoint(xa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new Fo,ih=new $e(.5,.5),cs=new z;class ko{constructor(e=new _i,t=new _i,n=new _i,r=new _i,s=new _i,a=new _i){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=vn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],p=s[7],x=s[8],b=s[9],m=s[10],f=s[11],y=s[12],E=s[13],S=s[14],C=s[15];if(r[0].setComponents(c-a,p-u,f-x,C-y).normalize(),r[1].setComponents(c+a,p+u,f+x,C+y).normalize(),r[2].setComponents(c+o,p+h,f+b,C+E).normalize(),r[3].setComponents(c-o,p-h,f-b,C-E).normalize(),n)r[4].setComponents(l,d,m,S).normalize(),r[5].setComponents(c-l,p-d,f-m,C-S).normalize();else if(r[4].setComponents(c-l,p-d,f-m,C-S).normalize(),t===vn)r[5].setComponents(c+l,p+d,f+m,C+S).normalize();else if(t===Ir)r[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(e){gi.center.set(0,0,0);const t=ih.distanceTo(e.center);return gi.radius=.7071067811865476+t,gi.applyMatrix4(e.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(cs.x=r.normal.x>0?e.max.x:e.min.x,cs.y=r.normal.y>0?e.max.y:e.min.y,cs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(cs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xc extends Tt{constructor(e=[],t=Ti,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Oo extends Tt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class sr extends Tt{constructor(e,t,n=En,r,s,a,o=Rt,l=Rt,c,u=Wn,h=1){if(u!==Wn&&u!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class rh extends sr{constructor(e,t=En,n=Ti,r,s,a=Rt,o=Rt,l,c=Wn){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qc extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class li extends Xn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,p=0;x("z","y","x",-1,-1,n,t,e,a,s,0),x("z","y","x",1,-1,n,t,-e,a,s,1),x("x","z","y",1,1,e,n,t,r,a,2),x("x","z","y",1,-1,e,n,-t,r,a,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Gn(c,3)),this.setAttribute("normal",new Gn(u,3)),this.setAttribute("uv",new Gn(h,2));function x(b,m,f,y,E,S,C,T,A,_,w){const U=S/A,R=C/_,B=S/2,X=C/2,q=T/2,I=A+1,H=_+1;let V=0,Z=0;const ee=new z;for(let le=0;le<H;le++){const ge=le*R-X;for(let ye=0;ye<I;ye++){const Ve=ye*U-B;ee[b]=Ve*y,ee[m]=ge*E,ee[f]=q,c.push(ee.x,ee.y,ee.z),ee[b]=0,ee[m]=0,ee[f]=T>0?1:-1,u.push(ee.x,ee.y,ee.z),h.push(ye/A),h.push(1-le/_),V+=1}}for(let le=0;le<_;le++)for(let ge=0;ge<A;ge++){const ye=d+ge+I*le,Ve=d+ge+I*(le+1),Ke=d+(ge+1)+I*(le+1),De=d+(ge+1)+I*le;l.push(ye,Ve,De),l.push(Ve,Ke,De),Z+=6}o.addGroup(p,Z,w),p+=Z,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new li(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class hr extends Xn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,p=[],x=[],b=[],m=[];for(let f=0;f<u;f++){const y=f*d-a;for(let E=0;E<c;E++){const S=E*h-s;x.push(S,-y,0),b.push(0,0,1),m.push(E/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<o;y++){const E=y+c*f,S=y+c*(f+1),C=y+1+c*(f+1),T=y+1+c*f;p.push(E,S,T),p.push(S,C,T)}this.setIndex(p),this.setAttribute("position",new Gn(x,3)),this.setAttribute("normal",new Gn(b,3)),this.setAttribute("uv",new Gn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.width,e.height,e.widthSegments,e.heightSegments)}}function ar(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Il(r))r.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Il(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Ot(i){const e={};for(let t=0;t<i.length;t++){const n=ar(i[t]);for(const r in n)e[r]=n[r]}return e}function Il(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function sh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const ah={clone:ar,merge:Ot};var oh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends zr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oh,this.fragmentShader=lh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ar(e.uniforms),this.uniformsGroups=sh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ch extends Tn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ri extends zr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_o,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dh extends zr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uh extends zr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Mi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Ul(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Ul(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Ul(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class hh{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],x=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const fh=new hh;class Ls{constructor(e){this.manager=e!==void 0?e:fh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ls.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wi=new WeakMap;class ph extends Ls{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Mi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=Wi.get(a);h===void 0&&(h=[],Wi.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=Ur("img");function l(){u(),t&&t(this);const h=Wi.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onLoad&&p.onLoad(this)}Wi.delete(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),Mi.remove(`image:${e}`);const d=Wi.get(this)||[];for(let p=0;p<d.length;p++){const x=d[p];x.onError&&x.onError(h)}Wi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Mi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class mh extends Ls{constructor(e){super(e)}load(e,t,n,r){const s=new Tt,a=new ph(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class $c extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const _a=new mt,Nl=new z,Fl=new z;class gh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=Yt,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ko,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Nl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nl),Fl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fl),t.updateMatrixWorld(),_a.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_a,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ir||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_a)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ds=new z,us=new ur,mn=new z;class Kc extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ds,us,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ds,us,mn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ds,us,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ds,us,mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ei=new z,kl=new $e,Ol=new $e;class Zt extends Kc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nr*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ei.x,ei.y).multiplyScalar(-e/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-e/ei.z)}getViewSize(e,t){return this.getViewBounds(e,kl,Ol),t.subVectors(Ol,kl)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Cr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Bo extends Kc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xh extends gh{constructor(){super(new Bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _h extends $c{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new xh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class vh extends $c{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const va=new WeakMap;class jc extends Ls{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Mi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{va.has(a)===!0?(r&&r(va.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){Mi.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){r&&r(c),va.set(l,c),Mi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Mi.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Xi=-90,qi=1;class yh extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Zt(Xi,qi,e,t);r.layers=this.layers,this.add(r);const s=new Zt(Xi,qi,e,t);s.layers=this.layers,this.add(s);const a=new Zt(Xi,qi,e,t);a.layers=this.layers,this.add(a);const o=new Zt(Xi,qi,e,t);o.layers=this.layers,this.add(o);const l=new Zt(Xi,qi,e,t);l.layers=this.layers,this.add(l);const c=new Zt(Xi,qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===vn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class bh extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Bl=new mt;class Sh{constructor(e,t,n=0,r=1/0){this.ray=new Vc(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new No,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):We("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Bl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bl),this}intersectObject(e,t=!0,n=[]){return yo(e,this,n,t),n.sort(zl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)yo(e[r],this,n,t);return n.sort(zl),n}}function zl(i,e){return i.distance-e.distance}function yo(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)yo(s[a],e,t,!0)}}const Qo=class Qo{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Qo.prototype.isMatrix2=!0;let Hl=Qo;function Gl(i,e,t,n){const r=Mh(n);switch(t){case Nc:return i*e;case kc:return i*e/r.components*r.byteLength;case Co:return i*e/r.components*r.byteLength;case wi:return i*e*2/r.components*r.byteLength;case Ro:return i*e*2/r.components*r.byteLength;case Fc:return i*e*3/r.components*r.byteLength;case ln:return i*e*4/r.components*r.byteLength;case Po:return i*e*4/r.components*r.byteLength;case ps:case ms:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case gs:case xs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ga:case Wa:return Math.max(i,16)*Math.max(e,8)/4;case Ha:case Va:return Math.max(i,8)*Math.max(e,8)/2;case Xa:case qa:case $a:case Ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ya:case Ss:case ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case eo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case to:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case no:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case io:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ro:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case so:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ao:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case oo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case lo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case co:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case uo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ho:case fo:case po:return Math.ceil(i/4)*Math.ceil(e/4)*16;case mo:case go:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ms:case xo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Mh(i){switch(i){case Yt:case Lc:return{byteLength:1,components:1};case Lr:case Dc:case Vn:return{byteLength:2,components:1};case wo:case Ao:return{byteLength:2,components:4};case En:case To:case _n:return{byteLength:4,components:1};case Ic:case Uc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eo}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zc(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Eh(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((p,x)=>p.start-x.start);let d=0;for(let p=1;p<h.length;p++){const x=h[d],b=h[p];b.start<=x.start+x.count+1?x.count=Math.max(x.count,b.start+b.count-x.start):(++d,h[d]=b)}h.length=d+1;for(let p=0,x=h.length;p<x;p++){const b=h[p];i.bufferSubData(c,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Th=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wh=`#ifdef USE_ALPHAHASH
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
#endif`,Ah=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ch=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ph=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lh=`#ifdef USE_AOMAP
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
#endif`,Dh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ih=`#ifdef USE_BATCHING
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
#endif`,Uh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Oh=`#ifdef USE_IRIDESCENCE
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
#endif`,Bh=`#ifdef USE_BUMPMAP
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
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Xh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,qh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Yh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,$h=`#define PI 3.141592653589793
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
} // validated`,Kh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jh=`vec3 transformedNormal = objectNormal;
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
#endif`,Zh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ef=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tf="gl_FragColor = linearToOutputTexel( gl_FragColor );",nf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rf=`#ifdef USE_ENVMAP
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
#endif`,sf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,af=`#ifdef USE_ENVMAP
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
#endif`,of=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lf=`#ifdef USE_ENVMAP
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
#endif`,cf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,df=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ff=`#ifdef USE_GRADIENTMAP
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
}`,pf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,_f=`#ifdef USE_ENVMAP
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
#endif`,vf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mf=`PhysicalMaterial material;
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
#endif`,Ef=`uniform sampler2D dfgLUT;
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
}`,Tf=`
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
#endif`,wf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Af=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Rf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Df=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,If=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ff=`#if defined( USE_POINTS_UV )
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
#endif`,kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Of=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gf=`#ifdef USE_MORPHTARGETS
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
#endif`,Vf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$f=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kf=`#ifdef USE_NORMALMAP
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
#endif`,jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,np=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,op=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,up=`float getShadowMask() {
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
}`,hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fp=`#ifdef USE_SKINNING
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
#endif`,pp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mp=`#ifdef USE_SKINNING
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
#endif`,gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_p=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yp=`#ifdef USE_TRANSMISSION
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
#endif`,bp=`#ifdef USE_TRANSMISSION
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
#endif`,Sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ap=`uniform sampler2D t2D;
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
}`,Cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`#include <common>
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
}`,Ip=`#if DEPTH_PACKING == 3200
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
}`,Up=`#define DISTANCE
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
}`,Np=`#define DISTANCE
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Op=`uniform float scale;
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
}`,Bp=`uniform vec3 diffuse;
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
}`,zp=`#include <common>
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
}`,Hp=`uniform vec3 diffuse;
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
}`,Gp=`#define LAMBERT
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
}`,Vp=`#define LAMBERT
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
}`,Wp=`#define MATCAP
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
}`,Xp=`#define MATCAP
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
}`,qp=`#define NORMAL
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
}`,Yp=`#define NORMAL
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
}`,$p=`#define PHONG
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
}`,Kp=`#define PHONG
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
}`,jp=`#define STANDARD
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
}`,Zp=`#define STANDARD
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
}`,Jp=`#define TOON
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
}`,Qp=`#define TOON
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
}`,em=`uniform float size;
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
}`,tm=`uniform vec3 diffuse;
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
}`,nm=`#include <common>
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
}`,im=`uniform vec3 color;
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
}`,rm=`uniform float rotation;
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
}`,sm=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:Th,alphahash_pars_fragment:wh,alphamap_fragment:Ah,alphamap_pars_fragment:Ch,alphatest_fragment:Rh,alphatest_pars_fragment:Ph,aomap_fragment:Lh,aomap_pars_fragment:Dh,batching_pars_vertex:Ih,batching_vertex:Uh,begin_vertex:Nh,beginnormal_vertex:Fh,bsdfs:kh,iridescence_fragment:Oh,bumpmap_pars_fragment:Bh,clipping_planes_fragment:zh,clipping_planes_pars_fragment:Hh,clipping_planes_pars_vertex:Gh,clipping_planes_vertex:Vh,color_fragment:Wh,color_pars_fragment:Xh,color_pars_vertex:qh,color_vertex:Yh,common:$h,cube_uv_reflection_fragment:Kh,defaultnormal_vertex:jh,displacementmap_pars_vertex:Zh,displacementmap_vertex:Jh,emissivemap_fragment:Qh,emissivemap_pars_fragment:ef,colorspace_fragment:tf,colorspace_pars_fragment:nf,envmap_fragment:rf,envmap_common_pars_fragment:sf,envmap_pars_fragment:af,envmap_pars_vertex:of,envmap_physical_pars_fragment:_f,envmap_vertex:lf,fog_vertex:cf,fog_pars_vertex:df,fog_fragment:uf,fog_pars_fragment:hf,gradientmap_pars_fragment:ff,lightmap_pars_fragment:pf,lights_lambert_fragment:mf,lights_lambert_pars_fragment:gf,lights_pars_begin:xf,lights_toon_fragment:vf,lights_toon_pars_fragment:yf,lights_phong_fragment:bf,lights_phong_pars_fragment:Sf,lights_physical_fragment:Mf,lights_physical_pars_fragment:Ef,lights_fragment_begin:Tf,lights_fragment_maps:wf,lights_fragment_end:Af,lightprobes_pars_fragment:Cf,logdepthbuf_fragment:Rf,logdepthbuf_pars_fragment:Pf,logdepthbuf_pars_vertex:Lf,logdepthbuf_vertex:Df,map_fragment:If,map_pars_fragment:Uf,map_particle_fragment:Nf,map_particle_pars_fragment:Ff,metalnessmap_fragment:kf,metalnessmap_pars_fragment:Of,morphinstance_vertex:Bf,morphcolor_vertex:zf,morphnormal_vertex:Hf,morphtarget_pars_vertex:Gf,morphtarget_vertex:Vf,normal_fragment_begin:Wf,normal_fragment_maps:Xf,normal_pars_fragment:qf,normal_pars_vertex:Yf,normal_vertex:$f,normalmap_pars_fragment:Kf,clearcoat_normal_fragment_begin:jf,clearcoat_normal_fragment_maps:Zf,clearcoat_pars_fragment:Jf,iridescence_pars_fragment:Qf,opaque_fragment:ep,packing:tp,premultiplied_alpha_fragment:np,project_vertex:ip,dithering_fragment:rp,dithering_pars_fragment:sp,roughnessmap_fragment:ap,roughnessmap_pars_fragment:op,shadowmap_pars_fragment:lp,shadowmap_pars_vertex:cp,shadowmap_vertex:dp,shadowmask_pars_fragment:up,skinbase_vertex:hp,skinning_pars_vertex:fp,skinning_vertex:pp,skinnormal_vertex:mp,specularmap_fragment:gp,specularmap_pars_fragment:xp,tonemapping_fragment:_p,tonemapping_pars_fragment:vp,transmission_fragment:yp,transmission_pars_fragment:bp,uv_pars_fragment:Sp,uv_pars_vertex:Mp,uv_vertex:Ep,worldpos_vertex:Tp,background_vert:wp,background_frag:Ap,backgroundCube_vert:Cp,backgroundCube_frag:Rp,cube_vert:Pp,cube_frag:Lp,depth_vert:Dp,depth_frag:Ip,distance_vert:Up,distance_frag:Np,equirect_vert:Fp,equirect_frag:kp,linedashed_vert:Op,linedashed_frag:Bp,meshbasic_vert:zp,meshbasic_frag:Hp,meshlambert_vert:Gp,meshlambert_frag:Vp,meshmatcap_vert:Wp,meshmatcap_frag:Xp,meshnormal_vert:qp,meshnormal_frag:Yp,meshphong_vert:$p,meshphong_frag:Kp,meshphysical_vert:jp,meshphysical_frag:Zp,meshtoon_vert:Jp,meshtoon_frag:Qp,points_vert:em,points_frag:tm,shadow_vert:nm,shadow_frag:im,sprite_vert:rm,sprite_frag:sm},de={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},xn={basic:{uniforms:Ot([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Ot([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Ot([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Ot([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Ot([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Ot([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Ot([de.points,de.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Ot([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Ot([de.common,de.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Ot([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Ot([de.sprite,de.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distance:{uniforms:Ot([de.common,de.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distance_vert,fragmentShader:Fe.distance_frag},shadow:{uniforms:Ot([de.lights,de.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};xn.physical={uniforms:Ot([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const hs={r:0,b:0,g:0},am=new mt,Jc=new Le;Jc.set(-1,0,0,0,1,0,0,0,1);function om(i,e,t,n,r,s){const a=new Ye(0);let o=r===!0?0:1,l,c,u=null,h=0,d=null;function p(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){const S=y.backgroundBlurriness>0;E=e.get(E,S)}return E}function x(y){let E=!1;const S=p(y);S===null?m(a,o):S&&S.isColor&&(m(S,1),E=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(y,E){const S=p(E);S&&(S.isCubeTexture||S.mapping===Ps)?(c===void 0&&(c=new Bt(new li(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:ar(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(am.makeRotationFromEuler(E.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Jc),c.material.toneMapped=Ge.getTransfer(S.colorSpace)!==je,(u!==S||h!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,h=S.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Bt(new hr(2,2),new Tn({name:"BackgroundMaterial",uniforms:ar(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(S.colorSpace)!==je,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||h!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,h=S.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,E){y.getRGB(hs,Yc(i)),t.buffers.color.setClear(hs.r,hs.g,hs.b,E,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,E=1){a.set(y),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:x,addToRenderList:b,dispose:f}}function lm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(R,B,X,q,I){let H=!1;const V=h(R,q,X,B);s!==V&&(s=V,c(s.object)),H=p(R,q,X,I),H&&x(R,q,X,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,S(R,B,X,q),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function h(R,B,X,q){const I=q.wireframe===!0;let H=n[B.id];H===void 0&&(H={},n[B.id]=H);const V=R.isInstancedMesh===!0?R.id:0;let Z=H[V];Z===void 0&&(Z={},H[V]=Z);let ee=Z[X.id];ee===void 0&&(ee={},Z[X.id]=ee);let le=ee[I];return le===void 0&&(le=d(l()),ee[I]=le),le}function d(R){const B=[],X=[],q=[];for(let I=0;I<t;I++)B[I]=0,X[I]=0,q[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:X,attributeDivisors:q,object:R,attributes:{},index:null}}function p(R,B,X,q){const I=s.attributes,H=B.attributes;let V=0;const Z=X.getAttributes();for(const ee in Z)if(Z[ee].location>=0){const ge=I[ee];let ye=H[ee];if(ye===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(ye=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(ye=R.instanceColor)),ge===void 0||ge.attribute!==ye||ye&&ge.data!==ye.data)return!0;V++}return s.attributesNum!==V||s.index!==q}function x(R,B,X,q){const I={},H=B.attributes;let V=0;const Z=X.getAttributes();for(const ee in Z)if(Z[ee].location>=0){let ge=H[ee];ge===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(ge=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(ge=R.instanceColor));const ye={};ye.attribute=ge,ge&&ge.data&&(ye.data=ge.data),I[ee]=ye,V++}s.attributes=I,s.attributesNum=V,s.index=q}function b(){const R=s.newAttributes;for(let B=0,X=R.length;B<X;B++)R[B]=0}function m(R){f(R,0)}function f(R,B){const X=s.newAttributes,q=s.enabledAttributes,I=s.attributeDivisors;X[R]=1,q[R]===0&&(i.enableVertexAttribArray(R),q[R]=1),I[R]!==B&&(i.vertexAttribDivisor(R,B),I[R]=B)}function y(){const R=s.newAttributes,B=s.enabledAttributes;for(let X=0,q=B.length;X<q;X++)B[X]!==R[X]&&(i.disableVertexAttribArray(X),B[X]=0)}function E(R,B,X,q,I,H,V){V===!0?i.vertexAttribIPointer(R,B,X,I,H):i.vertexAttribPointer(R,B,X,q,I,H)}function S(R,B,X,q){b();const I=q.attributes,H=X.getAttributes(),V=B.defaultAttributeValues;for(const Z in H){const ee=H[Z];if(ee.location>=0){let le=I[Z];if(le===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const ge=le.normalized,ye=le.itemSize,Ve=e.get(le);if(Ve===void 0)continue;const Ke=Ve.buffer,De=Ve.type,j=Ve.bytesPerElement,ue=De===i.INT||De===i.UNSIGNED_INT||le.gpuType===To;if(le.isInterleavedBufferAttribute){const te=le.data,we=te.stride,Pe=le.offset;if(te.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ee.locationSize;Ce++)f(ee.location+Ce,te.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ce=0;Ce<ee.locationSize;Ce++)m(ee.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let Ce=0;Ce<ee.locationSize;Ce++)E(ee.location+Ce,ye/ee.locationSize,De,ge,we*j,(Pe+ye/ee.locationSize*Ce)*j,ue)}else{if(le.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)f(ee.location+te,le.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let te=0;te<ee.locationSize;te++)m(ee.location+te);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let te=0;te<ee.locationSize;te++)E(ee.location+te,ye/ee.locationSize,De,ge,ye*j,ye/ee.locationSize*te*j,ue)}}else if(V!==void 0){const ge=V[Z];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(ee.location,ge);break;case 3:i.vertexAttrib3fv(ee.location,ge);break;case 4:i.vertexAttrib4fv(ee.location,ge);break;default:i.vertexAttrib1fv(ee.location,ge)}}}}y()}function C(){w();for(const R in n){const B=n[R];for(const X in B){const q=B[X];for(const I in q){const H=q[I];for(const V in H)u(H[V].object),delete H[V];delete q[I]}}delete n[R]}}function T(R){if(n[R.id]===void 0)return;const B=n[R.id];for(const X in B){const q=B[X];for(const I in q){const H=q[I];for(const V in H)u(H[V].object),delete H[V];delete q[I]}}delete n[R.id]}function A(R){for(const B in n){const X=n[B];for(const q in X){const I=X[q];if(I[R.id]===void 0)continue;const H=I[R.id];for(const V in H)u(H[V].object),delete H[V];delete I[R.id]}}}function _(R){for(const B in n){const X=n[B],q=R.isInstancedMesh===!0?R.id:0,I=X[q];if(I!==void 0){for(const H in I){const V=I[H];for(const Z in V)u(V[Z].object),delete V[Z];delete I[H]}delete X[q],Object.keys(X).length===0&&delete n[B]}}}function w(){U(),a=!0,s!==r&&(s=r,c(s.object))}function U(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:U,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:b,enableAttribute:m,disableUnusedAttributes:y}}function cm(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let p=0;p<u;p++)d+=c[p];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function dm(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==ln&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===Vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Yt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==_n&&!_)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ae("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:x,maxTextureSize:b,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:S,maxSamples:C,samples:T}}function um(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new _i,o=new Le,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||r;return r=d,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const x=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!r||x===null||x.length===0||s&&!m)s?u(null):c();else{const y=s?0:n,E=y*4;let S=f.clippingState||null;l.value=S,S=u(x,d,E,p);for(let C=0;C!==E;++C)S[C]=t[C];f.clippingState=S,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,x){const b=h!==null?h.length:0;let m=null;if(b!==0){if(m=l.value,x!==!0||m===null){const f=p+b*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,S=p;E!==b;++E,S+=4)a.copy(h[E]).applyMatrix4(y,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}const si=4,Vl=[.125,.215,.35,.446,.526,.582],yi=20,hm=256,br=new Bo,Wl=new Ye;let ya=null,ba=0,Sa=0,Ma=!1;const fm=new z;class Xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=fm}=s;ya=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$l(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ya,ba,Sa),this._renderer.xr.enabled=Ma,e.scissorTest=!1,Yi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ya=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pt,minFilter:pt,generateMipmaps:!1,type:Vn,format:ln,colorSpace:Es,depthBuffer:!1},r=ql(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ql(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=pm(s)),this._blurMaterial=gm(s,e,t),this._ggxMaterial=mm(s,e,t)}return r}_compileMaterial(e){const t=new Bt(new Xn,e);this._renderer.compile(t,br)}_sceneToCubeUV(e,t,n,r,s){const l=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Wl),h.toneMapping=bn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Bt(new li,new Wc({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let f=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,f=!0):(m.color.copy(Wl),f=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[E],s.y,s.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[E]));const C=this._cubeSize;Yi(r,S*C,E>2?C:0,C,C),h.setRenderTarget(r),f&&h.render(b,l),h.render(e,l)}h.toneMapping=p,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ti||e.mapping===rr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$l()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Yi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,br)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,p=h*d,{_lodMax:x}=this,b=this._sizeLods[n],m=3*b*(n>x-si?n-x+si:0),f=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=x-t,Yi(s,m,f,3*b,2*b),r.setRenderTarget(s),r.render(o,br),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-n,Yi(e,m,f,3*b,2*b),r.setRenderTarget(e),r.render(o,br)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&We("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[r];h.material=c;const d=c.uniforms,p=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*yi-1),b=s/x,m=isFinite(s)?1+Math.floor(u*b):yi;m>yi&&Ae(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${yi}`);const f=[];let y=0;for(let A=0;A<yi;++A){const _=A/b,w=Math.exp(-_*_/2);f.push(w),A===0?y+=w:A<m&&(y+=2*w)}for(let A=0;A<f.length;A++)f[A]=f[A]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=x,d.mipInt.value=E-n;const S=this._sizeLods[r],C=3*S*(r>E-si?r-E+si:0),T=4*(this._cubeSize-S);Yi(t,C,T,3*S,2*S),l.setRenderTarget(t),l.render(h,br)}}function pm(i){const e=[],t=[],n=[];let r=i;const s=i-si+1+Vl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-si?l=Vl[a-i+si-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,x=6,b=3,m=2,f=1,y=new Float32Array(b*x*p),E=new Float32Array(m*x*p),S=new Float32Array(f*x*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,_=T>2?0:-1,w=[A,_,0,A+2/3,_,0,A+2/3,_+1,0,A,_,0,A+2/3,_+1,0,A,_+1,0];y.set(w,b*x*T),E.set(d,m*x*T);const U=[T,T,T,T,T,T];S.set(U,f*x*T)}const C=new Xn;C.setAttribute("position",new Mn(y,b)),C.setAttribute("uv",new Mn(E,m)),C.setAttribute("faceIndex",new Mn(S,f)),n.push(new Bt(C,null)),r>si&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function ql(i,e,t){const n=new Sn(i,e,t);return n.texture.mapping=Ps,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function mm(i,e,t){return new Tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function gm(i,e,t){const n=new Float32Array(yi),r=new z(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Yl(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function $l(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ds(){return`

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
	`}class Qc extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Xc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new li(5,5,5),s=new Tn({name:"CubemapFromEquirect",uniforms:ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:zn});s.uniforms.tEquirect.value=t;const a=new Bt(r,s),o=t.minFilter;return t.minFilter===bi&&(t.minFilter=pt),new yh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function xm(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===Ys||p===$s)if(e.has(d)){const x=e.get(d).texture;return o(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const b=new Qc(x.height);return b.fromEquirectangularTexture(i,d),e.set(d,b),d.addEventListener("dispose",c),o(b.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,x=p===Ys||p===$s,b=p===Ti||p===rr;if(x||b){let m=t.get(d);const f=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return n===null&&(n=new Xl(i)),m=x?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const y=d.image;return x&&y&&y.height>0||b&&y&&l(y)?(n===null&&(n=new Xl(i)),m=x?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,p){return p===Ys?d.mapping=Ti:p===$s&&(d.mapping=rr),d}function l(d){let p=0;const x=6;for(let b=0;b<x;b++)d[b]!==void 0&&p++;return p===x}function c(d){const p=d.target;p.removeEventListener("dispose",c);const x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:h}}function _m(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&vo("WebGLRenderer: "+n+" extension not supported."),r}}}function vm(i,e,t,n){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],i.ARRAY_BUFFER)}function c(h){const d=[],p=h.index,x=h.attributes.position;let b=0;if(x===void 0)return;if(p!==null){const y=p.array;b=p.version;for(let E=0,S=y.length;E<S;E+=3){const C=y[E+0],T=y[E+1],A=y[E+2];d.push(C,T,T,A,A,C)}}else{const y=x.array;b=x.version;for(let E=0,S=y.length/3-1;E<S;E+=3){const C=E+0,T=E+1,A=E+2;d.push(C,T,T,A,A,C)}}const m=new(x.count>=65535?Gc:Hc)(d,1);m.version=b;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function u(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function ym(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,p){p!==0&&(i.drawElementsInstanced(n,d,s,h*a,p),t.update(d,n,p))}function u(h,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,p);let b=0;for(let m=0;m<p;m++)b+=d[m];t.update(b,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function bm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Sm(i,e,t){const n=new WeakMap,r=new ht;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),x===!0&&(E=2),b===!0&&(E=3);let S=o.attributes.position.count*E,C=1;S>e.maxTextureSize&&(C=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const T=new Float32Array(S*C*4*h),A=new Bc(T,S,C,h);A.type=_n,A.needsUpdate=!0;const _=E*4;for(let U=0;U<h;U++){const R=m[U],B=f[U],X=y[U],q=S*C*4*U;for(let I=0;I<R.count;I++){const H=I*_;p===!0&&(r.fromBufferAttribute(R,I),T[q+H+0]=r.x,T[q+H+1]=r.y,T[q+H+2]=r.z,T[q+H+3]=0),x===!0&&(r.fromBufferAttribute(B,I),T[q+H+4]=r.x,T[q+H+5]=r.y,T[q+H+6]=r.z,T[q+H+7]=0),b===!0&&(r.fromBufferAttribute(X,I),T[q+H+8]=r.x,T[q+H+9]=r.y,T[q+H+10]=r.z,T[q+H+11]=X.itemSize===4?r.w:1)}}d={count:h,texture:A,size:new $e(S,C)},n.set(o,d),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let b=0;b<c.length;b++)p+=c[b];const x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function Mm(i,e,t,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Em={[Mc]:"LINEAR_TONE_MAPPING",[Ec]:"REINHARD_TONE_MAPPING",[Tc]:"CINEON_TONE_MAPPING",[wc]:"ACES_FILMIC_TONE_MAPPING",[Cc]:"AGX_TONE_MAPPING",[Rc]:"NEUTRAL_TONE_MAPPING",[Ac]:"CUSTOM_TONE_MAPPING"};function Tm(i,e,t,n,r){const s=new Sn(e,t,{type:i,depthBuffer:n,stencilBuffer:r,depthTexture:n?new sr(e,t):void 0}),a=new Sn(e,t,{type:Vn,depthBuffer:!1,stencilBuffer:!1}),o=new Xn;o.setAttribute("position",new Gn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Gn([0,2,0,0,2,0],2));const l=new ch({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Bt(o,l),u=new Bo(-1,1,1,-1,0,1);let h=null,d=null,p=!1,x,b=null,m=[],f=!1;this.setSize=function(y,E){s.setSize(y,E),a.setSize(y,E);for(let S=0;S<m.length;S++){const C=m[S];C.setSize&&C.setSize(y,E)}},this.setEffects=function(y){m=y,f=m.length>0&&m[0].isRenderPass===!0;const E=s.width,S=s.height;for(let C=0;C<m.length;C++){const T=m[C];T.setSize&&T.setSize(E,S)}},this.begin=function(y,E){if(p||y.toneMapping===bn&&m.length===0)return!1;if(b=E,E!==null){const S=E.width,C=E.height;(s.width!==S||s.height!==C)&&this.setSize(S,C)}return f===!1&&y.setRenderTarget(s),x=y.toneMapping,y.toneMapping=bn,!0},this.hasRenderPass=function(){return f},this.end=function(y,E){y.toneMapping=x,p=!0;let S=s,C=a;for(let T=0;T<m.length;T++){const A=m[T];if(A.enabled!==!1&&(A.render(y,C,S,E),A.needsSwap!==!1)){const _=S;S=C,C=_}}if(h!==y.outputColorSpace||d!==y.toneMapping){h=y.outputColorSpace,d=y.toneMapping,l.defines={},Ge.getTransfer(h)===je&&(l.defines.SRGB_TRANSFER="");const T=Em[d];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(b),y.render(c,u),b=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const ed=new Tt,bo=new sr(1,1),td=new Bc,nd=new zu,id=new Xc,Kl=[],jl=[],Zl=new Float32Array(16),Jl=new Float32Array(9),Ql=new Float32Array(4);function fr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Kl[r];if(s===void 0&&(s=new Float32Array(r),Kl[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Is(i,e){let t=jl[e];t===void 0&&(t=new Int32Array(e),jl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function wm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function Cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function Rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function Pm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(wt(t,n))return;Ql.set(n),i.uniformMatrix2fv(this.addr,!1,Ql),At(t,n)}}function Lm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(wt(t,n))return;Jl.set(n),i.uniformMatrix3fv(this.addr,!1,Jl),At(t,n)}}function Dm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(wt(t,n))return;Zl.set(n),i.uniformMatrix4fv(this.addr,!1,Zl),At(t,n)}}function Im(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function Nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function Fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function km(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Om(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function Bm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function zm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function Hm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(bo.compareFunction=t.isReversedDepthBuffer()?Do:Lo,s=bo):s=ed,t.setTexture2D(e||s,r)}function Gm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||nd,r)}function Vm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||id,r)}function Wm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||td,r)}function Xm(i){switch(i){case 5126:return wm;case 35664:return Am;case 35665:return Cm;case 35666:return Rm;case 35674:return Pm;case 35675:return Lm;case 35676:return Dm;case 5124:case 35670:return Im;case 35667:case 35671:return Um;case 35668:case 35672:return Nm;case 35669:case 35673:return Fm;case 5125:return km;case 36294:return Om;case 36295:return Bm;case 36296:return zm;case 35678:case 36198:case 36298:case 36306:case 35682:return Hm;case 35679:case 36299:case 36307:return Gm;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Wm}}function qm(i,e){i.uniform1fv(this.addr,e)}function Ym(i,e){const t=fr(e,this.size,2);i.uniform2fv(this.addr,t)}function $m(i,e){const t=fr(e,this.size,3);i.uniform3fv(this.addr,t)}function Km(i,e){const t=fr(e,this.size,4);i.uniform4fv(this.addr,t)}function jm(i,e){const t=fr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Zm(i,e){const t=fr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Jm(i,e){const t=fr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Qm(i,e){i.uniform1iv(this.addr,e)}function eg(i,e){i.uniform2iv(this.addr,e)}function tg(i,e){i.uniform3iv(this.addr,e)}function ng(i,e){i.uniform4iv(this.addr,e)}function ig(i,e){i.uniform1uiv(this.addr,e)}function rg(i,e){i.uniform2uiv(this.addr,e)}function sg(i,e){i.uniform3uiv(this.addr,e)}function ag(i,e){i.uniform4uiv(this.addr,e)}function og(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);wt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=bo:a=ed;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function lg(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);wt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||nd,s[a])}function cg(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);wt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||id,s[a])}function dg(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);wt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||td,s[a])}function ug(i){switch(i){case 5126:return qm;case 35664:return Ym;case 35665:return $m;case 35666:return Km;case 35674:return jm;case 35675:return Zm;case 35676:return Jm;case 5124:case 35670:return Qm;case 35667:case 35671:return eg;case 35668:case 35672:return tg;case 35669:case 35673:return ng;case 5125:return ig;case 36294:return rg;case 36295:return sg;case 36296:return ag;case 35678:case 36198:case 36298:case 36306:case 35682:return og;case 35679:case 36299:case 36307:return lg;case 35680:case 36300:case 36308:case 36293:return cg;case 36289:case 36303:case 36311:case 36292:return dg}}class hg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xm(t.type)}}class fg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ug(t.type)}}class pg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ea=/(\w+)(\])?(\[|\.)?/g;function ec(i,e){i.seq.push(e),i.map[e.id]=e}function mg(i,e,t){const n=i.name,r=n.length;for(Ea.lastIndex=0;;){const s=Ea.exec(n),a=Ea.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ec(t,c===void 0?new hg(o,i,e):new fg(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new pg(o),ec(t,h)),t=h}}}class _s{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);mg(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function tc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const gg=37297;let xg=0;function _g(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const nc=new Le;function vg(i){Ge._getMatrix(nc,Ge.workingColorSpace,i);const e=`mat3( ${nc.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(i)){case Ts:return[e,"LinearTransferOETF"];case je:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ic(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+_g(i.getShaderSource(e),o)}else return s}function yg(i,e){const t=vg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const bg={[Mc]:"Linear",[Ec]:"Reinhard",[Tc]:"Cineon",[wc]:"ACESFilmic",[Cc]:"AgX",[Rc]:"Neutral",[Ac]:"Custom"};function Sg(i,e){const t=bg[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fs=new z;function Mg(){Ge.getLuminanceCoefficients(fs);const i=fs.x.toFixed(4),e=fs.y.toFixed(4),t=fs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Eg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wr).join(`
`)}function Tg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function wr(i){return i!==""}function rc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ag=/^[ \t]*#include +<([\w\d./]+)>/gm;function So(i){return i.replace(Ag,Rg)}const Cg=new Map;function Rg(i,e){let t=Fe[e];if(t===void 0){const n=Cg.get(e);if(n!==void 0)t=Fe[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return So(t)}const Pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ac(i){return i.replace(Pg,Lg)}function Lg(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function oc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Dg={[Ar]:"SHADOWMAP_TYPE_PCF",[Tr]:"SHADOWMAP_TYPE_VSM"};function Ig(i){return Dg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ug={[Ti]:"ENVMAP_TYPE_CUBE",[rr]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE_UV"};function Ng(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Ug[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Fg={[rr]:"ENVMAP_MODE_REFRACTION"};function kg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Fg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Og={[Sc]:"ENVMAP_BLENDING_MULTIPLY",[ru]:"ENVMAP_BLENDING_MIX",[su]:"ENVMAP_BLENDING_ADD"};function Bg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Og[i.combine]||"ENVMAP_BLENDING_NONE"}function zg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Hg(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ig(t),c=Ng(t),u=kg(t),h=Bg(t),d=zg(t),p=Eg(t),x=Tg(s),b=r.createProgram();let m,f,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(wr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(wr).join(`
`),f.length>0&&(f+=`
`)):(m=[oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wr).join(`
`),f=[oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==bn?Sg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,yg("linearToOutputTexel",t.outputColorSpace),Mg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wr).join(`
`)),a=So(a),a=rc(a,t),a=sc(a,t),o=So(o),o=rc(o,t),o=sc(o,t),a=ac(a),o=ac(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=y+m+a,S=y+f+o,C=tc(r,r.VERTEX_SHADER,E),T=tc(r,r.FRAGMENT_SHADER,S);r.attachShader(b,C),r.attachShader(b,T),t.index0AttributeName!==void 0?r.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function A(R){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(b)||"",X=r.getShaderInfoLog(C)||"",q=r.getShaderInfoLog(T)||"",I=B.trim(),H=X.trim(),V=q.trim();let Z=!0,ee=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,b,C,T);else{const le=ic(r,C,"vertex"),ge=ic(r,T,"fragment");We("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+le+`
`+ge)}else I!==""?Ae("WebGLProgram: Program Info Log:",I):(H===""||V==="")&&(ee=!1);ee&&(R.diagnostics={runnable:Z,programLog:I,vertexShader:{log:H,prefix:m},fragmentShader:{log:V,prefix:f}})}r.deleteShader(C),r.deleteShader(T),_=new _s(r,b),w=wg(r,b)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=r.getProgramParameter(b,gg)),U},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xg++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=C,this.fragmentShader=T,this}let Gg=0;class Vg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Wg(e),t.set(e,n)),n}}class Wg{constructor(e){this.id=Gg++,this.code=e,this.usedTimes=0}}function Xg(i){return i===wi||i===Ss||i===Ms}function qg(i,e,t,n,r,s){const a=new No,o=new Vg,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let d=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return l.add(_),_===0?"uv":`uv${_}`}function b(_,w,U,R,B,X){const q=R.fog,I=B.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Z=e.get(_.envMap||H,V),ee=Z&&Z.mapping===Ps?Z.image.height:null,le=p[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Ae("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const ge=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ye=ge!==void 0?ge.length:0;let Ve=0;I.morphAttributes.position!==void 0&&(Ve=1),I.morphAttributes.normal!==void 0&&(Ve=2),I.morphAttributes.color!==void 0&&(Ve=3);let Ke,De,j,ue;if(le){const Ie=xn[le];Ke=Ie.vertexShader,De=Ie.fragmentShader}else Ke=_.vertexShader,De=_.fragmentShader,o.update(_),j=o.getVertexShaderID(_),ue=o.getFragmentShaderID(_);const te=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Pe=B.isInstancedMesh===!0,Ce=B.isBatchedMesh===!0,ot=!!_.map,Be=!!_.matcap,Ze=!!Z,at=!!_.aoMap,Oe=!!_.lightMap,Mt=!!_.bumpMap,lt=!!_.normalMap,Vt=!!_.displacementMap,L=!!_.emissiveMap,Et=!!_.metalnessMap,ze=!!_.roughnessMap,it=_.anisotropy>0,ce=_.clearcoat>0,ct=_.dispersion>0,M=_.iridescence>0,g=_.sheen>0,F=_.transmission>0,$=it&&!!_.anisotropyMap,Q=ce&&!!_.clearcoatMap,ne=ce&&!!_.clearcoatNormalMap,oe=ce&&!!_.clearcoatRoughnessMap,W=M&&!!_.iridescenceMap,K=M&&!!_.iridescenceThicknessMap,pe=g&&!!_.sheenColorMap,_e=g&&!!_.sheenRoughnessMap,se=!!_.specularMap,ie=!!_.specularColorMap,Re=!!_.specularIntensityMap,Ne=F&&!!_.transmissionMap,qe=F&&!!_.thicknessMap,P=!!_.gradientMap,re=!!_.alphaMap,Y=_.alphaTest>0,me=!!_.alphaHash,ae=!!_.extensions;let J=bn;_.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(J=i.toneMapping);const Me={shaderID:le,shaderType:_.type,shaderName:_.name,vertexShader:Ke,fragmentShader:De,defines:_.defines,customVertexShaderID:j,customFragmentShaderID:ue,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Ce,batchingColor:Ce&&B._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&B.instanceColor!==null,instancingMorph:Pe&&B.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ge.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ot,matcap:Be,envMap:Ze,envMapMode:Ze&&Z.mapping,envMapCubeUVHeight:ee,aoMap:at,lightMap:Oe,bumpMap:Mt,normalMap:lt,displacementMap:Vt,emissiveMap:L,normalMapObjectSpace:lt&&_.normalMapType===lu,normalMapTangentSpace:lt&&_.normalMapType===_o,packedNormalMap:lt&&_.normalMapType===_o&&Xg(_.normalMap.format),metalnessMap:Et,roughnessMap:ze,anisotropy:it,anisotropyMap:$,clearcoat:ce,clearcoatMap:Q,clearcoatNormalMap:ne,clearcoatRoughnessMap:oe,dispersion:ct,iridescence:M,iridescenceMap:W,iridescenceThicknessMap:K,sheen:g,sheenColorMap:pe,sheenRoughnessMap:_e,specularMap:se,specularColorMap:ie,specularIntensityMap:Re,transmission:F,transmissionMap:Ne,thicknessMap:qe,gradientMap:P,opaque:_.transparent===!1&&_.blending===Ji&&_.alphaToCoverage===!1,alphaMap:re,alphaTest:Y,alphaHash:me,combine:_.combine,mapUv:ot&&x(_.map.channel),aoMapUv:at&&x(_.aoMap.channel),lightMapUv:Oe&&x(_.lightMap.channel),bumpMapUv:Mt&&x(_.bumpMap.channel),normalMapUv:lt&&x(_.normalMap.channel),displacementMapUv:Vt&&x(_.displacementMap.channel),emissiveMapUv:L&&x(_.emissiveMap.channel),metalnessMapUv:Et&&x(_.metalnessMap.channel),roughnessMapUv:ze&&x(_.roughnessMap.channel),anisotropyMapUv:$&&x(_.anisotropyMap.channel),clearcoatMapUv:Q&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:ne&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:K&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:_e&&x(_.sheenRoughnessMap.channel),specularMapUv:se&&x(_.specularMap.channel),specularColorMapUv:ie&&x(_.specularColorMap.channel),specularIntensityMapUv:Re&&x(_.specularIntensityMap.channel),transmissionMapUv:Ne&&x(_.transmissionMap.channel),thicknessMapUv:qe&&x(_.thicknessMap.channel),alphaMapUv:re&&x(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(lt||it),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!I.attributes.uv&&(ot||re),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&lt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:we,skinning:B.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ve,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:J,decodeVideoTexture:ot&&_.map.isVideoTexture===!0&&Ge.getTransfer(_.map.colorSpace)===je,decodeVideoTextureEmissive:L&&_.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(_.emissiveMap.colorSpace)===je,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===kn,flipSided:_.side===Ht,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ae&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&_.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function m(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const U in _.defines)w.push(U),w.push(_.defines[U]);return _.isRawShaderMaterial===!1&&(f(w,_),y(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function f(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function y(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),_.push(a.mask)}function E(_){const w=p[_.type];let U;if(w){const R=xn[w];U=ah.clone(R.uniforms)}else U=_.uniforms;return U}function S(_,w){let U=u.get(w);return U!==void 0?++U.usedTimes:(U=new Hg(i,w,_,r),c.push(U),u.set(w,U)),U}function C(_){if(--_.usedTimes===0){const w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function A(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:E,acquireProgram:S,releaseProgram:C,releaseShaderCache:T,programs:c,dispose:A}}function Yg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function $g(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function lc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function cc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,x,b,m,f){let y=i[e];return y===void 0?(y={id:d.id,object:d,geometry:p,material:x,materialVariant:a(d),groupOrder:b,renderOrder:d.renderOrder,z:m,group:f},i[e]=y):(y.id=d.id,y.object=d,y.geometry=p,y.material=x,y.materialVariant=a(d),y.groupOrder=b,y.renderOrder=d.renderOrder,y.z=m,y.group=f),e++,y}function l(d,p,x,b,m,f){const y=o(d,p,x,b,m,f);x.transmission>0?n.push(y):x.transparent===!0?r.push(y):t.push(y)}function c(d,p,x,b,m,f){const y=o(d,p,x,b,m,f);x.transmission>0?n.unshift(y):x.transparent===!0?r.unshift(y):t.unshift(y)}function u(d,p){t.length>1&&t.sort(d||$g),n.length>1&&n.sort(p||lc),r.length>1&&r.sort(p||lc)}function h(){for(let d=e,p=i.length;d<p;d++){const x=i[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function Kg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new cc,i.set(n,[a])):r>=s.length?(a=new cc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function jg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Ye};break;case"SpotLight":t={position:new z,direction:new z,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function Zg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Jg=0;function Qg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function e0(i){const e=new jg,t=Zg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);const r=new z,s=new mt,a=new mt;function o(c){let u=0,h=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,x=0,b=0,m=0,f=0,y=0,E=0,S=0,C=0,T=0,A=0;c.sort(Qg);for(let w=0,U=c.length;w<U;w++){const R=c[w],B=R.color,X=R.intensity,q=R.distance;let I=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===wi?I=R.shadow.map.texture:I=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=B.r*X,h+=B.g*X,d+=B.b*X;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],X);A++}else if(R.isDirectionalLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const V=R.shadow,Z=t.get(R);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,n.directionalShadow[p]=Z,n.directionalShadowMap[p]=I,n.directionalShadowMatrix[p]=R.shadow.matrix,y++}n.directional[p]=H,p++}else if(R.isSpotLight){const H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(B).multiplyScalar(X),H.distance=q,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[b]=H;const V=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,V.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[b]=V.matrix,R.castShadow){const Z=t.get(R);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,n.spotShadow[b]=Z,n.spotShadowMap[b]=I,S++}b++}else if(R.isRectAreaLight){const H=e.get(R);H.color.copy(B).multiplyScalar(X),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=H,m++}else if(R.isPointLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const V=R.shadow,Z=t.get(R);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,Z.shadowCameraNear=V.camera.near,Z.shadowCameraFar=V.camera.far,n.pointShadow[x]=Z,n.pointShadowMap[x]=I,n.pointShadowMatrix[x]=R.shadow.matrix,E++}n.point[x]=H,x++}else if(R.isHemisphereLight){const H=e.get(R);H.skyColor.copy(R.color).multiplyScalar(X),H.groundColor.copy(R.groundColor).multiplyScalar(X),n.hemi[f]=H,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const _=n.hash;(_.directionalLength!==p||_.pointLength!==x||_.spotLength!==b||_.rectAreaLength!==m||_.hemiLength!==f||_.numDirectionalShadows!==y||_.numPointShadows!==E||_.numSpotShadows!==S||_.numSpotMaps!==C||_.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=b,n.rectArea.length=m,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=S+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,_.directionalLength=p,_.pointLength=x,_.spotLength=b,_.rectAreaLength=m,_.hemiLength=f,_.numDirectionalShadows=y,_.numPointShadows=E,_.numSpotShadows=S,_.numSpotMaps=C,_.numLightProbes=A,n.version=Jg++)}function l(c,u){let h=0,d=0,p=0,x=0,b=0;const m=u.matrixWorldInverse;for(let f=0,y=c.length;f<y;f++){const E=c[f];if(E.isDirectionalLight){const S=n.directional[h];S.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(E.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const S=n.rectArea[x];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(E.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(E.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const S=n.hemi[b];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),b++}}}return{setup:o,setupView:l,state:n}}function dc(i){const e=new e0(i),t=[],n=[],r=[];function s(d){h.camera=d,t.length=0,n.length=0,r.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function t0(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new dc(i),e.set(r,[o])):s>=a.length?(o=new dc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const n0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,i0=`uniform sampler2D shadow_pass;
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
}`,r0=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],s0=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],uc=new mt,Sr=new z,Ta=new z;function a0(i,e,t){let n=new ko;const r=new $e,s=new $e,a=new ht,o=new dh,l=new uh,c={},u=t.maxTextureSize,h={[ai]:Ht,[Ht]:ai,[kn]:kn},d=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:n0,fragmentShader:i0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const x=new Xn;x.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Bt(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ar;let f=this.type;this.render=function(T,A,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Bd&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ar);const w=i.getRenderTarget(),U=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),B=i.state;B.setBlending(zn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const X=f!==this.type;X&&A.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(I=>I.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,I=T.length;q<I;q++){const H=T[q],V=H.shadow;if(V===void 0){Ae("WebGLShadowMap:",H,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const Z=V.getFrameExtents();r.multiply(Z),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,V.mapSize.y=s.y));const ee=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=ee,V.map===null||X===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Tr){if(H.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Sn(r.x,r.y,{format:wi,type:Vn,minFilter:pt,magFilter:pt,generateMipmaps:!1}),V.map.texture.name=H.name+".shadowMap",V.map.depthTexture=new sr(r.x,r.y,_n),V.map.depthTexture.name=H.name+".shadowMapDepth",V.map.depthTexture.format=Wn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Rt,V.map.depthTexture.magFilter=Rt}else H.isPointLight?(V.map=new Qc(r.x),V.map.depthTexture=new rh(r.x,En)):(V.map=new Sn(r.x,r.y),V.map.depthTexture=new sr(r.x,r.y,En)),V.map.depthTexture.name=H.name+".shadowMap",V.map.depthTexture.format=Wn,this.type===Ar?(V.map.depthTexture.compareFunction=ee?Do:Lo,V.map.depthTexture.minFilter=pt,V.map.depthTexture.magFilter=pt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Rt,V.map.depthTexture.magFilter=Rt);V.camera.updateProjectionMatrix()}const le=V.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<le;ge++){if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,ge),i.clear();else{ge===0&&(i.setRenderTarget(V.map),i.clear());const ye=V.getViewport(ge);a.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),B.viewport(a)}if(H.isPointLight){const ye=V.camera,Ve=V.matrix,Ke=H.distance||ye.far;Ke!==ye.far&&(ye.far=Ke,ye.updateProjectionMatrix()),Sr.setFromMatrixPosition(H.matrixWorld),ye.position.copy(Sr),Ta.copy(ye.position),Ta.add(r0[ge]),ye.up.copy(s0[ge]),ye.lookAt(Ta),ye.updateMatrixWorld(),Ve.makeTranslation(-Sr.x,-Sr.y,-Sr.z),uc.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),V._frustum.setFromProjectionMatrix(uc,ye.coordinateSystem,ye.reversedDepth)}else V.updateMatrices(H);n=V.getFrustum(),S(A,_,V.camera,H,this.type)}V.isPointLightShadow!==!0&&this.type===Tr&&y(V,_),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(w,U,R)};function y(T,A){const _=e.update(b);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Sn(r.x,r.y,{format:wi,type:Vn})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,_,d,b,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,_,p,b,null)}function E(T,A,_,w){let U=null;const R=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)U=R;else if(U=_.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const B=U.uuid,X=A.uuid;let q=c[B];q===void 0&&(q={},c[B]=q);let I=q[X];I===void 0&&(I=U.clone(),q[X]=I,A.addEventListener("dispose",C)),U=I}if(U.visible=A.visible,U.wireframe=A.wireframe,w===Tr?U.side=A.shadowSide!==null?A.shadowSide:A.side:U.side=A.shadowSide!==null?A.shadowSide:h[A.side],U.alphaMap=A.alphaMap,U.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,U.map=A.map,U.clipShadows=A.clipShadows,U.clippingPlanes=A.clippingPlanes,U.clipIntersection=A.clipIntersection,U.displacementMap=A.displacementMap,U.displacementScale=A.displacementScale,U.displacementBias=A.displacementBias,U.wireframeLinewidth=A.wireframeLinewidth,U.linewidth=A.linewidth,_.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const B=i.properties.get(U);B.light=_}return U}function S(T,A,_,w,U){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&U===Tr)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);const X=e.update(T),q=T.material;if(Array.isArray(q)){const I=X.groups;for(let H=0,V=I.length;H<V;H++){const Z=I[H],ee=q[Z.materialIndex];if(ee&&ee.visible){const le=E(T,ee,w,U);T.onBeforeShadow(i,T,A,_,X,le,Z),i.renderBufferDirect(_,null,X,le,T,Z),T.onAfterShadow(i,T,A,_,X,le,Z)}}}else if(q.visible){const I=E(T,q,w,U);T.onBeforeShadow(i,T,A,_,X,I,null),i.renderBufferDirect(_,null,X,I,T,null),T.onAfterShadow(i,T,A,_,X,I,null)}}const B=T.children;for(let X=0,q=B.length;X<q;X++)S(B[X],A,_,w,U)}function C(T){T.target.removeEventListener("dispose",C);for(const _ in c){const w=c[_],U=T.target.uuid;U in w&&(w[U].dispose(),delete w[U])}}}function o0(i,e){function t(){let P=!1;const re=new ht;let Y=null;const me=new ht(0,0,0,0);return{setMask:function(ae){Y!==ae&&!P&&(i.colorMask(ae,ae,ae,ae),Y=ae)},setLocked:function(ae){P=ae},setClear:function(ae,J,Me,Ie,xt){xt===!0&&(ae*=Ie,J*=Ie,Me*=Ie),re.set(ae,J,Me,Ie),me.equals(re)===!1&&(i.clearColor(ae,J,Me,Ie),me.copy(re))},reset:function(){P=!1,Y=null,me.set(-1,0,0,0)}}}function n(){let P=!1,re=!1,Y=null,me=null,ae=null;return{setReversed:function(J){if(re!==J){const Me=e.get("EXT_clip_control");J?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),re=J;const Ie=ae;ae=null,this.setClear(Ie)}},getReversed:function(){return re},setTest:function(J){J?te(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(J){Y!==J&&!P&&(i.depthMask(J),Y=J)},setFunc:function(J){if(re&&(J=_u[J]),me!==J){switch(J){case Ia:i.depthFunc(i.NEVER);break;case Ua:i.depthFunc(i.ALWAYS);break;case Na:i.depthFunc(i.LESS);break;case ir:i.depthFunc(i.LEQUAL);break;case Fa:i.depthFunc(i.EQUAL);break;case ka:i.depthFunc(i.GEQUAL);break;case Oa:i.depthFunc(i.GREATER);break;case Ba:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=J}},setLocked:function(J){P=J},setClear:function(J){ae!==J&&(ae=J,re&&(J=1-J),i.clearDepth(J))},reset:function(){P=!1,Y=null,me=null,ae=null,re=!1}}}function r(){let P=!1,re=null,Y=null,me=null,ae=null,J=null,Me=null,Ie=null,xt=null;return{setTest:function(Je){P||(Je?te(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(Je){re!==Je&&!P&&(i.stencilMask(Je),re=Je)},setFunc:function(Je,Pn,fn){(Y!==Je||me!==Pn||ae!==fn)&&(i.stencilFunc(Je,Pn,fn),Y=Je,me=Pn,ae=fn)},setOp:function(Je,Pn,fn){(J!==Je||Me!==Pn||Ie!==fn)&&(i.stencilOp(Je,Pn,fn),J=Je,Me=Pn,Ie=fn)},setLocked:function(Je){P=Je},setClear:function(Je){xt!==Je&&(i.clearStencil(Je),xt=Je)},reset:function(){P=!1,re=null,Y=null,me=null,ae=null,J=null,Me=null,Ie=null,xt=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d={},p=new WeakMap,x=[],b=null,m=!1,f=null,y=null,E=null,S=null,C=null,T=null,A=null,_=new Ye(0,0,0),w=0,U=!1,R=null,B=null,X=null,q=null,I=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Z=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ee)[1]),V=Z>=1):ee.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),V=Z>=2);let le=null,ge={};const ye=i.getParameter(i.SCISSOR_BOX),Ve=i.getParameter(i.VIEWPORT),Ke=new ht().fromArray(ye),De=new ht().fromArray(Ve);function j(P,re,Y,me){const ae=new Uint8Array(4),J=i.createTexture();i.bindTexture(P,J),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<Y;Me++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(re+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return J}const ue={};ue[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(ir),Mt(!1),lt(cl),te(i.CULL_FACE),at(zn);function te(P){u[P]!==!0&&(i.enable(P),u[P]=!0)}function we(P){u[P]!==!1&&(i.disable(P),u[P]=!1)}function Pe(P,re){return d[P]!==re?(i.bindFramebuffer(P,re),d[P]=re,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=re),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Ce(P,re){let Y=x,me=!1;if(P){Y=p.get(re),Y===void 0&&(Y=[],p.set(re,Y));const ae=P.textures;if(Y.length!==ae.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let J=0,Me=ae.length;J<Me;J++)Y[J]=i.COLOR_ATTACHMENT0+J;Y.length=ae.length,me=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,me=!0);me&&i.drawBuffers(Y)}function ot(P){return b!==P?(i.useProgram(P),b=P,!0):!1}const Be={[vi]:i.FUNC_ADD,[Hd]:i.FUNC_SUBTRACT,[Gd]:i.FUNC_REVERSE_SUBTRACT};Be[Vd]=i.MIN,Be[Wd]=i.MAX;const Ze={[Xd]:i.ZERO,[qd]:i.ONE,[Yd]:i.SRC_COLOR,[La]:i.SRC_ALPHA,[Qd]:i.SRC_ALPHA_SATURATE,[Zd]:i.DST_COLOR,[Kd]:i.DST_ALPHA,[$d]:i.ONE_MINUS_SRC_COLOR,[Da]:i.ONE_MINUS_SRC_ALPHA,[Jd]:i.ONE_MINUS_DST_COLOR,[jd]:i.ONE_MINUS_DST_ALPHA,[eu]:i.CONSTANT_COLOR,[tu]:i.ONE_MINUS_CONSTANT_COLOR,[nu]:i.CONSTANT_ALPHA,[iu]:i.ONE_MINUS_CONSTANT_ALPHA};function at(P,re,Y,me,ae,J,Me,Ie,xt,Je){if(P===zn){m===!0&&(we(i.BLEND),m=!1);return}if(m===!1&&(te(i.BLEND),m=!0),P!==zd){if(P!==f||Je!==U){if((y!==vi||C!==vi)&&(i.blendEquation(i.FUNC_ADD),y=vi,C=vi),Je)switch(P){case Ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dl:i.blendFunc(i.ONE,i.ONE);break;case ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case hl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",P);break}else switch(P){case Ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ul:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hl:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",P);break}E=null,S=null,T=null,A=null,_.set(0,0,0),w=0,f=P,U=Je}return}ae=ae||re,J=J||Y,Me=Me||me,(re!==y||ae!==C)&&(i.blendEquationSeparate(Be[re],Be[ae]),y=re,C=ae),(Y!==E||me!==S||J!==T||Me!==A)&&(i.blendFuncSeparate(Ze[Y],Ze[me],Ze[J],Ze[Me]),E=Y,S=me,T=J,A=Me),(Ie.equals(_)===!1||xt!==w)&&(i.blendColor(Ie.r,Ie.g,Ie.b,xt),_.copy(Ie),w=xt),f=P,U=!1}function Oe(P,re){P.side===kn?we(i.CULL_FACE):te(i.CULL_FACE);let Y=P.side===Ht;re&&(Y=!Y),Mt(Y),P.blending===Ji&&P.transparent===!1?at(zn):at(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const me=P.stencilWrite;o.setTest(me),me&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),L(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function Mt(P){R!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),R=P)}function lt(P){P!==kd?(te(i.CULL_FACE),P!==B&&(P===cl?i.cullFace(i.BACK):P===Od?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),B=P}function Vt(P){P!==X&&(V&&i.lineWidth(P),X=P)}function L(P,re,Y){P?(te(i.POLYGON_OFFSET_FILL),(q!==re||I!==Y)&&(q=re,I=Y,a.getReversed()&&(re=-re),i.polygonOffset(re,Y))):we(i.POLYGON_OFFSET_FILL)}function Et(P){P?te(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function ze(P){P===void 0&&(P=i.TEXTURE0+H-1),le!==P&&(i.activeTexture(P),le=P)}function it(P,re,Y){Y===void 0&&(le===null?Y=i.TEXTURE0+H-1:Y=le);let me=ge[Y];me===void 0&&(me={type:void 0,texture:void 0},ge[Y]=me),(me.type!==P||me.texture!==re)&&(le!==Y&&(i.activeTexture(Y),le=Y),i.bindTexture(P,re||ue[P]),me.type=P,me.texture=re)}function ce(){const P=ge[le];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ct(){try{i.compressedTexImage2D(...arguments)}catch(P){We("WebGLState:",P)}}function M(){try{i.compressedTexImage3D(...arguments)}catch(P){We("WebGLState:",P)}}function g(){try{i.texSubImage2D(...arguments)}catch(P){We("WebGLState:",P)}}function F(){try{i.texSubImage3D(...arguments)}catch(P){We("WebGLState:",P)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(P){We("WebGLState:",P)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(P){We("WebGLState:",P)}}function ne(){try{i.texStorage2D(...arguments)}catch(P){We("WebGLState:",P)}}function oe(){try{i.texStorage3D(...arguments)}catch(P){We("WebGLState:",P)}}function W(){try{i.texImage2D(...arguments)}catch(P){We("WebGLState:",P)}}function K(){try{i.texImage3D(...arguments)}catch(P){We("WebGLState:",P)}}function pe(P){return h[P]!==void 0?h[P]:i.getParameter(P)}function _e(P,re){h[P]!==re&&(i.pixelStorei(P,re),h[P]=re)}function se(P){Ke.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Ke.copy(P))}function ie(P){De.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),De.copy(P))}function Re(P,re){let Y=c.get(re);Y===void 0&&(Y=new WeakMap,c.set(re,Y));let me=Y.get(P);me===void 0&&(me=i.getUniformBlockIndex(re,P.name),Y.set(P,me))}function Ne(P,re){const me=c.get(re).get(P);l.get(re)!==me&&(i.uniformBlockBinding(re,me,P.__bindingPointIndex),l.set(re,me))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},h={},le=null,ge={},d={},p=new WeakMap,x=[],b=null,m=!1,f=null,y=null,E=null,S=null,C=null,T=null,A=null,_=new Ye(0,0,0),w=0,U=!1,R=null,B=null,X=null,q=null,I=null,Ke.set(0,0,i.canvas.width,i.canvas.height),De.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:we,bindFramebuffer:Pe,drawBuffers:Ce,useProgram:ot,setBlending:at,setMaterial:Oe,setFlipSided:Mt,setCullFace:lt,setLineWidth:Vt,setPolygonOffset:L,setScissorTest:Et,activeTexture:ze,bindTexture:it,unbindTexture:ce,compressedTexImage2D:ct,compressedTexImage3D:M,texImage2D:W,texImage3D:K,pixelStorei:_e,getParameter:pe,updateUBOMapping:Re,uniformBlockBinding:Ne,texStorage2D:ne,texStorage3D:oe,texSubImage2D:g,texSubImage3D:F,compressedTexSubImage2D:$,compressedTexSubImage3D:Q,scissor:se,viewport:ie,reset:qe}}function l0(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,u=new WeakMap,h=new Set;let d;const p=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(M,g){return x?new OffscreenCanvas(M,g):Ur("canvas")}function m(M,g,F){let $=1;const Q=ct(M);if((Q.width>F||Q.height>F)&&($=F/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const ne=Math.floor($*Q.width),oe=Math.floor($*Q.height);d===void 0&&(d=b(ne,oe));const W=g?b(ne,oe):d;return W.width=ne,W.height=oe,W.getContext("2d").drawImage(M,0,0,ne,oe),Ae("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ne+"x"+oe+")."),W}else return"data"in M&&Ae("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),M;return M}function f(M){return M.generateMipmaps}function y(M){i.generateMipmap(M)}function E(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(M,g,F,$,Q,ne=!1){if(M!==null){if(i[M]!==void 0)return i[M];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let oe;$&&(oe=e.get("EXT_texture_norm16"),oe||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let W=g;if(g===i.RED&&(F===i.FLOAT&&(W=i.R32F),F===i.HALF_FLOAT&&(W=i.R16F),F===i.UNSIGNED_BYTE&&(W=i.R8),F===i.UNSIGNED_SHORT&&oe&&(W=oe.R16_EXT),F===i.SHORT&&oe&&(W=oe.R16_SNORM_EXT)),g===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.R8UI),F===i.UNSIGNED_SHORT&&(W=i.R16UI),F===i.UNSIGNED_INT&&(W=i.R32UI),F===i.BYTE&&(W=i.R8I),F===i.SHORT&&(W=i.R16I),F===i.INT&&(W=i.R32I)),g===i.RG&&(F===i.FLOAT&&(W=i.RG32F),F===i.HALF_FLOAT&&(W=i.RG16F),F===i.UNSIGNED_BYTE&&(W=i.RG8),F===i.UNSIGNED_SHORT&&oe&&(W=oe.RG16_EXT),F===i.SHORT&&oe&&(W=oe.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RG8UI),F===i.UNSIGNED_SHORT&&(W=i.RG16UI),F===i.UNSIGNED_INT&&(W=i.RG32UI),F===i.BYTE&&(W=i.RG8I),F===i.SHORT&&(W=i.RG16I),F===i.INT&&(W=i.RG32I)),g===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGB8UI),F===i.UNSIGNED_SHORT&&(W=i.RGB16UI),F===i.UNSIGNED_INT&&(W=i.RGB32UI),F===i.BYTE&&(W=i.RGB8I),F===i.SHORT&&(W=i.RGB16I),F===i.INT&&(W=i.RGB32I)),g===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),F===i.UNSIGNED_INT&&(W=i.RGBA32UI),F===i.BYTE&&(W=i.RGBA8I),F===i.SHORT&&(W=i.RGBA16I),F===i.INT&&(W=i.RGBA32I)),g===i.RGB&&(F===i.UNSIGNED_SHORT&&oe&&(W=oe.RGB16_EXT),F===i.SHORT&&oe&&(W=oe.RGB16_SNORM_EXT),F===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),g===i.RGBA){const K=ne?Ts:Ge.getTransfer(Q);F===i.FLOAT&&(W=i.RGBA32F),F===i.HALF_FLOAT&&(W=i.RGBA16F),F===i.UNSIGNED_BYTE&&(W=K===je?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT&&oe&&(W=oe.RGBA16_EXT),F===i.SHORT&&oe&&(W=oe.RGBA16_SNORM_EXT),F===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function C(M,g){let F;return M?g===null||g===En||g===Dr?F=i.DEPTH24_STENCIL8:g===_n?F=i.DEPTH32F_STENCIL8:g===Lr&&(F=i.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===En||g===Dr?F=i.DEPTH_COMPONENT24:g===_n?F=i.DEPTH_COMPONENT32F:g===Lr&&(F=i.DEPTH_COMPONENT16),F}function T(M,g){return f(M)===!0||M.isFramebufferTexture&&M.minFilter!==Rt&&M.minFilter!==pt?Math.log2(Math.max(g.width,g.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?g.mipmaps.length:1}function A(M){const g=M.target;g.removeEventListener("dispose",A),w(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&h.delete(g)}function _(M){const g=M.target;g.removeEventListener("dispose",_),R(g)}function w(M){const g=n.get(M);if(g.__webglInit===void 0)return;const F=M.source,$=p.get(F);if($){const Q=$[g.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&U(M),Object.keys($).length===0&&p.delete(F)}n.remove(M)}function U(M){const g=n.get(M);i.deleteTexture(g.__webglTexture);const F=M.source,$=p.get(F);delete $[g.__cacheKey],a.memory.textures--}function R(M){const g=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(g.__webglFramebuffer[$]))for(let Q=0;Q<g.__webglFramebuffer[$].length;Q++)i.deleteFramebuffer(g.__webglFramebuffer[$][Q]);else i.deleteFramebuffer(g.__webglFramebuffer[$]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[$])}else{if(Array.isArray(g.__webglFramebuffer))for(let $=0;$<g.__webglFramebuffer.length;$++)i.deleteFramebuffer(g.__webglFramebuffer[$]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let $=0;$<g.__webglColorRenderbuffer.length;$++)g.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[$]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const F=M.textures;for(let $=0,Q=F.length;$<Q;$++){const ne=n.get(F[$]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(F[$])}n.remove(M)}let B=0;function X(){B=0}function q(){return B}function I(M){B=M}function H(){const M=B;return M>=r.maxTextures&&Ae("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),B+=1,M}function V(M){const g=[];return g.push(M.wrapS),g.push(M.wrapT),g.push(M.wrapR||0),g.push(M.magFilter),g.push(M.minFilter),g.push(M.anisotropy),g.push(M.internalFormat),g.push(M.format),g.push(M.type),g.push(M.generateMipmaps),g.push(M.premultiplyAlpha),g.push(M.flipY),g.push(M.unpackAlignment),g.push(M.colorSpace),g.join()}function Z(M,g){const F=n.get(M);if(M.isVideoTexture&&it(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&F.__version!==M.version){const $=M.image;if($===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{we(F,M,g);return}}else M.isExternalTexture&&(F.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+g)}function ee(M,g){const F=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){we(F,M,g);return}else M.isExternalTexture&&(F.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+g)}function le(M,g){const F=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){we(F,M,g);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+g)}function ge(M,g){const F=n.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&F.__version!==M.version){Pe(F,M,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+g)}const ye={[Pr]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[za]:i.MIRRORED_REPEAT},Ve={[Rt]:i.NEAREST,[au]:i.NEAREST_MIPMAP_NEAREST,[qr]:i.NEAREST_MIPMAP_LINEAR,[pt]:i.LINEAR,[Ks]:i.LINEAR_MIPMAP_NEAREST,[bi]:i.LINEAR_MIPMAP_LINEAR},Ke={[cu]:i.NEVER,[pu]:i.ALWAYS,[du]:i.LESS,[Lo]:i.LEQUAL,[uu]:i.EQUAL,[Do]:i.GEQUAL,[hu]:i.GREATER,[fu]:i.NOTEQUAL};function De(M,g){if(g.type===_n&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===pt||g.magFilter===Ks||g.magFilter===qr||g.magFilter===bi||g.minFilter===pt||g.minFilter===Ks||g.minFilter===qr||g.minFilter===bi)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,ye[g.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,ye[g.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,ye[g.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,Ve[g.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,Ve[g.minFilter]),g.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,Ke[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Rt||g.minFilter!==qr&&g.minFilter!==bi||g.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(M,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function j(M,g){let F=!1;M.__webglInit===void 0&&(M.__webglInit=!0,g.addEventListener("dispose",A));const $=g.source;let Q=p.get($);Q===void 0&&(Q={},p.set($,Q));const ne=V(g);if(ne!==M.__cacheKey){Q[ne]===void 0&&(Q[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[ne].usedTimes++;const oe=Q[M.__cacheKey];oe!==void 0&&(Q[M.__cacheKey].usedTimes--,oe.usedTimes===0&&U(g)),M.__cacheKey=ne,M.__webglTexture=Q[ne].texture}return F}function ue(M,g,F){return Math.floor(Math.floor(M/F)/g)}function te(M,g,F,$){const ne=M.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,F,$,g.data);else{ne.sort((_e,se)=>_e.start-se.start);let oe=0;for(let _e=1;_e<ne.length;_e++){const se=ne[oe],ie=ne[_e],Re=se.start+se.count,Ne=ue(ie.start,g.width,4),qe=ue(se.start,g.width,4);ie.start<=Re+1&&Ne===qe&&ue(ie.start+ie.count-1,g.width,4)===Ne?se.count=Math.max(se.count,ie.start+ie.count-se.start):(++oe,ne[oe]=ie)}ne.length=oe+1;const W=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let _e=0,se=ne.length;_e<se;_e++){const ie=ne[_e],Re=Math.floor(ie.start/4),Ne=Math.ceil(ie.count/4),qe=Re%g.width,P=Math.floor(Re/g.width),re=Ne,Y=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),t.pixelStorei(i.UNPACK_SKIP_ROWS,P),t.texSubImage2D(i.TEXTURE_2D,0,qe,P,re,Y,F,$,g.data)}M.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,W),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function we(M,g,F){let $=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&($=i.TEXTURE_3D);const Q=j(M,g),ne=g.source;t.bindTexture($,M.__webglTexture,i.TEXTURE0+F);const oe=n.get(ne);if(ne.version!==oe.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+F),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const Y=Ge.getPrimaries(Ge.workingColorSpace),me=g.colorSpace===ni?null:Ge.getPrimaries(g.colorSpace),ae=g.colorSpace===ni||Y===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let K=m(g.image,!1,r.maxTextureSize);K=ce(g,K);const pe=s.convert(g.format,g.colorSpace),_e=s.convert(g.type);let se=S(g.internalFormat,pe,_e,g.normalized,g.colorSpace,g.isVideoTexture);De($,g);let ie;const Re=g.mipmaps,Ne=g.isVideoTexture!==!0,qe=oe.__version===void 0||Q===!0,P=ne.dataReady,re=T(g,K);if(g.isDepthTexture)se=C(g.format===Si,g.type),qe&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,se,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,se,K.width,K.height,0,pe,_e,null));else if(g.isDataTexture)if(Re.length>0){Ne&&qe&&t.texStorage2D(i.TEXTURE_2D,re,se,Re[0].width,Re[0].height);for(let Y=0,me=Re.length;Y<me;Y++)ie=Re[Y],Ne?P&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(i.TEXTURE_2D,Y,se,ie.width,ie.height,0,pe,_e,ie.data);g.generateMipmaps=!1}else Ne?(qe&&t.texStorage2D(i.TEXTURE_2D,re,se,K.width,K.height),P&&te(g,K,pe,_e)):t.texImage2D(i.TEXTURE_2D,0,se,K.width,K.height,0,pe,_e,K.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ne&&qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,se,Re[0].width,Re[0].height,K.depth);for(let Y=0,me=Re.length;Y<me;Y++)if(ie=Re[Y],g.format!==ln)if(pe!==null)if(Ne){if(P)if(g.layerUpdates.size>0){const ae=Gl(ie.width,ie.height,g.format,g.type);for(const J of g.layerUpdates){const Me=ie.data.subarray(J*ae/ie.data.BYTES_PER_ELEMENT,(J+1)*ae/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,J,ie.width,ie.height,1,pe,Me)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,ie.width,ie.height,K.depth,pe,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,se,ie.width,ie.height,K.depth,0,ie.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,ie.width,ie.height,K.depth,pe,_e,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,se,ie.width,ie.height,K.depth,0,pe,_e,ie.data)}else{Ne&&qe&&t.texStorage2D(i.TEXTURE_2D,re,se,Re[0].width,Re[0].height);for(let Y=0,me=Re.length;Y<me;Y++)ie=Re[Y],g.format!==ln?pe!==null?Ne?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,ie.width,ie.height,pe,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,se,ie.width,ie.height,0,ie.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?P&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(i.TEXTURE_2D,Y,se,ie.width,ie.height,0,pe,_e,ie.data)}else if(g.isDataArrayTexture)if(Ne){if(qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,se,K.width,K.height,K.depth),P)if(g.layerUpdates.size>0){const Y=Gl(K.width,K.height,g.format,g.type);for(const me of g.layerUpdates){const ae=K.data.subarray(me*Y/K.data.BYTES_PER_ELEMENT,(me+1)*Y/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,K.width,K.height,1,pe,_e,ae)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,pe,_e,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,se,K.width,K.height,K.depth,0,pe,_e,K.data);else if(g.isData3DTexture)Ne?(qe&&t.texStorage3D(i.TEXTURE_3D,re,se,K.width,K.height,K.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,pe,_e,K.data)):t.texImage3D(i.TEXTURE_3D,0,se,K.width,K.height,K.depth,0,pe,_e,K.data);else if(g.isFramebufferTexture){if(qe)if(Ne)t.texStorage2D(i.TEXTURE_2D,re,se,K.width,K.height);else{let Y=K.width,me=K.height;for(let ae=0;ae<re;ae++)t.texImage2D(i.TEXTURE_2D,ae,se,Y,me,0,pe,_e,null),Y>>=1,me>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){const Y=i.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),K.parentNode!==Y){Y.appendChild(K),h.add(g),Y.onpaint=Ie=>{const xt=Ie.changedElements;for(const Je of h)xt.includes(Je.image)&&(Je.needsUpdate=!0)},Y.requestPaint();return}const me=0,ae=i.RGBA,J=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,me,ae,J,Me,K),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Ne&&qe){const Y=ct(Re[0]);t.texStorage2D(i.TEXTURE_2D,re,se,Y.width,Y.height)}for(let Y=0,me=Re.length;Y<me;Y++)ie=Re[Y],Ne?P&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,pe,_e,ie):t.texImage2D(i.TEXTURE_2D,Y,se,pe,_e,ie);g.generateMipmaps=!1}else if(Ne){if(qe){const Y=ct(K);t.texStorage2D(i.TEXTURE_2D,re,se,Y.width,Y.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,_e,K)}else t.texImage2D(i.TEXTURE_2D,0,se,pe,_e,K);f(g)&&y($),oe.__version=ne.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function Pe(M,g,F){if(g.image.length!==6)return;const $=j(M,g),Q=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+F);const ne=n.get(Q);if(Q.version!==ne.__version||$===!0){t.activeTexture(i.TEXTURE0+F);const oe=Ge.getPrimaries(Ge.workingColorSpace),W=g.colorSpace===ni?null:Ge.getPrimaries(g.colorSpace),K=g.colorSpace===ni||oe===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const pe=g.isCompressedTexture||g.image[0].isCompressedTexture,_e=g.image[0]&&g.image[0].isDataTexture,se=[];for(let J=0;J<6;J++)!pe&&!_e?se[J]=m(g.image[J],!0,r.maxCubemapSize):se[J]=_e?g.image[J].image:g.image[J],se[J]=ce(g,se[J]);const ie=se[0],Re=s.convert(g.format,g.colorSpace),Ne=s.convert(g.type),qe=S(g.internalFormat,Re,Ne,g.normalized,g.colorSpace),P=g.isVideoTexture!==!0,re=ne.__version===void 0||$===!0,Y=Q.dataReady;let me=T(g,ie);De(i.TEXTURE_CUBE_MAP,g);let ae;if(pe){P&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,qe,ie.width,ie.height);for(let J=0;J<6;J++){ae=se[J].mipmaps;for(let Me=0;Me<ae.length;Me++){const Ie=ae[Me];g.format!==ln?Re!==null?P?Y&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,Ie.width,Ie.height,Re,Ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,qe,Ie.width,Ie.height,0,Ie.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,Ie.width,Ie.height,Re,Ne,Ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,qe,Ie.width,Ie.height,0,Re,Ne,Ie.data)}}}else{if(ae=g.mipmaps,P&&re){ae.length>0&&me++;const J=ct(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,qe,J.width,J.height)}for(let J=0;J<6;J++)if(_e){P?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,se[J].width,se[J].height,Re,Ne,se[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,se[J].width,se[J].height,0,Re,Ne,se[J].data);for(let Me=0;Me<ae.length;Me++){const xt=ae[Me].image[J].image;P?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,xt.width,xt.height,Re,Ne,xt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,qe,xt.width,xt.height,0,Re,Ne,xt.data)}}else{P?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Re,Ne,se[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,Re,Ne,se[J]);for(let Me=0;Me<ae.length;Me++){const Ie=ae[Me];P?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,Re,Ne,Ie.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,qe,Re,Ne,Ie.image[J])}}}f(g)&&y(i.TEXTURE_CUBE_MAP),ne.__version=Q.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function Ce(M,g,F,$,Q,ne){const oe=s.convert(F.format,F.colorSpace),W=s.convert(F.type),K=S(F.internalFormat,oe,W,F.normalized,F.colorSpace),pe=n.get(g),_e=n.get(F);if(_e.__renderTarget=g,!pe.__hasExternalTextures){const se=Math.max(1,g.width>>ne),ie=Math.max(1,g.height>>ne);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ne,K,se,ie,g.depth,0,oe,W,null):t.texImage2D(Q,ne,K,se,ie,0,oe,W,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),ze(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Q,_e.__webglTexture,0,Et(g)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,Q,_e.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(M,g,F){if(i.bindRenderbuffer(i.RENDERBUFFER,M),g.depthBuffer){const $=g.depthTexture,Q=$&&$.isDepthTexture?$.type:null,ne=C(g.stencilBuffer,Q),oe=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ze(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Et(g),ne,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,Et(g),ne,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ne,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,M)}else{const $=g.textures;for(let Q=0;Q<$.length;Q++){const ne=$[Q],oe=s.convert(ne.format,ne.colorSpace),W=s.convert(ne.type),K=S(ne.internalFormat,oe,W,ne.normalized,ne.colorSpace);ze(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Et(g),K,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,Et(g),K,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,K,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Be(M,g,F){const $=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(g.depthTexture);if(Q.__renderTarget=g,(!Q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),$){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),De(i.TEXTURE_CUBE_MAP,g.depthTexture);const pe=s.convert(g.depthTexture.format),_e=s.convert(g.depthTexture.type);let se;g.depthTexture.format===Wn?se=i.DEPTH_COMPONENT24:g.depthTexture.format===Si&&(se=i.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,se,g.width,g.height,0,pe,_e,null)}}else Z(g.depthTexture,0);const ne=Q.__webglTexture,oe=Et(g),W=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+F:i.TEXTURE_2D,K=g.depthTexture.format===Si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Wn)ze(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,W,ne,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,K,W,ne,0);else if(g.depthTexture.format===Si)ze(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,W,ne,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,K,W,ne,0);else throw new Error("Unknown depthTexture format")}function Ze(M){const g=n.get(M),F=M.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==M.depthTexture){const $=M.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),$){const Q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),g.__depthDisposeCallback=Q}g.__boundDepthTexture=$}if(M.depthTexture&&!g.__autoAllocateDepthBuffer)if(F)for(let $=0;$<6;$++)Be(g.__webglFramebuffer[$],M,$);else{const $=M.texture.mipmaps;$&&$.length>0?Be(g.__webglFramebuffer[0],M,0):Be(g.__webglFramebuffer,M,0)}else if(F){g.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[$]),g.__webglDepthbuffer[$]===void 0)g.__webglDepthbuffer[$]=i.createRenderbuffer(),ot(g.__webglDepthbuffer[$],M,!1);else{const Q=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}else{const $=M.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),ot(g.__webglDepthbuffer,M,!1);else{const Q=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(M,g,F){const $=n.get(M);g!==void 0&&Ce($.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ze(M)}function Oe(M){const g=M.texture,F=n.get(M),$=n.get(g);M.addEventListener("dispose",_);const Q=M.textures,ne=M.isWebGLCubeRenderTarget===!0,oe=Q.length>1;if(oe||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=g.version,a.memory.textures++),ne){F.__webglFramebuffer=[];for(let W=0;W<6;W++)if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer[W]=[];for(let K=0;K<g.mipmaps.length;K++)F.__webglFramebuffer[W][K]=i.createFramebuffer()}else F.__webglFramebuffer[W]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer=[];for(let W=0;W<g.mipmaps.length;W++)F.__webglFramebuffer[W]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(oe)for(let W=0,K=Q.length;W<K;W++){const pe=n.get(Q[W]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(M.samples>0&&ze(M)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let W=0;W<Q.length;W++){const K=Q[W];F.__webglColorRenderbuffer[W]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[W]);const pe=s.convert(K.format,K.colorSpace),_e=s.convert(K.type),se=S(K.internalFormat,pe,_e,K.normalized,K.colorSpace,M.isXRRenderTarget===!0),ie=Et(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,se,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,F.__webglColorRenderbuffer[W])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(F.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),De(i.TEXTURE_CUBE_MAP,g);for(let W=0;W<6;W++)if(g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)Ce(F.__webglFramebuffer[W][K],M,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,K);else Ce(F.__webglFramebuffer[W],M,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);f(g)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let W=0,K=Q.length;W<K;W++){const pe=Q[W],_e=n.get(pe);let se=i.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(se=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,_e.__webglTexture),De(se,pe),Ce(F.__webglFramebuffer,M,pe,i.COLOR_ATTACHMENT0+W,se,0),f(pe)&&y(se)}t.unbindTexture()}else{let W=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(W=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(W,$.__webglTexture),De(W,g),g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)Ce(F.__webglFramebuffer[K],M,g,i.COLOR_ATTACHMENT0,W,K);else Ce(F.__webglFramebuffer,M,g,i.COLOR_ATTACHMENT0,W,0);f(g)&&y(W),t.unbindTexture()}M.depthBuffer&&Ze(M)}function Mt(M){const g=M.textures;for(let F=0,$=g.length;F<$;F++){const Q=g[F];if(f(Q)){const ne=E(M),oe=n.get(Q).__webglTexture;t.bindTexture(ne,oe),y(ne),t.unbindTexture()}}}const lt=[],Vt=[];function L(M){if(M.samples>0){if(ze(M)===!1){const g=M.textures,F=M.width,$=M.height;let Q=i.COLOR_BUFFER_BIT;const ne=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(M),W=g.length>1;if(W)for(let pe=0;pe<g.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const K=M.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let pe=0;pe<g.length;pe++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),W){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=n.get(g[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_e,0)}i.blitFramebuffer(0,0,F,$,0,0,F,$,Q,i.NEAREST),l===!0&&(lt.length=0,Vt.length=0,lt.push(i.COLOR_ATTACHMENT0+pe),M.depthBuffer&&M.resolveDepthBuffer===!1&&(lt.push(ne),Vt.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Vt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),W)for(let pe=0;pe<g.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=n.get(g[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,_e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const g=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Et(M){return Math.min(r.maxSamples,M.samples)}function ze(M){const g=n.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function it(M){const g=a.render.frame;u.get(M)!==g&&(u.set(M,g),M.update())}function ce(M,g){const F=M.colorSpace,$=M.format,Q=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||F!==Es&&F!==ni&&(Ge.getTransfer(F)===je?($!==ln||Q!==Yt)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",F)),g}function ct(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=X,this.getTextureUnits=q,this.setTextureUnits=I,this.setTexture2D=Z,this.setTexture2DArray=ee,this.setTexture3D=le,this.setTextureCube=ge,this.rebindTextures=at,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function c0(i,e){function t(n,r=ni){let s;const a=Ge.getTransfer(r);if(n===Yt)return i.UNSIGNED_BYTE;if(n===wo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ao)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ic)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Uc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Lc)return i.BYTE;if(n===Dc)return i.SHORT;if(n===Lr)return i.UNSIGNED_SHORT;if(n===To)return i.INT;if(n===En)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Vn)return i.HALF_FLOAT;if(n===Nc)return i.ALPHA;if(n===Fc)return i.RGB;if(n===ln)return i.RGBA;if(n===Wn)return i.DEPTH_COMPONENT;if(n===Si)return i.DEPTH_STENCIL;if(n===kc)return i.RED;if(n===Co)return i.RED_INTEGER;if(n===wi)return i.RG;if(n===Ro)return i.RG_INTEGER;if(n===Po)return i.RGBA_INTEGER;if(n===ps||n===ms||n===gs||n===xs)if(a===je)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ps)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ms)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===gs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ps)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ms)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===gs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ha||n===Ga||n===Va||n===Wa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ha)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ga)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Va)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xa||n===qa||n===Ya||n===$a||n===Ka||n===Ss||n===ja)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Xa||n===qa)return a===je?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ya)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===$a)return s.COMPRESSED_R11_EAC;if(n===Ka)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ss)return s.COMPRESSED_RG11_EAC;if(n===ja)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Za||n===Ja||n===Qa||n===eo||n===to||n===no||n===io||n===ro||n===so||n===ao||n===oo||n===lo||n===co||n===uo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Za)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ja)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qa)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===eo)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===to)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===no)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===io)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ro)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===so)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ao)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oo)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===lo)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===co)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===uo)return a===je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ho||n===fo||n===po)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ho)return a===je?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===po)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===mo||n===go||n===Ms||n===xo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===mo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===go)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ms)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const d0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u0=`
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

}`;class h0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new qc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tn({vertexShader:d0,fragmentShader:u0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Bt(new hr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class f0 extends Pi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,x=null;const b=typeof XRWebGLBinding<"u",m=new h0,f={},y=t.getContextAttributes();let E=null,S=null;const C=[],T=[],A=new $e;let _=null;const w=new Zt;w.viewport=new ht;const U=new Zt;U.viewport=new ht;const R=[w,U],B=new bh;let X=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ue=C[j];return ue===void 0&&(ue=new ta,C[j]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(j){let ue=C[j];return ue===void 0&&(ue=new ta,C[j]=ue),ue.getGripSpace()},this.getHand=function(j){let ue=C[j];return ue===void 0&&(ue=new ta,C[j]=ue),ue.getHandSpace()};function I(j){const ue=T.indexOf(j.inputSource);if(ue===-1)return;const te=C[ue];te!==void 0&&(te.update(j.inputSource,j.frame,c||a),te.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",V);for(let j=0;j<C.length;j++){const ue=T[j];ue!==null&&(T[j]=null,C[j].disconnect(ue))}X=null,q=null,m.reset();for(const j in f)delete f[j];e.setRenderTarget(E),p=null,d=null,h=null,r=null,S=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&b&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",H),r.addEventListener("inputsourceschange",V),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,we=null,Pe=null;y.depth&&(Pe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=y.stencil?Si:Wn,we=y.stencil?Dr:En);const Ce={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Ce),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Sn(d.textureWidth,d.textureHeight,{format:ln,type:Yt,depthTexture:new sr(d.textureWidth,d.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Sn(p.framebufferWidth,p.framebufferHeight,{format:ln,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),De.setContext(r),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(j){for(let ue=0;ue<j.removed.length;ue++){const te=j.removed[ue],we=T.indexOf(te);we>=0&&(T[we]=null,C[we].disconnect(te))}for(let ue=0;ue<j.added.length;ue++){const te=j.added[ue];let we=T.indexOf(te);if(we===-1){for(let Ce=0;Ce<C.length;Ce++)if(Ce>=T.length){T.push(te),we=Ce;break}else if(T[Ce]===null){T[Ce]=te,we=Ce;break}if(we===-1)break}const Pe=C[we];Pe&&Pe.connect(te)}}const Z=new z,ee=new z;function le(j,ue,te){Z.setFromMatrixPosition(ue.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const we=Z.distanceTo(ee),Pe=ue.projectionMatrix.elements,Ce=te.projectionMatrix.elements,ot=Pe[14]/(Pe[10]-1),Be=Pe[14]/(Pe[10]+1),Ze=(Pe[9]+1)/Pe[5],at=(Pe[9]-1)/Pe[5],Oe=(Pe[8]-1)/Pe[0],Mt=(Ce[8]+1)/Ce[0],lt=ot*Oe,Vt=ot*Mt,L=we/(-Oe+Mt),Et=L*-Oe;if(ue.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Et),j.translateZ(L),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Pe[10]===-1)j.projectionMatrix.copy(ue.projectionMatrix),j.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const ze=ot+L,it=Be+L,ce=lt-Et,ct=Vt+(we-Et),M=Ze*Be/it*ze,g=at*Be/it*ze;j.projectionMatrix.makePerspective(ce,ct,M,g,ze,it),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ge(j,ue){ue===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ue.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ue=j.near,te=j.far;m.texture!==null&&(m.depthNear>0&&(ue=m.depthNear),m.depthFar>0&&(te=m.depthFar)),B.near=U.near=w.near=ue,B.far=U.far=w.far=te,(X!==B.near||q!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),X=B.near,q=B.far),B.layers.mask=j.layers.mask|6,w.layers.mask=B.layers.mask&-5,U.layers.mask=B.layers.mask&-3;const we=j.parent,Pe=B.cameras;ge(B,we);for(let Ce=0;Ce<Pe.length;Ce++)ge(Pe[Ce],we);Pe.length===2?le(B,w,U):B.projectionMatrix.copy(w.projectionMatrix),ye(j,B,we)};function ye(j,ue,te){te===null?j.matrix.copy(ue.matrixWorld):(j.matrix.copy(te.matrixWorld),j.matrix.invert(),j.matrix.multiply(ue.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ue.projectionMatrix),j.projectionMatrixInverse.copy(ue.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Nr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(j){return f[j]};let Ve=null;function Ke(j,ue){if(u=ue.getViewerPose(c||a),x=ue,u!==null){const te=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let we=!1;te.length!==B.cameras.length&&(B.cameras.length=0,we=!0);for(let Be=0;Be<te.length;Be++){const Ze=te[Be];let at=null;if(p!==null)at=p.getViewport(Ze);else{const Mt=h.getViewSubImage(d,Ze);at=Mt.viewport,Be===0&&(e.setRenderTargetTextures(S,Mt.colorTexture,Mt.depthStencilTexture),e.setRenderTarget(S))}let Oe=R[Be];Oe===void 0&&(Oe=new Zt,Oe.layers.enable(Be),Oe.viewport=new ht,R[Be]=Oe),Oe.matrix.fromArray(Ze.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Ze.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(at.x,at.y,at.width,at.height),Be===0&&(B.matrix.copy(Oe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),we===!0&&B.cameras.push(Oe)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&b){h=n.getBinding();const Be=h.getDepthInformation(te[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,r.renderState)}if(Pe&&Pe.includes("camera-access")&&b){e.state.unbindTexture(),h=n.getBinding();for(let Be=0;Be<te.length;Be++){const Ze=te[Be].camera;if(Ze){let at=f[Ze];at||(at=new qc,f[Ze]=at);const Oe=h.getCameraImage(Ze);at.sourceTexture=Oe}}}}for(let te=0;te<C.length;te++){const we=T[te],Pe=C[te];we!==null&&Pe!==void 0&&Pe.update(we,ue,c||a)}Ve&&Ve(j,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),x=null}const De=new Zc;De.setAnimationLoop(Ke),this.setAnimationLoop=function(j){Ve=j},this.dispose=function(){}}}const p0=new mt,rd=new Le;rd.set(-1,0,0,0,1,0,0,0,1);function m0(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Yc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,y,E,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(s(m,f),x(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),b(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,y,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ht&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ht&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=e.get(f),E=y.envMap,S=y.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(p0.makeRotationFromEuler(S)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(rd),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,y,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ht&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function b(m,f){const y=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function g0(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,E){const S=E.program;n.uniformBlockBinding(y,S)}function c(y,E){let S=r[y.id];S===void 0&&(x(y),S=u(y),r[y.id]=S,y.addEventListener("dispose",m));const C=E.program;n.updateUBOMapping(y,C);const T=e.render.frame;s[y.id]!==T&&(d(y),s[y.id]=T)}function u(y){const E=h();y.__bindingPointIndex=E;const S=i.createBuffer(),C=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const E=r[y.id],S=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,A=S.length;T<A;T++){const _=Array.isArray(S[T])?S[T]:[S[T]];for(let w=0,U=_.length;w<U;w++){const R=_[w];if(p(R,T,w,C)===!0){const B=R.__offset,X=Array.isArray(R.value)?R.value:[R.value];let q=0;for(let I=0;I<X.length;I++){const H=X[I],V=b(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,B+q,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):ArrayBuffer.isView(H)?R.__data.set(new H.constructor(H.buffer,H.byteOffset,R.__data.length)):(H.toArray(R.__data,q),q+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,E,S,C){const T=y.value,A=E+"_"+S;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:ArrayBuffer.isView(T)?C[A]=T.slice():C[A]=T.clone(),!0;{const _=C[A];if(typeof T=="number"||typeof T=="boolean"){if(_!==T)return C[A]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(_.equals(T)===!1)return _.copy(T),!0}}return!1}function x(y){const E=y.uniforms;let S=0;const C=16;for(let A=0,_=E.length;A<_;A++){const w=Array.isArray(E[A])?E[A]:[E[A]];for(let U=0,R=w.length;U<R;U++){const B=w[U],X=Array.isArray(B.value)?B.value:[B.value];for(let q=0,I=X.length;q<I;q++){const H=X[q],V=b(H),Z=S%C,ee=Z%V.boundary,le=Z+ee;S+=ee,le!==0&&C-le<V.storage&&(S+=C-le),B.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=V.storage}}}const T=S%C;return T>0&&(S+=C-T),y.__size=S,y.__cache={},this}function b(y){const E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",y),E}function m(y){const E=y.target;E.removeEventListener("dispose",m);const S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function f(){for(const y in r)i.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}const x0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gn=null;function _0(){return gn===null&&(gn=new eh(x0,16,16,wi,Vn),gn.name="DFG_LUT",gn.minFilter=pt,gn.magFilter=pt,gn.wrapS=On,gn.wrapT=On,gn.generateMipmaps=!1,gn.needsUpdate=!0),gn}class v0{constructor(e={}){const{canvas:t=gu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Yt}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;const b=p,m=new Set([Po,Ro,Co]),f=new Set([Yt,En,Lr,Dr,wo,Ao]),y=new Uint32Array(4),E=new Int32Array(4),S=new z;let C=null,T=null;const A=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let R=!1,B=null;this._outputColorSpace=jt;let X=0,q=0,I=null,H=-1,V=null;const Z=new ht,ee=new ht;let le=null;const ge=new Ye(0);let ye=0,Ve=t.width,Ke=t.height,De=1,j=null,ue=null;const te=new ht(0,0,Ve,Ke),we=new ht(0,0,Ve,Ke);let Pe=!1;const Ce=new ko;let ot=!1,Be=!1;const Ze=new mt,at=new z,Oe=new ht,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function Vt(){return I===null?De:1}let L=n;function Et(v,D){return t.getContext(v,D)}try{const v={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Eo}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",Ie,!1),L===null){const D="webgl2";if(L=Et(D,v),L===null)throw Et(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw We("WebGLRenderer: "+v.message),v}let ze,it,ce,ct,M,g,F,$,Q,ne,oe,W,K,pe,_e,se,ie,Re,Ne,qe,P,re,Y;function me(){ze=new _m(L),ze.init(),P=new c0(L,ze),it=new dm(L,ze,e,P),ce=new o0(L,ze),it.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),ct=new bm(L),M=new Yg,g=new l0(L,ze,ce,M,it,P,ct),F=new xm(U),$=new Eh(L),re=new lm(L,$),Q=new vm(L,$,ct,re),ne=new Mm(L,Q,$,re,ct),Re=new Sm(L,it,g),_e=new um(M),oe=new qg(U,F,ze,it,re,_e),W=new m0(U,M),K=new Kg,pe=new t0(ze),ie=new om(U,F,ce,ne,x,l),se=new a0(U,ne,it),Y=new g0(L,ct,it,ce),Ne=new cm(L,ze,ct),qe=new ym(L,ze,ct),ct.programs=oe.programs,U.capabilities=it,U.extensions=ze,U.properties=M,U.renderLists=K,U.shadowMap=se,U.state=ce,U.info=ct}me(),b!==Yt&&(w=new Tm(b,t.width,t.height,r,s));const ae=new f0(U,L);this.xr=ae,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const v=ze.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=ze.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(v){v!==void 0&&(De=v,this.setSize(Ve,Ke,!1))},this.getSize=function(v){return v.set(Ve,Ke)},this.setSize=function(v,D,G=!0){if(ae.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}Ve=v,Ke=D,t.width=Math.floor(v*De),t.height=Math.floor(D*De),G===!0&&(t.style.width=v+"px",t.style.height=D+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(Ve*De,Ke*De).floor()},this.setDrawingBufferSize=function(v,D,G){Ve=v,Ke=D,De=G,t.width=Math.floor(v*G),t.height=Math.floor(D*G),this.setViewport(0,0,v,D)},this.setEffects=function(v){if(b===Yt){We("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let D=0;D<v.length;D++)if(v[D].isOutputPass===!0){Ae("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(Z)},this.getViewport=function(v){return v.copy(te)},this.setViewport=function(v,D,G,k){v.isVector4?te.set(v.x,v.y,v.z,v.w):te.set(v,D,G,k),ce.viewport(Z.copy(te).multiplyScalar(De).round())},this.getScissor=function(v){return v.copy(we)},this.setScissor=function(v,D,G,k){v.isVector4?we.set(v.x,v.y,v.z,v.w):we.set(v,D,G,k),ce.scissor(ee.copy(we).multiplyScalar(De).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(v){ce.setScissorTest(Pe=v)},this.setOpaqueSort=function(v){j=v},this.setTransparentSort=function(v){ue=v},this.getClearColor=function(v){return v.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(v=!0,D=!0,G=!0){let k=0;if(v){let O=!1;if(I!==null){const fe=I.texture.format;O=m.has(fe)}if(O){const fe=I.texture.type,ve=f.has(fe),he=ie.getClearColor(),be=ie.getClearAlpha(),Ee=he.r,Ue=he.g,ke=he.b;ve?(y[0]=Ee,y[1]=Ue,y[2]=ke,y[3]=be,L.clearBufferuiv(L.COLOR,0,y)):(E[0]=Ee,E[1]=Ue,E[2]=ke,E[3]=be,L.clearBufferiv(L.COLOR,0,E))}else k|=L.COLOR_BUFFER_BIT}D&&(k|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),B=v},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",Ie,!1),ie.dispose(),K.dispose(),pe.dispose(),M.dispose(),F.dispose(),ne.dispose(),re.dispose(),Y.dispose(),oe.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",el),ae.removeEventListener("sessionend",tl),hi.stop()};function J(v){v.preventDefault(),xl("WebGLRenderer: Context Lost."),R=!0}function Me(){xl("WebGLRenderer: Context Restored."),R=!1;const v=ct.autoReset,D=se.enabled,G=se.autoUpdate,k=se.needsUpdate,O=se.type;me(),ct.autoReset=v,se.enabled=D,se.autoUpdate=G,se.needsUpdate=k,se.type=O}function Ie(v){We("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function xt(v){const D=v.target;D.removeEventListener("dispose",xt),Je(D)}function Je(v){Pn(v),M.remove(v)}function Pn(v){const D=M.get(v).programs;D!==void 0&&(D.forEach(function(G){oe.releaseProgram(G)}),v.isShaderMaterial&&oe.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,G,k,O,fe){D===null&&(D=Mt);const ve=O.isMesh&&O.matrixWorld.determinant()<0,he=wd(v,D,G,k,O);ce.setMaterial(k,ve);let be=G.index,Ee=1;if(k.wireframe===!0){if(be=Q.getWireframeAttribute(G),be===void 0)return;Ee=2}const Ue=G.drawRange,ke=G.attributes.position;let Te=Ue.start*Ee,Qe=(Ue.start+Ue.count)*Ee;fe!==null&&(Te=Math.max(Te,fe.start*Ee),Qe=Math.min(Qe,(fe.start+fe.count)*Ee)),be!==null?(Te=Math.max(Te,0),Qe=Math.min(Qe,be.count)):ke!=null&&(Te=Math.max(Te,0),Qe=Math.min(Qe,ke.count));const _t=Qe-Te;if(_t<0||_t===1/0)return;re.setup(O,k,he,G,be);let dt,et=Ne;if(be!==null&&(dt=$.get(be),et=qe,et.setIndex(dt)),O.isMesh)k.wireframe===!0?(ce.setLineWidth(k.wireframeLinewidth*Vt()),et.setMode(L.LINES)):et.setMode(L.TRIANGLES);else if(O.isLine){let Dt=k.linewidth;Dt===void 0&&(Dt=1),ce.setLineWidth(Dt*Vt()),O.isLineSegments?et.setMode(L.LINES):O.isLineLoop?et.setMode(L.LINE_LOOP):et.setMode(L.LINE_STRIP)}else O.isPoints?et.setMode(L.POINTS):O.isSprite&&et.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))et.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Dt=O._multiDrawStarts,xe=O._multiDrawCounts,Wt=O._multiDrawCount,Xe=be?$.get(be).bytesPerElement:1,$t=M.get(k).currentProgram.getUniforms();for(let pn=0;pn<Wt;pn++)$t.setValue(L,"_gl_DrawID",pn),et.render(Dt[pn]/Xe,xe[pn])}else if(O.isInstancedMesh)et.renderInstances(Te,_t,O.count);else if(G.isInstancedBufferGeometry){const Dt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xe=Math.min(G.instanceCount,Dt);et.renderInstances(Te,_t,xe)}else et.render(Te,_t)};function fn(v,D,G){v.transparent===!0&&v.side===kn&&v.forceSinglePass===!1?(v.side=Ht,v.needsUpdate=!0,Xr(v,D,G),v.side=ai,v.needsUpdate=!0,Xr(v,D,G),v.side=kn):Xr(v,D,G)}this.compile=function(v,D,G=null){G===null&&(G=v),T=pe.get(G),T.init(D),_.push(T),G.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(T.pushLight(O),O.castShadow&&T.pushShadow(O))}),v!==G&&v.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(T.pushLight(O),O.castShadow&&T.pushShadow(O))}),T.setupLights();const k=new Set;return v.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const fe=O.material;if(fe)if(Array.isArray(fe))for(let ve=0;ve<fe.length;ve++){const he=fe[ve];fn(he,G,O),k.add(he)}else fn(fe,G,O),k.add(fe)}),T=_.pop(),k},this.compileAsync=function(v,D,G=null){const k=this.compile(v,D,G);return new Promise(O=>{function fe(){if(k.forEach(function(ve){M.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){O(v);return}setTimeout(fe,10)}ze.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Ws=null;function Ed(v){Ws&&Ws(v)}function el(){hi.stop()}function tl(){hi.start()}const hi=new Zc;hi.setAnimationLoop(Ed),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(v){Ws=v,ae.setAnimationLoop(v),v===null?hi.stop():hi.start()},ae.addEventListener("sessionstart",el),ae.addEventListener("sessionend",tl),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;B!==null&&B.renderStart(v,D);const G=ae.enabled===!0&&ae.isPresenting===!0,k=w!==null&&(I===null||G)&&w.begin(U,I);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(D),D=ae.getCamera()),v.isScene===!0&&v.onBeforeRender(U,v,D,I),T=pe.get(v,_.length),T.init(D),T.state.textureUnits=g.getTextureUnits(),_.push(T),Ze.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ce.setFromProjectionMatrix(Ze,vn,D.reversedDepth),Be=this.localClippingEnabled,ot=_e.init(this.clippingPlanes,Be),C=K.get(v,A.length),C.init(),A.push(C),ae.enabled===!0&&ae.isPresenting===!0){const ve=U.xr.getDepthSensingMesh();ve!==null&&Xs(ve,D,-1/0,U.sortObjects)}Xs(v,D,0,U.sortObjects),C.finish(),U.sortObjects===!0&&C.sort(j,ue),lt=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,lt&&ie.addToRenderList(C,v),this.info.render.frame++,ot===!0&&_e.beginShadows();const O=T.state.shadowsArray;if(se.render(O,v,D),ot===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&w.hasRenderPass())===!1){const ve=C.opaque,he=C.transmissive;if(T.setupLights(),D.isArrayCamera){const be=D.cameras;if(he.length>0)for(let Ee=0,Ue=be.length;Ee<Ue;Ee++){const ke=be[Ee];il(ve,he,v,ke)}lt&&ie.render(v);for(let Ee=0,Ue=be.length;Ee<Ue;Ee++){const ke=be[Ee];nl(C,v,ke,ke.viewport)}}else he.length>0&&il(ve,he,v,D),lt&&ie.render(v),nl(C,v,D)}I!==null&&q===0&&(g.updateMultisampleRenderTarget(I),g.updateRenderTargetMipmap(I)),k&&w.end(U),v.isScene===!0&&v.onAfterRender(U,v,D),re.resetDefaultState(),H=-1,V=null,_.pop(),_.length>0?(T=_[_.length-1],g.setTextureUnits(T.state.textureUnits),ot===!0&&_e.setGlobalState(U.clippingPlanes,T.state.camera)):T=null,A.pop(),A.length>0?C=A[A.length-1]:C=null,B!==null&&B.renderEnd()};function Xs(v,D,G,k){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)G=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLightProbeGrid)T.pushLightProbeGrid(v);else if(v.isLight)T.pushLight(v),v.castShadow&&T.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Ce.intersectsSprite(v)){k&&Oe.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ze);const ve=ne.update(v),he=v.material;he.visible&&C.push(v,ve,he,G,Oe.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Ce.intersectsObject(v))){const ve=ne.update(v),he=v.material;if(k&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Oe.copy(v.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Oe.copy(ve.boundingSphere.center)),Oe.applyMatrix4(v.matrixWorld).applyMatrix4(Ze)),Array.isArray(he)){const be=ve.groups;for(let Ee=0,Ue=be.length;Ee<Ue;Ee++){const ke=be[Ee],Te=he[ke.materialIndex];Te&&Te.visible&&C.push(v,ve,Te,G,Oe.z,ke)}}else he.visible&&C.push(v,ve,he,G,Oe.z,null)}}const fe=v.children;for(let ve=0,he=fe.length;ve<he;ve++)Xs(fe[ve],D,G,k)}function nl(v,D,G,k){const{opaque:O,transmissive:fe,transparent:ve}=v;T.setupLightsView(G),ot===!0&&_e.setGlobalState(U.clippingPlanes,G),k&&ce.viewport(Z.copy(k)),O.length>0&&Wr(O,D,G),fe.length>0&&Wr(fe,D,G),ve.length>0&&Wr(ve,D,G),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function il(v,D,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[k.id]===void 0){const Te=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[k.id]=new Sn(1,1,{generateMipmaps:!0,type:Te?Vn:Yt,minFilter:bi,samples:Math.max(4,it.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace})}const fe=T.state.transmissionRenderTarget[k.id],ve=k.viewport||Z;fe.setSize(ve.z*U.transmissionResolutionScale,ve.w*U.transmissionResolutionScale);const he=U.getRenderTarget(),be=U.getActiveCubeFace(),Ee=U.getActiveMipmapLevel();U.setRenderTarget(fe),U.getClearColor(ge),ye=U.getClearAlpha(),ye<1&&U.setClearColor(16777215,.5),U.clear(),lt&&ie.render(G);const Ue=U.toneMapping;U.toneMapping=bn;const ke=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),T.setupLightsView(k),ot===!0&&_e.setGlobalState(U.clippingPlanes,k),Wr(v,G,k),g.updateMultisampleRenderTarget(fe),g.updateRenderTargetMipmap(fe),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let Qe=0,_t=D.length;Qe<_t;Qe++){const dt=D[Qe],{object:et,geometry:Dt,material:xe,group:Wt}=dt;if(xe.side===kn&&et.layers.test(k.layers)){const Xe=xe.side;xe.side=Ht,xe.needsUpdate=!0,rl(et,G,k,Dt,xe,Wt),xe.side=Xe,xe.needsUpdate=!0,Te=!0}}Te===!0&&(g.updateMultisampleRenderTarget(fe),g.updateRenderTargetMipmap(fe))}U.setRenderTarget(he,be,Ee),U.setClearColor(ge,ye),ke!==void 0&&(k.viewport=ke),U.toneMapping=Ue}function Wr(v,D,G){const k=D.isScene===!0?D.overrideMaterial:null;for(let O=0,fe=v.length;O<fe;O++){const ve=v[O],{object:he,geometry:be,group:Ee}=ve;let Ue=ve.material;Ue.allowOverride===!0&&k!==null&&(Ue=k),he.layers.test(G.layers)&&rl(he,D,G,be,Ue,Ee)}}function rl(v,D,G,k,O,fe){v.onBeforeRender(U,D,G,k,O,fe),v.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),O.onBeforeRender(U,D,G,k,v,fe),O.transparent===!0&&O.side===kn&&O.forceSinglePass===!1?(O.side=Ht,O.needsUpdate=!0,U.renderBufferDirect(G,D,k,O,v,fe),O.side=ai,O.needsUpdate=!0,U.renderBufferDirect(G,D,k,O,v,fe),O.side=kn):U.renderBufferDirect(G,D,k,O,v,fe),v.onAfterRender(U,D,G,k,O,fe)}function Xr(v,D,G){D.isScene!==!0&&(D=Mt);const k=M.get(v),O=T.state.lights,fe=T.state.shadowsArray,ve=O.state.version,he=oe.getParameters(v,O.state,fe,D,G,T.state.lightProbeGridArray),be=oe.getProgramCacheKey(he);let Ee=k.programs;k.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;const Ue=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;k.envMap=F.get(v.envMap||k.environment,Ue),k.envMapRotation=k.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,Ee===void 0&&(v.addEventListener("dispose",xt),Ee=new Map,k.programs=Ee);let ke=Ee.get(be);if(ke!==void 0){if(k.currentProgram===ke&&k.lightsStateVersion===ve)return al(v,he),ke}else he.uniforms=oe.getUniforms(v),B!==null&&v.isNodeMaterial&&B.build(v,G,he),v.onBeforeCompile(he,U),ke=oe.acquireProgram(he,be),Ee.set(be,ke),k.uniforms=he.uniforms;const Te=k.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Te.clippingPlanes=_e.uniform),al(v,he),k.needsLights=Cd(v),k.lightsStateVersion=ve,k.needsLights&&(Te.ambientLightColor.value=O.state.ambient,Te.lightProbe.value=O.state.probe,Te.directionalLights.value=O.state.directional,Te.directionalLightShadows.value=O.state.directionalShadow,Te.spotLights.value=O.state.spot,Te.spotLightShadows.value=O.state.spotShadow,Te.rectAreaLights.value=O.state.rectArea,Te.ltc_1.value=O.state.rectAreaLTC1,Te.ltc_2.value=O.state.rectAreaLTC2,Te.pointLights.value=O.state.point,Te.pointLightShadows.value=O.state.pointShadow,Te.hemisphereLights.value=O.state.hemi,Te.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Te.spotLightMatrix.value=O.state.spotLightMatrix,Te.spotLightMap.value=O.state.spotLightMap,Te.pointShadowMatrix.value=O.state.pointShadowMatrix),k.lightProbeGrid=T.state.lightProbeGridArray.length>0,k.currentProgram=ke,k.uniformsList=null,ke}function sl(v){if(v.uniformsList===null){const D=v.currentProgram.getUniforms();v.uniformsList=_s.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function al(v,D){const G=M.get(v);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.batchingColor=D.batchingColor,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.instancingMorph=D.instancingMorph,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function Td(v,D){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;S.setFromMatrixPosition(D.matrixWorld);for(let G=0,k=v.length;G<k;G++){const O=v[G];if(O.texture!==null&&O.boundingBox.containsPoint(S))return O}return null}function wd(v,D,G,k,O){D.isScene!==!0&&(D=Mt),g.resetTextureUnits();const fe=D.fog,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,he=I===null?U.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ge.workingColorSpace,be=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ee=F.get(k.envMap||ve,be),Ue=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,ke=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Te=!!G.morphAttributes.position,Qe=!!G.morphAttributes.normal,_t=!!G.morphAttributes.color;let dt=bn;k.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(dt=U.toneMapping);const et=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Dt=et!==void 0?et.length:0,xe=M.get(k),Wt=T.state.lights;if(ot===!0&&(Be===!0||v!==V)){const rt=v===V&&k.id===H;_e.setState(k,v,rt)}let Xe=!1;k.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Wt.state.version||xe.outputColorSpace!==he||O.isBatchedMesh&&xe.batching===!1||!O.isBatchedMesh&&xe.batching===!0||O.isBatchedMesh&&xe.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&xe.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&xe.instancing===!1||!O.isInstancedMesh&&xe.instancing===!0||O.isSkinnedMesh&&xe.skinning===!1||!O.isSkinnedMesh&&xe.skinning===!0||O.isInstancedMesh&&xe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&xe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&xe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&xe.instancingMorph===!1&&O.morphTexture!==null||xe.envMap!==Ee||k.fog===!0&&xe.fog!==fe||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==_e.numPlanes||xe.numIntersection!==_e.numIntersection)||xe.vertexAlphas!==Ue||xe.vertexTangents!==ke||xe.morphTargets!==Te||xe.morphNormals!==Qe||xe.morphColors!==_t||xe.toneMapping!==dt||xe.morphTargetsCount!==Dt||!!xe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,xe.__version=k.version);let $t=xe.currentProgram;Xe===!0&&($t=Xr(k,D,O),B&&k.isNodeMaterial&&B.onUpdateProgram(k,$t,xe));let pn=!1,qn=!1,Li=!1;const tt=$t.getUniforms(),vt=xe.uniforms;if(ce.useProgram($t.program)&&(pn=!0,qn=!0,Li=!0),k.id!==H&&(H=k.id,qn=!0),xe.needsLights){const rt=Td(T.state.lightProbeGridArray,O);xe.lightProbeGrid!==rt&&(xe.lightProbeGrid=rt,qn=!0)}if(pn||V!==v){ce.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),tt.setValue(L,"projectionMatrix",v.projectionMatrix),tt.setValue(L,"viewMatrix",v.matrixWorldInverse);const $n=tt.map.cameraPosition;$n!==void 0&&$n.setValue(L,at.setFromMatrixPosition(v.matrixWorld)),it.logarithmicDepthBuffer&&tt.setValue(L,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&tt.setValue(L,"isOrthographic",v.isOrthographicCamera===!0),V!==v&&(V=v,qn=!0,Li=!0)}if(xe.needsLights&&(Wt.state.directionalShadowMap.length>0&&tt.setValue(L,"directionalShadowMap",Wt.state.directionalShadowMap,g),Wt.state.spotShadowMap.length>0&&tt.setValue(L,"spotShadowMap",Wt.state.spotShadowMap,g),Wt.state.pointShadowMap.length>0&&tt.setValue(L,"pointShadowMap",Wt.state.pointShadowMap,g)),O.isSkinnedMesh){tt.setOptional(L,O,"bindMatrix"),tt.setOptional(L,O,"bindMatrixInverse");const rt=O.skeleton;rt&&(rt.boneTexture===null&&rt.computeBoneTexture(),tt.setValue(L,"boneTexture",rt.boneTexture,g))}O.isBatchedMesh&&(tt.setOptional(L,O,"batchingTexture"),tt.setValue(L,"batchingTexture",O._matricesTexture,g),tt.setOptional(L,O,"batchingIdTexture"),tt.setValue(L,"batchingIdTexture",O._indirectTexture,g),tt.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&tt.setValue(L,"batchingColorTexture",O._colorsTexture,g));const Yn=G.morphAttributes;if((Yn.position!==void 0||Yn.normal!==void 0||Yn.color!==void 0)&&Re.update(O,G,$t),(qn||xe.receiveShadow!==O.receiveShadow)&&(xe.receiveShadow=O.receiveShadow,tt.setValue(L,"receiveShadow",O.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(vt.envMapIntensity.value=D.environmentIntensity),vt.dfgLUT!==void 0&&(vt.dfgLUT.value=_0()),qn){if(tt.setValue(L,"toneMappingExposure",U.toneMappingExposure),xe.needsLights&&Ad(vt,Li),fe&&k.fog===!0&&W.refreshFogUniforms(vt,fe),W.refreshMaterialUniforms(vt,k,De,Ke,T.state.transmissionRenderTarget[v.id]),xe.needsLights&&xe.lightProbeGrid){const rt=xe.lightProbeGrid;vt.probesSH.value=rt.texture,vt.probesMin.value.copy(rt.boundingBox.min),vt.probesMax.value.copy(rt.boundingBox.max),vt.probesResolution.value.copy(rt.resolution)}_s.upload(L,sl(xe),vt,g)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(_s.upload(L,sl(xe),vt,g),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&tt.setValue(L,"center",O.center),tt.setValue(L,"modelViewMatrix",O.modelViewMatrix),tt.setValue(L,"normalMatrix",O.normalMatrix),tt.setValue(L,"modelMatrix",O.matrixWorld),k.uniformsGroups!==void 0){const rt=k.uniformsGroups;for(let $n=0,Di=rt.length;$n<Di;$n++){const ol=rt[$n];Y.update(ol,$t),Y.bind(ol,$t)}}return $t}function Ad(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function Cd(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(v,D,G){const k=M.get(v);k.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),M.get(v.texture).__webglTexture=D,M.get(v.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,D){const G=M.get(v);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0};const Rd=L.createFramebuffer();this.setRenderTarget=function(v,D=0,G=0){I=v,X=D,q=G;let k=null,O=!1,fe=!1;if(v){const he=M.get(v);if(he.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(L.FRAMEBUFFER,he.__webglFramebuffer),Z.copy(v.viewport),ee.copy(v.scissor),le=v.scissorTest,ce.viewport(Z),ce.scissor(ee),ce.setScissorTest(le),H=-1;return}else if(he.__webglFramebuffer===void 0)g.setupRenderTarget(v);else if(he.__hasExternalTextures)g.rebindTextures(v,M.get(v.texture).__webglTexture,M.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ue=v.depthTexture;if(he.__boundDepthTexture!==Ue){if(Ue!==null&&M.has(Ue)&&(v.width!==Ue.image.width||v.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");g.setupDepthRenderbuffer(v)}}const be=v.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(fe=!0);const Ee=M.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ee[D])?k=Ee[D][G]:k=Ee[D],O=!0):v.samples>0&&g.useMultisampledRTT(v)===!1?k=M.get(v).__webglMultisampledFramebuffer:Array.isArray(Ee)?k=Ee[G]:k=Ee,Z.copy(v.viewport),ee.copy(v.scissor),le=v.scissorTest}else Z.copy(te).multiplyScalar(De).floor(),ee.copy(we).multiplyScalar(De).floor(),le=Pe;if(G!==0&&(k=Rd),ce.bindFramebuffer(L.FRAMEBUFFER,k)&&ce.drawBuffers(v,k),ce.viewport(Z),ce.scissor(ee),ce.setScissorTest(le),O){const he=M.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,he.__webglTexture,G)}else if(fe){const he=D;for(let be=0;be<v.textures.length;be++){const Ee=M.get(v.textures[be]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+be,Ee.__webglTexture,G,he)}}else if(v!==null&&G!==0){const he=M.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,he.__webglTexture,G)}H=-1},this.readRenderTargetPixels=function(v,D,G,k,O,fe,ve,he=0){if(!(v&&v.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=M.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(be=be[ve]),be){ce.bindFramebuffer(L.FRAMEBUFFER,be);try{const Ee=v.textures[he],Ue=Ee.format,ke=Ee.type;if(v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+he),!it.textureFormatReadable(Ue)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(ke)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-k&&G>=0&&G<=v.height-O&&L.readPixels(D,G,k,O,P.convert(Ue),P.convert(ke),fe)}finally{const Ee=I!==null?M.get(I).__webglFramebuffer:null;ce.bindFramebuffer(L.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(v,D,G,k,O,fe,ve,he=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=M.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(be=be[ve]),be)if(D>=0&&D<=v.width-k&&G>=0&&G<=v.height-O){ce.bindFramebuffer(L.FRAMEBUFFER,be);const Ee=v.textures[he],Ue=Ee.format,ke=Ee.type;if(v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+he),!it.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Te),L.bufferData(L.PIXEL_PACK_BUFFER,fe.byteLength,L.STREAM_READ),L.readPixels(D,G,k,O,P.convert(Ue),P.convert(ke),0);const Qe=I!==null?M.get(I).__webglFramebuffer:null;ce.bindFramebuffer(L.FRAMEBUFFER,Qe);const _t=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await xu(L,_t,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Te),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,fe),L.deleteBuffer(Te),L.deleteSync(_t),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,D=null,G=0){const k=Math.pow(2,-G),O=Math.floor(v.image.width*k),fe=Math.floor(v.image.height*k),ve=D!==null?D.x:0,he=D!==null?D.y:0;g.setTexture2D(v,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,ve,he,O,fe),ce.unbindTexture()};const Pd=L.createFramebuffer(),Ld=L.createFramebuffer();this.copyTextureToTexture=function(v,D,G=null,k=null,O=0,fe=0){let ve,he,be,Ee,Ue,ke,Te,Qe,_t;const dt=v.isCompressedTexture?v.mipmaps[fe]:v.image;if(G!==null)ve=G.max.x-G.min.x,he=G.max.y-G.min.y,be=G.isBox3?G.max.z-G.min.z:1,Ee=G.min.x,Ue=G.min.y,ke=G.isBox3?G.min.z:0;else{const vt=Math.pow(2,-O);ve=Math.floor(dt.width*vt),he=Math.floor(dt.height*vt),v.isDataArrayTexture?be=dt.depth:v.isData3DTexture?be=Math.floor(dt.depth*vt):be=1,Ee=0,Ue=0,ke=0}k!==null?(Te=k.x,Qe=k.y,_t=k.z):(Te=0,Qe=0,_t=0);const et=P.convert(D.format),Dt=P.convert(D.type);let xe;D.isData3DTexture?(g.setTexture3D(D,0),xe=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(g.setTexture2DArray(D,0),xe=L.TEXTURE_2D_ARRAY):(g.setTexture2D(D,0),xe=L.TEXTURE_2D),ce.activeTexture(L.TEXTURE0),ce.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),ce.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),ce.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const Wt=ce.getParameter(L.UNPACK_ROW_LENGTH),Xe=ce.getParameter(L.UNPACK_IMAGE_HEIGHT),$t=ce.getParameter(L.UNPACK_SKIP_PIXELS),pn=ce.getParameter(L.UNPACK_SKIP_ROWS),qn=ce.getParameter(L.UNPACK_SKIP_IMAGES);ce.pixelStorei(L.UNPACK_ROW_LENGTH,dt.width),ce.pixelStorei(L.UNPACK_IMAGE_HEIGHT,dt.height),ce.pixelStorei(L.UNPACK_SKIP_PIXELS,Ee),ce.pixelStorei(L.UNPACK_SKIP_ROWS,Ue),ce.pixelStorei(L.UNPACK_SKIP_IMAGES,ke);const Li=v.isDataArrayTexture||v.isData3DTexture,tt=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){const vt=M.get(v),Yn=M.get(D),rt=M.get(vt.__renderTarget),$n=M.get(Yn.__renderTarget);ce.bindFramebuffer(L.READ_FRAMEBUFFER,rt.__webglFramebuffer),ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Di=0;Di<be;Di++)Li&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,M.get(v).__webglTexture,O,ke+Di),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,M.get(D).__webglTexture,fe,_t+Di)),L.blitFramebuffer(Ee,Ue,ve,he,Te,Qe,ve,he,L.DEPTH_BUFFER_BIT,L.NEAREST);ce.bindFramebuffer(L.READ_FRAMEBUFFER,null),ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||v.isRenderTargetTexture||M.has(v)){const vt=M.get(v),Yn=M.get(D);ce.bindFramebuffer(L.READ_FRAMEBUFFER,Pd),ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ld);for(let rt=0;rt<be;rt++)Li?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.__webglTexture,O,ke+rt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,vt.__webglTexture,O),tt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Yn.__webglTexture,fe,_t+rt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Yn.__webglTexture,fe),O!==0?L.blitFramebuffer(Ee,Ue,ve,he,Te,Qe,ve,he,L.COLOR_BUFFER_BIT,L.NEAREST):tt?L.copyTexSubImage3D(xe,fe,Te,Qe,_t+rt,Ee,Ue,ve,he):L.copyTexSubImage2D(xe,fe,Te,Qe,Ee,Ue,ve,he);ce.bindFramebuffer(L.READ_FRAMEBUFFER,null),ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else tt?v.isDataTexture||v.isData3DTexture?L.texSubImage3D(xe,fe,Te,Qe,_t,ve,he,be,et,Dt,dt.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(xe,fe,Te,Qe,_t,ve,he,be,et,dt.data):L.texSubImage3D(xe,fe,Te,Qe,_t,ve,he,be,et,Dt,dt):v.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,fe,Te,Qe,ve,he,et,Dt,dt.data):v.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,fe,Te,Qe,dt.width,dt.height,et,dt.data):L.texSubImage2D(L.TEXTURE_2D,fe,Te,Qe,ve,he,et,Dt,dt);ce.pixelStorei(L.UNPACK_ROW_LENGTH,Wt),ce.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Xe),ce.pixelStorei(L.UNPACK_SKIP_PIXELS,$t),ce.pixelStorei(L.UNPACK_SKIP_ROWS,pn),ce.pixelStorei(L.UNPACK_SKIP_IMAGES,qn),fe===0&&D.generateMipmaps&&L.generateMipmap(xe),ce.unbindTexture()},this.initRenderTarget=function(v){M.get(v).__webglFramebuffer===void 0&&g.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?g.setTextureCube(v,0):v.isData3DTexture?g.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?g.setTexture2DArray(v,0):g.setTexture2D(v,0),ce.unbindTexture()},this.resetState=function(){X=0,q=0,I=null,ce.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}}class y0{constructor(e){this.textureLoader=e,this.cache=new Map}async loadTexture(e){return this.cache.has(e)?this.cache.get(e):new Promise((t,n)=>{this.textureLoader.load(e,r=>{this.cache.set(e,r),t(r)},void 0,r=>n(r))})}async loadShelfResources(e){var n,r;console.log(`Caricamento risorse per la mensola: ${(r=(n=e[0])==null?void 0:n.userData)==null?void 0:r.category}`);const t=e.map(async s=>{if(s.userData.coverPath)try{const a=await this.loadTexture(`/${s.userData.coverPath}`);s.material[4].map=a,s.material[4].needsUpdate=!0}catch{console.warn("Impossibile caricare copertina per:",s.userData.title)}});return Promise.all(t)}}const b0=`
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
`;let hc=!1;function S0(){if(hc)return;const i=document.createElement("style");i.textContent=b0,document.head.appendChild(i),hc=!0}const M0=i=>new Promise(e=>setTimeout(e,i));function E0(i){return i.replace(/\.(epub|pdf)$/i,"").replace(/[_-]+/g," ").trim()}function fc(i,e=45,t=.45){for(let n=0;n<12;n++){const r=document.createElement("div");r.className="ks-spark";const s=Math.PI*2*n/12,a=e+Math.random()*e*.55;r.style.setProperty("--dx",`${Math.cos(s)*a}px`),r.style.setProperty("--dy",`${Math.sin(s)*a}px`),r.style.animationDelay=`${t+Math.random()*.15}s`,i.appendChild(r),setTimeout(()=>r.remove(),1600)}}class T0{constructor(e,t){this.tray=e,this.state="queued",this.el=document.createElement("div"),this.el.className="ks-item queued",this.el.innerHTML=`
            <div class="ks-book">
                <div class="ks-face ks-front">
                    <div class="ks-fill"></div>
                    <img class="ks-cover-img" alt="">
                    <div class="ks-cover-text"><b></b><span></span></div>
                    <div class="ks-icon">${KS_ICON(t.name.toLowerCase().endsWith(".pdf")?"file":"book",26)}</div>
                    <div class="ks-shine"></div>
                </div>
                <div class="ks-face ks-back"></div>
                <div class="ks-spine"></div>
                <div class="ks-pages"></div>
                <div class="ks-badge"></div>
            </div>
            <div class="ks-item-label"></div>
            <div class="ks-item-status"></div>`,this.book=this.el.querySelector(".ks-book"),this.fill=this.el.querySelector(".ks-fill"),this.badge=this.el.querySelector(".ks-badge"),this.label=this.el.querySelector(".ks-item-label"),this.status=this.el.querySelector(".ks-item-status"),this.label.textContent=E0(t.name),this.label.title=t.name,this.setStatus("queued",N("uploadQueued"))}setStatus(e,t){this.el.classList.remove(this.state),this.state=e,this.el.classList.add(e),this.status.textContent=t}sending(e){this.state!=="sending"&&(this.setStatus("sending",N("uploadSending")),this.el.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})),this.fill.style.height=`${Math.round(Math.min(1,e)*100)}%`}processing(){this.setStatus("processing",N("uploadAnalyzing"))}ready(e){e!=null&&e.id&&(this.el.dataset.bookId=e.id);const t=(e==null?void 0:e.title)||this.label.textContent;if(this.label.textContent=t,this.label.title=t,e!=null&&e.coverPath){const n=this.el.querySelector(".ks-cover-img");n.onload=()=>n.classList.add("loaded"),n.onerror=()=>this.showTextCover(t,e.author),n.src=`/${e.coverPath}`}else this.showTextCover(t,e==null?void 0:e.author);this.badge.innerHTML=KS_ICON("check",14),this.setStatus("ready",N("uploadReady")),fc(this.book)}showTextCover(e,t){const n=this.el.querySelector(".ks-cover-text");n.querySelector("b").textContent=e,n.querySelector("span").textContent=t||"",n.classList.add("show")}launch(){const e=this.el.getBoundingClientRect(),t=this.book.offsetWidth,n=this.book.offsetHeight,r={x:e.x+this.book.offsetLeft,y:e.y+this.book.offsetTop,width:t,height:n},s=document.createElement("div");s.className="ks-flyer";const a=this.book.cloneNode(!0);a.querySelectorAll(".ks-spark").forEach(c=>c.remove()),s.appendChild(a),document.body.appendChild(s),this.el.classList.add("landed");const o=(c,u,h,d,p)=>{s.style.transform=`translate(${c}px, ${u}px) scale(${h/t}, ${d/n})`,s.style.setProperty("--rot",p.toFixed(2))};return o(r.x,r.y,t,n,-28),{startRect:r,place:o,land:(c,{instant:u=!1}={})=>{if(u){s.remove();return}if(c){const h=document.createElement("div");h.className="ks-land-glow",Object.assign(h.style,{left:`${c.x}px`,top:`${c.y}px`,width:`${c.width}px`,height:`${c.height}px`}),document.body.appendChild(h),fc(h,Math.max(60,c.width*.45),0),setTimeout(()=>h.remove(),1400)}s.classList.add("gone"),setTimeout(()=>s.remove(),320)}}}landed(){this.el.classList.add("landed")}duplicate(){this.badge.textContent="=",this.setStatus("duplicate",N("uploadDuplicate"))}error(e){this.badge.textContent="!",this.setStatus("error",N("uploadError")),e&&(this.el.title=e)}}class w0{constructor(){S0(),this.items=[],this.el=document.createElement("div"),this.el.className="ks-tray glass-effect",this.el.innerHTML=`
            <div class="ks-tray-head">
                <span class="ks-tray-title"></span>
                <span class="ks-tray-summary"></span>
                <button class="ks-tray-skip" type="button"></button>
                <button class="ks-tray-close" aria-label="Close">&times;</button>
            </div>
            <div class="ks-tray-bar"><div></div></div>
            <div class="ks-shelf"></div>`,this.title=this.el.querySelector(".ks-tray-title"),this.summary=this.el.querySelector(".ks-tray-summary"),this.bar=this.el.querySelector(".ks-tray-bar > div"),this.shelf=this.el.querySelector(".ks-shelf"),this.closed=new Promise(e=>{this.resolveClosed=e}),this.el.querySelector(".ks-tray-close").addEventListener("click",()=>this.close()),this.skipBtn=this.el.querySelector(".ks-tray-skip"),this.skipBtn.innerHTML=KS_ICON("skip",12)+" "+N("uploadSkip"),this.skipHandlers=[],this.skipBtn.addEventListener("click",()=>{this.el.classList.add("skipped"),this.skipHandlers.forEach(e=>e())}),document.body.appendChild(this.el),requestAnimationFrame(()=>requestAnimationFrame(()=>this.el.classList.add("open")))}onSkip(e){this.skipHandlers.push(e)}add(e){const t=new T0(this,e);return this.items.push(t),this.shelf.appendChild(t.el),this.el.classList.toggle("multi",this.items.length>1),t.el.style.animationDelay=`${Math.min(this.items.length,8)*.06}s`,this.progress(0),t}progress(e){const t=this.items.length;this.title.textContent=N("uploadTrayTitle").replace("{done}",e).replace("{total}",t),this.bar.style.width=`${t?e/t*100:0}%`}async finish({added:e,duplicates:t,errors:n}){const r=[`${KS_ICON("check",13)} ${e}`];return t&&r.push(`${KS_ICON("alert",13)} ${t}`),n&&r.push(`${KS_ICON("x",13)} ${n}`),this.summary.innerHTML=r.join("  ·  "),this.title.textContent=N("uploadComplete"),this.el.classList.add("done"),await M0(1300),t||n?setTimeout(()=>this.close(),7e3):this.close(),this.closed}close(){this.closing||(this.closing=!0,this.el.classList.add("leaving"),setTimeout(()=>{this.el.remove(),this.resolveClosed()},550))}}function A0(i,{offline:e=!1}={},t=()=>{}){return new Promise((n,r)=>{const s=new XMLHttpRequest,a=new FormData;e&&a.append("offline","1"),a.append("ebook",i),s.open("POST","/api/upload"),s.responseType="json",s.upload.onprogress=o=>{o.lengthComputable&&t(o.loaded/o.total)},s.upload.onload=()=>t(1,!0),s.onload=()=>n(s.response||{success:!1}),s.onerror=()=>r(new Error("network")),s.send(a)})}const C0=`
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
`;let pc=!1;function R0(){if(pc)return;const i=document.createElement("style");i.textContent=C0,document.head.appendChild(i),pc=!0}function wa({icon:i="",title:e="",message:t="",confirmText:n="OK",cancelText:r="Annulla",danger:s=!1}={}){return R0(),new Promise(a=>{const o=document.createElement("div");o.className="ks-dialog-backdrop",o.id="ks-confirm",o.innerHTML=`
            <div class="ks-dialog glass-effect" role="alertdialog" aria-modal="true">
                <div class="ks-dialog-icon"></div>
                <h2 class="ks-dialog-title"></h2>
                <p class="ks-dialog-message"></p>
                <div class="ks-dialog-actions">
                    <button class="glass-effect modern-btn" data-action="cancel"></button>
                    <button class="glass-effect modern-btn ${s?"danger":""}" data-action="confirm"></button>
                </div>
            </div>`,o.querySelector(".ks-dialog-icon").innerHTML=i,o.querySelector(".ks-dialog-title").textContent=e,o.querySelector(".ks-dialog-message").textContent=t;const l=o.querySelector("[data-action=cancel]"),c=o.querySelector("[data-action=confirm]");l.textContent=r,c.textContent=n;const u=d=>{document.removeEventListener("keydown",h,!0),o.classList.remove("open"),setTimeout(()=>o.remove(),250),a(d)},h=d=>{d.key==="Escape"&&(d.preventDefault(),d.stopPropagation(),u(!1))};l.addEventListener("click",()=>u(!1)),c.addEventListener("click",()=>u(!0)),o.addEventListener("click",d=>{d.target===o&&u(!1)}),document.addEventListener("keydown",h,!0),document.body.appendChild(o),requestAnimationFrame(()=>o.classList.add("open")),l.focus()})}const P0=220,L0=1250,mc=.85,D0=1.35;function I0(i,{capture:e,onCaptured:t}={}){return new Promise(n=>{const r=window.innerWidth,s=window.innerHeight,a=window.devicePixelRatio||1,o=Math.max(0,Math.round(i.x)),l=Math.max(0,Math.round(i.y)),c=Math.max(1,Math.min(r-o,Math.round(i.width))),u=Math.max(1,Math.min(s-l,Math.round(i.height))),h=document.createElement("canvas");h.width=c,h.height=u;const d=e(),p=d.width/r;h.getContext("2d").drawImage(d,o*p,l*p,c*p,u*p,0,0,c,u);const x=document.createElement("canvas");x.id="ks-dissolve-canvas",Object.assign(x.style,{position:"fixed",inset:"0",width:"100vw",height:"100vh",zIndex:"1500",pointerEvents:"none"}),x.width=Math.round(r*a),x.height=Math.round(s*a),document.body.appendChild(x);const b=x.getContext("2d");b.scale(a,a),b.drawImage(h,o,l),t&&t();const m=Math.max(4,Math.round(Math.min(c,u)/42)),f=[];for(let S=0;S<u;S+=m)for(let C=0;C<c;C+=m){const T=C/c,A=S/u;f.push({sx:C,sy:S,w:Math.min(m,c-C),h:Math.min(m,u-S),delay:((1-T)*.82+A*.18+(Math.random()-.5)*.16)*L0,life:mc+Math.random()*(D0-mc),vx:40+Math.random()*70,vy:-(20+Math.random()*60),ax:160+Math.random()*180,ay:-(40+Math.random()*90),spin:(Math.random()-.5)*9,wobble:Math.random()*Math.PI*2})}const y=performance.now(),E=S=>{const C=S-y-P0;b.clearRect(0,0,r,s);let T=0;for(const A of f){const _=(C-A.delay)/1e3;if(_<0){b.drawImage(h,A.sx,A.sy,A.w,A.h,o+A.sx,l+A.sy,A.w,A.h),T++;continue}const w=_/A.life;if(w>=1)continue;T++;const U=o+A.sx+A.vx*_+.5*A.ax*_*_,R=l+A.sy+A.vy*_+.5*A.ay*_*_+Math.sin(A.wobble+_*7)*6*_,B=1-.7*w;b.save(),b.globalAlpha=Math.pow(1-w,1.3),b.translate(U+A.w/2,R+A.h/2),b.rotate(A.spin*_),b.scale(B,B),b.drawImage(h,A.sx,A.sy,A.w,A.h,-A.w/2,-A.h/2,A.w,A.h),b.globalCompositeOperation="source-atop",b.fillStyle=`rgba(190, 178, 160, ${Math.min(.85,w*1.4)})`,b.fillRect(-A.w/2,-A.h/2,A.w,A.h),b.restore()}if(T>0||C<0)return requestAnimationFrame(E);x.remove(),n()};requestAnimationFrame(E)})}function U0(){const i=document.createElement("div");i.id="help-modal-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100vw",i.style.height="100vh",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="2000",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.backdropFilter="blur(5px)",i.style.opacity="0",i.style.transition="opacity 0.3s ease";const e=document.createElement("div");e.className="glass-effect help-modal-content",e.style.background="rgba(30, 30, 30, 0.85)",e.style.padding="35px",e.style.borderRadius="20px",e.style.maxWidth="700px",e.style.width="90%",e.style.maxHeight="80vh",e.style.overflowY="auto",e.style.color="white",e.style.border="1px solid rgba(255,255,255,0.2)",e.style.boxShadow="0 20px 45px rgba(0,0,0,0.6)",e.innerHTML=`
        <h2 style="margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; text-align: center; font-family: sans-serif;">
            ${N("helpTitle")}
        </h2>
        <ul style="line-height: 1.8; padding-left: 20px; font-family: sans-serif; font-size: 14.5px;">
            ${N("helpContent")}
        </ul>
        <button id="close-help-btn" class="modern-btn glass-effect" style="width: 100%; margin-top: 25px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);">
            ${N("helpClose")}
        </button>
    `,window.__KORESHELF_DESKTOP__&&e.querySelectorAll("li").forEach(r=>{r.querySelector('b[style*="d9534f"]')&&r.remove()});const t=document.createElement("style");t.innerHTML=`
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
    `,document.head.appendChild(t),i.appendChild(e),document.body.appendChild(i),setTimeout(()=>i.style.opacity="1",10);const n=()=>{i.style.opacity="0",setTimeout(()=>{i.remove(),t.remove()},300)};document.getElementById("close-help-btn").onclick=n,i.onclick=r=>{r.target===i&&n()}}async function N0(i,e){const t=document.body.style.overflow;document.body.style.overflow="hidden";const n=document.createElement("div");n.id="metadata-manager-overlay",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100vh",n.style.background="rgba(0,0,0,0.7)",n.style.zIndex="2000",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.backdropFilter="blur(5px)",n.style.opacity="0",n.style.transition="opacity 0.3s ease";let r=[];try{const h=await(await fetch("/api/books")).json();r=[...new Set(h.map(d=>d.tags&&d.tags.length>0?d.tags[0]:N("uncategorized")))].filter(d=>d!==N("uncategorized")&&d!=="Senza Categoria")}catch(u){console.error("Errore nel caricamento delle categorie",u)}const s=document.createElement("div");s.className="glass-effect custom-scrollbar",s.style.background="rgba(30, 30, 30, 0.85)",s.style.padding="30px",s.style.borderRadius="20px",s.style.maxWidth="500px",s.style.width="90%",s.style.maxHeight="90vh",s.style.overflowY="auto",s.style.color="white",s.style.border="1px solid rgba(255,255,255,0.2)";const a=i.category||N("uncategorized");s.innerHTML=`
        <h2 style="margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; font-family: sans-serif;">
            ${N("editMetadataTitle")||"Modifica Metadati"}
        </h2>
        
        <form id="metadata-form" style="display: flex; flex-direction: column; gap: 15px; font-family: sans-serif;">
            
            <div>
                <label style="font-size: 14px; color: #ccc;">${N("editTitle")||"Titolo"}</label>
                <input type="text" id="meta-title" value="${i.title||""}" required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${N("editAuthor")||"Autore"}</label>
                <input type="text" id="meta-author" value="${i.author||""}" required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; box-sizing: border-box;">
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc;">${N("editCategory")||"Categoria"}</label>
                
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
                <label style="font-size: 14px; color: #ccc;">${N("editDescription")||"Descrizione"}</label>
                <textarea id="meta-desc" rows="4" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: white; margin-top: 5px; resize: vertical; box-sizing: border-box;">${i.description||""}</textarea>
            </div>

            <div>
                <label style="font-size: 14px; color: #ccc; display: block; margin-bottom: 5px;">${N("editCover")||"Nuova Copertina (Opzionale)"}</label>
                <input type="file" id="meta-cover" accept="image/png, image/jpeg, image/webp" style="display: none;">
                <label for="meta-cover" id="meta-cover-preview" style="display: block; width: 100%; padding: 12px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.4); background: rgba(0,0,0,0.3); color: #aaa; text-align: center; cursor: pointer; box-sizing: border-box; transition: all 0.3s; font-size: 13px;">
                    ${N("clickToChooseFile")||"Clicca per scegliere un file…"}
                </label>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button type="button" id="meta-cancel-btn" class="modern-btn glass-effect" style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); box-sizing: border-box;">${N("cancelBtn")||"Annulla"}</button>
                <button type="submit" id="meta-save-btn" class="modern-btn glass-effect" style="flex: 1; background: rgba(100, 200, 100, 0.3); border: 1px solid rgba(100, 200, 100, 0.5); box-sizing: border-box;">${N("saveBtn")||"Salva"}</button>
            </div>
        </form>
    `,n.appendChild(s),document.body.appendChild(n);const o=document.getElementById("meta-cover"),l=document.getElementById("meta-cover-preview");l.onmouseover=()=>l.style.background="rgba(255,255,255,0.1)",l.onmouseout=()=>l.style.background="rgba(0,0,0,0.3)",o.addEventListener("change",u=>{if(u.target.files&&u.target.files.length>0){const h=u.target.files[0].name;l.innerHTML=`${KS_ICON("image",16)} ${h}`,l.style.border="1px solid rgba(100, 200, 100, 0.5)",l.style.color="#fff",l.style.background="rgba(100, 200, 100, 0.1)"}else l.innerHTML=N("clickToChooseFile")||"Clicca per scegliere un file…",l.style.border="1px dashed rgba(255,255,255,0.4)",l.style.color="#aaa",l.style.background="rgba(0,0,0,0.3)"}),n.addEventListener("wheel",u=>{s.contains(u.target)||u.preventDefault(),u.stopPropagation()},{passive:!1}),n.addEventListener("touchmove",u=>{s.contains(u.target)||u.preventDefault(),u.stopPropagation()},{passive:!1}),requestAnimationFrame(()=>{n.style.opacity="1"});const c=()=>{n.style.opacity="0",document.body.style.overflow=t,setTimeout(()=>n.remove(),300)};document.getElementById("meta-cancel-btn").onclick=c,n.addEventListener("click",u=>{u.target===n&&c()}),document.getElementById("metadata-form").onsubmit=async u=>{u.preventDefault();const h=document.getElementById("meta-save-btn");h.innerText=N("savingBtn")||"…",h.disabled=!0;const d=new FormData;d.append("id",i.id),d.append("title",document.getElementById("meta-title").value),d.append("author",document.getElementById("meta-author").value),d.append("category",document.getElementById("meta-category").value),d.append("description",document.getElementById("meta-desc").value);const p=document.getElementById("meta-cover").files[0];p&&d.append("cover",p);try{const b=await(await fetch("/api/books/edit",{method:"POST",body:d})).json();b.success?(c(),e&&e(b.updatedBook),window.dispatchEvent(new CustomEvent("bookMetadataUpdated",{detail:b.updatedBook}))):(alert(`${N("errorSaving")||"Errore durante il salvataggio:"} ${b.message}`),h.innerText=N("saveBtn")||"Salva",h.disabled=!1)}catch(x){console.error("Errore di rete:",x),h.innerText=N("errorGeneric")||"Errore!"}}}function gc(i){i&&fetch("/api/open-external",{method:"POST",headers:{"Content-Type":"application/json","X-KoreShelf":"1"},body:JSON.stringify({url:String(i)})}).catch(e=>console.warn("Link esterno non aperto:",e))}window.__KORESHELF_MOBILE__&&(window.open=i=>(gc(i),null),document.addEventListener("click",i=>{const e=i.target.closest&&i.target.closest('a[target="_blank"]');e&&e.href&&(i.preventDefault(),gc(e.href))},!0));window.t=N;function F0(){const i=document.getElementById("close-reader-btn"),e=document.getElementById("theme-toggle-btn"),t=localStorage.getItem("KoreShelf_lang")||"it";if(typeof ft<"u"&&(ft.innerHTML='<span class="btn-icon">'+KS_ICON("power",16)+'</span><span class="btn-text">'+N("shutdownBtn")+"</span>",ft.title=N("shutdownTooltip")),i&&(i.innerHTML=`&times; ${N("closeReader")}`),e){const n=localStorage.getItem("readerDarkMode")==="true";e.innerText=n?t==="it"?"Modalità Chiara":"Light Mode":t==="it"?"Modalità Scura":"Dark Mode"}document.title=t==="it"?"KoreShelf - Libreria 3D":"KoreShelf - 3D Library",typeof zt<"u"&&(zt.innerHTML='<span class="btn-icon">'+KS_ICON("folder",16)+'</span><span class="btn-text">'+N("manageShelf")+"</span>",zt.title=N("manageShelfTooltip")),typeof Ft<"u"&&(Ft.placeholder=N("searchPlaceholder")),typeof yn<"u"&&(yn.innerHTML='<span class="btn-icon">'+KS_ICON("upload",16)+'</span><span class="btn-text">'+N("uploadBtn")+"</span>"),typeof Pt<"u"&&(Pt.innerHTML=Gt?'<span class="btn-icon">'+KS_ICON("book",16)+'</span><span class="btn-text">'+N("showCover")+"</span>":'<span class="btn-icon">'+KS_ICON("eye",16)+'</span><span class="btn-text">'+N("showSynopsis")+"</span>"),typeof ci<"u"&&(ci.innerHTML='<span class="btn-icon">'+KS_ICON("tag",16)+'</span><span class="btn-text">'+N("assignCategory")+"</span>"),typeof en<"u"&&(en.innerHTML='<span class="btn-icon">'+KS_ICON("trash",16)+'</span><span class="btn-text">'+N("deleteBook")+"</span>"),typeof Ai<"u"&&(Ai.innerHTML='<span class="btn-icon">'+KS_ICON("pencil",16)+'</span><span class="btn-text">'+(N("editMetadata")||"Modifica")+"</span>"),typeof Ci<"u"&&(Ci.innerHTML=fd()),typeof nt<"u"&&(nt.innerHTML='<span class="btn-icon">'+KS_ICON("heart",16)+'</span><span class="btn-text">'+N("donateBtn")+"</span>"),typeof Qt<"u"&&(dd(),Yo())}const dn=new $u;dn.background=new Ye("#2c3e50");const ut=new Zt(75,window.innerWidth/window.innerHeight,.1,1e3);ut.position.set(0,1.5,3.5);const un=new v0({antialias:!0});un.setSize(window.innerWidth,window.innerHeight,!1);un.domElement.id="ks-scene";un.domElement.style.cssText="position: fixed; inset: 0; width: 100%; height: 100%; display: block;";un.shadowMap.enabled=!0;un.shadowMap.type=Ar;document.body.appendChild(un.domElement);const k0=new vh(16777215,.5);dn.add(k0);const Cn=new _h(16777215,.8);Cn.position.set(5,10,7.5);Cn.castShadow=!0;Cn.shadow.mapSize.width=1024;Cn.shadow.mapSize.height=1024;Cn.shadow.camera.left=-10;Cn.shadow.camera.right=10;Cn.shadow.camera.top=10;Cn.shadow.camera.bottom=-10;dn.add(Cn);let zo=new mh;const sd=new li(50,.2,4),Us=zo.load("/wood.jpg");Us.wrapS=Pr;Us.wrapT=Pr;Us.repeat.set(12,1);const Ho=new ri({map:Us,roughness:.85,color:"#aaaaaa"}),Go=new Bt(sd,Ho);Go.position.set(0,-1.6,-.5);Go.receiveShadow=!0;dn.add(Go);const O0=new y0(zo),or=new ji;dn.add(or);const Aa=new ri({color:16119260}),ad="#1a1a1a",B0=new ri({color:ad});let Se=[],st=0,Gt=!1,Ns=1.5;function er(){const i=Math.min(window.screen.width,window.screen.height)<700;return window.matchMedia("(max-width: 700px)").matches||!!window.__KORESHELF_MOBILE__&&i}let tr={z:3.5,dx:0,dy:0};function Vo(){var m;const i=window.innerWidth,e=window.innerHeight;if(document.documentElement.classList.toggle("ks-phone",er()),document.documentElement.classList.toggle("ks-landscape",er()&&i>e),typeof _c=="function"&&_c(),!er()){tr={z:3.5,dx:0,dy:0};return}const t=(((m=document.querySelector(".top-bar"))==null?void 0:m.getBoundingClientRect().bottom)||70)+12,n=document.getElementById("ks-book-panel"),r=n&&getComputedStyle(n).display!=="none"?n.getBoundingClientRect():null,s=r&&r.width>0&&r.height>0?r:null,a=i>e,o={left:12,right:a&&s?s.left-12:i-12,top:t,bottom:!a&&s?s.top-12:e-12},l=Math.max(60,o.right-o.left),c=Math.max(60,o.bottom-o.top),u=a?Math.min(c*.82,l*.8*1.5):Math.min(.81*i,c*.85,l*.8*1.5),h=Math.tan(Fn.degToRad(ut.fov/2)),d=3*e/(2*h*u),p=e/(2*d*h),x=(o.left+o.right)/2-i/2,b=(o.top+o.bottom)/2-e/2;tr={z:.5+d,dx:-x/p,dy:b/p}}let Bn=!1;const od=document.createElement("style");od.innerHTML=`
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
`;document.head.appendChild(od);const hn=document.createElement("div");hn.className="top-bar";hn.style.width="95%";hn.style.maxWidth="1100px";document.body.appendChild(hn);const ii=document.createElement("div");ii.className="glass-effect tb-btn";ii.style.display="none";hn.appendChild(ii);const zt=document.createElement("button");zt.innerHTML=N("manageShelf");zt.title=N("manageShelfTooltip");zt.className="glass-effect modern-btn tb-btn";zt.style.display="none";hn.appendChild(zt);const Ft=document.createElement("input");Ft.type="text";Ft.placeholder=N("searchPlaceholder");Ft.className="glass-effect modern-input";hn.appendChild(Ft);const yn=document.createElement("label");yn.innerText=N("uploadBtn");yn.className="glass-effect modern-btn tb-btn";yn.htmlFor="file-upload";hn.appendChild(yn);const wn=document.createElement("input");wn.type="file";wn.id="file-upload";wn.accept=".epub, .pdf";wn.multiple=!0;hn.appendChild(wn);const ft=document.createElement("button");ft.innerHTML=KS_ICON("power",16)+" "+N("shutdownBtn");ft.id="shutdown-btn";ft.className="glass-effect modern-btn tb-btn";ft.title=N("shutdownTooltip");ft.style.background="rgba(217, 83, 79, 0.15)";ft.style.borderColor="rgba(217, 83, 79, 0.4)";ft.style.color="#ff9999";ft.onmouseover=()=>{ft.style.background="rgba(217, 83, 79, 0.3)",ft.style.borderColor="rgba(217, 83, 79, 0.6)",ft.style.transform="translateY(-3px)",ft.style.boxShadow="0 8px 15px rgba(217, 83, 79, 0.2)"};ft.onmouseout=()=>{ft.style.background="rgba(217, 83, 79, 0.15)",ft.style.borderColor="rgba(217, 83, 79, 0.4)",ft.style.transform="translateY(0px)",ft.style.boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"};ft.onclick=async()=>{if(confirm(N("shutdownConfirm")))try{await fetch("/api/shutdown",{method:"POST"}),document.body.innerHTML=`
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #2c3e50; color: white; font-family: 'Segoe UI', system-ui, sans-serif; margin: 0;">
                    <h1 style="font-size: 2.5rem; margin-bottom: 15px; color: #d4af37;">${N("shutdownTitle")}</h1>
                    <p style="color: #a0aec0; font-size: 1.2rem;">${N("shutdownMessage")}</p>
                </div>
            `}catch(e){console.error("Errore durante lo spegnimento:",e)}};window.__KORESHELF_DESKTOP__||hn.appendChild(ft);const pr=document.createElement("button");pr.id="ks-search-toggle";pr.className="ks-round-btn";pr.innerHTML=KS_ICON("search",18);const mr=document.createElement("button");mr.id="ks-add-btn";mr.className="ks-round-btn";mr.innerHTML=KS_ICON("plus",18);mr.addEventListener("click",()=>wn.click());const vs=localStorage.getItem("KoreShelf_lang")||"it",Mo={it:{icon:KS_ICON("globe",16),text:"IT"},en:{icon:KS_ICON("globe",16),text:"EN"},es:{icon:KS_ICON("globe",16),text:"ES"},fr:{icon:KS_ICON("globe",16),text:"FR"},de:{icon:KS_ICON("globe",16),text:"DE"}},Hr=document.createElement("div");Hr.style.position="relative";Hr.style.display="inline-block";const Gr=document.createElement("button"),xc=Mo[vs]||Mo.it;Gr.innerHTML=`<span class="btn-icon">${xc.icon}</span><span class="btn-text">${xc.text}</span>`;Gr.className="glass-effect modern-btn tb-btn";Gr.title="Cambia lingua / Change language";const Lt=document.createElement("div");Lt.className="glass-effect";Lt.style.position="absolute";Lt.style.top="calc(100% + 10px)";Lt.style.right="0";Lt.style.display="none";Lt.style.flexDirection="column";Lt.style.borderRadius="12px";Lt.style.overflow="hidden";Lt.style.zIndex="2000";Lt.style.minWidth="120px";Lt.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)";Object.entries(Mo).forEach(([i,e])=>{const t=document.createElement("button");t.innerHTML=`<span style="margin-right: 8px;">${e.icon}</span>${e.text}`,t.style.padding="12px 20px",t.style.background="transparent",t.style.border="none",t.style.color="white",t.style.textAlign="left",t.style.cursor="pointer",t.style.transition="background 0.2s",t.style.fontSize="14px",t.style.width="100%",t.style.display="flex",t.style.alignItems="center",i===vs&&(t.style.background="rgba(255, 255, 255, 0.15)",t.style.fontWeight="bold"),t.onmouseover=()=>{i!==vs&&(t.style.background="rgba(255, 255, 255, 0.1)")},t.onmouseout=()=>{i!==vs&&(t.style.background="transparent")},t.dataset.lang=i,t.onclick=async()=>{localStorage.setItem("KoreShelf_lang",i);try{await fetch("/api/sync-language",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lang:i})})}catch{}window.location.reload()},Lt.appendChild(t)});Hr.appendChild(Gr);Hr.appendChild(Lt);hn.appendChild(Hr);Gr.onclick=i=>{i.stopPropagation(),Lt.style.display=Lt.style.display==="none"?"flex":"none"};window.addEventListener("click",()=>{Lt.style.display==="flex"&&(Lt.style.display="none")});const ld={cover:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h3"/></svg>',shelves:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20h18"/><path d="M3 12h18"/><path d="M6 12V5"/><path d="M9 12V6"/><path d="M13 12l2-6"/><path d="M6 20v-5"/><path d="M10 20v-6"/><path d="M14 20v-4"/></svg>',read:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg>',resume:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',book:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg>'},cd=document.createElement("style");cd.textContent=`
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
`;document.head.appendChild(cd);const Qt=document.createElement("div");Qt.id="empty-library-hint";function dd(){const i=[["cover","slotCover"],["shelves","slotShelves"],["read","slotRead"],["resume","slotResume"]].map(([e,t])=>`<div class="ks-slot-wrap"><p class="ks-slot-caption">${N(t)}</p><div class="ks-slot">${ld[e]}</div></div>`).join("");Qt.innerHTML=`
        <div><h1>${N("emptyTitle")}</h1><p class="ks-empty-sub">${N("emptySubtitle")}</p></div>
        <div class="ks-dropzone" id="ks-dropzone">
            <div class="ks-slots">${i}</div>
            <div class="ks-plank"></div>
            <div class="ks-empty-actions">
                <button class="ks-primary-btn" id="ks-choose-files">${N("chooseFiles")}</button>
                <button class="ks-secondary-btn" id="ks-sample-book">${N("sampleBook")}</button>
            </div>
        </div>
        <p class="ks-privacy">${N("privacyNote")}</p>`,Qt.querySelector("#ks-choose-files").addEventListener("click",e=>{e.stopPropagation(),wn.click()}),Qt.querySelector("#ks-sample-book").addEventListener("click",e=>{e.stopPropagation(),z0()}),Qt.querySelector("#ks-dropzone").addEventListener("click",()=>wn.click())}dd();document.body.appendChild(Qt);async function z0(){const i=localStorage.getItem("KoreShelf_lang")==="it"?"it":"en";try{const e=await(await fetch(`/sample/koreshelf-${i}.epub`)).blob(),t=i==="it"?"Benvenuto in KoreShelf.epub":"Welcome to KoreShelf.epub";await $o([new File([e],t,{type:"application/epub+zip"})],{offline:!0})}catch(e){console.error("Libro di esempio non disponibile:",e)}}async function ud(i){if(i)try{const t=await(await fetch(`/api/store/amazon-link?title=${encodeURIComponent(i)}`)).json();t.success&&window.open(t.url,"_blank")}catch(e){console.error("Errore ricerca Amazon:",e)}}const nt=document.createElement("a");nt.id="donate-btn";nt.href="https://paypal.me/GabrieleTrovato1?locale.x=en_US&country.x=IT";nt.target="_blank";nt.className="glass-effect modern-btn";nt.style.textDecoration="none";nt.style.position="relative";nt.style.zIndex="1000";nt.style.padding="12px 15px";nt.style.fontWeight="bold";nt.style.whiteSpace="nowrap";nt.style.background="rgba(0, 112, 186, 0.15)";nt.style.borderColor="rgba(0, 112, 186, 0.4)";nt.style.color="#66b3ff";nt.onmouseover=()=>{nt.style.background="rgba(0, 112, 186, 0.3)",nt.style.borderColor="rgba(0, 112, 186, 0.6)"};nt.onmouseout=()=>{nt.style.background="rgba(0, 112, 186, 0.15)",nt.style.borderColor="rgba(0, 112, 186, 0.4)"};document.body.appendChild(nt);const an=document.getElementById("help-btn");an&&(an.style.position="static",an.style.margin="0",an.style.transform="none",an.style.top="auto",an.style.bottom="auto",an.style.left="auto",an.style.right="auto",an.onclick=()=>{U0()});const gt=document.createElement("div");gt.style.position="absolute";gt.style.bottom="42px";gt.style.left="0";gt.style.width="100%";gt.style.display="flex";gt.style.justifyContent="space-between";gt.style.alignItems="center";gt.style.padding="0 30px";gt.style.boxSizing="border-box";gt.style.pointerEvents="none";document.body.appendChild(gt);const Fs=document.createElement("div");Fs.style.display="flex";Fs.style.pointerEvents="auto";gt.appendChild(Fs);Fs.appendChild(nt);const tn=document.createElement("div");tn.style.display="flex";tn.style.gap="15px";tn.style.alignItems="center";tn.style.pointerEvents="auto";gt.appendChild(tn);const ks=document.createElement("div");ks.style.display="flex";ks.style.pointerEvents="auto";gt.appendChild(ks);an&&ks.appendChild(an);pr.addEventListener("click",()=>{document.querySelector(".top-bar").classList.add("ks-search-open"),Ft.focus()});Ft.addEventListener("blur",()=>{setTimeout(()=>{Ft.value.trim()||document.querySelector(".top-bar").classList.remove("ks-search-open")},150)});document.querySelector(".top-bar").append(pr,mr);tn.id="ks-book-panel";tn.style.flexDirection="column";tn.style.gap="12px";const Wo=document.createElement("div");Wo.id="ks-key-hints";tn.appendChild(Wo);const Xo=document.createElement("p");Xo.id="ks-position";tn.appendChild(Xo);const Ei=document.createElement("div");Ei.id="ks-active-book";Ei.innerHTML='<p class="ks-book-title"></p><div class="ks-progress"><div class="ks-bar"><div></div></div><span class="ks-pct"></span></div>';tn.appendChild(Ei);const gr=document.createElement("div");gr.className="ks-actions";tn.appendChild(gr);const Vr=document.createElement("button");Vr.id="ks-read-btn";Vr.className="ks-primary-btn";Vr.addEventListener("click",()=>bd());gr.appendChild(Vr);const Pt=document.createElement("button");Pt.id="ks-info-btn";Pt.innerText=N("showSynopsis");Pt.className="glass-effect modern-btn";gr.appendChild(Pt);const lr=document.createElement("div");lr.className="ks-more";const cn=document.createElement("button");cn.id="ks-more-btn";cn.className="glass-effect modern-btn";cn.setAttribute("aria-haspopup","menu");const Rn=document.createElement("div");Rn.id="ks-more-menu";Rn.setAttribute("role","menu");lr.append(cn,Rn);gr.appendChild(lr);const ci=document.createElement("button");ci.className="ks-menu-item";ci.dataset.action="assign";const Ai=document.createElement("button");Ai.className="ks-menu-item";Ai.dataset.action="edit";const en=document.createElement("button");en.className="ks-menu-item danger";en.dataset.action="delete";[ci,Ai,en].forEach(i=>{i.setAttribute("role","menuitem"),Rn.appendChild(i)});const hd=document.createElement("div");hd.className="ks-menu-sep ks-phone-only";const Os=document.createElement("button");Os.className="ks-menu-item ks-phone-only";Os.addEventListener("click",()=>zt.click());const Bs=document.createElement("button");Bs.className="ks-menu-item ks-phone-only";const zs=document.createElement("div");zs.id="ks-lang-list";Bs.addEventListener("click",i=>{i.stopPropagation(),zs.classList.toggle("open")});["it","en","es","fr","de"].forEach(i=>{const e=document.createElement("button");e.textContent=i.toUpperCase(),e.addEventListener("click",()=>{var t;return(t=document.querySelector(`[data-lang="${i}"]`))==null?void 0:t.click()}),zs.appendChild(e)});Rn.append(hd,Os,Bs,zs);const Fr=document.createElement("div");Fr.id="ks-mobile-actions";const qo=document.createElement("button");qo.addEventListener("click",()=>Pt.click());const Hs=document.createElement("button");Hs.id="ks-mobile-category";Hs.addEventListener("click",()=>ci.click());Fr.append(qo,Hs);gr.appendChild(Fr);function _c(){er()?cn.parentElement!==Fr&&Fr.appendChild(cn):cn.parentElement!==lr&&lr.insertBefore(cn,Rn)}const Gs=i=>{Rn.classList.toggle("open",i),cn.setAttribute("aria-expanded",i?"true":"false")};cn.addEventListener("click",i=>{i.stopPropagation(),Gs(!Rn.classList.contains("open"))});Rn.addEventListener("click",()=>setTimeout(()=>Gs(!1),0));document.addEventListener("click",i=>{lr.contains(i.target)||Gs(!1)});document.addEventListener("keydown",i=>{i.key==="Escape"&&Rn.classList.contains("open")&&Gs(!1)});function Yo(){cn.textContent=er()?N("moreActions")||"Altro":(N("moreActions")||"Altro")+" ▾",qo.textContent=Gt?N("hideSynopsisShort")||"Copertina":N("synopsisShort")||"Trama",Hs.textContent=N("categoryShort")||"Categoria",Os.textContent=N("manageShelves")||"Gestisci scaffali",Bs.textContent=(N("languageMenu")||"Lingua")+" · "+(localStorage.getItem("KoreShelf_lang")||"it").toUpperCase(),pr.setAttribute("aria-label",N("searchBtn")||"Cerca"),mr.setAttribute("aria-label",N("addBooks")||"Aggiungi libri"),ci.innerHTML=N("assignCategory"),Ai.innerHTML=N("editMetadata"),en.disabled||(en.innerHTML=N("deleteBook")),Wo.innerHTML=`
        <span><span class="ks-key">←</span><span class="ks-key">→</span> ${N("keyBrowse")}</span>
        <span><span class="ks-key">↑</span><span class="ks-key">↓</span> ${N("keyShelf")}</span>
        <span>${N("keyDrop")}</span>`;const i=Se[st];if(!i)return;const e=i.userData,t=Se.filter(s=>s.userData.category===e.category);Xo.textContent=(N("positionOf")||"{n} di {m}").replace("{n}",t.indexOf(i)+1).replace("{m}",t.length)+(t.length>1?" · "+(N("swipeToBrowse")||"scorri per sfogliare"):"");const n=Ei.querySelector(".ks-book-title");if(n.textContent=e.title||"",e.author){const s=document.createElement("span");s.textContent=er()?e.author:` · ${e.author}`,n.appendChild(s)}const r=Math.round(Math.max(0,Math.min(1,Number(e.progress)||0))*100);Ei.querySelector(".ks-progress").style.display=r>0?"flex":"none",Ei.querySelector(".ks-bar > div").style.width=`${r}%`,Ei.querySelector(".ks-pct").textContent=(N("percentRead")||"{n}%").replace("{n}",r),Vr.innerHTML=`${ld.book}<span>${r>0&&r<100?N("continueReading"):N("startReading")}</span>`}Ai.onclick=()=>{if(Se.length===0)return;const i=Se[st];N0(i.userData,e=>{console.log("Metadati salvati! Aggiornamento 3D in corso...",e);const t=i.userData.category,n=e.tags&&e.tags.length>0?e.tags[0]:N("uncategorized");if(t!==n){Or();return}i.userData={...i.userData,...e};const r=md(e.title,e.author);if(i.material[1].map=r,i.material[1].needsUpdate=!0,e.coverPath)zo.load(`/${e.coverPath}`,a=>{a.generateMipmaps=!1,a.minFilter=pt,a.magFilter=pt,i.material[4].map=a,i.material[4].color.setHex(16777215),i.material[4].needsUpdate=!0});else{const a=xd(e.title,e.author);i.material[4].map=a,i.material[4].needsUpdate=!0}const s=i.children.find(a=>a.name==="backCover_mesh");if(s){s.userData={...s.userData,...e};const a=gd(e.description,e.tags,e.rating);s.material.map=a,s.material.needsUpdate=!0}})};function fd(){return`${N("credits").replace("{mit}",'<a href="https://github.com/GabrieleTrovato01/KoreShelf/blob/main/LICENSE" target="_blank">MIT</a>')} <a href="https://github.com/GabrieleTrovato01" target="_blank">GabrieleTrovato01</a>`}const Ci=document.createElement("div");Ci.id="credits-footer";Ci.innerHTML=fd();document.body.appendChild(Ci);ci.onclick=()=>{if(Se.length===0)return;const i=Se[st],e=[...new Set(Se.map(u=>u.userData.category))].filter(u=>u!==N("uncategorized")),t=document.createElement("div");t.id="assign-category-overlay",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100vw",t.style.height="100vh",t.style.backgroundColor="rgba(0,0,0,0.6)",t.style.zIndex="2000",t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.backdropFilter="blur(5px)",document.body.appendChild(t);const n=document.createElement("div");n.className="glass-effect",n.style.padding="30px",n.style.borderRadius="20px",n.style.width="90%",n.style.maxWidth="400px",n.style.textAlign="center",t.appendChild(n);const r=document.createElement("h3");r.innerText=`${N("moveBookTitle")} "${i.userData.title}"`,r.style.margin="0 0 15px 0",n.appendChild(r);const s=document.createElement("div");s.style.display="flex",s.style.gap="10px",s.style.marginBottom="20px";const a=document.createElement("input");a.type="text",a.placeholder=N("categoryPrompt"),a.className="glass-effect modern-input",a.style.flexGrow="1";const o=document.createElement("button");if(o.innerText=N("saveBtn"),o.className="glass-effect modern-btn",o.style.padding="10px 20px",s.appendChild(a),s.appendChild(o),n.appendChild(s),e.length>0){const u=document.createElement("div");u.innerText=N("existingCategoriesSubtitle"),u.style.fontSize="12px",u.style.opacity="0.7",u.style.marginBottom="10px",n.appendChild(u);const h=document.createElement("div");h.style.display="flex",h.style.flexWrap="wrap",h.style.gap="8px",h.style.justifyContent="center",e.forEach(d=>{const p=document.createElement("button");p.innerText=d,p.className="glass-effect",p.style.padding="8px 15px",p.style.borderRadius="50px",p.style.fontSize="12px",p.style.cursor="pointer",p.onmouseover=()=>p.style.background="rgba(255,255,255,0.2)",p.onmouseout=()=>p.style.background="rgba(255,255,255,0.08)",p.onclick=()=>c(d),h.appendChild(p)}),n.appendChild(h)}const l=document.createElement("button");l.innerText=N("cancelBtn"),l.className="glass-effect modern-btn",l.style.marginTop="20px",l.style.padding="8px 20px",l.style.fontSize="11px",l.style.background="rgba(255, 50, 50, 0.1)",l.style.borderColor="rgba(255, 100, 100, 0.3)",l.style.color="#ffb3b3",l.onclick=()=>t.remove(),l.onmouseover=()=>{l.style.background="rgba(255, 50, 50, 0.2)",l.style.transform="translateY(-2px)"},l.onmouseout=()=>{l.style.background="rgba(255, 50, 50, 0.1)",l.style.transform="translateY(0px)"},n.appendChild(l);const c=async u=>{if(!(!u||u.trim()==="")){o.innerText="…",o.disabled=!0;try{const d=await(await fetch(`/api/books/${i.userData.id}/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:u.trim()})})).json();d.success?location.reload():(alert(d.message),o.innerText="Salva",o.disabled=!1)}catch(h){console.error(h),t.remove()}}};o.onclick=()=>c(a.value),a.addEventListener("keypress",u=>{u.key==="Enter"&&c(a.value)}),t.addEventListener("pointerdown",u=>{u.target===t&&t.remove()}),setTimeout(()=>a.focus(),100)};function H0(i){var r;const e=Se.filter(s=>s.userData.category===i.userData.category),t=e.indexOf(i),n=e[t+1]||e[t-1];return n?n.userData.id:((r=Se.find(s=>s!==i))==null?void 0:r.userData.id)??null}const Ca=()=>{en.innerHTML=N("deleteBook"),en.disabled=!1};en.onclick=async()=>{if(Se.length===0||en.disabled)return;const i=Se[st],e=i.userData.title;if(!await wa({icon:KS_ICON("trash",36),title:e,message:N("deleteConfirm").replace("{title}",e),confirmText:(N("deleteBook")||"Elimina").trim(),cancelText:N("cancelBtn")||"Annulla",danger:!0}))return;en.disabled=!0;try{const a=await(await fetch(`/api/books/${i.userData.id}`,{method:"DELETE"})).json();if(!a.success){await wa({icon:KS_ICON("alert",36),title:e,message:a.message||N("serverError"),confirmText:"OK",cancelText:N("cancelBtn")}),Ca();return}}catch(s){console.error(s),await wa({icon:KS_ICON("alert",36),title:e,message:N("serverError"),confirmText:"OK",cancelText:N("cancelBtn")}),Ca();return}const n=H0(i),r=Cs(i);await I0(r,{capture:()=>(un.render(dn,ut),un.domElement),onCaptured:()=>{i.visible=!1}}),await Or({focusBookId:n}),Ca()};zt.onclick=()=>{if(Se.length===0)return;const i=Se[st].userData.category;Fd(i,Se)};const bt=document.createElement("button");bt.innerHTML=KS_ICON("chevronLeft",26);bt.id="ks-arrow-left";bt.className="glass-effect modern-btn";bt.style.position="absolute";bt.style.left="20px";bt.style.top="50%";bt.style.transform="translateY(-50%)";bt.style.fontSize="24px";bt.style.padding="15px 20px";bt.style.borderRadius="50%";document.body.appendChild(bt);const St=document.createElement("button");St.innerHTML=KS_ICON("chevronRight",26);St.id="ks-arrow-right";St.className="glass-effect modern-btn";St.style.position="absolute";St.style.right="20px";St.style.top="50%";St.style.transform="translateY(-50%)";St.style.fontSize="24px";St.style.padding="15px 20px";St.style.borderRadius="50%";document.body.appendChild(St);function di(i){var t,n;if(Se.length===0)return;if(Bn){i===1?(t=window.highlightsBoardModule)==null||t.nextHighlightsPage():i===-1&&((n=window.highlightsBoardModule)==null||n.prevHighlightsPage());return}const e=st+i;e>=0&&e<Se.length&&(st=e,Gt=!1,Pt.innerText=N("showSynopsis"),An())}function cr(i){if(Se.length===0)return;const e=Se[st].userData.category;let t=-1;if(i===1){if(Bn)return;for(let n=st;n<Se.length;n++)if(Se[n].userData.category!==e){t=n;break}if(t===-1&&Se.some(r=>r.userData.highlights&&r.userData.highlights.length>0)){Bn=!0,Ns=Se[Se.length-1].userData.baseShelfY+4.5,zt.style.display="none",gt.style.opacity="0",bt.style.opacity="1",St.style.opacity="1",window.highlightsBoardModule&&window.highlightsBoardModule.updateBoardTitle();return}}else{if(Bn){Bn=!1,gt.style.opacity="1",bt.style.opacity="1",St.style.opacity="1",zt.style.display="block",An();return}let n=st;for(;n>0&&Se[n-1].userData.category===e;)n--;if(n>0){const r=Se[n-1].userData.category;let s=n-1;for(;s>0&&Se[s-1].userData.category===r;)s--;t=s}}t!==-1&&(st=t,Gt=!1,Pt.innerText=N("showSynopsis"),An())}bt.onclick=()=>di(-1);St.onclick=()=>di(1);Pt.onclick=()=>{Gt=!Gt,Pt.innerHTML=Gt?'<span class="btn-icon">'+KS_ICON("book",16)+'</span><span class="btn-text">'+(N("showCover")||"Copertina")+"</span>":'<span class="btn-icon">'+KS_ICON("eye",16)+'</span><span class="btn-text">'+N("showSynopsis")+"</span>",An()};const Jt=document.createElement("div");Jt.className="glass-effect";Object.assign(Jt.style,{position:"fixed",display:"none",zIndex:"1100",padding:"10px 14px",borderRadius:"14px",fontSize:"14px",lineHeight:"1.4",cursor:"pointer",maxWidth:"320px",boxSizing:"border-box"});document.body.appendChild(Jt);Jt.addEventListener("mousedown",i=>i.preventDefault());let kr="";function G0(i){kr=i;const e=Ft.getBoundingClientRect();Jt.style.top=`${e.bottom+8}px`,Jt.style.left=`${e.left}px`,Jt.style.minWidth=`${e.width}px`,Jt.innerHTML="";const t=document.createElement("div");t.style.opacity="0.7",t.textContent=N("searchNoResults");const n=document.createElement("div");n.style.fontWeight="bold",n.innerHTML=KS_ICON("search",15)+" ",n.append(N("amazonSuggestion").replace("{q}",i)),Jt.append(t,n),Jt.style.display="block"}function ui(){Jt.style.display="none",kr=""}Jt.addEventListener("click",()=>{ud(kr),ui()});Ft.addEventListener("blur",ui);window.addEventListener("resize",ui);Ft.addEventListener("keydown",i=>{i.key==="Enter"&&kr?(ud(kr),ui()):i.key==="Escape"&&ui()});let Ra=null;Ft.addEventListener("input",i=>{const e=i.target.value.trim();if(Ra&&clearTimeout(Ra),!e){ui();return}Ra=setTimeout(async()=>{try{const n=await(await fetch(`/api/books/search?q=${encodeURIComponent(e)}`)).json();if(Ft.value.trim()!==e)return;if(n.length>0){ui();const r=n[0].id,s=Se.findIndex(a=>a.userData.id===r);s!==-1&&s!==st&&(st=s,Gt=!1,Bn&&(Bn=!1,gt.style.opacity="1",bt.style.opacity="1",St.style.opacity="1",zt.style.display="block"),typeof Pt<"u"&&(Pt.innerText=N("showSynopsis")),An())}else G0(e)}catch(t){console.error("Errore durante la ricerca backend:",t)}},150)});let Pa=!1,ti=null;async function $o(i,{offline:e=!1}={}){var x;const t=Array.from(i).filter(b=>/\.(epub|pdf)$/i.test(b.name));if(t.length===0||Pa)return;Pa=!0,Ft.disabled=!0,ui(),yn.style.pointerEvents="none",yn.style.opacity="0.6";const n=Qt.style.display!=="none";Qt.style.display="none";const r=new w0,s=t.map(b=>r.add(b));let a=0,o=0,l=0,c=Promise.resolve();const u={requested:!1};ti=u;const h=[];let d=null;r.onSkip(()=>{u.requested=!0;const b=h.splice(0);b.forEach(({item:m,book:f})=>{Zi.delete(f.id),m.landed()}),b.length&&(c=c.then(()=>Or({focusBookId:d})))});for(let b=0;b<t.length;b++){const m=s[b];m.sending(0);try{const f=await A0(t[b],{offline:e},(y,E)=>{E?m.processing():m.sending(y)});if(f.success){a++,(x=f.book)!=null&&x.id&&Zi.add(f.book.id),m.ready(f.book);const y=f.book;y!=null&&y.id&&(d=y.id);const E={item:m,book:y};y&&h.push(E),c=c.then(()=>u.requested?null:new Promise(S=>setTimeout(S,1100))).then(()=>{const S=h.indexOf(E);if(!y)return m.landed();if(S!==-1)return h.splice(S,1),u.requested?(Zi.delete(y.id),m.landed(),Or({focusBookId:y.id})):K0(m,y)}).catch(S=>{console.warn("Animazione di atterraggio:",S),y&&Zi.delete(y.id),m.landed()})}else f.duplicate||f.message&&f.message.includes("già presente")?(o++,m.duplicate()):(l++,m.error(f.message))}catch(f){console.error("Errore di rete con",t[b].name,f),l++,m.error()}r.progress(b+1)}await c,a>0&&Md().catch(b=>console.warn("Errore generazione copertine PDF:",b));const p=r.finish({added:a,duplicates:o,errors:l});a===0&&n&&p.then(()=>{Se.length===0&&(Qt.style.display="flex")}),ti=null,wn.value="",Ft.disabled=!1,yn.style.pointerEvents="",yn.style.opacity="",Pa=!1,await p}wn.addEventListener("change",i=>$o(i.target.files));const Ri=document.createElement("div");Ri.className="glass-effect";Object.assign(Ri.style,{position:"fixed",inset:"18px",zIndex:"1300",display:"none",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"14px",borderRadius:"30px",border:"2px dashed rgba(255,255,255,0.6)",background:"rgba(30,45,59,0.55)",fontSize:"22px",letterSpacing:"1px",pointerEvents:"none"});document.body.appendChild(Ri);let ws=0;const Vs=i=>{var e;return Array.from(((e=i.dataTransfer)==null?void 0:e.types)||[]).includes("Files")},pd=()=>{var i;return((i=document.getElementById("reader-overlay"))==null?void 0:i.style.display)==="block"};window.addEventListener("dragenter",i=>{!Vs(i)||pd()||(i.preventDefault(),++ws===1&&(Ri.innerHTML=`<div>${KS_ICON("books",64)}</div><div>${N("dropFilesHere")}</div>`,Ri.style.display="flex"))});window.addEventListener("dragover",i=>{Vs(i)&&i.preventDefault()});window.addEventListener("dragleave",i=>{Vs(i)&&--ws<=0&&(ws=0,Ri.style.display="none")});window.addEventListener("drop",i=>{Vs(i)&&(i.preventDefault(),ws=0,Ri.style.display="none",pd()||$o(i.dataTransfer.files))});function md(i,e){const t=document.createElement("canvas");t.width=128,t.height=1024;const n=t.getContext("2d");n.fillStyle=ad,n.fillRect(0,0,t.width,t.height),n.textAlign="center",n.textBaseline="middle",n.translate(t.width/2,t.height/2),n.rotate(Math.PI/2);let r=40;const s=t.height-60;for(n.font=`bold ${r}px Arial, sans-serif`;n.measureText(i).width>s&&r>12;)r-=2,n.font=`bold ${r}px Arial, sans-serif`;n.fillStyle="#ffffff",n.fillText(i,0,-15);let a=30;for(n.font=`italic ${a}px Arial, sans-serif`;n.measureText(e).width>s&&a>10;)a-=2,n.font=`italic ${a}px Arial, sans-serif`;return n.fillStyle="#cccccc",n.fillText(e,0,30),new Oo(t)}function gd(i,e,t){const n=document.createElement("canvas");n.width=512,n.height=768;const r=n.getContext("2d");r.fillStyle="#1e1e1e",r.fillRect(0,0,n.width,n.height),r.strokeStyle="#d4af37",r.lineWidth=4,r.strokeRect(15,15,n.width-30,n.height-30);let s=70;e&&e.length>0&&(r.fillStyle="#d4af37",r.font="bold 24px Arial",r.textAlign="center",r.fillText(e[0].toUpperCase(),n.width/2,s),s+=40,r.beginPath(),r.moveTo(100,s-20),r.lineTo(n.width-100,s-20),r.stroke());const a=n.height-120;if(i){r.fillStyle="#ecf0f1",r.font="22px serif",r.textAlign="left";const l=i.replace(/<[^>]*>?/gm,"").split(" ");let c="";const u=n.width-80,h=40,d=32;for(let p=0;p<l.length;p++){const x=c+l[p]+" ";if(r.measureText(x).width>u&&p>0){if(r.fillText(c,h,s),c=l[p]+" ",s+=d,s>a){r.fillText("...",h,s-d+10);break}}else c=x}s<=a&&r.fillText(c,h,s)}if(t&&t>0){r.textAlign="center",r.font="45px Arial";const o=(l,c,u,h)=>{r.beginPath();for(let d=0;d<10;d++){const p=d%2===0?u:u*.45,x=-Math.PI/2+d*Math.PI/5;r[d===0?"moveTo":"lineTo"](l+Math.cos(x)*p,c+Math.sin(x)*p)}r.closePath(),r.lineWidth=3,r.strokeStyle="#d4af37",r.fillStyle="#d4af37",h?r.fill():r.stroke()};for(let l=1;l<=5;l++)o(n.width/2+(l-3)*56,n.height-95,20,l<=t)}return new Oo(n)}function xd(i,e){const t=document.createElement("canvas");t.width=512,t.height=768;const n=t.getContext("2d");n.fillStyle="#1e2d3b",n.fillRect(0,0,t.width,t.height),n.strokeStyle="#d4af37",n.lineWidth=4,n.strokeRect(30,30,t.width-60,t.height-60),n.strokeRect(40,40,t.width-80,t.height-80),n.textAlign="center",n.fillStyle="#f5f5dc",n.font='bold 36px "Times New Roman", Times, serif';const r=i.split(" ");let s="",a=250;const o=380;for(let l=0;l<r.length;l++){let c=s+r[l]+" ";n.measureText(c).width>o&&l>0?(n.fillText(s,t.width/2,a),s=r[l]+" ",a+=45):s=c}return n.fillText(s,t.width/2,a),n.font='italic 28px "Times New Roman", Times, serif',n.fillStyle="#d4af37",n.fillText(e,t.width/2,a+80),n.font="16px Arial, sans-serif",n.fillStyle="rgba(255, 255, 255, 0.3)",n.fillText(N("noCover"),t.width/2,t.height-80),new Oo(t)}async function _d(i=null){try{const t=(i??await(await fetch("/api/books")).json()).filter(f=>!Zi.has(f.id)),n=new Map;t.forEach(f=>{const y=f.tags&&f.tags.length>0?f.tags[0]:N("uncategorized");n.has(y)||n.set(y,[]),n.get(y).push(f)});const r=Array.from(n.keys()).sort((f,y)=>f===N("uncategorized")?-1:y===N("uncategorized")?1:f.localeCompare(y));let s=0,a=0;const o=[];let l=0;const c=new jc;c.setOptions({imageOrientation:"flipY"});const u=f=>new Promise(y=>{c.load(f,E=>{const S=new Tt(E);S.generateMipmaps=!1,S.minFilter=pt,S.magFilter=pt,S.needsUpdate=!0,y(S)},void 0,()=>{console.warn(`${N("textureError")} ${f}`),y(null)})});if(r.forEach(f=>{const y=n.get(f);f===N("uncategorized")&&y.length>0&&(l=a);const E=-1.6+s*4.2,S=new Bt(sd,Ho);S.position.set(0,E,-.5),S.receiveShadow=!0,dn.add(S),console.log(`${N("shelfLog")}`,{name:f,y:E});const C=[];y.forEach((T,A)=>{const R=(T.pageCount||350)*.001,B=new li(2,3,R),X=md(T.title,T.author),q=new ri({map:X,roughness:.7}),I=xd(T.title,T.author),H=new ri({map:I,roughness:.8});let V=[Aa,q,Aa,Aa,H,B0];const Z=new Bt(B,V);Z.castShadow=!0,Z.receiveShadow=!0;const ee=new hr(2,3),le=new ri({map:gd(T.description,T.tags,T.rating),roughness:.8}),ge=new Bt(ee,le);ge.name="backCover_mesh",ge.userData={...T},ge.position.z=-(R/2)-.001,ge.rotation.y=Math.PI,Z.add(ge);const ye=E+1.6;if(Z.userData={...T,index:a,category:f,indexInShelf:A,thickness:R,baseShelfY:ye,targetY:ye},T.progress>0&&T.progress<.99){const j=new li(.3,.6,.05),ue=new ri({color:"#c0392b",roughness:.7,metalness:.1}),te=new Bt(j,ue),we=-.9+.3/2;te.position.set(we,1.5,.04),Z.add(te)}Z.position.y=ye,or.add(Z),Se.push(Z),C.push(Z),a++}),o.push({categoryName:f,meshes:C}),s++}),Se.length>0&&(st=l,bs)){const f=Se.findIndex(y=>y.userData.id===bs);f!==-1&&(st=f)}bs=null,An();const h=Se.length>0?Se[st].userData.category:null,d=o.find(f=>f.categoryName===h),p=o.filter(f=>f.categoryName!==h),x=async f=>{if(!f)return;const y=f.meshes.map(async E=>{if(E.userData.coverPath){const S=await u(`/${E.userData.coverPath}`);S&&(E.material[4].map=S,E.material[4].color.setHex(16777215),E.material[4].needsUpdate=!0)}});await Promise.all(y)},b=async f=>{if(f){for(const y of f.meshes)if(y.userData.coverPath){const E=await u(`/${y.userData.coverPath}`);E&&(y.material[4].map=E,y.material[4].color.setHex(16777215),y.material[4].needsUpdate=!0,await new Promise(S=>requestAnimationFrame(S)))}}};Se.length===0?(Qt.style.display="flex",gt.style.display="none",bt.style.display="none",St.style.display="none"):(Qt.style.display="none",gt.style.display="flex",bt.style.display="block",St.style.display="block");const m=-1.6+(s-1)*4.2;xi(()=>import("./highlights-board-D-3tUrah.js"),[]).then(f=>{window.highlightsBoardModule=f,f.initHighlightsBoard(dn,ut,t,m)}).catch(f=>console.warn("Errore caricamento bacheca:",f)),(async()=>{d&&(await x(d),console.log(`${N("texturesSuccess")}`,{cat:h}));for(const f of p)await b(f);console.log(`${N("allTexturesLoaded")}d`)})()}catch(e){console.error(e)}}function An(){if(Yo(),Vo(),Se.length===0)return;const i=Se[st],e=i.userData.category,n=e==="Senza Categoria"?N("uncategorized"):e.toUpperCase();ii.innerText=`${N("shelfTitlePrefix")}${n}`,ii.style.display="block",zt.style.display="block",ii.innerHTML=KS_ICON("folder",15)+" ",ii.append(n.toUpperCase()),ii.title=n,Ns=i.userData.baseShelfY;const r=Se.filter(h=>h.userData.category===e),s=Se.filter(h=>h.userData.category!==e),a=1.6,o=.08;i.userData.targetX=0,i.userData.targetZ=.5,i.userData.targetRotY=Gt?Math.PI:0;let l=a;for(let h=i.userData.indexInShelf+1;h<r.length;h++){let d=r[h];d.userData.targetX=l+d.userData.thickness/2,d.userData.targetZ=-1.5,d.userData.targetRotY=Math.PI/2,l+=d.userData.thickness+o}let c=-a;for(let h=i.userData.indexInShelf-1;h>=0;h--){let d=r[h];d.userData.targetX=c-d.userData.thickness/2,d.userData.targetZ=-1.5,d.userData.targetRotY=Math.PI/2,c-=d.userData.thickness+o}[...new Set(s.map(h=>h.userData.category))].forEach(h=>{const d=s.filter(b=>b.userData.category===h);let x=-(d.reduce((b,m)=>b+m.userData.thickness+o,0)/2);d.forEach(b=>{b.userData.targetX=x+b.userData.thickness/2,b.userData.targetZ=-1.5,b.userData.targetRotY=Math.PI/2,x+=b.userData.thickness+o})})}window.showFullPlotModal=function(i){const e=document.createElement("div");e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.backgroundColor="rgba(0,0,0,0.8)",e.style.zIndex="2000",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.backdropFilter="blur(8px)",e.onclick=c=>{c.target===e&&e.remove()},document.body.appendChild(e);const t=document.createElement("div");t.className="glass-effect",t.style.padding="40px",t.style.borderRadius="20px",t.style.width="90%",t.style.maxWidth="600px",t.style.maxHeight="80vh",t.style.overflowY="auto",t.style.color="white",t.style.textAlign="left",e.appendChild(t);const n=document.createElement("h2");n.innerText=i.title||"Titolo Sconosciuto",n.style.marginTop="0",n.style.marginBottom="10px",n.style.color="#d4af37",t.appendChild(n);const r=document.createElement("h4");r.innerText=`${N("authorLabel")} ${i.author||"Sconosciuto"}`,r.style.marginTop="0",r.style.marginBottom="30px",r.style.color="#ccc",t.appendChild(r);const s=document.createElement("h3");s.innerText=N("fullPlotTitle"),s.style.borderBottom="1px solid rgba(255,255,255,0.2)",s.style.paddingBottom="10px",t.appendChild(s);const a=document.createElement("p");a.innerHTML=i.description||`<i>${N("noDescription")}</i>`,a.style.lineHeight="1.8",a.style.fontSize="16px",a.style.color="#e0e0e0",t.appendChild(a);const o=document.createElement("div");o.style.textAlign="center",o.style.marginTop="40px";const l=document.createElement("button");l.innerText=N("closeBtn"),l.className="glass-effect modern-btn",l.onclick=()=>e.remove(),o.appendChild(l),t.appendChild(o)};const As=new Sh,nr=new $e;let vd=0,yd=0,vc=0,yc=0,ys=!1;window.addEventListener("pointerdown",i=>{const e=document.getElementById("reader-overlay");e&&e.style.display!=="none"||document.getElementById("category-manager-overlay")||document.getElementById("assign-category-overlay")||i.target.tagName==="BUTTON"||i.target.tagName==="INPUT"||i.target.tagName==="LABEL"||document.getElementById("help-modal-overlay")||document.getElementById("metadata-manager-overlay")||document.getElementById("highlights-manager-overlay")||i.target.closest("button, input, label, a")||i.target===un.domElement&&(vd=i.clientX,yd=i.clientY,ys=!0)});function bd(){if(Se.length===0)return;Gt&&(Gt=!1,An());const i=Se[st];if(i.userData.targetZ=2.8,i.userData.targetRotY=0,!i.userData.hasHinge){const e=new hr(2,3),t=i.material[4],n=new ji;n.position.set(-1,0,i.userData.thickness/2+.002);const r=new Bt(e,t);r.position.set(1,0,0),n.add(r),i.add(n),i.userData.hinge=n,i.userData.hasHinge=!0,i.material[4]=new ri({color:16119260,roughness:.9})}document.querySelector(".top-bar").style.opacity="0",gt.style.opacity="0",bt.style.opacity="0",St.style.opacity="0",Ci.style.opacity="0",nt.style.opacity="0",nt.style.pointerEvents="none",i.userData.hinge.userData={targetRotY:-Math.PI*.85},setTimeout(()=>{const e=i.userData.epubPath;e.toLowerCase().endsWith(".pdf")?(console.log("Apertura PDF"),document.getElementById("viewer").style.display="none",document.getElementById("pdf-container").style.display="flex",window.openPdfReader(e,i.userData.id)):(console.log("Apertura EPUB"),document.getElementById("pdf-container").style.display="none",document.getElementById("viewer").style.display="block",window.openReader(e,i.userData.id))},400)}window.addEventListener("pointerup",i=>{const e=document.getElementById("reader-overlay");if(e&&e.style.display!=="none"||document.getElementById("category-manager-overlay")||document.getElementById("assign-category-overlay")||document.getElementById("help-modal-overlay")||document.getElementById("metadata-manager-overlay")||document.getElementById("highlights-manager-overlay"))return;if(i.target.closest("button, input, label, a")){ys=!1;return}if(!ys)return;ys=!1,vc=i.clientX,yc=i.clientY;const t=vd-vc,n=yd-yc;if(Math.abs(t)>Math.abs(n)&&Math.abs(t)>50)t>0?di(1):di(-1);else if(Math.abs(n)>Math.abs(t)&&Math.abs(n)>50)n>0?cr(-1):cr(1);else if(Math.abs(t)<10&&Math.abs(n)<10){nr.x=i.clientX/window.innerWidth*2-1,nr.y=-(i.clientY/window.innerHeight)*2+1,As.setFromCamera(nr,ut);const r=As.intersectObjects(or.children,!0);if(r.length>0){const s=r[0].object;let a=s;for(;a.parent!==or&&a.parent!==null;)a=a.parent;const o=a.userData.index;if(o!==st){st=o,Gt=!1,typeof Pt<"u"&&Pt&&(Pt.innerText=N("showSynopsis")),An();return}if(s.name==="backCover_mesh"){window.showFullPlotModal(a.userData);return}bd()}}});let Mr=null;window.addEventListener("wheel",i=>{document.getElementById("category-manager-overlay")||document.getElementById("assign-category-overlay")||document.getElementById("help-modal-overlay")||document.getElementById("metadata-manager-overlay")||document.getElementById("highlights-manager-overlay")||Mr||(Math.abs(i.deltaX)>Math.abs(i.deltaY)&&Math.abs(i.deltaX)>20?(i.deltaX>0?di(1):di(-1),Mr=setTimeout(()=>{Mr=null},300)):Math.abs(i.deltaY)>Math.abs(i.deltaX)&&Math.abs(i.deltaY)>20&&(i.deltaY>0?cr(-1):cr(1),Mr=setTimeout(()=>{Mr=null},500)))});window.addEventListener("keydown",i=>{if(document.activeElement.tagName==="INPUT")return;const e=document.getElementById("reader-overlay");if(!(e&&e.style.display==="block")&&!document.getElementById("category-manager-overlay")&&!document.getElementById("assign-category-overlay")&&!document.getElementById("help-modal-overlay")&&!document.getElementById("metadata-manager-overlay")&&!document.getElementById("highlights-manager-overlay")){if(i.key==="ArrowRight")di(1);else if(i.key==="ArrowLeft")di(-1);else if(i.key==="ArrowUp")cr(1);else if(i.key==="ArrowDown")cr(-1);else if((i.key==="Enter"||i.key===" ")&&(i.preventDefault(),Se.length>0))if(!Gt)Pt.click();else{const t=Se[st];t&&t.userData.epubPath&&window.openReader(t.userData.epubPath,t.userData.id)}}});window.addEventListener("pointermove",i=>{nr.x=i.clientX/window.innerWidth*2-1,nr.y=-(i.clientY/window.innerHeight)*2+1,As.setFromCamera(nr,ut);const e=As.intersectObjects(or.children,!0);e.length>0&&e[0].object.name==="backCover_mesh"?document.body.style.cursor="pointer":document.body.style.cursor="auto"});window.addEventListener("readerClosed",()=>{fetch("/api/books").then(e=>e.json()).then(e=>{const t=new Map(e.map(n=>[n.id,n]));Se.forEach(n=>{const r=t.get(n.userData.id);r&&(n.userData.progress=r.progress)}),Yo()}).catch(()=>{}),document.querySelector(".top-bar").style.opacity="1",gt.style.opacity="1",bt.style.opacity="1",St.style.opacity="1",Ci.style.opacity="1",nt.style.opacity="1",nt.style.pointerEvents="auto";const i=Se[st];i&&i.userData.hasHinge&&(i.userData.hinge.userData.targetRotY=0),An()});function Sd(){requestAnimationFrame(Sd),ut.position.x=Fn.lerp(ut.position.x,tr.dx,.08),ut.position.y=Fn.lerp(ut.position.y,Ns+tr.dy,.05),ut.position.z=Fn.lerp(ut.position.z,tr.z,.08),Cn.position.y=ut.position.y+10,Se.forEach(i=>{i.userData.targetX!==void 0&&(i.position.x=Fn.lerp(i.position.x,i.userData.targetX,.1),i.position.y=Fn.lerp(i.position.y,i.userData.targetY,.1),i.position.z=Fn.lerp(i.position.z,i.userData.targetZ,.1),i.rotation.y=Fn.lerp(i.rotation.y,i.userData.targetRotY,.1)),i.userData.hasHinge&&i.userData.hinge.userData.targetRotY!==void 0&&(i.userData.hinge.rotation.y=Fn.lerp(i.userData.hinge.rotation.y,i.userData.hinge.userData.targetRotY,.08))}),un.render(dn,ut)}window.addEventListener("resize",()=>{ut.aspect=window.innerWidth/window.innerHeight,Vo(),ut.updateProjectionMatrix(),un.setSize(window.innerWidth,window.innerHeight,!1)});const V0="https://api.github.com/repos/GabrieleTrovato01/KoreShelf/releases/latest";function bc(i){const e=String(i||"").match(/(\d+)\.(\d+)(?:\.(\d+))?/);return e?[Number(e[1]),Number(e[2]),Number(e[3]||0)]:null}function W0(i,e){const t=bc(i),n=bc(e);if(!t||!n)return!1;for(let r=0;r<3;r++)if(t[r]!==n[r])return t[r]>n[r];return!1}async function X0(){try{const i=(await(await fetch("/api/ping")).json()).version,e=await fetch(V0);if(!e.ok)throw new Error("Network response was not ok");const t=await e.json();W0(t.tag_name,i)&&q0(t.tag_name,t.html_url)}catch(i){console.warn("Controllo aggiornamenti non riuscito:",i)}}async function Md(){if(typeof pdfjsLib>"u"){console.warn(N("logpdfjs"));return}const t=(await(await fetch("/api/books")).json()).filter(n=>n.epubPath&&n.epubPath.toLowerCase().endsWith(".pdf")&&!n.coverPath);if(t.length!==0){console.log(N("logGeneratePdfCovers",{count:t.length})),pdfjsLib.GlobalWorkerOptions.workerSrc||(pdfjsLib.GlobalWorkerOptions.workerSrc="/vendor/pdf.worker.min.js");for(const n of t)try{console.log(N("logGeneratePdfCover",{title:n.title}));const a=await(await pdfjsLib.getDocument(`/${n.epubPath}`).promise).getPage(1),l=512/a.getViewport({scale:1}).width,c=a.getViewport({scale:l}),u=document.createElement("canvas");u.width=c.width,u.height=c.height;const h=u.getContext("2d");await a.render({canvasContext:h,viewport:c}).promise;const d=await new Promise(p=>u.toBlob(p,"image/jpeg",.85));if(d){const p=new FormData;p.append("cover",d,`cover_${n.id}.jpg`);const x=await fetch(`/api/books/${n.id}/cover`,{method:"POST",body:p});if(x.ok){const b=await x.json();console.log(N("logCoverGenerated",{title:n.title}));const m=Se.find(f=>f.userData.id===n.id);if(m){const f=`/${b.coverPath}`,y=await O0.loadTexture(f);m.material[4].map=y,m.material[4].color.setHex(16777215),m.material[4].needsUpdate=!0}}else console.warn(N("logCoverGenerationError",{title:n.title,statusText:x.statusText}))}}catch(r){console.warn(N("logCoverGenerationFailed",{title:n.title,errorMessage:r.message}))}console.log(N("logPdfCoversGenerated"))}}function q0(i,e){if(document.getElementById("lorekeeper-update-banner"))return;const t=document.createElement("div");t.id="lorekeeper-update-banner",Object.assign(t.style,{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",backgroundColor:"rgba(43, 43, 43, 0.85)",backdropFilter:"blur(10px)",webkitBackdropFilter:"blur(10px)",color:"#ffffff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0, 0, 0, 0.3)",zIndex:"9999",display:"flex",alignItems:"center",gap:"20px",fontFamily:"'Segoe UI', system-ui, sans-serif",border:"1px solid rgba(255, 255, 255, 0.2)"});const n=N("updateAvailable").replace("{version}",i),r=N("updateDownload");t.innerHTML=`
        <span style="font-size: 14px; letter-spacing: 0.5px;">${n}</span>
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
    `,document.body.appendChild(t),document.getElementById("close-update-banner").addEventListener("click",()=>{t.style.opacity="0",t.style.transform="translateX(-50%) translateY(-20px)",t.style.transition="all 0.4s ease",setTimeout(()=>t.remove(),400)})}let bs=null;const Zi=new Set;async function Or({focusBookId:i=null}={}){var r;const e=await(await fetch("/api/books")).json(),t=new Map(Se.map(s=>[s.userData.id,{x:s.position.x,y:s.position.y,z:s.position.z,rotY:s.rotation.y,cover:s.material[4]&&s.material[4].map&&!s.material[4].map.isCanvasTexture?s.material[4].map:null}]));bs=i??((r=Se[st])==null?void 0:r.userData.id)??null,or.clear(),Se=[];const n=[];dn.children.forEach(s=>{s.material===Ho&&n.push(s)}),n.forEach(s=>{dn.remove(s),s.geometry&&s.geometry.dispose()}),await _d(e),Se.forEach(s=>{const a=t.get(s.userData.id);a&&(s.position.set(a.x,a.y,a.z),s.rotation.y=a.rotY,a.cover&&s.material[4]&&(s.material[4].map=a.cover,s.material[4].color.setHex(16777215),s.material[4].needsUpdate=!0))})}function Cs(i){i.updateMatrixWorld(!0),ut.updateMatrixWorld(!0);const e=i.userData.thickness/2;let t=1/0,n=1/0,r=-1/0,s=-1/0;for(const[a,o]of[[-1,-1.5],[1,-1.5],[-1,1.5],[1,1.5]]){const l=new z(a,o,e);i.localToWorld(l),l.project(ut);const c=(l.x+1)/2*window.innerWidth,u=(1-l.y)/2*window.innerHeight;t=Math.min(t,c),r=Math.max(r,c),n=Math.min(n,u),s=Math.max(s,u)}return{x:t,y:n,width:r-t,height:s-n}}function Y0(i){return new Promise(e=>{const t=new jc;t.setOptions({imageOrientation:"flipY"}),t.load(i,n=>{const r=new Tt(n);r.generateMipmaps=!1,r.minFilter=pt,r.magFilter=pt,r.needsUpdate=!0,e(r)},void 0,()=>e(null))})}const $0=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,Er=(i,e,t)=>i+(e-i)*t;async function K0(i,e){Zi.delete(e.id),await Or();const t=Se.findIndex(p=>p.userData.id===e.id);if(t===-1){i.landed();return}const n=Se[t],r=e.coverPath?Y0(`/${e.coverPath}`):Promise.resolve(null);n.visible=!1,Bn&&(Bn=!1,gt.style.opacity="1",bt.style.opacity="1",St.style.opacity="1",zt.style.display="block"),st=t,Gt=!1,An(),n.position.set(n.userData.targetX,n.userData.targetY,n.userData.targetZ),n.rotation.y=n.userData.targetRotY;const s=i.launch(),a=s.startRect,o=1900,l=performance.now();let c=null,u=0;await new Promise(p=>{const x=b=>{const m=!!(ti&&ti.requested),f=m?1:Math.min(1,(b-l)/o),y=$0(f),E=Cs(n),S=Math.sin(Math.PI*f)*Math.min(140,window.innerHeight*.18);if(s.place(Er(a.x,E.x,y),Er(a.y,E.y,y)-S,Er(a.width,E.width,y),Er(a.height,E.height,y),Er(-28,-360,y)),f<1)return requestAnimationFrame(x);const C=c?Math.abs(E.x-c.x)+Math.abs(E.y-c.y)+Math.abs(E.height-c.height):1/0;c=E,u=C<.75?u+1:0,m||u>=2||b-l>o+2500?p():requestAnimationFrame(x)};requestAnimationFrame(x)});const h=ti&&ti.requested?0:600,d=await Promise.race([r,new Promise(p=>setTimeout(()=>p(null),h))]);d&&n.material[4]&&(n.material[4].map=d,n.material[4].color.setHex(16777215),n.material[4].needsUpdate=!0),n.visible=!0,s.land(Cs(n),{instant:!!(ti&&ti.requested)}),i.landed()}window.__koreshelf={activeBookId:()=>{var i;return((i=Se[st])==null?void 0:i.userData.id)??null},bookScreenRect:i=>{const e=Se.find(t=>t.userData.id===i);return e?Cs(e):null},isBookVisible:i=>{var e;return!!((e=Se.find(t=>t.userData.id===i))!=null&&e.visible)},visibleBookIds:()=>Se.filter(i=>i.visible).map(i=>i.userData.id),cameraY:()=>ut.position.y,cameraTargetY:()=>Ns,cameraState:()=>({x:ut.position.x,y:ut.position.y,z:ut.position.z,fit:{...tr}}),shelfSize:()=>{const i=Se[st];return i?Se.filter(e=>e.userData.category===i.userData.category).length:0}};async function j0(){const i=document.getElementById("loading-screen"),e=document.getElementById("loading-text"),t=localStorage.getItem("KoreShelf_lang")||"it";try{fetch("/api/sync-language",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lang:t})}).catch(n=>{}),e&&(e.innerText=t==="it"?"Caricamento lingua...":"Loading language..."),await Nd(),F0(),typeof window.translateReaderUI=="function"&&window.translateReaderUI(),e&&(e.innerText=t==="it"?"Allestimento scaffali...":"Setting up shelves..."),await _d(),Md().catch(n=>{console.warn("Errore generazione copertine PDF:",n)}),Sd(),X0(),i&&(i.style.opacity="0",setTimeout(()=>{i.style.display="none"},500))}catch(n){console.error("Errore durante l'avvio dell'app:",n),e&&(e.innerText="Error / Errore")}}Vo();j0();window.addEventListener("onHighlightAdded",i=>{const{bookId:e,highlight:t}=i.detail,n=Se.find(r=>r.userData.id===e);n&&(n.userData.highlights||(n.userData.highlights=[]),n.userData.highlights.push(t),window.highlightsBoardModule&&window.highlightsBoardModule.addHighlightLocally(n.userData))});window.addEventListener("onHighlightRemoved",i=>{const{bookId:e,cfi:t}=i.detail,n=Se.find(r=>r.userData.id===e);n&&n.userData.highlights&&(n.userData.highlights=n.userData.highlights.filter(r=>r.cfi!==t),window.highlightsBoardModule&&window.highlightsBoardModule.removeHighlightLocally(e,t))});export{li as B,Oo as C,ji as G,ri as M,Sh as R,$e as V,Bt as a,N as t};
