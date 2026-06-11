// ============================================================
// 22 - NÚMEROS Y MATH
// ============================================================
// En 02-data-types viste el tipo number. Acá está lo que falta
// para usarlo sin sorpresas: por qué 0.1 + 0.2 no es 0.3,
// cómo parsear y formatear, y el objeto Math.
// Complementa la Etapa 0 — se agregó después, por eso el número.
// ============================================================


// --- El problema de precisión (sí, es en serio) ---
// number es IEEE 754 de 64 bits: BINARIO. Igual que 1/3 no se puede
// escribir exacto en decimal (0.3333...), 0.1 no se puede escribir
// exacto en binario. El error de redondeo es inevitable:

console.log(0.1 + 0.2)          // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3)  // false 😱

// NO es un bug de JS — le pasa a Python, Java, C... a todo lo que use floats.

// Solución 1: comparar con tolerancia, no con ===
function nearlyEqual(a, b, epsilon = Number.EPSILON) {
    return Math.abs(a - b) < epsilon
}
console.log(nearlyEqual(0.1 + 0.2, 0.3))  // true

// Solución 2 (LA regla para dinero): trabajá en ENTEROS.
// Los enteros hasta 2^53 - 1 son exactos. Guardá centavos, no pesos:
const priceCents = 1999          // $19.99
const taxCents = Math.round(priceCents * 0.21)
const totalCents = priceCents + taxCents
console.log(totalCents / 100)    // recién dividís al MOSTRAR
// Por esto las APIs de pago (Stripe, MercadoPago) usan centavos enteros.


// --- Límites de los enteros ---
console.log(Number.MAX_SAFE_INTEGER)        // 9007199254740991 (2^53 - 1)
console.log(9007199254740991 + 1)            // 9007199254740992 ✓
console.log(9007199254740991 + 2)            // 9007199254740992 ⚠️ ¡mismo valor!

// Pasado el límite, los enteros PIERDEN precisión silenciosamente.
console.log(Number.isSafeInteger(2 ** 53))   // false
// Para enteros gigantes (IDs de bases de datos, crypto): bigint (02-data-types).


// --- Parsear: de string a number ---
// Cuatro formas con comportamientos DISTINTOS:

Number('42')        // 42
Number('42.5px')    // NaN — todo o nada
Number('')          // 0  ⚠️ string vacío es 0
Number(null)        // 0  ⚠️
Number(undefined)   // NaN

parseInt('42.9')     // 42 — corta en el punto (NO redondea)
parseInt('42px')     // 42 — parsea hasta donde puede
parseInt('px42')     // NaN — tiene que EMPEZAR con número
parseInt('08')       // 8 — pero SIEMPRE pasá la base: parseInt('08', 10)

parseFloat('3.14abc')   // 3.14 — como parseInt pero con decimales

+'42'               // 42 — el + unario, equivale a Number()

// ¿Cuál usar? Number() para validar input (estricto es bueno);
// parseInt/parseFloat solo cuando QUERÉS tolerar basura al final ('42px').


// --- Chequear: NaN, isInteger, isFinite ---
// Las versiones de Number.* son las correctas — las globales coercionan:

isNaN('hola')              // true  ⚠️ coerciona el string primero — mentirosa
Number.isNaN('hola')       // false — solo true para NaN de verdad
Number.isNaN(0 / 0)        // true

Number.isInteger(42)       // true
Number.isInteger(42.0)     // true — 42.0 ES 42 (no hay tipos separados)
Number.isInteger(42.5)     // false

Number.isFinite(Infinity)  // false
Number.isFinite('42')      // false — sin coerción, a diferencia del global


// --- Formatear: de number a string ---

const value = 1234.5678

value.toFixed(2)         // '1234.57' — ⚠️ devuelve STRING, no number
value.toFixed(0)         // '1235'

// toFixed es para MOSTRAR. Si necesitás seguir calculando:
Math.round(value * 100) / 100   // 1234.57 (number)

// Para separadores de miles y monedas NO concatenes a mano —
// Intl.NumberFormat (lo ves a fondo en advanced/05-dates-intl):
value.toLocaleString('es-AR')   // '1.234,568'

;(255).toString(16)      // 'ff' — a otra base (hex, para colores)
;(5).toString(2)         // '101' — binario
parseInt('ff', 16)       // 255 — el camino de vuelta


// --- Math: el toolbox ---

// Redondeo — cuatro sabores, OJO con los negativos:
Math.round(4.5)    // 5  — al más cercano (.5 va para arriba)
Math.floor(4.9)    // 4  — siempre para abajo
Math.ceil(4.1)     // 5  — siempre para arriba
Math.trunc(4.9)    // 4  — corta los decimales
Math.floor(-4.5)   // -5 ⚠️ "para abajo" es MÁS negativo
Math.trunc(-4.5)   // -4 — corta hacia cero (lo que solés querer)

// Min, max — reciben argumentos sueltos; con array, spread:
Math.max(3, 7, 2)            // 7
const nums = [3, 7, 2]
Math.max(...nums)            // 7
// ⚠️ con arrays ENORMES (100k+) el spread revienta el stack — usá reduce

// Otros que usás seguido:
Math.abs(-5)        // 5
Math.sqrt(16)       // 4
2 ** 10             // 1024 — el operador ** reemplazó a Math.pow
Math.sign(-3)       // -1 (1 si positivo, 0 si cero)
Math.hypot(3, 4)    // 5 — distancia euclidiana, sin sqrt(a²+b²) a mano

// Math.random: decimal en [0, 1) — el helper de rango es tuyo:
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
randomInt(1, 6)     // dado de 6 caras 🎲
// ⚠️ NO sirve para tokens/seguridad — para eso crypto (advanced/06)


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí "addPrices(a, b)" que sume dos precios decimales SIN
//    error de precisión (convertí a centavos, sumá, volvé).
//    Verificá: addPrices(0.1, 0.2) === 0.3 debe ser true.
// Tu código acá:


// 2. Escribí "parseUserInput(raw)" que reciba un string y devuelva:
//    - el number si es un número válido y finito
//    - null en cualquier otro caso ('', 'abc', '12px', null...)
//    Decidí: ¿Number() o parseFloat()? Justificá en un comentario.
// Tu código acá:


// 3. Escribí "formatBytes(bytes)" que convierta bytes a la unidad
//    legible más grande: 1536 → '1.5 KB', 1048576 → '1 MB'.
//    Tip: dividí por 1024 en loop (o usá Math.log) y toFixed(1).
// Tu código acá:
