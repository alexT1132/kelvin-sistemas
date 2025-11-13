// routes/preview.routes.js
import { Router } from "express";
import {
  getById,
  getByCourse,
  createOne,
  updateOne,
  removeOne,
  uploadVideoHandler,
} from "../controllers/preview.controller.js";
import { uploadPreviewVideo } from "../middlewares/uploadPreviewVideo.js";

const router = Router();

// CRUD json
router.get("/previews/:id", getById);

router.get("/previews/by-course/:courseId", getByCourse);

router.post("/previews", createOne);

router.put("/previews/:id", updateOne);

router.delete("/previews/:id", removeOne);

router.post("/upload", uploadPreviewVideo.single("video"), uploadVideoHandler);

export default router;
