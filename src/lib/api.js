import axios from "axios";
import Cookies from "js-cookie";

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
  try {
    const response = await api.post("/auth/login", {
      correo: correo,
      contrasena: contrasena,
    });
    Cookies.set("token", response.data.token, { path: "/" });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error al iniciar sesión");
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
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error al registrar usuario"
    );
  }
};

export default api;
