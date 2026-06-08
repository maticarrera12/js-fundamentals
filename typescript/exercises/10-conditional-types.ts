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
