import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import ChoiceModal from "../components/ChoiceModal";
import Mqerk from "../assets/mqerk/mqerk.png";
import Kelumy from "../assets/kelumy/kelumy_logo.png";
import VivirParaPensarMejor from "../assets/vivirparapensarmejor/logo.png";

function Index() {
  const [modalId, setModalId] = useState(null);
  const navigate = useNavigate();

  const modalConfig = {
    mqerk: {
      brand: "MQerkAcademy",
      icon: Mqerk,
      subtitle: "Elige el sitio que deseas administrar",
      color: "text-blue-600",
      gradier: "bg-gradient-to-r from-blue-700 to-sky-500",
      options: [
        {
          label: "Página Web",
          sublabel: "Visualizar y generar cambios de la página web",
          onClick: () => navigate('/rendimiento/pagina'),
        },
        {
          label: "Plataforma",
          sublabel: "Acceso completo a cursos",
          onClick: () => navigate('/dashboard'),
        },
      ],
    },
    kelumy: {
      brand: "Kelumy",
      icon: Kelumy,
      subtitle: "¿Qué deseas explorar?",
      color: "text-pink-600",
      gradier: "bg-gradient-to-r from-pink-700 to-rose-400",
      options: [
        {
          label: "Landing",
          sublabel: "Descripción del producto",
          onClick: () => window.open("https://kelumy.com", "_blank"),
        },
        {
          label: "Dashboard",
          sublabel: "Ingresar a la app",
          onClick: () => (window.location.href = "/kelumy/app"),
        },
      ],
    },
    filosofia: {
      brand: "Vivir para Pensar Mejor",
      icon: VivirParaPensarMejor,
      subtitle: "Selecciona una opción",
      color: "text-green-600",
      gradier: "bg-gradient-to-r from-green-700 to-green-500",
      options: [
        {
          label: "Blog",
          sublabel: "Artículos y recursos",
          onClick: () => window.open("https://blog.vppm.com", "_blank"),
        },
        {
          label: "Programa",
          sublabel: "Inicia tu proceso",
          onClick: () => (window.location.href = "/programa"),
        },
      ],
    },
  };

  const cfg = modalId ? modalConfig[modalId] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Topbar />
      
      {/* Contenedor principal con animación */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <Cards onOpenById={(id) => setModalId(id)} />
      </motion.main>

      {/* Modal con animación */}
      <AnimatePresence>
        {modalId && (
          <ChoiceModal
            open={!!modalId}
            onClose={() => setModalId(null)}
            brand={cfg?.brand}
            subtitle={cfg?.subtitle}
            icon={cfg?.icon}
            color={cfg?.color}
            gradier={cfg?.gradier}
            options={cfg?.options || []}
          />
        )}
      </AnimatePresence>

      {/* Elementos decorativos de fondo */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-400/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-400/20 to-transparent blur-3xl"
        />
      </div>
    </div>
  );
}

export default Index;