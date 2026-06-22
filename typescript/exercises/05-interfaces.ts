// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

interface Book {
    title: string
    author: string
    pages: number
}

// C1. Sintaxis base + modificadores. Escribí la interface "BookCopy"
//     con las mismas keys que Book, pero agregale:
//     - "notes" opcional (string)
//     - "id" readonly (number)
//     Esperado: { title: string; author: string; pages: number; notes?: string; readonly id: number }
// Tu código acá:


// C2. Métodos. Escribí la interface "BookPrinter" con un método
//     "print(book: Book): void" (forma método) y una propiedad-función
//     "log: (message: string) => void" (forma propiedad-función).
// Tu código acá:


// C3. extends. Escribí la interface "EBook" que herede de "Book"
//     y agregue "fileSizeMb: number". Después escribí la interface
//     "AudioBook" que herede de "Book" Y de una interface nueva
//     "Narratable" con "narrator: string".
// Tu código acá:


// C4. Index signature. Escribí la interface "BookStock" donde las
//     keys son el título del libro (string) y el valor es la
//     cantidad disponible (number). Creá un objeto que la cumpla
//     con al menos dos libros.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Definí una interfaz genérica "IRepository<T>" con:
//    - findById(id: number): T | undefined
//    - findAll(): T[]
//    - save(entity: T): T
//    - delete(id: number): boolean
//    Implementala con una clase "InMemoryRepository<T extends { id: number }>".
// Tu código acá:

interface IRepository<T> {
    findById(id: number): T | undefined
    findAll(): T[]
    save(entity: T): T
    delet(id: number): boolean
}
interface InMemoryRepository<T> extends IRepository<T> {
    id: number
}

// 2. Usá declaration merging para agregar una propiedad "appVersion: string"
//    a la interface global Window (con declare global).
//    Luego escribí una función "getVersion(): string" que acceda a
//    window.appVersion de forma tipada.
// Tu código acá:

declare global {
    interface Window {
        appVersion: string
    }
}
function getVersion(version: string): string {
    return window.appVersion
}

// 3. Definí una interface "EventEmitter<TEvents>" donde TEvents es un objeto
//    que mapea nombre de evento → tipo del payload.
//    Debe tener:
//    - on<K extends keyof TEvents>(event: K, handler: (data: TEvents[K]) => void): void
//    - emit<K extends keyof TEvents>(event: K, data: TEvents[K]): void
//    Ejemplo de uso:
//    type AppEvents = { login: { userId: number }; logout: {} }
//    const emitter: EventEmitter<AppEvents> = ...
// Tu código acá:

interface EventEmitter<TEvents> {
    on<K extends keyof TEvents>(
        event: K,
        handler: (data: TEvents[K]) => void): void
    emit<K extends keyof TEvents>(
        event: K,
        data: TEvents[K]): void
}

type AppEvents = { login: { userId: number }; logout: {} }
export { }
