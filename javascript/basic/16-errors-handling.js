// ============================================================
// 16 - MANEJO DE ERRORES
// ============================================================
// En JS los errores son excepciones: interrumpen la ejecución normal.
// try/catch permite capturarlas y reaccionar sin romper el programa.
// throw te permite lanzar tus propios errores con información útil.
// ============================================================


// --- try / catch ---
// El código dentro de try se ejecuta normalmente.
// Si lanza una excepción, salta al catch — el resto de try se saltea.

try {
    const obj = undefined
    console.log(obj.property)  // TypeError: Cannot read properties of undefined
    console.log('Esta línea no se ejecuta')
} catch (error) {
    console.log('Se capturó un error:', error.message)
}

// El bloque catch puede no recibir el parámetro si no lo necesitás:
try {
    JSON.parse('{invalid json}')
} catch {
    console.log('JSON inválido')
}


// --- finally ---
// Se ejecuta SIEMPRE — haya error o no. Útil para limpieza.

function readFile(path) {
    console.log(`Abriendo ${path}`)
    try {
        if (!path.endsWith('.txt')) throw new Error('Solo archivos .txt')
        return `contenido de ${path}`
    } catch (error) {
        console.error('Error:', error.message)
        return null
    } finally {
        console.log('Cerrando conexión')  // siempre se ejecuta, incluso con return
    }
}

readFile('data.txt')
readFile('image.png')


// --- throw ---
// Podés lanzar cualquier valor, pero lo estándar es lanzar un objeto Error.
// Error tiene message, name y stack (el call stack completo).

function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Los argumentos deben ser números')
    }
    if (b === 0) {
        throw new RangeError('No se puede dividir por cero')
    }
    return a / b
}

try {
    console.log(divide(10, 2))    // 5
    console.log(divide(10, 0))    // lanza RangeError
} catch (error) {
    console.error(`${error.name}: ${error.message}`)
}


// --- Tipos de error nativos ---
// TypeError    → operación inválida para el tipo (null.property)
// RangeError   → valor fuera del rango permitido (new Array(-1))
// ReferenceError → variable no definida
// SyntaxError  → código malformado (JSON.parse con JSON inválido)
// URIError     → error en encodeURI/decodeURI

try {
    null.toString()
} catch (error) {
    console.log(error instanceof TypeError)  // true
    console.log(error.name)                  // 'TypeError'
}


// --- Diferenciar tipos de error con instanceof ---
// Muy útil cuando un bloque try puede lanzar errores de diferente naturaleza.

function processValue(value) {
    try {
        if (typeof value !== 'number') throw new TypeError('Se esperaba un número')
        if (value < 0) throw new RangeError('El número debe ser positivo')
        return Math.sqrt(value)
    } catch (error) {
        if (error instanceof TypeError)  console.error('Tipo incorrecto:', error.message)
        else if (error instanceof RangeError) console.error('Rango inválido:', error.message)
        else throw error  // relanzar errores inesperados
    }
}

processValue('hola')  // TypeError
processValue(-4)      // RangeError
processValue(16)      // 4


// --- Errores personalizados ---
// Extendés Error para agregar contexto útil para debugging.
// Definí las clases ANTES de usarlas.

class ValidationError extends Error {
    constructor(message, field) {
        super(message)
        this.name  = 'ValidationError'  // importante: sobreescribir el name
        this.field = field
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name       = 'NetworkError'
        this.statusCode = statusCode
    }
}

function validateUser({ name, email }) {
    if (!name || name.trim() === '') {
        throw new ValidationError('El nombre es requerido', 'name')
    }
    if (!email || !email.includes('@')) {
        throw new ValidationError('Email inválido', 'email')
    }
    return true
}

try {
    validateUser({ name: '', email: 'mati@example.com' })
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`Error de validación en "${error.field}": ${error.message}`)
    } else {
        throw error
    }
}


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una clase "HttpError" que extienda Error con:
//    - statusCode (number)
//    - isClientError() → true si statusCode es 4xx
//    - isServerError() → true si statusCode es 5xx
//    Usala en una función "handleResponse(statusCode)" que lance
//    HttpError para 4xx y 5xx, y devuelva 'ok' para 2xx.
// Tu código acá:


// 2. Escribí una función "safeJSON(str)" que intente parsear un string
//    como JSON y devuelva { ok: true, data } si funciona
//    o { ok: false, error: message } si falla.
//    No debe lanzar nunca — el error queda en el objeto de resultado.
// Tu código acá:
