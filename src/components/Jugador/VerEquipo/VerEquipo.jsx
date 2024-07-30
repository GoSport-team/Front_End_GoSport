import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const VerEquipo = () => {
    const {cedula} = useParams()
    const [equipo, setEquipo] = useState(null)
    useEffect(() => {
        const obtnenerEquipo = async () => {
            const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${cedula}`)
            console.log(response.data)
            if (response.data == 'EQUIPO NO ENCONTRADO') {
               return setEquipo(null)
            }
            setEquipo(response.data)
        }
        obtnenerEquipo()
    }, [])

    console.log(equipo)
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
                            <input value={equipo.nombreEquipo} className="mr-6 h-9 rounded-lg w-96" type="text" placeholder="Nombre del equipo" />
                        </div>
                        <div className="flex items-center gap-3  mt-6">
                            <label className="mt-4-label" htmlFor="address">
                                Capitan
                            </label>
                            <input value={equipo.nombreCapitan} className=" h-9 rounded-lg w-96" id="address" placeholder="Nombre del capitan" />
                        </div>
                        <div className="flex gap-16 items- mt-5">
                            <div className="flex  items-center  gap-5">
                                <label className="text-black " htmlFor="city">
                                    Contacto
                                </label>
                                <input
                                    value={equipo.contactoUno}
                                    placeholder="Principal"
                                    className="mr-6 h-9 rounded-lg w-72"
                                    id="city"
                                    type="text"

                                />
                                <input
                                    value={equipo.contactoDos}
                                    placeholder="Secundario"
                                    className="mr-6 h-9 rounded-lg w-72"
                                    id="state"
                                    type="text"
                                />
                            </div>
                            <div class=" border border-black">
                                <img src={equipo.imgLogo} className=" w-44 h-44 top-52" alt="Logo Del Equipo" />
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
                            {equipo && equipo.participantes.map((equipo) => (
                                <tr className="border-separate text-center text-lg font-medium">
                                    <td className="border rounded-md p-1 bg-white"></td>
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
