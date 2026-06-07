// ============================================================
// 17 - MÉTODOS DE CONSOLE
// ============================================================
// console no es solo .log(). Tiene métodos para depuración,
// medición de rendimiento, organización visual y verificación.
// Conocerlos te hace más efectivo cuando debuggeás.
// ============================================================


// --- Niveles de logging ---
// Los navegadores y terminales los colorean diferente
// para que puedas filtrarlos por severidad.

console.log('Información general — nivel más común')
console.info('Mensaje informativo — mismo efecto que log en Node')
console.warn('Advertencia — fondo amarillo en DevTools')
console.error('Error — fondo rojo, incluye stack trace en DevTools')

console.error('Detalles del error:', new Error('algo salió mal'))


// --- console.table ---
// Muestra arrays de objetos como una tabla visual.
// Invaluable para revisar datos estructurados de un vistazo.

const employees = [
    { name: 'Ana García',   role: 'Frontend Dev', seniority: 'senior' },
    { name: 'Luis Martínez', role: 'Backend Dev',  seniority: 'mid'    },
    { name: 'Mara López',   role: 'DevOps',        seniority: 'senior' },
]

console.table(employees)

// También con objetos simples — muestra clave/valor como filas:
console.table({ host: 'localhost', port: 3000, debug: true })


// --- console.group y console.groupEnd ---
// Agrupa mensajes bajo un encabezado colapsable en DevTools.
// console.groupCollapsed inicia el grupo colapsado por defecto.

console.group('Petición HTTP')
console.log('URL: https://api.example.com/users')
console.log('Método: GET')
console.group('Headers')
console.log('Authorization: Bearer ...')
console.log('Content-Type: application/json')
console.groupEnd()  // cierra Headers
console.log('Status: 200 OK')
console.groupEnd()  // cierra Petición HTTP


// --- console.time y console.timeEnd ---
// Mide el tiempo entre las dos llamadas con el mismo label.
// Útil para comparar alternativas o encontrar cuellos de botella.

console.time('for loop')
let sum = 0
for (let i = 0; i < 1_000_000; i++) sum += i
console.timeEnd('for loop')

console.time('reduce')
const total = Array.from({ length: 1_000_000 }, (_, i) => i).reduce((a, b) => a + b, 0)
console.timeEnd('reduce')


// --- console.assert ---
// Si la condición es false, imprime el mensaje.
// No lanza error — solo loguea. Útil para chequeos rápidos de invariantes.

console.assert(1 + 1 === 2, 'La suma básica falló')  // no imprime nada
console.assert(1 + 1 === 3, 'Matemática rota')       // imprime el mensaje


// --- console.count y console.countReset ---
// Cuenta cuántas veces se llamó con ese label.

function handleRequest(type) {
    console.count(`request:${type}`)
}

handleRequest('GET')
handleRequest('GET')
handleRequest('POST')
handleRequest('GET')
// request:GET: 1, request:GET: 2, request:POST: 1, request:GET: 3

console.countReset('request:GET')
handleRequest('GET')  // request:GET: 1 — reiniciado


// --- console.trace ---
// Imprime el stack trace desde donde se llamó.
// Muy útil para saber qué función está llamando a qué.

function c() { console.trace('Traza de pila') }
function b() { c() }
function a() { b() }
a()  // muestra: c → b → a → ... con los números de línea


// --- console.dir ---
// Muestra el objeto como estructura explorable (no como string).
// Útil para inspeccionar objetos DOM o estructuras profundas.

console.dir(languages[0])  // muestra el objeto con todas sus propiedades expandibles
