import React from 'react';
import { Clock, BookOpen, User, ArrowRight } from 'lucide-react';

const MisCursosActivos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MIS CURSOS ACTIVOS
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Total:</span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg sm:text-xl px-4 py-1 rounded-full shadow-lg">
                1
              </span>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-4 rounded-full" />
        </div>

        {/* Grid de cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Card del curso */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-slideUp">
            
            {/* Imagen del curso */}
            <div className="relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  Preparación
                </span>
              </div>
              
              {/* Imagen con efecto hover */}
              <div className="relative h-48 sm:h-52 bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80" 
                  alt="Curso EEAU"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

            {/* Contenido de la card */}
            <div className="p-5 sm:p-6 space-y-4">
              
              {/* Título del curso */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                Curso EEAU
              </h2>

              {/* Instructor */}
              <div className="flex items-center gap-2 text-gray-600">
                <User size={16} className="text-purple-600" />
                <p className="text-sm font-medium">Por Kelvin Valentin Ramirez</p>
              </div>

              {/* Información del curso */}
              <div className="space-y-2">
                {/* Duración */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-blue-600" />
                  <span className="text-sm font-medium">Duración: 8 meses</span>
                </div>

                {/* Lecciones */}
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen size={16} className="text-green-600" />
                  <span className="text-sm font-medium">Lecciones interactivas</span>
                </div>

                {/* Progreso */}
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={16} className="text-orange-600" />
                  <span className="text-sm font-medium">Progreso: 0%</span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="pt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>

              {/* Botón */}
              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                <span>IR AL DASHBOARD</span>
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Puedes agregar más cards aquí duplicando la estructura */}
          
        </div>

        {/* Mensaje si no hay más cursos */}
        <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <p className="text-gray-500 text-sm sm:text-base">
            ¿Buscas más cursos? <span className="text-purple-600 font-semibold cursor-pointer hover:underline">Explora nuestro catálogo</span>
          </p>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export { MisCursosActivos };