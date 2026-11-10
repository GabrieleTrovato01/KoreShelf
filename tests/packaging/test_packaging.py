"""
Test dei pacchetti: workflow GitHub (exe, dmg, AppImage), bundle macOS e AppImage reale.

    pip install pyyaml pillow
    python tests/packaging/test_packaging.py            # tutti
    ONLY=appimage python tests/packaging/test_packaging.py

Il test dell'AppImage (solo Linux) richiede: `cargo build --release`, Xvfb e i pacchetti
di sviluppo WebKitGTK; scarica linuxdeploy da GitHub.
"""

import hashlib
import json
import os
import plistlib
import re
import shutil
import signal
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

import yaml
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
WORKFLOW = ROOT / ".github" / "workflows" / "release.yml"
VERSION = re.search(r'^version\s*=\s*"([^"]+)"', (ROOT / "Cargo.toml").read_text(), re.M).group(1)


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, text=True, capture_output=True, **kw)


# ------------------------------------------------------------------ workflow

def test_workflow_builds_exe_dmg_and_appimage():
    assert WORKFLOW.exists(), f"Manca {WORKFLOW.relative_to(ROOT)}"
    wf = yaml.safe_load(WORKFLOW.read_text())
    triggers = wf.get(True) or wf.get("on")  # PyYAML legge 'on' come True
    assert "workflow_dispatch" in triggers, "Deve potersi avviare a mano dalla scheda Actions"
    assert any("v*" in str(t) for t in triggers.get("push", {}).get("tags", [])), "Deve partire sui tag v*"

    jobs = wf["jobs"]
    text = WORKFLOW.read_text()
    runners = " ".join(str(j.get("runs-on", "")) + json.dumps(j.get("strategy", {})) for j in jobs.values())
    for os_name in ["windows", "macos", "ubuntu"]:
        assert os_name in runners, f"Serve un job su {os_name}"
    for ext in [".exe", ".dmg", ".AppImage"]:
        assert ext in text, f"Il workflow deve produrre un file {ext}"

    uploads = [s for j in jobs.values() for s in j.get("steps", []) if "upload-artifact" in str(s.get("uses", ""))]
    assert uploads, "I pacchetti devono essere scaricabili come artifact"
    release = [s for j in jobs.values() for s in j.get("steps", []) if "action-gh-release" in str(s.get("uses", ""))]
    assert release and "refs/tags/v" in json.dumps(release), "Sui tag i pacchetti vanno allegati alla Release"

    # Ogni script usato dal workflow deve esistere ed essere eseguibile
    for script in set(re.findall(r"(packaging/[\w/.-]+\.sh)", text)):
        path = ROOT / script
        assert path.exists(), f"Il workflow usa {script} che non esiste"
        assert os.access(path, os.X_OK), f"{script} deve essere eseguibile"
    assert "universal" in text or ("aarch64-apple-darwin" in text and "x86_64-apple-darwin" in text), \
        "Il dmg deve funzionare sia sui Mac Intel sia sui Mac Apple Silicon"


def test_linux_appimage_is_built_for_pc_and_arm():
    """Linux ha due AppImage: una per i PC (x86_64) e una per i computer ARM (aarch64: Raspberry Pi
    con il desktop, portatili ARM). Ognuna si costruisce su una macchina vera di quel tipo, con
    Ubuntu 22.04 (glibc meno recente = più distribuzioni). Cache degli strumenti e artifact sono
    separati per architettura, altrimenti la macchina ARM userebbe gli strumenti dell'altra."""
    wf = yaml.safe_load(WORKFLOW.read_text())
    linux = wf["jobs"].get("linux", {})
    matrix = json.dumps(linux.get("strategy", {}).get("matrix", {}))
    problems = []
    for runner in ("ubuntu-22.04", "ubuntu-22.04-arm"):
        if f'"{runner}"' not in matrix:
            problems.append(f"Il job linux deve girare anche su {runner}: {matrix}")
    if "${{ matrix." not in str(linux.get("runs-on", "")):
        problems.append(f"runs-on deve venire dalla matrice: {linux.get('runs-on')}")
    steps = linux.get("steps", [])
    keys = [s.get("with", {}).get("key", "") for s in steps if "actions/cache" in str(s.get("uses", ""))]
    if not keys or any("runner.arch" not in k for k in keys):
        problems.append(f"La cache degli strumenti deve distinguere l'architettura (runner.arch): {keys}")
    names = [s.get("with", {}).get("name", "") for s in steps if "upload-artifact" in str(s.get("uses", ""))]
    if not names or any("runner.arch" not in n and "matrix." not in n for n in names):
        problems.append(f"Gli artifact delle due AppImage devono avere nomi diversi: {names}")
    assert not problems, "\n".join(problems)


