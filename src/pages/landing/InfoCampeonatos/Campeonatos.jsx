import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { VerQr } from './VerQr';

export const Campeonatos = () => {
    const URL_API = import.meta.env.VITE_API_URL
    const TABLE_HEAD = ["Nombre", "Disciplina", "Tipo Campeonato", "QR"];
    const [campeonatos, setCampeonatos] = useState()
    const [modalQR, setModalQR] = useState(false)
    const [idCampeonato, setIdCampeonato] = useState()
    useEffect(() => {
        const obtenerCampeonatos = async () => {
          try {
            const response = await axios.get(`${URL_API}/campeonato`);
            
              setCampeonatos(response.data);              
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
        obtenerCampeonatos();
    
      },[]);
      const closeQR =()=>{
        setModalQR(false)
      }
  return (
    <Card className="h-full w-full overflow-scroll">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          { TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {campeonatos &&campeonatos.map((campeonato, index) => (
            <tr key={campeonato._id}>
              <td className='p-4 border-b border-blue-gray-50'>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {campeonato.nombreCampeonato}
                </Typography>
              </td>
              <td className='p-4 border-b border-blue-gray-50'>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {campeonato.nombreDisciplinas}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {campeonato.tipoCampeonato}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                  onClick={()=>{
                    setModalQR(true)
                    setIdCampeonato(campeonato._id)
                }}
                >
                  Ver QR
                </Typography>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
    <VerQr id={idCampeonato} open={modalQR} close={closeQR} />
  </Card>
  )
}
