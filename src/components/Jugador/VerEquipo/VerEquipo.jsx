import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export const VerEquipo = () => {
    const { cedula } = useParams()
    const [equipo, setEquipo] = useState(null)
const [image, setImage] = useState()
    const handleImage = async (e) => {
        const file = e.target.files[0]
        setImage(
            {
                img:URL.createObjectURL(file),
                tipo:"local",
                file: file
            })
       
      }
      console.log(image)
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
               tipo:"Cloudinary"
            })
            setEquipo(response.data)
        }
        obtnenerEquipo()
    }, [])

    console.log(equipo)

    const actualizarLogo = async () => {
        try {
            Swal.fire({
                icon: "question",
                title: "Seguro de que quieres cambiar el logo del equipo",
                confirmButtonText: "Si",
                cancelButtonText:"No",
                confirmButtonColor: "#04ff00",
                cancelButtonColor: "#d33",
            }).then(async(result) =>{
               if(result.isConfirmed){
                const formData = new FormData();
                console.log(image.file)
                formData.append("file", image.file)
                   const response = await axios.patch(`http://localhost:3001/inscripcionEquipos/${equipo._id}/${equipo.idLogo}`,formData )
                   if (response.data.message) {
                       Swal.fire({
                           icon: "success",
                           title: response.data.message,
                           confirmButtonText: "OK",
                           confirmButtonColor: "#0837C0",
                       })
                       setImage({
                        img: response.data.url,
                        tipo:"Cloudinary"
                       })
                   }
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
    return (
        <div className="flex flex-col items-center justify-center ">
            <form action="">
                {equipo ?
                    <div className="bg-gray-200 mt-20 rounded-lg p-5">
                        <h2 className="text-xl font-bold ml-5">Planilla Inscripcion Equipo</h2>

                        <div className="flex items-center gap-5  mt-6">
                            <label className="" htmlFor="name">
                                Equipo
                            </label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={equipo.nombreEquipo} />
                        </div>
                        <div className="flex items-center gap-3  mt-6">
                            <label className="mt-4-label" htmlFor="address">
                                Capitan
                            </label>
                            <input
                                value={equipo.nombreCapitan}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="address"
                                placeholder={equipo.nombreCapitan} />
                        </div>
                        <div className="flex gap-16 items- mt-5">
                            <div className="flex  items-center  gap-5">
                                <label className="text-black " htmlFor="city">
                                    Contacto
                                </label>
                                <input
                                    value={equipo.contactoUno}
                                    placeholder={equipo.contactoUno}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="city"
                                    type="text"

                                />
                                <input
                                    placeholder={equipo.contactoDos}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="state"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <img src={image.img} className=" w-44 h-44 top-52" alt="Logo Del Equipo" />
                                <div className='flex gap-5'>
                                {
                                image.tipo == 'Cloudinary'?
                                <label for="uploadFile1"
                                    className="mt-5 flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                                        <path
                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                            data-original="#000000" />
                                        <path
                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                            data-original="#000000" />
                                    </svg>
                                    Cambiar Logo
                                    <input onChange={handleImage} type="file" id='uploadFile1' className="hidden" />
                                </label>
                          :
                                <label for="uploadFile1"
                                className="mt-5 flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                                    <path
                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        data-original="#000000" />
                                    <path
                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        data-original="#000000" />
                                </svg>
                                Subir
                                <button onClick={()=>actualizarLogo()} type="button" id='uploadFile1' className="hidden" />
                            </label>
                            }
                            </div>
                            </div>
                        </div>
                    </div>
                    : <h1 className='text-2xl font-bold mt-10'>No tienes equipos creados todavia</h1>}
                <div className="bg-gray-200 mt-10 p-5 rounded-xl">
                    <table className="w-full border-separate mt-8">
                        <thead>
                            <tr>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">N°</th>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Nombre </th>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Ficha </th>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border th3">N° Dorsal </th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipo && equipo.participantes.map((equipo, index) => (
                                <tr className="border-separate text-center text-lg font-medium">
                                    <td className="border rounded-md p-1 bg-white">{index + 1}</td>
                                    <td className="border rounded-md p-1 bg-white">{equipo.nombreJugador}</td>
                                    <td className="border rounded-md p-1 bg-white">{equipo.ficha}</td>
                                    <td className="border rounded-md p-1 bg-white">{equipo.dorsal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    )
}
