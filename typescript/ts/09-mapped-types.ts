// ============================================================
// 09 - MAPPED TYPES
// ============================================================
// Un mapped type itera sobre las keys de un tipo existente
// y crea un tipo nuevo transformando cada una.
// Es básicamente un Array.map pero para tipos.
//
// Todos los utility types de Partial, Required, Readonly
// están implementados con mapped types internamente.
// Acá vas a ver cómo.
// ============================================================

// Sintaxis base:
// type Mapped<T> = { [K in keyof T]: T[K] }
//                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                   "para cada key K de T, el valor es T[K]"

// El más simple: copia exacta del tipo T
type Copy<T> = {
    [K in keyof T]: T[K]
}

interface User {
    id: number
    name: string
    email: string
}

type UserCopy = Copy<User>
// { id: number; name: string; email: string }


// --- Modificadores ---
// Agregás ? para hacer opcional, readonly para solo lectura.
// Anteponés - para QUITAR esas marcas.

// Así está implementado Partial en TS:
type MyPartial<T> = {
    [K in keyof T]?: T[K]   // ? agrega opcional a cada key
}

// Así está implementado Required (-? quita el opcional):
type MyRequired<T> = {
    [K in keyof T]-?: T[K]
}

// Así está implementado Readonly:
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
}

// Mutable: quita el readonly existente
type Mutable<T> = {
    -readonly [K in keyof T]: T[K]
}


// --- Transformar el tipo del valor ---
// No estás limitado a T[K]. Podés usar cualquier tipo.

// Agrega null a todos los valores:
type Nullable<T> = {
    [K in keyof T]: T[K] | null
}

type NullableUser = Nullable<User>
// { id: number | null; name: string | null; email: string | null }


// --- Remapping de keys con "as" ---
// También podés renombrar las keys en el proceso.
// Se combina con template literal types (próximo archivo).

type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type UserGetters = Getters<User>
// { getId: () => number; getName: () => string; getEmail: () => string }


// --- Caso de uso real: formularios ---
// Dado un tipo, generar un tipo paralelo que indique
// si cada campo está validado o no.

type ValidationState<T> = {
    [K in keyof T]: boolean
}

type UserValidation = ValidationState<User>
// { id: boolean; name: boolean; email: boolean }

function validateUser(user: User): UserValidation {
    return {
        id: user.id > 0,
        name: user.name.length > 0,
        email: user.email.includes('@'),
    }
}


// --- Filtrar keys con never ---
// Si en el mapped type ponés never como key, esa propiedad desaparece.
// Útil para construir tipos que excluyen ciertos campos.

type OnlyStrings<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K]
}

interface Mixed {
    id: number
    name: string
    active: boolean
    email: string
}

type StringFields = OnlyStrings<Mixed>
// { name: string; email: string }


// ============================================================
// EJERCICIOS
// ============================================================

interface Product {
    id: number
    name: string
    price: number
    inStock: boolean
}

// 1. Implementá tu propio Pick<T, K> usando mapped types.
//    Tip: en la firma, K extends keyof T.
//         En el mapped type, iterás sobre K (no sobre keyof T).
// Tu código acá:


// 2. Creá un tipo "EventHandlers<T>" que convierta cada key de T
//    en un manejador de evento con prefijo "on".
//    Ejemplo: { name: string } → { onName: (value: string) => void }
//    Tip: as `on${Capitalize<string & K>}`
// Tu código acá:


// 3. Creá un tipo "DeepReadonly<T>" que aplique Readonly
//    recursivamente: si el valor de una key es un objeto,
//    también se lo hace Readonly.
//    Tip: T[K] extends object ? DeepReadonly<T[K]> : T[K]
// Tu código acá:

export {}
