import axios from 'axios'
import React from 'react'
import { Card, Dialog } from '@material-tailwind/react'
export const SortearMejorPerdedor = ({setSortearEquipos, idVs, equipoRamdon,equiposPerdedores, modalSortearEquipos}) => {
    console.log(equiposPerdedores)
    const actualizarVs= async()=>{
        const informacions={
          informacion:{
            team2:equipoRamdon
          }
        }
       
        //console.log(informacions)
    const response= await axios.patch(`http://localhost:3001/vs/${idVs}`,{
    equipo2:informacions
    })
    console.log(response.data)
      }
      const actu=()=>{
        actualizarVs()
        setSortearEquipos(false)
      } 
  return (
    <>
    {modalSortearEquipos&&(

<Dialog className="fixed  bg-gray-600 bg-opacity-50 flex justify-center items-center" open={modalSortearEquipos} >
<div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
  <h2 className="text-2xl font-bold mb-4">Equipos a sortear</h2>
  

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
{equiposPerdedores&& equiposPerdedores.map((equipo)=>(
    <div key={equipo.Equipo._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
     
      <p>{equipo.Equipo.nombreEquipo}</p>
      <img src={equipo.Equipo.imgLogo} alt="" />
    </div>
   
))}
</div>
    

  <button
  onClick={actu}
    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
  >
    Sortear
  </button>
</div>
</Dialog>
    )}
  </>
  )
}
