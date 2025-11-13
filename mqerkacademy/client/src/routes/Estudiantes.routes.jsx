import { Routes, Route } from "react-router-dom";
import RegistroAlumno from "../pages/estudiantes/Registro";
import CreacionUsuario from "../pages/estudiantes/Usuario";
import Dashboard from "../pages/estudiantes/Dashboard";
import CursosActivos from "../pages/estudiantes/CursosActivos";
import Home from "../pages/estudiantes/Home";
import Miscursos from "../pages/estudiantes/MisCursos";

function MqerkRoutes() {
  return (
    <Routes>
        <Route path="/suscripcion" element={<RegistroAlumno />} />
        <Route path="/usuario" element={<CreacionUsuario />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cursos-activos" element={<CursosActivos />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mis-cursos" element={<Miscursos />} />
    </Routes>
  )
}

export default MqerkRoutes;