// ============================================================
// 05 - PROGRAMACIÓN ASÍNCRONA
// ============================================================
// JavaScript es single-threaded pero no bloqueante.
// El event loop es el mecanismo que hace posible manejar
// I/O, timers y red sin congelar la ejecución del programa.
// ============================================================


// --- Código síncrono ---
// Se ejecuta línea a línea, bloqueando hasta terminar cada una.

console.log('inicio')
for (let i = 0; i < 3; i++) console.log(i)
console.log('fin')
// Siempre en orden: inicio, 0, 1, 2, fin


// --- Event loop ---
// Componentes:
//
// Call stack    → donde se ejecutan las funciones, en orden LIFO (último en entrar, primero en salir)
// Web APIs      → timers, fetch, DOM events — los maneja el browser/Node fuera del stack
// Task queue    → callbacks de Web APIs esperando ejecutarse (macrotasks)
// Microtask queue → callbacks de Promesas (.then, async/await) — tienen PRIORIDAD sobre task queue
//
// Flujo:
// 1. JS ejecuta el código síncrono en el call stack
// 2. Las operaciones asíncronas se delegan a Web APIs
// 3. Cuando terminan, su callback va a task queue (o microtask queue)
// 4. Cuando el call stack queda vacío, el event loop vacía primero
//    la microtask queue, luego toma una tarea de task queue
//
// Por eso: las Promesas (.then) se resuelven ANTES que setTimeout,
// aunque el setTimeout tenga 0ms.

setTimeout(() => console.log('timeout'), 0)
Promise.resolve().then(() => console.log('microtask'))
console.log('síncrono')
// Orden: 'síncrono' → 'microtask' → 'timeout'


// --- Timers: setTimeout y setInterval ---
// Las dos Web APIs de scheduling — las venís viendo en los ejemplos,
// acá está su API completa.

// setTimeout: ejecutá UNA vez, después de (al menos) N ms.
// Devuelve un ID que sirve para cancelarlo.
const timeoutId = setTimeout(() => console.log('hola con delay'), 1000)
clearTimeout(timeoutId)   // cancelado — nunca se ejecuta

// setInterval: ejecutá CADA N ms hasta que alguien lo cancele.
// Si no guardás el ID, no lo podés frenar nunca (leak clásico).
let ticks = 0
const intervalId = setInterval(() => {
    ticks++
    console.log(`tick ${ticks}`)
    if (ticks === 3) clearInterval(intervalId)   // siempre tené plan de salida
}, 1000)

// Argumentos extra: se le pasan al callback (mejor que envolver en arrow)
setTimeout((name, role) => console.log(name, role), 500, 'Matias', 'admin')

// Dos gotchas:
// 1. El delay es un MÍNIMO, no una promesa de puntualidad — el callback
//    espera su turno en la cola (lo profundizás en advanced/01-event-loop).
// 2. setTimeout(obj.method, 1000) pierde el this — pasá una arrow:
//    setTimeout(() => obj.method(), 1000)


// --- Callbacks ---
// Una función que se pasa como argumento y se ejecuta cuando
// una operación asíncrona termina. El origen de todo en JS asíncrono.

function fetchUser(id, onSuccess, onError) {
    setTimeout(() => {
        if (id <= 0) {
            onError('ID inválido')
            return
        }
        onSuccess({ id, name: 'Matias', role: 'admin' })
    }, 500)
}

fetchUser(1, user => console.log('Usuario:', user), err => console.error(err))

// Callback hell: cuando las operaciones dependen unas de otras,
// los callbacks anidados crecen hacia la derecha y se vuelven imposibles de mantener.

function step1(cb) { setTimeout(() => { console.log('paso 1'); cb() }, 300) }
function step2(cb) { setTimeout(() => { console.log('paso 2'); cb() }, 300) }
function step3(cb) { setTimeout(() => { console.log('paso 3'); cb() }, 300) }

step1(() => {
    step2(() => {
        step3(() => {
            console.log('todos los pasos — infierno de callbacks')
            // imaginate más niveles...
        })
    })
})


