import { Routes, Route } from "react-router-dom";
import DashboardAdministrativo from "../pages/administrativo/Dashboard";
import AdministrativoPanel from "../pages/administrativo/Panel";
import Comprobantes from "../pages/administrativo/Comprobantes";

function MqerkRoutes() {
  return (
    <Routes>
        <Route index path="/" element={<DashboardAdministrativo />} />
        <Route path="/dashboard" element={<AdministrativoPanel />} />
        <Route path="/comprobantes" element={<Comprobantes />} />
    </Routes>
  )
}

export default MqerkRoutes;