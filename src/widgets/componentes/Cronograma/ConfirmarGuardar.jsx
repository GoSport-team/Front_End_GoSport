import React, { useState } from 'react';
import axios from "axios";
import {
    Spinner,
  } from "@material-tailwind/react";
export const ConfirmarGuardar = ({ confirmarCambios, cerrarModal, idVs, fecha, hora }) => {
    const [loading, setLoading]= useState(false)
  const editarFechasHoras = async () => {
    setLoading(true);
    try {
      const patch = await axios.patch(`http://localhost:3001/vs/${idVs}`, { fecha, hora });
      console.log(patch);
      setLoading(false)
      confirmarCambios(false)
    } catch (error) {
      console.log(`${error} revise`);
    }
  };

  const handleConfirmar = () => {
    editarFechasHoras();
  };

  const handleCerrarModal = () => {
    cerrarModal(false);
  };

  return (
    <div>
      <>
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                >
                  OK
                </button>
                <button
                  onClick={handleCerrarModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
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
