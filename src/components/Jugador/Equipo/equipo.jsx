import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const URL_API = import.meta.env.VITE_API_URL

export const TeamJugador = () => {
    const token = Cookies.get('token'); // Obtener token de las cookies
    const [loading, setLoading] = useState(true); // Estado de carga
    const [usuarioId, setUsuario] = useState(''); // Estado para almacenar el ID del usuario
    const [equipo, setEquipo] = useState(null); // Estado para almacenar el equipo del jugador

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                // Petición para obtener el perfil del usuario y su ID
                const response = await axios.get(`${URL_API}/usuarios/perfil`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Asegúrate de que el token sea correcto
                    }
                });
                const userId = response.data._id; // Suponiendo que el ID del usuario está en response.data._id
                setUsuario(userId);
                console.log('ID del Usuario:', userId);

                // Hacer la siguiente petición usando el ID del usuario
                const equipoResponse = await axios.get(`${URL_API}/equipoInscripto/validarJugador`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Autenticación con token
                        idJugador: userId, // Aquí enviamos el ID del jugador
                    }
                });

                setEquipo(equipoResponse.data.equipo[0]); // Asigna el equipo del jugador
                console.log('Equipo del jugador:', equipoResponse.data);
            } catch (error) {
                console.error('Error al obtener la información:', error);
                toast.error('Hubo un error al obtener la información del jugador');
            } finally {
                setLoading(false);
            }
        };

        obtenerPerfil();
    }, [token]);

    if (loading) {
        return <p>Cargando información del jugador...</p>;
    }

    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 w-[80vw]">
                    {equipo ? (
                        <div className="flex flex-row justify-between">
                            {/* Información del equipo */}
                            <div className="flex-1 flex flex-col items-center mb-6 text-start">
                                <img src={equipo.imgLogo} alt={equipo.nombreEquipo} className="w-32 h-32 rounded-full shadow-md mb-4" />
                                <h2 className="text-3xl font-bold text-gray-800">{equipo.nombreEquipo}</h2>
                                <div className="mt-4 space-y-2">
                                    <p className="text-lg text-gray-600"><strong>Capitán:</strong> {equipo.nombreCapitan}</p>
                                    <p className="text-lg text-gray-600"><strong>Cédula:</strong> {equipo.cedula}</p>
                                    <p className="text-lg text-gray-600"><strong>Contacto 1:</strong> {equipo.contactoUno}</p>
                                    <p className="text-lg text-gray-600"><strong>Contacto 2:</strong> {equipo.contactoDos}</p>
                                    <p className="text-lg text-gray-600"><strong>Estado:</strong> {equipo.estado ? 'Activo' : 'Inactivo'}</p>
                                </div>
                            </div>

                            {/* Tabla de participantes */}
                            <div className="flex-1 overflow-x-auto mt-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Participantes</h3>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 rounded-s-lg">Nombre</th>
                                                <th scope="col" className="px-6 py-3">Ficha</th>
                                                <th scope="col" className="px-6 py-3">Dorsal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {equipo.participantes.map(participante => (
                                                <tr key={participante._id} className="bg-white hover:bg-gray-100">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{participante.nombres}</th>
                                                    <td className="px-6 py-4">{participante.ficha}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-center relative">
                                                            <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727129984/idcuwc1lrin3tluwnrhc.png" alt="Camiseta" className="w-9 object-contain" />
                                                            <span className="absolute text-black font-bold text">{participante.dorsal}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex  justify-center items-center gap-7">
                            <p>No Tienes equipo. Crea Uno</p>
                            <div>
                                <Link to={'/jugador/dashboard/crearequipo'}>
                                    <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                        Crear equipo
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TeamJugador;