
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button } from "@material-tailwind/react";
const URL_API = import.meta.env.VITE_API_URL;

export function JugadorDestacado() {
    const [jugadoresDestacados, setJugadoresDestacados] = useState([]);
    const [infoVisible, setInfoVisible] = useState({});

    // Función para obtener jugadores destacados desde la API
    const obtenerJugadoresDestacados = async () => {
        try {
            const response = await axios.get(`${URL_API}/jugadorDestacado`);
            console.log('Respuesta API:', response.data);
            setJugadoresDestacados(response.data); // Ajustado para guardar toda la data
        } catch (error) {
            console.error('Error al obtener los jugadores destacados:', error);
        }
    };

    useEffect(() => {
        obtenerJugadoresDestacados();
    }, []);

    // Función para alternar la visibilidad de la información extra
    const toggleInfoVisibility = (key) => {
        setInfoVisible(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Función para eliminar un jugador destacado usando el ID del objeto padre
    const eliminarJugadorDestacado = async (jugadorDestacadoId) => {
        try {
            console.log("ID del jugador destacado a eliminar:", jugadorDestacadoId);
            const response = await axios.delete(`${URL_API}/jugadorDestacado/${jugadorDestacadoId}`);
            console.log("Jugador destacado eliminado:", response.data);
            obtenerJugadoresDestacados(); // Actualiza la lista tras la eliminación
        } catch (error) {
            console.error('Error al eliminar el jugador destacado:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-4">
            <Typography variant="h6" color="blue-gray" className="text-3xl mb-10 text-center">
                Jugadores Destacados
            </Typography>

            {jugadoresDestacados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {jugadoresDestacados.map((item, index) => {
                        const jugador = item.jugadorDestacado[0]; 
                        const playerKey = `jugador-${index}`;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-4 h-auto bg-[url('/img/bol.jpg')] bg-cover opacity-95 relative flex flex-col"
                            >
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        {jugador.nombres || 'Sin nombre'}
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        <strong>Correo:</strong> {jugador.correo || 'Sin correo'}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <strong>Identificación:</strong> {jugador.identificacion || 'Sin identificación'}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <strong>Teléfono:</strong> {jugador.telefono || 'Sin teléfono'}
                                    </p>

                                    {/* Mostrar más información si está visible */}
                                    {infoVisible[playerKey] && (
                                        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                            <p className="text-gray-700 mb-2">
                                                <strong>Ficha:</strong> {jugador.ficha || 'Sin ficha'}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Programa:</strong> {jugador.programa || 'Sin programa'}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Fin de Ficha:</strong> {jugador.finFicha ? new Date(jugador.finFicha).toLocaleDateString() : 'Sin fecha'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    onClick={() => toggleInfoVisibility(playerKey)}
                                    className="self-end flex items-center justify-center p-2 mt-4"
                                    variant="text"
                                    color="blue-gray"
                                >
                                    {infoVisible[playerKey] ? (
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 13H5m7-7v14"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    )}
                                </Button>

                                <Button
                                    onClick={() => eliminarJugadorDestacado(item._id)} 
                                    className="mt-2 bg-gray-100 text-black"
                                >
                                    Eliminar Jugador
                                </Button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center">Cargando los jugadores destacados...</p>
            )}
        </div>
    );
}

export default JugadorDestacado;