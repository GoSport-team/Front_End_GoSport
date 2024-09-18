import VerJugadores from "../../widgets/componentes/Participantes/View";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Participantes from '@/widgets/componentes/Participantes/index';
import { ModalInscribirCampeonato } from '@/widgets/componentes/campeonato/modalInscribirCampeonato';
import { EliminarEquipo } from "@/widgets/componentes/Participantes/eliminarEquipo";
const URL_API = import.meta.env.VITE_API_URL
export const Participante = () => {
  const IdCampeonato = localStorage.getItem('ID');
  const [equipoInscripto, setEquipoInscripto] = useState([]);
  const [estadoBoton, setEstadoBoton] = useState(true);
  const [estadoFase, setEStadoFase] = useState(true);
  const [nombreFase, setNombreFase] = useState(1);
  const [idFases, setIdFase] = useState();
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [showConfirmModalEliminar, setShowConfirmModalEliminar]= useState(false)
  const [idInscripto,setIdInscripto]= useState('')
  const [isLoading, setIsLoading] = useState(true); 
const [agregarEquipo, setAgregarEquipo]= useState(false)
const [botonEliminar, setBotonEliminar]= useState()
const [botonAgregar, setBotonAgregar]= useState()
const [estadoCam, setEstadoCam]=useState('Ejecucion')
const [controlador, setControlador]= useState()


useEffect(()=>{
const botonSorteo= async()=>{
  const response = await axios.get(`${URL_API}/fase`,{
    headers:{
     id:IdCampeonato,
    }
    
  }
)

if(!response.data[0] && equipoInscripto.length >= 3)  {
setEstadoBoton(true)
}else if(!response.data[0]){
  setEstadoBoton(false)
 setBotonEliminar(true)
 setBotonAgregar(true)
}else{
  setEstadoBoton(false)
  setBotonAgregar(false)
  setBotonEliminar(false)
}
}
botonSorteo()
},[equipoInscripto])

const handleSubmit = async () => {
  try {
      await axios.patch(`${URL_API}/campeonato/${IdCampeonato}`,
        {estadoCampeonato: estadoCam}
       );
  } catch (error) {
      console.error('Error public campeonato:', error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/equipoInscripto`, {
          headers: {
            id: IdCampeonato,
          },
        });
        setEquipoInscripto(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }finally{
      
      }
    };
    fetchData();
  },[controlador]);
 
  const sortearEquipos = async () => {
    try {
      localStorage.setItem('estadoFase', estadoFase);
      const fase = await axios.post(`${URL_API}/fase`, { estado: estadoFase, nombre: nombreFase, idCampeonato: IdCampeonato });
      const idFase = fase.data._id;
      setIdFase(idFase);
      const dataVs = {
        equipos: equipoInscripto,
        IdFase: idFase,
        idCampeonato: IdCampeonato
      };
      console.log("datos vs", dataVs)
      localStorage.setItem('IdFase', idFase);
      localStorage.setItem('nombreFase', nombreFase)
      const equiposSorteados = await axios.post(`${URL_API}/vs`, { dataVs });
      console.log(equiposSorteados)
      if (equiposSorteados.data) {
        setIsLoading(true);
      }else{
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError("Error al sortear. Intente nuevamente.");
    }finally {
      setIsLoading(false); 
    }
  };
    const openModal = (equipo) => {
      setSelectedEquipo(equipo);
      setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

  const handleSortearClick = () => {
    setShowConfirmModal(true); 
  };

  const handleConfirmSortear = () => {
    localStorage.setItem('IdFase', idFases);
    localStorage.setItem('ID', IdCampeonato)
    localStorage.setItem('nombreFase', nombreFase)
    sortearEquipos();
    handleSubmit()
    setShowConfirmModal(false);
    setEstadoBoton(false)
  };

  const handleCancelSortear = () => {
    setShowConfirmModal(false); 
  };
  const handleAgregarEquipo = (nuevoEquipo) => {
    setEquipoInscripto([...equipoInscripto, nuevoEquipo]);
  };

  return (
    <>
    <section>
   
      <div className="p-4 ">
        {equipoInscripto && equipoInscripto.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
            {equipoInscripto.map((equipo) => (
              <div key={equipo._id} className="flex justify-center items-center z-0">
               <Participantes equipo={equipo.Equipo} id={equipo._id} modal={() => openModal(equipo.Equipo)}  setShowConfirmModalEliminar={setShowConfirmModalEliminar} setIdInscripto={setIdInscripto} botonEliminar={botonEliminar} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-black text-4xl font-bold text-center opacity-75">
            No hay equipos inscritos
          </p>
        )}{
          showConfirmModalEliminar&&(

            <EliminarEquipo  showConfirmModal={showConfirmModalEliminar}  id={idInscripto} setShowConfirmModalEliminar={setShowConfirmModalEliminar}
            setIsLoadingPar={setIsLoading} setControlador={setControlador}/>
          )
        }
 {selectedEquipo && (
              <div className='p-5'>
                   <VerJugadores isOpen={isModalOpen} onClose={closeModal} equipo={selectedEquipo} />
              </div>
               
            )}
      </div>
    
      <div className="flex justify-center space-x-4 mx-6 my-4">
        {agregarEquipo &&(
        <ModalInscribirCampeonato setAgregarEquipo={setAgregarEquipo} onAgregarEquipo={handleAgregarEquipo} setControlador={setControlador}/>
      )}
        
          <div className="flex space-x-4">
        {botonAgregar&&(
          <button
        onClick={()=>setAgregarEquipo(true)}
        className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Agregar Equipo
        </button>
        )}   
        
        { estadoBoton && (
          <button
          onClick={()=>handleSortearClick()}
          className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
          >   Sorteo
          </button>
        )}

          </div>
      </div>
      {error && (
        <div className="text-red-600 text-center font-bold">
          {error}
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Confirmación</h3>
            <p className="mt-2">¿Está seguro de que desea sortear los equipos?</p>
            <div className="flex justify-end mt-4">
              
              <Link to={'/campe/cronograma'}
                onClick={()=>handleConfirmSortear()}
                className="mr-3  select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                ok
              </Link>
              <button
                onClick={handleCancelSortear}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancelar
              </button>
            </div> 
          </div>
        </div>
      )}
        {error&& (
                  <div className="text-red-600 text-center font-bold">
                      {error}
                  </div>
              )}
              </section>
      </>
    );
  };
