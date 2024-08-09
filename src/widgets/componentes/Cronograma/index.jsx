'use client'


import React, { useEffect, useState } from 'react'
import { MostrarJugadores } from './mostrarJugadores';
import { VersusPage } from '../Resultados/verResultados';
import 'tailwindcss/tailwind.css';
import axios from "axios";
import { BotonAgregar } from './botonAgregar';
import 'react-toastify/dist/ReactToastify.css';     
export default function CronogramaDesing({  patchFechaHora, guardarEdicion, datosVss}) {

const idVs = datosVss._id

const [equipo1, setEquipo1]= useState([])
const [equipo2, setEquipo2]= useState([])
const[modalVer, setModalVer]=useState(false)
const[botonVer, setBotonVer]=useState(false)
useEffect(()=>{
  setEquipo1(datosVss.equipo1.informacion.team1.Equipo)
  setEquipo2(datosVss.equipo2.informacion.team2.Equipo)
},[])
  useEffect(() => {
    const fetchFechaHora = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vs/${idVs}`);
        const { fecha, hora } = response.data;
        setFecha(fecha || '');
        setHora(hora || '');
      } catch (error) {
        console.error("Error al obtener fecha y hora:", error);
      }
    };

    fetchFechaHora();
  }, [idVs]);

  const handleConfirmarCmabios = () => {
    guardarEdicion(true, idVs);
    patchFechaHora({ fecha, hora })
  }
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleFecha = (e) => {
    setFecha(e.target.value)
  }
  const handleHora = (e) => {
    setHora(e.target.value)
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    
  };
  const openModalVer = () => {
    setModalVer(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [showPlayers, setShowPlayers] = useState(false);
  const [showPlayersTable2, setShowPlayersTable2] = useState(false);

  const togglePlayerRows = () => {
    setShowPlayers(!showPlayers);
  };

  const togglePlayerRowsTable2 = () => {
    setShowPlayersTable2(!showPlayersTable2);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
<div className=' relative w-full sm:w-[50vw] md:w-[40vw] lg:w-[35vw] h-auto md:h-72 mt-8 flex flex-col rounded-md border-2 border-gray-300 shadow-lg'>
  <div className='flex flex-col md:flex-row justify-between flex-1 p-6'>
    <div className='w-full md:w-1/2 flex flex-col justify-between'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center'>
          <img className='w-1/4 md:w-2/4 object-contain h-16 md:h-24 rounded-3xl' src={equipo1.imgLogo} />
          <div className='ml-4 flex justify-center items-center'>
            <h4 className='text-lg md:text-xl font-semibold text-gray-700'>{equipo1.nombreEquipo}</h4>
          </div>
        </div>
        <div className='flex items-center'>
          <img className='w-1/4 md:w-2/4 object-contain h-16 md:h-24 rounded-3xl' src={equipo2.imgLogo} />
          <div className='ml-4 flex justify-center items-center'>
            <h4 className='text-lg md:text-xl font-semibold text-gray-700'>{equipo2.nombreEquipo}</h4>
          </div>
        </div>
      </div>
    </div>

    <div className='w-full md:w-1/2 flex flex-col justify-between mt-6 md:mt-0'>
      <div>
        <h3 className='text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6'>Detalles</h3>
        <div className='flex flex-col gap-y-4 md:gap-y-6'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-x-4 md:gap-x-10'>
            <label className='text-md md:text-lg font-medium text-gray-600'>Hora</label>
            <input 
              type="time" 
              value={hora} 
              onChange={handleHora} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 md:mt-0 w-full md:w-auto' 
            />
          </div>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-x-4 md:gap-x-10'>
            <label className='text-md md:text-lg font-medium text-gray-600'>Fecha</label>
            <input 
              type="date" 
              value={fecha} 
              onChange={handleFecha} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 md:mt-0 w-full md:w-auto' 
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-6'>
        <BotonAgregar openModal={openModal} agregar= {false}/>
        {botonVer&&(
        <button 
        onClick={openModalVer}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
         Ver Resultados
        </button>
        )}
        <button
          onClick={handleConfirmarCmabios} 
          className=" items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Editar Horario
        </button>
      </div>
    </div>
  </div>

<VersusPage
modalVer={modalVer}
 setBotonVer={setBotonVer}
 setModalVer={setModalVer}
 idVs={idVs}
/>
</div>

<MostrarJugadores 
  datosVss={datosVss} 
  modalIsOpen={modalIsOpen}
  setModalIsOpen={setModalIsOpen}  
  closeModal={closeModal} 
  showPlayers={showPlayers} 
  equipo1={equipo1} 
  equipo2={equipo2} 
  togglePlayerRows={togglePlayerRows} 
  showPlayersTable2={showPlayersTable2} 
  togglePlayerRowsTable2={togglePlayerRowsTable2} 
  setBotonVer={setBotonVer}
/>

</>
  )
}


