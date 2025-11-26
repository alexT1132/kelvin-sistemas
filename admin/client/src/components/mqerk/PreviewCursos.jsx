// PreviewsManager.jsx
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCursos } from "../../context/mqerk/CursosContext";
import { usePreview } from "../../context/mqerk/PreviewContext";

const cls = (...a) => a.filter(Boolean).join(" ");
const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export default function PreviewsManager() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const { cursos, ObtenerCursos } = useCursos();

  const { loadByCourse, setPreview } = usePreview();

  useEffect(() => {
    ObtenerCursos();
  }, [ObtenerCursos]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return cursos;
    return (cursos || []).filter(
      (c) =>
        (c.nombre || "").toLowerCase().includes(q) ||
        (c.nivel || "").toLowerCase().includes(q)
    );
  }, [query, cursos]);

  // CREAR preview (vacío o con lo que viene del curso)
  const handleCreatePreview = () => {
    if (!selected) return;
    setPreview(null);
    navigate("/previews/nuevo", {
      state: {
        courseId: selected.id,
        courseName: selected.nombre,
        courseModalidad: selected.modalidad,
        courseDuration: selected.duration,           // ✅ Usar 'duration'
        courseDurationUnit: selected.durationUnit,
        imageUrl: selected.imagenUrl,
        courseRating: selected.rating,
        courseLevel: selected.nivel,
        courseSubtitle: selected.subtitulo,
        courseCode: selected.codigo,
      },
    });
  };

  // ✨ EDITAR preview: traer de BD y luego navegar
  const handleEditPreview = async (curso) => {
    try {
      // 1. pedir al backend el preview de ese curso
      await loadByCourse(curso.id);
      // 2. navegar al mismo componente de preview
      navigate("/previews/nuevo", {
        state: {
          courseId: curso.id,
          courseName: curso.nombre,
          courseModalidad: curso.modalidad,
          courseDuration: curso.duration,
          courseDurationUnit: curso.durationUnit,
          imageUrl: curso.imagenUrl,
          courseRating: curso.rating,
          courseLevel: curso.nivel,
          courseSubtitle: curso.subtitulo,
          courseCode: curso.codigo,
        },
      });
    } catch (err) {
      console.error(err);
      // si no hay preview, igual lo mandamos para que lo cree
      navigate("/previews/nuevo", {
        state: {
          courseId: curso.id,
          courseName: curso.nombre,
          courseModalidad: curso.modalidad,
          courseDuration: curso.duration,
          courseDurationUnit: curso.durationUnit,
          imageUrl: curso.imagenUrl,
          courseRating: curso.rating,
          courseLevel: curso.nivel,
          courseSubtitle: curso.subtitulo,
          courseCode: curso.codigo,
        },
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Previews</h1>
      <p className="text-slate-600 mt-1">Selecciona un curso para crear su preview</p>

      {/* Search + Action */}
      <div className="mt-5 flex items-center gap-3">
        <div className="relative flex-1">
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Buscar curso o categoría…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" />
          </svg>
        </div>

        <button
          onClick={handleCreatePreview}
          disabled={!selected}
          className={cls(
            "rounded-full px-5 py-2.5 text-sm font-semibold transition",
            selected
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
          )}
        >
          Crear preview
        </button>
      </div>

      {/* Tabla */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div className="col-span-5">Curso</div>
          <div className="col-span-2">Nivel</div>
          <div className="col-span-2">Vistas</div>
          <div className="col-span-1">Likes</div>
          <div className="col-span-2 text-right">Preview</div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((c) => {
            const active = selected?.id === c.id;
            return (
              <div
                key={c.id}
                className={cls(
                  "grid w-full grid-cols-12 items-center px-5 py-3 text-left transition",
                  active ? "bg-slate-50" : "hover:bg-slate-50"
                )}
              >
                <button
                  onClick={() => setSelected(c)}
                  className="col-span-5 flex items-center gap-3 text-left"
                >
                  <div
                    className={cls(
                      "h-10 w-10 shrink-0 rounded-xl grid place-items-center border text-sm font-semibold",
                      active
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    )}
                  >
                    {initials(c.nombre)}
                  </div>
                  <div className="truncate">
                    <div className="truncate font-medium text-slate-900">
                      {c.nombre}
                    </div>
                  </div>
                </button>

                <div className="col-span-2 text-slate-700">{c.nivel}</div>
                <div className="col-span-2 text-slate-700">{c.vistas}</div>
                <div className="col-span-1 text-slate-700">{c.likes}</div>

                {/* Botón Editar preview */}
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => handleEditPreview(c)}
                    className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 transition"
                  >
                    Editar preview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}