import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { eliminarJugador, searchJugador } from "../useFunciones";
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
  const [id, setId] = useState(1)
  const [equipo, setEquipo] = useState(null)
  const token = Cookies.get('token')
  const navigate = useNavigate();

  const handleImage = async (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file))
    setFile(file)
  }
  useEffect(() => {
    const obtenerUser = async () => {
      const response = await axios.get('http://localhost:3001/usuarios/perfil', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
    }
    obtenerUser()
  }, [])

  useEffect(() => {
      const obtnenerEquipo = async () => {
        if(user){
          console.log(user.identificacion)
          const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${user.identificacion}`)
          console.log(response.data)
          if (response.data == "EQUIPO NO ENCONTRADO") {
             return setEquipo(null)
          }
          setEquipo(response.data)
      }
    }
      obtnenerEquipo()
  }, [user])

  const submit = async (e) => {
    e.preventDefault()
    
    if (jugadores.length < 4) {
      Swal.fire({
        icon: "error",
        title: "numero de jugadores incompletos",
        confirmButtonText: "OK",
        confirmButtonColor: "#E42245",
      })
    } else {
      const formData = new FormData();
      formData.append("file", file)
      const respuestaa = await axios.post(`http://localhost:3001/inscripcionEquipos/${user._id}/logoEquipo`,formData)
     
      setEstadoImg(respuestaa.data.url)
      const response = await axios.post('http://localhost:3001/inscripcionEquipos', {
        nombreEquipo: nombreEquipo,
        nombreCapitan: user.nombres,
        contactoUno: user.telefono,
        contactoDos: contactoDos,
        jornada: "Tarde",
        cedula: user.identificacion,
        imgLogo: respuestaa.data.url,
        idLogo: respuestaa.data.public_id,
        estado: true,
        participantes: jugadores
      })
      
      setMensaje(response.data.msg)
      Swal.fire({
        icon: "success",
        title: response.data.msg,
        confirmButtonText: "OK",
        confirmButtonColor: "#0837C0",
      })

      setTimeout(() => {
        navigate('/jugador/dashboard')
    }, 700);

    }
  }

  const buscarJugador =async (identificacion)=>{
    const response =await searchJugador(identificacion, jugadores)
    if(response){
      setJugadores(prev => [...prev,
        {
          _id:response._id,
          nombreJugador: response.nombreJugador,
          ficha: response.ficha,
          dorsal: response.dorsal
        }
        ])
    }
  }
 const eliminarJug =async(indice)=>{
  const response =await eliminarJugador(indice, jugadores, user)
  setJugadores(response)
 } 

  return (
    <div className="flex justify-center ">
      {equipo ?
      <div className=""> 
      <h1 className="mt-20 text-3xl font-bold bg-red-400 p-5 text-white rounded-lg">Ya tienes creado un equipo no puedes crear mas</h1>
     <Link to={'/jugador/dashboard'}>
      <button className="bg-black text-white mt-5 h-14  w-full rounded-lg text-2xl">Atras</button>
     </Link>
      </div>
      :
      
      <form action="" onSubmit={submit}>
        <div className="bg-gray-200 mt-20 rounded-lg p-5">
          <h2 className="text-xl font-bold ml-5">Planilla Inscripcion Equipo</h2>
          <div className="flex items-center gap-5  mt-6">
            <label className="" htmlFor="name">
              Equipo
            </label>
            <input className="mr-6 h-9 rounded-lg w-96" type="text" onChange={e => setNombreEquipo(e.target.value)} placeholder="Nombre del equipo" />
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
                className="mr-6 h-9 rounded-lg w-72 text-center"
                id="city"
                type="text"
                value={user && user.telefono}
              />
            </div>
            <div className="">
              <label className="text-black" htmlFor="state">
              </label>
              <input
                placeholder="Secundario"
                className="mr-6 h-9 rounded-lg w-72 text-center"
                id="state"
                type="text"
                onChange={e => setContactoDos(e.target.value)}
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
            <input type="search" className="h-10 w-80 rounded-md text-center" onChange={e => setJugador(e.target.value)} placeholder='Busca por su numero de cedula' />
            <button className='mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5'
             type="button"
             onClick={() => buscarJugador(jugador)} >Buscar</button>
          </div>
          <table className="w-full border-separate mt-8">
            <thead>
              <tr>
                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">N°</th>
                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Nombre </th>
                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Ficha </th>
                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border th3">N° Dorsal </th>
                <th className="bg-[rgb(18,174,209)] text-white rounded-md h-10 border-black border">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {jugadores && jugadores.map((jugador, indice) => (
                <tr className="border-separate text-center text-lg font-medium" key={indice}>
                  <td className="border rounded-md p-1 bg-white " 
                 >{indice + 1}</td>
                  <td className=" border rounded-md p-1 bg-white">{jugador.nombreJugador}</td>
                  <td className=" border rounded-md p-1 bg-white">{jugador.ficha}</td>
                  <td className=" border rounded-md p-1 bg-white">{jugador.dorsal}</td>
                  <td  onClick={()=>eliminarJug(indice)} className=" hover:cursor-pointer border rounded-md p-1 bg-white flex items-center justify-center"><img className="" src="/public/img/carrusel/eliminar.svg" alt="" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="ButtonPlanillaIns">
          <button className="mt-2.5 px-12 py-5 text-xs uppercase tracking-wider font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none ml-[70px] hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5" type="submit"> Inscribir </button>
        </div>
      </form>
}
    </div>

  )
}
