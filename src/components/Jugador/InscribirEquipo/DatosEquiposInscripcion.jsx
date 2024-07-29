import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
export const DatosEquiposInscripcion = () => {
 
  const {id} = useParams()
  const [jugadores, setJugadores] = useState()
  const [idEquipo, setIdEquipo] = useState()
  const [equipo, setEquipo] = useState()
    const searchEquipo = async ()=>{
      try {
        const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${idEquipo}`)
        console.log(response)
        if(response.data == "EQUIPO NO ENCONTRADO"){
          Swal.fire({
            icon: "error",
            title: "equipo no registrado",
            text: `Revisa tu numero de cedula ${idEquipo}`
          })
        }else{
          Swal.fire({
            icon: "success",
            title: "Equipo Encontrado",
            text: `Nombre ${response.data.nombreEquipo}`
          })
          setEquipo(response.data)
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "equipo no registrado",
          text: `Revisa tu numero de cedula ${idEquipo}`
        })
      }
     
    }
  const inscribirEquipo = async ()=>{
    try {   
      const response = await axios.post(`http://localhost:3001/equipoInscripto`,{
        equipo:equipo,
        idCampeonato:id
      })
  
     Swal.fire(response.data.msg,"","success")
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error al guardar el equipo",
      })
    }

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
    {equipo ?
        <div className="bg-gray-200 mt-20 rounded-lg p-5">
          <h2 className="text-xl font-bold ml-5">Planilla Inscripcion Equipo</h2>

          <div className="flex items-center gap-5  mt-6">
            <label className="" htmlFor="name">
              Equipo
            </label>
            <input value={equipo.nombreEquipo} className="mr-6 h-9 rounded-lg w-96" type="text" placeholder="Nombre del equipo" />
          </div>
          <div className="flex items-center gap-3  mt-6">
            <label className="mt-4-label" htmlFor="address">
              Capitan
            </label>
            <input value={equipo.nombreCapitan} className=" h-9 rounded-lg w-96" id="address" placeholder="Nombre del capitan" />
          </div>
          <div className="flex gap-16 items- mt-5">
            <div className="flex  items-center  gap-5">
              <label className="text-black " htmlFor="city">
                Contacto
              </label>
              <input
              value={equipo.contactoUno}
                placeholder="Principal"
                className="mr-6 h-9 rounded-lg w-72"
                id="city"
                type="text"
               
              />
              <input
              value={equipo.contactoDos}
                placeholder="Secundario"
                className="mr-6 h-9 rounded-lg w-72"
                id="state"
                type="text"
              />
            </div>
        <div class=" border border-black">
          <img src={equipo.imgLogo} className=" w-44 h-44 top-52" alt="Logo Del Equipo" />
        </div>
          </div>
        </div>

      :<h1></h1>}

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
      {equipo && equipo.participantes.map((equipo)=>(
      <tr className="border-separate text-center text-lg font-medium">
    <td className="border rounded-md p-1 bg-white"></td>
    <td className="border rounded-md p-1 bg-white">{equipo.nombreJugador}</td>
    <td className="border rounded-md p-1 bg-white">{equipo.ficha}</td>
    <td className="border rounded-md p-1 bg-white">{equipo.dorsal}</td>
    </tr>  
    ))}
      </tbody>
    </table>
  </div>
  </form>
  <div class="ButtonPlanillaIns">
    <button 
    onClick={()=>inscribirEquipo()}
    className="mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5"> Inscribir </button>
  </div>
</div>
  )
}
