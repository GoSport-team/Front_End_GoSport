import { useState, useEffect } from 'react';
import axios from 'axios';

export const VerPlanilleroModal = ({ isOpen, closeModal, idPlanillero }) => {
  const [planillero, setPlanillero] = useState(null);

  useEffect(() => {
    if (idPlanillero) {
      obtenerPlanillero(idPlanillero);
      console.log(`idPlanillero : ${idPlanillero}`)
    }
  }, [idPlanillero]);

  const obtenerPlanillero = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/usuarios/id/${id}`);
      setPlanillero(response.data);
      console.log(planillero)
    } catch (error) {
      console.error("Error al obtener planillero", error);
    }
  };

  return (
    <>
      {isOpen && planillero && (
        <div className="bg-black/60 fixed inset-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Información del Planillero</h2>
            </div>
            <div className="p-4 space-y-4">
              {/* Mostrar foto del planillero */}
              {/* <div className="flex justify-center">
                <img src={planillero.url_foto} alt="Foto del Planillero" className="rounded-full w-32 h-32 object-cover" />
              </div> */}
              
              <p><strong>Nombre:</strong> {planillero.nombres}</p>
              <p><strong>Correo:</strong> {planillero.correo}</p>
              <p><strong>Identificación:</strong> {planillero.identificacion}</p>
              <p><strong>Teléfono:</strong> {planillero.telefono}</p>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button onClick={closeModal} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
