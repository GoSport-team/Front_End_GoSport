import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const ViewCampeonatoModal = ({ isOpen, onClose, campeonato }) => {
    if (!campeonato) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-lg p-6 max-w-md max-h-[80vh] w-full shadow-lg overflow-y-auto">
                <h2 className="text-2xl font-semibold  mb-6 text-center">Detalles del Campeonato</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Nombre Disciplina:</strong>
                        <p className="text-gray-900">{campeonato.nombreDisciplinas}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Nombre Campeonato:</strong>
                        <p className="text-gray-900">{campeonato.nombreCampeonato}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Tipo Campeonato:</strong>
                        <p className="text-gray-900">{campeonato.tipoCampeonato}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Estado Campeonato:</strong>
                        <p className="text-gray-900">{campeonato.estadoCampeonato}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Tamaño Campeonato:</strong>
                        <p className="text-gray-900">{campeonato.tamanoEquipos}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Fecha Inicio:</strong>
                        <p className="text-gray-900">{campeonato.fechaInicio}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Fecha Finalización:</strong>
                        <p className="text-gray-900">{campeonato.fechaFin}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Sede:</strong>
                        <p className="text-gray-900">{campeonato.sede}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Descripción:</strong>
                        <p className="text-gray-900">{campeonato.descripcion}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Fecha Inicio Inscripción:</strong>
                        <p className="text-gray-900">{campeonato.inicioInscripcion}</p>
                    </div>
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700">Fecha Fin Inscripción:</strong>
                        <p className="text-gray-900">{campeonato.finInscripcion}</p>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white px-4 py-2 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewCampeonatoModal;