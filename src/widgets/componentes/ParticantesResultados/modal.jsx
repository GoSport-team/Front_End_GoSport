import React from 'react';
import { FaFutbol, FaSquareFull } from 'react-icons/fa'; // Iconos de fútbol y tarjetas

export default function ModalRult({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
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
                src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg"
                alt="Argentina"
                className="w-10 h-8 rounded-lg shadow-md"
              />
              <span className="ml-3 font-bold text-xl text-gray-900">Argentina</span>
            </div>

            <div className="text-3xl font-bold text-gray-900">
              <span className="text-blue-600">1</span> - <span className="text-red-600">1</span>
            </div>

            <div className="flex items-center">
              <span className="mr-3 font-bold text-xl text-gray-900">Colombia</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg"
                alt="Colombia"
                className="w-10 h-8 rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-lg text-gray-800">Goles:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <FaFutbol className="text-green-500 mr-2" /> 
                <span>L. Messi (ARG) 67'</span>
              </li>
              <li className="flex items-center">
                <FaFutbol className="text-green-500 mr-2" /> 
                <span>J. Cuadrado (COL) 80'</span>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-lg text-gray-800">Tarjetas Amarillas:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <FaSquareFull className="text-yellow-500 mr-2" /> 
                <span>M. Acuña (ARG)</span>
              </li>
              <li className="flex items-center">
                <FaSquareFull className="text-yellow-500 mr-2" /> 
                <span>C. Zapata (COL)</span>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-lg text-gray-800">Tarjetas Rojas:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <FaSquareFull className="text-red-600 mr-2" /> 
                <span>Ninguna</span>
              </li>
            </ul>
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
