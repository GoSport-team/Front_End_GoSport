import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
export default function CardCampeonato() {
  const [campeonatos, setCampenatos] = useState()
  const token = Cookies.get('token')
  useEffect(()=>{
    const obtenerCampeonatos =async()=>{
    const response = await axios.get('http://localhost:3001/campeonato')
    console.log(response)
    setCampenatos(response.data)
    }
    obtenerCampeonatos()
  },[])

  console.log(campeonatos)
  return (
    <>
  
        {campeonatos && campeonatos.map((campeonato)=>(
    <article className="cardCampeonato w-max p-10 flex bg-[rgba(63,63,63,0.2)] rounded-md" key={campeonato._id}>

      <div className="column text-left w-44 border pt-5 h-28 rounded-sm">
        <h1 className="font-bold">{campeonato.nombreCampeonato}</h1>
        <p className="text-xl">
         {campeonato.descripcion}
         </p>
      </div>

      <div className="text-left w-72 border pt-5 text-lg h-28 rounded-sm">
        <h1 className="">Categoria {campeonato.nombreDiciplinas}</h1>
        <p className="">Fecha de inicio {campeonato.fechaIniciio}</p>
        <p className="espacio">Fecha de finalizacion {campeonato.fechaFin}</p>

        <Link to={`/jugador/dashboard/${campeonato._id}`} className="inscribirme ">
          Inscribirme
        </Link>
      </div>
    </article>
        ))}
    </>

  );
}
