import VerJugadores from "../../widgets/componentes/Participantes/View";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Participantes from '@/widgets/componentes/Participantes/index';
import { ModalInscribirCampeonato } from '@/widgets/componentes/campeonato/modalInscribirCampeonato';
import { EliminarEquipo } from "@/widgets/componentes/Participantes/eliminarEquipo";

export const Participante = () => {
  const IdCampeonato = localStorage.getItem('ID');
  const [equipoInscripto, setEquipoInscripto] = useState([]);
  const [estadoBoton, setEstadoBoton] = useState(true);
  const [estadoFase, setEStadoFase] = useState(false);
  const [nombreFase, setNombreFase] = useState("Fase 1");
  const [idFases, setIdFase] = useState();
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [showConfirmModalEliminar, setShowConfirmModalEliminar]= useState(false)
  const [idInscripto,setIdInscripto]= useState('')
  const [estadoAgregar, setEstadoAgregar]=useState(true)
  const [isLoading, setIsLoading] = useState(true); 
const [agregarEquipo, setAgregarEquipo]= useState(false)
const [estadoCam, setEstadoCam]=useState('Ejecucion')

const handleSubmit = async () => {
  try {
      await axios.patch(`http://localhost:3001/campeonato/${IdCampeonato}`,
        {estadoCampeonato: estadoCam}
       );
  } catch (error) {
      console.error('Error public campeonato:', error);
  }
};
useEffect(()=>{
  const condicion =()=>{

    if (equipoInscripto.length >= 3) {
    setEstadoBoton(true)
            } else {
     setEstadoBoton(false) 
    }
  }
  condicion()

},[equipoInscripto])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('http://localhost:3001/equipoInscripto', {
          headers: {
            id: IdCampeonato,
          },
        });
        setEquipoInscripto(data);
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false)
      }
    };
    fetchData();
  }, [IdCampeonato]);

 
  const sortearEquipos = async () => {
    try {
      
      localStorage.setItem('estadoFase', estadoFase);
      const fase = await axios.post('http://localhost:3001/fase', { estado: estadoFase, nombre: nombreFase, idCampeonato: IdCampeonato });
      const idFase = fase.data._id;
      setIdFase(idFase);
      const dataVs = {
        equipos: equipoInscripto,
        IdFase: idFase
      };
      localStorage.setItem('IdFase', idFase);
      const equiposSorteados = await axios.post('http://localhost:3001/vs', { dataVs });
      console.log(equiposSorteados);
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
    {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white">Cargando ...</div>
        </div>
      )}
      <div className="p-4">
        {equipoInscripto && equipoInscripto.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
            {equipoInscripto.map((equipo) => (
              <div key={equipo._id} className="flex justify-center items-center z-0">
               <Participantes equipo={equipo.Equipo} id={equipo._id} modal={() => openModal(equipo.Equipo)}  setShowConfirmModalEliminar={setShowConfirmModalEliminar} setIdInscripto={setIdInscripto} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 text-4xl font-bold text-center">
            No hay equipos inscritos
          </p>
        )}{
          showConfirmModalEliminar&&(

            <EliminarEquipo  showConfirmModal={showConfirmModalEliminar}  id={idInscripto} setShowConfirmModalEliminar={setShowConfirmModalEliminar}
            setIsLoadingPar={setIsLoading}/>
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
        <ModalInscribirCampeonato setAgregarEquipo={setAgregarEquipo} onAgregarEquipo={handleAgregarEquipo} />
      )}
        
          <div className="flex space-x-4">
           
        <button
        onClick={()=>setAgregarEquipo(true)}
        className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
        >
          Agregar Equipo
        </button>
        { estadoBoton && (
          <button
          onClick={()=>handleSortearClick()}
          className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3" 
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
              <button
                onClick={handleConfirmSortear}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                <Link to="/campe/cronograma"    >Ok</Link>
              </button>
              <button
                onClick={handleCancelSortear}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
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
