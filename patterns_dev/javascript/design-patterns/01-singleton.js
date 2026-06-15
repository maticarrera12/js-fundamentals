// ============================================================
// 01 - SINGLETON
// ============================================================
// Un Singleton es un objeto que existe exactamente una vez durante
// la vida de tu aplicación. Cada caller que lo pide recibe la misma
// instancia: mismo estado, mismos métodos, misma identidad.
//
// Aparece cuando un recurso es genuinamente compartido: pool de
// conexiones a DB, cliente de feature flags, WebSocket que distribuye
// mensajes, cliente de analytics que agrupa eventos antes de enviarlos.
//
// Pregunta clave antes de usarlo: ¿realmente necesitás un Singleton,
// o solo un valor que vive a nivel de módulo? En JS moderno se confunden
// mucho — y casi siempre la segunda opción es mejor.
// ============================================================


// --- Cuándo tiene sentido ---
// ✓ Un pool de conexiones (no querés duplicar conexiones)
// ✓ Un cliente que hace polling a un servicio remoto
// ✓ Un logger configurado una sola vez para toda la app
//
// ✗ Estado por usuario o por request (SSR, serverless)
// ✗ Cualquier cosa que deba ser distinta en cada test sin reset


// ============================================================
// PARTE 1: Singleton clásico con clase
// ============================================================
// Implementación de libro de texto, modernizada con campos privados
// estáticos (#) y un accessor estático getInstance().

class FeatureFlags {
    static #instance = null

    #flags = new Map()
    #loaded = false

    constructor() {
        // Si alguien hace new FeatureFlags() dos veces, devuelve la existente
        if (FeatureFlags.#instance) {
            return FeatureFlags.#instance
        }
        FeatureFlags.#instance = this
    }

