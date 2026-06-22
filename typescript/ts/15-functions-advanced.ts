// ============================================================
// 15 - FUNCIONES AVANZADAS
// ============================================================
// En 01 viste lo básico: parámetros, retorno, firmas como tipos.
// Acá está todo lo que diferencia a un usuario de TS de alguien
// que diseña APIs tipadas: overloads, this, call signatures,
// y las reglas para escribir buenas funciones genéricas.
// ============================================================


// --- Call signatures con propiedades ---
// Una función en JS es un objeto: puede tener propiedades.
// Para tipar eso, usás la sintaxis de objeto con una "call signature".

type CachedFn = {
    (key: string): number      // así se llama
    cache: Map<string, number> // propiedades que tiene la función
    clear(): void
}

function createCachedLength(): CachedFn {
    const fn = (key: string): number => {
        const cached = fn.cache.get(key)
        if (cached !== undefined) return cached
        const length = key.length
        fn.cache.set(key, length)
        return length
    }
    fn.cache = new Map<string, number>()
    fn.clear = () => fn.cache.clear()
    return fn
}


// --- Overloads ---
// Una función que acepta combinaciones distintas de parámetros
// con retornos distintos. Declarás N firmas públicas + 1 implementación.

// Las firmas públicas (lo que ven los que llaman):
function makeDate(timestamp: number): Date
function makeDate(year: number, month: number, day: number): Date
// La implementación (NO es visible desde afuera — debe cubrir todas las firmas):
function makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {
    if (month !== undefined && day !== undefined) {
        return new Date(yearOrTimestamp, month - 1, day)
    }
    return new Date(yearOrTimestamp)
}

makeDate(1749500000000)   // ✓ firma 1
makeDate(2026, 6, 10)     // ✓ firma 2
// makeDate(2026, 6)      ❌ ninguna firma acepta 2 argumentos

// REGLA: antes de escribir un overload, probá con union types o generics.
// Este overload NO hace falta:
//   function len(s: string): number
//   function len(arr: unknown[]): number
// Porque esto es más simple y acepta lo mismo:
function len(x: string | unknown[]): number {
    return x.length
}

// Overloads valen la pena cuando el RETORNO depende de los parámetros
// y un conditional type sería más críptico que dos firmas claras.


// --- Tipando this ---
// En funciones que se llaman con un contexto (callbacks de librerías,
// métodos asignados dinámicamente), podés declarar qué es `this`.
// Es un "pseudo-parámetro": va primero y desaparece en el JS compilado.

interface DbRow {
    id: number
    deleted: boolean
}

interface Db {
    rows: DbRow[]
    filterRows(predicate: (this: Db, row: DbRow) => boolean): DbRow[]
}

const db: Db = {
    rows: [{ id: 1, deleted: false }, { id: 2, deleted: true }],
    filterRows(predicate) {
        return this.rows.filter(row => predicate.call(this, row))
    },
}

// Quien escribe el callback tiene `this` tipado como Db:
const activeRows = db.filterRows(function (row) {
    return !row.deleted && this.rows.length > 0  // this: Db ✓
})

// Ojo: arrow functions NO tienen this propio — ahí este tipado no aplica.


// --- Construct signatures ---
// Para tipar "algo que se puede instanciar con new".
// Útil en factories que reciben clases como parámetro.

interface Logger {
    log(message: string): void
}

class ConsoleLogger implements Logger {
    log(message: string): void { console.log(message) }
}

class SilentLogger implements Logger {
    log(_message: string): void { /* no hace nada */ }
}

// "new () => Logger" significa: un constructor sin args que produce Logger
function createLogger(LoggerClass: new () => Logger): Logger {
    return new LoggerClass()
}

const logger = createLogger(ConsoleLogger)  // pasás la CLASE, no la instancia
const silent = createLogger(SilentLogger)


// --- Cómo escribir buenas funciones genéricas ---
// Tres reglas del Handbook que evitan generics innecesarios:

// REGLA 1: el type parameter debe aparecer al menos DOS veces.
// Si aparece una sola vez, no relaciona nada — no hace falta.

// ❌ T aparece una vez — no aporta nada:
function greetBad<T extends string>(name: T): void {
    console.log(`Hola ${name}`)
}
// ✅ sin generic es idéntico y más simple:
function greetGood(name: string): void {
    console.log(`Hola ${name}`)
}

// REGLA 2: usá el tipo más "bajo" posible en constraints.
// ❌ constraint a unknown[] pierde el tipo del elemento... mejor:
// ✅ T es el ELEMENTO, no el array:
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0]
}

// REGLA 3: menos type parameters es mejor.
// ❌ F no relaciona nada que T no relacione ya:
function filterBad<T, F extends (item: T) => boolean>(arr: T[], fn: F): T[] {
    return arr.filter(fn)
}
// ✅ la firma de la función va inline:
function filterGood<T>(arr: T[], fn: (item: T) => boolean): T[] {
    return arr.filter(fn)
}


// --- Default type parameters ---
// Como los defaults de parámetros normales, pero para tipos.

type FetchState<TData = unknown> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: TData }
    | { status: 'error'; error: string }

const genericState: FetchState = { status: 'loading' }          // TData = unknown
const userState: FetchState<{ name: string }> = {               // TData explícito
    status: 'success',
    data: { name: 'Matias' },
}


// --- const type parameters (TS 5.0+) ---
// Por defecto, TS "ensancha" los literales al inferir generics:
// pasás ['a', 'b'] y T se infiere como string[].
// Con `const T`, infiere el tipo literal — como un as const automático.

function routesWide<T extends readonly string[]>(routes: T): T {
    return routes
}
const wide = routesWide(['/home', '/about'])
// wide: string[] — perdiste los literales

function routesNarrow<const T extends readonly string[]>(routes: T): T {
    return routes
}
const narrow = routesNarrow(['/home', '/about'])
// narrow: readonly ['/home', '/about'] — literales preservados sin as const


// --- NoInfer (TS 5.4+) ---
// A veces TS infiere T desde el lugar EQUIVOCADO.
// NoInfer<T> bloquea un parámetro como fuente de inferencia.

// Sin NoInfer: defaultValue también "vota" para inferir T —
// createState('loading', 'oops') infiere T = 'loading' | 'oops' (¡bug silencioso!)
function createState<T extends string>(
    initial: T,
    defaultValue: NoInfer<T>,  // este parámetro ya no participa en la inferencia
): { initial: T; defaultValue: T } {
    return { initial, defaultValue }
}

createState('loading', 'loading')   // ✓ T = 'loading'
// createState('loading', 'oops')   ❌ 'oops' no es asignable a 'loading'


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

interface Item {
    id: number
    label: string
}

// C1. Call signature con propiedad. Escribí el type "Counter": una
//     función que se llama sin args y devuelve number, y que ADEMÁS
//     tiene una propiedad "count: number".
//     Esperado: declare const c: Counter; c() es number; c.count es number.
// Tu código acá:


// C2. Overload mínimo. Escribí dos firmas + 1 implementación para
//     "wrap(value: number): number[]" y "wrap(value: string): string[]".
//     La implementación recibe "value: number | string" y devuelve
//     un array de un solo elemento ([value]).
// Tu código acá:


// C3. Tipando this. Escribí una interface "ItemList" con:
//     - items: Item[]
//     - findById(predicate: (this: ItemList, id: number) => Item | undefined): Item | undefined
//     No la implementes — solo declarala. Pregunta: ¿por qué el
//     pseudo-parámetro "this" no aparece cuando LLAMÁS a findById?
// Tu código acá:


// C4. Construct signature. Escribí "buildItem(ItemClass: new (id: number, label: string) => Item): Item"
//     que reciba una CLASE (no una instancia) y devuelva una instancia
//     llamándola con new. Probala con una clase simple que implemente Item.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "getValue" con overloads:
//    - getValue(obj: object, key: string): unknown
//    - getValue(obj: object, key: string, defaultValue: string): string
//    Si la key no existe y hay defaultValue, devuelve el default.
//    Pregunta extra: ¿podrías resolverlo con un generic en vez de overloads?
// Tu código acá:


// 2. Escribí "createCounter" que devuelva una función-objeto:
//    - se llama sin args y devuelve el conteo actual incrementado
//    - tiene una propiedad "reset(): void"
//    - tiene una propiedad readonly "name: string" (recibida por parámetro)
//    Tipala con una call signature.
// Tu código acá:


// 3. Escribí una función genérica "instantiate<T>" que reciba:
//    - una clase con constructor (new (name: string) => T)
//    - un array de nombres (string[])
//    Y devuelva un T[] con una instancia por nombre.
// Tu código acá:


// 4. Refactorizá esta función para que NO use generics innecesarios
//    (pista: aplicá las 3 reglas):
//    function logAll<T extends unknown[], F extends (x: T[number]) => string>(
//        items: T, format: F
//    ): void { items.forEach(i => console.log(format(i))) }
// Tu código acá:

export {}
