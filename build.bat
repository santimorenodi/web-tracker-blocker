@echo off
setlocal
set DIST_DIR=dist
set FF_DIR=%DIST_DIR%\firefox
set CH_DIR=%DIST_DIR%\chrome

echo [1/4] Limpiando carpeta dist...
if exist %DIST_DIR% rd /s /q %DIST_DIR%
mkdir %DIST_DIR%
mkdir %FF_DIR%
mkdir %CH_DIR%

:: --- FIREFOX ---
echo [2/4] Preparando FIREFOX (Carpeta y ZIP)...
copy manifest.json "%FF_DIR%\manifest.json" >nul
copy background.js "%FF_DIR%\background.js" >nul
copy blocked.html "%FF_DIR%\blocked.html" >nul
copy blocked.js "%FF_DIR%\blocked.js" >nul
copy icon.png "%FF_DIR%\icon.png" >nul

powershell -Command "Compress-Archive -Path '%cd%\%FF_DIR%\*' -DestinationPath '%cd%\%DIST_DIR%\tracker-blocker-firefox.zip' -Force"

:: --- CHROME ---
echo [3/4] Preparando CHROME (Carpeta y ZIP)...
copy manifest_chrome.json "%CH_DIR%\manifest.json" >nul
copy background_chrome.js "%CH_DIR%\background.js" >nul
copy blocked.html "%CH_DIR%\blocked.html" >nul
copy blocked.js "%CH_DIR%\blocked.js" >nul
copy icon.png "%CH_DIR%\icon.png" >nul

powershell -Command "Compress-Archive -Path '%cd%\%CH_DIR%\*' -DestinationPath '%cd%\%DIST_DIR%\tracker-blocker-chrome.zip' -Force"

echo [4/4] Proceso finalizado con exito!
echo.
echo Carpetas listas para cargar (Descomprimidas):
echo - Firefox: %cd%\%FF_DIR%
echo - Chrome:  %cd%\%CH_DIR%
echo.
echo Archivos ZIP listos para subir:
echo - %cd%\%DIST_DIR%\tracker-blocker-firefox.zip
echo - %cd%\%DIST_DIR%\tracker-blocker-chrome.zip
echo ==========================================
pause
