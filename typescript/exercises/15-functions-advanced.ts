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
