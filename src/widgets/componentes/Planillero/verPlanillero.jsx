import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');
export const VerPlanillero = ({modalIsOpen, closeModal, planillero}) => {


    const [controler, setControler]= useState()
   
 
   
    //console.log(planillero)
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="flex justify-center items-center h-screen w-auto ml-36" overlayClassName="fixed inset-0 bg-black bg-opacity-50">
  
  <div className="max-w-md mx-auto bg-white w-full p-10 rounded-lg flex flex-col justify-center items-center"> 
   
    {planillero&&(
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Información del Usuario</h2>
        <div className="mb-2">
            <strong>Nombre:</strong> {planillero.nombres}
        </div>
        <div className="mb-2">
            <strong>Identificación:</strong> {planillero.identificacion}
        </div>
        <div className="mb-2">
            <strong>Correo:</strong> {planillero.correo}
        </div>
        <div className="mb-2">
            <strong>Teléfono:</strong> {planillero.telefono}
        </div>
    </div>
    )}
  <button onClick={()=>closeModal()}className="w-44 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Cerrar</button></div>
</Modal>
  )
}
