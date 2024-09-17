import React, { useState } from 'react';
import VerificarCodigo from './verificar';

export default function InicioPassword() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <div className='grid place-content-center h-screen'>
            <section>
                <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                    <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                        <div className="flex flex-col">
                            <div>
                                <h2 className="text-4xl text-black">Recuperar Contraseña</h2>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input value="https://jamstacker.studio/thankyou" type="hidden" name="_redirect" />
                            <div className="mt-4 space-y-6">
                                <div className="col-span-full my-3">
                                    <label className="block mb-3 text-sm font-medium text-gray-600"> Email </label>
                                    <input
                                        type="email"
                                        placeholder="ingrese su correo"
                                        className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-full w-full flex justify-end">
                                    <button
                                        type="submit"
                                        className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        Enviar
                                    </button>
                                </div>
                                <VerificarCodigo isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