def test_appimage_runtimes_for_both_architectures_are_included():
    """Il runtime dell'AppImage (il programmino che la apre) è incluso nel repository per x86_64 e
    per aarch64, con impronta SHA-256 corretta: la build non dipende da un download che a volte
    risponde 504. Ogni runtime deve essere davvero un eseguibile della sua architettura."""
    folder = ROOT / "packaging" / "linux"
    problems = []
    for arch, machine in (("x86_64", 62), ("aarch64", 183)):     # e_machine ELF: 62 = x86-64, 183 = AArch64
        runtime, digest = folder / f"runtime-{arch}", folder / f"runtime-{arch}.sha256"
        if not runtime.exists() or not digest.exists():
            problems.append(f"Mancano runtime-{arch} e/o runtime-{arch}.sha256")
            continue
        data = runtime.read_bytes()
        expected = digest.read_text().split()[0]
        if hashlib.sha256(data).hexdigest() != expected:
            problems.append(f"runtime-{arch}: l'impronta SHA-256 non corrisponde")
        if data[:4] != b"\x7fELF" or int.from_bytes(data[18:20], "little") != machine:
            problems.append(f"runtime-{arch} non è un eseguibile ELF per {arch}")
    assert not problems, "\n".join(problems)


def test_android_apk_also_runs_on_x86_64():
    """L'APK contiene ARM a 64 e 32 bit (tutti i telefoni veri) e anche x86_64 (emulatore Android
    sul PC, Chromebook e i pochi dispositivi con processore Intel)."""
    wf = yaml.safe_load(WORKFLOW.read_text())
    android = json.dumps(wf["jobs"]["android"])
    m = re.search(r"tauri android build[^\"&]*", android)
    assert m, "Manca il comando tauri android build"
    for target in ("aarch64", "armv7", "x86_64"):
        assert f"--target {target}" in m.group(0), f"L'APK deve includere {target}: {m.group(0)}"


def test_readmes_explain_which_linux_file_to_pick():
    """Ogni README elenca anche l'AppImage per ARM e spiega in parole semplici quale scegliere:
    x86_64 = amd64 = PC con Intel o AMD; aarch64 = arm64 = ARM (Raspberry Pi, portatili ARM), con il
    comando per scoprirlo (uname -m)."""
    problems = []
    for lang, rel in READMES.items():
        text = (ROOT / rel).read_text(encoding="utf-8")
        for need in ("aarch64.AppImage", "x86_64.AppImage", "amd64", "arm64", "uname -m", "Raspberry Pi"):
            if need not in text:
                problems.append(f"{rel}: manca {need!r}")
    assert not problems, "\n".join(problems)


# ------------------------------------------------------------------- macOS

def test_macos_app_bundle_structure():
    script = ROOT / "packaging" / "macos" / "make-app.sh"
    assert script.exists(), "Manca packaging/macos/make-app.sh"
    with tempfile.TemporaryDirectory() as tmp:
        fake = Path(tmp) / "koreshelf"
        fake.write_text("#!/bin/sh\necho KoreShelf\n")
        fake.chmod(0o755)
        out = Path(tmp) / "out"
        run([str(script), str(fake), str(out)], cwd=ROOT)

        app = out / "KoreShelf.app" / "Contents"
        info = plistlib.loads((app / "Info.plist").read_bytes())
        assert info["CFBundleExecutable"] == "koreshelf"
        assert info["CFBundleName"] == "KoreShelf"
        assert info["CFBundleIdentifier"].count(".") >= 2
        assert info["CFBundleShortVersionString"] == VERSION, "Versione del bundle = versione di Cargo.toml"
        assert info["CFBundlePackageType"] == "APPL"
        assert info.get("NSHighResolutionCapable") is True, "Testi nitidi sugli schermi Retina"
        assert info.get("LSMinimumSystemVersion"), "Serve la versione minima di macOS"
        exe = app / "MacOS" / "koreshelf"
        assert exe.exists() and os.access(exe, os.X_OK), "Eseguibile mancante o non eseguibile"
        icns = app / "Resources" / info["CFBundleIconFile"].removesuffix(".icns")
        icns = icns.with_suffix(".icns")
        assert icns.exists(), "Icona .icns mancante"
        assert Image.open(icns).size[0] >= 256, "Icona troppo piccola"


# ------------------------------------------------------------------ mobile

MOBILE = ROOT / "mobile"
TAURI = MOBILE / "src-tauri"


