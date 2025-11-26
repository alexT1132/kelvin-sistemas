import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { username, password, rememberMe });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Fondo degradado animado con múltiples capas */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-transparent to-blue-500 animate-gradient-pulse opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-indigo-600 to-purple-800 animate-gradient-rotate opacity-40"></div>
      
      {/* Efectos de partículas/nodos mejorados */}
      <div className="absolute inset-0 opacity-40">
        {/* Partículas grandes */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-white rounded-full animate-float blur-[1px]"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-white rounded-full animate-float-delay-1 blur-[1px]"></div>
        <div className="absolute bottom-32 left-40 w-2.5 h-2.5 bg-white rounded-full animate-float-delay-2 blur-[1px]"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-white rounded-full animate-float blur-[1px]"></div>
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-white rounded-full animate-float-delay-1 blur-[1px]"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full animate-float-delay-2 blur-[1px]"></div>
        
        {/* Partículas pequeñas */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-float-delay-1"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float"></div>
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-white rounded-full animate-float-delay-2"></div>
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-white rounded-full animate-float"></div>
        
        {/* Líneas conectoras con animación */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="white" strokeWidth="1" className="animate-pulse" style={{animationDuration: '3s'}} />
          <line x1="70%" y1="30%" x2="85%" y2="50%" stroke="white" strokeWidth="1" className="animate-pulse" style={{animationDuration: '4s'}} />
          <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="white" strokeWidth="1" className="animate-pulse" style={{animationDuration: '5s'}} />
          <line x1="60%" y1="70%" x2="80%" y2="20%" stroke="white" strokeWidth="0.5" className="animate-pulse" style={{animationDuration: '6s'}} />
        </svg>
      </div>

      {/* Contenedor del formulario */}
      <div className="relative z-10 w-full max-w-md">
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
          Bienvenido
        </h1>

        {/* Card del formulario */}
        <div className="bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Iniciar sesión</h2>
          <p className="text-gray-600 text-sm mb-6">
            Usa tus credenciales para continuar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Usuario */}
            <div>
              <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tu.usuario"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Recuérdame y Olvidaste contraseña */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Recuérdame</span>
              </label>
              <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón Iniciar sesión */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          25% {
            background-position: 50% 100%;
            filter: hue-rotate(-15deg);
          }
          50% {
            background-position: 100% 50%;
            filter: hue-rotate(15deg);
          }
          75% {
            background-position: 50% 0%;
            filter: hue-rotate(-10deg);
          }
        }

        @keyframes gradient-pulse {
          0%, 100% {
            opacity: 0.6;
            background-position: 0% 0%;
          }
          50% {
            opacity: 0.8;
            background-position: 100% 100%;
          }
        }

        @keyframes gradient-rotate {
          0%, 100% {
            opacity: 0.4;
            transform: rotate(0deg) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: rotate(5deg) scale(1.1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }

        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        .animate-gradient-pulse {
          background-size: 300% 300%;
          animation: gradient-pulse 10s ease-in-out infinite;
        }

        .animate-gradient-rotate {
          background-size: 350% 350%;
          animation: gradient-rotate 20s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float 7s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-delay-2 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}