import React from 'react'

export const Creado = ({ tasks, viewCampeonato, setModalView, setIdUpdate, setModalUpdate, setSelectedCampeonato, setIsModalOpen }) => {
   
  return (
   <>
   <tbody>
            {
              tasks.map(task => (
                <tr key={task._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.nombreDisciplinas}
                  </td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.nombreCampeonato}
                  </td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.tipoCampeonato}
                  </td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row gap-x-4">
                    <img src="\public\img\Campeonato\ver.png" alt="img" class="w-7 object-contain"
                    onClick={() => {viewCampeonato(task._id)
                      setModalView(true)  
                    }}
                     />
                    <img src="\public\img\Campeonato\edit.png" alt="img" class="w-7 object-contain"
                     onClick={() =>{
                       setIdUpdate(task._id)
                       viewCampeonato(task._id)
                      setModalUpdate(true)
                     }}
                     />
                    <img src="\public\img\Campeonato\delete.png" alt="img" class="w-7 object-contain"
                    onClick={() => {
                      setSelectedCampeonato(task._id);
                      setIsModalOpen(true);
                  }} />
                  </td>
                  <button class="flex items-center justify-center text-white gap-1 px-5 py-3 cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800  text-white px-4 py-2 rounded tracking-widest rounded-md duration-300 hover:gap-2 hover:translate-x-3">
            Publicar
          </button>
                </tr>
              ))
            }
          </tbody>
   </>
  )
}
