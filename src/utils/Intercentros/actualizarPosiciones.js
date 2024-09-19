import axios from "axios"
const URL_API = import.meta.env.VITE_API_URL

export const actualizarPosiciones = async (equipo1, equipo2, data1, data2) => {
  const [dataEQ1, dataEQ2] = await Promise.all([
    axios.get(`${URL_API}/posicionesIntercentros/${equipo1}`),
    axios.get(`${URL_API}/posicionesIntercentros/${equipo2}`),
  ]);

  const calcularNuevosDatos = (dataOriginal, dataActualizada) => {
    return {
      pts: dataOriginal.pts + dataActualizada.pts,
      goles: dataOriginal.goles + dataActualizada.goles.reduce((total, gol) => total + parseInt(gol.goles), 0),
      amarillas: dataOriginal.amarillas + dataActualizada.amarillas.reduce((total, am) => total + parseInt(am.amarillas), 0),
      rojas: dataOriginal.rojas + dataActualizada.rojas.reduce((total, roja) => total + parseInt(roja.rojas), 0),
    };
  };

  const newData1 = calcularNuevosDatos(dataEQ1.data, data1);
  const newData2 = calcularNuevosDatos(dataEQ2.data, data2);

  await Promise.all([
    axios.patch(`${URL_API}/posicionesIntercentros/${dataEQ1.data._id}`, newData1),
    axios.patch(`${URL_API}/posicionesIntercentros/${dataEQ2.data._id}`, newData2),
  ]);

  console.log(newData1, newData2);
};
