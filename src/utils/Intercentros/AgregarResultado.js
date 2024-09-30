import axios from "axios"
import { calcularPuntos } from "./CalcularPuntos"
import { actualizarPosiciones } from "./actualizarPosiciones"
const URL_API = import.meta.env.VITE_API_URL

export const AgregarResultado = async(equipo1, equipo2, goles, amarillas, rojas,idVs, idCampeonato, equipos)=>{

    
    //patch al vs 
    const responsePatch = await axios.patch(`${URL_API}/vsInter/${idVs}`,{
        estado:false
    })
    
    const golesE1 = goles.filter(item=> item.equipo == 'equipo1')
    const amarillasE1 = amarillas.filter((item)=> item.equipo == 'equipo1')
    const rojasE1 = rojas.filter((item)=> item.equipo == 'equipo1')
    const golesE2 = goles.filter((item)=> item.equipo == 'equipo2')
    const amarillasE2 = amarillas.filter((item)=> item.equipo == 'equipo2')
    const rojasE2 = rojas.filter((item)=> item.equipo == 'equipo2')
    //vereficar ganador
    const resultado = calcularPuntos(golesE1, golesE2)
    
    const response = await axios.post(`${URL_API}/resultadosInterCentros`,{
        equipo1:{
            equipo1,
            golesE1,
            amarillasE1,
            rojasE1,
            puntos: resultado['equipo1']
        },
        equipo2:{
         equipo2,
         golesE2,
         amarillasE2,
         rojasE2,
         puntos: resultado['equipo2']   
        },
        idCampeonato:idCampeonato,
        idVs:idVs,
        estadoPartido:true
    })

    const data1 = {
        pts: resultado['equipo1'],
        goles: golesE1,
        amarillas: amarillasE1,
        rojas:rojasE1
    }
    const data2 ={
        pts: resultado['equipo2'],
        goles: golesE2,
        amarillas: amarillasE2,
        rojas:rojasE2
    }
    const result = actualizarPosiciones(equipo1._id,equipo2._id,data1,data2)
    
    if(response.data.msg){
        alert(response.data.msg)
    }
}