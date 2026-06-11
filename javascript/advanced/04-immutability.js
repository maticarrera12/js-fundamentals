// ============================================================
// 04 - INMUTABILIDAD Y ARRAYS MODERNOS
// ============================================================
// En basic/12 viste que los objetos van por referencia. Acá está
// la consecuencia práctica: POR QUÉ mutar datos compartidos causa
// los bugs más difíciles de rastrear, y las herramientas modernas
// para trabajar sin mutar. Este archivo es EL prerequisito
// conceptual de React — su modelo entero depende de esto.
// ============================================================


// --- El bug que la mutación habilita ---

const defaultSettings = { theme: 'dark', fontSize: 14 }

function createUserSettings(overrides) {
    const settings = defaultSettings          // ⚠️ NO es una copia — es la MISMA referencia
    Object.assign(settings, overrides)
    return settings
}

const userA = createUserSettings({ fontSize: 18 })
const userB = createUserSettings({ theme: 'light' })

console.log(defaultSettings)   // { theme: 'light', fontSize: 18 } — ¡CORROMPIDO!
console.log(userA === userB)   // true — todos son el mismo objeto

// Mutaste el default compartido. El bug aparece LEJOS de esta función,
// en cualquier código que use defaultSettings — horas de debugging.

// La versión correcta — crear un objeto NUEVO:
function createUserSettingsSafe(overrides) {
    return { ...defaultSettings, ...overrides }
}


// --- Copia superficial vs profunda ---
// Spread y Object.assign copian UN nivel. Los objetos anidados
// siguen siendo referencias COMPARTIDAS:

const original = { name: 'Matias', address: { city: 'Buenos Aires' } }
const shallow = { ...original }

shallow.name = 'Carla'                  // ok — primitivo, nivel 1
shallow.address.city = 'Córdoba'        // ⚠️ también cambió original.address.city

console.log(original.address.city)      // 'Córdoba' — el leak de la copia superficial

// Copia profunda real (basic/21 lo presentó — acá el contexto de uso):
const deep = structuredClone(original)
deep.address.city = 'Rosario'
console.log(original.address.city)      // 'Córdoba' — intacto ✓


// --- Los métodos mutantes y sus reemplazos inmutables (ES2023) ---
// Histórico problema de JS: sort, reverse y splice MUTAN el array.
// El clásico bug: ordenar una prop de React y romper el estado.

const scores = [50, 90, 10]

// const sorted = scores.sort()  ⚠️ ordena scores EN EL LUGAR y se devuelve a sí mismo

// Desde ES2023 existen las versiones inmutables — devuelven array NUEVO:
const sorted = scores.toSorted((x, y) => x - y)   // [10, 50, 90]
const reversed = scores.toReversed()              // [10, 90, 50]
const replaced = scores.with(0, 99)               // [99, 90, 10] — reemplaza índice
const spliced = scores.toSpliced(1, 1)            // [50, 10] — quita sin mutar

console.log(scores)                               // [50, 90, 10] — intacto ✓

// Equivalencias para que reentrenes la memoria muscular:
//   arr.sort(fn)        → arr.toSorted(fn)
//   arr.reverse()       → arr.toReversed()
//   arr.splice(...)     → arr.toSpliced(...)
//   arr[i] = x          → arr.with(i, x)
//   arr.push(x)         → [...arr, x]
//   arr.pop()           → arr.slice(0, -1)


// --- Búsquedas modernas: findLast, at ---
const events = [
    { type: 'login', user: 'ana' },
    { type: 'click', user: 'ana' },
    { type: 'login', user: 'leo' },
]

const lastLogin = events.findLast((e) => e.type === 'login')    // { login, leo }
const lastEvent = events.at(-1)                                  // índices negativos ✓


// --- Updates inmutables anidados ---
// El patrón que vas a escribir mil veces en React: "cambiá esta
// propiedad anidada SIN tocar el resto". Spread en cada nivel
// del camino, referencia compartida para lo que no cambia:

const state = {
    user: { name: 'Matias', prefs: { theme: 'dark', lang: 'es' } },
    cart: { items: [{ id: 1, qty: 2 }], total: 100 },
}

const newState = {
    ...state,                          // cart se REUSA (misma referencia — barato)
    user: {
        ...state.user,                 // name se reusa
        prefs: { ...state.user.prefs, theme: 'light' },   // solo esto es nuevo
    },
}

console.log(newState.cart === state.cart)   // true — sin copia innecesaria
console.log(newState.user === state.user)   // false — el camino cambiado es nuevo

// ¿Por qué importa? Porque comparar referencias es O(1):
// React decide si re-renderizar con newState.user !== state.user —
// no necesita comparar el contenido. La inmutabilidad convierte
// "¿cambió algo?" en una comparación instantánea. ESE es el trato:
// pagás copias superficiales, comprás detección de cambios gratis.


// --- Object.freeze: inmutabilidad forzada ---
// Congela el objeto: asignar, agregar o borrar props falla
// (silenciosamente en sloppy mode, con TypeError en strict mode).

const CONFIG = Object.freeze({
    apiUrl: 'https://api.example.com',
    maxRetries: 3,
})
// CONFIG.maxRetries = 5   → no hace nada (o lanza en strict mode)

// OJO: freeze también es SUPERFICIAL — los objetos anidados quedan mutables.
// En la práctica: freeze para constantes de módulo; para todo lo
// demás, DISCIPLINA de no mutar vale más que candados en runtime.
// (en TypeScript esto se resuelve mejor en compile time: as const, readonly)


// --- ¿Y la performance? ---
// "¿Copiar en vez de mutar no es lento?" — casi nunca:
// - Las copias son SUPERFICIALES: copiar 20 referencias es trivial
// - Lo que no cambia se comparte, no se duplica (structural sharing)
// - El costo real de la mutación se paga en debugging, no en CPU
// Para hot paths reales (miles de items, 60fps): mutá dentro de
// una función que no filtre la referencia afuera — mutación LOCAL
// es inofensiva; la COMPARTIDA es el problema.


// ============================================================
// DESAFÍOS
// ============================================================

// 1. Sin mutar el array original, escribí "top3(products)" que
//    devuelva los 3 productos más caros ordenados de mayor a menor.
//    Verificá con console.log que el original quedó intacto.
// Tu código acá:


// 2. Dado este estado, escribí "markDone(state, taskId)" que devuelva
//    un estado NUEVO con la task marcada como done: true, reusando
//    (misma referencia) todo lo que no cambió:
//    const appState = {
//        user: { name: 'Matias' },
//        tasks: [
//            { id: 1, title: 'Estudiar JS', done: false },
//            { id: 2, title: 'Estudiar TS', done: false },
//        ],
//    }
//    Verificá: newState.user === appState.user debe ser true.
//    Tip: map + spread condicional en el item que matchea.
// Tu código acá:


// 3. Encontrá el bug de mutación y arreglalo de DOS formas
//    (toSorted, y copia previa con [...]):
//    function getMedian(numbers) {
//        const sorted = numbers.sort((a, b) => a - b)
//        return sorted[Math.floor(sorted.length / 2)]
//    }
// Tu código acá:
