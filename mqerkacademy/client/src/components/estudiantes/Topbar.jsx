import { BookOpen, Calendar, CreditCard, Bell } from 'lucide-react';

export default function Topbar({ isVisible }) {
  return (
    <header className="relative z-20 bg-purple-900/30 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-700" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86 0-7-3.14-7-7V8.5l7-3.5 7 3.5V13c0 3.86-3.14 7-7 7z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">MQerk</h1>
              <p className="text-purple-200 text-xs">Academy</p>
            </div>
          </div>

          {/* Menú de navegación */}
          <nav className={`hidden md:flex items-center gap-2 bg-purple-800/40 backdrop-blur-sm rounded-2xl px-4 py-2 border border-purple-500/30 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/50 text-white font-medium hover:bg-purple-600 transition-all duration-300">
              <BookOpen className="w-4 h-4" />
              Cursos
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 font-medium hover:bg-purple-600/30 transition-all duration-300">
              <Calendar className="w-4 h-4" />
              Calendario
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 font-medium hover:bg-purple-600/30 transition-all duration-300">
              <CreditCard className="w-4 h-4" />
              Mis pagos
            </button>
          </nav>

          {/* Iconos derecha */}
          <div className={`flex items-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <button className="text-white hover:text-purple-200 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-white/10 relative">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-sm sm:text-base">A</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-purple-900"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

