import React, { useState } from 'react';
import { LogOut, Bell, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/web/MQerk_logo.png";

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Datos de ejemplo - reemplazar con datos reales
  const notifications = [
    { id: 1, message: 'Nuevo curso disponible', time: 'Hace 5 min', unread: true },
    { id: 2, message: 'Actualización de horarios', time: 'Hace 1 hora', unread: true },
    { id: 3, message: 'Recordatorio de pago', time: 'Hace 2 horas', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    // Lógica de logout
    console.log('Logout');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 shadow-lg sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 relative">
          
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={Logo} 
                alt="MQerK Academy" 
                className="h-10 sm:h-15 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Center Text */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              MQERKACADEMY
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Logout Button - Desktop */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Salir</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 transform hover:scale-110 border border-white/20"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown de Notificaciones */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-down z-50">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3">
                    <h3 className="text-white font-bold text-lg">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">
                        No hay notificaciones
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            notif.unread ? 'bg-indigo-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && (
                              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                            )}
                            <div className="flex-1">
                              <p className="text-gray-800 font-medium text-sm">
                                {notif.message}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 sm:gap-3 group"
              >
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Usuario"
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-3 border-white/30 group-hover:border-white transition-all duration-300 transform group-hover:scale-110 object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-700"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-white font-semibold text-sm">Alejandro</p>
                  <p className="text-white/70 text-xs">Estudiante</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-down z-50">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <p className="font-bold text-gray-800">Alejandro</p>
                    <p className="text-sm text-gray-600">estudiante@example.com</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/perfil"
                      className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/configuracion"
                      className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors"
                    >
                      Configuración
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center gap-2 sm:hidden"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {(showNotifications || showMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowMenu(false);
          }}
        ></div>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}