import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const URL_API = import.meta.env.VITE_API_URL

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
    const [añoCreacion, setAñoCreacion] = useState(new Date().getFullYear());
    const [error, setError] = useState(null);
    const [modalidades, setModalidad] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const estado = true;
    const nombre = 'Fase 1'
    const [minDate, setMinDate] = useState('');

    const notify = (message) => toast(message);
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today)
    }, []);
    
    useEffect(() => {
        const fetchModalidades = async () => {
            try {
                const response = await axios.get(`${URL_API}/modalidad`);
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
                const response = await axios.get(`${URL_API}/sede`);
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
                const response = await axios.get(`${URL_API}/disciplina`);
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
        localStorage.setItem("Añocampeonato",añoCreacion)
        const faseData = {
            estado,
            nombre,
        }
        try {
            const response = await axios.post(`${URL_API}/campeonato/`, campeonatoData);
            // const reponseFase = await axios.post('http://localhost:3001/fase/',faseData)
            console.log('Respuesta del servidor:', response.data);
            // console.log('Respuesta: ', reponseFase.data)
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
            console.log(error)
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.msg);
            } else if (error.response && error.response.status === 403) {
                toast.error(error.response.data.msg);
            }
            else {
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
                            <select
                                required
                                value={tamanoEquipos}
                                onChange={(e) => setTamanoEquipos(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            >
                            <option value="" disabled>Seleccione el número de participantes</option>
                                {[...Array(9)].map((_, i) => {
                                const value = i + 4;
                                return (
                            <option key={value} value={value}>
                            {value}
                            </option>
                            );
                            })}
                </select>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-gray-800">Fecha de Inicio</label>
                            <input
                                required
                                placeholder="Fecha de inicio"
                                type="date"
                                min={minDate}
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
                                min={minDate}
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
                                disabled={tipoCampeonato === 'Intercentros'}
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
                                min={minDate}
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
                                min={minDate}
                                value={finInscripcion}
                                onChange={(e) => setFinInscripcion(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <button type="submit" 
                    class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Crear campeonato
                    </button>
                </form>
            </section>
            <ToastContainer />
        </div>
    );
};

export default CreateCampeonato;
