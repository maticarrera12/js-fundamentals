// ============================================================
// 08 - MAP
// ============================================================
// Un Map es una colección de pares clave-valor donde la clave
// puede ser cualquier tipo (no solo strings como en los objetos).
// Preserva el orden de inserción y tiene un tamaño explícito.
// ============================================================


// --- Creación ---
// Se inicializa con un array de pares [clave, valor].

const userMap = new Map([
    ['name', 'Matias'],
    ['age', 25],
    ['city', 'Buenos Aires']
])
console.log(userMap)
console.log(userMap.size)  // 3


// --- Métodos principales ---

userMap.set('email', 'mati@example.com')   // agrega o actualiza
userMap.set('age', 26)                     // actualiza — si ya existe, reemplaza el valor

console.log(userMap.get('name'))           // 'Matias'
console.log(userMap.get('phone'))          // undefined — clave inexistente
console.log(userMap.has('email'))          // true
userMap.delete('city')                     // elimina un par


// --- Iteración ---
// Map es iterable — expone keys(), values() y entries().

for (const [key, value] of userMap) {
    console.log(`${key}: ${value}`)
}

for (const key of userMap.keys()) {
    console.log(key)
}

for (const value of userMap.values()) {
    console.log(value)
}

userMap.forEach((value, key) => {
    console.log(`${key} → ${value}`)
})


// --- Conversión Map ↔ Object ---

// Map → objeto plano
const obj = Object.fromEntries(userMap)
console.log(obj)  // { name: 'Matias', age: 26, email: '...' }

// objeto → Map
const mapFromObj = new Map(Object.entries({ host: 'localhost', port: 3000 }))


// --- Map vs Object ---
// Map:
//   ✓ clave puede ser cualquier tipo (objeto, función, símbolo)
//   ✓ preserva el orden de inserción garantizado
//   ✓ .size sin trampas
//   ✓ iterable directo
//   ✗ sintaxis más verbosa
//
// Object:
//   ✓ sintaxis literal {} más cómoda
//   ✓ JSON.stringify nativo
//   ✗ solo keys string/symbol
//   ✗ hereda propiedades del prototipo (puede interferir)
//
// Usá Map cuando: la clave no es string, o necesitás mutarlo frecuentemente.
// Usá objeto cuando: es data estática o necesitás serializarlo a JSON.


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado un array de palabras, usá Map para contar cuántas veces
//    aparece cada palabra.
//    ['hola', 'mundo', 'hola', 'js', 'mundo', 'hola']
//    → Map { 'hola' => 3, 'mundo' => 2, 'js' => 1 }
// Tu código acá:


// 2. Implementá una función "cache(fn)" usando Map para memoizar
//    los resultados de una función por su argumento.
//    La segunda vez que se llama con el mismo argumento, devuelve
//    el valor guardado sin recalcular.
// Tu código acá:
