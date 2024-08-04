import { Link } from 'react-router-dom'
import CardCampeonato from './cardCampeonato'
import { Carrusel } from './Carrusel'
import { NavBarJugador } from '../NavBar/NavBarJugador'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function CampeonatosDisponibles() {
  const [user, setUser] = useState()
  const token = Cookies.get('token')
  const [equipo, setEquipo] = useState(null)
  useEffect(()=>{
    const obtenerUser =async ()=>{
      const response = await axios.get('http://localhost:3001/usuarios/perfil',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
    }
    obtenerUser()
  },[])

    useEffect(() => {
        const obtnenerEquipo = async () => {
          if(user){
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
    {user?
    <div>
    <NavBarJugador cedula={user.identificacion}/>
    <Carrusel/>
    <section className='contenedorBienvenida'>
        <h1 className='text-center text-2xl ml-28 mr-28 flex ' >
        “Estimado <p className='text-3xl font-bold w-80'>{user.nombres}</p>, bienvenido al área de inscripciones. 🏆 
        Aquí podrás elegir los campeonatos en los que deseas participar. 
        No olvides que cada torneo es una oportunidad para demostrar 
        tu habilidad en la cancha. ¡Éxito!”
        </h1>
        <h1 className='tituloCam text-center mt-5 text-2xl font-semibold '>Campeonatos Disponibles</h1>
        <Link to={'/jugador/dashboard/crearequipo'}>
        <button  
        className=' btnExpecial mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5' >
          Crear Equipo
        </button>
        </Link>
       <article className='contenedorCards flex gap-10 mt-20 p-18 justify-around flex-wrap p-5'>
        {user && (
        <CardCampeonato cedula={user.identificacion}/>
        )}
        
        </article>
      </section>
      </div>
      :<h1>Esqueleton</h1>
      }
    </>
  )
}
