import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgregarResultados } from '../../widgets/componentes/Intercentros/Modal/AgregarResultados';
import { MirarResultados } from '../../widgets/componentes/Intercentros/Modal/MirarResultados';
import { PosicionesIntercentros } from '../../widgets/componentes/Intercentros/Modal/PosicionesIntercentros';
import { sacarEquipos } from '../../utils/Intercentros/equiposUnicos';
import { obtenerGanadorFinal } from "../../utils/Intercentros/equipoGanador";
import axios from "axios";
import {   Spinner } from '@material-tailwind/react';
import { CardGanador } from "../../widgets/componentes/Intercentros/CardGanador";
const URL_API = import.meta.env.VITE_API_URL
export const ResultadosIntercentros = () => {
  const [vsEquipos,   setVsEquipos] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMirarResultados, setModalMirarResultados] = useState(false);
  const [idVs, setidVs] = useState();
  const [idVsResult, setIdVsResult] = useState();
  const [modalPosiciones, setModalPosiciones] = useState(false);
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [equipoGanador, setEquipoGanador] = useState(false)

  const [posicionesGuardadas, setPosicionesGuardadas] = useState(false);

   useEffect(()=>{
   const obtenerVs = async ()=>{
       const response = await axios.get(`${URL_API}/vsInter`,{
           headers:{
               idCampeonato: id
           }
       })
       setEquipos(response.data)
       
       setVsEquipos(response.data)
   }
   obtenerVs()
  },[modal])

  useEffect(() => {
    const obtenerGanadorYActualizarEstado = async () => {
           try {
            setLoading(true)

        // 1. Verificar cuántos resultados ya han sido registrados en la base de datos para este campeonato
        const responseResultados = await axios.get(`${URL_API}/resultadosIntercentros}`, {
          headers: {
            idCampeonato: id,
          },
        });
        console.log("datoss de resultados inter", responseResultados)
        // 2. Validar si ya se han registrado los 3 resultados
        if (responseResultados.data.length === 3) { // Ajusta este número si hay más o menos partidos
          console.log('Ya se han jugado todos los partidos. Procediendo a obtener posiciones.');
  
          // 3. Obtener posiciones para determinar el equipo ganador
          const responsePosiciones = await axios.get(`${URL_API}/posicionesIntercentros`, {
            headers: {
              idCampeonato: id,
            },
          });
          localStorage.removeItem('sorteoRealizado');
          sessionStorage.removeItem('sorteoRealizado');
          // Determinar el equipo ganador
          const equipo = obtenerGanadorFinal(responsePosiciones.data);
          setEquipoGanador(equipo);
          console.log("Equipo Ganador:", equipo);
  
          // 4. Actualizar el estado del campeonato a "Finalizado"
          await axios.patch(`${URL_API}/campeonato/${id}`, {
            estadoCampeonato: "Finalizado",
          });
          console.log('Estado del campeonato actualizado a "Finalizado"');
        } else {
          console.log('Aún no se han jugado todos los partidos.');
        }
      } catch (error) {
        console.error('Error al obtener los resultados o posiciones:', error);
      }
      finally{
        setLoading(false) 
      }
    };
  
    obtenerGanadorYActualizarEstado();
  }, [vsEquipos, id]);

  
const obtenerYGuardarDatos = async () => {
  try {
    setLoading(true);

    // 1. Obtener los equipos
    const response = await axios.get(`${URL_API}/vsInter`, {
      headers: {
        idCampeonato: id,
      },
    });
    setEquipos(response.data);
    setVsEquipos(response.data);

    // 2. Verificar si las posiciones ya se han guardado
    const responsePosiciones = await axios.get(`${URL_API}/posicionesIntercentros`, {
      headers: {
        idCampeonato: id,
      },
    });

    // Solo guarda las posiciones si aún no se han guardado
    if (responsePosiciones.data.length === 0 && !posicionesGuardadas) {
      const equiposUnicos = sacarEquipos(response.data);
      console.log(`equiposUnicosss ${equiposUnicos}`)

      await Promise.all(
        equiposUnicos.map(async (equipo) => {
          return await axios.post(`${URL_API}/posicionesIntercentros`, {
            equipo: equipo,
            idCampeonato: id,
            pts: 0,
            goles: 0,
            amarillas: 0,
            rojas: 0,
          });
        })
      );
      setPosicionesGuardadas(true); // Marcar que las posiciones ya se han guardado
      console.log('Posiciones guardadas correctamente');
    }
  } catch (error) {
    console.error('Error al obtener los datos o guardar posiciones:', error);
  } finally {
    setLoading(false);
  }
};

