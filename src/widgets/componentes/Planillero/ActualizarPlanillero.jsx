import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export const ActualizarPlanillero = ({ id, isOpen, onClose }) => {
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [planillero, setPlanillero] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id !== undefined) {
            const fetchPlanillero = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/usuarios/id/${id}`);
                    const data = response.data;
                    setPlanillero(data);
                    setNombres(data.nombres || '');
                    setTelefono(data.telefono || '');
                    setCorreo(data.correo || '');
                    setIdentificacion(data.identificacion || '');
                } catch (error) {
                    toast.error('Error al cargar los datos del planillero', { autoClose: 5000 });
                    console.error('Error fetching planillero:', error);
                }
            };
            fetchPlanillero();
        }
    }, [id]);

    const verificarActualizacion = () => {
        return nombres !== planillero?.nombres || telefono !== planillero?.telefono || correo !== planillero?.correo || contrasena || identificacion !== planillero?.identificacion;
    };

    const handleUpdate = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        const datosAEnviar = {};

        if (nombres && nombres !== planillero.nombres) datosAEnviar.nombres = nombres;
        if (telefono && telefono !== planillero.telefono) datosAEnviar.telefono = telefono;
        if (correo && correo !== planillero.correo) datosAEnviar.correo = correo;
        if (identificacion && identificacion !== planillero.identificacion) datosAEnviar.identificacion = identificacion;
        if (contrasena) datosAEnviar.contrasena = contrasena;

        if (!verificarActualizacion()) {
            toast.info('No hay cambios para actualizar', { autoClose: 5000 });
            setIsSubmitting(false);
            return;
        }

        if (contrasena && contrasena !== confirmarContrasena) {
            toast.error('Las contraseñas no coinciden', { autoClose: 5000 });
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.patch(`http://localhost:3001/usuarios/${id}`, datosAEnviar);
            toast.success('Planillero actualizado correctamente', { autoClose: 1000 });
            setIsSubmitting(false);
            setTimeout(() => onClose(), 5000);
        } catch (error) {
            if (error.response) {
                toast.error(`Error al actualizar el planillero: ${error.response.data.message || error.response.statusText}`, { autoClose: 5000 });
                console.error('Error updating planillero response:', error.response);
            } else if (error.request) {
                toast.error('Error al conectar con el servidor', { autoClose: 5000 });
                console.error('Error updating planillero request:', error.request);
            } else {
                toast.error('Error en la solicitud de actualización', { autoClose: 5000 });
                console.error('Error updating planillero message:', error.message);
            }
            setIsSubmitting(false);
        }
    };

    if (!planillero) return <div>Loading...</div>;

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
                    <div className="w-[40vw] h-auto shadow-md p-4">
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

                        <form className="mt-8">
                            <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
                                <div>
                                    <label className="text-base font-medium text-gray-900">Nombre</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={nombres}
                                            onChange={(e) => setNombres(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Teléfono</label>
                                    <div className="mt-2">
                                        <input
                                            type="tel"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Identificación</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={identificacion}
                                            onChange={(e) => setIdentificacion(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Correo</label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Contraseña</label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            value={contrasena}
                                            onChange={(e) => setContrasena(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Confirmar Contraseña</label>
                                    <div className="mt-2">
                                        <input
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
                                            className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button"
                                            onClick={handleUpdate}
                                            disabled={isSubmitting}
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
    );
};
