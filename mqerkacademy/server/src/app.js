import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cursosRoutes from './routes/cursos.routes.js';
import previewRoutes from './routes/preview.routes.js';
import path from "path";

const app = express();

app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:5001"],
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const root = process.cwd();

app.use('/uploads', express.static(path.join(root, 'uploads')));

app.use('/api', cursosRoutes);
app.use('/api', previewRoutes);

export default app;