def test_mobile_app_is_a_thin_shell_around_the_library():
    """L'app Android/iOS (Tauri 2) non duplica la logica: avvia lo stesso server della versione
    desktop (la libreria `koreshelf`) e mostra la sua interfaccia."""
    cargo = (TAURI / "Cargo.toml").read_text() if (TAURI / "Cargo.toml").exists() else ""
    assert cargo, "Manca mobile/src-tauri/Cargo.toml"
    assert re.search(r'koreshelf\s*=\s*\{[^}]*path\s*=\s*"\.\./\.\."[^}]*default-features\s*=\s*false', cargo), \
        "L'app mobile deve usare la libreria koreshelf (senza la finestra desktop)"
    assert re.search(r'^tauri\s*=\s*\{[^}]*version\s*=\s*"2', cargo, re.M) or re.search(r'^tauri\s*=\s*"2', cargo, re.M), "Serve Tauri 2"
    assert '"staticlib"' in cargo and '"cdylib"' in cargo, "Android e iOS caricano l'app come libreria"
    lib = (TAURI / "src" / "lib.rs").read_text()
    assert "mobile_entry_point" in lib and "koreshelf::start_embedded" in lib
    assert "app_data_dir" in lib, "I dati vanno nella cartella dell'app assegnata dal sistema"

    conf = json.loads((TAURI / "tauri.conf.json").read_text())
    assert conf["productName"] == "KoreShelf"
    assert conf["version"] == VERSION, "Stessa versione della versione desktop"
    assert conf["identifier"] == "io.github.gabrieletrovato01.koreshelf", "Stesso identificativo dell'app macOS"
    for icon in conf["bundle"]["icon"]:
        assert (TAURI / icon).exists(), f"Icona mancante: {icon}"


def test_mobile_network_rules_allow_only_the_local_server():
    """Android e iOS bloccano l'HTTP non cifrato: va permesso solo verso il server interno."""
    plist = plistlib.loads((TAURI / "Info.ios.plist").read_bytes())
    ats = plist.get("NSAppTransportSecurity", {})
    assert ats.get("NSAllowsLocalNetworking") is True, "iOS: serve NSAllowsLocalNetworking"
    assert not ats.get("NSAllowsArbitraryLoads"), "iOS: niente HTTP libero verso internet"

    script = ROOT / "packaging" / "mobile" / "patch-android.sh"
    assert script.exists() and os.access(script, os.X_OK), "Manca packaging/mobile/patch-android.sh (eseguibile)"
    netsec = (ROOT / "packaging" / "mobile" / "network_security_config.xml").read_text()
    assert re.search(r'cleartextTrafficPermitted="true"[^>]*>\s*<domain[^>]*>127\.0\.0\.1</domain>', netsec), \
        "Android: HTTP permesso solo verso 127.0.0.1"
    assert re.search(r'<base-config cleartextTrafficPermitted="false"', netsec), "Android: per il resto solo HTTPS"


def test_workflow_builds_apk_and_ipa():
    text = WORKFLOW.read_text()
    wf = yaml.safe_load(text)
    jobs = wf["jobs"]
    assert "android" in jobs and "ios" in jobs, "Servono i job android e ios"
    assert ".apk" in text and ".ipa" in text
    android = json.dumps(jobs["android"])
    assert "ndk" in android.lower(), "Android: serve l'NDK per compilare Rust"
    assert "patch-android.sh" in android, "Android: vanno applicate le regole di rete"
    assert "aarch64-linux-android" in android
    ios = json.dumps(jobs["ios"])
    assert "macos" in str(jobs["ios"]["runs-on"])
    assert "aarch64-apple-ios" in ios
    # Senza account Apple: .ipa non firmato, prodotto dalla CLI di Tauri (lo script Rust dentro il
    # progetto Xcode funziona solo mentre è in esecuzione `tauri ios build`)
    assert "tauri ios build" in ios and "--no-sign" in ios, "iOS: usare `tauri ios build --no-sign`"
    assert "xcodebuild" not in ios, "iOS: niente xcodebuild diretto"
    setup = [s for s in jobs["android"]["steps"] if "setup-android" in str(s.get("uses", ""))]
    packages = " ".join(str(s.get("with", {}).get("packages", "tools platform-tools")) for s in setup).split()
    assert "tools" not in packages, "Android: il pacchetto SDK 'tools' non esiste più (solo platform-tools)"


