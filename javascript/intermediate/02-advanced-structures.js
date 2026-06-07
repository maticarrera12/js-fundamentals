// ============================================================
// 02 - ESTRUCTURAS DE DATOS AVANZADAS
// ============================================================
// Arrays, Sets y Maps son las tres colecciones principales de JS.
// Este archivo cubre los métodos que usás en el día a día:
// transformar, filtrar, buscar, ordenar y agrupar datos.
// ============================================================


// --- Métodos funcionales de arrays ---
// Estos métodos NO mutan el array original — devuelven uno nuevo.
// Son la base del estilo funcional en JS.

const products = [
    { name: 'Remera', price: 2500, stock: 10 },
    { name: 'Pantalón', price: 5500, stock: 0 },
    { name: 'Zapatillas', price: 12000, stock: 3 },
    { name: 'Gorra', price: 1800, stock: 7 },
]

// forEach → ejecuta una función por elemento. No devuelve nada (void).
// Usalo cuando solo te importa el efecto, no el resultado.
products.forEach(p => console.log(`${p.name}: $${p.price}`))

// map → transforma cada elemento. Devuelve array del mismo tamaño.
const names = products.map(p => p.name)           // ['Remera', 'Pantalón', ...]
const prices = products.map(p => p.price)

// filter → conserva solo los elementos que pasan la condición.
const inStock = products.filter(p => p.stock > 0)
const expensive = products.filter(p => p.price > 3000)

// reduce → acumula todos los elementos en un único valor.
// El segundo argumento (0) es el valor inicial del acumulador.
const totalStock = products.reduce((acc, p) => acc + p.stock, 0)
const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0)

// Encadenar métodos — filtrás, transformás, acumulás:
const inStockValue = products
    .filter(p => p.stock > 0)
    .reduce((acc, p) => acc + (p.price * p.stock), 0)


// --- Métodos de manipulación ---

// flat → aplana subarrays un nivel (o N niveles con flat(N))
const nested = [1, [2, 3], [4, [5, 6]]]
console.log(nested.flat())    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2))   // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity)) // aplana sin importar la profundidad

// flatMap → map + flat(1) en un paso. Muy útil para expandir elementos.
const sentences = ['hola mundo', 'javascript mola']
const words = sentences.flatMap(s => s.split(' '))
// ['hola', 'mundo', 'javascript', 'mola']

// sort → ordena IN PLACE (muta el original). Siempre pasale un comparador.
// Sin comparador, convierte a string → '10' < '9' (incorrecto para números).
const nums = [3, 1, 4, 1, 5, 9, 2, 6]
const sorted = [...nums].sort((a, b) => a - b)  // spread para no mutar nums
const sortedDesc = [...nums].sort((a, b) => b - a)

const sortedByPrice = [...products].sort((a, b) => a.price - b.price)

// slice → extrae una porción sin mutar. [inicio, fin) — el fin no se incluye.
const first3 = sorted.slice(0, 3)
const last2  = sorted.slice(-2)


// --- Métodos de búsqueda ---

// includes → ¿está este valor? (usa ===)
console.log(nums.includes(4))  // true

// find → primer elemento que cumple la condición (o undefined)
const pricey = products.find(p => p.price > 10000)  // { name: 'Zapatillas', ... }

// findIndex → índice del primer elemento que cumple (o -1)
const idx = products.findIndex(p => p.stock === 0)  // 1 (Pantalón)

// some → ¿alguno cumple? (cortocircuito — para en el primer true)
const hasOutOfStock = products.some(p => p.stock === 0)   // true

// every → ¿todos cumplen? (cortocircuito — para en el primer false)
const allHavePrice = products.every(p => p.price > 0)     // true


// --- Set ---
// Colección de valores únicos. Muy útil para deduplicar y operaciones de conjuntos.

const tags = new Set(['ts', 'js', 'react', 'ts', 'js'])
console.log(tags.size)  // 3 — duplicados eliminados

tags.add('node')
tags.delete('react')
console.log(tags.has('ts'))  // true

// Conversión a array:
const tagArray = Array.from(tags)
const tagArray2 = [...tags]

// Deduplicar un array — patrón muy común:
const withDupes = [1, 2, 2, 3, 3, 3, 4]
const unique = [...new Set(withDupes)]  // [1, 2, 3, 4]

// Operaciones de conjuntos (ES2024):
const setA = new Set([1, 2, 3, 4])
const setB = new Set([3, 4, 5, 6])

const union        = setA.union(setB)         // {1, 2, 3, 4, 5, 6}
const intersection = setA.intersection(setB)  // {3, 4}
const difference   = setA.difference(setB)    // {1, 2} — en A pero no en B

console.log(setA.isSubsetOf(setB))    // false
console.log(setA.isSupersetOf(setB))  // false

// Iterar:
for (const tag of tags) {
    console.log(tag)
}


// --- Map ---
// Colección de pares clave-valor donde la clave puede ser cualquier tipo.
// Diferencia con objeto: preserva el orden de inserción,
// acepta claves no-string (objetos, funciones), y tiene un tamaño explícito.

const userMap = new Map([
    ['id', 1],
    ['name', 'Matias'],
    ['role', 'admin'],
])

userMap.set('email', 'mati@example.com')
console.log(userMap.get('name'))  // 'Matias'
console.log(userMap.has('role'))  // true
console.log(userMap.size)         // 4
userMap.delete('role')

// Iterar:
for (const [key, value] of userMap) {
    console.log(`${key}: ${value}`)
}

// Conversiones:
const objFromMap = Object.fromEntries(userMap)   // Map → objeto
const mapFromObj = new Map(Object.entries(objFromMap))  // objeto → Map


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado este array de órdenes:
//    const orders = [
//      { id: 1, user: 'Ana', total: 1500, status: 'paid' },
//      { id: 2, user: 'Luis', total: 800, status: 'pending' },
//      { id: 3, user: 'Ana', total: 3200, status: 'paid' },
//      { id: 4, user: 'Luis', total: 200, status: 'cancelled' },
//    ]
//    Con un solo encadenamiento de métodos, calculá el total facturado
//    solo de órdenes pagas (status: 'paid').
// Tu código acá:


// 2. Escribí una función "groupBy(arr, key)" que agrupe un array
//    de objetos por el valor de una propiedad.
//    groupBy(orders, 'user') → { Ana: [...], Luis: [...] }
//    Usá reduce para implementarla.
// Tu código acá:


// 3. Dado un array de strings con posibles duplicados,
//    usá Set para devolver solo los valores únicos
//    Y encontrá los que aparecen más de una vez (los duplicados).
// Tu código acá:
