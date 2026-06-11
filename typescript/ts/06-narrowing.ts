// ============================================================
// 06 - TYPE NARROWING
// ============================================================
// TypeScript no solo chequea tipos estáticos — también "achica"
// (narrow) el tipo de una variable según el flujo de tu código.
// Dentro de un if/else, TS sabe exactamente qué tipo puede ser.
//
// Ya lo usaste sin darte cuenta en 04-type-assertions:
// el "instanceof HTMLCanvasElement" es narrowing.
// ============================================================


// --- typeof ---
// Funciona con primitivos: string, number, boolean, bigint, symbol, undefined, function

function formatValue(value: string | number): string {
    if (typeof value === 'string') {
        return value.toUpperCase()  // TS sabe que es string acá
    }
    return value.toFixed(2)         // TS sabe que es number acá
}


// --- truthiness ---
// JavaScript trata '', 0, null, undefined, NaN, false como falsy.
// TS aprovecha eso para narrowear.

function printName(name: string | null) {
    if (name) {
        console.log(name.toUpperCase()) // name es string (no null ni "")
    } else {
        console.log('Sin nombre')
    }
}


// --- operador "in" ---
// Chequea si una propiedad existe en un objeto.
// Ideal cuando tenés tipos que difieren por sus propiedades.

type Fish = { swim: () => void }
type Bird = { fly: () => void }

function moveAnimal(animal: Fish | Bird) {
    if ('swim' in animal) {
        animal.swim() // TS sabe que es Fish
    } else {
        animal.fly() // TS sabe que es Bird
    }
}


// --- instanceof ---
// Ya lo usaste. Funciona con clases y constructores.

function processError(error: unknown) {
    if (error instanceof Error) {
        console.log(error.message) // TS sabe que es Error, tiene .message
    } else {
        console.log('Error desconocido')
    }
}


// --- discriminated unions ---
// El patrón más poderoso de narrowing.
// Todos los tipos en la union tienen una propiedad "tag" con valor literal.
// TS la usa para discriminar entre ellos en un switch/if.

type Circle = {
    kind: 'circle'
    radius: number
}

type Rectangle = {
    kind: 'rectangle'
    width: number
    height: number
}

type Triangle = {
    kind: 'triangle'
    base: number
    height: number
}

type Shape = Circle | Rectangle | Triangle

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2  // TS sabe que es Circle
        case 'rectangle':
            return shape.width * shape.height   // TS sabe que es Rectangle
        case 'triangle':
            return (shape.base * shape.height) / 2
    }
}

// Si agregás un tipo nuevo a Shape y olvidás el case, TS te avisa.
// Eso es exactamente lo que querés: errores en compile time, no en runtime.


// --- type predicates (custom type guards) ---
// Cuando typeof/instanceof no alcanzan, escribís tu propio guard.
// La firma "param is Type" le dice a TS qué tipo es dentro del if.

interface Admin {
    role: 'admin'
    permissions: string[]
}

interface RegularUser {
    role: 'user'
    name: string
}

type AppUser = Admin | RegularUser

function isAdmin(user: AppUser): user is Admin {
    return user.role === 'admin'
}

function handleUser(user: AppUser) {
    if (isAdmin(user)) {
        console.log('Permisos:', user.permissions) // TS sabe que es Admin
    } else {
        console.log('Usuario:', user.name)          // TS sabe que es RegularUser
    }
}


// --- assertion functions ---
// Variante de los type guards: en vez de devolver boolean, LANZAN
// si el valor no cumple. La firma "asserts param is Type" le dice a TS:
// "si esta función retornó sin lanzar, el tipo quedó narroweado".

function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error(`Se esperaba string, llegó ${typeof value}`)
    }
}

function processRaw(input: unknown): string {
    assertIsString(input)
    return input.toUpperCase()  // de acá en adelante, input es string
}

// Variante sin tipo: "asserts condition" — narrowing por condición.
// Útil para invariantes: cosas que "no deberían pasar nunca".
function assert(condition: unknown, message: string): asserts condition {
    if (!condition) throw new Error(message)
}

function getConfigValue(config: { apiUrl?: string }): string {
    assert(config.apiUrl, 'apiUrl es requerido')
    return config.apiUrl  // TS sabe que ya no es undefined
}

// type predicate → para ramificar lógica (if/else con ambos casos válidos)
// assertion function → para cortar ejecución (el caso inválido es un bug)


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "describe" que reciba string | number | boolean.
//    - Si es string: devuelve `texto: ${valor}`
//    - Si es number: devuelve `número: ${valor}`
//    - Si es boolean: devuelve `booleano: ${valor}`
// Tu código acá:


// 2. Definí una discriminated union para estos tipos de notificación:
//    - EmailNotification: { kind: 'email', to: string, subject: string }
//    - SMSNotification: { kind: 'sms', phone: string }
//    - PushNotification: { kind: 'push', deviceId: string, title: string }
//    Escribí una función "sendNotification" que loguee el canal correcto
//    según el kind. TS debe quejarse si te olvidás de algún caso.
// Tu código acá:


// 3. Escribí un type guard "isStringArray" que reciba unknown y retorne
//    true solo si el valor es un array donde TODOS los elementos son string.
//    Tip: Array.isArray + every.
// Tu código acá:

export {}
