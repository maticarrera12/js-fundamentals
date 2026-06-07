// ============================================================
// 08 - GENERATORS
// ============================================================
// Los generators son funciones que pueden PAUSAR su ejecución
// y reanudarla después, manteniendo su estado interno.
// Son la base de los iteradores personalizados, y async/await
// está implementado internamente con generators.
// ============================================================

// Sintaxis: function* (asterisco después de function)
// yield: pausa la función y emite un valor

function* counter() {
    console.log('inicio');
    yield 1;
    console.log('después del primer yield');
    yield 2;
    yield 3;
    console.log('fin');
}

// Los generators son LAZY — no ejecutan nada hasta que pedís el próximo valor
const gen = counter();
console.log(gen.next()); // "inicio"                    → { value: 1, done: false }
console.log(gen.next()); // "después del primer yield"  → { value: 2, done: false }
console.log(gen.next()); //                             → { value: 3, done: false }
console.log(gen.next()); // "fin"                       → { value: undefined, done: true }


// --- Generators como iteradores ---
// Un generator implementa automáticamente el protocolo iterable.
// Funciona con for...of, spread, destructuring.

function* range(from, to, step = 1) {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}

for (const num of range(1, 5)) {
    console.log(num); // 1 2 3 4 5
}

console.log([...range(0, 10, 2)]); // [0, 2, 4, 6, 8, 10]
const [a, b, c] = range(10, 50, 10);
console.log(a, b, c); // 10 20 30


// --- Generators infinitos ---
// Como son lazy, podés representar secuencias infinitas sin bloquear el programa.

function* naturals(start = 1) {
    let n = start;
    while (true) {
        yield n++;
    }
}

function take(n, iterable) {
    const result = [];
    for (const item of iterable) {
        result.push(item);
        if (result.length === n) break;
    }
    return result;
}

console.log(take(5, naturals()));     // [1, 2, 3, 4, 5]
console.log(take(5, naturals(100)));  // [100, 101, 102, 103, 104]


// --- Pasar valores al generator ---
// next(value) envía un valor DE VUELTA al generator.
// El yield recibe ese valor como resultado de la expresión.

function* accumulator() {
    let total = 0;
    while (true) {
        const input = yield total;
        if (input === null) return total; // termina el generator
        total += input;
    }
}

const acc = accumulator();
acc.next();       // arranca (hasta el primer yield)
acc.next(10);     // total = 10
acc.next(20);     // total = 30
console.log(acc.next(null)); // { value: 30, done: true }


// --- yield* (delegación) ---
// Delega la iteración a otro generator o iterable.

function* flatten(...iterables) {
    for (const it of iterables) {
        yield* it;
    }
}

console.log([...flatten([1, 2], [3, 4], [5])]); // [1, 2, 3, 4, 5]

// yield* con recursión — aplanar arrays anidados:
function* deepFlatten(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* deepFlatten(item);
        } else {
            yield item;
        }
    }
}

console.log([...deepFlatten([1, [2, [3, [4]], 5]])]); // [1, 2, 3, 4, 5]


// --- Async generators ---
// Combinan generators con async/await para procesar streams de datos.
// Requieren for await...of para consumirlos.

async function* paginate(baseUrl, maxPages = 3) {
    for (let page = 1; page <= maxPages; page++) {
        // En un caso real: const res = await fetch(`${baseUrl}?page=${page}`)
        // Simulamos con datos falsos:
        yield { page, items: [`item-${page}-1`, `item-${page}-2`] };
    }
}

async function main() {
    for await (const pageData of paginate('https://api.example.com/items')) {
        console.log(`Página ${pageData.page}:`, pageData.items);
    }
}
main();
