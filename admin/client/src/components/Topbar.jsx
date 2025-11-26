import { motion } from "framer-motion";
import LogoBlanco from "../assets/MQerK_logo.png";

export default function Topbar({
  title = "Asesores Especializados en la Enseñanza de las Ciencias y Tecnología",
}) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
    >
      {/* Fondo con gradiente */}
      <div className="relative h-14 md:h-16 bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 shadow-lg">
        
        <div className="relative flex h-full items-center px-4 md:px-6 lg:px-8 max-w-[1920px] mx-auto">
          {/* Logo con animación */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              src={LogoBlanco}
              alt="Logo MQerkAcademy"
              className="h-8 w-auto object-contain md:h-9 drop-shadow-md"
            />
          </motion.div>

          {/* Título centrado */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 px-4 md:px-8"
          >
            <h1 className="text-center text-sm md:text-base lg:text-lg font-semibold text-white tracking-tight leading-tight">
              {title}
            </h1>
          </motion.div>

          {/* Avatar con efecto hover mejorado */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Usuario"
            className="group relative flex-shrink-0 inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full 
                       bg-white/20 backdrop-blur-sm border border-white/40
                       transition-all duration-300 hover:bg-white/30 hover:border-white/60
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {/* Icono */}
            <svg 
              viewBox="0 0 24 24" 
              className="h-5 w-5 text-white" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
              <path d="M4 20a8 8 0 1116 0" />
            </svg>

            {/* Badge de notificación */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-fuchsia-500 border-2 border-white"></span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}