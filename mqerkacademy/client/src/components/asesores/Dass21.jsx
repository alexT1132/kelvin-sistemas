import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContadorTest from "../../components/asesores/ContadorTest";

export default function Dass21({ onNext }) {
  const preguntas = [
    // Parte 1
    "Me ha sido difícil relajarme después de un día de trabajo.",
    "Me he sentido nervioso/a o alterado/a al enfrentar cambios importantes.",
    "He sentido que no puedo organizar mis tareas y responsabilidades de forma efectiva.",
    "Me he sentido tenso/a o irritado/a sin motivo aparente.",
    "Siento que mi carga de trabajo me resulta difícil de manejar.",
    "Me cuesta pensar con claridad cuando me encuentro bajo presión.",
    "Me frustro fácilmente cuando las cosas no salen como planeo.",

    // Parte 2
    "He sentido una sensación de miedo, aunque no haya un motivo claro.",
    "He sentido que mi corazón late rápido incluso en reposo.",
    "Me cuesta mantener la calma al enfrentar conflictos o desafíos.",
    "He sentido que no puedo detener pensamientos preocupantes.",
    "Me he sentido abrumado/a ante tareas importantes.",
    "He evitado situaciones que me ponen nervioso/a.",
    "He sentido incomodidad física (como temblores o sudoración) en situaciones estresantes.",

    // Parte 3
    "Me he sentido triste o vacío/a durante la última semana.",
    "He perdido interés en actividades que antes disfrutaba.",
    "He sentido que no tengo energía para cumplir con mis responsabilidades.",
    "Me he sentido inferior o poco capaz comparado con otros.",
    "Me cuesta encontrar cosas positivas en mi día a día.",
    "Me he sentido desmotivado/a para resolver problemas cotidianos.",
    "Siento que no estoy logrando los objetivos que me he propuesto.",
  ];

  const opciones = [
    { value: "0", label: "Nunca" },
    { value: "1", label: "Casi nunca" },
    { value: "2", label: "A veces" },
    { value: "3", label: "Frecuentemente" },
    { value: "4", label: "Muy frecuentemente" },
  ];

  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(""));
  const [page, setPage] = useState(0);

  const handleChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);
  };

  const startIndex = page * 7;
  const endIndex = startIndex + 7;
  const currentPreguntas = preguntas.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Test DASS-21
          </h1>
          <p className="text-lg sm:text-xl text-indigo-600 font-semibold">
            Depresión, Ansiedad y Estrés
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
            <p className="text-gray-800 font-medium mb-2">Instrucciones:</p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Responde a cada ítem considerando cómo te has sentido o comportado en la última semana, seleccionando una opción por cada afirmación.
            </p>
          </div>
        </motion.div>

        {/* Questions Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {currentPreguntas.map((pregunta, i) => {
                const realIndex = startIndex + i;
                const isAnswered = respuestas[realIndex] !== "";
                
                return (
                  <motion.div
                    key={realIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                      isAnswered 
                        ? 'border-indigo-200 bg-indigo-50/30' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <p className="text-gray-800 text-base sm:text-lg font-medium mb-4 leading-relaxed">
                      <span className="text-indigo-600 font-bold">{realIndex + 1}.</span> {pregunta}
                    </p>
                    
                    {/* Select para todas las pantallas */}
                    <select
                      value={respuestas[realIndex]}
                      onChange={(e) => handleChange(realIndex, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white 
                               focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                               transition-all text-gray-700"
                    >
                      <option value="">Selecciona una opción</option>
                      {opciones.map((opcion) => (
                        <option key={opcion.value} value={opcion.value}>
                          {opcion.value} - {opcion.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center"
        >
          {page > 0 ? (
            <button
              onClick={() => setPage(page - 1)}
              className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 
                       text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md
                       flex items-center justify-center gap-2"
            >
              <span>←</span> Anterior
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {page < 2 ? (
            <button
              onClick={() => setPage(page + 1)}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl 
                       font-semibold transition-all hover:shadow-lg hover:scale-[1.02]
                       flex items-center justify-center gap-2 sm:ml-auto"
            >
              Siguiente <span>→</span>
            </button>
          ) : (
            <button
              onClick={() => {
                console.log("Respuestas DASS-21:", respuestas);
                if (onNext) onNext();
              }}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl 
                       font-semibold transition-all hover:shadow-lg hover:scale-[1.02]
                       flex items-center justify-center gap-2 sm:ml-auto"
            >
              Continuar <span>✓</span>
            </button>
          )}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          {currentPreguntas.length - respuestas.slice(startIndex, endIndex).filter(r => r !== "").length} preguntas sin responder
        </motion.p>
      </div>
    </div>
  );
}