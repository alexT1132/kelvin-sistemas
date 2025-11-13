import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WebRoutes from "./routes/Web.routes";
import AdministrativoRoutes from "./routes/Administrativo.routes";
import EstudiantesRoutes from "./routes/Estudiantes.routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Web (públicas) */}
        <Route path="/*" element={<WebRoutes />} />
        
        {/* Rutas Administrativas */}
        <Route path="/administrativo/*" element={<AdministrativoRoutes />} />

        {/* Rutas para Estudiantes */}
        <Route path="/estudiantes/*" element={<EstudiantesRoutes />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;