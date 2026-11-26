# Segunda Vida: banco de materiales para maquetas

Aplicación hecha con React + Vite para registrar, buscar, consultar y reservar
materiales recuperados del taller. Los datos se guardan en el `localStorage`
del navegador (no hay servidor ni base de datos).

## Instalación y ejecución

Requisito: tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

```
npm install
npm run dev
```

Abrir la dirección que muestra la terminal (normalmente http://localhost:5173).

Otros comandos útiles:

```
npm run build      # genera la versión de producción en /dist
npm run preview    # sirve localmente la versión de producción
```

## Dónde está cada funcionalidad

Ejercicio, Archivos 
1. Datos y funciones `src/data/materiales.js`, `src/utils/materiales.js` 
2. Componentes y props `src/components/*`, `src/App.jsx`
3. Formulario y validación `src/components/FormularioMaterial.jsx`, `validarMaterial` en `src/utils/materiales.js`, `agregarMaterial` en `src/App.jsx`
4. Búsqueda y filtros `src/components/Filtros.jsx`, `materialesFiltrados` en `src/App.jsx`
5. Detalle con `find`  `src/components/DetalleMaterial.jsx`, `materialSeleccionado` en `src/App.jsx`
6. Reservar y liberar  `cambiarReserva` en `src/App.jsx`, botón en `src/components/TarjetaMaterial.jsx`
7. Resumen y condiciones  `src/components/Resumen.jsx`, totales en `src/App.jsx`
8. Persistencia | `cargarMateriales`, `useEffect` y `restablecer` en `src/App.jsx`

## Ejercicio 1: Datos y diferentes formas de función

1. ¿Qué hace y en qué archivos está?
   Define los datos de la aplicación y las funciones auxiliares que se usan en
   todo el proyecto. En `src/data/materiales.js` está la lista de categorías
   (`categorias`) y seis materiales de ejemplo (`materialesIniciales`), cada uno
   con `id`, `nombre`, `descripcion`, `categoria`, `ubicacion` y `reservado`.
   En `src/utils/materiales.js` están las funciones `describirMaterial`,
   `estaDisponible`, `normalizarTexto` y `validarMaterial`.

2. ¿Qué conceptos utilicé?
   Arreglos de objetos, `export` / `import` de módulos, y las tres formas de
   escribir funciones: función declarada con `function` (`describirMaterial`),
   flecha con retorno implícito (`estaDisponible`) y flecha con bloque y
   `return` explícito (`normalizarTexto`). También template literals,
   desestructuración (`const { nombre, descripcion, ... } = datos`), `some` y
   los métodos de cadena `trim` y `toLowerCase`.

3. ¿Qué datos recibe y qué resultado produce?
   - `describirMaterial(material)`: recibe un objeto material y devuelve un
     texto como `"Cartón gris (Estante A)"`.
   - `estaDisponible(material)`: recibe un material y devuelve `true` si no
     está reservado y `false` si lo está.
   - `normalizarTexto(texto)`: recibe un texto y devuelve ese texto sin
     espacios en los extremos y en minúsculas.
   - Los datos iniciales no reciben nada: son constantes que otros archivos
     importan.

4. ¿Qué dificultad encontré y cómo la resolví?
   Al principio me confundí con las tres sintaxis de función, sobre todo con
   cuándo una flecha devuelve el valor sola y cuándo necesita `return`. Lo
   resolví probando cada versión con `console.log` y viendo que, con llaves
   `{}`, el `return` es obligatorio, mientras que sin llaves el valor se
   devuelve automáticamente.

5. ¿Utilicé inteligencia artificial? Sí / No.
   Si fue Sí: le pedí a la IA un ejemplo de las tres formas de escribir una
   función en JavaScript aplicado a mi lista de materiales.

## Ejercicio 2: Interfaz dividida en componentes

1. ¿Qué hace y en qué archivos está?
   Divide la interfaz en componentes pequeños y reutilizables. `App.jsx` es el
   componente principal: guarda el estado y reparte datos y funciones. Los
   componentes están en `src/components/`: `Encabezado`, `FormularioMaterial`,
   `Filtros`, `Resumen`, `DetalleMaterial`, `ListaMateriales` y
   `TarjetaMaterial`. `ListaMateriales` crea una `TarjetaMaterial` por cada
   material.

2. ¿Qué conceptos utilicé?
   Componentes funcionales, JSX, props, desestructuración de props, renderizado
   de listas con `map` y `key`, "levantar el estado" (el estado está en `App`,
   el componente padre) y comunicación hijo → padre mediante funciones recibidas
   por props (`onVerDetalle`, `onCambiarReserva`, `onAgregar`, etc.).

3. ¿Qué datos recibe y qué resultado produce?
   - `ListaMateriales` recibe `materiales` (ya filtrados), `onVerDetalle` y
     `onCambiarReserva`; produce una lista de tarjetas o un mensaje si no hay
     coincidencias.
   - `TarjetaMaterial` recibe un `material` y dos funciones; produce una tarjeta
     con nombre, categoría, ubicación, estado y dos botones.
   - `Resumen` recibe números (`total`, `disponibles`, `reservados`,
     `resultados`) y produce el resumen en pantalla.
   - `Encabezado` no recibe nada; solo muestra el título.

4. ¿Qué dificultad encontré y cómo la resolví?
   Me costó entender cómo un componente hijo puede cambiar datos que viven en el
   padre. Lo resolví viendo que los hijos no modifican el estado directamente:
   reciben una función por props (por ejemplo `onCambiarReserva`) y la llaman
   con el `id`; el padre es quien actualiza su estado.

5. ¿Utilicé inteligencia artificial? Sí / No.
   Si fue Sí: Un poco de ayuda ya que no alcanzaba a recordar lo visto en clase



## Ejercicio 3: Formulario controlado y validación

1. ¿Qué hace y en qué archivos está?
   Permite registrar un material nuevo. El formulario está en
   `src/components/FormularioMaterial.jsx`; la validación en `validarMaterial`
   (`src/utils/materiales.js`) y el registro en `agregarMaterial`
   (`src/App.jsx`). Si los datos son válidos, agrega el material y muestra un
   mensaje de éxito; si no, muestra un mensaje de error y conserva lo escrito.

2. ¿Qué conceptos utilicé?
   Formulario controlado (cada campo tiene `value` y `onChange`), un solo estado
   con un objeto para todos los campos, nombres dinámicos de propiedad
   (`[name]: value`), `event.preventDefault()`, spread para copiar objetos y
   arreglos, `Date.now()` para generar un `id`, y renderizado condicional del
   mensaje con `&&`.

3. ¿Qué datos recibe y qué resultado produce?
   El formulario guarda `nombre`, `descripcion`, `categoria` y `ubicacion` y los
   envía a `agregarMaterial`. `validarMaterial(datos, materiales)` devuelve un
   texto de error (o `''` si todo está bien) cuando: algún campo está vacío o
   solo tiene espacios, o ya existe un material con el mismo nombre y la misma
   ubicación. `agregarMaterial` devuelve `true` si agregó el material (y el
   formulario se limpia) o `false` si hubo error (y el formulario conserva los
   datos).

4. ¿Qué dificultad encontré y cómo la resolví?
   El formulario se limpiaba incluso cuando había un error y se perdía lo
   escrito. Lo resolví haciendo que `agregarMaterial` devuelva `true` o `false`
   y limpiando el formulario solo cuando devuelve `true`.

5. ¿Utilicé inteligencia artificial? Sí / No.
   Si fue Sí: Preguntando como poder resolver lo de el formualario


## Ejercicio 4: Búsqueda y filtros combinados

1. ¿Qué hace y en qué archivos está?
   Permite buscar materiales por nombre, filtrarlos por categoría y mostrar solo
   los disponibles, todo al mismo tiempo. Los controles están en
   `src/components/Filtros.jsx` y el cálculo de `materialesFiltrados` en
   `src/App.jsx`. También incluye el botón "Limpiar filtros".

2. **¿Qué conceptos utilicé?**
   `filter` con varias condiciones unidas con `&&`, `includes` para buscar
   coincidencias parciales, normalización de texto, controles controlados
   (`input`, `select`, `checkbox`) y *estado derivado*: la lista filtrada no se
   guarda en estado, se calcula en cada render a partir de `materiales` y los
   tres filtros.

3. ¿Qué datos recibe y qué resultado produce?
   Recibe el texto de búsqueda, la categoría elegida (`'Todas'` por defecto) y
   si el checkbox "Solo disponibles" está marcado. Produce un arreglo nuevo con
   los materiales que cumplen las tres condiciones. Por ejemplo, buscar `cart`
   devuelve "Cartón corrugado" y "Cartón gris". Si no hay coincidencias, se
   muestra "No hay materiales que coincidan con los filtros".

4. ¿Qué dificultad encontré y cómo la resolví?
   Al principio la búsqueda distinguía mayúsculas de minúsculas. Lo resolví
   normalizando tanto el texto escrito como el nombre del material con
   `normalizarTexto` antes de compararlos.

5. ¿Utilicé inteligencia artificial? Sí / No.
   Si fue Sí: Para la normalizarTexto


## Ejercicio 5: Consulta de detalle con find

1. ¿Qué hace y en qué archivos está?
   Al pulsar "Ver detalle" en una tarjeta, se muestra la información completa de
   ese material en un panel aparte. Está en
   `src/components/DetalleMaterial.jsx` y en `materialSeleccionado` de
   `src/App.jsx`. El estado `idSeleccionado` guarda solo el `id`, no el objeto.

2. ¿Qué conceptos utilicé?
   `find`, guardar un identificador en lugar de una copia del objeto (para no
   tener datos duplicados que se desactualicen), renderizado condicional con
   ternarios anidados y props.

3. ¿Qué datos recibe y qué resultado produce?
   `DetalleMaterial` recibe `idSeleccionado`, `material` y `onCerrar`. Produce
   tres salidas posibles: (a) si no hay selección, el mensaje "Selecciona un
   material para consultar sus datos"; (b) si hay `id` pero no se encuentra el
   material, "El material seleccionado ya no existe"; (c) si lo encuentra,
   muestra sus datos completos.

4. ¿Qué dificultad encontré y cómo la resolví?
   Si hacía `find` sobre la lista filtrada, el detalle desaparecía cuando un
   filtro ocultaba ese material. Lo resolví haciendo `find` sobre el arreglo
   completo `materiales`, de modo que el detalle sigue visible aunque cambien
   los filtros.

5. ¿Utilicé inteligencia artificial? Sí / No.
   Si fue Sí: Para ver si tenia algun error en el codigo


## Ejercicio 6: Reservar y liberar sin modificar el estado directamente

1. ¿Qué hace y en qué archivos está?
   Alterna el estado de un material entre "Disponible" y "Reservado". La lógica
   está en `cambiarReserva` (`src/App.jsx`) y el botón en
   `src/components/TarjetaMaterial.jsx`, que muestra "Reservar" o "Liberar"
   según el estado actual.

2. ¿Qué conceptos utilicé?
   Actualización inmutable del estado: `map` para recorrer el arreglo, operador
   spread (`{ ...material, reservado: !material.reservado }`) para crear una
   copia del objeto modificado, operador ternario, y la forma funcional de
   `setMateriales((actuales) => ...)`.

3. ¿Qué datos recibe y qué resultado produce?
   Recibe el `id` del material en el que se hizo clic. Produce un arreglo nuevo
   en el que solo ese material cambia su propiedad `reservado`; el resto de los
   objetos se conservan tal cual. La interfaz se actualiza (texto del botón,
   estilo de la tarjeta, contadores del resumen).

4. ¿Qué dificultad encontré y cómo la resolví?
   Mi primer intento fue escribir `material.reservado = true`, pero la pantalla
   no se actualizaba porque eso modifica el objeto original y React no detecta
   el cambio. Lo resolví creando un objeto nuevo con spread dentro de un `map`.

5. **¿Utilicé inteligencia artificial?** Sí / No.
   Si fue Sí: Para que me ayudara a resolver dudas 

---

## Ejercicio 7: Resumen y mensajes según el estado

1. ¿Qué hace y en qué archivos está?
   Muestra un resumen con el total de materiales, cuántos están disponibles,
   cuántos reservados y cuántos resultados arrojan los filtros. Está en
   `src/components/Resumen.jsx`; los totales se calculan en `src/App.jsx`.

2. ¿Qué conceptos utilicé?
   Estado derivado (los totales se calculan a partir de `materiales`, no se
   guardan en contadores aparte), `length`, `filter` con la función
   `estaDisponible`, renderizado condicional con `&&` (mensaje de "No hay
   materiales disponibles") y con ternario (alternar entre "Se muestran todos
   los materiales" y "Se están aplicando filtros").

3. ¿Qué datos recibe y qué resultado produce?
   Recibe `total`, `disponibles`, `reservados` y `resultados` por props.
   Produce una lista con esos cuatro números y dos mensajes condicionales: uno
   de error si `disponibles === 0`, y otro que depende de si
   `resultados === total`.

4. ¿Qué dificultad encontré y cómo la resolví?
   Al principio pensé en guardar los contadores en estado, pero se
   desincronizaban al reservar o agregar materiales. Lo resolví calculándolos
   en cada render a partir del arreglo `materiales`, que es la única fuente de
   verdad.

5. ¿Utilicé inteligencia artificial? Sí / No.
   Si fue Sí: Para que me explicara el porque se desincronizaban


## Ejercicio 8: Persistencia con JSON y useEffect

1. ¿Qué hace y en qué archivos está?
   Guarda los materiales en el navegador para que no se pierdan al recargar la
   página. Está en `src/App.jsx`: la función `cargarMateriales` (lee al
   iniciar), el `useEffect` (guarda cada cambio) y `restablecer` (vuelve a los
   datos iniciales).

2. ¿Qué conceptos utilicé?
   `localStorage`, `JSON.stringify` y `JSON.parse`, `useEffect` con arreglo de
   dependencias, inicialización perezosa de estado (`useState(cargarMateriales)`
   recibe la función, no su resultado), `try / catch` y `Array.isArray` para
   protegerse de datos dañados.

3. ¿Qué datos recibe y qué resultado produce?
   - `cargarMateriales()` no recibe parámetros. Lee la clave `"materiales"` de
     `localStorage`; si no existe, o el JSON está dañado, o no es un arreglo,
     devuelve `materialesIniciales`.
   - El `useEffect` toma el arreglo `materiales` y lo guarda como texto JSON.
   - `restablecer` vuelve a poner los materiales iniciales y limpia filtros,
     selección y mensaje.

4. ¿Qué dificultad encontré y cómo la resolví?
   Si el `useEffect` guardaba antes de leer, se sobrescribían los datos
   guardados con los iniciales. Lo resolví leyendo `localStorage` en el valor
   inicial del estado (antes del primer render) y dejando que el `useEffect`
   solo se encargue de guardar.

5. ¿Utilicé inteligencia artificial? Sí / No.
   No
---

## Preguntas adicionales

### ¿Qué información llega mediante props y cuál se conserva en estado?

Estado (`useState`): es la información que cambia con el tiempo y que la
aplicación "recuerda". En `App` se conservan `materiales`,
`busqueda`, `categoriaFiltro`, `soloDisponibles`, `idSeleccionado` y `mensaje`.
`FormularioMaterial` tiene además su propio estado local con lo que el
usuario está escribiendo.

Props: es la información que un componente padre le pasa a un hijo, y que el
hijo solo lee. Por ejemplo, `ListaMateriales` recibe `materiales` ya filtrados,
`TarjetaMaterial` recibe un `material`, `Resumen` recibe los totales, y
`Filtros` recibe los valores actuales de los filtros junto con funciones para pedirle al padre que los cambie.

Lo que se calcula a partir del estado no se guarda en estado: se deriva en cada render.

### ¿Por qué filtrar no debe eliminar materiales del arreglo original?

Porque filtrar es solo una forma de *ver* los datos, no de borrarlos. `filter`
devuelve un arreglo nuevo y deja intacto `materiales`. Si el filtro eliminara
elementos del arreglo original, al borrar el texto de búsqueda o limpiar los
filtros esos materiales ya no se podrían recuperar. Además, el arreglo original
es lo que se guarda en `localStorage`, se cuenta en el resumen y se usa para el
detalle: debe contener siempre todos los materiales registrados.

### ¿Por qué actualizar el estado requiere crear nuevos arreglos u objetos?

React decide si debe volver a dibujar la pantalla comparando la referencia del
estado anterior con la del nuevo. Si se modifica el mismo arreglo u objeto, la referencia no cambia, React cree que no hubo cambios y la interfaz no se actualiza . Al crear copias nuevas, por ejemplo `[actuales, nuevo]` o
`{ material, reservado: !material.reservado }`, la referencia es distinta y
React sabe que debe renderizar de nuevo. Además, no mutar el estado evita
efectos secundarios difíciles de rastrear y permite que el `useEffect` que
depende de `materiales` se dispare correctamente.

### ¿Qué hace el useEffect de persistencia y de qué depende?

```jsx
useEffect(() => {
  localStorage.setItem(CLAVE, JSON.stringify(materiales))
}, [materiales])
```

Convierte el arreglo `materiales` a texto JSON y lo guarda en `localStorage`
bajo la clave `"materiales"`. Su arreglo de dependencias es `[materiales]`, por
lo que se ejecuta después del primer render y luego **solo cuando cambia el
arreglo de materiales** (al agregar, reservar, liberar o restablecer). No se
ejecuta cuando cambian la búsqueda, la categoría o la selección, porque eso no
modifica los datos que se quieren guardar. La lectura inicial se hace aparte,
al crear el estado con `useState(cargarMateriales)`.

### ¿Por qué esta aplicación puede cambiar su interfaz sin recargar y por qué eso no significa que tenga un servidor propio?

Es una *Single Page Application*: el navegador descarga una sola vez el HTML y
el JavaScript, y después React actualiza el DOM directamente cuando cambia el
estado, sin pedir una página nueva. Por eso al reservar, filtrar o registrar
algo la pantalla cambia al instante sin recargar.

Eso no implica que haya un servidor propio porque toda la lógica se ejecuta en
el navegador del usuario y los datos se guardan en su `localStorage`. Vite
(`npm run dev`) solo sirve los archivos estáticos durante el desarrollo; no
procesa datos, no tiene base de datos ni API. Consecuencias: los datos viven
únicamente en ese navegador y equipo (otro usuario o dispositivo no los ve), y
se pierden si se borra el almacenamiento del navegador. Para compartir los datos
entre usuarios haría falta un servidor y una base de datos reales.