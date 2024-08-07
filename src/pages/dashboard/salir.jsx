import React, { useState } from 'react';
import ModalSalir from '@/widgets/componentes/salirModal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

export const Salir = () => {
  const [isModalOpen, setModalOpen] = useState(true); // Set to true to open the modal by default

  const closeModal = () => setModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <div>
          <ModalSalir isOpen={isModalOpen} onClose={closeModal} />
          <ToastContainer />
        </div>
      )}
    </>
  );
};