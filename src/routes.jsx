import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  
} from "@heroicons/react/24/solid";
import { Home, Tables, Notifications, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Fotos from "./pages/dashboard/fotos";
import { element } from "prop-types";
import { Participante } from "@/pages/dashboard";
import Cronograma from "./pages/dashboard/cronograma";
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
        icon: <InformationCircleIcon {...icon}/>,
        name: "fotos",
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
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      
      
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

