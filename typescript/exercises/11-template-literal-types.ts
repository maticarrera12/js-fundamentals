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
