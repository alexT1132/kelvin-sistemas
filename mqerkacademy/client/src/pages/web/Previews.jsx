// CursoDetalle.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { useCursos } from "../../context/CursosContext";
import { usePreview } from "../../context/PreviewContext";
import Navbar from "../../components/web/Navbar";

const WHATSAPP_PHONE = "522871515760";

// Genera slug desde nombre
const generateSlug = (nombre) => {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const buildWaLink = (title, planLabel) => {
  const msg = `Hola, quiero inscribirme al curso "${title}"${
    planLabel ? ` con el plan "${planLabel}"` : ""
  }. ¿Me comparten más información?`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
};

// --- Iconos inline (sin dependencias)
const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}><rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" /><path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5"/></svg>
);
const IconClock = (p)=>(<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor"/><path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.5"/></svg>);
const IconBook = (p)=>(<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 4h10a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3-3V4z" stroke="currentColor"/><path d="M7 17h10" stroke="currentColor"/></svg>);
const IconBolt = (p)=>(<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" stroke="currentColor"/></svg>);
const IconStar = (p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z"/></svg>);
const IconShare = (p)=>(<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.5"/></svg>);
const IconPlay = (p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5v14l11-7-11-7Z"/></svg>);

export default function CursoDetalle() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cursos, ObtenerCursos, loading: loadingCursos } = useCursos();
  const { preview, loadByCourse, loading: loadingPreview } = usePreview();
  const [curso, setCurso] = useState(location.state?.curso || null);
  const [tab, setTab] = useState("desc");
  const [showPlans, setShowPlans] = useState(false);

  // Carga cursos si no hay curso en state
  useEffect(() => {
    if (!curso && cursos.length === 0) {
      ObtenerCursos();
    }
  }, []);

  // Busca el curso cuando los cursos estén cargados
  useEffect(() => {
    if (!curso && cursos.length > 0) {
      const cursoEncontrado = cursos.find(c => {
        const cursoSlug = generateSlug(c.nombre);
        return cursoSlug === slug;
      });
      
      if (cursoEncontrado) {
        setCurso(cursoEncontrado);
      } else {
        navigate("/");
      }
    }
  }, [cursos, curso, slug, navigate]);

  // Carga el preview cuando tengamos el curso
  useEffect(() => {
    if (curso?.id) {
      console.log("Cargando preview para curso ID:", curso.id);
      loadByCourse(curso.id);
    }
  }, [curso?.id, loadByCourse]);

  const loading = loadingCursos || loadingPreview;

  // Combinar información de curso y preview
  const COURSE = useMemo(() => {
    if (!curso) return null;
    
    return {
      title: curso.nombre,
      tagline: preview?.tagline || curso.modalidad || "Despierta todo tu potencial.",
      modalidad: curso.modalidad,
      clases: preview?.clases || "+ 130 clases",
      horasDia: preview?.horas_dia || "2 h al dia",
      duracion: curso.duration && curso.durationUnit ? `${curso.duration} ${curso.durationUnit}` : "8 meses",
      meta: preview?.meta || curso.nivel || "Rendimiento",
      rating: curso.rating || 4.5,
      likes: 350,
      videoThumb: curso.imagenUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
      videoUrl: preview?.video_url || "",
      description: preview?.desc_text || `Prepárate para ${curso.nombre}. Este curso está diseñado para proporcionarte las habilidades y conocimientos necesarios.`,
      aprenderas: preview?.learn_list && preview.learn_list.length > 0 
        ? preview.learn_list 
        : [
            "Dominar los fundamentos teóricos que necesitas",
            "Desarrollar habilidades prácticas aplicadas",
            "Resolver problemas de forma estratégica",
            ...curso.tags
          ],
      areas: preview?.areas_list && preview.areas_list.length > 0
        ? preview.areas_list
        : curso.tags || [],
      precio: {
        label: preview?.price_now > 0 ? "Mensual" : "Consultar",
        actual: preview?.price_now || 0,
        anterior: preview?.price_before || 0,
        descuento: preview?.discount || 0
      },
      incluye: preview?.features && preview.features.length > 0
        ? preview.features
        : [
            "Material didáctico completo",
            "Certificado al finalizar",
            "Acceso a recursos digitales",
            "Soporte personalizado",
            "Guías digitales con ejercicios"
          ],
      alumnos: curso.alumnos || 0,
    };
  }, [curso, preview]);

  const infoItems = useMemo(() => {
    if (!COURSE) return [];
    return [
      { icon: IconCalendar, text: COURSE.modalidad },
      { icon: IconBook, text: COURSE.clases },
      { icon: IconClock, text: COURSE.horasDia },
      { icon: IconClock, text: COURSE.duracion },
      { icon: IconBolt, text: COURSE.meta },
    ];
  }, [COURSE]);

  // Planes del preview o valores por defecto
  const PLANS = useMemo(() => {
    if (preview?.plans && preview.plans.length > 0) {
      return preview.plans;
    }
    return [
      {
        id: "mensual",
        name: "Mensual",
        badge: "Pago mes a mes",
        priceText: "$1,500 MXN",
        note: "Durante todo el curso",
        features: [
          "Acceso a plataforma educativa",
          "Guías con ejercicios tipo examen",
          "Libros electrónicos en PDF",
          "Simuladores en línea",
        ],
      },
      {
        id: "start",
        name: "Start",
        badge: "2 exhibiciones",
        priceText: "2 pagos de $5,500",
        note: "Inicio y mitad del curso",
        features: [
          "Acceso a plataforma educativa",
          "Guías con ejercicios tipo examen",
          "Libros electrónicos en PDF",
          "Simuladores en línea",
        ],
        highlighted: true,
      },
      {
        id: "premium",
        name: "Premium",
        badge: "Pago único",
        priceText: "$10,500 MXN",
        note: "Mejor precio",
        features: [
          "Acceso a plataforma educativa",
          "Guías con ejercicios tipo examen",
          "Libros electrónicos en PDF",
          "Simuladores en línea",
        ],
      },
    ];
  }, [preview]);

  // Bloquea scroll cuando el modal está abierto + ESC para cerrar
  useEffect(() => {
    if (showPlans) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const onKey = (e) => e.key === "Escape" && setShowPlans(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPlans]);

  const openPlans = useCallback(() => setShowPlans(true), []);
  const closePlans = useCallback(() => setShowPlans(false), []);

  if (loading || !COURSE) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-white">
            <div className="grid lg:grid-cols-2 items-center gap-10">
              <div>
                <p className="inline-flex items-center gap-2 text-sm/5 font-medium bg-white/10 px-3 py-1 rounded-full">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
                  {COURSE.tagline}
                </p>
                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                  {COURSE.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={openPlans}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 font-semibold px-5 py-2.5 hover:bg-violet-50 transition"
                  >
                    Empieza ya
                  </button>
                </div>
              </div>

              {/* Imagen lateral */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm" />
                <img
                  src={COURSE.videoThumb}
                  alt={COURSE.title}
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Ola inferior minimal */}
          <div className="h-10 bg-white rounded-t-[2rem] -mt-6" />
        </section>

        {/* INFO STRIP */}
        <section id="info" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-900">Información del curso</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {infoItems.map((it, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-3 shadow-sm">
                <it.icon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">{it.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: media + tabs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video */}
              <div className="relative group">
                <div className="aspect-video rounded-2xl bg-gray-100 overflow-hidden shadow-sm">
                  {COURSE.videoUrl ? (
                    <video 
                      src={COURSE.videoUrl} 
                      poster={COURSE.videoThumb}
                      className="h-full w-full object-cover" 
                      controls
                    />
                  ) : (
                    <>
                      <img
                        src={COURSE.videoThumb}
                        alt="Demo del curso"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        className="absolute inset-0 m-auto h-14 w-14 grid place-items-center rounded-full bg-white/90 text-indigo-700 shadow-lg backdrop-blur border border-white/80 group-hover:scale-105 transition"
                        aria-label="Reproducir video"
                        onClick={() => window.alert("Video no disponible en este momento.")}
                      >
                        <IconPlay className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
                  <span className="ml-auto inline-flex items-center gap-1">
                    <IconShare className="w-4 h-4 text-gray-500" /> Compartir
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-gray-500">♥</span> {COURSE.likes}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                <div className="flex flex-wrap gap-2">
                  <TabBtn label="Descripción" active={tab === "desc"} onClick={() => setTab("desc")} />
                  <TabBtn label="Aprenderás" active={tab === "learn"} onClick={() => setTab("learn")} />
                  <TabBtn label="Áreas de enseñanza" active={tab === "areas"} onClick={() => setTab("areas")} />
                </div>
                <div className="mt-4 text-gray-700 leading-relaxed">
                  {tab === "desc" && <p className="whitespace-pre-line">{COURSE.description}</p>}
                  {tab === "learn" && (
                    <ul className="list-disc pl-5 space-y-2">
                      {COURSE.aprenderas.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  )}
                  {tab === "areas" && (
                    <div className="grid sm:grid-cols-2 gap-2">
                      {COURSE.areas.map((a, i) => (
                        <div key={i} className="rounded-lg border border-slate-200 px-3 py-2">{a}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Precio / Planes */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                <div className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                  {COURSE.precio.label}
                </div>
                
                {COURSE.precio.actual > 0 ? (
                  <>
                    <div className="mt-1 flex items-end gap-2">
                      <div className="text-3xl font-extrabold text-indigo-900">
                        ${COURSE.precio.actual.toLocaleString()} MXN
                      </div>
                      {COURSE.precio.anterior > 0 && (
                        <div className="text-sm line-through text-gray-400">
                          ${COURSE.precio.anterior.toLocaleString()}
                        </div>
                      )}
                      {COURSE.precio.descuento > 0 && (
                        <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          -{COURSE.precio.descuento}%
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-3 text-center">
                    <div className="text-2xl font-extrabold text-indigo-900">Consultar</div>
                    <p className="text-sm text-gray-600 mt-1">Planes flexibles disponibles</p>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {COURSE.incluye.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href={buildWaLink(COURSE.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center items-center rounded-xl bg-indigo-600 text-white font-semibold px-4 py-2.5 hover:bg-indigo-700 transition"
                  >
                    Inscribirme por WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={openPlans}
                    className="rounded-xl border border-indigo-200 text-indigo-700 font-semibold px-4 py-2.5 hover:bg-indigo-50 transition"
                  >
                    Ver más planes
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Valoración</span>
                  <div className="ml-auto flex items-center gap-1" aria-label={`Rating ${COURSE.rating}`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStar key={i} className={`w-5 h-5 ${i < Math.round(COURSE.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{COURSE.rating}</span>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* MODAL DE PLANES */}
      {showPlans && (
        <PlansModal
          title={COURSE.title}
          plans={PLANS}
          onClose={closePlans}
        />
      )}
    </>
  );
}

function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-full border transition
        ${active ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
    >
      {label}
    </button>
  );
}

/* ---------- Modal: minimal + responsive ---------- */
function PlansModal({ title, plans, onClose }) {
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-5xl">
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 opacity-90 blur-md" aria-hidden />
        <div className="relative rounded-3xl bg-white/90 p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-900">Elige un plan a tu medida</h3>
              <p className="text-sm text-slate-600 mt-1">Selecciona la opción que mejor se adapte a tu forma de pago.</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="ml-auto h-10 w-10 rounded-full bg-white text-slate-600 shadow hover:bg-slate-50 grid place-items-center border border-slate-200"
            >
              ×
            </button>
          </div>

          {/* Grid de planes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => (
              <div
                key={p.id}
                className={[
                  "rounded-2xl border bg-white/95 p-5 shadow-sm flex flex-col",
                  p.highlighted ? "border-indigo-300 ring-2 ring-indigo-200" : "border-slate-200"
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    p.highlighted ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-700"
                  }`}>
                    {p.badge}
                  </span>
                </div>

                <h4 className="mt-3 text-lg font-bold text-slate-900">{p.name}</h4>
                <div className="mt-1 text-2xl font-extrabold text-indigo-700">{p.priceText}</div>
                {p.note && <div className="text-xs text-slate-500">{p.note}</div>}

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to='/estudiantes/suscripcion'
                  className={[
                    "mt-5 inline-flex justify-center items-center rounded-xl px-4 py-2.5 font-semibold transition",
                    p.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  ].join(" ")}
                >
                  Adquirir
                </Link>
              </div>
            ))}
          </div>

          {/* Nota */}
          <p className="mt-5 text-xs text-slate-500">
            Nota: El proceso de pago se realiza una vez finalizado el registro en el formulario de MQerKAcademy.
            Los detalles correspondientes estarán en el panel principal (dashboard) de la plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}