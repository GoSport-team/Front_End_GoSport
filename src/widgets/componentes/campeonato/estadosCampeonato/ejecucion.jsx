import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
export const Ejecucion = ({tasks}) => {
    const[ejecucion, setEjecucion]= useState()
    useEffect(()=>{
      if(tasks.estadoCampeonato==='Ejecucion'){
          setEjecucion(true)
        }
       })
       const handleClick=()=>{
        localStorage.setItem('ID', tasks._id);
       }
  return (
    <>
{ejecucion &&(
    <div>
        <button onClick={handleClick}
        className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3">
            <Link to="/campe/cronograma">Agregar Resultados</Link>
        </button>
    </div>
)}
    </>
  )
}
