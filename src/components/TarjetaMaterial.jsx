function TarjetaMaterial({ material, onVerDetalle, onCambiarReserva }) {
  return (
    <li className={material.reservado ? 'reservado' : ''}>
      <span>{material.nombre}</span> - <span>{material.categoria}</span> -{' '}
      <span>{material.ubicacion}</span> -{' '}
      <span>{material.reservado ? 'Reservado' : 'Disponible'}</span>{' '}
      <button type="button" onClick={() => onVerDetalle(material.id)}>
        Ver detalle
      </button>
      <button type="button" onClick={() => onCambiarReserva(material.id)}>
        {material.reservado ? 'Liberar' : 'Reservar'}
      </button>
    </li>
  )
}

export default TarjetaMaterial
