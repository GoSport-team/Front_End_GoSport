import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const NavBarJugador = ({ cedula }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="flex items-center justify-between p-4 text-black relative">
      {/* Logo */}
      <img
        className="w-24 h-20 md:w-32 md:h-28"
        src="/public/img/logoGos.png"
        alt="Logo"
      />
      <div className="hidden md:flex space-x-6 text-lg font-bold text-black pr-10">
        <Link to={`verequipo/${cedula}`} className="hover:text-blue-400">
          <h1>Ver Equipo</h1>
        </Link>
        <Link to={'perfilJugador/'} className="hover:text-blue-400">
          <h1>Perfil</h1>
        </Link>
      </div>

      <button
        className="md:hidden text-black focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div
        className={`md:hidden absolute top-16 right-4 bg-white text-black shadow-lg rounded-lg p-4 transition-transform transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-96 opacity-0'
          }`}
        style={{ zIndex: 50 }} 
      >
        <Link
          to={`verequipo/${cedula}`}
          className="block py-2 px-4 text-lg font-bold hover:text-blue-400"
          onClick={toggleMenu}
        >
          Ver Equipo
        </Link>
        <Link
          to={'perfilJugador/'}
          className="block py-2 px-4 text-lg font-bold hover:text-blue-400"
          onClick={toggleMenu}
        >
          Perfil
        </Link>
      </div>
    </nav>
  )
}
