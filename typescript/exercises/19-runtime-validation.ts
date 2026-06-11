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
