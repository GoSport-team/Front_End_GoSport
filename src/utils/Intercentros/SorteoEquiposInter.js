import axios from 'axios'

export const SorteoEquiposInter =async (data) => {
    const response = await axios.post(`http://localhost:3001/vsInter`,{data})
    console.log(response)
    const actualizarEstadoCam = await axios.patch(`http://localhost:3001/campeonato/${data.idCampeonato}`,{    
estadoCampeonato:"Ejecucion"
    })
    if( actualizarEstadoCam.data){
        console.log(actualizarEstadoCam.data)
    }
  return response.data
}


