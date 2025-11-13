import { useState, useEffect } from 'react';
import { Bell, LogOut, Clock, BookOpen, User, BarChart3 } from 'lucide-react';
import { Link } from "react-router-dom";

export default function MQerkAcademy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Datos del curso (puedes hacerlo dinámico después)
  const curso = {
    categoria: "preparación",
    titulo: "Curso EEAU",
    instructor: "Kelvin Valentín Ramírez",
    duracion: "8 meses",
    imagen: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
    progreso: 0,
    totalCursos: 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-700" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86 0-7-3.14-7-7V8.5l7-3.5 7 3.5V13c0 3.86-3.14 7-7 7z"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-bold text-lg">MQerk</h1>
                <p className="text-purple-200 text-xs">Academy</p>
              </div>
            </div>

            {/* Título central */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <h2 className="text-white font-bold text-xl lg:text-2xl tracking-wide">
                MQERKACADEMY
              </h2>
            </div>

            {/* Iconos derecha */}
            <div className={`flex items-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Salir */}
              <button className="text-white hover:text-purple-200 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-white/10">
                <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {/* Notificaciones */}
              <button className="text-white hover:text-purple-200 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-white/10 relative">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {/* Avatar */}
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-bold text-sm sm:text-base">A</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-purple-700"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Título de sección */}
        <div className={`mb-8 sm:mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MIS CURSOS
                </span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {" "}ACTIVOS
                </span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-md">
              <span className="text-gray-600 font-medium">Total:</span>
              <span className="text-2xl font-bold text-purple-600">{curso.totalCursos}</span>
            </div>
          </div>
        </div>

        {/* Grid de cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Card del curso */}
          <div 
            className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {/* Imagen del curso */}
            <div className="relative overflow-hidden h-40 sm:h-44">
              <img 
                src={curso.imagen}
                alt={curso.titulo}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Badge de categoría */}
              <div className="absolute top-3 left-3">
                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                  {curso.categoria}
                </span>
              </div>
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Contenido */}
            <div className="p-5 space-y-3">
              {/* Título */}
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                {curso.titulo}
              </h3>

              {/* Instructor */}
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm font-medium line-clamp-1">
                  Por {curso.instructor}
                </p>
              </div>

              {/* Detalles */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                {/* Duración */}
                <div className="flex items-center gap-2.5 text-gray-700">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Duración: {curso.duracion}</span>
                </div>

                {/* Lecciones */}
                <div className="flex items-center gap-2.5 text-gray-700">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Lecciones interactivas</span>
                </div>

                {/* Progreso */}
                <div className="flex items-center gap-2.5 text-gray-700">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Progreso: {curso.progreso}%</span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="pt-1">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${curso.progreso}%` }}
                  ></div>
                </div>
              </div>

              {/* Botón */}
              <Link to="/estudiantes/home" className="w-full mt-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                IR AL DASHBOARD
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Mensaje si no hay cursos (opcional) */}
        {curso.totalCursos === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No tienes cursos activos</h3>
            <p className="text-gray-500">Explora nuestro catálogo para comenzar tu aprendizaje</p>
          </div>
        )}
      </main>

      {/* Estilos personalizados */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .animate-twinkle {
          animation: twinkle 2s infinite;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}