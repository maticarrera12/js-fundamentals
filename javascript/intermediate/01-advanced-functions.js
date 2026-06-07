// ============================================================
// 01 - FUNCIONES AVANZADAS
// ============================================================
// En JavaScript las funciones son "ciudadanos de primera clase":
// se pueden asignar, pasar como argumentos y retornar desde otras funciones.
// Este archivo cubre los patrones que hacen que JS sea un lenguaje funcional.
// ============================================================


// --- Funciones de primera clase ---
// Una función puede vivir en una variable, viajar como argumento
// y volver como resultado de otra función.

const greet = function(name) {
    console.log(`Hello, ${name}!`)
}

// 1. Asignada a variable (ya hecho arriba)
// 2. Pasada como argumento
function runGreeting(fn, name) {
    fn(name)
}
runGreeting(greet, 'Matias')

// 3. Retornada desde otra función
function getGreeter() {
    return greet
}
const hi = getGreeter()
hi('Matias')


// --- Arrow functions ---
// Sintaxis más corta. Retorno implícito si no hay bloque {}.

const add = (a, b) => a + b
const square = n => n * n          // un solo parámetro, sin paréntesis
const random = () => Math.random() // sin parámetros

// Diferencia clave con function: las arrow NO tienen su propio `this`.
// Heredan el `this` del contexto donde fueron definidas (this léxico).

const counter = {
    count: 0,
    // function: this apunta al objeto counter ✓
    increment: function() {
        this.count++
        console.log(this.count)
    },
    // arrow: this apunta al contexto donde counter fue creado (global/undefined)
    // NO usar arrow para métodos de objeto que necesiten `this`
    badIncrement: () => {
        console.log(this) // undefined en strict mode, global en non-strict
    }
}

counter.increment()  // 1


// --- IIFE (Immediately Invoked Function Expression) ---
// Una función que se define y se ejecuta en el mismo lugar.
// Útil para crear un scope privado sin contaminar el global.

;(function() {
    const secret = 'solo vivo acá'
    console.log('IIFE ejecutado')
})()

;(() => {
    console.log('IIFE de arrow function')
})()

// El ; al principio evita que la línea anterior se interprete como una llamada
// si no usás punto y coma en tu código.


// --- Parámetros rest (...args) ---
// Captura todos los argumentos sobrantes en un array.
// Siempre debe ir al final de los parámetros.

function multiply(...numbers) {
    return numbers.reduce((acc, n) => acc * n, 1)
}
console.log(multiply(2, 3, 4))  // 24

function logTagged(tag, ...messages) {
    messages.forEach(msg => console.log(`[${tag}] ${msg}`))
}
logTagged('INFO', 'Inicio', 'Procesando', 'Fin')


// --- Spread operator ---
// Expande un array en argumentos individuales.
// Es la operación inversa a rest.

const nums = [3, 1, 4, 1, 5, 9]
console.log(Math.max(...nums))   // 9
console.log([0, ...nums, 10])    // [0, 3, 1, 4, 1, 5, 9, 10]

// Clonar y combinar arrays sin mutar el original:
const first = [1, 2, 3]
const second = [4, 5, 6]
const combined = [...first, ...second]


// --- Closures ---
// Una función interna recuerda las variables del scope donde fue creada,
// incluso después de que la función externa haya terminado.

function makeCounter(start = 0) {
    let count = start  // esta variable queda "atrapada" en el closure

    return {
        increment() { return ++count },
        decrement() { return --count },
        value()     { return count }
    }
}

const c1 = makeCounter()
const c2 = makeCounter(10)

c1.increment()  // 1
c1.increment()  // 2
c2.increment()  // 11
// c1 y c2 tienen su propio `count` — los closures son independientes


// --- Recursión ---
// Una función que se llama a sí misma. Siempre necesitá un caso base
// para evitar el stack overflow.

function factorial(n) {
    if (n <= 1) return 1       // caso base
    return n * factorial(n - 1) // llamada recursiva
}
console.log(factorial(5))  // 120

// Recorrer estructuras anidadas (algo que loops simples no pueden hacer):
function sumNested(arr) {
    return arr.reduce((total, item) =>
        total + (Array.isArray(item) ? sumNested(item) : item), 0)
}
console.log(sumNested([1, [2, [3, [4]]]]))  // 10


// --- Aplicación parcial ---
// Fijás algunos argumentos de una función y obtenés una nueva
// función que espera los argumentos restantes.

function partialApply(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function addThree(a, b, c) {
    return a + b + c
}

const add10 = partialApply(addThree, 10)
console.log(add10(5, 3))   // 18
console.log(add10(1, 1))   // 12


// --- Currying ---
// Transforma una función de N argumentos en N funciones de 1 argumento.
// Diferencia con aplicación parcial: currying siempre es de uno en uno.

function curry(a) {
    return function(b) {   // cada llamada recibe exactamente 1 argumento
        return function(c) {
            return a + b + c
        }
    }
}

const add1   = curry(1)
const add1_2 = add1(2)
console.log(add1_2(3))  // 6
console.log(curry(10)(20)(30))  // 60


// --- Callbacks ---
// Una función que se pasa como argumento y se ejecuta después.
// Es la base del código asíncrono en JS — antes de las Promesas.

function processData(data, onSuccess, onError) {
    if (!Array.isArray(data)) {
        onError('data debe ser un array')
        return
    }
    const result = data.reduce((acc, n) => acc + n, 0)
    onSuccess(result)
}

processData([1, 2, 3], result => console.log(`Resultado: ${result}`), err => console.error(err))
processData('not an array', result => console.log(result), err => console.error(`Error: ${err}`))


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "memoize(fn)" que reciba una función pura
//    y devuelva una versión cacheada de ella — si ya fue llamada con
//    los mismos argumentos, devuelve el resultado guardado sin recalcular.
//    Probala con una función costosa como fibonacci recursivo.
// Tu código acá:


// 2. Usando closures, creá una función "makeMultiplier(factor)"
//    que devuelva una función que multiplique su argumento por factor.
//    Luego creá double, triple y quadruple a partir de ella.
// Tu código acá:


// 3. Implementá una versión simple de "pipe(...fns)" que tome N funciones
//    y devuelva una función que las aplique en orden sobre un valor inicial.
//    Ejemplo: pipe(double, addOne, square)(3) → aplica double, luego addOne, luego square.
// Tu código acá:
