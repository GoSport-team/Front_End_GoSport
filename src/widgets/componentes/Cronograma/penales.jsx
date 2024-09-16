import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function Penales({ isOpen, setMyModalIsOpen }) {
    if (!isOpen) return null;

    const [countGol1, setCountGol1] = useState(0);
    const [countGol2, setCountGol2] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const goal = () => {
        setCountGol1(prevCount => prevCount + 1);
    };
    const menosGoal = () => {
        setCountGol1(prevCount => prevCount > 0 ? prevCount - 1 : 0);
    };
    const goal2 = () => {
        setCountGol2(prevCount => prevCount + 1);
    };
    const menosGoal2 = () => {
        setCountGol2(prevCount => prevCount > 0 ? prevCount - 1 : 0);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ml-40">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[60vw]">
                    <div className='flex justify-end'>
                        <button
                            className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                            onClick={() => setMyModalIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Penales</h2>
                    <div className='flex justify-around'>
                        <div className='flex flex-col w-[30vw]'>
                            <div className='flex content-center justify-center'>
                                <div className='grid place-content-center'>
                                    <div>
                                        <img className="object-contain w-32 drop-shadow-lg"
                                            src='\public\img\Cronograma\francia.png' alt="Logo" />
                                    </div>
                                    <div className='flex justify-center content-center'>
                                        <h1 className="my-2">Francia</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center p-6 ">
                                    <div className="flex flex-col items-center m-4 w-16">
                                        <h1 className="text-xl mb-2">Goles</h1>
                                        <div className="text-6xl font-bold">{countGol1}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Jugador
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Dorsal
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ejm
                                            </th>
                                            <td class="px-6 py-4">
                                                10
                                            </td>
                                            <td class="px-6 py-4 flex gap-3">
                                                <img onClick={goal} class='object-cover w-6'
                                                    src="/public/img/Cronograma/aumentar.png" alt="img" />
                                                <img onClick={menosGoal}
                                                    class='object-cover w-6'
                                                    src="/public/img/Cronograma/delete.png" alt="img" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            VS
                        </div>
                        <div className='flex flex-col w-[30vw]'>
                            <div className='flex content-center justify-center'>
                                <div className='grid place-content-center'>
                                    <div>
                                        <img className="object-contain w-32 drop-shadow-lg"
                                            src='\public\img\Cronograma\francia.png' alt="Logo" />
                                    </div>
                                    <div className='flex justify-center content-center'>
                                        <h1 className="my-2">Francia</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center p-6 ">
                                    <div className="flex flex-col items-center m-4 w-16">
                                        <h1 className="text-xl mb-2">Goles</h1>
                                        <div className="text-6xl font-bold">{countGol2}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Jugador
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Dorsal
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ejm
                                            </th>
                                            <td class="px-6 py-4">
                                                7
                                            </td>
                                            <td class="px-6 py-4 flex gap-3">
                                                <img onClick={goal2} class='object-cover w-6'
                                                    src="/public/img/Cronograma/aumentar.png" alt="img" />
                                                <img onClick={menosGoal2}
                                                    class='object-cover w-6'
                                                    src="/public/img/Cronograma/delete.png" alt="img" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-5">
                        <button onClick={handleClose}
                            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}