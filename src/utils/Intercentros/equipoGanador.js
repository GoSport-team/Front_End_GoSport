export const obtenerGanadorFinal = (equipos) => {
    equipos.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts; 
      if (b.goles !== a.goles) return b.goles - a.goles; 
      return a.amarillas - b.amarillas; 
    });
  
    return equipos[0].equipo;
  };