import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { AgregarResultados } from '../../widgets/componentes/Intercentros/Modal/AgregarResultados'
import { MirarResultados } from '../../widgets/componentes/Intercentros/Modal/MirarResultados'
import { sacarEquipos } from '../../utils/Intercentros/equiposUnicos'
import { PosicionesIntercentros } from '../../widgets/componentes/Intercentros/Modal/PosicionesIntercentros'
import axios from "axios";
import { Typography, Spinner } from '@material-tailwind/react';


export const ResultadosIntercentros=()=> {
  const [vsEquipos, setVsEquipos] = useState([])
  const [modal, setModal] = useState(false)
  const [modalMirarResultados, setModalMirarResultados] = useState(false)
  const [idVs, setidVs] = useState()
  const [idVsResult, setIdVsResult] = useState()
  const [modalPosiciones, setModalPosiciones] = useState(false)
  const [equipos, setEquipos] = useState()
  const [posicionesController, setPosicionesController] = useState();
  const [loading, setLoading] = useState(true); 
  const { id } = useParams()
  useEffect(()=>{
    setLoading(true)
   const obtenerVs = async ()=>{
    try {
      const response = await axios.get('http://localhost:3001/vsInter', {
        headers: {
          idCampeonato: id
        }
      });
      setEquipos(response.data);
      setVsEquipos(response.data);
    } catch (error) {
      console.error('Error al obtener los equipos:', error);
    } finally {
      setLoading(false);
    }
   }
   obtenerVs()
  },[modal,id])

  useEffect(()=>{
    const guardarPosiciones = async ()=>{
      const responsePosiciones = await axios.get('http://localhost:3001/posicionesIntercentros',{
        headers:{
            idCampeonato: id
        }
    })
    if(responsePosiciones.data.length === 0){
      setPosicionesController(true)
      if(posicionesController){
        return
      }
      const equipos = sacarEquipos(vsEquipos)
       const guardarEquipos = await Promise.all(
       equipos.map(async (item) => {
         return await axios.post('http://localhost:3001/posicionesIntercentros', {
          equipo:item,
          idCampeonato: id,
          pts:0,
          goles:0,
          amarillas:0,
          rojas:0
         });
       })
     );
      console.log(guardarEquipos.data)
    }
    }
    guardarPosiciones()
  },[equipos])
 
  const abrirModal = (id)=>{
    setModal(true)
    setidVs(id)
  }
  const cerrarModal =()=>{
    setModal(false)
  }

  const cerrarModalPosiciones =()=>{
    setModalPosiciones(false)
  }
  const resultadosModal =(id)=>{
    setModalMirarResultados(true)
    setIdVsResult(id)
  }

  const cerrarModalResultados =()=>{
    setModalMirarResultados(false)
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
      <Spinner className="h-12 w-12 text-blue-500" />
      </div>
    );
  }
  return (
    <>
    <div className='w-full h-full  bg-white p-4 rounded-lg '>
    <button 
      onClick={()=>setModalPosiciones(true)}
      className='mt-10 ml-10 px-6 py-3 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50'>Mirar Posiciones</button>
    <section className='flex gap-11 mt-5 pr-10 pl-10 '>
     <table class="w-full text-sm text-left rtl:text-right  border-gray-300 shadow-lg transition-shadow hover:shadow-3xl rounded-xl text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 w-1/5 border-r-2  text-center py-3">
                  Fecha
                </th>
                <th scope="col" class="px-6 w-3/5 border-r-2 text-center py-3 ">
                   Partidos
                </th>
                <th scope="col" class="w-1/5 px-6 border-r-2 text-center py-3">
                   Hora
                </th>
                <th scope="col" class="w-1/5 px-6 text-center py-3">
                   Agregar Resultado
                </th>
            </tr>
        </thead>
        <tbody>
          {vsEquipos && vsEquipos.map((vs, indice)=>(
            <tr key={indice} class="bg-white border-b ">
                <th scope="row" class="px-6 w-1/5 text-center border-r-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                   <h1 className='text-lg text-black font-semibold'>{vs.fecha}</h1>
                </th>
                <td class="px-6 w-3/5 text-center border-r-2 py-4">
                  <div className='flex justify-between'>
                   <div>
              <img src={vs.equipo1.imgLogo} alt=""  className='w-16 h-16' />
              <h1 className='text-slate-500 text-xl font-medium drop-shadow-md'>{vs.equipo1.nombreEquipo}</h1>
                   </div>
                   <div>
          <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600'>vs</h1>
        </div>
                   <div>
                   <img src={vs.equipo2.imgLogo} alt="" className='w-16 h-16' />
              <h1 className='text-slate-500 text-xl font-medium drop-shadow-md'>{vs.equipo2.nombreEquipo}</h1>
                   </div>
                  </div>
                </td>
                <td class="px-6 w-1/5 text-center border-r-2  py-4">
                  <h1 className='text-lg text-black font-semibold'>{vs.hora}</h1>
                </td> 
                <td class="px-6 w-1/5 text-center py-4">
                  {vs.estado == true?
                  <img onClick={()=>abrirModal(vs._id)} src="/public/img/intercentros/planilla.png" alt="" className='w-10 h-10 cursor-pointer' />
                    :
                    <img onClick={()=>resultadosModal(vs._id)} src="/public/img/intercentros/cumplimiento.png" alt="" className='w-10 h-10 cursor-pointer' />
                }
                </td>  
            </tr>
          ))}
            
        </tbody>
    </table>

          <PosicionesIntercentros isOpen={modalPosiciones} close={cerrarModalPosiciones} id={id} />
          <AgregarResultados modal={modal} idCampeonato={id} idVs={idVs} closeModal={cerrarModal} equipos={equipos} />
          <MirarResultados idVs={idVsResult}  isOpen={modalMirarResultados} onClose={cerrarModalResultados} />

    </section>
    </div>
    </>
    
  );
}

