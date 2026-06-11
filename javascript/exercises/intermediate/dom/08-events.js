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
