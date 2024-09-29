import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
const URL_API = import.meta.env.VITE_API_URL

export const Ejecucion = ({ tasks }) => {
  const [ejecucion, setEjecucion] = useState(false);
  const [fase, setFase] = useState([]);
const [controllerFase, setControllerFase]= useState()
const previousTaskId = useRef();
//console.log(tasks._id)
  useEffect(() => {
  
    const fetchData = async () => {
      try {
        setControllerFase(true)
        const { data } = await axios.get(`${URL_API}/fase/fase`, {
          headers: {
            id: tasks._id
          },
        });
       // console.log(data.faseActiva[0]._id)
        setFase(data.faseActiva[0]);
      } catch (error) {
        console.log(error);
      } finally{
        setControllerFase(false)
    }
    };
    fetchData();
  },[tasks, fase]);
//console.log(fase)
  useEffect(() => {
    if (tasks && tasks.estadoCampeonato === 'Ejecucion'  ) {
      setEjecucion(true);
    } else {
      setEjecucion(false);
    }
  }, [tasks]); 
  const handleClick = () => {
    if (tasks.tipoCampeonato === 'Intercentros') {
      localStorage.setItem('ID', tasks._id);
    }else {
        localStorage.setItem('ID', tasks._id);
        localStorage.setItem('IdFase', fase._id);
      }
    
  };

  return (
    <>
      {ejecucion && (
        <div>
            <Link to={tasks.tipoCampeonato === 'Intercentros' ? `/campe/cronogramaIntercentros/${tasks._id}` : `/campe/cronograma`}  
            onClick={handleClick}
            className="w-44 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"

            >
           
              Agregar Resultados
            </Link>
        
        </div>
      )}
    </>
  );
};
