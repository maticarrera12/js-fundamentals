// ============================================================
// 01 - VARIABLES
// ============================================================
// Tres formas de declarar variables. La elección importa:
// afecta el scope, la mutabilidad y el hoisting.
// Regla práctica: const por defecto, let cuando necesitás reasignar, var nunca.
// ============================================================


// --- var ---
// La forma original. Tiene scope de función (no de bloque) y hace hoisting.
// Evitala — sus comportamientos extraños causan bugs difíciles de encontrar.

var greeting = 'Hello'
var greeting = 'Hi'   // se puede redeclarar sin error — peligroso

// Hoisting: var se "eleva" al inicio de su scope. La declaración sube pero NO el valor.
// console.log(hoisted)  // undefined — no ReferenceError, pero tampoco el valor real
var hoisted = 'soy hoisted'

// Scope de función, no de bloque — 'x' existe fuera del if:
if (true) {
    var x = 10
}
console.log(x)  // 10 — visible fuera del bloque, contamina el scope de la función


// --- let ---
// Forma moderna. Scope de bloque, no se puede redeclarar, sí reasignar.
// Temporal Dead Zone (TDZ): existe en el scope desde que comienza el bloque,
// pero acceder a ella antes de su declaración lanza ReferenceError.

let count = 0
count = 1        // reasignación ok
// let count = 2 ❌ no se puede redeclarar

if (true) {
    let blockScoped = 'solo vivo acá'
    console.log(blockScoped)  // ok
}
// console.log(blockScoped)  ❌ ReferenceError — ya no existe fuera del if


// --- const ---
// Como let, pero no permite reasignación. No significa "inmutable":
// los objetos y arrays que apunta pueden mutar — lo que no puede cambiar es la REFERENCIA.

const MAX_RETRIES = 3
// MAX_RETRIES = 5  ❌ TypeError — no se puede reasignar

const user = { name: 'Matias', age: 25 }
user.age = 26      // ✓ mutar el objeto está ok
user.city = 'BsAs' // ✓ agregar propiedades también
// user = {}       ❌ reasignar la referencia no

const tags = ['ts', 'js']
tags.push('react') // ✓ mutar el array está ok
// tags = []       ❌ reasignar no


// --- Convenciones de nombres ---
// camelCase       → variables y funciones:  myVariable, getUserName
// PascalCase      → clases:                 UserProfile, ShoppingCart
// UPPER_SNAKE     → constantes de módulo:   MAX_RETRIES, BASE_URL
// _prefix         → uso interno/privado:    _internalCache


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Declará tres variables usando const, let y var. Intentá reasignarlas.
//    ¿Cuál da error? ¿Cuál no? Explicá por qué con un comentario.
// Tu código acá:


// 2. Creá una const "config" que sea un objeto con host, port y debug.
//    Modificá el valor de debug a false. ¿Funciona?
//    Ahora intentá reasignar config a un objeto vacío. ¿Qué pasa?
// Tu código acá:
