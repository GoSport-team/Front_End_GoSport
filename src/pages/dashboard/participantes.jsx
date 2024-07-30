import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";
import Participantes from '@/widgets/componentes/Participantes/index'
export const Participante= () => {
  return (
   <>
<Participantes/>
<div className="flex justify-center space-x-4 mb-4">
    <button
      className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
    >
      Agregar Equipo
    </button>
    <button
      className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
    >
      Sortear
    </button>
  </div>
   </>
  )
}
