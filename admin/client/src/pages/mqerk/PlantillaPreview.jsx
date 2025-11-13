// CourseDetail.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePreview, safeParseArray } from "../../context/mqerk/PreviewContext";

/* ========= Tagline editable (localStorage) ========= */
const useTagline = () => {
  const [tagline, setTagline] = useState(() => localStorage.getItem("previewTagline") || "");
  useEffect(() => { localStorage.setItem("previewTagline", tagline); }, [tagline]);
  return [tagline, setTagline];
};

/* ========= Iconos ========= */
const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" />
    <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconClock = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" />
    <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconBook = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 4h10a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3-3V4z" stroke="currentColor" />
    <path d="M7 17h10" stroke="currentColor" />
  </svg>
);
const IconBolt = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" stroke="currentColor" />
  </svg>
);
const IconStar = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
  </svg>
);
const IconShare = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconPlay = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5v14l11-7-11-7Z" />
  </svg>
);

/* ========= PLANES (demo) ========= */
const DEFAULT_PLANS = [
  { id:"mensual", name:"Mensual", badge:"Pago mes a mes", priceText:"$1,500 MXN", note:"Durante todo el curso",
    features:["Acceso a plataforma educativa","Guías con ejercicios tipo examen","Libros electrónicos en PDF","Simuladores en línea"] },
  { id:"start", name:"Start", badge:"2 exhibiciones", priceText:"2 pagos de $5,500", note:"Inicio y mitad del curso",
    features:["Acceso a plataforma educativa","Guías con ejercicios tipo examen","Libros electrónicos en PDF","Simuladores en línea"], highlighted:true },
  { id:"premium", name:"Premium", badge:"Pago único", priceText:"$10,500 MXN", note:"Mejor precio",
    features:["Acceso a plataforma educativa","Guías con ejercicios tipo examen","Libros electrónicos en PDF","Simuladores en línea"] },
];

