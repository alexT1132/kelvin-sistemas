import path from "path";
import { fileURLToPath } from "url";
import { getPreviewById, getPreviewByCourse, createPreview, updatePreview, deletePreview } from "../models/previews.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Convierte arrays a JSON-string si llegan como arrays, y normaliza tipos */
function parseBody(body) {
  const J = (v) => (Array.isArray(v) ? JSON.stringify(v) : v ?? null);
  return {
    // EXACTAMENTE las claves que envía tu front
    course_id: Number(body.course_id),
    tagline: body.tagline ?? null,
    clases: body.clases ?? null,
    horas_dia: body.horas_dia ?? null,
    meta: body.meta ?? null,                    // 🔧 NUEVO
    price_now: Number(body.price_now ?? 0),
    price_before: Number(body.price_before ?? 0), // 🔧 NUEVO
    discount: Number(body.discount ?? 0),        // 🔧 NUEVO
    features: J(body.features),                  // JSON string
    desc_text: body.desc_text ?? null,
    learn_list: J(body.learn_list),              // JSON string
    areas_list: J(body.areas_list),              // JSON string
    plans: J(body.plans),                        // JSON string
    video_url: body.video_url ?? null,
    rating: Number(body.rating ?? 0),
  };
}

export async function getById(req, res) {
  const row = await getPreviewById(req.params.id);
  if (!row) return res.status(404).json({ message: "Preview no encontrada" });
  res.json(row);
}

/** Para tu loadByCourse(passedId) */
export async function getByCourse(req, res) {
  const row = await getPreviewByCourse(req.params.courseId);
  if (!row) return res.status(204).send();
  res.json(row);
}

export async function createOne(req, res) {
  const dto = parseBody(req.body);
  if (!dto.course_id) return res.status(400).json({ message: "course_id es requerido" });
  const row = await createPreview(dto);
  res.status(201).json(row);
}

export async function updateOne(req, res) {
  const { id } = req.params;
  const exists = await getPreviewById(id);
  if (!exists) return res.status(404).json({ message: "Preview no encontrada" });
  const dto = parseBody(req.body);
  const row = await updatePreview(id, dto);
  res.json(row);
}

export async function removeOne(req, res) {
  const { id } = req.params;
  await deletePreview(id);
  res.status(204).send();
}

export async function uploadVideoHandler(req, res) {
  // multer coloca el archivo en req.file
  if (!req.file) return res.status(400).json({ message: "No se recibió archivo de video" });

  // construye URL pública basada en /uploads
  const rel = path.join("uploads", "previews", req.file.filename).replace(/\\/g, "/");
  const url = `/${rel}`; // ejemplo: /uploads/previews/1719772233445_video.mp4

  // Si quisieras también guardar directo en la DB aquí, puedes aceptar course_id en query/body.
  // En la práctica, devolvemos la URL y el front la manda en video_url al crear/actualizar.
  return res.status(201).json({
    filename: req.file.filename,
    url,           // <-- úsala como video_url
    path: rel,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
}