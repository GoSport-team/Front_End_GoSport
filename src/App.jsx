import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import CreateCampeonato from "./pages/campeonatos/view"
import Subirfoto from "./pages/dashboard/subirfoto";
import Landing from "./pages/landing/landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/tables/view" element={<CreateCampeonato />} />
      <Route path="/subirfoto" element={<Subirfoto/>} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
