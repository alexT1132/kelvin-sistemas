import React from 'react';
import { Bell } from 'lucide-react';
import Logo from "../../assets/web/MQerK_logo.png";

const Topbar = () => {
  return (
    <div className="bg-[#3d18c3] text-white px-6 py-4 flex items-center justify-between shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
            <img src={Logo} alt="MQerK Academy Logo" className="w-15 h-15 object-contain" />
        </div>
      </div>

      {/* Title Section */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-xl md:text-2xl font-bold text-center px-4">
          Asesores Especializados en Educación de Ciencia y Tecnología
        </h1>
      </div>

      {/* Right Section - Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-purple-700 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden border-2 border-white cursor-pointer hover:border-yellow-300 transition-colors">
            <img 
              src="/api/placeholder/48/48" 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online status indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-900"></div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;