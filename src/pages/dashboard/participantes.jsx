<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Participantes from '@/widgets/componentes/Participantes/index';
import { ModalInscribirCampeonato } from '@/widgets/componentes/campeonato/modalInscribirCampeonato';

export const Participante = () => {
  const IdCampeonato = localStorage.getItem('ID');
  const [equipoInscripto, setEquipoInscripto] = useState([]);
  const [estadoBoton, setEstadoBoton] = useState(true);
  const [estadoFase, setEStadoFase] = useState(true);
  const [nombreFase, setNombreFase] = useState("Fase 1");
  const [idFases, setIdFase] = useState();
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [agregarEquipo, setAgregarEquipo]= useState(false)

  useEffect(() => {
    const storedEstadoBoton = localStorage.getItem('sorteo');
    if (storedEstadoBoton !== null) {
      setEstadoBoton(JSON.parse(storedEstadoBoton));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/equipoInscripto', {
          headers: {
            id: IdCampeonato,
          },
        });
        setEquipoInscripto(data);
        useEffect(()=>{

          if (data.length >= 3) {
            localStorage.setItem('sorteo', JSON.stringify(true));
          } else {
            localStorage.setItem('sorteo', JSON.stringify(false));
          }
        })
      } catch (error) {
        console.log(error);
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
        localStorage.setItem('sorteo', JSON.stringify(false));
      }
    } catch (error) {
      console.log(error);
      setError("Error al sortear. Intente nuevamente.");
    }
  };
=======
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Participantes from '@/widgets/componentes/Participantes/index';
  import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from '@material-tailwind/react';
  import VerJugadores from "../../widgets/componentes/Participantes/View";

  export const Participante = () => {
    const IdCampeonato = localStorage.getItem('ID');
    const [equipoInscripto, setEquipoInscripto] = useState([]);
    const [estadoBoton, setEstadoBoton]=useState(true)
    const [estadoFase, setEStadoFase]= useState(true)
    const [nombreFase, setNombreFase]= useState("Fase 1")
    const [idFases, setIdFase]= useState()
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipo, setSelectedEquipo] = useState(null);
  
    const openModal = (equipo) => {
      setSelectedEquipo(equipo);
      setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const idCampeonato = localStorage.getItem('ID');
          const { data } = await axios.get('http://localhost:3001/equipoInscripto', {
            headers: {
              id: idCampeonato,
            },
          });
          setEquipoInscripto(data);
          if(data.length>=3){
            setEstadoBoton(true)
          }else{
            setEstadoBoton(false)
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);



    const sortearEquipos = async()=>{
      try{
        localStorage.setItem('estadoFase', estadoFase)
        const fase = await axios.post('http://localhost:3001/fase', { estado:estadoFase,nombre: nombreFase, idCampeonato:IdCampeonato });
        const idFase = fase.data._id;
        setIdFase(idFase) 
        const dataVs = {
          equipos: equipoInscripto,
          IdFase: idFase
        };
        localStorage.setItem('IdFase', idFase)
        const equiposSorteados=  await axios.post('http://localhost:3001/vs',{dataVs:dataVs})
        console.log(equiposSorteados)
        if(equiposSorteados.data){
          setEstadoBoton(false)
        }
      
      }catch(error){
        console.log(error)
        setError("Error al sortear. Intente nuevamente.");
      }
    }
  
>>>>>>> 08a82c163f00acc8a491e082c5970256064f7f9a

  const handleSortearClick = () => {
    setShowConfirmModal(true); 
  };

  const handleConfirmSortear = () => {
    sortearEquipos();
    setShowConfirmModal(false);
    setEstadoBoton(false) 
  };

  const handleCancelSortear = () => {
    setShowConfirmModal(false); 
  };

<<<<<<< HEAD
  return (
    <>
      <div className="p-4">
        {equipoInscripto && equipoInscripto.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
            {equipoInscripto.map((equipo) => (
              <div key={equipo._id} className="flex justify-center items-center z-0">
                <Participantes equipo={equipo}  />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 text-4xl font-bold text-center">
            No hay equipos inscritos
          </p>
        )}
      </div>
      <div className="flex justify-center space-x-4 mx-6 my-4">
        {agregarEquipo &&(
        <ModalInscribirCampeonato setAgregarEquipo={setAgregarEquipo}/>
      )}
        {estadoBoton && (
          <div>
        <button
        onClick={()=>setAgregarEquipo(true)}
          className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
        >
          Agregar Equipo
        </button>
          <button
            onClick={handleSortearClick}
=======
    return (
      <>
      <section>
      <div className="p-4 relative ">
          {equipoInscripto && equipoInscripto.length > 0 ? (
            <div className="static grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 ">
              {equipoInscripto.map((equipo) => (
                <div key={equipo._id} className="flex justify-center items-center z-0 relative ">
                  <Participantes equipo={equipo} modal={() => openModal(equipo.Equipo)} />
                  
                </div>
                
              ))}
          
            </div>
          ) : (
            <p className="text-red-600 text-4xl font-bold text-center">
              No hay equipos inscritos
            </p>
          )}
            {selectedEquipo && (
              <div className='p-5'>
                   <VerJugadores isOpen={isModalOpen} onClose={closeModal} equipo={selectedEquipo} />
              </div>
               
            )}
        </div>
        <div className="flex justify-center space-x-4 mx-6 my-4">
          <button
          
            className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
          >
            Agregar Equipo
          </button>
          { estadoBoton &&(
          <button
          onClick={sortearEquipos}
>>>>>>> 08a82c163f00acc8a491e082c5970256064f7f9a
            className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
          >
            Sortear
          </button>
<<<<<<< HEAD
          </div>
        )}
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
                OK
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
    </>
  );
};
=======
          )}
        
        </div>
        {error&& (
                  <div className="text-red-600 text-center font-bold">
                      {error}
                  </div>
              )}
        

      </section>
        
      </>
    );
  };
>>>>>>> 08a82c163f00acc8a491e082c5970256064f7f9a
