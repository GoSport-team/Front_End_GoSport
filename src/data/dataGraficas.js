import axios from "axios"

export const numeroEquipos = async () => {
    try {
        const { data: campeonatos } = await axios.get('http://localhost:3001/campeonato');
        
        const IdCampeonato = campeonatos.map(campeonato => campeonato._id);

        const equiposPromises = IdCampeonato.map(async (id) => {
            const { data: equipo } = await axios.get('http://localhost:3001/equipoInscripto', {
                headers: { id }
            });
            return equipo;
        });

        const equipos = await Promise.all(equiposPromises);
        const conteoEquipos = equipos.map(equipo => equipo.length);
        const top5Equipos = conteoEquipos.sort((a, b) => b - a).slice(0, 5);
    
        return top5Equipos;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return [];
    }
};

export const numeroInscritos =async()=>{
    const { data: campeonatos } = await axios.get('http://localhost:3001/campeonato');
        
    const IdCampeonato = campeonatos.map(campeonato => campeonato._id);

    const equiposPromises = IdCampeonato.map(async (id) => {
        const { data: equipo } = await axios.get('http://localhost:3001/equipoInscripto', {
            headers: { id }
        });
        return equipo;
    });

    const equipos = await Promise.all(equiposPromises);
    const conteoInscripciones = equipos.map((equipo)=> equipo.participantes.length)
    const top5Inscripciones = conteoInscripciones.sort((a,b)=> b-a).slice(0,5)

    return top5Inscripciones
}

