// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.
// (Necesitás zod instalado: pnpm add zod)

/*
// C1. El type guard artesanal (sin Zod). Escribí "isPositive(value: unknown): value is number"
//     que devuelva true solo si "typeof value === 'number' && value > 0".
//     Esperado: isPositive(5) → true; isPositive(-1) → false; isPositive('5') → false.
// Tu código acá:


// C2. El schema más chico posible. Escribí "AgeSchema = z.number().int().positive()"
//     e inferí "type Age = z.infer<typeof AgeSchema>". Probá
//     "AgeSchema.parse(25)" (anotá qué devuelve) y "AgeSchema.parse(-3)"
//     (anotá qué tira).
// Tu código acá:


// C3. safeParse en vez de parse. Con el mismo AgeSchema de C2, escribí
//     una función "tryParseAge(data: unknown)" que use ".safeParse(data)"
//     y devuelva un mensaje distinto si "result.success" es true o false
//     (este es el patrón Result del archivo 17, aplicado a Zod).
// Tu código acá:


// C4. Un campo opcional con default. Escribí
//     "SettingsSchema = z.object({ theme: z.enum(['light', 'dark']).default('light') })".
//     Parseá "{}" (objeto vacío) y comentá qué valor queda en "theme".
// Tu código acá:
*/


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
