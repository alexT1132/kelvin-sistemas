import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "../pages/Index";
import DashboardMqerk from "../pages/mqerk/Dashboard";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 py-3 border-b">MQerk</header>
      <main className="flex-1 p-4">
        <Suspense fallback={<div>Cargando…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="px-4 py-3 border-t text-sm text-gray-500">© CodeCraft</footer>
    </div>
  );
}

function MqerkRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<div>Index Page</div>} />
        <Route index path="/administrador" element={<Index />} />
        <Route path="/dashboard" element={<DashboardMqerk />} />
        <Route path="/administrador_dashboard" element={<div>Administrador Dashboard</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default MqerkRoutes;