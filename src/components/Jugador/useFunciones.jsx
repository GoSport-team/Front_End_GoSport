import axios from 'axios';
import Swal from 'sweetalert2'

export const eliminarJugador=(indice, jugadores, user)=> {
    if(jugadores[indice].nombreJugador == user.nombres){
      return  Swal.fire({
        title: "Este jugador no se puede borrar por que es el capitan",
        confirmButtonText: "OK",
        confirmButtonColor: "#E42245",
      });
    }
    if (jugadores && jugadores.length > indice) {
      Swal.fire({
        title: "Deseas eliminar este jugador",
        showCancelButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "#04ff00",
        cancelButtonColor: "#d33",
        text: `Nombre ${jugadores[indice].nombreJugador} \n `,
      }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title:"Jugador borrado correctamente",
              icon:"success",
              confirmButtonText: "OK",
        confirmButtonColor: "#0837C0",
            });
          jugadores.splice(indice, 1);
        }
    });
    return jugadores
    }
  }



export  const searchJugador = async (idenfiticacion, jugadores) => {
    try {
        const response = await axios.get(`http://localhost:3001/usuarios/identificacion/${idenfiticacion}`)
        
        const responseValidador = await axios.get(`http://localhost:3001/equipoInscripto/validarJugador/${response.data._id}`)
        if (responseValidador.data.msg == "Jugador ya existe en un equipo") {
            Swal.fire({
                icon: "error",
                title: "Jugador ya existe en un equipo",
            })

            return false
        }

        const { value: formValues } = await Swal.fire({
            title: "Deseas agregar a este jugador",
            confirmButtonText: "OK",
            confirmButtonColor: "#0837C0",
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
                        confirmButtonColor: "#E42245",
                    })

                    return false
                }

                const existeJugador = jugadores.filter((item) => item._id == response.data._id)
                if (existeJugador.length > 0) {
                    Swal.fire({
                        icon: "error",
                        title: `El jugador ${response.data.nombres} ya hace parte de este equipo`,
                        confirmButtonText: "OK",
                        confirmButtonColor: "#E42245",
                    })

                    return false
                }
            }
            Swal.fire({
                title: "Datos del jugador",
                showCancelButton: true,
                confirmButtonText: "Save",
                confirmButtonColor: "#04ff00",
                cancelButtonColor: "#d33",
                text: `Nombre ${response.data.nombres} \n 
          Ficha ${JSON.stringify(formValues[0])} \n
          Dorsal ${JSON.stringify(formValues[1])}`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Jugador guardado correctamente",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#0837C0",
                    });
                }
            });
            const newJugador={
                _id: response.data._id,
                nombreJugador: response.data.nombres,
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
            confirmButtonColor: "#0837C0",
        })
    }
}
