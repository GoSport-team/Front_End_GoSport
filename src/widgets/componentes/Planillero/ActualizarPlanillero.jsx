import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

Modal.setAppElement('#root');
export const ActualizarPlanillero = ({ id, isOpen, onClose }) => {
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [planillero, setPlanillero] = useState()
    console.log(id)
    useEffect(() => {
        if (id !== undefined) {
            const actualizarPlanillero = async () => {
                const response = await axios.get(`http://localhost:3001/usuarios/${id}`)
                setPlanillero(response.data)
            }
            actualizarPlanillero()
        }

    }, [id])
    if (!planillero) return <div>...Loanding</div>

    const verificarActualizacion = () => {
        const existeActualizacion = nombres || telefono || correo || contrasena || identificacion
        return existeActualizacion
    }
    const actualizarPlanillero = () => {
        const datosAEnviar = {}

        if (nombres !== planillero.nombres && nombres !== undefined) {
            datosAEnviar.nombres = nombres
        }
        if (telefono !== planillero.telefono && telefono !== undefined) {
            datosAEnviar.telefono = telefono
        }
        if (correo !== planillero.correo && correo !== undefined) {
            datosAEnviar.correo = correo
        }
        if (identificacion !== planillero.identificacion && identificacion !== undefined) {
            datosAEnviar.identificacion = identificacion
        }
        if (contrasena !== planillero.contrasena && contrasena !== undefined) {
            datosAEnviar.contrasena = contrasena
        }


        Swal.fire({
            title: "Seguro que deseas actualizar el Planillero",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Save",
            confirmButtonColor: "#04ff00",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.patch(`http://localhost:3001/usuarios/${id}`, datosAEnviar)
                    Swal.fire({
                        title: "Equipo actualizado correctamente",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#0837C0",
                    });
                    console.log(response.data)
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                className="flex justify-center items-center h-screen w-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <section className='flex justify-center mt-5 bg-white rounded-xl'>
                    <div className="w-[40vw] h-auto shadow-md p-4 ">
                        <div className="mb-2 flex justify-end gap-5">
                            <button
                                className="text-gray-600 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                                onClick={onClose}
                            >
                                &times;
                            </button>
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black">
                            Actualiza los datos del planillero
                        </h2>



                        <form className="mt-8" >
                            <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Nombre
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder={planillero.nombres}
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
                                            placeholder={planillero.telefono}
                                            type="tel"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
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
                                            placeholder={planillero.identificacion}
                                            type="text"
                                            value={identificacion}
                                            onChange={(e) => setIdentificacion(e.target.value)}
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
                                            placeholder={planillero.correo}
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

                                </div>
                                <div className="col-span-2 flex justify-between content-center items-center">
                                    {verificarActualizacion() && (
                                        <button
                                             class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button"
                                        >
                                            Guardar
                                        </button>
                                    )}

                                </div>
                            </div>
                        </form>

                    </div>
                </section>
            </Modal>
        </>
    )
}
