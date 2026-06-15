// ============================================================
// 04 - OBSERVER
// ============================================================
// Imaginá un dashboard de acciones. Llegan ticks por WebSocket y
// varias piezas de UI reaccionan: un gráfico se redibuja, una fila
// del watchlist parpadea, el total del portfolio se recalcula, un
// log audita el tick. El WebSocket no debería conocer a ningún
// consumidor — solo decir "acá hay un tick nuevo" y que cada uno
// decida qué hacer.
//
// Eso es Observer: un subject mantiene una lista de observers y les
// avisa cuando algo cambia. Nuevos observers se suscriben cuando
// quieren; los existentes se desuscriben cuando terminan. Nada en
// el subject está hardcodeado a un consumidor específico.
// ============================================================


// ============================================================
// PARTE 1: Forma mínima — Subject
// ============================================================

class Subject {
    #observers = new Set()

    subscribe(observer) {
        this.#observers.add(observer)
        // Devolver unsubscribe evita que el caller guarde la referencia
        return () => this.#observers.delete(observer)
    }

    notify(payload) {
        for (const observer of this.#observers) {
            observer(payload)
        }
    }
}


// ============================================================
// PARTE 2: Ejemplo concreto — ticker de acciones
// ============================================================
// Simulamos ticks sin WebSocket real. En browser sería:
//   socket.addEventListener('message', (e) => ticker.notify(JSON.parse(e.data)))

const ticker = new Subject()

const logs = []

// "Gráfico" que acumula ticks y procesa en batch (evita redraw por tick)
const chartQueue = []
let chartPending = false

function drawChart(tick) {
    chartQueue.push(tick)
    if (chartPending) return
    chartPending = true
    // En browser: requestAnimationFrame. Acá simulamos con setTimeout(0)
    setTimeout(() => {
        logs.push(`[chart] render ${chartQueue.length} ticks`)
        chartQueue.length = 0
        chartPending = false
    }, 0)
}

// Fila del watchlist — solo reacciona a AAPL
function flashRow({ symbol, price, previous }) {
    if (symbol !== 'AAPL') return
    const direction = price > previous ? 'up' : 'down'
    logs.push(`[row] AAPL ${direction} ${previous} → ${price}`)
}

function logTick(tick) {
    logs.push(`[audit] ${tick.symbol} @ ${tick.price}`)
}

const unsubChart = ticker.subscribe(drawChart)
const unsubRow = ticker.subscribe(flashRow)
const unsubLog = ticker.subscribe(logTick)

// El "WebSocket" empuja precios
function pushTick(symbol, price, previous) {
    ticker.notify({ symbol, price, previous })
}

pushTick('AAPL', 150, 148)
pushTick('GOOG', 2800, 2795)
pushTick('AAPL', 149, 150)

// Desuscribir el logger cuando ya no lo necesitás
unsubLog()

// Esperar al batch del chart antes de mostrar logs
setTimeout(() => {
    console.log(logs.join('\n'))
}, 10)


// ============================================================
// PARTE 3: EventTarget — Observer nativo del browser/Node
// ============================================================
// Desde 2017, EventTarget está disponible para objetos arbitrarios
// (misma maquinaria que addEventListener del DOM).

class Ticker extends EventTarget {
    push(tick) {
        this.dispatchEvent(new CustomEvent('tick', { detail: tick }))
    }
}

const eventTicker = new Ticker()
const eventLogs = []

eventTicker.addEventListener('tick', (e) => {
    eventLogs.push(`chart: ${e.detail.symbol}`)
})
eventTicker.addEventListener('tick', (e) => {
    eventLogs.push(`log: ${e.detail.price}`)
})

// AbortSignal: cleanup en una sola llamada
const controller = new AbortController()
const { signal } = controller

eventTicker.addEventListener('tick', (e) => {
    eventLogs.push(`extra: ${e.detail.symbol}`)
}, { signal })

eventTicker.push({ symbol: 'MSFT', price: 420 })
controller.abort()  // remueve el listener con signal
eventTicker.push({ symbol: 'MSFT', price: 421 })

console.log(eventLogs.join(' | '))


