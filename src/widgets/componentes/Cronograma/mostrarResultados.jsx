import React from "react";

const VersusPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Partido en Vivo</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
        {/* Versus Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold">Equipo A</div>
          <div className="text-2xl font-bold">VS</div>
          <div className="text-2xl font-bold">Equipo B</div>
        </div>

        {/* Score and Cards Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl">
            <div>Marcador: 0</div>
            <div className="mt-2">
              Tarjetas Amarillas: 0 <br />
              Tarjetas Rojas: 0
            </div>
          </div>
          <div className="text-xl">
            <div>Marcador: 0</div>
            <div className="mt-2">
              Tarjetas Amarillas: 0 <br />
              Tarjetas Rojas: 0
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex justify-between">
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
              +1 Gol Equipo A
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2">
              +1 Tarjeta Amarilla Equipo A
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              +1 Tarjeta Roja Equipo A
            </button>
          </div>

          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
              +1 Gol Equipo B
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2">
              +1 Tarjeta Amarilla Equipo B
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              +1 Tarjeta Roja Equipo B
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersusPage;