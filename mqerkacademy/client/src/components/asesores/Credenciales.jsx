import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateUser({ onContinue }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    }
    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si la validación pasa
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    
    if (onContinue) {
      onContinue({ username, password });
    }
  };

  // Variantes de animación para el card principal
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: -15,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  // Variantes para el título
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
      scale: 0.5
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }
    }
  };

  // Variantes para los campos
  const fieldVariants = {
    hidden: { 
      opacity: 0,
      x: -100,
      scale: 0.8
    },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.15
      }
    })
  };

  // Variantes para el botón
  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.5
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="relative w-full py-25 sm:py-30">
      
      {/* Partículas de fondo animadas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Contenedor centrado */}
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Card principal con animaciones */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: 1000 }}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md relative overflow-hidden"
        >
        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2
          }}
        />

        {/* Título con animación */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r 
                     from-purple-600 to-blue-600 bg-clip-text text-transparent relative z-10"
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block"
          >
            CREA TU USUARIO
          </motion.span>
        </motion.h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Campo Usuario */}
          <motion.div
            custom={3}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              {/* Icono animado */}
              <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600"
                animate={{
                  scale: focusedField === 'username' ? [1, 1.2, 1] : 1,
                  rotate: focusedField === 'username' ? [0, 5, -5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </motion.div>

              <motion.input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({ ...errors, username: "" });
                }}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                placeholder="Nombre de usuario"
                whileFocus={{ scale: 1.02 }}
                className={`w-full pl-14 pr-4 py-4 border-2 rounded-xl bg-white
                         transition-all duration-300 text-gray-800 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         ${errors.username 
                           ? 'border-red-500' 
                           : 'border-gray-300 hover:border-purple-300 focus:border-purple-500'
                         }`}
              />

              {/* Efecto de partículas al escribir */}
              <AnimatePresence>
                {focusedField === 'username' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-2"
                >
                  <motion.span
                    animate={{ x: [0, 3, -3, 0] }}
                    transition={{ duration: 0.4, repeat: 2 }}
                  >
                    ⚠️
                  </motion.span>
                  {errors.username}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Campo Contraseña */}
          <motion.div
            custom={4}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              {/* Icono animado */}
              <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600"
                animate={{
                  scale: focusedField === 'password' ? [1, 1.2, 1] : 1,
                  rotate: focusedField === 'password' ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </motion.div>

              <motion.input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Contraseña"
                whileFocus={{ scale: 1.02 }}
                className={`w-full pl-14 pr-14 py-4 border-2 rounded-xl bg-white
                         transition-all duration-300 text-gray-800 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         ${errors.password 
                           ? 'border-red-500' 
                           : 'border-gray-300 hover:border-purple-300 focus:border-purple-500'
                         }`}
              />

              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                         hover:text-purple-600 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {showPassword ? (
                    <motion.svg
                      key="hide"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 180 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="show"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 180 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Indicador de fuerza de contraseña */}
              <AnimatePresence>
                {focusedField === 'password' && password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                    style={{
                      width: `${Math.min((password.length / 12) * 100, 100)}%`,
                      transformOrigin: "left"
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-2"
                >
                  <motion.span
                    animate={{ x: [0, 3, -3, 0] }}
                    transition={{ duration: 0.4, repeat: 2 }}
                  >
                    ⚠️
                  </motion.span>
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Botón Continuar */}
          <motion.button
            type="submit"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                     font-bold py-4 rounded-xl shadow-lg
                     transition-all duration-300 flex items-center justify-center gap-3
                     relative overflow-hidden group"
          >
            {/* Efecto de onda al hacer hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 0.3 }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="text-lg relative z-10">Continuar</span>
            <motion.svg
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.button>
        </form>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-center relative z-10"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500 text-sm"
          >
            Al continuar, aceptas nuestros términos y condiciones
          </motion.p>
        </motion.div>
      </motion.div>
      </div>

      {/* Decoración de fondo animada */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-300 rounded-full 
                     opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full 
                     opacity-20 blur-3xl"
        />
      </div>
    </div>
  );
}