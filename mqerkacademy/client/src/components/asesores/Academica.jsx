import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AcademicTest({ onNext }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setStep(1);
  const handleNext = () => {
    if (step === 3) {
      // Si estamos en step 3, ir a la pantalla final (step 4)
      setStep(4);
    } else {
      // En steps 1-2, avanzar normalmente
      setStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleFinish = () => {
    console.log("Respuestas Prueba Académica finales:", answers);
    if (onNext) onNext();
  };

  // Componentes de preguntas
  const SelectQuestion = ({ id, text, options }) => {
    const isAnswered = answers[id] !== undefined && answers[id] !== "";
    
    return (
      <div
        className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
          isAnswered 
            ? 'border-blue-200 bg-blue-50/30' 
            : 'border-gray-200 bg-white'
        }`}
      >
        <p className="text-gray-800 text-base sm:text-lg font-medium mb-4 leading-relaxed">
          {text}
        </p>
        <select
          value={answers[id] || ""}
          onChange={(e) => handleChange(id, e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all text-gray-700"
        >
          <option value="">Selecciona una opción</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const TextQuestion = ({ id, text, placeholder = "Escribe tu respuesta aquí" }) => {
    const isAnswered = answers[id] !== undefined && answers[id] !== "";
    
    return (
      <div
        className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
          isAnswered 
            ? 'border-blue-200 bg-blue-50/30' 
            : 'border-gray-200 bg-white'
        }`}
      >
        <p className="text-gray-800 text-base sm:text-lg font-medium mb-4 leading-relaxed">
          {text}
        </p>
        <textarea
          value={answers[id] || ""}
          onChange={(e) => handleChange(id, e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all text-gray-700 resize-none"
          placeholder={placeholder}
        />
      </div>
    );
  };

  // Pantalla de introducción
  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-10"
    >
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Prueba académica
          </h2>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <p className="text-gray-800 font-semibold mb-3 text-lg">Instrucciones:</p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Esta prueba académica tiene como objetivo evaluar tus habilidades, conocimientos y estrategias como asesor 
            educativo. Responde con sinceridad y claridad, demostrando tu capacidad para abordar situaciones académicas y 
            personales de los estudiantes. Completa las preguntas dentro del tiempo establecido y entrega tus respuestas al 
            finalizar.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-gray-800 font-bold text-xl mb-2">Tiempo: 45 minutos</p>
        </div>

        <div className="text-center pt-4">
          <p className="text-blue-600 font-bold text-xl mb-6">¡Éxito!</p>
          <button 
            onClick={handleStart}
            className="px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                     font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Iniciar Prueba
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Sección 1: Preguntas 1-7
  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sección 1: Evaluación Educativa
        </h2>
        <p className="text-gray-600">Preguntas 1 - 7</p>
      </div>

      <div className="space-y-6">
        <SelectQuestion 
          id="q1" 
          text="1. ¿Cuál es el primer paso al identificar el problema de un estudiante?"
          options={[
            { value: "a", label: "Observar el comportamiento del estudiante" },
            { value: "b", label: "Hablar directamente con el estudiante" },
            { value: "c", label: "Consultar con otros profesores" },
            { value: "d", label: "Revisar el historial académico" }
          ]}
        />

        <TextQuestion 
          id="q2" 
          text="2. ¿Qué estrategia usarías para motivar a un estudiante desinteresado?"
        />

        <SelectQuestion 
          id="q3" 
          text="3. Si un estudiante tiene dificultades en matemáticas, ¿cuál sería tu acción inmediata?"
          options={[
            { value: "a", label: "Asignar ejercicios adicionales" },
            { value: "b", label: "Identificar las áreas específicas de dificultad" },
            { value: "c", label: "Recomendar clases particulares" },
            { value: "d", label: "Hablar con los padres" }
          ]}
        />

        <TextQuestion 
          id="q4" 
          text='4. Define "escucha activa" en tus propias palabras.'
        />

        <SelectQuestion 
          id="q5" 
          text="5. ¿Qué harías si un estudiante no muestra interés en mejorar?"
          options={[
            { value: "a", label: "Ignorar la situación" },
            { value: "b", label: "Buscar las causas del desinterés" },
            { value: "c", label: "Asignar más tareas" },
            { value: "d", label: "Reportar a la dirección" }
          ]}
        />

        <TextQuestion 
          id="q6" 
          text="6. ¿Cómo manejarías un conflicto entre dos estudiantes?"
          placeholder="Escribe tu respuesta aquí"
        />

        <SelectQuestion 
          id="q7" 
          text='7. Completa la frase: "Un buen asesor debe ser _____."'
          options={[
            { value: "a", label: "Empático y paciente" },
            { value: "b", label: "Estricto y disciplinado" },
            { value: "c", label: "Creativo y flexible" },
            { value: "d", label: "Todas las anteriores" }
          ]}
        />
      </div>
    </motion.div>
  );

  // Sección 2: Preguntas 8-14
  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sección 2: Estrategias Pedagógicas
        </h2>
        <p className="text-gray-600">Preguntas 8 - 14</p>
      </div>

      <div className="space-y-6">
        <SelectQuestion 
          id="q8" 
          text="8. ¿Cuál es la mejor forma de evaluar el progreso de un estudiante?"
          options={[
            { value: "a", label: "Solo con exámenes escritos" },
            { value: "b", label: "Combinando diferentes métodos de evaluación" },
            { value: "c", label: "Únicamente con participación en clase" },
            { value: "d", label: "Con trabajos en equipo" }
          ]}
        />

        <TextQuestion 
          id="q9" 
          text="9. Describe un caso en el que tu intervención como asesor sería crítica."
          placeholder="Escribe tu respuesta aquí"
        />

        <SelectQuestion 
          id="q10" 
          text="10. ¿Qué harías si un estudiante confiesa tener problemas personales graves?"
          options={[
            { value: "a", label: "Escucharlo y derivarlo con un profesional" },
            { value: "b", label: "Darle consejos personales" },
            { value: "c", label: "Informar inmediatamente a los padres" },
            { value: "d", label: "Mantener la confidencialidad sin actuar" }
          ]}
        />

        <TextQuestion 
          id="q11" 
          text="11. ¿Qué herramientas tecnológicas usarías para asesorar?"
          placeholder="Escribe tu respuesta aquí"
        />

        <SelectQuestion 
          id="q12" 
          text="12. ¿Qué actitud es más importante al dar retroalimentación?"
          options={[
            { value: "a", label: "Ser directo y honesto" },
            { value: "b", label: "Ser constructivo y motivador" },
            { value: "c", label: "Ser crítico y exigente" },
            { value: "d", label: "Ser comprensivo y flexible" }
          ]}
        />

        <TextQuestion 
          id="q13" 
          text="13. ¿Cómo equilibrarías la disciplina y la motivación?"
          placeholder="Escribe tu respuesta aquí"
        />

        <SelectQuestion 
          id="q14" 
          text="14. ¿Qué harías si un estudiante interrumpe constantemente la clase?"
          options={[
            { value: "a", label: "Llamar su atención públicamente" },
            { value: "b", label: "Hablar con él en privado" },
            { value: "c", label: "Ignorar la situación" },
            { value: "d", label: "Enviarlo a la dirección" }
          ]}
        />
      </div>
    </motion.div>
  );

  // Sección 3: Preguntas 15-20
  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sección 3: Liderazgo y Comunicación
        </h2>
        <p className="text-gray-600">Preguntas 15 - 20</p>
      </div>

      <div className="space-y-6">
        <TextQuestion 
          id="q15" 
          text="15. ¿Qué importancia tiene la empatía en el rol de asesor?"
          placeholder="Escribe tu respuesta aquí"
        />

        <SelectQuestion 
          id="q16" 
          text="16. ¿Cómo manejarías la presión de trabajar con varios estudiantes al mismo tiempo?"
          options={[
            { value: "a", label: "Priorizar según urgencia y necesidad" },
            { value: "b", label: "Atender a todos por igual" },
            { value: "c", label: "Delegar a otros asesores" },
            { value: "d", label: "Trabajar horas extras" }
          ]}
        />

        <TextQuestion 
          id="q17" 
          text="17. ¿Qué harías si un estudiante rechaza tu ayuda constantemente?"
          placeholder="Escribe tu respuesta aquí"
        />

        <SelectQuestion 
          id="q18" 
          text="18. ¿Cuál es el principal objetivo de un asesor educativo?"
          options={[
            { value: "a", label: "Mejorar las calificaciones" },
            { value: "b", label: "Apoyar el desarrollo integral del estudiante" },
            { value: "c", label: "Mantener la disciplina" },
            { value: "d", label: "Cumplir con el programa académico" }
          ]}
        />

        <TextQuestion 
          id="q19" 
          text="19. Describe una técnica creativa que usarías para enseñar un tema complejo."
          placeholder="Escribe tu respuesta aquí"
        />

        <TextQuestion 
          id="q20" 
          text="20. ¿Qué significa ser un líder para tus estudiantes?"
          placeholder="Escribe tu respuesta aquí"
        />
      </div>
    </motion.div>
  );

  // Pantalla final
  const renderFinal = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12"
    >
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <span className="text-4xl">✓</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          ¡Felicidades por completar la Prueba Académica!
        </h2>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-gray-700 leading-relaxed">
            Has demostrado tu compromiso y dedicación para formar parte de nuestro equipo de asesores educativos. 
            Tus respuestas serán evaluadas cuidadosamente y nos pondremos en contacto contigo pronto con los resultados.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-gray-800 font-semibold text-lg">
            ¡Mucho éxito en los siguientes pasos!
          </p>
          <p className="text-gray-600 font-medium">
            El equipo de MQerKAcademy
          </p>
        </div>

        <button 
          onClick={handleFinish}
          className="px-12 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl 
                   font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]
                   flex items-center justify-center gap-2 mx-auto mt-8"
        >
          Continuar <span>→</span>
        </button>
      </div>
    </motion.div>
  );

  const renderCurrentStep = () => {
    if (step === 0) return renderIntro();
    if (step === 1) return renderStep1();
    if (step === 2) return renderStep2();
    if (step === 3) return renderStep3();
    if (step === 4) return renderFinal();
    return null;
  };

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
            Prueba Académica
          </h1>
          <p className="text-lg sm:text-xl text-blue-600 font-semibold">
            Evaluación de Habilidades Educativas
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>

        {/* Navigation - Solo en steps 1-3 */}
        {step > 0 && step < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mt-6"
          >
            <button
              onClick={handlePrev}
              className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 
                       text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md
                       flex items-center justify-center gap-2"
            >
              <span>←</span> Anterior
            </button>

            <button
              onClick={handleNext}
              className={`px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-[1.02]
                       flex items-center justify-center gap-2 sm:ml-auto text-white
                       ${step === 3 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {step === 3 ? "Finalizar" : "Siguiente"} <span>→</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}