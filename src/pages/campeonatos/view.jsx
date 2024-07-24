import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCampeonato = () => {
    const [nombreDisciplinas, setNombreDisciplinas] = useState('');
    const [nombreCampeonato, setNombreCampeonato] = useState('');
    const [tamanoEquipos, setTamanoEquipos] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [tipoCampeonato, setTipoCampeonato] = useState('');
    const [tipoSede, setTipoSede] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [inicioInscripcion, setInicioInscripcion] = useState('');
    const [finInscripcion, setFinInscripcion] = useState('');
    const [añoCreacion, setAñoCreacion] = useState('');
    const [error, setError] = useState(null);
    const [modalidades, setModalidad] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [disciplinas,setDisciplinas]= useState([])
    const notify = (message) => toast(message);

    useEffect(() => {
        const fetchModalidades = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/modalidad`);
                setModalidad(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchModalidades();
    }, []);

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/sede`);
                setSedes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSedes();
    }, []);
    useEffect(() => {
      const fetchDisciplinas = async () => {
          try {
              const response = await axios.get(`http://localhost:3001/disciplina`);
              setDisciplinas(response.data);
          } catch (error) {
              console.log(error);
          }
      };
      fetchDisciplinas();
  }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const campeonatoData = {
            nombreCampeonato,
            nombreDisciplinas,
            tamanoEquipos,
            fechaInicio,
            fechaFin,
            tipoCampeonato,
            sede: tipoSede,
            descripcion,
            inicioInscripcion,
            finInscripcion,
            añoCreacion,
        };

        try {
            const response = await axios.post('http://localhost:3001/campeonato/', campeonatoData);
            console.log('Respuesta del servidor:', response.data);
            notify("Campeonato creado exitosamente");

            // Restablecer campos del formulario
            setNombreDisciplinas('');
            setNombreCampeonato('');
            setTamanoEquipos('');
            setFechaInicio('');
            setFechaFin('');
            setTipoCampeonato('');
            setTipoSede('');
            setDescripcion('');
            setInicioInscripcion('');
            setFinInscripcion('');
            setAñoCreacion('');

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('No se puede crear más de un interfichas o intercentros por año');
              } else {
                toast.error('Error al crear el campeonato. Inténtalo de nuevo.');
              }
        }
    };

    return (
        <div className="grid place-content-center font-sans text-lg">
            <section className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
                <div className="py-4">
                    <header className="text-center text-xl font-semibold">¡Crea tu Campeonato! Completa el formulario a continuación</header>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-800">Nombre Campeonato</label>
                        <input
                            required
                            placeholder="Ingresa nombre de campeonato"
                            type="text"
                            value={nombreCampeonato}
                            onChange={(e) => setNombreCampeonato(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-gray-800">Disciplina</label>
                            <select
                                required
                                value={nombreDisciplinas}
                                onChange={(e) => setNombreDisciplinas(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="">Selecciona una disciplina</option>
                                {disciplinas.map((disciplina) => (
                                    <option key={disciplina._id} value={disciplina.nombreDisciplina}>
                                        {disciplina.nombreDisciplina}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-800">Tamaño equipo</label>
                            <input
                                required
                                placeholder="Numero participantes"
                                type="number"
                                value={tamanoEquipos}
                                onChange={(e) => setTamanoEquipos(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-gray-800">Fecha de Inicio</label>
                            <input
                                required
                                placeholder="Fecha de inicio"
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-800">Fecha de Fin</label>
                            <input
                                required
                                placeholder="Fecha de fin"
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-gray-800">Tipo campeonato</label>
                            <select
                                required
                                value={tipoCampeonato}
                                onChange={(e) => setTipoCampeonato(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="">Selecciona una modalidad</option>
                                {modalidades.map((modalidad) => (
                                    <option key={modalidad._id} value={modalidad.nombreModalidad}>
                                        {modalidad.nombreModalidad}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-800">Sede</label>
                            <select
                                required
                                value={tipoSede}
                                onChange={(e) => setTipoSede(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="">Selecciona una sede</option>
                                {sedes.map((sede) => (
                                    <option key={sede._id} value={sede.nombreSede}>
                                        {sede.nombreSede}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="w-1/2 mb-6">
                        <label className="block text-gray-800">Año creación</label>
                        <input
                            required
                            placeholder="2024"
                            type="text"
                            value={añoCreacion}
                            onChange={(e) => setAñoCreacion(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-800">Descripción</label>
                        <input
                            required
                            placeholder="Ingrese una breve descripción del campeonato"
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-gray-800">Inicio Inscripción</label>
                            <input
                                required
                                placeholder="Inicio inscripción"
                                type="date"
                                value={inicioInscripcion}
                                onChange={(e) => setInicioInscripcion(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-800">Fin de Inscripción</label>
                            <input
                                required
                                placeholder="Fin de inscripción"
                                type="date"
                                value={finInscripcion}
                                onChange={(e) => setFinInscripcion(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <button type="submit" className="bg-gradient-to-tr from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 py-2 rounded ">
                        Crear campeonato
                    </button>
                </form>
            </section>
            <ToastContainer />
        </div>
    );
};

export default CreateCampeonato;
