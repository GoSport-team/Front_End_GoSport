import axios from 'axios'
const URL_API = import.meta.env.VITE_API_URL

export const SorteoEquiposInter =async (data) => {
    const response = await axios.post(`${URL_API}/vsInter`,{data})
    console.log(response)
    const actualizarEstadoCam = await axios.patch(`${URL_API}/campeonato/${data.idCampeonato}`,{    
estadoCampeonato:"Ejecucion"
    })
    if( actualizarEstadoCam.data){
        console.log(actualizarEstadoCam.data)
    }
  return response.data
}


