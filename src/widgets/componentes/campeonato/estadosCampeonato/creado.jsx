import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Creado = ({ tasks, viewCampeonato, setModalView, setIdUpdate, setModalUpdate, setSelectedCampeonato, setIsModalOpen }) => {
  const [estado, setEstado]= useState('')
  const[creado, setCreado]= useState()
 useEffect(()=>{
  if(tasks.estadoCampeonato=='Creado'){
    setEstado('Inscripto')
    setCreado(true)
  }
 })
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      await axios.patch(`http://localhost:3001/campeonato/${tasks._id}`,
        {estadoCampeonato: estado}
       );
      toast.success('Campeonato actualizado exitosamente');
      setCreado(false)
  } catch (error) {
      console.error('Error public campeonato:', error);
      toast.error('Error al publicar el campeonato. Inténtalo de nuevo.');
  }
};
  return (
    <>

{creado && (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          
        </thead>
        <tbody>
          {tasks && (
              <tr key={tasks._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row gap-x-4">
                  <img
                    src="/public/img/Campeonato/ver.png"
                    alt="Ver"
                    className="w-7 object-contain"
                    onClick={() => {
                      viewCampeonato(tasks._id);
                      setModalView(true);
                    }}
                  />
                  <img
                    src="/public/img/Campeonato/edit.png"
                    alt="Editar"
                    className="w-7 object-contain"
                    onClick={() => {
                      setIdUpdate(tasks._id);
                      viewCampeonato(tasks._id);
                      setModalUpdate(true);
                    }}
                  />
                  <img
                    src="/public/img/Campeonato/delete.png"
                    alt="Eliminar"
                    className="w-7 object-contain"
                    onClick={() => {
                      setSelectedCampeonato(tasks._id);
                      setIsModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            
          ) }
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
        >
          Publicar
        </button>
      </form>
    </div>
)}
      
</>
  )
}
