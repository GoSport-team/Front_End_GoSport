import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CardVs } from '../../widgets/componentes/Intercentros/CardVs'
import { Typography, Spinner } from '@material-tailwind/react';
const URL_API = import.meta.env.VITE_API_URL
export const CronogramasIntercentros=()=> {
    const {id} = useParams()
    const [vsEquipos, setVsEquipos] = useState([])
    const [mostrarCambios, setMostrarCambios] = useState(false)
    const navigate = useNavigate();
    const [loading, setLoading]= useState(true)
    useEffect(()=>{
        setLoading(true)
        const obtenerVs = async ()=>{
            try {
                const response = await axios.get(`${URL_API}/vsInter`, {
                  headers: {
                    idCampeonato: id,
                  },
                });
                setVsEquipos(response.data);
                setLoading(false);
                console.log(vsEquipos)
              
                const vsLength = response.data.filter((item) => item.estado === true);
                if (vsLength.length === 3) {
                  setTimeout(() => {
                    sessionStorage.setItem('sorteoRealizado', 'true');
                    navigate(`/campe/resultadosIntercentros/${id}`);
                  }, 700);
                }
              } catch (error) {
                console.error('Error al obtener los datos', error);
                setLoading(false); 
              }
              finally{
                setLoading(false)
              }
        }
        obtenerVs()
       },[mostrarCambios])
       
    const infoActualizada =(cambios)=>{
     setMostrarCambios(!mostrarCambios)
    }
 
  return (
   
    <>
     {
        loading ? (
            <div className="flex justify-center items-center h-72">
            <Spinner className="h-12 w-12 text-blue-500" />
            </div>
        ):(
            <>
            <div className='bg-white rounded-xl m-2 w-full h-screen flex justify-center items-center flex-col p-2'>
             <p className='text-center font-bold text-xl m-4' >CRONOGRAMAS INTERCENTROS</p>
             <div className=' grid grid-cols-3 gap-4'>
            {vsEquipos && vsEquipos.map((vs, index)=>(
            <CardVs  key={index} vs={vs} cambiosRealizados={infoActualizada}   />
             ))}

         </div>

        </div>
            </>
        )
    }
    
    </>
  )
}
