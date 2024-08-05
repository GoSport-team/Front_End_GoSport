import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
Modal.setAppElement('#root');
export const MostrarJugadores = ({datosVss, modalIsOpen, closeModal, equipo1, equipo2, showPlayersTable2, showPlayers, togglePlayerRows, togglePlayerRowsTable2}) => {
    const [countGol1, setCountGol1]= useState(0)
    const [countGol2, setCountGol2]= useState(0)
    const [amarilla1, setAmarilla1]= useState(0)
    const [amarilla2, setAmarilla2]= useState(0)
    const [roja1, setRoja1]= useState(0)
    const [roja2, setRoja2]= useState(0)

    const gol1=()=>{
 setCountGol1(countGol1+1)
  }
  const gol2=()=>{
    setCountGol2(countGol2+ 1)
  }
  const menosGol1=()=>{
    setCountGol1(countGol1-1)
  }
  const menosGol2=()=>{
    setCountGol2(countGol2-1)
  }
  const countAmarilla1=()=>{
    setAmarilla1(amarilla1+1)
     }
     const countAmarilla2=()=>{
       setAmarilla2(amarilla2+ 1)
     }
     const menosAmarilla1=()=>{
       setAmarilla1(amarilla1-1)
     }
     const menosAmarilla2=()=>{
setAmarilla2(amarilla2-1)
     }
     const countRoja1=()=>{
        setRoja1(roja1+1)
         }
         const countRoja2=()=>{
           setRoja2(roja2+ 1)
         }
         const menosRoja1=()=>{
           setRoja1(roja1-1)
         }
         const menosRoja2=()=>{
    setRoja2(roja2-1)
         }

    return (
   <>
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
                                        <td onClick={gol1}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={menosGol1}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                   
                                    <td className="px-6 py-4">
                                        <td onClick={countAmarilla1}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={menosAmarilla1}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6"/>
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={countRoja1}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={menosRoja1}>
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
                                        <td onClick={gol2}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={menosGol2}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={countAmarilla2}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={menosAmarilla2}>
                                    <img src="/public/img/cronograma/signo-menos(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                    </td>
                                    <td className="px-6 py-4">
                                        <td onClick={countRoja2}>

                                    <img src="/public/img/cronograma/mas(1).png" alt="" className="w-6 h-6" />
                                        </td>
                                        <td onClick={menosRoja2}>
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
