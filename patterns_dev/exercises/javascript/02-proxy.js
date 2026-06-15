// ============================================================
// EJERCICIOS — Proxy
// ============================================================
// Apunte teórico: ../../javascript/design-patterns/02-proxy.js
// ⚠️ Leer sección "ANÁLISIS — Perspectiva React / TypeScript (2026)" ANTES.
// ============================================================

// 1. Creá createLoggedObject(target) que devuelva un Proxy donde:
//    - get loguee "LEYENDO clave → valor"
//    - set loguee "ESCRIBIENDO clave: anterior → nuevo"
//    Verificá que leer y escribir funcionan correctamente (get retorna valor).
// Tu código acá:


// 2. Creá createImmutable(target) cuyo set SIEMPRE rechace cambios
//    (retorná false y logueá un warning). get debe seguir funcionando.
//    Intentá mutar una propiedad y confirmá que el target no cambió.
// Tu código acá:


// 3. Implementá createUserProfile(initial) con validación:
//    - email: debe contener '@'
//    - age: número entre 0 y 130
//    - username: string de 3–20 caracteres, solo [a-z0-9_]
//    Si falla, rechazá el set y logueá el motivo.
// Tu código acá:


// 4. Reescribí el handler de get/set del ejercicio 1 usando SOLO Reflect
//    (sin bracket notation). ¿Cambia algo en el comportamiento?
// Tu código acá:


// 5. (Desafío) Proxy con "valores por defecto":
//    Si leés una propiedad que no existe, devolvé undefined SIN warn,
//    pero si el caller usa `prop in proxy` el trap has debe decir false.
//    Tip: combiná get + has + ownKeys según haga falta.
// Tu código acá:
