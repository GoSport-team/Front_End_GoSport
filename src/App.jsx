import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import CreateCampeonato from "./pages/campeonatos/Crear"
import Landing from "./pages/landing/landing";
import CampeonatosDisponibles from "./components/Jugador/Campeonatos/campeonatosDisponibles";
import { DatosEquipos } from "./components/Jugador/CrearEquipo/datosEquipos";
import { DatosEquiposInscripcion } from "./components/Jugador/InscribirEquipo/DatosEquiposInscripcion";
import { Participantes } from "./pages/campeonatos/Participantes";
import { VerEquipo } from "./components/Jugador/VerEquipo/VerEquipo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/tables/view" element={<CreateCampeonato />} />
      
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/dashjugador" element={<DatosEquiposInscripcion/>}/>
      <Route path="/participantes" element={<Participantes/>}/>
      <Route path="/jugador/dashboard" element={<CampeonatosDisponibles/>}/>
      <Route path="/jugador/dashboard/crearequipo" element={<DatosEquipos/>}/>
      <Route path="/jugador/dashboard/:id" element={<DatosEquiposInscripcion/>}/>
      <Route path="/jugador/dashboard/verequipo/:cedula" element={<VerEquipo/>} />
    </Routes>
  );
}

export default App;
