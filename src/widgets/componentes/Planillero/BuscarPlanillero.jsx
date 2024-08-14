import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
export const BuscarPlanillero = ({closeModal,modalIsOpen, idVs,setBotonVerPlanillero, setUsuarioCreado}) => {
    const [planillero, setPlanillero] =useState()
    const[idplanillero, setIdplanillero]= useState()
    const [identificacion, setIdentificacion] = useState()
    const buscarPlanillero =async(idenfiticacion)=>{
      const response = await axios.get(`http://localhost:3001/usuarios/identificacion/${idenfiticacion}`)
      console.log(response.data)
      setPlanillero(response.data)
      setIdplanillero(response.data._id)
    }
  
   
        const resultados=async()=>{
            const response= await axios.get(`http://localhost:3001/vs/planillero/${idVs}`,{
                headers: {
                  idPlanillero:idplanillero
                }
              })
              console.log(response.data)
            // if(response.data){
            //   setUsuarioCreado(true)
            //   setBotonVerPlanillero(false)
            // }else if(!response.data){
            //   setUsuarioCreado(false)
            //   setBotonVerPlanillero(true)
            // }
        }
        
        const agregar=()=>{
          buscarPlanillero(identificacion)
      resultados()

        }
    
    const agregarPlanillero=async(idVs)=>{
            const response= await axios.patch(`http://localhost:3001/vs/${idVs}`,{
                idPlanillero:idplanillero
            })
            console.log('versus actualizado '+response)
    }

  return (
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    className="flex justify-center items-center h-screen w-auto ml-36 "
    overlayClassName="fixed inset-0 bg-black bg-opacity-50">
    <form className="max-w-md mx-auto bg-white w-full p-10 rounded-lg">   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input
        onChange={e=>setIdentificacion(e.target.value)}
         type="search" 
         id="default-search" 
         className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
         placeholder="Busca al planillero por su numero de cedula" required />
        <button 
        onClick={()=>agregar()}
        type="button" 
        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    {planillero && (

<div  key={planillero._id}className="mt-4">
<h4 className="text-lg font-bold">Equipo Encontrado:</h4>
<p><strong>Nombre:</strong> {planillero.nombres}</p>
<button
onClick={()=>agregarPlanillero(idVs)}
className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
>
Agregar
</button>
</div>
)}
</form>
</Modal>   
  )
}

