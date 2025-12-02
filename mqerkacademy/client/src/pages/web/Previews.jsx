import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Star, BookOpen, Award, X } from 'lucide-react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePreview } from "../../context/PreviewContext";
import Navbar from "../../components/web/Navbar.jsx";

export default function CoursePreviewView() {
  const { courseId } = useParams();
  const { loadByCourse } = usePreview();

  // Estados del componente
  const [activeTab, setActiveTab] = useState('Descripción');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para datos del preview
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [aprenderas, setAprenderas] = useState([]);
  const [areasEnsenanza, setAreasEnsenanza] = useState([]);
  
  // Estados para datos del curso
  const [courseName, setCourseName] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [courseModalidad, setCourseModalidad] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseRating, setCourseRating] = useState(0);
  const [courseLevel, setCourseLevel] = useState('');
  const [tagline, setTagline] = useState('');
  const [totalClasses, setTotalClasses] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');

  // Estados para el plan lateral
  const [planLateralNombre, setPlanLateralNombre] = useState('MENSUAL');
  const [planLateralPrecio, setPlanLateralPrecio] = useState('0');
  const [planLateralPrecioTachado, setPlanLateralPrecioTachado] = useState('0');
  const [planLateralDescuento, setPlanLateralDescuento] = useState('0');
  const [planLateralBeneficios, setPlanLateralBeneficios] = useState([]);

  // Estados para los planes de precios
  const [planes, setPlanes] = useState([]);

  const navigate = useNavigate();

  const handleAdquirir = () => {
    navigate('/estudiantes/suscripcion');
  };

  // Cargar preview al montar el componente
  useEffect(() => {
    const loadPreviewData = async () => {
      if (!courseId) {
        console.log("❌ No hay courseId");
        return;
      }
      
      console.log("🔍 Cargando preview para courseId:", courseId);
      
      try {
        setIsLoading(true);
        const previewData = await loadByCourse(courseId);
        
        console.log("✅ Preview data recibida:", previewData);
        
        if (previewData) {
          // Cargar video
          const videoUrlFromDB = previewData.video_url || '';
          setVideoUrl(videoUrlFromDB);
          
          // Convertir URL a embedUrl
          if (videoUrlFromDB) {
            let videoId = '';
            
            if (videoUrlFromDB.includes('youtu.be/')) {
              videoId = videoUrlFromDB.split('youtu.be/')[1]?.split('?')[0];
            } else if (videoUrlFromDB.includes('youtube.com/watch?v=')) {
              videoId = videoUrlFromDB.split('v=')[1]?.split('&')[0];
            } else if (videoUrlFromDB.includes('youtube.com/embed/')) {
              videoId = videoUrlFromDB.split('embed/')[1]?.split('?')[0];
            }
            
            if (videoId) {
              setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
            }
          }
          
          // Cargar contenido
          setDescripcion(previewData.descripcion || '');
          setAprenderas(previewData.aprenderas || []);
          setAreasEnsenanza(previewData.areas_ensenanza || []);
          setTagline(previewData.tagline || '');
          setTotalClasses(previewData.total_classes || '');
          setHoursPerDay(previewData.hours_per_day || '');
          
          // Cargar datos del curso desde el preview
          setCourseName(previewData.curso_nombre || '');
          setCourseImage(previewData.curso_imagen || '');
          setCourseModalidad(previewData.curso_modalidad || 'PRESENCIAL');
          setCourseLevel(previewData.curso_nivel || 'BÁSICO');
          
          // Cargar rating desde la BD
          setCourseRating(previewData.rating || 4.5);
          
          // Formatear duración correctamente desde la base de datos
          let durationText = '';
          if (previewData.duration && previewData.durationUnit) {
            // Convertir a número y formatear sin decimales si es entero
            const duration = parseFloat(previewData.duration);
            const formattedDuration = Number.isInteger(duration) ? duration : duration.toFixed(0);
            durationText = `${formattedDuration} ${previewData.durationUnit}`;
          } else if (previewData.duration) {
            const duration = parseFloat(previewData.duration);
            const formattedDuration = Number.isInteger(duration) ? duration : duration.toFixed(0);
            durationText = String(formattedDuration);
          } else {
            durationText = '8 Meses';
          }
          setCourseDuration(durationText);
          
          // Plan lateral
          setPlanLateralNombre(previewData.plan_lateral?.nombre || 'MENSUAL');
          setPlanLateralPrecio(previewData.plan_lateral?.precio || '0');
          setPlanLateralPrecioTachado(previewData.plan_lateral?.precio_tachado || '0');
          setPlanLateralDescuento(previewData.plan_lateral?.descuento || '0');
          setPlanLateralBeneficios(previewData.plan_lateral?.beneficios || []);
          
          // Planes de precios
          if (previewData.planes && previewData.planes.length > 0) {
            setPlanes(previewData.planes);
          }
        }
      } catch (error) {
        console.error("❌ Error al cargar preview:", error);
        console.error("Error completo:", error.response?.data || error.message);
      } finally {
        console.log("✅ Terminó de cargar (isLoading = false)");
        setIsLoading(false);
      }
    };

    loadPreviewData();
  }, [courseId, loadByCourse]); // ✅ Ahora loadByCourse es estable con useCallback

  // Cerrar modal al presionar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">Cargando preview...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            {tagline && (
              <div className="inline-block">
                <span className="text-white text-sm font-medium px-4 py-2 backdrop-blur-sm">
                  • {tagline}
                </span>
              </div>
            )}
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {courseName}
            </h2>
            
            <button 
              onClick={() => setShowModal(true)}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              Inscríbete ahora
            </button>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/30 to-indigo-400/30 rounded-3xl blur-2xl"></div>
            <img 
              src={courseImage}
              alt={courseName}
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-video"
            />
          </div>
        </div>
      </div>

      {/* Course Info Section */}
      <div className="bg-white rounded-t-[3rem] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Info Cards */}
          <div className="mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              Información del curso
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Modalidad */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Calendar className="w-6 h-6 text-indigo-600 mb-3" />
                <p className="text-gray-700 font-medium text-sm">{courseModalidad}</p>
              </div>
              
              {/* Clases */}
              {totalClasses && (
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <BookOpen className="w-6 h-6 text-indigo-600 mb-3" />
                  <p className="text-gray-700 font-medium text-sm">{totalClasses}</p>
                </div>
              )}
              
              {/* Horas por día */}
              {hoursPerDay && (
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <Clock className="w-6 h-6 text-indigo-600 mb-3" />
                  <p className="text-gray-700 font-medium text-sm">{hoursPerDay}</p>
                </div>
              )}
              
              {/* Duración */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Users className="w-6 h-6 text-indigo-600 mb-3" />
                <p className="text-gray-700 font-medium text-sm">{courseDuration}</p>
              </div>
              
              {/* Nivel */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Award className="w-6 h-6 text-indigo-600 mb-3" />
                <p className="text-gray-700 font-medium text-sm">{courseLevel}</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Video */}
            <div className="lg:col-span-2">
              {/* Video */}
              <div className="bg-gray-50 rounded-3xl overflow-hidden min-h-[400px] border-2 border-gray-200">
                {embedUrl ? (
                  <iframe
                    src={`${embedUrl}?autoplay=1&mute=1`}
                    className="w-full h-[400px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="p-8 lg:p-12 h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-400 text-lg">No hay video disponible</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="mt-8">
                <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('Descripción')}
                    className={`px-6 py-3 font-semibold rounded-t-xl transition-colors whitespace-nowrap ${
                      activeTab === 'Descripción'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Descripción
                  </button>
                  <button
                    onClick={() => setActiveTab('Aprenderás')}
                    className={`px-6 py-3 font-semibold rounded-t-xl transition-colors whitespace-nowrap ${
                      activeTab === 'Aprenderás'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Aprenderás
                  </button>
                  <button
                    onClick={() => setActiveTab('Áreas de enseñanza')}
                    className={`px-6 py-3 font-semibold rounded-t-xl transition-colors whitespace-nowrap ${
                      activeTab === 'Áreas de enseñanza'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Áreas de enseñanza
                  </button>
                </div>
                
                <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-gray-200 p-8">
                  {/* Tab: Descripción */}
                  {activeTab === 'Descripción' && (
                    <div className="prose max-w-none">
                      {descripcion ? (
                        <p className="text-gray-700 whitespace-pre-wrap">{descripcion}</p>
                      ) : (
                        <p className="text-gray-400 text-center py-8">No hay descripción disponible</p>
                      )}
                    </div>
                  )}

                  {/* Tab: Aprenderás */}
                  {activeTab === 'Aprenderás' && (
                    <div>
                      {aprenderas.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No hay información disponible</p>
                      ) : (
                        <ul className="space-y-3">
                          {aprenderas.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                              <span className="text-indigo-600 font-bold mt-1">•</span>
                              <span className="flex-1 text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Tab: Áreas de enseñanza */}
                  {activeTab === 'Áreas de enseñanza' && (
                    <div>
                      {areasEnsenanza.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No hay áreas definidas</p>
                      ) : (
                        <div className="flex flex-wrap gap-3">
                          {areasEnsenanza.map((area, index) => (
                            <div
                              key={index}
                              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium"
                            >
                              {area}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
                <p className="text-indigo-600 font-semibold mb-2">{planLateralNombre}</p>
                
                <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                  <span className="text-5xl font-bold text-gray-900">${planLateralPrecio}</span>
                  <span className="text-gray-500">MXN</span>
                  
                  {planLateralPrecioTachado !== '0' && (
                    <span className="text-gray-400 line-through">${planLateralPrecioTachado}</span>
                  )}
                  
                  {planLateralDescuento !== '0' && (
                    <span className="text-green-600 font-semibold">-{planLateralDescuento}%</span>
                  )}
                </div>
                
                <div className="mb-6 space-y-2">
                  {planLateralBeneficios.length === 0 ? (
                    <p className="text-gray-400 text-sm italic">No hay beneficios listados</p>
                  ) : (
                    planLateralBeneficios.map((beneficio, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-gray-600">•</span>
                        <span className="flex-1 text-gray-600 text-sm">{beneficio}</span>
                      </div>
                    ))
                  )}
                </div>
                
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105"
                >
                  Ver más planes
                </button>
              </div>

              {/* Rating */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Valoración</span>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(courseRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="font-bold text-gray-900 ml-2">{courseRating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Planes */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-fast"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:bg-white/10 rounded-full p-2 transition-all z-10"
            >
              <X className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>

            <div className="p-8 sm:p-12 pt-20">
              <h2 className="text-white text-4xl sm:text-5xl font-bold text-center mb-4">
                ELIGE UN PLAN A TU MEDIDA
              </h2>

              {/* Grid de planes */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {planes.length === 0 ? (
                  <div className="col-span-3 text-center text-white/80 py-12">
                    No hay planes disponibles
                  </div>
                ) : (
                  planes.map((plan, index) => (
                    <div 
                      key={index}
                      className={`backdrop-blur-md rounded-3xl p-6 transition-all duration-300 transform hover:scale-105 ${
                        plan.destacado 
                          ? 'bg-white/20 border-4 border-white/40 hover:border-white/60 md:scale-110 shadow-2xl' 
                          : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
                      }`}
                    >
                      <h3 className="text-white text-2xl font-bold text-center mb-4">
                        {plan.nombre}
                      </h3>
                      
                      <p className="text-white/90 text-center text-sm mb-6">
                        {plan.descripcion}
                      </p>

                      <div className="space-y-2 mb-6">
                        {plan.beneficios.map((beneficio, beneficioIndex) => (
                          <div key={beneficioIndex} className="flex items-start gap-2">
                            <span className="text-white font-bold mt-1">•</span>
                            <span className="flex-1 text-white/90 text-sm">{beneficio}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-white/80 text-sm text-center mb-2">
                        {plan.etiquetaPrecio}
                      </p>

                      <div className="flex justify-center items-center mb-6">
                        <span className="text-white text-4xl font-bold">${plan.precio}</span>
                      </div>

                      <button 
                      onClick={handleAdquirir}
                      className="w-full bg-white text-indigo-600 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all transform hover:scale-105">
                        Adquirir
                      </button>
                    </div>
                  ))
                )}
              </div>

              <p className="text-white/80 text-center text-xs mt-8 max-w-3xl mx-auto">
                Nota: El proceso de pago podrá realizarse una vez finalizado el registro en el formulario de MQerKAcademy. 
                Los detalles correspondientes se encontrarán en el panel principal (dashboard) de la plataforma.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-fast {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }

        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}