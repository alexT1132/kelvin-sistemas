import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, ChevronUp, ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('Jessica'); // Puedes obtener esto de tu contexto/auth
  const [notifications] = useState({
    unread: 0,
    today: 0
  });

  // Actualizar reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatear fecha
  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = date.toLocaleDateString('es-ES', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  // Formatear hora
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Obtener saludo según la hora
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 19) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  return (
    <div className="min-h-full">
      {/* Hero Banner con Gradiente */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 rounded-3xl p-8 md:p-12 mb-8 overflow-hidden shadow-xl animate-fade-in">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-400 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-down">
            {getGreeting()}
          </h1>
          <p className="text-xl md:text-2xl mb-2 animate-slide-down animation-delay-100">
            <span className="text-yellow-300 font-semibold">{userName}</span>
          </p>
          <p className="text-base md:text-lg opacity-90 animate-slide-down animation-delay-200">
            Bienvenido al panel administrativo de MQerKAcademy
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-bounce-slow">
            <span className="text-2xl">🎉</span>
            <span className="text-sm md:text-base">¡Que tengas un excelente día!</span>
            <span className="text-2xl">🚀</span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Fecha Card */}
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in animation-delay-300">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-8 h-8 text-blue-600" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fecha</h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>

        {/* Hora Card */}
        <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in animation-delay-400">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-purple-600" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hora</h3>
            <p className="text-3xl font-bold text-gray-800 tabular-nums">
              {formatTime(currentTime)}
            </p>
          </div>
        </div>

        {/* Notificaciones Card */}
        <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in animation-delay-500">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative">
              <Bell className="w-8 h-8 text-orange-600" strokeWidth={2} />
              <div className="absolute -top-1 -right-1 flex gap-1">
                <ChevronUp className="w-4 h-4 text-orange-600" />
                <ChevronDown className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Notificaciones</h3>
            <div className="text-center">
              <p className="text-sm text-gray-600">{notifications.unread} sin leer</p>
              <p className="text-sm text-gray-600">{notifications.today} hoy</p>
              <p className="text-xs text-gray-500 mt-2">No hay notificaciones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 animate-fade-in animation-delay-600">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Decorative element */}
          <div className="flex gap-1 mb-6 opacity-30">
            <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
          </div>
          
          <blockquote className="text-2xl md:text-3xl font-serif text-gray-700 italic mb-6 leading-relaxed">
            "Lo que esculpe al ser humano es su capacidad de aprender"
          </blockquote>
          
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-px bg-gray-400"></div>
            <p className="text-sm md:text-base">Anónimo</p>
            <div className="w-8 h-px bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;