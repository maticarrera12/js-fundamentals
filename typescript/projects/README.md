# Proyectos integradores

Los archivos 01-19 te dan las piezas. Estos proyectos te obligan a COMBINARLAS — que es donde realmente se aprende. Sin proyecto integrador, la teoría se evapora en dos semanas.

Hacelos en orden. Cada uno tiene un "contrato": si los criterios de aceptación compilan y funcionan, pasaste. No hay solución incluida a propósito — pelearla es el ejercicio.

Para cada proyecto: carpeta propia, `pnpm init -y`, `tsconfig.json` con `strict: true` escrito por vos (el ejercicio del archivo 13 cuenta como precalentamiento).

---

## Proyecto 1 — Event Bus tipado

**Después de:** archivo 11 (etapas 0-2 completas)
**Practica:** generics, mapped types, template literals, narrowing

Un event bus donde TODO está tipado: nombres de eventos, payloads y handlers.

### Requisitos

- `createEventBus<TEvents>()` donde `TEvents` mapea nombre de evento → payload
- `on(event, handler)` — el handler recibe el payload tipado del evento exacto
- `off(event, handler)` — desuscribe
- `emit(event, payload)` — TS rechaza payloads del tipo equivocado
- `once(event, handler)` — se ejecuta una sola vez
- Wildcard: `onAny((event, payload) => ...)` recibe la union de todos los eventos

### Criterios de aceptación

```ts
type AppEvents = {
    'user:login': { userId: number }
    'user:logout': { userId: number; reason: string }
    'cart:add': { productId: string; qty: number }
}

const bus = createEventBus<AppEvents>()
bus.on('user:login', (p) => p.userId.toFixed())     // p tipado ✓
// bus.emit('user:login', { userId: '1' })          ❌ no compila
// bus.on('user:signin', () => {})                  ❌ no compila
```

**Desafío extra:** un tipo `EventNamespace` que extraiga `'user' | 'cart'` de las keys usando template literal types + infer.

---

## Proyecto 2 — Cliente de API validado

**Después de:** archivo 19 (todo el path)
**Practica:** Zod, Result, branded types, módulos, fetch tipado

Un cliente para una API pública real ([PokéAPI](https://pokeapi.co), [restcountries](https://restcountries.com), la que quieras) que NUNCA miente sobre sus tipos.

### Requisitos

- Schemas Zod para cada endpoint que uses (mínimo 3) — los tipos salen de `z.infer`, prohibido escribirlos a mano
- Las funciones devuelven `Result<T, ApiError>` — nada lanza hacia afuera
- `ApiError` es una discriminated union: `{ kind: 'network' }`, `{ kind: 'http'; status: number }`, `{ kind: 'validation'; issues: string[] }`
- IDs como branded types (`PokemonId`, `CountryCode`...)
- Un `main.ts` que consuma el cliente y maneje TODOS los errores con switch + `assertNever`
- ESM puro: `"type": "module"`, `module: "nodenext"`, imports con extensión

### Criterios de aceptación

- `pnpx tsc --noEmit` limpio con `strict: true`
- Romper un schema a propósito (cambiar un campo a otro tipo) produce un error de validación claro, no un crash misterioso
- Ningún `as` excepto dentro de los constructores de branded types
- Ningún `any` (ni explícito ni implícito)

---

## Proyecto 3 — Migración real a TS estricto

**Después de:** proyecto 2
**Practica:** todo — sobre código que no fue diseñado para TS

Agarrá un proyecto JS tuyo (de la carpeta `javascript/`, por ejemplo) y migralo a TypeScript estricto. Esta es la prueba final: el código ajeno al sistema de tipos es donde TS muestra los dientes.

### Reglas del juego

1. Renombrá `.js` → `.ts` y arrancá con `strict: true` desde el día uno (nada de migrar laxo y endurecer después — así quedan los proyectos a medio migrar para siempre)
2. Prohibido `any`. Si no sabés el tipo, es `unknown` + narrowing
3. Cada `as` que escribas necesita un comentario justificando por qué TS no puede saberlo solo
4. Datos externos (fetch, JSON, localStorage) → schema Zod en la frontera
5. Estados imposibles → discriminated unions (si tenés `loading && data`, modelaste mal)

### Criterios de aceptación

- `pnpx tsc --noEmit` limpio
- El programa hace EXACTAMENTE lo mismo que antes
- Contá los bugs reales que el compilador te encontró durante la migración — anotalos en un `MIGRATION.md`. Esa lista es tu mejor argumento para usar TS en cualquier discusión futura.

---

## Señal de que terminaste el path

Podés abrir el código fuente de Zod o de tRPC, leer sus tipos, y entender QUÉ hacen y POR QUÉ. No todo — pero lo suficiente para no sentir que es magia negra. Ese era el objetivo.
