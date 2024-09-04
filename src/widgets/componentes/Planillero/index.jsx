import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ActualizarPlanillero } from './ActualizarPlanillero';
import Swal from 'sweetalert2';
import {

    Typography,

} from "@material-tailwind/react";

export default function Planillero() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState()
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

    const eliminarPlanillero = async (id, nombre) => {
        Swal.fire({
            icon: "question",
            title: `Seguro de que quieres eliminar al planillero ${nombre}`,
            showCancelButton: true,
            confirmButtonText: "Si",
            confirmButtonColor: "#12aed1cd",
            cancelButtonColor: "#9e9e9e",
        }).then(async (result) => {

            if (result.isConfirmed) {
                const response = await axios.delete(`http://localhost:3001/usuarios/${id}`)
                console.log(response.data)
                if (response.data) {
                    Swal.fire("Eliminado", "", "success");
                }
            }
        });

        setUsuarios(usuarios.filter((usuario) => usuario._id !== id))
    }
    if (loading) return <div>Loading...</div>;
    const handleModalActualizar = (id) => {
        setId(id)
        setOpenModal(true)
    }
    const closeModal = () => {
        setOpenModal(false);
    };
    return (
        <>
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-2 text-2xl">
                    Aquí puedes agregar un usuario para que dirija un partido.
                </Typography>

                <button
                    class="mt-4 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-4">
                    <Link to={'/planillero/agregar'}>Agregar planillero</Link>
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Correo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Identificacion
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios && usuarios.map((usuario, indice) => (
                            <tr key={indice} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {usuario.nombres}
                                </th>
                                <td className="px-6 py-4">
                                    {usuario.correo}
                                </td>
                                <td className='px-6 py-4'>
                                    {usuario.identificacion}
                                </td>
                                <td className="px-6 py-4 flex gap-x-5">
                                    <img  className='w-10 cursor-pointer object-cover'
                                    onClick={() => handleModalActualizar(usuario.correo)} 
                                    src="\public\img\Pruebas\avatar-de-usuario (1).png" alt="img" />

                                    <img className='w-10 cursor-pointer object-cover opacity-90'
                                        onClick={() => eliminarPlanillero(usuario._id, usuario.nombres)}
                                    src="\public\img\Pruebas\borrar-usuario (1).png" alt="img" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openModal && (

                <ActualizarPlanillero
                    id={id}
                    isOpen={openModal}
                    onClose={closeModal}
                />
            )}
        </>


    )
}
