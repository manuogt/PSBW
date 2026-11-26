function Resumen({ total, disponibles, reservados, resultados }) {
  return (
    <div>
      <h2>Resumen</h2>
      <p>Total registrados: {total}</p>
      <p>Disponibles: {disponibles}</p>
      <p>Reservados: {reservados}</p>
      <p>Resultados de los filtros: {resultados}</p>

      {/* solo aparece si no hay disponibles */}
      {disponibles === 0 && (
        <p className="error">No hay materiales disponibles.</p>
      )}

      <p>
        {resultados === total
          ? 'Se muestran todos los materiales.'
          : 'Se están aplicando filtros.'}
      </p>
    </div>
  )
}

export default Resumen
