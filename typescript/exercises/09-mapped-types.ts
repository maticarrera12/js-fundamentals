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
