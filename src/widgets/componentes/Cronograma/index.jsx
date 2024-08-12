'use client'
import React, { useEffect, useState } from 'react'
import { MostrarJugadores } from './mostrarJugadores';
import { VersusPage } from '../Resultados/verResultados';
import 'tailwindcss/tailwind.css';
import { cambioFase } from '@/services/cambioFase';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import ModalCrear from '../Planillero/ModalCrear';
export default function CronogramaDesing({  patchFechaHora, guardarEdicion, datosVss, vs}) {
const idVs = datosVss._id
const [equipo1, setEquipo1]= useState([])
const IdCampeonato = localStorage.getItem('ID');
const[modalVer, setModalVer]=useState()
const[botonVer, setBotonVer]=useState()
  const [equipo2, setEquipo2] = useState([])
  const [usuarioCreado, setUsuarioCreado] = useState(false); 
  const [botonAgregar ,setBotonAgregar]= useState();
  const [resultado, setResultado]= useState([])
  const [idPlanillero, setIdPlanillero]=useState('66ba66cb88554f0148116653')
  const [estadoFase, setEStadoFase] = useState(true);
  const [nombreFase, setNombreFase] = useState("Fase 1");
  const [idFases, setIdFase] = useState();
  const [isLoading, setIsLoading] = useState(true); 
  const [equipoGanadores, setEquiposGanadores]=useState()
  const idfase= datosVss.IdFase
  console.log(idfase)
    useEffect(()=>{
        const resultados=async()=>{
            const response= await axios.get('http://localhost:3001/resultados',{
                headers: {
                    idfase:idfase
                }
            })
            setResultado(response.data)
        }
        resultados()
    },[idfase])
    useEffect(()=>{
      const resultados=async()=>{
          const response= await axios.get('http://localhost:3001/resultados/planillero',{
              headers: {
                  idplanillero:idPlanillero
              }
          })
          if(!response){
            setUsuarioCreado(false)
          }else if(response){
            setUsuarioCreado(true)
          }
      }
      resultados()
  },[idfase])
  console.log(equipoGanadores)
useEffect(()=>{
})
useEffect(()=>{
  const cambioFase2= cambioFase(vs,resultado)
if(cambioFase2){
  const EquiposGanadores=async()=>{
const response= await axios.get(`http://localhost:3001/fase/${idfase}`)
console.log('response '+response)
setEquiposGanadores(response.data.equiposGanadores)
  }
  EquiposGanadores()
  const actualizarFase=async()=>{
  try{
      const patchFase= await axios.patch(`http://localhost:3001/fase/estado/${idfase}`,{
        estado:false
      })
      console.log(patchFase)
      toast('Fase Finalizada exitosamente');
    }
  catch(error){
    console.log(error)
    toast.error('Hubo un error al finalizar la fase');
  }
}
const sortearEquipos = async () => {
  try {
    localStorage.setItem('estadoFase', estadoFase);
    const fase = await axios.post('http://localhost:3001/fase', { estado: estadoFase, nombre: nombreFase, idCampeonato: IdCampeonato });
    const idFase = fase.data._id;
    setIdFase(idFase);
    const dataVs = {
      equipos: equipoGanadores,
      IdFase: idFase
    };
    localStorage.setItem('IdFase', idFase);
    const equiposSorteados = await axios.post('http://localhost:3001/vs', { dataVs });
    console.log('equipos sorteado '+equiposSorteados)
  } catch (error) {
    console.log(error);
    setError("Error al sortear. Intente nuevamente.");
  }finally {
  
  }
};
sortearEquipos()
 
actualizarFase()
}else{
console.log('error')
}
    
},[])
//console.log(equipoGanadores)

  useEffect(() => {
    const resultados = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/resultados/${idVs}`);
        if(response.data){
          setBotonVer(true)
          setBotonAgregar(false)
        }else if(!response.data){
           setBotonAgregar(true)
           setBotonVer(false)
        }

      } catch (error) {
        console.log(error);
      }
    };
    resultados()
  }, [datosVss])
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

  const handleUsuarioCreado = () => {
    setUsuarioCreado(true);
  };

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

  const [openPlan, setModalPlanOpen] = useState(false);
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

  const openModalPlan = () => {
    setModalPlanOpen(true);
  };
  const onRequestClose = () => {
    setModalPlanOpen(false);
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
<div className=' w-full sm:w-[50vw] md:w-[40vw] lg:w-[35vw] h-full mt-8 flex flex-col m-4'>
<ToastContainer />
  <div className='flex flex-col md:flex-col justify-between flex-1 p-6 justify-center item-center rounded-md border-2 border-gray-300 shadow-lg'>
    <div className='w-full flex flex-row justify-between '>
      
    {botonAgregar?(
      
      <>
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
   

    <div className='w-full md:w-1/2 flex flex-col justify-between mt-6 md:mt-0  ' >
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
      </div>
      </>
      ):(
        <>
          <div className='flex flex-gap gap-4 flex justify-center items-center'>
        <div className='flex items-center'>
          <img className='w-1/4 md:w-2/4 object-contain h-16 md:h-24 rounded-3xl' src={equipo1.imgLogo} />
          <div className='ml-4 flex justify-center items-center'>
            <h4 className='text-lg md:text-xl font-semibold text-gray-700'>{equipo1.nombreEquipo}</h4>
          </div>
        </div>
        <div className='flex item-center'>
          <h1 className='text-center text-4xl font-extrabold'>Vs</h1>
        </div>
        <div className='flex items-center'>
          <div className='ml-4 flex justify-center items-center'>
            <h4 className='text-lg md:text-xl font-semibold text-gray-700'>{equipo2.nombreEquipo}</h4>
          </div>
          <img className='w-1/4 md:w-2/4 object-contain h-16 md:h-24 rounded-3xl ml-4' src={equipo2.imgLogo} />
        </div>
      </div>
        </>
      )}
      </div>
      
      <div className='flex flex-col md:flex-row justify-center md:space-y-0 md:space-x-4'>
      {botonAgregar&&(
        <button 
          onClick={()=>openModal()} 
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Agregar Resultados
        </button>
        )}
        {botonVer&&(
            <div className='flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-6'>
              
        <button 
        onClick={openModalVer}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
         Ver Resultados
        </button>
        </div>
         
        )}
        {usuarioCreado ? (
          <button
            onClick={toggleModal}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
          >
            Ver Usuario
          </button>
        ) : (
          <button
            onClick={openModalPlan}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
          >
            Planillero
          </button>
        )}
       {botonAgregar&&( <button
          onClick={handleConfirmarCmabios} 
          className=" items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Editar Horario
        </button>
        )}
      </div>

      </div>
  </div>
<VersusPage
modalVer={modalVer}
 setBotonVer={setBotonVer}
 setModalVer={setModalVer}
 idVs={idVs}
/>

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

      <ModalCrear
        openPlan={openPlan}
        onRequestClose={onRequestClose}
        onUsuarioCreado={handleUsuarioCreado} 
      />
      
      
  
</>
  )
}


