import {
  Button,
} from "@material-tailwind/react";

const ModalFotoPerfil = ({ isOpen, onClose, onSave, imagePreview }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 sm:p-8 h-auto flex justify-center items-center flex-col gap-6 shadow-xl transform transition-all duration-300 ease-out scale-100 hover:scale-105">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">Previsualizar Imagen</h2>
          <img className="w-full sm:w-2/3 h-auto object-cover rounded-lg shadow-md" src={imagePreview} alt="Previsualización" />
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
            <button
              onClick={onSave}
              class="select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Guardar
            </button>
            <button
              onClick={onClose}
              class="select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalFotoPerfil;
