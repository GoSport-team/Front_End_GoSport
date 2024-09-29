import { Button } from '@material-tailwind/react'
import React from 'react'
import { Navbar } from './NavBar'
import { useParams } from 'react-router-dom'

export default function EquiposVer({equipo}) {
    console.log(equipo)
    const { id } = useParams()
    return (
        <div className="w-full lg:w-[50vw] p-4">
           <Navbar id={id}/>
        {equipo && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipo.map((equipo, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center space-x-4">
                  <img
                    className="object-cover w-16 h-16 rounded-full"
                    src={equipo.Equipo.imgLogo}
                    alt={`${equipo.Equipo.nombreEquipo} logo`}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {equipo.Equipo.nombreEquipo}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Equipo inscrito para la competencia. Revisa más detalles de los participantes.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
    )
}
