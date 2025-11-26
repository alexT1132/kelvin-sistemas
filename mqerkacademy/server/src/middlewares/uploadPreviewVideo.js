// middlewares/uploadPreviewVideo.js
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 CORREGIDO para tu estructura: server/src/middlewares/ → server/uploads/
// Subimos 2 niveles: ../ (sale de middlewares) ../ (sale de src)
const PREVIEWS_DIR = path.join(__dirname, "../../", "uploads", "previews");

console.log("🔍 __dirname:", __dirname);
console.log("🔍 PREVIEWS_DIR:", PREVIEWS_DIR);

// Asegura que exista la carpeta
if (!fs.existsSync(PREVIEWS_DIR)) {
  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
  console.log("✅ Carpeta de previews creada:", PREVIEWS_DIR);
} else {
  console.log("✅ Carpeta de previews ya existe:", PREVIEWS_DIR);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    console.log("📁 Guardando video en:", PREVIEWS_DIR);
    cb(null, PREVIEWS_DIR);
  },
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/\s+/g, "_").replace(/[^\w.\-]/g, "");
    const filename = `${ts}_${safe}`;
    console.log("📝 Nombre del archivo:", filename);
    cb(null, filename);
  },
});

const fileFilter = (_req, file, cb) => {
  console.log("🔍 Validando tipo de archivo:", file.mimetype);
  
  // Validar que sea un video compatible
  const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  
  if (validTypes.includes(file.mimetype)) {
    console.log("✅ Tipo de video válido");
    cb(null, true);
  } else {
    console.log("❌ Tipo de video no válido:", file.mimetype);
    cb(new Error(`Solo se permiten videos MP4, WebM, OGG. Recibido: ${file.mimetype}`), false);
  }
};

export const uploadPreviewVideo = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 500 * 1024 * 1024 // 500MB
  },
});

// 🔧 HELPER: Función para obtener la ruta relativa correcta
export const getVideoRelativePath = (filename) => {
  // Retorna la ruta relativa desde la carpeta uploads
  return `uploads/previews/${filename}`;
};