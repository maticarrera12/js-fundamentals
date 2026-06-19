# JavaScript Roadmap

Todos los archivos siguen el mismo formato: explicación con comentarios → ejemplos ejecutables.
Leé el código, ejecutalo, modificalo.

Cada etapa tiene dos partes: **práctica** (los archivos de este repo) y **teoría** (lecturas de javascript.info y Lydia Hallie). Hacé las dos en paralelo — no termines todas las lecturas antes de tocar código, ni al revés.

---

## Etapa 0 — Sintaxis y tipos (basic/00-05)

Los bloques más básicos del lenguaje.

| Archivo | Temas |
|---------|-------|
| `00-hello-world.js` | Setup, primer programa |
| `01-variables.js` | var/let/const, hoisting, block scope |
| `02-data-types.js` | string, number, boolean, null, undefined, symbol, bigint |
| `03-operators.js` | Aritméticos, comparación (== vs ===), truthy/falsy, lógicos, ternario, **?? y ?.**, logical assignment (??=, \|\|=, &&=) |
| `04-strings.js` | Métodos de string, template literals |
| `05-conditionals.js` | if/else, switch |
| `22-numbers-math.js` | Precisión de floats (0.1 + 0.2), parsing (Number vs parseInt), toFixed, Math, random — *numerado 22 porque se agregó después, pero pertenece acá* |

**Señal para avanzar**: podés explicar la diferencia entre `==` y `===`, y entre `??` y `||`.

**Lectura complementaria** (javascript.info → sección *JavaScript Fundamentals*):
- "The modern mode, use strict" → 15 min
- "Variables" + "Data types" → 1h
- "Type Conversions" → 1h — entender coerciones implícitas es lo que distingue al que sabe JS del que sufre
- "Comparisons" → 30 min — `==` vs `===` no es una preferencia, es lógica
- "Logical operators" + "Nullish coalescing operator" → 1h20
- "Strings" → 1h
- Lydia Hallie: *JavaScript Visualized: Type Coercion*

---

## Etapa 1 — Abstracción: funciones y objetos (basic/06-07)

Las dos herramientas con las que modelás todo lo demás: funciones (empaquetar comportamiento) y objetos (modelar datos). Van temprano porque las vas a usar en cada archivo que sigue.

| Archivo | Temas |
|---------|-------|
| `06-function.js` | Declaración, expresión, arrow, parámetros default, funciones de orden superior |
| `07-objects.js` | Literales, acceso, iteración, referencia vs valor |

**Por qué este orden**: hasta acá (00-05) escribiste código directo, línea por línea. Ahora aprendés a empaquetarlo en funciones reutilizables y a modelar datos con objetos. El estudio profundo de scope, closures y `this` queda para `20-scope-and-this.js` (Etapa 4), cuando ya hayas usado funciones muchas veces.

**Señal para avanzar**: podés escribir una función con parámetros default y explicar por qué `obj1 === obj2` es `false` aunque tengan los mismos datos.

**Lectura complementaria** (javascript.info):
- "Functions" + "Function expressions" + "Arrow functions, the basics" → 1h
- "Objects" → 1h — foco en paso por referencia, origen de bugs eternos
- "Object references and copying" → 1h — crítico para React: mutación vs inmutabilidad
- "Object methods, this" → 1h (intro; el detalle profundo va en Etapa 4)

---

## Etapa 2 — Estructuras de datos (basic/08-12)

Cómo guardar y recorrer colecciones. Ahora que tenés funciones, los métodos como `.map`/`.filter` cobran sentido.

| Archivo | Temas |
|---------|-------|
| `08-array.js` | Arrays, acceso con `.at()`, push/pop/shift/unshift/splice, slice, sort, métodos funcionales (map/filter/reduce) |
| `09-loops.js` | for, while, do-while, for...of, **for...in** |
| `10-sets.js` | Set — colección de valores únicos |
| `11-map.js` | Map — diccionario con keys de cualquier tipo |
| `12-iterables.js` | Protocolo iterable, Symbol.iterator |

**Por qué este orden**: arrays primero porque sus métodos funcionales (`.map`, `.filter`, `.reduce`) usan las funciones que aprendiste en la Etapa 1. Loops después, para recorrer lo que ya conocés (arrays, objetos, strings). Sets y Map cierran las colecciones, e iterables explica el mecanismo detrás de `for...of`.

**Señal para avanzar**: sabés cuándo usar Array vs Set vs Map, y la diferencia entre for...of y for...in.

**Lectura complementaria** (javascript.info → sección *Data types*):
- **"Arrays" + "Array methods" → 3h** — `.map`, `.filter`, `.reduce` son la columna vertebral de React; acá invertí tiempo
- "Conditional branching" + "Loops" → 30 min (repaso rápido si ya los conocés)
- "Map and Set" → 30 min
- "Iterables" → 30 min (concepto, no detalles)
- "Object.keys, values, entries" → 20 min

---

## Etapa 3 — Destructuring y clases (basic/13-15)

