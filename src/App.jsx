import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth , Campe} from "@/layouts";
import CreateCampeonato from "./pages/campeonatos/view"
import Landing from "./pages/landing/landing";
import CampeonatosDisponibles from "./components/Jugador/Campeonatos/campeonatosDisponibles";
import { DatosEquipos } from "./components/Jugador/CrearEquipo/datosEquipos";
import { DatosEquiposInscripcion } from "./components/Jugador/InscribirEquipo/DatosEquiposInscripcion"; 
import { VerEquipo } from "./components/Jugador/VerEquipo/VerEquipo";
import { PerfilJugador } from "./components/Jugador/PerfilJugador/perfilJugador";
import { CrearPlanillero } from "./widgets/componentes/Planillero/CrearPlanillero";
import { AgregarProvider } from "./context/parContext";
import InicioPassword from "./widgets/componentes/RecuperarContraseña/home";
import TeamJugador from "./components/Jugador/Equipo/equipo";
import ResPart from "./widgets/componentes/ParticantesResultados";

function App() {
  return (
    
  <AgregarProvider>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/tables/view" element={<CreateCampeonato />} />
      
      <Route path="/campe/*" element={<Campe/>}/>
      
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/dashjugador" element={<DatosEquiposInscripcion/>}/>
      <Route path="/jugador/dashboard" element={<CampeonatosDisponibles/>}/>
      <Route path="/jugador/dashboard/crearequipo" element={<DatosEquipos/>}/>
      <Route path="/jugador/dashboard/:id/:cedula/" element={<DatosEquiposInscripcion/>}/>
      <Route path="/jugador/dashboard/verequipo/:cedula" element={<VerEquipo/>} />
      <Route path="/jugador/dashboard/perfilJugador" element={
        <PerfilJugador/>
      }
      />
      <Route path="/planillero/agregar" element={<CrearPlanillero />} />
      <Route path="/contraseña" element={<InicioPassword/>} />
      <Route path="/jugador/dashboard/Jugador" element={<TeamJugador/>} />
      <Route path="/part" element={<ResPart/>} />
    </Routes>
    </AgregarProvider>
   
  );
}

export default App;
