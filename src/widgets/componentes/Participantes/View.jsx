import React, { useState } from 'react';

export default function ViewJugadores({ isOpen, onClose, equipo }) {
    

    if (!isOpen) return null;

    return (
        <div className=" absolute p-4  inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            {equipo &&(

                <div key={equipo._id} className="bg-white flex flex-col rounded-lg shadow-lg w-[50vw] z-50">
                    <div className='flex justify-end mr-5'>
                    <button
                    className=" left-0 text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                    onClick={onClose}
                >
                    &times;
                </button>
                    </div>
               
                <div className='flex justify-center items-center flex-col'>
                <div className="team-name text-gray-900 mb-4 flex items-center space-x-2 ml-2 mt-2">
                    <span className="text-lg font-semibold">Nombre del Equipo:</span>
                    <span className="text-md ">{equipo.nombreEquipo}</span>
                </div>
                <div className="team-name text-gray-900 mb-4 flex items-center space-x-2 ml-2 mt-2">
                    <span className="text-lg font-semibold">Nombre del capitan:</span>
                    <span className="text-md ">{equipo.nombreCapitan}</span>
                </div>

                <div className=" pl-10 pr-10 w-full  relative overflow-x-auto shadow-md sm:rounded-lg mt-11">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre Jugador
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Dorsal
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div className="flex items-center">
                                        N° Ficha
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipo.participantes.map((jugador)=>(
                            <tr key={jugador._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                   {jugador.nombreJugador}
                                </th>
                                <td className="px-6 py-4">
                                    {jugador.dorsal}
                                </td>
                                <td className="px-6 py-4">
                                   {jugador.ficha}
                                </td>

                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>    
                </div>
                
  )}
        </div>
    );
}
