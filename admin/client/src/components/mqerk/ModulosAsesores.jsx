import React from "react";
import { motion } from "framer-motion";

/** Iconos simples (SVG) */
const IconUsers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconTasks = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M8 9h8M8 13h8M8 17h5" />
    <path d="m6 9 .8.8L8.5 8" />
  </svg>
);

/** Tarjeta mejorada con animaciones */
function Card({ color, icon, title, subtitle, href = "#", onClick, delay = 0 }) {
  const colorMap = {
    amber: {
      gradient: "from-amber-500 to-orange-500",
      glow: "group-hover:shadow-amber-500/25",
      bgHover: "group-hover:bg-amber-50/50",
      text: "text-amber-600",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    violet: {
      gradient: "from-indigo-500 to-violet-500",
      glow: "group-hover:shadow-indigo-500/25",
      bgHover: "group-hover:bg-indigo-50/50",
      text: "text-indigo-600",
      iconBg: "bg-gradient-to-br from-indigo-500 to-violet-600",
    },
  }[color];

  const Container = onClick ? motion.button : motion.a;
  const extra = onClick ? { onClick, type: "button" } : { href };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative w-full rounded-2xl border border-slate-200/60 bg-white p-6 md:p-8 
                  shadow-sm transition-all duration-300
                  hover:border-slate-300 hover:shadow-xl ${colorMap.glow}
                  focus:outline-none focus:ring-2 focus:ring-slate-900/10`}
      {...extra}
    >
      {/* Fondo sutil animado */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ${colorMap.bgHover}`} />

      {/* Contenido */}
      <div className="relative z-10">
        {/* Icono con animación */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${colorMap.iconBg} 
                     shadow-lg shadow-black/10 text-white`}
        >
          {icon}
        </motion.div>

        {/* Título y subtítulo */}
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
          {title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* CTA con flecha animada */}
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 group-hover:gap-3 transition-all">
          <span className={`${colorMap.text}`}>Explorar área</span>
          <motion.svg
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`h-4 w-4 ${colorMap.text}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </motion.svg>
        </div>
      </div>

      {/* Gradiente decorativo en la esquina */}
      <div className={`absolute top-0 right-0 h-32 w-32 rounded-2xl bg-gradient-to-br ${colorMap.gradient} 
                      opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`} />
    </Container>
  );
}

/** Sección completa mejorada */
export default function AreasPrincipales() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      {/* Header minimalista */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-10 md:mb-14 text-center"
      >
        {/* Badge superior */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 
                     ring-1 ring-slate-200/60 shadow-sm mb-4"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="h-4 w-4 text-slate-600" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M4 4h16v6H4z" />
            <path d="M8 14h8" />
            <path d="M6 18h12" />
          </svg>
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Panel Principal
          </span>
        </motion.div>

        {/* Título principal */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3"
        >
          Áreas de Gestión
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto"
        >
          Administra y organiza todas las áreas de tu plataforma desde un solo lugar
        </motion.p>

        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"
        />
      </motion.div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 gap-5 md:gap-6 lg:gap-8 sm:grid-cols-2">
        <Card
          color="amber"
          icon={<IconUsers className="h-6 w-6" />}
          title="Asesores"
          subtitle="Gestión completa de asesores, contacto y seguimiento de actividades."
          href="/administrador_asesores/infotmacion"
          delay={0.6}
        />
        <Card
          color="violet"
          icon={<IconTasks className="h-6 w-6" />}
          title="Asignaciones"
          subtitle="Administra tareas, cursos y distribución de actividades de forma eficiente."
          href="/administrador_asesores/asignaciones"
          delay={0.7}
        />
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-3xl"
        />
      </div>
    </section>
  );
}