// ============================================================
// 11 - FUNCIONES
// ============================================================
// Las funciones son bloques de código reutilizables.
// En JS hay varias formas de declararlas — cada una con
// diferencias sutiles en hoisting y en cómo manejan `this`.
// ============================================================


// --- Declaración de función (function declaration) ---
// Se puede llamar ANTES de donde está declarada en el código (hoisting completo).
// El nombre es obligatorio.

function greet(name) {
    return `Hola, ${name}!`
}
console.log(greet('Matias'))


// --- Función sin parámetros y sin retorno ---
// Si no hay return, la función devuelve undefined.

function sayHello() {
    console.log('Hello!')
}
sayHello()


// --- Function expression ---
// La función se asigna a una variable. NO hace hoisting del valor.
// const: no se puede llamar antes de la declaración.

const sayHi = function() {
    console.log('Hi!')
}
sayHi()


// --- Arrow function ---
// Sintaxis compacta. Sin bloque {}: retorno implícito.
// Diferencia importante: no tienen su propio `this` (ver 20-scope-and-this.js).

const double = n => n * 2                          // un parámetro, retorno implícito
const add    = (a, b) => a + b                     // dos parámetros
const makeObj = name => ({ name, role: 'user' })   // retornar objeto: envolver en ()

console.log(double(5))      // 10
console.log(add(3, 4))      // 7
console.log(makeObj('Ana')) // { name: 'Ana', role: 'user' }


// --- Parámetros ---
// Valores por defecto: se usan si el argumento es undefined.
// Rest (...args): captura el resto de argumentos como array.
// (El objeto que devuelve createUser lo vemos en detalle en 07-objects;
//  el spread/rest a fondo, en 13-destructuring-spreading.)

function createUser(name, role = 'viewer', active = true) {
    return { name, role, active }
}
console.log(createUser('Mati'))             // { name: 'Mati', role: 'viewer', active: true }
console.log(createUser('Ana', 'admin'))     // { name: 'Ana', role: 'admin', active: true }

function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0)
}
console.log(sum(1, 2, 3, 4, 5))  // 15


// --- Funciones anónimas como argumentos ---
// Se pasan directamente sin asignar a una variable.

[1, 2, 3].forEach(function(n) {
    console.log(n * 2)
})

// Con arrow (más común hoy):
[1, 2, 3].forEach(n => console.log(n * 2))


// --- Funciones de orden superior (HOF) ---
// Reciben funciones como argumento o devuelven funciones como resultado.
// map, filter, reduce son el ejemplo clásico.

function applyTwice(fn, value) {
    return fn(fn(value))
}
console.log(applyTwice(n => n * 2, 3))  // 12 — (3*2)*2


// --- Funciones anidadas ---
// Una función definida dentro de otra. Solo es visible desde adentro.
// El scope de la función interna incluye las variables de la externa.

function buildGreeter(greeting) {
    function format(name) {
        return `${greeting}, ${name}!`
    }
    return format  // devuelve la función interna (closure)
}

const hola  = buildGreeter('Hola')
const hello = buildGreeter('Hello')

console.log(hola('Matias'))   // 'Hola, Matias!'
console.log(hello('Matias'))  // 'Hello, Matias!'


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "repeat(fn, times)" que ejecute fn
//    la cantidad de veces especificada, pasándole el número
//    de iteración (0-based). Usala con console.log.
// Tu código acá:


// 2. Escribí una función "compose(f, g)" que devuelva una nueva
//    función que aplique primero g y luego f (composición matemática).
//    Ejemplo: compose(double, addOne)(3) → double(addOne(3)) → 8
// Tu código acá:


// 3. Escribí una función "formatPrice(amount, currency = 'USD')" que
//    devuelva un string tipo '100 USD' usando un template literal.
//    Probala con un solo argumento y con los dos, para ver el parámetro
//    por defecto en acción.
//    (Recibir los datos como un objeto y desestructurarlos llega en 13.)
// Tu código acá:
