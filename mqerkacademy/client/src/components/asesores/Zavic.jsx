import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestZavic({ onNext }) {
  const preguntas = [
    "Si descubres que un colega no está cumpliendo con las normas de la empresa, tú:",
    "En una situación en la que tu equipo debe tomar una decisión difícil, tú",
    "Si tienes que elegir entre dos proyectos, eliges el que:",
    "Cuando trabajas en equipo, priorizas:",
    "Si observas que un proyecto no cumple con los estándares éticos de la empresa, tú:",
    "Si encuentras un objeto valioso olvidado en tu lugar de trabajo, tú:",
    "Si un cliente ofrece un incentivo para recibir un trato especial, tú:",
    "En una situación de presión por cumplir metas laborales, prefieres:",
    "Si un compañero de trabajo te pide que lo cubras en una actividad que no completó, tú:",
    "Si tuvieras que elegir entre dos trabajos, elegirías el que:",
    "Cuando se trata de beneficios laborales, priorizas:",
    "Si tienes la oportunidad de mejorar un proceso en tu trabajo, lo haces porque:",
    "Si tu supervisor te pide que completes una tarea extra sin remuneración adicional, tú:",
    "En un proyecto grupal, prefieres ser:",
    "Si tu supervisor te pide una opinión sobre una estrategia, tú:",
    "En un entorno laboral, buscas roles que:",
    "Cuando surge un problema en tu equipo, tiendes a:",
    "Si un colega está teniendo un mal día, tú:",
    "Si tu equipo enfrenta dificultades, tú:",
    "Cuando se trata de compartir recursos laborales, tú:",
    "Si un cliente necesita más tiempo o apoyo del esperado, tú:",
    "Prefieres un entorno laboral donde puedas:",
    "Al abordar un problema complejo, tú:",
    "Cuando tienes una idea nueva, tiendes a:",
    "Si un proyecto requiere innovación, prefieres:",
    "Si tu empresa enfrenta un problema recurrente, prefieres:",
    "Cuando trabajas en un equipo diverso con distintas ideas, tú:",
    "Si la empresa donde trabajas implementa un proyecto de impacto social, tú:",
    "Cuando observas prácticas laborales que dañan el medio ambiente, tú:",
    "Si tu equipo recibe fondos adicionales para un proyecto, tú:",
  ];

  const opciones = [
    { value: "respeto", label: "Respeto las normas" },
    { value: "consenso", label: "Busco el consenso" },
    { value: "etica", label: "Prioridad ética" },
    { value: "equipo", label: "Trabajo en equipo" },
    { value: "innovacion", label: "Innovación" },
    { value: "responsabilidad", label: "Responsabilidad" },
  ];

  const puntajes = [
    { value: "4", label: "4 - Más importante" },
    { value: "3", label: "3 - Importante" },
    { value: "2", label: "2 - Menos importante" },
    { value: "1", label: "1 - Menos relevante" },
  ];

  const totalSteps = 5;
  const preguntasPorPaso = 6;

  const [step, setStep] = useState(1);
  const [respuestas, setRespuestas] = useState(
    preguntas.map(() => ({ opcion: "", puntaje: "" }))
  );

  const handleChange = (index, campo, valor) => {
    const nuevas = [...respuestas];
    nuevas[index][campo] = valor;
    setRespuestas(nuevas);
  };

  const handleSubmit = () => {
    console.log("Respuestas ZAVIC finales:", respuestas);
    if (onNext) onNext();
  };

  const startIndex = (step - 1) * preguntasPorPaso;
  const preguntasActuales = preguntas.slice(startIndex, startIndex + preguntasPorPaso);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Test ZAVIC
          </h1>
          <p className="text-lg sm:text-xl text-indigo-600 font-semibold">
            Valores e Intereses Profesionales
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 sm:p-6 max-w-3xl mx-auto mt-6">
            <p className="text-gray-800 font-medium mb-2">Instrucciones:</p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
              Lee cada situación cuidadosamente y selecciona una opción. Luego asigna un puntaje del 1 al 4:
            </p>
            <p className="text-gray-800 font-medium text-sm sm:text-base">
              4 = Más importante • 3 = Importante • 2 = Menos importante • 1 = Menos relevante
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
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {preguntasActuales.map((pregunta, index) => {
                const globalIndex = startIndex + index;
                const isAnswered = respuestas[globalIndex].opcion !== "" && respuestas[globalIndex].puntaje !== "";
                
                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                      isAnswered 
                        ? 'border-indigo-200 bg-indigo-50/30' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <p className="text-gray-800 text-base sm:text-lg font-medium mb-4 leading-relaxed">
                      <span className="text-indigo-600 font-bold">{globalIndex + 1}.</span> {pregunta}
                    </p>
                    
                    {/* Selects en grid responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Select de Opción */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selecciona tu respuesta:
                        </label>
                        <select
                          value={respuestas[globalIndex].opcion}
                          onChange={(e) => handleChange(globalIndex, "opcion", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white 
                                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                                   transition-all text-gray-700"
                        >
                          <option value="">Selecciona una opción</option>
                          {opciones.map((opcion) => (
                            <option key={opcion.value} value={opcion.value}>
                              {opcion.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Select de Puntaje */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Asigna un puntaje:
                        </label>
                        <select
                          value={respuestas[globalIndex].puntaje}
                          onChange={(e) => handleChange(globalIndex, "puntaje", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white 
                                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                                   transition-all text-gray-700"
                        >
                          <option value="">Selecciona un puntaje</option>
                          {puntajes.map((puntaje) => (
                            <option key={puntaje.value} value={puntaje.value}>
                              {puntaje.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
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
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 
                       text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md
                       flex items-center justify-center gap-2"
            >
              <span>←</span> Anterior
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl 
                       font-semibold transition-all hover:shadow-lg hover:scale-[1.02]
                       flex items-center justify-center gap-2 sm:ml-auto"
            >
              Siguiente <span>→</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
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
          {preguntasActuales.filter((_, i) => {
            const idx = startIndex + i;
            return respuestas[idx].opcion === "" || respuestas[idx].puntaje === "";
          }).length} preguntas sin completar
        </motion.p>
      </div>
    </div>
  );
}