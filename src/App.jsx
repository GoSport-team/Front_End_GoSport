import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
<<<<<<< HEAD
import CreateCampeonato from "./pages/campeonatos/Crear"
import Subirfoto from "./pages/dashboard/subirfoto";
=======
import CreateCampeonato from "./pages/campeonatos/view"
>>>>>>> 23cc8fc39d5ead4805e7a9172cef22f8fab89f31
import Landing from "./pages/landing/landing";
import CampeonatosDisponibles from "./components/Jugador/Campeonatos/campeonatosDisponibles";
import { DatosEquipos } from "./components/Jugador/CrearEquipo/datosEquipos";
import { DatosEquiposInscripcion } from "./components/Jugador/InscribirEquipo/DatosEquiposInscripcion";
<<<<<<< HEAD
import { Participantes } from "./pages/campeonatos/Participantes";
=======
import { VerEquipo } from "./components/Jugador/VerEquipo/VerEquipo";

>>>>>>> 23cc8fc39d5ead4805e7a9172cef22f8fab89f31
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/tables/view" element={<CreateCampeonato />} />
      
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
<<<<<<< HEAD
      <Route path="/dashjugador" element={<DatosEquiposInscripcion/>}/>
      <Route path="/participantes" element={<Participantes/>}/>
=======
      <Route path="/jugador/dashboard" element={<CampeonatosDisponibles/>}/>
      <Route path="/jugador/dashboard/crearequipo" element={<DatosEquipos/>}/>
      <Route path="/jugador/dashboard/:id" element={<DatosEquiposInscripcion/>}/>
      <Route path="/jugador/dashboard/verequipo/:cedula" element={<VerEquipo/>} />
>>>>>>> 23cc8fc39d5ead4805e7a9172cef22f8fab89f31
    </Routes>
  );
}

export default App;
