export function calcularPuntos(golesE1, golesE2) {  
    const sumarGoles = (goles) => goles.reduce((total, gol) => total + parseInt(gol.goles), 0);

    const golesEquipo1 = sumarGoles(golesE1);
    const golesEquipo2 = sumarGoles(golesE2);
    if (golesEquipo1 > golesEquipo2) {
        return { equipo1: 3, equipo2: 0 };
    } else if (golesEquipo2 > golesEquipo1) {
        return { equipo1: 0, equipo2: 3 };
    } else if(golesEquipo1 == golesEquipo2){
        return { equipo1: 1, equipo2: 1 };
    }
}