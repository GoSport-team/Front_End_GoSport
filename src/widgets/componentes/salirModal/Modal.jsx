// src/components/Modal.jsx
import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import Cookies from 'js-cookie';
import  axios  from "axios";
const URL_API = import.meta.env.VITE_API_URL
const ModalSalir = ({ isOpen, onClose }) => {
 const notify = (message)=> toast(message);
 const navifate = useNavigate()
  const handleOk= async ()=>{
    await axios.post(`${URL_API}/auth/cerarSesion`)
    navifate("/");
    Cookies.set('token', '')
    notify("Sesión cerrada exitosamente.");
  }
  const handleCerrar=()=>{
    onClose(false)
    navifate("/src/pages/dashboard/home.jsx")
  }
  
  const [loading, setLoading]= useState(false)

  return (
    <>
    <ToastContainer/>
    {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Confirmación</h3>
              <p className="mt-2">¿Está seguro de que desea salir ?</p>
              <div className="flex justify-end mt-4">
                {
                    loading ?(
                        <div className="flex justify-center items-center h-72">
                        <Spinner />
                      </div>
                    ):(
                        <div>
                            <button
                  onClick={handleOk}
                   class="mr-2 select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  OK
                </button>
                <button
                  onClick={handleCerrar}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancelar
                </button>
                        </div>
                    )
                }
                
              </div>
            </div>
          </div>
        )}

    </>
  );
};

export default ModalSalir;
