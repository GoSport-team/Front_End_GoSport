import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from '@material-tailwind/react'; 
const URL_API = import.meta.env.VITE_API_URL

export const PosicionesIntercentros = ({isOpen, close, id}) => {
    const [equipos, setEquipos] = useState();
    const[loading, setLoading] = useState(true)
    useEffect(()=>{
        const obtenerPosiciones=async()=>{
          setLoading(true); 
          try {
            const responsePosiciones = await axios.get(`${URL_API}/posicionesIntercentros`, {
              headers: {
                idCampeonato: id
              }
            });
            responsePosiciones.data.sort((a, b) => b.pts - a.pts);
            setEquipos(responsePosiciones.data);
          } catch (error) {
            console.error('Error al obtener las posiciones:', error);
          } finally {
            setLoading(false); 
          }
        };
        if (isOpen) {
          obtenerPosiciones();
        }
    },[isOpen, id]);
   
  return (
    <>
    {isOpen && ( 
      <>
      {
        loading ? (   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[750px] rounded-lg overflow-hidden shadow-lg relative p-4">
          <div className="flex justify-center items-center h-72">
            <Spinner className="h-12 w-12 text-blue-500" />
            </div>
          </div>
        </div>
          ):(
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
   <div className="bg-white w-[750px] rounded-lg overflow-hidden shadow-lg relative">
     <div className="flex justify-between items-center bg-[#12aed1cd] text-white py-2 px-4">
       <span className="text-center w-full">POSICIONES</span>
       <button onClick={()=>close()} className="absolute right-4 text-white hover:text-gray-300">
         X
       </button>
     </div>
     <div className="p-4">
       <table className="w-full border-collapse">
         <thead>
           <tr className="bg-gray-200">
             <th className="border px-2 py-1">Equipo</th>
             <th className="border px-2 py-1">Pts</th>
             <th className="border px-2 py-1">Goles</th>
             <th className="border px-2 py-1">Amarillas</th>
             <th className="border px-2 py-1">Rojas</th>
           </tr>
         </thead>
         <tbody>
           {equipos && equipos.map((vs) => (
             <>
               <tr className="text-center">
                 <td className="border px-2 py-1">{vs.equipo.nombreEquipo}</td>
                 <td className="border px-2 py-1">{vs.pts}</td>
                 <td className="border px-2 py-1">{vs.goles}</td>
                 <td className="border px-2 py-1">{vs.amarillas}</td>
                 <td className="border px-2 py-1">{vs.rojas}</td>
               </tr>
             </>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 </div>

          )
      }
      </>
       )}
    </>
  )
}
