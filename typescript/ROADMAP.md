# TypeScript Roadmap

Todos los archivos siguen la misma estructura: explicación con comentarios → ejemplos → ejercicios al final.

---

## Base: JavaScript primero

Antes de TypeScript necesitás tener sólido:
- Closures y scope
- Prototypes y clases de ES6
- Destructuring, spread, rest
- Async/await y Promises
- Array methods (map, filter, reduce)
- Módulos (import/export)

Si algo de esto falla, TypeScript lo va a amplificar — no lo va a resolver.

---

## Etapa 0 — Fundamentos del type system (01-05)

Los conceptos base que TS agrega sobre JS. Cada archivo tiene foco propio — sin solapamiento.

| Archivo | Temas |
|---------|-------|
| `01-types.ts` | Primitivos, funciones (firma, arrow, async), objetos, type alias, union types, tipos literales, null/undefined, non-null assertion (!) |
| `02-inference.ts` | Inferencia contextual, any, **unknown**, void, never, exhaustiveness checking, typeof, ReturnType, type indexing, intersection types (&) |
| `03-arrays.ts` | Arrays, **readonly arrays**, **as const**, tuplas (con labels y rest), matrices, enums, **const enum** |
| `04-type-assertions.mts` | as, cuándo usarlo correctamente, **as const** en objetos, **satisfies**, fetch tipado completo |
| `05-interfaces.ts` | Interfaces, métodos, extends (simple y múltiple), **declaration merging**, **index signatures**, interface vs type alias |

---

## Etapa 1 — Type System (06-08)

El núcleo. Sin esto TypeScript es solo "JavaScript con anotaciones".

| Archivo | Por qué acá |
|---------|-------------|
| `06-narrowing.ts` | Primero porque aplica tipos que ya conocés — no agrega sintaxis nueva, solo te enseña a leer el flujo que TS hace. Discriminated unions son el patrón más usado en código real. |
| `07-generics.ts` | El concepto más importante del roadmap. Sin generics no podés leer ni escribir utilidades, librerías ni APIs tipadas. Va después de narrowing porque los ejercicios combinan ambos. |
| `08-utility-types.ts` | Son generics ya resueltos que TS trae listo. Van después de generics para que entiendas qué hay debajo, no solo cómo usarlos. |

**Señal de que podés avanzar**: podés escribir una función genérica con constraint y usar `Partial`/`Omit` sin mirar la doc.

---

## Etapa 2 — Tipos avanzados (09-11)

Esto es lo que te da superpoderes para modelar dominios complejos.

| Archivo | Por qué acá |
|---------|-------------|
| `09-mapped-types.ts` | Primero porque son la forma de transformar tipos. Entendiendo esto entendés cómo están hechos Partial, Required, Readonly por dentro. |
| `10-conditional-types.ts` | Después de mapped types porque `infer` necesita que tengas claro qué es un tipo parámetro. Los conditional types son la lógica de los tipos. |
| `11-template-literal-types.ts` | Al final porque sus ejercicios más poderosos combinan mapped + conditional + template. Si llegás acá podés leer tipos complejos de librerías como Zod, tRPC o Prisma. |

**Señal de que podés avanzar**: podés implementar `Pick` o `Exclude` vos mismo sin mirar la solución.

---

## Etapa 3 — Estructuras y tooling (12-14)

Cómo TypeScript se integra con el mundo real.

| Archivo | Por qué acá |
|---------|-------------|
| `12-classes.ts` | Después del type system porque los modificadores de acceso y las clases abstractas tienen más sentido cuando entendés interfaces y generics. |
| `13-tsconfig.ts` | Antes de declaration files porque muchas opciones de tsconfig afectan directamente cómo se generan y consumen los .d.ts. |
| `14-declaration-files.ts` | Al final porque para escribirlos bien necesitás entender todo lo anterior: generics, utility types, ambient declarations. |

**Señal de que terminaste esta etapa**: podés arrancar un proyecto TypeScript desde cero con tsconfig correcto y saber por qué cada opción está ahí.

---

## Después de esto

Con las 3 etapas completadas, el camino natural es:

1. **TypeScript + Node.js** — Prisma, Fastify/Express tipado, Zod para validación
2. **TypeScript + React** — Props tipadas, hooks con generics, context tipado
3. **Patrones de arquitectura en TS** — Hexagonal, repositorios, servicios
4. **Librerías que valen la pena leer por dentro** — Zod, tRPC, Hono

El orden importa: no saltes a frameworks hasta tener sólida la Etapa 1 completa.
