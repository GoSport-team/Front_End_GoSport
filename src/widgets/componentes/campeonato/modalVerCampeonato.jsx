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
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Detalles del Campeonato</h2>
                <div className="mb-4">
                    <strong className="block font-medium">Nombre Disciplina:</strong> {campeonato.nombreDisciplinas}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Nombre Campeonato:</strong> {campeonato.nombreCampeonato}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Tipo Campeonato:</strong> {campeonato.tipoCampeonato}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Estado Campeonato:</strong> {campeonato.estadoCampeonato}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Tamaño Campeonato:</strong> {campeonato.tamanoEquipos}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Fecha Inicio:</strong> {campeonato.fechaInicio}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Fecha Finalización:</strong> {campeonato.fechaFin}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Sede:</strong> {campeonato.sede}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Descripción:</strong> {campeonato.descripcion}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Fecha Inicio Inscripción:</strong> {campeonato.inicioInscripcion}
                </div>
                <div className="mb-4">
                    <strong className="block font-medium">Fecha Fin Inscripción:</strong> {campeonato.finInscripcion}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewCampeonatoModal;