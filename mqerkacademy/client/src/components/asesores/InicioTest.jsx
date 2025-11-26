import { motion } from "framer-motion";

export default function InicioTest({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10"
      >
        {/* Nombre */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-3xl sm:text-4xl font-bold text-gray-800"
        >
          Alejandro Tellez Vazquez
        </motion.h1>
        <p className="text-center text-gray-600 mt-2">
          Bienvenido(a) al proceso en MQerKAcademy
        </p>

        {/* Info General */}
        <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <p className="text-gray-700 leading-relaxed">
            Estamos muy emocionados de contar contigo. Tu talento y experiencia son clave
            para seguir construyendo una academia disruptiva que prepare a los estudiantes
            para los retos del futuro.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            A continuación, completa estos pasos:
          </p>
          <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
            <li>
              <strong>Test psicológicos y pruebas académicas:</strong> nos ayudan a conocer tus habilidades,
              conocimientos y áreas de especialidad.
            </li>
            <li>
              <strong>Sube tus documentos</strong> una vez acredites los test: asegúrate de cargarlos en el
              formato indicado para agilizar la contratación.
            </li>
          </ul>
        </div>

        {/* Advertencia */}
        <div className="mt-6 bg-yellow-50 p-5 rounded-xl border border-yellow-100 flex items-start gap-3">
          <span className="text-yellow-600 text-xl">⏱️</span>
          <p className="text-gray-700">
            <strong>Tiempo total del test: 1 hora 20 minutos</strong><br />
            El tiempo corre durante todo el proceso de evaluación. Al agotarse, el sistema
            enviará tus respuestas automáticamente y te llevará a la pantalla de resultados.
          </p>
        </div>

        {/* Mensaje final */}
        <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            En MQerKAcademy valoramos el compromiso, la pasión por la educación y la creatividad
            para transformar vidas. Estamos seguros de que juntos lograremos grandes cosas.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Si tienes preguntas o necesitas apoyo, nuestro equipo está para ayudarte.
          </p>
          <p className="mt-6 font-semibold text-gray-800">
            ¡Mucho éxito y bienvenido(a) a esta nueva etapa!<br />
            Equipo de MQerKAcademy
          </p>
        </div>

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={onStart}
            className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            Iniciar
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}