import React from 'react';

export default function VerificarCodigo({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-96 h-[400px] bg-white flex flex-col items-center justify-center p-8 gap-6 relative shadow-lg rounded-lg">
                    <button
                        className="absolute top-2 right-2 w-10 h-10 bg-white text-black text-2xl rounded-full border-none shadow-md cursor-pointer"
                        onClick={onClose}
                    >
                        ×
                    </button>

                    <span className="text-2xl text-gray-900 font-bold">Ingrese el OTP</span>
                    <p className="text-sm text-black text-center leading-6">
                        Hemos enviado un código de verificación a tu número de móvil
                    </p>

                    <div className="w-full flex flex-row gap-4 items-center justify-center">
                        <input
                            required
                            maxLength="1"
                            type="text"
                            className="bg-gray-200 w-12 h-12 text-center border-none rounded-md caret-blue-300 text-gray-800 outline-none font-semibold focus:bg-blue-100 transition-all duration-300"
                            id="otp-input1"
                        />
                        <input
                            required
                            maxLength="1"
                            type="text"
                            className="bg-gray-200 w-12 h-12 text-center border-none rounded-md caret-blue-300 text-gray-800 outline-none font-semibold focus:bg-blue-100 transition-all duration-300"
                            id="otp-input2"
                        />
                        <input
                            required
                            maxLength="1"
                            type="text"
                            className="bg-gray-200 w-12 h-12 text-center border-none rounded-md caret-blue-300 text-gray-800 outline-none font-semibold focus:bg-blue-100 transition-all duration-300"
                            id="otp-input3"
                        />
                        <input
                            required
                            maxLength="1"
                            type="text"
                            className="bg-gray-200 w-12 h-12 text-center border-none rounded-md caret-blue-300 text-gray-800 outline-none font-semibold focus:bg-blue-100 transition-all duration-300"
                            id="otp-input4"
                        />
                    </div>

                    <button
                        className="w-full h-10 bg-blue-400 text-white font-semibold cursor-pointer rounded-lg transition-all duration-200 hover:bg-blue-500"
                        type="submit"
                    >
                        Verificar
                    </button>

                    <p className="text-sm text-black w-full flex flex-col items-center justify-center gap-2">
                        ¿No recibiste el código?{' '}
                        <button className="bg-transparent border-none text-blue-400 cursor-pointer text-base font-bold">
                            Reenviar Código
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
