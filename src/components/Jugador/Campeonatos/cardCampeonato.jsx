import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function CardCampeonato({cedula}) {
  const [campeonatos, setCampenatos] = useState(null)
  const [validarInscripcion, setValidarInscripcion] = useState()
  const [data, setData] = useState()
  useEffect(()=>{
    const obtenerCampeonatos =async()=>{
    const response = await axios.get('http://localhost:3001/campeonato')
    if(response == undefined){
      setCampenatos(null)
    }else{
      const campeonatosFiltradosCreado = response.data.filter(campeonato => campeonato.estadoCampeonato !== 'Creado' && campeonato.estadoCampeonato !=='Ejecucion');
      setCampenatos(campeonatosFiltradosCreado)
    }
    }
    obtenerCampeonatos()
  },[])


  useEffect(()=>{
    const validarInscripcion = async ()=>{
      const responseValidador = await axios.get(`http://localhost:3001/equipoInscripto/validarInscripcion`,{
        headers:{
          cedulaJugador:cedula
        }
      })

      setValidarInscripcion(responseValidador.data.msg)
      setData(responseValidador.data.data)
      
    }

    validarInscripcion()
  },[])
  const mensajeInscrito =()=>{
    Swal.fire({
      title: "Estado Inscrito",
      text:`Ya te encuentras Registrado a un campeonato, espera a que inicie y podras ver el avance del campeonato en la App Movil GoSport`,
      confirmButtonText: "OK",
      confirmButtonColor: "#04ff00",
      timer:5000,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

  console.log(data)
  
  return (
    <>
  
        {campeonatos && campeonatos.map((campeonato)=>(
          <article className="w-max pt-5 pl-3 pr-3 pb-5 flex gap-2 bg-[rgba(63,63,63,0.2)] rounded-md" key={campeonato._id}>

      <div className=" column text-left border-2 p-5 rounded-lg flex flex-col justify-between">
        <h1 className="font-medium flex gap-3 text-lg"> <p className="font-bold  text-xl">Nombre:</p> {campeonato.nombreCampeonato}</h1>
        <p className="text-xl flex gap-3 font-medium">
          <p className="font-bold text-xl">
          Descripcion:
          </p>
         {campeonato.descripcion}
         </p>
         <p className="flex gap-3 font-medium text-lg">
          <p className="font-bold text-xl">Estado Campeonato: </p>
          {campeonato.estadoCampeonato}</p>
      </div>

      <div className=" text-left flex flex-col border-2  p-5 text-lg rounded-lg">
        <h1 className="flex gap-3 text-lg font-medium">
          <p className="font-bold text-xl">Categoria:</p>
           {campeonato.nombreDisciplinas}</h1>
        <p className="flex gap-3 text-lg font-medium">
          <p className="text-xl font-bold">Fecha de inicio:</p>
           {campeonato.fechaInicio}</p>
        <p className="flex gap-3 text-lg font-medium">
          <p className="font-xl font-bold">Fecha de finalizacion</p>
           {campeonato.fechaFin}</p>

      {campeonato.estadoCampeonato == 'Ejecucion' ?
        <Link to={`/jugador/dashboard/derrotero/${campeonato._id}`} className="inscribirme ">
          <button className="mt-2.5 px-7 py-4 text-xs uppercase font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer  hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5">
            Ver Derrotero</button>
        </Link>
     : validarInscripcion == 'Equipo ya esta Inscrito en un campeonato'?
     <button 
     onClick={()=>mensajeInscrito()}
     className="mt-2.5 px-7 py-4 text-xs uppercase font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer  hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5">
       Ya estas Inscrito
       </button>
        :  <Link to={`/jugador/dashboard/${campeonato._id}/${cedula}`} className="inscribirme ">
        <button className="mt-2.5 px-7 py-4 text-xs uppercase font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer  hover:bg-[#61d6f7df] hover:shadow-lg hover:shadow-[#a3d7e1c6] hover:text-black hover:-translate-y-1.5 active:translate-y-0.5">
          Inscribirme</button>
      </Link>
      
      }
      </div>
    </article>
        ))}
    </>

  );
}
