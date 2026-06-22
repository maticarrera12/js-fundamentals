// ============================================================
// 05 - INTERFACES
// ============================================================
// Las interfaces describen la "forma" de un objeto.
// Son similares a los type aliases para objetos, pero con
// tres características únicas: pueden extenderse, mergear
// declaraciones, y usarse con "implements" en clases.
// ============================================================


// --- Sintaxis básica ---

interface Product {
    id: string
    name: string
    category: string
    price: number
}

interface Item {
    name: string
    price: number
    description?: string  // opcional — puede ser undefined
    readonly id: number   // solo lectura — no se puede modificar después de crear
}

const sword: Item = { name: 'Infinity Edge', price: 3400, id: 1 }
// sword.id = 2  ❌ error: id es readonly


// --- Métodos ---
// Dos formas de declarar un método (equivalentes en la mayoría de casos):

interface Logger {
    log(message: string): void          // forma método
    error: (message: string) => void    // forma propiedad-función
}

// La diferencia aparece en herencia y override — la forma método es más flexible.


// --- extends ---
// Una interface puede heredar de una o varias.
// El resultado tiene todas las propiedades de la jerarquía.

interface BaseEntity {
    id: number
    createdAt: Date
    updatedAt: Date
}

interface User extends BaseEntity {
    name: string
    email: string
}

interface AdminUser extends User {
    permissions: string[]
    superAdmin: boolean
}

// Extender múltiples interfaces a la vez:
interface AuditedUser extends User, BaseEntity {
    createdBy: string
    updatedBy: string
}


// --- Declaration merging ---
// Las interfaces se pueden "reabrir" y extender desde cualquier lugar del código.
// Los type aliases NO — declarar el mismo type dos veces es error.
// Es por esto que @types/node puede agregar métodos a tipos globales de TS.

interface AppWindow {
    title: string
}

interface AppWindow {      // misma interface, segunda declaración
    scrollY: number        // TS las fusiona automáticamente
}

// Resultado: AppWindow tiene title Y scrollY
const win: AppWindow = { title: 'Home', scrollY: 0 }


// --- Index signatures ---
// Cuando no sabés los nombres de las keys de antemano,
// pero sí el tipo de sus valores.

interface StringMap {
    [key: string]: string
}

const translations: StringMap = {
    hello: 'hola',
    goodbye: 'adiós',
    thanks: 'gracias',
}

// Combinando index signature con propiedades explícitas:
// Las propiedades explícitas DEBEN ser compatibles con el tipo del index.
interface FlexibleConfig {
    [key: string]: string | number  // index amplio
    host: string                    // ✓ string es compatible
    port: number                    // ✓ number es compatible
    // active: boolean              ❌ boolean no es compatible
}


// --- Interface vs Type alias ---
//
// Usá interface cuando:
//   ✓ describís la forma de un objeto o clase
//   ✓ necesitás declaration merging (extender tipos de librerías)
//   ✓ usás "implements" en clases
//   ✓ querés que la jerarquía sea explícita y legible
//
// Usá type cuando:
//   ✓ union types:       type Status = 'active' | 'inactive'
//   ✓ intersection:      type Admin = User & Permissions
//   ✓ utility types:     type PartialUser = Partial<User>
//   ✓ tuplas:            type Pair = [string, number]
//   ✓ primitivos:        type ID = string | number
//
// Regla práctica: interface para objetos con identidad, type para todo lo demás.

// ✅ interface — objeto con identidad y posible herencia
interface Animal {
    name: string
    makeSound(): string
}

interface Dog extends Animal {
    breed: string
}

// ✅ type — union, intersección o transformación
type AnimalStatus = 'healthy' | 'sick' | 'unknown'
type DogWithStatus = Dog & { status: AnimalStatus }
type PartialDog = Partial<Dog>


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


// 2. Usá declaration merging para agregar una propiedad "appVersion: string"
//    a la interface global Window (con declare global).
//    Luego escribí una función "getVersion(): string" que acceda a
//    window.appVersion de forma tipada.
// Tu código acá:


// 3. Definí una interface "EventEmitter<TEvents>" donde TEvents es un objeto
//    que mapea nombre de evento → tipo del payload.
//    Debe tener:
//    - on<K extends keyof TEvents>(event: K, handler: (data: TEvents[K]) => void): void
//    - emit<K extends keyof TEvents>(event: K, data: TEvents[K]): void
//    Ejemplo de uso:
//    type AppEvents = { login: { userId: number }; logout: {} }
//    const emitter: EventEmitter<AppEvents> = ...
// Tu código acá:

export {}
