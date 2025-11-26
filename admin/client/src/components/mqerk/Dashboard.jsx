import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";

// Datos para la gráfica de líneas
const incomeExpenseData = [
  { mes: "Ene", ingresos: 50000, egresos: 30000 },
  { mes: "Feb", ingresos: 62000, egresos: 35000 },
  { mes: "Mar", ingresos: 58000, egresos: 32000 },
  { mes: "Abr", ingresos: 65000, egresos: 38000 },
  { mes: "May", ingresos: 70000, egresos: 42000 },
  { mes: "Jun", ingresos: 72000, egresos: 45000 },
  { mes: "Jul", ingresos: 74000, egresos: 46000 },
  { mes: "Ago", ingresos: 76000, egresos: 48000 },
  { mes: "Sep", ingresos: 75000, egresos: 50000 },
  { mes: "Oct", ingresos: 78000, egresos: 52000 },
  { mes: "Nov", ingresos: 82000, egresos: 53000 },
  { mes: "Dic", ingresos: 85000, egresos: 54000 },
];

// Datos para la gráfica de pie
const costDistributionData = [
  { name: "Docentes", value: 35, color: "#94a3b8" },
  { name: "Licencias", value: 25, color: "#60a5fa" },
  { name: "Marketing", value: 15, color: "#34d399" },
  { name: "Operación", value: 20, color: "#fb923c" },
  { name: "Otros", value: 5, color: "#a78bfa" },
];

export default function DashboardPanel() {
  const [viewMode, setViewMode] = useState("mensual");

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Tarjetas de métricas */}
        <MetricsCards />

        {/* Indicadores de estado */}
        <StatusIndicators />

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Gráfica de Ingresos vs Egresos */}
          <IncomeExpenseChart data={incomeExpenseData} />

          {/* Gráfica de Distribución de Costos */}
          <CostDistributionChart 
            data={costDistributionData} 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
          />
        </div>
      </div>
    </div>
  );
}

// Tarjetas de métricas
function MetricsCards() {
  const metrics = [
    { 
      id: 1, 
      title: "Finanzas", 
      status: "saludable", 
      color: "purple",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    { 
      id: 2, 
      title: "Contabilidad", 
      status: "saludable", 
      color: "green",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    { 
      id: 3, 
      title: "Administrativo", 
      status: "saludable", 
      color: "purple",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    { 
      id: 4, 
      title: "Gestión", 
      status: "saludable", 
      color: "cyan",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    { 
      id: 5, 
      title: "Estrategica", 
      status: "saludable", 
      color: "pink",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    { 
      id: 6, 
      title: "Perfil Asesor", 
      status: "saludable", 
      color: "blue",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
  ];

  const colorSchemes = {
    purple: { bg: "from-purple-500 to-fuchsia-600", ring: "ring-purple-100" },
    green: { bg: "from-green-500 to-emerald-600", ring: "ring-green-100" },
    cyan: { bg: "from-cyan-500 to-blue-600", ring: "ring-cyan-100" },
    pink: { bg: "from-pink-500 to-rose-600", ring: "ring-pink-100" },
    blue: { bg: "from-blue-500 to-indigo-600", ring: "ring-blue-100" },
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric, index) => {
        const colors = colorSchemes[metric.color] || colorSchemes.purple;
        
        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`group relative bg-white rounded-xl p-4 shadow-sm ring-1 ${colors.ring} 
                       hover:shadow-lg transition-all duration-300 cursor-pointer`}
          >
            {/* Icono */}
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl 
                           bg-gradient-to-br ${colors.bg} text-white shadow-md mb-3`}>
              {metric.icon}
            </div>

            {/* Título */}
            <h3 className="text-sm font-semibold text-slate-900 mb-1">{metric.title}</h3>
            <p className="text-xs text-slate-500">Semáforo: {metric.status}</p>

            {/* Flecha */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Indicadores de estado
function StatusIndicators() {
  const indicators = [
    { label: "Positivo · Sobrante", color: "bg-emerald-100 text-emerald-700 ring-emerald-200" },
    { label: "Equilibrio", color: "bg-amber-100 text-amber-700 ring-amber-200" },
    { label: "Negativo · Pérdida", color: "bg-rose-100 text-rose-700 ring-rose-200" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-wrap justify-center gap-3 mt-6"
    >
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className={`px-4 py-2 rounded-full text-sm font-semibold ring-1 ${indicator.color}`}
        >
          {indicator.label}
        </div>
      ))}
    </motion.div>
  );
}

// Gráfica de Ingresos vs Egresos
function IncomeExpenseChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">Ingresos vs Egresos (mensual)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="mes" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px'
            }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="ingresos" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
          <Line type="monotone" dataKey="egresos" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// Gráfica de Distribución de Costos
function CostDistributionChart({ data, viewMode, setViewMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Distribución de costos</h3>
        <div className="flex gap-2">
          {["vista", "mensual", "anual"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                viewMode === mode
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Leyenda personalizada */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-slate-600">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}