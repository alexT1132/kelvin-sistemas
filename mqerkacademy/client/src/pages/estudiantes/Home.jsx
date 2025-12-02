import { useState, useEffect } from 'react';
import { 
  Home, BookOpen, User, Clock, Activity, MessageSquare, 
  CheckCircle, Calendar, CreditCard, GraduationCap, Star 
} from 'lucide-react';
// import Topbar from '../../components/estudiantes/Topbar';
import Sidebar from '../../components/estudiantes/Sidebar';

export default function MQerkDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Datos del usuario
  const userName = "martin";
  const cursoActual = {
    nombre: "Curso EEAU",
    instructor: "Kelvin Valentín Ramírez"
  };

  // Actualizar reloj
  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatear hora
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Formatear fecha
  const formatDate = (date) => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  };

  // Obtener saludo
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 19) return "¡Buenas tardes";
    return "¡Buenas noches";
  };

  // Menú items
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', text: 'Inicio', to: '/estudiantes/home' },
    { id: 'courses', icon: BookOpen, label: 'BookOpen', text: 'Mis Cursos', to: '/estudiantes/mis-cursos' },
    { id: 'profile', icon: User, label: 'User', text: 'Mi Perfil' },
    { id: 'history', icon: Clock, label: 'Clock', text: 'Actividades' },
    { id: 'activity', icon: Activity, label: 'Activity', text: 'Simulaciones' },
    { id: 'messages', icon: MessageSquare, label: 'MessageSquare', text: 'Feedback' },
    { id: 'completed', icon: CheckCircle, label: 'CheckCircle', text: 'Asistencia' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', text: 'Calendario' },
    { id: 'payments', icon: CreditCard, label: 'CreditCard', text: 'Mis Pagos' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 relative overflow-hidden">
      {/* Estrellas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-purple-300 opacity-30 animate-twinkle"
            size={Math.random() * 15 + 5}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      {/* <Topbar isVisible={isVisible} /> */}

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <Sidebar
          menuItems={menuItems}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
          isVisible={isVisible}
        />

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {/* Saludo */}
            <div className={`text-center mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl mb-2">
                {getGreeting()}, {userName}!
              </h1>
            </div>

            {/* Grid de contenido */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Curso Actual Card */}
              <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  
                  <div className="relative bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 shadow-2xl">
                    {/* Icono */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Título */}
                    <div className="text-center mb-6">
                      <p className="text-purple-200 text-sm font-medium mb-2">Curso Actual</p>
                      <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg mb-4">
                        {cursoActual.nombre}
                      </h2>
                      
                      {/* Instructor badge */}
                      <div className="inline-block bg-purple-500/40 backdrop-blur-sm border border-purple-300/30 rounded-full px-6 py-2">
                        <p className="text-white text-sm font-medium">
                          Instructor: {cursoActual.instructor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reloj y Frase */}
              <div className="space-y-8">
                {/* Reloj */}
                <div className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="text-center">
                    <div 
                      className="text-7xl sm:text-8xl lg:text-9xl font-black text-white leading-none mb-4"
                      style={{
                        textShadow: `
                          0 5px 0 rgba(139, 92, 246, 0.8),
                          0 10px 0 rgba(124, 58, 237, 0.7),
                          0 15px 0 rgba(109, 40, 217, 0.6),
                          0 20px 0 rgba(91, 33, 182, 0.5),
                          0 25px 10px rgba(0, 0, 0, 0.3),
                          0 0 40px rgba(255, 255, 255, 0.3)
                        `,
                        WebkitTextStroke: '2px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      {formatTime(currentTime)}
                    </div>
                    <p className="text-white/90 text-base sm:text-lg font-medium drop-shadow-md">
                      {formatDate(currentTime)}
                    </p>
                  </div>
                </div>

                {/* Frase del día */}
                <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-yellow-900" />
                      </div>
                      <h3 className="text-xl font-bold text-yellow-300">Frase del día</h3>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white text-center drop-shadow-md">
                      ¡Cada momento de estudio te hace más sabio!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Estilos */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }

        /* Ocultar scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
        }

        *::-webkit-scrollbar {
          width: 6px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background-color: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background-color: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
}