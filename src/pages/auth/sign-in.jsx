import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../lib/api";
import { Check } from "react-feather";
import Cookies from "js-cookie";
import { useState } from "react";

export const SignIn= ()=> {
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
        }
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Credenciales inválidas. Verifica tus datos e intenta de nuevo.");
      } else {
        alert("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <section className="flex items-center justify-center gap-4">
      <div className="w-100p h-100p flex items-center flex-col justify-center gap-3 lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Iniciar Sesion</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingrese su correo y contraseña, campos obligatorios </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Correo
            </Typography>
            <div className="relative">
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
           
           
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contraseña
            </Typography>
            <div className="relative">
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
          
          <Button type="submit" className="mt-6" fullWidth>
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
      <div className="w-2/5  hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-50p w-50p object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}


