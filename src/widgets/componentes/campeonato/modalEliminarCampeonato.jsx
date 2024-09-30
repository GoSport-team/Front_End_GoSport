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
                        className="px-4 py-2 bg-gray-500 text-white rounded-md mr-3"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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