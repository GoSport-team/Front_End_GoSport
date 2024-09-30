import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
const URL_API = import.meta.env.VITE_API_URL

export const DatosEquiposInscripcion = () => {

  const { id, cedula } = useParams()
  const [jugadores, setJugadores] = useState()
  const [equipo, setEquipo] = useState()
  const navigate = useNavigate();
  console.log(cedula)
  useEffect(() => {
    const searchEquipo = async () => {
      try {
        const response = await axios.get(`${URL_API}/inscripcionEquipos/${cedula}`)
        console.log('Data Team' + response.data);
        console.log(equipo); // Esto mostrará el objeto completo en la consola
        if (response.data == "EQUIPO NO ENCONTRADO") {
          Swal.fire({
            icon: "error",
            title: "equipo no registrado",
            text: `Debes de crear un equipo primero`
          })
        } else {
          Swal.fire({
            icon: "success",
            title: "Equipo Encontrado",
            text: `Nombre ${response.data.equipo.nombreEquipo}`,
            confirmButtonText: "OK",
            confirmButtonColor: "#12aed1cd",
          })
          setEquipo(response.data.equipo)
          console.log('Datos del equipo Dios' + response.data)
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "equipo no registrado",
          text: `Revisa tu numero de cedula ${cedula}`
        })
      }
    }

    searchEquipo()
  }, [cedula])
  const inscribirEquipo = async () => {
    try {

      const validarRegistroEquipo = await axios.get(`${URL_API}/equipoInscripto/cedula/${id}`, {
        headers: {
          cedulaJugador: cedula
        }
      })

      if (validarRegistroEquipo.data.msg == "Equipo no inscrito") {
        const response = await axios.post(`${URL_API}/equipoInscripto`, {
          Equipo: equipo,
          idCampeonato: id
        })
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#12aed1cd",
        })
        setTimeout(() => {
          navigate('/jugador/dashboard')
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: validarRegistroEquipo.data.msg,
          confirmButtonText: "OK",
          confirmButtonColor: "#12aed1cd",
        })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error al guardar el equipo",
        confirmButtonText: "OK",
        confirmButtonColor: "#12aed1cd",
      })
    }
  }

  useEffect(() => {
    localStorage.setItem('idCampeonato', id);
  }, [id]);

  return (
    <div className="flex items-center bg-white flex-col w-full">
      <form action="">
        {equipo ? (
          <div className="bg-white mt-20 rounded-lg p-6 shadow-md w-[90vw] md:w-[80vw] lg:w-[60vw]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Planilla Inscripción Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="name">Nombre</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Nombre del equipo"
                    value={equipo.nombreEquipo}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="captain">Capitán</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={equipo.nombreCapitan}
                    placeholder="Nombre del capitán"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="contact1">Contacto Principal</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={equipo.contactoUno}
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="contact2">Contacto Secundario</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={equipo.contactoDos}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-48 grid place-content-center">
                  <img
                    className="object-cover rounded-sm"
                    src={equipo.imgLogo}
                    alt="Logo del Equipo"
                  />
                </div>

                <label className="select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black">
                  Imagen Equipo
                </label>
              </div>
            </div>
          </div>
        ) : (
          <h1></h1>
        )}

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">N°</th>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Ficha</th>
              <th scope="col" className="px-6 py-3">N° Dorsal</th>
            </tr>
          </thead>
          <tbody>
            {equipo?.participantes && Array.isArray(equipo.participantes) && equipo.participantes.map((equipo, indice) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={indice}>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{indice + 1}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{equipo.nombres}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{equipo.ficha}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{equipo.dorsal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <div className="w-[90vw] md:w-[80vw] lg:w-[60vw] flex justify-start mt-10 ButtonPlanillaIns">
        <button
          onClick={() => inscribirEquipo()}
          className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Inscribir
        </button>
      </div>
    </div>

  )
}
