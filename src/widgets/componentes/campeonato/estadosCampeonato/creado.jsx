import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const URL_API = import.meta.env.VITE_API_URL
export const Creado = ({ tasks, viewCampeonato, setModalView, setIdUpdate, setModalUpdate, setSelectedCampeonato, setIsModalOpen , setControlador}) => {
  const [estado, setEstado]= useState('Inscripcion')
  const[creado, setCreado]= useState()
 useEffect(()=>{
  if(tasks.estadoCampeonato=='Creado'){
    setCreado(true)
  }
 },[])
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      await axios.patch(`${URL_API}/campeonato/${tasks._id}`,
        {estadoCampeonato: estado}
       );
      toast.success('Campeonato actualizado exitosamente');
      setControlador(true)
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
                    src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727106938/txevxhtclh1jqr7loprf.png"
                    alt="Ver"
                    className="w-7 object-contain"
                    onClick={() => {
                      viewCampeonato(tasks._id);
                      setModalView(true);
                    }}
                  />
                  <img
                    src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727106938/txevxhtclh1jqr7loprf.png"
                    alt="Editar"
                    className="w-7 object-contain"
                    onClick={() => {
                      setIdUpdate(tasks._id);
                      viewCampeonato(tasks._id);
                      setModalUpdate(true);
                    }}
                  />
                  <img
                    src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727106963/zhbrf5bbz3yecncnpmey.png"
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
          class="w-44 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Publicar
        </button>
      </form>
    </div>
)}
      
</>
  )
}
