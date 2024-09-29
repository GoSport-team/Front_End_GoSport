import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Targetas from "@/widgets/componentes/landing/Cards";
import MatchDetails from "@/widgets/componentes/landing/lives";

const CarouselLanding = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className="w-full h-[90vh]">
            <Slider {...settings}>
                <div className="h-[90vh] w-screen bg-[url('/img/fondo3.png')] bg-cover bg-center">
                    <div className="flex flex-col items-start justify-end h-full w-full p-10">
                        <p className="text-shadow-black text-black text-3xl w-[90%] sm:w-[80%] md:w-[60%] lg:w-[33rem] text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.9rem] font-sans sm:leading-[1.6] md:leading-[1.7] tracking-[0.5px] sm:tracking-[0.75px] md:tracking-[1px]">
                            Crea campeonatos inolvidables. ¡Dale vida a la competencia y eleva el espíritu deportivo! ¿Estás listo para ser parte de la experiencia?
                        </p>
                        <Link to={`auth/sign-in`}>
                            <button className="custom-button mt-4 sm:mt-[1.5rem] md:mt-[2rem] px-[20px] py-[15px] sm:px-[22px] sm:py-[18px] md:px-[25px] md:py-[20px] text-[15px] sm:text-[16px] md:text-[17px] font-bold cursor-pointer">
                                Únete Ahora
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center h-[90vh] bg-white">
                    <div className="flex w-full">
                        <div className="w-1/2 h-[90vh] hidden md:grid place-content-center">
                            <img className="object-cover w-[60vh]" src="public/img/Neymar.png" alt="img Jugador" />
                        </div>

                        <div className="w-full md:w-1/2 h-[90vh] grid place-content-center">
                            <Link to={`/part`}>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <Targetas />
                                    <div className="hidden md:block">
                                        <MatchDetails />
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-[90vh] bg-white">
                    <div className="flex flex-col md:flex-row w-full h-full">
                        <div className="w-full md:w-1/2 h-[45vh] md:h-full grid place-content-center">
                            <img className="object-cover w-[50vw] md:w-[25vw]" src="public/img/qr.png" alt="QR" />
                        </div>
                        <div className="w-full md:w-1/2 h-[45vh] md:h-full grid place-content-center">
                            <img className="object-cover  w-[60vw] md:w-[30vw]" src="public/img/cr7.png" alt="img Jugador" />
                        </div>
                    </div>
                </div>

            </Slider>
        </div>
    );
};

export default CarouselLanding;
