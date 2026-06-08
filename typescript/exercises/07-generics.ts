// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función genérica "last" que devuelva el último
//    elemento de un array. Si el array está vacío, devuelve undefined.
//    Tip: el tipo de retorno debería ser T | undefined.
// Tu código acá:


// 2. Escribí una función genérica "filterByProperty" que reciba:
//    - un array de T
//    - una key K (keyof T)
//    - un value del tipo T[K]
//    Y devuelva los elementos donde item[key] === value.
//    Ejemplo: filterByProperty(users, 'name', 'Matias')
// Tu código acá:


// 3. Definí una interfaz genérica "Repository<T>" con estos métodos:
//    - findAll(): T[]
//    - findById(id: number): T | undefined
//    - save(item: T): void
//    - delete(id: number): void
//    Implementala con una clase "InMemoryRepository<T extends WithId>".
// Tu código acá:


// 4. Escribí una función genérica "pipe" que tome un valor inicial
//    de tipo T y un array de funciones (T => T), y aplique cada
//    función en orden al valor.
//    Ejemplo: pipe(5, [x => x * 2, x => x + 1]) → 11
// Tu código acá:

export {}
