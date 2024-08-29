import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from "@material-tailwind/react";
import 'react-toastify/dist/ReactToastify.css';

export function Fotos() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: '',
    Descripcion: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/photo')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las fotos');
        }
        return response.json();
      })
      .then(data => {
        setPhotos(data);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        toast.error('Error fetching photos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (photoId) => {
    setPhotoToDelete(photoId);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    fetch(`http://localhost:3001/photo/${photoToDelete}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar la foto');
        }
        setPhotos(photos.filter(photo => photo._id !== photoToDelete));
        toast.success('Foto eliminada');
      })
      .catch(error => {
        console.error('Error deleting photo:', error);
        toast.error('Error deleting photo');
      })
      .finally(() => {
        setLoading(false);
        setShowConfirmDelete(false);
      });
  };

  const handleUploadPhoto = () => {
    if (photos.length >= 10) {
      toast.error('Solo puedes subir hasta 10 imágenes.');
    } else {
      setShowUploadModal(true);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setUploadMessage('');
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

    setLoading(true);

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
        toast.success('Foto subida con éxito');
      })
      .catch(error => {
        console.error('Error uploading photo:', error);
        toast.error('Error uploading photo');
      })
      .finally(() => {
        setLoading(false);
        setShowConfirm(false);
        setShowUploadModal(false);
      });
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-blue-gray-50/50">
      {/* Spinner de carga */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Spinner size="lg" className="text-blue-600" />
        </div>
      )}

      <div className="w-full max-w-8xl mt-10">
        {!loading && (
          <>
            <div className="flex justify-center w-full mb-5">
              <button 
                onClick={handleUploadPhoto} 
                class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
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
                        class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
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
                    <button type="submit" 
                    class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
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
                            class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            Confirmar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

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
                      class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ToastContainer />
    </main>
  );
}

export default Fotos;
