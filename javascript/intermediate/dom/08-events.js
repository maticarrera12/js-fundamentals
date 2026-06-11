// ============================================================
// 08 - EVENTOS DEL DOM
// ============================================================
// La mitad que le faltaba a 07-dom: el DOM no es solo leer y
// modificar nodos — es REACCIONAR a lo que hace el usuario.
// Bubbling y delegation son, además, la base de cómo React
// maneja eventos por debajo.
// ============================================================


// --- addEventListener ---
// Tres formas históricas de escuchar un evento — solo UNA es correcta:
//
// <button onclick="doSomething()">     ❌ HTML mezclado con JS
// button.onclick = doSomething         ❌ solo UN handler — el segundo PISA al primero
// button.addEventListener('click', fn) ✓ múltiples handlers, opciones, removible

const button = document.querySelector('#save-btn')

button.addEventListener('click', () => {
    console.log('guardando...')
})

// El handler recibe el objeto EVENT con toda la info:
button.addEventListener('click', (event) => {
    console.log(event.type)      // 'click'
    console.log(event.target)    // el elemento donde OCURRIÓ el evento
    console.log(event.clientX)   // coordenadas del mouse, teclas modificadoras, etc.
})


// --- Remover listeners ---
// removeEventListener necesita LA MISMA referencia de función.
// Una arrow inline no se puede remover — nadie tiene su referencia:

function onSave() {
    console.log('guardado')
}
button.addEventListener('click', onSave)
button.removeEventListener('click', onSave)   // ✓ misma referencia

// button.addEventListener('click', () => {...})
// button.removeEventListener('click', () => {...})  ❌ son DOS funciones distintas

// Las opciones modernas evitan el problema:
button.addEventListener('click', onSave, { once: true })   // se auto-remueve tras ejecutarse

const controller = new AbortController()
button.addEventListener('click', onSave, { signal: controller.signal })
button.addEventListener('mouseover', onSave, { signal: controller.signal })
controller.abort()   // UN abort desregistra TODOS los listeners con esa señal
// (el patrón de cleanup que viste en advanced/03-memory)


// --- target vs currentTarget ---
// La confusión clásica:
// event.target        → donde el evento OCURRIÓ (puede ser un hijo)
// event.currentTarget → el elemento que tiene EL LISTENER

const card = document.querySelector('.card')
card.addEventListener('click', (event) => {
    // si clickeás el <span> de adentro de la card:
    console.log(event.target)         // el <span>
    console.log(event.currentTarget)  // la .card — siempre quien escucha
})


// --- Bubbling: los eventos suben ---
// Un click en un <span> dentro de un <p> dentro de un <div> dispara
// los listeners de click de LOS TRES, de adentro hacia afuera:
// span → p → div → body → html → document → window
//
// Eso es bubbling. No es un defecto — es LA feature que hace posible
// la delegation (abajo). Casi todos los eventos burbujean
// (excepciones: focus, blur, mouseenter/leave).

// Frenar la subida (usalo POCO — rompe la delegation de los padres):
// event.stopPropagation()
//
// La fase inversa (capturing, de afuera hacia adentro) existe pero
// casi nunca la usás: addEventListener(..., { capture: true })


// --- Event delegation: EL patrón ---
// Problema: una lista con 500 items clickeables.
// ❌ 500 listeners = memoria, y los items NUEVOS no tienen listener.
// ✓ UN listener en el contenedor — el bubbling te trae todos los clicks:

const list = document.querySelector('#todo-list')

list.addEventListener('click', (event) => {
    // closest: sube desde el target hasta matchear el selector (o null).
    // Más robusto que mirar event.target directo — funciona aunque
    // el click haya caído en un hijo del item (un ícono, un span).
    const item = event.target.closest('li[data-id]')
    if (!item || !list.contains(item)) return

    console.log('click en item', item.dataset.id)
})

// Beneficios: un solo listener, los items agregados dinámicamente
// funcionan GRATIS, y el cleanup es trivial (un solo remove).
// React hace exactamente esto: UN listener arriba de tu app que
// despacha a tus onClick — por eso sus eventos son "sintéticos".


// --- preventDefault: frenar el comportamiento nativo ---
// Algunos elementos HACEN cosas por defecto: un link navega,
// un form recarga la página, un checkbox se marca.

const link = document.querySelector('a.tab')
link.addEventListener('click', (event) => {
    event.preventDefault()    // no navegues
    console.log('abro el tab con JS')
})

// stopPropagation ≠ preventDefault — son independientes:
// stopPropagation → no avises a los padres (bubbling)
// preventDefault  → no hagas lo que harías nativamente


// --- Formularios: el evento submit ---
// SIEMPRE escuchá submit en el FORM, no click en el botón:
// submit captura también el Enter en un input, y permite validación nativa.

const form = document.querySelector('#signup-form')

form.addEventListener('submit', (event) => {
    event.preventDefault()              // sin esto: recarga de página

    const data = new FormData(form)     // todos los campos por name (advanced/06)
    console.log(Object.fromEntries(data))

    form.reset()
})

// input vs change en campos:
// 'input'  → en CADA tecla / modificación (búsqueda en vivo, contadores)
// 'change' → al confirmar (blur del input, elegir opción de un select)


// --- Teclado ---
document.addEventListener('keydown', (event) => {
    console.log(event.key)    // 'Enter', 'Escape', 'a', 'ArrowUp'...

    if (event.key === 'Escape') {
        console.log('cerrar modal')
    }
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()           // Cmd/Ctrl+K — el command palette
        console.log('abrir buscador')
    }
})
// event.key es lo que casi siempre querés (el carácter/nombre de la tecla).
// event.code es la tecla FÍSICA ('KeyK') — para juegos.


// --- Custom events: tu propio sistema de mensajes ---
// Podés disparar eventos propios con datos — desacopla componentes
// que no se conocen entre sí:

const cart = document.querySelector('#cart')

// Quien emite:
button.addEventListener('click', () => {
    cart.dispatchEvent(new CustomEvent('item:added', {
        detail: { productId: 42, qty: 1 },   // tus datos viajan en detail
        bubbles: true,                        // que suba como evento nativo
    }))
})

// Quien escucha (puede estar en otro módulo, ni conoce al botón):
document.addEventListener('item:added', (event) => {
    console.log('agregado al carrito:', event.detail.productId)
})


// ============================================================
// DESAFÍOS
// ============================================================

// 1. Armá una lista <ul> con 5 <li data-id="..."> y un botón
//    "agregar item". Con UN SOLO listener (delegation):
//    - click en un item lo marca/desmarca (classList.toggle)
//    - verificá que los items agregados después también responden
// Tu código acá (o en un .html aparte):


// 2. Implementá "Escape cierra, click afuera cierra" para un modal:
//    - keydown Escape → cerrar
//    - click en el fondo oscuro (pero NO dentro del modal) → cerrar
//    - registrá todos los listeners con UNA señal de AbortController
//      y abortala al cerrar (cero leaks)
//    Tip: para "click afuera", event.target y .contains.
// Tu código acá:


// 3. Creá un formulario con validación en vivo:
//    - evento 'input' en el campo email → mostrar/ocultar mensaje de error
//    - evento 'submit' → preventDefault + loguear FormData solo si es válido
//    - al enviarse OK, despachá un CustomEvent 'form:success' con los
//      datos en detail, y escuchalo desde document con console.table
// Tu código acá:
