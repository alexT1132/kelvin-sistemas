import { useState } from 'react';
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Topbar from "../../components/web/Topbar";

export default function RegistroUsuario() {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
    terminos: false,
    privacidad: false
  });

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [shake, setShake] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.terminos || !formData.privacidad) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    console.log('Registro exitoso:', formData);
  };

  const isFormValid = formData.terminos && formData.privacidad && formData.usuario && formData.contrasena;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-600 to-purple-800 relative overflow-hidden">
        {/* Header / Topbar */}
        <Topbar />

      {/* Elementos decorativos animados de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full opacity-10 blur-3xl -top-48 -left-48 animate-blob"></div>
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl -bottom-48 -right-48 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full opacity-10 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000"></div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Contenedor del formulario */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 backdrop-blur-sm animate-scale-in">
            {/* Título */}
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-purple-700 animate-fade-in">
              CREA TU USUARIO
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Usuario */}
              <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 transition-all duration-300 group-focus-within:scale-110">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  placeholder="Usuario"
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-300 focus:shadow-lg bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Campo Contraseña */}
              <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 transition-all duration-300 group-focus-within:scale-110">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
                  autoComplete="new-password"
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-purple-300 focus:shadow-lg bg-gray-50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-300"
                >
                  {mostrarContrasena ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Checkboxes de Términos */}
              <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {/* Términos y Condiciones */}
                <label className={`flex items-start cursor-pointer group ${shake ? 'animate-shake' : ''}`}>
                  <div className="relative flex items-center justify-center mt-1">
                    <input
                      type="checkbox"
                      name="terminos"
                      checked={formData.terminos}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 transition-all duration-300 cursor-pointer"
                    />
                  </div>
                  <span className="ml-3 text-gray-700 text-sm sm:text-base">
                    Acepto los{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-800 underline font-medium transition-colors duration-300">
                      Términos y Condiciones
                    </a>
                  </span>
                </label>

                {/* Políticas de Privacidad */}
                <label className={`flex items-start cursor-pointer group ${shake ? 'animate-shake' : ''}`}>
                  <div className="relative flex items-center justify-center mt-1">
                    <input
                      type="checkbox"
                      name="privacidad"
                      checked={formData.privacidad}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 transition-all duration-300 cursor-pointer"
                    />
                  </div>
                  <span className="ml-3 text-gray-700 text-sm sm:text-base">
                    Acepto las{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-800 underline font-medium transition-colors duration-300">
                      Políticas de Privacidad
                    </a>
                  </span>
                </label>
              </div>

              {/* Botón Continuar */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all duration-300 animate-fade-in-up ${
                  isFormValid
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-2xl hover:scale-105 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed opacity-60'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                Continuar
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Estilos personalizados */}
      <style jsx>{`
        /* Ocultar scrollbars */
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        *::-webkit-scrollbar {
          display: none;
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out backwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        /* Estilos personalizados para los checkboxes */
        input[type="checkbox"]:checked {
          background-color: #7c3aed;
          border-color: #7c3aed;
        }

        /* Efecto de pulso en el botón cuando está habilitado */
        button:not(:disabled):hover {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(124, 58, 237, 0);
          }
        }
      `}</style>
    </div>
  );
}