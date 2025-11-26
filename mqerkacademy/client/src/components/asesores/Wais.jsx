import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestQ21 from "../../assets/web/Asesores/tests/21.png";
import TestQ22 from "../../assets/web/Asesores/tests/22.png";
import TestQ23 from "../../assets/web/Asesores/tests/23.png";
import TestQ24 from "../../assets/web/Asesores/tests/24.png";
import TestQ25 from "../../assets/web/Asesores/tests/25.png";

// Opciones para pregunta 21
import TestQ21A from "../../assets/web/Asesores/tests/21-R1.png";
import TestQ21B from "../../assets/web/Asesores/tests/21-R2.png";
import TestQ21C from "../../assets/web/Asesores/tests/21-R3.png";
import TestQ21D from "../../assets/web/Asesores/tests/21-R4.png";

// Opciones para pregunta 22
import TestQ22A from "../../assets/web/Asesores/tests/22-R1.png";
import TestQ22B from "../../assets/web/Asesores/tests/22-R2.png";
import TestQ22C from "../../assets/web/Asesores/tests/22-R3.png";
import TestQ22D from "../../assets/web/Asesores/tests/22-R4.png";

// Opciones para pregunta 23
import TestQ23A from "../../assets/web/Asesores/tests/23-R1.png";
import TestQ23B from "../../assets/web/Asesores/tests/23-R2.png";
import TestQ23C from "../../assets/web/Asesores/tests/23-R3.png";
import TestQ23D from "../../assets/web/Asesores/tests/23-R4.png";

// Opciones para pregunta 24
import TestQ24A from "../../assets/web/Asesores/tests/24-R1.png";
import TestQ24B from "../../assets/web/Asesores/tests/24-R2.png";
import TestQ24C from "../../assets/web/Asesores/tests/24-R3.png";
import TestQ24D from "../../assets/web/Asesores/tests/24-R4.png";

// Opciones para pregunta 25
import TestQ25A from "../../assets/web/Asesores/tests/25-R1.png";
import TestQ25B from "../../assets/web/Asesores/tests/25-R2.png";
import TestQ25C from "../../assets/web/Asesores/tests/25-R3.png";
import TestQ25D from "../../assets/web/Asesores/tests/25-R4.png";

export default function WAISTest({ onNext }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setStep(1);
  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleFinish = () => {
    console.log("Respuestas WAIS finales:", answers);
    if (onNext) onNext();
  };

  // Componentes de preguntas
  const SelectQuestion = ({ id, text, options }) => {
    const isAnswered = answers[id] !== undefined && answers[id] !== "";
    
    return (
      <div
        className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
          isAnswered 
            ? 'border-indigo-200 bg-indigo-50/30' 
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
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
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

  const TextQuestion = ({ id, text }) => {
    const isAnswered = answers[id] !== undefined && answers[id] !== "";
    
    return (
      <div
        className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
          isAnswered 
            ? 'border-indigo-200 bg-indigo-50/30' 
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
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                   transition-all text-gray-700 resize-none"
          placeholder="Escribe tu respuesta aquí..."
        />
      </div>
    );
  };

  const ImageQuestion = ({ id, questionNumber, problemImage, options }) => {
    const isAnswered = answers[id] !== undefined && answers[id] !== "";
    
    const handleOptionClick = (value, e) => {
      e.preventDefault();
      handleChange(id, value);
    };
    
    return (
      <div
        className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
          isAnswered 
            ? 'border-indigo-200 bg-indigo-50/30' 
            : 'border-gray-200 bg-white'
        }`}
      >
        <p className="text-gray-800 text-base sm:text-lg font-semibold mb-4">
          {questionNumber}.
        </p>
        
        {/* Imagen del problema */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4 flex justify-center">
          <img 
            src={problemImage} 
            alt={`Pregunta ${questionNumber}`}
            className="max-w-full h-auto"
          />
        </div>

        {/* Opciones de respuesta con imágenes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={(e) => handleOptionClick(opt.value, e)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all
                ${answers[id] === opt.value 
                  ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                  : 'border-gray-300 hover:border-indigo-300 bg-white hover:shadow-sm'
                }`}
            >
              <span className={`text-base font-semibold mb-2 ${
                answers[id] === opt.value ? 'text-indigo-700' : 'text-gray-700'
              }`}>
                {opt.label}
              </span>
              <div className="w-full flex justify-center">
                <img 
                  src={opt.image} 
                  alt={`Opción ${opt.label}`}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
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
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <p className="text-gray-800 font-semibold mb-3 text-lg">Instrucciones:</p>
          <ul className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Lee cuidadosamente cada pregunta antes de responder.</li>
            <li>Responde con claridad y selecciona la opción más adecuada.</li>
            <li>En preguntas abiertas, explica brevemente tu razonamiento.</li>
            <li>En preguntas visuales, analiza los patrones antes de seleccionar.</li>
            <li>Puedes navegar entre secciones usando los botones de navegación.</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex items-start gap-3">
          <span className="text-yellow-600 text-xl">⚡</span>
          <div>
            <p className="text-gray-800 font-semibold">Importante:</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Este test evalúa diferentes aspectos de tu capacidad cognitiva y habilidades docentes. 
              Tómate el tiempo necesario para responder con honestidad.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-indigo-700 font-bold text-lg mb-6">¡Buena suerte!</p>
          <button 
            onClick={handleStart}
            className="px-12 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl 
                     font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Iniciar Test
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Sección 1: Razonamiento Lógico
  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sección 1: Razonamiento Lógico
        </h2>
        <p className="text-gray-600">Resuelve los siguientes problemas de lógica y matemáticas.</p>
      </div>

      <div className="space-y-6">
        <SelectQuestion 
          id="q1" 
          text="1. Encuentra el siguiente número en la serie: 5, 10, 20, 40, ..."
          options={[
            { value: "60", label: "60" },
            { value: "80", label: "80" },
            { value: "100", label: "100" },
            { value: "120", label: "120" }
          ]}
        />
        <SelectQuestion 
          id="q2" 
          text="2. Si 2(x+3) = 3x+7, ¿cuánto vale x?"
          options={[
            { value: "-1", label: "x = -1" },
            { value: "1", label: "x = 1" },
            { value: "2", label: "x = 2" },
            { value: "3", label: "x = 3" }
          ]}
        />
        <SelectQuestion 
          id="q3" 
          text="3. Un empleado realiza una tarea en 4 horas. Si trabaja al doble de velocidad, ¿cuánto tardará?"
          options={[
            { value: "1", label: "1 hora" },
            { value: "2", label: "2 horas" },
            { value: "3", label: "3 horas" },
            { value: "8", label: "8 horas" }
          ]}
        />
        <SelectQuestion 
          id="q4" 
          text="4. En un grupo hay 12 personas. Cada una debe saludar a las demás una vez. ¿Cuántos saludos se realizan en total?"
          options={[
            { value: "24", label: "24 saludos" },
            { value: "66", label: "66 saludos" },
            { value: "72", label: "72 saludos" },
            { value: "144", label: "144 saludos" }
          ]}
        />
        <SelectQuestion 
          id="q5" 
          text="5. Encuentra el elemento que NO encaja en la lista: Manzana, Pera, Carro, Mango"
          options={[
            { value: "manzana", label: "Manzana" },
            { value: "pera", label: "Pera" },
            { value: "carro", label: "Carro" },
            { value: "mango", label: "Mango" }
          ]}
        />
      </div>
    </motion.div>
  );

  // Sección 2: Habilidades Docentes (Parte 1)
  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sección 2: Habilidades Docentes (Parte 1)
        </h2>
        <p className="text-gray-600">Responde según tu criterio pedagógico y experiencia.</p>
      </div>

      <div className="space-y-6">
        <SelectQuestion 
          id="q6" 
          text="6. Un estudiante no entiende un concepto clave en clase. ¿Qué pasos seguirías?"
          options={[
            { value: "a", label: "Le pido que lo revise en casa" },
            { value: "b", label: "Proporcionar un ejemplo práctico y verificar su comprensión" },
            { value: "c", label: "Le sugiero que pregunte a un compañero" },
            { value: "d", label: "Le doy material adicional" }
          ]}
        />
        <SelectQuestion 
          id="q7" 
          text="7. Si te enfrentas a un grupo con niveles de aprendizaje variados, ¿qué harías?"
          options={[
            { value: "a", label: "Enseño al nivel promedio" },
            { value: "b", label: "Dividir el grupo en niveles y trabajar con cada nivel por separado" },
            { value: "c", label: "Me enfoco en los que más necesitan ayuda" },
            { value: "d", label: "Asigno tutores entre compañeros" }
          ]}
        />
        <SelectQuestion 
          id="q8" 
          text="8. ¿Qué harías si un estudiante cuestiona tu explicación con argumentos válidos?"
          options={[
            { value: "a", label: "Investigo y aclaro en la siguiente clase" },
            { value: "b", label: "Rechazar sus argumentos de inmediato" },
            { value: "c", label: "Les pido que investiguen y compartan" },
            { value: "d", label: "Busco otra fuente en el momento" }
          ]}
        />
        <SelectQuestion 
          id="q9" 
          text="9. Te informan de un cambio de tema con 24 horas de anticipación. ¿Qué harías?"
          options={[
            { value: "a", label: "Preparo una clase básica rápidamente" },
            { value: "b", label: "Busco material ya preparado sobre el tema" },
            { value: "c", label: "Pido más tiempo para preparar" },
            { value: "d", label: "Prepararte lo mejor posible con los recursos disponibles" }
          ]}
        />
        <TextQuestion 
          id="q10" 
          text="10. Propón una actividad dinámica para enseñar un concepto complejo."
        />
      </div>
    </motion.div>
  );

  // Sección 3: Habilidades Docentes (Parte 2)
  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sección 3: Habilidades Docentes (Parte 2)
        </h2>
        <p className="text-gray-600">Continúa respondiendo según tu criterio pedagógico.</p>
      </div>

      <div className="space-y-6">
        <SelectQuestion 
          id="q11" 
          text="11. ¿Qué harías para motivar a un estudiante desinteresado?"
          options={[
            { value: "a", label: "Hablar con él para entender sus intereses" },
            { value: "b", label: "Ignorar su comportamiento" },
            { value: "c", label: "Asignarle más tareas" },
            { value: "d", label: "Hablar con sus padres" }
          ]}
        />
        <TextQuestion 
          id="q12" 
          text="12. ¿Cómo redactarías un correo breve a los padres de un estudiante sobre su progreso?"
        />
        <TextQuestion 
          id="q13" 
          text="13. ¿Cómo explicarías la importancia de tu materia?"
        />
        <SelectQuestion 
          id="q14" 
          text="14. ¿Cómo corregirías a un estudiante sin hacerlo sentir mal?"
          options={[
            { value: "a", label: "Corrigiendo de manera constructiva y explicativa" },
            { value: "b", label: "Señalando solo el error" },
            { value: "c", label: "Ignorando el error" },
            { value: "d", label: "Comparándolo con otros estudiantes" }
          ]}
        />
        <TextQuestion 
          id="q15" 
          text="15. Describe tu introducción ideal para tu primera clase."
        />
        <TextQuestion 
          id="q16" 
          text="16. Un estudiante argumenta que una técnica no es útil en la vida real. ¿Cómo responderías?"
        />
        <SelectQuestion 
          id="q17" 
          text="17. Describe cómo manejarías una situación en la que un estudiante interrumpe constantemente."
          options={[
            { value: "a", label: "Hablar con él en privado para entender su comportamiento" },
            { value: "b", label: "Ignorar las interrupciones" },
            { value: "c", label: "Enviarlo a dirección" },
            { value: "d", label: "Castigarlo frente al grupo" }
          ]}
        />
        <TextQuestion 
          id="q18" 
          text="18. Si no tienes acceso a tus materiales preparados, ¿cómo improvisarías una clase?"
        />
        <SelectQuestion 
          id="q19" 
          text="19. ¿Cómo manejarías un conflicto entre dos estudiantes?"
          options={[
            { value: "a", label: "Resolviéndolo en privado, escuchando ambas partes" },
            { value: "b", label: "Ignorar el conflicto" },
            { value: "c", label: "Castigar a ambos" },
            { value: "d", label: "Dejar que lo resuelvan ellos" }
          ]}
        />
        <TextQuestion 
          id="q20" 
          text="20. Explica cómo evaluarías si los estudiantes comprendieron el tema al final de la sesión."
        />
      </div>
    </motion.div>
  );

  // Sección 4: Razonamiento Visual
  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Sección 4: Razonamiento Visual
        </h2>
        <p className="text-gray-600">Identifica el patrón y selecciona la opción correcta.</p>
      </div>

      <div className="space-y-8">
        {/* Pregunta 21 */}
        <ImageQuestion 
          id="q21"
          questionNumber="21"
          problemImage={TestQ21}
          options={[
            { value: "a", label: "a", image: TestQ21A },
            { value: "b", label: "b", image: TestQ21B },
            { value: "c", label: "c", image: TestQ21C },
            { value: "d", label: "d", image: TestQ21D }
          ]}
        />

        {/* Pregunta 22 */}
        <ImageQuestion 
          id="q22"
          questionNumber="22"
          problemImage={TestQ22}
          options={[
            { value: "a", label: "a", image: TestQ22A },
            { value: "b", label: "b", image: TestQ22B },
            { value: "c", label: "c", image: TestQ22C },
            { value: "d", label: "d", image: TestQ22D }
          ]}
        />

        {/* Pregunta 23 */}
        <ImageQuestion 
          id="q23"
          questionNumber="23"
          problemImage={TestQ23}
          options={[
            { value: "a", label: "a", image: TestQ23A },
            { value: "b", label: "b", image: TestQ23B },
            { value: "c", label: "c", image: TestQ23C },
            { value: "d", label: "d", image: TestQ23D }
          ]}
        />

        {/* Pregunta 24 */}
        <ImageQuestion 
          id="q24"
          questionNumber="24"
          problemImage={TestQ24}
          options={[
            { value: "a", label: "a", image: TestQ24A },
            { value: "b", label: "b", image: TestQ24B },
            { value: "c", label: "c", image: TestQ24C },
            { value: "d", label: "d", image: TestQ24D }
          ]}
        />

        {/* Pregunta 25 */}
        <ImageQuestion 
          id="q25"
          questionNumber="25"
          problemImage={TestQ25}
          options={[
            { value: "a", label: "a", image: TestQ25A },
            { value: "b", label: "b", image: TestQ25B },
            { value: "c", label: "c", image: TestQ25C },
            { value: "d", label: "d", image: TestQ25D }
          ]}
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
          ¡Felicidades por completar todos los tests psicológicos!
        </h2>
        
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-gray-700 leading-relaxed">
            Tu compromiso y dedicación en esta etapa son muy valiosos para nosotros. 
            Has demostrado tu interés genuino en formar parte de MQerKAcademy, 
            y estamos emocionados de continuar este proceso contigo.
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
    if (step === 4) return renderStep4();
    if (step === 5) return renderFinal();
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
            Test WAIS
          </h1>
          <p className="text-lg sm:text-xl text-indigo-600 font-semibold">
            Inteligencia Cognitiva Completa
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>

        {/* Navigation - Solo en steps 1-4 */}
        {step > 0 && step < 5 && (
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
                       ${step === 4 ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {step === 4 ? "Finalizar" : "Siguiente"} <span>→</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}