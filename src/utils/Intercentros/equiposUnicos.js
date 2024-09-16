
export const sacarEquipos = (data)=>{
  console.log(data)
    const equiposMap = new Map();
    data.forEach(item => {
      equiposMap.set(item.equipo1._id, item.equipo1);
      equiposMap.set(item.equipo2._id, item.equipo2);
    });
    const equiposUnicos = Array.from(equiposMap.values());

    return equiposUnicos
}