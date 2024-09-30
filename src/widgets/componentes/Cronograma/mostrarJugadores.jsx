import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { TerminarPartidoModal } from './modalTerminarPartido'
import Modal from 'react-modal';
import axios from 'axios';
import Penales from './penales';
import { useAccordion } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('#root');
const URL_API = import.meta.env.VITE_API_URL
export const MostrarJugadores = ({ datosVss, setModalIsOpen, modalIsOpen, closeModal, equipo1, equipo2, showPlayersTable2, showPlayers, togglePlayerRows, togglePlayerRowsTable2, setBotonVer ,setBotonAgregar}) => {
    const idCampeonato= localStorage.getItem('ID')
    const [countGol1, setCountGol1] = useState(0)
    const [countGol2, setCountGol2] = useState(0)
    const [amarilla1, setAmarilla1] = useState(0)
    const [amarilla2, setAmarilla2] = useState(0)
    const [roja1, setRoja1] = useState(0)
    const [roja2, setRoja2] = useState(0)
    const [jugadorGol1, setJugadorGol1] = useState([])
    const [jugadorGol2, setJugadorGol2] = useState([])
    const [jugadorAmarilla1, setJugadorAmarilla1] = useState([])
    const [jugadorAmarilla2, setJugadorAmarilla2] = useState([])
    const [jugadorRoja1, setJugadorRoja1] = useState([])
    const [jugadorRoja2, setJugadorRoja2] = useState([])
    const [jugadorDestacado, setJugadorDestacado] = useState([]);
    const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState(new Set());
    const [ganador, setGanador] = useState([])
    const [perdedor, setPerdedor] = useState([])
    const [isModalOpenOk, setModalOpenOk] = useState(false);
    const [isMyModalOpen, setMyModalIsOpen] = useState(false);
    const [penal, setPenal]=useState(false)
    const[numeroTiros, setNumeroTiros]= useState()
    const [marcadorPenal1, setMarcadorPena1]=useState()
    const [marcadorPenal2, setMarcadorPena2]=useState()
    const[resultPenalesEquipo1, setResultPenalesEquipo1]= useState([])
    const [resultPenalesEquipo2, setResultPenalesEquipo2]=useState([])
 const [isModalOpen, setIsModalOpen]=useState()
const[boton, setBoton]=useState()

    useEffect(() => {
        if (countGol1 < countGol2 || marcadorPenal1< marcadorPenal2) {
            setGanador(equipo2)
            setPerdedor(equipo1)
        } else if (countGol2 < countGol1 || marcadorPenal2 < marcadorPenal1) {
            setGanador(equipo1)
            setPerdedor(equipo2)
        }
    }, [countGol1, countGol2, marcadorPenal1, marcadorPenal2])
    const actualizarFase = async () => {
        if (ganador && perdedor) {
            const ganadores = {
                Equipo: ganador
            }
            const perdedores = {
                Equipo: perdedor
            }
            try {
                const patchFase = await axios.patch(`${URL_API}/fase/${datosVss.IdFase}`, {
                    equiposGanadores: ganadores,
                    equiposPerdedores: perdedores
                })
                console.log("actualizacion correcta")

            } catch (error) {
                console.log(error)
            }
        }

    }
    const actuEstado= async()=>{
        try{
          const response = await axios.patch(`${URL_API}/inscripcionEquipos/estado/${perdedor._id}`,{
            estado:false
          })
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }

    const guardarResultado = async () => {
      
        const response = await axios.post(`${URL_API}/resultados`, {
            equipo1: {
                Equipo1: equipo1,
                tarjetasAmarillas: jugadorAmarilla1,
                tarjetasRojas: jugadorRoja1,
                goles: {
                    marcador: countGol1,
                    jugadorGoleador: jugadorGol1
                },
                penales:resultPenalesEquipo1
            },
            equipo2: {
                Equipo2: equipo2,
                tarjetasAmarillas: jugadorAmarilla2,
                tarjetasRojas: jugadorRoja2,
                goles: {
                    marcador: countGol2,
                    jugadorGoleador: jugadorGol2
                },
                penales:resultPenalesEquipo2
            },
            IdVs: datosVss._id,
            IdFase: datosVss.IdFase,
            estadoPartido: false,
            idCampeonato:idCampeonato,
            penales: penal,
            numeroTiros:numeroTiros,
        })
        setBotonAgregar(false)
    
    }
    const botonPublicar = () => {
        guardarResultado()
        actualizarFase()
        actuEstado()
        // //enviarIdsJugadoresDestacados();
        // if (jugadorDestacado.length > 0) {
        //     enviarIdsJugadoresDestacados();
        // }
        setBotonVer(true)
        setModalIsOpen(false)
    }

    //Nuevas funciones 
    const gol1 = (jugador) => {
        
        setJugadorGol1((prevJugador) => {
          
            const jugadorExistente = prevJugador.find(j => j._id === jugador._id);
            if (jugadorExistente) {
                return prevJugador.map(j => 
                    j._id === jugador._id ? { ...j, totalGoles: j.totalGoles + 1 } : j
                );
            } else {
                return [...prevJugador, { ...jugador, totalGoles: 1 }];
            }
        });
        setCountGol1(countGol1 + 1);
    };

    const gol2 = (jugador) => {
        setJugadorGol2((prevJugador) => {
            const jugadorExistente = prevJugador.find(j => j._id === jugador._id);
            if (jugadorExistente) {
                return prevJugador.map(j => 
                    j._id === jugador._id ? { ...j, totalGoles: j.totalGoles + 1 } : j
                );
            } else {
                return [...prevJugador, { ...jugador, totalGoles: 1 }];
            }
        });
        setCountGol2(countGol2 + 1);
    };

    const menosGol1 = (jugador) => {
        setJugadorGol1((prevJugadores) => {
            const jugadorExistente = prevJugadores.find(j => j._id === jugador._id);
            if (jugadorExistente && jugadorExistente.totalGoles > 1) {
                return prevJugadores.map(j => 
                    j._id === jugador._id ? { ...j, totalGoles: j.totalGoles - 1 } : j
                );
            } else {
                return prevJugadores.filter(j => j._id !== jugador._id);
            }
        });
        setCountGol1((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const menosGol2 = (jugador) => {
        setJugadorGol2((prevJugadores) => {
            const jugadorExistente = prevJugadores.find(j => j._id === jugador._id);
            if (jugadorExistente && jugadorExistente.totalGoles > 1) {
                return prevJugadores.map(j => 
                    j._id === jugador._id ? { ...j, totalGoles: j.totalGoles - 1 } : j
                );
            } else {
                return prevJugadores.filter(j => j._id !== jugador._id);
            }
        });
        setCountGol2((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };
// Función para contar amarillas en equipo 1 (máximo 2 por jugador)
const countAmarilla1 = (jugador) => {
    if (jugadorRoja1.find(j => j._id === jugador._id)) {
        return; // El jugador no puede recibir más tarjetas si ya tiene una roja
    }
    const jugadorExistente = jugadorAmarilla1.find(j => j._id === jugador._id);
    
    if (!jugadorExistente) {
        // Si el jugador no tiene tarjetas, añadimos la primera tarjeta amarilla
        setJugadorAmarilla1((prevJugador) => [...prevJugador, { ...jugador, amarillas: 1 }]);
        setAmarilla1(amarilla1 + 1);
    } else if (jugadorExistente.amarillas === 1) {
        // Si el jugador ya tiene una tarjeta amarilla, le asignamos la segunda y la convertimos en roja
        setJugadorAmarilla1((prevJugador) =>
            prevJugador.filter(j => j._id !== jugador._id) // Eliminamos de los jugadores con amarillas
        );
        setAmarilla1(amarilla1 - 1); // Restamos una amarilla ya que la segunda se convierte en roja
        setJugadorRoja1((prevJugador) => [...prevJugador, { ...jugador, rojas: 1 }]); // Añadimos la tarjeta roja
        setRoja1(roja1 + 1); // Sumamos 1 a las tarjetas rojas
    }
};


const countAmarilla2 = (jugador) => {
    if (jugadorRoja1.find(j => j._id === jugador._id)) {
        return; // El jugador no puede recibir más tarjetas si ya tiene una roja
    }
    const jugadorExistente = jugadorAmarilla2.find(j => j._id === jugador._id);
    
    if (!jugadorExistente) {
        // Si el jugador no tiene tarjetas, añadimos la primera tarjeta amarilla
        setJugadorAmarilla2((prevJugador) => [...prevJugador, { ...jugador, amarillas: 1 }]);
        setAmarilla2(amarilla2 + 1);
    } else if (jugadorExistente.amarillas === 1) {
        // Si el jugador ya tiene una tarjeta amarilla, le asignamos la segunda y la convertimos en roja
        setJugadorAmarilla2((prevJugador) =>
            prevJugador.filter(j => j._id !== jugador._id) // Eliminamos de los jugadores con amarillas
        );
        setAmarilla2(amarilla2 - 1); // Restamos una amarilla ya que la segunda se convierte en roja
        setJugadorRoja2((prevJugador) => [...prevJugador, { ...jugador, rojas: 1 }]); // Añadimos la tarjeta roja
        setRoja2(roja2 + 1); // Sumamos 1 a las tarjetas rojas
    }
};

// Función para restar amarillas en equipo 1
const menosAmarilla1 = (jugador) => {
    const jugadorExistente = jugadorAmarilla1.find(j => j._id === jugador._id);

    if (jugadorExistente && jugadorExistente.amarillas > 0) {
        if (jugadorExistente.amarillas === 1) {
            // Si tiene 1 tarjeta, lo removemos del array
            setJugadorAmarilla1((prevJugadores) => prevJugadores.filter(j => j._id !== jugador._id));
        } else {
            // Si tiene más de una tarjeta, restamos una
            setJugadorAmarilla1((prevJugadores) => 
                prevJugadores.map(j => j._id === jugador._id ? { ...j, amarillas: j.amarillas - 1 } : j)
            );
        }
        setAmarilla1((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
};

// Función para restar amarillas en equipo 2
const menosAmarilla2 = (jugador) => {
    const jugadorExistente = jugadorAmarilla2.find(j => j._id === jugador._id);

    if (jugadorExistente && jugadorExistente.amarillas > 0) {
        if (jugadorExistente.amarillas === 1) {
            setJugadorAmarilla2((prevJugadores) => prevJugadores.filter(j => j._id !== jugador._id));
        } else {
            setJugadorAmarilla2((prevJugadores) => 
                prevJugadores.map(j => j._id === jugador._id ? { ...j, amarillas: j.amarillas - 1 } : j)
            );
        }
        setAmarilla2((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
};

// Función para contar rojas en equipo 1 (máximo 1 por jugador)
const countRoja1 = (jugador) => {
    // Verificar si el jugador ya tiene una tarjeta roja; si es así, no hacer nada
    if (jugadorRoja1.find(j => j._id === jugador._id)) {
        return; // El jugador no puede recibir más rojas si ya tiene una
    }

    setJugadorRoja1((prevJugador) => [...prevJugador, jugador]);
    setRoja1(roja1 + 1);
};

// Función para contar rojas en equipo 2 (máximo 1 por jugador)
const countRoja2 = (jugador) => {
  
    if (jugadorRoja2.find(j => j._id === jugador._id)) {
        return; 
    }

    setJugadorRoja2((prevJugador) => [...prevJugador, jugador]);
    setRoja2(roja2 + 1);
};

// Función para restar rojas en equipo 1
const menosRoja1 = (jugador) => {
    if (jugadorRoja1.find(j => j._id === jugador._id)) {
        setJugadorRoja1((prevJugadores) => prevJugadores.filter(j => j._id !== jugador._id));
        setRoja1((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
};

// Función para restar rojas en equipo 2
const menosRoja2 = (jugador) => {
    if (jugadorRoja2.find(j => j._id === jugador._id)) {
        setJugadorRoja2((prevJugadores) => prevJugadores.filter(j => j._id !== jugador._id));
        setRoja2((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
};

    const menosJugadorDes = (jugador) => {
        if (jugadorDestacado.includes(jugador)) {
            setJugadorDestacado((prevJugadores) => prevJugadores.filter(j => j !== jugador));

        }
    }

  const enviarIdJugadorDestacado = async (jugadorId) => {
    try {
      const response = await axios.post(`${URL_API}/jugadorDestacado`, {
        jugadorDestacado: [jugadorId] 
      });
      //console.log('ID de jugador guardado exitosamente:', jugadorId);
      toast.success("Jugador destacado enviado correctamente");
    } catch (error) {
      //console.error("Error al procesar el jugador destacado:", error.response ? error.response.data : error);
      toast.warning("Error al procesar el jugador destacado");
      toast.info("O ya está seleccionado como destacado.");
    }
  };

  const manejarSeleccionJugador = (jugador) => {
    const nuevoSeleccionados = new Set(jugadoresSeleccionados);
    if (nuevoSeleccionados.has(jugador._id)) {
      toast.info(`El jugador ${jugador.nombres} ya está seleccionado como destacado`);
    } else {
      nuevoSeleccionados.add(jugador._id);
      enviarIdJugadorDestacado(jugador._id); 
    }
    setJugadoresSeleccionados(nuevoSeleccionados);
  };
    
    useEffect(()=>{
        console.log(resultPenalesEquipo1)
        console.log(resultPenalesEquipo2)
    },[resultPenalesEquipo1, resultPenalesEquipo2])
    const finalizarPar=()=>{
        if (countGol1 === countGol2 && marcadorPenal1===marcadorPenal2) {
            // Open the tie modal for 6 seconds
            setIsModalOpen(true);
            setTimeout(() => {
              setIsModalOpen(false); // Close the modal after 6 seconds
            }, 6000);
      } else {
    setModalOpenOk(true)
    }
}

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="flex justify-center items-center h-screen w-screen"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="rounded-lg shadow-lg  overflow-hidden flex flex-col  min-h-[50vh] max-h-[100vh] bg-white p-3 ml-[25vw] mr-12 "> {/* Agregué la clase ml-[10vw] */}
                    <div className='flex justify-end'>
                        <button
                            className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                    {datosVss && (
                        <div key={datosVss._id} className="flex relative flex-row gap-x-4 min-h-[50vh] max-h-[100vh] w-5/6">
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


                                    <div className="flex flex-row items-center p-6 w-1/2 ">
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 bg-yellow-400 rounded-md flex items-center justify-center">
                                                    <div className="text-xl font-bold text-black">{amarilla1}</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 bg-red-400 rounded-md flex items-center justify-center">
                                                    <div className="text-xl font-bold text-black">{roja1}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {!penal?(
                                            <div className="flex flex-col items-center m-4 w-16">
                                            <h1 className="text-xl mb-2">Goles</h1>
                                            <div className="text-6xl font-bold">{countGol1}</div>
                                        </div> 
                                        ):(
                                            <div className="flex flex-col items-center m-4 w-16">
                                            <h1 className="text-xl mb-2">Penales</h1>
                                            <div className="text-6xl font-bold">{marcadorPenal1}</div>
                                        </div>
                                        )}
                                       
                                    </div>


                                </div>



                                <div className="relative overflow-x-auto mt-5 ">
                                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Jugador</th>
                                                <th scope="col" className="px-6 py-3">Dolsal</th>
                                                <th scope="col" className="px-6 py-3">Gol</th>
                                                <th scope="col" className="px-6 py-3">Amarilla</th>
                                                <th scope="col" className="px-6 py-3">Roja</th>
                                                <th scope="col" className="px-6 py-3">Jugador Destacado</th>
                                            </tr>
                                        </thead>
                                        {showPlayers && (
                                            <tbody>
                                                {equipo1 && equipo1.participantes.map((jugador) => (
                                                    <tr key={jugador._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {jugador.nombres}
                                                        </th>
                                                        <td className="px-6 py-4">{jugador.dorsal}</td>
                                                        <td className="px-6 py-4">
                                                            <td onClick={() => gol1(jugador)}>

                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104668/flcacldysv8mraxgbiwl.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                            <td onClick={() => menosGol1(jugador)}>
                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104856/shl2ddvat0lpzfjyngxh.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <td onClick={() => countAmarilla1(jugador)}>

                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104668/flcacldysv8mraxgbiwl.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                            <td onClick={() => menosAmarilla1(jugador)}>
                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104856/shl2ddvat0lpzfjyngxh.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <td onClick={() => countRoja1(jugador)}>

                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104668/flcacldysv8mraxgbiwl.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                            <td onClick={() => menosRoja1(jugador)}>
                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104856/shl2ddvat0lpzfjyngxh.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                           <div key={jugador._id} onClick={() => manejarSeleccionJugador(jugador)}
                                                               className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer m-2 transition duration-300 
                                                              ${jugadoresSeleccionados.has(jugador._id) ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                          </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                    <div className='grid place-content-center'>
                                        <button
                                            onClick={togglePlayerRows}
                                            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                            <div className="flex items-center flex-col">
                                <div>
                                    <h1 className="text-2xl md:text-2xl font-semibold">vs</h1>
                                </div>
                                <div className='text-2xl md:text-3xl font-semibold' >
                                    <button onClick={() => setMyModalIsOpen(true)}
                                    >Penales</button>
                                </div>
                                <Penales setMyModalIsOpen={setMyModalIsOpen} isOpen={isMyModalOpen} equipo1={equipo1} equipo2={equipo2} setPenal={setPenal} setNumeroTiros={setNumeroTiros} setResultPenalesEquipo1={setResultPenalesEquipo1} setResultPenalesEquipo2={setResultPenalesEquipo2} setMarcadorPena1={setMarcadorPena1} setMarcadorPena2={setMarcadorPena2}/>
                            </div>

                            <div className="flex flex-col w-1/2">
                                <div className='flex content-center justify-center gap-x-5'>
                                    <div className="flex flex-row items-center p-6 ">
                                    {!penal?(
                                            <div className="flex flex-col items-center m-4 w-16">
                                            <h1 className="text-xl mb-2">Goles</h1>
                                            <div className="text-6xl font-bold">{countGol2}</div>
                                        </div> 
                                        ):(
                                            <div className="flex flex-col items-center m-4 w-16">
                                            <h1 className="text-xl mb-2">Penales</h1>
                                            <div className="text-6xl font-bold">{marcadorPenal2}</div>
                                        </div>
                                        )}
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 bg-yellow-400 rounded-md flex items-center justify-center">
                                                    <div className="text-xl font-bold text-black">{amarilla2}</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 bg-red-400 rounded-md flex items-center justify-center">
                                                    <div className="text-xl font-bold text-black">{roja2}</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='grid place-content-center'>
                                        <div>
                                            <img className="object-contain w-32 drop-shadow-lg"
                                                src={equipo2.imgLogo} alt="img" />
                                        </div>
                                        <div className='flex justify-center content-center'>
                                            <h1 className="my-2">{equipo2.nombreEquipo}</h1>
                                        </div>
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
                                                <th scope="col" className="px-6 py-3">Jugador Destacado</th>
                                            </tr>
                                        </thead>
                                        {showPlayersTable2 && (
                                            <tbody>
                                                {equipo2.participantes ? equipo2.participantes.map((jugador) => (
                                                    <tr key={jugador._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {jugador.nombres}
                                                        </th>
                                                        <td className="px-6 py-4">{jugador.dorsal}</td>
                                                        <td className="px-6 py-4">
                                                            <td onClick={() => gol2(jugador)}>

                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104668/flcacldysv8mraxgbiwl.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                            <td onClick={() => menosGol2(jugador)}>
                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104856/shl2ddvat0lpzfjyngxh.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <td onClick={() => countAmarilla2(jugador)}>

                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104668/flcacldysv8mraxgbiwl.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                            <td onClick={() => menosAmarilla2(jugador)}>
                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104856/shl2ddvat0lpzfjyngxh.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <td onClick={() => countRoja2(jugador)}>

                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104668/flcacldysv8mraxgbiwl.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                            <td onClick={() => menosRoja2(jugador)}>
                                                                <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104856/shl2ddvat0lpzfjyngxh.png" alt="" className="w-6 h-6" />
                                                            </td>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                           <div key={jugador._id} onClick={() => manejarSeleccionJugador(jugador)}
                                                               className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer m-2 transition duration-300 
                                                              ${jugadoresSeleccionados.has(jugador._id) ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                          </div>
                                                        </td>                          </tr>
                                                )) : (
                                                    <p className="text-red-500 font-bold text-center">No tiene equipo asignado</p>
                                                )}
                                            </tbody>
                                        )}
                                    </table>
                                    <div className='grid place-content-center'>
                                        <button
                                            onClick={togglePlayerRowsTable2}
                                            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
   {isModalOpen && (
                                   <div className={`modal ${isModalOpen ? 'block' : 'hidden'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
                                   <div className="modal-content bg-white rounded-lg shadow-lg max-w-md p-6">
                                     <h2 className="text-xl font-bold mb-4">El partido está empatado</h2>
                                     <p className="mb-6">Se procederá a los penales.</p>
                                     <button
                                       onClick={() => setMyModalIsOpen(true)}
                                       className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center font-sans text-sm font-bold uppercase text-white shadow-md transition-all hover:bg-[#0a88a1] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#12aed1cd] focus:ring-opacity-50"
                                     >
                                       Penales
                                     </button>
                                   </div>
                                 </div>
                                  )}
                    <div className="flex justify-end pr-3 pb-3 mt-2">
                        <div className="flex justify-end">

                            <button onClick={
                             finalizarPar
                            }
                                class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                Finalizar Partido
                            </button>
                         
                        </div>
                    </div>
                    <TerminarPartidoModal
                        setModalIsOpen={setModalIsOpen}
                        isOpen={isModalOpenOk}
                        onClose={() => setModalOpenOk(false)}
                        agregarResultado={botonPublicar}
                        setModalOpenOk={setModalOpenOk}
                        setBoton={setBoton}
                        idVs={datosVss._id}
                    />
                </div>
                <ToastContainer/>
            </Modal>
        </>
    )
}