def test_android_release_is_signed_with_the_project_key():
    """Android: APK release (leggero, ottimizzato) firmato con la chiave del progetto, presa dai
    secrets di GitHub. Senza secrets (es. PR da un fork) si firma con una chiave temporanea."""
    wf = yaml.safe_load(WORKFLOW.read_text())
    job = wf["jobs"]["android"]
    text = json.dumps(job)
    build = next(s for s in job["steps"] if "tauri android build" in str(s.get("run", "")))
    assert "--debug" not in build["run"], "Android in release: --debug produce un APK enorme (simboli di debug)"
    for name in ["ANDROID_KEYSTORE_BASE64", "ANDROID_KEYSTORE_PASSWORD", "ANDROID_KEY_ALIAS"]:
        assert f"secrets.{name}" in text, f"Manca il secret {name}"
    sign = next((s for s in job["steps"] if "apksigner" in str(s.get("run", ""))), None)
    assert sign, "L'APK va firmato con apksigner"
    run = sign["run"]
    assert "zipalign" in run and "sign --ks" in run and run.index("zipalign") < run.index("sign --ks"), \
        "Prima zipalign, poi la firma"
    assert " verify " in run, "La firma va verificata"
    assert "keytool" in run and "::warning::" in run, "Senza secrets: chiave temporanea e avviso, senza fallire"
    assert "rm -f" in run, "Il file della chiave va cancellato subito dopo l'uso"
    assert "secrets." not in run, "I secrets arrivano come variabili d'ambiente, mai scritti nel comando"
    # Mai fallimenti silenziosi: ogni fase si annuncia, gli errori della chiave si spiegano
    assert run.count("==>") >= 5, "Ogni fase della firma deve scrivere cosa sta facendo"
    assert "-storepass:env KS_PASSWORD" in run, "La chiave va controllata prima di firmare (password da variabile)"
    assert "ANDROID_KEYSTORE_PASSWORD" in run and "ANDROID_KEY_ALIAS" in run and "::error::" in run, \
        "Se password o alias sono sbagliati, l'errore deve dire quale secret controllare"
    verify = [l for l in run.splitlines() if " verify " in l]
    assert verify and all("| grep" not in l for l in verify), \
        "La verifica si basa sull'esito di apksigner, non su un grep che può fallire in silenzio"
    gitignore = (ROOT / ".gitignore").read_text()
    assert "*.jks" in gitignore and "*.keystore" in gitignore, "Le chiavi non devono mai finire nel repository"


def test_all_version_numbers_agree():
    """Cargo.toml decide la versione (es. 4.0.0): il server la mostra in /api/ping, il banner degli
    aggiornamenti la confronta con l'ultima release e Android ne ricava il versionCode. Ogni altro
    punto che la dichiara (app mobile, frontend, file di lock) deve dire la stessa cosa."""
    def toml_package(path, name):
        text = (ROOT / path).read_text()
        m = re.search(r'\[\[package\]\]\nname = "' + re.escape(name) + r'"\nversion = "([^"]+)"', text)
        return m.group(1) if m else None
    def json_versions(path):
        data = json.loads((ROOT / path).read_text())
        found = [("version", data.get("version"))]
        if "packages" in data:
            found.append(('packages[""].version', data["packages"].get("", {}).get("version")))
        return found
    declared = {
        "mobile/src-tauri/Cargo.toml": re.search(r'^version\s*=\s*"([^"]+)"',
                                                 (ROOT / "mobile/src-tauri/Cargo.toml").read_text(), re.M).group(1),
        "Cargo.lock (koreshelf)": toml_package("Cargo.lock", "koreshelf"),
        "mobile/src-tauri/Cargo.lock (koreshelf)": toml_package("mobile/src-tauri/Cargo.lock", "koreshelf"),
        "mobile/src-tauri/Cargo.lock (koreshelf-mobile)": toml_package("mobile/src-tauri/Cargo.lock", "koreshelf-mobile"),
        "mobile/src-tauri/tauri.conf.json": json.loads((ROOT / "mobile/src-tauri/tauri.conf.json").read_text())["version"],
    }
    for path in ("frontend/package.json", "frontend/package-lock.json", "mobile/package.json", "mobile/package-lock.json"):
        for key, value in json_versions(path):
            declared[f"{path} ({key})"] = value
    wrong = {k: v for k, v in declared.items() if v != VERSION}
    assert not wrong, f"Cargo.toml dice {VERSION}, ma: " + ", ".join(f"{k} = {v}" for k, v in wrong.items())


READMES = {"en": "README.md", "it": "docs/README.it.md", "de": "docs/README.de.md",
           "fr": "docs/README.fr.md", "es": "docs/README.es.md"}


