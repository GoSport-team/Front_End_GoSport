import { Navbar } from '@/widgets/componentes/ParticantesResultados/NavBar'
import ModalRult from '@/widgets/componentes/ParticantesResultados/modal'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const VsCampeonatos = () => {
  const { id } = useParams()
  const URL_API = import.meta.env.VITE_API_URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reultadoVs, setreultadoVs] = useState()
  const [vs, setVs] = useState()
  const openModal = async(idVs) => {
    const response = await axios.get(`${URL_API}/resultados/${idVs}`)
    setreultadoVs(response.data)
    setIsModalOpen(true);
  };
  console.log(reultadoVs)
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const obtenerVSCampeonatos = async () => {
      const response = await axios.get(`${URL_API}/vs/vscampeonato`, {
        headers: {
          id: id
        }
      })
      setVs(response.data)
    }
    obtenerVSCampeonatos()
  }, [])
  return (
    <div className='flex justify-center items-center'>
      <div className='w-full lg:w-1/2 p-4 lg:p-10'>
        <Navbar id={id} />
        <div className="w-full p-4">
          {vs && vs.map((vs, index) => (
            <div key={index} className="w-full bg-white rounded-lg shadow-md mb-6">
              <div className="flex flex-col lg:flex-row justify-between items-center bg-blue-100 p-4 rounded-t-lg">
                <h2 className="text-center text-sm sm:text-lg font-bold">{vs.equipo1.informacion.team1.Equipo.nombreEquipo} vs {vs.equipo2.informacion.team2.Equipo.nombreEquipo}</h2>
              </div>
              <div className="p-4">
                <div className="text-xs sm:text-sm text-gray-500">{vs.fecha} {vs.hora}</div>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <img
                      src={vs.equipo1.informacion.team1.Equipo.imgLogo}
                      alt="Argentina"
                      className="w-6 h-4 sm:w-8 sm:h-6"
                    />
                    <span className="ml-2 text-sm sm:text-base font-bold text-gray-900">{vs.equipo1.informacion.team1.Equipo.nombreEquipo}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">VS</div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm sm:text-base font-bold text-gray-900">{vs.equipo2.informacion.team2.Equipo.nombreEquipo}</span>
                    <img
                      src={vs.equipo2.informacion.team2.Equipo.imgLogo}
                      alt="Colombia"
                      className="w-6 h-4 sm:w-8 sm:h-6"
                    />
                  </div>
                </div>
                <div className="mt-4 text-gray-500 text-xs sm:text-sm">
                  {vs.estado === false ?
                    <div className="mt-2 text-center text-red-500">Partido Jugado</div>
                    :
                    <div className="mt-2 text-center text-green-500">Partido Por Jugar</div>
                  }
                </div>
                <div className="grid place-content-center mt-4">
                  {vs.estado === false ?
                    <button
                      onClick={()=>openModal(vs._id)}
                      className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-600"
                    >
                      Ver resultados del partido
                    </button> :
                    <button
                      className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-600"
                    >
                      No hay resultados
                    </button>
                  }
                </div>
              </div>
            </div>
          ))}
          {isModalOpen && <ModalRult resultado={reultadoVs} closeModal={closeModal} />}
        </div>
      </div>
    </div>
  )
}
