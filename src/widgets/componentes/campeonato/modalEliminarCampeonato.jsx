import React from 'react';

const DeleteCampeonatoModal = ({ isOpen, onClose, onDelete, campeonatoName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg font-semibold mb-4">Eliminar Campeonato</h2>
                <p>¿Estás seguro de que deseas eliminar el campeonato <strong>{campeonatoName}</strong>? Esta acción no se puede deshacer.</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded"
                        onClick={onDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCampeonatoModal;