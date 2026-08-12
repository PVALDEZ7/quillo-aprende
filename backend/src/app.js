import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './db.js';
import { auth, allow, comparePassword, hashPassword, signToken } from './auth.js';

const app = express();

const configuredOrigins = String(process.env.CORS_ORIGIN || '')
  .split(',')
  .map(x => x.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (!configuredOrigins.length || configuredOrigins.includes('*')) return callback(null, true);
    if (configuredOrigins.includes(origin)) return callback(null, true);
    if (process.env.ALLOW_VERCEL_PREVIEWS === 'true' && /^https:\/\/[^/]+\.vercel\.app$/i.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json({ limit: '1mb' }));

const normalizeQuestions = (items = []) => items.map(q => ({
  pregunta: String(q.pregunta || '').trim(),
  opciones: Array.isArray(q.opciones) ? q.opciones.map(x => String(x || '').trim()) : [],
  respuesta_correcta: String(q.respuesta_correcta || '').trim()
}));

function validQuestions(items) {
  const qs = normalizeQuestions(items);
  return qs.length === 3 && qs.every(q =>
    q.pregunta &&
    q.opciones.length === 4 &&
    q.opciones.every(Boolean) &&
    q.respuesta_correcta &&
    q.opciones.includes(q.respuesta_correcta)
  ) ? qs : null;
}

async function insertQuestions(conn, idMaterial, questions) {
  for (const q of questions) {
    await conn.query(
      'INSERT INTO retos_evaluaciones(id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(?,?,?,?,?,?,?)',
      [idMaterial, q.pregunta, q.opciones[0], q.opciones[1], q.opciones[2], q.opciones[3], q.respuesta_correcta]
    );
  }
}

app.get('/', (req, res) => res.json({ ok: true, service: 'Quillo Aprende API' }));
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'Quillo Aprende API' }));

app.get('/api/catalog', async (req, res, next) => {
  try {
    const [levels] = await pool.query('SELECT * FROM niveles ORDER BY id_nivel');
    const [areas] = await pool.query('SELECT * FROM areas ORDER BY id_area');
    const [subareas] = await pool.query('SELECT * FROM subareas ORDER BY id_subarea');
    res.json({ levels, areas, subareas });
  } catch (e) { next(e); }
});

