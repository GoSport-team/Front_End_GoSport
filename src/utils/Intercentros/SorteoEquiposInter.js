import axios from 'axios'

export const SorteoEquiposInter =async (data) => {
    const response = await axios.post(`https://back-end-gosport.onrender.com/vsInter`,{data})
    console.log(response)
    const actualizarEstadoCam = await axios.patch(`https://back-end-gosport.onrender.com/campeonato/${data.idCampeonato}`,{    
estadoCampeonato:"Ejecucion"
    })
    if( actualizarEstadoCam.data){
        console.log(actualizarEstadoCam.data)
    }
  return response.data
}


