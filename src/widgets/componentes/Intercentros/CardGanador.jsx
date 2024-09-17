import React from 'react'

export const CardGanador = ({equipo}) => {
  return (
    <article className="relative w-full sm:w-[48%] lg:w-[45%] xl:w-[30%] p-6 rounded-xl bg-white border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl">
    <div className="flex flex-col items-center gap-4">
    <p className="text-lg flex justify-center text-gray-700">
       <img src={equipo.imgLogo} alt="" className='w-36 ' />
      </p>
      <h1 className="text-2xl font-semibold text-gray-800">
        <span className="font-bold text-xl">Nombre Equipo:</span> {equipo.nombreEquipo}
      </h1>
      <p className="text-lg text-gray-700">
        <span className="font-bold text-xl">Nombre Campitan:</span> {equipo.nombreCapitan}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-bold text-xl">Contacto Uno:</span> {equipo.contactoUno}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-bold text-xl">Contacto Dos:</span> {equipo.contactoDos}
      </p>
    

    </div>
  </article>
  )
}
