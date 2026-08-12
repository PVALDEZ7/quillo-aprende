$ErrorActionPreference = "Stop"
Write-Host "Configurando Quillo Aprende..." -ForegroundColor Cyan

if (-not (Test-Path "backend/.env")) {
    Copy-Item "backend/.env.example" "backend/.env"
    Write-Host "Creado backend/.env" -ForegroundColor Green
}

if (-not (Test-Path "frontend/.env")) {
    Copy-Item "frontend/.env.example" "frontend/.env"
    Write-Host "Creado frontend/.env" -ForegroundColor Green
}

Write-Host "Instalando dependencias del proyecto..." -ForegroundColor Yellow
npm install

Write-Host "" 
Write-Host "Instalacion terminada." -ForegroundColor Green
Write-Host "1) Abre backend/.env y coloca tu clave de MySQL en DB_PASSWORD." -ForegroundColor White
Write-Host "2) En MySQL Workbench ejecuta database/01_schema.sql y luego database/02_seed.sql." -ForegroundColor White
Write-Host "3) Ejecuta: npm run dev" -ForegroundColor White
