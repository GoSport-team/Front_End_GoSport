import axios from 'axios'
import React ,{useEffect, useState, useCallback}from 'react'
import { SortearMejorPerdedor } from './sortearMejorPerdedor'
export const MejorPerdedor = ({equipo1, equipo2, setBotonAgregar, idfase, idVs, sorteoMejorPerdedor}) => {
 // console.log(idfase)
  const [equiposPerdedores, setEquiposPerdedores]= useState([])
  const [controlers, setControllers]= useState()
  const[equipoRamdon, setEquipoRamdon]=useState()
const [controler , setController]= useState(false)
const[modalSortearEquipos, setSortearEquipos]=useState()
const URL_API = import.meta.env.VITE_API_URL
const [agregar,setAgregar]= useState()
    useEffect(()=>{
      const EquiposGanadores=async()=>{
        try{
          const response= await axios.get(`${URL_API}/fase/${idfase}`)
         //console.log(response.data.equiposPerdedores)
          setEquiposPerdedores(response.data.equiposPerdedores)
        }catch(error){
    console.log(error)
        }
          }
          EquiposGanadores()
    },[equiposPerdedores])
   //console.log(equiposPerdedores)

    useEffect(()=>{
  if (equipo2.imgLogo === "No tiene asignado equipo ") {
  setBotonAgregar(false);
}else{
  setBotonAgregar(true)
}
},[equipo2])
      //console.log(equiposPerdedores)
   
const ramdonPerdedores=async(equiposPerdedores)=>{
  try{
    const response= await axios.post(`${URL_API}/vs/mejorPerdedor`,{equiposPerdedores:equiposPerdedores})
    console.log(response.data[0])
    setEquipoRamdon(response.data[0])
  }catch(error){
    console.log(error)
  }
}

const modalSortearEquipo=()=>{
  ramdonPerdedores(equiposPerdedores)
  setSortearEquipos(true)

}

 setBotonAgregar(agregar)
//console.log(equipoRamdon)
  return (
    <div className='flex flex-col gap-4 '>
    <div className='flex items-center'>
      <img className='w-1/4 md:w-2/4 object-contain h-16 md:h-24 rounded-3xl' src={equipo1.imgLogo} />
      
      <div className='ml-4 flex justify-center items-center'>
        <h4 className='text-lg md:text-xl font-semibold text-gray-700'>{equipo1.nombreEquipo}</h4>
      </div>
    </div>
    <div className='flex item-center justify-center'>
          <h1 className='text-center text-4xl font-extrabold'>Vs</h1>
        </div>
    <div className='flex items-center'>
        {
            equipo2.imgLogo === "No tiene asignado equipo "&&(
<h1 >No tiene equipo asignado</h1>
            )
        }{sorteoMejorPerdedor&&(

        <button onClick={modalSortearEquipo}   className="px-4 py-2 bg-gray-500 text-white rounded-md"> Sortear</button>
        )}
   
     
    </div>
<SortearMejorPerdedor setSortearEquipos={setSortearEquipos} idVs={idVs} equipoRamdon={equipoRamdon} equiposPerdedores={equiposPerdedores} modalSortearEquipos={modalSortearEquipos} setAgregar={setAgregar}/>
  </div>
  )
}