Azúcar sintáctico para extraer datos y modelar comportamiento con herencia.

| Archivo | Temas |
|---------|-------|
| `13-destructuring-spreading.js` | Destructuring de arrays y objetos, spread, **rest** |
| `14-class.js` | Clases, private fields (#), getters/setters |
| `15-class-heritage.js` | extends, super, static |

**Por qué este orden**: destructuring antes de clases porque los constructores modernos lo usan. Herencia al final porque requiere entender la clase base primero.

**Señal para avanzar**: podés desestructurar una respuesta de API anidada y escribir una clase con campos privados (#) y getters.

**Lectura complementaria** (javascript.info → sección *Objects: the basics*):
- "Destructuring assignment" → 1h — lo usás en cada componente de React
- "Methods of primitives" → 30 min
- **"Class basic syntax" + "Class inheritance" → 2h**
- "Static properties and methods" + "Private and protected properties" → 1h

---

## Etapa 4 — Herramientas esenciales (basic/16-21)

Lo que usás en cada proyecto real — más el estudio profundo de funciones (scope, closures, `this`), que dejamos para acá porque recién ahora tenés suficiente práctica con funciones.

| Archivo | Temas |
|---------|-------|
| `16-errors-handling.js` | try/catch/finally, throw, errores personalizados |
| `17-console.methods.js` | console.table, group, time — debugging real |
| `18-export-modules.js` | export, export default |
| `19-import-modules.js` | import estático, import dinámico |
| `20-scope-and-this.js` | Lexical scope, scope chain, **closures**, **this**, call/apply/bind |
| `21-json.js` | JSON.stringify, JSON.parse, structuredClone |

**Por qué scope va acá**: closures son el resultado directo de entender scope, y `this` el de entender cómo se llaman las funciones. Necesitás haber escrito muchas funciones antes (Etapas 1-3) para que esto cale.

**Señal para avanzar**: podés predecir qué imprime un closure sin ejecutarlo, explicar qué es `this` en un método, una función normal y una arrow, y crear un módulo con múltiples exports.

**Lectura complementaria** (javascript.info):
- **"Variable scope, closure" → 3-4h** — leelo dos veces, hacé todos los ejercicios; no hay atajo acá
- "The old var" → 20 min — entendés por qué `let` y `const` existen
- "Global object" + "Function object, NFE" → 1h15
- "Decorators and forwarding, call/apply" + "Function binding" → 2h — por qué los métodos pueden perder `this` en React
- "JSON methods, toJSON" → 30 min
- "Modules, introduction" + "Export and import" + "Dynamic imports" → 1h20 — Next.js usa dynamic imports para code splitting
- YDKJS: *Scope & Closures*, capítulos 1–3
- Lydia Hallie: *JavaScript Visualized: Scope (Chain)*, *Hoisting*, *The this keyword*

---

## Etapa 5 — JavaScript intermedio

Con la base sólida, estos archivos profundizan cómo funciona JS en la práctica.

| Archivo | Temas | Por qué acá |
|---------|-------|-------------|
| `intermediate/01-advanced-functions.js` | First-class functions, IIFE, rest/spread, closures, recursión, partial application, currying, memoization, pipe | Cierra el entendimiento de closures — requiere funciones (Etapa 1) y closures (Etapa 4) |
| `intermediate/02-advanced-structures.js` | Array methods funcionales, Set/Map avanzados | Requiere conocer los métodos básicos de Etapa 2 |
| `intermediate/03-object.js` | Prototipos, Object.create, Object.keys/values/entries | Después de clases — entendés qué hay debajo del azúcar sintáctico |
| `intermediate/04-classes-advanced.js` | Mixins (higher-order class), Singleton, Symbol vs private fields (#), Proxy, EventEmitter | Requiere herencia de Etapa 3 |
| `intermediate/05-async.js` | Event loop, callbacks, Promises, async/await, Promise.all/allSettled/race | Requiere entender funciones bien — es el tema más importante de esta etapa |
| `intermediate/06-api.js` | fetch, headers, manejo de respuestas | Después de async — aplicación directa |
| `intermediate/07-regex.js` | Expresiones regulares — buscar, validar, transformar texto | Requiere dominar strings — independiente del resto |
| `intermediate/08-generators.js` | function*, yield, iteradores infinitos, async generators | Requiere iterables (Etapa 2) y async (05) |
| `intermediate/dom/07-dom.js` | DOM manipulation: selectores, atributos, classList, crear/insertar/eliminar nodos | Requiere todo lo anterior — es la interfaz con el browser |
| `intermediate/dom/08-events.js` | addEventListener, bubbling, **event delegation**, preventDefault, submit, custom events | La otra mitad del DOM. Delegation es la base de cómo React maneja eventos — y del proyecto 2 |

**Señal para avanzar a frameworks**: dominás async/await y Promise.all, podés escribir una función que fetchea datos, maneja errores y devuelve un tipo conocido.

**Lectura complementaria** (javascript.info):

*Funciones avanzadas (antes de `01-advanced-functions.js`):*
- "Recursion and stack" → 1h (para entender el call stack, no para memorizar algoritmos)
- "Rest parameters and spread syntax" → 45 min
- "Scheduling: setTimeout and setInterval" → 30 min

*Async (para `05-async.js`):*
- "Introduction: callbacks" → 30 min (de dónde vienen las Promesas)
- **"Promise" → 2h** — hacé los ejercicios
- "Promises chaining" + "Error handling with promises" → 2h
- "Promise API" → 1h — `.all`, `.race`, `.allSettled` son cotidianos
- **"Async/await" → 2h**
- Lydia Hallie: *Promises & Async/Await*, *Event Loop*

*Prototipos (para `03-object.js`):*
- **"Prototypal inheritance" + "F.prototype" → 2h**
- "Native prototypes" → 30 min
- Lydia Hallie: *Prototypal Inheritance*

*Fetch (para `06-api.js`):*
- "Fetch" + "Fetch: Cross-Origin Requests" + "Fetch API" → 2h — CORS aparece y te quiere matar

*DOM (para `dom/07-dom.js`):*
- "Browser environment, specs" + "DOM tree" + "Walking the DOM" → 1h15
- "Searching: getElement*, querySelector*" + "Modifying the document" + "Styles and classes" → 2h
- **"Bubbling and capturing" + "Event delegation" → 2h** — crítico para entender cómo React maneja eventos
- "Form properties and methods" + "Events: submit" → 1h

*Generadores (para `08-generators.js`):*
- "Generators, advanced iteration" → cuando llegues al archivo; saltar si no llegás

*Storage (complementario, fuera del roadmap):*
- "LocalStorage, sessionStorage" + "Cookies, document.cookie" → 1h

---

## Etapa 6 — Nivel pro (advanced/)

Lo que separa "sé JavaScript" de "entiendo cómo funciona JavaScript". Acá viven los temas de entrevista, los bugs difíciles y los huecos que ningún curso básico cubre.

| Archivo | Temas | Por qué acá |
|---------|-------|-------------|
| `advanced/01-event-loop.js` | Microtasks vs macrotasks, await por dentro, starvation, partir trabajo pesado | Profundiza lo que `intermediate/05` presentó. EL tema de entrevistas — y la causa de los bugs async más confusos |
| `advanced/02-async-patterns.js` | AbortController, timeouts, retry con backoff, debounce/throttle, pools de concurrencia | Los patrones que el código de producción usa todos los días. Requiere async (05) dominado |
| `advanced/03-memory.js` | GC y alcanzabilidad, leaks (caches, listeners, timers), WeakMap/WeakSet, DevTools | Explica POR QUÉ existe el cleanup de useEffect antes de que React te lo imponga |
| `advanced/04-immutability.js` | Mutación vs copia, toSorted/toReversed/with, updates anidados, Object.freeze | EL prerequisito conceptual de React: detección de cambios por referencia |
| `advanced/05-dates-intl.js` | Date y sus 5 trampas, Intl.DateTimeFormat/NumberFormat/RelativeTimeFormat, Temporal | El hueco más grande de cualquier curso — y todos los proyectos reales usan fechas y monedas |
| `advanced/06-platform-apis.js` | URL, URLSearchParams, FormData, localStorage, clipboard, crypto.randomUUID, performance.now | La plataforma que rodea al lenguaje — sin esto no hay proyecto real |

**Señal de que terminaste**: podés predecir el orden de ejecución de código async mezclado (timers + promesas) sin ejecutarlo, y explicar por qué una respuesta de red vieja puede pisar una nueva — y cómo evitarlo.

**Lectura complementaria**:
- Lydia Hallie: *JavaScript Visualized: Event Loop* (si no lo leíste en la Etapa 5, ahora es obligatorio)
- javascript.info: "Garbage collection" + "WeakMap and WeakSet" → con `03`
- MDN: "Memory management" → con `03`

---

## Proyectos integradores

En `projects/README.md` hay 3 proyectos con criterios de aceptación:

1. **Mini store (tu propio Redux)** — después de la Etapa 5 + `advanced/04`
2. **Buscador con typeahead** — después de `advanced/02`
3. **Task runner concurrente** — la prueba final, todo `advanced/`

La teoría sin proyecto se evapora en dos semanas. No los saltees.

---

## Después de esto

| Paso | Qué es |
|------|--------|
| **TypeScript** | Ya tenés el roadmap en `/typescript/ROADMAP.md` |
| **Node.js** | El mismo JS del lado del servidor — más fs, http, streams, crypto |
| **pnpm + tooling** | package.json, Vite, ESLint, Prettier |
| **Framework** | React, Vue o Svelte — en ese orden de complejidad |

**Regla crítica**: no saltes a un framework hasta terminar la Etapa 6 completa.
El 90% de los problemas que tienen los devs junior en React son problemas de JavaScript, no de React.
