import mysql from 'mysql2/promise';
import 'dotenv/config';

function configFromUrl(value) {
  const u = new URL(value);
  return {
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: decodeURIComponent(u.pathname.replace(/^\//, ''))
  };
}

const baseConfig = process.env.DATABASE_URL
  ? configFromUrl(process.env.DATABASE_URL)
  : {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'quillo_aprende'
    };

export const pool = mysql.createPool({
  ...baseConfig,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 5),
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});
