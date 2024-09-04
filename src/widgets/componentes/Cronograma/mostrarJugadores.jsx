import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {TerminarPartidoModal} from './modalTerminarPartido'
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement('#root');
export const MostrarJugadores = ({datosVss,setModalIsOpen, modalIsOpen, closeModal, equipo1, equipo2, showPlayersTable2, showPlayers, togglePlayerRows, togglePlayerRowsTable2, setBotonVer}) => {
    const [countGol1, setCountGol1]= useState(0)
    const [countGol2, setCountGol2]= useState(0)
    const [amarilla1, setAmarilla1]= useState(0)
    const [amarilla2, setAmarilla2]= useState(0)
    const [roja1, setRoja1]= useState(0)
    const [roja2, setRoja2]= useState(0)
    const [jugadorGol1, setJugadorGol1]=useState([])
    const [jugadorGol2, setJugadorGol2]=useState([])
    const [jugadorAmarilla1, setJugadorAmarilla1]=useState([])
    const [jugadorAmarilla2, setJugadorAmarilla2]=useState([])
    const [jugadorRoja1, setJugadorRoja1]=useState([])
    const [jugadorRoja2, setJugadorRoja2]=useState([])
    const [jugadorDestacado, setJugadorDestacado]= useState([])
    const [ganador, setGanador]= useState([])
    const [perdedor, setPerdedor]=useState([])
    const [isModalOpenOk, setModalOpenOk] = useState(false);
    
   useEffect(()=>{
    if(countGol1<countGol2){
            setGanador(equipo2)
            setPerdedor( equipo1)
    }else if(countGol2<countGol1){
        setGanador(equipo1)
        setPerdedor(equipo2)
    }
   },[countGol1, countGol2])
  
    const actualizarFase=async()=>{
        if(ganador && perdedor){
            const ganadores={
                Equipo:ganador
            }
            const perdedores={
                Equipo:perdedor
            }
        try{
            const patchFase= await axios.patch(`http://localhost:3001/fase/${datosVss.IdFase}`,{
                equiposGanadores:ganadores,
                equiposPerdedores:perdedores
            })
            console.log("actualizacion correcta")
    
        }catch(error){
            console.log(error)
        }
    }
    
   }


  const guardarResultado=async()=>{
      const response = await axios.post('http://localhost:3001/resultados',{
        equipo1:{
            Equipo1:equipo1,
            tarjetasAmarillas:jugadorAmarilla1,
            tarjetasRojas:jugadorRoja1,
            goles:{
        marcador:countGol1,
        jugadorGoleador:jugadorGol1
            }
        },
            equipo2:{
                Equipo2:equipo2,
                tarjetasAmarillas:jugadorAmarilla2,
                tarjetasRojas:jugadorRoja2,
                goles:{
            marcador:countGol2,
            jugadorGoleador:jugadorGol2
                }
            },
            IdVs:datosVss._id,
            IdFase:datosVss.IdFase,
            estadoPartido:false
      })
  }
  const botonPublicar=()=>{
    guardarResultado()
    actualizarFase()
    setBotonVer(true)
    setModalIsOpen(false)
  }
 
    const gol1=(jugador)=>{
        if(countGol1>=0){
            setCountGol1(countGol1+1)
            setJugadorGol1((prevJugador) => [...prevJugador, jugador])
        }
       
  }
 
  const gol2=(jugador)=>{
    if(countGol2>=0){
        setCountGol2(countGol2+ 1)
        setJugadorGol2((prevJugador) => [...prevJugador, jugador])
    }
  }
  const menosGol1=(jugador)=>{
    if(jugadorGol1.includes(jugador)){
        setJugadorGol1((prevJugadores) => prevJugadores.filter(j => j !== jugador));
        setCountGol1((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
    }
    
  const menosGol2=(jugador)=>{
    if(jugadorGol2.includes(jugador)){
        setJugadorGol2((prevJugadores) => prevJugadores.filter(j => j !== jugador));
        setCountGol2((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
  }
  const countAmarilla1=(jugador)=>{
    if(amarilla1>=0){
        setJugadorAmarilla1((prevJugador) => [...prevJugador, jugador])
        setAmarilla1(amarilla1+1)
    }
     }
    const countAmarilla2=(jugador)=>{
        if(amarilla2>=0){
            setJugadorAmarilla2((prevJugador) => [...prevJugador, jugador])
            setAmarilla2(amarilla2+ 1)
        }
     }
     const menosAmarilla1=(jugador)=>{
        if(jugadorAmarilla1.includes(jugador)){
            setJugadorAmarilla1((prevJugadores) => prevJugadores.filter(j => j !== jugador));
            setAmarilla1((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        }
     }
     const menosAmarilla2=(jugador)=>{
        if(jugadorAmarilla2.includes(jugador)){
            setJugadorAmarilla2((prevJugadores) => prevJugadores.filter(j => j !== jugador));
            setAmarilla2((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        }
     }
     const countRoja1=(jugador)=>{
        if(roja1>=0){
            setJugadorRoja1((prevJugador) => [...prevJugador, jugador])
            setRoja1(roja1+1)
        }
         }
         const countRoja2=(jugador)=>{
            if(roja2>=0){
                setJugadorRoja2((prevJugador) => [...prevJugador, jugador])
                setRoja2(roja2+ 1)
            }
         }
         const menosRoja1=(jugador)=>{
            if(jugadorRoja1.includes(jugador)){
                setJugadorRoja1((prevJugadores) => prevJugadores.filter(j => j !== jugador));
                setRoja1((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
            }
         }
         const menosRoja2=(jugador)=>{
            if(jugadorRoja2.includes(jugador)){
                setJugadorRoja2((prevJugadores) => prevJugadores.filter(j => j !== jugador));
                setRoja2((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
            }
         }
         const jugadorDes=(jugador)=>{
                setJugadorDestacado((prevJugador) => [...prevJugador, jugador])
           
      }
      const menosJugadorDes=(jugador)=>{
        if(jugadorDestacado.includes(jugador)){
            setJugadorDestacado((prevJugadores) => prevJugadores.filter(j => j !== jugador));
          
        }
     }
     
      

    return (
   <>
         <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    className="flex justify-center items-center h-screen w-auto ml-36"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
    <div className="rounded-lg shadow-lg overflow-hidden flex flex-col min-w-[50vw] max-w-[70vw] min-h-[50vh] max-h-[100vh] bg-white p-3 ml-[10vw]"> {/* Agregué la clase ml-[10vw] */}
        <div className='flex justify-end'>
            <button
                className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                onClick={closeModal}
            >
                &times;
            </button>
        </div>
{datosVss&&(
        <div  key={ datosVss._id} className="flex relative flex-row gap-x-4 min-w-[50vw] max-w-[80vw] min-h-[50vh] max-h-[100vh]">
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
                   
                   
                    <div className="flex flex-row items-center p-6 ">
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
      <div className="flex flex-col items-center m-4 w-16">
        <h1 className="text-xl mb-2">Goles</h1>
        <div className="text-6xl font-bold">{countGol1}</div>
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
                        {showPlayers && (
                            <tbody>
                            {equipo1 && equipo1.participantes.map((jugador)=>(
                                <tr key={jugador._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {jugador.nombreJugador}
                                    </th>
                                    <td className="px-6 py-4">{jugador.dorsal}</td>
                                    <td className="px-6 py-4">
                                        <td onClick={()=>gol1(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosGol1(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                   
                                    <td className="px-6 py-4">
                                        <td onClick={()=>countAmarilla1(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosAmarilla1(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6"/>
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={()=>countRoja1(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosRoja1(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={()=>jugadorDes(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosJugadorDes(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
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
            <div className="flex justify-center  p-4">
  <h1 className="text-2xl md:text-3xl font-semibold">vs</h1>
</div>

            <div className="flex flex-col w-1/2">
                <div className='flex content-center justify-center gap-x-5'>
                <div className="flex flex-row items-center p-6 ">
                <div className="flex flex-col items-center m-4 w-16">
        <h1 className="text-xl mb-2">Goles</h1>
        <div className="text-6xl font-bold">{countGol2}</div>
      </div>
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
                               src={equipo2.imgLogo}  alt="img" />
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
                              {equipo2.participantes ? equipo2.participantes.map((jugador)=>(
                                <tr key={jugador._id}className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {jugador.nombreJugador}
                                    </th>
                                    <td className="px-6 py-4">{jugador.dorsal}</td>
                                    <td className="px-6 py-4">
                                        <td onClick={()=>gol2(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosGol2(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={()=>countAmarilla2(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosAmarilla2(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={()=>countRoja2(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosRoja2(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={()=>jugadorDes(jugador)}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={()=>menosJugadorDes(jugador)}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
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

        <div className="flex justify-end pr-3 pb-3 mt-2">
            <div className="flex justify-end">
           
                <button onClick={()=>setModalOpenOk(true)} 
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
    
        />
    </div>
</Modal>
   </>
  )
}
