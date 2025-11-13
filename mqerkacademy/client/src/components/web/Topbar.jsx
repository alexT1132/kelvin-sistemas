import Logo from "../../assets/web/MQerk_logo.png";
import Guardianes from "../../assets/web/guardianes.png";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <header className="w-full bg-[#3818c3] border-b-2 border-[#fff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo izquierda */}
          <div className="flex-shrink-0">
            <Link to='/' className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
              <img src={Logo} alt="MQerkAcademy" />
            </Link>
          </div>

          {/* Texto central */}
          <div className="flex-1 px-2 sm:px-4 md:px-8">
            <h1 className="text-white text-center font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
              Asesores Especializados en la Enseñanza de las Ciencias y Tecnología
            </h1>
          </div>

          {/* Icono derecha */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 md:w-20 md:h-20 flex items-center justify-center">
              <img src={Guardianes} alt="Guardianes" />
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}