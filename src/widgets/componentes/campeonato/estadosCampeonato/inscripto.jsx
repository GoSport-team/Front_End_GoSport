import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
export const Inscripto = ({tasks,setControlador}) => {
    const[inscripto, setInscripto]= useState()
    useEffect(()=>{
      if(tasks.estadoCampeonato==='Inscripcion'){
          setInscripto(true)
        }
       })

       const handleClick=()=>{
        localStorage.setItem('ID', tasks._id);
        setControlador(true)
       }
       const determineLink = () => {
        if (tasks.tipoCampeonato === 'Intercentros') {
          return `/campe/participanteIntercentros/${tasks._id}`;
        } else {
          return "/campe/participante";
        }
      };
  return (
    <>
{inscripto &&(
    <div>
        <button onClick={handleClick}
        class="w-44 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <Link to={determineLink()}> Ver Participantes</Link>
        </button>
    </div>
)}
    </>
  )
}
