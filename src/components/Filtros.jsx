import { categorias } from '../data/materiales'

function Filtros({
  busqueda,
  categoriaFiltro,
  soloDisponibles,
  onBusqueda,
  onCategoria,
  onSoloDisponibles,
  onLimpiar,
}) {
  return (
    <div>
      <h2>Buscar y filtrar</h2>

      <div>
        <label htmlFor="busqueda">Buscar:</label>
        <input
          id="busqueda"
          value={busqueda}
          onChange={(event) => onBusqueda(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="categoria-filtro">Categoría:</label>
        <select
          id="categoria-filtro"
          value={categoriaFiltro}
          onChange={(event) => onCategoria(event.target.value)}
        >
          <option value="Todas">Todas</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          id="solo-disponibles"
          type="checkbox"
          checked={soloDisponibles}
          onChange={(event) => onSoloDisponibles(event.target.checked)}
        />
        <label htmlFor="solo-disponibles">Solo disponibles</label>
      </div>

      <button type="button" onClick={onLimpiar}>
        Limpiar filtros
      </button>
    </div>
  )
}

export default Filtros
