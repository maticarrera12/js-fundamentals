# Proyectos integradores

La teoría de `basic/`, `intermediate/` y `advanced/` te da las piezas. Estos proyectos te obligan a COMBINARLAS — que es donde realmente se aprende. Sin proyecto integrador, la teoría se evapora en dos semanas.

Hacelos en orden. Cada uno tiene criterios de aceptación: si se cumplen, pasaste. No hay solución incluida a propósito — pelearla es el ejercicio.

Sin frameworks, sin librerías. JavaScript puro — ese es el punto.

---

## Proyecto 1 — Mini store (tu propio Redux)

**Después de:** Etapa 5 + `advanced/04-immutability`
**Practica:** closures, inmutabilidad, referencias, event emitter

Un contenedor de estado con suscripciones, en menos de 100 líneas. Cuando lo termines, Redux y Zustand dejan de ser magia.

### Requisitos

- `createStore(initialState)` devuelve `{ getState, setState, subscribe }`
- El estado es PRIVADO — solo accesible vía closure, imposible de tocar desde afuera
- `setState(updater)` acepta función `(state) => newState` y NUNCA muta: siempre estado nuevo
- `subscribe(listener)` registra un callback y devuelve la función de `unsubscribe` (cleanup pattern de `advanced/03`)
- Los listeners se notifican SOLO si el estado realmente cambió (comparación por referencia — por eso la inmutabilidad importa)
- `select(selectorFn)`: suscripción a una PARTE del estado que solo notifica si esa parte cambió

### Criterios de aceptación

```js
const store = createStore({ count: 0, user: { name: 'Matias' } })

const unsub = store.subscribe((state) => console.log('cambió:', state.count))
store.setState((s) => ({ ...s, count: s.count + 1 }))   // loguea 'cambió: 1'
store.setState((s) => s)                                 // NO loguea (misma referencia)
unsub()
store.setState((s) => ({ ...s, count: 99 }))             // NO loguea (desuscripto)

// getState() devuelve el estado pero mutarlo NO afecta al store
```

**Desafío extra:** middleware estilo Redux — `createStore(init, [loggerMiddleware])`.

---

## Proyecto 2 — Buscador con typeahead

**Después de:** `advanced/02-async-patterns` (+ `intermediate/dom`)
**Practica:** debounce, AbortController, race conditions, DOM, event delegation

Un input de búsqueda contra una API pública real ([restcountries](https://restcountries.com), [PokéAPI](https://pokeapi.co)) que se comporta como uno profesional. HTML + JS puro, sin frameworks.

### Requisitos

- Debounce de 300ms — no hay un request por tecla
- Cada búsqueda nueva CANCELA la anterior con AbortController — imposible que una respuesta vieja pise una nueva
- Estados visibles: idle, buscando, resultados, sin resultados, error — uno solo activo a la vez
- Timeout de 5s con `AbortSignal.timeout` y reintento manual (botón en el estado de error)
- Resultados renderizados con creación de nodos (no innerHTML con datos de la API — pensá por qué)
- Click en un resultado via event delegation: UN listener en el contenedor, no uno por item

### Criterios de aceptación

- Tipear rápido "arg" → exactamente UN request en la pestaña Network (los anteriores figuran cancelados)
- Desconectar la red muestra el estado de error con botón de retry, no una consola roja
- No hay listeners acumulados al re-renderizar resultados (verificalo en DevTools → Memory, dos snapshots — `advanced/03`)

---

## Proyecto 3 — Task runner concurrente (CLI en Node)

**Después de:** todo `advanced/`
**Practica:** event loop, pools de concurrencia, retry/backoff, generators, performance.now

Un runner que ejecuta N tareas async (simuladas con fetch a APIs reales o `sleep` aleatorios que a veces fallan) con límite de concurrencia, reintentos y reporte final. Corre con `node runner.js`.

### Requisitos

- Recibe una lista de 20+ tareas; cada tarea tiene id, una función async, y falla aleatoriamente ~30% de las veces
- Pool de concurrencia configurable (default 4) — nunca más de N tareas en vuelo
- Retry con backoff exponencial + jitter, máximo 3 intentos por tarea
- Las tareas que agotan reintentos NO tiran el runner — quedan en el reporte como fallidas
- Reporte final con `console.table`: id, estado, intentos, duración (`performance.now`)
- Un generator `function*` produce las tareas — el pool las consume de a una (no hay array intermedio de promesas ya disparadas)

### Criterios de aceptación

- Con limit 1 el total tarda ~suma de duraciones; con limit 10, ~el máximo — demostralo con el reporte
- Matar una API (URL inválida) produce una fila "fallida tras 3 intentos", exit code 1, y el resto completa normal
- Cero promesas sin manejar (`node --unhandled-rejections=strict` no se queja)

---

## Señal de que terminaste el path

Abrí el código de una librería chica y real — [zustand](https://github.com/pmndrs/zustand) (el core son ~100 líneas) o [p-limit](https://github.com/sindresorhus/p-limit) — y leela completa. Si reconocés los patrones (closures sobre estado privado, pools, cleanup functions), ya pensás en JavaScript. Ese era el objetivo — y es la base sobre la que React deja de ser magia.