app.get('/api/materials', async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.*, n.nombre nivel_nombre, a.nombre area_nombre, s.nombre subarea_nombre
      FROM materiales m
      JOIN niveles n ON n.id_nivel = m.id_nivel
      JOIN areas a ON a.id_area = m.id_area
      JOIN subareas s ON s.id_subarea = m.id_subarea
      WHERE m.activo = 1
      ORDER BY m.id_nivel, m.id_area, m.id_subarea, m.id_material
    `);
    res.json(rows);
  } catch (e) { next(e); }
});

app.get('/api/challenges', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM retos_evaluaciones WHERE id_material=? AND activo=1 ORDER BY id_pregunta LIMIT 3',
      [req.query.material_id]
    );
    res.json(rows.map(x => ({
      id_pregunta: x.id_pregunta,
      pregunta: x.pregunta,
      opciones: [x.opcion_a, x.opcion_b, x.opcion_c, x.opcion_d],
      respuesta_correcta: x.respuesta_correcta
    })));
  } catch (e) { next(e); }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email=? AND activo=1 LIMIT 1',
      [req.body.email]
    );
    const u = rows[0];
    if (!u || !comparePassword(req.body.password, u.password_hash)) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    res.json({
      token: signToken(u),
      user: { id_usuario: u.id_usuario, nombre: u.nombre, email: u.email, rol: u.rol }
    });
  } catch (e) { next(e); }
});

app.post('/api/materials', auth, allow('docente', 'admin'), async (req, res, next) => {
  const conn = await pool.getConnection();
  try {
    const x = req.body;
    const preguntas = validQuestions(x.preguntas);
    if (!preguntas) {
      return res.status(400).json({ message: 'Debes registrar exactamente 3 preguntas completas con 4 alternativas y una respuesta correcta.' });
    }
    await conn.beginTransaction();
    const [z] = await conn.query(
      'INSERT INTO materiales(titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(?,?,?,?,?,?,?,?)',
      [x.titulo, x.descripcion, x.contenido, x.ficha, x.id_nivel, x.id_area, x.id_subarea, req.user.sub]
    );
    await insertQuestions(conn, z.insertId, preguntas);
    await conn.commit();
    res.status(201).json({ id_material: z.insertId, preguntas: 3 });
  } catch (e) {
    await conn.rollback();
    next(e);
  } finally {
    conn.release();
  }
});

app.put('/api/materials/:id', auth, allow('docente', 'admin'), async (req, res, next) => {
  const conn = await pool.getConnection();
  try {
    const x = req.body;
    const preguntas = validQuestions(x.preguntas);
    if (!preguntas) {
      return res.status(400).json({ message: 'Debes registrar exactamente 3 preguntas completas con 4 alternativas y una respuesta correcta.' });
    }
    await conn.beginTransaction();
    await conn.query(
      'UPDATE materiales SET titulo=?,descripcion=?,contenido=?,ficha=?,id_nivel=?,id_area=?,id_subarea=? WHERE id_material=?',
      [x.titulo, x.descripcion, x.contenido, x.ficha, x.id_nivel, x.id_area, x.id_subarea, req.params.id]
    );
    await conn.query('DELETE FROM retos_evaluaciones WHERE id_material=?', [req.params.id]);
    await insertQuestions(conn, req.params.id, preguntas);
    await conn.commit();
    res.json({ ok: true, preguntas: 3 });
  } catch (e) {
    await conn.rollback();
    next(e);
  } finally {
    conn.release();
  }
});

app.delete('/api/materials/:id', auth, allow('docente', 'admin'), async (req, res, next) => {
  try {
    await pool.query('UPDATE materiales SET activo=0 WHERE id_material=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

app.get('/api/users', auth, allow('admin'), async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id_usuario,nombre,email,rol,activo,fecha_registro FROM usuarios WHERE activo=1 ORDER BY rol,nombre'
    );
    res.json(rows);
  } catch (e) { next(e); }
});

app.post('/api/users', auth, allow('admin'), async (req, res, next) => {
  try {
    const x = req.body;
    const [z] = await pool.query(
      "INSERT INTO usuarios(nombre,email,password_hash,rol) VALUES(?,?,?,'docente')",
      [x.nombre, x.email, hashPassword(x.password)]
    );
    res.status(201).json({ id_usuario: z.insertId });
  } catch (e) { next(e); }
});

app.put('/api/users/:id', auth, allow('admin'), async (req, res, next) => {
  try {
    const x = req.body;
    if (x.password) {
      await pool.query(
        "UPDATE usuarios SET nombre=?,email=?,password_hash=? WHERE id_usuario=? AND rol='docente'",
        [x.nombre, x.email, hashPassword(x.password), req.params.id]
      );
    } else {
      await pool.query(
        "UPDATE usuarios SET nombre=?,email=? WHERE id_usuario=? AND rol='docente'",
        [x.nombre, x.email, req.params.id]
      );
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

app.delete('/api/users/:id', auth, allow('admin'), async (req, res, next) => {
  try {
    await pool.query("UPDATE usuarios SET activo=0 WHERE id_usuario=? AND rol='docente'", [req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

app.get('/api/stats', auth, allow('admin'), async (req, res, next) => {
  try {
    const [[m]] = await pool.query('SELECT COUNT(*) materiales FROM materiales WHERE activo=1');
    const [[d]] = await pool.query("SELECT COUNT(*) docentes FROM usuarios WHERE rol='docente' AND activo=1");
    const [[p]] = await pool.query('SELECT COUNT(*) preguntas FROM retos_evaluaciones WHERE activo=1');
    res.json({ ...m, ...d, ...p });
  } catch (e) { next(e); }
});

app.use((e, req, res, next) => {
  console.error(e);
  if (e.message === 'Origen no permitido por CORS') {
    return res.status(403).json({ message: 'Origen no permitido' });
  }
  res.status(e.code === 'ER_DUP_ENTRY' ? 409 : 500).json({
    message: e.code === 'ER_DUP_ENTRY' ? 'El correo ya existe' : 'Error interno del servidor'
  });
});

export default app;
