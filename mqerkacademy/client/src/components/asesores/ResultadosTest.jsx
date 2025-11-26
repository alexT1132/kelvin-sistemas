import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ResultsReport() {
  const [candidateName] = useState("MARIANA RODRIGUEZ PEREZ");
  const [area] = useState("CIENCIAS DE LA SALUD");

  // Datos de los tests
  const testResults = [
    {
      id: 1,
      name: "Test de Personalidad",
      score: "85/100",
      evaluation: "Compatible con el perfil de asesor educativo",
      icon: "👤"
    },
    {
      id: 2,
      name: "Test DASS-21",
      score: "92/100",
      evaluation: "Dentro de rangos normales",
      icon: "🧠"
    },
    {
      id: 3,
      name: "Test de Zavic",
      score: "88/100",
      evaluation: "Valores alineados con liderazgo y ética profesional",
      icon: "⚖️"
    },
    {
      id: 4,
      name: "Test de Inteligencia Emocional",
      score: "90/100",
      evaluation: "Adecuada capacidad de gestión emocional",
      icon: "💡"
    },
    {
      id: 5,
      name: "Test de WAIS",
      score: "87/100",
      evaluation: "Inteligencia superior al promedio",
      icon: "🎯"
    },
    {
      id: 6,
      name: "Prueba Académica",
      score: "94/100",
      evaluation: "Excelencia en habilidades técnicas y académicas",
      icon: "📚"
    }
  ];

  // Calcular puntaje total
  const totalScore = testResults.reduce((sum, test) => {
    const score = parseInt(test.score.split('/')[0]);
    return sum + score;
  }, 0);

  const maxScore = testResults.length * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {candidateName}
          </h1>
          <div className="inline-block">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-6">
              INFORME EJECUTIVO DE RESULTADOS: EVALUACIÓN INTEGRAL
            </h2>
          </div>
        </motion.div>

        {/* Descripción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8"
        >
          <p className="text-gray-700 leading-relaxed text-center text-base sm:text-lg">
            El presente informe consolida los resultados obtenidos en una serie de pruebas psicológicas, académicas y técnicas 
            aplicadas para evaluar las competencias, habilidades y aptitudes del candidato(a). Este análisis exhaustivo tiene como 
            finalidad determinar la alineación del perfil del evaluado con los estándares requeridos para desempeñar exitosamente el 
            rol de asesor(a) educativo, destacando fortalezas y áreas clave para el desarrollo profesional.
          </p>
        </motion.div>

        {/* Tabla de Resultados */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8"
        >
          {/* Header de la tabla */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-white font-bold text-sm sm:text-base">Test/Prueba</div>
              <div className="text-white font-bold text-sm sm:text-base text-center">Puntaje Obtenido</div>
              <div className="text-white font-bold text-sm sm:text-base">Evaluación</div>
            </div>
          </div>

          {/* Filas de resultados */}
          <div className="divide-y divide-gray-200">
            {testResults.map((test, index) => (
              <motion.div
                key={test.id}
                variants={itemVariants}
                className="px-6 py-5 hover:bg-blue-50/50 transition-colors"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  {/* Nombre del test */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{test.icon}</span>
                    <span className="font-semibold text-gray-800 text-sm sm:text-base">
                      {test.name}
                    </span>
                  </div>

                  {/* Puntaje */}
                  <div className="text-center">
                    <div className="inline-block px-4 py-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 min-w-[100px]">
                      <span className="text-blue-700 font-bold text-base sm:text-lg">{test.score}</span>
                    </div>
                  </div>

                  {/* Evaluación */}
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {test.evaluation}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Fila Total */}
            <motion.div
              variants={itemVariants}
              className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="font-bold text-gray-900 text-base sm:text-lg">
                  TOTAL EN PUNTOS
                </div>
                <div className="text-center">
                  <div className="inline-block px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg min-w-[120px]">
                    <span className="text-white font-bold text-lg sm:text-xl">{totalScore}/{maxScore}</span>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white font-bold text-sm sm:text-base">
                      ACEPTADO
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mensaje de aceptación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg border border-green-200 p-6 sm:p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                <span className="font-semibold">¡Felicidades!</span> Usted ha sido aceptado para el puesto de asesor(a) educativo en el área de{" "}
                <span className="font-semibold text-blue-600">{area}</span>. Los resultados obtenidos reflejan que 
                posee las competencias y valores que buscamos. Nos entusiasma contar con usted en nuestro equipo para impactar 
                positivamente en la vida de nuestros estudiantes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Botón de acción */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <Link to='/credenciales' className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                           font-bold text-lg shadow-xl hover:shadow-2xl transition-all 
                           hover:scale-[1.02] flex items-center justify-center gap-3 mx-auto">
            <span>Iniciar trámite</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>MQerKAcademy © 2024 - Todos los derechos reservados</p>
        </motion.div>
      </div>
    </div>
  );
}