import React from 'react'

export default function EquiposVer() {
    return (
        <div className="w-[50vw] p-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Equipos Inscritos
                        <p className="mt-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                            A continuación se muestra la lista de equipos inscritos. Puedes ver los detalles de cada equipo, incluyendo su imagen y nombre, para estar al tanto de los participantes.
                        </p>
                    </caption>

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre Equipo</th>
                            <th scope="col" className="px-6 py-3">Logo</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Colombia
                            </th>
                            <td className="px-6 py-4">
                                <img className="object-cover w-10" src="https://th.bing.com/th/id/R.1d3a429d698fba6f411fa23c3f18a821?rik=GtP2rPW4iG%2bOkQ&pid=ImgRaw&r=0" alt="img" />
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Brazil
                            </th>
                            <td className="px-6 py-4">
                                <img className="object-cover w-10" src="https://th.bing.com/th/id/R.c2dfc3547350b7fd145986c98524b0ac?rik=Av0GNgCNWugV0g&pid=ImgRaw&r=0" alt="img" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
