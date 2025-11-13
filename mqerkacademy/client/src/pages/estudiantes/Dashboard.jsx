import { useState, useEffect } from 'react';
import { Upload, CreditCard, AlertTriangle, Calendar, Star } from 'lucide-react';

export default function Dashboard() {
  // Estado de pago: 0 = sin comprobante, 1 = pendiente de revisión, 2 = aprobado
  const [estadoPago, setEstadoPago] = useState(2);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState("alejandro"); // Nombre del usuario
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Estado del modal
  const [selectedFile, setSelectedFile] = useState(null); // Archivo seleccionado

  // Función para copiar al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías añadir una notificación de "copiado"
  };

  // Función para manejar la selección de archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Actualizar reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatear hora
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Formatear fecha
  const formatDate = (date) => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  };

  // Obtener saludo según hora
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 19) return "¡Buenas tardes";
    return "¡Buenas noches";
  };

  // Redirigir cuando el pago sea aprobado
  useEffect(() => {
    if (estadoPago === 2) {
      // Redirigir después de un pequeño delay para mostrar mensaje de éxito
      const timer = setTimeout(() => {
        window.location.href = '/estudiantes/cursos-activos'; // Cambia esta URL por la ruta de tu plataforma
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [estadoPago]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Estrellas decorativas animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-purple-300 opacity-40 animate-twinkle"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Topbar */}
      <header className="relative z-20 bg-purple-800 bg-opacity-50 backdrop-blur-md shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-700" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86 0-7-3.14-7-7V8.5l7-3.5 7 3.5V13c0 3.86-3.14 7-7 7z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">MQerk</h1>
                <p className="text-purple-200 text-xs">Academy</p>
              </div>
            </div>

            {/* Título central */}
            <div className="hidden md:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-white font-bold text-xl lg:text-2xl">MQERKACADEMY</h2>
            </div>

            {/* Iconos derecha */}
            <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Icono Cerrar Sesión */}
              <button 
                className="text-white hover:text-purple-200 transition-colors duration-300"
                title="Cerrar sesión"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              
              {/* Icono Notificaciones */}
              <button className="text-white hover:text-purple-200 transition-colors duration-300 relative">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                </svg>
              </button>
              
              {/* Avatar con punto verde */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 border-2 border-white flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                {/* Punto verde de estado online */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-purple-800"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Saludo centrado en la parte superior */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl">
            {getGreeting()}, {userName}!
          </h1>
        </div>

        {/* Grid de contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Columna izquierda - Panel de advertencia */}
          <div className="space-y-6 animate-fade-in-left">

            {/* Panel de advertencia - Solo se muestra cuando estadoPago === 0 */}
            {estadoPago === 0 && (
              <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
                {/* Brillo de fondo */}
                <div className="absolute -inset-4 bg-orange-500/30 blur-2xl rounded-3xl animate-pulse-slow"></div>
                
                <div className="relative bg-gradient-to-br from-orange-400/90 to-orange-600/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-orange-300/50">
                  {/* Icono de advertencia */}
                  <div className="flex justify-center mb-4 animate-bounce-slow">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <AlertTriangle className="w-10 h-10 text-orange-800" />
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="text-center text-white space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-md">
                      Debes subir tu
                    </h2>
                    <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-md">
                      comprobante para acceder
                    </h2>
                    <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-md">
                      a la plataforma completa.
                    </h2>

                    {/* Botón */}
                    <button className="mt-6 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-3 mx-auto">
                      <Upload className="w-5 h-5" />
                      Sube tu comprobante de pago para continuar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Panel de comprobante enviado - Solo se muestra cuando estadoPago === 1 */}
            {estadoPago === 1 && (
              <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
                {/* Brillo de fondo */}
                <div className="absolute -inset-4 bg-purple-500/30 blur-2xl rounded-3xl animate-pulse-slow"></div>
                
                <div className="relative bg-gradient-to-br from-purple-400/80 to-pink-500/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-300/50">
                  {/* Tarjeta de éxito interna */}
                  <div className="bg-gradient-to-br from-green-500/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-green-300/50">
                    {/* Icono de check */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Mensaje de éxito */}
                    <div className="text-center text-white">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-3 drop-shadow-md">
                        ¡Comprobante enviado!
                      </h3>
                      <p className="text-lg font-medium drop-shadow-sm">
                        Tu archivo ha sido recibido exitosamente.
                      </p>
                      <p className="text-lg font-medium drop-shadow-sm">
                        La verificación está en proceso.
                      </p>
                    </div>
                  </div>

                  {/* Mensaje informativo */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/30">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <p className="font-semibold text-lg mb-1">¡Comprobante recibido! Tu verificación está en proceso.</p>
                        <p className="text-white/90">En un máximo de 24 horas podrás acceder a la plataforma completa.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Panel de métodos de pago - Solo se muestra cuando estadoPago === 0 */}
            {estadoPago === 0 && (
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div 
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-gradient-to-br from-purple-500/80 to-indigo-600/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-300/30 hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">Ver métodos de pago</h3>
                      <p className="text-purple-100 text-sm">Transferencia - Efectivo - Subir comprobante</p>
                    </div>
                    <Upload className="w-6 h-6 text-white opacity-70" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha - Reloj y frase */}
          <div className="space-y-8 animate-fade-in-right">
            {/* Reloj digital grande con efecto 3D */}
            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative text-center">
                <div 
                  className="text-8xl sm:text-9xl lg:text-[12rem] xl:text-[14rem] font-black text-white tracking-tight leading-none"
                  style={{
                    textShadow: `
                      0 5px 0 rgba(139, 92, 246, 0.8),
                      0 10px 0 rgba(124, 58, 237, 0.7),
                      0 15px 0 rgba(109, 40, 217, 0.6),
                      0 20px 0 rgba(91, 33, 182, 0.5),
                      0 25px 10px rgba(0, 0, 0, 0.3),
                      0 30px 20px rgba(0, 0, 0, 0.2),
                      0 0 40px rgba(255, 255, 255, 0.3),
                      0 0 80px rgba(139, 92, 246, 0.4)
                    `,
                    WebkitTextStroke: '2px rgba(139, 92, 246, 0.3)',
                    filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))'
                  }}
                >
                  {formatTime(currentTime)}
                </div>
                <p className="text-white/90 text-lg sm:text-xl font-medium mt-6 drop-shadow-md">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>

            {/* Frase motivacional */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold text-white">Frase del día</h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white text-center drop-shadow-md">
                  ¡Cada momento de estudio te hace más sabio!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Información de Pago */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-purple-600">Información de Pago</h2>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 space-y-6">
              {/* Métodos de Pago */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-xl font-bold text-purple-600">Métodos de Pago</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tarjeta Transferencia */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <h4 className="text-lg font-bold text-blue-600">Transferencia</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Banco: <span className="font-semibold text-gray-800">BANCOPPEL</span></p>
                        <p className="text-gray-600 mb-1">Beneficiario: <span className="font-semibold text-gray-800">Kelvin Valentín Gómez Ramírez</span></p>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
                        <div>
                          <p className="text-xs text-gray-500">Cuenta:</p>
                          <p className="font-mono font-semibold text-gray-800">4169 1608 5392 8977</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard('4169160853928977')}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-300"
                          title="Copiar"
                        >
                          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
                        <div>
                          <p className="text-xs text-gray-500">CLABE:</p>
                          <p className="font-mono font-semibold text-gray-800">137628103732170852</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard('137628103732170852')}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-300"
                          title="Copiar"
                        >
                          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-2 rounded-lg">
                        <AlertTriangle className="w-4 h-4" />
                        <p className="text-xs font-medium">Procesamiento 24h</p>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta Efectivo */}
                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                      </svg>
                      <h4 className="text-lg font-bold text-green-600">Efectivo</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">Dir:</span> Calle Benito Juárez #25, Col. Centro, entre Av. Independencia y 20 de Noviembre, C.P. 68300. En altos de COMPUMAX, Tuxtepec, Oaxaca
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-gray-700"><span className="font-semibold">Horario:</span> Lunes a Viernes, 9:00 a 17:00 h</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-gray-700"><span className="font-semibold">Tel:</span> 287-181-1231</p>
                      </div>
                      <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-2 rounded-lg">
                        <AlertTriangle className="w-4 h-4" />
                        <p className="text-xs font-medium">Lleva identificación</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subir Comprobante */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-600">Subir Comprobante</h3>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border-2 border-dashed border-orange-300">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-orange-600">Haz clic</span> para subir o arrastra tu archivo aquí
                    </p>
                    <p className="text-sm text-gray-500 mb-4">JPG, PNG, PDF (máx. 5MB)</p>
                    
                    <label className="inline-block">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <span className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-orange-600 transition-colors duration-300 inline-block">
                        Seleccionar archivo
                      </span>
                    </label>
                    
                    {selectedFile && (
                      <p className="mt-3 text-sm text-gray-700">
                        <span className="font-semibold">Archivo seleccionado:</span> {selectedFile.name}
                      </p>
                    )}
                    {!selectedFile && (
                      <p className="mt-3 text-sm text-gray-500">Ningún archivo seleccionado</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Asegúrate de que el comprobante sea legible con fecha y monto. Validación en máximo 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos personalizados */}
      <style jsx>{`
        /* Ocultar scrollbars */
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        *::-webkit-scrollbar {
          display: none;
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                         0 0 40px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                         0 0 60px rgba(255, 255, 255, 0.5);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out backwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out backwards;
        }

        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }

        .animate-glow {
          animation: glow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}