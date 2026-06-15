// ============================================================
// 02 - PROXY
// ============================================================
// Con un Proxy ganás control sobre las interacciones con un objeto.
// En vez de hablar con el target directamente, hablás con un
// intermediario que decide qué pasa en cada operación: leer una
// propiedad, escribirla, comprobar si existe, borrarla, etc.
//
// Metáfora: un proxy es un representante. No contactás a la persona
// directamente — hablás con quien actúa en su nombre. En JS:
//   target  → el objeto real
//   handler → reglas de interceptación (traps)
//   proxy   → lo que usás en tu código
// ============================================================


// ============================================================
// PARTE 1: Proxy mínimo
// ============================================================

const person = {
    name: 'John Doe',
    age: 42,
    nationality: 'American',
}

// Segundo argumento: handler (objeto con traps). Vacío = comportamiento normal.
const personProxyPassthrough = new Proxy(person, {})

console.log(personProxyPassthrough.name)  // 'John Doe' — transparente


// ============================================================
// PARTE 2: get y set — los traps más usados
// ============================================================
// get  → se invoca al LEER una propiedad (personProxy.name)
// set  → se invoca al ESCRIBIR (personProxy.age = 43)
//
// IMPORTANTE: get DEBE devolver el valor, si no la lectura retorna undefined.
// IMPORTANTE: set DEBE devolver true si la asignación fue exitosa (en strict mode).

const personLogged = new Proxy(
    { name: 'John Doe', age: 42, nationality: 'American' },
    {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver)
            console.log(`[get] ${String(prop)} → ${value}`)
            return value  // sin esto, personLogged.name sería undefined
        },
        set(target, prop, value, receiver) {
            const previous = Reflect.get(target, prop, receiver)
            console.log(`[set] ${String(prop)}: ${previous} → ${value}`)
            return Reflect.set(target, prop, value, receiver)
        },
    },
)

personLogged.name       // log + devuelve 'John Doe'
personLogged.age = 43   // log + actualiza el target


// ============================================================
// PARTE 3: Validación con Proxy
// ============================================================
// Caso típico: impedir datos inválidos antes de que lleguen al objeto.

function createValidatedPerson(initial) {
    const target = { ...initial }

    return new Proxy(target, {
        get(obj, prop) {
            if (!(prop in obj)) {
                console.warn(`La propiedad "${String(prop)}" no existe en el objeto`)
                return undefined
            }
            return Reflect.get(obj, prop)
        },
        set(obj, prop, value) {
            if (prop === 'age' && typeof value !== 'number') {
                console.warn('age solo acepta números')
                return false  // rechaza la escritura
            }
            if (prop === 'name' && (typeof value !== 'string' || value.length < 2)) {
                console.warn('name debe ser un string de al menos 2 caracteres')
                return false
            }
            console.log(`[validado] ${String(prop)}: ${obj[prop]} → ${value}`)
            return Reflect.set(obj, prop, value)
        },
    })
}

const validated = createValidatedPerson({
    name: 'John Doe',
    age: 42,
    nationality: 'American',
})

validated.name                    // ok
validated.age = 43                // ok
validated.nonExistentProperty     // warn — no existe
validated.age = '44'              // warn — rechazado, age sigue siendo 43
validated.name = ''               // warn — rechazado, name sigue siendo 'John Doe'

console.log(validated.age)        // 43 — el dato inválido nunca entró


// --- Trampa común en validación con get ---
// if (!obj[prop]) falla para valores falsy válidos: 0, '', false.
// Preferí: if (!(prop in obj)) o Object.hasOwn(obj, prop)


// ============================================================
// PARTE 4: Reflect
// ============================================================
// Reflect es el compañero oficial de Proxy. Cada método del handler
// tiene un equivalente en Reflect con la misma firma.
//
//   handler get  ↔ Reflect.get(target, prop, receiver)
//   handler set  ↔ Reflect.set(target, prop, value, receiver)
//   handler has  ↔ Reflect.has(target, prop)
//   handler deleteProperty ↔ Reflect.deleteProperty(target, prop)
//
// Ventajas de Reflect sobre bracket notation:
// - Comportamiento consistente (Reflect.set devuelve boolean)
// - receiver correcto en objetos con herencia / getters
// - Es la API que Proxy espera que uses por dentro

const personReflect = new Proxy(
    { name: 'John Doe', age: 42 },
    {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver)
            console.log(`Reflect.get → ${String(prop)} = ${value}`)
            return value
        },
        set(target, prop, value, receiver) {
            console.log(`Reflect.set → ${String(prop)} = ${value}`)
            return Reflect.set(target, prop, value, receiver)
        },
    },
)

personReflect.name = 'Jane Doe'
console.log(personReflect.name)


// ============================================================
// PARTE 5: Otros traps que conviene conocer
// ============================================================