def test_readmes_describe_the_4_0_downloads():
    """I README nelle 5 lingue spiegano come scaricare la 4.0.0: il sito koreshelf.github.io,
    l'ultima release e i cinque file (exe, dmg, AppImage, apk, ipa), con l'avviso della prima
    apertura. Niente istruzioni che con la versione Rust non esistono più (zip da estrarre, i vecchi
    eseguibili, le traduzioni in src/locales, la vecchia immagine Docker con Node.js). Ogni README
    porta alle altre lingue. (Docker in sé non è più "superato": dalla 4.0 c'è la nuova immagine,
    controllata da test_readmes_explain_self_hosting_with_docker.)"""
    problems = []
    obsolete = ["koreshelf-win.exe", "koreshelf-linux", "koreshelf-macos-arm", "AppleSilicon.zip", "src/locales",
                "langBtn", "monkey-patch", "Node.js nel Dockerfile", "node:22", "CustomEvent is not defined"]
    for lang, rel in READMES.items():
        path = ROOT / rel
        if not path.exists():
            problems.append(f"{rel}: manca")
            continue
        text = path.read_text(encoding="utf-8")
        for need in ("https://koreshelf.github.io", "releases/latest", ".exe", ".dmg", ".AppImage", ".apk", ".ipa",
                     "KoreShelf_Data", "koreshelf.log"):
            if need not in text:
                problems.append(f"{rel}: deve citare {need!r}")
        for word in obsolete:
            if word.lower() in text.lower():
                problems.append(f"{rel}: istruzione superata {word!r}")
        for other, other_rel in READMES.items():
            if other == lang:
                continue
            target = os.path.relpath(ROOT / other_rel, path.parent).replace(os.sep, "/")
            if f"]({target})" not in text:
                problems.append(f"{rel}: manca il link alla versione {other} ({target})")
    assert not problems, "\n".join(problems)


def test_readmes_explain_self_hosting_with_docker():
    """Ogni README spiega il self-hosting: l'immagine pronta su ghcr.io, docker compose, il volume
    /data, la password facoltativa, l'importazione dalla versione Docker 3.x (./public in /app/public)
    e l'avvertenza sull'esposizione a internet (HTTPS)."""
    problems = []
    for lang, rel in READMES.items():
        text = (ROOT / rel).read_text(encoding="utf-8")
        for need in ("ghcr.io/gabrieletrovato01/koreshelf", "docker compose up -d", "/data", "KORESHELF_PASSWORD",
                     "/app/public", "HTTPS", "koreshelf --server"):
            if need not in text:
                problems.append(f"{rel}: la sezione Docker deve citare {need!r}")
    assert not problems, "\n".join(problems)


def _dockerfile():
    path = ROOT / "Dockerfile"
    assert path.exists(), "Manca il Dockerfile"
    return path.read_text()


def test_dockerfile_builds_a_small_server_image():
    """Dockerfile in due fasi: si compila con Rust (versione server, senza finestra, lock rispettato)
    e si consegna un'immagine Debian slim con il solo eseguibile. Gira come utente normale (non root),
    dati nel volume /data, porta 3000 su tutta la rete, controllo di salute con --health, avvio con
    --server, e cartella di lavoro /app (dove montare la vecchia ./public per importarla)."""
    df = _dockerfile()
    stages = re.findall(r"^FROM\s+(\S+)(?:\s+AS\s+(\S+))?", df, re.M | re.I)
    problems = []
    if len(stages) < 2 or not stages[0][0].startswith("rust:") or "slim" not in stages[-1][0]:
        problems.append(f"Servono due fasi: rust:… per compilare, debian …-slim per l'immagine finale: {stages}")
    if not re.search(r"cargo build[^\n]*--release[^\n]*--locked[^\n]*--no-default-features|cargo build[^\n]*--locked[^\n]*--release[^\n]*--no-default-features", df):
        problems.append("La compilazione deve essere: cargo build --release --locked --no-default-features")
    final = df[df.rfind("\nFROM "):]
    user = re.findall(r"^USER\s+(\S+)", final, re.M)
    if not user or user[-1] in ("root", "0"):
        problems.append(f"L'immagine finale deve girare come utente normale (USER): {user}")
    for need, why in ((r'^VOLUME\s+\[?"?/data', "VOLUME /data"), (r"^EXPOSE\s+3000", "EXPOSE 3000"),
                      (r"KORESHELF_HOST=0\.0\.0\.0", "ENV KORESHELF_HOST=0.0.0.0"), (r"KORESHELF_DATA=/data", "ENV KORESHELF_DATA=/data"),
                      (r"^HEALTHCHECK[^\n]*--health", "HEALTHCHECK … koreshelf --health"),
                      (r'^CMD\s+\[\s*"koreshelf"\s*,\s*"--server"\s*\]', 'CMD ["koreshelf", "--server"]'),
                      (r"^WORKDIR\s+/app\b", "WORKDIR /app")):
        if not re.search(need, final, re.M):
            problems.append(f"Nell'immagine finale manca {why}")
    for src in re.findall(r"^COPY\s+(?!--from)(.+?)\s+\S+$", df, re.M):
        for item in src.split():
            if not (ROOT / item).exists():
                problems.append(f"COPY di un file che non esiste: {item}")
    assert not problems, "\n".join(problems)


def test_dockerignore_sends_only_what_the_build_needs():
    """Il contesto della build contiene solo quello che serve (niente target/ da gigabyte, app
    mobile, node_modules, test), e tutto quello che il Dockerfile copia è incluso."""
    path = ROOT / ".dockerignore"
    assert path.exists(), "Manca .dockerignore"
    rules = [l.strip() for l in path.read_text().splitlines() if l.strip() and not l.startswith("#")]
    assert rules and rules[0] == "*", f".dockerignore deve partire da '*' (esclude tutto) e riammettere il necessario: {rules[:3]}"
    allowed = {r[1:].rstrip("/") for r in rules if r.startswith("!")}
    need = {"Cargo.toml", "Cargo.lock", "build.rs", "src", "assets", "frontend/dist"}
    missing = need - allowed
    extra = {a for a in allowed if a.split("/")[0] in ("target", "mobile", "tests", "node_modules")}
    assert not missing, f".dockerignore deve riammettere {sorted(missing)}"
    assert not extra, f".dockerignore non deve mandare a Docker {sorted(extra)}"
    copied = set()
    for src in re.findall(r"^COPY\s+(?!--from)(.+?)\s+\S+$", _dockerfile(), re.M):
        copied.update(i.rstrip("/") for i in src.split())
    assert copied <= allowed, f"Il Dockerfile copia file esclusi da .dockerignore: {sorted(copied - allowed)}"


def test_compose_file_is_ready_for_self_hosting():
    """docker-compose.yml pronto all'uso: immagine pubblicata su ghcr.io, porta 3000, dati in un
    volume su /data, riavvio automatico; con le righe (commentate) per la password e per importare
    la libreria della versione Docker 3.x."""
    path = ROOT / "docker-compose.yml"
    assert path.exists(), "Manca docker-compose.yml"
    text = path.read_text()
    svc = (yaml.safe_load(text) or {}).get("services", {}).get("koreshelf", {})
    problems = []
    if not str(svc.get("image", "")).startswith("ghcr.io/gabrieletrovato01/koreshelf"):
        problems.append(f"image deve essere ghcr.io/gabrieletrovato01/koreshelf: {svc.get('image')}")
    if "3000:3000" not in [str(p) for p in svc.get("ports", [])]:
        problems.append(f"Porta 3000 non pubblicata: {svc.get('ports')}")
    if not any(str(v).endswith(":/data") for v in svc.get("volumes", [])):
        problems.append(f"I dati devono stare in un volume montato su /data: {svc.get('volumes')}")
    if svc.get("restart") != "unless-stopped":
        problems.append(f"restart deve essere unless-stopped: {svc.get('restart')}")
    for hint in ("KORESHELF_PASSWORD", "./public:/app/public"):
        if hint not in text:
            problems.append(f"Manca la riga d'esempio con {hint}")
    assert not problems, "\n".join(problems)


def test_docker_workflow_builds_and_checks_the_image_for_pc_and_raspberry():
    """La CI costruisce l'immagine per PC (amd64) e Raspberry/NAS (arm64) su macchine native,
    la AVVIA davvero e la controlla (salute, pagina, spegnimento pulito), ritenta la build se i
    server rispondono male, e solo con un tag v* la pubblica su ghcr.io (versione e latest)."""
    path = ROOT / ".github" / "workflows" / "docker.yml"
    assert path.exists(), "Manca .github/workflows/docker.yml"
    text = path.read_text()
    wf = yaml.safe_load(text)
    problems = []
    on = wf.get(True) or wf.get("on") or {}
    if "v*" not in str(on.get("push", {}).get("tags", [])):
        problems.append("Deve partire sui tag v*")
    build = wf["jobs"].get("build", {})
    matrix = json.dumps(build.get("strategy", {}).get("matrix", {}))
    for need in ("linux/amd64", "linux/arm64", "ubuntu-24.04-arm"):
        if need not in matrix:
            problems.append(f"La matrice deve includere {need}")
    steps = "\n".join(json.dumps(s) for s in build.get("steps", []))
    for need, why in (("--health", "il controllo di salute"), ("__KORESHELF_SERVER__", "la pagina in modalità server"),
                      ("docker stop", "lo spegnimento"), ("ExitCode", "il codice di uscita dopo docker stop"),
                      ("push-by-digest=true", "la pubblicazione per digest"), ("steps.build.outcome == 'failure'", "il secondo tentativo")):
        if need not in steps:
            problems.append(f"Il job build deve controllare {why} ({need})")
    merge = json.dumps(wf["jobs"].get("merge", {}))
    for need in ("imagetools create", "ghcr.io/gabrieletrovato01/koreshelf", "latest", "refs/tags/v"):
        if need not in merge and need not in text:
            problems.append(f"Il job merge deve usare {need}")
    if "packages: write" not in text:
        problems.append("Servono i permessi packages: write per pubblicare su ghcr.io")
    assert not problems, "\n".join(problems)


def test_repository_keeps_the_community_files():
    """Con la fusione su main non si perdono i file della comunità: guida al contributo (aggiornata
    a Rust: cargo test, frontend/src/locales, niente vecchia immagine Node), sicurezza, codice di
    condotta, modelli per le segnalazioni (con la versione di KoreShelf e koreshelf.log) e donazioni.
    Dalla 4.0 Docker c'è di nuovo (immagine Rust), quindi parlarne non è più un errore."""
    problems = []
    for rel in ("CONTRIBUTING.md", "SECURITY.md", "CODE_OF_CONDUCT.md", "LICENSE",
                ".github/FUNDING.yml", ".github/ISSUE_TEMPLATE/bug_report.md", ".github/ISSUE_TEMPLATE/feature_request.md"):
        if not (ROOT / rel).exists():
            problems.append(f"Manca {rel}")
    contributing = (ROOT / "CONTRIBUTING.md").read_text(encoding="utf-8") if (ROOT / "CONTRIBUTING.md").exists() else ""
    for need in ("cargo test", "frontend/src/locales", "tests/e2e/test_ui.py"):
        if contributing and need not in contributing:
            problems.append(f"CONTRIBUTING.md: deve spiegare {need!r}")
    if "node:22" in contributing.lower():
        problems.append("CONTRIBUTING.md: parla ancora della vecchia immagine Docker con Node.js")
    bug = ROOT / ".github/ISSUE_TEMPLATE/bug_report.md"
    if bug.exists():
        text = bug.read_text(encoding="utf-8")
        if "node:22" in text.lower():
            problems.append("bug_report.md: parla ancora della vecchia immagine Docker con Node.js")
        if "KoreShelf" not in text or "koreshelf.log" not in text:
            problems.append("bug_report.md: deve chiedere la versione di KoreShelf e il file koreshelf.log")
    assert not problems, "\n".join(problems)


def test_downloads_survive_flaky_servers():
    """I server di download (GitHub release, Gradle) a volte rispondono 504: i download devono
    dire cosa scaricano, ritentare a lungo, non lasciare file a metà, e restare in cache."""
    script = (ROOT / "packaging" / "linux" / "build-appimage.sh").read_text()
    fetch = re.search(r"fetch\(\)\s*\{(.*?)\n\}", script, re.S)
    assert fetch, "Serve una funzione fetch() per i download"
    body = fetch.group(1)
    retries = re.search(r"--retry\s+(\d+)", body)
    assert retries and int(retries.group(1)) >= 5, "Almeno 5 nuovi tentativi"
    assert "--retry-all-errors" in body, "Ritentare anche sugli errori 5xx (504)"
    assert "--retry-delay" in body or "--retry-max-time" in body, "Pause tra un tentativo e l'altro"
    assert "echo" in body, "Il log deve dire quale file sta scaricando"
    assert re.search(r"\.part|mktemp|\.tmp", body) and "mv " in body, "Download su file temporaneo, poi rinomina"
    # Meno download possibili: niente appimagetool né runtime da GitHub. Il runtime (MIT) è nel
    # repository, verificato con SHA-256; l'AppImage si assembla con mksquashfs (pacchetto Ubuntu).
    downloaded = " ".join(re.findall(r'fetch\s+"([^"]+)"', script))
    assert "appimagetool" not in downloaded and "type2-runtime" not in downloaded, \
        f"appimagetool e runtime non si scaricano più: {downloaded}"
    runtime = ROOT / "packaging" / "linux" / "runtime-x86_64"
    digest = ROOT / "packaging" / "linux" / "runtime-x86_64.sha256"
    assert runtime.exists() and digest.exists(), "Runtime incluso nel repository, con la sua impronta SHA-256"
    import hashlib
    assert hashlib.sha256(runtime.read_bytes()).hexdigest() == digest.read_text().split()[0], "Impronta del runtime errata"
    assert "sha256sum -c" in script, "Lo script verifica il runtime prima di usarlo"
    assert "mksquashfs" in script and "--output appimage" not in script

    wf = yaml.safe_load(WORKFLOW.read_text())
    linux = json.dumps(wf["jobs"]["linux"])
    assert "actions/cache" in linux and "appimage-tools" in linux, "Linux: strumenti AppImage in cache"
    assert "squashfs-tools" in linux, "Linux: mksquashfs dai pacchetti di Ubuntu"
    saves = [s for s in wf["jobs"]["linux"]["steps"] if "actions/cache/save" in str(s.get("uses", ""))]
    assert saves and all("always()" in str(s.get("if", "")) for s in saves), \
        "La cache si salva anche se il job fallisce (un download riuscito non va perso)"
    android = wf["jobs"]["android"]
    gradle = next((s for s in android["steps"] if "setup-gradle" in str(s.get("uses", ""))), None)
    assert gradle, "Android: Gradle in cache"
    # Di default setup-gradle SALVA la cache solo sul ramo principale: sugli altri rami (rust_version)
    # la cache non servirebbe mai. Si salva sempre, tranne nelle Pull Request (che arrivano anche da fork).
    read_only = str(gradle.get("with", {}).get("cache-read-only", ""))
    assert "pull_request" in read_only, f"Android: la cache di Gradle va salvata anche fuori da main ({read_only!r})"
    build = next(s for s in android["steps"] if "tauri android build" in str(s.get("run", "")))
    assert re.search(r"for\s+\w+\s+in\s+1\s+2\s+3", build["run"]), "Android: l'assemblaggio si ritenta (problemi di rete)"


