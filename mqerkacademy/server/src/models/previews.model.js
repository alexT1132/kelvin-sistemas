import { pool } from "../db.js";

export async function getPreviewById(id) {
  const [rows] = await pool.query("SELECT * FROM preview WHERE id=?", [id]);
  return rows[0] || null;
}

export async function getPreviewByCourse(course_id) {
  const [rows] = await pool.query("SELECT * FROM preview WHERE course_id=?", [course_id]);
  return rows[0] || null;
}

export async function createPreview(data) {
  const sql = `
    INSERT INTO preview (
      course_id, tagline, clases, horas_dia, meta,
      price_now, price_before, discount,
      features, desc_text, learn_list,
      areas_list, plans, video_url, rating
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.course_id,
    data.tagline,
    data.clases,
    data.horas_dia,
    data.meta,                      // 🔧 NUEVO
    Number(data.price_now ?? 0),
    Number(data.price_before ?? 0), // 🔧 NUEVO
    Number(data.discount ?? 0),     // 🔧 NUEVO
    data.features,                  // JSON string o NULL
    data.desc_text,
    data.learn_list,                // JSON string o NULL
    data.areas_list,                // JSON string o NULL
    data.plans,                     // JSON string o NULL
    data.video_url,
    Number(data.rating ?? 0),
  ];
  const [res] = await pool.query(sql, params);
  return await getPreviewById(res.insertId);
}

export async function updatePreview(id, data) {
  const sql = `
    UPDATE preview SET
      course_id=?,
      tagline=?,
      clases=?,
      horas_dia=?,
      meta=?,
      price_now=?,
      price_before=?,
      discount=?,
      features=?,
      desc_text=?,
      learn_list=?,
      areas_list=?,
      plans=?,
      video_url=?,
      rating=?,
      updated_at=NOW()
    WHERE id=?
  `;
  const params = [
    data.course_id,
    data.tagline,
    data.clases,
    data.horas_dia,
    data.meta,                      // 🔧 NUEVO
    Number(data.price_now ?? 0),
    Number(data.price_before ?? 0), // 🔧 NUEVO
    Number(data.discount ?? 0),     // 🔧 NUEVO
    data.features,
    data.desc_text,
    data.learn_list,
    data.areas_list,
    data.plans,
    data.video_url,
    Number(data.rating ?? 0),
    id,
  ];
  await pool.query(sql, params);
  return await getPreviewById(id);
}

export async function deletePreview(id) {
  await pool.query("DELETE FROM preview WHERE id=?", [id]);
}