// ============================================================
// PARTE 4: Observer vs Pub/Sub
// ============================================================
//
// |                | Observer                    | Pub/Sub                          |
// |----------------|-----------------------------|----------------------------------|
// | Acoplamiento   | Observer conoce al subject  | Ambos solo conocen al broker     |
// | Routing        | Todos reciben todo          | Topics/canales — opt-in por nombre |
// | Implementación | Método en el subject      | Bus separado (event bus)         |
// | Uso típico     | Objeto de dominio avisa     | Eventos app-wide entre módulos   |
//
// ticker.notify(tick) → todos reciben → Observer clásico
// bus.publish('ticks/AAPL', price) → solo suscriptores del topic → Pub/Sub

class EventBus {
    #target = new EventTarget()

    publish(topic, data) {
        this.#target.dispatchEvent(new CustomEvent(topic, { detail: data }))
    }

    subscribe(topic, handler, { signal } = {}) {
        const listener = (e) => handler(e.detail)
        this.#target.addEventListener(topic, listener, { signal })
        return () => this.#target.removeEventListener(topic, listener)
    }
}

const bus = new EventBus()
const busLogs = []

bus.subscribe('ticks/AAPL', (price) => busLogs.push(`AAPL watcher: ${price}`))
bus.subscribe('ticks/GOOG', (price) => busLogs.push(`GOOG watcher: ${price}`))

bus.publish('ticks/AAPL', 151)
bus.publish('ticks/GOOG', 2810)
bus.publish('ticks/AAPL', 152)

console.log(busLogs.join('\n'))


// ============================================================
// PARTE 5: Variantes modernas (overview)
// ============================================================

// --- Async iterators ---
// Si los "eventos" son una secuencia, for await...of lee mejor que callbacks:
//
//   async function* watchTicks(socket, { signal }) {
//     while (!signal.aborted) {
//       const message = await new Promise((resolve, reject) => {
//         socket.addEventListener('message', resolve, { once: true, signal })
//         socket.addEventListener('error', reject, { once: true, signal })
//       })
//       yield JSON.parse(message.data)
//     }
//   }
//
//   for await (const tick of watchTicks(socket, { signal: controller.signal })) {
//     drawChart(tick)
//   }

// Simulación mínima en Node — ticks desde un generador async
async function* fakeTicks() {
    yield { symbol: 'AAPL', price: 100 }
    yield { symbol: 'AAPL', price: 101 }
}

;(async () => {
    const iterLogs = []
    for await (const tick of fakeTicks()) {
        iterLogs.push(`iter: ${tick.price}`)
    }
    console.log(iterLogs.join(', '))
})()


// --- Reactive signals (Preact, Solid, Vue, Angular) ---
// Otra cara del Observer: el subject sabe qué funciones lo leyeron
// y las re-ejecuta al cambiar.
//
//   import { signal, computed, effect } from '@preact/signals-core'
//   const price = signal(100)
//   const qty = signal(2)
//   const total = computed(() => price.value * qty.value)
//   effect(() => console.log(`Total: $${total.value}`))
//   price.value = 110  // re-ejecuta effect automáticamente

// --- RxJS ---
// Cuando la relación entre eventos importa (debounce, merge, retry,
// cancelar requests stale en typeahead), RxJS vale la pena:
//
//   fromEvent(input, 'input').pipe(
//     map(e => e.target.value.trim()),
//     debounceTime(250),
//     distinctUntilChanged(),
//     switchMap(q => fetch(`/api/search?q=${q}`).then(r => r.json()))
//   ).subscribe(renderResults)


// ============================================================
// PARTE 6: Trampas comunes
// ============================================================
//
// 1. Memory leaks — cada suscripción retiene al observer.
//    Mitigaciones: AbortSignal, unsubscribe function, cleanup en
//    useEffect / onScopeDispose / onDestroy.
//
// 2. Orden de notificación — no dependas de que B corra después de A.
//    Si hay dependencia real, modelala explícitamente.
//
// 3. Tormentas síncronas — notify corre todos los observers en serie.
//    Si uno tarda 200ms, el resto espera. Batch (como drawChart) o
//    queueMicrotask/setTimeout para trabajo pesado.
//
// 4. Notificaciones re-entrantes — un observer que dispara otro notify
//    en el mismo subject puede causar recursión sorpresa. Colá
//    notificaciones si es riesgo real en tu dominio.


// ============================================================
// PARTE 7: Cuándo NO usar Observer
// ============================================================
//
// ✗ Flujo one-shot → Promise ("avisame cuando termine, una vez")
// ✗ Un solo consumidor siempre junto al subject → llamada directa
// ✗ Necesitás request/response → función, Promise o command bus
// ✓ Eventos repetidos, múltiples consumidores desacoplados


// ============================================================
// ANÁLISIS — Perspectiva React / TypeScript (2026)
// ============================================================
//
// ### 1. Idea importante (6 meses)
// Observer = "algo cambió, avisá a quien le importa" sin acoplar emisor
// a consumidor. En React eso es setState/useState + re-render, no Subject manual.
//
// ### 2. Problema que resuelve
// Desacoplar productores de eventos de múltiples consumidores que reaccionan
// distinto al mismo cambio (ticks, clicks, cambios de estado de dominio).
//
// ### 3. En React hoy
// - useState + props: Observer micro — estado cambia, hijos re-renderizan.
// - useEffect suscribiéndose a stores externos (WebSocket, EventTarget).
// - Context: broadcast a subtree sin Subject propio.
// - useSyncExternalStore: API oficial para suscribirse a stores externas.
// - NO implementes Subject manual para UI — React ya es el observer graph.
//
// ### 4. En TypeScript hoy
// - Tipar observers: type Listener<T> = (payload: T) => void
// - EventEmitter<TEvents> con mapped types para eventos tipados.
// - useSyncExternalStore<T> con snapshot y subscribe tipados.
//
// ### 5. En el ecosistema
// - TanStack Query: cache notifica observers (subscribers) al invalidar.
// - Zustand: subscribe() + useStore — Observer + hook.
// - Redux: store.subscribe() clásico; hoy useSelector.
// - RxJS: Observer on steroids para streams complejos (debounce, merge).
// - Next.js: no aplica Subject; Server Actions son request/response, no pub/sub.
//
// ### 6. ¿Lo implementaría manualmente en 2026?
// Para UI React: no — useState, Context, Zustand, Query. Sí para:
// WebSocket hub, EventTarget en vanilla modules, domain events entre
// capas no-React. Siempre con cleanup (AbortSignal, useEffect return).
//
// ### 7. Preguntas de entrevista
// - Observer vs Pub/Sub — ¿diferencia? → subject directo vs broker con topics.
// - ¿Memory leak clásico? → olvidar unsubscribe; fix: AbortSignal, useEffect cleanup.
// - ¿useSyncExternalStore cuándo? → store externa que React no controla.
// - ¿React re-render es Observer? → sí, a nivel framework.
// - ¿RxJS vs Subject manual? → RxJS cuando composición de streams importa.
//
// ### 8. Ejercicio práctico (~10 min)
// Ejercicios #2 (EventTarget + AbortController) y #5 (clasificación) mapean
// directo a useEffect + cleanup en React. Hacé #5 primero en comentarios.
//
// ### 9. Estado actual
// Subject manual: nicho (WebSockets, event buses). React absorbió Observer
// en su modelo de render. Pub/Sub vive en micro-frontends y backends.
// Signals (Preact/Vue) = Observer invisible via effect automático.


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Implementá class PriceStore extends Subject (o composición) con:
//    - setPrice(symbol, price) que notifica { symbol, price, previous }
//    - subscribe que devuelve unsubscribe
//    Registrá dos observers y verificá que ambos reciben el update.
// Tu código acá:


// 2. Reescribí el ticker usando EventTarget + CustomEvent('tick').
//    Usá AbortController para remover todos los listeners de una vez.
// Tu código acá:


// 3. Implementá EventBus con publish/subscribe por topic.
//    Publicá en 'user:login' y 'user:logout'. Dos módulos distintos
//    se suscriben solo a los topics que les interesan.
// Tu código acá:


// 4. Simulá el problema de notify síncrono lento:
//    - Subject con un observer que "tarda" (busy loop o setTimeout largo)
//    - Otro observer que debería correr después
//    Mostrá por qué batching o async dispatch ayuda.
// Tu código acá:


// 5. Clasificá cada caso como Observer, Pub/Sub, Promise, o llamada directa:
//    a) Botón click → abrir modal (un handler en el mismo componente)
//    b) WebSocket de chat → 5 widgets distintos en la app
//    c) fetch('/api/user') una sola vez al montar
//    d) bus.publish('order:paid') entre módulos de billing y email
// Tu respuestas acá:
