// ============================================================
// 11 - TEMPLATE LITERAL TYPES
// ============================================================
// Como los template literals de JavaScript (los backticks),
// pero a nivel de tipos. Permiten construir tipos de string
// que representan patrones específicos.
//
// Combinados con unions, mapped types y conditional types,
// desbloquean APIs increíblemente expresivas — son la base de
// los tipos de librerías como tRPC o los routers tipados.
// ============================================================

// Básico: concatenar strings literales
type Greeting = `Hello, ${string}`

const a: Greeting = 'Hello, world'   // ok
const b: Greeting = 'Hello, Matias'  // ok
// const c: Greeting = 'Hi, Matias'  ❌ no matchea el patrón


// --- Con union types: se expanden automáticamente ---
// Cuando combinás template literals con unions, TS genera
// todas las combinaciones posibles.

type Direction = 'top' | 'right' | 'bottom' | 'left'
type CSSMargin = `margin-${Direction}`
// 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left'

type Axis = 'x' | 'y'
type Scale = 'sm' | 'md' | 'lg'
type SpacingClass = `gap-${Axis}-${Scale}`
// 'gap-x-sm' | 'gap-x-md' | 'gap-x-lg' | 'gap-y-sm' | 'gap-y-md' | 'gap-y-lg'


// --- Utility types de string ---
// TS trae 4 built-in para manipular string literal types:

type A = Uppercase<'hello'>      // 'HELLO'
type B = Lowercase<'HELLO'>      // 'hello'
type C = Capitalize<'hello'>     // 'Hello'
type D = Uncapitalize<'Hello'>   // 'hello'

// Son muy útiles combinados con mapped types:
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent  = EventName<'click'>   // 'onClick'
type ChangeEvent = EventName<'change'>  // 'onChange'


// --- Caso de uso: event emitter tipado ---
// Combiná mapped types + template literals para
// generar nombres de handlers automáticamente.

type EventMap = {
    click:  { x: number; y: number }
    keydown: { key: string; ctrlKey: boolean }
    resize: { width: number; height: number }
}

type EventHandlers = {
    [K in keyof EventMap as `on${Capitalize<string & K>}`]: (event: EventMap[K]) => void
}

// Genera:
// {
//   onClick:   (event: { x: number; y: number }) => void
//   onKeydown: (event: { key: string; ctrlKey: boolean }) => void
//   onResize:  (event: { width: number; height: number }) => void
// }

function createWidget(handlers: Partial<EventHandlers>) {}

createWidget({
    onClick:   (e) => console.log(e.x, e.y),  // e está tipado
    onKeydown: (e) => console.log(e.key),
})


// --- infer con template literal types ---
// Podés capturar partes de un string literal.

// Extraer la parte dinámica de una ruta:
type ExtractParam<T extends string> =
    T extends `/:${infer Param}` ? Param : never

type P1 = ExtractParam<'/:id'>    // 'id'
type P2 = ExtractParam<'/:userId'> // 'userId'
type P3 = ExtractParam<'/users'>   // never  (no tiene parámetro)

// Extraer prefijo y sufijo:
type GetPrefix<T extends string> =
    T extends `${infer Prefix}-${string}` ? Prefix : never

type PX = GetPrefix<'margin-top'>    // 'margin'
type PY = GetPrefix<'padding-left'>  // 'padding'
type PZ = GetPrefix<'color'>         // never


// --- Getters y Setters automáticos ---
// Dado un tipo de configuración, generar su API tipada:

interface Config {
    host: string
    port: number
    debug: boolean
}

type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type Setters<T> = {
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void
}

type ConfigAPI = Getters<Config> & Setters<Config>
// {
//   getHost: () => string,   setHost: (value: string) => void,
//   getPort: () => number,   setPort: (value: number) => void,
//   getDebug: () => boolean, setDebug: (value: boolean) => void,
// }


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
