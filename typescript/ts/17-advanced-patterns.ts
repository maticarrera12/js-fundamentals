// ============================================================
// 17 - PATRONES PRO
// ============================================================
// Patrones que vas a ver (y escribir) en codebases serias.
// Ninguno requiere sintaxis que no conozcas ya — son COMBINACIONES
// inteligentes de generics, unions, narrowing y as const.
// ============================================================


// --- Branded types ---
// El problema (lo viste en 16): UserId y OrderId son ambos string,
// el tipado estructural los considera intercambiables.
// La solución: "marcar" el tipo con una propiedad fantasma que
// solo existe en compile time.

declare const brand: unique symbol

type Brand<T, TBrand extends string> = T & { readonly [brand]: TBrand }

type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>

// Para crear un branded type necesitás una assertion — esa es la gracia:
// solo entra al sistema por la puerta que vos definís.
function toUserId(raw: string): UserId {
    // acá validarías el formato real (uuid, prefijo, etc.)
    return raw as UserId
}

function cancelOrder(orderId: OrderId): void {
    console.log(`Cancelando orden ${orderId}`)
}

const userId = toUserId('user-123')
// cancelOrder(userId)        ❌ UserId no es OrderId — el bug de 16 ya no compila
// cancelOrder('order-9')     ❌ un string pelado tampoco entra

// Costo: cero en runtime (el symbol nunca existe). Beneficio: enorme.
// Zod tiene esto built-in: z.string().brand<'UserId'>()


// --- Result: errores como valores ---
// throw tiene un problema: la firma no dice QUÉ puede fallar.
// function parse(s: string): Config  ← ¿lanza? ¿qué lanza? misterio.
//
// El patrón Result hace el error parte del TIPO de retorno.
// Es una discriminated union (06) aplicada a control de errores.

type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E }

// Helpers para no repetir la estructura:
function ok<T>(value: T): { ok: true; value: T } {
    return { ok: true, value }
}
function err<E>(error: E): { ok: false; error: E } {
    return { ok: false, error }
}

// El error puede ser una union de literales — exhaustivamente manejable:
type ParseError = 'EMPTY_INPUT' | 'INVALID_JSON' | 'MISSING_FIELD'

function parseConfig(raw: string): Result<{ port: number }, ParseError> {
    if (raw.trim() === '') return err('EMPTY_INPUT')

    let data: unknown
    try {
        data = JSON.parse(raw)
    } catch {
        return err('INVALID_JSON')
    }

    if (typeof data !== 'object' || data === null || !('port' in data)) {
        return err('MISSING_FIELD')
    }
    return ok({ port: Number((data as { port: unknown }).port) })
}

// Quien llama está OBLIGADO a considerar el error — no hay try/catch olvidado:
const parsed = parseConfig('{"port": 3000}')
if (parsed.ok) {
    console.log(parsed.value.port)   // TS sabe que value existe
} else {
    console.log(parsed.error)        // TS sabe que error existe
}
// Librerías que implementan esto en serio: neverthrow, effect.


// --- assertNever: exhaustividad reutilizable ---
// En 02 viste exhaustiveness checking inline. El patrón pro es
// extraerlo a un helper que usás en TODOS los switch.

function assertNever(value: never): never {
    throw new Error(`Caso no manejado: ${JSON.stringify(value)}`)
}

type PaymentMethod =
    | { kind: 'card'; last4: string }
    | { kind: 'transfer'; cbu: string }
    | { kind: 'cash' }

function describePayment(method: PaymentMethod): string {
    switch (method.kind) {
        case 'card':     return `Tarjeta terminada en ${method.last4}`
        case 'transfer': return `Transferencia a ${method.cbu}`
        case 'cash':     return 'Efectivo'
        default:         return assertNever(method)
        // Si mañana agregás { kind: 'crypto' }, este default da error
        // de compilación en CADA switch que olvide manejarlo. Eso es ORO.
    }
}


// --- Registries con satisfies ---
// Patrón: un objeto central que registra handlers/configs/rutas,
// validado contra un contrato SIN perder los tipos específicos.

type RouteConfig = {
    path: string
    requiresAuth: boolean
}

const routes = {
    home:     { path: '/',          requiresAuth: false },
    profile:  { path: '/profile',   requiresAuth: true },
    settings: { path: '/settings',  requiresAuth: true },
} satisfies Record<string, RouteConfig>

// satisfies validó el contrato, pero las keys siguen siendo literales:
type RouteName = keyof typeof routes   // 'home' | 'profile' | 'settings'

function navigate(name: RouteName): void {
    console.log(`Navegando a ${routes[name].path}`)
}
navigate('profile')      // ✓ autocompletado de keys reales
// navigate('admin')     ❌ no existe — y nunca escribiste el union a mano


// --- Object.keys y el problema de las keys ---
// Gotcha clásico: Object.keys devuelve string[], NO keyof T.
// Razón: por tipado estructural, el objeto puede tener props extra
// en runtime que el tipo no conoce (lo viste en 16).

const palette = { primary: '#007bff', secondary: '#6c757d' }

// const keys = Object.keys(palette)        → string[]
// palette[keys[0]]                         ❌ string no indexa el objeto

// Solución honesta cuando VOS controlás el objeto:
function typedKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[]
}

for (const key of typedKeys(palette)) {
    console.log(palette[key])  // ✓ key es 'primary' | 'secondary'
}


// --- Builder con this de retorno ---
// Las APIs fluidas (method chaining) se tipan devolviendo `this`.
// Bonus: si una subclase extiende el builder, el chaining
// conserva el tipo de la subclase automáticamente.

class QueryBuilder {
    private conditions: string[] = []
    private limitValue?: number

    where(condition: string): this {
        this.conditions.push(condition)
        return this
    }

    limit(n: number): this {
        this.limitValue = n
        return this
    }

    build(): string {
        const where = this.conditions.length > 0
            ? ` WHERE ${this.conditions.join(' AND ')}`
            : ''
        const limit = this.limitValue !== undefined ? ` LIMIT ${this.limitValue}` : ''
        return `SELECT *${where}${limit}`
    }
}

const query = new QueryBuilder()
    .where('age > 18')
    .where("country = 'AR'")
    .limit(10)
    .build()


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá branded types "Email" y "Url" (ambos sobre string).
//    Escribí "toEmail(raw: string): Result<Email, 'INVALID_EMAIL'>"
//    que valide que contiene '@' antes de brandear.
//    Verificá que no podés pasar un string pelado a una función
//    "sendEmail(to: Email)".
// Tu código acá:


// 2. Modelá los estados de un pedido como discriminated union:
//    - { status: 'pending' }
//    - { status: 'paid'; paidAt: Date }
//    - { status: 'shipped'; trackingId: string }
//    - { status: 'delivered'; deliveredAt: Date }
//    Escribí "describeOrder" con switch + assertNever.
//    Después agregá { status: 'cancelled'; reason: string } y verificá
//    que el compilador te OBLIGA a actualizar la función.
// Tu código acá:


// 3. Creá un registry "validators" con satisfies donde cada key es un
//    nombre de campo y cada valor es (value: string) => boolean.
//    Extraé el tipo "FieldName" de las keys y escribí
//    "validateField(field: FieldName, value: string): boolean".
// Tu código acá:


// 4. (Desafío) Tipá un builder "HttpRequestBuilder" donde .build()
//    SOLO existe después de llamar .url(...).
//    Tip: dos clases (o dos interfaces) — una sin build, otra con build.
//    .url() devuelve la versión "completa".
// Tu código acá:

export {}
