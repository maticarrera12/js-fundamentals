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
