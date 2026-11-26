// 1) Función declarada con function
export function describirMaterial(material) {
  return `${material.nombre} (${material.ubicacion})`
}

// 2) Flecha con retorno implícito
export const estaDisponible = (material) => !material.reservado

// 3) Flecha con bloque y return explícito
export const normalizarTexto = (texto) => {
  return texto.trim().toLowerCase()
}

// Devuelve un texto de error, o '' si los datos son válidos
export function validarMaterial(datos, materiales) {
  const { nombre, descripcion, categoria, ubicacion } = datos

  if (
    !normalizarTexto(nombre) ||
    !normalizarTexto(descripcion) ||
    !normalizarTexto(categoria) ||
    !normalizarTexto(ubicacion)
  ) {
    return 'Todos los campos son obligatorios y no pueden tener solo espacios.'
  }

  const duplicado = materiales.some(
    (material) =>
      normalizarTexto(material.nombre) === normalizarTexto(nombre) &&
      normalizarTexto(material.ubicacion) === normalizarTexto(ubicacion),
  )

  if (duplicado) {
    return 'Ya existe un material con ese nombre en esa ubicación.'
  }

  return ''
}
