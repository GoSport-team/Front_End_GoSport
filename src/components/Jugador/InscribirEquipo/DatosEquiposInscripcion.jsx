import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
export const DatosEquiposInscripcion = () => {

  const { id, cedula } = useParams()
  const [jugadores, setJugadores] = useState()
  const [equipo, setEquipo] = useState()
  const navigate = useNavigate();
  console.log(cedula)
  useEffect(() => {
    const searchEquipo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${cedula}`)
        console.log(response)
        if (response.data == "EQUIPO NO ENCONTRADO") {
          Swal.fire({
            icon: "error",
            title: "equipo no registrado",
            text: `Debes de crear un equipo primero`
          })
        } else {
          Swal.fire({
            icon: "success",
            title: "Equipo Encontrado",
            text: `Nombre ${response.data.nombreEquipo}`,
            confirmButtonText: "OK",
            confirmButtonColor: "#0837C0",
          })
          setEquipo(response.data)
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "equipo no registrado",
          text: `Revisa tu numero de cedula ${cedula}`
        })
      }
    }

    searchEquipo()
  }, [])
  const inscribirEquipo = async () => {
    try {

      const validarRegistroEquipo = await axios.get(`http://localhost:3001/equipoInscripto/cedula/${id}`, {
        headers: {
          cedulaJugador: cedula
        }
      })

      if (validarRegistroEquipo.data.msg == "Equipo no inscrito") {
        const response = await axios.post(`http://localhost:3001/equipoInscripto`, {
          Equipo: equipo,
          idCampeonato: id
        })
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#0837C0",
        })
        setTimeout(() => {
          navigate('/jugador/dashboard')
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: validarRegistroEquipo.data.msg,
          confirmButtonText: "OK",
          confirmButtonColor: "#E42245",
        })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error al guardar el equipo",
        confirmButtonText: "OK",
        confirmButtonColor: "#E42245",
      })
    }


  }

  return (
    // <div className="flex flex-col items-center justify-center ">
    //   <form action="">
    //     {equipo ?
    //       <div className="bg-gray-200 mt-20 rounded-lg p-5">
    //         <h2 className="text-xl font-bold ml-5">Planilla Inscripcion Equipo</h2>

    //         <div className="flex items-center gap-5  mt-6">
    //           <label className="" htmlFor="name">
    //             Equipo
    //           </label>
    //           <input value={equipo.nombreEquipo} className="mr-6 h-9 rounded-lg w-96" type="text" placeholder="Nombre del equipo" />
    //         </div>
    //         <div className="flex items-center gap-3  mt-6">
    //           <label className="mt-4-label" htmlFor="address">
    //             Capitan
    //           </label>
    //           <input value={equipo.nombreCapitan} className=" h-9 rounded-lg w-96" id="address" placeholder="Nombre del capitan" />
    //         </div>
    //         <div className="flex gap-16 items- mt-5">
    //           <div className="flex  items-center  gap-5">
    //             <label className="text-black " htmlFor="city">
    //               Contacto
    //             </label>
    //             <input
    //               value={equipo.contactoUno}
    //               placeholder="Principal"
    //               className="mr-6 h-9 rounded-lg w-72"
    //               id="city"
    //               type="text"

    //             />
    //             <input
    //               value={equipo.contactoDos}
    //               placeholder="Secundario"
    //               className="mr-6 h-9 rounded-lg w-72"
    //               id="state"
    //               type="text"
    //             />
    //           </div>
    //           <div class="">
    //             <img src={equipo.imgLogo} className=" w-44 h-44 top-52" alt="Logo Del Equipo" />
    //           </div>
    //         </div>
    //       </div>

    //       : <h1></h1>}

    //     <div className="bg-gray-200 mt-10 p-5 rounded-xl">
    //       <table className="w-full border-separate mt-8">
    //         <thead>
    //           <tr>
    //             <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">N°</th>
    //             <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Nombre </th>
    //             <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Ficha </th>
    //             <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border th3">N° Dorsal </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {equipo && equipo.participantes.map((equipo, indice) => (
    //             <tr className="border-separate text-center text-lg font-medium">
    //               <td className="border rounded-md p-1 bg-white">{indice + 1}</td>
    //               <td className="border rounded-md p-1 bg-white">{equipo.nombreJugador}</td>
    //               <td className="border rounded-md p-1 bg-white">{equipo.ficha}</td>
    //               <td className="border rounded-md p-1 bg-white">{equipo.dorsal}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </form>
    //   <div class="ButtonPlanillaIns">
    //     <button
    //       onClick={() => inscribirEquipo()}
    //       className="mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5"> Inscribir </button>
    //   </div>
    // </div>

    <div className="flex items-center bg-white flex-col w-[100vw]">
      <form action="">
        {equipo ?
          <div className="bg-white mt-20 rounded-lg p-6 shadow-md w-[60vw]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Planilla Inscripción Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="name">Equipo</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Nombre del equipo"
                    value={equipo.nombreEquipo}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="captain">Capitán</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={equipo.nombreCapitan}
                    placeholder="Nombre del capitán"
                    
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="contact1">Contacto Principal</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={equipo.contactoUno}
                    type="text"
                    
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium" htmlFor="contact2">Contacto Secundario</label>
                  <input
                    className="h-10 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={equipo.contactoDos}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 content-center">
                <div className="relative w-48 grid place-content-center">
                  <img
                    className="object-cover grid place-content-center rounded-sm"
                    src={equipo.imgLogo}
                    alt="Logo del Equipo"
                  />
                </div>

                <label class="select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black">
                  Imagen Equipo
                </label>
              </div>
            </div>
          </div>

          : <h1></h1>}

      
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
          <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th  scope="col" class="px-6 py-3">N°</th>
                <th  scope="col" class="px-6 py-3">Nombre </th>
                <th  scope="col" class="px-6 py-3">Ficha </th>
                <th  scope="col" class="px-6 py-3">N° Dorsal </th>
              </tr>
            </thead>
          <tbody>
              {equipo && equipo.participantes.map((equipo, indice) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{indice + 1}</td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{equipo.nombreJugador}</td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{equipo.ficha}</td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{equipo.dorsal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </form>
      <div class="w-[60vw] flex justify-start mt-10 ButtonPlanillaIns">
        <button
          onClick={() => inscribirEquipo()}
          class=" select-none rounded-lg bg-[#12aed1cd] py-4 px-7 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"> Inscribir </button>
      </div>
    </div>
  )
}
