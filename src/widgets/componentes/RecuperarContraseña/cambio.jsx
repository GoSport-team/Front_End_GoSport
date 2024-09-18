import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const URL_API = import.meta.env.VITE_API_URL
export default function CambioContraseña({ isOpen, onClose }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        
            await axios.post(`${URL_API}/auth/verificar-codigo`, { password });

            console.log('Nueva contraseña:', password);

            // Mostrar notificación de éxito
            toast.success('Contraseña cambiada exitosamente.');

            // Cerrar el modal
            onClose();
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            toast.error('Hubo un problema al cambiar la contraseña.');
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

                    <span className="text-2xl text-gray-900 font-bold">Crear Nueva Contraseña</span>
                    <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-200 w-full h-12 px-4 text-gray-800 border-none rounded-md outline-none focus:bg-blue-100 transition-all duration-300"
                            required
                        />
                        <button
                            className="w-full h-10 bg-blue-400 text-white font-semibold cursor-pointer rounded-lg transition-all duration-200 hover:bg-blue-500 mt-6"
                            type="submit"
                        >
                            {loading ? 'Guardando...' : 'Guardar Contraseña'}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
