@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Primero ejecuta CONFIGURAR_WINDOWS.ps1 o npm install.
  pause
  exit /b 1
)
npm run dev
pause
