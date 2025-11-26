import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer({ initialMinutes = 80, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convertir a segundos

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp(); // Ejecuta acción cuando termine (opcional)
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // Formatear tiempo hh:mm:ss
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Determinar color según tiempo restante
  const getColorClass = () => {
    if (timeLeft > 1800) return "bg-indigo-600"; // Más de 30 min
    if (timeLeft > 600) return "bg-yellow-500"; // Entre 10-30 min
    return "bg-red-600"; // Menos de 10 min
  };

  return (
    <div className="flex justify-center py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`inline-flex items-center gap-3 px-6 py-3 ${getColorClass()} 
                   text-white font-semibold shadow-md rounded-lg
                   text-base sm:text-lg`}
      >
        <span className="text-2xl">⏳</span>
        <span>Tiempo restante: {formatTime(timeLeft)}</span>
      </motion.div>
    </div>
  );
}