# JavaScript Roadmap

Todos los archivos siguen el mismo formato: explicación con comentarios → ejemplos ejecutables.
Leé el código, ejecutalo, modificalo. Referencia recomendada: [javascript.info](https://javascript.info).

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

---

## Etapa 2 — Funciones y scope (basic/11 + basic/20)

El corazón de JavaScript. Sin entender esto, todo lo demás es frágil.

| Archivo | Temas |
|---------|-------|
| `11-function.js` | Declaración, expresión, arrow, parámetros default, funciones de orden superior |
| `20-scope-and-this.js` | Lexical scope, scope chain, **closures**, **this**, call/apply/bind |

**Por qué juntos**: closures son el resultado directo de entender scope. `this` y call/apply/bind son el resultado directo de entender cómo se llaman las funciones.

**Señal para avanzar**: podés predecir qué imprime un closure sin ejecutarlo, y explicar qué es `this` en un método, en una función normal y en una arrow function.

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

---

## Después de esto

| Paso | Qué es |
|------|--------|
| **TypeScript** | Ya tenés el roadmap en `/typescript/ROADMAP.md` |
| **Node.js** | El mismo JS del lado del servidor — más fs, http, streams, crypto |
| **npm + tooling** | package.json, Vite, ESLint, Prettier |
| **Framework** | React, Vue o Svelte — en ese orden de complejidad |

**Regla crítica**: no saltes a un framework hasta terminar la Etapa 5 completa.
El 90% de los problemas que tienen los devs junior en React son problemas de JavaScript, no de React.
