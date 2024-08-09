import React, { useState } from 'react'
export const BotonAgregar = ({openModal, agregar}) => {
    const [botonAgregar ,setBotonAgregar]= useState(true);
    const modal=()=>{
openModal()
setBotonAgregar(agregar)
    }
  return (
   <>
   {botonAgregar&&(
        <button 
          onClick={()=>modal()} 
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Agregar Resultados
        </button>
        )}</>
  )
}
