import EquiposVer from '@/widgets/componentes/ParticantesResultados/equipos'
import { Spinner } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EquiposCampeonatos = () => {
  const { id } = useParams()
  const URL_API = import.meta.env.VITE_API_URL
  const [equipos, setEquipos] = useState()
  useEffect(() => {
    const obtenerEquipos = async () => {
      const response = await axios.get(`${URL_API}/equipoInscripto/`, {
        headers: {
          id: id
        }
      })
      setEquipos(response.data)
    }
    obtenerEquipos()
  }, [])
  return (
    <div className=' flex justify-center items-center'>
      {equipos ?
      
        <EquiposVer equipo={equipos} />
        :
        <Spinner />
      }
    </div>
  )
}
