import React, { createContext, useContext, useState } from 'react';
const ParContext = createContext();

// Crear un proveedor del contexto
export const ParProvider = ({ children }) => {
  const [par2, setPar] = useState(false);

  return (
    <ParContext.Provider value={{ par2, setPar }}>
      {children}
    </ParContext.Provider>
  );
};

export const usePar = () => useContext(ParContext);