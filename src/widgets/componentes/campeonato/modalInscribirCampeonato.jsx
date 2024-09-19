
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Swal from "sweetalert2";
const URL_API = import.meta.env.VITE_API_URL
export const ModalInscribirCampeonato = ({setAgregarEquipo, onAgregarEquipo, setControlador}) => {
    const [idEquipo, setIdEquipo]=useState('')
    const [equipo, setEquipo]= useState()
    const [isLoading, setIsLoading] = useState(false); 
    const [validacion, setValidacion]= useState()
    const idCampeonato = localStorage.getItem('ID')
    const searchEquipo = async ()=>{
      if(!validacion){
        try {
          const response = await axios.get(`${URL_API}/inscripcionEquipos/${idEquipo}`)
          if(response.data == "EQUIPO NO ENCONTRADO"){
            Swal.fire({
              icon: "error",
              title: "equipo no registrado",
              text: `Revisa tu numero de cedula ${idEquipo}`
            })
          }else{
            setEquipo(response.data.equipo)
            setControlador(true)
          }
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: "error",
            title: "equipo no registrado",
            text: `Revisa tu numero de cedula ${idEquipo}`
          })
        }
        finally{
          setIsLoading(false)
        }
      }
      }
      useEffect(() => {
        const validarInscripcion = async () => {
          const responseValidador = await axios.get(`${URL_API}/equipoInscripto/validarInscripcionestado`, {
            headers: {
              cedulaJugador: idEquipo
            }
          })
    if(responseValidador.data.msg=== "Equipo ya esta Inscrito en un campeonato"){
      setValidacion(true)
      setEquipo(false)
    }else{
      setValidacion(false)
    }
         console.log(responseValidador)
    
        }
    
        validarInscripcion()
      }, [idEquipo])
      const inscribirEquipo = async ()=>{
        try {  
          setIsLoading(true) 
          const response = await axios.post(`${URL_API}/equipoInscripto`,{
            Equipo:equipo,
            idCampeonato:idCampeonato
          })
          onAgregarEquipo(equipo);
          setControlador(true)
        
         if(equipo){
          setAgregarEquipo(false)
          setIsLoading(true)
          setControlador(true)
         }
        
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: "error",
            title: "Error al guardar el equipo",
          })
        }finally{
          setIsLoading(false)
          setControlador(false)
        }
    
      }
      const actuEstado= async()=>{
        try{
          const response = await axios.patch(`${URL_API}/inscripcionEquipos/estado/${equipo._id}`,{
            estado:true
          })
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }

      console.log(equipo)
      const handleSubmit=()=>{
        inscribirEquipo()
        actuEstado()
      }
  return (
    <>
     {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white">Cargando Inscripción...</div>
        </div>
      )}
     
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {
        validacion&&(
          <h3 className="text-lg font-bold mb-4">El equipo ya pertenece a un campeonato</h3> 
        )
      }
            <h3 className="text-lg font-bold mb-4">Ingrese el número de cédula del capitán</h3>
            <input
            onChange={e=>setIdEquipo(e.target.value)}
              type="text"
              placeholder="Número de cédula"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end mb-4">
              <button
                   onClick={searchEquipo}
                 class="mr-3 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Buscar
              </button>
              <button
              onClick={()=>setAgregarEquipo(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          
          
                {equipo&&(
              <div className="mt-4">
                <h4 className="text-lg font-bold">Equipo Encontrado:</h4>
                <p><strong>Nombre:</strong> {equipo.nombreEquipo}</p>
                <p><strong>Capitan:</strong> {equipo.nombreCapitan} </p>
                <p><strong>Contacto Uno:</strong> {equipo.contactoUno} </p>
                <p><strong>Contacto Dos:</strong> {equipo.contactoDos}</p>
                <p><strong>Jornada:</strong> {equipo.jornada} </p>
              <button
                   onClick={handleSubmit}
                 class="select-none mt-3 rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Agregar
              </button>
              </div>
            )}
         
          </div>
        </div>
    </>
  )
}
