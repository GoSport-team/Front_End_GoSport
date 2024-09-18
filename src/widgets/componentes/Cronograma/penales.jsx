import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkbox } from '@material-tailwind/react';
export default function Penales({ isOpen, setMyModalIsOpen , equipo1, equipo2, setPenal, setNumeroTiros,setResultPenalesEquipo1,setResultPenalesEquipo2,setMarcadorPena1,setMarcadorPena2 }) {

    if (!isOpen) return null;
    const [countGol1, setCountGol1] = useState(0);
    const [countGol2, setCountGol2] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);
const [result1, setResult1]=useState([])
const [result2, setResult2]=useState([])
    const [NumeroTiros, setNumeroTiro]= useState(3)
    const totalTiros = () => {
        setNumeroTiro(prevCount => prevCount + 1);
    };

    const goal = (e,jugador) => {
        if (e.target.checked) {
            const resul={jugador:jugador, acierto:true}
          setCountGol1(prevCount => prevCount + 1);
          setResult1(prevResult=> [...prevResult, resul] )
        } else {
            setCountGol1(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
            setResult1(prevResult => 
                prevResult.filter(result => result.jugador._id !== jugador._id)
            );
        }
      };
    const menosGol=(e,jugador)=>{
        if (e.target.checked) {
            const resul={jugador:jugador, acierto:false}
          setResult1(prevResult=> [...prevResult, resul] )
        } else{
            setResult1(prevResult => 
                prevResult.filter(result => result.jugador._id !== jugador._id)
            );
        }
    }
  
    const goal2 = (e, jugador) => {
        if (e.target.checked) {
            const resul={jugador:jugador, acierto:true}
            setCountGol2(prevCount => prevCount + 1);
            setResult2(prevResult=> [...prevResult, resul] ) 
          } else {
            setCountGol2(prevCount => (prevCount >0 ? prevCount- 1:0));
            setResult2(prevResult => 
                prevResult.filter(result => result.jugador._id !== jugador._id)
            );
          }
    };
    const menosGol2=(e,jugador)=>{
        if (e.target.checked) {
            const resul={jugador:jugador, acierto:false}
          setResult2(prevResult=> [...prevResult, resul] )
        } else{
            setResult2(prevResult => 
                prevResult.filter(result => result.jugador._id !== jugador._id)
            );
        }
    }

   
const GuardarResult=()=>{
    setPenal(true)
setNumeroTiros(NumeroTiros)
setResultPenalesEquipo1(result1)
setResultPenalesEquipo2(result2)
setMarcadorPena1(countGol1)
setMarcadorPena2(countGol2)
    setMyModalIsOpen(false)
}
useEffect(()=>{
    console.log(result1)
console.log(result2)
},[result1,result2])
    return (
        <div className='min-w-max '>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ml-40 min-w-max h-[80vh] ">
                <div className="bg-white p-6 rounded-lg shadow-lg min-w-max  ">
                    <div className='flex justify-end'>
                        <button
                            className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                            onClick={() => setMyModalIsOpen(false)}
                        >
                            &times;
                        </button>

                    </div>
                    <h2 className="text-xl font-bold mb-4">Penales</h2>
                    <div className='flex justify-around'>
                  
                        <div className='flex flex-col w-[30vw] h-96 '>
                            <div className='flex content-center justify-center'> 
                                <div className='flex flex-col  items-center'>
                            <h2 className="text-lg font-bold mb-4">Número Tiros </h2>
                            <div className='flex flex-col items-center'>
                            <h3 className="text-lg font-bold mb-4">{ NumeroTiros}</h3>
                            <img 
      onClick={totalTiros} 
      className="object-cover w-6 " 
      src="/public/img/Cronograma/aumentar.png" 
      alt="Aumentar" 
    />
    </div>
                            </div>
                                <div className='grid place-content-center'>
                                    <div>
                                        <img className="object-contain w-32 h-32 drop-shadow-lg"
                                            src={equipo1.imgLogo} alt="Logo" />
                                    </div>
                                    <div className='flex justify-center content-center'>
                                        <h1 className="my-2">{equipo1.nombreEquipo}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center p-6 ">
                                    <div className="flex flex-col items-center m-4 w-16">
                                        <h1 className="text-xl mb-2">Goles</h1>
                                        <div className="text-6xl font-bold">{countGol1}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Jugador
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Dorsal
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Acerto
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                               Fallo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            equipo1.participantes&& equipo1.participantes.map((jugador)=>(
                                                <tr class="bg-white dark:bg-gray-800 "  >
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {jugador.nombres}
                                                </th>
                                                <th class="px-6 py-4">
                                                    {jugador.dorsal}
                                                </th>
                                                <th className="px-6 py-4 flex justify-center">
   <Checkbox  onChange={(e)=>goal(e,jugador)}/>
    </th>

    <th className="px-6 py-4  justify-center">
   <Checkbox onChange={(e)=>menosGol(e,jugador)}/>
  </th>
                                            </tr>
                                            ))
                                        }
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            VS
                        </div>
                        <div className='flex flex-col w-[30vw] h-96'>
                            <div className='flex content-center justify-center'>
                                <div className='grid place-content-center'>
                                    <div>
                                        <img className="object-contain w-36 h-32 drop-shadow-lg"
                                            src={equipo2.imgLogo} alt="Logo" />
                                    </div>
                                    <div className='flex justify-center content-center'>
                                        <h1 className="my-2">{equipo2.nombreEquipo}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center p-6 ">
                                    <div className="flex flex-col items-center m-4 w-16">
                                        <h1 className="text-xl mb-2">Goles</h1>
                                        <div className="text-6xl font-bold">{countGol2}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Jugador
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Dorsal
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Acerto
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                               Fallo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                            equipo2.participantes&& equipo2.participantes.map((jugador)=>(
                                                <tr class="bg-white dark:bg-gray-800">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {jugador.nombres}
                                                </th>
                                                <th class="px-6 py-4">
                                                    {jugador.dorsal}
                                                </th>
                                                <th className="px-6 py-4 flex justify-center">
   <Checkbox   onChange={(e)=>goal2(e,jugador)}/>
    </th>

    <th className="px-6 py-4  justify-center">
   <Checkbox onChange={(e)=>menosGol2(e,jugador)}/>
  </th>
                                            </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-5">
                        <button onClick={()=>GuardarResult()}
                            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}