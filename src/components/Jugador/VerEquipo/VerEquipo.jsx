import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { eliminarJugador, searchJugador } from '../useFunciones'
export const VerEquipo = () => {
    const { cedula } = useParams()
    const [equipo, setEquipo] = useState(null)
    const [jugadores, setJugadores] = useState([])
    const [jugador, setJugador] = useState()
    const [image, setImage] = useState()
    const [nombreEquipo, setNombreEquipo] = useState()
    const [contactoDos, setContactoDos] = useState()
    const [user, setUser] = useState()
    const token = Cookies.get('token')
    const [data, setData] = useState({
        nombreEquipo: '',
        contactoDos: ''
    })
    const [validarInscripcion, setValidarInscripcion] = useState()
    const handleImage = async (e) => {
        const file = e.target.files[0]
        setImage(
            {
                img: URL.createObjectURL(file),
                tipo: "local",
                file: file
            })

    }

    useEffect(() => {
        const validarInscripcion = async () => {
            const responseValidador = await axios.get(`http://localhost:3001/equipoInscripto/validarInscripcion`, {
                headers: {
                    cedulaJugador: cedula
                }
            })

            setValidarInscripcion(responseValidador.data.msg)
        }

        validarInscripcion()
    }, [])

    useEffect(() => {
        const obtenerUser = async () => {
            const response = await axios.get('http://localhost:3001/usuarios/perfil', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(response.data)
        }
        obtenerUser()
    }, [])

    useEffect(() => {
        const obtnenerEquipo = async () => {
            const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${cedula}`)
            console.log(response.data)
            if (response.data == 'EQUIPO NO ENCONTRADO') {
                return setEquipo(null)
            }
            setImage(
                {
                    img: response.data.imgLogo,
                    tipo: "Cloudinary"
                })
            setEquipo(response.data)
            setJugadores(response.data.participantes)

        }
        obtnenerEquipo()
    }, [])

    const actualizarLogo = async () => {
        try {
            Swal.fire({
                icon: "question",
                title: "Seguro de que quieres cambiar el logo del equipo",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                confirmButtonColor: "#04ff00",
                cancelButtonColor: "#d33",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    console.log(image.file)
                    formData.append("file", image.file)
                    const response = await axios.patch(`http://localhost:3001/inscripcionEquipos/${equipo._id}/${equipo.idLogo}`, formData)
                    if (response.data.message) {
                        Swal.fire({
                            icon: "success",
                            title: response.data.message,
                            confirmButtonText: "OK",
                            confirmButtonColor: "#0837C0",
                        })
                        setImage({
                            img: response.data.url,
                            tipo: "Cloudinary"
                        })
                    }
                } else {
                    setImage({
                        img: equipo.imgLogo,
                        tipo: "Cloudinary"
                    })
                }
            })

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Hubo un error al momento de actualizar la imagen",
                confirmButtonText: "OK",
                confirmButtonColor: "#E42245",
            })
        }
    }

    const buscarJugador = async (identificacion) => {
        const response = await searchJugador(identificacion, jugadores)
        if (response) {
            setJugadores(prev => [...prev,
            {
                _id: response._id,
                nombreJugador: response.nombreJugador,
                ficha: response.ficha,
                dorsal: response.dorsal
            }
            ])
        }
    }
    const eliminarJug = async (indice) => {
        const response = await eliminarJugador(indice, jugadores, user)
        setJugadores(response)
    }
    const verificarActualizacion = () => {
        if (equipo) {
            const verificarArray = equipo.participantes.filter((item1) => !jugadores.some((item2) => item1.nombreJugador == item2.nombreJugador))
            if (verificarArray.length > 0) {
                return verificarArray
            }
            const existeActualizacion = nombreEquipo || contactoDos || jugadores.length > equipo.participantes.length

            return existeActualizacion
        }
    }

    const actualizarEquipo = async () => {

        const datosAEnviar = {}
        if (nombreEquipo !== equipo.nombreEquipo && nombreEquipo !== undefined) {
            datosAEnviar.nombreEquipo = nombreEquipo
        }
        if (contactoDos !== equipo.contactoDos && contactoDos !== undefined) {
            datosAEnviar.contactoDos = contactoDos
        }
        datosAEnviar.participantes = jugadores
        Swal.fire({
            title: "Seguro que deseas actualizar el equipo",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Save",
            confirmButtonColor: "#04ff00",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.patch(`http://localhost:3001/inscripcionEquipos/completo/${equipo._id}`, datosAEnviar)
                    console.log(response.data)
                    Swal.fire({
                        title: "Equipo actualizado correctamente",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#0837C0",
                    });
                    setEquipo(response.data)
                    setNombreEquipo()
                    setContactoDos()
                } catch (error) {
                    console.log(error)
                }
            }
        })

    }

    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-200 p-6">
        //     <form action="" className='flex flex-row  p-8 w-[80vw] justify-center content-center gap'>
        //         {equipo ?
        //             <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-sm w-[50vw]">
        //                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Planilla Inscripcion Equipo</h2>

        //                 <div className="flex flex-col gap-4 mb-6">
        //                     <label className="text-gray-700 text-sm font-medium" htmlFor="name">
        //                         Equipo
        //                     </label>
        //                     <input
        //                         onChange={(e) => setNombreEquipo(e.target.value)}
        //                         className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out hover:border-gray-400"
        //                         type="text"
        //                         placeholder={equipo.nombreEquipo} />
        //                 </div>

        //                 <div className="flex flex-col gap-4 mb-6">
        //                     <label className="text-gray-700 text-sm font-medium" htmlFor="address">
        //                         Capitan
        //                     </label>
        //                     <input
        //                         value={equipo.nombreCapitan}
        //                         className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out hover:border-gray-400"
        //                         id="address"
        //                         placeholder={equipo.nombreCapitan} />
        //                 </div>

        //                 <div className="flex gap-8 mb-6">
        //                     <div className="flex flex-col gap-4">
        //                         <div className='flex items-center gap-4'>
        //                             <label className="text-gray-700 font-medium" htmlFor="city">
        //                                 Contacto Uno
        //                             </label>
        //                             <input
        //                                 value={equipo.contactoUno}
        //                                 placeholder={equipo.contactoUno}
        //                                 className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-3 transition duration-200 ease-in-out hover:border-gray-400"
        //                                 id="city"
        //                                 type="text" />
        //                         </div>
        //                         <div className='flex items-center gap-4'>
        //                             <label className="text-gray-700 font-medium" htmlFor="city">
        //                                 Contacto Dos
        //                             </label>
        //                             <input
        //                                 onChange={(e) => setContactoDos(e.target.value)}
        //                                 placeholder={equipo.contactoDos}
        //                                 className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-3 transition duration-200 ease-in-out hover:border-gray-400"
        //                                 id="state"
        //                                 type="text" />
        //                         </div>
        //                     </div>

        //                     <div className="flex flex-col items-center justify-center">
        //                         <img src={image.img} className="w-32  rounded-lg shadow-md mb-4 object-cover" alt="Logo Del Equipo" />

        //                         {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
        //                             <div className='flex flex-col gap-4'>
        //                                 {
        //                                     image.tipo == 'Cloudinary' ?
        //                                         <label htmlFor="uploadFile1"
        //                                             className="flex items-center bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 rounded-lg cursor-pointer">
        //                                             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white" viewBox="0 0 32 32">
        //                                                 <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
        //                                                 <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
        //                                             </svg>
        //                                             Cambiar Logo
        //                                             <input onChange={handleImage} type="file" id='uploadFile1' className="hidden" />
        //                                         </label>
        //                                         :
        //                                         <label htmlFor="uploadFile1"
        //                                             className="flex items-center bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 rounded-lg cursor-pointer">
        //                                             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white" viewBox="0 0 32 32">
        //                                                 <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
        //                                                 <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
        //                                             </svg>
        //                                             Subir
        //                                             <button onClick={() => actualizarLogo()} type="button" id='uploadFile1' className="hidden" />
        //                                         </label>
        //                                 }
        //                             </div>
        //                             : ''}
        //                     </div>
        //                 </div>
        //             </div>
        //             : <h1 className='text-2xl font-bold text-center text-gray-700 mt-10'>No tienes equipos creados todavía</h1>}

        //         <div className=" p-6 rounded-lg shadow-sm w-[45vw] flex justify-center align-content-center content-center bg-gray-50">
        //             {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
        //                 <div className='flex flex-col items-center gap-4'>
        //                     <label className="font-semibold text-lg text-gray-800">Busca tus compañeros</label>
        //                     <input type="search" className="h-12 w-80 rounded-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out" onChange={e => setJugador(e.target.value)} placeholder='Busca por su numero de cedula' />
        //                     <button className='px-8 py-4 text-base uppercase font-semibold text-white bg-teal-500 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-teal-600 hover:shadow-lg hover:text-black'
        //                         type="button"
        //                         onClick={() => buscarJugador(jugador)}>Buscar</button>
        //                 </div>
        //                 : ''}

        //             <table className="w-full mt-8 border-separate border-spacing-0 bg-white shadow-sm rounded-lg">
        //                 <thead className=''>
        //                     <tr>
        //                         <th className="bg-blue-gray-200 text-white py-3 px-4 rounded-tl-lg">N°</th>
        //                         <th className="bg-blue-gray-200 text-white py-3 px-4">Nombre</th>
        //                         <th className="bg-blue-gray-200 text-white py-3 px-4">Ficha</th>
        //                         <th className="bg-blue-gray-200 text-white py-3 px-4">N° Dorsal</th>
        //                         {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
        //                             <th className="bg-blue-gray-200 text-white py-3 px-4 rounded-tr-lg">Eliminar</th>
        //                             : ''}
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {jugadores && jugadores.map((equipo, index) => (
        //                         <tr key={index} className="text-center text-gray-700">
        //                             <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
        //                             <td className="py-2 px-4 border-b border-gray-200">{equipo.nombreJugador}</td>
        //                             <td className="py-2 px-4 border-b border-gray-200">{equipo.ficha}</td>
        //                             <td className="py-2 px-4 border-b border-gray-200">{equipo.dorsal}</td>
        //                             {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
        //                                 <td className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => eliminarJug(index)}>
        //                                     <img className="w-6 h-6 mx-auto" src="/public/img/carrusel/eliminar.svg" alt="Eliminar" />
        //                                 </td>
        //                                 : ''}
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </form>

        //     {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
        //         <div className='flex flex-col items-center justify-center w-1/2'>
        //             {verificarActualizacion() && (
        //                 <h1
        //                     onClick={() => actualizarEquipo()}
        //                     className='bg-black text-white p-4 w-48 rounded-lg text-xl font-bold cursor-pointer hover:bg-gray-800'>
        //                     Actualizar
        //                 </h1>
        //             )}
        //         </div>
        //         : ''}
        // </div>

        <div className="flex w-screen h-screen justify-center items-center gap-8">
            <div className="w-[45vw] h-[60vh] p-6 bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col">
                {equipo ? (
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Planilla Inscripción Equipo</h2>

                        <div className="flex flex-col gap-4 mb-6">
                            <label className="text-gray-700 text-sm font-medium" htmlFor="name">Equipo</label>
                            <input
                                onChange={(e) => setNombreEquipo(e.target.value)}
                                className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out hover:border-gray-400"
                                type="text"
                                placeholder={equipo.nombreEquipo}
                            />
                        </div>

                        <div className="flex flex-col gap-4 mb-6">
                            <label className="text-gray-700 text-sm font-medium" htmlFor="address">Capitán</label>
                            <input
                                value={equipo.nombreCapitan}
                                className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out hover:border-gray-400"
                                id="address"
                                placeholder={equipo.nombreCapitan}
                            />
                        </div>

                        <div className="flex flex-col gap-8 mb-6 flex-1">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-700 font-medium" htmlFor="city">Contacto Uno</label>
                                    <input
                                        value={equipo.contactoUno}
                                        placeholder={equipo.contactoUno}
                                        className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out hover:border-gray-400"
                                        id="city"
                                        type="text"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-700 font-medium" htmlFor="city">Contacto Dos</label>
                                    <input
                                        onChange={(e) => setContactoDos(e.target.value)}
                                        placeholder={equipo.contactoDos}
                                        className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200 ease-in-out hover:border-gray-400"
                                        id="state"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <img
                                    src={image.img}
                                    className="w-32 rounded-lg  mb-4 object-cover"
                                    alt="Logo Del Equipo"
                                />

                                {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ? (
                                    <div className="flex flex-col gap-4">
                                        {image.tipo === 'Cloudinary' ? (
                                            <label htmlFor="uploadFile1" className="flex items-center bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 rounded-lg cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white" viewBox="0 0 32 32">
                                                    <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                                                    <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                                                </svg>
                                                Cambiar Logo
                                                <input onChange={handleImage} type="file" id="uploadFile1" className="hidden" />
                                            </label>
                                        ) : (
                                            <label htmlFor="uploadFile1" className="flex items-center bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 rounded-lg cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white" viewBox="0 0 32 32">
                                                    <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                                                    <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                                                </svg>
                                                Subir
                                                <button onClick={() => actualizarLogo()} type="button" id="uploadFile1" className="hidden" />
                                            </label>
                                        )}
                                    </div>
                                ) : ''}
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1 className="text-2xl font-bold text-center text-gray-700 mt-10">No tienes equipos creados todavía</h1>
                )}
            </div>

            <div className="w-[45vw] h-[60vh] flex flex-col  bg-blue-gray-50 rounded-xl">
                <div className="rounded-lg shadow-sm flex flex-col w-[45vw] h-[60vh]">
                    <div className="flex flex-col  gap-4 mt-8 px-4">
                        {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ? (
                            <div className="flex flex-row items-center gap-4">
                                <label className="font-semibold text-lg text-gray-800">Busca tus compañeros</label>
                                <input
                                    type="search"
                                    className="h-12 w-80 rounded-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                                    onChange={(e) => setJugador(e.target.value)}
                                    placeholder="Busca por su número de cédula"
                                />
                                <button
                                    class=" select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => buscarJugador(jugador)}
                                >
                                    Buscar
                                </button>
                            </div>
                        ) : ''}
                    </div>

                    <div className="w-full mt-8 px-4">
                        <table className="w-full border-separate border-spacing-0 bg-white shadow-sm rounded-lg">
                            <thead>
                                <tr>
                                    <th className="bg-blue-gray-200 text-white py-3 px-4 rounded-tl-lg">N°</th>
                                    <th className="bg-blue-gray-200 text-white py-3 px-4">Nombre</th>
                                    <th className="bg-blue-gray-200 text-white py-3 px-4">Ficha</th>
                                    <th className="bg-blue-gray-200 text-white py-3 px-4">N° Dorsal</th>
                                    {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ? (
                                        <th className="bg-blue-gray-200 text-white py-3 px-4 rounded-tr-lg">Eliminar</th>
                                    ) : ''}
                                </tr>
                            </thead>
                            <tbody>
                                {jugadores && jugadores.map((equipo, index) => (
                                    <tr key={index} className="text-center text-gray-700">
                                        <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{equipo.nombreJugador}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{equipo.ficha}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{equipo.dorsal}</td>
                                        {validarInscripcion !== 'Equipo ya está Inscrito en un campeonato' ? (
                                            <td
                                                className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => eliminarJug(index)}
                                            >
                                                <img className="w-6 h-6 mx-auto" src="/public/img/carrusel/eliminar.svg" alt="Eliminar" />
                                            </td>
                                        ) : ''}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ? (
                        <div className="px-4 mt-5 w-[10vw]">
                            {verificarActualizacion() && (
                                <h1
                                    onClick={() => actualizarEquipo()}
                                    class=" select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Actualizar
                                </h1>
                            )}
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>


    )
}
