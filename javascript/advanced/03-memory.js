// ============================================================
// 03 - MEMORIA: GC, LEAKS Y REFERENCIAS DÉBILES
// ============================================================
// JS maneja la memoria solo — pero "automático" no significa
// "imposible de romper". Los memory leaks en JS no son memoria
// que se pierde: es memoria que VOS seguís referenciando sin
// querer, y el garbage collector no puede tocar.
// ============================================================


// --- Cómo decide el GC: alcanzabilidad ---
// La regla es UNA: un valor vive mientras sea ALCANZABLE desde
// las raíces (variables globales, el call stack actual, closures
// activos). Cuando nada llega a él, es basura y se libera.

let user = { name: 'Matias' }   // alcanzable vía `user`
user = null                      // el objeto quedó inalcanzable → liberable

// Dos referencias al mismo objeto: sigue vivo mientras quede UNA
let a = { data: 'importante' }
let b = a
a = null
// el objeto sigue vivo — b lo alcanza
b = null
// ahora sí: inalcanzable

// Las islas también se liberan: dos objetos que se referencian
// MUTUAMENTE pero que nadie externo alcanza, se liberan juntos.
// (el GC moderno no cuenta referencias — recorre el grafo desde las raíces)


// --- Leak 1: caches que solo crecen ---
// El leak más común en aplicaciones reales.

const cache = new Map()

function getUserCached(id, fetcher) {
    if (!cache.has(id)) {
        cache.set(id, fetcher(id))
    }
    return cache.get(id)
}
// Cada usuario consultado queda en el Map PARA SIEMPRE.
// En un server de larga vida, esto crece hasta tirar el proceso.
//
// Soluciones reales:
// - límite de tamaño + política de desalojo (LRU)
// - TTL: entradas que expiran
// - WeakMap si la key es un objeto (más abajo)


// --- Leak 2: listeners que nadie remueve ---
// Cada addEventListener guarda una referencia al handler — y el
// handler, vía closure, a todo lo que captura.

function setupWidget(element, hugeData) {
    element.addEventListener('click', () => {
        console.log(hugeData.summary)   // el closure retiene TODO hugeData
    })
}
// Si el element vive (o el listener no se remueve), hugeData no muere.
//
// Soluciones:
// - removeEventListener al desmontar (lo que hace el cleanup de useEffect)
// - { once: true } para handlers de un solo uso
// - AbortController: UNA señal desregistra TODOS los listeners juntos:

function setupWidgetClean(element, hugeData) {
    const controller = new AbortController()
    element.addEventListener('click', () => console.log(hugeData.summary), {
        signal: controller.signal,
    })
    return () => controller.abort()   // función de cleanup
}


// --- Leak 3: timers olvidados ---
// setInterval mantiene vivo su callback (y todo su closure) hasta
// que alguien llame clearInterval. "Alguien" suele ser nadie.

function startPolling(store) {
    const intervalId = setInterval(() => {
        store.refresh()              // retiene store para siempre
    }, 5000)
    return () => clearInterval(intervalId)   // SIEMPRE devolvé el cleanup
}
// Patrón general: toda función que registra algo (listener, timer,
// suscripción) devuelve la función que lo DESREGISTRA.
// React lo formalizó: return del useEffect. No es magia, es esto.


// --- WeakMap: asociar datos sin retener ---
// Map retiene sus keys: mientras la key esté en el Map, no se libera.
// WeakMap NO: si la única referencia a un objeto es ser key de un
// WeakMap, el GC lo libera — y la entrada desaparece sola.

const metadata = new WeakMap()

function track(obj, info) {
    metadata.set(obj, info)
}

let session = { id: 42 }
track(session, { lastAccess: Date.now() })

session = null
// El objeto session queda inalcanzable → el GC lo libera →
// su entrada en el WeakMap se va con él. Cero limpieza manual.
//
// Caso de uso real: librerías que anotan objetos AJENOS (un nodo
// del DOM, un request) sin impedir que mueran cuando corresponde.
//
// Restricciones (por diseño): keys solo objetos, no es iterable,
// no tiene .size — el contenido depende del GC, sería no-determinista.


// --- WeakSet ---
// Mismo concepto, para "marcar" objetos sin retenerlos:

const processed = new WeakSet()

function processOnce(obj) {
    if (processed.has(obj)) return false
    processed.add(obj)
    return true
}
// Cuando el objeto muere, su marca desaparece sola.


// --- WeakRef y FinalizationRegistry (conocerlos, casi nunca usarlos) ---
// WeakRef: referencia que NO impide el GC. deref() devuelve el
// objeto si sigue vivo, o undefined si ya fue liberado.

let bigObject = { data: new Array(1000).fill('x') }
const ref = new WeakRef(bigObject)

const maybeAlive = ref.deref()   // el objeto, o undefined
if (maybeAlive) {
    // usalo — pero no guardes esta referencia fuerte más de lo necesario
}

// Caso de uso legítimo: caches donde "si la memoria aprieta, que
// se libere y lo recalculo". Para todo lo demás: WeakMap primero.
// FinalizationRegistry (callback cuando algo se libera) es aún más
// niche — el timing del GC NO está garantizado; nunca pongas lógica
// de negocio ahí.


// --- Cómo se investiga un leak de verdad ---
// No adivinando — midiendo:
//
// Browser (Chrome DevTools → Memory):
// 1. Heap snapshot → usá la app → segundo snapshot → "Comparison"
// 2. Buscá qué clase de objetos CRECE y nunca baja
// 3. "Retainers" te muestra QUIÉN lo está reteniendo (la cadena
//    de referencias hasta la raíz) — ahí está tu bug
//
// Node:
// - process.memoryUsage().heapUsed entre operaciones repetidas
// - node --inspect + Chrome DevTools (mismo flujo de snapshots)
//
// Señal típica: "la app va lenta después de un rato de uso" =
// 90% un leak de listeners o un cache sin límite.


// ============================================================
// DESAFÍOS
// ============================================================

// 1. Implementá un "createLruCache(maxSize)" con Map que cuando
//    supera maxSize elimina la entrada MENOS recientemente usada.
//    Tip: Map conserva orden de inserción; map.delete + map.set
//    re-inserta al final. El primero de map.keys() es el más viejo.
// Tu código acá:


// 2. Esta función tiene DOS leaks. Encontralos y arreglala
//    devolviendo una función de cleanup:
//    function watchUser(user, element) {
//        setInterval(() => console.log(user.name), 1000)
//        element.addEventListener('mousemove', () => {
//            element.dataset.user = JSON.stringify(user)
//        })
//    }
// Tu versión arreglada acá:


// 3. Escribí "memoizeByObject(fn)" que cachee resultados de una
//    función que recibe UN objeto como argumento, usando WeakMap
//    para que el cache no impida que los objetos se liberen.
// Tu código acá:
