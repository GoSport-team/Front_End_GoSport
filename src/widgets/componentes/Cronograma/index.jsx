'use client'
import React, { useEffect, useState } from 'react'
import { MostrarJugadores } from './mostrarJugadores';
import { VersusPage } from '../Resultados/verResultados';
import 'tailwindcss/tailwind.css';
import { cambioFase } from '@/services/cambioFase';
import { ganador } from '@/services/ganador';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BuscarPlanillero } from '../Planillero/BuscarPlanillero';  
import { VerPlanillero } from '../Planillero/verPlanillero';
import { MejorPerdedor } from './mejorPerdedor';
import { usePar } from '@/context/parContext';
export default function CronogramaDesing({  patchFechaHora, guardarEdicion, datosVss, vs, oks}) {
const idVs = datosVss._id
const [equipo1, setEquipo1]= useState([])
const IdCampeonato = localStorage.getItem('ID');
const[modalVer, setModalVer]=useState()
const[botonVer, setBotonVer]=useState()
  const [equipo2, setEquipo2] = useState([])
  const [botonAgregar ,setBotonAgregar]= useState();
  const [resultado, setResultado]= useState([])
  const [estadoFase, setEStadoFase] = useState(true);
  const [nombreFase, setNombreFase] = useState();
  const [idFases, setIdFase] = useState();
  const [isLoading, setIsLoading] = useState(true); 
  const [equipoGanadores, setEquiposGanadores]=useState([])
  const [idPlanillero, setIdPlanillero]=useState()
  const [botonVerPlanillero, setBotonVerPlanillero]=useState()
  const [ok, setOk]= useState()
  const [mostrarGanador, setMostrarGanador]= useState()
const[cambioFase2, setCambioFase2]= useState()
const[EquipoGanador, setEquipoGanador]= useState()
const [modalVerPlanillero, setVerPlanillero]=useState()
const [controladorResult, setControladorResult]= useState()
const {par2, setPar}= usePar()

  const idfase= datosVss.IdFase
  const openModalVerPlanillero = () => {
    setVerPlanillero(true);
  };
  const closeModalPlanillero = () => {
    setVerPlanillero(false);
  };
  const EquiposGanadores=async()=>{
    try{
      const response= await axios.get(`http://localhost:3001/fase/${idfase}`)
      //console.log(response.data.equiposGanadores)
      setNombreFase(response.data.nombre + 1)
      setEquiposGanadores(response.data.equiposGanadores)
    }catch(error){
console.log(error)
    }
      }
      const actualizarFase=async()=>{
        try{
            const patchFase= await axios.patch(`http://localhost:3001/fase/estado/${idfase}`,{
              estado:false
            })
            console.log('fase finalizada')
            toast('Fase Finalizada exitosamente');
          }
        catch(error){
          console.log(error)
          toast.error('Hubo un error al finalizar la fase');
        }
      }
    useEffect(()=>{
        const resultados=async()=>{
          try{

            const response= await axios.get('http://localhost:3001/resultados',{
                headers: {
                    idfase:idfase
                }
            })
            setControladorResult(true)
            setResultado(response.data)
          }catch(error){
            console.log(error)
          }finally{
            setControladorResult(false)
          }
        }
        resultados()
    },[controladorResult])
  useEffect(()=>{
  setCambioFase2(cambioFase(vs,resultado))
   setEquipoGanador(ganador(resultado, vs))
  },[resultado]) 
  
     useEffect(() => {
      const equiGan=async()=>{
        
          if (EquipoGanador) {
            await EquiposGanadores();
        setMostrarGanador(true)
          } else {
           setMostrarGanador(false)
          }

      }
      equiGan()
    },[resultado]);
    
    useEffect(() => {
      if (cambioFase2 && !EquipoGanador && oks) {
        EquiposGanadores();
        setOk(true);
      } else if (!cambioFase2) {
        setOk(false);
      }
    }, [resultado]);
   

      const sortearEquipos = async (equipoGanadores) => {
        try {
          const fase = await axios.post('http://localhost:3001/fase', { estado: estadoFase, nombre: nombreFase, idCampeonato: IdCampeonato });
          const idFase = fase.data._id;
          console.log(idFase + ' fase creada')
          localStorage.setItem('IdFase', idFase);
          localStorage.setItem('nombreFase', nombreFase)
         
          const dataVs = {
            equipos:equipoGanadores
              ,
            IdFase: idFase
          };
          //console.log(dataVs)
          const equiposSorteados = await axios.post('http://localhost:3001/vs', { dataVs });
          console.log(equiposSorteados)
        } catch (error) {
          console.log(error);
          setError("Error al sortear. Intente nuevamente.");
        }finally {
        
        }
      };
const handleClick=()=>{
  sortearEquipos(equipoGanadores)
  actualizarFase()
  setOk(false)
  }
  useEffect(() => {
    const resultados = async () => {
      try {
        setControladorResult(true)
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
  }, [controladorResult])
  //console.log(datosVss)
useEffect(()=>{
  setEquipo1(datosVss.equipo1.informacion.team1.Equipo)
  setEquipo2(datosVss.equipo2.informacion.team2.Equipo)
},[])
//console.log(equipo2)
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
///console.log(equipoGanadores)

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
  }
  //console.log(equipo2)
 // console.log(idPlanillero)
  return (
    <>
<div className=' w-full sm:w-[50vw] md:w-[40vw] lg:w-[35vw] h-full mt-8 flex flex-col m-4 justify-center item-center'>


<ToastContainer />
  <div className='flex flex-col md:flex-col flex-1 p-6 justify-center item-center rounded-md border-2 border-gray-300 shadow-lg'>
    <div className='w-full flex flex-row justify-between '>
      
    {equipo2.nombreEquipo==='no tiene asignado equipo'?(
      <>
   <MejorPerdedor equipo1={equipo1} equipo2={equipo2} setBotonAgregar={setBotonAgregar}/>

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
        
          <div className='flex flex-gap gap-4 justify-center items-center flex-col'>
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
          <img className='w-1/4 md:w-2/4 object-contain h-16 md:h-24 rounded-3xl ml-4' src={equipo2.imgLogo} />
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
      )}
      </div>
      
      <div className='flex flex-col md:flex-row justify-center md:space-y-0 md:space-x-4'>
        
      {botonAgregar&&(
        <button 
          onClick={()=>openModal()} 

          class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Agregar Resultados
        </button>
        )}
        {botonVer&&(
            <div className='flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-6'>
              
        <button 
        onClick={openModalVer}
          class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
         Ver Resultados
        </button>
        </div>
         
        )}
        {botonVerPlanillero && (
          <button
            onClick={openModalVerPlanillero}
            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Ver Planillero
          </button>
        ) }
        {botonAgregar&&(
          <>
            {!botonVerPlanillero&& (
          <button
          key={idVs}
            onClick={()=>openModalPlan()}
            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
           Agregar Planillero
          </button>
          )
        }
          </>
        )}
      
      
       {botonAgregar&&( <button
          onClick={handleConfirmarCmabios} 
          class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Editar Horario
        </button>
        )}
      </div>

      </div>
      {mostrarGanador&&(
        <>
      <div className='flex flex-col justify-center items-center m-8'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-black mb-6'>
          Ganador Campeonato
        </h1>
        <div className='flex items-center'>
          <img
            className='w-1/3 md:w-1/4 object-contain h-24 md:h-32 rounded-3xl'
            src={equipoGanadores[0].Equipo.imgLogo}
            alt={equipoGanadores[0].Equipo.nombreEquipo}
          />
          <div className='ml-6 flex flex-col justify-center items-center'>
            <h4 className='text-2xl md:text-3xl font-bold text-gray-900'>
              {equipoGanadores[0].Equipo.nombreEquipo}
            </h4>
          </div>
        </div>
      </div>
    </>
  )
  }

  </div>
  {ok&&(
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="bg-white p-6 rounded-lg shadow-lg text-center">
       <h2 className="text-xl font-semibold mb-4">Fase terminada con éxito</h2>
       <button 
         onClick={()=>handleClick()} 
         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
         OK
       </button>
     </div>
   </div>
  )}
  
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

   <BuscarPlanillero
   modalIsOpen={openPlan}
   closeModal={onRequestClose}
   idVs={idVs}
   setIdPlanillero={setIdPlanillero}
   setBotonVerPlanillero={setBotonVerPlanillero}
   /> 
   {idPlanillero&&(
 <VerPlanillero
 modalIsOpen={modalVerPlanillero}
 closeModal={closeModalPlanillero}
 idVs={idVs}
 />
   )}
  
  
</>
  )
}


