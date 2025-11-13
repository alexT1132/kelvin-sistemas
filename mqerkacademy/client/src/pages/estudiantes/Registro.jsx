import { useState } from 'react';
import { Upload, User, Mail, Phone, MapPin, UserCircle, GraduationCap, BookOpen } from 'lucide-react';
import { Link } from "react-router-dom";
import Topbar from "../../components/web/Topbar";

export default function FormularioMultipasos() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1 - Datos Personales
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    municipio: '',
    grupo: '',
    nombreTutor: '',
    telefonoTutor: '',
    otraMunicipio: '',
    // Paso 2 - Datos Académicos
    nivelAcademico: '',
    otraNivelAcademico: '',
    semestre: '',
    alergias: '',
    tipoAlergia: '',
    condicion: '',
    tipoCondicion: '',
    orientacionVocacional: '',
    universidades: [],
    otraUniversidad: '',
    carrera: '',
    // Paso 3 - Datos del Curso
    cambioPais: '',
    comentarios: ''
  });

  const [fotoPreview, setFotoPreview] = useState(null);

  const municipios = [
    'SAN JUAN BAUTISTA TUXTEPEC',
    'SAN JOSÉ CHILTEPEC',
    'SANTA MARÍA JACATEPEC',
    'AYOTZINTEPEC',
    'LOMA BONITA',
    'SAN LUCAS OJITLÁN',
    'SAN JUAN BAUTISTA VALLE NACIONAL'
  ];

  const nivelesAcademicos = [
    'CBTis',
    'COBAO',
    'CONALEP',
    'CBTF',
    'CBTA',
    'CECYTE',
    'IEBO',
    'COLEGIO AMÉRICA',
    'COLEGIO TUXTEPEC'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMunicipioChange = (value) => {
    setFormData(prev => ({
      ...prev,
      municipio: prev.municipio === value ? '' : value,
      otraMunicipio: ''
    }));
  };

  const handleOtraMunicipioChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      otraMunicipio: value,
      municipio: value ? '' : prev.municipio
    }));
  };

  const handleNivelAcademicoChange = (nivel) => {
    setFormData(prev => ({
      ...prev,
      nivelAcademico: prev.nivelAcademico === nivel ? '' : nivel, // Toggle: si ya está seleccionado, desmarcar
      otraNivelAcademico: ''
    }));
  };

  const handleOtraNivelChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      otraNivelAcademico: value,
      nivelAcademico: value ? '' : prev.nivelAcademico
    }));
  };

  const handleUniversidadChange = (universidad) => {
    setFormData(prev => {
      const universidades = prev.universidades.includes(universidad)
        ? prev.universidades.filter(u => u !== universidad)
        : [...prev.universidades, universidad];
      
      return {
        ...prev,
        universidades: universidades
      };
    });
  };

  const handleOtraUniversidadChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      otraUniversidad: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí puedes añadir la lógica para enviar los datos al servidor
  };

  return (
    <>
      <Topbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header con folio */}
        <div className="text-right mb-4 animate-fade-in">
          <span className="text-sm text-purple-600 font-medium">FOLIO: MEEAU26-0010</span>
        </div>

        {/* Indicador de pasos */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {/* Paso 1 */}
            <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Datos Personales</span>
            </div>
            
            {/* Línea 1-2 */}
            <div className="w-12 sm:w-16 h-1 bg-gray-300">
              <div className={`h-full bg-purple-600 transition-all duration-500 ${currentStep >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            
            {/* Paso 2 */}
            <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Datos Académicos</span>
            </div>
            
            {/* Línea 2-3 */}
            <div className="w-12 sm:w-16 h-1 bg-gray-300">
              <div className={`h-full bg-purple-600 transition-all duration-500 ${currentStep >= 3 ? 'w-full' : 'w-0'}`}></div>
            </div>
            
            {/* Paso 3 */}
            <div className={`flex items-center ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Datos del Curso</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8 animate-slide-up" noValidate>
          {/* PASO 1 - DATOS PERSONALES */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-700 text-center mb-8 animate-fade-in">
                DATOS PERSONALES
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    Nombre(s) *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Ingresa tu nombre"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    Apellido(s) *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Ingresa tu apellido"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto de perfil
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all duration-300 bg-purple-50 hover:bg-purple-100 group-hover:scale-105">
                    <div className="flex flex-col items-center">
                      {fotoPreview ? (
                        <img src={fotoPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-purple-500 mb-2" />
                      )}
                      <span className="text-sm text-purple-600 font-medium">
                        {fotoPreview ? 'Cambiar foto' : 'Sube tu foto de perfil'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  Municipio/Comunidad *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {municipios.map((mun) => (
                    <label
                      key={mun}
                      onClick={(e) => {
                        if (!formData.otraMunicipio) {
                          e.preventDefault();
                          handleMunicipioChange(mun);
                        }
                      }}
                      className={`flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.otraMunicipio 
                          ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                          : 'hover:bg-purple-50 hover:border-purple-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="municipio"
                        value={mun}
                        checked={formData.municipio === mun}
                        onChange={() => {}}
                        disabled={!!formData.otraMunicipio}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 disabled:opacity-50 pointer-events-none"
                      />
                      <span className="ml-3 text-sm text-gray-700">{mun}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    name="otraMunicipio"
                    value={formData.otraMunicipio}
                    onChange={handleOtraMunicipioChange}
                    disabled={!!formData.municipio}
                    placeholder="Especifica otra comunidad"
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      formData.municipio 
                        ? 'bg-gray-50 cursor-not-allowed opacity-50' 
                        : 'hover:border-purple-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-500" />
                    Número de teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Ingrese su número de teléfono"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-purple-500" />
                    Selecciona tu grupo *
                  </label>
                  <select
                    name="grupo"
                    value={formData.grupo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="grupo1">Grupo 1</option>
                    <option value="grupo2">Grupo 2</option>
                    <option value="grupo3">Grupo 3</option>
                    <option value="grupo4">Grupo 4</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t-2 border-gray-100">
                <h2 className="text-3xl font-bold text-purple-700 text-center mb-8 animate-fade-in">
                  DATOS DEL TUTOR
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      Nombre completo del tutor *
                    </label>
                    <input
                      type="text"
                      name="nombreTutor"
                      value={formData.nombreTutor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                      placeholder="Ingrese el nombre completo de su tutor"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-500" />
                      Número de teléfono del tutor *
                    </label>
                    <input
                      type="tel"
                      name="telefonoTutor"
                      value={formData.telefonoTutor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                      placeholder="Ingrese el número de teléfono del tutor"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2 - DATOS ACADÉMICOS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-700 text-center mb-8 animate-fade-in">
                DATOS ACADÉMICOS
              </h2>

              {/* Nivel académico actual o cursado */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  Nivel académico actual o cursado *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {nivelesAcademicos.map((nivel) => (
                    <label
                      key={nivel}
                      onClick={(e) => {
                        if (!formData.otraNivelAcademico) {
                          e.preventDefault();
                          handleNivelAcademicoChange(nivel);
                        }
                      }}
                      className={`flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.otraNivelAcademico 
                          ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                          : 'hover:bg-purple-50 hover:border-purple-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="nivelAcademico"
                        checked={formData.nivelAcademico === nivel}
                        onChange={() => {}}
                        disabled={!!formData.otraNivelAcademico}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 disabled:opacity-50 pointer-events-none"
                      />
                      <span className="ml-3 text-sm text-gray-700">{nivel}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Otra:</label>
                  <input
                    type="text"
                    name="otraNivelAcademico"
                    value={formData.otraNivelAcademico}
                    onChange={handleOtraNivelChange}
                    disabled={!!formData.nivelAcademico}
                    placeholder="Especifica"
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      formData.nivelAcademico
                        ? 'bg-gray-50 cursor-not-allowed opacity-50' 
                        : 'hover:border-purple-300'
                    }`}
                  />
                </div>
              </div>

              {/* Selecciona un Semestre */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  Selecciona un Semestre *
                </label>
                <select
                  name="semestre"
                  value={formData.semestre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1">Primer Semestre</option>
                  <option value="2">Segundo Semestre</option>
                  <option value="3">Tercer Semestre</option>
                  <option value="4">Cuarto Semestre</option>
                  <option value="5">Quinto Semestre</option>
                  <option value="6">Sexto Semestre</option>
                </select>
              </div>

              {/* ¿Cuentas con alguna alergia en especial? */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cuentas con alguna alergia en especial?
                </label>
                <select
                  name="alergias"
                  value={formData.alergias}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                
                {/* Campo condicional para especificar alergia */}
                {formData.alergias === 'si' && (
                  <div className="mt-4 animate-slide-up">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especifica el tipo de alergia
                    </label>
                    <input
                      type="text"
                      name="tipoAlergia"
                      value={formData.tipoAlergia || ''}
                      onChange={handleInputChange}
                      placeholder="Escribe tu respuesta"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    />
                  </div>
                )}
              </div>

              {/* ¿Cuenta con alguna condición, discapacidad o trastorno específico de apoyo? */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cuenta con alguna condición, discapacidad o trastorno específico de apoyo?
                </label>
                <select
                  name="condicion"
                  value={formData.condicion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                
                {/* Campo condicional para especificar condición */}
                {formData.condicion === 'si' && (
                  <div className="mt-4 animate-slide-up">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especifica la condición, discapacidad o trastorno
                    </label>
                    <input
                      type="text"
                      name="tipoCondicion"
                      value={formData.tipoCondicion || ''}
                      onChange={handleInputChange}
                      placeholder="Escribe tu respuesta"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    />
                  </div>
                )}
              </div>

              {/* ¿Ocupas orientación vocacional para determinar a qué universidad y/o licenciatura elegir? */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Ocupas orientación vocacional para determinar a qué universidad y/o licenciatura elegir?
                </label>
                <select
                  name="orientacionVocacional"
                  value={formData.orientacionVocacional}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Campos condicionales cuando selecciona "No" */}
              {formData.orientacionVocacional === 'no' && (
                <div className="space-y-6 animate-slide-up">
                  {/* Selecciona universidades */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Selecciona la(s) universidades a postularte *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {['UNAM', 'IPN', 'UV', 'BUAP', 'NAVAL', 'UDG', 'UNPA', 'ITTUX', 'TECNM', 'ANAHUAC', 'UAQ', 'UDLAP', 'NORMAL SUPERIOR'].map((univ) => (
                        <label
                          key={univ}
                          onClick={(e) => {
                            e.preventDefault();
                            handleUniversidadChange(univ);
                          }}
                          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:bg-purple-50 hover:border-purple-400"
                        >
                          <input
                            type="checkbox"
                            checked={formData.universidades.includes(univ)}
                            onChange={() => {}}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 pointer-events-none"
                          />
                          <span className="ml-3 text-sm text-gray-700">{univ}</span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Otra:</label>
                      <input
                        type="text"
                        name="otraUniversidad"
                        value={formData.otraUniversidad}
                        onChange={handleOtraUniversidadChange}
                        placeholder="Especifica"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                      />
                    </div>
                  </div>

                  {/* Carrera o licenciatura */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Escribe la carrera o licenciatura a la que te postularas
                    </label>
                    <input
                      type="text"
                      name="carrera"
                      value={formData.carrera}
                      onChange={handleInputChange}
                      placeholder="Escribe tu respuesta"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PASO 3 - DATOS DEL CURSO */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-700 text-center mb-8 animate-fade-in">
                DATOS DEL CURSO
              </h2>

              {/* Pregunta sobre cambio en el país */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  ¿Qué cambio quieres lograr en tu país con una acción de acuerdo al finalizar tu carrera profesional?
                </label>
                <textarea
                  name="cambioPais"
                  value={formData.cambioPais}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 resize-none"
                  placeholder="Escribe tu respuesta aquí..."
                />
              </div>

              {/* Comentarios/Expectativas */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Agrega un comentario de lo que esperas de nosotros
                </label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 resize-none"
                  placeholder="Escribe tu comentario aquí..."
                />
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Anterior
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Continuar
              </button>
            ) : (
              <Link
                to="/estudiantes/usuario"
                className="ml-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Finalizar
              </Link>
            )}
          </div>
        </form>
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </div>
    </>
  );
}