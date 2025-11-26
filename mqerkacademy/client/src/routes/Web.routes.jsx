import { Routes, Route } from "react-router-dom";
import Index from "../pages/web/Web";
// import MantenimientoPage from "../pages/web/Mantenimiento.jsx";
import LoginPage from "../pages/web/Login";
import IndexPage from "../pages/web/Index.jsx";
import TerminosPage from "../pages/web/T&C.jsx";
import PoliticasPage from "../pages/web/Politicas.jsx";
import Acercade from "../pages/web/About.jsx";
import BlogPage from "../pages/web/Blog.jsx";
import PreviewsPage from "../pages/web/Previews.jsx";
import PreregistroAsesor from "../pages/asesores/Registro.jsx";
import TestAsesor from "../pages/asesores/InicioTest.jsx";
import CredencialesAsesor from "../pages/asesores/Credenciales.jsx";
import { CursosProvider } from "../context/CursosContext.jsx";
import { PreviewProvider } from "../context/PreviewContext.jsx";

function MqerkRoutes() {
  return (
      <CursosProvider>
        <PreviewProvider>
          <Routes>
              {/* INICIO PAGINA WEB */}
              {/* <Route index path="/" element={<MantenimientoPage />} /> */}
              <Route index path="/" element={<Index />} />
              <Route path="/index" element={<IndexPage />} />
              <Route path="/terminos_y_condiciones" element={<TerminosPage />} />
              <Route path="/politicas_de_privacidad" element={<PoliticasPage />} />
              <Route path="/acerca_de" element={<Acercade />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/:courseId" element={<PreviewsPage />} />
              {/* FINAL PAGINA WEB */}
              
              {/* INICIO REGISTRO ASESOR */}
              <Route path="/pre-registro" element={<PreregistroAsesor />} />
              <Route path="/test-asesor" element={<TestAsesor />} />
              <Route path="/credenciales" element={<CredencialesAsesor />} />
              {/* FINAL REGISTRO ASESOR */}
          </Routes>
        </PreviewProvider>
      </CursosProvider>
  )
}

export default MqerkRoutes;