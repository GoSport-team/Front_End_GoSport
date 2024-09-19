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
    const resultadoEquipos = await numeroEquipos();
    console.log(resultadoEquipos);

    const equipos = resultadoEquipos.reduce((suma, valor) => suma + valor, 0);
    console.log(equipos);

    const resultadoIntegrantes = await numeroInscritos();
    console.log(resultadoIntegrantes);

    const participantes = resultadoIntegrantes.reduce((suma, valor) => suma + valor, 0);
    console.log(participantes);

    const resultadoCampeonatos = await cantidadCampeonatos();
    console.log(resultadoCampeonatos);

    return { equipos, participantes, resultadoCampeonatos };
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { equipos: 0, participantes: 0, resultadoCampeonatos: {} };
  }
}

async function initStatisticsCardsData() {
  const { equipos, participantes, resultadoCampeonatos } = await obtenerDatos();

  const statisticsCardsData = [
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
      value: resultadoCampeonatos.interfichas || 0,
      footer: {
        color: "text-green-500",
        value: resultadoCampeonatos.interfichas || 0,
        label: "campeonatos interfichas en total se han creado",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "Campeonato intercentros",
      value: resultadoCampeonatos.intercentros || 0,
      footer: {
        color: "text-green-500",
        value: resultadoCampeonatos.intercentros || 0,
        label: "campeonatos intercentros en total se han creado",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "Campeonato recreativos",
      value: resultadoCampeonatos.recreativos || 0,
      footer: {
        color: "text-green-500",
        value: resultadoCampeonatos.recreativos || 0,
        label: "campeonatos recreativos en total se han creado",
      },
    },
  ];

  return statisticsCardsData;
}


initStatisticsCardsData().then((statisticsCardsData) => {
  console.log(statisticsCardsData);
});

export default initStatisticsCardsData;
