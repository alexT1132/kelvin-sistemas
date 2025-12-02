import React from 'react';
import { Upload, Calendar, AlertTriangle } from 'lucide-react';

const Dashboard1 = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* Fondo a pantalla completa */}
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 z-0" />
      
      {/* Partículas flotantes decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Elementos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ left: '20px', top: '20px', animationDuration: '8000ms' }}
        />
        <div 
          className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ right: '40px', top: '100px', animationDuration: '8000ms', animationDelay: '2000ms' }}
        />
        <div 
          className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ left: '100px', bottom: '50px', animationDuration: '8000ms', animationDelay: '4000ms' }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        
        {/* Saludo */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 drop-shadow-2xl animate-pulse duration-1000 px-3 sm:px-4 pb-1">
            ¡Buenas tardes, Juan!
          </h1>
        </div>

        {/* Grid de dos columnas */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 xl:gap-12 items-start">
          
          {/* Columna izquierda - Mensaje y botones */}
          <div className="space-y-6 md:order-1">
            <div className="w-full max-w-md mx-auto px-4 md:px-0">
              
              {/* Tarjeta de advertencia */}
              <div className="relative group mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-amber-300/30 to-orange-400/30 blur-lg rounded-xl animate-pulse" />
                <div className="relative bg-gradient-to-r from-yellow-400/20 via-amber-300/20 to-orange-400/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-300/40 text-center shadow-xl shadow-yellow-500/30">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-yellow-400 rounded-full p-3 animate-pulse">
                      <AlertTriangle size={32} className="text-yellow-900" />
                    </div>
                    <p className="text-yellow-100 font-bold text-xl sm:text-2xl lg:text-3xl leading-relaxed">
                      Debes subir tu comprobante para acceder a la plataforma completa.
                    </p>
                    <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg px-4 py-2 mt-2">
                      <p className="text-yellow-200 font-semibold text-sm">
                        📋 Sube tu comprobante de pago para continuar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón principal */}
              <button className="w-full py-4 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-extrabold rounded-2xl shadow-xl text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse border border-white/20 mb-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💳</span>
                    <Upload className="animate-bounce" size={24} />
                  </div>
                  <div className="text-left">
                    <div className="font-extrabold">Ver métodos de pago</div>
                    <div className="text-sm font-normal opacity-90">Transferencia • Efectivo • Subir comprobante</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Columna derecha - Reloj y frase */}
          <div className="space-y-6 md:order-2">
            
            {/* Reloj grande */}
            <div className="text-center mb-8 group">
              <div 
                className="text-7xl sm:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[13rem] font-bold text-white mb-4 leading-none select-none" 
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '900',
                  textShadow: '2px 2px 0px rgba(139, 92, 246, 1), 4px 4px 0px rgba(139, 92, 246, 0.9), 6px 6px 0px rgba(139, 92, 246, 0.8), 8px 8px 0px rgba(139, 92, 246, 0.7), 10px 10px 0px rgba(139, 92, 246, 0.6), 12px 12px 0px rgba(139, 92, 246, 0.5), 14px 14px 0px rgba(139, 92, 246, 0.4), 16px 16px 25px rgba(0, 0, 0, 0.8)',
                  WebkitTextStroke: '2px rgba(139, 92, 246, 0.3)'
                }}
              >
                16:43
              </div>
              
              {/* Fecha */}
              <span className="text-purple-200 font-semibold bg-white/10 px-4 py-2 rounded-lg text-sm sm:text-base inline-block hover:bg-white/20 transition-all duration-300">
                lunes, 1 de diciembre de 2025
              </span>
            </div>

            {/* Frase motivacional */}
            <div className="text-center group">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <Calendar className="text-yellow-300 animate-pulse" size={24} />
                <span className="text-yellow-300 font-semibold text-lg">Frase del día</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                ¡El conocimiento que adquieres hoy cambiará tu futuro!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;