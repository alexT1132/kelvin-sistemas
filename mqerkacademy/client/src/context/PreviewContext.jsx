// PreviewContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import {
  ObtenerPreviewRequest,
  createPreviewRequest,
  updatePreviewRequest,
  deletePreviewRequest,
  getPreviewByCourseRequest,
} from "../api/previews.js";

const PreviewContext = createContext();

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview debe estar dentro del proveedor PreviewContext");
  }
  return context;
};

export const PreviewProvider = ({ children }) => {
  const [preview, setPreview] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [errors, setErrors] = useState([]);

  // Obtener un preview por ID
  const getPreview = useCallback(async (id) => {
    try {
      const res = await ObtenerPreviewRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error al obtener preview"]);
    }
  }, []);

  // Obtener preview por course_id - ✅ Ahora con useCallback
  const loadByCourse = useCallback(async (courseId) => {
    try {
      const res = await getPreviewByCourseRequest(courseId);
      setPreview(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["No se encontró preview para este curso"]);
      throw error;
    }
  }, []);

  // Crear un nuevo preview
  const createPreview = useCallback(async (previewData) => {
    try {
      const res = await createPreviewRequest(previewData);
      setPreview(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error al crear preview"]);
      throw error;
    }
  }, []);

  // Actualizar un preview
  const updatePreview = useCallback(async (id, previewData) => {
    try {
      const res = await updatePreviewRequest(id, previewData);
      setPreview(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error al actualizar preview"]);
      throw error;
    }
  }, []);

  // Eliminar un preview
  const deletePreview = useCallback(async (id) => {
    try {
      await deletePreviewRequest(id);
      setPreview(null);
      setPreviews(previews.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error al eliminar preview"]);
      throw error;
    }
  }, [previews]);

  return (
    <PreviewContext.Provider
      value={{
        preview,
        previews,
        errors,
        setPreview,
        getPreview,
        loadByCourse,
        createPreview,
        updatePreview,
        deletePreview,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};