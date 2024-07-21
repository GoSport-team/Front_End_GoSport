"use client"
import React, { useEffect, useState } from 'react';

export function Fotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/photo')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las fotos');
        }
        return response.json();
      })
      .then(data => setPhotos(data))
      .catch(error => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  const handleDelete = (photoId) => {
    fetch(`http://localhost:3001/photo/${photoId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar la foto');
        }
        setPhotos(photos.filter(photo => photo._id !== photoId));
      })
      .catch(error => {
        console.error('Error deleting photo:', error);
      });
  };

  return (
    <main className="flex">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-center w-full mb-5">
          {/* Aquí puedes agregar cualquier otro contenido si es necesario */}
        </div>
        <div className="flex justify-center items-center bg-gray-700 bg-opacity-50 rounded-lg ml-28 mt-5 w-4/5 overflow-visible">
          <div className="grid grid-cols-3 gap-5 w-full p-5 box-border">
            {photos.map(photo => (
              <div key={photo._id} className="bg-white rounded-lg shadow-md p-5 text-center flex flex-col items-center">
                <img
                  className="w-100 h-87 object-cover rounded-lg mb-4"
                  src={photo.ImageUrl}
                  alt={photo.Nombre}
                  style={{ width: '400px', height: '350px' }}
                />
                <h2 className="text-xl font-bold mb-2">{photo.Nombre}</h2>
                <p className="mb-4">{photo.Descripcion}</p>
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Fotos;
