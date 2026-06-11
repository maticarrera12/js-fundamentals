// ============================================================
// 02 - PATRONES ASYNC PRO
// ============================================================
// En intermediate/05 y 06 aprendiste Promises, async/await y fetch.
// Acá están los patrones que el código de producción usa TODOS
// los días: cancelación, timeouts, reintentos, control de
// concurrencia y rate limiting de eventos.
// ============================================================


// --- AbortController: cancelación ---
// El problema: disparaste un fetch y ya no te interesa el resultado
// (el usuario tipeó otra cosa, cerró el modal, navegó a otra página).
// Sin cancelación: gastás red, y peor — la respuesta VIEJA puede
// llegar DESPUÉS que la nueva y pisar datos correctos (race condition).

const controller = new AbortController()

async function search(query) {
    const res = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
        signal: controller.signal,   // conectás la señal al fetch
    })
    return res.json()
}

// En otro lado del código, cuando ya no interesa:
controller.abort()
// El fetch pendiente rechaza con un error de nombre 'AbortError'

// El patrón completo de "solo me importa la última búsqueda":
function createSearcher() {
    let currentController = null

    return async function searchLatest(query) {
        currentController?.abort()              // matá la búsqueda anterior
        currentController = new AbortController()
        try {
            const res = await fetch(`/api/search?q=${query}`, {
                signal: currentController.signal,
            })
            return await res.json()
        } catch (error) {
            if (error.name === 'AbortError') return null  // cancelada: no es un error real
            throw error                                    // error de verdad: propagalo
        }
    }
}


// --- Timeout: AbortSignal.timeout ---
// fetch NO tiene timeout por defecto — puede colgar minutos.
// La forma moderna (sin armar el controller a mano):

async function fetchWithTimeout(url, ms = 5000) {
    const res = await fetch(url, { signal: AbortSignal.timeout(ms) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}
// Si pasan 5s sin respuesta, rechaza con 'TimeoutError'.
// Bonus: AbortSignal.any([señalDeTimeout, señalDelUsuario]) combina ambas.


// --- Retry con backoff exponencial ---
// Las fallas de red suelen ser transitorias. Reintentar a lo bruto
// (inmediatamente, en loop) EMPEORA el problema — saturás el servidor
// que ya está sufriendo. El patrón correcto: esperar cada vez más.

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function withRetry(fn, { retries = 3, baseDelay = 500 } = {}) {
    let lastError
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error
            if (attempt === retries) break
            // 500ms → 1000ms → 2000ms... + jitter aleatorio para que
            // mil clientes caídos no reintenten todos al mismo tiempo
            const delay = baseDelay * 2 ** attempt + Math.random() * 100
            console.log(`Intento ${attempt + 1} falló, reintentando en ${Math.round(delay)}ms`)
            await sleep(delay)
        }
    }
    throw lastError
}

// Uso:
// const data = await withRetry(() => fetchWithTimeout('/api/flaky'))
// OJO: solo reintentá operaciones IDEMPOTENTES (GET sí; un POST de
// pago NO — podrías cobrar dos veces).


// --- Debounce: esperar a que el usuario termine ---
// "Ejecutá la función solo cuando pasaron N ms SIN nuevas llamadas."
// Caso típico: búsqueda mientras se tipea — no querés un request
// por tecla, querés uno cuando dejó de tipear.

function debounce(fn, ms) {
    let timeoutId
    return function (...args) {
        clearTimeout(timeoutId)               // cada llamada cancela la anterior
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}

const onSearchInput = debounce((text) => console.log(`Buscando: ${text}`), 300)
onSearchInput('j')
onSearchInput('ja')
onSearchInput('java')   // solo esta se ejecuta, 300ms después


// --- Throttle: máximo una vez cada N ms ---
// "Ejecutá ya, pero ignorá llamadas hasta que pasen N ms."
// Caso típico: scroll, resize, mousemove — eventos que disparan
// cientos de veces por segundo.

function throttle(fn, ms) {
    let ready = true
    return function (...args) {
        if (!ready) return
        ready = false
        fn.apply(this, args)
        setTimeout(() => { ready = true }, ms)
    }
}

const onScroll = throttle(() => console.log('posición actualizada'), 100)

// debounce → espera el FINAL de la ráfaga (búsquedas, autosave)
// throttle → muestrea DURANTE la ráfaga (scroll, drag, tracking)


// --- Concurrencia limitada ---
// Promise.all lanza TODO junto. Con 500 URLs son 500 requests
// simultáneos: te bloquea el servidor o te quedás sin sockets.
// El patrón pool: N "workers" que van tomando tareas de la cola.

async function mapWithConcurrency(items, fn, limit = 5) {
    const results = new Array(items.length)
    let nextIndex = 0

    async function worker() {
        while (nextIndex < items.length) {
            const index = nextIndex++           // cada worker toma la próxima tarea
            results[index] = await fn(items[index], index)
        }
    }

    const workers = Array.from({ length: Math.min(limit, items.length) }, worker)
    await Promise.all(workers)
    return results
}

// Uso:
// const pages = await mapWithConcurrency(urls, (url) => fetchWithTimeout(url), 5)
// Nunca hay más de 5 requests en vuelo, y los resultados conservan el orden.


// --- De eventos a Promises ---
// Muchas APIs viejas son de callbacks/eventos. Envolverlas en una
// Promise las integra al mundo async/await:

function waitForEvent(target, eventName, { timeout } = {}) {
    return new Promise((resolve, reject) => {
        const signal = timeout ? AbortSignal.timeout(timeout) : undefined
        target.addEventListener(eventName, resolve, { once: true, signal })
        signal?.addEventListener('abort', () => reject(new Error(`Timeout esperando ${eventName}`)))
    })
}
// Uso en browser: await waitForEvent(img, 'load', { timeout: 3000 })
// Bonus: { once: true } remueve el listener solo — sin leaks (ver archivo 03).


// --- for await...of ---
// Iterar fuentes async de a un elemento (lo viste en generators).
// El caso real más común: APIs paginadas — procesás página por
// página sin cargar todo en memoria.

async function* fetchAllPages(baseUrl) {
    let page = 1
    while (true) {
        const data = await fetchWithTimeout(`${baseUrl}?page=${page}`)
        if (data.items.length === 0) return
        yield* data.items
        page++
    }
}

// async function main() {
//     for await (const item of fetchAllPages('/api/products')) {
//         console.log(item.name)   // procesás de a uno, la memoria no explota
//     }
// }


// ============================================================
// DESAFÍOS
// ============================================================

// 1. Escribí "fetchJson(url, { timeoutMs, retries })" combinando
//    fetchWithTimeout + withRetry de este archivo en una sola
//    función reusable. Pensá: ¿el timeout va ADENTRO o AFUERA del retry?
// Tu código acá:


// 2. Implementá "debounceAsync(fn, ms)" donde fn es async y la
//    función devuelta retorna una Promise del PRÓXIMO resultado real.
//    Las llamadas canceladas deben resolver con ese mismo resultado
//    (todas las que esperan reciben el valor de la ejecución final).
// Tu código acá:


// 3. Modificá mapWithConcurrency para que acepte { stopOnError: true }:
//    si una tarea falla, los workers dejan de tomar tareas nuevas
//    y la función rechaza con ese error.
// Tu código acá:
