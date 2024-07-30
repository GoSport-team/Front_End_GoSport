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
import { useForm, Controller } from "react-hook-form";
import { registroUser } from "../../lib/api";

export function SignUp() {
  const [selectedOption, setSelectedOption] = useState(" ");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      contrasena: '',
      confirmContrasena: '',
    }
  });

  const onSubmit = async (data) => {
    // Eliminar la confirmación de la contraseña del objeto de datos
    delete data.confirmContrasena;
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

  const change = (e) => {
    setSelectedOption(e)
  }

  // Obteniendo las contraseñas para validación
  const contrasena = watch("contrasena");
  const confirmContrasena = watch("confirmContrasena");
  
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
            onChange={change}
            
            >
              <Option value=""></Option>
              <Option value="Mañana">Mañana</Option>
              <Option value="Tarde">Tarde</Option>
              <Option value="Noche">Noche</Option>

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
            <Controller
             name="contrasena"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                  placeholder="Contraseña"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </div>
            )}
          />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirmar contraseña
            </Typography>
            <Controller
                            name="confirmContrasena"
                            control={control}
                            render={({field})=>(
                              <div className=" relative">
                              <Input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10" 
                                placeholder="Confirmar"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                {...field}
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                              />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {!errors.confirmContrasena && confirmContrasena && (
                      contrasena === confirmContrasena ? (

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='text-green-500' viewBox="0 0 24 24">
                                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path>
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='text-red-500' viewBox="0 0 24 24">
                                      <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                                    </svg>
                                  )
                              
                              )}
                                 </div>
                                 </div>
                            )}
                            />
          </div>

          <Button type="onsubmit" className="mt-6" fullWidth>
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