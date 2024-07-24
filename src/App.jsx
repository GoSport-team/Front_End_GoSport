import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Carrusel } from "./components/Jugador/Campeonatos/Carrusel";
import CampeonatosDisponibles from "./components/Jugador/Campeonatos/campeonatosDisponibles";
import { DatosEquipos } from "./components/Jugador/CrearEquipo/datosEquipos";
import { DatosEquiposInscripcion } from "./components/Jugador/InscribirEquipo/DatosEquiposInscripcion";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/dashjugador" element={<DatosEquiposInscripcion/>}/>
    </Routes>
  );
}

export default App;
