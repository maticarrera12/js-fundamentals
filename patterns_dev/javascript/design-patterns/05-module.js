// ============================================================
// 05 - MODULE PATTERN
// ============================================================
// Un módulo es un archivo que posee un pedazo de comportamiento,
// decide qué compartir y guarda el resto para sí.
//
// Hoy "módulo" en JavaScript = ES modules (ESM): especificación
// real del lenguaje, nativa en browsers modernos y Node.js.
// Los sistemas pre-2015 (IIFE con closures, AMD, CommonJS como
// patrón mental) son mayormente historia. Eso es lo que reemplazan.
//
// Modelo mental en cuatro puntos:
//   1. Un módulo es un archivo. El archivo es su propio scope.
//   2. Lo no exportado es privado al archivo.
//   3. Se evalúa una vez por realm. Todo importador ve los mismos bindings.
//   4. import es estático y hoisted; import() es dinámico y devuelve Promise.
// ============================================================


// ============================================================
// PARTE 1: Antes de ESM — IIFE como módulo (contexto histórico)
// ============================================================
// Antes de import/export, la privacidad se simulaba con una closure
// que devolvía una API pública. Todavía lo vas a ver en código legacy.

function createInventoryModule() {
    const cache = new Map()  // privado — no accesible desde afuera

    return {
        get(sku) {
            return cache.get(sku)
        },
        set(sku, item) {
            cache.set(sku, item)
        },
        size() {
            return cache.size
        },
    }
}

const inventory = createInventoryModule()
inventory.set('ABC-123', { sku: 'ABC-123', qty: 10 })
console.log(inventory.get('ABC-123'))   // { sku: 'ABC-123', qty: 10 }
console.log(inventory.size())           // 1
// inventory.cache → undefined — la closure lo protege

// En ESM moderno no necesitás este truco: lo no exportado ya es privado.
// Ver carpeta module-demo/ para ejemplos ESM reales ejecutables.


// ============================================================
// PARTE 2: Exports e imports — forma moderna
// ============================================================
//
// inventory.mjs (archivo separado — ver module-demo/inventory.mjs):
//
//   const cache = new Map()           // privado — nadie importa esto
//
//   export function get(sku) {
//     return cache.get(sku)
//   }
//
//   export async function refresh() {
//     const res = await fetch('/api/inventory')
//     const items = await res.json()
//     cache.clear()
//     for (const item of items) cache.set(item.sku, item)
//   }
//
//   export const ready = refresh()    // top-level await (ES2022)
//
// app.mjs:
//
//   import { get, refresh, ready } from './inventory.mjs'
//   await ready
//   console.log(get('ABC-123'))
//
// Dos detalles clave:
// - cache es inalcanzable desde afuera (privacidad gratis)
// - ready permite que importadores esperen la carga inicial
//
// Named exports → estilo default en utilidades multi-función (mejor tree-shake).
// Default export → cuando el archivo representa UNA cosa (componente React, entry).


// ============================================================
// PARTE 3: ESM en Node.js
// ============================================================
//
// Node decide si un archivo es módulo por:
//   1. Extensión: .mjs = módulo, .cjs = CommonJS
//   2. package.json más cercano: "type": "module" → .js son ESM
//   3. Flag --input-type para stdin
//
// package.json moderno (extracto):
//
//   {
//     "name": "@example/inventory",
//     "type": "module",
//     "exports": {
//       ".": "./dist/index.js",
//       "./schema": "./dist/schema.js"
//     },
//     "imports": {
//       "#config": "./src/config.js"
//     }
//   }
//
// exports → controla qué subpaths pueden importar consumidores
// imports → alias internos (#config en lugar de ../../../../config.js)
//
// Conditional exports (orden importa — "types" primero):
//
//   "exports": {
//     ".": {
//       "types": "./dist/index.d.ts",
//       "browser": "./dist/index.browser.js",
//       "node": "./dist/index.node.js",
//       "default": "./dist/index.js"
//     }
//   }


