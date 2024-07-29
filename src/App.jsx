import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import CreateCampeonato from "./pages/campeonatos/view"
import Landing from "./pages/landing/landing";
import { DatosEquiposInscripcion } from "./components/Jugador/InscribirEquipo/DatosEquiposInscripcion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/tables/view" element={<CreateCampeonato />} />
      
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/dashjugador" element={<DatosEquiposInscripcion/>}/>
    </Routes>
  );
}

export default App;
