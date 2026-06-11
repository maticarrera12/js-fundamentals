// ============================================================
// DESAFÍOS
// ============================================================

// 1. Escribí "fetchJson(url, { timeoutMs, retries })" combinando
//    fetchWithTimeout + withRetry de este archivo en una sola
//    función reusable. Pensá: ¿el timeout va ADENTRO o AFUERA del retry?
// Tu código acá:


// 2. Implementá "debounceAsync(fn, ms)" donde fn es async y la
//    función devuelta retorna una Promise del PRÓXIMO resultado real.
//    Las llamadas canceladas deben resolver con ese mismo resultado
//    (todas las que esperan reciben el valor de la ejecución final).
// Tu código acá:


// 3. Modificá mapWithConcurrency para que acepte { stopOnError: true }:
//    si una tarea falla, los workers dejan de tomar tareas nuevas
//    y la función rechaza con ese error.
// Tu código acá:
