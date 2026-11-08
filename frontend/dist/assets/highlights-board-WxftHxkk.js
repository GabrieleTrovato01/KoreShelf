import{G as J,B as R,M as N,a as W,t as d,C as q,V as re,R as le}from"./index-BLYe9Mnq.js";let v=new J,U,m=[],Z=0,w=0;const z=5;let B=null,X=!1;function se(t,o,e,n){if(B={scene:t,camera:o,booksData:e,highestShelfY:n},U=o,Z=n,w=0,t.remove(v),v=new J,m=e.filter(b=>b.highlights&&b.highlights.length>0&&b.highlights[0].text&&b.highlights[0].text.trim()!==""),m.length===0){X=!1;return}X=!0;const h=n+6.5,r=14,a=3.2,c=new R(r,a,.1),f=new N({color:"#7e5c3a",roughness:.9,metalness:0}),p=new W(c,f);p.position.set(0,h,-1.2),p.receiveShadow=!0,p.castShadow=!0,v.add(p);const g=new R(r+.4,.15,.2),s=new N({color:"#4a3319",roughness:.8}),u=new W(g,s);u.position.set(0,h+a/2,-1.15),v.add(u),t.add(v),L()}function ce(){!X&&B&&se(B.scene,B.camera,B.booksData,B.highestShelfY)}function L(){ce();const t=[];v.children.forEach(g=>{g.name==="postit_note"&&t.push(g)}),t.forEach(g=>v.remove(g));const o=w*z,e=Math.min(o+z,m.length),n=m.slice(o,e),h=1.8,r=1.8,a=.4,c=Z+6.5;let p=-(n.length*(h+a)-a)/2+h/2;n.forEach(g=>{const s=new R(h,r,.01),u=ge(g),b=new N({map:u,roughness:.7,metalness:0}),S=new W(s,b);S.position.set(p,c,-1.13),S.name="postit_note",S.userData={bookData:g},S.rotation.z=(Math.random()-.5)*.12,v.add(S),p+=h+a}),de()}function me(){const t=Math.ceil(m.length/z)-1;return w<t?(w++,L(),!0):!1}function ue(){return w>0?(w--,L(),!0):!1}function de(){const t=document.getElementById("category-label");if(t&&m.length>0){const o=Math.ceil(m.length/z),e=d("manageHighlightsTitle")||"BACHECA SOTTOLINEATURE";t.innerText=`${e.toUpperCase()} (${w+1}/${o})`}}function ge(t){if(!t.highlights||t.highlights.length===0||!t.highlights[0].text||t.highlights[0].text.trim()==="")return console.warn("Nessuna sottolineatura valida trovata per il libro:",t.title),new q(document.createElement("canvas"));const o=document.createElement("canvas");o.width=512,o.height=512;const e=o.getContext("2d");e.fillStyle="#fff9ae",e.fillRect(0,0,o.width,o.height),e.fillStyle="rgba(0, 0, 0, 0.04)",e.fillRect(0,0,o.width,25),e.fillStyle="#111111",e.font="bold 30px sans-serif",e.textAlign="center";let n=t.title;n.length>20&&(n=n.substring(0,18)+"..."),e.fillText(n.toUpperCase(),o.width/2,70),e.strokeStyle="rgba(0, 0, 0, 0.1)",e.lineWidth=2,e.beginPath(),e.moveTo(40,95),e.lineTo(472,95),e.stroke();const h=t.highlights[0].text||"";e.fillStyle="#333333",e.font="italic 26px Georgia, serif",e.textAlign="left";const r=h.split(" ");let a="",c=150;const f=432,p=36,g=o.height-80;for(let s=0;s<r.length;s++){let u=a+r[s]+" ";if(e.measureText(u).width>f&&s>0){if(e.fillText(a,40,c),a=r[s]+" ",c+=p,c>g){e.fillText("...",40,c-p);break}}else a=u}if(c<=g&&e.fillText(a,40,c),e.textAlign="center",t.highlights.length>1){e.fillStyle="#d9534f",e.font="bold 24px sans-serif";const s=t.highlights.length-1,u=d("moreHighlightsHint")||`+${s} altre... (Clicca)`;e.fillText(u,o.width/2,o.height-35)}else{e.fillStyle="#777777",e.font="20px sans-serif";const s=d("manageHighlightHint")||"Clicca per gestire";e.fillText(s,o.width/2,o.height-35)}return new q(o)}const V=new le,G=new re;let ee=0,te=0;window.addEventListener("pointerdown",t=>{ee=t.clientX,te=t.clientY});window.addEventListener("pointerup",t=>{var e;if(Math.abs(t.clientX-ee)>10||Math.abs(t.clientY-te)>10||document.getElementById("ks-manager")||document.getElementById("assign-category-overlay")||document.getElementById("metadata-manager-overlay")||document.getElementById("help-modal-overlay")||document.getElementById("highlights-manager-overlay")||document.getElementById("share-preview-overlay")||((e=document.getElementById("reader-overlay"))==null?void 0:e.style.display)==="block"||!U||!v)return;G.x=t.clientX/window.innerWidth*2-1,G.y=-(t.clientY/window.innerHeight)*2+1,V.setFromCamera(G,U);const o=V.intersectObjects(v.children);if(o.length>0){const n=o[0].object;n.name==="postit_note"&&pe(n.userData.bookData)}});function be(t){const o=m.findIndex(e=>e.id===t.id);o!==-1?m[o]=t:m.push(t),L()}function xe(t,o){const e=m.findIndex(n=>n.id===t);e!==-1&&(m[e].highlights=m[e].highlights.filter(n=>n.cfi!==o),m[e].highlights.length===0&&(m.splice(e,1),w>0&&w*5>=m.length&&w--),L())}function pe(t){const o=document.body.style.overflow;document.body.style.overflow="hidden";const e=document.createElement("div");e.id="highlights-manager-overlay",Object.assign(e.style,{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",zIndex:"3000",display:"flex",justifyContent:"center",alignItems:"center",backdropFilter:"blur(6px)",opacity:"0",transition:"opacity 0.3s ease"});const n=document.createElement("div");n.className="glass-effect custom-scrollbar",Object.assign(n.style,{background:"rgba(25, 25, 25, 0.95)",padding:"30px",borderRadius:"20px",width:"560px",maxWidth:"92%",maxHeight:"80vh",overflowY:"auto",color:"white",position:"relative",border:"1px solid rgba(255,255,255,0.15)",boxShadow:"0 20px 45px rgba(0,0,0,0.6)"});let h=[];try{Array.isArray(t.highlights)?h=t.highlights:typeof t.highlights=="string"&&(h=JSON.parse(t.highlights))}catch(a){console.warn("Impossibile leggere le sottolineature",a)}n.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
            <h3 style="margin: 0; font-family: sans-serif; color: #d4af37; font-size: 19px;">${d("manageHighlightsTitle")||"Gestione Sottolineature"}</h3>
            <button id="close-hl-modal" style="background: none; border: none; color: white; font-size: 28px; cursor: pointer; opacity: 0.6;">&times;</button>
        </div>
        <h4 style="margin-top: -5px; margin-bottom: 25px; color: #4da6ff; font-family: sans-serif; font-size: 16px;">${t.title}</h4>
        
        <div id="hl-items-wrapper" style="display: flex; flex-direction: column; gap: 14px;">
            ${h.map((a,c)=>`
                <div id="hl-card-${c}" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 12px; display: flex; flex-direction: column; gap: 12px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-style: italic; line-height: 1.6; color: #e5e5e5; font-size: 14.5px;">"${a.text}"</p>
                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button class="share-specific-hl-btn modern-btn glass-effect" data-cfi="${a.cfi}" style="padding: 6px 14px; font-size: 11px; background: rgba(77, 166, 255, 0.15); border-color: rgba(77, 166, 255, 0.3); color: #4da6ff;">
                            ${KS_ICON("link",15)} ${d("shareQuoteBtn")||"Condividi"}
                        </button>
                        <button class="delete-specific-hl-btn modern-btn glass-effect" data-cfi="${a.cfi}" data-card-id="hl-card-${c}" style="padding: 6px 14px; font-size: 11px; background: rgba(217, 83, 79, 0.15); border-color: rgba(217, 83, 79, 0.3); color: #ff9999;">
                            ${KS_ICON("trash",15)} ${d("deleteBook")||"Elimina"}
                        </button>
                    </div>
                </div>
            `).join("")}
        </div>
    `,e.appendChild(n),document.body.appendChild(e),n.addEventListener("pointerdown",a=>{a.stopPropagation()}),requestAnimationFrame(()=>e.style.opacity="1");const r=()=>{e.style.opacity="0",document.body.style.overflow=o,setTimeout(()=>e.remove(),300)};document.getElementById("close-hl-modal").onclick=r,e.addEventListener("pointerdown",a=>{a.target===e&&(a.stopPropagation(),r())}),n.querySelectorAll(".share-specific-hl-btn").forEach(a=>{a.onclick=async c=>{const f=c.currentTarget,p=f.innerHTML;f.innerHTML="…",f.disabled=!0;const g=f.getAttribute("data-cfi"),s=h.find(u=>u.cfi===g);s&&await he(t,s.text),f.innerHTML=p,f.disabled=!1}}),n.querySelectorAll(".delete-specific-hl-btn").forEach(a=>{a.onclick=async c=>{const f=d("removeHighlightConfirm")||"Vuoi eliminare questa sottolineatura?";if(!confirm(f))return;const p=c.currentTarget.getAttribute("data-cfi"),g=c.currentTarget.getAttribute("data-card-id");try{(await(await fetch(`/api/books/${t.id}/highlights`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({cfi:p})})).json()).success&&(document.getElementById(g).remove(),t.highlights=h.filter(b=>b.cfi!==p),t.highlights.length===0&&(r(),location.reload()))}catch(s){console.error(s)}}})}async function he(t,o){if(!document.getElementById("ks-preview-styles")){const l=document.createElement("style");l.id="ks-preview-styles",l.innerHTML=`
            .ks-preview-container { display: flex; gap: 25px; flex-direction: row; align-items: stretch; }
            @media (max-width: 700px) { .ks-preview-container { flex-direction: column; } }
            
            .ks-preview-btn {
                flex: 1; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.05); 
                border: 1px solid rgba(255,255,255,0.1); color: #aaa; cursor: pointer; transition: 0.2s;
                font-family: sans-serif; font-size: 13px; font-weight: bold;
            }
            .ks-preview-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
            .ks-preview-btn.active {
                background: rgba(77, 166, 255, 0.15); border-color: rgba(77, 166, 255, 0.4); color: #4da6ff;
            }
            
            .ks-color-picker {
                -webkit-appearance: none; -moz-appearance: none; appearance: none;
                width: 44px; height: 44px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
                padding: 0; background: transparent; cursor: pointer; transition: 0.2s;
            }
            .ks-color-picker:hover { transform: scale(1.05); border-color: rgba(255,255,255,0.5); }
            .ks-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
            .ks-color-picker::-webkit-color-swatch { border: none; border-radius: 50%; }
            .ks-color-picker::-moz-color-swatch { border: none; border-radius: 50%; }
        `,document.head.appendChild(l)}const e=document.createElement("div");e.id="share-preview-overlay",Object.assign(e.style,{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.85)",zIndex:"4000",display:"flex",justifyContent:"center",alignItems:"center",backdropFilter:"blur(10px)",opacity:"0",transition:"opacity 0.3s ease"});const n=document.createElement("div");n.className="glass-effect custom-scrollbar",Object.assign(n.style,{background:"rgba(25, 25, 25, 0.95)",padding:"25px",borderRadius:"20px",width:"800px",maxWidth:"95%",maxHeight:"95vh",overflowY:"auto",textAlign:"center",border:"1px solid rgba(255,255,255,0.15)",boxShadow:"0 20px 45px rgba(0,0,0,0.6)",position:"relative"}),n.innerHTML=`
        <div class="ks-preview-container">
            <!-- Colonna Sinistra: Immagine -->
            <div style="flex: 1.2; display: flex; justify-content: center; align-items: center; background: #080808; border-radius: 12px; overflow: hidden; box-shadow: inset 0 0 15px rgba(0,0,0,0.8); padding: 15px; min-height: 400px;">
                <img id="preview-image" src="" style="max-height: 500px; max-width: 100%; object-fit: contain; border-radius: 6px;">
            </div>
            
            <!-- Colonna Destra: Controlli -->
            <div style="flex: 1; display: flex; flex-direction: column; text-align: left; justify-content: center; padding: 10px 0;">
                <h3 style="margin-top: 0; margin-bottom: 25px; color: #fff; font-family: sans-serif;">${d("previewTitle")||"Personalizza"}</h3>
                
                <label style="font-size: 12px; color: #aaa; margin-bottom: 8px;">${d("previewFormat")||"Formato"}</label>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button id="btn-fmt-post" class="ks-preview-btn active">${d("formatPost")||"Post Quadrato"}</button>
                    <button id="btn-fmt-story" class="ks-preview-btn">${d("formatStory")||"Storia (9:16)"}</button>
                </div>

                <label style="font-size: 12px; color: #aaa; margin-bottom: 8px;">${d("previewBgStyle")||"Stile Sfondo"}</label>
                <div style="display: flex; gap: 10px; margin-bottom: 30px;">
                    <button id="btn-bg-blur" class="ks-preview-btn active">${d("bgStyleBlur")||"Copertina Sfocata"}</button>
                    <button id="btn-bg-solid" class="ks-preview-btn">${d("bgStyleSolid")||"Tinta Unita"}</button>
                </div>

                <div style="display: flex; gap: 40px; margin-bottom: 35px; justify-content: center;">
                    <div id="wrap-bg-color" style="display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.3; transition: 0.2s;">
                        <label style="font-size: 12px; color: #aaa;">${d("previewBgColor")||"Sfondo"}</label>
                        <input type="color" id="export-bg-color" class="ks-color-picker" value="#1c2833" disabled>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                        <label style="font-size: 12px; color: #aaa;">${d("previewTextColor")||"Testo"}</label>
                        <input type="color" id="export-text-color" class="ks-color-picker" value="#ffffff">
                    </div>
                </div>

                <div style="display: flex; gap: 10px; margin-bottom: 10px; margin-top: auto;">
                    <button id="dl-img-btn" class="modern-btn glass-effect" style="flex: 1; padding: 12px; background: rgba(77, 166, 255, 0.15); border: 1px solid rgba(77, 166, 255, 0.4); color: #4da6ff; font-weight: bold; cursor: pointer;">
                        ${KS_ICON("download",15)} ${d("downloadBtn")||"Scarica"}
                    </button>
                    <button id="sh-img-btn" class="modern-btn glass-effect" style="flex: 1; padding: 12px; background: rgba(46, 204, 113, 0.15); border: 1px solid rgba(46, 204, 113, 0.4); color: #2ecc71; font-weight: bold; cursor: pointer;">
                        ${KS_ICON("link",15)} ${d("shareQuoteBtn")||"Condividi"}
                    </button>
                </div>
                
                <button id="close-preview-btn" style="background: none; border: none; color: #888; cursor: pointer; font-size: 14px; padding: 10px; margin-top: 5px;">
                    ${d("cancelBtn")||"Annulla"}
                </button>
            </div>
        </div>
    `,e.addEventListener("pointerdown",l=>l.stopPropagation()),e.addEventListener("pointerup",l=>l.stopPropagation()),n.addEventListener("pointerdown",l=>l.stopPropagation()),n.addEventListener("pointerup",l=>l.stopPropagation()),e.appendChild(n),document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");const h=()=>{e.style.opacity="0",setTimeout(()=>e.remove(),300)};document.getElementById("close-preview-btn").onclick=h;let r=null;if(t.coverPath)try{r=new Image,r.crossOrigin="Anonymous",await new Promise((l,E)=>{r.onload=l,r.onerror=E,r.src="/"+t.coverPath})}catch(l){console.warn("Impossibile caricare la copertina per il canvas",l)}let a="post",c="blur";const f=document.getElementById("btn-fmt-post"),p=document.getElementById("btn-fmt-story"),g=document.getElementById("btn-bg-blur"),s=document.getElementById("btn-bg-solid"),u=document.getElementById("wrap-bg-color"),b=document.getElementById("export-bg-color"),S=document.getElementById("export-text-color"),ie=document.getElementById("preview-image"),x=document.createElement("canvas"),i=x.getContext("2d");f.onclick=()=>{a="post",f.classList.add("active"),p.classList.remove("active"),I()},p.onclick=()=>{a="story",p.classList.add("active"),f.classList.remove("active"),I()},g.onclick=()=>{c="blur",g.classList.add("active"),s.classList.remove("active"),b.disabled=!0,u.style.opacity="0.3",I()},s.onclick=()=>{c="solid",s.classList.add("active"),g.classList.remove("active"),b.disabled=!1,u.style.opacity="1",I()},b.addEventListener("input",I),S.addEventListener("input",I);function I(){const l=b.value,E=S.value;if(x.width=1080,x.height=a==="story"?1920:1080,c==="blur"&&r){i.save(),i.filter="blur(60px) brightness(0.4)";const y=Math.max(x.width/r.width,x.height/r.height)*1.2,C=x.width/2-r.width/2*y,A=x.height/2-r.height/2*y;i.drawImage(r,C,A,r.width*y,r.height*y),i.restore()}else i.fillStyle=l,i.fillRect(0,0,x.width,x.height);i.save(),i.fillStyle=E,i.globalAlpha=.3,i.font="bold 180px Georgia, serif",i.fillText("“",60,160),i.restore(),i.fillStyle=E,i.textAlign="left";let O=o.trim();const oe=920,D=a==="story"?1100:450,Y=O.split(" ");let k=a==="story"?65:55,H=k*1.4,T=[];for(;k>18;){i.font=`italic ${k}px Georgia, serif`,H=k*1.4,T=[];let y="";for(let C=0;C<Y.length;C++){let A=y+Y[C]+" ";i.measureText(A).width>oe&&C>0?(T.push(y),y=Y[C]+" "):y=A}if(T.push(y),T.length*H<=D)break;k-=2}let ne=T.length*H,K=220+Math.max(0,(D-ne)/2);T.forEach(y=>{i.fillText(y,80,K),K+=H});const ae=x.height-80,_=180,$=270,F=80,P=ae-$;r?(i.shadowColor="rgba(0,0,0,0.6)",i.shadowBlur=20,i.shadowOffsetX=10,i.shadowOffsetY=10,i.drawImage(r,F,P,_,$),i.shadowColor="transparent"):(i.fillStyle="rgba(255,255,255,0.1)",i.fillRect(F,P,_,$));const j=F+_+40;let Q=P+$/2-20;i.fillStyle=E,i.font="bold 40px sans-serif";let M=t.title.toUpperCase();i.measureText(M).width>1080-j-40&&(M=M.substring(0,30)+"..."),i.fillText(M,j,Q),i.save(),i.fillStyle=E,i.globalAlpha=.7,i.font="32px sans-serif",i.fillText(t.author,j,Q+50),i.globalAlpha=.3,i.font="22px sans-serif",i.fillText(window.t?d("shareQuoteBrand"):"Generato con KoreShelf",j,P+$),i.restore(),ie.src=x.toDataURL("image/jpeg",.95)}I(),document.getElementById("dl-img-btn").onclick=()=>{const l=document.createElement("a");l.href=x.toDataURL("image/jpeg",.95),l.download=`KoreShelf_${t.title.replace(/\s+/g,"_")}_Quote.jpg`,document.body.appendChild(l),l.click(),document.body.removeChild(l)},document.getElementById("sh-img-btn").onclick=async()=>{x.toBlob(async l=>{const E=new File([l],`KoreShelf_Quote_${Date.now()}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[E]}))try{await navigator.share({files:[E],title:t.title,text:`"${cleanText}"
— ${t.author}`})}catch(O){console.warn("Condivisione annullata dall'utente",O)}else alert(d("shareNotSupported")||"Il tuo dispositivo/browser non supporta la condivisione nativa. Usa il tasto Scarica!")},"image/jpeg",.95)}}export{be as addHighlightLocally,se as initHighlightsBoard,me as nextHighlightsPage,ue as prevHighlightsPage,xe as removeHighlightLocally,de as updateBoardTitle};
