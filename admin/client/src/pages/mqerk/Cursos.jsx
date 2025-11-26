import { useState } from "react";
import { useLocation } from "react-router-dom";
import TopbarDash from "../../components/mqerk/TopbarDash";
import { SidebarRail, SidebarDrawer } from "../../components/mqerk/SidebarAdmin";
import FloatingSidebarButton from "../../components/mqerk/FloatingSidebarButton";
import CursosTable from "../../components/mqerk/Tablacursos";
import CourseWizardModal from "../../components/mqerk/CourseWizardModal";
import PreviewCursos from "../../components/mqerk/PreviewCursos";

function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();
  
  // Determinar si estamos en /dashboard para ajustar el padding
  const isDashboardRoute = location.pathname === "/dashboard";
  
  // Padding dinámico según la ruta
  const mainPadding = isDashboardRoute 
    ? "pt-[144px] md:pt-[168px]"  // Con panel de controles
    : "pt-14 md:pt-16";             // Sin panel de controles

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* 
        TopbarDash incluye:
        1. Barra superior purple (siempre visible)
        2. Panel de controles (solo en /dashboard)
      */}
      <TopbarDash title="Asesores Especializados en la Enseñanza de las Ciencias y Tecnología" />

      {/* Sidebar fijo para desktop - inicia debajo del topbar purple */}
      <SidebarRail />

      {/* 
        Contenido principal con padding dinámico:
        - md:ml-16 = margen izquierdo para el sidebar en desktop (64px)
        - Padding superior varía según la ruta:
          * /dashboard: pt-[144px] md:pt-[168px] (con panel)
          * Otras rutas: pt-14 md:pt-16 (sin panel)
      */}
      <main className={`md:ml-16 ${mainPadding} min-h-screen`}>
        <CursosTable />
        <PreviewCursos />
      </main>

      {/* Drawer móvil (overlay) - se abre desde la izquierda */}
      <SidebarDrawer open={openSidebar} onClose={() => setOpenSidebar(false)} />

      {/* Botón flotante solo móvil - abajo izquierda */}
      <FloatingSidebarButton
        open={openSidebar}
        onToggle={() => setOpenSidebar((v) => !v)}
      />
    </div>
  );
}

export default Dashboard;