 import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/api";
import { Check } from "react-feather";
import Cookies from "js-cookie";
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignIn= ()=> {
  const notify = (message) => toast(message);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setError,
  } = useForm();
  const [isValid, setIsvalid]= useState({correo:false, contrasena: false});
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.correo, data.contrasena);
      setIsvalid({ correo: true, contrasena: true });
      Cookies.set("token", response.token, { path: "/" });

      setTimeout(() => {
        const userRole = response.user.rol;
        if (userRole === "jugador") {
          Navigate("/jugador/dashboard");
        } else if (userRole === "organizador") {
          Navigate("/campeonatos/view");
        } else {
          setError("rol", { type: "manual", message: "Rol desconocido" });
          notify("Verifique sus credenciales")
        }
      }, 1000);
    } catch (error) {
     
        console.log("Ingrese usuario y contraseña");
      
    }
  };

  return (
    <section className="flex flex-row h-screen">
      <ToastContainer/>
      <div className="w-100p h-100p flex items-center flex-col justify-center gap-3 lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4  ">Iniciar Sesion</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingrese su correo y contraseña, campos obligatorios </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 text-lg font-medium">
              Correo
            </Typography>
            <div className="relative flex flex-row">
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("correo")}
              id
            />
             {errors.correo && <p>{errors.correo.message}</p>}
            {touchedFields.correo && isValid.correo && !errors.correo && (
              <Check className="iconLogin" />
            )}
            </div>
           
           
            <Typography variant="small" color="blue-gray" className="-mb-3 text-lg font-medium">
              Contraseña
            </Typography>
            <div className="relative flex flex-row">
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("contrasena")}
            />
              {errors.contrasena && <p>{errors.contrasena.message}</p>}
            {touchedFields.contrasena &&
              isValid.contrasena &&
              !errors.contrasena && <Check className="iconLogin" />}
            </div>
          </div>
          
          <Button type="submit" className="mt-6 text-base" fullWidth>
            Iniciar sesion
        </Button>

          <div className="flex items-center justify-end gap-2 mt-6">
           
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                ¿Has olvidado tu contraseña?
              </a>
            </Typography>
          </div>
          
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            ¿No estas registrado?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Crear cuenta</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-screen">
        <img
          src="/public/img/IniciarSesio/ini.jpg"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}


