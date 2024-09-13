import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export const Ejecucion = ({ tasks, setControlador, controlador }) => {
  const [ejecucion, setEjecucion] = useState(false);
  const [fase, setFase] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setControlador(true); 
      try {
        const { data } = await axios.get('http://localhost:3001/fase/fase', {
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

    if (tasks && tasks._id) {
      fetchData();
    }
  }, [tasks, setControlador]);

  useEffect(() => {
    if (tasks && tasks.estadoCampeonato === 'Ejecucion') {
      setEjecucion(true);
    } else {
      setEjecucion(false);
    }
  }, [tasks, controlador]); 

  const handleClick = () => {
    if (tasks.tipoCampeonato === 'Intercentros') {
      localStorage.setItem('ID', tasks._id);
    } else {
      if (tasks && tasks._id) {
        localStorage.setItem('ID', tasks._id);
      }

      if (fase && fase._id) {
        localStorage.setItem('IdFase', fase._id);
        localStorage.setItem('estadoFase', fase.estado);
        localStorage.setItem('nombreFase', fase.nombre);
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
