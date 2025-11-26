import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FenixImage from '../../assets/web/index.png';
import Logo from '../../assets/web/MQerK_logo.png';

export default function WelcomeFinal() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Seguimiento del mouse para efectos parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden flex flex-col">
      {/* Orbes de fondo animados con parallax - COLORES AZUL/MORADO */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{ transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)` }}
        ></div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Grid de fondo sutil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      {/* Navbar con efecto glassmorphism */}
      <nav className="relative z-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={Logo} alt="MQerKAcademy Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
              </div>
            </div>
          </div>

          {/* Botón Iniciar Sesión */}
          <button 
            onClick={() => navigate('/login')}
            className={`group transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} relative px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-md text-white rounded-xl font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 overflow-hidden whitespace-nowrap text-sm sm:text-base`}
          >
            <span className="relative z-10">Iniciar Sesión</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>
      </nav>

      {/* Contenido principal - AJUSTADO PARA OCUPAR TODA LA ALTURA */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:py-8">
        
        {/* Título principal con gradiente animado AZUL/MORADO */}
        <div className={`mb-6 sm:mb-8 md:mb-10 transform transition-all duration-1000 delay-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x inline-block">
              ¡BIENVENIDOS!
            </span>
          </h1>
          <div className="h-1.5 sm:h-2 w-40 sm:w-48 md:w-64 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-pulse-slow"></div>
        </div>

        {/* TU IMAGEN con efecto 3D - TAMAÑOS RESPONSIVOS */}
        <div className={`mb-6 sm:mb-8 md:mb-10 transform transition-all duration-1000 delay-700 ${isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'}`}>
          <div 
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center perspective-1000"
            style={{ 
              transform: `rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Anillo exterior con gradiente AZUL/MORADO */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 blur-2xl animate-spin-slow"></div>
            
            {/* Anillo medio */}
            <div className="absolute inset-4 rounded-full border-2 border-white/10 animate-pulse-slow"></div>
            
            {/* Contenedor de la imagen */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
              
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              
              {/* TU IMAGEN DEL FÉNIX */}
              <img 
                src={FenixImage} 
                alt="Fénix MQerk Academy" 
                className="w-3/4 h-3/4 object-contain drop-shadow-2xl animate-float-gentle"
              />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10">
            Regístrate como:
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            {/* Botón Personal Interno - AZUL/MORADO */}
            <button
              onClick={() => navigate('/registro/personal')}
              className="group relative px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto sm:min-w-[240px] md:min-w-[280px] overflow-hidden rounded-2xl font-bold text-lg sm:text-xl transition-all duration-500 hover:scale-105"
            >
              {/* Fondo con gradiente AZUL/MORADO */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"></div>
              
              {/* Efecto hover animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Brillo deslizante */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Partículas flotantes en hover */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: '50%',
                      animation: `particle-rise ${1 + i * 0.2}s ease-out infinite`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Texto */}
              <span className="relative z-10 text-white drop-shadow-lg">
                Personal Interno
              </span>
              
              {/* Icono */}
              <svg className="inline-block ml-2 w-5 h-5 sm:w-6 sm:h-6 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Botón Asesor - MORADO/AZUL */}
            <button
              onClick={() => navigate('/pre-registro')}
              className="group relative px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto sm:min-w-[240px] md:min-w-[280px] overflow-hidden rounded-2xl font-bold text-lg sm:text-xl transition-all duration-500 hover:scale-105"
            >
              {/* Fondo con gradiente invertido MORADO/AZUL */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"></div>
              
              {/* Efecto hover animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Brillo deslizante */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Partículas flotantes en hover */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: '50%',
                      animation: `particle-rise ${1 + i * 0.2}s ease-out infinite`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Texto */}
              <span className="relative z-10 text-white drop-shadow-lg">
                Asesor
              </span>
              
              {/* Icono */}
              <svg className="inline-block ml-2 w-5 h-5 sm:w-6 sm:h-6 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }

        @keyframes particle-rise {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
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

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}