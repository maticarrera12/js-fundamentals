// ============================================================
// 13 - DESTRUCTURING Y SPREAD
// ============================================================
// Destructuring extrae valores de arrays u objetos en variables.
// Spread expande un iterable en elementos individuales.
// Rest agrupa el "resto" en una variable — es la operación inversa.
// Son las tres herramientas más usadas en JS moderno.
// ============================================================


// --- Destructuring de arrays ---
// Las variables se asignan por POSICIÓN.

const numbers = [1, 2, 3, 4, 5]

const [first, second, third] = numbers
console.log(first)   // 1
console.log(second)  // 2

// Saltear elementos con comas vacías:
const [a, , c] = numbers  // saltea el segundo
console.log(a, c)  // 1 3

// Valor por defecto si la posición es undefined:
const [x = 0, y = 0, z = 0, w = 99] = [10, 20, 30]
console.log(w)  // 99 — posición 3 no existe, usa el default

// Intercambiar variables sin variable temporal:
let p = 1, q = 2
;[p, q] = [q, p]
console.log(p, q)  // 2, 1


// --- Destructuring de objetos ---
// Las variables se asignan por NOMBRE DE PROPIEDAD — el orden no importa.

const user = { name: 'Matias', email: 'mati@example.com', role: 'developer' }

const { name, email } = user
console.log(name)   // 'Matias'
console.log(email)  // 'mati@example.com'

// Renombrar la variable al extraer:
const { name: userName, email: userEmail } = user
console.log(userName)  // 'Matias'

// Valor por defecto si la propiedad no existe:
const { role = 'viewer', permissions = [] } = user
console.log(permissions)  // [] — no existe en user


// --- Destructuring anidado ---
// Podés desestructurar en profundidad, aunque a partir de 2 niveles
// vale la pena si lo usás mucho o si el objeto es muy verboso.

const order = {
    id: 'ORD-001',
    shipping: {
        city: 'Buenos Aires',
        street: 'Av. Corrientes 1234',
        zip: '1043'
    }
}

const { shipping: { city, street } } = order
console.log(city)    // 'Buenos Aires'
console.log(street)  // 'Av. Corrientes 1234'


// --- Destructuring en parámetros de función ---
// El uso más común — evita escribir options.host, options.port, etc.

function connect({ host = 'localhost', port = 3000, debug = false } = {}) {
    console.log(`Conectando a ${host}:${port} (debug: ${debug})`)
}
connect({ port: 8080 })               // 'localhost:8080'
connect({ host: 'api.example.com' })  // 'api.example.com:3000'
connect()                             // valores por defecto — el = {} evita error si no se pasa nada


// --- Spread con arrays ---
// Expande un array en elementos individuales.

const first3 = [1, 2, 3]
const last3  = [4, 5, 6]

const all    = [...first3, ...last3]   // [1, 2, 3, 4, 5, 6]
const withExtra = [0, ...first3, 4]    // [0, 1, 2, 3, 4]

// Clonar un array (shallow copy):
const clone = [...first3]
clone.push(99)
console.log(first3)  // [1, 2, 3] — no se modificó


// --- Spread con objetos ---
// Expande las propiedades de un objeto.
// Si hay claves repetidas, el último gana.

const base = { theme: 'dark', lang: 'es', fontSize: 16 }
const userPrefs = { theme: 'light', fontSize: 18 }

const merged = { ...base, ...userPrefs }
// { theme: 'light', lang: 'es', fontSize: 18 }
// userPrefs sobrescribe las claves que coinciden con base

// Clonar un objeto (shallow copy):
const baseClone = { ...base }


// --- Rest en destructuring ---
// Captura "el resto" en una nueva variable. Siempre va al final.

// En arrays:
const [head, ...tail] = [1, 2, 3, 4, 5]
console.log(head)  // 1
console.log(tail)  // [2, 3, 4, 5]

// En objetos — muy útil para separar props conocidas del resto:
const { name: playerName, ...playerRest } = { name: 'Matias', age: 25, city: 'BsAs' }
console.log(playerName)  // 'Matias'
console.log(playerRest)  // { age: 25, city: 'BsAs' }

// Caso real: en React, separás tus props del resto para pasarlas:
function Button({ className, onClick, children, ...htmlProps }) {
    // usás className, onClick y children especialmente
    // htmlProps tiene el resto para pasarlos al elemento nativo
    console.log(className, onClick, children, htmlProps)
}


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dada esta respuesta de API:
//    const response = { status: 200, data: { user: { id: 1, name: 'Ana', email: 'ana@x.com' } } }
//    Extraé id, name y email usando destructuring anidado en una sola línea.
// Tu código acá:


// 2. Escribí una función "omit(obj, keys)" que devuelva un nuevo objeto
//    SIN las propiedades cuyas claves están en el array keys.
//    Usá destructuring con rest.
//    omit({ a: 1, b: 2, c: 3 }, ['b']) → { a: 1, c: 3 }
// Tu código acá:


// 3. Usando solo spread, implementá una función "updateUser(user, changes)"
//    que devuelva un nuevo objeto con las propiedades de user actualizadas
//    por changes, sin mutar el original.
// Tu código acá:
