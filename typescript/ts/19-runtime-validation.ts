// ============================================================
// 19 - VALIDACIÓN EN RUNTIME
// ============================================================
// LA verdad incómoda de TypeScript: los tipos SE BORRAN al compilar.
// En runtime no existe ningún chequeo. Todo lo que entra desde
// afuera — APIs, formularios, env vars, JSON.parse, localStorage —
// es una PROMESA sin garantía.
//
// Este archivo cierra el círculo que abrió 04: ahí usaste
// `as GithubSearchResponse` y dijimos "cuidado, no verifica nada".
// Acá está la solución real.
//
// Para correr los ejemplos: pnpm add zod
// ============================================================


// --- El problema: la frontera ---
// Adentro de tu programa, TS garantiza coherencia. Pero en la FRONTERA
// (red, disco, usuario), los datos llegan sin tipo real:

type UserApi = {
    id: number
    name: string
    email: string
}

async function fetchUserNaive(id: number): Promise<UserApi> {
    const res = await fetch(`/api/users/${id}`)
    return await res.json() as UserApi
    // Esto NO valida nada. Si la API cambió y ahora id es string,
    // el error explota lejos de acá — en algún user.id.toFixed()
    // tres archivos más allá, donde nadie sospecha de la API.
}


// --- Solución artesanal: type guards (recap de 06) ---
// Funciona, pero mirá el costo de mantenerlo:

function isUserApi(value: unknown): value is UserApi {
    return (
        typeof value === 'object' && value !== null &&
        'id' in value && typeof (value as UserApi).id === 'number' &&
        'name' in value && typeof (value as UserApi).name === 'string' &&
        'email' in value && typeof (value as UserApi).email === 'string'
    )
}
// Tres campos = ya es ilegible. Y si UserApi cambia, tenés que
// actualizar el tipo Y el guard a mano — dos fuentes de verdad. Mal.


// --- La solución real: schemas (Zod) ---
// Un schema es la definición ÚNICA: valida en runtime Y genera el tipo.
// "Parse, don't validate": no preguntás "¿es válido?" — lo PARSEÁS
// y obtenés un valor con tipo garantizado, o un error explícito.

// Nota: ejemplos con Zod 4 — la API actual (z.email() top-level, etc.)

/*
import { z } from 'zod'

// 1. Definís el schema (esta es tu única fuente de verdad):
const UserSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    email: z.email(),
    role: z.enum(['admin', 'user', 'guest']).default('user'),
    createdAt: z.coerce.date(),   // acepta string ISO y lo convierte a Date
})

// 2. El tipo se DERIVA del schema — nunca lo escribís a mano:
type User = z.infer<typeof UserSchema>
// { id: number; name: string; email: string;
//   role: 'admin' | 'user' | 'guest'; createdAt: Date }

// 3. parse: lanza ZodError si no cumple — para datos que DEBEN ser válidos
const user = UserSchema.parse(await res.json())
// user es User, GARANTIZADO — no asumido como con `as`

// 4. safeParse: devuelve un Result — para datos que PUEDEN venir mal
//    (¿te suena? es el patrón Result del archivo 17, de serie)
const result = UserSchema.safeParse(formData)
if (result.success) {
    console.log(result.data)          // User tipado
} else {
    console.log(result.error.issues)  // lista de errores, con paths
}
*/


// --- El patrón completo: fetch tipado Y validado ---
// Compará con fetchUserNaive de arriba — mismo esfuerzo, garantía real:

/*
async function fetchUser(id: number): Promise<User> {
    const res = await fetch(`/api/users/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return UserSchema.parse(await res.json())
    // Si la API cambió, el error salta ACÁ, con un mensaje que dice
    // exactamente qué campo vino mal — no tres archivos más allá.
}
*/


// --- Dónde validar (y dónde NO) ---
// Validás en las FRONTERAS, una sola vez:
//
//   ✓ respuestas de APIs externas
//   ✓ bodies de requests que recibe tu servidor
//   ✓ formularios del usuario
//   ✓ process.env al arrancar la app
//   ✓ JSON.parse de localStorage / archivos
//
//   ✗ entre funciones internas de tu propio código
//     (ahí TS YA garantiza los tipos — validar de nuevo es ruido)
//
// El modelo mental: tu app es un castillo. Zod es el guardia del
// PORTÓN. Adentro del castillo no le pedís documentos a nadie.


// --- Caso real: env vars tipadas ---
// process.env es Record<string, string | undefined> — inútil.
// Validalo UNA vez al arrancar y exportá el resultado:

/*
const EnvSchema = z.object({
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(3000),       // "3000" → 3000
    NODE_ENV: z.enum(['development', 'production', 'test']),
})

export const env = EnvSchema.parse(process.env)
// Si falta una variable, la app NO ARRANCA — con un error claro.
// Mil veces mejor que un crash a las 3am porque DATABASE_URL era undefined.
*/


// --- Schemas componibles ---
// Los schemas se derivan igual que los utility types (08):

/*
const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true })
const UpdateUserSchema = CreateUserSchema.partial()
const UserListSchema   = z.array(UserSchema)

type CreateUserDTO = z.infer<typeof CreateUserSchema>
type UpdateUserDTO = z.infer<typeof UpdateUserSchema>
// Omit, Partial, arrays… pero con validación incluida.
*/

// Alternativas a Zod que vale conocer: Valibot (más liviano),
// ArkType (más rápido). El CONCEPTO es idéntico en todas:
// schema único → valida en runtime + infiere el tipo estático.


// ============================================================
// EJERCICIOS
// ============================================================

// Para hacerlos en serio: creá un mini proyecto con
//   pnpm init && pnpm add zod typescript
// o hacelos acá si ya tenés zod instalado en el repo.

// 1. Definí un schema "ProductSchema" con:
//    - id: uuid
//    - name: string no vacío, máx 100 chars
//    - price: number positivo con hasta 2 decimales
//    - tags: array de strings, opcional, default []
//    Inferí el tipo Product y escribí "parseProduct(data: unknown): Product".
// Tu código acá:


// 2. Reescribí el fetch de GitHub del archivo 04 usando Zod:
//    schema para GithubRepo y GithubSearchResponse, parse en vez de `as`.
//    Probá romper el schema a propósito (cambiá un campo a otro tipo)
//    y mirá qué error da — compará con el `as` silencioso.
// Tu código acá:


// 3. Modelá un evento de webhook con discriminated union de Zod:
//    z.discriminatedUnion('type', [...]) con:
//    - { type: 'payment.success', amount: number, orderId: string }
//    - { type: 'payment.failed', reason: string, orderId: string }
//    - { type: 'user.created', userId: string }
//    Escribí "handleWebhook(body: unknown)" que use safeParse y
//    haga switch sobre el type con exhaustividad (assertNever del 17).
// Tu código acá:

export {}
