import {
  Card,
  Input,
  Checkbox,
  Button,
  Select,
  Typography,
  Option
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { registroUser } from "../../lib/api";

export function SignUp() {
  const [selectedOption, setSelectedOption] = useState(" ");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data.finFicha = new Date(data.finFicha).toISOString();
    try {
      const response = await registroUser(data);
      alert("Usuario registrado correctamente");
      reset();
    } catch (error) {
      // Maneja el error de manera segura
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error en el registro del usuario:", errorMessage);
      alert(errorMessage);
    }
  };
  

  
  return (
    <section className="ml-2 mr-2 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">¡Unete a nosotros hoy!</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa todos los datos para un registro exitoso.</Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Nombres
            </Typography>
            <Input
            type="text"
              size="lg"
              id="nombres"
              placeholder="Maria de las nieves"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("nombres", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.nombres && <span>{errors.nombres.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Telefono 
            </Typography>
            <Input
              size="lg"
              id="telefono"
              placeholder="+57 31000"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("telefono", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.telefono && <span>{errors.telefono.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Numero de identificacion
            </Typography>
            <Input
              size="lg"
              id="identificacion"
              placeholder="1058494"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} {...register("identificacion", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.identificacion && (
              <span>{errors.identificacion.message}</span>
            )}  
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Nombre del programa que estas cursando
            </Typography>
            <Input
              size="lg"
              type="text"
              id="programa"
              placeholder="Analisis y desarrollo del software"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("programa", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.programa && <span>{errors.programa.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Numero de la ficha
            </Typography>
            <Input
            id="ficha"
              size="lg"
              placeholder="2669739"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("ficha", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.ficha && <span>{errors.ficha.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Fecha de terminacion del programa 
            </Typography>
            <Input
            type="date"
            id="finFicha"
              size="lg"
              placeholder="22/03/2025"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("finFicha", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.finFicha && <span>{errors.finFicha.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Seleccione su jornada
            </Typography>
           
           <Select
            id="select"
            value={selectedOption}
            {...register("jornada", {
              required: "Este campo es obligatorio",
            })}
            onChange={handleChange}>
              <Option value=""></Option>
              <Option value="mañana">mañana</Option>
              <Option value="tarde">tarde</Option>
              <Option value="noche">noche</Option>

           </Select>
           {errors.jornada && <span>{errors.jornada.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu correo
            </Typography>
            <Input
            type="email"
              size="lg"
              id="correo"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("correo", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.correo && <span>{errors.correo.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
             Contraseña
            </Typography>
            <Input
            type="password"
            id="contrasena"
              size="lg"
              placeholder="*****"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("contrasena", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.contrasena && <span>{errors.contrasena.message}</span>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirmar contraseña
            </Typography>
            <Input
            type="password"
              size="lg"
              id="contrasena"
              placeholder="****"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("contrasena", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.contrasena && <span>{errors.contrasena.message}</span>}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            REGISTRARSE
          </Button>

         <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
          Ya tienes cuenta
            <Link to="/auth/sign-in" className="text-gray-900 ml-1"> Inicio sesion</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}
export default SignUp;