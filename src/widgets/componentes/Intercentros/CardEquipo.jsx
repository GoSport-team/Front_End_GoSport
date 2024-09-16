import React from 'react'
import { Typography } from '@material-tailwind/react';

export const CardEquipo = ({equipo, }) => {
  return (
    <article className="relative w-full p-6 rounded-xl bg-white border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl">
    <div className="flex flex-col items-center gap-4">
    <p className="text-lg flex justify-center text-gray-700">
       <img src={equipo.imgLogo} alt="" className='w-36 ' />
      </p>
      <Typography className="flex gap-2 text-xl font-semibold text-black">
        <Typography className="text-lg">Nombre Equipo:</Typography> {equipo.nombreEquipo}
      </Typography>
      
      <Typography className="flex gap-2 text-xl font-semibold text-black">
        <Typography className="text-lg">Nombre capitan:</Typography> {equipo.nombreCapitan}
      </Typography>
      
      <Typography className="flex gap-2 text-xl font-semibold text-black">
        <Typography className="text-lg">Contacto</Typography> {equipo.contactoUno}
      </Typography>
     
      <Typography className="flex gap-2 text-xl font-semibold text-black">
        <Typography className="text-lg">Contacto dos:</Typography> {equipo.contactoDos}
      </Typography>
  
    </div>
  </article>
  )
}
