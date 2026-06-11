// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "describe" que reciba string | number | boolean.
//    - Si es string: devuelve `texto: ${valor}`
//    - Si es number: devuelve `número: ${valor}`
//    - Si es boolean: devuelve `booleano: ${valor}`
// Tu código acá:

function describe(value: string | number | boolean): string {
    if (typeof value === "string") {
        return `texto: ${value}`
    } else if (typeof value === "number") {
        return `numero: ${value}`
    } else if (typeof value === "boolean") {
        return `boolean: ${value}`
    } else {
        return ""
    }
}


// 2. Definí una discriminated union para estos tipos de notificación:
//    - EmailNotification: { kind: 'email', to: string, subject: string }
//    - SMSNotification: { kind: 'sms', phone: string }
//    - PushNotification: { kind: 'push', deviceId: string, title: string }
//    Escribí una función "sendNotification" que loguee el canal correcto
//    según el kind. TS debe quejarse si te olvidás de algún caso.
// Tu código acá:

type EmailNotification = {
    kind: 'email'
    to: string
    subject: string
}

type SMSNotification = {
    kind: 'sms'
    phone: string
}

type PushNotification = {
    kind: 'push'
    deviceID: string
    title: string
}

type NotificationType = EmailNotification | SMSNotification | PushNotification
function sendNotification(notification: NotificationType): string {
    switch (notification.kind) {
        case 'email':
            return `Email para ${notification.to} sobre ${notification.subject}`
        case 'sms':
            return `Mensaje desde el celular ${notification.phone}`
        case 'push':
            return `Desde el dispositivo ${notification.deviceID} sobre ${notification.title}`
        default:
            const _exhaustive: never = notification
            return _exhaustive
    }
}


// 3. Escribí un type guard "isStringArray" que reciba unknown y retorne
//    true solo si el valor es un array donde TODOS los elementos son string.
//    Tip: Array.isArray + every.
// Tu código acá:


function isStringArray(array: unknown): array is string[] {
    if (Array.isArray(array)) {
        const item = array
        if(array.every(item => typeof item === 'string')){
            return true
        }else{
            return false
        }
    }else{
        return false
    }

}


export { }
