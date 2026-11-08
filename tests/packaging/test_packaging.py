"""
Test dei pacchetti: workflow GitHub (exe, dmg, AppImage), bundle macOS e AppImage reale.

    pip install pyyaml pillow
    python tests/packaging/test_packaging.py            # tutti
    ONLY=appimage python tests/packaging/test_packaging.py

Il test dell'AppImage (solo Linux) richiede: `cargo build --release`, Xvfb e i pacchetti
di sviluppo WebKitGTK; scarica linuxdeploy da GitHub.
"""

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
    assert any("setup-gradle" in str(s.get("uses", "")) for s in android["steps"]), "Android: Gradle in cache"
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
