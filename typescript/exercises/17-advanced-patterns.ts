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
