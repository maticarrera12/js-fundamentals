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

## Etapa 1 — Estructuras de datos (basic/06-10)

Cómo guardar y recorrer colecciones de datos.

| Archivo | Temas |
|---------|-------|
| `06-array.js` | Arrays, acceso con `.at()`, push/pop/shift/unshift/splice, slice, sort, métodos funcionales (map/filter/reduce) |
| `07-sets.js` | Set — colección de valores únicos |
| `08-map.js` | Map — diccionario con keys de cualquier tipo |
| `09-loops.js` | for, while, do-while, for...of, **for...in** |
| `10-iterables.js` | Protocolo iterable, Symbol.iterator |

**Por qué este orden**: los loops van después de arrays porque el primer uso real es iterar colecciones.

**Señal para avanzar**: sabés cuándo usar Array vs Set vs Map, y la diferencia entre for...of y for...in.

**Lectura complementaria** (javascript.info → sección *Data types*):
- "Conditional branching" + "Loops" → 30 min (repaso rápido si ya los conocés)
- **"Arrays" + "Array methods" → 3h** — `.map`, `.filter`, `.reduce` son la columna vertebral de React; acá invertí tiempo
- "Map and Set" → 30 min
- "Iterables" → 30 min (concepto, no detalles)
- "Object.keys, values, entries" → 20 min

---

## Etapa 2 — Funciones y scope (basic/11 + basic/20)

El corazón de JavaScript. Sin entender esto, todo lo demás es frágil.

| Archivo | Temas |
|---------|-------|
| `11-function.js` | Declaración, expresión, arrow, parámetros default, funciones de orden superior |
| `20-scope-and-this.js` | Lexical scope, scope chain, **closures**, **this**, call/apply/bind |

**Por qué juntos**: closures son el resultado directo de entender scope. `this` y call/apply/bind son el resultado directo de entender cómo se llaman las funciones.

**Señal para avanzar**: podés predecir qué imprime un closure sin ejecutarlo, y explicar qué es `this` en un método, en una función normal y en una arrow function.

**Lectura complementaria** (javascript.info → sección *Advanced working with functions*):
- "Functions" + "Function expressions" + "Arrow functions, the basics" → 1h (antes de closures)
- **"Variable scope, closure" → 3-4h** — leelo dos veces, hacé todos los ejercicios; no hay atajo acá
- "The old var" → 20 min (no vas a usar `var`, pero entendés por qué `let` y `const` existen)
- "Global object" → 15 min
- "Function object, NFE" → 1h
- "Decorators and forwarding, call/apply" → 1h
- "Function binding" → 1h — por qué los métodos pueden perder `this` en React
- YDKJS: *Scope & Closures*, capítulos 1–3 (en paralelo con closure)
- Lydia Hallie: *JavaScript Visualized: Scope (Chain)*, *Hoisting*

---

## Etapa 3 — Objetos y clases (basic/12-15)

Cómo modelar datos y comportamiento.

| Archivo | Temas |
|---------|-------|
| `12-objects.js` | Literales, acceso, iteración, referencia vs valor |
| `13-destructuring-spreading.js` | Destructuring de arrays y objetos, spread, **rest** |
| `14-class.js` | Clases, private fields (#), getters/setters |
| `15-class-heritage.js` | extends, super, static |

**Por qué este orden**: destructuring antes de clases porque los constructores modernos lo usan. Herencia al final porque requiere entender la clase base primero.

**Señal para avanzar**: entendés por qué `obj1 === obj2` es `false` aunque tengan los mismos datos.

**Lectura complementaria** (javascript.info → sección *Objects: the basics*):
- "Objects" → 1h — foco en paso por referencia, origen de bugs eternos
- "Object references and copying" → 1h — crítico para React: mutación vs inmutabilidad
- "Garbage collection" → 30 min (conceptual, limpia ideas)
- **"Object methods, this" → 2h** — acá no escatimes
- "Destructuring assignment" → 1h — lo usás en cada componente de React
- "Methods of primitives" → 30 min
- Lydia Hallie: *JavaScript Visualized: The this keyword*

---

## Etapa 4 — Herramientas esenciales (basic/16-21)

Lo que usás en cada proyecto real.

| Archivo | Temas |
|---------|-------|
| `16-errors-handling.js` | try/catch/finally, throw, errores personalizados |
| `17-console.methods.js` | console.table, group, time — debugging real |
| `18-export-modules.js` | export, export default |
| `19-import-modules.js` | import estático, import dinámico |
| `21-json.js` | JSON.stringify, JSON.parse, structuredClone |

**Señal para avanzar**: podés crear un módulo con múltiples exports, importarlo desde otro archivo, y manejar errores de JSON correctamente.

**Lectura complementaria** (javascript.info):
- "JSON methods, toJSON" → 30 min
- "Modules, introduction" + "Export and import" → 1h
- "Dynamic imports" → 20 min — importante: Next.js lo usa para code splitting

---

## Etapa 5 — JavaScript intermedio

Con la base sólida, estos archivos profundizan cómo funciona JS en la práctica.

| Archivo | Temas | Por qué acá |
|---------|-------|-------------|
| `intermediate/01-advanced-functions.js` | First-class functions, IIFE, rest/spread, closures, recursión, partial application, currying, memoization, pipe | Cierra el entendimiento de closures — requiere Etapa 2 |
| `intermediate/02-advanced-structures.js` | Array methods funcionales, Set/Map avanzados | Requiere conocer los métodos básicos de Etapa 1 |
| `intermediate/03-object.js` | Prototipos, Object.create, Object.keys/values/entries | Después de clases — entendés qué hay debajo del azúcar sintáctico |
| `intermediate/04-classes-advanced.js` | Mixins (higher-order class), Singleton, Symbol vs private fields (#), Proxy, EventEmitter | Requiere herencia de Etapa 3 |
| `intermediate/05-async.js` | Event loop, callbacks, Promises, async/await, Promise.all/allSettled/race | Requiere entender funciones bien — es el tema más importante de esta etapa |
| `intermediate/06-api.js` | fetch, headers, manejo de respuestas | Después de async — aplicación directa |
| `intermediate/07-regex.js` | Expresiones regulares — buscar, validar, transformar texto | Requiere dominar strings — independiente del resto |
| `intermediate/08-generators.js` | function*, yield, iteradores infinitos, async generators | Requiere iterables (Etapa 1) y async (05) |
| `intermediate/dom/07-dom.js` | DOM manipulation, eventos | Requiere todo lo anterior — es la interfaz con el browser |

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

## Después de esto

| Paso | Qué es |
|------|--------|
| **TypeScript** | Ya tenés el roadmap en `/typescript/ROADMAP.md` |
| **Node.js** | El mismo JS del lado del servidor — más fs, http, streams, crypto |
| **pnpm + tooling** | package.json, Vite, ESLint, Prettier |
| **Framework** | React, Vue o Svelte — en ese orden de complejidad |

**Regla crítica**: no saltes a un framework hasta terminar la Etapa 5 completa.
El 90% de los problemas que tienen los devs junior en React son problemas de JavaScript, no de React.
