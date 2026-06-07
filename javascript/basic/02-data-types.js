// ============================================================
// 02 - TIPOS DE DATOS
// ============================================================
// JavaScript tiene 7 tipos primitivos (inmutables, comparados por valor)
// y los objetos (mutables, comparados por referencia).
// typeof es el operador para inspeccionar el tipo en runtime.
// ============================================================


// --- string ---
// Cadena de texto. Inmutable — cada operación devuelve una nueva string.
// Tres formas de declararla: '', "", y template literals (``)

let name = 'Matias'
let message = "Hello, world"
let template = `Hola ${name}, hoy es ${new Date().toDateString()}`

console.log(typeof name)  // 'string'


// --- number ---
// Un solo tipo para enteros y decimales (IEEE 754 double precision).
// Tiene valores especiales: Infinity, -Infinity, NaN.

let integer = 42
let decimal = 3.14
let negative = -7

console.log(1 / 0)    // Infinity
console.log(-1 / 0)   // -Infinity
console.log(0 / 0)    // NaN — Not a Number
console.log(typeof NaN)  // 'number' — uno de los comportamientos raros de JS

// NaN no es igual a sí mismo — la única forma segura de detectarlo:
console.log(NaN === NaN)       // false
console.log(Number.isNaN(NaN)) // true


// --- boolean ---
// Solo dos valores: true o false.
// Se usa para control de flujo (if, while, operadores lógicos).

let isLoggedIn = true
let hasPermission = false

console.log(typeof isLoggedIn)  // 'boolean'


// --- null ---
// Ausencia intencional de valor. Lo asignás vos explícitamente.
// Nota: typeof null === 'object' es un bug histórico de JS que no se puede corregir.

let selectedItem = null
console.log(typeof selectedItem)  // 'object' — bug conocido de JS


// --- undefined ---
// Variable declarada pero sin valor asignado.
// También el valor de propiedades que no existen en un objeto.

let uninitializedVar
console.log(uninitializedVar)      // undefined
console.log(typeof uninitializedVar)  // 'undefined'

const obj = { name: 'Mati' }
console.log(obj.email)  // undefined — propiedad inexistente


// --- symbol ---
// Identificador único e irrepetible, incluso si tienen la misma descripción.
// Se usa para keys privadas o para metaprogramación (Symbol.iterator, etc.).

const idA = Symbol('id')
const idB = Symbol('id')
console.log(idA === idB)  // false — cada Symbol es único

console.log(typeof idA)  // 'symbol'


// --- bigint ---
// Para números enteros mayores que 2^53 - 1 (el límite de Number).
// Se escribe con 'n' al final o con BigInt().

const huge = 9007199254740991n
const alsoHuge = BigInt('9007199254740991')

console.log(huge + 1n)  // ok — operaciones entre bigint
// console.log(huge + 1) ❌ no podés mezclar bigint con number

console.log(typeof huge)  // 'bigint'


// --- Comparación: null vs undefined ---
// null     → ausencia INTENCIONAL (vos la pusiste)
// undefined → ausencia NO INTENCIONAL (la variable existe pero sin valor)
//
// == iguala null y undefined entre sí, pero === no:
console.log(null == undefined)   // true
console.log(null === undefined)  // false


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Usá typeof para inspeccionar cada uno de los 7 tipos primitivos.
//    ¿Cuál te parece raro? Explicá por qué con un comentario.
// Tu código acá:


// 2. ¿Cuál es la diferencia entre null y undefined en código real?
//    Creá una función "getUserRole(user)" que devuelva:
//    - undefined si user no existe (no fue pasado)
//    - null si user existe pero no tiene rol
//    - el rol si existe
// Tu código acá:
