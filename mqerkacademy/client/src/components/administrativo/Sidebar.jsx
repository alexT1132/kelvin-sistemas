import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Home, 
  LayoutGrid, 
  Receipt, 
  Users, 
  FileText, 
  FileCheck, 
  Calendar, 
  Mail, 
  UsersRound, 
  TrendingUp, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState();

  const menuItems = [
    { id: 'home', icon: Home, label: 'Inicio', to: '/administrativo' },
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard', to: '/administrativo/dashboard' },
    { id: 'receipts', icon: Receipt, label: 'Comprobantes recibidos', to: '/administrativo/comprobantes' },
    { id: 'team', icon: Users, label: 'Lista de alumnos' },
    { id: 'documents', icon: FileText, label: 'Generar contrato' },
    { id: 'files', icon: FileCheck, label: 'Reportes de pagos' },
    { id: 'calendar', icon: Calendar, label: 'Calendario' },
    { id: 'messages', icon: Mail, label: 'Email' },
    { id: 'community', icon: UsersRound, label: 'Asesores' },
    { id: 'analytics', icon: TrendingUp, label: 'Finanzas' },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Configuración' },
    { id: 'logout', icon: LogOut, label: 'Salir' },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Menu Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          md:hidden fixed bottom-6 right-6 z-50 
          w-14 h-14 rounded-full 
          flex items-center justify-center
          transition-all duration-200 shadow-lg
          ${isOpen 
            ? 'bg-gray-800' 
            : 'bg-gray-900'
          }
          text-white
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-16 bg-white h-full border-r border-gray-100
          fixed md:static top-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'flex translate-x-0' : 'hidden md:flex translate-x-0'}
          flex-col
        `}
      >
        {/* Main Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 flex flex-col items-center justify-start">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const ruta = item.to;

            return (
              <Link
                key={item.id}
                to={ruta}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full p-3 rounded-lg flex items-center justify-center
                  transition-all duration-150 group relative flex-shrink-0
                  ${isActive 
                    ? 'bg-blue-50 text-[#3d18c3]' 
                    : 'text-[#3d18c3] hover:bg-blue-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
                
                {/* Tooltip - Desktop only, no mobile */}
                <span className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="py-3 px-2 space-y-1 border-t border-gray-100 flex-shrink-0">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isLogout = item.id === 'logout';

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full p-3 rounded-lg flex items-center justify-center
                  transition-all duration-150 group relative
                  ${isLogout 
                    ? isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                    : isActive 
                      ? 'bg-blue-50 text-[#3d18c3]'
                      : 'text-[#3d18c3] hover:text-[#3d18c3] hover:bg-blue-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
                
                {/* Tooltip - Desktop only, no mobile */}
                <span className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;