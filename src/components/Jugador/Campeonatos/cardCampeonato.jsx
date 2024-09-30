import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const URL_API = import.meta.env.VITE_API_URL

export default function CardCampeonato({ cedula }) {
  const [campeonatos, setCampenatos] = useState(null)
  const [validarInscripcion, setValidarInscripcion] = useState()
  const [data, setData] = useState()
  useEffect(() => {
    const obtenerCampeonatos = async () => {
      try {
        const response = await axios.get(`${URL_API}/campeonato`);
        // console.log("Datos completos de campeonatos:", JSON.stringify(response.data, null, 2));
  
        if (response.data) {
          const campeonatosFiltrados = response.data.filter(campeonato => 
            (campeonato.tipoCampeonato === 'Interfichas' && campeonato.estadoCampeonato !== 'Finalizacion') || 
            (campeonato.tipoCampeonato === 'Recreativos' && 
             (campeonato.estadoCampeonato === 'Ejecucion' || campeonato.estadoCampeonato !== 'Finalizacion')) &&
            campeonato.estadoCampeonato !== 'Creado'
        );           
  
          // console.log('Campeonatos Filtrados:', JSON.stringify(campeonatosFiltrados, null, 2)); 
          setCampenatos(campeonatosFiltrados);
        } else {
          setCampenatos(null);
        }
      } catch (error) {
        console.error('Error al obtener campeonatos:', error);
        setCampenatos(null);
      }
    };
    obtenerCampeonatos();
  }, []);
  
  
  useEffect(() => {
    const validarInscripcion = async () => {
      const responseValidador = await axios.get(`${URL_API}/equipoInscripto/validarInscripcion`, {
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
      confirmButtonColor: "#12aed1cd",
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
  const mensaje = () => {
    Swal.fire({
      text: "Puedes ver los resultados de este campeonato en la aplicación móvil GoSport.",
      imageUrl: 'https://mandalacases.com/cdn/shop/articles/las-mejores-apps-de-futbol.png?v=1645760808&width=1500', 
      imageWidth: 345, 
      imageHeight: 300, 
      imageAlt: 'Celular mostrando la app GoSport',
      confirmButtonText: "OK",
      confirmButtonColor: "#9e9e9e",
      timer: 7000, 
      showClass: {
        popup: `
          animate__animated
          animate__bounceIn
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__bounceOut
          animate__faster
        `
      }
    });
  };
  
  
  
  console.log(data)

  return (
    <>
      <div className="flex w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {campeonatos && campeonatos.map((campeonato) => (
            <article className="relative p-6 rounded-xl bg-white border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl">
              <div className="flex flex-col gap-3">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                  <span className="font-bold text-lg">Nombre:</span> {campeonato.nombreCampeonato}
                </h1>
                <p className="text-base md:text-lg text-gray-700">
                  <span className="font-bold">Descripción:</span> {campeonato.descripcion}
                </p>
                <p className="text-base md:text-lg text-gray-700">
                  <span className="font-bold">Estado Campeonato:</span> {campeonato.estadoCampeonato}
                </p>
                <p className="text-base md:text-lg text-gray-700">
                  <span className="font-bold">Categoría:</span> {campeonato.nombreDisciplinas}
                </p>
                <p className="text-base md:text-lg text-gray-700">
                  <span className="font-bold">Fecha de inicio:</span> {campeonato.fechaInicio}
                </p>
                <p className="text-base md:text-lg text-gray-700">
                  <span className="font-bold">Fecha de finalización:</span> {campeonato.fechaFin}
                </p>

                <div className="flex gap-3 mt-4">
                  {campeonato.estadoCampeonato === 'Ejecucion' ? (
                    <button
                      onClick={() => mensaje()}
                      className="flex-grow px-4 py-2 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50">
                      Seguir Campeonato
                    </button>
                  ) : validarInscripcion === 'Equipo ya esta Inscrito en un campeonato' ? (
                    <button
                      onClick={() => mensajeInscrito()}
                      className="flex-grow px-4 py-2 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50">
                      Ya estás Inscrito
                    </button>
                  ) : (
                    <Link to={`/jugador/dashboard/${campeonato._id}/${cedula}`}>
                      <button className="flex-grow select-none rounded-lg bg-[#12aed1cd] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
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
