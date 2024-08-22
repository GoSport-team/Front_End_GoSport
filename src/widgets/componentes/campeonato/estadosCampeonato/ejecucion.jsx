import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
export const Ejecucion = ({tasks}) => {
    const[ejecucion, setEjecucion]= useState()
    const[fase, setFase]= useState()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get('http://localhost:3001/fase/fase',{
              headers: {
                id: tasks._id
              },
            });
            setFase(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
    useEffect(()=>{
      if(tasks.estadoCampeonato==='Ejecucion'){
          setEjecucion(true)
        }
       },[tasks])

       const handleClick=async()=>{
          localStorage.setItem('ID', tasks._id);
          localStorage.setItem('IdFase', fase[0]._id)
          localStorage.setItem('estadoFase',fase[0].estado)
       }
      
       
  return (
    <>
{ejecucion &&(
    <div>
       <button onClick={()=>handleClick()}
        class="w-44 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <Link  to="/campe/cronograma">Agregar Resultados</Link>
        </button>
    </div>
)}
    </>
  )
}
