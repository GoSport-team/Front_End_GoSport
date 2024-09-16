import React,{useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CardEquipo  } from "../../widgets/componentes/Intercentros/CardEquipo";
import { SorteoEquiposInter } from "../../utils/Intercentros/SorteoEquiposInter";
import { Typography, Spinner } from '@material-tailwind/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';     
export const ParticipantesIntercentros=()=> {
  const notify = (message)=> toast(message);
  const { id } = useParams()
  const [cedulaEquipo, setCedulaEquipo] = useState()
  const [equipos, setEquipos] = useState([])
  const [equiposInscritos, setEquiposInscritos] = useState([])
  const [sorteo, setSorteo] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const equiposInscritos = async () => {
      try{
        const response = await axios.get('http://localhost:3001/equipoInscripto', {
          headers: {
            id: id
          }
        })
        console.log(response.data)
        setEquiposInscritos(response.data)
      }catch(e){
        console.log(e)
      }
      finally{
        setLoading(false)
      }
      }
      
    equiposInscritos()
  }, [])

  const searchEquipo = async (idEquipo) => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${idEquipo}`)
      if (response.data == "EQUIPO NO ENCONTRADO") {
        notify("Equipo no encontrado")
      } else {
        notify("Equipo encontrado correctaente")
        const responseInscripcion = await axios.post(`http://localhost:3001/equipoInscripto`, {
          Equipo: response.data.equipo,
          idCampeonato: id
        })

        notify(responseInscripcion.data.msg)
        console.log(response.data)
        setEquipos(prev => [...prev, response.data.equipo])
      }
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false);  
    }
    
  }
   
  useEffect(() => {
    setLoading(true);
    try {
      if ( equiposInscritos.length === 3) {
         setSorteo(true);
      }else{
        setSorteo(false)
      }
      console.log(equiposInscritos);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [equiposInscritos]);

  const sorteoIntercentros = async () => {
    // if(equipos.length === 3){
    //   const data= {
    //     equipos: equipos,
    //     idCampeonato: id
    //   }

    //  SorteoEquiposInter(data)
    // }

    if(equiposInscritos.length === 3){
      const data= {
        equipos: equiposInscritos,
        idCampeonato: id
      }
      
      SorteoEquiposInter(data)
    }
     navigate(`/campe/cronogramaIntercentros/${id}`)
  }
  return (
    <div className='bg-white rounded-xl w-full h-screen m-3 flex flex-col justify-center items-center'>
      <ToastContainer/>
        <Typography className='m-4 text-center font-bold text-2xl'>Buscar equipo</Typography>
      <article className='w-full flex flex-col justify-center items-center'>
        {
          loading ? (
            <div className="flex justify-center items-center h-72">
            <Spinner className='h-12 w-12 text-blue-500' />
            </div>
          ):(
            <div className='w-full'>
        {sorteo && equiposInscritos.length >0 ? '' :
      equipos.length < 3 && equiposInscritos.length < 3 ?
        <form className="w-full mt-5">
          {loading ? (
    <div className="flex justify-center items-center h-72">
            <Spinner className="h-12 w-12 text-blue-500" />
            </div>
    ) : (
    <>
    <div className='w-full flex justify-center items-center'> 
    <label for="buscar_equipo" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative w-2/4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-800 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          id="buscar_equipo"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Busca el equipo por numero de cedula"
          required
          onChange={(e) => setCedulaEquipo(e.target.value)}
        />
        <button type="button"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={() => searchEquipo(cedulaEquipo)}
        >
          Buscar
        </button>
      </div>
    </div>
      
    </>
  )}
        </form>
        :(
          <Typography className='text-center text-lg' >Total de equipos completado !!</Typography>
        )
      }
      <div className='w-full grid grid-cols-3 gap-4 p-6'>
        {equipos.length > 0 ? equipos.map((equipo, index) => (
          <CardEquipo key={index} equipo={equipo}/>
        )):
         equiposInscritos.map((equipo, index)=>(
          <CardEquipo key={index} equipo={equipo.Equipo} />
        ))
        }
      </div>
      
      {sorteo ?
        <div className='flex justify-center'>
          <button
            onClick={() => sorteoIntercentros()}
            className='mt-5 bg-black font-medium  bg-[#12aed1cd] hover:bg-blue-800 text-white py-5 px-2 rounded-md'>Sortear Equipos</button>

        </div>
        : ''}
        </div>
     
          )
        }
        
    </article>

    </div>
  )
}
