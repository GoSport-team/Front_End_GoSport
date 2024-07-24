import { Link } from 'react-router-dom';
import { useEffect } from "react";
import Aos from "aos";

export default function Landing() {
    useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="containerPrincipal flex items-center justify-between">
                    <div className="logo flex items-center">
                        <h1 className="text-white text-2xl ml-2">GoSport</h1>
                    </div>
                    <div className="links flex space-x-4">
                        <Link to={`auth/sign-up`} className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded">
                            Registrarse
                        </Link>
                        <Link to={`auth/sign-in`} className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded">
                            Iniciar sesión
                        </Link>
                        <a href="#section_dow" className="text-white hover:underline px-3 py-2 rounded">
                            Equipo Bienestar
                        </a>
                        <a href="#section_ft" className="text-white hover:underline px-3 py-2 rounded">
                            Contactanos
                        </a>
                    </div>
                </div>
            </nav>
            <div class="bg-white flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center">
            {/* <Header /> */}
            <div className="relative">
                <img src='/public/img/landing/imgplayer.jpg' className='min-h-[45vw] w-full object-cover bg-cover'></img>
                <div className="absolute inset-0 flex flex-col justify-center items-start p-4">
                    <p className="w-[30rem] mt-[15rem] text-[1.7rem] font-sans leading-[1.7] text-justify ml-[3rem] tracking-[1px] text-black ">
                    Crea campeonatos inolvidables. ¡Dale vida a la competencia y
                    eleva el espíritu deportivo! ¿Estás listo para ser parte de la
                    experiencia?{" "}
                    </p>
                    <button className="ml-[3rem] mt-[2rem] px-[25px] py-[20px] text-[17px] text-white rounded-[7px] tracking-[4px] font-bold uppercase transition duration-500 bg-black bg-opacity-50 hover:bg-blue-700 ">
                    Unete Ahora
                    </button>
                </div>
                        </div>

          </div>

          {/* Seccion Administrador */}

          <div className="mt-2 w-full h-full flex flex-row gap-5 justify-center items-center">

            <div className=" w-2/3 h-full flex justify-center items-center rounded-xl drop-shadow-xl" data-aos="fade-right" >
              <img className="translate-y-0 animate-float w-4/5"
                src="/public/img/landing/video.png" alt="img"  />
                
            </div>

            
            <div className="flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                
              <div className="flex flex-col pl-8 mb-6">
                <h3 className="pt-12 text-2xl font-bold uppercase tracking-wide text-shadow">PARA ORGANIZADORES</h3>
                <p className="pt-6 text-xl mt-4">Optimiza la gestión de tus torneos con nuestra plataforma, convierte tus ideas en experiencias inolvidables.</p>
              </div>


              <div className="pt-5 pl-8 flex flex-col justify-around w-full">

                <div className="admin-icon flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                  <div className="w-2/5">
                    <img data-aos="zoom-in-down" className='w-2/3'
                      src="/public/img/landing/administracion.png" alt="img" />
                  </div>
                  <div className="w-3/5 flex flex-col flex-wrap">
                    <p className="text-xl tracking-wide mb-2 text-shadow">Facilidad de creación</p>
                    <p className="text-shadow-black text-base pr-1.5">Crea campeonatos en cuestión de minutos con nuestro proceso intuitivo y amigable.</p>
                  </div>

                </div>
                <div className=" flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                  <div className="w-2/5">
                    <img data-aos="zoom-in-down" className='w-2/3'
                      src="/public/img/landing/bingo.png" alt="img" />
                  </div>
                  <div className="w-3/5 flex flex-col flex-wrap">
                    <p className="text-xl  tracking-wide mb-2 text-shadow">Sorteo automático de equipos</p>
                    <p className="text-shadow-black text-base pr-1.5">Di adiós a las complicaciones. Deja que nuestro sistema inteligente distribuya los equipos de manera justa y aleatoria.</p>
                  </div>
                </div>
                <div className="admin-icon flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                  <div className="w-2/5">
                    <img data-aos="zoom-in-down" className='w-2/3'
                      src="/public/img/landing/project.png" alt="img" />
                  </div>
                  <div className="w-3/5 flex flex-col flex-wrap">
                    <p className="text-xl  tracking-wide mb-2 text-shadow">Cronogramas personalizados</p>
                    <p className="text-shadow-black text-base pr-1.5">Di adiós a las complicaciones. Deja que nuestro sistema inteligente distribuya los equipos de manera justa y aleatoria.</p>
                  </div>
                  </div>

                </div>

              </div>
           

          </div>


          {/* Sesion Jugador */}

          <div className="section-player">
            <div className="player-contenido">
              <h1>Para Jugadores</h1>
              <p className="">Regístrate y participa en campeonatos exclusivos en nuestra plataforma para amantes del juego.</p>

              <div className="admin-info">
                <p className="admin-icon-p">Facilidad de creación</p>
                <p className="admin-icon-st">Crea campeonatos en cuestión de minutos con nuestro proceso intuitivo y amigable.</p>
              </div>
            </div>

            <div class="player-cr7">
              <img class="img-cr7" data-aos="fade-left"
                src="\images\landing\cr7.png" alt="img" />
            </div>
          </div>



          <section class="section-3" id="section_dow">
            <div class="Bienestar section-3-div">
              <h1 class="section-3-h1">Equipo Bienestar al Aprendiz</h1>
              <h5 class="section-3-h5"> ¿Quiénes somos?</h5>
              <p class="section-3-p">
                Equipo encargado de gestionar y realizar acciones para el
                bienestar de sus aprendices en el marco de los planes, politicas
                y normativas institucionales.
              </p>

              <div class="sub-section-div">
                <div className="sub-section-div2">
                  <img
                    className="sub-section-div-img"
                    src="\images\BienesApren\TeamAp.jpg"
                    alt=""
                  />
                </div>

                <div className="section-3-p3">
                  <h4 class="section-3-p2 index-1">Nuestro propósito</h4>
                  <p class="">
                    "Promover la inclusión y la diversidad a través del deporte,
                    creando espacios donde todas las personas,
                    independientemente de sus capacidades físicas o condiciones
                    socioeconómicas, puedan participar y disfrutar de los
                    beneficios del ejercicio físico, fortaleciendo así la
                    cohesión social y el respeto mutuo."
                  </p>

                </div>
              </div>

              <div className="section-3-p4" id="section_ft">
                <div className="section-3-p4-div">
                  <h4 class="section-3-p2">GoSport</h4>
                  <p class="section-3-pp ">
                    Uno de nuestros propósitos es fomentar la practica del
                    deporte y la actividad fisica para el desarrollo de habitos
                    de vida saludable, el adecuado uso del tiempo libre y el
                    desarrollo de habilidades socioemocionales apoyando al
                    proceso de formacion integral.
                  </p>
                </div>
                <div className="section-3-subdiv">
                  <img src="\images\BienesApren\Colombia.jpg" alt="" />
                </div>
              </div>
            </div>
          </section>
          <div class="footerd">
            {/* <Footer /> */}
          </div>
        </div>

        </>
    );
}