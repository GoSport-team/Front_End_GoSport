import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function CardCampeonato({ cedula }) {
  const [campeonatos, setCampenatos] = useState(null)
  const [validarInscripcion, setValidarInscripcion] = useState()
  const [data, setData] = useState()
  useEffect(() => {
    const obtenerCampeonatos = async () => {
      const response = await axios.get('http://localhost:3001/campeonato')
      if (response == undefined) {
        setCampenatos(null)
      } else {
        const campeonatosFiltradosCreado = response.data.filter(campeonato => campeonato.estadoCampeonato !== 'Creado' && campeonato.estadoCampeonato !== 'Ejecucion');
        setCampenatos(campeonatosFiltradosCreado)
      }
    }
    obtenerCampeonatos()
  }, [])


  useEffect(() => {
    const validarInscripcion = async () => {
      const responseValidador = await axios.get(`http://localhost:3001/equipoInscripto/validarInscripcion`, {
        headers: {
          cedulaJugador: cedula
        }
      })

      setValidarInscripcion(responseValidador.data.msg)
      setData(responseValidador.data.data)

    }

    validarInscripcion()
  }, [])
  const mensajeInscrito = () => {
    Swal.fire({
      title: "Estado Inscrito",
      text: `Ya te encuentras Registrado a un campeonato, espera a que inicie y podras ver el avance del campeonato en la App Movil GoSport`,
      confirmButtonText: "OK",
      confirmButtonColor: "#04ff00",
      timer: 5000,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

  console.log(data)

  return (
    <>
      <div className="flex w-[85vw] mx-auto">
        <div className="flex flex-wrap gap-6 w-full">
          {campeonatos && campeonatos.map((campeonato) => (
            <article className="relative w-full sm:w-[48%] lg:w-[45%] xl:w-[30%] p-6 rounded-xl bg-white border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                  <span className="font-bold text-xl">Nombre:</span> {campeonato.nombreCampeonato}
                </h1>
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-xl">Descripción:</span> {campeonato.descripcion}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-xl">Estado Campeonato:</span> {campeonato.estadoCampeonato}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-xl">Categoría:</span> {campeonato.nombreDisciplinas}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-xl">Fecha de inicio:</span> {campeonato.fechaInicio}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-xl">Fecha de finalización:</span> {campeonato.fechaFin}
                </p>

                <div className="flex gap-4 mt-4">
                  {campeonato.estadoCampeonato === 'Ejecucion' ? (
                    <Link to={`/jugador/dashboard/derrotero/${campeonato._id}`}>
                      <button className="px-6 py-3 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50">
                        Ver Derrotero
                      </button>
                    </Link>
                  ) : validarInscripcion === 'Equipo ya esta Inscrito en un campeonato' ? (
                    <button
                      onClick={() => mensajeInscrito()}
                      className="px-6 py-3 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50">
                      Ya estás Inscrito
                    </button>
                  ) : (
                    <Link to={`/jugador/dashboard/${campeonato._id}/${cedula}`}>
                      <button class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Inscribirme
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
