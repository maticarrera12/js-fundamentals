// ============================================================
// 07 - GENERICS
// ============================================================
// Generics permiten escribir código que funciona con cualquier
// tipo pero conserva el tipado. En vez de usar `any` (que
// destruye toda la info de tipo), usás un "tipo parámetro" <T>
// que TS resuelve en base a cómo lo llamás.
//
// Regla: si ves que usarías `any` para hacer algo flexible,
// probablemente necesitás un generic.
// ============================================================


// SIN generics, perdés el tipo de retorno:
function getFirstAny(array: any[]): any {
    return array[0]
}
const resultAny = getFirstAny([1, 2, 3]) // resultAny es 'any' — TypeScript no sabe nada


// CON generics, el tipo se preserva:
function getFirst<T>(array: T[]): T {
    return array[0]
}
const firstNumber = getFirst([1, 2, 3])      // firstNumber es number
const firstString = getFirst(['a', 'b', 'c']) // firstString es string

// TS infiere <T> automáticamente según lo que pasás.
// También podés ser explícito: getFirst<number>([1, 2, 3])


// --- Generic interfaces ---
// Muy común para respuestas de API: la estructura es siempre la misma,
// pero el tipo de `data` cambia.

interface ApiResponse<T> {
    data: T
    status: number
    ok: boolean
    message?: string
}

interface User {
    id: number
    name: string
}

const userResponse: ApiResponse<User> = {
    data: { id: 1, name: 'Matias' },
    status: 200,
    ok: true
}

const listResponse: ApiResponse<User[]> = {
    data: [{ id: 1, name: 'Matias' }, { id: 2, name: 'Carla' }],
    status: 200,
    ok: true
}

// Un solo tipo genérico, dos usos completamente distintos.


// --- Constraints (extends) ---
// A veces necesitás que T tenga ciertas propiedades mínimas.
// Con "T extends TipoBase" le ponés un límite inferior a T.

interface WithId {
    id: number
}

function findById<T extends WithId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id)
}

const users: User[] = [{ id: 1, name: 'Matias' }, { id: 2, name: 'Carla' }]
const found = findById(users, 1) // found es User | undefined

// T puede ser cualquier cosa que TENGA id: number.
// findById(['a', 'b'], 1)  ← error! string no tiene .id


// --- keyof ---
// keyof T devuelve un union type con todas las keys del tipo T.
// Combinado con generics, garantizás acceso seguro a propiedades.

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}

const user: User = { id: 1, name: 'Matias' }
const name = getProperty(user, 'name')  // name es string
const id = getProperty(user, 'id')      // id es number
// getProperty(user, 'email')  ← error! 'email' no existe en User


// --- Múltiples type params ---

function merge<A, B>(a: A, b: B): A & B {
    return { ...a, ...b } as A & B
}

const merged = merge({ name: 'Matias' }, { age: 25 })
// merged es { name: string } & { age: number }
// merged.name y merged.age están ambos disponibles y tipados


// --- Generics en clases ---

class Stack<T> {
    private items: T[] = []

    push(item: T): void {
        this.items.push(item)
    }

    pop(): T | undefined {
        return this.items.pop()
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1]
    }

    isEmpty(): boolean {
        return this.items.length === 0
    }
}

const numberStack = new Stack<number>()
numberStack.push(1)
numberStack.push(2)
const top = numberStack.peek() // top es number


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
