import {
  Card,
  Input,
  Checkbox,
  Button,
  Select,
  Typography,
  Option
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { registroUser } from "../../services/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from "axios";
const URL_API = import.meta.env.VITE_API_URL
export function SignUp() {

  const [setContrasena , setSetContrasena] = useState(false)
  const [setConfirmContra, setSetConfirmContra] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [programa, setPrograma] = useState([])

  useEffect(() => {
    const fetchPrograma = async () => {
        try {
            const response = await axios.get(`${URL_API}/programa`);
            setPrograma(response.data);
            console.log('Programas', response.data);
            
        } catch (error) {
            console.log(error);
        }
    };
    fetchPrograma();
}, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      contrasena: '',
      confirmContrasena: '',
      jornada: '',
    }
  });
  const navigate = useNavigate();
  const mostarContra= ()=>{
    setSetContrasena(!setContrasena);
    
  }
  const confirContras = ()=>{
    setSetConfirmContra(!setConfirmContra);
  }
  const notify = (message) => toast(message);

  const onSubmit = async (data) => {

    console.log("Formulario enviado. Data:", data);
  
    if(data.contrasena !== data.confirmContrasena){
      return notify('Las contraseñas no coinciden')
    }

    delete data.confirmContrasena;

    data.finFicha = new Date(data.finFicha).toISOString();
 
    try {
      const response = await registroUser(data);
      console.log(response)

      notify("Usuario registrado correctamente");
      navigate("/auth/sign-in")
      reset();


    } catch (error) {
     console.log('Error de conexion')
  }
};
  

const handleSelectChange = (e) => {
  const value = e.target.value;
  setSelectedOption(value);
  setValue('jornada', value); // Actualiza el valor en react-hook-form
  console.log("Valor seleccionado:", value);
};

  
  return (
    <section className="ml-2 mr-2flex-row flex justify-center items-center min-h-screen">
        <div className="hidden lg:block lg:w-2/5 h-screen">
          <img
            src="https://res.cloudinary.com/dwpi4aubh/image/upload/v1727106326/erskvq1m7spaugmpzhcz.jpg"
            className="rounded-3xl object-cover w-full h-screen"
            />
        </div>
      
     
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">¡Unete a nosotros hoy!</Typography>
         <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa todos los datos para un registro exitoso.</Typography>
         </div>
     
       

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full px-4 justify-center items-center">
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {/* Nombres */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Nombres</Typography>
              <Input
                type="text"
                id="nombres"
                placeholder="Maria de las nieves"
                className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.nombres ? '!border-1 !border-red-500' : ''}`}
                {...register("nombres", { required: "Este campo es obligatorio" })}
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Teléfono</Typography>
              <Input
                type="text"
                id="telefono"
                placeholder="+57 31000"
                className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.telefono ? '!border-1 !border-red-500' : ''}`}
                {...register("telefono", { required: "Este campo es obligatorio" })}
              />
            </div>

            {/* Número de identificación */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Número de identificación</Typography>
              <Input
                type="text"
                id="identificacion"
                placeholder="1058494"
                className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.identificacion ? '!border-1 !border-red-500' : ''}`}
                {...register("identificacion", { required: "Este campo es obligatorio" })}
              />
            </div>

            {/* Nombre del programa */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Nombre del programa</Typography>
              <select
                id="programa"
                className={`!border-blue-gray-200 focus:!border-gray-900 border p-2 rounded-md ${errors.programa ? '!border-1 !border-red-500' : ''} h-12`}
                {...register("programa", { required: "Este campo es obligatorio" })}
              >
                <option value="">Selecciona un programa</option>
                {programa.map((prog) => (
                  <option key={prog._id} value={prog.namePrograma}>{prog.namePrograma}</option>
                ))}
              </select>
              {errors.programa && <span className="text-red-500">{errors.programa.message}</span>}
            </div>

            {/* Número de la ficha */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Número de la ficha</Typography>
              <Input
                type="text"
                id="ficha"
                placeholder="2669739"
                className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.ficha ? '!border-1 !border-red-500' : ''}`}
                {...register("ficha", { required: "Este campo es obligatorio" })}
              />
            </div>

            {/* Selección de jornada */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Seleccione su Jornada</Typography>
              <select
                id="jornada"
                className={`!border-blue-gray-200 focus:!border-gray-900 border p-2 rounded-md ${errors.jornada ? '!border-1 !border-red-500' : ''} h-12`}
                {...register("jornada", { required: "Este campo es obligatorio" })}
              >
                <option value=""></option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
              {errors.jornada && <span className="text-red-500">{errors.jornada.message}</span>}
            </div>

            {/* Fecha de terminación */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Fecha de terminación del programa</Typography>
              <Input
                type="date"
                id="finFicha"
                className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.finFicha ? '!border-1 !border-red-500' : ''}`}
                {...register("finFicha", { required: "Este campo es obligatorio" })}
              />
            </div>

            {/* Correo */}
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Tu correo</Typography>
              <Input
                type="email"
                id="correo"
                placeholder="name@mail.com"
                className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.correo ? '!border-1 !border-red-500' : ''}`}
                {...register("correo", { required: "Este campo es obligatorio" })}
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col relative">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Contraseña</Typography>
              <div className="relative">
                <Input
                  type={setContrasena ? "text" : "password"}
                  id="contrasena"
                  placeholder="******"
                  className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.contrasena ? '!border-1 !border-red-500' : ''}`}
                  {...register("contrasena", { required: 'Este campo es obligatorio' })}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={mostarContra}>
                  {setContrasena ? <AiOutlineEyeInvisible className="h-6 w-6 text-gray-700" /> : <AiOutlineEye className="h-6 w-6 text-gray-700" />}
                </span>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-col relative">
              <Typography variant="small" color="blue-gray" className="mb-1 text-base font-medium">Confirmar Contraseña</Typography>
              <div className="relative">
                <Input
                  type={setConfirmContra ? "text" : "password"}
                  id="confirmContrasena"
                  placeholder="Confirmar"
                  className={`!border-blue-gray-200 focus:!border-gray-900 ${errors.confirmContrasena ? '!border-1 !border-red-500' : ''}`}
                  {...register("confirmContrasena", { required: 'Este campo es obligatorio' })}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={confirContras}>
                  {setConfirmContra ? <AiOutlineEyeInvisible className="h-6 w-6 text-gray-700" /> : <AiOutlineEye className="h-6 w-6 text-gray-700" />}
                </span>
              </div>
            </div>
          </div>

          <button type="submit" class="w-[46.5vw] select-none rounded-lg bg-[#12aed1cd] py-3 px-6 mx-5 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-4" >
            REGISTRARSE
          </button>
        </form>

       
         <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
          Ya tienes cuenta
            <Link to="/auth/sign-in" className="text-base text-gray-900 ml-1"> Inicio sesion</Link>
          </Typography>
      </div>
      <ToastContainer/>
    </section>
  );
}
export default SignUp;