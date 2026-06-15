// ============================================================
// 03 - PROTOTYPE
// ============================================================
// En los libros clásicos (GoF), Prototype es clonar: tenés un
// objeto plantilla y generás copias cuando necesitás una nueva.
// Eso tenía sentido en C++ y Smalltalk, donde instanciar una clase
// re-ejecutaba setup en cada new.
//
// JavaScript invierte la idea. Clonar sigue importando — veremos
// structuredClone y <template> más abajo — pero el lenguaje está
// construido sobre delegación: un objeto puede delegar búsquedas a
// otro en runtime, sin copiar nada. Eso es lo que hace que class
// funcione por debajo.
//
// Este apunte cubre las dos mitades:
//   1. Prototype como delegación (forma nativa de JS)
//   2. Prototype como plantilla/clon (forma clásica)
// ============================================================


// ============================================================
// PARTE 1: Delegación — cada objeto apunta a otro
// ============================================================
// Todo objeto tiene un slot interno [[Prototype]]: null o referencia
// a otro objeto. Al leer una propiedad, el motor busca en el objeto;
// si no está, sigue la cadena hasta encontrarla o llegar a null.

const widget = {
    render() {
        return `<div class="${this.theme}">${this.label}</div>`
    },
}

const button = Object.create(widget)
button.label = 'Save'
button.theme = 'primary'

console.log(button.render())                      // delega render a widget
console.log(Object.getPrototypeOf(button) === widget)  // true

// button solo tiene label y theme como propias.
// render vive en widget, pero button lo invoca vía la cadena.


// --- class es azúcar sintáctico sobre lo mismo ---

class Widget {
    render() {
        return `<div class="${this.theme}">${this.label}</div>`
    }
}

class IconButton extends Widget {
    constructor({ label, theme, icon }) {
        super()
        this.label = label
        this.theme = theme
        this.icon = icon
    }

    render() {
        return `${super.render()}<span>${this.icon}</span>`
    }
}

const saveBtn = new IconButton({ label: 'Save', theme: 'primary', icon: '💾' })
console.log(saveBtn.render())

// Cadena: saveBtn → IconButton.prototype → Widget.prototype → Object.prototype → null
// Los métodos existen UNA vez por clase, no por instancia.
// 10.000 IconButtons comparten la misma referencia a render().
// Ese es el win de memoria del GoF — en JS lo tenés gratis si
// declarás métodos en el cuerpo de la class, no dentro del constructor.


// ============================================================
// PARTE 2: Clonar — cuando la delegación no alcanza
// ============================================================
// Delegación comparte comportamiento. Para estado independiente
// (configs anidadas, fixtures distintas), necesitás copiar.


// --- 1. Spread: copia superficial + overrides (90% de los casos) ---

const baseConfig = {
    retries: 3,
    timeoutMs: 5000,
    headers: { 'User-Agent': 'patterns.dev' },
}

const prodConfig = { ...baseConfig, timeoutMs: 30_000 }

console.log(prodConfig.timeoutMs)                          // 30000
console.log(prodConfig.headers === baseConfig.headers)     // true ⚠️ mismo objeto anidado

prodConfig.headers['X-Trace'] = 'abc'
console.log(baseConfig.headers['X-Trace'])                 // 'abc' — mutación compartida


// --- 2. structuredClone: copia profunda nativa ---

const config = {
    createdAt: new Date('2025-01-15'),
    tags: new Set(['beta', 'internal']),
    endpoints: new Map([
        ['read', '/r'],
        ['write', '/w'],
    ]),
}

const configCopy = structuredClone(config)
configCopy.tags.add('experimental')

console.log(config.tags.has('experimental'))       // false — independientes
console.log(configCopy.endpoints.get('read'))      // '/r'

// Limitaciones: no clona funciones, nodos DOM ni instancias de clase
// con su prototipo intacto. Pensalo como "deep clone de estado serializable".


// --- 3. Clonar instancia de clase (prototipo + props propias) ---

class User {
    constructor(name, role) {
        this.name = name
        this.role = role
    }

    describe() {
        return `${this.name} (${this.role})`
    }
}

