import React, { useState } from 'react';
import axios from "axios";
import {
    Spinner,
  } from "@material-tailwind/react";
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';     
export const ConfirmarGuardar = ({ confirmarCambios, cerrarModal, idVs, fecha, hora }) => {
    const notify = (message)=> toast(message);
    const [loading, setLoading]= useState(false)
  const editarFechasHoras = async () => {
    if(!fecha || !hora){
        try{
            notify('Ingrese hora o fecha')
        }catch(error){
            console.log(error)
        }
    }else{
        try {
        setLoading(true);
          const patch = await axios.patch(`http://localhost:3001/vs/${idVs}`, { fecha, hora });
          console.log(patch);
          setLoading(false)
          confirmarCambios(false)
        } catch (error) {
          console.log(`${error} revise`);
        }
      };
    
    }

  const handleConfirmar = () => {
    editarFechasHoras();
  };

  const handleCerrarModal = () => {
    cerrarModal(false);
  };

  return (
    <div>
      <>
      <ToastContainer/>
        {confirmarCambios && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Confirmación</h3>
              <p className="mt-2">¿Está seguro de que desea guardar cambios?</p>
              <div className="flex justify-end mt-4">
                {
                    loading ?(
                        <div className="flex justify-center items-center h-72">
                        <Spinner />
                      </div>
                    ):(
                        <div>
                            <button
                  onClick={handleConfirmar}
                  class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  OK
                </button>
                <button
                  onClick={handleCerrarModal}
                          className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancelar
                </button>
                        </div>
                    )
                }
                
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
