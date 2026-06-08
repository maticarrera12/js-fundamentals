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
