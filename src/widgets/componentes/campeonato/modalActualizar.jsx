import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const UpdateCampeonatoModal = ({ isOpen, onClose, campeonato, onUpdate, setControlador, controlador }) => {
 
    const [formData, setFormData] = useState({
        nombreDisciplinas: '',
        nombreCampeonato: '',
        tipoCampeonato: '',
        estadoCampeonato: '',
        tamanoEquipos: '',
        fechaInicio: '',
        fechaFin: '',
        sede: '',
        descripcion: '',
        inicioInscripcion: '',
        finInscripcion: ''
    });
    
    const [modalidades, setModalidades] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        const fetchModalidades = async () => {
            try {
                const response = await axios.get(`https://back-end-gosport.onrender.com/modalidad`);
                setModalidades(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchModalidades();
    }, []);

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const response = await axios.get(`https://back-end-gosport.onrender.com/sede`);
                setSedes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSedes();
    }, []);

    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await axios.get(`https://back-end-gosport.onrender.com/disciplina`);
                setDisciplinas(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDisciplinas();
    }, []);

    useEffect(() => {
        if (campeonato) {
            setFormData({
                nombreDisciplinas: campeonato.nombreDisciplinas || '',
                nombreCampeonato: campeonato.nombreCampeonato || '',
                tipoCampeonato: campeonato.tipoCampeonato || '',
                estadoCampeonato: campeonato.estadoCampeonato || '',
                tamanoEquipos: campeonato.tamanoEquipos || '',
                fechaInicio: campeonato.fechaInicio || '',
                fechaFin: campeonato.fechaFin || '',
                sede: campeonato.sede || '',
                descripcion: campeonato.descripcion || '',
                inicioInscripcion: campeonato.inicioInscripcion || '',
                finInscripcion: campeonato.finInscripcion || ''
            });
        }
    }, [controlador]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://back-end-gosport.onrender.com/campeonato/${onUpdate}`, formData);
            toast.success('Campeonato actualizado exitosamente');
            onClose();
            setControlador(true)
        } catch (error) {
            console.error('Error updating campeonato:', error);
            toast.error('Error al actualizar el campeonato. Inténtalo de nuevo.');
        }finally{
            setControlador(false)
        }
    };

    if (!campeonato) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-lg p-6 max-w-md max-h-[80vh] w-full shadow-lg overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Actualizar Campeonato</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="nombreDisciplinas">Disciplina:</label>
                            <select
                                id="nombreDisciplinas"
                                name="nombreDisciplinas"
                                value={formData.nombreDisciplinas}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                
                            >
                                <option value="">Selecciona una disciplina</option>
                                {disciplinas.map((disciplina) => (
                                    <option key={disciplina._id} value={disciplina.nombreDisciplina}>
                                        {disciplina.nombreDisciplina}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="nombreCampeonato">Nombre Campeonato:</label>
                            <input
                                type="text"
                                id="nombreCampeonato"
                                name="nombreCampeonato"
                                value={formData.nombreCampeonato}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="tipoCampeonato">Tipo Campeonato:</label>
                            <select
                                id="tipoCampeonato"
                                name="tipoCampeonato"
                                value={formData.tipoCampeonato}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                
                            >
                                <option value="">Selecciona una modalidad</option>
                                {modalidades.map((modalidad) => (
                                    <option key={modalidad._id} value={modalidad.nombreModalidad}>
                                        {modalidad.nombreModalidad}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="sede">Sede:</label>
                            <select
                                id="sede"
                                name="sede"
                                value={formData.sede}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                
                            >
                                <option value="">Selecciona una sede</option>
                                {sedes.map((sede) => (
                                    <option key={sede._id} value={sede.nombreSede}>
                                        {sede.nombreSede}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="tamanoEquipos">Tamaño Campeonato:</label>
                            <input
                                type="number"
                                id="tamanoEquipos"
                                name="tamanoEquipos"
                                value={formData.tamanoEquipos}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="fechaInicio">Fecha Inicio:</label>
                            <input
                                type="date"
                                id="fechaInicio"
                                name="fechaInicio"
                                value={formData.fechaInicio}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="fechaFin">Fecha Finalización:</label>
                            <input
                                type="date"
                                id="fechaFin"
                                name="fechaFin"
                                value={formData.fechaFin}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="descripcion">Descripción:</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                rows="4"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="inicioInscripcion">Fecha Inicio Inscripción:</label>
                            <input
                                type="date"
                                id="inicioInscripcion"
                                name="inicioInscripcion"
                                value={formData.inicioInscripcion}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700" htmlFor="finInscripcion">Fecha Fin Inscripción:</label>
                            <input
                                type="date"
                                id="finInscripcion"
                                name="finInscripcion"
                                value={formData.finInscripcion}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        
                            />
                        </div>
                    
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md mr-3"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                           class="select-none  rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateCampeonatoModal;