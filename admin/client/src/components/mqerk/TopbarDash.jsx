import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import LogoBlanco from "../../assets/MQerK_logo.png";

export default function TopbarDash({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mostrar el panel de controles solo en /dashboard
  const showControlPanel = location.pathname === "/dashboard";

  return (
    <>
      {/* Barra superior purple - sticky */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-700 shadow-lg"
      >
        <div className="relative flex h-full items-center px-4 md:px-6 lg:px-8 max-w-[1920px] mx-auto">
          {/* Botón de regresar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/administrador")}
            aria-label="Regresar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg 
                       bg-white/10 backdrop-blur-sm border border-white/20
                       hover:bg-white/20 hover:border-white/30 transition-all duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg 
              className="h-5 w-5 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Logo */}
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            src={LogoBlanco}
            alt="Logo MQerkAcademy"
            className="hidden md:block h-8 w-auto object-contain lg:h-9 drop-shadow-md cursor-pointer ml-3"
            onClick={() => navigate("/administrador")}
          />

          {/* Título centrado */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 px-4 md:px-8"
          >
            <h1 className="text-center text-sm md:text-base lg:text-lg font-semibold text-white tracking-tight leading-tight truncate">
              {title}
            </h1>
          </motion.div>

          {/* Avatar */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Usuario"
            className="relative inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full 
                       bg-white/20 backdrop-blur-sm border border-white/40
                       transition-all duration-300 hover:bg-white/30 hover:border-white/60
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
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
          </motion.button>
        </div>
      </motion.header>

      {/* Panel de controles - SOLO en /dashboard */}
      {showControlPanel && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="fixed top-14 md:top-16 left-0 md:left-16 right-0 z-40 bg-white border-b border-slate-200 shadow-sm"
        >
          <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 md:py-5">
              {/* Título del panel */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-md flex-shrink-0">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">Panel General — MQerKAcademy</h2>
                  <p className="text-sm text-slate-500 hidden md:block">Asesores Especializados en la Enseñanza de las Ciencias y Tecnología</p>
                </div>
              </div>

              {/* Controles */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <button className="px-3 md:px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  Reporte mensual
                </button>
                <button className="px-3 md:px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  Reporte anual
                </button>
                <button className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="hidden sm:inline">Calendario</span>
                </button>
                <button className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="hidden sm:inline">Alertas</span>
                </button>
                <button className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <span className="hidden lg:inline">Buscar sección...</span>
                </button>
                <select 
                  className="px-3 md:px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}