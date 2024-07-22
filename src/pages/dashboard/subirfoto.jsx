"use client";
import React, { useState } from 'react';

const Formulario = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        Nombre: '',
        Descripcion: ''
    });
    const [showConfirm, setShowConfirm] = useState(false);

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
                if (onUpload) {
                    onUpload(data.photo);
                }
                setFormData({
                    Nombre: '',
                    Descripcion: ''
                });
                setSelectedFile(null);
                setShowConfirm(false);
            })
            .catch(error => {
                console.error('Error uploading photo:', error);
            });
    };

    return (
        <>
            <body className=' pt-60 min-h-screen bg-blue-gray-50/50 pt-'>

                
            
            <div className=" left-0 right-0 p-6  bg-gray-700 bg-opacity-50 shadow-md rounded-t-lg mx-auto max-w-md">
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
                        <button type="submit" className="w-full px-4 py-2 bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:bg-gradient-to-tr hover:from-gray-800 hover:to-gray-700 rounded-lg hover:bg-blue-700 transition duration-300">
                        Subir Foto
                    </button>
                </form>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-gray-200 p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-auto">
                        <h2 className="text-xl font-semibold mb-4">Confirmación</h2>
                        <p className="mb-4">¿Estás seguro de que quieres subir esta imagen?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300 mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmUpload}
                                    className="px-4 py-2 bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:bg-gradient-to-tr hover:from-gray-800 hover:to-gray-700  rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </body>
        </>
    );
};

export default Formulario;
