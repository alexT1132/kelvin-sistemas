import { useMemo, useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { Search, ThumbsUp, Users, Globe } from "lucide-react";
import Topbar from "../../components/mqerk/TopbarDashRendimiento";

const DEMO_TRAFFIC = [
  { day: "L", visits: 1200, users: 420 },
  { day: "M", visits: 1600, users: 520 },
  { day: "X", visits: 1500, users: 500 },
  { day: "J", visits: 1800, users: 610 },
  { day: "V", visits: 2100, users: 720 },
  { day: "S", visits: 1300, users: 430 },
  { day: "D", visits: 900, users: 300 },
];

const DEMO_COURSES = [
  { id: "c1", name: "Álgebra I", views: 5400, likes: 620, category: "Matemáticas" },
  { id: "c2", name: "Física Básica", views: 3800, likes: 410, category: "Ciencia" },
  { id: "c3", name: "Programación en JS", views: 9200, likes: 980, category: "Tecnología" },
  { id: "c4", name: "Redacción Académica", views: 2700, likes: 260, category: "Lengua" },
];

// Usuarios por curso (7d) — MOCK
const DEMO_USERS_BY_COURSE = {
  c1: [
    { day: "L", users: 180 },
    { day: "M", users: 230 },
    { day: "X", users: 220 },
    { day: "J", users: 280 },
    { day: "V", users: 320 },
    { day: "S", users: 190 },
    { day: "D", users: 130 },
  ],
  c2: [
    { day: "L", users: 120 },
    { day: "M", users: 160 },
    { day: "X", users: 150 },
    { day: "J", users: 190 },
    { day: "V", users: 210 },
    { day: "S", users: 140 },
    { day: "D", users: 90 },
  ],
  c3: [
    { day: "L", users: 260 },
    { day: "M", users: 310 },
    { day: "X", users: 300 },
    { day: "J", users: 360 },
    { day: "V", users: 420 },
    { day: "S", users: 230 },
    { day: "D", users: 170 },
  ],
  c4: [
    { day: "L", users: 90 },
    { day: "M", users: 120 },
    { day: "X", users: 115 },
    { day: "J", users: 150 },
    { day: "V", users: 170 },
    { day: "S", users: 110 },
    { day: "D", users: 70 },
  ],
};

export default function DashboardRendimiento() {
  const [query, setQuery] = useState("");
  const [courses] = useState(DEMO_COURSES);
  const [usersCourseId, setUsersCourseId] = useState(DEMO_COURSES[2].id); // por defecto JS ;)

  const kpis = useMemo(() => {
    const totalVisits = DEMO_TRAFFIC.reduce((a, b) => a + b.visits, 0);
    const totalUsers = DEMO_TRAFFIC.reduce((a, b) => a + b.users, 0);
    const avgSession = (totalVisits / Math.max(totalUsers, 1)).toFixed(2);
    const totalLikes = courses.reduce((a, b) => a + b.likes, 0);
    return { totalVisits, totalUsers, avgSession, totalLikes };
  }, [courses]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Topbar onSearch={setQuery} />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        {/* KPIs generales del sitio */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KPI icon={Globe} label="Visitas (7d)" value={kpis.totalVisits.toLocaleString()} sub="Tráfico total" />
          <KPI icon={Users} label="Usuarios (7d)" value={kpis.totalUsers.toLocaleString()} sub="Usuarios únicos" />
          <KPI icon={ThumbsUp} label="Likes totales" value={kpis.totalLikes.toLocaleString()} sub="En cursos" />
        </section>

        {/* Tráfico semanal (visitas vs usuarios) + Usuarios por curso */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tráfico semanal</h3>
              <span className="text-sm text-slate-500">Visitas vs Usuarios</span>
            </div>
            <div className="h-56 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMO_TRAFFIC} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="currentColor" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="day" className="text-xs md:text-sm" />
                  <YAxis className="text-xs md:text-sm" />
                  <Tooltip contentStyle={{ borderRadius: 12 }} />
                  <Legend wrapperStyle={{ paddingTop: 8 }} />
                  <Area type="monotone" dataKey="visits" name="Visitas" stroke="currentColor" fill="url(#gVisits)" />
                  <Area type="monotone" dataKey="users" name="Usuarios" stroke="currentColor" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Usuarios por curso (7d) */}
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Usuarios (7d) por curso</h3>
              <select
                value={usersCourseId}
                onChange={(e) => setUsersCourseId(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-slate-100"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="h-56 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMO_USERS_BY_COURSE[usersCourseId] || []} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="day" className="text-xs md:text-sm" />
                  <YAxis className="text-xs md:text-sm" />
                  <Tooltip contentStyle={{ borderRadius: 12 }} />
                  <Area type="monotone" dataKey="users" name="Usuarios" stroke="currentColor" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Comparativas por curso: Vistas y Likes */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold">Vistas por curso</h3>
            <div className="h-56 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courses} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="name" className="text-[10px] md:text-xs" />
                  <YAxis className="text-xs md:text-sm" />
                  <Tooltip contentStyle={{ borderRadius: 12 }} />
                  <Bar dataKey="views" name="Vistas" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Likes por curso</h3>
            <div className="h-56 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courses} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="name" className="text-[10px] md:text-xs" />
                  <YAxis className="text-xs md:text-sm" />
                  <Tooltip contentStyle={{ borderRadius: 12 }} />
                  <Bar dataKey="likes" name="Likes" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

      </main>
    </div>
  );
}

/* ---------------------------------------------------- */
/* Componentes UI                                        */
/* ---------------------------------------------------- */

function Card({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </motion.section>
  );
}

function KPI({ icon: Icon, label, value, sub }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
          <p className="text-xs text-slate-400">{sub}</p>
        </div>
      </div>
    </Card>
  );
}