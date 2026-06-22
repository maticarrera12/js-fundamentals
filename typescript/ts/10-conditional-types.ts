// ============================================================
// 10 - CONDITIONAL TYPES
// ============================================================
// Son tipos que cambian según una condición.
// Sintaxis: T extends U ? X : Y
// "Si T es asignable a U, el tipo resultante es X; si no, es Y."
//
// Combinados con generics, permiten que el tipo de retorno
// de una función dependa del tipo que le pasás.
// ============================================================

// Básico:
type IsString<T> = T extends string ? true : false

type A = IsString<string>    // true
type B = IsString<number>    // false
type C = IsString<'hello'>   // true  ('hello' extiende string)
type D = IsString<string[]>  // false


// --- Uso real: tipo de retorno que depende del input ---

type WrapInArray<T> = T extends any[] ? T : T[]

type E = WrapInArray<string>    // string[]   (no era array, lo wrappea)
type F = WrapInArray<string[]>  // string[]   (ya era array, no lo toca)


// --- infer ---
// La keyword más poderosa de los conditional types.
// Dentro de la condición, capturás una parte del tipo
// con "infer NombreVariable" para usarla en el resultado.

// Extraer el tipo del elemento de un array:
type ElementOf<T> = T extends (infer Item)[] ? Item : never

type G = ElementOf<string[]>  // string
type H = ElementOf<number[]>  // number
type I = ElementOf<boolean>   // never  (no es array)


// Así está implementado ReturnType internamente:
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function createSession(userId: number) {
    return { userId, token: 'abc', expiresAt: new Date() }
}

type Session = MyReturnType<typeof createSession>
// { userId: number; token: string; expiresAt: Date }


// Así está implementado Parameters:
type MyParameters<T> = T extends (...args: infer P) => any ? P : never

function login(email: string, password: string, remember: boolean): void {}

type LoginArgs = MyParameters<typeof login>
// [email: string, password: string, remember: boolean]


// --- Distributive conditional types ---
// Cuando T es un union type, el conditional se aplica
// INDIVIDUALMENTE a cada miembro del union.

type ToArray<T> = T extends any ? T[] : never

type J = ToArray<string | number>
// string[] | number[]     ← se distribuyó sobre cada miembro
// (NO es (string | number)[])

// Para evitar la distribución, envolvés T en una tupla:
type ToArrayNonDistrib<T> = [T] extends [any] ? T[] : never

type K = ToArrayNonDistrib<string | number>
// (string | number)[]     ← no se distribuyó


// --- Exclude y Extract (implementación real) ---

// Exclude: quita de T los tipos que son asignables a U
type MyExclude<T, U> = T extends U ? never : T

type L = MyExclude<'a' | 'b' | 'c', 'a'>    // 'b' | 'c'
type M = MyExclude<string | number, string>   // number

// Extract: mantiene de T solo los que son asignables a U
type MyExtract<T, U> = T extends U ? T : never

type N = MyExtract<'a' | 'b' | 'c', 'a' | 'b'>  // 'a' | 'b'


// --- Caso de uso real: tipado de una función overloaded ---
// El tipo de retorno cambia según el parámetro:

type ParseResult<T extends 'number' | 'boolean' | 'string'> =
    T extends 'number'  ? number  :
    T extends 'boolean' ? boolean :
    string

function parse<T extends 'number' | 'boolean' | 'string'>(
    value: string,
    as: T
): ParseResult<T> {
    if (as === 'number')  return Number(value) as ParseResult<T>
    if (as === 'boolean') return (value === 'true') as ParseResult<T>
    return value as ParseResult<T>
}

const num = parse('42', 'number')      // num es number
const flag = parse('true', 'boolean')  // flag es boolean
const str = parse('hello', 'string')   // str es string


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

interface Account {
    id: number
    owner: string
    balance: number
}

// C1. La sintaxis base. Escribí "IsNumber<T>": true si T extiende
//     number, false en caso contrario.
//     Esperado: IsNumber<42> → true, IsNumber<Account> → false
// Tu código acá:


// C2. infer básico. Escribí "ElementType<T>" que, si T es un array,
//     devuelva el tipo de sus elementos (con infer); si no, never.
//     Esperado: ElementType<Account[]> → Account
//               ElementType<string>    → never
// Tu código acá:


// C3. Distributive conditional. Escribí "ToBox<T>" que, para cada
//     miembro de un union, lo envuelva en una tupla de un elemento.
//     Esperado para ToBox<string | number>:
//       [string] | [number]    ← se distribuye sobre cada miembro
// Tu código acá:


// C4. Filtrar un union (como MyExclude de arriba, pero aislado).
//     Escribí "WithoutBalance<T, K>" que quite de T los miembros
//     asignables a K.
//     Esperado: WithoutBalance<'id' | 'owner' | 'balance', 'balance'> → 'id' | 'owner'
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá un tipo "Flatten<T>" que:
//    - Si T es T[], devuelve T
//    - Si T es Promise<T>, devuelve T
//    - Si no es ninguno, devuelve T tal cual
//    Ejemplo: Flatten<string[]> → string
//             Flatten<Promise<number>> → number
//             Flatten<boolean> → boolean
// Tu código acá:


// 2. Creá un tipo "NonFunctionKeys<T>" que devuelva solo
//    las keys de T cuyo valor NO es función.
//    Ejemplo: { id: number, name: string, greet: () => void }
//             → 'id' | 'name'
//    Tip: combiná con mapped types y never para filtrar.
// Tu código acá:


// 3. Creá un tipo "Awaited<T>" (ya existe en TS moderno, hacelo vos)
//    que desenvuelva un Promise recursivamente:
//    Awaited<Promise<Promise<string>>> → string
//    Awaited<number> → number
//    Tip: usá infer y recursión en el conditional type.
// Tu código acá:

export {}
