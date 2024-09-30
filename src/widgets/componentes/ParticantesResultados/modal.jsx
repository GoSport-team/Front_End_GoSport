import React from 'react';
import { FaFutbol, FaSquareFull } from 'react-icons/fa';

export default function ModalRult({ resultado, closeModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-lg w-full relative">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-t-lg">
        <h2 className="text-lg font-bold text-white">Detalles del Partido</h2>
        <button onClick={closeModal} className="text-white text-2xl hover:text-gray-200">
          &times;
        </button>
      </div>
  
      <div className="mt-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img
              src={resultado.equipo1.Equipo1.imgLogo}
              alt="Argentina"
              className="w-10 h-8 rounded-lg shadow-md"
            />
            <span className="ml-3 font-bold text-xl text-gray-900 dark:text-gray-100">
              {resultado.equipo1.Equipo1.nombreEquipo}
            </span>
          </div>
  
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            <span className="text-blue-600">{resultado.equipo1.goles.marcador}</span> - <span className="text-red-600">{resultado.equipo2.goles.marcador}</span>
          </div>
  
          <div className="flex items-center">
            <span className="mr-3 font-bold text-xl text-gray-900 dark:text-gray-100">
              {resultado.equipo2.Equipo2.nombreEquipo}
            </span>
            <img
              src={resultado.equipo2.Equipo2.imgLogo}
              alt="Colombia"
              className="w-10 h-8 rounded-lg shadow-md"
            />
          </div>
        </div>
  
        <div className='flex justify-between py-5'>
          <div>
            <div className="mt-4">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Goles:</p>
              <ul className="list-none space-y-2">
                {resultado.equipo1.goles.jugadorGoleador.length > 0 ? resultado.equipo1.goles.jugadorGoleador.map((jugador, index) => (
                  <li key={index} className="flex items-center">
                    <FaFutbol className="text-green-500 mr-2" />
                    <span>{jugador.nombres} {jugador.totalGoles}</span>
                  </li>
                )) : (
                  <li className="flex items-center">
                    <FaFutbol className="text-green-500 mr-2" />
                    <span>Ningún gol</span>
                  </li>
                )}
              </ul>
            </div>
  
            <div className="mt-4">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Tarjetas Amarillas:</p>
              <ul className="list-none space-y-2">
                {resultado.equipo1.tarjetasAmarillas.length > 0 ? resultado.equipo1.tarjetasAmarillas.map((jugador, index) => (
                  <li key={index} className="flex items-center">
                    <FaSquareFull className="text-yellow-500 mr-2" />
                    <span>{jugador.nombres}</span>
                  </li>
                )) : (
                  <li className="flex items-center">
                    <FaSquareFull className="text-yellow-500 mr-2" />
                    <span>Ninguna Amarilla</span>
                  </li>
                )}
              </ul>
            </div>
  
            <div className="mt-4">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Tarjetas Rojas:</p>
              <ul className="list-none space-y-2">
                {resultado.equipo1.tarjetasRojas > 0 ? resultado.equipo1.tarjetasRojas.map((jugador, index) => (
                  <li key={index} className="flex items-center">
                    <FaSquareFull className="text-red-600 mr-2" />
                    <span>{jugador.nombres}</span>
                  </li>
                )) : (
                  <li className="flex items-center">
                    <FaSquareFull className="text-red-600 mr-2" />
                    <span>Ninguna</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
  
          <div>
            <div className="mt-4">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Goles:</p>
              <ul className="list-none space-y-2">
                {resultado.equipo2.goles.jugadorGoleador.length > 0 ? resultado.equipo2.goles.jugadorGoleador.map((jugador, index) => (
                  <li key={index} className="flex items-center">
                    <FaFutbol className="text-green-500 mr-2" />
                    <span>{jugador.nombres} {jugador.totalGoles}</span>
                  </li>
                )) : (
                  <li className="flex items-center">
                    <FaFutbol className="text-green-500 mr-2" />
                    <span>Ningún gol</span>
                  </li>
                )}
              </ul>
            </div>
  
            <div className="mt-4">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Tarjetas Amarillas:</p>
              <ul className="list-none space-y-2">
                {resultado.equipo2.tarjetasAmarillas.length > 0 ? resultado.equipo2.tarjetasAmarillas.map((jugador, index) => (
                  <li key={index} className="flex items-center">
                    <FaSquareFull className="text-yellow-500 mr-2" />
                    <span>{jugador.nombres}</span>
                  </li>
                )) : (
                  <li className="flex items-center">
                    <FaSquareFull className="text-yellow-500 mr-2" />
                    <span>Ninguna Amarilla</span>
                  </li>
                )}
              </ul>
            </div>
  
            <div className="mt-4">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Tarjetas Rojas:</p>
              <ul className="list-none space-y-2">
                {resultado.equipo2.tarjetasRojas > 0 ? resultado.equipo2.tarjetasRojas.map((jugador, index) => (
                  <li key={index} className="flex items-center">
                    <FaSquareFull className="text-red-600 mr-2" />
                    <span>{jugador.nombres}</span>
                  </li>
                )) : (
                  <li className="flex items-center">
                    <FaSquareFull className="text-red-600 mr-2" />
                    <span>Ninguna</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div className="flex justify-end mt-6">
        <button
          onClick={closeModal}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>  
  );
}
