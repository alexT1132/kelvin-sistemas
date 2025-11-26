import { useCursos } from "../../context/CursosContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WHATSAPP_PHONE = "522871515760";

// Utilidad para generar el link con mensaje precargado
const buildWaLink = (courseTitle) => {
  const msg = `Hola, me gustaría inscribirme al curso: "${courseTitle}". ¿Podrían darme más información?`;
  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
};

export default function CursosGrid() {

  const { cursos, ObtenerCursos } = useCursos();
  const navigate = useNavigate();

  const docentes = cursos.filter(c => c.section === 'docentes');
  const estudiantes = cursos.filter(c => c.section === 'alumnos');

  useEffect(() => {
    ObtenerCursos();
  }, []);

  // ✨ previews de cursos  
  const handlePreview = async (curso) => {
  const slug = curso.nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  navigate(`/${curso.id}`);
};

  const SeccionCursos = ({ titulo, lista }) => (
    <section className="mb-16">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-indigo-700">{titulo}</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {lista.map(c => (
          <div key={c.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-2 transition">
            <div className="relative h-40">
              <img src={c.imagenUrl} alt={c.nombre} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">{c.nivel}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold leading-snug">{c.nombre}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.subtitulo}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tags.map(t => (<span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t}</span>))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-2 py-1 border rounded">{c.duration} {c.durationUnit}</span>
                  <span className="inline-block px-2 py-1 border rounded">{c.modalidad}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{c.rating} ★</div>
                  <div className="text-xs">{c.alumnos} alumnos</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button 
                  onClick={() => handlePreview(c)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  Ver temario
                </button>
                <a
                  href={buildWaLink(c.nombre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inscribirme en WhatsApp al curso ${c.nombre}`}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Inscribirme
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold leading-tight text-[#F4138A]">Nuestros cursos</h2>
        <p className="mt-2 text-gray-600">
          Programas diseñados para desarrollar habilidades reales y aprobar exámenes. Todos los cursos incluyen <span className="font-semibold">certificado</span>.
        </p>
      </div>
      <SeccionCursos titulo="Cursos para Estudiantes" lista={estudiantes} />
      <SeccionCursos titulo="Cursos para Docentes" lista={docentes ? docentes : 'No hay cursos disponibles'} />
    </div>
  );
}
