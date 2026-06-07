// ============================================================
// 10 - ITERABLES E ITERADORES
// ============================================================
// Un iterable es cualquier objeto que implementa el protocolo de iteración:
// tiene un método [Symbol.iterator] que devuelve un iterador.
// Un iterador es un objeto con un método next() que devuelve { value, done }.
// Esto es lo que hace que for...of, spread y destructuring funcionen.
// ============================================================


// --- El protocolo de iteración ---
// Arrays, strings, Maps, Sets son iterables porque tienen [Symbol.iterator].
// Podés implementarlo en cualquier objeto para hacerlo iterable.

// Iterador manual — así funciona internamente for...of:
const arr = [10, 20, 30]
const iterator = arr[Symbol.iterator]()  // obtiene el iterador del array

console.log(iterator.next())  // { value: 10, done: false }
console.log(iterator.next())  // { value: 20, done: false }
console.log(iterator.next())  // { value: 30, done: false }
console.log(iterator.next())  // { value: undefined, done: true }


// --- Objeto iterable personalizado ---
// Para que un objeto funcione con for...of, spread y destructuring,
// tiene que implementar [Symbol.iterator] que devuelve un iterador.

const range = {
    from: 1,
    to: 5,

    // Este método hace que el objeto sea iterable.
    // for...of lo llama una vez para obtener el iterador.
    [Symbol.iterator]() {
        let current = this.from
        const last = this.to

        // El iterador devuelto: tiene next() que avanza estado
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false }
                }
                return { value: undefined, done: true }
            }
        }
    }
}

// Ahora funciona con todo lo que use el protocolo de iteración:
for (const n of range) {
    console.log(n)  // 1, 2, 3, 4, 5
}

console.log([...range])     // [1, 2, 3, 4, 5]
const [first, second] = range  // destructuring también


// --- Iterador que es su propio iterable ---
// Si el método [Symbol.iterator] devuelve this, el objeto es
// el iterador y el iterable al mismo tiempo. Más compacto.

const countDown = {
    value: 3,

    [Symbol.iterator]() {
        return this  // se itera a sí mismo
    },

    next() {
        if (this.value > 0) {
            return { value: this.value--, done: false }
        }
        this.value = 3  // reset para poder reusar
        return { value: undefined, done: true }
    }
}

for (const n of countDown) {
    console.log(n)  // 3, 2, 1
}


// --- Array.from ---
// Convierte cualquier iterable o array-like en un array real.
// El segundo argumento es una función de mapeo.

const fromRange = Array.from(range)           // [1, 2, 3, 4, 5]
const doubled   = Array.from(range, n => n * 2)  // [2, 4, 6, 8, 10]
const chars     = Array.from('hola')          // ['h', 'o', 'l', 'a']
const fromSet   = Array.from(new Set([1, 1, 2]))  // [1, 2]

// Array-like (tiene length e índices pero no métodos de array):
function sum() {
    // arguments es array-like, no un array real
    return Array.from(arguments).reduce((a, b) => a + b, 0)
}
console.log(sum(1, 2, 3, 4))  // 10


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá un objeto iterable "fibonacci" que genere la secuencia
//    de Fibonacci de forma infinita (0, 1, 1, 2, 3, 5, 8, ...).
//    Usá Array.from con un segundo argumento de cantidad para obtener
//    los primeros N números: Array.from({ length: 8 }, () => fib.next().value)
// Tu código acá:


// 2. Implementá un iterador "take(iterable, n)" que devuelva
//    un nuevo iterable con solo los primeros n elementos de otro iterable.
//    Debería funcionar con cualquier iterable: arrays, strings, tu range, etc.
// Tu código acá:
