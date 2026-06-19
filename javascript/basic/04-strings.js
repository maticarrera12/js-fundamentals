// ============================================================
// 04 - STRINGS
// ============================================================
// Los strings son inmutables — los métodos no modifican el original,
// devuelven un nuevo string. Conocer los métodos más comunes
// te evita tener que reinventar manipulaciones básicas de texto.
// ============================================================


// --- Creación ---
// Tres formas: '', "" (equivalentes) y template literals (``)
// Los template literals soportan interpolación y multilínea.

const name    = 'Matias'
const message = `Hola ${name.toUpperCase()}, bienvenido!`
const multiline = `Línea 1
Línea 2
Línea 3`


// --- Acceso y longitud ---

const greeting = 'Hello, Matias!'

console.log(greeting.length)   // 14
console.log(greeting[0])       // 'H'
console.log(greeting[7])       // 'M'
console.log(greeting.at(-1))   // '!' — at() acepta índices negativos (ES2022), empieza desde el final
console.log(greeting.at(-2))   // 's'


// --- Búsqueda ---

console.log(greeting.includes('Matias'))     // true
console.log(greeting.indexOf('Matias'))      // 7  — índice de la primera ocurrencia (-1 si no existe)
console.log(greeting.startsWith('Hello'))    // true
console.log(greeting.endsWith('!'))          // true


// --- Extracción ---
// slice(inicio, fin) — el fin no se incluye. Acepta negativos.

console.log(greeting.slice(7, 13))   // 'Matias'
console.log(greeting.slice(7))       // 'Matias!' — sin fin: hasta el final
console.log(greeting.slice(-7))      // 'Matias!' — negativo: desde el final


// --- Transformación ---
// Todos devuelven un NUEVO string, no modifican el original.

console.log(greeting.toUpperCase())    // 'HELLO, MATIAS!'
console.log(greeting.toLowerCase())    // 'hello, matias!'
console.log('  espacios  '.trim())     // 'espacios'
console.log('  espacios  '.trimStart()) // 'espacios  '
console.log('  espacios  '.trimEnd())   // '  espacios'
console.log(greeting.replace('Matias', 'Mundo'))  // 'Hello, Mundo!'
console.log('aa-bb-cc'.replaceAll('-', '_'))       // 'aa_bb_cc'


// --- Split y join ---
// split: string → array.  join: array → string.  Son operaciones inversas.

const csv = 'Ana,Luis,Mara,Carlos'
const names = csv.split(',')   // ['Ana', 'Luis', 'Mara', 'Carlos']
console.log(names.join(' | ')) // 'Ana | Luis | Mara | Carlos'

const path = '/users/matias/documents'
const parts = path.split('/')  // ['', 'users', 'matias', 'documents']


// --- Padding y repeat ---

console.log('5'.padStart(3, '0'))    // '005'
console.log('5'.padEnd(3, '0'))      // '500'
console.log('ha'.repeat(3))          // 'hahaha'


// --- Template literals avanzados ---
// Podés usar cualquier expresión dentro de ${}

const price = 1500
const tax   = 0.21
console.log(`Precio: $${price} + IVA = $${(price * (1 + tax)).toFixed(2)}`)

// Tagged templates: una función que procesa el template literal
// (las funciones las vemos en detalle en 06-function; acá es solo un ejemplo)
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) =>
        acc + str + (values[i] !== undefined ? `[${values[i]}]` : ''), '')
}
console.log(highlight`Hola ${name}, tu puntaje es ${100}`)
// 'Hola [Matias], tu puntaje es [100]'


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado: const title = 'Hola Mundo Esto Es JS'
//    Convertilo a "slug" de URL e imprimí el resultado:
//    minúsculas y espacios reemplazados por '-' → "hola-mundo-esto-es-js"
//    (Tip: .toLowerCase() y .replaceAll(' ', '-'))
// Tu código acá:


// 2. Dado: const text = 'Este texto es bastante largo' y const maxLength = 10
//    Si text supera maxLength caracteres, imprimí los primeros maxLength
//    seguidos de '...'. Si no, imprimí text tal cual.
//    (Tip: .length, .slice() y el operador ternario)
// Tu código acá:


// 3. Dado: const data = 'nombre:Matias,edad:25,ciudad:BsAs'
//    Usando solo métodos de string (.indexOf() y .slice()), extraé e
//    imprimí el valor del nombre: lo que está entre 'nombre:' y la coma.
//    Resultado esperado: "Matias"
//    (Armar un objeto con todos los pares lo vas a hacer en 07-objects.)
// Tu código acá:
