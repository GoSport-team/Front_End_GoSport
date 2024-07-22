import React, { useState } from 'react';
import axios from 'axios';
import './styles/editor.css';

const CreateCampeonato = () => {
  const [nombreDiciplinas, setNombreDiciplinas] = useState('');
  const [estadoCampeonato, setEstadoCampeonato] = useState('');
  const [nombreCampeonato, setNombreCampeonato] = useState('');
  const [tamanoEquipos, setTamanoEquipos] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tipoCampeonato, setTipoCampeonato] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [inicioInscripcion, setInicioInscripcion] = useState('');
  const [finInscripcion, setFinInscripcion] = useState('');
  const [añoCreacion, setAñoCreacion] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campeonatoData = {
      nombreDiciplinas,
      estadoCampeonato,
      nombreCampeonato,
      tamanoEquipos,
      fechaInicio,
      fechaFin,
      tipoCampeonato,
      descripcion,
      inicioInscripcion,
      finInscripcion,
      añoCreacion,
    };

    try {
      const response = await axios.post('http://localhost:3001/campeonato/', campeonatoData);
      console.log('Respuesta del servidor:', response.data);

    } catch (error) {
      console.error('Error al crear el campeonato:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      setError('Error al crear el campeonato. Inténtalo de nuevo.');
    }
  };

  return (

    <div className='contenedor'>

      <section class="container">
        <div className='header-create'>
          <header>¡Crea tu Campeonato! Completa el formulario a continuación</header>
        </div>
        <form class="form" onSubmit={handleSubmit}>
          <div class="input-box label-name">
            <label className='name-label'>Nombre Campeonato</label>
            <input
              required
              placeholder="ingresa nombre de campeonato"
              type="text"
              onChange={(e) => setNombreCampeonato(e.target.value)}
            />
          </div>

          <div class="column">
            <div class="input-box">
              <label>Disciplina</label>
              <input
                required
                placeholder="Futbol sala"
                type="text"
                onChange={(e) => setnombreDiciplinas(e.target.value)}
              />
            </div>
            <div class="input-box">
              <label>Estado Campeonato</label>
              <input
                required
                placeholder="Inscrito"
                type="text"
                onChange={(e) => setEstadoCampeonato(e.target.value)}
              />
            </div>
            <div class="input-box">
              <label>Tamaño equipo</label>
              <input
                required
                placeholder="numero participantes"
                type="number"
                onChange={(e) => setTamanoEquipos(e.target.value)}
              />
            </div>
          </div>

          <div class="column init-label">
            <div class="input-box">
              <label>Fecha de Inicio</label>
              <input required
                placeholder="Enter birth date"
                type="date"
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div class="input-box">
              <label>Fin de Fin</label>
              <input required
                placeholder="Enter birth date"
                type="date"
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          </div>

          <div class="column init-label">
            <div class="input-box">
              <label>Tipo campeonato</label>
              <input required
                placeholder="Recreacional"
                type="text"
                onChange={(e) => setTipoCampeonato(e.target.value)}
              />
            </div>
            <div class="input-box">
              <label>Año creacios</label>
              <input required
                placeholder="2024"
                type="text"
                onChange={(e) => setAñoCreacion(e.target.value)}
              />
            </div>
          </div>
          <div class="input-box address init-label">
            <label>Descripción</label>
            <input require
              placeholder="Ingrese una breve descripción del campeonato"
              type="text"
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div class="column init-label">
            <div class="input-box">
              <label>Inicio Inscripcion</label>
              <input required
                placeholder="Enter birth date"
                type="date"
                onChange={(e) => setInicioInscripcion(e.target.value)}
              />
            </div>
            <div class="input-box">
              <label>Fin de Inscripción</label>
              <input required
                placeholder="Enter birth date"
                type="date"
                onChange={(e) => setFinInscripcion(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Crear campeonato</button>
        </form>
      </section>
    </div>
  );
};

export default CreateCampeonato;
