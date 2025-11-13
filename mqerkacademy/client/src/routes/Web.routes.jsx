import { Routes, Route } from "react-router-dom";
import Index from "../pages/web/Web";
import LoginPage from "../pages/web/Login";
import PreviewsPage from "../pages/web/Previews.jsx";
import { CursosProvider } from "../context/CursosContext.jsx";
import { PreviewProvider } from "../context/PreviewContext.jsx";

function MqerkRoutes() {
  return (
      <CursosProvider>
        <PreviewProvider>
          <Routes>
              <Route index path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/:slug" element={<PreviewsPage />} />
          </Routes>
        </PreviewProvider>
      </CursosProvider>
  )
}

export default MqerkRoutes;