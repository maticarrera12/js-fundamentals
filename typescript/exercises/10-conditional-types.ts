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
