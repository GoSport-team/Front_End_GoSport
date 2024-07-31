import React, { useState } from 'react';

export default function Jugadores({ isOpen, onClose }) {
    const [hoveredPlayer, setHoveredPlayer] = useState({ img: null, name: '' });

    if (!isOpen) return null;

    return (
        <div className=" z-50 absolute bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[70vw] h-[70vh]">
                <button
                    className=" top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="flex flex-row h-full">
                    <div className='w-[50%] flex flex-col items-center justify-center p-4 overflow-auto'>
                        <img
                            className="w-48 object-contain p-2 cursor-pointer"
                            src="/img/Pruebas/jugador1.png"
                            alt="Jugador 1"
                            onMouseEnter={() => setHoveredPlayer({ img: '/img/Pruebas/jugador1.png', name: 'Jugador 1' })}
                        />
                        <img
                            className="w-48 object-contain p-2 cursor-pointer"
                            src="/img/Pruebas/jugador2.png"
                            alt="Jugador 2"
                            onMouseEnter={() => setHoveredPlayer({ img: '/img/Pruebas/jugador2.png', name: 'Cuadrado' })}
                        />
                        <img
                            className="w-48 object-contain p-2 cursor-pointer"
                            src="/img/Pruebas/jugador3.png"
                            alt="Jugador 3"
                            onMouseEnter={() => setHoveredPlayer({ img: '/img/Pruebas/jugador3.png', name: 'James' })}
                        />
                        <img
                            className="w-48 object-contain p-2 cursor-pointer"
                            src="/img/Pruebas/jugador4.png"
                            alt="Jugador 4"
                            onMouseEnter={() => setHoveredPlayer({ img: '/img/Pruebas/jugador4.png', name: 'Jugador 4' })}
                        />

                    </div>

                    <div className="w-[50%] flex flex-col items-center justify-center p-4">
                        {hoveredPlayer.img ? (
                            <>
                                <img
                                    className="w-full h-full object-contain"
                                    src={hoveredPlayer.img}
                                    alt={hoveredPlayer.name}
                                />
                                <h2 className="text-xl font-semibold mt-4">{hoveredPlayer.name}</h2>
                            </>
                        ) : (
                            <h1 className="text-gray-600">Imagen del jugador</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
