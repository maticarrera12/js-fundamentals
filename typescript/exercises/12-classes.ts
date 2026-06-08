// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una clase abstracta "Animal" con:
//    - Propiedad protected "name"
//    - Método abstracto "makeSound(): string"
//    - Método concreto "describe(): string" que use name y makeSound()
//    Implementala con Dog y Cat.
// Tu código acá:


// 2. Creá una clase "EventEmitter<T>" genérica donde T es un
//    objeto que mapea nombre de evento → tipo del payload.
//    Debe tener:
//    - on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void
//    - emit<K extends keyof T>(event: K, data: T[K]): void
//    Tip: guardá los handlers en un Map o un objeto.
// Tu código acá:


// 3. Creá una clase "Stack<T>" (como en 07-generics pero más completa):
//    - push, pop, peek, isEmpty, size
//    - Un método "toArray(): T[]" que devuelva copia del stack
//    - El constructor puede recibir elementos iniciales opcionales
//    Asegurate de que pop/peek retornen T | undefined correctamente.
// Tu código acá:

export {}
