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

                                    {/* <div class="main">
                                      <div class="card">
                                        <div class="fl">
                                          <div class="fullscreen">
                                            <svg viewBox="0 0 100 100" class="fullscreen_svg"><path d="M3.563-.004a3.573 3.573 0 0 0-3.527 4.09l-.004-.02v28.141c0 1.973 1.602 3.57 3.57 3.57s3.57-1.598 3.57-3.57V12.218v.004l22.461 22.461a3.571 3.571 0 0 0 6.093-2.527c0-.988-.398-1.879-1.047-2.523L12.218 7.172h19.989c1.973 0 3.57-1.602 3.57-3.57s-1.598-3.57-3.57-3.57H4.035a3.008 3.008 0 0 0-.473-.035zM96.333 0l-.398.035.02-.004h-28.16a3.569 3.569 0 0 0-3.57 3.57 3.569 3.569 0 0 0 3.57 3.57h19.989L65.323 29.632a3.555 3.555 0 0 0-1.047 2.523 3.571 3.571 0 0 0 6.093 2.527L92.83 12.221v19.985a3.569 3.569 0 0 0 3.57 3.57 3.569 3.569 0 0 0 3.57-3.57V4.034v.004a3.569 3.569 0 0 0-3.539-4.043l-.105.004zM3.548 64.23A3.573 3.573 0 0 0 .029 67.8v28.626-.004l.016.305-.004-.016.004.059v-.012l.039.289-.004-.023.023.121-.004-.023c.074.348.191.656.34.938l-.008-.02.055.098-.008-.02.148.242-.008-.012.055.082-.008-.012c.199.285.43.531.688.742l.008.008.031.027.004.004c.582.461 1.32.742 2.121.762h.004l.078.004h28.61a3.569 3.569 0 0 0 3.57-3.57 3.569 3.569 0 0 0-3.57-3.57H12.224l22.461-22.461a3.569 3.569 0 0 0-2.492-6.125l-.105.004h.008a3.562 3.562 0 0 0-2.453 1.074L7.182 87.778V67.793a3.571 3.571 0 0 0-3.57-3.57h-.055.004zm92.805 0a3.573 3.573 0 0 0-3.519 3.57v19.993-.004L70.373 65.328a3.553 3.553 0 0 0-2.559-1.082h-.004a3.573 3.573 0 0 0-3.566 3.57c0 1.004.414 1.91 1.082 2.555l22.461 22.461H67.802a3.57 3.57 0 1 0 0 7.14h28.606c.375 0 .742-.059 1.082-.168l-.023.008.027-.012-.02.008.352-.129-.023.008.039-.02-.02.008.32-.156-.02.008.023-.016-.008.008c.184-.102.34-.207.488-.32l-.008.008.137-.113-.008.004.223-.211.008-.008c.156-.164.301-.34.422-.535l.008-.016-.008.016.008-.02.164-.285.008-.02-.008.016.008-.02c.098-.188.184-.406.246-.633l.008-.023-.004.008.008-.023a3.44 3.44 0 0 0 .121-.852v-.004l.004-.078V67.804a3.569 3.569 0 0 0-3.57-3.57h-.055.004z"></path></svg>
                                          </div>
                                        </div>
                                        <div class="card_content">
                                          <label class="switch_738">
                                            <input type="checkbox" class="chk_738" />
                                            <span class="slider_738"></span>
                                          </label>
                                        </div>
                                        <div class="card_back"></div>
                                      </div>
                                      <div class="data">
                                        <div class="img">
                                            <img src="" alt="img" />
                                        </div>
                                        <div class="text">
                                          <div class="text_m">Crea tu equipo</div>
                                          <div class="text_s">Para participar</div>
                                        </div>
                                      </div>
                                      <div class="btns">
                                        <div class="likes">
                                          <svg class="likes_svg" viewBox="-2 0 105 92"><path d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path></svg><span class="likes_text">22</span>
                                        </div>
                                        <div class="comments">
                                          <svg class="comments_svg" viewBox="-405.9 238 56.3 54.8" title="Comment"><path d="M-391 291.4c0 1.5 1.2 1.7 1.9 1.2 1.8-1.6 15.9-14.6 15.9-14.6h19.3c3.8 0 4.4-.8 4.4-4.5v-31.1c0-3.7-.8-4.5-4.4-4.5h-47.4c-3.6 0-4.4.9-4.4 4.5v31.1c0 3.7.7 4.4 4.4 4.4h10.4v13.5z"></path></svg><span class="comments_text">12</span>
                                        </div>
                                        <div class="views">
                                          <svg class="views_svg" viewBox="0 0 30.5 16.5" title="Views"><path d="M15.3 0C8.9 0 3.3 3.3 0 8.3c3.3 5 8.9 8.3 15.3 8.3s12-3.3 15.3-8.3C27.3 3.3 21.7 0 15.3 0zm0 14.5c-3.4 0-6.2-2.8-6.2-6.2C9 4.8 11.8 2 15.3 2c3.4 0 6.2 2.8 6.2 6.2 0 3.5-2.8 6.3-6.2 6.3z"></path></svg><span class="views_text">332</span>
                                        </div>
                                      </div>
                                    </div> */}


            <div className='w-full flex justify-center'>
              <div className='w-[85vw]'>
                <Link to={'/jugador/dashboard/crearequipo'}>
                  <button
                    className="inline-flex items-center justify-center rounded-md bg-black px-11 py-4 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Crear Equipo
                  </button>
                </Link>
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
