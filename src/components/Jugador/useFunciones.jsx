import axios from 'axios';
import Swal from 'sweetalert2'
const URL_API = import.meta.env.VITE_API_URL

export const eliminarJugador = async (indice, jugadores, user) => {
    if (jugadores[indice].nombres === user.nombres) {
      await Swal.fire({
        title: "Este jugador no se puede borrar porque es el capitán",
        confirmButtonText: "OK",
          confirmButtonColor: "#9e9e9e",
      });
      return jugadores;
    }
  
    if (jugadores && jugadores.length > indice) {
      const result = await Swal.fire({
        title: "Deseas eliminar este jugador",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        confirmButtonColor: "#12aed1cd",
        cancelButtonColor: "#9e9e9e",
        text: `Nombre: ${jugadores[indice].nombres}`,
      });
  
      if (result.isConfirmed) {
        await Swal.fire({
          title: "Jugador borrado correctamente",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#0837C0",
        });
  
        const nuevosJugadores = jugadores.filter((_, i) => i !== indice);
        return nuevosJugadores; 
      }
    }
  
    return jugadores; 
  };
  



export  const searchJugador = async (idenfiticacion, jugadores) => {
    try {
        const response = await axios.get(`${URL_API}/usuarios/identificacion/${idenfiticacion}`)
        
        const responseValidador = await axios.get(`${URL_API}/equipoInscripto/validarJugador`,{
            headers:{
                idJugador: response.data._id
            }
        })
        if (responseValidador.data.msg == "Jugador ya existe en un equipo") {
            Swal.fire({
                icon: "error",
                title: `Jugador ya pertenece al equipo ${responseValidador.data.equipo[0].nombreEquipo}`,
                confirmButtonColor: "#12aed1cd",
            })

            return false
        }

        const { value: formValues } = await Swal.fire({
            title: "Deseas agregar a este jugador",
            confirmButtonText: "OK",
            confirmButtonColor: "#12aed1cd",
            html: `
          <h1>${response.data.nombres}</h1>
          <h1>Ficha</h1>
          <input id="swal-input1"  value=${response.data.ficha} class="swal2-input" required  placeholder="Ingresa la ficha" >
          <input id="swal-input2" class="swal2-input" required  placeholder="Ingresa el dorsal" >
        `,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value
                ];
            }
        });
        if (formValues) {
            const dorsalNum = parseInt(formValues[1])
            if (jugadores.length >= 1) {
                const dorsalExiste = jugadores.filter((item) => item.dorsal == dorsalNum)
                if (dorsalExiste.length > 0) {
                     Swal.fire({
                        icon: "error",
                        title: "El numero de dorsal ya esta ocupado",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#9e9e9e",
                    })

                    return false
                }

                const existeJugador = jugadores.filter((item) => item._id == response.data._id)
                if (existeJugador.length > 0) {
                    Swal.fire({
                        icon: "error",
                        title: `El jugador ${response.data.nombres} ya hace parte de este equipo`,
                        confirmButtonText: "OK",
                        confirmButtonColor: "#9e9e9e",
                    })

                    return false
                }
            }
            Swal.fire({
                title: "Datos del jugador",
                showCancelButton: true,
                confirmButtonText: "Guardar",
                confirmButtonColor: "#12aed1cd",
                cancelButtonColor: "#9e9e9e",
                text: `Nombre ${response.data.nombres} \n 
          Ficha ${JSON.stringify(formValues[0])} \n
          Dorsal ${JSON.stringify(formValues[1])}`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Jugador guardado correctamente",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#12aed1cd",
                    });
                }
            });
            const newJugador={
                _id: response.data._id,
                nombres: response.data.nombres,
                ficha:formValues[0],
                dorsal: dorsalNum
            }
            return newJugador
            
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: "Jugador no registrado",
            text: `identificacion no encontrada ${idenfiticacion}`,
            confirmButtonText: "Ok",
            confirmButtonColor: "#12aed1cd",
        })
    }
}
