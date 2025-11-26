import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function PreRegistro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    areaEspecializacion: "",
    gradoEstudio: "",
  });

  const areasEspecializacion = [
    "Ciencias Exactas",
    "Ciencias de la Salud",
    "Ciencias Económico - Administrativas",
    "Ingeniería",
    "Tecnología",
    "Ciencias Químico - Biológico",
    "Ciencias Sociales y Humanidades",
  ];

  const gradosEstudio = [
    "Licenciatura",
    "Maestría",
    "Técnico",
    "Especialista",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-800"
          >
            Pre-registro MQerkAcademy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Déjanos tus datos generales para iniciar tu proceso como asesor.
          </motion.p>
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {[
            { id: "nombre", label: "Nombre(s)", type: "text" },
            { id: "apellidos", label: "Apellidos", type: "text" },
            { id: "correo", label: "Correo electrónico", type: "email" },
            { id: "telefono", label: "Número de teléfono", type: "tel" },
          ].map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                autoComplete="off"
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </motion.div>
          ))}

          {/* SELECTS */}
          {[
            { id: "areaEspecializacion", label: "Área de especialización", options: areasEspecializacion },
            { id: "gradoEstudio", label: "Grado de estudio", options: gradosEstudio },
          ].map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 4) }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
              </label>
              <div className="relative">
                <select
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all appearance-none"
                >
                  <option value="">Selecciona una opción</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          ))}

          {/* BOTÓN */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 flex justify-center mt-6"
          >
            <button
              type="submit"
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
            >
              Continuar
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
