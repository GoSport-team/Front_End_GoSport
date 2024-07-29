import { useEffect, useState } from "react";
import './styleCarrusel.css'
export const Carrusel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
          title: "Imagen 1",
          description: "Escribe el texto que aparecerá sobre la imagen número 1.",
        
          image: "/public/img/carrusel/01.jpg",
        },
        {
          title: "Imagen 2",
          description: "Escribe el texto que aparecerá sobre la imagen número 2.",
          
          image: "/public/img/carrusel/02.png",
        },
        {
          title: "Imagen 3",
          description: "Escribe el texto que aparecerá sobre la imagen número 3.",
          image: "/public/img/carrusel/03.jpg",
        },
      ];
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
    
        return () => clearInterval(intervalId);
      }, [slides.length]);
    
      const handleSlideChange = (index) => {
        setCurrentSlide(index);
      };
  
  return (
    <section id="container-slider">
    <button
      className="arrowPrev"
      onClick={() => handleSlideChange((currentSlide - 1 + slides.length) % slides.length)}
    >
      <i className=""></i>
    </button>
    <button
      className="arrowNext"
      onClick={() => handleSlideChange((currentSlide + 1) % slides.length)}
    >
      <i className=""></i>
    </button>
    <ul className="listslider">
      {slides.map((slide, index) => (
        <li key={index}>
          <a
            itlist={`itList_${index}`}
            className={currentSlide === index ? "item-select-slid" : ""}
            onClick={() => handleSlideChange(index)}
          />
        </li>
      ))}
    </ul>
    <ul id="slider">
      {slides.map((slide, index) => (
        <li key={index} style={{ opacity: currentSlide === index ? 1 : 0 }}>
          <img

          className="w-full imgCarrusel rounded-lg  "
            src={slide.image}
            alt={slide.title}
            layout="fill"
            
          />
         
        </li>
      ))}
    </ul>
  </section>
  )
}
