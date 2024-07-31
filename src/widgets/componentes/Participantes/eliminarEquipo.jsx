import axios from 'axios'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EliminarEquipo = ({ showConfirmModal, id, setShowConfirmModalEliminar}) => {
    const notify=(mensaje)=>toast(mensaje)
    const eliminarEquipo=async()=>{
        try{
    const equipoEliminado = await axios.delete(`http://localhost:3001/equipoInscripto/${id}`)
    
    notify('Equipo eliminado exitosamente');
         } catch(error){
            console.log(error)
         }
        }
          const handleConfirmEliminar = () => {
           eliminarEquipo()
           setShowConfirmModalEliminar(false);
          };
          const handleCancelEliminar = () => {
            setShowConfirmModalEliminar(false); 
          };
  return (
    <>
    <ToastContainer/>
    {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Confirmación</h3>
            <p className="mt-2">¿Está seguro de que desea sortear los equipos?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmEliminar}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                OK
              </button>
              <button
                onClick={handleCancelEliminar}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  )
}
