import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EliminarEquipo = ({ showConfirmModal, id, setShowConfirmModalEliminar ,setIsLoadingPar, setControlador}) => {


  const eliminarEquipo = async () => {
    try {
      setIsLoadingPar(true)
      const response = await axios.delete(`http://localhost:3001/equipoInscripto/${id}`);
      console.log(response)
      setControlador(true)
      if (response.data.acknowledged) {
        toast.success('Equipo eliminado con éxito');
        setControlador(true)
      } else {
        toast.error('Hubo un problema al eliminar el equipo');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar el equipo');
    } finally {
      setIsLoadingPar(false);
      setControlador(false)
    }
  };

  const handleConfirmEliminar = () => {
    eliminarEquipo();
    setControlador(true)
    setShowConfirmModalEliminar(false);
  };

  const handleCancelEliminar = () => {
    setShowConfirmModalEliminar(false);
    setControlador(false)
  };

  return (
    <>
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Confirmación</h3>
            <p className="mt-2">¿Está seguro de que desea eliminar el equipo?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmEliminar}
                class="mr-5 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                OK
              </button>
              <button
                onClick={handleCancelEliminar}
                className="px-4 py-2 bg-red-400 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};
