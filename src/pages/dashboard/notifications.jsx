import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
//CRONOGRAMA
import { useEffect, useState } from "react";
import axios from "axios";
import CronogramaDesing from "@/widgets/componentes/Cronograma/index";
 
import { ConfirmarGuardar } from "@/widgets/componentes/Cronograma/ConfirmarGuardar";
export function Notifications() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];
  //Cronograma Borrar
  const [datosVss, setDatosVs]= useState();
  const [fechaHora, setFechaHora]= useState({'fecha':'', 'hora':''})

  const [confirmarCambios, setConfirmarCambios] = useState(false);
  const [IdVs , setIdVs]= useState('')
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
          console.log(Vs.data)
          console.log(Vs.data)
          console.log(IdFasee)
        }catch(error){
          console.log(error)
        }
      }
      GetDatosVs();
    },[])

    const hanlde = (estado,idVs)=>{
      setConfirmarCambios(estado)
      setIdVs(idVs)
    }
    
  return (
    <>
     {/* //CRONOGRAMA */}
     <div className='w-full h-full'>
      <Card className='w-auto h-auto flex justify-center items-center p-2'>
            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7">
              { datosVss && datosVss.map((versus)=>(
              <div  key={versus._id} className="flex justify-center items-center z-0">
                <CronogramaDesing
                primerEquipo={versus.equipo1.informacion.team1.Equipo.nombreEquipo}
                imagenEquipo1={versus.equipo1.informacion.team1.Equipo.imgLogo}
                segundoEquipo={versus.equipo2.informacion.team2.Equipo.nombreEquipo}
                imagenEquipo2={versus.equipo2.informacion.team2.Equipo.imgLogo}
                idVs={versus._id}
                patchFechaHora={setFechaHora}

                guardarEdicion={hanlde}
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
    // <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
    //   <Card>
    //     <CardHeader
    //       color="transparent"
    //       floated={false}
    //       shadow={false}
    //       className="m-0 p-4"
    //     >
    //       <Typography variant="h5" color="blue-gray">
    //         Alerts
    //       </Typography>
    //     </CardHeader>
    //     <CardBody className="flex flex-col gap-4 p-4">
    //       {alerts.map((color) => (
    //         <Alert
    //           key={color}
    //           open={showAlerts[color]}
    //           color={color}
    //           onClose={() => setShowAlerts((current) => ({ ...current, [color]: false }))}
    //         >
    //           A simple {color} alert with an <a href="#">example link</a>. Give
    //           it a click if you like.
    //         </Alert>
    //       ))}
    //     </CardBody>
    //   </Card>
    //   <Card>
    //     <CardHeader
    //       color="transparent"
    //       floated={false}
    //       shadow={false}
    //       className="m-0 p-4"
    //     >
    //       <Typography variant="h5" color="blue-gray">
    //         Alerts with Icon
    //       </Typography>
    //     </CardHeader>
    //     <CardBody className="flex flex-col gap-4 p-4">
    //       {alerts.map((color) => (
    //         <Alert
    //           key={color}
    //           open={showAlertsWithIcon[color]}
    //           color={color}
    //           icon={
    //             <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
    //           }
    //           onClose={() => setShowAlertsWithIcon((current) => ({
    //             ...current,
    //             [color]: false,
    //           }))}
    //         >
    //           A simple {color} alert with an <a href="#">example link</a>. Give
    //           it a click if you like.
    //         </Alert>
    //       ))}
    //     </CardBody>
    //   </Card>
    // </div>
  );
}

export default Notifications;
