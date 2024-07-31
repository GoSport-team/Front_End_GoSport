
import React from 'react'



export default function CronogramaDesing() {

  return (
    <div className='w-[35vw] mt-8 flex flex-row rounded-md border-2 border-gray-300 shadow-lg'>
      <div className='w-1/2 p-6 flex flex-col gap-y-6'>
        <div className='flex flex-row items-center justify-center'>
          <img className='object-contain w-20' src="\public\img\Cronograma\Colombia.jpg" alt="Colombia" />
          <h4 className='ml-4 text-xl font-semibold text-gray-700'>Colombia</h4>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <img className='object-contain w-20' src="\public\img\Cronograma\portugal.png" alt="Portugal" />
          <h4 className='ml-4 text-xl font-semibold text-gray-700'>Portugal</h4>
        </div>
      </div>
      <div className='w-1/2 p-6 flex flex-col'>
        <div className='mb-6'>
          <h3 className='text-2xl font-bold text-gray-800'>Detalles</h3>
        </div>
        <div className='flex flex-col gap-y-6'>
          <div className='flex items-center gap-x-10'>
            <label className='text-lg font-medium text-gray-600'>Hora</label>
            <input type="time" className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </div>
          <div className='flex items-center gap-x-10'>
            <label className='text-lg font-medium text-gray-600'>Fecha</label>
            <input type="date" className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </div>
        </div>
        <div className='mt-6 flex justify-between'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Ver Calendario</button>
          <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'>Editar</button>
        </div>
      </div>
    </div>
  )
}
