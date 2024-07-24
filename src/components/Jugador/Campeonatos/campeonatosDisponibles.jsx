import { Link } from 'react-router-dom'
import CardCampeonato from './cardCampeonato'
import { Carrusel } from './Carrusel'

export default function CampeonatosDisponibles() {
  return (

    <>
    <Carrusel/>
    <section className='contenedorBienvenida'>
        <h1 className='text-center text-2xl ml-28 mr-28 ' >
        “Estimado [nombre del jugador], bienvenido al área de inscripciones. 🏆 
        Aquí podrás elegir los campeonatos en los que deseas participar. 
        No olvides que cada torneo es una oportunidad para demostrar 
        tu habilidad en la cancha. ¡Éxito!”
        </h1>
        <h1 className='tituloCam text-center mt-5 text-2xl font-semibold '>Campeonatos Disponibles</h1>
        <Link href={'/jugador/dashboard/crearequipo'}>
        <button  className=' btnExpecial mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5' >Crear Equipo</button></Link>
       <article className='contenedorCards flex gap-72 mt-28 p-18 justify-evenly flex-wrap'>
        <CardCampeonato/>
        
        </article>
      </section>
    </>
  )
}
