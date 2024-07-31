'use client'

import React, { useEffect, useState } from 'react'

import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function Resultados() {


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
    const [thirdModalIsOpen, setThirdModalIsOpen] = useState(false);
    const [fourthModalIsOpen, setFourthModalIsOpen] = useState(false);
    const [formModalIsOpen, setFormModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    //Moda Goles
    const openSecondModal = () => {
        setSecondModalIsOpen(true);
    };

    const closeSecondModal = () => {
        setSecondModalIsOpen(false);
    };

    //Modal Amarillas
    const openThirdModal = () => {
        setThirdModalIsOpen(true);
    };

    const closeThirdModal = () => {
        setThirdModalIsOpen(false);
    };

    //Modal Roja
    const openFourthModal = () => {
        setFourthModalIsOpen(true);
    };

    const closeFourthModal = () => {
        setFourthModalIsOpen(false);
    };

    // Modal Agregar Planillero
    const openFormModal = () => {
        setFormModalIsOpen(true);
    };

    const closeFormModal = () => {
        setFormModalIsOpen(false);
    };


    const matches = [
        {
            league: 'Sena CTPI - Super League',
            matches: [
                { horaJuego: '12:00', Equipo1: 'FC Barcelona', GolEquipo1: 2, Equipo2: 'Real Madrid', GolEquipo2: 1, },
                { horaJuego: '01:00', Equipo1: 'Atlético de Madrid', GolEquipo1: 1, Equipo2: 'Sevilla FC', GolEquipo2: 1, },
                { horaJuego: '01:30', Equipo1: 'Real Sociedad', GolEquipo1: 3, Equipo2: 'Real Betis', GolEquipo2: 2, },
            ],
        },
    ];

    return (
        <div className="bg-gray-800 text-white p-4 w-[75vw] m-auto rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Partidos en vivo</h1>
            {matches.map((league, index) => (
                league.matches.length > 0 && (
                    <div key={index} className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">{league.league}</h2>
                        <div className="bg-gray-700 rounded-lg p-2">
                            {league.matches.map((match, index) => (
                                <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                                    <div className="flex-1">{match.horaJuego}</div>
                                    <div className="flex-1 text-right">{match.Equipo1} <span className="font-bold ml-3">{match.GolEquipo1}</span></div>
                                    <div className="flex-1 text-center">vs</div>
                                    <div className="flex-1 text-left"><span className="font-bold mr-3">{match.GolEquipo2}</span> {match.Equipo2}</div>
                                    <div className="text-right flex flex-row gap-x-6 justify-center content-center">
                                        <button onClick={openModal}
                                            class="w-[110px] bg-black h-9 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden bg-opacity-70 text-[#f1f1f1] hover:bg-opacity-60 transition font-semibold shadow-md">
                                            Delegar
                                        </button>

                                        <button onClick={openFormModal}
                                            class="w-[110px] bg-black h-9 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden bg-opacity-70 text-[#f1f1f1] hover:bg-opacity-60 transition font-semibold shadow-md">
                                            Asignar
                                        </button>

                                    </div>
                                </div>
                            ))}
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                className="flex justify-center items-center h-screen"
                                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                            >
                                <div className=" rounded-lg shadow-lg overflow-hidden flex flex-col w-[50vw]">
                                    <section className="flex flex-col bg-gray-100 p-7">
                                        <div className='justify-end flex'>
                                            <button
                                                className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                                                onClick={closeModal}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                        <div className="flex flex-row flex-wrap justify-evenly items-center">
                                            <div className="flex flex-col">
                                                <img className="object-contain w-52 drop-shadow-lg"
                                                    src="\public\img\Resultados\Madrid.png" alt="img" />
                                                <h1 className="text-center my-2">Real Madrid</h1>
                                                <div className="flex items-center justify-evenly my-4">
                                                    <div>
                                                        <div onClick={openSecondModal}>
                                                            <img className="object-contain w-14" src="\public\img\Resultados\gol.png" alt="img" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div onClick={openThirdModal}>
                                                            <img className="object-contain w-14" src="\public\img\Resultados\amarilla.png" alt="img" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div onClick={openFourthModal}>
                                                            <img className="object-contain w-14" src="\public\img\Resultados\roja.png" alt="img" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center font-bold text-lg">
                                                <div className="text-4xl">VS</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <img className="object-contain w-52 drop-shadow-lg"
                                                    src="\public\img\Resultados\Dourmut.png" alt="img" />
                                                <h1 className="text-center my-2">Borussia Dortmund</h1>
                                                <div className="flex items-center justify-evenly my-4">
                                                    <div onClick={openSecondModal}>
                                                        <img className="object-contain w-14" src="\public\img\Resultados\gol.png" alt="img" />
                                                    </div>
                                                    <div onClick={openThirdModal}>
                                                        <img className="object-contain w-14" src="\public\img\Resultados\amarilla.png" alt="img" />
                                                    </div>
                                                    <div onClick={openFourthModal}>
                                                        <img className="object-contain w-14" src="\public\img\Resultados\roja.png" alt="img" />
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="relative overflow-x-auto w-[45vh] mt-4">
                                            <div className='flex flex-row gap-x-4 content-center'>
                                                <img className='object-contain w-4'
                                                    src="\public\img\Resultados\balon.png" alt="img" />
                                                <p>Ronaldo</p>
                                            </div>
                                        </div>ñ 
                                    </section>
                                    <div className="p-4 bg-gray-100 flex justify-end">
                                        <button class="cursor-pointer group relative flex gap-1.5 px-8 py-3 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </Modal>

                            <Modal
                                isOpen={secondModalIsOpen}
                                onRequestClose={closeSecondModal}
                                className="flex justify-center items-center h-screen"
                                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                            >
                                <div className="relative rounded-lg shadow-lg overflow-hidden flex flex-col w-[30vw] bg-white p-4">
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
                                        onClick={closeSecondModal}
                                    >
                                        &times;
                                    </button>
                                    <div class="relative overflow-x-auto mt-10">
                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3">
                                                        Jugador
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Dolsal
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Gol
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Ronaldo
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        7
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input type="checkbox" />
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        James
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        10
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input type="checkbox" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-4 flex justify-end">
                                        <button className="bg-black text-white py-2 px-4 rounded-lg">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                            <Modal
                                isOpen={thirdModalIsOpen}
                                onRequestClose={closeSecondModal}
                                className="flex justify-center items-center h-screen"
                                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                            >
                                <div className="relative rounded-lg shadow-lg overflow-hidden flex flex-col w-[30vw] bg-white p-4">
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
                                        onClick={closeThirdModal}
                                    >
                                        &times;
                                    </button>
                                    <div class="relative overflow-x-auto mt-10">
                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3">
                                                        Jugador
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Dolsal
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Amarilla
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Ronaldo
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        7
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input type="checkbox" />
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        James
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        10
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input type="checkbox" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-4 flex justify-end">
                                        <button className="bg-black text-white py-2 px-4 rounded-lg">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                            <Modal
                                isOpen={fourthModalIsOpen}
                                onRequestClose={closeSecondModal}
                                className="flex justify-center items-center h-screen"
                                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                            >
                                <div className="relative rounded-lg shadow-lg overflow-hidden flex flex-col w-[30vw] bg-white p-4">
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
                                        onClick={closeFourthModal}
                                    >
                                        &times;
                                    </button>


                                    <div class="relative overflow-x-auto mt-10">
                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3">
                                                        Jugador
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Dolsal
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Roja
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Ronaldo
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        7
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input type="checkbox" />
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        James
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        10
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input type="checkbox" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-4 flex justify-end">
                                        <button className="bg-black text-white py-2 px-4 rounded-lg">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </Modal>


                            <Modal
                                isOpen={formModalIsOpen}
                                onRequestClose={openFormModal}
                                className="flex justify-center items-center h-screen"
                                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                            >
                                <div className="relative rounded-lg shadow-lg overflow-hidden flex flex-col bg-white p-4">
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
                                        onClick={closeFormModal}
                                    >
                                        &times;
                                    </button>


                                    <section>
                                        <div
                                            class="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8"
                                        >
                                            <div class="w-[50vw] h-auto shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
                                                <div class="mb-2 flex justify-center"></div>
                                                <h2 class="text-center text-2xl font-bold leading-tight text-black">
                                                    Registrar Usuario para el Partido
                                                </h2>
                                                <p class="mt-2 text-center text-sm text-gray-600">
                                                    Complete los detalles para agregar un nuevo miembro al sistema.
                                                </p>
                                                <form class="mt-8" method="POST" action="#">
                                                    <div class="space-y-5">
                                                        <div>
                                                            <label class="text-base font-medium text-gray-900">
                                                                Nombre
                                                            </label>
                                                            <div class="mt-2">
                                                                <input
                                                                    placeholder="Nombre"
                                                                    type="text"
                                                                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label class="text-base font-medium text-gray-900">
                                                                Telefono
                                                            </label>
                                                            <div class="mt-2">
                                                                <input
                                                                    placeholder="Telefono"
                                                                    type="number"
                                                                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label class="text-base font-medium text-gray-900">
                                                                Correo
                                                            </label>
                                                            <div class="mt-2">
                                                                <input
                                                                    placeholder="Email"
                                                                    type=""
                                                                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="flex items-center justify-between">
                                                                <label class="text-base font-medium text-gray-900">
                                                                    Contraseña
                                                                </label>
                                                            </div>
                                                            <div class="mt-2">
                                                                <input
                                                                    placeholder="Password"
                                                                    type="password"
                                                                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label for="roles" class="text-base font-medium text-gray-900">
                                                                Selecciona el rol:
                                                            </label>
                                                            <div class="mt-2">
                                                                <select id="roles" name="roles" class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1">
                                                                    <option value="administrador">Administrador</option>
                                                                    <option value="usuario">Usuario</option>
                                                                    <option value="planillero">Planillero</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                                                type="button"
                                                            >
                                                                Guardar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </Modal>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
