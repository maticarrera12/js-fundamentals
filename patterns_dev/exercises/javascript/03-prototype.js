// ============================================================
// EJERCICIOS — Prototype
// ============================================================
// Apunte teórico: ../../javascript/design-patterns/03-prototype.js
// ⚠️ Leer sección "ANÁLISIS — Perspectiva React / TypeScript (2026)" ANTES.
// ============================================================

// 1. Sin usar class, modelá un "vehicle" con método describe() usando
//    Object.create. Creá "car" y "truck" que deleguen a vehicle pero
//    tengan type distinto. Verificá la cadena con getPrototypeOf.
// Tu código acá:


// 2. Partí de baseConfig (retries, timeoutMs, headers). Creá stagingConfig
//    con structuredClone que cambie timeoutMs pero NO comparta headers
//    con baseConfig. Demostrá mutando stagingConfig.headers que
//    baseConfig no se afecta.
// Tu código acá:


// 3. Escribí buildProduct(overrides) para tests con defaults:
//    { id, sku: 'SKU-001', name: 'Widget', price: 9.99, inStock: true }
//    Creá tres productos distintos con overrides mínimos.
// Tu código acá:


// 4. Implementá cloneInstance(instance) vos mismo y probalo con una
//    clase que tenga un método. Confirmá instanceof.
// Tu código acá:


// 5. Explicá en comentarios: ¿por qué esto es peligroso con {} normal
//    pero seguro con Object.create(null) o Map?
//
//    const store = {}
//    const key = '__proto__'
//    store[key] = { isAdmin: true }
//
// Tu respuesta acá:
