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
        const conteoInscripciones = equipos.map((equipo)=>equipo.map((equipo)=> equipo.Equipo.participantes.length))
        const sumaIntegrantes = conteoInscripciones.map((integrantes)=>integrantes.reduce((suma, valor)=> suma+valor,0))
        const top5Inscripciones = sumaIntegrantes.sort((a,b)=> b-a).slice(0,5)
        const result=top5Inscripciones.slice().sort(() => Math.random() - 0.5);
        return result
    } catch (error) {
        console.error(error)
    }
}



export const cantidadCampeonatos =async()=>{
    try {
        const { data: campeonatos } = await axios.get('http://localhost:3001/campeonato');

        const interfichas = campeonatos.filter((campeonato)=>campeonato.tipoCampeonato =='Interfichas')
        const intercentros = campeonatos.filter((campeonato)=>campeonato.tipoCampeonato=='Intercentros')
        const recreativos = campeonatos.filter((campeonato)=>campeonato.tipoCampeonato == 'Recreativos')

        return {
            interfichas:interfichas.length,
            intercentros:intercentros.length,
            recreativos:recreativos.length
        }

    } catch (error) {
        console.error(error)
    }
}