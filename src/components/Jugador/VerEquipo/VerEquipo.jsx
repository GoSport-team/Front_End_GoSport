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
        contactoDos:''
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

    useEffect(()=>{
        const validarInscripcion = async ()=>{
          const responseValidador = await axios.get(`http://localhost:3001/equipoInscripto/validarInscripcion`,{
            headers:{
              cedulaJugador:cedula
            }
          })
    
          setValidarInscripcion(responseValidador.data.msg)
        }
    
        validarInscripcion()
      },[])
    
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

    const buscarJugador =async (identificacion)=>{
      const response =await searchJugador(identificacion, jugadores)
      if(response){
          setJugadores(prev => [...prev,
            {
              _id:response._id,
              nombreJugador: response.nombreJugador,
              ficha: response.ficha,
              dorsal: response.dorsal
            }
            ])
      }
    }
   const eliminarJug =async(indice)=>{
    const response =await eliminarJugador(indice, jugadores, user)
    setJugadores(response)
   } 
    const verificarActualizacion =()=>{
        if(equipo){
            const verificarArray = equipo.participantes.filter((item1)=> !jugadores.some((item2)=> item1.nombreJugador == item2.nombreJugador))
            if(verificarArray.length >0){
                return verificarArray
            }
           const existeActualizacion = nombreEquipo || contactoDos ||  jugadores.length > equipo.participantes.length

           return   existeActualizacion
        }
    }

    const actualizarEquipo =async()=>{
        
        const datosAEnviar={}
        if(nombreEquipo !== equipo.nombreEquipo  && nombreEquipo !== undefined){
            datosAEnviar.nombreEquipo = nombreEquipo
        }
        if(contactoDos !== equipo.contactoDos && contactoDos !== undefined){
            datosAEnviar.contactoDos = contactoDos
        }
       datosAEnviar.participantes = jugadores
       Swal.fire({
        title: "Seguro que deseas actualizar el equipo",
        icon:"question",
        showCancelButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "#04ff00",
        cancelButtonColor: "#d33",
      }).then(async(result) => {
          if (result.isConfirmed) {
            try {     
                const response =await axios.patch(`http://localhost:3001/inscripcionEquipos/completo/${equipo._id}`, datosAEnviar)
                console.log(response.data)
                Swal.fire({
                  title:"Equipo actualizado correctamente",
                  icon:"success",
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
        <div className="flex flex-col">
            <form action="" className='flex gap-10  justify-between p-10'>
                {equipo ?
                    <div className="bg-gray-200 rounded-lg p-5">
                        <h2 className="text-xl font-bold ml-5">Planilla Inscripcion Equipo</h2>

                        <div className="flex items-center gap-5  mt-6">
                            <label className="" htmlFor="name">
                                Equipo
                            </label>
                            <input
                            onChange={(e)=>setNombreEquipo(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={equipo.nombreEquipo} />
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
                        <div className="flex items-center  gap-16 items- mt-5">
                            <div className="flex flex-col gap-5">
                                <div className='flex gap-5 items-center'>
                                    <label className="text-black w-28" htmlFor="city">
                                        Contacto Uno
                                    </label>
                                    <input
                                        value={equipo.contactoUno}
                                        placeholder={equipo.contactoUno}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="city"
                                        type="text"

                                    />
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <label className="text-black w-28 " htmlFor="city">
                                        Contacto Dos
                                    </label>
                                    <input
                                        onChange={(e)=>setContactoDos(e.target.value)}
                                        placeholder={equipo.contactoDos}
                                        className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="state"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center w-32">
                            
                                <img src={image.img} className=" w-44 h-44 top-52" alt="Logo Del Equipo" />
                                
                                {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?

                                
                                <div className='flex gap-5'>
                                    {
                                        image.tipo == 'Cloudinary' ?
                                            <label htmlFor="uploadFile1"
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
                                            <label htmlFor="uploadFile1"
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
                                                <button onClick={() => actualizarLogo()} type="button" id='uploadFile1' className="hidden" />
                                            </label>
                                    }
                                </div>
                                :''}
                            </div>
                        </div>
                    </div>
                    : <h1 className='text-2xl font-bold mt-10'>No tienes equipos creados todavia</h1>}
                <div className="w-full bg-gray-200  p-5 rounded-xl">
                    {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
                    <div className='flex justify-center items-center'>
                        <label className="font-bold text-2xl mr-5">Busca tus compañeros</label>
                        <input type="search" className="h-10 w-80 rounded-md text-center" onChange={e => setJugador(e.target.value)} placeholder='Busca por su numero de cedula' />
                        <button className='mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5'
                            type="button"
                            onClick={() => buscarJugador(jugador)} >Buscar</button>
                    </div>
                    :''}
                    <table className="border-separate w-full mt-8">
                        <thead>
                            <tr>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">N°</th>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Nombre </th>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Ficha </th>
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border th3">N° Dorsal </th>
                                {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato'?
                                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Eliminar</th>
                                :''}
                            </tr>
                        </thead>
                        <tbody>
                            {jugadores && jugadores.map((equipo, index) => (
                                <tr className="border-separate text-center text-lg font-medium">
                                    <td className="border rounded-md p-1 bg-white">{index + 1}</td>
                                    <td className="border rounded-md p-1 bg-white">{equipo.nombreJugador}</td>
                                    <td className="border rounded-md p-1 bg-white">{equipo.ficha}</td>
                                    <td className="border rounded-md p-1 bg-white">{equipo.dorsal}</td>
                                    {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
                                    <td  onClick={()=>eliminarJug(index)} className=" hover:cursor-pointer border rounded-md p-1 bg-white flex items-center justify-center"><img className="" src="/public/img/carrusel/eliminar.svg" alt="" /></td>
                            :''}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
            {validarInscripcion !== 'Equipo ya esta Inscrito en un campeonato' ?
            <div className='text-center flex justify-center'>
            {verificarActualizacion() && (
            <h1 
            onClick={()=>actualizarEquipo()}
            className='bg-black text-white p-3 w-48 rounded-lg text-xl font-bold text-center cursor-pointer'>Actualiar</h1>
            )}
            </div>
            :''}
       
        </div>
    )
}
