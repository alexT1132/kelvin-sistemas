import React, { useState, useEffect } from 'react';
import { Wrench, Clock, Mail } from 'lucide-react';

export default function MaintenancePage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
          {/* Icono animado */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-purple-600 p-6 rounded-full">
                <Wrench className="w-12 h-12 text-white animate-spin-slow" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Estamos en Mantenimiento
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-slate-300 text-center mb-8">
            Estamos mejorando nuestros servicios para brindarte una mejor experiencia
          </p>

          {/* Reloj en tiempo real */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <p className="text-slate-400 text-sm uppercase tracking-wider">Hora actual</p>
            </div>
            <p className="text-3xl md:text-4xl font-mono font-bold text-white text-center">
              {formatTime(time)}
            </p>
          </div>

          {/* Información adicional */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="bg-emerald-500/20 p-2 rounded-lg mt-1">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Tiempo estimado</h3>
                <p className="text-slate-400 text-sm">
                  Estaremos de vuelta pronto. El mantenimiento programado finalizará en breve.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="bg-purple-500/20 p-2 rounded-lg mt-1">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">¿Necesitas ayuda?</h3>
                <p className="text-slate-400 text-sm">
                  Contáctanos en{' '}
                  <a href="codecraftsistemas@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    codecraftsistemas@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-slate-500 text-sm">
              Gracias por tu paciencia y comprensión
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}