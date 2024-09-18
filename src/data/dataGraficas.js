import axios from "axios"
const URL_API = import.meta.env.VITE_API_URL

export const numeroEquipos = async () => {
    try {
        const { data: equipos } = await axios.get(`${URL_API}/dataGraficas/equipos`); 
        return equipos;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return [];
    }
};

export const numeroInscritos =async()=>{
    try {    
        const { data: participantes } = await axios.get(`${URL_API}/dataGraficas/participantes`);
       return participantes
    } catch (error) {
        console.error(error)
    }
}

export const cantidadCampeonatos =async()=>{
    try {
        const { data: campeonatos } = await axios.get(`${URL_API}/dataGraficas/campeonatos`);
        return campeonatos
    } catch (error) {
        console.error(error)
    }
}