    static getInstance() {
        // ??= : si #instance es null/undefined, crea una y la asigna
        return (FeatureFlags.#instance ??= new FeatureFlags())
    }

    // En producción cargarías desde una URL remota con fetch.
    // Acá usamos un objeto para que el ejemplo corra sin red.
    loadFromObject(data) {
        if (this.#loaded) return
        for (const [key, value] of Object.entries(data)) {
            this.#flags.set(key, value)
        }
        this.#loaded = true
    }

    async load(url) {
        if (this.#loaded) return
        const res = await fetch(url)
        const data = await res.json()
        this.loadFromObject(data)
    }

    isEnabled(name) {
        return this.#flags.get(name) === true
    }

    // Útil en tests — sin esto el estado sobrevive entre casos
    static reset() {
        FeatureFlags.#instance = null
    }
}

// Uso correcto: siempre getInstance(), nunca new directo (aunque new también funciona)
const flagsA = FeatureFlags.getInstance()
const flagsB = FeatureFlags.getInstance()

flagsA.loadFromObject({ 'new-checkout': true, 'beta-banner': false })

console.log(flagsA === flagsB)                        // true — misma identidad
console.log(flagsA.isEnabled('new-checkout'))         // true
console.log(flagsB.isEnabled('beta-banner'))          // false — comparten el Map


// ============================================================
// PARTE 2: La alternativa moderna — estado a nivel de módulo
// ============================================================
// ESM garantiza que un módulo se evalúa exactamente una vez por realm.
// Todo lo declarado en el top-level del módulo ES un singleton.
//
// Así se vería feature-flags.js en un archivo separado:
//
//   const flags = new Map()
//   let loaded = false
//
//   export async function load(url) {
//     if (loaded) return
//     const res = await fetch(url)
//     const data = await res.json()
//     for (const [key, value] of Object.entries(data)) {
//       flags.set(key, value)
//     }
//     loaded = true
//   }
//
//   export function isEnabled(name) {
//     return flags.get(name) === true
//   }
//
// Sin constructor, sin getInstance(), sin riesgo de llamar new dos veces.
// Para la mayoría de los "necesito uno solo" en JS moderno, esto alcanza.

// Simulación en un solo archivo con closure (mismo concepto, sin ESM split):
function createFeatureFlagsModule() {
    const flags = new Map()
    let loaded = false

    return {
        loadFromObject(data) {
            if (loaded) return
            for (const [key, value] of Object.entries(data)) {
                flags.set(key, value)
            }
            loaded = true
        },
        isEnabled(name) {
            return flags.get(name) === true
        },
        reset() {
            flags.clear()
            loaded = false
        },
    }
}

// Una sola instancia del módulo-fábrica — equivalente al export del archivo .js
const featureFlagsModule = createFeatureFlagsModule()
featureFlagsModule.loadFromObject({ 'dark-mode': true })
console.log(featureFlagsModule.isEnabled('dark-mode'))  // true


// ============================================================
// PARTE 3: Cuándo NO usar Singleton
// ============================================================

// 1. Estado por request o por usuario
//    En SSR o serverless, un singleton a nivel de proceso filtra datos
//    entre requests → "¿por qué el usuario A ve los datos del B?"

// 2. Tests que necesitan aislamiento
//    Si test A activa un flag y test B lo lee, tenés flakiness por orden.
//    Mitigaciones: reset() en beforeEach, inyección de dependencias, vi.resetModules()

// 3. Acoplamiento oculto
//    Una función que llama Logger.getInstance() adentro no declara
//    esa dependencia en su firma — difícil de reutilizar y de testear.

function processOrderHidden(order) {
    // ❌ dependencia invisible — quien llama no sabe que necesita Logger
    const logger = { info: (msg, id) => console.log(`[LOG] ${msg}`, id) }
    logger.info('procesando', order.id)
}

function processOrderExplicit(order, logger) {
    // ✓ el contrato está en la firma — en tests pasás un mock
    logger.info('procesando', order.id)
}

processOrderExplicit({ id: 'ord-42' }, { info: (msg, id) => console.log(`[mock] ${msg}`, id) })

// 4. "Singleton" como bolsa global de estado de la app
//    Eso es un antipatrón. Usá un store real (Zustand, Jotai) o Context en React.


// ============================================================
// PARTE 4: Alternativas que conviene conocer
// ============================================================

// --- Inyección de dependencias (DI) ---
// Librerías como tsyringe o InversifyJS registran el servicio una vez
// en el "composition root" y lo resuelven donde haga falta.
// En tests registrás un fake antes de resolver — sin monkey-patching.
//
//   @singleton()
//   class AnalyticsClient { track(event, props) { ... } }
//
//   class CheckoutService {
//     constructor(analytics) { this.analytics = analytics }
//   }

// --- React Context ---
// "Global" en React = disponible en un árbol de componentes.
// createContext + Provider: podés montar otro valor en tests o Storybook
// sin tocar el código de producción.

// --- Stores ligeros (Zustand, Jotai, Valtio) ---
// Para estado compartido con suscripciones. Zustand es una función,
// no una clase — cualquier componente lee/actualiza sin getInstance():
//
//   import { create } from 'zustand'
//   export const useSession = create((set) => ({
//     user: null,
//     login: (user) => set({ user }),
//     logout: () => set({ user: null }),
//   }))


// ============================================================
// PARTE 5: Tabla comparativa (mental model)
// ============================================================
//
// |                    | Singleton clase | Estado en módulo | Variable global |
// |--------------------|-----------------|------------------|-----------------|
// | Una instancia      | Sí (forzado)    | Sí (ESM)         | Sí              |
// | Encapsulamiento    | Fuerte (#)      | Fuerte (scope)   | Ninguno         |
// | Init lazy          | Sí              | Sí (top-level await) | No          |
// | Testeable          | Difícil         | Medio (resetModules) | Difícil     |
// | Herencia           | Sí              | No               | No              |
//
// Takeaway: si no necesitás features de clase, el módulo gana.
// Si sí las necesitás, Singleton con #instance + getInstance(),
// e inyectalo desde el composition root para que los tests puedan reemplazarlo.


// ============================================================
// PARTE 6: Trampas en server-side
// ============================================================
// En un proceso Node que atiende muchos requests, un cache a nivel
// de módulo es compartido entre todos. Eso está bien para un logger
// configurado, pero es un desastre para "usuario logueado actual".
//
// En Next.js y frameworks similares, documentan qué singletons son
// seguros entre requests y cuáles deben ir en AsyncLocalStorage o
// en el cache per-request de React.


// ============================================================
// ANÁLISIS — Perspectiva React / TypeScript (2026)
// ============================================================
//
// ### 1. Idea importante (6 meses)
// Casi nunca necesitás getInstance(): un módulo ESM o un store ya es
// "una sola instancia" — el Singleton manual es sobre todo un antipatrón
// de testabilidad y acoplamiento oculto.
//
// ### 2. Problema que resuelve
// Garantizar un único recurso compartido (pool DB, cliente WS, config)
// sin que cada módulo cree su propia copia y duplique estado o conexiones.
//
// ### 3. En React hoy
// - React Query / TanStack Query: un QueryClient por app (QueryClientProvider).
// - Zustand/Jotai: store module-scoped — efectivamente singleton del módulo.
// - Context NO es singleton global: es por árbol; en tests montás otro Provider.
// - RSC: cuidado — singletons module-level en server filtran entre requests.
//   Next.js documenta qué cachear con react cache() vs qué no.
// - No vas a escribir class Foo { static getInstance() } en un componente.
//
// ### 4. En TypeScript hoy
// - private static #instance + getInstance() se tipa bien, pero DI (tsyringe)
//   o factory functions tipadas son más testeables.
// - Preferí export const queryClient = new QueryClient() en un módulo
//   con tipo inferido, antes que clase Singleton.
//
// ### 5. En el ecosistema
// - Next.js: instancia única de config en next.config, no en runtime user state.
// - TanStack Query: QueryClient singleton en layout raíz.
// - Zustand: create() una vez por archivo de store.
// - Redux: store único vía Provider (patrón similar, no getInstance).
// - Prisma en dev: singleton global documentado para evitar agotar conexiones.
//
// ### 6. ¿Lo implementaría manualmente en 2026?
// No, salvo entrevista o librería legacy. Usaría: módulo ESM, Zustand,
// QueryClient, o inyección explícita. getInstance() escondido en helpers
// hace imposible mockear sin monkey-patch.
//
// ### 7. Preguntas de entrevista
// - ¿Singleton vs variable module-scoped? → ESM evalúa una vez; casi igual.
// - ¿Por qué es peligroso en SSR? → estado compartido entre requests/usuarios.
// - ¿Cómo testeás un Singleton? → reset(), DI, vi.resetModules(), mock del módulo.
// - ¿QueryClient es Singleton? → sí a nivel app, no a nivel global Node.
// - ¿Cuándo SÍ tiene sentido? → pools de conexión, clients costosos de init.
//
// ### 8. Ejercicio práctico (~10 min)
// Los ejercicios de abajo alcanzan: analytics Singleton vs módulo,
// inyección de logger, clasificación SSR. Empezá por el #3 (acoplamiento
// oculto) — es el que más se parece a bugs reales en React apps.
//
// ### 9. Estado actual
// El patrón clásico (clase + getInstance) está en declive. Sigue vivo como
// concepto ("una instancia"), pero la implementación manual cede a módulos,
// stores y DI. En React, mixins/singletons de componente murieron en 2016.


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Implementá un cliente de analytics como Singleton de clase:
//    - static getInstance()
//    - track(event, props) que acumula eventos en un array privado
//    - flush() que loguea todos los eventos y vacía el array
//    - static reset() para tests
//    Verificá que dos getInstance() son === y comparten el mismo buffer.
// Tu código acá:


// 2. Reescribí el ejercicio 1 SIN clase: solo funciones exportables
//    simuladas con closure (como createFeatureFlagsModule de arriba).
//    Compará líneas de código y legibilidad.
// Tu código acá:


// 3. Refactorizá esta función para recibir el logger por parámetro
//    en lugar de depender de un singleton oculto:
//
//    function chargeCard(order, paymentGateway) {
//      // hoy: Logger.getInstance().info('cobro', order.id)
//      // tu versión: recibe logger como tercer argumento
//    }
//
//    Escribí chargeCard y una prueba manual pasando un mock que
//    guarde los mensajes en un array.
// Tu código acá:


// 4. Clasificá cada caso como SEGURO o PELIGROSO como singleton
//    en un servidor Node con muchos requests concurrentes.
//    Justificá en un comentario por cada uno:
//    a) Cliente HTTP configurado con baseURL y timeout
//    b) Map con el carrito de compras del usuario actual
//    c) Contador de requests procesados (métrica global)
//    d) Sesión autenticada del usuario que hizo el request
// Tu respuestas acá:
