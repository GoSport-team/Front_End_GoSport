
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
  const [datosVss, setDatosVs]= useState([]);
  const [fechaHora, setFechaHora]= useState({'fecha':'', 'hora':''})
  const [isLoading, setIsLoading] = useState(true); 
  const [confirmarCambios, setConfirmarCambios] = useState(false);
  const [IdVs , setIdVs]= useState('')
    const IdFasee = localStorage.getItem('IdFase');
    const estadoFase= localStorage.getItem('estadoFase')
    const IdCampeonato = localStorage.getItem('ID');
    const nombreFases= localStorage.getItem('nombreFase')
    const [fasesInactivas, setFasesInactivas]= useState()
    const [faseActiva, setFasesActiva]= useState()
    const [oks, setOks]= useState(true)
    const [controlador, setControlador]= useState()
    const [controlerDatosvss, setControlerDatosvss]= useState(true)
    const[guardar, setGuardar]= useState()
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
    useEffect(() => {
      const fetchData = async () => {
        try {
         
          const { data } = await axios.get('http://localhost:3001/fase/fase',{
            headers: {
              id:IdCampeonato
            },
          });
          setFasesInactivas(data.faseInactiva)
         setFasesActiva(data.faseActiva)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [datosVss]);
    
   // console.log(faseActiva)
    //console.log(datosVss)
    const hanlde = (estado,idVs)=>{
      setConfirmarCambios(estado)
      setIdVs(idVs)
    }
   
    const handleClick=(id)=>{
      localStorage.setItem('IdFase', id);
      setOks(false)
    }
    const handleClickEje=(id)=>{
      localStorage.setItem('IdFase', id);
      setOks(true)
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
    <div className='flex flex-row space-x-4 '>
  {
    fasesInactivas && fasesInactivas.map((fase)=>(
    
<button onClick={()=>handleClick(fase._id)} className='select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
{`fase ${fase.nombre}`}
</button>
     
    ))
  }
  {
    faseActiva&&(
      <button  onClick={()=>handleClickEje(faseActiva[0]._id)}className='select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
{`fase en ejecucion`}
</button>
    )
  }
      </div>

     <Card className='w-auto h-auto flex justify-center items-center p-2'>
           <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7">
             { datosVss && datosVss.map((versus)=>(
             <div  key={versus._id} className="flex justify-center items-center z-0">
               <CronogramaDesing
               patchFechaHora={setFechaHora}
               guardarEdicion={hanlde}
               datosVss={versus}
               vs={datosVss}
               oks={oks}
               setControlador={setControlador}
               controlador={controlador}
               guardar={guardar}
               ></CronogramaDesing>

             </div>
             ))}
             
            
           </div>
           
           {
               confirmarCambios && (
                 <ConfirmarGuardar
                 setGuardar={setGuardar}
                 confirmarCambios={setConfirmarCambios}
                 idVs={IdVs}
                 cerrarModal={setConfirmarCambios}
                 fecha={fechaHora.fecha}
                 hora={fechaHora.hora}
                 setControlador={setControlador}

                 />
               )
             }
      
     </Card>
   </div>  
     {/* Para prueba Nomas */}
   </>
  )
}
