import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  TrashIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import ModalTwo from "../../widgets/componentes/perfil/modalVistaPreviaImagen2";
import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';       
import axios from "axios";
const URL_API = import.meta.env.VITE_API_URL

export const Profile= () =>{
  const token = Cookies.get('token')
  const [loading, setLoading] = useState(true); // Estado de carga

  const [usuarioId, setUsuario]= useState([])
  useEffect(() => {
    const Obtener = async () => {
  
      try {
        const response = await axios.get(`${URL_API}/usuarios/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUsuario(response.data);
        if (response.data.url_foto) {
          setImagen(response.data.url_foto);
          setLoading(true);
          console.log(response.data.url_foto);
        } else {
          setImagen('/sinfoto.png');
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      } finally {
        setLoading(false);
      }
    };
    Obtener();
  }, [token]);
  const { handleSubmit, control,watch , formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
        correo: '',
        confirmCorreo: '',
        contrasena: '',
        confirmContrasena: '',
    }
});
const updateUsers = watch(); 


// Imagenes perfil
const [file, setFile] = useState(null); // Imagen
const [imagen, setImagen] = useState(null); // URL de la imagen
const funcionalidadInput = useRef(null);//Referencia del input para los iconos

const [imagePreview, setImagePreview] = useState(null); // Guarda la URL de la imagen para verla previamente 
const [modalFotoOpen, setModalFotoOpen] = useState(false);//controlar el modal previa vista

//Avisos
const notify = (message)=> toast(message);
const [accion, setAccion]= useState(null);
// Funciones de Modal Perfil cerrar
const handleCloseModal = () => {
setModalFotoOpen(false);
setFile(null);
setImagePreview(null);
};

// Funcion Post
const savePost = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  setLoading(true);
  try {
    // Enviar la solicitud POST para subir la imagen
    const respuesta = await fetch(`${URL_API}/usuarios/${UserID}/foto`, {
      method: 'POST',
      body: formData
    });

    if (!respuesta.ok) {
      throw new Error('Error al subir la imagen');
    }


    const data = await respuesta.json();
    console.log(data);

    if (data.url) {
      setImagen(data.url);
    } else {
      console.error('No se recibió URL de la imagen');
    }
    console.log(data.publicId)


    await axios.put(`${URL_API}/usuarios/${UserID}`, {
      url_foto: data.url,
      public_id: data.public_id
    });
    notify("Imagen agregada exitosamente");
    setModalFotoOpen(false);

  } catch (error) {
    console.error('Error en la operación de imagen:', error);
    notify("Hubo un error al agregar la imagen");
  } finally {
    setLoading(false);
  }
};



// Funcion Update
const saveUpdate = async () => {
if (!file) {
    return;
}
const formData = new FormData();
formData.append('file', file);
//formData.append("public_id", localStorage.getItem('public_id'));
setLoading(true)
try{
  const respuesta = await fetch(`${URL_API}/usuarios/${UserID}/pati`, {
    method: 'PATCH',
    body: formData
});
if (!respuesta.ok) {
  throw new Error('Error al subir la imagen');
}
const data = await respuesta.json();
setImagen(data.url);

if (data.url) {
  setImagen(data.url);
} else {
  console.error('No se recibió URL de la imagen');
}

// Guarda la URL en la base de datos
await axios.put(`${URL_API}/usuarios/${UserID}`, {
    url_foto: data.url,
    public_id: data.public_id
});
notify(accion === 'update' ? "Imagen actualizada exitosamente" : "Imagen agregada exitosamente");

setModalFotoOpen(false);

}
catch(error){
  console.log('Error con la imagen', error)
}
finally{
  setLoading(false)
}

};
// Funcion DELETE
const handleDelete = async () => {
try {

  const response = await fetch(`${URL_API}/usuarios/${UserID}/eli`,{
    method:'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
    const data = response.json();
    console.log(data)
    if (!usuarioId.public_id) {
      console.log(usuarioId.public_id)
      notify('Nay foto por eliminar');
      }else{
        await axios.put(`${URL_API}/usuarios/${UserID}`, {
          url_foto: '',
          public_id: null
        });
    
        setImagen('/sinfoto.png');

        // Notificar al usuario
        notify("Imagen eliminada exitosamente");
      }
   
   } catch (error) {
    console.error('Error eliminando la imagen:', error);
}
finally{
  setLoading(false)
}
};

// Funcion donde se guarda el input
const input = () => {
funcionalidadInput.current.click();
};

//Para mostrar la imagen
const ImagePreviewMuestra = (e) => {
const image = e.target.files[0];
if (image) {
    setFile(image);
    const urlImagePreview = URL.createObjectURL(image);
    setImagePreview(urlImagePreview);
    setModalFotoOpen(true);
   
}
};


// CONSUMO API PATCH
let UserID = usuarioId._id;
const [updateUser, setUpdateUser] = useState({ nombres: '', telefono: '', correo: '', contrasena: ''});

const handleChangePutDb = (e) => {
const { name, value } = e.target;
setUpdateUser(prevState => ({
    ...prevState,
    [name]: value
}));
};



const handleBoton = async (e) => {  
const emailConfirmed = updateUsers.confirmCorreo && updateUsers.confirmCorreo === updateUser.correo;
const passwordConfirmed = updateUsers.confirmContrasena && updateUsers.confirmContrasena === updateUser.contrasena;

const updatedFields = {};
if (updateUser.nombres) updatedFields.nombres = updateUser.nombres;
if (updateUser.telefono) updatedFields.telefono = updateUser.telefono;

//correo
if (updateUser.correo && updateUsers.confirmCorreo) {
if (emailConfirmed) {
updatedFields.correo = updateUser.correo;
} else {
alert('Los correos no coinciden');
return;
}
} else if (updateUser.correo || updateUsers.confirmCorreo) {
alert('Debe ingresar y confirmar su correo electrónico');
return;
}
//contraseña
if (updateUser.contrasena && updateUsers.confirmContrasena) {
if (updateUser.contrasena.length < 6) {
alert('La contraseña debe tener al menos 6 caracteres');
return;
}
if (passwordConfirmed) {
updatedFields.contrasena = updateUser.contrasena;
} else {
alert('Las contraseñas no coinciden');
return;
}
} else if (updateUser.contrasena || updateUsers.confirmContrasena) {
alert('Debe ingresar y confirmar su contraseña');
return;
}

//Actualzar en la DB
if (Object.keys(updatedFields).length > 0) {

try {
await axios.patch(`${URL_API}/usuarios/${UserID}`, updatedFields);
notify('Usuario Actualizado');
window.location.reload();
} catch (error) {
console.log('Complete todos los campos');
}
} else {
notify('No hay cambios para actualizar.');
}
};

  return (
    <>
      <Typography variant="h6" color="blue-gray" className="text-3xl mb-10 text-center">
        Revisa y actualiza los detalles de tu cuenta en esta sección.
        
      </Typography>

    <ToastContainer/>
    <div className="">
  {loading ? (
    <div className="flex justify-center items-center h-72">
      <Spinner />
    </div>
  ) : (
    <div className="relative mt-8 h-auto lg:h-72">
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/hq720.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-black-900/75" />
      </div>

      <div className="flex flex-col-reverse lg:w-full lg:flex-row w-full gap-4 mt-8">
        <div className="flex-1 lg:w-4/5 border  border-blue-gray-100">
          <Card className="w-full">
            <CardBody className="p-5">
              <Typography variant="h5" className="mb-6 mt-2">
                Editar Perfil
              </Typography>
              {usuarioId ? (
                <form className="space-y-4" key={usuarioId._id} onSubmit={handleSubmit(handleBoton)}>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <label className="">
                        <Typography variant="small" className="block mb-2 text-sm font-medium text-gray-700">
                          Nombre
                        </Typography>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={usuarioId.nombres}
                        name="nombres"
                        onChange={handleChangePutDb}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        <Typography variant="small" className="block mb-2 text-sm font-medium text-gray-700">
                          Telefono
                        </Typography>
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={usuarioId.telefono}
                        pattern="[0-9]{10}"
                        name="telefono"
                        value={updateUser.telefono}
                        onChange={handleChangePutDb}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        <Typography variant="small" className="block mb-2 text-sm font-medium text-gray-700">
                          Correo
                        </Typography>
                      </label>
                      <Controller
                        name="correo"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Correo"
                            {...field}
                            value={updateUser.correo}
                            onChange={(e) => {
                              handleChangePutDb(e);
                              field.onChange(e);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        <Typography variant="small" className="block mb-2 text-sm font-medium text-gray-700">
                          Confirmar correo
                        </Typography>
                      </label>
                      <Controller
                        name="confirmCorreo"
                        control={control}
                        render={({ field }) => (
                          <div className="w-full relative flex items-center justify-center flex-row">
                            <input
                              type="email"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                              placeholder="Confirmar"
                              {...field}
                              value={updateUser.confirmCorreo}
                              onChange={(e) => {
                                handleChangePutDb(e);
                                field.onChange(e);
                              }}
                            />
                            {updateUser.confirmCorreo && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {!errors.confirmCorreo && updateUser.confirmCorreo === updateUser.correo ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-green-500" viewBox="0 0 24 24">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path>
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-red-500" viewBox="0 0 24 24">
                                    <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                                  </svg>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        <Typography variant="small" className="block mb-2 text-sm font-medium text-gray-700">
                          Contraseña
                        </Typography>
                      </label>
                      <Controller
                        name="contrasena"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Contraseña"
                            {...field}
                            value={updateUser.contrasena}
                            onChange={(e) => {
                              handleChangePutDb(e);
                              field.onChange(e);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        <Typography variant="small" className="block mb-2 text-sm font-medium text-gray-700">
                          Confirmar contraseña
                        </Typography>
                      </label>
                      <Controller
                        name="confirmContrasena"
                        control={control}
                        render={({ field }) => (
                          <div className="w-full relative flex items-center justify-center flex-row">
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                              placeholder="Confirmar"
                              {...field}
                              value={updateUser.confirmContrasena}
                              onChange={(e) => {
                                handleChangePutDb(e);
                                field.onChange(e);
                              }}
                            />
                            {updateUser.confirmContrasena && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {!errors.confirmContrasena && updateUser.confirmContrasena === updateUser.contrasena ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-green-500" viewBox="0 0 24 24">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path>
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-red-500" viewBox="0 0 24 24">
                                    <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                                  </svg>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <button class="w-[50vw] select-none rounded-lg bg-[#12aed1cd] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit">
                    Actualizar cambios
                  </button>
                </form>
              ) : (
                <h1>Cargando datos</h1>
              )}
            </CardBody>
          </Card>
        </div>
        <div className=" relative lg:w-2/6  w-4/5"> 
      <div className=" max-w-md mx-auto -mt-16 mb-6 lg:mx-4 ">
        <Card className="relative overflow-visible pt-2">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>
            
          </div>
            <Tooltip  content="Delete" placement="left" >
              <button   className="absolute z-40 bottom-0 left-0 bg-white rounded-full p-1 border-0 w-10 h-10 flex items-center justify-center cursor-pointer" onClick={handleDelete}>
              <TrashIcon className="w-6 h-6  text-red-500 cursor-pointer" />
              </button>
            </Tooltip>
            <div className="relative">
     {
      setImagen &&(
        <Avatar
        src={imagen}
        size="xl"
        className="border-4 border-white shadow-lg w-32 h-32"
      />
      )
     }
     <form className='' onSubmit={(e)=> e.preventDefault()}>
                  <input
                  className='hidden'
                  ref={funcionalidadInput}  
                  type='file'
                  onChange={ImagePreviewMuestra}
                  />                 
                  <button className="hidden" onClick={savePost}>Enviar</button>  
                </form>

    </div>
    <div className="relative">
      {imagen !== '/sinfoto.png' && (
        <Tooltip content="Update" placement="right">
          <button 
            onClick={() => {
              setAccion('update');
              input();
            }} 
            className="absolute bottom-0 right-0 bg-white rounded-full p-1 border-0 w-10 h-10 flex items-center justify-center"
          >
            <PencilIcon className="w-6 h-6 text-green-500" />
          </button>
        </Tooltip>
      )}
      {imagen === '/sinfoto.png' && (
        <Tooltip content="Add" placement="right">
          <button 
            onClick={() => {
              setAccion('add');
              input();
            }} 
            className="absolute bottom-1 right-1 bg-white rounded-full p-1 border-0 w-10 h-10 flex items-center justify-center"
          >
            <PlusIcon className="w-6 h-6 text-green-500" />
          </button>
        </Tooltip>
      )}
    </div>
          </div>
          <CardBody className="flex flex-col items-center">
            <Typography variant="h5" className="mt-16 mb-1 text-center font-normal text-black-600">
            {
              usuarioId? 
              <p>{usuarioId.nombres}</p>
              : 
              <p>Cargando datos</p>
             }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className="text-center">
           Organizador
            </Typography>
          </CardBody>
        </Card>
      </div>
      </div>
     
    </div>
      
      <ModalTwo
       isOpen={modalFotoOpen && accion === 'add'}
       onClose={handleCloseModal}
       onSave={savePost}
       imagePreview={imagePreview}
      />
     <ModalTwo                                                                                    
       isOpen={modalFotoOpen && accion === 'update'}
       onClose={handleCloseModal}
       onSave={saveUpdate}
       imagePreview={imagePreview}
      />
    </div>
     
      )}
    </div>


</>
  );
}

