import React from 'react';

export default function MatchDetails() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="bg-gray-800 text-white p-6 rounded-3xl shadow-xl w-96">
        <div className="flex justify-center items-center mb-4">
          <div className="text-center">
            <h2 className="text-xl font-bold">Chelsea vs Liverpool</h2>
            <p className="text-lg">3:1</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-4">
            <p>47%</p>
            <div className="w-1/2 bg-gray-600 h-2 rounded-full relative">
              <div className="absolute bg-green-400 h-2 w-1/2 left-0 rounded-full"></div>
            </div>
            <p>53%</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Goles</p>
              <p className="font-bold">3</p>
            </div>
            <div>
              <p>Goles</p>
              <p className="font-bold">1</p>
            </div>

            <div>
              <p>Targetas</p>
              <p className="font-bold">0</p>
            </div>
            <div>
              <p>Targetas</p>
              <p className="font-bold">2</p>
            </div>

            <div>
              <p>Destacados</p>
              <p className="font-bold"></p>
            </div>
            <div>
              <p>Destacados</p>
              <p className="font-bold">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
