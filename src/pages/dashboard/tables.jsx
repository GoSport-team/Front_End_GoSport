import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

import {routes} from "@/routes";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import DeleteCampeonatoModal from '../../widgets/componentes/campeonato/modalEliminarCampeonato'
import ViewCampeonatoModal from '../../widgets/componentes/campeonato/modalVerCampeonato'
import UpdateCampeonato from '../../widgets/componentes/campeonato/modalActualizar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Creado } from "@/widgets/componentes/campeonato/estadosCampeonato/creado";
import { Inscripto } from "@/widgets/componentes/campeonato/estadosCampeonato/inscripto";
export function Tables() {

  const [tasks, setTasks] = useState([]);
  const [selectedCampeonato, setSelectedCampeonato] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[modalView, setModalView]= useState(false)
    const[idUpdate, setIdUpdate]= useState(null)
    const [modalUpdate, setModalUpdate]= useState(false)
    const[campeonato, setCampeonato]= useState([])
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/campeonato');
          setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
 
    const deleteTasks = async () => {
      try {
        const response = await axios.delete(`http://localhost:3001/campeonato/${selectedCampeonato}`);
        console.log(response)
        setIsModalOpen(false);
        toast('Campeonato eliminado exitosamente');
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error al eliminar el campeonato. Inténtalo de nuevo.');
      }
    };

    const viewCampeonato=async(id)=>{
      try{
  const response = await axios.get(`http://localhost:3001/campeonato/${id}`);
  console.log(response.data)
   setCampeonato(response.data)
    }catch(error){
  console.error('Error fetching tasks:', error);
  toast.error('Error al abrir el campeonato. Inténtalo de nuevo.');
      }

    }
 

  
    
    

  return (
    <div className="mt-10 mb-8 flex flex-col">
    <div className="flex justify-start">
      <button className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3">
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
              />
              <Inscripto
                tasks={task} 
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
    />
    <ToastContainer />
    <ViewCampeonatoModal
      isOpen={modalView}
      onClose={() => setModalView(false)}
      campeonato={campeonato}
    />
    <UpdateCampeonato
      isOpen={modalUpdate}
      onClose={() => setModalUpdate(false)}
      campeonato={campeonato}
      onUpdate={idUpdate}
    />
  </div>
  );
}

export default Tables;
