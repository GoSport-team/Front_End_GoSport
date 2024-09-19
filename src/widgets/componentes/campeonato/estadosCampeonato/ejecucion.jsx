import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
const URL_API = import.meta.env.VITE_API_URL

export const Ejecucion = ({ tasks, setControlador, controlador }) => {
  const [ejecucion, setEjecucion] = useState(false);
  const [fase, setFase] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setControlador(true); 
      try {
        const { data } = await axios.get(`${URL_API}/fase/fase`, {
          headers: {
            id: tasks._id
          },
        });
        setFase(data.faseActiva);
      } catch (error) {
        console.log(error);
      } finally {
        setControlador(false); 
       }
    };
console.log(fase)
    if (tasks && tasks._id) {
      fetchData();
    }
  }, [tasks, setControlador]);

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
    } else {
      if (tasks && tasks._id || fase && fase._id) {
        localStorage.setItem('ID', tasks._id);
        localStorage.setItem('IdFase', fase[0]._id);
        localStorage.setItem('estadoFase', fase[0].estado);
        localStorage.setItem('nombreFase', fase[0].nombre);
      } else {
        console.error('No se encontró la fase activa.');
      }
    }
  };

  return (
    <>
      {ejecucion && (
        <div>
          <button 
            onClick={handleClick}
            className="w-44 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <Link to={tasks.tipoCampeonato === 'Intercentros' ? `/campe/cronogramaIntercentros/${tasks._id}` : "/campe/cronograma"}>
              Agregar Resultados
            </Link>
          </button>
        </div>
      )}
    </>
  );
};
