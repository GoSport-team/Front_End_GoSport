'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Planillero() {
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [rol, setRol] = useState('planillero');

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

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
                toast.success('Usuario registrado exitosamente');
                console.log('Usuario registrado exitosamente', response.data);
            })
            .catch(error => {
                toast.error('Error al registrar el usuario');
                console.error('Error al registrar el usuario', error);
            });
    };


    const fetchUsuarios = () => {
        axios.get('http://localhost:3001/usuarios/')
            .then(response => {
                const usuariosFiltrados = response.data.filter(user => user.rol.toLowerCase() === 'planillero');
                setUsuarios(usuariosFiltrados);
                setLoading(false);
            })
            .catch(error => {
                toast.error('Error al obtener usuarios');
                console.error('Error al obtener usuarios', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    if (loading) return <div>Loading...</div>;


    return (
        <div>
            <section>
                <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                    <div className="w-[50vw] h-auto shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
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
                                        type="submit">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ToastContainer />

                        <section className="mt-8">
                            <h3 className="text-xl font-semibold">Usuarios con rol "Usuario"</h3>
                            <ul className="mt-4 space-y-2">
                                {usuarios.length === 0 ? (
                                    <p>No hay usuarios con el rol "Usuario".</p>
                                ) : (
                                    usuarios.map((usuario, index) => (
                                        <li key={index} className="border p-4 rounded-md">
                                            <p><strong>Nombre:</strong> {usuario.nombres}</p>
                                            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                                            <p><strong>Correo:</strong> {usuario.correo}</p>
                                            <p><strong>Identificación:</strong> {usuario.identificacion}</p>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}
