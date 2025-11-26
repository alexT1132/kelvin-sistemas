import Topbar from '../../components/web/Topbar';
import Credenciales from '../../components/asesores/Credenciales';

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Topbar */}
      <Topbar />
      
      {/* Contenido del formulario */}
      <Credenciales />
    </div>
  );
}