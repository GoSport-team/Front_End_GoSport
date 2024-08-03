import Cronograma from '@/widgets/componentes/Cronograma';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import Aos from "aos";
import "./landing.css";
import {
  CardFooter,
  Typography
} from "@material-tailwind/react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import Participantes from '@/widgets/componentes/Participantes';
import Resultados from '@/widgets/componentes/Resultados';


export default function Landing() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      
      <div>
        <nav class="bg-white dark:bg-gray-900 w-[100vw] ">
          <div class="flex flex-wrap items-center mx-auto h-[10vh]">
            <div class="flex items-center">
              <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="\public\img\logoGos.png" class="h-24 object-contain" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GoSport</span>
              </a>
            </div>
            <div class="ml-auto flex items-center">
              <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div class="md:block md:w-auto pr-7" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li class="relative">
                    <Link to={`auth/sign-up`} className="block py-3 px-5 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Registrarse
                    </Link>
                  </li>
                  <li class="relative">
                    <Link to={`auth/sign-in`} class="block py-3 px-5 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <a href="#section_dow" class="block py-3 px-5 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Equipo Bienestar</a>
                  </li>
                  <li>
                    <a href="#section_ft" class="block py-3 px-5 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contactanos</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div class="flex flex-col justify-center items-center">
          <div className="relative">
            <img src='/public/img/landing/imgplayer.jpg' className='h-[90vh] object-cover w-screen'></img>
            <div className="absolute inset-0 flex flex-col w-[20vw] justify-end pb-32">
              <p className="w-[33rem]  text-[1.9rem] font-sans leading-[1.7] text-justify ml-[3rem] tracking-[1px] text-black ">
                Crea campeonatos inolvidables. ¡Dale vida a la competencia y
                eleva el espíritu deportivo! ¿Estás listo para ser parte de la
                experiencia?
              </p>
              <button className="BotonUnirmeAnimacion ml-[3rem] mt-[2rem] px-[25px] py-[20px] text-[17px]  font-bold  cursor-pointer  ">
                Unete Ahora
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <div class="bg-white w-full h-full flex flex-col justify-center items-center">
        
        <section className="mt-2 w-full h-full flex flex-row gap-7 justify-center items-center">

          <div className=" w-4/5 h-full flex justify-center items-center rounded-xl drop-shadow-xl" data-aos="fade-right" >
            <img className="AnimacionImagenOrganizadores w-3/4"
              src="/public/img/landing/video.png" alt="img" />

          </div>
          <div className="flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
            <div className="flex flex-col pl-8 mb-6">
              <h3 className="pt-12 text-3xl font-bold uppercase tracking-wide text-shadow ">PARA ORGANIZADORES</h3>
              <p className="pt-6 text-xl mt-4">Optimiza la gestión de tus torneos con nuestra plataforma, convierte tus ideas en experiencias inolvidables.</p>
            </div>


            <div className="pt-5 pl-8 flex flex-col gap-5 justify-around w-full">
              <div className="admin-icon flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                <div className="w-2/5 flex justify-center">
                  <img data-aos="zoom-in-down" className='w-1/3'
                    src="/public/img/landing/administracion.png" alt="img" />
                </div>
                <div className="w-3/5 flex flex-col flex-wrap">
                  <p className="text-2xl font-medium tracking-wide mb-2 text-shadow">Facilidad de creación</p>
                  <p className="text-shadow-black text-lg pr-1.5">Crea campeonatos en cuestión de minutos con nuestro proceso intuitivo y amigable.</p>
                </div>
              </div>
              <div className=" flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                <div className="w-2/5 flex justify-center">
                  <img data-aos="zoom-in-down" className='w-1/3'
                    src="/public/img/landing/bingo.png" alt="img" />
                </div>
                <div className="w-3/5 flex flex-col flex-wrap">
                  <p className="text-2xl font-medium tracking-wide mb-2 text-shadow">Sorteo automático de equipos</p>
                  <p className="text-shadow-black text-lg pr-1.5">Di adiós a las complicaciones. Deja que nuestro sistema inteligente distribuya los equipos de manera justa y aleatoria.</p>
                </div>
              </div>
              <div className="admin-icon flex flex-row flex-wrap items-center mb-5 pb-5 w-full">
                <div className="w-2/5 flex justify-center">
                  <img data-aos="zoom-in-down" className='w-1/3'
                    src="/public/img/landing/project.png" alt="img" />
                </div>
                <div className="w-3/5 flex flex-col flex-wrap">
                  <p className="text-2xl font-medium  tracking-wide mb-2 text-shadow">Cronogramas personalizados</p>
                  <p className="text-shadow-black text-lg pr-1.5">Di adiós a las complicaciones. Deja que nuestro sistema inteligente distribuya los equipos de manera justa y aleatoria.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 ml-2 w-full h-full flex flex-col bg-blue-gray-50 rounded-lg">
          <div className="mt-6 ml-2 w-full h-full flex flex-row bg-blue-gray-50 rounded-lg">
            <section className='flex flex-col pl-24'>
              <div className="w-full  flex flex-col ml-2">
                <h1 className='pt-12 text-3xl font-bold uppercase tracking-wide text-shadow '>PARA JUGADORES</h1>
                <p className="pt-4 mb-5 text-xl mt-4">Regístrate y participa en campeonatos exclusivos en nuestra plataforma para amantes del juego.</p>
              </div>

              <div className="flex flex-row items-center mb-5 pb-5 w-full mt-6">
                <div className="w-3/5 flex flex-col flex-wrap ml-2">
                  <p className="text-2xl font-medium  tracking-wide mb-2 text-shadow">Explora campeonatos</p>
                  <p className="text-shadow-black text-lg pr-1.5">Descubre una variedad de torneos emocionantes y elige aquellos que despierten tu espiritu competitivo</p>
                </div>
                <div className="w-2/5 flex justify-center items-center">
                  <img data-aos="zoom-in-down" className='w-1/3 rounded-lg' src="/public/img/landing/imagenCampeonato.jpg" alt="img" />
                </div>
              </div>
              <div className="flex flex-row items-center mb-5 pb-5 w-full mt-6">
                <div className="w-3/5 flex flex-col flex-wrap ml-2">
                  <p className="text-2xl font-medium  tracking-wide mb-2 text-shadow">Inscripcion rapida y sencilla</p>
                  <p className="text-shadow-black text-lg pr-1.5">Unete a la competicion en cuestion de segundos.Inscríbete fácilmente en los torneos que te emocionan</p>
                </div>
                <div className="w-2/5 flex justify-center items-center">
                  <img data-aos="zoom-in-down" className='w-1/3 rounded-lg' src="/public/img/landing/Incripcion.jpg" alt="img" />
                </div>
              </div>
              <div className="flex flex-row items-center mb-5 pb-5 w-full mt-6">
                <div className="w-3/5 flex flex-col flex-wrap ml-2">
                  <p className="text-2xl font-medium  tracking-wide mb-2 text-shadow">Se el protagonista de momentos inolvidables </p>
                  <p className="text-shadow-black text-lg pr-1.5">Vive momentos inolvidables desde jugadas asomborsas hasta victorias gloriosas. Cada campeonato tiene su propia historia,¡Tu eres la estrella!</p>
                </div>
                <div className="w-2/5 flex justify-center items-center">
                  <img data-aos="zoom-in-down" className='w-1/3 rounded-lg' src="/public/img/landing/vive.jpg" alt="img" />
                </div>
              </div>
            </section>

            <div className="w-full flex justify-center items-center">
              <img className="AnimacionImagenOrganizadores w-[25vw] rounded-lg" data-aos="fade-left" src="/public/img/landing/cr7.png" alt="img" />

            </div>
          </div>
        </section>

        <section class=" mt-5 flex justify-center flex-col w-full" id="section_dow">
          <div class="flex flex-col pl-24 ">
            <h1 class="mt-3 text-center text-3xl font-bold text-black">Equipo Bienestar al Aprendiz</h1>
            <h5 class="text-2xl mt-7 mb-7  font-bold"> ¿Quiénes somos?</h5>
            <p class="font-sans text-xl leading-6 mb-4 ">
              Equipo encargado de gestionar y realizar acciones para el
              bienestar de sus aprendices en el marco de los planes, politicas
              y normativas institucionales.
            </p>

            <div class="flex flex-row gap-11 mt-10 justify-center items-center w-full">
              <div className=" w-2/5 text-center">
                <img
                  className="rounded-lg w-4/5"
                  src="/public/img/BienesApren/TeamAp.jpg"
                  alt=""
                />
              </div>

              <div className="w-2/5 flex justify-center gap-3 flex-col items-center">
                <h4 class="text-black text-3xl  font-bold text-center">Nuestro propósito</h4>
                <p className="font-sans text-xl leading-9 mb-4 text-justify pr-7 pt-4 pb-4 flex justify-center items-center">
                  "Promover la inclusión y la diversidad a través del deporte,
                  creando espacios donde todas las personas,
                  independientemente de sus capacidades físicas o condiciones
                  socioeconómicas, puedan participar y disfrutar de los
                  beneficios del ejercicio físico, fortaleciendo así la
                  cohesión social y el respeto mutuo."
                </p>

              </div>
            </div>

            <div className="w-full flex mb-4 text-center pr-8 flex-row justify-center items-center mt-8 gap-16" id="section_ft">
              <div className="w-2/5 flex justify-center gap-3 flex-col items-center ">
                <h4 class="text-black text-3xl  font-bold text-center">GoSport</h4>
                <p class=" font-sans text-xl leading-9 mb-4 text-justify pr-7 flex justify-center items-center">
                  Uno de nuestros propósitos es fomentar la practica del
                  deporte y la actividad fisica para el desarrollo de habitos
                  de vida saludable, el adecuado uso del tiempo libre y el
                  desarrollo de habilidades socioemocionales apoyando al
                  proceso de formacion integral.
                </p>
              </div>
              <div className="w-2/5 text-center flex justify-center items-center">
                <img src="/public/img/BienesApren/Colombia.jpg" className='rounded-lg w-4/5' alt="" />
              </div>
            </div>
          </div>
        </section>
        <CardFooter className='flex flex-wrap bg-blue-gray-100 w-full'>
          <section className='w-1/3 flex flex-col justify-center items-center'>
            <Typography className='text-lg font-bold mb-3'>¿Que hacemos?</Typography>
            <Typography></Typography>
            <Typography>¿Que hacemos?</Typography>
            <Typography>¿Que hacemos?</Typography>
          </section>
          <section className='w-1/3 flex flex-col gap-5 justify-center items-center'>
            <Typography className='text-lg font-bold '>Siguenos es redes sociales</Typography>
            <div className='flex flex-row gap-6'>

              <FaFacebookF className="text-blue-600 w-9 h-9" />
              <FaInstagram className='text-pink-400  w-9 h-9' />
              <FaWhatsapp className='text-green-500  w-9 h-9' />

            </div>
          </section>
          <section className='w-1/3 gap-3 flex flex-col justify-center items-center'>
            <Typography className='text-lg font-bold'>Contactanos</Typography>

            <div className='flex gap-2 flex-col justify-center items-center'>
              <div className='flex flex-row gap-3 justify-center items-center'>
                <FaEnvelope className='' />
                <Typography>grupoAdso@gmail.com</Typography>
              </div>
              <div className='flex flex-row gap-3 justify-center items-center'>
                <FaPhone className='' />
                <Typography>3001364564</Typography>
              </div>
              <div className='flex flex-row gap-3 justify-center items-center'>
                <FaHome className='' />
                <Typography>Sena</Typography>

              </div>
            </div>

          </section>
        </CardFooter>
      </div>

    </>
  );
}