// ============================================================
// PARTE 4: Interop ESM ↔ CommonJS (breve)
// ============================================================
//
// ESM importando CJS: permitido. module.exports → default export.
// CJS require() de ESM: Node 22+ lo permite si no hay top-level await.
// Dual packages: publicar import + require con conditional exports.
//   Cuidado "dual package hazard" — dos copias del estado en runtime.
//
//   "exports": {
//     ".": {
//       "import": "./dist/index.mjs",
//       "require": "./dist/index.cjs"
//     }
//   }


// ============================================================
// PARTE 5: ESM en el browser
// ============================================================
//
//   <script type="module" src="/app.js"></script>
//
// - Deferred por defecto
// - Ejecutados en orden
// - Fetch con CORS
//
// Import maps (bare specifiers sin bundler):
//
//   <script type="importmap">
//   {
//     "imports": {
//       "lit": "https://cdn.jsdelivr.net/npm/lit@3/index.js",
//       "@app/": "/src/app/"
//     },
//     "scopes": {
//       "/legacy/": { "lit": ".../lit@2/index.js" }
//     }
//   }
//   </script>
//
// Module preload (críticos en paralelo):
//
//   <link rel="modulepreload" href="/app.js">
//   <link rel="modulepreload" href="/inventory.js">


// ============================================================
// PARTE 6: import() dinámico
// ============================================================
// Code splitting, features on-demand, rutas lazy.
//
//   router.on('/edit/:id', async ({ id }) => {
//     const { mount } = await import('./editor.js')
//     mount(root, { id })
//   })
//
//   button.addEventListener('click', async () => {
//     const { default: confetti } = await import('canvas-confetti')
//     confetti()
//   })
//
// Paralelizar:
//   const [heavy, utils] = await Promise.all([
//     import('./heavy.js'),
//     import('./utils.js'),
//   ])
//
// Path dinámico (bundlers incluyen todos los matches del patrón):
//   const lang = navigator.language.split('-')[0]
//   const { messages } = await import(`./i18n/${lang}.js`)
//
// Demo ejecutable: node module-demo/app.mjs


// ============================================================
// PARTE 7: Import attributes (2024+)
// ============================================================
//
//   import config from './config.json' with { type: 'json' }
//   import sheet from './styles.css' with { type: 'css' }
//
// Dinámico:
//   await import('./data.json', { with: { type: 'json' } })
//
// Reemplaza assert { type: 'json' } — actualizá código legacy.


// ============================================================
// PARTE 8: Bundlers, tree-shaking, barrels
// ============================================================
//
// ESM nativo = muchos archivos pequeños. Producción → bundler.
//
// Tree-shaking requiere:
// - imports/exports estáticos
// - módulos side-effect free, o "sideEffects": false en package.json
// - re-exports seguidos transitivamente
//
// | Bundler  | Motor              | Notas                          |
// |----------|--------------------|--------------------------------|
// | Vite     | Rollup + esbuild   | ESM nativo en dev              |
// | esbuild  | Go                 | Muy rápido                     |
// | Rollup   | JS                 | Sweet spot para librerías      |
// | Rspack   | Rust (webpack)     | Drop-in más rápido             |
// | Turbopack| Rust               | Next.js                        |
//
// Gotcha: barrel files (index.js re-exporta todo) pueden romper
// tree-shaking si algún módulo del barrel tiene side effects.
// Preferí importar desde el leaf file.


// ============================================================
// PARTE 9: HMR (Hot Module Replacement)
// ============================================================
//
//   if (import.meta.hot) {
//     import.meta.hot.accept((newModule) => {
//       newModule?.mount(document.querySelector('#root'))
//     })
//     import.meta.hot.dispose(() => {
//       document.querySelector('#root').innerHTML = ''
//     })
//   }
//
// import.meta.url → URL del módulo actual
// import.meta.dirname / filename → Node 21+


// ============================================================
// PARTE 10: Trampas comunes
// ============================================================

// --- Live bindings (no son copias de valor) ---
// counter.mjs exporta let count — importadores ven el valor ACTUAL.
// Ver module-demo/counter.mjs + app.mjs para demo runnable.

// --- Ciclos A ↔ B ---
// ESM los tolera (evaluación parcial), pero acceder a exports del
// partner durante inicialización (no dentro de una función) puede
// dar undefined. Restructurá para evitar acceso en init-time.