export default function CourseDetail() {
  const location = useLocation();

  // Recibir desde useLocation.state
  const passedId = location.state?.courseId ?? "";
  const passedTitle = location.state?.courseName ?? "";
  const passedImageUrl = location.state?.imageUrl ?? "";
  const passedDuration = location.state?.courseDuration ?? "";
  const passedDurationUnit = location.state?.courseDurationUnit ?? "";
  const passedRating = location.state?.courseRating ?? "";

  // Fallbacks previos
  const storedTitle = localStorage.getItem("previewCourseTitle") || "";
  const storedImage = localStorage.getItem("previewCourseImage") || "";

  // Final
  const courseTitle = passedTitle || storedTitle || "Título del curso";
  const heroImage =
    passedImageUrl ||
    storedImage ||
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop";

  useEffect(() => {
    if (passedTitle) localStorage.setItem("previewCourseTitle", passedTitle);
    if (passedImageUrl) localStorage.setItem("previewCourseImage", passedImageUrl);
  }, [passedTitle, passedImageUrl]);

  const [tab, setTab] = useState("desc");
  const [showPlans, setShowPlans] = useState(false);
  const [tagline, setTagline] = useTagline();

  const [saved, setSaved] = useState(false);

  // ===== Context ===== 🔧 CAMBIO: Agregamos previewId
  const { preview, setPreview, loadByCourse, save, uploadVideo, previewId } = usePreview();

  useEffect(() => {
    if (passedId) loadByCourse(passedId);
  }, [passedId, loadByCourse]);

  /* ====== INFO STRIP (3 inputs) ====== */
  const [clases, setClases] = useState(localStorage.getItem("previewClases") || "");
  const [horasDia, setHorasDia] = useState(localStorage.getItem("previewHorasDia") || "");
  const [meta, setMeta] = useState(localStorage.getItem("previewMeta") || "");
  useEffect(() => { localStorage.setItem("previewClases", clases); }, [clases]);
  useEffect(() => { localStorage.setItem("previewHorasDia", horasDia); }, [horasDia]);
  useEffect(() => { localStorage.setItem("previewMeta", meta); }, [meta]);

  const durationText = useMemo(() => {
    if (passedDuration && passedDurationUnit) return `${passedDuration} ${passedDurationUnit}`;
    return "8 meses";
  }, [passedDuration, passedDurationUnit]);

  /* ===== Precio + bullets ===== */
  const [priceNow, setPriceNow] = useState(() => Number(localStorage.getItem("previewPriceNow") || 1125));
  const [priceBefore, setPriceBefore] = useState(() => Number(localStorage.getItem("previewPriceBefore") || 1500));
  const [discount, setDiscount] = useState(() => Number(localStorage.getItem("previewDiscount") || 25));
  useEffect(() => { localStorage.setItem("previewPriceNow", String(priceNow)); }, [priceNow]);
  useEffect(() => { localStorage.setItem("previewPriceBefore", String(priceBefore)); }, [priceBefore]);
  useEffect(() => { localStorage.setItem("previewDiscount", String(discount)); }, [discount]);

  const [features, setFeatures] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem("previewFeatures") || "null"); return Array.isArray(saved) ? saved : [""]; }
    catch { return [""]; }
  });
  useEffect(() => { localStorage.setItem("previewFeatures", JSON.stringify(features)); }, [features]);
  const handleFeatureChange = (i, val) => setFeatures(prev => prev.map((f, idx) => idx === i ? val : f));
  const addFeature = () => setFeatures(prev => [...prev, ""]);
  const removeFeature = (i) => setFeatures(prev => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));

  /* ===== Video: subir o URL ===== */
  const [videoSrc, setVideoSrc] = useState(() => localStorage.getItem("previewVideoUrl") || "");
  const [videoObjectUrl, setVideoObjectUrl] = useState("");
  const hasVideo = Boolean(videoSrc || videoObjectUrl);

  const onPickVideo = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  if (!file.type.startsWith("video/")) {
    alert("Selecciona un video válido");
    return;
  }

  // Validar tamaño (50MB recomendado)
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    alert(`El video es muy grande (${sizeMB}MB). Máximo 50MB`);
    return;
  }

  // Crear preview local mientras se sube
  const localUrl = URL.createObjectURL(file);
  setVideoObjectUrl(localUrl);

  console.log("📤 Subiendo video:", {
    nombre: file.name,
    tamaño: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    tipo: file.type
  });

  try {
    const url = await uploadVideo(file);
    
    console.log("✅ Video subido correctamente:", url);
    
    // Actualizar con la URL del servidor
    setVideoSrc(url);
    setPreview((p) => ({ ...p, video_url: url }));
    localStorage.setItem("previewVideoUrl", url);
    
    // Limpiar URL local
    URL.revokeObjectURL(localUrl);
    setVideoObjectUrl("");
    
  } catch (err) {
    console.error("❌ Error subiendo video:", err);
    alert("No se pudo subir el video al servidor");
    // Mantener el preview local si falla la subida
  }
};

  /* ===== Tabs editables ===== */
  const [descText, setDescText] = useState(() => localStorage.getItem("previewDescText") || "");
  useEffect(() => localStorage.setItem("previewDescText", descText), [descText]);

  const [learnList, setLearnList] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem("previewLearnList") || "null"); return Array.isArray(saved) ? saved : [""]; }
    catch { return [""]; }
  });
  useEffect(() => localStorage.setItem("previewLearnList", JSON.stringify(learnList)), [learnList]);

  const [areasList, setAreasList] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem("previewAreasList") || "null"); return Array.isArray(saved) ? saved : [""]; }
    catch { return [""]; }
  });
  useEffect(() => localStorage.setItem("previewAreasList", JSON.stringify(areasList)), [areasList]);

  /* ===== Planes ===== */
  const [plans, setPlans] = useState(() => {
    try { 
      const saved = JSON.parse(localStorage.getItem("previewPlans") || "null"); 
      // Si hay planes guardados y tienen contenido, usarlos, sino usar DEFAULT_PLANS
      return Array.isArray(saved) && saved.length > 0 ? saved : DEFAULT_PLANS; 
    }
    catch { return DEFAULT_PLANS; }
  });
  useEffect(() => { localStorage.setItem("previewPlans", JSON.stringify(plans)); }, [plans]);

  const changeAt = (setter) => (i, v) => setter((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  const addItem = (setter) => () => setter((prev) => [...prev, ""]);
  const removeItem = (setter) => (i) => setter((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));

  // Modal helpers
  useEffect(() => {
    document.body.style.overflow = showPlans ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setShowPlans(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPlans]);
  const openPlans = useCallback(() => setShowPlans(true), []);
  const closePlans = useCallback(() => setShowPlans(false), []);

  const COURSE = useMemo(() => ({
    title: courseTitle,
    imageUrl: heroImage,
    rating: 4.5,
    likes: 350,
  }), [courseTitle, heroImage]);

  // 🔧 NUEVO: Variable para saber si estamos editando
  const isEditing = Boolean(previewId);

  const clearPreviewLocalStorage = () => {
    const keys = [
      "previewCourseTitle",
      "previewCourseImage",
      "previewDuration",
      "previewDurationUnit",
      "previewTagline",
      "previewClases",
      "previewHorasDia",
      "previewMeta",
      "previewPriceNow",
      "previewPriceBefore",
      "previewDiscount",
      "previewFeatures",
      "previewDescText",
      "previewLearnList",
      "previewAreasList",
      "previewPlans",
      "previewVideoUrl",
    ];
    keys.forEach((k) => localStorage.removeItem(k));
  };

  const handleBack = () => {
    clearPreviewLocalStorage();
  };

  // cuando venga un preview desde el backend, rellenamos los inputs
  useEffect(() => {
    if (!preview) return;

    console.log("📥 Preview recibido en CourseDetail:", preview); // 🔍 Para debug

    // HERO / tagline
    if (preview.tagline !== undefined) {
      setTagline(preview.tagline || "");
      localStorage.setItem("previewTagline", preview.tagline || "");
    }

    // info strip
    if (preview.clases !== undefined) {
      setClases(preview.clases || "");
      localStorage.setItem("previewClases", preview.clases || "");
    }
    if (preview.horas_dia !== undefined) {
      setHorasDia(preview.horas_dia || "");
      localStorage.setItem("previewHorasDia", preview.horas_dia || "");
    }
    // 🔧 IMPORTANTE: Capturar meta
    if (preview.meta !== undefined) {
      console.log("🎯 Meta capturado:", preview.meta);
      setMeta(preview.meta || "");
      localStorage.setItem("previewMeta", preview.meta || "");
    }

    // descripción
    if (preview.desc_text !== undefined) {
      setDescText(preview.desc_text || "");
      localStorage.setItem("previewDescText", preview.desc_text || "");
    }

    // aprenderás (array)
    if (preview.learn_list !== undefined) {
      const list = Array.isArray(preview.learn_list)
        ? preview.learn_list
        : safeParseArray(preview.learn_list);
      setLearnList(list);
      localStorage.setItem("previewLearnList", JSON.stringify(list));
    }

    // áreas (array)
    if (preview.areas_list !== undefined) {
      const list = Array.isArray(preview.areas_list)
        ? preview.areas_list
        : safeParseArray(preview.areas_list);
      setAreasList(list);
      localStorage.setItem("previewAreasList", JSON.stringify(list));
    }

    // precio / descuento
    if (preview.price_now !== undefined) {
      const val = Number(preview.price_now) || 0;
      setPriceNow(val);
      localStorage.setItem("previewPriceNow", String(val));
    }
    if (preview.price_before !== undefined) {
      const val = Number(preview.price_before) || 0;
      setPriceBefore(val);
      localStorage.setItem("previewPriceBefore", String(val));
    }
    if (preview.discount !== undefined) {
      const val = Number(preview.discount) || 0;
      setDiscount(val);
      localStorage.setItem("previewDiscount", String(val));
    }

    // bullets del sidebar (features)
    if (preview.features !== undefined) {
      const feats = Array.isArray(preview.features)
        ? preview.features
        : safeParseArray(preview.features);
      setFeatures(feats.length ? feats : [""]);
      localStorage.setItem("previewFeatures", JSON.stringify(feats));
    }

    // planes (los que editas en el modal)
    if (preview.plans !== undefined) {
      const pls = Array.isArray(preview.plans)
        ? preview.plans
        : safeParseArray(preview.plans);
      // 🔧 Si no hay planes guardados o está vacío, usar DEFAULT_PLANS
      if (pls.length > 0) {
        setPlans(pls);
        localStorage.setItem("previewPlans", JSON.stringify(pls));
      } else {
        setPlans(DEFAULT_PLANS);
        localStorage.setItem("previewPlans", JSON.stringify(DEFAULT_PLANS));
      }
    }

    // video
    if (preview.video_url !== undefined) {
      const videoUrl = preview.video_url || "";
      console.log("🎬 Cargando video:", videoUrl);
      setVideoSrc(videoUrl);
      localStorage.setItem("previewVideoUrl", videoUrl);
      
      // Limpiar cualquier URL local previa
      if (videoObjectUrl) {
        URL.revokeObjectURL(videoObjectUrl);
        setVideoObjectUrl("");
      }
    }

    // rating
    if (preview.rating !== undefined) {
      localStorage.setItem("previewRating", String(preview.rating || 0));
    }
  }, [preview, setTagline]);

  /* ========= GUARDAR en backend (usa estados locales) ========= */
  const handleGuardar = async () => {
    const payload = {
      course_id: Number(passedId),
      tagline,
      clases,
      horas_dia: horasDia,
      meta,
      price_now: Number(priceNow) || 0,
      price_before: Number(priceBefore) || 0,
      discount: Number(discount) || 0,
      features,
      desc_text: descText,
      learn_list: learnList,
      areas_list: areasList,
      plans,
      video_url: preview?.video_url || videoSrc || "",
      rating: Number(passedRating || 0),
    };

    try {
      await save(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (e) {
      console.error("[preview] save error:", e);
      alert("No se pudieron guardar los cambios.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        {/* 🔧 HEADER ACTUALIZADO */}
        <div className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <Link to='/cursos' onClick={handleBack} className="rounded-lg border px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
              ← Volver
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
              {isEditing ? "Actualizar Preview" : "Nuevo Preview"}
            </h1>
            <button
              onClick={handleGuardar}
              className={`ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                saved 
                  ? "bg-emerald-600 text-white" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {saved ? (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                    <path d="M20 6 9 17l-5-5" strokeWidth="2" />
                  </svg>
                  {isEditing ? "Actualizado" : "Guardado"}
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                    <path d="M4 7v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.5L16.5 4H8A4 4 0 0 0 4 8Z" strokeWidth="1.5" />
                    <path d="M16 20v-6H8v6M8 4v4h6" strokeWidth="1.5" />
                  </svg>
                  {isEditing ? "Actualizar" : "Guardar"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-white">
            <div className="grid lg:grid-cols-2 items-center gap-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
                  <input
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Añade una frase…"
                    className="bg-transparent outline-none text-white font-medium text-sm placeholder-white/70 w-[22ch] sm:w-[32ch]"
                  />
                  {tagline && (
                    <button type="button" onClick={() => setTagline("")} className="ml-1 text-white/80 hover:text-white text-xs" title="Limpiar">×</button>
                  )}
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold">{COURSE.title}</h1>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 font-semibold px-5 py-2.5">
                    Empieza ya
                  </span>
                </div>
              </div>

              {/* Imagen lateral */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm" />
                <img src={COURSE.imageUrl} alt={COURSE.title} className="absolute inset-0 h-full w-full object-cover rounded-2xl shadow-lg" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="h-10 bg-white rounded-t-[2rem] -mt-6" />
        </section>

        {/* INFO STRIP */}
        <section id="info" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-900">Información del curso</h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-3 shadow-sm">
              <IconCalendar className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-900">Presencial</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-3 shadow-sm">
              <IconBook className="w-5 h-5 text-indigo-600" />
              <input value={clases} onChange={(e) => setClases(e.target.value)} placeholder="+ 130 clases" className="flex-1 bg-transparent outline-none text-sm font-medium text-indigo-900" />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-3 shadow-sm">
              <IconClock className="w-5 h-5 text-indigo-600" />
              <input value={horasDia} onChange={(e) => setHorasDia(e.target.value)} placeholder="2 h al día" className="flex-1 bg-transparent outline-none text-sm font-medium text-indigo-900" />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-3 shadow-sm">
              <IconClock className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-900">{durationText}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-3 shadow-sm">
              <IconBolt className="w-5 h-5 text-indigo-600" />
              <input value={meta} onChange={(e) => setMeta(e.target.value)} placeholder="Rendimiento" className="flex-1 bg-transparent outline-none text-sm font-medium text-indigo-900" />
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Izq: media + tabs */}
            <div className="lg:col-span-2 space-y-6">
              {/* VIDEO */}
              <div className="relative group">
                <div className="aspect-video rounded-2xl bg-gray-100 overflow-hidden shadow-sm relative">
                  {hasVideo ? (
                    <video 
                      key={preview.video_url || videoSrc} 
                      src={`http://localhost:1001/${preview.video_url}` || videoSrc || videoObjectUrl} 
                      poster={heroImage} 
                      className="h-full w-full object-cover" 
                      controls 
                      preload="metadata"
                    >
                      Tu navegador no soporta videos HTML5.
                    </video>
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-3 text-slate-600">
                      <button
                        type="button"
                        onClick={() => document.getElementById("videoInput")?.click()}
                        className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 font-semibold px-5 py-2.5 shadow hover:bg-violet-50 transition border"
                      >
                        <IconPlay className="w-5 h-5" /> Subir video
                      </button>
                      <input 
                        id="videoInput" 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={onPickVideo} 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs editables */}
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                <div className="flex flex-wrap gap-2">
                  <TabBtn label="Descripción" active={tab === "desc"} onClick={() => setTab("desc")} />
                  <TabBtn label="Aprenderás" active={tab === "learn"} onClick={() => setTab("learn")} />
                  <TabBtn label="Áreas de enseñanza" active={tab === "areas"} onClick={() => setTab("areas")} />
                </div>

                <div className="mt-4 text-gray-700 leading-relaxed">
                  {tab === "desc" && (
                    <textarea value={descText} onChange={(e) => setDescText(e.target.value)} rows={8} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-indigo-300" placeholder="Escribe aquí la descripción del curso…" />
                  )}

                  {tab === "learn" && (
                    <div className="space-y-2">
                      {learnList.map((t, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
                          <input value={t} onChange={(e) => changeAt(setLearnList)(i, e.target.value)} placeholder="Escribe un aprendizaje…" className="flex-1 bg-transparent outline-none border-b border-transparent focus:border-indigo-200 pb-1" />
                          {learnList.length > 1 && (
                            <button onClick={() => removeItem(setLearnList)(i)} className="text-xs text-slate-500 hover:text-red-500" type="button">Quitar</button>
                          )}
                        </div>
                      ))}
                      <button onClick={addItem(setLearnList)} type="button" className="mt-2 inline-flex items-center justify-center rounded-xl border border-indigo-200 text-indigo-700 font-semibold px-4 py-2.5 hover:bg-indigo-50 transition">Añadir punto</button>
                    </div>
                  )}

                  {tab === "areas" && (
                    <div className="space-y-2">
                      {areasList.map((a, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
                          <input value={a} onChange={(e) => changeAt(setAreasList)(i, e.target.value)} placeholder="Escribe un área…" className="flex-1 bg-transparent outline-none border-b border-transparent focus:border-indigo-200 pb-1" />
                          {areasList.length > 1 && (
                            <button onClick={() => removeItem(setAreasList)(i)} className="text-xs text-slate-500 hover:text-red-500" type="button">Quitar</button>
                          )}
                        </div>
                      ))}
                      <button onClick={addItem(setAreasList)} type="button" className="mt-2 inline-flex items-center justify-center rounded-xl border border-indigo-200 text-indigo-700 font-semibold px-4 py-2.5 hover:bg-indigo-50 transition">Añadir área</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Derecha: sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Precio / Planes */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                <div className="text-xs font-medium text-indigo-700 uppercase tracking-wide">Mensual</div>

                <div className="mt-1 flex items-end gap-2">
                  <div className="text-3xl font-extrabold text-indigo-900 flex items-end gap-1">
                    $<input type="number" min={0} value={priceNow} onChange={(e) => setPriceNow(Number(e.target.value))} className="w-24 bg-transparent outline-none text-indigo-900 font-extrabold text-3xl" />
                    <span className="ml-1 text-xl">MXN</span>
                  </div>

                  <div className="text-sm line-through text-gray-400">
                    $<input type="number" min={0} value={priceBefore} onChange={(e) => setPriceBefore(Number(e.target.value))} className="w-16 bg-transparent outline-none text-gray-400 line-through" />
                  </div>

                  <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    -<input type="number" min={0} max={100} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-10 bg-transparent outline-none text-emerald-700 font-semibold text-xs text-right" />%
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {features.map((txt, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      <input value={txt} onChange={(e) => handleFeatureChange(i, e.target.value)} placeholder="Escribe un beneficio…" className="flex-1 bg-transparent outline-none border-b border-transparent focus:border-indigo-200 pb-1" />
                      {features.length > 1 && (
                        <button type="button" onClick={() => removeFeature(i)} className="text-xs text-slate-500 hover:text-red-500" title="Quitar punto">Quitar</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addFeature} className="mt-2 inline-flex items-center justify-center rounded-xl border border-indigo-200 text-indigo-700 font-semibold px-4 py-2.5 hover:bg-indigo-50 transition">Añadir punto</button>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button type="button" onClick={openPlans} className="rounded-xl border border-indigo-200 text-indigo-700 font-semibold px-4 py-2.5 hover:bg-indigo-50 transition">Ver más planes</button>
                </div>
              </div>

              {/* Rating (visual) */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Valoración</span>
                  <div className="ml-auto flex items-center gap-1" aria-label="Rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStar key={i} className={`w-5 h-5 ${i < Number(passedRating || 0) ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{passedRating || "0.0"}</span>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* MODAL DE PLANES */}
      {showPlans && (
        <PlansModal title={COURSE.title} plans={plans} setPlans={setPlans} onClose={closePlans} />
      )}
    </>
  );
}

function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-full border transition ${active ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
    >
      {label}
    </button>
  );
}

/* ---------- Modal (Planes editables) ---------- */
function PlansModal({ title, plans, setPlans, onClose }) {
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  const updatePlanField = (idx, field, value) => {
    setPlans(prev => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  };
  const changeFeature = (planIdx, featIdx, value) => {
    setPlans(prev => prev.map((p, i) => i !== planIdx ? p : { ...p, features: p.features.map((f, j) => (j === featIdx ? value : f)) }));
  };
  const addFeature = (planIdx) => {
    setPlans(prev => prev.map((p, i) => (i !== planIdx ? p : { ...p, features: [...p.features, ""] })));
  };
  const removeFeature = (planIdx, featIdx) => {
    setPlans(prev => prev.map((p, i) => i !== planIdx ? p : { ...p, features: p.features.length <= 1 ? p.features : p.features.filter((_, j) => j !== featIdx) }));
  };

  return (
    <div onClick={handleBackdrop} className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" aria-modal="true" role="dialog">
      <div className="relative w-full max-w-5xl">
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 opacity-90 blur-md" aria-hidden />
        <div className="relative rounded-3xl bg-white/90 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-start gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-900">Elige un plan a tu medida</h3>
              <p className="text-sm text-slate-600 mt-1">Puedes editar precios y beneficios directamente.</p>
            </div>
            <button onClick={onClose} aria-label="Cerrar" className="ml-auto h-10 w-10 rounded-full bg-white text-slate-600 shadow hover:bg-slate-50 grid place-items-center border border-slate-200">×</button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p, idx) => (
              <div key={p.id || idx} className={["rounded-2xl border bg-white p-5 shadow-sm flex flex-col", p.highlighted ? "border-indigo-300 ring-2 ring-indigo-200" : "border-slate-200"].join(" ")}>
                <div className="flex items-center gap-2">
                  <input value={p.badge} onChange={(e) => updatePlanField(idx, "badge", e.target.value)} placeholder="Badge (ej. Pago mes a mes)" className={`text-xs font-semibold px-2 py-1 rounded-full ${p.highlighted ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-700"} bg-opacity-100 outline-none`} />
                </div>
                <input value={p.name} onChange={(e) => updatePlanField(idx, "name", e.target.value)} placeholder="Nombre del plan" className="mt-3 text-lg font-bold text-slate-900 bg-transparent outline-none" />
                <input value={p.priceText} onChange={(e) => updatePlanField(idx, "priceText", e.target.value)} placeholder="$1,500 MXN / 2 pagos de $5,500" className="mt-1 text-2xl font-extrabold text-indigo-700 bg-transparent outline-none" />
                <input value={p.note || ""} onChange={(e) => updatePlanField(idx, "note", e.target.value)} placeholder="Nota (ej. Durante todo el curso)" className="text-xs text-slate-500 bg-transparent outline-none" />
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      <input value={f} onChange={(e) => changeFeature(idx, j, e.target.value)} placeholder="Escribe un beneficio…" className="flex-1 bg-transparent outline-none border-b border-transparent focus:border-indigo-200 pb-1" />
                      {p.features.length > 1 && (
                        <button onClick={() => removeFeature(idx, j)} type="button" className="text-xs text-slate-500 hover:text-red-500" title="Quitar punto">Quitar</button>
                      )}
                    </li>
                  ))}
                </ul>
                <button onClick={() => addFeature(idx)} type="button" className="mt-3 inline-flex items-center justify-center rounded-xl border border-indigo-200 text-indigo-700 font-semibold px-4 py-2.5 hover:bg-indigo-50 transition">Añadir punto</button>
                <span className={["mt-5 inline-flex justify-center items-center rounded-xl px-4 py-2.5 font-semibold transition", p.highlighted ? "bg-indigo-600 text-white" : "border border-indigo-200 text-indigo-700"].join(" ")}>Adquirir</span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-slate-500">Nota: Los cambios se guardan automáticamente en este navegador (localStorage).</p>
        </div>
      </div>
    </div>
  );
}