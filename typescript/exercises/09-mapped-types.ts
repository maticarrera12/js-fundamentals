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

// C1. La sintaxis base. Escribí "Stringify<T>": un mapped type que
//     copia las keys de T pero hace que TODOS los valores sean string.
//     Esperado para Stringify<Account>:
//       { id: string; owner: string; balance: string }
// Tu código acá:

type Stringify<T>


// C2. Agregar un modificador. Escribí "Optional<T>" que haga opcional
//     cada key. Es reimplementar Partial — agregás un solo caracter.
//     Esperado para Optional<Account>:
//       { id?: number; owner?: string; balance?: number }
// Tu código acá:


// C3. Quitar un modificador. Dado este tipo:
type LockedAccount = Readonly<Account>
//     Escribí "Unlock<T>" que QUITE el readonly de cada key.
//     Tip: -readonly delante de la key.
// Tu código acá:


// C4. Renombrar keys. Escribí "Flagged<T>" que renombre cada key K
//     a `is_${K}` y haga su valor boolean.
//     Esperado para Flagged<Account>:
//       { is_id: boolean; is_owner: boolean; is_balance: boolean }
//     Tip: [K in keyof T as `is_${string & K}`]: boolean
// Tu código acá:


// C5 Creá un tipo sin id y con email opcional.
interface User {
    id: number;
    name: string;
    email?: string;
}
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
