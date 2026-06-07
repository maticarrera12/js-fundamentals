// ============================================================
// 06 - ARRAYS
// ============================================================
// Un array es una lista ordenada de valores de cualquier tipo.
// Es la estructura de datos más usada en JavaScript.
// Los métodos se dividen en dos grupos: los que mutan el original
// (push, pop, sort, reverse, splice) y los que devuelven uno nuevo (map, filter, slice).
// ============================================================


// --- Creación ---

const empty    = []
const numbers  = [1, 2, 3, 4, 5]
const mixed    = ['texto', 42, true, null, { name: 'Mati' }]
const matrix   = [[1, 2], [3, 4], [5, 6]]  // array de arrays


// --- Acceso y longitud ---

console.log(numbers[0])       // 1 — primer elemento (índice 0)
console.log(numbers[4])       // 5 — último elemento
console.log(numbers.at(-1))   // 5 — at() acepta negativos (ES2022)
console.log(numbers.at(-2))   // 4
console.log(numbers.length)   // 5


// --- Agregar y quitar elementos (mutan el array) ---

const fruits = ['manzana', 'banana']

fruits.push('naranja')      // agrega al FINAL      → ['manzana', 'banana', 'naranja']
fruits.pop()                // quita del FINAL       → ['manzana', 'banana']
fruits.unshift('frutilla')  // agrega al INICIO      → ['frutilla', 'manzana', 'banana']
fruits.shift()              // quita del INICIO      → ['manzana', 'banana']

// splice(inicio, cantEliminar, ...elementos a insertar)
// Muta el array. Devuelve los elementos eliminados.
fruits.splice(1, 0, 'pera')      // inserta 'pera' en índice 1
console.log(fruits)              // ['manzana', 'pera', 'banana']
const removed = fruits.splice(0, 1)  // elimina 1 elemento desde el índice 0
console.log(removed)             // ['manzana']


// --- Extraer sin mutar ---

const letters = ['a', 'b', 'c', 'd', 'e']

// slice(inicio, fin) — el fin no se incluye
console.log(letters.slice(1, 3))  // ['b', 'c']
console.log(letters.slice(2))     // ['c', 'd', 'e'] — sin fin: hasta el final
console.log(letters.slice(-2))    // ['d', 'e'] — negativos desde el final
console.log(letters)              // ['a', 'b', 'c', 'd', 'e'] — no cambia


// --- Búsqueda ---

const scores = [10, 25, 8, 42, 25, 7]

console.log(scores.includes(42))              // true
console.log(scores.indexOf(25))               // 1 — primera ocurrencia
console.log(scores.lastIndexOf(25))           // 4 — última ocurrencia
console.log(scores.find(n => n > 20))         // 25 — primer elemento que cumple
console.log(scores.findIndex(n => n > 20))    // 1  — índice del primero que cumple


// --- Ordenar (muta el array) ---
// sort() sin argumento ordena como STRINGS — incorrecto para números.
// Siempre pasá una función comparadora para números.

const unsorted = [10, 1, 21, 2]
const wrongSort = [...unsorted].sort()          // [1, 10, 2, 21] — orden léxico
const rightSort = [...unsorted].sort((a, b) => a - b)  // [1, 2, 10, 21]

// [...array] hace una copia para no mutar el original


// --- Combinar y transformar ---

const a = [1, 2, 3]
const b = [4, 5, 6]

const combined = [...a, ...b]           // [1, 2, 3, 4, 5, 6] — spread
const alsoCombined = a.concat(b)        // mismo resultado con concat
const joined = a.join(' - ')            // '1 - 2 - 3' — array a string

// reverse() muta el original — usá spread para no mutar
const reversed = [...a].reverse()       // [3, 2, 1]


// --- Métodos funcionales (no mutan, devuelven nuevo array) ---
// Estos se cubren en profundidad en intermediate/02-advanced-structures.js

const prices = [100, 250, 80, 400, 120]

const doubled    = prices.map(p => p * 2)
const cheap      = prices.filter(p => p < 200)
const total      = prices.reduce((acc, p) => acc + p, 0)


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado el array ['banana', 'manzana', 'naranja', 'pera', 'durazno'],
//    sin mutarlo, creá un nuevo array:
//    - solo con frutas que tengan más de 6 letras
//    - ordenado alfabéticamente
//    - en mayúsculas
//    (encadenalo: filter → sort → map)
// Tu código acá:


// 2. Implementá una función "flatten(arr)" que convierta un array
//    de arrays anidados en uno plano, sin usar .flat():
//    flatten([[1, 2], [3, [4, 5]]]) → [1, 2, 3, 4, 5]
// Tu código acá:


// 3. Dado un array de números, encontrá el segundo valor más grande
//    sin ordenar el array completo (solo dos pasadas máximo).
// Tu código acá:
