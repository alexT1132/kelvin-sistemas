import { useState } from "react";
import TopbarDash from "../../components/mqerk/TopbarDash";
import { SidebarRail, SidebarDrawer } from "../../components/mqerk/SidebarAdmin";
import FloatingSidebarButton  from "../../components/mqerk/FloatingSidebarButton";
import CursosTable from "../../components/mqerk/Tablacursos";
import CourseWizardModal from "../../components/mqerk/CourseWizardModal";
import PreviewCursos from "../../components/mqerk/PreviewCursos";

function Dashboard() {

    const [openSidebar, setOpenSidebar] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (values) => {
        createCourse(values);
        setOpen(false);
    };

    const onEdit = (c) => console.log("editar", c);
    const onDelete = (c) => console.log("eliminar", c);
    const onView = (c) => console.log("ver", c);

  return (
    <div>
        <TopbarDash
            title="Asesores Especializados en la Enseñanza de las Ciencias y Tecnología"
        />
        <CourseWizardModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
        <div className="min-h-screen py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <CursosTable onEdit={onEdit} onDelete={onDelete} onView={onView} />
                <PreviewCursos />
            </div>
        </div>
        <div className="flex flex-1">
            <SidebarRail />

            {/* Drawer móvil */}
            <SidebarDrawer open={openSidebar} onClose={() => setOpenSidebar(false)} />

            {/* FAB flotante solo móvil */}
            <FloatingSidebarButton
                open={openSidebar}
                onToggle={() => setOpenSidebar((v) => !v)}
            />
            
        </div>
    </div>
  )
}

export default Dashboard