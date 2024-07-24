import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
export const DatosEquipos = () => {
  const [image, setImage] = useState()
  const [estadoImg, setEstadoImg] = useState()
  const [mensaje, setMensaje] = useState()
  const [jugadores, setJugadores] = useState([])
  const [jugador, setJugador] = useState()
  const [file, setFile] = useState()
  const [nombreEquipo, setNombreEquipo] = useState()
  const [nombreCapitan, setNombreCapitan] = useState()
  const [contactoUno, setContactoUno] = useState()
  const [contactoDos, setContactoDos] = useState()
  const [user, setUser] = useState()
  const token = Cookies.get('token')
  const handleImage =async (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file)) 
    setFile(file)
  }
  useEffect(()=>{
    const obtenerUser =async ()=>{
      const response = await axios.get('http://localhost:3001/usuarios/perfil',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
    }
    obtenerUser()
  },[])

  console.log(user)
  const submit = async(e) => {
    e.preventDefault()
    // const formData = new FormData();
    // formData.append("imageAgregar", file)

    // const respuesta = await fetch('/api/post',{
    //   method:'POST',
    //   body: formData
    // })

    // const dataImage = await respuesta.json()
    
    // setEstadoImg(dataImage.url)
    if(jugadores.length <10){
      console.log("Numero de jugadores no alcanzado")
    }else{
    const response = await axios.post('http://localhost:3001/equipo', {
      nombreEquipo: nombreEquipo,
      nombreCapitan: user.nombres,
      contactoUno: user.telefono,
      contactoDos: contactoDos,
      jornada: user.jornada,
      cedula: user.identificacion,
      imgLogo: "imgshsshshs",
      estado: true,
      participantes: jugadores
    })
    setMensaje(response.data.msg)
    Swal.fire({
      icon:"success",
      title: response.data.msg
    })

  }
  }

  const searchJugador = async (idenfiticacion) => {
    try {
      const response = await axios.get(`http://localhost:3001/usuarios/identificacion/${idenfiticacion}`)
      const { value: formValues } = await Swal.fire({
        title: "Deseas agregar a este jugador",
        
        html: `
          <h1>${response.data.nombres}</h1>
          <h1>Ficha</h1>
          <input id="swal-input1"  value=${response.data.ficha} class="swal2-input" required  placeholder="Ingresa la ficha" >
          <input id="swal-input2" class="swal2-input" required  placeholder="Ingresa el dorsal" >
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      if (formValues) {
        Swal.fire({
          title:"Datos del jugador",
          showCancelButton: true,
          confirmButtonText: "Save",
          confirmButtonColor: "#04ff00",
          cancelButtonColor: "#d33",
          text: `Nombre ${response.data.nombres} \n 
          Ficha ${JSON.stringify(formValues[0])} \n
          Dorsal ${JSON.stringify(formValues[1])}`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Jugador guardado correctamente", "", "success");
            setJugadores(prev => [...prev,
               {nombreJugador:response.data.nombres,
                ficha:formValues[0],
                dorsal:formValues[1]
               }
              ])
          }
        });
      }
    } catch (error) {
      console.log(error)
      if(error){
        Swal.fire({
          icon: "error",
          title: "Jugador no registrado",
          text: `identificacion no encontrada ${idenfiticacion}`
        })
      }
    }
  }
  return (
        <div className="flex justify-center ">
            <form action="" onSubmit={submit}>
                <div className="bg-gray-200 mt-20 rounded-lg p-5">
                  <h2 className="text-xl font-bold ml-5">Planilla Inscripcion Equipo</h2>

                  <div className="flex items-center gap-5  mt-6">
                    <label className="" htmlFor="name">
                      Equipo
                    </label>
                    <input className="mr-6 h-9 rounded-lg w-96" type="text" onChange={e=> setNombreEquipo(e.target.value)} placeholder="Nombre del equipo" />
                  </div>

                  <div className="flex items-center gap-3  mt-6">
                    <label className="mt-4-label" htmlFor="address">
                      Capitan
                    </label>
                    <input className=" h-9 rounded-lg w-96" id="address" value={user && user.nombres} placeholder="Nombre del capitan" />
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
                        value={user && user.telefono }
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
                        onChange={e=> setContactoDos(e.target.value)}
                      />
                    </div>
                <div class="card">
                  <img className="absolute w-44 h-44 top-20" src={image} alt="Logo Del Equipo" />
                  <input type="file" onChange={handleImage} className="inpuntImg" />
                </div>
                  </div>
                </div>
          <div className="bg-gray-200 mt-10 p-5 rounded-xl">
            <div className='flex justify-center items-center'>
              <label className="font-bold text-2xl mr-5">Busca tus compañeros</label>
              <input type="search" className="h-10 w-80 rounded-md" onChange={e => setJugador(e.target.value)} placeholder='Busca por su numero de cedula' />
              <button className='mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5' onClick={() => searchJugador(jugador)}>Buscar</button>
            </div>
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
                {jugadores && jugadores.map((jugador, indice)=>(
              <tr key={indice}>
            <td className="whill">{indice}</td>
            <td>{jugador.nombreJugador}</td>
            <td>{jugador.ficha}</td>
            <td>{jugador.dorsal}</td>
            </tr>
                ))}
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
