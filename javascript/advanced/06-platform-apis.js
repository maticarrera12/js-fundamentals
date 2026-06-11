// ============================================================
// 06 - APIs DE PLATAFORMA QUE USÁS TODOS LOS DÍAS
// ============================================================
// No son "el lenguaje" — son la plataforma (browser y Node las
// comparten casi todas). Pero ningún proyecto real vive sin ellas:
// URLs, formularios, storage, clipboard, IDs y medición de tiempo.
// ============================================================


// --- URL: nunca más parsees URLs con split('/') ---

const url = new URL('https://shop.example.com:8080/products/42?color=red&size=m#reviews')

url.hostname       // 'shop.example.com'
url.port           // '8080'
url.pathname       // '/products/42'
url.search         // '?color=red&size=m'
url.hash           // '#reviews'
url.origin         // 'https://shop.example.com:8080'

// Es mutable — modificás partes y la URL se rearma sola:
url.pathname = '/cart'
url.toString()     // 'https://shop.example.com:8080/cart?color=red&size=m#reviews'

// Resolver rutas relativas contra una base (adiós concatenación con bugs):
new URL('../img/logo.png', 'https://example.com/docs/page/').toString()
// 'https://example.com/docs/img/logo.png'

// new URL también VALIDA — string inválido lanza TypeError.
// URL.canParse(str) chequea sin lanzar.


// --- URLSearchParams: query strings sin regex ---

const params = new URLSearchParams('color=red&size=m&size=l')

params.get('color')      // 'red'
params.get('size')       // 'm' — el primero
params.getAll('size')    // ['m', 'l'] — keys repetidas (checkboxes, filtros)
params.has('color')      // true

// Construir queries — el encoding es automático:
const query = new URLSearchParams({ q: 'zapatillas niño & bebé', page: '2' })
query.toString()         // 'q=zapatillas+ni%C3%B1o+%26+beb%C3%A9&page=2'
// Concatenar esto a mano (con el & y la ñ) es el bug clásico de junior.

// Mutación y combinación con URL:
const apiUrl = new URL('https://api.example.com/search')
apiUrl.searchParams.set('q', 'js')
apiUrl.searchParams.append('tag', 'a')
apiUrl.searchParams.append('tag', 'b')
apiUrl.toString()        // 'https://api.example.com/search?q=js&tag=a&tag=b'

// Es iterable:
for (const [key, value] of params) {
    console.log(key, value)
}


// --- FormData: leer formularios sin querySelector por campo ---
// (browser; en Node existe para construir bodies de fetch)

// HTML:  <form id="signup">
//          <input name="email"><input name="age">
//          <input type="checkbox" name="interests" value="js" checked>
//          <input type="checkbox" name="interests" value="ts" checked>
//        </form>
//
// const form = document.querySelector('#signup')
// const data = new FormData(form)        // TODOS los campos por name, de una
//
// data.get('email')                      // string del input
// data.getAll('interests')               // ['js', 'ts'] — como URLSearchParams
//
// A objeto plano (con cuidado — pierde los duplicados):
// const obj = Object.fromEntries(data)
//
// Enviar con fetch — DOS formas:
// fetch('/api/signup', { method: 'POST', body: data })
//   → multipart/form-data, soporta archivos, sin headers manuales
// fetch('/api/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(Object.fromEntries(data)),
// })
//   → JSON, lo que esperan la mayoría de las APIs


// --- localStorage / sessionStorage ---
// Persistencia clave-valor en el browser, sin servidor.
// localStorage: sobrevive a cerrar el browser. Por origen (dominio).
// sessionStorage: muere con la pestaña.

// localStorage.setItem('theme', 'dark')
// localStorage.getItem('theme')          // 'dark' (o null si no existe)
// localStorage.removeItem('theme')

// TRAMPA 1: solo guarda STRINGS. Objetos → "[object Object]".
// El wrapper que todo proyecto termina teniendo:
const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // QuotaExceededError (lleno, ~5MB) o modo privado restrictivo
        }
    },
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key)
            return raw === null ? fallback : JSON.parse(raw)
        } catch {
            return fallback   // JSON corrupto (alguien lo editó en DevTools)
        }
    },
}
// storage.set('user', { name: 'Matias', prefs: { theme: 'dark' } })
// storage.get('user', {})

// TRAMPA 2: es SÍNCRONO — leer/escribir en un loop caliente traba el render.
// TRAMPA 3: NUNCA guardes tokens sensibles acá — cualquier script
// del origen (XSS incluido) lo lee. Para sesiones: cookies httpOnly.
//
// ¿Y las cookies? Son del SERVIDOR (viajan en cada request, las setea
// Set-Cookie). document.cookie existe pero casi nunca lo tocás a mano.
// localStorage = estado del CLIENTE; cookies = credenciales/sesión.


// --- Clipboard ---
// Async, requiere permiso del usuario y contexto seguro (https).

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        return false   // permiso denegado o contexto inseguro
    }
}
// El botón "copiar" de todo snippet de código es esto + un toast.


// --- IDs y aleatoriedad ---

crypto.randomUUID()
// '3b9f8a02-...' — UUID v4 estándar, browser y Node.
// Adiós Math.random().toString(36) y otros inventos caseros.

// Math.random() NO es criptográficamente seguro — para juegos ok,
// para tokens/códigos de recuperación jamás. Para eso:
const bytes = crypto.getRandomValues(new Uint8Array(16))


// --- Medir tiempo: performance.now ---

// Date.now() puede RETROCEDER (ajustes NTP del reloj del sistema) —
// nunca midas duraciones con él. performance.now() es monotónico:

const t0 = performance.now()
for (let i = 0; i < 1_000_000; i++) { /* trabajo */ }
const elapsed = performance.now() - t0
console.log(`Tardó ${elapsed.toFixed(2)}ms`)   // sub-milisegundo, siempre creciente

// Date.now()        → QUÉ HORA es (timestamps para guardar)
// performance.now() → CUÁNTO TARDÓ (mediciones)


// ============================================================
// DESAFÍOS
// ============================================================

// 1. Escribí "buildApiUrl(base, path, filters)" donde filters es un
//    objeto que puede tener valores array: { tag: ['a','b'], page: 2 }
//    → base + path + '?tag=a&tag=b&page=2'. Usá URL + searchParams
//    (append para los arrays). Nada de concatenar strings.
// Tu código acá:


// 2. Ampliá el wrapper "storage" con:
//    - setWithExpiry(key, value, ttlMs): guarda { value, expiresAt }
//    - get debe devolver fallback si la entrada expiró (y limpiarla)
//    Probalo guardando algo con TTL de 1 segundo.
// Tu código acá:


// 3. (Browser) Armá un formulario HTML con email + 2 checkboxes del
//    mismo name, y un script que al submit: prevenga el default,
//    lea TODO con FormData, valide que haya al menos un checkbox
//    marcado, y muestre el objeto final con console.table.
// Tu código acá (o en un .html aparte):
