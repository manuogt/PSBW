import { useState } from 'react'
import { categorias } from '../data/materiales'

const formularioVacio = {
  nombre: '',
  descripcion: '',
  categoria: '',
  ubicacion: '',
}

function FormularioMaterial({ onAgregar, mensaje }) {
  const [datos, setDatos] = useState(formularioVacio)

  const manejarCambio = (event) => {
    const { name, value } = event.target
    setDatos((actuales) => ({ ...actuales, [name]: value }))
  }

  const manejarEnvio = (event) => {
    event.preventDefault()
    const registrado = onAgregar(datos)
    // solo limpia el formulario si se registró bien
    if (registrado) {
      setDatos(formularioVacio)
    }
  }

  return (
    <div>
      <h2>Registrar material</h2>
      <form onSubmit={manejarEnvio}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            name="nombre"
            value={datos.nombre}
            onChange={manejarCambio}
          />
        </div>

        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <input
            id="descripcion"
            name="descripcion"
            value={datos.descripcion}
            onChange={manejarCambio}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={datos.categoria}
            onChange={manejarCambio}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ubicacion">Ubicación:</label>
          <input
            id="ubicacion"
            name="ubicacion"
            value={datos.ubicacion}
            onChange={manejarCambio}
          />
        </div>

        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p className={mensaje.tipo}>{mensaje.texto}</p>}
    </div>
  )
}

export default FormularioMaterial
