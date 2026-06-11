// ============================================================
// 09 - LOOPS
// ============================================================
// Los loops repiten un bloque de código. La elección del tipo
// depende de lo que iterás: for clásico para índices precisos,
// for...of para iterables, for...in para claves de objeto,
// while cuando no sabés cuántas iteraciones necesitás.
// do...while se ejecuta al menos una vez, luego se evalúa la condición.
// ============================================================


// --- for ---
// El más preciso: control total sobre inicio, condición y actualización.
// Usalo cuando necesitás el índice o iterar hacia atrás.

for (let i = 0; i < 5; i++) {
    console.log(`Vuelta ${i}`)
}

const numbers = [10, 20, 30, 40, 50]
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i])
}

// Iterar hacia atrás:
for (let i = numbers.length - 1; i >= 0; i--) {
    console.log(numbers[i])
}


// --- while ---
// Cuando no sabés cuántas iteraciones. La condición se evalúa ANTES de cada vuelta.
// Si la condición empieza en false, el cuerpo nunca se ejecuta.

let attempts = 0
while (attempts < 3) {
    console.log(`Intento ${attempts + 1}`)
    attempts++
}


// --- do...while ---
// Como while, pero la condición se evalúa DESPUÉS.
// El cuerpo se ejecuta al menos una vez, pase lo que pase.

let tries = 0
do {
    console.log(`Ejecuta al menos una vez: intento ${tries}`)
    tries++
} while (tries < 1)


// --- for...of ---
// Para iterar sobre cualquier iterable: arrays, strings, Sets, Maps, etc.
// Da el VALOR, no el índice. El más legible para la mayoría de iteraciones.

const languages = ['JavaScript', 'Python', 'Rust']
for (const lang of languages) {
    console.log(lang)
}

// String es iterable:
for (const char of 'hola') {
    console.log(char)  // 'h', 'o', 'l', 'a'
}

// Set y Map son iterables:
const roles = new Set(['admin', 'editor', 'viewer'])
for (const role of roles) {
    console.log(role)
}

const config = new Map([['host', 'localhost'], ['port', 3000]])
for (const [key, value] of config) {
    console.log(`${key}: ${value}`)
}


// --- for...in ---
// Para iterar sobre las CLAVES enumerables de un objeto.
// No lo uses en arrays — el orden no está garantizado en todos los engines.
// Recorre propiedades heredadas también — usá Object.hasOwn para filtrar.

const person = { name: 'Matias', age: 25, city: 'Buenos Aires' }

for (const key in person) {
    console.log(`${key}: ${person[key]}`)
}

// Con Object.hasOwn para ignorar propiedades heredadas:
for (const key in person) {
    if (Object.hasOwn(person, key)) {
        console.log(key)  // solo propiedades propias, no del prototipo
    }
}

// Alternativa más moderna y segura: Object.entries()
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`)
}


// --- break y continue ---
// break: sale completamente del loop.
// continue: salta a la siguiente iteración.

for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue   // salta los pares
    if (i > 7) break             // sale cuando pasa de 7
    console.log(i)               // 1, 3, 5, 7
}

// Labels: break/continue en loops anidados (usar con moderación)
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) break outer  // sale del loop externo
        console.log(`i:${i} j:${j}`)
    }
}


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Usando for...of, escribí una función "sumArray(arr)" sin usar .reduce().
//    Luego, escribí "sumMatrix(matrix)" que sume todos los valores
//    de un array de arrays. Ejemplo: sumMatrix([[1,2],[3,4]]) → 10
// Tu código acá:


// 2. Implementá el algoritmo FizzBuzz con un for:
//    Del 1 al 100: imprimí 'Fizz' si es divisible por 3,
//    'Buzz' si es por 5, 'FizzBuzz' si es por ambos, y el número si no.
// Tu código acá:
