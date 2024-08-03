'use client'


import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';     
export default function CronogramaDesing({  patchFechaHora, guardarEdicion, datosVss}) {
const idVs = datosVss._id
const [equipo1, setEquipo1]= useState([])
const [equipo2, setEquipo2]= useState([])
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
        console.log(response.data);

      } catch (error) {
        console.error("Error al obtener fecha y hora:", error);
      }
    };

    fetchFechaHora();
  }, [idVs]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vs/${idVs}`);
        setDatos(response.datos)
        console.log("Resultados", response.data);

      } catch (error) {
        console.error("Error al obtener Datos", error);
      }
    };

    fetchData();
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
  <div className='w-[35vw] h-72 mt-8 flex flex-col rounded-md border-2 border-gray-300 shadow-lg'>
    <div className='flex flex-row justify-between flex-1 p-6'>
        <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center'>
                    <img className='w-2/4 object-contain h-24 rounded-3xl' src={equipo1.imgLogo} />
                    <div className='ml-4 flex justify-center items-center'>
                        <h4 className='text-xl font-semibold text-gray-700'>{equipo1.nombreEquipo}</h4>
                    </div>
                </div>
                <div className='flex items-center'>
                    <img className='w-2/4 object-contain h-24 rounded-3xl' src={equipo2.imgLogo} />
                    <div className='ml-4 flex justify-center items-center'>
                        <h4 className='text-xl font-semibold text-gray-700'>{equipo2.nombreEquipo}</h4>
                    </div>
                </div>
            </div>
        </div>
        
        <div className='w-1/2 flex flex-col justify-between'>
            <div>
                <h3 className='text-2xl font-bold text-gray-800 mb-6'>Detalles</h3>
                <div className='flex flex-col gap-y-6'>
                    <div className='flex items-center gap-x-10'>
                        <label className='text-lg font-medium text-gray-600'>Hora</label>
                        <input type="time" value={hora} onChange={handleHora} className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                    <div className='flex items-center gap-x-10'>
                        <label className='text-lg font-medium text-gray-600'>Fecha</label>
                        <input type="date" value={fecha} onChange={handleFecha} className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                </div>
            </div>
            <div className='flex justify-center space-x-4 mt-6'>
                <button 
                    onClick={openModal} 
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap w-auto h-auto"
                >
                    Agregar Resultados
                </button>
                <button 
                    onClick={openModal} 
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap w-auto h-auto"
                >
                    Editar Horario
                </button>
            </div>
        </div>
    </div>
</div>

      <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    className="flex justify-center items-center h-screen"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
    <div className="rounded-lg shadow-lg overflow-hidden flex flex-col w-[70vw] bg-white p-3 ml-[10vw]"> {/* Agregué la clase ml-[10vw] */}
        <div className='flex justify-end'>
            <button
                className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                onClick={closeModal}
            >
                &times;
            </button>
        </div>
{datosVss&&(
        <div  key={ datosVss._id} className="flex flex-row gap-x-4">
            <div className="flex flex-col w-1/2">
                <div className='flex content-center justify-center gap-x-5'>
                    <div className='grid place-content-center'>
                        <div>
                            <img className="object-contain w-32 drop-shadow-lg"
                                src={equipo1.imgLogo} alt="img" />
                        </div>
                        <div className='flex justify-center content-center'>
                            <h1 className="my-2">{equipo1.nombreEquipo}</h1>
                        </div>
                    </div>
                    <div className='grid place-content-center text-4xl p-4'>
                        0
                    </div>
                </div>

                <div className="relative overflow-x-auto mt-5">
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Jugador</th>
                                <th scope="col" className="px-6 py-3">Dolsal</th>
                                <th scope="col" className="px-6 py-3">Gol</th>
                                <th scope="col" className="px-6 py-3">Amarilla</th>
                                <th scope="col" className="px-6 py-3">Roja</th>
                            </tr>
                        </thead>
                        {showPlayers && (
                            <tbody>
                            {equipo1 && equipo1.participantes.map((jugador)=>(
                                <tr key={jugador._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {jugador.nombreJugador}
                                    </th>
                                    <td className="px-6 py-4">{jugador.dorsal}</td>
                                    <td className="px-6 py-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                             ))}
                            </tbody>
                        )}
                    </table>
                    <div className='grid place-content-center'>
                        <button
                            onClick={togglePlayerRows}
                            className="mt-5 px-4 py-2 bg-black text-white rounded flex items-center rounded-md opacity-80"
                        >
                            {showPlayers ? 'Ocultar Jugadores' : 'Mostrar Jugadores'}
                            <FontAwesomeIcon
                                icon={showPlayers ? faChevronUp : faChevronDown}
                                className="ml-2"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-1/2">
                <div className='flex content-center justify-center gap-x-5'>
                    <div className='grid place-content-center'>
                        <div>
                            <img className="object-contain w-32 drop-shadow-lg"
                               src={equipo2.imgLogo}  alt="img" />
                        </div>
                        <div className='flex justify-center content-center'>
                            <h1 className="my-2">{equipo2.nombreEquipo}</h1>
                        </div>
                    </div>
                    <div className='grid place-content-center text-4xl p-4'>
                        0
                    </div>
                </div>

                <div className="relative overflow-x-auto mt-5">
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Jugador</th>
                                <th scope="col" className="px-6 py-3">Dolsal</th>
                                <th scope="col" className="px-6 py-3">Gol</th>
                                <th scope="col" className="px-6 py-3">Amarilla</th>
                                <th scope="col" className="px-6 py-3">Roja</th>
                            </tr>
                        </thead>
                        {showPlayersTable2 && (
                            <tbody>
                              {equipo2.participantes ? equipo2.participantes.map((jugador)=>(
                                <tr key={jugador._id}className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {jugador.nombreJugador}
                                    </th>
                                    <td className="px-6 py-4">{jugador.dorsal}</td>
                                    <td className="px-6 py-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                                )):(
                                  <p className="text-red-500 font-bold text-center">No tiene equipo asignado</p>
                                )}
                            </tbody>
                        )}
                    </table>
                    <div className='grid place-content-center'>
                        <button
                            onClick={togglePlayerRowsTable2}
                            className="mt-5 px-4 py-2 bg-black text-white rounded flex items-center opacity-75"
                        >
                            {showPlayersTable2 ? 'Ocultar Jugadores' : 'Mostrar Jugadores'}
                            <FontAwesomeIcon
                                icon={showPlayersTable2 ? faChevronUp : faChevronDown}
                                className="ml-2"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}

        <div className="flex justify-end pr-3 pb-3 mt-2">
            <div className="flex justify-end">
                <button className="bg-black text-white py-2 px-4 rounded-lg">
                    Finalizar Partido
                </button>
            </div>
        </div>
    </div>
</Modal>
     
    </>
  )
}