const observed = new Proxy(
    { items: [] },
    {
        has(target, prop) {
            console.log(`¿Existe "${String(prop)}"?`, prop in target)
            return Reflect.has(target, prop)
        },
        deleteProperty(target, prop) {
            console.log(`Borrando "${String(prop)}"`)
            return Reflect.deleteProperty(target, prop)
        },
        ownKeys(target) {
            console.log('Enumerando keys propias')
            return Reflect.ownKeys(target)
        },
    },
)

'temp' in observed
observed.temp = 1
delete observed.temp
Object.keys(observed)


// ============================================================
// PARTE 6: Casos reales donde aparece
// ============================================================
//
// ✓ Validación en el borde — cuentas bancarias, formularios, configs
// ✓ Logging / debugging — trazá quién lee o muta un objeto compartido
// ✓ Objetos inmutables — set que siempre retorna false o congela el target
// ✓ Lazy loading — get que carga un recurso pesado la primera vez
// ✓ Reactividad — Vue 3 usa Proxy en el core de su sistema reactivo
//
// Ejemplo compacto: cuenta con balance no negativo
function createValidatedAccount(initialBalance) {
    const target = { balance: initialBalance, owner: '' }

    return new Proxy(target, {
        set(obj, prop, value) {
            if (prop === 'balance') {
                if (typeof value !== 'number') throw new TypeError('balance debe ser número')
                if (value < 0) throw new RangeError('balance no puede ser negativo')
            }
            return Reflect.set(obj, prop, value)
        },
    })
}

const account = createValidatedAccount(1000)
account.balance = 1500
// account.balance = -100  → RangeError


// ============================================================
// PARTE 7: Trade-offs
// ============================================================
//
// | Ventaja                         | Costo                              |
// |---------------------------------|------------------------------------|
// | Control fino sin tocar el target| Overhead en cada acceso            |
// | API transparente para el caller | Debugging más opaco (stack traces) |
// | Composable (varios handlers)    | Fácil abusar en hot paths          |
//
// Regla práctica: no envuelvas con Proxy código performance-critical
// (loops apretados, millones de lecturas). Sí usalo en boundaries:
// configs, stores, APIs de dominio, objetos compartidos entre módulos.
//
// Referencias: MDN Proxy, MDN Reflect


// ============================================================
// ANÁLISIS — Perspectiva React / TypeScript (2026)
// ============================================================
//
// ### 1. Idea importante (6 meses)
// Proxy intercepta operaciones sobre objetos en runtime — no confundir
// con Next.js proxy.ts (renombrado de middleware): ese intercepta HTTP,
// el JS Proxy intercepta property access.
//
// ### 2. Problema que resuelve
// Controlar lectura/escritura de un objeto sin modificar su implementación:
// validación, logging, lazy loading, objetos inmutables, reactivity.
//
// ### 3. En React hoy
// - Vue 3 y Preact Signals usan Proxy bajo el capó para reactividad.
// - React NO usa Proxy en su core (Virtual DOM + reconciliación).
// - Podrías envolver props/state en dev para debug, pero es raro en prod.
// - useImperativeHandle expone API controlada — espíritu similar, sin Proxy.
// - Next.js proxy.ts / middleware: interceptor de requests, otro concepto.
//
// ### 4. En TypeScript hoy
// - Proxy está tipado (ProxyHandler<T>), pero los traps pierden inferencia fina.
// - No reemplaza tipos: validación en runtime ≠ narrowing en compile time.
// - Para forms/API: preferí Zod parse + tipos inferidos antes que Proxy ad hoc.
//
// ### 5. En el ecosistema
// - Vue 3 reactivity, Immer (Proxies parciales), MobX (legacy).
// - TanStack Store / Valtio: estado reactivo con Proxy.
// - Next.js 16+: proxy.ts en el edge — HTTP, no object Proxy.
// - React Query: no usa Proxy; cache es Map interno.
//
// ### 6. ¿Lo implementaría manualmente en 2026?
// Raramente en app React. Sí para: validación de config, devtools, libs.
// No para state management — usá Zustand/Immer/Signals. Overhead en hot paths.
//
// ### 7. Preguntas de entrevista
// - Proxy vs Reflect — ¿para qué Reflect? → API pareada, receiver correcto.
// - ¿get debe retornar qué? → el valor; si no, undefined.
// - ¿Proxy vs Object.defineProperty? → Proxy intercepta dinámicamente; defineProperty es estático.
// - ¿Next middleware vs JS Proxy? → HTTP vs objeto.
// - ¿Por qué Vue usa Proxy y React no? → modelo reactivo vs explicit re-render.
//
// ### 8. Ejercicio práctico (~10 min)
// Los ejercicios de abajo cubren logging, inmutabilidad y validación.
// Priorizá #3 (createUserProfile) — es el patrón más transferible a
// validación de formularios antes de setState.
//
// ### 9. Estado actual
// Object Proxy: activo en libs reactivas y runtime validation. No es patrón
// de app React day-to-day. Next.js "proxy" es terminología nueva para
// edge request interception — colisión de nombres a recordar.


// ============================================================
// EJERCICIOS
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
