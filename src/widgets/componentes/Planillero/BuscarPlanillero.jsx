import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const BuscarPlanillero = ({ closeModal, modalIsOpen, idVs,setIdPlanillero, setBotonVerPlanillero }) => {
    const [planillero, setPlanillero] = useState(null);
    const [identificacion, setIdentificacion] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [controlador, setControlador]=useState()
    const [vacio, setVacio]=useState()
    const buscarPlanillero = async (identificacion) => {
        if(identificacion){
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/usuarios/planillero/${identificacion}`);
                // console.log(response.data)
                if(response.data){
                    setPlanillero(response.data[0]);
                    setControlador(true)
                    setVacio(false)
                    setError(false)
                }else{
    setPlanillero(false)
                    setError(false);
                }
            } catch (error) {
                console.error(error);
                setError(true);
                setPlanillero(false)
            } finally {
                setLoading(false);
            }
        }else{
            setVacio(true)
        }
       
     }

    const agregarPlanillero = async () => {
        try {
            setLoading(true);
            if(identificacion){
              await axios.patch(`http://localhost:3001/vs/${idVs}`, { idPlanillero: identificacion });
            }
            closeModal()
            setControlador(true)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
//console.log(idplanillero)
    useEffect(() => {
        const fetchPlanillero = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/vs/${idVs}`);
                console.log(response.data.idPlanillero)
                setIdPlanillero(response.data.idPlanillero)
                if(response.data.idPlanillero){
                  setBotonVerPlanillero(true);
                  setControlador(true)
                }else{
                  setBotonVerPlanillero(false);
                  setControlador(false)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPlanillero();
    }, [controlador]);

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="flex justify-center items-center h-screen w-auto ml-36" overlayClassName="fixed inset-0 bg-black bg-opacity-50">
            {loading && <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"><div className="text-white">Cargando...</div></div>}
            <div className="max-w-md mx-auto bg-white w-full p-10 rounded-lg">
            <div className="flex justify-end">
  <button onClick={closeModal} className="flex bg-red-400 rounded-sm w-max">x</button>
</div>
            <form >
          
                <div className="relative">
                    <input type="search" value={identificacion} onChange={e => setIdentificacion(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Busca al planillero por su número de cédula" required />
                    <button onClick={() =>buscarPlanillero(identificacion)} type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Buscar</button>
                </div>
                {vacio && <h1>Ingrese identificación</h1>}
                {error && <h1>Usuario no encontrado</h1>}
                
            </form>
            {planillero && (
                    <div key={planillero._id} className="mt-4">
                        <h4 className="text-lg font-bold">Planillero Encontrado:</h4>
                        <p><strong>Nombre:</strong> {planillero.nombres}</p>
                        <button onClick={()=>agregarPlanillero()} className="px-4 py-2 bg-blue-500 text-white rounded-md">Agregar</button>
                    </div>
                )}
                </div>
        </Modal>
    );
}
