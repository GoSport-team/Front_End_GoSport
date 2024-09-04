import React ,{useEffect}from 'react'
export const MejorPerdedor = ({equipo1, equipo2, setBotonAgregar}) => {
    
    // console.log(equipo2)
    useEffect(() => {
        if (equipo2.imgLogo === "No tiene asignado equipo ") {
          setBotonAgregar(false);
        }
      });
  return (
    <div className='flex flex-col gap-4'>
    <div className='flex items-center'>
      <img className='w-1/4 md:w-2/4 object-contain h-16 md:h-24 rounded-3xl' src={equipo1.imgLogo} />
      <div className='ml-4 flex justify-center items-center'>
        <h4 className='text-lg md:text-xl font-semibold text-gray-700'>{equipo1.nombreEquipo}</h4>
      </div>
    </div>
    <div className='flex items-center'>
        {
            equipo2.imgLogo === "No tiene asignado equipo "&&(
<h1 >No tiene equipo asignado</h1>
            )
        }
   
     
    </div>
  </div>
  )
}
