import { useEffect, useMemo, useState } from "react";
import Plantilla from "../../pages/mqerk/PlantillaPreview"; // <-- tu plantilla

export default function PreviewEditor() {
  // Cargar draft de localStorage
  const initial = useMemo(() => {
    try {
      const raw = localStorage.getItem("previewDraft");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const [form, setForm] = useState(
    initial || {
      title: "",
      subtitle: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
      cover: "",
      badge: "",
      cta: "Lee más aquí",
      views: 0,
      likes: 0,
      accent: "#3b82f6",
    }
  );

  // Persistimos cada cambio (auto-save)
  useEffect(() => {
    localStorage.setItem("previewDraft", JSON.stringify(form));
  }, [form]);

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header simple */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <a
            href="/previews"
            className="rounded-lg border px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            ← Volver
          </a>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
            Editor de Preview
          </h1>
          <div className="ml-auto text-xs text-slate-500">
            Auto-guardado en localStorage
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid gap-6 lg:grid-cols-2">
        {/* Formulario (izq) */}
        <div className="space-y-4">
          <Field label="Título">
            <input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>

          <Field label="Subtítulo">
            <input className="input" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Categoría">
              <input className="input" value={form.category} onChange={(e) => set("category", e.target.value)} />
            </Field>
            <Field label="Fecha">
              <input type="date" className="input" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </Field>
          </div>

          <Field label="URL de portada">
            <input className="input" value={form.cover} onChange={(e) => set("cover", e.target.value)} />
          </Field>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Badge/Insignia">
              <input className="input" value={form.badge} onChange={(e) => set("badge", e.target.value)} />
            </Field>
            <Field label="Texto del botón">
              <input className="input" value={form.cta} onChange={(e) => set("cta", e.target.value)} />
            </Field>
            <Field label="Color de acento">
              <input type="color" className="input h-11 p-1" value={form.accent} onChange={(e) => set("accent", e.target.value)} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Vistas">
              <input type="number" className="input" value={form.views} onChange={(e) => set("views", e.target.value)} />
            </Field>
            <Field label="Likes">
              <input type="number" className="input" value={form.likes} onChange={(e) => set("likes", e.target.value)} />
            </Field>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                // Aquí haces tu POST real
                alert("Aquí harías POST a tu API para guardar el preview.");
              }}
              className="rounded-xl bg-slate-900 text-white font-semibold px-4 py-2.5 hover:bg-slate-800"
            >
              Guardar preview
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("previewDraft");
                alert("Draft limpiado");
              }}
              className="rounded-xl border border-slate-200 text-slate-700 font-semibold px-4 py-2.5 hover:bg-slate-50"
            >
              Limpiar draft
            </button>
          </div>
        </div>

        {/* Vista (der) – TU plantilla, sin tocar estilos */}
        <div className="lg:border-l lg:border-slate-200 lg:pl-6">
          {/* Si tu Plantilla usa props en inglés, esto ya funciona */}
          <Plantilla data={form} />
          {/* Si tu Plantilla usa props en español, usa un adapter aquí */}
        </div>
      </div>

      {/* estilos de inputs in-file */}
      <style>{`
        .input{ @apply w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400; }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-slate-700">{label}</div>
      {children}
    </label>
  );
}
