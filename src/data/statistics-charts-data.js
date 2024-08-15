import { chartsConfig } from "@/configs";
import { numeroEquipos } from "./dataGraficas";

const resultadoEquipos =await numeroEquipos()

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
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 250,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
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
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Top 5 de campeonatos con mas inscritos",
    description: "Esta grafica muestra el numero de equipos inscritos por campeonato",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Daily Sales",
    description: "15% increase in today sales",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Completed Tasks",
    description: "Last Campaign Performance",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
