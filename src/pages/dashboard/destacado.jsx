import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
export function JugadorDestacado() {
  const [jugadoresDestacados, setJugadoresDestacados] = useState([]);

  const obtenerJugadoresDestacados = async () => {
      try {
          const response = await axios.get('http://localhost:3001/jugadorDestacado');
          const dataAgrupada = agruparPorCampeonato(response.data);
          setJugadoresDestacados(dataAgrupada); // Guardar los datos agrupados en el estado
          console.log('Jugadores Destacados:', response.data);
      } catch (error) {
          console.error('Error al obtener los jugadores destacados:', error);
      }
  };

  // Agrupar los jugadores por campeonato
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

  return (
    <div className="flex max-w-screen-lg flex-col gap-5">
          <Typography variant="h5" color="blue-gray">
            Jugadores Destacados SENA !
          </Typography>
          
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Jugadores Destacados por Campeonato</h1>
            {Object.keys(jugadoresDestacados).length > 0 ? (
                Object.keys(jugadoresDestacados).map((campeonato, index) => (
                    <div key={index} className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b-2 border-gray-300 pb-2">
                            Campeonato: {campeonato}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                            {jugadoresDestacados[campeonato].length > 0 ? (
                                jugadoresDestacados[campeonato].map((jugador, jugadorIndex) => (
                                    <div
                                        key={jugadorIndex}
                                        className="bg-white rounded-xl shadow-lg p-4"
                                    >
                                        {typeof jugador === 'string' ? (
                                            <p className="text-red-500 text-center font-bold">{jugador}</p>
                                        ) : (
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                    {jugador.nombres}
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    <strong>Correo:</strong> {jugador.correo}
                                                </p>
                                                <p className="text-gray-600">
                                                    <strong>Teléfono:</strong> {jugador.telefono}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-4 text-center text-gray-500">
                                    No hay jugadores destacados para este campeonato.
                                </p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>Cargando los jugadores destacados...</p>
            )}
       
    </div>
  );
}

export default JugadorDestacado;
