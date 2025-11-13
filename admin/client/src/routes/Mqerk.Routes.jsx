import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "../pages/Index";
import LoginAdmin from "../pages/Login";
import PaginaRendimiento from "../pages/mqerk/PaginaDash";
import DashboardMqerk from "../pages/mqerk/Dashboard";
import Cursos from "../pages/mqerk/Cursos";
import Plantillapreview from "../pages/mqerk/PlantillaPreview";
import Asesores from "../pages/mqerk/Asesores";
import InfoAsesores from "../pages/mqerk/InfoAsesores";
import AsignacionAsesores from "../pages/mqerk/AsignacionAsesores";
import { CursosProvider } from "../context/mqerk/CursosContext";
import { PreviewProvider } from "../context/mqerk/PreviewContext";

function MqerkRoutes() {
  return (
    <BrowserRouter>
      <PreviewProvider>
        <CursosProvider>
          <Routes>
            <Route index path="/" element={<LoginAdmin />} />
            <Route index path="/administrador" element={<Index />} />
            <Route path="/rendimiento/pagina" element={<PaginaRendimiento />} />
            <Route path="/dashboard" element={<DashboardMqerk />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/previews/nuevo" element={<Plantillapreview />} />
            <Route path="/previews/:id" element={<Plantillapreview />} />
            <Route path="/asesores" element={<Asesores />} />
            <Route path="/asesores/informacion" element={<InfoAsesores />} />
            <Route path="/asesores/asignacion" element={<AsignacionAsesores />} />
          </Routes>
        </CursosProvider>
      </PreviewProvider>
    </BrowserRouter>
  )
}

export default MqerkRoutes;