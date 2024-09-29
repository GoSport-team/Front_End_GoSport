import React, { useEffect, useState } from 'react'
import { BuscarPlanillero } from './Modal/BuscarPlanillero'
import axios from 'axios'
import { VerPlanilleroModal } from './Modal/InfoPlanillero'
import { Typography, Spinner } from '@material-tailwind/react';
const URL_API = import.meta.env.VITE_API_URL

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


export const CardVs = ({ vs, cambiosRealizados }) => {
  const [loading, setLoading] = useState(true);
  const notify = (message) => toast(message);
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [nombrePlanillero, setNombrePlanillero] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [guardarExitoso, setGuardarExitoso] = useState(false);
  const [idPlanillero, setIdPlanillero] = useState(null);

  useEffect(() => {
    if (vs) {
      setHora(vs.hora || "");
      setFecha(vs.fecha || "");
      if (vs.idPlanillero) {
        setNombrePlanillero({
          nombre: vs.planilleroNombre || "",
          idPlanillero: vs.idPlanillero,
        });
        setGuardarExitoso(true);
      }
      setLoading(false);
    }
  }, [vs]);

  const handlePlanilleroSeleccionado = (nombre, id) => {
    setNombrePlanillero({
      nombre: nombre,
      idPlanillero: id,
    });
    console.log(`Planillero seleccionado: ${nombre}, ID: ${id}`);
    setOpenModal(false);
    setGuardarExitoso(false); // Reset when new data is selected
  };

  const guardarCronograma = async (id) => {
    const { idPlanillero } = nombrePlanillero;
    if (!hora) {
      return notify("Ingrese hora de juego");
    }
    if (!fecha) {
      return notify("Ingrese fecha de juego");
    }
    const estado = true;
    try {
      const response = await axios.patch(`${URL_API}/vsInter/${id}`, {
        hora,
        fecha,
        idPlanillero: idPlanillero || null,
        estado,
      });
      cambiosRealizados(true);
      if (response.data._id) {
        notify("Datos guardados correctamente");
        setGuardarExitoso(true); // Set this to true to hide the button
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error al guardar el cronograma:", error);
    }
  };

  const abrirModalPlanillero = () => {
    setOpenModal(true);
  };

  const cerrarModalPlanillero = () => {
    setOpenModal(false);
  };

  const abrirModalVerPlanillero = (id) => {
    setIdPlanillero(id);
    setModalOpen(true);
  };

  const closeModalVerPlanillero = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <Spinner className="h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <>
      {vs && (
        <article className="flex flex-col gap-3 w-full p-6 rounded-xl bg-slate-50 border border-gray-300 shadow-lg transition-shadow hover:shadow-3xl">
          <ToastContainer />

          <div className="flex w-full justify-around items-center gap-4">
            <div>
              <img src={vs.equipo1.imgLogo} alt="" className="w-32 h-20" />
              <h1 className="mt-2 text-xl text-center font-semibold text-gray-800">
                {vs.equipo1.nombreEquipo}
              </h1>
            </div>

            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600">
              vs
            </h1>

            <div>
              {vs.equipo2.imgLogo && (
                <img src={vs.equipo2.imgLogo} alt="logoImg" className="w-28 h-20" />
              )}
              <h1 className="text-xl mt-2 text-center font-semibold text-gray-800">
                {vs.equipo2.nombreEquipo}
              </h1>
            </div>
          </div>

          <div className="flex w-full mt-5 gap-11 justify-center items-center flex-row">
            <p className="text-lg flex justify-center items-center flex-col text-gray-700">
              <span className="font-bold text-lg">Fecha de juego</span>
              {vs.fecha ? (
                <span className="font-bold text-lg">{vs.fecha}</span>
              ) : (
                <input type="date" onChange={(e) => setFecha(e.target.value)} className="bg-transparent" />
              )}
            </p>
            <p className="text-lg flex justify-center items-center flex-col text-gray-700">
              <span className="font-bold text-lg">Hora de juego</span>
              {vs.hora ? (
                <span className="font-bold text-lg">{vs.hora}</span>
              ) : (
                <input type="time" onChange={(e) => setHora(e.target.value)} className="bg-transparent" />
              )}
            </p>
          </div>

          {(nombrePlanillero.nombre || vs.idPlanillero) && (
            <div className="flex gap-12 w-full justify-center items-center">
              <p className="text-lg text-gray-700">
                <span className="font-bold text-xl">Planillero</span>
              </p>
              <span className="text-lg font-medium">{nombrePlanillero.nombre}</span>
            </div>
          )}

          <div className="flex mt-5 w-full justify-center items-center gap-6">
            {!vs.idPlanillero ? (
              <button
                onClick={abrirModalPlanillero}
                className="bg-[#12aed1cd] hover:bg-blue-800 text-white py-3 px-2 rounded-lg font-bold drop-shadow-lg shadow-white"
              >
                Agregar Planillero
              </button>
            ) : (
              <button
                onClick={() => abrirModalVerPlanillero(vs.idPlanillero)}
                className="bg-[#12aed1cd] hover:bg-blue-800 text-white py-3 px-2 rounded-lg font-bold drop-shadow-lg shadow-white"
              >
                Ver Planillero
              </button>
            )}

            {/* Show the save button only if the changes haven't been saved yet */}
            {!guardarExitoso && (
              <button
                onClick={() => guardarCronograma(vs._id)}
                className="bg-[#12aed1cd] hover:bg-blue-800 text-white py-3 px-2 rounded-lg font-bold drop-shadow-lg shadow-white"
              >
                Guardar cambios
              </button>
            )}
          </div>

          <BuscarPlanillero
            isOpen={openModal}
            onPlanilleroSeleccionado={handlePlanilleroSeleccionado}
            closeModal={cerrarModalPlanillero}
          />

          <VerPlanilleroModal
            isOpen={modalOpen}
            closeModal={closeModalVerPlanillero}
            idPlanillero={vs.idPlanillero}
          />
        </article>
      )}
    </>
  );
};
