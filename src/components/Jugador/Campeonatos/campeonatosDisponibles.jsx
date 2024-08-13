import { Link } from 'react-router-dom'
import CardCampeonato from './cardCampeonato'
import { Carrusel } from './Carrusel'
import { NavBarJugador } from '../NavBar/NavBarJugador'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './main.css'

export default function CampeonatosDisponibles() {
  const [user, setUser] = useState()
  const token = Cookies.get('token')
  const [equipo, setEquipo] = useState(null)
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
      if (user) {
        console.log(user)
        const response = await axios.get(`http://localhost:3001/equipoInscripto/cedula/${user.identificacion}`)
        console.log(response)
        if (response.data.msg) {
          return setEquipo(null)
        }
        setEquipo(response.data)
      }
    }
    obtnenerEquipo()
  }, [user])

  return (
    <>
      {user ?
        <div>
          <NavBarJugador cedula={user.identificacion} />
          <Carrusel />
          <section>
            <div className="w-full py-6 md:py-12 flex items-center justify-center">
              <div className="w-[85vw] bg-white md:p-8 rounded-lg shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-100 to-white opacity-40"></div>
                <h1 className="relative text-center text-lg md:text-2xl font-semibold text-gray-800 leading-relaxed z-10">
                  “Estimado
                  <span className="text-xl md:text-3xl font-bold text-blue-600 relative inline-block pl-2 md:pl-3">
                    {user.nombres}
                  </span>, bienvenido al área de inscripciones. 🏆
                  Aquí podrás elegir los campeonatos en los que deseas participar.
                  No olvides que cada torneo es una oportunidad para demostrar
                  tu habilidad en la cancha. ¡Éxito!”
                </h1>
              </div>
            </div>

            <div className='w-full flex justify-center'>
              <div className='w-[85vw]'>
                <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                    <img src="\public\img\carrusel\fubol-sala-futsal.jpg" alt="img" className='object-cover w-full h-full' />
                  </div>
                  <div class="p-6">
                    <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      Crea tu equipo
                    </h5>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      ¡Forma tu equipo de fútbol sala para participar! Si quieres competir y ser parte de un gran equipo, ¡únete a la acción!
                    </p>
                  </div>
                  <div class="p-6 pt-0">
                    <Link to={'/jugador/dashboard/crearequipo'}>
                      <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Crear equipo
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-shadow p-6 text-center">
                Campeonatos Disponibles
              </h1>
              <article className='contenedorCards flex gap-10 mt-20 p-18 justify-around flex-wrap p-5'>
                {user && (
                  <CardCampeonato cedula={user.identificacion} />
                )}

              </article>
            </div>



          </section>
        </div>
        : <h1>Esqueleton</h1>
      }
    </>
  )
}
