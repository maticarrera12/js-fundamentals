// ============================================================
// 01 - EVENT LOOP EN PROFUNDIDAD
// ============================================================
// En intermediate/05-async viste el modelo: call stack, Web APIs,
// task queue y microtask queue. Acá lo llevamos al nivel donde
// podés PREDECIR el orden de ejecución de cualquier código async.
// Este es EL tema de entrevistas de JS — y la causa de los bugs
// async más confusos.
// ============================================================


// --- Las dos colas, en serio ---
// MACROTASKS (task queue): setTimeout, setInterval, I/O, eventos del DOM
// MICROTASKS: .then/.catch/.finally, await, queueMicrotask, MutationObserver
//
// La regla de oro del loop:
// 1. Ejecutá TODO el código síncrono (vaciá el call stack)
// 2. Vaciá TODA la microtask queue (incluyendo las que se agregan en el medio)
// 3. Tomá UNA macrotask, ejecutala
// 4. Volvé al paso 2
//
// "Toda la cola de micro, UNA macro por vuelta" — grabátelo.

console.log('1: síncrono')

setTimeout(() => console.log('5: macrotask'), 0)

Promise.resolve()
    .then(() => console.log('3: microtask 1'))
    .then(() => console.log('4: microtask 2'))  // encadenada: también sale antes

console.log('2: síncrono')

// Orden: 1 → 2 → 3 → 4 → 5
// Las DOS microtasks salen antes que la macrotask, aunque la segunda
// se agregó a la cola DESPUÉS de que el setTimeout ya estaba esperando.


// --- await es azúcar sobre .then ---
// Todo lo que sigue a un await es, en la práctica, un .then:
// se va a la microtask queue. La función se PAUSA y devuelve el control.

async function example() {
    console.log('B: dentro de async, antes del await')   // síncrono!
    await null                                            // acá se corta
    console.log('D: después del await')                   // microtask
}

console.log('A: antes de llamar')
example()
console.log('C: después de llamar')
// Orden: A → B → C → D
//
// El error conceptual clásico: creer que "async" hace que TODA la
// función sea diferida. NO — corre síncrona HASTA el primer await.


// --- El quiz completo (predecí antes de ejecutar) ---

async function quiz() {
    console.log('quiz: inicio')
    await null
    console.log('quiz: después de await')
    setTimeout(() => console.log('quiz: timeout interno'), 0)
}

setTimeout(() => console.log('timeout externo'), 0)
quiz()
Promise.resolve().then(() => console.log('then suelto'))
console.log('fin del script')

// Respuesta (después de los logs de arriba):
// quiz: inicio → fin del script → quiz: después de await →
// then suelto → timeout externo → quiz: timeout interno
//
// ¿Por qué "después de await" sale ANTES que "then suelto"?
// Porque la microtask del await se encoló cuando quiz() llegó al await,
// ANTES de que el .then suelto se registrara. Las colas son FIFO.


// --- queueMicrotask ---
// Encolar una microtask sin inventar una Promise.
// Uso real: diferir trabajo hasta "apenas termine lo síncrono actual",
// garantizando que corre ANTES que cualquier render o timer.

queueMicrotask(() => {
    // típico: disparar callbacks de una librería SIEMPRE async,
    // aunque el valor ya esté disponible — consistencia de orden
})


// --- Starvation: el lado oscuro de las microtasks ---
// Como el loop vacía TODA la microtask queue antes de seguir,
// una microtask que encola otra microtask infinitamente
// BLOQUEA macrotasks, renders y eventos para siempre.

// ⚠️ No ejecutes esto sin un contador de corte:
let spins = 0
function spin() {
    if (++spins < 1000) queueMicrotask(spin)  // con < Infinity: página muerta
}
spin()
// Las macrotasks no tienen este problema: UNA por vuelta,
// el browser puede renderizar y atender eventos entre medio.


// --- setTimeout(fn, 0) no es "ya" ---
// Tres verdades incómodas de los timers:
// 1. El delay es un MÍNIMO, no una garantía — espera su turno en la cola.
// 2. Browsers clampean timers anidados a ~4ms después de 5 niveles.
// 3. En tabs en background el clamp puede ser de 1000ms o más.
//
// setTimeout(fn, 0) significa: "ejecutá esto en la PRÓXIMA vuelta
// del loop, después del render pendiente". Es una herramienta de
// ORDEN, no de tiempo.


// --- Partir trabajo pesado (la aplicación práctica) ---
// JS es single-threaded: un cálculo de 2 segundos congela TODO
// (clicks, scroll, animaciones). La solución clásica: partirlo
// en pedazos y ceder el control entre pedazo y pedazo.

async function processBigArray(items, chunkSize = 1000) {
    const results = []
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize)
        results.push(...chunk.map((x) => x * 2))   // el trabajo real

        // Ceder el control: una macrotask deja respirar al browser.
        // (await null NO sirve acá — las microtasks no dejan renderizar)
        await new Promise((resolve) => setTimeout(resolve, 0))
    }
    return results
}
// La versión moderna de esto es scheduler.yield() (Chrome) y,
// para trabajo REALMENTE pesado, Web Workers — otro thread de verdad.


// --- Node vs browser ---
// El modelo macro/micro es el mismo. Diferencias que importan:
// - Node agrega process.nextTick: corre ANTES que las microtasks
//   (evitalo en código nuevo — usa queueMicrotask)
// - Node agrega setImmediate: macrotask que corre al final de la
//   vuelta actual, antes que los timers de la siguiente
// - El browser agrega requestAnimationFrame: corre justo ANTES
//   del render — para animaciones, no para lógica


// ============================================================
// DESAFÍOS
// ============================================================

// 1. Predecí el orden EXACTO de los logs sin ejecutar. Después verificá:
//    setTimeout(() => console.log('a'))
//    Promise.resolve().then(() => {
//        console.log('b')
//        setTimeout(() => console.log('c'))
//        return Promise.resolve()
//    }).then(() => console.log('d'))
//    console.log('e')
// Tu predicción acá, y luego la verificación:


// 2. Escribí una función "yieldToBrowser()" que devuelva una Promise
//    que se resuelve en la PRÓXIMA macrotask, y usala para partir
//    un loop que sume los primeros 10 millones de números en chunks.
// Tu código acá:


// 3. Explicá con tus palabras (en un comentario) por qué esto
//    congela la página pero la versión con setTimeout no:
//    function bad() { queueMicrotask(bad) }
//    function ok()  { setTimeout(ok, 0) }
// Tu explicación acá:
