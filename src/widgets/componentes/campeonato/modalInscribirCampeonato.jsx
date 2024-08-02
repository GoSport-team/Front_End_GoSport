import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios'
import React, { useState } from 'react'
import Swal from "sweetalert2";
export const ModalInscribirCampeonato = ({setAgregarEquipo, onAgregarEquipo}) => {
    const [idEquipo, setIdEquipo]=useState('')
    const [equipo, setEquipo]= useState()
    const [isLoading, setIsLoading] = useState(false); 
    const idCampeonato = localStorage.getItem('ID')
    const searchEquipo = async ()=>{
        try {
          const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${idEquipo}`)
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
        finally{
          setIsLoading(false)
        }
       
      }
      const inscribirEquipo = async ()=>{
        try {  
          setIsLoading(true) 
          const response = await axios.post(`http://localhost:3001/equipoInscripto`,{
            Equipo:equipo,
            idCampeonato:idCampeonato
          })
          onAgregarEquipo(equipo);
         Swal.fire(response.data.msg,"","success")
        
         if(equipo){
          setAgregarEquipo(false)
          setIsLoading(true)
         }
        
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: "error",
            title: "Error al guardar el equipo",
          })
        }finally{
          setIsLoading(false)
        }
    
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
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Buscar
              </button>
              <button
              onClick={()=>setAgregarEquipo(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
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
                   onClick={inscribirEquipo}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
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
