import axios from "axios"

export const numeroEquipos = async () => {
    try {
        const { data: equipos } = await axios.get('http://localhost:3001/dataGraficas/equipos'); 
        return equipos;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return [];
    }
};

export const numeroInscritos =async()=>{
    try {    
        const { data: participantes } = await axios.get('http://localhost:3001/dataGraficas/participantes');
       return participantes
    } catch (error) {
        console.error(error)
    }
}

export const cantidadCampeonatos =async()=>{
    try {
        const { data: campeonatos } = await axios.get('http://localhost:3001/dataGraficas/campeonatos');
        return campeonatos
    } catch (error) {
        console.error(error)
    }
}