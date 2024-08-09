import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const VersusPage = ({ setModalVer, idVs, modalVer }) => {
  const [resultado, setResultado] = useState();

  const modales = () => {
    setModalVer(false);
  };

  useEffect(() => {
    const resultados = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/resultados/${idVs}`);
        setResultado(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    resultados();
  }, [idVs]);

  return (
    <>
      {modalVer && (
        <div className="absolute  flex justify-center z-50 items-center h-screen w-full"
        overlayClassName=" z-50 bg-black bg-opacity-50">
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl relative">
              <h1 className="text-4xl font-bold mb-8">Resultado del Partido</h1>
              {resultado && (
                <div key={resultado._id}>
                  <div className="flex justify-around w-full mb-4">
                    <img className="object-contain w-32 drop-shadow-lg" src={resultado.equipo1.Equipo1.imgLogo} alt="img" />
                    <img className="object-contain w-32 drop-shadow-lg" src={resultado.equipo2.Equipo2.imgLogo} alt="img" />
                  </div>
                  <div className="flex justify-around w-full text-center mb-6">
                    <div className="text-3xl font-bold">{resultado.equipo1.Equipo1.nombreEquipo}</div>
                    <div className="text-3xl font-bold">VS</div>
                    <div className="text-3xl font-bold">{resultado.equipo2.Equipo2.nombreEquipo}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-xl">
                      {/* Equipo 1 Details */}
                      <table className="table-auto w-full text-left">
                        <tbody>
                          <tr>
                            <td className="px-4 py-2">Marcador:</td>
                            <td className="px-4 py-2">{resultado.equipo1.goles.marcador}</td>
                          </tr>
                          {resultado.equipo1.goles.jugadorGoleador?.map((jugadorG, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2">Goleador:</td>
                              <td className="px-4 py-2">{jugadorG.nombreJugador} (Dorsal: {jugadorG.dorsal})</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="px-4 py-2">Tarjetas Amarillas:</td>
                            <td className="px-4 py-2">{resultado.equipo1.tarjetasAmarillas.length}</td>
                          </tr>
                          {resultado.equipo1.tarjetasAmarillas?.map((jugadorG, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2">Jugador con Amarilla:</td>
                              <td className="px-4 py-2">{jugadorG.nombreJugador} (Dorsal: {jugadorG.dorsal})</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="px-4 py-2">Tarjetas Rojas:</td>
                            <td className="px-4 py-2">{resultado.equipo1.tarjetasRojas.length}</td>
                          </tr>
                          {resultado.equipo1.tarjetasRojas?.map((jugadorG, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2">Jugador con Roja:</td>
                              <td className="px-4 py-2">{jugadorG.nombreJugador} (Dorsal: {jugadorG.dorsal})</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-xl">
                      {/* Equipo 2 Details */}
                      <table className="table-auto w-full text-left">
                        <tbody>
                          <tr>
                            <td className="px-4 py-2">Marcador:</td>
                            <td className="px-4 py-2">{resultado.equipo2.goles.marcador}</td>
                          </tr>
                          {resultado.equipo2.goles.jugadorGoleador?.map((jugadorG, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2">Goleador:</td>
                              <td className="px-4 py-2">{jugadorG.nombreJugador} (Dorsal: {jugadorG.dorsal})</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="px-4 py-2">Tarjetas Amarillas:</td>
                            <td className="px-4 py-2">{resultado.equipo2.tarjetasAmarillas.length}</td>
                          </tr>
                          {resultado.equipo2.tarjetasAmarillas?.map((jugadorG, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2">Jugador con Amarilla:</td>
                              <td className="px-4 py-2">{jugadorG.nombreJugador} (Dorsal: {jugadorG.dorsal})</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="px-4 py-2">Tarjetas Rojas:</td>
                            <td className="px-4 py-2">{resultado.equipo2.tarjetasRojas.length}</td>
                          </tr>
                          {resultado.equipo2.tarjetasRojas?.map((jugadorG, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2">Jugador con Roja:</td>
                              <td className="px-4 py-2">{jugadorG.nombreJugador} (Dorsal: {jugadorG.dorsal})</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={modales}
                className="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
