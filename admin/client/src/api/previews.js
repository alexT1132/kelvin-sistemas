import axios from "./axios.js";

export const ObtenerPreviewRequest = (id) => axios.get(`/previews/${id}`);

export const createPreviewRequest = (curso) => axios.post('/previews', curso);

export const updatePreviewRequest = (id, curso) => axios.put(`/previews/${id}`, curso);

export const deletePreviewRequest = (id) => axios.delete(`/previews/${id}`);

// opcional: útil para cargar por course_id
export const getPreviewByCourseRequest = (courseId) => axios.get(`/previews/by-course/${courseId}`);

export const uploadPreviewVideoRequest = (file) => {
  const fd = new FormData();
  fd.append("video", file);
  
  return axios.post("/upload", fd, {
    timeout: 60000, 
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
};