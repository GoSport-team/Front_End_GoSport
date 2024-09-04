import React, { useState } from "react";

 export const TerminarPartidoModal = ({ isOpen, onClose, agregarResultado ,setModalOpenOk}) => {
    const agregar=()=>{
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
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
       onClick={()=>{agregar()}}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

