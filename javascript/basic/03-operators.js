// ============================================================
// 03 - OPERADORES
// ============================================================
// Los operadores son los verbos del lenguaje: transforman, comparan
// y combinan valores. La diferencia entre == y === es una de las
// trampas más clásicas de JavaScript — entenderla es fundamental.
// ============================================================


// --- Aritméticos ---

console.log(2 + 3)   // 5  — suma
console.log(5 - 2)   // 3  — resta
console.log(4 * 6)   // 24 — multiplicación
console.log(10 / 2)  // 5  — división
console.log(10 % 3)  // 1  — módulo (residuo)
console.log(2 ** 3)  // 8  — potencia

let x = 5
x++  // x = x + 1 → 6 (post-incremento: devuelve el valor antes de incrementar)
x--  // x = x - 1 → 5


// --- Asignación ---

let y = 10
y += 5   // y = 15
y -= 3   // y = 12
y *= 2   // y = 24
y /= 4   // y = 6
y %= 5   // y = 1
y **= 3  // y = 1


// --- Comparación: == vs === ---
// == (igualdad débil): convierte tipos antes de comparar (type coercion)
// === (igualdad estricta): compara valor Y tipo sin conversión
//
// Regla: usá === SIEMPRE. == causa comportamientos contraintuitivos.

console.log(5 == '5')    // true  — convirtió el string a número
console.log(5 === '5')   // false — tipos diferentes, no convierte

console.log(0 == false)  // true  — ambos son "falsy", se equiparan
console.log(0 === false) // false — number vs boolean

console.log(null == undefined)   // true  — excepción especial de ==
console.log(null === undefined)  // false

// Los únicos casos donde == es intencional:
// comprobar null/undefined de una vez: if (value == null) — captura ambos


// --- Truthy y Falsy ---
// En un contexto booleano (if, while, &&, ||), JS convierte valores.
// Falsy: false, 0, '', null, undefined, NaN, 0n
// Truthy: todo lo demás (incluyendo [], {}, '0', 'false')

console.log(Boolean(0))         // false
console.log(Boolean(''))        // false
console.log(Boolean(null))      // false
console.log(Boolean([]))        // true  — array vacío es truthy
console.log(Boolean({}))        // true  — objeto vacío es truthy
console.log(Boolean('false'))   // true  — string no vacío es truthy


// --- Lógicos ---

console.log(true && false)  // false — AND: ambos deben ser true
console.log(true || false)  // true  — OR: al menos uno debe ser true
console.log(!true)          // false — NOT: invierte el valor

// Short-circuit: && y || cortocircuitan y devuelven uno de los operandos
console.log('hello' && 'world')  // 'world' — && devuelve el último si todo es truthy
console.log(null && 'world')     // null    — && devuelve el primero falsy
console.log(null || 'world')     // 'world' — || devuelve el primer truthy
console.log('' || 'default')     // 'default'


// --- Ternario ---
// Forma compacta de if/else para expresiones simples.

let age = 20
let status = age >= 18 ? 'mayor de edad' : 'menor de edad'
console.log(status)


// --- Nullish coalescing (??) ---
// Devuelve el operando derecho solo si el izquierdo es null o undefined.
// Diferencia con ||: no trata 0, '' o false como "ausentes".

const score = 0
console.log(score || 'sin puntaje')  // 'sin puntaje' — INCORRECTO si 0 es válido
console.log(score ?? 'sin puntaje')  // 0             — CORRECTO

const username = null
console.log(username ?? 'Anónimo')  // 'Anónimo'


// --- Optional chaining (?.) ---
// Accede a propiedades encadenadas sin romper si alguna es null/undefined.
// Devuelve undefined en vez de TypeError.

const userProfile = { profile: { name: 'Matias', address: null } }

console.log(userProfile.profile.name)             // 'Matias'
console.log(userProfile.profile.address?.city)    // undefined — no tira error
console.log(userProfile.profile.address?.getCity()) // undefined
console.log(userProfile.tags?.[0])                // undefined

// Patrón más común: combinar ?. con ??
const city = userProfile.profile.address?.city ?? 'Ciudad desconocida'
console.log(city)  // 'Ciudad desconocida'


// --- Logical assignment (ES2021) ---
// Combinan operador lógico con asignación.

let a = null
a ??= 'default'    // asigna solo si es null/undefined
console.log(a)     // 'default'

let b = 0
b ??= 'default'    // no asigna — 0 no es null/undefined
console.log(b)     // 0

let c = ''
c ||= 'fallback'   // asigna porque '' es falsy
console.log(c)     // 'fallback'

let debug = true
debug &&= false    // asigna porque debug es truthy
console.log(debug) // false


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Sin ejecutar el código, predecí el resultado de cada línea. Luego verificá:
//    console.log('' == false)
//    console.log([] == false)
//    console.log([] === false)
//    console.log(null == 0)
//    console.log(undefined == 0)
//    ¿Qué conclusiones sacás sobre == ?
// Tu código acá:


// 2. Tenés este objeto de configuración que puede tener propiedades faltantes:
//    const serverConfig = { db: { host: 'localhost' } }
//    Usando ?. y ??, escribí expresiones para obtener:
//    - el puerto de db (si no existe, que sea 5432)
//    - el usuario de db (si no existe, que sea 'root')
//    - el nombre del cache server (si no existe db.cache, undefined está ok)
// Tu código acá:
