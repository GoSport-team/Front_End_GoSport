import React, { createContext, useContext, useState } from 'react';
const AgregarContext = createContext();

// Crear un proveedor del contexto
export const AgregarProvider = ({ children }) => {
  const [botonAgregar, setBotonAgregar] = useState();

  return (
    <AgregarContext.Provider value={{ botonAgregar, setBotonAgregar }}>
      {children}
    </AgregarContext.Provider>
  );
};

export const UseAgregar= () => useContext(AgregarContext);