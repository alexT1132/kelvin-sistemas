import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, Users, GraduationCap, Lock, Bell, RefreshCw } from 'lucide-react';

const AdminMetrics = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Datos de las métricas (puedes conectar esto a tu API)
  const [metrics] = useState({
    totalIncome: 23700,
    pendingPayments: 0,
    newStudents: 0,
    activeCourses: 1,
    activeAccess: 0,
    notifications: 0
  });

  // Actualizar cada 5 minutos automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  // Función para actualizar manualmente
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  // Formatear hora
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const statsCards = [
    {
      id: 1,
      icon: DollarSign,
      value: `$${metrics.totalIncome.toLocaleString()}`,
      label: 'INGRESOS TOTALES',
      description: 'Ingresos del último mes con pagos: Agosto 2025',
      color: 'emerald',
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      progressColor: 'bg-emerald-500'
    },
    {
      id: 2,
      icon: Clock,
      value: metrics.pendingPayments,
      label: 'PAGOS PENDIENTES',
      description: 'Pagos en espera de validación',
      color: 'amber',
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      progressColor: 'bg-amber-500'
    },
    {
      id: 3,
      icon: Users,
      value: metrics.newStudents,
      label: 'NUEVOS ALUMNOS',
      description: 'Registros nuevos este mes',
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      progressColor: 'bg-blue-500'
    },
    {
      id: 4,
      icon: GraduationCap,
      value: metrics.activeCourses,
      label: 'CURSOS ACTIVOS',
      description: 'Cursos con estudiantes activos',
      color: 'purple',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      progressColor: 'bg-purple-500'
    },
    {
      id: 5,
      icon: Lock,
      value: metrics.activeAccess,
      label: 'ACCESOS ACTIVADOS',
      description: 'Accesos habilitados hoy',
      color: 'rose',
      bgColor: 'bg-rose-100',
      iconColor: 'text-rose-600',
      progressColor: 'bg-rose-500'
    },
    {
      id: 6,
      icon: Bell,
      value: metrics.notifications,
      label: 'NOTIFICACIONES',
      description: 'Todo al día',
      color: 'teal',
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
      progressColor: 'bg-teal-500'
    }
  ];

  return (
    <div className="min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-8 animate-slide-down">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Resumen de métricas y actividades principales
        </p>
      </div>

      {/* Update Info Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 animate-fade-in animation-delay-200">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Clock className="w-4 h-4" />
          <span>Actualizado: {formatTime(lastUpdate)}</span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Stats Grid - Single row on desktop, responsive on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${card.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-8 h-8 ${card.iconColor}`} strokeWidth={2} />
              </div>

              {/* Value */}
              <div className={`text-4xl font-bold mb-2 ${card.iconColor}`}>
                {card.value}
              </div>

              {/* Label */}
              <h3 className="text-sm font-bold text-gray-700 mb-2 tracking-wide">
                {card.label}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 mb-4">
                {card.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${card.progressColor} animate-progress`}
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-500 animate-fade-in animation-delay-600">
        Datos actualizados automáticamente cada 5 minutos
      </div>
    </div>
  );
};

export default AdminMetrics;