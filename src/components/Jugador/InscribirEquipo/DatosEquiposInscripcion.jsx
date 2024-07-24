import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
export const DatosEquiposInscripcion = () => {
 
  const id = useParams()
  const [jugadores, setJugadores] = useState()
  const [idEquipo, setIdEquipo] = useState()
  const [equipo, setEquipo] = useState()
    const searchEquipo = async ()=>{
      const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${idEquipo}`)
      setEquipo(response.data)
     
    }
  console.log(equipo)
  const inscribirEquipo = async ()=>{
    const response = await axios.post(`http://localhost:3001/equipoInscrito`,{
      equipo:equipo,
      idCampeonato:id
    })

    console.log(response.data)

  }
  return (
    <div className="flex flex-col items-center justify-center ">
       <div className="flex items-center mt-10">
      <label htmlFor="" className="text-2xl font-bold mr-5">Busca a tu equipo</label>
      <input onChange={e=>setIdEquipo(e.target.value)} type="text"  className="bg-gray-200 h-12 w-96" placeholder="Busca tu equipo con tu numero de identificacion"/>
      <button 
      className="mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5"
      onClick={()=>searchEquipo()}>Buscar</button>
      </div>
    <form action="">
        <div className="bg-gray-200 mt-20 rounded-lg p-5">
          <h2 className="text-xl font-bold ml-5">Planilla Inscripcion Equipo</h2>

          <div className="flex items-center gap-5  mt-6">
            <label className="" htmlFor="name">
              Equipo
            </label>
            <input className="mr-6 h-9 rounded-lg w-96" type="text" placeholder="Nombre del equipo" />
          </div>

          <div className="flex items-center gap-3  mt-6">
            <label className="mt-4-label" htmlFor="address">
              Capitan
            </label>
            <input className=" h-9 rounded-lg w-96" id="address" placeholder="Nombre del capitan" />
          </div>
          <div className="flex gap-16 mt-5 items-center">
            <div className="flex  items-center  gap-5">
              <label className="text-black " htmlFor="city">
                Contacto
              </label>
              <input
                placeholder="Principal"
                className="mr-6 h-9 rounded-lg w-72"
                id="city"
                type="text"
               
              />
            </div>
            <div className="flex-1">
              <label className="text-black" htmlFor="state">
              </label>
              <input
                placeholder="Secundario"
                className="mr-6 h-9 rounded-lg w-72"
                id="state"
                type="text"
                
              />
            </div>
        <div class="card">
          <img className="absolute w-44 h-44 top-52" alt="Logo Del Equipo" />
          <input type="file"  className="inpuntImg" />
        </div>
          </div>
        </div>
  <div className="bg-gray-200 mt-10 p-5 rounded-xl">
    <table className="w-full border-separate mt-8">
      <thead>
        <tr>
          <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">N°</th>
          <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Nombre </th>
          <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Ficha </th>
          <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border th3">N° Dorsal </th>
        </tr>
      </thead>
      <tbody>
        {/* {jugadores && jugadores.map((jugador, indice)=>(
      <tr key={indice}>
    <td className="whill">{indice}</td>
    <td>{jugador.nombreJugador}</td>
    <td>{jugador.ficha}</td>
    <td>{jugador.dorsal}</td>
    </tr>
        ))} */}
      </tbody>
    </table>
  </div>
  <div class="ButtonPlanillaIns">
    <button className="mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5" type="submit"> Inscribir </button>
  </div>
  </form>
</div>
  )
}
