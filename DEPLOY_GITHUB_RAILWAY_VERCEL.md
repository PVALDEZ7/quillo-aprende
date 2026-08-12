# Quillo Aprende — GitHub + MySQL Railway + Vercel

Esta versión está preparada para trabajar con:

- **GitHub:** repositorio del código.
- **Railway MySQL:** base de datos remota.
- **Vercel Backend:** API Express.
- **Vercel Frontend:** React + Vite.

Se recomienda crear **dos proyectos en Vercel desde el mismo repositorio GitHub**:

1. `quillo-aprende-api` con **Root Directory = `backend`**.
2. `quillo-aprende` con **Root Directory = `frontend`**.

La base de datos queda en Railway y ambos proyectos Vercel se comunican usando variables de entorno.

---

## 1. Verificar el proyecto local

Ruta de trabajo:

```powershell
cd "C:\Users\PEDRO TECH\Desktop\IDAT-III\Desarrollo de Interfaces 2\BLOQUE II"
```

Ejecutar:

```powershell
npm run dev
```

Verificar antes de publicar:

- Estudiante visualiza materiales.
- Docente inicia sesión y registra material + 3 preguntas.
- Administrador crea cuentas docentes.
- Las fichas se descargan en PDF.

---

## 2. Subir a GitHub

Antes de continuar, asegúrate de que **ningún archivo `.env` real se suba**. El `.gitignore` ya está preparado para ignorarlos.

Desde PowerShell:

```powershell
cd "C:\Users\PEDRO TECH\Desktop\IDAT-III\Desarrollo de Interfaces 2\BLOQUE II"
git init
git add .
git commit -m "Proyecto Quillo Aprende listo para despliegue"
git branch -M main
```

En GitHub crea un repositorio vacío, por ejemplo `quillo-aprende`, **sin README, sin .gitignore y sin licencia**.

Después copia la URL HTTPS del repositorio y ejecuta:

```powershell
git remote add origin https://github.com/TU_USUARIO/quillo-aprende.git
git push -u origin main
```

Si `origin` ya existe:

```powershell
git remote set-url origin https://github.com/TU_USUARIO/quillo-aprende.git
git push -u origin main
```

---

## 3. Crear MySQL en Railway

En Railway:

1. Crear un proyecto nuevo.
2. Elegir **New → Database → MySQL**.
3. Esperar a que el servicio MySQL esté activo.
4. En el servicio MySQL abrir **Settings → Networking → Public Access**.
5. Railway generará una conexión pública/TCP Proxy.
6. Guardar los datos de conexión o `MYSQL_PUBLIC_URL`.

La URL tendrá una forma parecida a:

```text
mysql://usuario:password@host:puerto/base
```

**No publiques esa URL ni la subas a GitHub.**

---

## 4. Llevar tu base local a Railway

La opción recomendada es conservar los docentes, materiales y preguntas que ya registraste localmente.

### Exportar con MySQL Workbench

En la conexión local:

1. Abrir **Server → Data Export**.
2. Seleccionar `quillo_aprende` y todas sus tablas.
3. Elegir **Export to Self-Contained File**.
4. Guardar como `quillo_aprende_backup.sql` en una carpeta privada.
5. Pulsar **Start Export**.

### Conectar Workbench a Railway

Crear una nueva conexión MySQL en Workbench usando los valores públicos de Railway:

- Hostname: host público de Railway.
- Port: puerto público de Railway.
- Username: usuario de Railway.
- Password: contraseña de Railway.

Después entra a esa conexión remota.

### Importar

Si deseas conservar exactamente el esquema `quillo_aprende`, crea primero la base remota:

```sql
CREATE DATABASE IF NOT EXISTS quillo_aprende
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

En Workbench usa **Server → Data Import**, elige el archivo `quillo_aprende_backup.sql`, selecciona `quillo_aprende` como esquema destino cuando Workbench lo solicite y ejecuta **Start Import**.

Después abre `database/03_verificar_nube.sql` para comprobar los conteos.

Si prefieres comenzar desde los datos iniciales y no conservar cambios locales, puedes ejecutar en la conexión Railway:

1. `database/01_schema.sql`
2. `database/02_seed.sql`

---

## 5. Crear el BACKEND en Vercel

Importa el repositorio GitHub en Vercel.

Configura:

```text
Project Name: quillo-aprende-api
Root Directory: backend
Framework Preset: Other / Express (detección automática)
```

Agrega estas variables de entorno en Vercel:

```env
DATABASE_URL=mysql://USUARIO:PASSWORD@HOST:PUERTO/quillo_aprende
JWT_SECRET=UNA_CLAVE_LARGA_Y_PRIVADA
DB_CONNECTION_LIMIT=5
CORS_ORIGIN=*
ALLOW_VERCEL_PREVIEWS=true
```

Para `DATABASE_URL` puedes usar la URL pública de Railway, cambiando el nombre final de la base a `quillo_aprende` si importaste los datos en ese esquema.

Despliega.

Cuando termine, prueba en el navegador:

```text
https://TU-BACKEND.vercel.app/api/health
```

Debe responder algo parecido a:

```json
{"ok":true,"service":"Quillo Aprende API"}
```

---

## 6. Crear el FRONTEND en Vercel

Desde el mismo repositorio GitHub crea otro proyecto Vercel.

Configura:

```text
Project Name: quillo-aprende
Root Directory: frontend
Framework Preset: Vite
```

Agrega la variable:

```env
VITE_API_URL=https://TU-BACKEND.vercel.app/api
```

Despliega.

Cuando termine tendrás una URL similar a:

```text
https://quillo-aprende.vercel.app
```

---

## 7. Cerrar CORS después del primer despliegue

Cuando ya conozcas la URL definitiva del frontend, vuelve al proyecto **backend** en Vercel y cambia:

```env
CORS_ORIGIN=*
```

por:

```env
CORS_ORIGIN=https://TU-FRONTEND.vercel.app
```

Después realiza un nuevo deployment del backend.

Si quieres que los Preview Deployments de Vercel también funcionen, deja:

```env
ALLOW_VERCEL_PREVIEWS=true
```

---

## 8. Prueba final en Internet

Desde la URL pública prueba en este orden:

1. Área Estudiante → abrir material → responder reto → descargar PDF.
2. Docente → iniciar sesión → registrar un material nuevo con 3 preguntas.
3. Volver a Estudiante → comprobar que aparece el material nuevo.
4. Administrador → crear una nueva cuenta docente.
5. Cerrar sesión → entrar con esa cuenta docente.
6. Refrescar la página y confirmar que los datos siguen ahí.

Si todo eso funciona, React, Express, Vercel y MySQL Railway están correctamente integrados.

---

## 9. Cómo actualizar después

Después de cambiar archivos en tu PC:

```powershell
cd "C:\Users\PEDRO TECH\Desktop\IDAT-III\Desarrollo de Interfaces 2\BLOQUE II"
git add .
git commit -m "Actualización Quillo Aprende"
git push
```

Vercel detectará el push y desplegará los proyectos conectados al repositorio.

Los materiales, docentes y preguntas creados desde la propia plataforma **no requieren hacer git push**, porque quedan almacenados directamente en MySQL Railway.

---

## Seguridad importante

Nunca subas a GitHub:

- `backend/.env`
- `frontend/.env`
- `DATABASE_URL`
- contraseña de MySQL
- `JWT_SECRET`

Guarda esos valores únicamente en tu PC y en **Vercel → Settings → Environment Variables**.
