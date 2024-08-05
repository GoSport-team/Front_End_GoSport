import axios from "axios";
import Cookies from "js-cookie";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = "http://localhost:3001";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => { 
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const fetchProtectedData = async (endpoint) => {
//   try {
//     const response = await api.get(`/protected/${endpoint}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching protected data:", error);
//     throw error;
//   }
// };

export const loginUser = async (correo, contrasena) => {
  const notify = (message) => toast(message);
  if (!correo || !contrasena) {
    notify('Ingrese usuario y contraseña');
    throw new Error('Ingrese usuario y contraseña');
  }

  try {
    const response = await api.post('/auth/login', {
      correo: correo,
      contrasena: contrasena,
    });
    Cookies.set('token', response.data.token, { path: '/' });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        notify('Credenciales inválidas. Verifica tus datos e intenta de nuevo.');
        throw new Error('Credenciales inválidas. Verifica tus datos e intenta de nuevo.');
      } else if (error.response.status === 400) {
        notify('Ingrese usuario y contraseña');
        throw new Error('Ingrese usuario y contraseña');
      } else {
        notify('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        throw new Error(error.response.data.message || 'Error al iniciar sesión');
      }
    } else {
      notify('Error de conexión. Por favor, inténtelo de nuevo.');
      throw new Error('Error de conexión. Por favor, inténtelo de nuevo.');
    }
  }
};

export const registroUser = async ({
  correo,
  contrasena,
  nombres,
  telefono,
  programa,
  finFicha,
  identificacion,
  ficha,
  jornada
}) => {
  const notify = (message) => toast(message);

  try {
    
    const response = await api.post("/auth/register", {
      correo,
      contrasena,
      nombres,
      telefono,
      programa,
      finFicha,
      identificacion,
      ficha,
      jornada
    });
   
    return response;
  } catch (error) {

    console.log(error.response)
    if (error.response) {

      if (error.response.status === 409 && error.response.data.includes('Este correo e identificación ya existen')) {
        notify('Este correo e identificación ya existen')
        throw new Error("Este correo e identificación ya existen");
      } else if (error.response.status === 409 && error.response.data.includes("Esta identificación ya existe")) {
        notify('Esta identificación ya existe')
        throw new Error("Esta identificación ya existe");
      }else if(error.response.status === 409 && error.response.data.includes("Este correo ya existe")){
        notify('Este correo ya existe')
        throw new ("Este correo ya existe")
      }
    } else {
      throw new Error("Error de conexión. Por favor, inténtelo de nuevo.");
    }
  }
};

export default api;
