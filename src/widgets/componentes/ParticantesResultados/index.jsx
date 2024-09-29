import React, { useState } from 'react';
import ModalRult from './modal'
import EquiposVer from './equipos';

export default function ResPart() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="flex flex-col md:flex-row h-screen justify-center items-center">
            <div className='w-1/2 flex justify-center items-center'>
                <EquiposVer />
            </div>
            <div className="w-full lg:w-1/2 p-4 lg:p-10">
                <div className="w-full bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center bg-blue-100 p-4 rounded-t-lg">
                        <h2 className="text-sm sm:text-lg font-bold text-center">Argentina vs Colombia</h2>
                    </div>

                    <div className="p-4">
                        <div className="text-xs sm:text-sm text-gray-500">dom., 14 de jul.</div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg"
                                    alt="Argentina"
                                    className="w-6 h-4 sm:w-8 sm:h-6"
                                />
                                <span className="ml-2 text-sm sm:text-base font-bold text-gray-900">Argentina</span>
                            </div>

                            <div className="text-xl sm:text-2xl font-bold">VS</div>

                            <div className="flex items-center">
                                <span className="mr-2 text-sm sm:text-base font-bold text-gray-900">Colombia</span>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg"
                                    alt="Colombia"
                                    className="w-6 h-4 sm:w-8 sm:h-6"
                                />
                            </div>
                        </div>

                        <div className="mt-4 text-gray-500 text-xs sm:text-sm">
                            <div className="mt-2 text-center">Final · Copa América</div>
                        </div>
                        <div className="grid place-content-center mt-4">
                            <button
                                onClick={openModal}
                                className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-600"
                            >
                                Ver resultados del partido
                            </button>
                        </div>
                    </div>
                </div>
                {isModalOpen && <ModalRult closeModal={closeModal} />}
            </div>

        </div>
    )
}
