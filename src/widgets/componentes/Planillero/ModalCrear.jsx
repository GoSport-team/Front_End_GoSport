import Modal from 'react-modal';
Modal.setAppElement('#root');

import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalCrear({ openPlan, onRequestClose, onUsuarioCreado }) {
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [rol, setRol] = useState('planillero');

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            nombres,
            telefono,
            correo,
            contrasena,
            identificacion,
            rol
        };

        axios.post('http://localhost:3001/usuarios/', formData)
            .then(response => {
                console.log('Planillero registrado exitosamente', response.data);
                onUsuarioCreado(); 
                toast.success('Registrado exitosamente');
            })
            .catch(error => {
                toast.error('Error al registrar el Planillero');
                console.error('Error al registrar el Planillero', error);
            });
    };

    return (
        <Modal
            isOpen={openPlan}
            onRequestClose={onRequestClose}
            className="relative flex justify-center items-center h-screen"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="rounded-lg shadow-lg overflow-hidden flex flex-col  bg-white">
                <div className='flex justify-end'>
                    <button
                        className="relative top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                        onClick={onRequestClose}
                    >
                        &times;
                    </button>
                </div>
                <section>
                    <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8 ">
                        <div className="shadow-md p-4  w-[30vw]">
                            <div className="mb-2 flex justify-center"></div>
                            <h2 className="text-center text-2xl font-bold leading-tight text-black">
                                Registrar Usuario para el Partido
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Complete los detalles para agregar un nuevo miembro al sistema.
                            </p>
                            <form className="mt-8" onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Nombre
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="Nombre"
                                                type="text"
                                                value={nombres}
                                                onChange={(e) => setNombres(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Teléfono
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="Teléfono"
                                                type="number"
                                                value={telefono}
                                                onChange={(e) => setTelefono(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Correo
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="Email"
                                                type="email"
                                                value={correo}
                                                onChange={(e) => setCorreo(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Contraseña
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="Contraseña"
                                                type="password"
                                                value={contrasena}
                                                onChange={(e) => setContrasena(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Identificación
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="000-000-000"
                                                type="text"
                                                value={identificacion}
                                                onChange={(e) => setIdentificacion(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="roles" className="text-base font-medium text-gray-900">
                                            Selecciona el rol:
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="roles"
                                                name="roles"
                                                value={rol}
                                                onChange={(e) => setRol(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            >
                                                <option value="Planillero">Planillero</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            type="submit"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </section>
            </div>
        </Modal>
    );
}
