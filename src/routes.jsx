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
import { Participante } from "@/pages/dashboard";
import { element } from "prop-types";

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
      {
        name: "participantes",
        path: "/participantes", 
        element:<Participante/>
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