function cloneInstance(instance) {
    const copy = Object.create(Object.getPrototypeOf(instance))
    return Object.assign(copy, structuredClone({ ...instance }))
}

const original = new User('Matias', 'admin')
const cloned = cloneInstance(original)

cloned.role = 'viewer'

console.log(original.describe())   // Matias (admin)
console.log(cloned.describe())     // Matias (viewer)
console.log(cloned instanceof User)  // true — cadena de prototipo preservada


// ============================================================
// PARTE 3: <template> en el DOM (comentario — requiere browser)
// ============================================================
//
// El browser trae el patrón prototype para nodos DOM:
//
//   <template id="card">
//     <article class="card">
//       <h3 class="card-title"></h3>
//       <p class="card-body"></p>
//     </article>
//   </template>
//
//   const cardTemplate = document.getElementById('card')
//
//   function makeCard({ title, body }) {
//     const node = cardTemplate.content.cloneNode(true)
//     node.querySelector('.card-title').textContent = title
//     node.querySelector('.card-body').textContent = body
//     return node
//   }
//
//   list.append(makeCard({ title: 'Hello', body: 'World' }))
//
// El HTML se parsea una vez. cloneNode(true) copia el subárbol sin
// re-parsear ni ejecutar scripts. Más rápido que innerHTML en un loop.


// ============================================================
// PARTE 4: Fixtures y object builders (tests)
// ============================================================
// Mucho código de tests ES el patrón prototype con otro nombre:
// un objeto base + overrides por llamada.

function buildUser(overrides = {}) {
    return {
        id: crypto.randomUUID(),
        email: 'user@example.com',
        role: 'viewer',
        createdAt: new Date(),
        ...overrides,
    }
}

const admin = buildUser({ role: 'admin' })
const banned = buildUser({ role: 'viewer', bannedAt: new Date() })

console.log(admin.role)    // admin
console.log(banned.role)   // viewer
console.log(admin.id !== banned.id)  // true — ids independientes


// Variante con merge profundo de un nivel (headers, metadata):
function buildRequest(overrides = {}) {
    const base = {
        method: 'GET',
        headers: { Accept: 'application/json' },
        timeoutMs: 5000,
    }
    return {
        ...base,
        ...overrides,
        headers: { ...base.headers, ...overrides.headers },
    }
}

const req = buildRequest({ method: 'POST', headers: { Authorization: 'Bearer x' } })
console.log(req.headers.Accept)        // application/json
console.log(req.headers.Authorization) // Bearer x


// ============================================================
// PARTE 5: Object.create(null) — diccionarios sin prototipo
// ============================================================
// Con {} las búsquedas caen en Object.prototype (toString, etc.).
// Con claves no confiables, eso abre prototype pollution.

const safeHeaders = Object.create(null)
safeHeaders.toString = 'soy un valor, no el método toString'
safeHeaders['__proto__'] = 'solo un string, no un agujero de seguridad'

console.log(safeHeaders.toString)     // 'soy un valor...'
console.log(Object.getPrototypeOf(safeHeaders))  // null

// Para input arbitrario de usuarios, preferí Map — no tiene esa footgun.


// ============================================================
// PARTE 6: Records y Tuples (TC39 — mirada al futuro)
// ============================================================
// Propuesta stage 2: valores inmutables estructurales
//   #{ x: 1 }  → Record
//   #[1, 2]    → Tuple
//
// Comparación estructural: #{ x: 1 } === #{ x: 1 } sería true.
// "Clonar" no tendría sentido — ya son valores. Cuando aterricen,
// mucho código de deep-clone-with-overrides se simplifica.


// ============================================================
// PARTE 7: Cuándo usar qué (tabla mental)
// ============================================================
//
// | Necesidad                              | Enfoque                          |
// |----------------------------------------|----------------------------------|
// | Compartir comportamiento entre objetos | class u Object.create            |
// | Variante de config con tweaks          | spread (1 nivel) o structuredClone |
// | Reusar subárbol DOM muchas veces       | <template> + cloneNode(true)     |
// | Datos de test con defaults sensatos    | builder + spread de overrides    |
// | Dict seguro con claves arbitrarias     | Object.create(null) o Map        |
// | Duplicar instancia de clase            | Object.create(getPrototypeOf) + copy |


