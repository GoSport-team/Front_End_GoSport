import { chartsConfig } from "@/configs";
import { cantidadCampeonatos, numeroEquipos, numeroInscritos } from "./dataGraficas";

const resultadoEquipos =await numeroEquipos()
const resultadoIntegrantes = await numeroInscritos()

const resultadoCampeonatos = await cantidadCampeonatos()

const websiteViewsChart = {
  type: "bar",
  height: 250,
  series: [
    {
      name: "N° Equipos",
      data: resultadoEquipos,
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "15%",
        borderRadius: 6,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["1", "2", "3", "4", "5"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 250,
  series: [
    {
      name: "Sales",
      data: resultadoIntegrantes,
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  },
};

const completedTaskChart = {
  type: "pie",
  height: 250,
  series: [resultadoCampeonatos.interfichas, resultadoCampeonatos.intercentros, resultadoCampeonatos.recreativos],
  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    colors: ["#388e3c", "#0288d1", "#FDCC00"], 
    labels: [
      "Interfichas",
      "Intercentros",
      "Recreativos",
    ], 
    plotOptions: {
      pie: {
        expandOnClick: true, // Activa el desplazamiento al hacer clic
        dataLabels: {
          offset: 20, 
        },
      },
    },
    dataLabels: {
      enabled: true, // Activa las etiquetas de datos
      formatter: function (val) {
        return val.toFixed(0); // Formatea los valores como enteros
      },
    },

    
  },
};


export const statisticsChartsData = [
  {
    color: "white",
    title: "Top 5 de campeonatos con mas equipos mas inscritos",
    description: "Esta grafica muestra el numero de equipos inscritos por campeonato",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Top 6 de campeonatos con mas integrantes de equipos mas inscritos",
    description: "Esta grafica muestra el numero de integrantes de equipos por campeonato",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Campeonatos creados por modalidades",
    description: "Esta grafica muestra el porcentaje de campeonatos creados por modalidad",
    chart: completedTaskChart,
  },
];

export default statisticsChartsData;
