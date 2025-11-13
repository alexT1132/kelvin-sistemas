import { Settings, LogOut } from 'lucide-react';

export default function Sidebar({
  menuItems,
  activeMenu,
  setActiveMenu,
  isSidebarExpanded,
  setIsSidebarExpanded,
  isVisible,
}) {
  return (
    <aside
      className={`bg-white/95 backdrop-blur-md border-r border-gray-200 flex flex-col py-6 overflow-y-auto transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsSidebarExpanded(true)}
      onMouseLeave={() => setIsSidebarExpanded(false)}
    >
      <div className="space-y-1 px-3">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full rounded-xl flex items-center transition-all duration-300 transform hover:scale-105 relative group ${
              isSidebarExpanded ? 'px-4 py-3 gap-3' : 'w-14 h-14 justify-center'
            } ${
              activeMenu === item.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-purple-50'
            } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />

            {/* Texto */}
            <span
              className={`font-medium whitespace-nowrap transition-all duration-300 ${
                isSidebarExpanded
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4 absolute pointer-events-none'
              }`}
            >
              {item.text}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div
        className={`h-px bg-gray-200 transition-all duration-300 ${
          isSidebarExpanded ? 'mx-6 my-4' : 'mx-4 my-2'
        }`}
      ></div>

      {/* Configuración */}
      <div className="space-y-1 px-3 mt-auto">
        <button
          className={`w-full rounded-xl flex items-center text-gray-700 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 ${
            isSidebarExpanded ? 'px-4 py-3 gap-3' : 'w-14 h-14 justify-center'
          }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span
            className={`font-medium whitespace-nowrap transition-all duration-300 ${
              isSidebarExpanded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4 absolute pointer-events-none'
            }`}
          >
            Configuración
          </span>
        </button>

        {/* Cerrar sesión */}
        <button
          className={`w-full rounded-xl flex items-center text-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-105 ${
            isSidebarExpanded ? 'px-4 py-3 gap-3' : 'w-14 h-14 justify-center'
          }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span
            className={`font-medium whitespace-nowrap transition-all duration-300 ${
              isSidebarExpanded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4 absolute pointer-events-none'
            }`}
          >
            Cerrar Sesión
          </span>
        </button>
      </div>
    </aside>
  );
}

