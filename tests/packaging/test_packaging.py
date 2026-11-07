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