// Llama a obtenerYGuardarDatos cuando el componente se monta
useEffect(() => {
  obtenerYGuardarDatos();
}, [id]);

  const abrirModal = (id) => {
    setModal(true);
    setidVs(id);
  //   setLoadingImage(true); // Activar el estado de carga cuando se abre el modal

  //   // Simula un pequeño retraso antes de mostrar la nueva imagen
  //   setTimeout(() => {
  //     setLoadingImage(false);
  //   }, 700);
  // 
  };
  
  const cerrarModal = () => {
    setModal(false);
  
  };

  const cerrarModalPosiciones = () => {
    setModalPosiciones(false);
  };

  const resultadosModal = (id) => {
    setModalMirarResultados(true);
    setIdVsResult(id);
  };

  const cerrarModalResultados = () => {
    setModalMirarResultados(false);
  };

  // if (loading) {
  //   return (
      
  //   );
  // }

  return (
    <>
    {/* {
      loading?(
        <div className="flex justify-center items-center h-72">
        <Spinner className="h-12 w-12 text-blue-500" />
      </div>
      ):( */}
        <div className='w-full h-full  bg-white p-4 rounded-lg '>
        <button
          onClick={() => setModalPosiciones(true)}
          className='mt-10 ml-10 px-6 py-3 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50'
        >
          Mirar Posiciones
        </button>
        <section className='flex flex-col gap-11 mt-5 pr-10 pl-10 '>
        <table className="w-full text-sm text-left rtl:text-right border-gray-300 shadow-lg transition-shadow hover:shadow-3xl rounded-xl text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-6 w-1/5 border-r-2 text-center py-3">Fecha</th>
        <th scope="col" className="px-6 w-3/5 border-r-2 text-center py-3">Partidos</th>
        <th scope="col" className="w-1/5 px-6 border-r-2 text-center py-3">Hora</th>
        <th scope="col" className="w-1/5 px-6 text-center py-3">Agregar Resultado</th>
      </tr>
    </thead>
    <tbody>
      {vsEquipos.map((vs, indice) => (
        <tr key={indice} className="bg-white border-b">
          <th scope="row" className="px-6 w-1/5 text-center border-r-2 py-4 font-medium text-gray-900 whitespace-nowrap">
            <h1 className='text-lg text-black font-semibold'>{vs.fecha}</h1>
          </th>
          <td className="px-6 w-3/5 text-center border-r-2 py-4">
            <div className='flex justify-between'>
              <div>
                <img src={vs.equipo1.imgLogo} alt="" className='w-16 h-16' />
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
          <td className="px-6 w-1/5 text-center border-r-2 py-4">
            <h1 className='text-lg text-black font-semibold'>{vs.hora}</h1>
          </td>
          {vs.estado === true ? (
  loading ? (
    <Spinner className="h-10 w-10 text-blue-500" />
  ) : (
    <img onClick={() => abrirModal(vs._id)} src="/public/img/intercentros/planilla.png" alt="" className="w-10 h-10 cursor-pointer" />
  )
) : (
  <img onClick={() => resultadosModal(vs._id)} src="/public/img/intercentros/cumplimiento.png" alt="" className="w-10 h-10 cursor-pointer" />
)}
        </tr>
      ))}
    </tbody>
  </table>

  {/* Mostrar equipo ganador al final de la sección */}
  {equipoGanador && (
    <div className='w-full flex items-center flex-col justify-center mt-10 p-4 rounded-lg bg-blue-100'>
      <h2 className='text-2xl font-bold text-center text-black mb-4'>Equipo Ganador</h2>
      <CardGanador equipo={equipoGanador} />
    </div>
  )}
            <PosicionesIntercentros isOpen={modalPosiciones} close={cerrarModalPosiciones} id={id} />
          <AgregarResultados modal={modal} idCampeonato={id} idVs={idVs} closeModal={cerrarModal} equipos={equipos}/>
          <MirarResultados idVs={idVsResult} isOpen={modalMirarResultados} onClose={cerrarModalResultados} />
        </section>
      </div>

    {/* //   )
    // } */}
        </>
  );
};
