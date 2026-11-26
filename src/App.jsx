import { useEffect, useState } from 'react'
import './App.css'
import { materialesIniciales } from './data/materiales'
import {
  describirMaterial,
  estaDisponible,
  normalizarTexto,
  validarMaterial,
} from './utils/materiales'
import Encabezado from './components/Encabezado'
import FormularioMaterial from './components/FormularioMaterial'
import Filtros from './components/Filtros'
import Resumen from './components/Resumen'
import DetalleMaterial from './components/DetalleMaterial'
import ListaMateriales from './components/ListaMateriales'

const CLAVE = 'materiales'

// lee localStorage al iniciar; si no hay nada o está dañado usa los iniciales
function cargarMateriales() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado == null) return materialesIniciales
    const datos = JSON.parse(guardado)
    return Array.isArray(datos) ? datos : materialesIniciales
  } catch {
    return materialesIniciales
  }
}

function App() {
  const [materiales, setMateriales] = useState(cargarMateriales)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const [idSeleccionado, setIdSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  // guarda en localStorage cada vez que cambia materiales
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(materiales))
  }, [materiales])

  // registrar material (devuelve true si se agregó)
  const agregarMaterial = (datos) => {
    const error = validarMaterial(datos, materiales)
    if (error) {
      setMensaje({ tipo: 'error', texto: error })
      return false
    }

    const nuevo = {
      id: `mat-${Date.now()}`,
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      categoria: datos.categoria,
      ubicacion: datos.ubicacion.trim(),
      reservado: false,
    }

    setMateriales((actuales) => [...actuales, nuevo])
    setMensaje({
      tipo: 'exito',
      texto: `Material registrado: ${describirMaterial(nuevo)}`,
    })
    return true
  }

  // reservar o liberar sin modificar el original
  const cambiarReserva = (id) => {
    setMateriales((actuales) =>
      actuales.map((material) =>
        material.id === id
          ? { ...material, reservado: !material.reservado }
          : material,
      ),
    )
  }

  // filtros combinados (se calculan en cada render, no se guardan en estado)
  const texto = normalizarTexto(busqueda)
  const materialesFiltrados = materiales.filter(
    (material) =>
      normalizarTexto(material.nombre).includes(texto) &&
      (categoriaFiltro === 'Todas' || material.categoria === categoriaFiltro) &&
      (!soloDisponibles || estaDisponible(material)),
  )

  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoriaFiltro('Todas')
    setSoloDisponibles(false)
  }

  // find sobre el arreglo completo, no sobre el filtrado
  const materialSeleccionado = materiales.find(
    (material) => material.id === idSeleccionado,
  )

  // totales calculados
  const total = materiales.length
  const disponibles = materiales.filter(estaDisponible).length
  const reservados = total - disponibles

  const restablecer = () => {
    setMateriales(materialesIniciales)
    limpiarFiltros()
    setIdSeleccionado(null)
    setMensaje(null)
  }

  return (
    <>
      <Encabezado />
      <hr />
      <FormularioMaterial onAgregar={agregarMaterial} mensaje={mensaje} />
      <hr />
      <Filtros
        busqueda={busqueda}
        categoriaFiltro={categoriaFiltro}
        soloDisponibles={soloDisponibles}
        onBusqueda={setBusqueda}
        onCategoria={setCategoriaFiltro}
        onSoloDisponibles={setSoloDisponibles}
        onLimpiar={limpiarFiltros}
      />
      <hr />
      <Resumen
        total={total}
        disponibles={disponibles}
        reservados={reservados}
        resultados={materialesFiltrados.length}
      />
      <button type="button" onClick={restablecer}>
        Restablecer datos iniciales
      </button>
      <hr />
      <DetalleMaterial
        idSeleccionado={idSeleccionado}
        material={materialSeleccionado}
        onCerrar={() => setIdSeleccionado(null)}
      />
      <hr />
      <h2>Materiales</h2>
      <ListaMateriales
        materiales={materialesFiltrados}
        onVerDetalle={setIdSeleccionado}
        onCambiarReserva={cambiarReserva}
      />
    </>
  )
}

export default App
