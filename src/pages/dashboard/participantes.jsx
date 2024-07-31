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
  const IdCampeonato = localStorage.getItem('ID');
  const [equipoInscripto, setEquipoInscripto] = useState([]);
  const [estadoBoton, setEstadoBoton]=useState(true)
  const [estadoFase, setEStadoFase]= useState(true)
  const [nombreFase, setNombreFase]= useState("Fase 1")
  const [idFases, setIdFase]= useState()
  const [error, setError] = useState("");
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
        if(data.length>=3){
          setEstadoBoton(true)
        }else{
          setEstadoBoton(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);



  const sortearEquipos = async()=>{
    try{
      localStorage.setItem('estadoFase', estadoFase)
      const fase = await axios.post('http://localhost:3001/fase', { estado:estadoFase,nombre: nombreFase, idCampeonato:IdCampeonato });
      const idFase = fase.data._id;
      setIdFase(idFase) 
      const dataVs = {
        equipos: equipoInscripto,
        IdFase: idFase
      };
      localStorage.setItem('IdFase', idFase)
      const equiposSorteados=  await axios.post('http://localhost:3001/vs',{dataVs:dataVs})
      console.log(equiposSorteados)
      if(equiposSorteados.data){
        setEstadoBoton(false)
      }
     
    }catch(error){
      console.log(error)
      setError("Error al sortear. Intente nuevamente.");
    }
  }
 


  return (
    <>
      <div className="p-4 ">
        {equipoInscripto && equipoInscripto.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 ">
            {equipoInscripto.map((equipo) => (
              <div key={equipo._id} className="flex justify-center items-center z-0 ">
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
        { estadoBoton &&(
        <button
        onClick={sortearEquipos}
          className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
        >
          Sortear
        </button>
        )}
       
      </div>
      {error&& (
                <div className="text-red-600 text-center font-bold">
                    {error}
                </div>
            )}
    </>
  );
};
