// middlewares/uploadPreviewVideo.js
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREVIEWS_DIR = path.join(__dirname, "..", "uploads", "previews");

// asegura que exista la carpeta
if (!fs.existsSync(PREVIEWS_DIR)) {
  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PREVIEWS_DIR),
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/\s+/g, "_").replace(/[^\w.\-]/g, "");
    cb(null, `${ts}_${safe}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("video/")) cb(null, true);
  else cb(new Error("Solo se permiten archivos de video"), false);
};

export const uploadPreviewVideo = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 500 * 1024 * 1024 // 🔧 500MB (aumentado desde 200MB)
  },
});