import React from 'react'
import { Typography } from '@material-tailwind/react';

export const CardEquipo = ({equipo,eliminarEquipo }) => {
  return (
    <article className="relative w-full pt-4 pr-4 pl-4 rounded-xl flex flex-col bg-white border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl">
    <div className="flex justify-center mb-4">
      <img src={equipo.imgLogo} alt="" className="w-36" />
    </div>
    
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full">
        <Typography className="text-lg w-1/2 text-right pr-4">Nombre Equipo:</Typography>
        <Typography className="text-xl font-medium text-black w-1/2 break-words">{equipo.nombreEquipo }</Typography>
      </div>
      
      {/* Fila Nombre Capitán */}
      <div className="flex">
        <Typography className="text-lg  w-1/2 text-right pr-4">Nombre Capitán:</Typography>
        <Typography className="text-xl font-medium text-black w-1/2 break-words">{equipo.nombreCapitan}</Typography>
      </div>
      
      {/* Fila Contacto Uno */}
      <div className="flex">
        <Typography className="text-lg  w-1/2 text-right pr-4">Contacto Uno:</Typography>
        <Typography className="text-xl font-medium text-black w-1/2 break-words">{equipo.contactoUno }</Typography>
      </div>

      {/* Fila Contacto Dos */}
      <div className="flex">
        <Typography className="text-lg  w-1/2 text-right pr-4">Contacto Dos:</Typography>
        <Typography className="text-xl font-medium text-black w-1/2 break-words">{equipo.contactoDos}</Typography>
      </div>
    </div>
    
    <div className="flex justify-end mt-6 ">
      <img onClick={()=>eliminarEquipo(equipo._id)} src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727129677/v8somqq37uuq9cb2ju5c.png" className="w-10 cursor-pointer" />
    </div>
  </article>
  )
}