// --- Promesas ---
// Un objeto que representa un valor que estará disponible en el futuro.
// Tres estados: pending → fulfilled | rejected (estados finales, no cambian).
// Resuelve el callback hell con encadenamiento horizontal.

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function fetchData(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) reject(new Error('Algo salió mal'))
            else resolve({ id: 1, title: 'Post de ejemplo' })
        }, 300)
    })
}

// Encadenamiento: cada .then recibe el valor del anterior
fetchData()
    .then(data => {
        console.log('Datos:', data)
        return data.id  // lo que retornás en .then pasa al siguiente
    })
    .then(id => console.log('ID:', id))
    .catch(err => console.error('Error:', err.message))  // captura cualquier error del chain
    .finally(() => console.log('Finalizado'))            // siempre se ejecuta


// --- Async / Await ---
// Syntactic sugar sobre Promesas. El código se lee como síncrono pero no bloquea.
// async marca la función — siempre devuelve una Promesa.
// await "pausa" la función hasta que la Promesa se resuelva.
// Solo podés usar await dentro de una función async.

async function processSteps() {
    await wait(500)
    console.log('paso 1 async')
    await wait(500)
    console.log('paso 2 async')
    await wait(500)
    console.log('paso 3 async')
}

// Manejo de errores: try/catch en vez de .catch()
async function loadUser(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const user = await res.json()
        return user
    } catch (err) {
        console.error('Error al cargar usuario:', err.message)
        return null
    }
}


// --- Promise combinators ---
// Cuatro métodos para manejar múltiples promesas a la vez.
// Elegís según tu caso de uso.

const p1 = new Promise(res => setTimeout(() => res('usuario'),   200))
const p2 = new Promise(res => setTimeout(() => res('permisos'),  100))
const p3 = new Promise(res => setTimeout(() => res('historial'), 300))

// Promise.all → TODAS deben cumplirse. Si una falla, rechaza todo.
// Úsalo cuando NECESITÁS todos los resultados para continuar.
Promise.all([p1, p2, p3]).then(([user, perms, history]) => {
    console.log('Todos:', user, perms, history)
})

// Promise.allSettled → espera a TODAS sin importar si fallan.
// Devuelve { status: 'fulfilled' | 'rejected', value | reason } por cada una.
// Úsalo cuando querés procesar todas las respuestas aunque alguna falle.
const requests = [
    Promise.resolve('ok'),
    Promise.reject('error de red'),
    Promise.resolve('también ok')
]
Promise.allSettled(requests).then(results => {
    results.forEach(r => {
        if (r.status === 'fulfilled') console.log('✓', r.value)
        else                          console.log('✗', r.reason)
    })
})

// Promise.race → la primera que termine (fulfilled O rejected) gana.
// Úsalo para timeouts o para cancelar si algo tarda demasiado.
const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
const dataFetch = new Promise(res => setTimeout(() => res('datos'), 500))
Promise.race([dataFetch, timeout]).then(console.log).catch(console.error)

// Promise.any → la primera que se CUMPLA gana (ignora rechazos).
// Solo rechaza si TODAS fallan (AggregateError).
// Úsalo para intentar múltiples fuentes en paralelo y quedarte con la más rápida.
const sources = [
    Promise.reject('fuente 1 caída'),
    Promise.resolve('fuente 2 ok'),
    Promise.resolve('fuente 3 ok'),
]
Promise.any(sources).then(first => console.log('Primero en responder:', first))


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Convertí el "callback hell" de los tres pasos de arriba
//    en una cadena de promesas. Luego, reescribilo una vez más
//    usando async/await. Comparalos — ¿cuál es más legible?
// Tu código acá:


// 2. Escribí una función "withTimeout(promise, ms)" que devuelva
//    una promesa que rechace con 'Timeout' si la promesa original
//    no se resuelve en ms milisegundos.
//    Pista: usá Promise.race.
// Tu código acá:


// 3. Dado un array de IDs de usuarios [1, 2, 3, 4, 5],
//    cargalos en PARALELO usando Promise.all + fetch a jsonplaceholder.
//    Luego cargalos en SECUENCIA (uno por uno) usando un bucle con await.
//    Medí el tiempo de cada enfoque con console.time / console.timeEnd.
// Tu código acá:
