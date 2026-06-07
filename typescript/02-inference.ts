// ============================================================
// 02 - INFERENCIA Y TIPOS ESPECIALES
// ============================================================
// TS infiere la mayoría de los tipos automáticamente.
// Los tipos especiales (any, unknown, void, never) describen
// casos límite del sistema de tipos. Entenderlos es entender
// qué puede y qué no puede razonar el compilador.
// ============================================================


// --- Inferencia ---
// TS deduce el tipo del valor asignado — no hace falta anotar en la mayoría de casos.

const language = 'TypeScript'  // inferido: literal 'TypeScript' (no solo string)
const version  = 5             // inferido: number
const tags     = ['ts', 'js']  // inferido: string[]

// TS infiere el retorno de funciones según lo que devuelven:
function double(n: number) {
    return n * 2  // retorno inferido: number — no hace falta anotarlo
}

// Inferencia contextual: TS usa el contexto para inferir tipos en callbacks.
const numbers = [1, 2, 3, 4, 5]
numbers.map(n => n * 2)    // n inferido como number por el array
numbers.filter(n => n > 2) // también

// Cuándo anotar explícitamente:
// - Parámetros de funciones públicas (no se pueden inferir desde afuera)
// - Cuando querés un tipo más específico del que TS inferiría
// - Como documentación de intención


// --- any ---
// Desactiva el type checker para ese valor — podés hacer lo que quieras.
// Evitalo. Cuando usás any, TypeScript deja de ayudarte.

let value: any = 'hola'
value = 42             // ok — any acepta cualquier reasignación
value.inexistente      // ok — TS no chequea propiedades
value()                // ok — TS no chequea si es función

// any es contagioso: cualquier cosa que derives de any también es any
const derived = value.someMethod()  // derived es any


// --- unknown ---
// La alternativa segura a any. Acepta cualquier valor,
// pero te OBLIGA a narrowear antes de usarlo.
// Regla: cuando no sabés el tipo, usá unknown, no any.

function processInput(input: unknown): string {
    // input.toUpperCase()  ❌ error — tenés que narrowear primero
    if (typeof input === 'string')  return input.toUpperCase()
    if (typeof input === 'number')  return String(input)
    if (Array.isArray(input))       return input.join(', ')
    return 'tipo no soportado'
}

// Caso más común: errores en catch
// En TS 4.0+ el tipo de error en catch es unknown (con useUnknownInCatchVariables)
try {
    JSON.parse('{invalid}')
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message)  // seguro — sabemos que tiene .message
    }
}


// --- void ---
// Tipo de retorno de funciones que no devuelven nada útil.
// Diferente de undefined: void significa "el valor de retorno se ignora".

function logMessage(msg: string): void {
    console.log(msg)
}

// Callbacks tipados como void PUEDEN devolver un valor — se descarta.
// Esto es intencional: te permite pasar cualquier función como callback
// sin que TS se queje porque retorna algo.
type Handler = (event: string) => void
const handler: Handler = (e) => `procesado: ${e}`  // válido — el retorno se ignora


// --- never ---
// El tipo vacío: ningún valor puede ser de tipo never.
// Aparece en funciones que nunca terminan normalmente
// y como señal de que un branch de código es inalcanzable.

function throwError(msg: string): never {
    throw new Error(msg)
    // no hay return — nunca termina normalmente
}

// Exhaustiveness checking: si llegás al default con un tipo no manejado, TS da error
type Shape = 'circle' | 'square' | 'triangle'

function getArea(shape: Shape): number {
    switch (shape) {
        case 'circle':   return Math.PI * 5 ** 2
        case 'square':   return 5 * 5
        case 'triangle': return (5 * 4) / 2
        default: {
            // Si agregás un valor a Shape y olvidás el case,
            // TS falla acá porque shape ya no sería never
            const _exhaustive: never = shape
            return throwError(`Shape no manejado: ${_exhaustive}`)
        }
    }
}


// --- typeof (operador de tipo) ---
// Extrae el tipo de una variable o expresión existente.
// Útil cuando tenés el valor pero no el tipo definido.

const defaultConfig = {
    host: 'localhost',
    port: 3000,
    debug: true,
    options: { timeout: 5000 }
}

type Config = typeof defaultConfig
// { host: string; port: number; debug: boolean; options: { timeout: number } }
// Si defaultConfig cambia, Config se actualiza automáticamente.


// --- ReturnType ---
// Extrae el tipo de retorno de una función.
// Evita definir el mismo tipo dos veces.

function createSession(userId: number) {
    return {
        userId,
        token: crypto.randomUUID(),
        expiresAt: new Date()
    }
}

type Session = ReturnType<typeof createSession>
// { userId: number; token: string; expiresAt: Date }
// Si la función cambia, Session se actualiza automáticamente.


// --- Type indexing ---
// Accedés al tipo de una propiedad específica con ['key'].

type User = {
    id: number
    profile: {
        name: string
        address: { city: string; zip: string }
    }
}

type Profile = User['profile']                    // { name: string; address: {...} }
type City    = User['profile']['address']['city'] // string


// --- Intersection types (&) ---
// Une múltiples tipos en uno que tiene TODAS las propiedades de cada uno.
// Diferencia con interface extends: & es una operación de tipos (más flexible),
// extends es semántica de herencia (más expresivo para jerarquías).

type Named   = { name: string }
type Timed   = { createdAt: Date }
type Audited = Named & Timed & { updatedBy: string }

function createRecord(name: string): Audited {
    return { name, createdAt: new Date(), updatedBy: 'system' }
}


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función genérica "safeExecute<T>" que reciba () => T,
//    la ejecute en un try/catch, y devuelva:
//    { ok: true; value: T } si funciona
//    { ok: false; error: string } si lanza
//    Usá unknown en el catch para tipar el error de forma segura.
// Tu código acá:


// 2. Tenés este objeto:
//    const theme = { primary: '#007bff', secondary: '#6c757d', fontSize: 16 }
//    Sin crear un type manualmente, usá typeof para tipar una función
//    "applyTheme(theme: ???)". Luego usá ReturnType para tipar su resultado.
// Tu código acá:


// 3. Definí AppEvent como union de:
//    - { type: 'login';  userId: number }
//    - { type: 'logout'; userId: number }
//    - { type: 'error';  message: string }
//    Escribí "processEvent(event: AppEvent): string" con exhaustiveness checking.
//    Verificá que si agregás un nuevo evento sin manejar el case, TS da error.
// Tu código acá:

export {}
