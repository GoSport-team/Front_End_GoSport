import Cronograma from '@/widgets/componentes/Cronograma';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <> 
            <nav className="bg-gray-800 p-4">
                <div className="containerPrincipal flex items-center justify-between">
                    <div className="logo flex items-center">
                        <h1 className="text-white text-2xl ml-2">GoSport</h1>
                    </div>
                    <div className="links flex space-x-4">
                        <Link to={`auth/sign-up`} className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded">
                            Registrarse
                        </Link>
                        <Link to={`auth/sign-in`} className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded">
                            Iniciar sesión
                        </Link>
                        <a href="#section_dow" className="text-white hover:underline px-3 py-2 rounded">
                            Equipo Bienestar
                        </a>
                        <a href="#section_ft" className="text-white hover:underline px-3 py-2 rounded">
                            Contactanos
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}