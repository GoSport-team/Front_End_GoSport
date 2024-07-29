import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
export const Inscripto = ({tasks}) => {
    const[inscripto, setInscripto]= useState()
    useEffect(()=>{
        if(tasks.estadoCampeonato==='Inscripto'){
          setInscripto(true)
        }
       })
  return (
    <>
{inscripto &&(
    <div>
        <button className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3">
            <Link to="/dashboard/participantes"> Ver Participantes</Link>
        </button>
    </div>
)}
    </>
  )
}
