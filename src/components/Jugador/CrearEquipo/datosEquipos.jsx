import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { eliminarJugador, searchJugador } from "../useFunciones";
const URL_API = import.meta.env.VITE_API_URL

export const DatosEquipos = () => {
  const [image, setImage] = useState()
  const [estadoImg, setEstadoImg] = useState()
  const [mensaje, setMensaje] = useState()
  const [jugadores, setJugadores] = useState([])
  const [jugador, setJugador] = useState()
  const [file, setFile] = useState()
  const [nombreEquipo, setNombreEquipo] = useState()
  const [nombreCapitan, setNombreCapitan] = useState()
  const [contactoUno, setContactoUno] = useState()
  const [contactoDos, setContactoDos] = useState()
  const [user, setUser] = useState()
  const [id, setId] = useState(1)
  const [equipo, setEquipo] = useState(null)
  const token = Cookies.get('token')
  const navigate = useNavigate();

  const handleImage = async (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file))
    setFile(file)
  }
  useEffect(() => {
    const obtenerUser = async () => {
      const response = await axios.get(`${URL_API}/usuarios/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
      console.log('Profile'+response.data)
    }
    obtenerUser()
  }, [])

  useEffect(() => {
    const obtnenerEquipo = async () => {
      if (user) {
        console.log(user.identificacion)
        const response = await axios.get(`${URL_API}/inscripcionEquipos/${user.identificacion}`)
        console.log(response.data)
        if (response.data == "EQUIPO NO ENCONTRADO") {
          return setEquipo(null)
        }
        setEquipo(response.data)
      }
    }
    obtnenerEquipo()
  }, [user])

  const submit = async (e) => {
    e.preventDefault()


  let jugadoresActuales = [...jugadores];

  const isUserInJugadores = jugadoresActuales.some(jugador => jugador._id === user._id);

  if (!isUserInJugadores) {
    jugadoresActuales.push({
      _id: user._id,
      nombres: user.nombres,
      ficha: user.ficha,
      dorsal: 1 
    });
  }


    if (jugadores.length < 4) {
      Swal.fire({
        icon: "error",
        title: "numero de jugadores incompletos",
        confirmButtonText: "OK",
        confirmButtonColor: "#E42245",
      })
    } else {
      const formData = new FormData();
      formData.append("file", file)
      const respuestaa = await axios.post(`${URL_API}/inscripcionEquipos/${user._id}/logoEquipo`, formData)

      setEstadoImg(respuestaa.data.url)
      const response = await axios.post(`${URL_API}/inscripcionEquipos`, {
        nombreEquipo: nombreEquipo,
        nombreCapitan: user.nombres,
        contactoUno: user.telefono,
        contactoDos: contactoDos,
        jornada: "Tarde",
        cedula: user.identificacion,
        imgLogo: respuestaa.data.url,
        idLogo: respuestaa.data.public_id,
        estado: true,
        participantes: jugadoresActuales
      })

      setMensaje(response.data.msg)
      Swal.fire({
        icon: "success",
        title: response.data.msg,
        confirmButtonText: "OK",
        confirmButtonColor: "#0837C0",
      })

      setTimeout(() => {
        navigate('/jugador/dashboard')
      }, 700);

    }
  }

  const buscarJugador = async (identificacion) => {
    const response = await searchJugador(identificacion, jugadores)
    if (response) {
      setJugadores(prev => [...prev,
      {
        _id: response._id,
        nombres: response.nombres,
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

  return (

    <div className="flex items-center bg-white flex-col w-[100vw]">
      {equipo ?
        <div className="flex items-center justify-center min-h-screen p-6 w-screen">
          <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center transform transition-transform duration-300 hover:scale-105">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Ya tienes creado un equipo, no puedes crear más
            </h1>
            <Link to={'/jugador/dashboard'}>
              <button className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Atrás
              </button>
            </Link>
          </div>
        </div>


        :

        <form action="" onSubmit={submit}>
          <div className="bg-white mt-20 rounded-lg p-6 shadow-md w-[60vw]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Planilla Inscripción Equipo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="name">Equipo</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    onChange={e => setNombreEquipo(e.target.value)}
                    placeholder="Nombre del equipo"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="captain">Capitán</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="captain"
                    value={user && user.nombres}
                    placeholder="Nombre del capitán"
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="contact1">Contacto Principal</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="contact1"
                    type="text"
                    value={user && user.telefono}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="contact2">Contacto Secundario</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="contact2"
                    type="text"
                    onChange={e => setContactoDos(e.target.value)}
                    placeholder="Número secundario"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={image}
                    alt="Logo del Equipo"
                  />
                </div>

                <label class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Subir Imagen
                  <input
                    type="file"
                    onChange={handleImage}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 mt-10 p-6 rounded-xl shadow-lg w-[60vw]">
            <div className="flex flex-col  mb-6">
              <label className="font-bold text-2xl text-gray-800 mb-4">Busca tus compañeros</label>
              <div className="flex gap-4 items-center">
                <input
                  type="search"
                  className="h-12 w-80 rounded-lg border border-gray-300 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={e => setJugador(e.target.value)}
                  placeholder="Busca por su número de cédula"
                />
                <button
                  className="px-6 py-2 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:bg-[#0e9cbf] active:scale-95"
                  type="button"
                  onClick={() => buscarJugador(jugador)}
                >
                  Buscar
                </button>
              </div>
            </div>

            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="bg-[#12aed1cd] text-white text-left py-3 px-4 rounded-tl-lg">N°</th>
                  <th className="bg-[#12aed1cd] text-white text-left py-3 px-4">Nombre</th>
                  <th className="bg-[#12aed1cd] text-white text-left py-3 px-4">Ficha</th>
                  <th className="bg-[#12aed1cd] text-white text-left py-3 px-4">N° Dorsal</th>
                  <th className="bg-[#12aed1cd] text-white text-left py-3 px-4 rounded-tr-lg">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {jugadores && jugadores.map((jugador, indice) => (
                  <tr className="text-gray-700 text-sm border-b border-gray-300" key={indice}>
                    <td className="py-3 px-4">{indice + 1}</td>
                    <td className="py-3 px-4">{jugador.nombres}</td>
                    <td className="py-3 px-4">{jugador.ficha}</td>
                    <td className="py-3 px-4">{jugador.dorsal}</td>
                    <td
                      onClick={() => eliminarJug(indice)}
                      className="py-3 px-4 text-center cursor-pointer hover:bg-gray-200 rounded-lg"
                    >
                      <img className="w-6 h-6 mx-auto" src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727129677/v8somqq37uuq9cb2ju5c.png" alt="Eliminar" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="w-[60vw] flex justify-start mt-10 ButtonPlanillaIns">
            <button class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit"> Inscribir </button>
          </div>
        </form>
      }
    </div>
  )
}
