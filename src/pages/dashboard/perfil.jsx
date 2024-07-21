import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  TrashIcon,
  ChatBubbleLeftEllipsisIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";

export function Profile() {
  return (
    <>
     <div className="">
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      <div className=" flex flex-row w-100p">
      <Card className="  w-2/3 -mt-16 mb-6  lg:mx-4 border border-blue-gray-100">
      <CardBody className="p-5">
      <Typography variant="h5" className="mb-6 mt-2">
            Editar Perfil
      </Typography>
      <form className="space-y-4">
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="">
                    <Typography
                        variant="small"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                       Nombre
                      </Typography>
                      </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="//consumo name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-700"><Typography
                        variant="small"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                       Telefono
                      </Typography></label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="//concumo sel"
                    pattern="[0-9]{10}"  
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700"><Typography
                        variant="small"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                       Correo
                      </Typography></label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="/cooreo"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700"><Typography
                        variant="small"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                       Confirmar correo
                      </Typography></label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Confirmar"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700"><Typography
                        variant="small"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                       contraseña
                      </Typography></label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="*******"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700"><Typography
                        variant="small"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                       Confirmar contraseña
                      </Typography></label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Confirmar"
                  />
                </div>
              </div>
             
            
              <Button variant="gradient" fullWidth>
                Actualizar cambios
              </Button>
            </form>
      </CardBody>
      </Card>
      <div className="felx justify-center items-center w-2/6"> 
      <div className=" max-w-md mx-auto -mt-16 mb-6 lg:mx-4 ">
        <Card className="relative overflow-visible pt-2">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="Delete" placement="left">
              <TrashIcon className="w-6 h-6  text-red-500 absolute -left-4 -bottom-4 transform -translate-y-1/2 cursor-pointer" />
            </Tooltip>
            <Avatar
              src="https://via.placeholder.com/100"
              alt="Profile Image"
              size="xl"
              className="border-4 border-white shadow-lg w-32 h-32"
            />
            <Tooltip content="Add" placement="right">
              <PlusIcon className="w-6 h-6 text-green-500 absolute -right-4 -bottom-4 transform -translate-y-1/2 cursor-pointer" />
            </Tooltip>
          </div>
          <CardBody className="flex flex-col items-center">
            <Typography variant="h5" className="mt-16 mb-1 text-center font-normal text-black-600">
              Mark Davis, 35
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className="text-center">
              Organizador
            </Typography>
          </CardBody>
        </Card>
      </div>
      </div>
     
    </div>

     
    </div>
     

    

     
</>
  );
}

export default Profile;
