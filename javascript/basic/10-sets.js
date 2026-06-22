// ============================================================
// 07 - SET
// ============================================================
// Un Set es una colección de valores ÚNICOS y sin índice.
// Internamente usa un hash — has(), add() y delete() son O(1).
// Su uso más común: deduplicar arrays y verificar membresía rápida.
// ============================================================


// --- Creación ---
// Se puede crear vacío o pasándole cualquier iterable.
// Los duplicados se eliminan automáticamente.

const tags = new Set(['js', 'ts', 'react', 'js', 'ts'])
console.log(tags)        // Set { 'js', 'ts', 'react' }
console.log(tags.size)   // 3 — los duplicados no cuentan


// --- Métodos principales ---

tags.add('node')         // agrega un elemento
tags.add('js')           // ya existe — no pasa nada, Set ignora duplicados
tags.delete('react')     // elimina un elemento — devuelve true si existía
console.log(tags.has('ts'))   // true — verificar si existe (O(1), más rápido que includes)
console.log(tags.has('vue'))  // false

// clear() elimina todo:
// tags.clear()


// --- Iteración ---
// Los Sets son iterables — se pueden recorrer con for...of y forEach.

for (const tag of tags) {
    console.log(tag)
}

tags.forEach(tag => console.log(tag))


// --- Conversión ---
// Set ↔ Array es muy común porque los arrays tienen más métodos.

// Set → Array:
const tagArray = Array.from(tags)
const tagArray2 = [...tags]        // spread también funciona

// Array → Set (para deduplicar):
const withDuplicates = [1, 2, 2, 3, 3, 3, 4]
const unique = new Set(withDuplicates)
console.log([...unique])  // [1, 2, 3, 4]

// Deduplicar en una línea — patrón muy usado:
const dedupe = arr => [...new Set(arr)]
console.log(dedupe(['a', 'b', 'a', 'c', 'b']))  // ['a', 'b', 'c']


// --- Cuándo usar Set vs Array ---
// Array: cuando el orden importa, necesitás índices, o querés métodos funcionales (map, filter)
// Set:   cuando solo te importa la unicidad o necesitás has() rápido


// ============================================================
// MÉTODOS MÁS USADOS (referencia rápida)
// ============================================================
//   add(x)        agrega x (lo ignora si ya está); devuelve el Set (encadenable)
//   delete(x)     elimina x; devuelve true si existía
//   has(x)        true/false si x está — O(1), más rápido que includes
//   clear()       vacía el Set
//   size          cantidad de elementos (propiedad, NO método: sin paréntesis)
//   forEach(fn)   ejecuta fn por elemento
//   values()      iterador de valores (keys() es un alias en Set)
//
// Operaciones de conjuntos (ES2024 — Node 22+ / navegadores recientes):
//   a.union(b)               todos los de a y b
//   a.intersection(b)        los que están en ambos
//   a.difference(b)          los de a que no están en b
//   a.symmetricDifference(b) los que están en uno u otro, pero no en ambos
//   a.isSubsetOf(b) · isSupersetOf(b) · isDisjointFrom(b)


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado un array de strings (con posibles duplicados),
//    usá Set para encontrar:
//    - cuántos valores únicos hay
//    - cuáles son los que se repiten
// Tu código acá:


// 2. Implementá una función "intersection(arr1, arr2)" que devuelva
//    los valores que aparecen en AMBOS arrays (sin duplicados).
//    Usá Set para hacerlo eficiente.
// Tu código acá:
