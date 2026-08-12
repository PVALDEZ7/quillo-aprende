# Quillo Aprende

Plataforma web educativa con React/Vite, Express y MySQL.

## Funcionalidades

- Estudiante: contenidos por nivel/área/subárea, retos de 3 preguntas y fichas PDF.
- Docente: CRUD de materiales y registro/edición de 3 preguntas por material.
- Administrador: gestión de cuentas docentes y estadísticas.
- MySQL: persistencia de usuarios, materiales, niveles, áreas, subáreas y preguntas.

## Desarrollo local

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:3001`

## Configuración local

Crear `backend/.env` a partir de `backend/.env.example` y `frontend/.env` a partir de `frontend/.env.example`.

## Despliegue

Leer `DEPLOY_GITHUB_RAILWAY_VERCEL.md`.

La estructura está preparada para desplegar desde un solo repositorio GitHub como dos proyectos Vercel:

- `backend/` → API Express.
- `frontend/` → Vite.

La base MySQL se aloja externamente, por ejemplo en Railway, y el backend acepta `DATABASE_URL` para la conexión de producción.
