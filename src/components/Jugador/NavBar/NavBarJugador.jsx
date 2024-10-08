import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const NavBarJugador = ({ cedula }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };
  return (
    <nav className="flex items-center justify-between p-4 text-black relative">
  <img
    className="w-24 h-20 md:w-32 md:h-28"
    src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727105277/ifn8qjflp4vgjbq5xlao.png"
    alt="Logo"
  />
  <div className="flex-grow">
    <div className="flex justify-end space-x-6 text-lg font-bold text-black pr-10">
      <Link to={`Jugador/`} className="hover:text-tahiti">
        <h1>Ver Equipo</h1>
      </Link>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="hover:text-tahiti focus:outline-none"
        >
          <h1>Perfil</h1>
        </button>
        {isDropdownOpen && (
          <div
            id="dropdownNavbar"
            className="z-10 absolute right-0 mt-2 w-44 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownLargeButton"
            >
              <li>
                <Link
                  to={`perfilJugador/`}
                  className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                >
                  <h1>Ver Perfil</h1>
                </Link>
              </li>
              <li>
                <Link
                  to={`verequipo/${cedula}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <h1>Actualizar Equipo</h1>
                </Link>
              </li>
            </ul>
            <div className="py-1">
              <Link
                to={`/`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <h1>Salir</h1>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</nav>

  )
}
