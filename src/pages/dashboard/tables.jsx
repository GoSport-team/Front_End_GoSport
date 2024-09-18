
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteCampeonatoModal from '../../widgets/componentes/campeonato/modalEliminarCampeonato'
import ViewCampeonatoModal from '../../widgets/componentes/campeonato/modalVerCampeonato'
import UpdateCampeonato from '../../widgets/componentes/campeonato/modalActualizar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Creado } from "@/widgets/componentes/campeonato/estadosCampeonato/creado";
import { Inscripto } from "@/widgets/componentes/campeonato/estadosCampeonato/inscripto";
import { Ejecucion } from "@/widgets/componentes/campeonato/estadosCampeonato/ejecucion";
import { Finalizacion } from '@/widgets/componentes/campeonato/estadosCampeonato/finalizado';
import {
  Typography,

} from "@material-tailwind/react";
const URL_API = import.meta.env.VITE_API_URL
export function Tables() {
  const [tasks, setTasks] = useState([]);
  const [selectedCampeonato, setSelectedCampeonato] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[modalView, setModalView]= useState(false)
    const[idUpdate, setIdUpdate]= useState(null)
    const [modalUpdate, setModalUpdate]= useState(false)
    const[campeonato, setCampeonato]= useState([])
   const [controlador, setControlador]= useState()
    
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${URL_API}/campeonato`);
        
          setTasks(response.data);
          setControlador(true)
          
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();

  });
 
    const deleteTasks = async () => {
      try {
        const response = await axios.delete(`${URL_API}/campeonato/${selectedCampeonato}`);
        console.log(response)
        setIsModalOpen(false);
        setControlador(true)
        toast('Campeonato eliminado exitosamente');
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error al eliminar el campeonato. Inténtalo de nuevo.');
      }finally{
        setControlador(false)
      }
    };

    const viewCampeonato=async(id)=>{
      try{
  const response = await axios.get(`http://localhost:3001/campeonato/${id}`);
  console.log(response.data)
   setCampeonato(response.data)
   setControlador(true)
    }catch(error){
  console.error('Error fetching tasks:', error);
  toast.error('Error al abrir el campeonato. Inténtalo de nuevo.');
      }

    }
  return (
    <>
      <div className="mb-8 flex flex-col ">
        
        <Typography variant="h6" color="blue-gray" className="text-3xl mb-10 text-center">
          Visualiza, crea y administra todos los campeonatos desde aquí.
        </Typography>

    <div className="flex justify-start mb-4">
      <button class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        <Link to="/dashboard/tables/view">Crear Campeonato</Link>
      </button>
    </div>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-6 py-3">Nombre Disciplina</th>
        <th className="px-6 py-3">Nombre Campeonato</th>
        <th className="px-6 py-3">Tipo Campeonato</th>
        <th className="px-6 py-3">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <tr key={task._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {task.nombreDisciplinas}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {task.nombreCampeonato}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {task.tipoCampeonato}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              
              <Creado
                tasks={task} 
                viewCampeonato={viewCampeonato}
                setModalView={setModalView}
                setIdUpdate={setIdUpdate}
                setModalUpdate={setModalUpdate}
                setSelectedCampeonato={setSelectedCampeonato}
                setIsModalOpen={setIsModalOpen}
                setControlador={setControlador}
                controlador={controlador}
              />
              <Inscripto
                tasks={task} 
                setControlador={setControlador}
                controlador={controlador}
              />
              <Ejecucion
              tasks={task}
              setControlador={setControlador}
              controlador={controlador} />
              <Finalizacion
              tasks={task}
              setControlador={setControlador}
              controlador={controlador}
              />
          
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="text-center py-4">
            <h1>No hay campeonatos creados</h1>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    <DeleteCampeonatoModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onDelete={deleteTasks}
      campeonatoName={selectedCampeonato ? selectedCampeonato.nombreCampeonato : ''}
      setControlador={setControlador}
      controlador={controlador}
    />
    <ToastContainer />
    <ViewCampeonatoModal
      isOpen={modalView}
      onClose={() => setModalView(false)}
      campeonato={campeonato}
      setControlador={setControlador}
      controlador={controlador}
    />
    <UpdateCampeonato
      isOpen={modalUpdate}
      onClose={() => setModalUpdate(false)}
      campeonato={campeonato}
      onUpdate={idUpdate}
      setControlador={setControlador}
      controlador={controlador}
    />
  </div>
    </>
      );

}

export default Tables;
