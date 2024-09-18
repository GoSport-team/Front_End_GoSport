import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const URL_API = import.meta.env.VITE_API_URL


export const CrearPlanillero = () => {
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [rol, setRol] = useState('planillero');
    const [telefonoError, setTelefonoError] = useState('');
    const [identificacionError, setIdentificacionError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const navigate = useNavigate();


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
            const response = await axios.post(`${URL_API}/usuarios/`, formData);
            console.log('Planillero registrado exitosamente', response.data);
            toast.success('Registrado exitosamente');
            navigate('/dashboard/planillero');
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
        <section className='flex justify-center items-center min-h-screen'>
            <div className="w-[45vw] h-auto shadow-md p-4">
                <div className="mb-2 flex justify-center "></div>
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
                                class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="submit"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </section>
    )
}
