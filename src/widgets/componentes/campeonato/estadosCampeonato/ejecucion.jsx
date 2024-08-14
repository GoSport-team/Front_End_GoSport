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
        className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3">
            <Link  to="/campe/cronograma">Agregar Resultados</Link>
        </button>
    </div>
)}
    </>
  )
}
