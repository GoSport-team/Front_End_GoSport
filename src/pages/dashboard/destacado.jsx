import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button } from "@material-tailwind/react";
const URL_API = import.meta.env.VITE_API_URL

export function JugadorDestacado() {
    const [jugadoresDestacados, setJugadoresDestacados] = useState([]);
    const [infoVisible, setInfoVisible] = useState({});

    const obtenerJugadoresDestacados = async () => {
        try {
            const response = await axios.get(`${URL_API}/jugadorDestacado`);
            const dataAgrupada = agruparPorCampeonato(response.data);
            setJugadoresDestacados(dataAgrupada);
            console.log('Jugadores Destacados:', response.data);
        } catch (error) {
            console.error('Error al obtener los jugadores destacados:', error);
        }
    };

    const agruparPorCampeonato = (data) => {
        const agrupados = {};
        data.forEach((item) => {
            if (agrupados[item.Campeonato]) {
                agrupados[item.Campeonato] = agrupados[item.Campeonato].concat(item.jugadorDestacado);
            } else {
                agrupados[item.Campeonato] = item.jugadorDestacado;
            }
        });
        return agrupados;
    };

    useEffect(() => {
        obtenerJugadoresDestacados();
    }, []);

    const toggleInfoVisibility = (key) => {
        setInfoVisible(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="flex flex-col min-h-screen p-4">
            <Typography variant="h6" color="blue-gray" className="text-3xl mb-10 text-center">
                Jugadores Destacados
            </Typography>

            {Object.keys(jugadoresDestacados).length > 0 ? (
                Object.keys(jugadoresDestacados).map((campeonato, index) => (
                    <div key={index} className="mb-3">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b-2 border-gray-300 pb-2 mt-8">
                            Campeonato: {campeonato}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                            {jugadoresDestacados[campeonato].length > 0 ? (
                                jugadoresDestacados[campeonato].map((jugador, jugadorIndex) => {
                                    const playerKey = `${campeonato}-${jugadorIndex}`;
                                    return (
                                        <div
                                            key={jugadorIndex}
                                            className="bg-white rounded-xl shadow-lg p-4 h-auto bg-[url('/img/bol.jpg')] bg-cover opacity-95 relative flex flex-col"
                                        >
                                            <div className="flex-grow">
                                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                    {jugador.nombres}
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    <strong>Correo:</strong> {jugador.correo}
                                                </p>
                                                <p className="text-gray-600 mb-2">
                                                    <strong>Identificación:</strong> {jugador.identificacion}
                                                </p>
                                                {infoVisible[playerKey] && (
                                                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                                        <p className="text-gray-700 mb-2">
                                                            <strong>Ficha:</strong> {jugador.ficha}
                                                        </p>
                                                        <p className="text-gray-700 mb-2">
                                                            <strong>Programa:</strong> {jugador.programa}
                                                        </p>
                                                        <p className="text-gray-700 mb-2">
                                                            <strong>Fin de Ficha:</strong> {new Date(jugador.finFicha).toLocaleDateString()}
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
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="col-span-4 text-center text-gray-500">
                                    No hay jugadores destacados para este campeonato.
                                </p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Cargando los jugadores destacados...</p>
            )}
        </div>
    );
}

export default JugadorDestacado;
