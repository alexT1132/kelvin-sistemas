import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mqerkacademy_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true
});

export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
