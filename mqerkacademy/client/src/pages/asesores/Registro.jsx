import Topbar from '../../components/web/Topbar';
import PreRegistro from '../../components/asesores/Registro';

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Topbar */}
      <Topbar />
      
      {/* Contenido del formulario */}
      <PreRegistro />
    </div>
  );
}