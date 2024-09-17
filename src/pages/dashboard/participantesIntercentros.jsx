import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CardEquipo } from '../../widgets/componentes/Intercentros/CardEquipo';
import { SorteoEquiposInter } from '../../utils/Intercentros/SorteoEquiposInter';
import { Typography, Spinner } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ParticipantesIntercentros = () => {
  const notify = (message) => toast(message);
  const { id } = useParams();
  const [cedulaEquipo, setCedulaEquipo] = useState('');
  const [equipos, setEquipos] = useState([]);
  const [equiposInscritos, setEquiposInscritos] = useState([]);
  const [sorteo, setSorteo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sorteoEnProgreso, setSorteoEnProgreso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the sorteo was already done
    if (sessionStorage.getItem('sorteoRealizado') === 'true') {
      navigate(`/campe/cronogramaIntercentros/${id}`);
    } else {
      fetchEquiposInscritos();
    }
  }, []);

  const fetchEquiposInscritos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/equipoInscripto', {
        headers: { id },
      });
      console.log('Respuesta del backend (equiposInscritos):', response.data);
      setEquiposInscritos(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const eliminarEquipo = async (idEquipo) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/equipoInscripto/idEquipo/${idEquipo}`);
      notify('Eliminado correctamente');
      // Update the equiposInscritos list after deletion
      const updatedEquiposResponse = await axios.get('http://localhost:3001/equipoInscripto', {
        headers: { id },
      });
      setEquiposInscritos((prev) => prev.filter((e) => e.Equipo._id !== idEquipo));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchEquipo = async (cedula) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${cedula}`);
      console.log('Respuesta al buscar equipo:', response.data);
      if (response.data === 'EQUIPO NO ENCONTRADO') {
        notify('Equipo no encontrado');
      } else {
        notify('Equipo encontrado correctamente');
        const equipo = response.data.equipo;
        if (!equiposInscritos.some((e) => e.Equipo._id === equipo._id)) {
          await axios.post('http://localhost:3001/equipoInscripto', {
            Equipo: equipo,
            idCampeonato: id,
          });
          setEquiposInscritos((prev) => [...prev, { Equipo: equipo }]);
        } else {
          notify('El equipo ya está inscrito.');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (equiposInscritos.length >= 3) {
      setSorteo(true);
    } else {
      setSorteo(false);
    }
  }, [equiposInscritos]);

  const sorteoIntercentros = async () => {
    if (equiposInscritos.length >= 3) {
      setSorteoEnProgreso(true);
      const data = {
        equipos: equiposInscritos,
        idCampeonato: id,
      };

      try {
        console.log('Data para sorteo:', data);  
        await SorteoEquiposInter(data);
        sessionStorage.setItem('sorteoRealizado', 'true'); // Set sessionStorage after successful sorteo
        navigate(`/campe/cronogramaIntercentros/${id}`);
      } catch (error) {
        console.log('Error en el sorteo:', error);
        notify('Ocurrió un error durante el sorteo.');
      } finally {
        setSorteoEnProgreso(false);
      }
    } else {
      notify('Debe haber al menos 3 equipos inscritos para proceder con el sorteo.');
    }
  };

  return (
    <div className='bg-white rounded-xl w-full h-screen m-3 flex flex-col justify-center items-center'>
      <ToastContainer />
      <Typography className='m-4 text-center font-bold text-2xl'>Buscar equipo</Typography>
      <article className='w-full flex flex-col justify-center items-center'>
        {loading ? (
          <div className="flex justify-center items-center h-72">
            <Spinner className='h-12 w-12 text-blue-500' />
          </div>
        ) : (
          <div className='w-full'>
            {sorteo ? (
              ''
            ) : equipos.length < 3 && equiposInscritos.length < 3 ? (
              <form className="w-full mt-5">
                <div className='w-full flex justify-center items-center'>
                  <label htmlFor="buscar_equipo" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative w-2/4">
                    <input
                      type="search"
                      id="buscar_equipo"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Busca el equipo por numero de cedula"
                      required
                      onChange={(e) => setCedulaEquipo(e.target.value)}
                    />
                    <button type="button"
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                      onClick={() => searchEquipo(cedulaEquipo)} >
                      Buscar
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <Typography className='text-center text-lg'>Total de equipos completado !!</Typography>
            )}
            <div className='w-full grid grid-cols-3 gap-4 p-6'>
              {loading ? (
                <div className="flex justify-center items-center h-72">
                  <Spinner className="h-12 w-12 text-blue-500" />
                </div>
              ) : equipos.length > 0 ? (
                equipos.map((equipo, index) => (
                  <CardEquipo key={index} equipo={equipo} eliminarEquipo={eliminarEquipo} />
                ))
              ) : (
                equiposInscritos.map((equipo, index) => (
                  <CardEquipo key={index} equipo={equipo.Equipo} eliminarEquipo={eliminarEquipo} />
                ))
              )}
            </div>
          </div>
        )}
        {!sorteoEnProgreso && sorteo && (
          <div className='flex justify-center'>
            <button
              onClick={sorteoIntercentros}
              className='mt-5 bg-black font-medium bg-[#12aed1cd] hover:bg-blue-800 text-white py-5 px-2 rounded-md'>
              Sortear Equipos
            </button>
          </div>
        )}
        {sorteoEnProgreso && (
          <div className="flex justify-center items-center mt-5">
            <Spinner className='h-12 w-12 text-blue-500' />
            <Typography className="ms-4">Realizando sorteo...</Typography>
          </div>
        )}
      </article>
    </div>
  );
};
