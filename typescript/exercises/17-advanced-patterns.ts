// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

// C1. El branded type mínimo. Sin Result, sin validación: escribí
//     "Brand<T, TBrand extends string>" a mano (un & con una prop
//     fantasma) y un type "PostId = Brand<string, 'PostId'>".
//     Escribí "toPostId(raw: string): PostId" usando "as PostId".
//     Pregunta: ¿por qué este "as" NO es un riesgo como el de 04?
// Tu código acá:


// C2. assertNever con 2 casos. Modelá "type Light = { on: true } | { on: false }"
//     y escribí "describeLight(l: Light): string" con switch sobre "l.on"
//     y un default que llame a "assertNever(l)". Esperado: compila limpio
//     porque true | false son los únicos dos valores posibles.
// Tu código acá:


// C3. Registry mínimo con satisfies. Creá un registry "colors" con
//     dos keys ("primary", "secondary") cuyo valor sea un string,
//     validado con "satisfies Record<string, string>". Extraé
//     "type ColorName = keyof typeof colors" y escribí
//     "getColor(name: ColorName): string" que devuelva "colors[name]".
// Tu código acá:


// C4. Builder con this — un solo método. Escribí una clase "Greeter"
//     con un array privado "parts: string[] = []" y un método
//     "add(part: string): this" que pushee y devuelva "this".
//     Encadená dos ".add(...)" sobre la misma instancia.
// Tu código acá:


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
