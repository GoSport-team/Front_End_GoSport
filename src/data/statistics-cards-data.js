import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { FaUsers } from "react-icons/fa";
import { cantidadCampeonatos, numeroEquipos, numeroInscritos } from "./dataGraficas";


const resultadoEquipos =await numeroEquipos()
const equipos = resultadoEquipos.reduce((suma,valor)=>suma+valor,0)
const resultadoIntegrantes = await numeroInscritos()
const participantes = resultadoIntegrantes.reduce((suma,valor)=> suma+valor,0)
const resultadoCampeonatos = await cantidadCampeonatos()
export const statisticsCardsData = [
  {
    color: "gray",
    icon: FaUsers,
    title: "Numero total de equipos",
    value: equipos,
    footer: {
      color: "text-green-500",
      value: equipos,
      label: "equipos sean inscirto en el top 5 de campeonatos con mas equipos ",
    },
  },
  {
    color: "gray",
    icon: FaUsers,
    title: "Numero total de participantes",
    value: participantes,
    footer: {
      color: "text-green-500",
      value: participantes,
      label: "integrantes se han inscrito al top 6 de campeonatos con mas integrantes",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Campeonato interfichas",
    value: resultadoCampeonatos.interfichas,
    footer: {
      color: "text-green-500",
      value: resultadoCampeonatos.interfichas,
      label: "campeonatos interfichas en total se han creado",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Campeonato intercentros",
    value: resultadoCampeonatos.intercentros,
    footer: {
      color: "text-green-500",
      value: resultadoCampeonatos.intercentros,
      label: "campeonatos intercentros en total se han creado",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Campeonato recreativos",
    value: resultadoCampeonatos.recreativos,
    footer: {
      color: "text-green-500",
      value: resultadoCampeonatos.recreativos,
      label: "campeonatos recreativos en total se han creado",
    },
  },
];

export default statisticsCardsData;
