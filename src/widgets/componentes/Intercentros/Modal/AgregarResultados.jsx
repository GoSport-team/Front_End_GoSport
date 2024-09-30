import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AgregarResultado } from '../../../../utils/Intercentros/AgregarResultado'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const URL_API = import.meta.env.VITE_API_URL

export const AgregarResultados = ({ modal, idVs ,idCampeonato, closeModal, equipos}) => {
    const [vs, setVs] = useState()
    const [goles, setGoles] = useState([])
    const [amarillas, setAmarillas] = useState([])
    const [rojas, setRojas] = useState([])
    const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState(new Set());
    useEffect(() => {
        const obtenerVs = async () => {
            if(idVs){
                const response = await axios.get(`${URL_API}/vsInter/${idVs}`)
                setVs(response.data)
            }
        }
        obtenerVs()

    }, [idVs])
    const agregarGoles = (jugador, goles, equipo) => {
        setGoles(prev => {
            const updatedGoles = prev.map(item => 
                item.jugador === jugador ? { ...item, goles: goles } : item
            );
           
            if (!updatedGoles.some(item => item.jugador === jugador)) {
                updatedGoles.push({ jugador, goles, equipo});
            }
            return updatedGoles.filter(item => item.goles && item.goles > 0);
        });
    };
    
    const agregarAmarillas = (jugador, amarillas, equipo) => {
        setAmarillas(prev => {
            const updatedAmarillas = prev.map(item => 
                item.jugador === jugador ? { ...item, amarillas: amarillas } : item
            );
           
            if (!updatedAmarillas.some(item => item.jugador === jugador)) {
                updatedAmarillas.push({ jugador, amarillas, equipo });
            }
            return updatedAmarillas.filter(item => item.amarillas && item.amarillas > 0);
        });
    };
    const agregarRojas = (jugador, rojas, equipo) => {
        setRojas(prev => {
            const updatedRojas = prev.map(item => 
                item.jugador === jugador ? { ...item, rojas: rojas } : item
            );
           
            if (!updatedRojas.some(item => item.jugador === jugador)) {
                updatedRojas.push({ jugador, rojas, equipo });
            }
            return updatedRojas.filter(item => item.rojas && item.rojas > 0);
        });
    };
    

    const addResultados = async ()=>{
     AgregarResultado(vs.equipo1, vs.equipo2,goles, amarillas,rojas, idVs, idCampeonato, equipos)

     setTimeout(() => {
         closeModal()
         setGoles([])
         setAmarillas([])
         setRojas([])
     }, 800);
    }

    const enviarIdJugadorDestacado = async (jugadorId) => {
        try {
            const response = await axios.post(`${URL_API}/jugadorDestacado`, {
                jugadorDestacado: [jugadorId] 
            });
            toast.success("Jugador destacado enviado correctamente");
        } catch (error) {
            toast.warning("Error al procesar el jugador destacado");
            toast.info("O ya está seleccionado como destacado.");
        }
    };

    const manejarSeleccionJugador = async (jugador) => {
        const updatedSeleccionados = new Set(jugadoresSeleccionados);

        if (updatedSeleccionados.has(jugador._id)) {
            updatedSeleccionados.delete(jugador._id);
        } else {
            updatedSeleccionados.add(jugador._id);
            enviarIdJugadorDestacado(jugador._id); 
        }

        setJugadoresSeleccionados(updatedSeleccionados);
    };


    return (
        <>
        
            {modal && (


        <div class="bg-black/60 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 ">
    <div className='w-4/6 p-2 rounded-lg bg-white'>
            <div class="flex bg-white gap-10 items-center justify-center  p-4 md:p-5 border-b rounded-t ">
                {vs && (
                    <>
                        <div className='w-1/2 flex flex-col gap-3 justify-center items-center'>
                        
                            <div className='w-28'>
                            <img src={vs.equipo1.imgLogo} alt="" className='w-full m-3' />
                            </div>

                            <div className="w-full">
                                <div className="bg-[#12aed1cd] font-bold text-white text-center py-2 text-xl">{vs.equipo1.nombreEquipo}</div>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-200 ">
                                            <th className="border px-2 py-1">Equipo</th>
                                            <th className="border px-2 py-1">Goles</th>
                                            <th className="border px-2 py-1">Amarillas</th>
                                            <th className="border px-2 py-1">Rojas</th>
                                            <th className="border px-2 py-1">Destacado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vs.equipo1.participantes.map((integrantes) => (

                                            <>
                                                <tr className=" text-center">
                                                    <td className="border px-2 py-1">{integrantes.nombres}</td>
                                                    <td className="border px-2 py-1"><input type="text" className='w-16 ' onChange={(e)=>agregarGoles(integrantes, e.target.value, 'equipo1')} /></td>
                                                    <td className="border px-2 py-1"><input type="text" className='w-16 ' onChange={(e)=>agregarAmarillas(integrantes, e.target.value, 'equipo1')} /></td>
                                                    <td className="border px-2 py-1"><input type="text" className='w-16 ' onChange={(e)=>agregarRojas(integrantes, e.target.value, 'equipo1')}/></td>
                                                    <td className="border px-2 py-1 flex justify-center">
                                                        <div 
                                                            onClick={() => manejarSeleccionJugador(integrantes)}
                                                            className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer m-2 transition duration-300 
                                                            ${jugadoresSeleccionados.has(integrantes._id) ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            {jugadoresSeleccionados.has(integrantes._id) && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>

                                            </>
                                        ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        
                        <div className='w-1/2 gap-3 flex flex-col justify-center items-center'>
                            <div className='w-28'>
                            <img src={vs.equipo2.imgLogo} alt="" className='w-full m-3' />
                            </div>

                            <div className="w-full">
                                <div className="bg-[#12aed1cd]  text-white text-center text-xl font-bold py-2">{vs.equipo2.nombreEquipo}</div>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-200 ">
                                            <th className="border px-2 py-1">Equipo</th>
                                            <th className="border px-2 py-1">Goles</th>
                                            <th className="border px-2 py-1">Amarillas</th>
                                            <th className="border px-2 py-1">Rojas</th>
                                            <th className="border px-2 py-1">Destacado</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vs.equipo2.participantes.map((integrantes) => (

                                            <>
                                                <tr className=" text-center">
                                                    <td className="border px-2 py-1">{integrantes.nombres}</td>
                                                    <td className="border px-2 py-1"><input type="text" className='w-16 '  onChange={(e)=>agregarGoles(integrantes, e.target.value, 'equipo2')} /></td>
                                                    <td className="border px-2 py-1"><input type="text" className='w-16 '  onChange={(e)=>agregarAmarillas(integrantes, e.target.value, 'equipo2')}/></td>
                                                    <td className="border px-2 py-1"><input type="text" className='w-16 '  onChange={(e)=>agregarRojas(integrantes, e.target.value, 'equipo2')}/></td>
                                                    <td className="border px-2 py-1 flex justify-center">
                                                        <div 
                                                            onClick={() => manejarSeleccionJugador(integrantes)}
                                                            className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer m-2 transition duration-300 
                                                            ${jugadoresSeleccionados.has(integrantes._id) ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            {jugadoresSeleccionados.has(integrantes._id) && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>

                                            </>
                                        ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='flex flex-row justify-end gap-6 mr-4 items-center'>
            <button onClick={()=>addResultados()} className='bg-[#12aed1cd] hover:bg-blue-800  text-white p-3 text-lg font-semibold drop-shadow-md shadow-md mt-5 rounded-lg shadow-white'>Guardar</button>
            <button onClick={()=>closeModal()} className='bg-red-500 text-white p-3 text-lg font-semibold drop-shadow-md shadow-md mt-5 rounded-lg shadow-white'>cancelar</button>
            </div>
            </div>
            </div>
            )}
            <ToastContainer/>
            
                   </>
    )
}
