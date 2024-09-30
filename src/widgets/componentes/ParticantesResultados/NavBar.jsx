import { NavLink } from 'react-router-dom';

export const Navbar = ({id}) => {
  return (
    <div className='flex gap-5 mt-10 mb-5'>
      <NavLink
        to={`/equiposcampeonato/${id}`}
        className={({ isActive }) =>
          isActive
            ? 'drop-shadow-lg dark:text-blue-400 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500'
            : 'text-2xl drop-shadow-lg font-semibold text-gray-900 dark:text-white'
        }
      >
        Equipos
      </NavLink>

      <NavLink
        to={`/vscampeonato/${id}`}
        className={({ isActive }) =>
          isActive
            ? 'drop-shadow-lg dark:text-blue-400 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500'
            : 'text-2xl drop-shadow-lg font-semibold text-gray-900 dark:text-white'
        }
      >
        VS
      </NavLink>
    </div>
  );
};

