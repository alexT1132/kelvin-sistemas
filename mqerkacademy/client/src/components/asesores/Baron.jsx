import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestBarOn({ onNext }) {
  const preguntas = [
    "Soy capaz de reconocer cuando mis emociones afectan mi desempeño en el trabajo.",
    "Entiendo cómo mis emociones pueden influir en la dinámica del equipo de trabajo.",
    "Reflexiono sobre mis emociones después de situaciones estresantes para aprender de ellas.",
    "Soy consciente de las emociones que siento cuando estoy trabajando bajo presión.",
    "Reconozco mis fortalezas y debilidades emocionales.",
    "Mantengo la calma en situaciones de alta presión o conflicto en el trabajo.",
    "En momentos de estrés, puedo mantener un enfoque claro y no dejo que mis emociones me descontrolen.",
    "Cuando estoy frustrado, sé cómo calmarme y seguir adelante.",
    "Me esfuerzo por mantener una actitud positiva frente a desafíos o fracasos.",
    "Suelo manejar mis emociones sin que estas interfieran con la toma de decisiones en el trabajo.",
    "Trato de comprender cómo se sienten los demás antes de actuar o dar una respuesta.",
    "Escucho activamente a los compañeros de trabajo para comprender sus necesidades y emociones.",
    "Soy capaz de reconocer cuando los estudiantes o colegas necesitan apoyo emocional.",
    "Intento adaptar mi enfoque a las necesidades emocionales de los demás, especialmente cuando trato con estudiantes.",
    "Me esfuerzo por mostrar empatía y apoyo en situaciones emocionales difíciles en el entorno académico.",
    "Puedo manejar conflictos de manera eficaz sin que estos afecten las relaciones laborales.",
    "Me siento cómodo estableciendo relaciones de confianza con colegas y estudiantes.",
    "Fomento un ambiente de trabajo colaborativo y respetuoso.",
    "Soy capaz de comunicarme claramente con los estudiantes y compañeros, incluso en situaciones difíciles.",
    "Me esfuerzo por crear un clima laboral inclusivo y positivo en el trabajo.",
    "Al tomar decisiones importantes, considero tanto los hechos como mis emociones.",
    "En situaciones complicadas, busco soluciones que beneficien tanto a los estudiantes como al equipo.",
    "Soy capaz de evaluar las posibles consecuencias emocionales de mis decisiones antes de actuar.",
    "A la hora de resolver problemas, soy creativo y abierto a nuevas ideas.",
    "Tomo decisiones basadas en un equilibrio entre la lógica y las emociones de los involucrados.",
  ];

  const opciones = [
    { value: "1", label: "Totalmente en desacuerdo" },
    { value: "2", label: "En desacuerdo" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "De acuerdo" },
    { value: "5", label: "Totalmente de acuerdo" },
  ];

  const [pagina, setPagina] = useState(0);
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(""));

  const handleChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);
  };

  const preguntasPorPagina = 7;
  const inicio = pagina * preguntasPorPagina;
  const fin = inicio + preguntasPorPagina;
  const paginaActual = preguntas.slice(inicio, fin);
  const totalPaginas = Math.ceil(preguntas.length / preguntasPorPagina);

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
            Test Bar-On
          </h1>
          <p className="text-lg sm:text-xl text-indigo-600 font-semibold">
            Inteligencia Emocional
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto mt-6">
            <p className="text-gray-800 font-medium mb-2">Instrucciones:</p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Lee cada afirmación y selecciona la opción que mejor describa tu comportamiento habitual en el entorno laboral.
            </p>
            <p className="text-gray-800 font-medium text-sm mt-3">
              1 = Totalmente en desacuerdo • 2 = En desacuerdo • 3 = Neutral • 4 = De acuerdo • 5 = Totalmente de acuerdo
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
              key={pagina}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {paginaActual.map((pregunta, idx) => {
                const indexReal = inicio + idx;
                const isAnswered = respuestas[indexReal] !== "";
                
                return (
                  <motion.div
                    key={indexReal}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                      isAnswered 
                        ? 'border-indigo-200 bg-indigo-50/30' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <p className="text-gray-800 text-base sm:text-lg font-medium mb-4 leading-relaxed">
                      <span className="text-indigo-600 font-bold">{indexReal + 1}.</span> {pregunta}
                    </p>
                    
                    {/* Select para todas las pantallas */}
                    <select
                      value={respuestas[indexReal]}
                      onChange={(e) => handleChange(indexReal, e.target.value)}
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
          {pagina > 0 ? (
            <button
              onClick={() => setPagina((prev) => Math.max(prev - 1, 0))}
              className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 
                       text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md
                       flex items-center justify-center gap-2"
            >
              <span>←</span> Anterior
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {fin < preguntas.length ? (
            <button
              onClick={() => setPagina((prev) => prev + 1)}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl 
                       font-semibold transition-all hover:shadow-lg hover:scale-[1.02]
                       flex items-center justify-center gap-2 sm:ml-auto"
            >
              Siguiente <span>→</span>
            </button>
          ) : (
            <button
              onClick={() => {
                console.log("Respuestas Bar-On finales:", respuestas);
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
          {paginaActual.filter((_, i) => respuestas[inicio + i] === "").length} preguntas sin responder
        </motion.p>
      </div>
    </div>
  );
}