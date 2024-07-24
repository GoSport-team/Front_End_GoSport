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
        console.log(response.data);
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
  console.log(response)
   setCampeonato(response.data)
       

    }catch(error){
  console.error('Error fetching tasks:', error);
  toast.error('Error al abrir el campeonato. Inténtalo de nuevo.');
      }

    }
    
    

  return (
    <div className="mt-10 mb-8 flex flex-col">

      <div className="flex justify-start">
          <button class="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800  text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
        >
          <Link to="/dashboard/tables/view" >
            Crear Campeonato
          </Link>
          </button>
      </div>
  
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nombre Disciplina
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Nombre Campeonato
                  <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg></a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Tipo Campeonato
                  <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg></a>
                </div>
              </th>

              <th scope="col" class="px-6 py-3">
                Action
              </th>


            </tr>
          </thead>
          <tbody>
            {
              tasks.map(task => (
                <tr key={task._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.nombreDisciplinas}
                  </td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.nombreCampeonato}
                  </td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.tipoCampeonato}
                  </td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row gap-x-4">
                    <img src="\public\img\Campeonato\ver.png" alt="img" class="w-7 object-contain"
                    onClick={() => {viewCampeonato(task._id)
                      setModalView(true)  
                    }}
                     />
                    <img src="\public\img\Campeonato\edit.png" alt="img" class="w-7 object-contain"
                     onClick={() =>{
                       setIdUpdate(task._id)
                       viewCampeonato(task._id)
                      setModalUpdate(true)
                     }}
                     />
                    <img src="\public\img\Campeonato\delete.png" alt="img" class="w-7 object-contain"
                    onClick={() => {
                      setSelectedCampeonato(task._id);
                      setIsModalOpen(true);
                  }} />
                  </td>
                  <button class="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800  text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3">
            Publicar
          </button>
                </tr>
              ))
            }
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
             onClose={()=>setModalUpdate(false)} 
             campeonato={campeonato}
              onUpdate={idUpdate}
            />
    </div>
  );
}

export default Tables;
