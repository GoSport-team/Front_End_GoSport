import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const MirarResultados = ({idVs ,isOpen, onClose }) => {

    const [equipos, setEquipos]=useState()
    useEffect(()=>{
        const resultadosVS = async()=>{
            try {
                const response = await axios.get(`http://localhost:3001/resultadosInterCentros/${idVs}`);
                setEquipos(response.data);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        resultadosVS()
    },[idVs])
  return (
    <>
    {equipos && isOpen &&(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
      <button
        onClick={()=>onClose()}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">Información de Equipos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <img
              src={equipos.equipo1.equipo1.imgLogo}
              alt={`${equipos.equipo1.equipo1.nombreEquipo} Logo`}
              className="w-8 h-8 mr-2"
              />
            {equipos.equipo1.equipo1.nombreEquipo}
          </h3>
          <p className="text-gray-600">
            Capitán: <span className="font-medium">{equipos.equipo1.equipo1.nombreCapitan}</span>
          </p>
          <p className="text-gray-600">
            Contactos: <span className="font-medium">{equipos.equipo1.equipo1.contactoUno}, {equipos.equipo1.equipo1.contactoDos}</span>
          </p>
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-lg font-semibold mb-2">Estadísticas:</h4>
            <p className="text-gray-700">
              Goles: <span className="font-bold">{equipos.equipo1.golesE1.reduce((total, gol) => total + parseInt(gol.goles), 0)}</span>
            </p>
            <p className="text-gray-700">
              Tarjetas Amarillas: <span className="font-bold">{equipos.equipo1.amarillasE1.reduce((total, amarilla) => total + parseInt(amarilla.amarillas), 0)}</span>
            </p>
            <p className="text-gray-700">
              Tarjetas Rojas: <span className="font-bold">{equipos.equipo1.rojasE1.length}</span>
            </p>
            <p className="text-gray-700">
              Puntos: <span className="font-bold">{equipos.equipo1.puntos}</span>
            </p>
          </div>
        </div>

        {/* Equipo 2 */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <img
              src={equipos.equipo2.equipo2.imgLogo}
              alt={`${equipos.equipo2.equipo2.nombreEquipo} Logo`}
              className="w-8 h-8 mr-2"
              />
            {equipos.equipo2.equipo2.nombreEquipo}
          </h3>
          <p className="text-gray-600">
            Capitán: <span className="font-medium">{equipos.equipo2.equipo2.nombreCapitan}</span>
          </p>
          <p className="text-gray-600">
            Contactos: <span className="font-medium">{equipos.equipo2.equipo2.contactoUno}, {equipos.equipo2.equipo2.contactoDos}</span>
          </p>
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-lg font-semibold mb-2">Estadísticas:</h4>
            <p className="text-gray-700">
              Goles: <span className="font-bold">{equipos.equipo2.golesE2.reduce((total, gol) => total + parseInt(gol.goles), 0)}</span>
            </p>
            <p className="text-gray-700">
              Tarjetas Amarillas: <span className="font-bold">{equipos.equipo2.amarillasE2.reduce((total, amarilla) => total + parseInt(amarilla.amarillas), 0)}</span>
            </p>
            <p className="text-gray-700">
              Tarjetas Rojas: <span className="font-bold">{equipos.equipo2.rojasE2.reduce((total, rojas) => total + parseInt(rojas.rojas), 0)}</span>
            </p>
            <p className="text-gray-700">
              Puntos: <span className="font-bold">{equipos.equipo2.puntos}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )}
              </>
  )
}
