import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Star, BookOpen, Video, Award, X, Plus, Trash2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePreview } from "../../context/mqerk/PreviewContext";

export default function CoursePreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state || {};
  
  const { preview, createPreview, updatePreview, loadByCourse } = usePreview();

  // Estados del componente
  const [activeTab, setActiveTab] = useState('Descripción');
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para Toast/Notificaciones
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  // Estados para contenido de tabs
  const [descripcion, setDescripcion] = useState('');
  const [aprenderas, setAprenderas] = useState([]);
  const [newAprenderas, setNewAprenderas] = useState('');
  const [areasEnsenanza, setAreasEnsenanza] = useState([]);
  const [newArea, setNewArea] = useState('');
  
  // Estados para los datos editables del curso
  const [courseName, setCourseName] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [courseModalidad, setCourseModalidad] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseRating, setCourseRating] = useState(0);
  const [courseLevel, setCourseLevel] = useState('');
  const [tagline, setTagline] = useState('');
  const [totalClasses, setTotalClasses] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');

  // Estados para el plan lateral (resumen)
  const [planLateralNombre, setPlanLateralNombre] = useState('MENSUAL');
  const [planLateralPrecio, setPlanLateralPrecio] = useState('0');
  const [planLateralPrecioTachado, setPlanLateralPrecioTachado] = useState('0');
  const [planLateralDescuento, setPlanLateralDescuento] = useState('0');
  const [planLateralBeneficios, setPlanLateralBeneficios] = useState([]);
  const [newPlanLateralBeneficio, setNewPlanLateralBeneficio] = useState('');

  // Estados para los planes de precios
  const [planes, setPlanes] = useState([
    {
      id: 1,
      nombre: 'Mensual',
      descripcion: 'Pago mes a mes durante los 8 meses',
      precio: '1,500',
      etiquetaPrecio: 'PAGO',
      beneficios: [
        'Acceso a nuestra plataforma educativa',
        'Guías digitales con ejercicios tipo examen',
        'Libros electrónicos en PDF por materia',
        'Simuladores en línea'
      ],
      destacado: false
    },
    {
      id: 2,
      nombre: 'Start',
      descripcion: 'Pago en 2 exhibiciones (inicio y mitad del curso)',
      precio: '5,500',
      etiquetaPrecio: '2 PAGOS DE',
      beneficios: [
        'Acceso a nuestra plataforma educativa',
        'Guías digitales con ejercicios tipo examen',
        'Libros electrónicos en PDF por materia',
        'Simuladores en línea'
      ],
      destacado: true
    },
    {
      id: 3,
      nombre: 'Premium',
      descripcion: 'Pago único con precio preferencial',
      precio: '10,500',
      etiquetaPrecio: '1 SOLO PAGO DE',
      beneficios: [
        'Acceso a nuestra plataforma educativa',
        'Guías digitales con ejercicios tipo examen',
        'Libros electrónicos en PDF por materia',
        'Simuladores en línea'
      ],
      destacado: false
    }
  ]);

  const [newBeneficio, setNewBeneficio] = useState({ 0: '', 1: '', 2: '' });

  // Cargar preview existente si hay courseId
  useEffect(() => {
    const loadPreviewData = async () => {
      if (courseData.courseId) {
        try {
          setIsLoading(true);
          const previewData = await loadByCourse(courseData.courseId);
          
          if (previewData) {
            // Cargar datos del preview
            const videoUrlFromDB = previewData.video_url || '';
            setVideoUrl(videoUrlFromDB);
            
            // Convertir la URL del video a embedUrl
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
            
            setDescripcion(previewData.descripcion || '');
            setAprenderas(previewData.aprenderas || []);
            setAreasEnsenanza(previewData.areas_ensenanza || []);
            setTagline(previewData.tagline || '');
            setTotalClasses(previewData.total_classes || '');
            setHoursPerDay(previewData.hours_per_day || '');
            
            // Plan lateral
            setPlanLateralNombre(previewData.plan_lateral?.nombre);
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
          console.log("No hay preview previo, creando uno nuevo");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadPreviewData();
  }, [courseData.courseId]);

  // Cargar datos del curso cuando el componente se montaa
  useEffect(() => {
    if (courseData) {
      setCourseName(courseData.courseName || '');
      setCourseImage(courseData.imageUrl || '');
      setCourseModalidad(courseData.courseModalidad || '');
      
      // Formatear duración correctamente
      let durationText = '';
      if (courseData.courseDuration && courseData.courseDurationUnit) {
        const duration = parseFloat(courseData.courseDuration); // 8.00 → 8
        const formattedDuration = Number.isInteger(duration) ? duration : duration.toFixed(0);
        durationText = `${formattedDuration} ${courseData.courseDurationUnit}`;
      } 
      setCourseDuration(durationText);
      
      setCourseRating(courseData.courseRating || 0);
      setCourseLevel(courseData.courseLevel || '');
    }
  }, [courseData]);

  // Cerrar modal al presionar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Auto cerrar toast después de 3 segundos
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Función para mostrar toast
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Manejar guardado del preview
  const handleSave = async () => {
    if (!courseData.courseId) {
      showToast("No se puede guardar: falta el ID del curso", 'error');
      return;
    }

    const previewData = {
      course_id: courseData.courseId,
      video_url: videoUrl,
      descripcion,
      aprenderas,
      areas_ensenanza: areasEnsenanza,
      tagline,
      total_classes: totalClasses,
      hours_per_day: hoursPerDay,
      plan_lateral: {
        nombre: planLateralNombre,
        precio: planLateralPrecio,
        precio_tachado: planLateralPrecioTachado,
        descuento: planLateralDescuento,
        beneficios: planLateralBeneficios
      },
      planes: planes
    };

    try {
      setIsLoading(true);
      
      if (preview?.id) {
        await updatePreview(preview.id, previewData);
        showToast("Preview actualizado exitosamente", 'success');
      } else {
        await createPreview(previewData);
        showToast("Preview creado exitosamente", 'success');
      }
      
      setTimeout(() => {
        navigate('/cursos');
      }, 1000);
    } catch (error) {
      showToast("Error al guardar el preview", 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    
    if (url) {
      let videoId = '';
      
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1]?.split('?')[0];
      }
      
      if (videoId) {
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
      }
    } else {
      setEmbedUrl('');
    }
  };

  // Funciones para "Aprenderás"
  const handleAddAprenderas = () => {
    if (newAprenderas.trim()) {
      setAprenderas([...aprenderas, newAprenderas.trim()]);
      setNewAprenderas('');
    }
  };

  const handleRemoveAprenderas = (index) => {
    setAprenderas(aprenderas.filter((_, i) => i !== index));
  };

  // Funciones para "Áreas de enseñanza"
  const handleAddArea = () => {
    if (newArea.trim()) {
      setAreasEnsenanza([...areasEnsenanza, newArea.trim()]);
      setNewArea('');
    }
  };

  const handleRemoveArea = (index) => {
    setAreasEnsenanza(areasEnsenanza.filter((_, i) => i !== index));
  };

  // Funciones para editar planes
  const updatePlanField = (planIndex, field, value) => {
    const newPlanes = [...planes];
    newPlanes[planIndex][field] = value;
    setPlanes(newPlanes);
  };

  const addBeneficio = (planIndex) => {
    if (newBeneficio[planIndex]?.trim()) {
      const newPlanes = [...planes];
      newPlanes[planIndex].beneficios.push(newBeneficio[planIndex].trim());
      setPlanes(newPlanes);
      setNewBeneficio({ ...newBeneficio, [planIndex]: '' });
    }
  };

  const removeBeneficio = (planIndex, beneficioIndex) => {
    const newPlanes = [...planes];
    newPlanes[planIndex].beneficios = newPlanes[planIndex].beneficios.filter((_, i) => i !== beneficioIndex);
    setPlanes(newPlanes);
  };

  const updateBeneficio = (planIndex, beneficioIndex, value) => {
    const newPlanes = [...planes];
    newPlanes[planIndex].beneficios[beneficioIndex] = value;
    setPlanes(newPlanes);
  };

  // Funciones para el plan lateral
  const addPlanLateralBeneficio = () => {
    if (newPlanLateralBeneficio.trim()) {
      setPlanLateralBeneficios([...planLateralBeneficios, newPlanLateralBeneficio.trim()]);
      setNewPlanLateralBeneficio('');
    }
  };

  const removePlanLateralBeneficio = (index) => {
    setPlanLateralBeneficios(planLateralBeneficios.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to='/cursos' className="text-white hover:text-white/80 transition-colors flex items-center gap-2">
            <span>← Volver</span>
          </Link>
          <h1 className="text-white font-semibold text-lg hidden sm:block">
            {preview?.id ? 'Editar Preview' : 'Nuevo Preview'}
          </h1>
          <button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (preview?.id ? 'Actualizando...' : 'Guardando...') : (preview?.id ? 'Actualizar' : 'Guardar')}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="• Añade una frase..."
                className="text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 focus:outline-none focus:border-white/40 placeholder-white/60"
              />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {courseName}
            </h2>
            
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all transform hover:scale-105 hover:shadow-2xl">
              Empieza ya
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
              
              {/* Clases - Editable */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <BookOpen className="w-6 h-6 text-indigo-600 mb-3" />
                <input
                  type="text"
                  value={totalClasses}
                  onChange={(e) => setTotalClasses(e.target.value)}
                  className="text-gray-700 font-medium text-sm w-full bg-white border border-gray-300 rounded px-2 py-1 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="+ 130 clases"
                />
              </div>
              
              {/* Horas por día - Editable */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Clock className="w-6 h-6 text-indigo-600 mb-3" />
                <input
                  type="text"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  className="text-gray-700 font-medium text-sm w-full bg-white border border-gray-300 rounded px-2 py-1 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="2 h al día"
                />
              </div>
              
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
            
            {/* Left Column - Video Upload */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-3xl overflow-hidden min-h-[400px] border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="w-full h-[400px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="p-8 lg:p-12 h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 group">
                      <div className="bg-white rounded-full p-6 group-hover:bg-indigo-600 transition-colors">
                        <Video className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-indigo-600 font-semibold text-lg">Subir video</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* YouTube URL Input */}
              <div className="mt-4">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={handleVideoUrlChange}
                  placeholder="Pega aquí la URL del video de YouTube..."
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-colors text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Tabs */}
              <div className="mt-8">
                <div className="flex gap-2 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('Descripción')}
                    className={`px-6 py-3 font-semibold rounded-t-xl transition-colors ${
                      activeTab === 'Descripción'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Descripción
                  </button>
                  <button
                    onClick={() => setActiveTab('Aprenderás')}
                    className={`px-6 py-3 font-semibold rounded-t-xl transition-colors ${
                      activeTab === 'Aprenderás'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Aprenderás
                  </button>
                  <button
                    onClick={() => setActiveTab('Áreas de enseñanza')}
                    className={`px-6 py-3 font-semibold rounded-t-xl transition-colors ${
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
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Escribe aquí la descripción del curso..."
                      className="w-full min-h-[200px] text-gray-600 placeholder-gray-400 resize-none focus:outline-none border-2 border-gray-200 rounded-lg p-4 focus:border-indigo-500"
                    />
                  )}

                  {/* Tab: Aprenderás */}
                  {activeTab === 'Aprenderás' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAprenderas}
                          onChange={(e) => setNewAprenderas(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddAprenderas()}
                          placeholder="Añade un punto de aprendizaje..."
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-700"
                        />
                        <button
                          onClick={handleAddAprenderas}
                          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                          Añadir
                        </button>
                      </div>

                      {aprenderas.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No hay puntos agregados aún</p>
                      ) : (
                        <ul className="space-y-3">
                          {aprenderas.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg group hover:bg-gray-100 transition-colors">
                              <span className="text-indigo-600 font-bold mt-1">•</span>
                              <span className="flex-1 text-gray-700">{item}</span>
                              <button
                                onClick={() => handleRemoveAprenderas(index)}
                                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity font-semibold"
                              >
                                ✕
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Tab: Áreas de enseñanza */}
                  {activeTab === 'Áreas de enseñanza' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newArea}
                          onChange={(e) => setNewArea(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddArea()}
                          placeholder="Añade un área de enseñanza..."
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-700"
                        />
                        <button
                          onClick={handleAddArea}
                          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                          Añadir
                        </button>
                      </div>

                      {areasEnsenanza.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No hay áreas agregadas aún</p>
                      ) : (
                        <div className="flex flex-wrap gap-3">
                          {areasEnsenanza.map((area, index) => (
                            <div
                              key={index}
                              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium flex items-center gap-2 group hover:bg-indigo-200 transition-colors"
                            >
                              <span>{area}</span>
                              <button
                                onClick={() => handleRemoveArea(index)}
                                className="text-indigo-500 hover:text-indigo-700 font-bold"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing EDITABLE */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
                {/* Nombre del plan - Editable */}
                <input
                  type="text"
                  value={planLateralNombre}
                  onChange={(e) => setPlanLateralNombre(e.target.value)}
                  className="text-indigo-600 font-semibold mb-2 bg-white border-2 border-indigo-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-indigo-500"
                  placeholder="Nombre del plan"
                />
                
                {/* Precios - Editables */}
                <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">$</span>
                    <input
                      type="text"
                      value={planLateralPrecio}
                      onChange={(e) => setPlanLateralPrecio(e.target.value)}
                      className="text-5xl font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-lg px-2 py-1 w-32 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <span className="text-gray-500">MXN</span>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-400">$</span>
                    <input
                      type="text"
                      value={planLateralPrecioTachado}
                      onChange={(e) => setPlanLateralPrecioTachado(e.target.value)}
                      className="text-gray-400 line-through bg-white border-2 border-gray-200 rounded px-2 py-1 w-20 focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-green-600 font-semibold">-</span>
                    <input
                      type="text"
                      value={planLateralDescuento}
                      onChange={(e) => setPlanLateralDescuento(e.target.value)}
                      className="text-green-600 font-semibold bg-white border-2 border-green-200 rounded px-2 py-1 w-16 focus:outline-none focus:border-green-500"
                    />
                    <span className="text-green-600 font-semibold">%</span>
                  </div>
                </div>
                
                {/* Beneficios - Editables */}
                <div className="mb-4 space-y-2">
                  {planLateralBeneficios.length === 0 ? (
                    <p className="text-gray-400 text-sm italic">No hay beneficios agregados</p>
                  ) : (
                    planLateralBeneficios.map((beneficio, index) => (
                      <div key={index} className="flex items-center gap-2 group">
                        <span className="text-gray-600">•</span>
                        <span className="flex-1 text-gray-600">{beneficio}</span>
                        <button
                          onClick={() => removePlanLateralBeneficio(index)}
                          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Añadir beneficio */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newPlanLateralBeneficio}
                    onChange={(e) => setNewPlanLateralBeneficio(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPlanLateralBeneficio()}
                    placeholder="• Escribe un beneficio..."
                    className="flex-1 text-gray-600 bg-white border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={addPlanLateralBeneficio}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
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

      {/* Modal de Planes EDITABLE */}
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
              {/* Título */}
              <h2 className="text-white text-4xl sm:text-5xl font-bold text-center mb-4">
                ELIGE UN PLAN A TU MEDIDA
              </h2>

              {/* Grid de planes EDITABLES */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {planes.map((plan, planIndex) => (
                  <div 
                    key={plan.id}
                    className={`backdrop-blur-md rounded-3xl p-6 transition-all duration-300 transform hover:scale-105 ${
                      plan.destacado 
                        ? 'bg-white/20 border-4 border-white/40 hover:border-white/60 md:scale-110 shadow-2xl' 
                        : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
                    }`}
                  >
                    {/* Nombre del plan - Editable */}
                    <input
                      type="text"
                      value={plan.nombre}
                      onChange={(e) => updatePlanField(planIndex, 'nombre', e.target.value)}
                      className="text-white text-2xl font-bold text-center mb-4 bg-white/10 border border-white/30 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-white/60"
                    />
                    
                    {/* Descripción - Editable */}
                    <textarea
                      value={plan.descripcion}
                      onChange={(e) => updatePlanField(planIndex, 'descripcion', e.target.value)}
                      className="text-white/90 text-center text-sm bg-white/10 border border-white/30 rounded-lg px-3 py-2 w-full mb-4 resize-none focus:outline-none focus:border-white/60"
                      rows="2"
                    />

                    {/* Beneficios - Editables */}
                    <div className="space-y-2 mb-6">
                      {plan.beneficios.map((beneficio, beneficioIndex) => (
                        <div key={beneficioIndex} className="flex items-start gap-2 group">
                          <span className="text-white font-bold mt-2">•</span>
                          <input
                            type="text"
                            value={beneficio}
                            onChange={(e) => updateBeneficio(planIndex, beneficioIndex, e.target.value)}
                            className="flex-1 text-white/90 text-sm bg-white/5 border border-white/20 rounded px-2 py-1 focus:outline-none focus:border-white/40 focus:bg-white/10"
                          />
                          <button
                            onClick={() => removeBeneficio(planIndex, beneficioIndex)}
                            className="text-red-300 hover:text-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* Añadir nuevo beneficio */}
                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          value={newBeneficio[planIndex] || ''}
                          onChange={(e) => setNewBeneficio({ ...newBeneficio, [planIndex]: e.target.value })}
                          onKeyPress={(e) => e.key === 'Enter' && addBeneficio(planIndex)}
                          placeholder="Nuevo beneficio..."
                          className="flex-1 text-white/90 text-sm bg-white/10 border border-white/30 rounded px-3 py-2 placeholder-white/50 focus:outline-none focus:border-white/60"
                        />
                        <button
                          onClick={() => addBeneficio(planIndex)}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Etiqueta de precio - Editable */}
                    <input
                      type="text"
                      value={plan.etiquetaPrecio}
                      onChange={(e) => updatePlanField(planIndex, 'etiquetaPrecio', e.target.value)}
                      className="text-white/80 text-sm text-center bg-white/10 border border-white/30 rounded px-2 py-1 w-full mb-2 focus:outline-none focus:border-white/60"
                    />

                    {/* Precio - Editable */}
                    <div className="flex justify-center items-center mb-6">
                      <span className="text-white text-4xl font-bold">$</span>
                      <input
                        type="text"
                        value={plan.precio}
                        onChange={(e) => updatePlanField(planIndex, 'precio', e.target.value)}
                        className="text-white text-4xl font-bold text-center bg-white/10 border border-white/30 rounded-lg px-3 py-2 w-32 focus:outline-none focus:border-white/60"
                      />
                    </div>

                    <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all transform hover:scale-105">
                      Adquirir
                    </button>
                  </div>
                ))}
              </div>

              {/* Nota al final */}
              <p className="text-white/80 text-center text-xs mt-8 max-w-3xl mx-auto">
                Nota: El proceso de pago podrá realizarse una vez finalizado el registro en el formulario de MQerKAcademy. 
                Los detalles correspondientes se encontrarán en el panel principal (dashboard) de la plataforma.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] animate-toast-slide-in">
          <div className={`
            flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md
            transform transition-all duration-300 hover:scale-105
            ${toast.type === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
              : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
            }
            max-w-sm sm:max-w-md
          `}>
            {/* Icono */}
            <div className="flex-shrink-0">
              {toast.type === 'success' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            
            {/* Mensaje */}
            <p className="font-semibold text-sm sm:text-base flex-1">
              {toast.message}
            </p>
            
            {/* Botón cerrar */}
            <button 
              onClick={() => setToast({ ...toast, show: false })}
              className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
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
            transform: translateY(0);
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

        @keyframes toast-slide-in {
          from {
            opacity: 0;
            transform: translateX(100%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
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

        .animate-toast-slide-in {
          animation: toast-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}