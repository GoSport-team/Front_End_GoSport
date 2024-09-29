import Cronograma from '@/widgets/componentes/Cronograma';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Aos from "aos";
import "./landing.css";
import {
  CardFooter,
  Typography
} from "@material-tailwind/react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import Participantes from '@/widgets/componentes/Participantes';
import Resultados from '@/widgets/componentes/Resultados';
import CarouselLanding from './carrusel';


export default function Landing() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Función para cerrar el menú después de hacer clic en una opción
  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  return (
    <>

      <div className="overflow-hidden">
        <nav className="h-[10vh] bg-white">
          <div className="px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex h-16 justify-between">
              <div className="flex items-cente justify-center">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className='grig place-content-center'>
                    <img
                      src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727105277/ifn8qjflp4vgjbq5xlao.png"
                      className="h-16 md:h-28 object-contain p-4"
                      alt="Logo"
                    />
                  </div>
                  <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
                    GoSport
                  </span>
                </a>
              </div>
              <div className="flex md:hidden">
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-lg"
                  aria-controls="navbar-default"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Abrir menú principal</span>
                  {isOpen ? (
                    <svg
                      className="w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className={`md:flex items-center space-x-8 hidden`}>
                <Link
                  to={`auth/sign-up`}
                  className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded "
                >
                  Registrarse
                </Link>
                <Link
                  to={`auth/sign-in`}
                  className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded "
                >
                  Iniciar sesión
                </Link>
                <a
                  href="#section_dow"
                  className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded "
                >
                  Equipo Bienestar
                </a>
                <a
                  href="#section_ft"
                  className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded "
                >
                  Contáctanos
                </a>
              </div>
            </div>
            <div
              className={`${isOpen ? 'block' : 'hidden'
                } absolute right-0 top-16 w-48 p-4 space-y-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 z-50 transition-transform transform`}
            >
              <ul className="flex flex-col">
                <li>
                  <Link
                    to={`auth/sign-up`}
                    className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
                    onClick={toggleMenu}
                  >
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link
                    to={`auth/sign-in`}
                    className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
                    onClick={toggleMenu}
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <a
                    href="#section_dow"
                    className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
                    onClick={toggleMenu}
                  >
                    Equipo Bienestar
                  </a>
                </li>
                <li>
                  <a
                    href="#section_ft"
                    className="hover:text-tahiti block text-lg text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
                    onClick={toggleMenu}
                  >
                    Contáctanos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <CarouselLanding />
      </div>
      <div class="bg-white h-full flex flex-col justify-center">
        <div className="mt-2 h-auto flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-[45vw] h-full flex justify-center items-center rounded-xl drop-shadow-xl md:flex" data-aos="fade-right">
            <img className="AnimacionImagenOrganizadores w-3/4 hidden md:block" src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727105183/kbcmiuy3cowbre7dqvhx.png" alt="img" />
          </div>
          <div className="flex flex-col mb-5 pb-5 w-full md:w-[55vw] items-center md:items-start justify-center">
            <div className="flex flex-col h-auto mb-10 text-center md:text-left w-full">
              <h3 className="pt-12 text-3xl font-bold uppercase tracking-wide text-shadow">PARA ORGANIZADORES</h3>
              <p className="pt-6 text-xl mt-4">Optimiza la gestión de tus torneos con nuestra plataforma, convierte tus ideas en experiencias inolvidables.</p>
            </div>
            <div className="flex flex-col h-auto justify-around w-full">
              <div className="flex flex-row items-center mb-5 pb-5 w-full">
                <div className="w-[15%] md:w-[10vw] flex justify-center">
                  <img data-aos="zoom-in-down" className="w-[30%] md:w-[6vw] object-cover" src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727105131/ufc9cqmsgi7ermpjssmi.png" alt="img" />
                </div>
                <div className="w-[80%] flex flex-col pl-5">
                  <p className="text-2xl font-medium tracking-wide mb-2 text-shadow">Facilidad de creación</p>
                  <p className="text-shadow-black text-lg pr-1.5 tracking-wider">Crea campeonatos en cuestión de minutos con nuestro proceso intuitivo y amigable.</p>
                </div>
              </div>

              <div className="flex flex-row items-center mb-5 pb-5 w-full">
                <div className="w-[15%] md:w-[10vw] flex justify-center">
                  <img data-aos="zoom-in-down" className="w-[30%] md:w-[6vw] object-cover" src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727105014/bxehhv3ihw4a3hsscjrl.png" alt="img" />
                </div>
                <div className="w-[80%] flex flex-col pl-5">
                  <p className="text-2xl font-medium tracking-wide mb-2 text-shadow">Sorteo automático de equipos</p>
                  <p className="text-shadow-black text-lg pr-1.5 tracking-wider">Deja que nuestro sistema inteligente distribuya los equipos de manera justa y aleatoria.</p>
                </div>
              </div>

              <div className="flex flex-row items-center mb-5 pb-5 w-full">
                <div className="w-[15%] md:w-[10vw] flex justify-center">
                  <img data-aos="zoom-in-down" className="w-[30%] md:w-[6vw] object-cover" src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727105005/mcz8ancofl3rppvx0zvl.png" alt="img" />
                </div>
                <div className="w-[80%] flex flex-col pl-5">
                  <p className="text-2xl font-medium tracking-wide mb-2 text-shadow">Cronogramas personalizados</p>
                  <p className="text-shadow-black text-lg pr-1.5 tracking-wider">Organiza con facilidad y personaliza tus cronogramas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="mt-4 w-full h-full flex flex-col bg-blue-gray-50 rounded-lg overflow-hidden">
          <h1 className="pt-12 text-2xl md:text-3xl font-bold uppercase tracking-wide text-shadow grid place-content-center py-6">
            PARA JUGADORES
          </h1>
          <section className="mt-4 ml-2 w-full h-full flex flex-col md:flex-row bg-blue-gray-50 rounded-lg">
            <section className="flex flex-col pl-4 md:pl-24 w-full md:w-[60vw]">
              <div className="w-full">
                <p className="pt-4 mb-5 text-lg md:text-lg tracking-wider">
                  Regístrate y participa en campeonatos exclusivos en nuestra plataforma para amantes del juego.
                </p>
              </div>

              {[
                {
                  imgSrc: "https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104943/iuscn47iqrxnb2qdcj6y.jpg",
                  title: "Explora campeonatos",
                  description: "Descubre una variedad de torneos emocionantes y elige aquellos que despierten tu espíritu competitivo.",
                },
                {
                  imgSrc: "https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104886/ewmocrl9j5g0ddzikiye.jpg",
                  title: "Inscripción rápida y sencilla",
                  description: "Únete a la competición en cuestión de segundos. Inscríbete fácilmente en los torneos que te emocionan.",
                },
                {
                  imgSrc: "https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104667/ewcnhcpvmxwtdqe3suwt.jpg",
                  title: "Sé el protagonista de momentos inolvidables",
                  description: "Vive momentos inolvidables, desde jugadas asombrosas hasta victorias gloriosas. ¡Cada campeonato tiene su propia historia, y tú eres la estrella!",
                },
              ].map(({ imgSrc, title, description }, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center mb-5 w-full mt-6">
                  <div className="w-full md:w-2/5 flex items-center">
                    <img
                      data-aos="zoom-in-down"
                      className="w-1/2 md:w-1/2 rounded-lg"
                      src={imgSrc}
                      alt="img"
                    />
                  </div>
                  <div className="w-full md:w-3/5 flex flex-col ml-2">
                    <p className="text-lg md:text-xl font-medium tracking-wide mb-2 text-shadow">
                      {title}
                    </p>
                    <p className="text-shadow-black text-base md:text-base tracking-wider">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </section>

            <div className="w-full md:w-[40vw] hidden md:flex justify-center items-center mt-6">
              <img
                className="AnimacionImagenOrganizadores w-[60%] rounded-lg"
                data-aos="fade-left"
                src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727104735/trdw9lqm4n1bfolijj3f.png"
                alt="img"
              />
            </div>
          </section>
        </section>



        <section className="mt-5 flex justify-center flex-col w-full" id="section_dow">
          <div className="flex flex-col px-5 md:px-28">
            <h1 className="mt-3 text-center text-2xl md:text-3xl font-bold text-black py-6 tracking-wider">
              Equipo Bienestar al Aprendiz
            </h1>

            <h5 className="text-xl md:text-2xl mt-7 mb-7 font-bold tracking-wider">
              ¿Quiénes somos?
            </h5>
            <p className="tracking-wider text-lg md:text-xl leading-6 mb-4">
              Equipo encargado de gestionar y realizar acciones para el bienestar de sus aprendices en el marco de los planes, políticas y normativas institucionales.
            </p>
            <div className="flex flex-col md:flex-row mt-10 justify-between items-center w-full">
              <div className="w-full md:w-[50vw] text-center mb-5 md:mb-0">
                <img
                  className="rounded-lg w-[80vw] md:w-[30vw] object-cover mx-auto"
                  src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727065176/q9riwa6qrykvnevem6gh.jpg"
                  alt=""
                />
              </div>
              <div className="w-full md:w-[50vw] flex justify-center gap-3 flex-col items-center p-5 md:p-10">
                <h4 className="text-black text-2xl md:text-3xl font-bold text-center py-3">
                  Nuestro propósito
                </h4>
                <p className="text-lg md:text-xl leading-9 mb-4 text-justify tracking-wider">
                  "Promover la inclusión y la diversidad a través del deporte, creando espacios donde todas las personas, independientemente de sus capacidades físicas o condiciones socioeconómicas, puedan participar y disfrutar de los beneficios del ejercicio físico, fortaleciendo así la cohesión social y el respeto mutuo."
                </p>
              </div>
            </div>

            {/* Segunda sección con texto y imagen */}
            <div
              className=" w-full flex flex-col-reverse md:flex-row text-center justify-center items-center mt-4"
              id="section_ft"
            >
              <div className="w-full md:w-[50vw] flex justify-center gap-3 flex-col items-center">
                <h4 className="text-black text-2xl md:text-3xl font-bold text-center py-2">
                  GoSport
                </h4>
                <p className="text-lg md:text-xl leading-9 mb-4 text-justify tracking-wider">
                  Uno de nuestros propósitos es fomentar la práctica del deporte y la actividad física para el desarrollo de hábitos de vida saludable, el adecuado uso del tiempo libre y el desarrollo de habilidades socioemocionales, apoyando al proceso de formación integral.
                </p>
              </div>
              <div className="w-full md:w-[50vw] text-center flex justify-center items-center mb-5 md:mb-0">
                <img
                  src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727065176/diw3gcgenhabaxt9ztjx.webp"
                  className="w-[80vw] md:w-[30vw] object-cover rounded-lg mx-auto"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center bg-blue-gray-100 w-full overflow-hidden">
          <CardFooter className="flex flex-wrap w-[90vw] md:w-[80vw] justify-between p-5">
            <div className="flex flex-col sm:flex-row justify-between w-full mb-5 md:mb-0">
              <section className="flex flex-col items-start sm:w-1/2 mb-5 sm:mb-0">
                <Typography className="text-base sm:text-sm md:text-xl font-bold">Contáctanos</Typography>
                <div className="flex flex-col gap-2 justify-start items-start">
                  <div className="flex flex-row gap-3 justify-start items-center">
                    <FaEnvelope className="" />
                    <Typography className="text-xs sm:text-sm md:text-lg">grupoAdso@gmail.com</Typography>
                  </div>
                  <div className="flex flex-row gap-3 justify-start items-center">
                    <FaPhone className="" />
                    <Typography className="text-xs sm:text-sm md:text-lg">3001364564</Typography>
                  </div>
                  <div className="flex flex-row gap-3 justify-start items-center">
                    <FaHome className="" />
                    <Typography className="text-xs sm:text-sm md:text-lg">Sena</Typography>
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-5 justify-center items-center sm:w-1/2">
                <Typography className="text-base sm:text-sm md:text-xl font-bold text-center">Síguenos en redes sociales</Typography>
                <div className="flex flex-row gap-6">
                  <FaFacebookF className="text-blue-600 w-8 h-8 sm:w-7 sm:h-7 md:w-9 md:h-9" />
                  <FaInstagram className="text-pink-400 w-8 h-8 sm:w-7 sm:h-7 md:w-9 md:h-9" />
                  <FaWhatsapp className="text-green-500 w-8 h-8 sm:w-7 sm:h-7 md:w-9 md:h-9" />
                </div>
              </section>
            </div>
          </CardFooter>
        </div>
      </div>

    </>
  );
}