// --- Resolución de paths en Node ESM ---
// Más estricta: extensiones requeridas (./foo.js), sin index implícito.
// TS: moduleResolution "bundler" o "node16" alineado al runtime.

// --- Top-level await bloquea importadores ---
// Elegante para config/capability detection.
// Peligroso si cada leaf module hace fetch al cargar → startup serializado.


// ============================================================
// PARTE 11: Cuándo crear un módulo nuevo
// ============================================================
//
// ✓ Un concepto por archivo (si cuesta nombrarlo en <4 palabras, split)
// ✓ Ocultá lo que callers no necesitan (menos exports = más fácil refactor)
// ✗ No pre-split — tres funciones relacionadas pueden vivir juntas
// ✗ Split por reuse teórico, no real


// ============================================================
// ANÁLISIS — Perspectiva React / TypeScript (2026)
// ============================================================
//
// ### 1. Idea importante (6 meses)
// Un módulo ES es un archivo con scope privado y exports explícitos — es
// el "module pattern" moderno. No necesitás IIFE ni Singleton para privacidad.
//
// ### 2. Problema que resuelve
// Encapsular código, controlar API pública, evitar globals, evaluar una vez,
// habilitar tree-shaking y code-splitting (import dinámico).
//
// ### 3. En React hoy
// - Cada .tsx es un módulo; hooks/stores viven en archivos separados.
// - 'use client' / 'use server' son directivas de módulo en Next App Router.
// - lazy(() => import('./Heavy')) = dynamic import para route splitting.
// - Barrel files (index.ts): cuidado con tree-shaking y HMR lento.
// - No mezcles server-only imports en client modules (Next te lo marca).
//
// ### 4. En TypeScript hoy
// - import type { X } para borrar en runtime.
// - export type, satisfies, isolatedModules en tsconfig.
// - .mts/.cts, "moduleResolution": "bundler" | "node16".
// - package.json exports + types condition para librerías.
//
// ### 5. En el ecosistema
// - Next.js: App Router file-based modules, RSC boundaries por archivo.
// - Vite: ESM nativo en dev, Rollup bundle en prod.
// - TanStack Router: file-based routes = módulos por ruta.
// - React Query hooks en @/lib/queries.ts — módulo = boundary de datos.
//
// ### 6. ¿Lo implementaría manualmente en 2026?
// No implementás módulos — los usás. Dominá: named vs default export,
// dynamic import, import type, evitar barrels gordos, sideEffects en package.json.
// IIFE module pattern: solo leyendo legacy.
//
// ### 7. Preguntas de entrevista
// - ¿Live bindings vs CommonJS? → ESM: import ve valor actual de export let.
// - ¿import vs import()? → estático hoisted vs dinámico async, code splitting.
// - ¿Por qué extensiones .js en imports en Node ESM? → resolución estricta.
// - ¿Barrel file problem? → tree-shaking roto si side effects en barrel.
// - ¿'use client' qué hace? → marca boundary de módulo client en RSC.
//
// ### 8. Ejercicio práctico (~10 min)
// Corré module-demo/app.mjs y hacé ejercicio #2 (live bindings) — es
// la trampa que más confunde al pasar de CJS a ESM en monorepos Next.
//
// ### 9. Estado actual
// ESM es el estándar. CommonJS en declive (legacy Node). IIFE modules:
// históricos. Module pattern = simplemente escribir archivos .js/.ts bien.


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá inventory.mjs en module-demo/ (o tu carpeta) con cache privado,
//    get(sku), set(sku, item) exportados. Importalo desde otro archivo
//    y demostrá que cache no es accesible.
// Tu código acá:


// 2. Demostrá live bindings: counter.mjs con let count e inc().
//    Importá, logueá count, llamá inc(), logueá de nuevo. ¿Es 0 o 1?
// Tu código acá:


// 3. Usá import() dinámico para cargar counter.mjs solo cuando
//    se invoca una función lazyLoadCounter(). Compará con import estático.
// Tu código acá:


// 4. Escribí un package.json mínimo con "type": "module" y exports
//    que exponga "." y "./utils" pero NO "./internal".
// Tu código acá:


// 5. ¿Cuándo elegirías default export vs named exports?
//    Dá 2 ejemplos concretos de cada uno en comentarios.
// Tu respuestas acá:
