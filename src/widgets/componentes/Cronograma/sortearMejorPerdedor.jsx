import axios from 'axios'
import React from 'react'
import { UseAgregar } from '@/context/parContext'
import { Card, Dialog } from '@material-tailwind/react'
const URL_API = import.meta.env.VITE_API_URL
export const SortearMejorPerdedor = ({setSortearEquipos, idVs, equipoRamdon,equiposPerdedores, modalSortearEquipos, setAgregar}) => {
  //console.log('ramdon ',equipoRamdon)
  const {setBotonAgregar}=UseAgregar()
  //console.log(equiposPerdedores)
    const actualizarVs= async()=>{
        const informacions={
          informacion:{
            team2:equipoRamdon
          }
        }
       
        //console.log(informacions)
    const response= await axios.patch(`${URL_API}/vs/${idVs}`,{
    equipo2:informacions
    })
    //console.log(response.data)
      }
      const actuEstado= async()=>{
        try{
          const response = await axios.patch(`${URL_API}/inscripcionEquipos/estado/${equipoRamdon.Equipo._id}`,{
            estado:true
          })
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }
      const actu=()=>{
        setAgregar(true)
        actuEstado()
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
              class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >
    Sortear
  </button>
  <button
  onClick={()=>setSortearEquipos(false)}
    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
  >
    Cancelar
  </button>
</div>
</Dialog>
    )}
  </>
  )
}
