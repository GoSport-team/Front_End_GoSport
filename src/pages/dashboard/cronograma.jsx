
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tooltip,
    Button,
    Spinner,
  } from "@material-tailwind/react";
import CronogramaDesing from '@/widgets/componentes/Cronograma';
import { useEffect, useState } from "react";
import axios from "axios";
import { ConfirmarGuardar  } from "@/widgets/componentes/Cronograma/ConfirmarGuardar";


export default function Cronograma() {
  const [datosVss, setDatosVs]= useState();
  const [fechaHora, setFechaHora]= useState({'fecha':'', 'hora':''})
  const [isLoading, setIsLoading] = useState(true); 
  const [confirmarCambios, setConfirmarCambios] = useState(false);
  const [IdVs , setIdVs]= useState('')
    const IdFasee = localStorage.getItem('IdFase');
    const estadoFase= localStorage.getItem('estadoFase')
    useEffect(()=>{
      const GetDatosVs = async()=>{
        try{
          const Vs= await axios.get('http://localhost:3001/vs',{
            headers:{
              IdFase:IdFasee
            }
          });
          setDatosVs(Vs.data)
          setIsLoading(true)
        }catch(error){
          console.log(error)
        }finally{
          setIsLoading(false)
        }
      }
      GetDatosVs();
    
    },[datosVss])
    const hanlde = (estado,idVs)=>{
      setConfirmarCambios(estado)
      setIdVs(idVs)
    }
  
    
  return (
    <>
    {/* //CRONOGRAMA */}
    {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white">Cargando...</div>
        </div>
      )}
    <div className='w-full h-full'>
     <Card className='w-auto h-auto flex justify-center items-center p-2'>
           <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7">
             { datosVss && datosVss.map((versus)=>(
             <div  key={versus._id} className="flex justify-center items-center z-0">
               <CronogramaDesing
               patchFechaHora={setFechaHora}
               guardarEdicion={hanlde}
               datosVss={versus}
               vs={datosVss}
               ></CronogramaDesing>

             </div>
             ))}
             
            
           </div>
           
           {
               confirmarCambios && (
                 <ConfirmarGuardar
                 confirmarCambios={setConfirmarCambios}
                 idVs={IdVs}
                 cerrarModal={setConfirmarCambios}
                 fecha={fechaHora.fecha}
                 hora={fechaHora.hora}
                 />
               )
             }
      
     </Card>
   </div>  
     {/* Para prueba Nomas */}
   </>
  )
}