# ------------------------------------------------------------------- Linux

def _wait_ping(port=3000, timeout=60):
    end = time.time() + timeout
    while time.time() < end:
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/api/ping", timeout=2) as r:
                return json.loads(r.read())
        except Exception:
            time.sleep(0.5)
    return None


def test_appimage_is_self_contained_and_starts():
    if sys.platform != "linux":
        print("  (saltato: solo Linux)")
        return
    script = ROOT / "packaging" / "linux" / "build-appimage.sh"
    assert script.exists(), "Manca packaging/linux/build-appimage.sh"
    binary = ROOT / "target" / "release" / "koreshelf"
    assert binary.exists(), "Prima: cargo build --release"

    out = Path(tempfile.mkdtemp(prefix="appimage-out-"))
    run([str(script), str(binary), str(out)], cwd=ROOT, timeout=1200)
    images = list(out.glob("KoreShelf-*.AppImage"))
    assert len(images) == 1, f"Atteso un solo AppImage, trovati: {images}"
    image = images[0]
    assert os.access(image, os.X_OK)
    assert VERSION in image.name

    env = dict(os.environ, APPIMAGE_EXTRACT_AND_RUN="1")
    version = run([str(image), "--version"], env=env, timeout=120).stdout
    assert f"KoreShelf {VERSION}" in version, version

    # Avvio vero, con la finestra, su un display virtuale
    home = Path(tempfile.mkdtemp(prefix="appimage-home-"))
    env.update(HOME=str(home), XDG_DATA_HOME=str(home / "data"), XDG_CONFIG_HOME=str(home / "cfg"),
               XDG_CACHE_HOME=str(home / "cache"), WEBKIT_DISABLE_COMPOSITING_MODE="1")
    proc = subprocess.Popen(["xvfb-run", "-a", "-s", "-screen 0 1280x800x24", str(image)], env=env,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, start_new_session=True)
    try:
        ping = _wait_ping()
        assert ping and ping["version"] == VERSION, "Il server interno dell'AppImage non risponde"

        # La pagina viene caricata dalla finestra WebKit (non dal browser)
        log = home / "data" / "KoreShelf" / "koreshelf.log"
        webprocs = []
        end = time.time() + 60
        while time.time() < end and not webprocs:
            for pid in os.listdir("/proc"):
                if pid.isdigit():
                    try:
                        exe = os.readlink(f"/proc/{pid}/exe")
                    except OSError:
                        continue
                    if exe.endswith("WebKitWebProcess"):
                        webprocs.append(exe)
            time.sleep(1)
        text = log.read_text() if log.exists() else ""
        assert "WebView non disponibile" not in text, f"La finestra non è partita:\n{text}"
        assert webprocs, f"Nessun processo WebKit avviato. Log:\n{text}"
        # Autosufficiente: usa il WebKit incluso nell'AppImage, non quello del sistema
        assert all(not p.startswith("/usr/") for p in webprocs), \
            f"L'AppImage usa il WebKit del sistema, non il suo: {webprocs}"
    finally:
        os.killpg(proc.pid, signal.SIGTERM)
        try:
            proc.wait(15)
        except subprocess.TimeoutExpired:
            os.killpg(proc.pid, signal.SIGKILL)
        shutil.rmtree(home, ignore_errors=True)


# ------------------------------------------------------------------ runner

if __name__ == "__main__":
    only = os.environ.get("ONLY")
    tests = [v for k, v in dict(globals()).items() if k.startswith("test_") and (not only or only in k)]
    failed = 0
    for test in tests:
        start = time.time()
        try:
            test()
            print(f"PASS  {test.__name__} ({time.time() - start:.1f}s)")
        except AssertionError as e:
            failed += 1
            print(f"FAIL  {test.__name__}: {e}")
        except Exception as e:
            failed += 1
            print(f"ERROR {test.__name__}: {e!r}")
    print(f"\n{len(tests) - failed}/{len(tests)} test superati")
    sys.exit(1 if failed else 0)
