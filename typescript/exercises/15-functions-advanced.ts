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
