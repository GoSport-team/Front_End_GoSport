import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  PhotoIcon
} from "@heroicons/react/24/solid";
import { Home, Tables, JugadorDestacado, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Fotos from "./pages/dashboard/fotos";
import { Participante } from "@/pages/dashboard";
import Cronograma from "./pages/dashboard/cronograma";

import { Salir } from "./pages/dashboard/salir";
import Planillero from "./widgets/componentes/Planillero";
import { FaRegNewspaper } from "react-icons/fa";
const icon = {
  className: "w-5 h-5 text-inherit",
};

 export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "perfil",
        path: "/perfil",
        element:<Profile/>
      },
      {
        icon: <PhotoIcon {...icon}/>,
        name: "gestionar noticias",
        path: "/fotos",
        element: <Fotos/>
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "campeonatos",
        path: "/campeonatos",
        element: <Tables />,
      },
      {
        icon: <FaRegNewspaper {...icon}/>,
        name:"planillero",
        path:"/planillero",
        element: <Planillero/>
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Jugador Destacado",
        path: "/destacado",
        element: <JugadorDestacado />,
      },
      {
        icon:<InformationCircleIcon {...icon }/>,
        name: "salir",
        path:"/salir",
        element:<Salir/>

      }
      
    ],
  }]
 export  const routeAuth=[
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];
export  const routeCampeonato=[
  {
    title: "campeonato pages",
    layout: "campeonato",
    pages: [
      {
      
        name: "participante",
        path: "/participante",
        element: <Participante/>
      },
      {
        icon: <InformationCircleIcon {...icon}/>,
        name: "cronograma",
        path: "/cronograma",
        element: <Cronograma/>
      },
      
    ],
  },
];

