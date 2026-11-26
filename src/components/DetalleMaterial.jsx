function DetalleMaterial({ idSeleccionado, material, onCerrar }) {
  return (
    <div>
      <h2>Detalle</h2>

      {idSeleccionado === null ? (
        <p>Selecciona un material para consultar sus datos</p>
      ) : !material ? (
        <>
          <p>El material seleccionado ya no existe.</p>
          <button type="button" onClick={onCerrar}>
            Cerrar
          </button>
        </>
      ) : (
        <>
          <p>Nombre: {material.nombre}</p>
          <p>ID: {material.id}</p>
          <p>Descripción: {material.descripcion}</p>
          <p>Categoría: {material.categoria}</p>
          <p>Ubicación: {material.ubicacion}</p>
          <p>Estado: {material.reservado ? 'Reservado' : 'Disponible'}</p>
          <button type="button" onClick={onCerrar}>
            Cerrar
          </button>
        </>
      )}
    </div>
  )
}

export default DetalleMaterial
