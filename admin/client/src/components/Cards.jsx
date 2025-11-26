import { motion } from "framer-motion";
import Mqerk from "../assets/mqerk/mqerk.png";
import Kelumy from "../assets/kelumy/kelumy_logo.png";
import VivirParaPensarMejor from "../assets/vivirparapensarmejor/logo.png";

export default function Cards({ onOpenById }) {
  const cards = [
    {
      id: "mqerk",
      title: "MQerkAcademy",
      desc: "Plataforma educativa innovadora para el desarrollo de habilidades digitales y tecnológicas del futuro.",
      cta: "Administrar sitio",
      logo: Mqerk,
      color: "blue",
    },
    {
      id: "kelumy",
      title: "Kelumy",
      desc: "Solución integral para la gestión y optimización de procesos empresariales con tecnología de vanguardia.",
      cta: "Administrar sitio",
      logo: Kelumy,
      color: "pink",
    },
    {
      id: "filosofia",
      title: "Vivir para Pensar Mejor",
      desc: "Filosofía de vida enfocada en el desarrollo del pensamiento crítico y la mejora continua personal.",
      cta: "Administrar sitio",
      logo: VivirParaPensarMejor,
      color: "green",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header de sección */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14"
      >

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
        >
          Gestiona tus Proyectos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto"
        >
          Accede y administra todas tus plataformas desde un solo lugar
        </motion.p>
      </motion.div>

      {/* Grid de tarjetas */}
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, index) => (
          <Card key={c.id} {...c} onClick={() => onOpenById(c.id)} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}

function Card({ title, desc, cta, logo, color = "blue", onClick, delay = 0 }) {
  const colors = {
    blue: {
      gradient: "from-blue-500 to-sky-500",
      ring: "ring-blue-100",
      text: "text-blue-900",
      bgCard: "bg-blue-50/50",
      iconBg: "bg-gradient-to-br from-blue-500 to-sky-600",
      glow: "group-hover:shadow-blue-500/20",
      hoverBg: "group-hover:bg-blue-50",
    },
    pink: {
      gradient: "from-pink-500 to-rose-500",
      ring: "ring-pink-100",
      text: "text-pink-900",
      bgCard: "bg-pink-50/50",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
      glow: "group-hover:shadow-pink-500/20",
      hoverBg: "group-hover:bg-pink-50",
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      ring: "ring-green-100",
      text: "text-green-900",
      bgCard: "bg-green-50/50",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      glow: "group-hover:shadow-green-500/20",
      hoverBg: "group-hover:bg-green-50",
    },
  };

  const c = colors[color] || colors.blue;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-2xl bg-white p-6 md:p-7 
                  shadow-md ring-1 ${c.ring} transition-all duration-300
                  hover:shadow-xl ${c.glow} cursor-pointer`}
      onClick={onClick}
    >
      {/* Fondo sutil animado */}
      <div className={`absolute inset-0 ${c.bgCard} opacity-0 transition-opacity duration-300 ${c.hoverBg}`} />

      {/* Contenido */}
      <div className="relative z-10">
        {/* Header con logo */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${c.text} mb-1 group-hover:scale-105 transition-transform origin-left`}>
              {title}
            </h3>
          </div>
          
          {logo && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`flex-shrink-0 ml-3 flex h-14 w-14 items-center justify-center rounded-xl p-2`}
            >
              <img 
                src={logo} 
                alt={title} 
                className="h-full w-full object-contain drop-shadow-sm" 
              />
            </motion.div>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 min-h-[60px]">
          {desc}
        </p>

        {/* Botón con flecha */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl 
                      bg-gradient-to-r ${c.gradient} px-5 py-3 text-sm font-semibold text-white 
                      shadow-md transition-all duration-300
                      hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900/10`}
        >
          <span>{cta}</span>
          <motion.svg
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Efecto de esquina decorativo */}
      <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${c.gradient} 
                      opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
    </motion.article>
  );
}