import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const URL_API = import.meta.env.VITE_API_URL
export default function VerificarCodigo({ isOpen, onClose, onVerified, email }) {
    if (!isOpen) return null;

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const verificationCode = otp.join("");

        try {
            const response = await axios.post(`${URL_API}/auth/verificar-codigo`, {
                correo: email,
                codigo: verificationCode,
            });

            if (response.data.message === 'Código verificado correctamente') {
                toast.success('Código verificado exitosamente.');
                onClose();
                onVerified();
            } else {
                toast.error('Error al verificar el código.');
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
            toast.error('Hubo un problema con la verificación.');
        } finally {
            setLoading(false);
        }
    };

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
                        Hemos enviado un código de verificación a tu correo
                    </p>

                    <div className="w-full flex flex-row gap-4 items-center justify-center">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={otp[index]}
                                onChange={(e) => handleChange(e.target, index)}
                                className="bg-gray-200 w-12 h-12 text-center border-none rounded-md caret-blue-300 text-gray-800 outline-none font-semibold focus:bg-blue-100 transition-all duration-300"
                                required
                            />
                        ))}
                    </div>

                    <button
                        className="w-full h-10 bg-blue-400 text-white font-semibold cursor-pointer rounded-lg transition-all duration-200 hover:bg-blue-500 mt-6"
                        onClick={handleSubmit}
                    >
                        {loading ? 'Verificando...' : 'Verificar'}
                    </button>

                    <p className="text-sm text-black w-full flex flex-col items-center justify-center gap-2">
                        ¿No recibiste el código?{' '}
                        <button
                            onClick={() => toast.info('Reenvío de código en proceso.')}
                            className="bg-transparent border-none text-blue-400 cursor-pointer text-base font-bold"
                        >
                            Reenviar Código
                        </button>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
