import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  createPreviewRequest,
  updatePreviewRequest,
  deletePreviewRequest,
  getPreviewByCourseRequest,
  uploadPreviewVideoRequest
} from "../api/previews.js";

// Estructura estándar que mandaremos al backend
const emptyPreview = {
  course_id: null,
  tagline: "",
  clases: "",
  horas_dia: "",
  meta: "",
  duration: null,
  durationUnit: "",
  price_now: 0,
  price_before: 0,
  discount: 0,
  features: [],
  video_url: "",
  desc_text: "",
  learn_list: [],
  areas_list: [],
  plans: [],
  rating: 0,
};

const PreviewContext = createContext(null);

export function PreviewProvider({ children }) {
  const [preview, setPreview] = useState(emptyPreview);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  const reset = useCallback(() => {
    setPreview(emptyPreview);
    setPreviewId(null);
    setError(null);
    setLoading(false);
  }, []);

  // Función helper para parsear arrays JSON
  const safeParse = useCallback((value) => {
    if (value == null || value === "") return [];
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  // Cargar preview por course_id
  const loadByCourse = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPreviewByCourseRequest(courseId);
      const data = res.data || {};
      
      // CRÍTICO: Guardar el ID del preview si existe
      if (data.id) {
        setPreviewId(data.id);
        console.log("Preview encontrado con ID:", data.id);
        console.log("Datos recibidos:", data); // 🔍 Para debug
      } else {
        setPreviewId(null);
        console.log("No hay preview existente, se creará uno nuevo");
      }
      
      // Parsear los campos JSON
      const parsed = {
        ...data,
        course_id: data.course_id || courseId,
        tagline: data.tagline ?? "",
        clases: data.clases ?? "",
        horas_dia: data.horas_dia ?? "",
        meta: data.meta ?? "", // 🔧 Asegurar que meta se capture
        price_now: Number(data.price_now ?? 0),
        price_before: Number(data.price_before ?? 0),
        discount: Number(data.discount ?? 0),
        desc_text: data.desc_text ?? "",
        video_url: data.video_url ?? "",
        rating: Number(data.rating ?? 0),
        features: safeParse(data.features),
        learn_list: safeParse(data.learn_list),
        areas_list: safeParse(data.areas_list),
        plans: safeParse(data.plans),
      };
      
      console.log("Preview parseado:", parsed); // 🔍 Para verificar
      setPreview(parsed);
      return parsed;
    } catch (err) {
      // Si no existe preview (404), no es un error fatal
      console.log("No hay preview existente para este curso:", courseId);
      setPreview({ ...emptyPreview, course_id: courseId });
      setPreviewId(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [safeParse]);

  // Cargar preview por ID específico
  const loadById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getPreviewByCourseRequest(id);
      if (data.id) {
        setPreviewId(data.id);
      }
      setPreview(normalizeFromApi(data));
      return data;
    } catch (e) {
      setError(msgFromAxios(e));
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Subir video al servidor
  const uploadVideo = useCallback(async (file) => {
    try {
      const { data } = await uploadPreviewVideoRequest(file);
      // Actualizar el preview con la URL del video
      setPreview((prev) => ({ ...prev, video_url: data.url }));
      return data.url;
    } catch (err) {
      console.error("Error subiendo video:", err);
      throw err;
    }
  }, []);

  // Guardar (crear o actualizar) preview
  const save = useCallback(async (payload) => {
    const body = toApi({ ...preview, ...payload });
    setLoading(true);
    setError(null);
    
    try {
      // Si hay previewId, hacemos UPDATE, sino CREATE
      if (previewId) {
        console.log("🔄 Actualizando preview existente:", previewId);
        const { data } = await updatePreviewRequest(previewId, body);
        setPreviewId(data.id);
        setPreview(normalizeFromApi(data));
        console.log("✅ Preview actualizado:", data.id);
        return { ok: true, id: data.id };
      } else {
        console.log("➕ Creando nuevo preview");
        const { data } = await createPreviewRequest(body);
        setPreviewId(data.id);
        setPreview(normalizeFromApi(data));
        console.log("✅ Preview creado:", data.id);
        return { ok: true, id: data.id };
      }
    } catch (e) {
      const errorMsg = msgFromAxios(e);
      console.error("❌ Error guardando preview:", errorMsg);
      setError(errorMsg);
      return { ok: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [preview, previewId]);

  // Eliminar preview
  const remove = useCallback(async () => {
    if (!previewId) return { ok: true };
    setLoading(true);
    setError(null);
    try {
      await deletePreviewRequest(previewId);
      reset();
      return { ok: true };
    } catch (e) {
      setError(msgFromAxios(e));
      return { ok: false, error: msgFromAxios(e) };
    } finally {
      setLoading(false);
    }
  }, [previewId, reset]);

  const value = useMemo(() => ({
    preview,
    setPreview,
    previewId,
    loading,
    error,
    loadByCourse,
    loadById,
    save,
    remove,
    reset,
    uploadVideo,
  }), [preview, previewId, loading, error, loadByCourse, loadById, save, remove, reset, uploadVideo]);

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("usePreview debe usarse dentro de <PreviewProvider>");
  return ctx;
}

/* ================ HELPERS ================ */

// Extraer mensaje de error de Axios
function msgFromAxios(e) {
  return e?.response?.data?.message || e?.message || "Error inesperado";
}

// Normalizar datos que vienen de la API
function normalizeFromApi(row) {
  const parse = (v) => {
    if (v == null) return [];
    if (Array.isArray(v)) return v;
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  
  return {
    id: row.id,
    course_id: row.course_id,
    tagline: row.tagline ?? "",
    clases: row.clases ?? "",
    horas_dia: row.horas_dia ?? "",
    meta: row.meta ?? "",
    price_now: Number(row.price_now ?? 0),
    price_before: Number(row.price_before ?? 0),
    discount: Number(row.discount ?? 0),
    features: parse(row.features),
    desc_text: row.desc_text ?? "",
    learn_list: parse(row.learn_list),
    areas_list: parse(row.areas_list),
    plans: parse(row.plans),
    video_url: row.video_url ?? "",
    rating: Number(row.rating ?? 0),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// Preparar datos para enviar a la API
function toApi(view) {
  const str = (v) => {
    if (Array.isArray(v)) return JSON.stringify(v);
    if (typeof v === 'string') return v;
    return null;
  };
  
  return {
    course_id: view.course_id,
    tagline: view.tagline ?? "",
    clases: view.clases ?? "",
    horas_dia: view.horas_dia ?? "",
    meta: view.meta ?? "",
    price_now: Number(view.price_now ?? 0),
    price_before: Number(view.price_before ?? 0),
    discount: Number(view.discount ?? 0),
    features: str(view.features),
    desc_text: view.desc_text ?? "",
    learn_list: str(view.learn_list),
    areas_list: str(view.areas_list),
    plans: str(view.plans),
    video_url: view.video_url ?? "",
    rating: Number(view.rating ?? 0),
  };
}

// Función exportada para usar en otros componentes
export function safeParseArray(value) {
  if (value == null || value === "") return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}