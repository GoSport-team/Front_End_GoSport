import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Fotos() {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Estado para mostrar confirmación de eliminación
  const [photoToDelete, setPhotoToDelete] = useState(null); // Estado para la foto a eliminar
  const [showUploadModal, setShowUploadModal] = useState(false); // Estado para mostrar el modal de subida
  const [formData, setFormData] = useState({
    Nombre: '',
    Descripcion: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(''); // Estado para mensaje de subida
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
    if (photos.length >= 6) {
      setUploadMessage('Solo puedes subir hasta 6 imágenes.');
      setTimeout(() => setUploadMessage(''), 5000); // Oculta el mensaje después de 5 segundos
    } else {
      setShowUploadModal(true);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Abre el modal y muestra la imagen seleccionada
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Cierra el modal de imagen seleccionada
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setUploadMessage(''); // Limpia el mensaje de subida al cerrar el modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmUpload = () => {
    const data = new FormData();
    data.append('Nombre', formData.Nombre);
    data.append('Descripcion', formData.Descripcion);
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    fetch('http://localhost:3001/photo', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(data => {
        setPhotos([...photos, data.photo]);
        setFormData({
          Nombre: '',
          Descripcion: ''
        });
        setSelectedFile(null);
        setShowConfirm(false);
        setShowUploadModal(false); // Cierra el modal al completar la subida
      })
      .catch(error => {
        console.error('Error uploading photo:', error);
      });
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-blue-gray-50/50">
      <div className="flex flex-col items-center w-full max-w-8xl mt-10">
        <div className="flex justify-center w-full mb-5">
          <button onClick={handleUploadPhoto} className="bg-gradient-to-tr from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 py-2 rounded">
            Subir foto
          </button>
        </div>
        {uploadMessage && (
          <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
            {uploadMessage}
          </div>
        )}
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
              width={400}
              height={300}
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
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseUploadModal}></div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-auto relative">
            <button
              onClick={handleCloseUploadModal}
              className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-full"
            >
              X
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input
                type="text"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                required
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleInputChange}
                placeholder="Descripción"
                required
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
              />
              {selectedFile && (
                <div className="text-center mb-4">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Vista previa"
                    className="max-h-48 border border-gray-300 rounded-lg"
                  />
                </div>
              )}
              <button type="submit" className="w-full px-4 py-2 bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:bg-gradient-to-tr hover:from-gray-800 hover:to-gray-700 rounded-lg transition duration-300">
                Subir Foto
              </button>
            </form>

            {showConfirm && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-auto">
                  <h2 className="text-xl font-semibold mb-4">Confirmación de subida</h2>
                  <p className="mb-4">¿Estás seguro de que quieres subir esta foto?</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300 mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleConfirmUpload}
                      className="px-4 py-2 bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:bg-gradient-to-tr hover:from-gray-800 hover:to-gray-700 rounded-lg"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Fotos;
