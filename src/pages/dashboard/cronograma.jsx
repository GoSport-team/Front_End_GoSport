
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
export default function Cronograma() {
  const [datosVss, setDatosVs]= useState()
//console.log(datosVss)
  const IdFasee = localStorage.getItem('IdFase');

  useEffect(()=>{
    const GetDatosVs = async()=>{
      try{
        const Vs= await axios.get('http://localhost:3001/vs',{
          headers:{
            IdFase:IdFasee
          }
        });
        setDatosVs(Vs.data)
        console.log(Vs.data.equipo1)
        console.log(Vs.data)
        console.log(IdFasee)
      }catch(error){
        console.log(error)
      }
    }
    GetDatosVs();
  },[])
  return (
    <div className='w-full h-full'>
      <Card className='w-auto h-auto flex justify-center items-center p-2'>
            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7">
              { datosVss && datosVss.map((versus)=>(
              <div  key={versus._id} className="flex justify-center items-center z-0">
                <CronogramaDesing
                primerEquipo={'hola'}
                >

                </CronogramaDesing>
              </div>
              ))}
            </div>
            
       
       
      </Card>
    </div>
  )
}
