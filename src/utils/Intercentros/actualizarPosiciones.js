import axios from "axios"

export const actualizarPosiciones =async(equipo1, equipo2,data1,data2)=>{

   const {data} =  await axios.get(`http://localhost:3001/posicionesIntercentros/${equipo1}`)

   const pts1 = data.pts
   const goles1 = data.goles
   const amarillas1 =data.amarillas 
   const rojas1 = data.rojas
   const newData = {
    pts: pts1 + data1.pts,
    goles: goles1 + data1.goles.reduce((total, gol) => total + parseInt(gol.goles), 0),
    amarillas: amarillas1 + data1.amarillas.reduce((total, amarillas) => total + parseInt(amarillas.amarillas), 0),
    rojas : rojas1 + data1.rojas.reduce((total, rojas) =>total + parseInt(rojas.rojas), 0)
   }
    const response = await axios.patch(`http://localhost:3001/posicionesIntercentros/${data._id}`,{
      pts:newData.pts,
      goles:newData.goles,
      amarillas: newData.amarillas,
      rojas: newData.rojas
    })

    const dataEQ2 =  await axios.get(`http://localhost:3001/posicionesIntercentros/${equipo2}`)
    const newData2 = {
      pts: dataEQ2.data.pts + data2.pts,
      goles: dataEQ2.data.goles + data2.goles.reduce((total, gol) =>  total + parseInt(gol.goles), 0),
      amarillas: dataEQ2.data.amarillas + data2.amarillas.reduce((total, amarillas) =>total + parseInt(amarillas.amarillas), 0),
      rojas : dataEQ2.data.rojas + data2.rojas.reduce((total, rojas) =>total + parseInt(rojas.rojas), 0)
     }
     const response2 = await axios.patch(`http://localhost:3001/posicionesIntercentros/${dataEQ2.data._id}`,{
      pts:newData2.pts,
      goles:newData.goles,
      amarillas:newData.amarillas,
      rojas:newData2.rojas
    })
}