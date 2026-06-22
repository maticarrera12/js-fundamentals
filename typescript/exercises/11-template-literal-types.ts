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

// C1. La sintaxis base. Escribí "AccountId", un template literal type
//     que matchee el patrón `acc_${number}`.
//     Esperado: 'acc_42' es válido, 'acc_abc' NO lo es.
// Tu código acá:


// C2. Union que se expande. Tenés esta union:
type Currency = 'USD' | 'ARS' | 'EUR'
//     Escribí "PriceLabel", un template literal type que combine
//     'price-' con cada Currency.
//     Esperado: 'price-USD' | 'price-ARS' | 'price-EUR'
// Tu código acá:


// C3. Utility type de string. Escribí "ShoutOwner<T>" que devuelva
//     T en mayúsculas (usá Uppercase).
//     Esperado: ShoutOwner<'matias'> → 'MATIAS'
// Tu código acá:


// C4. Combinar con mapped types (como Getters de arriba, pero
//     vos lo escribís). Escribí "AccountGetters" que mapee cada
//     key de Account a un getter `get${Capitalize<K>}`.
//     Esperado: { getId: () => number; getOwner: () => string; getBalance: () => number }
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá un tipo "CSSValue" que represente valores CSS válidos:
//    combinaciones de número con unidades: px, em, rem, %.
//    Ejemplo: '16px', '2em', '100%' deben ser válidos.
//    Tip: `${number}${'px' | 'em' | 'rem' | '%'}`
//    Luego creá "SpacingProps" con top, right, bottom, left: CSSValue.
// Tu código acá:


// 2. Tenés estas rutas:
//    type AppRoutes = '/users' | '/users/:id' | '/products' | '/products/:id'
//    Creá un tipo "StaticRoutes" que deje SOLO las rutas sin parámetros
//    (las que no contienen ':').
//    Tip: conditional type con infer — si matchea `${string}:${string}`, es dinámica.
// Tu código acá:


// 3. (Desafío) Creá un tipo "DeepKeyPaths<T>" que genere todos los
//    caminos de acceso a propiedades anidadas como strings con punto.
//    Ejemplo:
//    { user: { name: string; address: { city: string } } }
//    → 'user' | 'user.name' | 'user.address' | 'user.address.city'
//    Tip: recursivo. Combiná template literals + conditional + mapped + keyof.
// Tu código acá:

export {}
