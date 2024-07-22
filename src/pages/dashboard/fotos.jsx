import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from './subirfoto'; // Asegúrate de que la ruta sea correcta

export function Fotos() {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Estado para mostrar confirmación de eliminación
  const [photoToDelete, setPhotoToDelete] = useState(null); // Estado para la foto a eliminar
  const [showUploadModal, setShowUploadModal] = useState(false); // Estado para mostrar el modal de subida
  const navigate = useNavigate();

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
    setPhotoToDelete(photoId);
    setShowConfirmDelete(true); // Muestra la confirmación de eliminación
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:3001/photo/${photoToDelete}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar la foto');
        }
        setPhotos(photos.filter(photo => photo._id !== photoToDelete));
        setShowConfirmDelete(false);
        alert('Foto eliminada');
      })
      .catch(error => {
        console.error('Error deleting photo:', error);
      });
  };

  const handleUploadPhoto = () => {
    setShowUploadModal(true);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Abre el modal y muestra la imagen seleccionada
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Cierra el modal
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  const handlePhotoUpload = (newPhoto) => {
    setPhotos([...photos, newPhoto]);
    setShowUploadModal(false);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-blue-gray-50/50">
      <div className="flex flex-col items-center w-full max-w-8xl mt-10">
        <div className="flex justify-center w-full mb-5">
          <button onClick={handleUploadPhoto} className="bg-gradient-to-tr from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 py-2 rounded">
            Subir foto
          </button>
        </div>
        <div className="flex justify-center items-center bg-gray-700 bg-opacity-50 rounded-lg p-3 w-full max-w-full">
          <div className="grid grid-cols-3 gap-6 w-full">
            {photos.map(photo => (
              <div key={photo._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-96 object-cover cursor-pointer"
                  src={photo.ImageUrl}
                  alt={photo.Nombre}
                  onClick={() => handleImageClick(photo.ImageUrl)}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{photo.Nombre}</h2>
                  <p className="mb-4">{photo.Descripcion}</p>
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="bg-gradient-to-tr from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-full"
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Ampliada"
              width={500}
              height={500}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Confirmación de eliminación</h2>
            <p className="mb-4">¿Estás seguro de que quieres eliminar esta foto?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:bg-gradient-to-tr hover:from-gray-800 hover:to-gray-700 rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-auto">
            <Formulario onUpload={handlePhotoUpload} />
            <button
              onClick={handleCloseUploadModal}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Fotos;
