import { Link } from 'react-router-dom'
import CardCampeonato from './cardCampeonato'
import { Carrusel } from './Carrusel'
import { NavBarJugador } from '../NavBar/NavBarJugador'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './main.css'

const URL_API = import.meta.env.VITE_API_URL

export default function CampeonatosDisponibles() {
  const [user, setUser] = useState();
  const [equipo, setEquipo] = useState(null);
  const [tieneEquipo, setTieneEquipo] = useState(false); // Estado para verificar si tiene equipo
  const token = Cookies.get('token');

  useEffect(() => {
    const obtenerUser = async () => {
      const response = await axios.get(`${URL_API}/usuarios/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    };
    obtenerUser();
  }, []);

  useEffect(() => {
    const obtenerEquipo = async () => {
      if (user) {
        const userId = user._id; // Obtén el ID del jugador
        try {
          const equipoResponse = await axios.get(`${URL_API}/equipoInscripto/validarJugador`, {
            headers: {
              Authorization: `Bearer ${token}`,
              idJugador: userId,
            }
          });
          console.log('Respuesta de la API para validar el equipo:', equipoResponse.data);
          if (equipoResponse.data.equipo && equipoResponse.data.equipo.length > 0) {
            setEquipo(equipoResponse.data.equipo[0]);
            setTieneEquipo(true);
          } else {
            setEquipo(null);
            setTieneEquipo(false);
          }
        } catch (error) {
          console.error('Error al validar el equipo del jugador:', error);
          setTieneEquipo(false); 
        }
      }
    };
    obtenerEquipo();
  }, [user]);

  return (
    <>
      {user ?
        <div>
          <NavBarJugador cedula={user.identificacion} />
          <Carrusel />
          <section className='mt-11'>
            <div className='flex w-[85vw] mx-auto py-8 justify-between'>
              <div className='w-[65vw]'>
                <div class="group flex flex-col justify-start items-start gap-2 w-[50vw] h-[35vh] duration-500 relative rounded-lg p-4 bg-gray-100 hover:-translate-y-2 hover:shadow-xl shadow-gray-300">
                  <div class="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-[30vh] h-1/2 rounded-lg bg-gray-200"
                    alt="image here">
                    <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727129004/spcvvm0yshwbhflwldqm.jpg" alt="" className='w-[30vh] h-[19vh] object-cover rounded-xl opacity-90 absolute                                                    ' />
                  </div>

                  <div class="">
                    <h2 class="text-2xl font-bold mb-2 text-gray-800  tracking-wide">Bienvenido</h2>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased tracking-wide">
                      “Estimado
                      <span className="text-lg md:text-3xl font-bold text-tahiti relative inline-block  md:pl-3">
                        {user.nombres}
                      </span> , bienvenido al área de inscripciones. 🏆
                      Aquí podrás elegir los campeonatos en los que deseas participar.
                      No olvides que cada torneo es una oportunidad para demostrar
                      tu habilidad en la cancha. ¡Éxito!”
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-[35vw] flex justify-end mt-9'>
                <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                    <img src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727129114/kcku9vu2xgzbk1d3luyz.jpg" alt="img" className='object-cover w-full h-full' />
                  </div>
                  <div class="p-6">
                    <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      Crea tu equipo
                    </h5>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      ¡Forma tu equipo de fútbol sala para participar! Si quieres competir y ser parte de un gran equipo, ¡únete a la acción!
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    {tieneEquipo ? (
                      <button
                        disabled
                        className='bg-gray-300 text-gray-600 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase'
                      >
                        Ya tienes un equipo
                      </button>
                    ) : (
                      <Link to={'/jugador/dashboard/crearequipo'}>
                        <button
                          data-ripple-light="true"
                          type="button"
                          className="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Crear equipo
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-shadow pt-5 text-center">
                Campeonatos Disponibles
              </h1>
              <article className='contenedorCards flex gap-10 mt-16 p-18 justify-around flex-wrap p-5'>
                {user && (
                  <CardCampeonato cedula={user.identificacion} />
                )}
              </article>
            </div>
          </section>
        </div>
        : <h1>Esqueleto page</h1>
      }
    </>
  )
}
