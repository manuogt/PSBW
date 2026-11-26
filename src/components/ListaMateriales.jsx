import TarjetaMaterial from './TarjetaMaterial'

function ListaMateriales({ materiales, onVerDetalle, onCambiarReserva }) {
  if (materiales.length === 0) {
    return <p>No hay materiales que coincidan con los filtros</p>
  }

  return (
    <ul>
      {materiales.map((material) => (
        <TarjetaMaterial
          key={material.id}
          material={material}
          onVerDetalle={onVerDetalle}
          onCambiarReserva={onCambiarReserva}
        />
      ))}
    </ul>
  )
}

export default ListaMateriales
