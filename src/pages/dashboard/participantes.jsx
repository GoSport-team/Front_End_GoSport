import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Participantes from '@/widgets/componentes/Participantes/index';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from '@material-tailwind/react';

export const Participante = () => {
  const [equipoInscripto, setEquipoInscripto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idCampeonato = localStorage.getItem('ID');
        const { data } = await axios.get('http://localhost:3001/equipoInscripto', {
          headers: {
            id: idCampeonato,
          },
        });
        setEquipoInscripto(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="p-4 ">
        {equipoInscripto && equipoInscripto.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 ">
            {equipoInscripto.map((equipo) => (
              <div key={equipo.id} className="flex justify-center items-center z-0 ">
                <Participantes equipo={equipo} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 text-4xl font-bold text-center">
            No hay equipos inscritos
          </p>
        )}
      </div>
      <div className="flex justify-center space-x-4 mx-6 my-4">
        <button
          className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
        >
          Agregar Equipo
        </button>
        <button
          className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
        >
          Sortear
        </button>
      </div>
    </>
  );
};
