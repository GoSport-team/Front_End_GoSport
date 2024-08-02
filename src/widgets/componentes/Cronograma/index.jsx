'use client'


import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


export default function CronogramaDesing({ primerEquipo, segundoEquipo, imagenEquipo1, imagenEquipo2, horaDeJuego, FechaDeJuego }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);                                                    

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [showPlayers, setShowPlayers] = useState(false);
  const [showPlayersTable2, setShowPlayersTable2] = useState(false);

  const togglePlayerRows = () => {
    setShowPlayers(!showPlayers);
  };

  const togglePlayerRowsTable2 = () => {
    setShowPlayersTable2(!showPlayersTable2);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className='w-[35vw] mt-8 flex flex-row rounded-md border-2 border-gray-300 shadow-lg'>
        <div className='w-1/2 p-6 flex flex-col gap-y-6'>
          <div className='flex flex-row items-center justify-center'>
            <img className='object-contain w-20' src="\public\img\Cronograma\Colombia.jpg" alt="Colombia" />
            <h4 className='ml-4 text-xl font-semibold text-gray-700'>Colombia</h4>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <img className='object-contain w-20' src="\public\img\Cronograma\portugal.png" alt="Portugal" />
            <h4 className='ml-4 text-xl font-semibold text-gray-700'>Portugal</h4>
          </div>
        </div>
        
        <div className='w-1/2 p-6 flex flex-col'>
          <div className='mb-6'>
            <h3 className='text-2xl font-bold text-gray-800'>Detalles</h3>
          </div>
          <div className='flex flex-col gap-y-6'>
            <div className='flex items-center gap-x-10'>
              <label className='text-lg font-medium text-gray-600'>Hora</label>
              <input type="time" className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
            <div className='flex items-center gap-x-10'>
              <label className='text-lg font-medium text-gray-600'>Fecha</label>
              <input type="date" className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
          </div>
          <div className='mt-6 flex justify-between'>
            <button onClick={openModal} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Resulatdos</button>
            <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'>Editar</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="flex justify-center items-center h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className=" rounded-lg shadow-lg overflow-hidden flex flex-col w-[45vw] ">
          <section className="flex flex-col bg-white p-3 ">
            <div className='justify-end flex'>
              <button
                className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col flex-wrap  gap-y-4">
              <div className="flex flex-row">
                <div className='w-[35%] '>
                  <div className='flex content-center justify-center gap-x-5'>
                    <div className='grid place-content-center'>
                      <div>
                        <img className="object-contain w-32 drop-shadow-lg"
                          src="\public\img\Resultados\Madrid.png" alt="img" />
                      </div>
                      <div className='flex justify-center content-center'>
                        <h1 className="my-2">Real Madrid</h1>
                      </div>
                    </div>
                    <div className='grid place-content-center text-4xl p-4 '>
                      0
                    </div>
                  </div>

                </div>

                <div>
                  <div class="relative overflow-x-auto mt-5">
                    <table class="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">Jugador</th>
                          <th scope="col" class="px-6 py-3">Dolsal</th>
                          <th scope="col" class="px-6 py-3">Gol</th>
                          <th scope="col" class="px-6 py-3">Amarilla</th>
                          <th scope="col" class="px-6 py-3">Roja</th>
                        </tr>
                      </thead>
                      {showPlayers && (
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Ronaldo
                            </th>
                            <td className="px-6 py-4">7</td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Messi
                            </th>
                            <td className="px-6 py-4">10</td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                          </tr>

                        </tbody>
                      )}
                    </table>
                    <div className='grid place-content-center'>
                      <button
                        onClick={togglePlayerRows}
                        className="mt-5 px-4 py-2 bg-black text-white roundedflex items-center rounded-md opacity-80"
                      >
                        {showPlayers ? 'Ocultar Jugadores' : 'Mostrar Jugadores'}
                        <FontAwesomeIcon
                          icon={showPlayers ? faChevronUp : faChevronDown}
                          className="ml-2"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className='w-[35%] '>
                  <div className='flex content-center justify-center gap-x-5'>
                    <div className='grid place-content-center'>
                      <div>
                        <img className="object-contain w-32 drop-shadow-lg"
                          src="\public\img\Resultados\Dourmut.png" alt="img" />
                      </div>
                      <div className='flex justify-center content-center'>
                        <h1 className="my-2">Dourmut</h1>
                      </div>
                    </div>
                    <div className='grid place-content-center text-4xl p-4'>
                      0
                    </div>
                  </div>
                </div>

                <div>
                  <div class="relative overflow-x-auto mt-5">
                    <table class="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">Jugador</th>
                          <th scope="col" class="px-6 py-3">Dolsal</th>
                          <th scope="col" class="px-6 py-3">Gol</th>
                          <th scope="col" class="px-6 py-3">Amarilla</th>
                          <th scope="col" class="px-6 py-3">Roja</th>
                        </tr>
                      </thead>
                      {showPlayersTable2 && (
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Messi
                            </th>
                            <td className="px-6 py-4">10</td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                  <div className='grid place-content-center'>
                    <button
                      onClick={togglePlayerRowsTable2}
                      className="mt-5 px-4 py-2 bg-black text-white rounded  flex items-center opacity-75 "
                    >
                      {showPlayersTable2 ? 'Ocultar Jugadores' : 'Mostrar Jugadores'}
                      <FontAwesomeIcon
                        icon={showPlayersTable2 ? faChevronUp : faChevronDown}
                        className="ml-2"
                      />
                    </button>
                  </div>

                </div>
              </div>
            </div>
            <div className="flex justify-end pr-3 pb-3 mt-2">
              <div className="flex justify-end">
                <button className="bg-black text-white py-2 px-4 rounded-lg">
                  Guardar
                </button>
              </div>
            </div>
          </section>
        </div>
      </Modal>
      <section className='w-[35vw] mt-8  flex flex-col border-2 border-gray-300 shadow-lg '>
        <div className='flex flex-row '>
          <div className='w-1/2 p-6 flex flex-col  gap-y-6'>
            <div className='flex flex-row items-center justify-center'>
              <img className='object-contain w-20' src={imagenEquipo1} />
              <h4 className='ml-4 text-xl font-semibold text-gray-700'>{primerEquipo}</h4>
            </div>
            <div className='flex flex-row items-center justify-center'>
              <img className='object-contain w-20' src={imagenEquipo2} alt="Portugal" />
              <h4 className='ml-4 text-xl font-semibold text-gray-700'>{segundoEquipo}</h4>
            </div>
          </div>
          <div className='w-1/2 p-6 flex flex-col'>
            <div className='mb-6'>
              <h3 className='text-2xl font-bold text-gray-800'>Detalles</h3>
            </div>
            <div className='flex flex-col gap-y-6'>
              <div className='flex items-center gap-x-10'>
                <label className='text-lg font-medium text-gray-600'>Hora</label>
                <input type="time" value={horaDeJuego} className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              </div>
              <div className='flex items-center gap-x-10'>
                <label className='text-lg font-medium text-gray-600'>Fecha</label>
                <input type="date" value={FechaDeJuego} className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              </div>
            </div>

          </div>
        </div>
        <div className='mt-6 flex justify-around'>
          <button onClick={openModal} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Ver Calendario</button>
          <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'>Editar</button>
          <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'>Planillero</button>
        </div>
      </section>

    </>
  )
}


