import React from 'react'
import { Link } from 'react-router-dom'

export const NavBarJugador = ({cedula}) => {
   
  return (
    <nav className='flex'>
        <img className='w-32 h-28' src="/public/img/logoGos.png" alt="" />
        <div className='flex text-2xl font-bold gap-7 justify-end w-full mr-10 items-center'>
            <Link to={`verequipo/${cedula}`}>
            <h1>Ver Equipo</h1>
            </Link>
          
        </div>
    </nav>
  )
}
