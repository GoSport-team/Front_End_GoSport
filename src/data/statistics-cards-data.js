import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { FaUsers } from "react-icons/fa";
import { cantidadCampeonatos, numeroEquipos, numeroInscritos } from "./dataGraficas";


async function obtenerDatos() {
  try {
    // Obteniendo los datos de los equipos
    const resultadoEquipos = await numeroEquipos();
    console.log(resultadoEquipos);

    // Calculando la suma de los equipos
    const equipos = resultadoEquipos.reduce((suma, valor) => suma + valor, 0);
    console.log(equipos);

    // Obteniendo los datos de los integrantes
    const resultadoIntegrantes = await numeroInscritos();
    console.log(resultadoIntegrantes);

    // Calculando la suma de los participantes
    const participantes = resultadoIntegrantes.reduce((suma, valor) => suma + valor, 0);
    console.log(participantes);
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

obtenerDatos();

export const statisticsCardsData = [
  {
    color: "gray",
    icon: FaUsers,
    title: "Numero total de equipos",
    value: equipos,
    footer: {
      color: "text-green-500",
      value: equipos,
      label: "Equipos inscritos en los 5 campeonatos con más equipos ",
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
      label: "Integrantes inscritos en los 6 campeonatos con más participantes",
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
