const ModalFotoPerfilJugadorOne = ({isOpen, onClose, onSave, imagePreview})=>{
    if (!isOpen) {
        return null;
    }
    return(
        <>
       <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
  <div className="bg-white rounded-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 sm:p-6 h-auto flex justify-center items-center flex-col gap-6">
    <h2 className="text-center text-xl sm:text-2xl font-semibold">Previsualizar Imagen</h2>
    <img className="w-full sm:w-2/3 h-auto object-cover" src={imagePreview} alt="Previsualización" />
    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4">
      <Button 
        onClick={onSave} 
        className="w-full sm:w-24 h-12 text-white bg-blue-500 border-transparent border-[1.5px] rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Guardar
      </Button>
      <Button 
        onClick={onClose} 
        className="w-full sm:w-24 h-12 text-white bg-gray-500 border-transparent border-[1.5px] rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Cancelar
      </Button>
    </div>
  </div>
</div>

        </>
    )
}
export default ModalFotoPerfilJugadorOne;
