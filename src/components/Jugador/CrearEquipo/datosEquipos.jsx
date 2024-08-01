import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()

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
        title: "Jugador ya existe en un equipo",
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
        jornada: user.jornada,
        cedula: user.identificacion,
        imgLogo: respuestaa.data.url,
        estado: true,
        participantes: jugadores
      })
      
      setMensaje(response.data.msg)
      Swal.fire({
        icon: "success",
        title: response.data.msg
      })

    }
  }

  const searchJugador = async (idenfiticacion) => {
    try {
      const response = await axios.get(`http://localhost:3001/usuarios/identificacion/${idenfiticacion}`)

      const responseValidador = await axios.get(`http://localhost:3001/equipoInscripto/validarJugador/${response.data._id}`)

      if(responseValidador.data.msg == "Jugador ya existe en un equipo"){
        Swal.fire({
          icon: "error",
          title: "Jugador ya existe en un equipo",
        })
      }

      console.log(response.data)
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
        const dorsalNum = parseInt(formValues[1])
        if(jugadores.length >= 1){
         const dorsalExiste = jugadores.filter((item) => item.dorsal == dorsalNum)
         if(dorsalExiste.length > 0){
          return Swal.fire({
            icon: "error",
            title: "El numero de dorsal ya esta ocupado",
          })
         }

         const existeJugador = jugadores.filter((item)=> item._id == response.data._id)
         if(existeJugador.length > 0){
         return Swal.fire({
           icon: "error",
           title: `El jugador ${response.data.nombres} ya hace parte de un equipo`,
         })
        }
        }
        Swal.fire({
          title: "Datos del jugador",
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
            setId(id + 1)
            setJugadores(prev => [...prev,
            {
              _id:response.data._id,
              nombreJugador: response.data.nombres,
              ficha: formValues[0],
              dorsal: dorsalNum
            }
            ])
          }
        });
      }
    } catch (error) {
      console.log(error)
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Jugador no registrado",
          text: `identificacion no encontrada ${idenfiticacion}`
        })
      }
    }
  }

  const eliminarJugador=(indice)=> {
    
    if (jugadores && jugadores.length > indice) {
      Swal.fire({
        title: "Deseas eliminar este jugador",
        showCancelButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "#04ff00",
        cancelButtonColor: "#d33",
        text: `Nombre ${jugadores[indice].nombreJugador} \n `,
      }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Jugador borrado correctamente", "", "success");
            console.log(indice)
          jugadores.splice(indice, 1);
          setJugadores(jugadores)
          }
      });
    }
  }
  return (
    <div className="flex justify-center ">
      {equipo ?
      <div className=""> 
      <h1 className="mt-20 text-3xl font-bold bg-red-400 p-5 text-white rounded-lg">Ya Tienes Creado Un Equipo No Puedes Crear Mas</h1>
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
             onClick={() => searchJugador(jugador)} >Buscar</button>
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
              {jugadores && jugadores.map((jugador, indice) => (
                <tr className="border-separate text-center text-lg font-medium" key={indice}>
                  <td className="border rounded-md p-1 bg-white hover:cursor-pointer" 
                  onClick={()=>eliminarJugador(indice)}>{indice + 1}</td>
                  <td className=" border rounded-md p-1 bg-white">{jugador.nombreJugador}</td>
                  <td className=" border rounded-md p-1 bg-white">{jugador.ficha}</td>
                  <td className=" border rounded-md p-1 bg-white">{jugador.dorsal}</td>
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
