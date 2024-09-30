import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
Modal.setAppElement('#root');
export const VersusPage = ({ setModalVer, modalVer, resultado }) => {
 
  const [controler, setControler]=useState()
  const modales = () => {
    setModalVer(false);
  };


  return (
    <>
 
<Modal
  isOpen={modalVer}
  className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"> {/* Fondo oscuro con opacidad */}
  <div className="h-screen w-screen flex flex-col items-center justify-center p-6 overflow-y-auto"> {/* Asegura que el modal sea del tamaño de la pantalla */}

    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl relative">
      <h1 className="text-4xl font-bold mb-8">Resultado del Partido</h1>
      {resultado && (
        <div key={resultado._id}>
          <div className="flex justify-around w-full mb-4">
            <img
              className="object-contain w-32 drop-shadow-lg"
              src={resultado.equipo1.Equipo1.imgLogo}
              alt="Logo Equipo 1"
            />
            <img
              className="object-contain w-32 drop-shadow-lg"
              src={resultado.equipo2.Equipo2.imgLogo}
              alt="Logo Equipo 2"
            />
          </div>
          <div className="flex justify-around w-full text-center mb-6">
            <div className="text-3xl font-bold">{resultado.equipo1.Equipo1.nombreEquipo}</div>
            <div className="text-3xl font-bold">VS</div>
            <div className="text-3xl font-bold">{resultado.equipo2.Equipo2.nombreEquipo}</div>
          </div>
          {!resultado.penales?(
          <div className="grid grid-cols-2 gap-6">
            {/* Tabla para el Equipo 1 */}
            <div className="text-xl">
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 ">Marcador:</td>
                    <td className="px-4 py-2 ">{resultado.equipo1.goles.marcador}</td>
                  </tr>
                  <td className="px-4 py-2 ">Goleadores:</td>
{resultado.equipo1.goles.jugadorGoleador?.reduce((acc, jugadorG) => {
  // Verificar si el jugador ya está en el acumulador
  if (!acc.some(j => j.nombres === jugadorG.nombres)) {
    // Si no está, agregarlo con un contador inicial
    acc.push({ nombres: jugadorG.nombres, contador: 1 });
  } else {
    // Si ya está, incrementar el contador
    const jugador = acc.find(j => j.nombres === jugadorG.nombres);
    if (jugador) {
      jugador.contador += 1;
    }
  }
  return acc;
}, []).map((jugador, index) => (
  <tr key={index}>
    <td className="px-4 py-2 ">
      {jugador.nombres} {jugador.contador > 1 ? `(${jugador.contador} goles)` : ''}
    </td>
  </tr>
))}
                  <tr>
                    <td className="px-4 py-2 bg-yellow-100 font-bol">Tarjetas Amarillas:</td>
                    <td className="px-4 py-2 bg-yellow-100 font-bold">{resultado.equipo1.tarjetasAmarillas.length}</td>
                  </tr>
                  {resultado.equipo1.tarjetasAmarillas?.map((jugadorG, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 d">{jugadorG.nombres}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-2 bg-red-100 font-bold">Tarjetas Rojas:</td>
                    <td className="px-4 py-2 bg-red-100 font-bold">{resultado.equipo1.tarjetasRojas.length}</td>
                  </tr>
                  {resultado.equipo1.tarjetasRojas?.map((jugadorG, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 ">{jugadorG.nombres} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tabla para el Equipo 2 */}
            <div className="text-xl">
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 ">Marcador:</td>
                    <td className="px-4 py-2 ">{resultado.equipo2.goles.marcador}</td>
                  </tr>
                  <td className="px-4 py-2">Goleadores:</td>
{resultado.equipo2.goles.jugadorGoleador?.reduce((acc, jugadorG) => {
  // Verificar si el jugador ya está en el acumulador
  if (!acc.some(j => j.nombres === jugadorG.nombres)) {
    // Si no está, agregarlo con un contador inicial
    acc.push({ nombres: jugadorG.nombres, contador: 1 });
  } else {
    // Si ya está, incrementar el contador
    const jugador = acc.find(j => j.nombres === jugadorG.nombres);
    if (jugador) {
      jugador.contador += 1;
    }
  }
  return acc;
}, []).map((jugador, index) => (
  <tr key={index}>
    <td className="px-4 py-2 ">
      {jugador.nombres} {jugador.contador > 1 ? `(${jugador.contador} goles)` : ''}
    </td>
  </tr>
))}
                  <tr>
                    <td className="px-4 py-2 bg-yellow-100 font-bold">Tarjetas Amarillas:</td>
                    <td className="px-4 py-2  bg-yellow-100 font-bold">{resultado.equipo2.tarjetasAmarillas.length}</td>
                  </tr>
                  {resultado.equipo2.tarjetasAmarillas?.map((jugadorG, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 ">{jugadorG.nombres} </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-2  bg-red-100 font-bold">Tarjetas Rojas:</td>
                    <td className="px-4 py-2  bg-red-100 font-bold">{resultado.equipo2.tarjetasRojas.length}</td>
                  </tr>
                  {resultado.equipo2.tarjetasRojas?.map((jugadorG, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{jugadorG.nombres} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          ):(
  <> 
   <div className="grid grid-cols-2 gap-6">
  <div className="text-xl">
  <table className="table-auto w-full text-left">
    <tbody>
      <tr>
        <td className="px-4 py-2 ">Penales:</td>
        <td className="px-4 py-2 ">{resultado.equipo1.goles.penales}</td>
      </tr>
      <tr>
        <td className="px-4 py-2 font-bold">Goleadores:</td>
        <td className="px-4 py-2 "></td>
      </tr>
      {resultado.equipo1.penales?.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2 ">
              {item.jugador.nombres}
            </td>
            <td className="px-4 py-2 ">
              {item.acierto ? 'Acertó' : 'Falló'}
            </td>
          </tr>
        ))}
      <tr>
        <td className="px-4 py-2 bg-yellow-100 font-bold">Tarjetas Amarillas:</td>
        <td className="px-4 py-2 bg-yellow-100 font-bold">{resultado.equipo1.tarjetasAmarillas.length}</td>
      </tr>
      {resultado.equipo1.tarjetasAmarillas?.map((jugadorG, index) => (
        <tr key={index}>
          <td className="px-4 py-2 ">{jugadorG.nombres}</td>
          <td className="px-4 py-2 "></td>
        </tr>
      ))}
      <tr>
        <td className="px-4 py-2 bg-red-100 font-bold">Tarjetas Rojas:</td>
        <td className="px-4 py-2 bg-red-100 font-bold">{resultado.equipo1.tarjetasRojas.length}</td>
      </tr>
      {resultado.equipo1.tarjetasRojas?.map((jugadorG, index) => (
        <tr key={index}>
          <td className="px-4 py-2 ">{jugadorG.nombres}</td>
          <td className="px-4 py-2 "></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Tabla para el Equipo 2 */}
<div className="text-xl">
  <table className="table-auto w-full text-left">
    <tbody>
      <tr>
        <td className="px-4 py-2 ">Penales:</td>
        <td className="px-4 py-2 ">{resultado.equipo2.goles.penales}</td>
      </tr>
      <tr>
        <td className="px-4 py-2 font-bold">Goleadores:</td>
        <td className="px-4 py-2 "></td>
      </tr>
      {resultado.equipo2.penales?.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2 ">
              {item.jugador.nombres}
            </td>
            <td className="px-4 py-2 ">
              {item.acierto ? 'Acertó' : 'Falló'}
            </td>
          </tr>
        ))}
      <tr>
        <td className="px-4 py-2 bg-yellow-100 font-bold">Tarjetas Amarillas:</td>
        <td className="px-4 py-2  bg-yellow-100 font-bold">{resultado.equipo2.tarjetasAmarillas.length}</td>
      </tr>
      {resultado.equipo2.tarjetasAmarillas?.map((jugadorG, index) => (
        <tr key={index}>
          <td className="px-4 py-2 ">{jugadorG.nombres}</td>
          <td className="px-4 py-2 "></td>
        </tr>
      ))}
      <tr>
        <td className="px-4 py-2  bg-red-100 font-bold">Tarjetas Rojas:</td>
        <td className="px-4 py-2  bg-red-100 font-bold">{resultado.equipo2.tarjetasRojas.length}</td>
      </tr>
      {resultado.equipo2.tarjetasRojas?.map((jugadorG, index) => (
        <tr key={index}>
          <td className="px-4 py-2">{jugadorG.nombres} </td>
          <td className="px-4 py-2 "></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
</>
      )}
        </div>
      )}
      <button
        onClick={modales}
        className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Cerrar
      </button>
    </div>
  </div>
</Modal>

    </>
  );
};
