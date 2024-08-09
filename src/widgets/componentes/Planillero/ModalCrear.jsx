import Modal from 'react-modal';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export default function ModalCrear({ openPlan, onRequestClose, onUsuarioCreado }) {
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [rol, setRol] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [identificacionError, setIdentificacionError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (contrasena !== confirmarContrasena) {
            setPasswordError('Las contraseñas no coinciden.');
            return;
        }
        setPasswordError(''); 

        if (!rol) {
            setRoleError('Selecciona un rol.');
            return;
        }
        setRoleError(''); 
        if (telefono.length !== 10 || !/^\d{10}$/.test(telefono)) {
            setTelefonoError('El teléfono debe tener 10 números.');
            return;
        }
        setTelefonoError('');

        if (identificacion.length !== 10 || !/^\d{10}$/.test(identificacion)) {
            setIdentificacionError('La identificación debe tener 10 números.');
            return;
        }
        setIdentificacionError('');

        const formData = {
            nombres,
            telefono,
            correo,
            contrasena,
            identificacion,
            rol
        };

        try {
            const response = await axios.post('http://localhost:3001/usuarios/', formData);
            console.log('Planillero registrado exitosamente', response.data);
            onUsuarioCreado();
            toast.success('Registrado exitosamente');
        } catch (error) {
            toast.error('Error al registrar');
            console.error('Error al registrar ', error);
        }
    };

    const handleReset = () => {
        setNombres('');
        setTelefono('');
        setCorreo('');
        setContrasena('');
        setConfirmarContrasena('');
        setIdentificacion('');
        setRol('');
        setTelefonoError('');
        setIdentificacionError('');
        setPasswordError('');
        setRoleError('');
    };

    return (
        <Modal
            isOpen={openPlan}
            onRequestClose={onRequestClose}
            className="relative flex justify-center items-center h-screen"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="rounded-lg shadow-lg overflow-hidden flex flex-col bg-white">
                <div className='flex justify-end'>
                    <button
                        className="relative top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                        onClick={onRequestClose}
                    >
                        &times;
                    </button>
                </div>
                <section>
                    <div className="flex bg-white items-center justify-center px-3 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8 w-[40vw]">
                        <div className=" p-4 w-full max-w-2xl">
                            <div className="mb-2 flex justify-center"></div>
                            <h2 className="text-center text-2xl font-bold leading-tight text-black">
                                Registrar Usuario para el Partido
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Complete los detalles para agregar un nuevo miembro al sistema.
                            </p>
                            <form className="mt-8" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
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
                                                type="tel"
                                                value={telefono}
                                                onChange={(e) => setTelefono(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                            {telefonoError && (
                                                <p className="mt-1 text-sm text-red-600">{telefonoError}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Identificación
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="0000000000"
                                                type="text"
                                                value={identificacion}
                                                onChange={(e) => setIdentificacion(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                            {identificacionError && (
                                                <p className="mt-1 text-sm text-red-600">{identificacionError}</p>
                                            )}
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
                                            Confirmar Contraseña
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="Confirmar Contraseña"
                                                type="password"
                                                value={confirmarContrasena}
                                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            />
                                        </div>
                                        {passwordError && (
                                            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                                        )}
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
                                                <option value="">Selecciona un rol</option>
                                                <option value="planillero">Planillero</option>
                                            </select>
                                        </div>
                                        {roleError && (
                                            <p className="mt-1 text-sm text-red-600">{roleError}</p>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex justify-between content-center items-center">
                                        <button
                                            className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            type="submit"
                                        >
                                            Guardar
                                        </button>
                                        <div>
                                            <img onClick={handleReset} className="inline-flex w-6 h-6 cursor-pointer items-center justify-center object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80"
                                                src="\public\img\Campeonato\reset.png" alt="img" />
                                        </div>
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
