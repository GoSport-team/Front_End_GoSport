import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecuperarContrasena = () => {
  const [step, setStep] = useState(1);  // Controla la etapa actual
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState(new Array(6).fill(""));
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Referencias a los campos de entrada del código de verificación
  const inputsRef = useRef([]);

  // Función para manejar el envío del email
  const handleEnviarCorreo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/auth/solicitar-codigo', { correo: email });
      if (response.data.message === 'Código de verificación enviado por correo.') {
        toast.success('Correo enviado exitosamente.');
        setStep(2); // Avanza al paso de verificación
      } else {
        toast.error('Error al enviar el correo.');
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      toast.error('Hubo un problema con el envío del correo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la verificación del código
  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const verificationCode = codigo.join(""); // Une el array de códigos
  
    try {
      const response = await axios.post('http://localhost:3001/auth/verificar-codigo', {
        correo: email,
        codigo: verificationCode,
      });
  
      if (response.data.message === 'Código verificado correctamente') {
        toast.success('Código verificado exitosamente.');
        setStep(3); // Avanza al paso de crear nueva contraseña
      } else {
        // Mostrar mensaje de error si el código no es válido
        toast.error(response.data.message || 'Error inesperado al verificar el código.');
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      toast.error(error.response?.data?.message || 'Hubo un problema con la verificación.');
    } finally {
      setLoading(false);
    }
  };
  
  // Función para manejar el cambio de contraseña
  const handleCambiarContrasena = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/auth/cambio', {
        correo: email,
        nuevaContrasena,
        codigo: codigo.join(""),
      });

      if (response.data.message === 'Contraseña actualizada correctamente') {
        toast.success('Contraseña cambiada exitosamente.');
        setStep(1); // Regresa al paso inicial o a una página de inicio de sesión
      } else {
        toast.error('Error al cambiar la contraseña.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      toast.error('Hubo un problema al cambiar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cambio en los campos de código de verificación
  const handleCodeChange = (e, index) => {
    const { value } = e.target;
    const newCodigo = [...codigo];
    if (/^\d*$/.test(value)) { // Solo permite números
      newCodigo[index] = value.slice(-1); // Asegura que solo se ingrese un carácter
      setCodigo(newCodigo);
      
      // Mueve el foco al siguiente campo si el valor es válido
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
      // Vuelve al campo anterior si el valor está vacío
      if (!value && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      <section>
        <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black">
                  {step === 1 && "Recuperar Contraseña"}
                  {step === 2 && "Verificar Código"}
                  {step === 3 && "Crear Nueva Contraseña"}
                </h2>
              </div>
            </div>
            {step === 1 && (
              <form onSubmit={handleEnviarCorreo}>
                <div className="mt-4 space-y-6">
                  <div className="col-span-full my-3">
                    <label className="block mb-3 text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese su correo"
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-full w-full flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-[#12aed1cd] py-3 px-6 text-white font-bold uppercase transition-all hover:bg-blue-500 focus:opacity-[0.85] disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerificarCodigo}>
                <div className="w-full flex flex-row gap-4 items-center justify-center">
                  {codigo.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={codigo[index]}
                      onChange={(e) => handleCodeChange(e, index)}
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="bg-gray-200 w-12 h-12 text-center rounded-md text-gray-800 font-semibold focus:bg-blue-100 transition-all duration-300"
                      required
                    />
                  ))}
                </div>
                <div className="col-span-full w-full flex justify-end mt-6">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#12aed1cd] py-3 px-6 text-white font-bold uppercase transition-all hover:bg-blue-500 focus:opacity-[0.85] disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Verificando...' : 'Verificar'}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleCambiarContrasena}>
                <div className="mt-4 space-y-6">
                  <div className="col-span-full my-3">
                    <label className="block mb-3 text-sm font-medium text-gray-600">Nueva Contraseña</label>
                    <input
                      type="password"
                      value={nuevaContrasena}
                      onChange={(e) => setNuevaContrasena(e.target.value)}
                      placeholder="Ingrese nueva contraseña"
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-full w-full flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-[#12aed1cd] py-3 px-6 text-white font-bold uppercase transition-all hover:bg-blue-500 focus:opacity-[0.85] disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default RecuperarContrasena;
