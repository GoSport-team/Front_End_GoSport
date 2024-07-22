import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
<<<<<<< HEAD
import CreateCampeonato from "./pages/campeonatos/view"

=======
import Subirfoto from "./pages/dashboard/subirfoto";
>>>>>>> f44847f9fbe42d2361005b7129b7f0c2dc1c77d9

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
<<<<<<< HEAD
      <Route path="/dashboard/tables/view" element={<CreateCampeonato />} />
=======
      <Route path="/subirfoto" element={<Subirfoto/>} />
>>>>>>> f44847f9fbe42d2361005b7129b7f0c2dc1c77d9
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
