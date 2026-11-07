@echo off
setlocal
title KoreShelf - Compilazione
cd /d "%~dp0"

echo.
echo  ==========================================
echo     KoreShelf - creazione di KoreShelf.exe
echo  ==========================================
echo.

where cargo >nul 2>nul
if errorlevel 1 (
    echo  [!] Rust non e' installato.
    echo.
    echo  1. Scarica e avvia rustup-init.exe dalla pagina che si sta aprendo.
    echo  2. Se richiesto, installa anche "Visual Studio Build Tools"
    echo     con il componente "Sviluppo di applicazioni desktop con C++".
    echo  3. Chiudi questa finestra e fai di nuovo doppio clic su build.bat
    echo.
    start "" "https://rustup.rs"
    pause
    exit /b 1
)

if not exist "frontend\dist\index.html" (
    where npm >nul 2>nul
    if errorlevel 1 (
        echo  [!] Manca la build del frontend e Node.js non e' installato.
        echo      Installa Node.js da https://nodejs.org e riprova.
        start "" "https://nodejs.org"
        pause
        exit /b 1
    )
    echo  Preparo l'interfaccia grafica...
    pushd frontend
    call npm install || goto :error
    call npm run build || goto :error
    popd
)

echo  Compilo KoreShelf (la prima volta servono alcuni minuti)...
echo.
cargo build --release || goto :error

copy /y "target\release\koreshelf.exe" "KoreShelf.exe" >nul || goto :error

echo.
echo  ==========================================
echo   Fatto! Trovi KoreShelf.exe in questa cartella.
echo   Puoi copiarlo dove vuoi e aprirlo con un doppio clic.
echo  ==========================================
echo.
explorer /select,"%~dp0KoreShelf.exe"
pause
exit /b 0

:error
echo.
echo  [!] Qualcosa e' andato storto. Leggi i messaggi qui sopra.
pause
exit /b 1
