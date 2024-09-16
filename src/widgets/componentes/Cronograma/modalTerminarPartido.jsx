import React, { useState } from "react";


 export const TerminarPartidoModal = ({ isOpen, onClose, agregarResultado ,setModalOpenOk,setBoton}) => {
    const agregar=()=>{
      setBoton(false)
        agregarResultado()
        setModalOpenOk(false)
    
    }
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">¿Estás seguro de terminar el partido?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancelar
          </button>
          <button
       onClick={()=>{agregar()}}
            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

