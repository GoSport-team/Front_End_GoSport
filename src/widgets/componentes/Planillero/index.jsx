import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Planillero() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
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

    console.log(usuarios)
    return (
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <button className='bg-gradient-to-tr from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-8 py-4 rounded mb-5 '><Link to={'/planillero/agregar'}>Agregar planillero</Link></button>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Correo
                </th>
                <th scope="col" class="px-6 py-3">
                    Actualizar
                </th>
                <th scope="col" class="px-6 py-3">
                    Eliminar
                </th>
            </tr>
        </thead>
        <tbody>
            {usuarios && usuarios.map((usuario)=>(
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {usuario.nombres}
                </th>
                <td class="px-6 py-4">
                    {usuario.correo}
                </td>
                <td class="px-6 py-4">
                    <FaUserEdit className='w-10 h-8 text-cyan-800'/>
                </td>
                <td class="px-6 py-4">
                    <FaTrashAlt  className='w-10 h-8 text-red-400'/>
                </td>
            </tr>
            ))}
        </tbody>
    </table>

    
</div>
       
               
    )
}