// ============================================================
// ANÁLISIS — Perspectiva React / TypeScript (2026)
// ============================================================
//
// ### 1. Idea importante (6 meses)
// En JS el "prototype" es delegación (compartir métodos), no clonar.
// Para copias independientes: spread (shallow) o structuredClone (deep).
//
// ### 2. Problema que resuelve
// - Delegación: compartir comportamiento sin duplicar funciones en memoria.
// - Clonado: crear instancias/configs independientes desde una plantilla.
//
// ### 3. En React hoy
// - class Component extends React.Component usa prototype chain (legacy).
// - Componentes funcionales: no prototype chain visible — closures + hooks.
// - {...props} y {...state} al mergear: prototype-as-template (shallow).
// - structuredClone raro en UI; Immer produce drafts inmutables distinto.
// - <template> + cloneNode en componentes que manipulan DOM imperativo.
//
// ### 4. En TypeScript hoy
// - class X extends Y es prototype + tipos estáticos encima.
// - Object.create(null) para dicts seguros con tipos: Record<string, T> o Map.
// - cloneInstance + generics: posible pero manual; preferí factories tipadas.
// - Utility types (Partial, Omit) reemplazan mucho "clonar con overrides".
//
// ### 5. En el ecosistema
// - React: prototype chain irrelevante en FC; herencia de clases casi muerta.
// - Testing: factory functions (buildUser) en Vitest — patrón prototype puro.
// - Next.js/RSC: no aplica directo; serialización reemplaza clonado de clases.
// - lodash cloneDeep → structuredClone nativo hoy.
//
// ### 6. ¿Lo implementaría manualmente en 2026?
// Delegación: ya la tenés con class (poco) o composición (mucho).
// Clonado manual: no — spread, structuredClone, Immer, o factory builders.
// cloneInstance solo si mantenés clases con instanceof en dominio legacy.
//
// ### 7. Preguntas de entrevista
// - ¿Diferencia __proto__ vs prototype? → instancia vs función constructora.
// - ¿spread clona deep? → no, un nivel; objetos anidados compartidos.
// - ¿structuredClone limitaciones? → no funciones, no DOM, no clases con proto.
// - ¿Object.create(null) por qué? → evita prototype pollution.
// - ¿Cómo funciona class bajo el capó? → prototype chain + constructor.
//
// ### 8. Ejercicio práctico (~10 min)
// Ejercicios #2 (structuredClone vs spread) y #3 (buildProduct) son los
// más útiles para tests React. Hacelos antes del resto.
//
// ### 9. Estado actual
// Delegación via prototype: mecanismo del lenguaje, siempre activo.
// "Prototype as clone": reemplazado por spread/structuredClone/factories.
// class extends en React: legacy; FC + hooks ganaron.


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Sin usar class, modelá un "vehicle" con método describe() usando
//    Object.create. Creá "car" y "truck" que deleguen a vehicle pero
//    tengan type distinto. Verificá la cadena con getPrototypeOf.
// Tu código acá:


// 2. Partí de baseConfig de este archivo. Creá stagingConfig con
//    structuredClone que cambie timeoutMs pero NO comparta headers
//    con baseConfig. Demostrá mutando stagingConfig.headers que
//    baseConfig no se afecta.
// Tu código acá:


// 3. Escribí buildProduct(overrides) para tests con defaults:
//    { id, sku: 'SKU-001', name: 'Widget', price: 9.99, inStock: true }
//    Creá tres productos distintos con overrides mínimos.
// Tu código acá:


// 4. Implementá cloneInstance(instance) vos mismo (como arriba) y
//    probalo con una clase que tenga un método. Confirmá instanceof.
// Tu código acá:


// 5. Explicá en comentarios: ¿por qué esto es peligroso con {} normal
//    pero seguro con Object.create(null) o Map?
//
//    const store = {}
//    const key = '__proto__'
//    store[key] = { isAdmin: true }
//
// Tu respuesta acá:
