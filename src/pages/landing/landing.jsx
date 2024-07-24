import Cronograma from '@/widgets/componentes/Cronograma';
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
            <div class="bg-white w-full h-full flex flex-col justify-center items-center">
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

          <section className="mt-2 w-full h-full flex flex-row gap-5 justify-center items-center">

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
                    <img data-aos="zoom-in-down" className='w-2/4'
                      src="/public/img/landing/administracion.png" alt="img" />
                  </div>
                  <div className="w-3/5 flex flex-col flex-wrap">
                    <p className="text-xl tracking-wide mb-2 text-shadow">Facilidad de creación</p>
                    <p className="text-shadow-black text-base pr-1.5">Crea campeonatos en cuestión de minutos con nuestro proceso intuitivo y amigable.</p>
                  </div>

                </div>
                <div className=" flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                  <div className="w-2/5">
                    <img data-aos="zoom-in-down" className='w-2/4'
                      src="/public/img/landing/bingo.png" alt="img" />
                  </div>
                  <div className="w-3/5 flex flex-col flex-wrap">
                    <p className="text-xl  tracking-wide mb-2 text-shadow">Sorteo automático de equipos</p>
                    <p className="text-shadow-black text-base pr-1.5">Di adiós a las complicaciones. Deja que nuestro sistema inteligente distribuya los equipos de manera justa y aleatoria.</p>
                  </div>
                </div>
                <div className="admin-icon flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                  <div className="w-2/5">
                    <img data-aos="zoom-in-down" className='w-2/4'
                      src="/public/img/landing/project.png" alt="img" />
                  </div>
                  <div className="w-3/5 flex flex-col flex-wrap">
                    <p className="text-xl  tracking-wide mb-2 text-shadow">Cronogramas personalizados</p>
                    <p className="text-shadow-black text-base pr-1.5">Di adiós a las complicaciones. Deja que nuestro sistema inteligente distribuya los equipos de manera justa y aleatoria.</p>
                  </div>
                  </div>

                </div>

              </div>
           

          </section>


          {/* Sesion Jugador */}
          
          <section className="mt-4 ml-2 w-full h-full flex flex-col bg-blue-gray-50 rounded-lg">
          <div className="mt-6 ml-2 w-full h-full flex flex-row bg-blue-gray-50 rounded-lg">
            <section className='flex flex-col'>
            <div className="w-2/4 h-full flex flex-col ml-2">
              <h1 className='pt-12 text-2xl font-bold uppercase tracking-wide text-shadow'>PARA JUGADORES</h1>
              <p className="pt-6 text-xl mt-4">Regístrate y participa en campeonatos exclusivos en nuestra plataforma para amantes del juego.</p>
            </div>

            <div className="flex flex-row items-center mb-5 pb-5 w-full mt-6">
            <div className="w-3/5 flex flex-col flex-wrap ml-2">
              <p className="text-xl tracking-wide mb-2 text-shadow">Explora campeonatos</p>
              <p className="text-shadow-black text-base pr-1.5">Descubre una variedad de torneos emocionantes y elige aquellos que despierten tu espiritu competitivo</p>
            </div>
            <div className="w-2/5 flex justify-center items-center">
              <img data-aos="zoom-in-down" className='w-2/4 rounded-lg' src="/public/img/landing/imagenCampeonato.jpg" alt="img" />
            </div>
          </div>
          <div className="flex flex-row items-center mb-5 pb-5 w-full mt-6">
            <div className="w-3/5 flex flex-col flex-wrap ml-2">
              <p className="text-xl tracking-wide mb-2 text-shadow">Inscripcion rapida y sencilla</p>
              <p className="text-shadow-black text-base pr-1.5">Unete a la competicion en cuestion de segundos.Inscríbete fácilmente en los torneos que te emocionan</p>
            </div>
            <div className="w-2/5 flex justify-center items-center">
              <img data-aos="zoom-in-down" className='w-2/4 rounded-lg' src="/public/img/landing/Incripcion.jpg" alt="img" />
            </div>
          </div>
          <div className="flex flex-row items-center mb-5 pb-5 w-full mt-6">
            <div className="w-3/5 flex flex-col flex-wrap ml-2">
              <p className="text-xl tracking-wide mb-2 text-shadow">Se el protagonista de momentos inolvidables </p>
              <p className="text-shadow-black text-base pr-1.5">Vive momentos inolvidables desde jugadas asomborsas hasta victorias gloriosas. Cada campeonato tiene su propia historia,¡Tu eres la estrella!</p>
            </div>
            <div className="w-2/5 flex justify-center items-center">
              <img data-aos="zoom-in-down" className='w-2/4 rounded-lg' src="/public/img/landing/vive.jpg" alt="img" />
            </div>
          </div>
          </section>

            <div className="w-full flex justify-center items-center">
              <img className="img-cr7 w-3/4 rounded-lg" data-aos="fade-left" src="/public/img/landing/cr7.png" alt="img" />
            </div>
            
          </div>

          
        </section>


          {/* EQUIPO Aprendiz */}
          <section class="flex justify-center flex-col w-full" id="section_dow">
            <div class="flex flex-col ">
              <h1 class="text-xl mt-3 text-center font-bold text-black">Equipo Bienestar al Aprendiz</h1>
              <h5 class="text-lg m-7 ml-80 font-bold"> ¿Quiénes somos?</h5>
              <p class="text-center p-3 ">
                Equipo encargado de gestionar y realizar acciones para el
                bienestar de sus aprendices en el marco de los planes, politicas
                y normativas institucionales.
              </p>

              <div class="flex flex-row gap-11 mt-10 ml-24 mr-24 w-full">
                <div className=" w-2/5 text-center">
                  <img
                    className="rounded-lg w-4/5"
                    src="/public/img/BienesApren/TeamAp.jpg"
                    alt=""
                  />
                </div>

                <div className="w-2/5 flex justify-center gap-3 flex-col items-center">
                  <h4 class="text-black text-xl font-bold">Nuestro propósito</h4>
                  <p className="text-start">
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