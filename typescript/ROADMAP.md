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

## Cómo usar este roadmap

Dos fases en paralelo con los archivos:

**Fase 1 — TypeScript Handbook (3-4 días)**  
Leé las secciones clave: *More on Functions*, *Object Types*, *Generics*, toda la sección *Type Manipulation*, *Utility Types*.

**Fase 2 — Aplicación en código real (3-4 días)**  
Migrá un proyecto propio a TS estricto. Acá aprendés más que con cualquier documentación.

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

**Lectura complementaria** (TypeScript Handbook):
- "The Basics" → entender qué problema resuelve TS, type checking en build time vs runtime
- "Everyday Types" → string, number, boolean, arrays, tuples, any, unknown, void, tipos literales
- "Object Types" → interfaces vs types, propiedades opcionales, readonly, index signatures, extending, intersection

*"Narrowing" está en el Handbook como capítulo propio — lo leés cuando llegues al archivo 06.*

---

## Etapa 1 — Type System (06-08)

El núcleo. Sin esto TypeScript es solo "JavaScript con anotaciones".

| Archivo | Por qué acá |
|---------|-------------|
| `06-narrowing.ts` | Primero porque aplica tipos que ya conocés — no agrega sintaxis nueva, solo te enseña a leer el flujo que TS hace. Discriminated unions son el patrón más usado en código real. |
| `07-generics.ts` | El concepto más importante del roadmap. Sin generics no podés leer ni escribir utilidades, librerías ni APIs tipadas. Va después de narrowing porque los ejercicios combinan ambos. |
| `08-utility-types.ts` | Son generics ya resueltos que TS trae listo. Van después de generics para que entiendas qué hay debajo, no solo cómo usarlos. |

**Señal de que podés avanzar**: podés escribir una función genérica con constraint y usar `Partial`/`Omit` sin mirar la doc.

**Lectura complementaria** (TypeScript Handbook):
- "Narrowing" → mapea directo a `06`; leelo antes o en paralelo con el archivo
- "More on Functions" → call signatures, generic functions, overloads — complementa `07`
- **"Generics"** → el capítulo más importante del Handbook; leelo antes de `07`
- "Utility Types" → leelo después de `08`, para ver los que no cubre el archivo

---

## Etapa 2 — Tipos avanzados (09-11)

Esto es lo que te da superpoderes para modelar dominios complejos.

| Archivo | Por qué acá |
|---------|-------------|
| `09-mapped-types.ts` | Primero porque son la forma de transformar tipos. Entendiendo esto entendés cómo están hechos Partial, Required, Readonly por dentro. |
| `10-conditional-types.ts` | Después de mapped types porque `infer` necesita que tengas claro qué es un tipo parámetro. Los conditional types son la lógica de los tipos. |
| `11-template-literal-types.ts` | Al final porque sus ejercicios más poderosos combinan mapped + conditional + template. Si llegás acá podés leer tipos complejos de librerías como Zod, tRPC o Prisma. |

**Señal de que podés avanzar**: podés implementar `Pick` o `Exclude` vos mismo sin mirar la solución.

**Lectura complementaria** (TypeScript Handbook → sección *Type Manipulation*):

Esta sección vale la pena darle tiempo — el Handbook sugiere 3-4 días solo para este bloque.

- "Keyof Type Operator" → antes de `09`
- "Typeof Type Operator" → antes de `09`
- "Indexed Access Types" → antes de `09`
- **"Mapped Types"** → mapea directo a `09`
- **"Conditional Types"** → incluye distributive conditional types e `infer`; mapea a `10`
- **"Template Literal Types"** → mapea a `11`

---

## Etapa 3 — Estructuras y tooling (12-14)

Cómo TypeScript se integra con el mundo real.

| Archivo | Por qué acá |
|---------|-------------|
| `12-classes.ts` | Después del type system porque los modificadores de acceso y las clases abstractas tienen más sentido cuando entendés interfaces y generics. |
| `13-tsconfig.ts` | Antes de declaration files porque muchas opciones de tsconfig afectan directamente cómo se generan y consumen los .d.ts. |
| `14-declaration-files.ts` | Al final porque para escribirlos bien necesitás entender todo lo anterior: generics, utility types, ambient declarations. |

**Señal de que terminaste esta etapa**: podés arrancar un proyecto TypeScript desde cero con tsconfig correcto y saber por qué cada opción está ahí.

**Lectura complementaria** (TypeScript Handbook):
- "Classes" → pasada rápida si ya entendés clases en JS — foco en modificadores de acceso y abstract classes
- "Modules" → pasada rápida si ya entendés ESM

**Lo que no leer ahora:**
- *Reference* — es referencia, no tutorial; consultala cuando necesitás algo puntual
- *Declaration Files* — solo si vas a publicar librerías; no es el caso ahora
- *Project References* — para monorepos grandes; no aplica
- *JSX* — lo tocás cuando llegues a React

---

## Después de esto

Con las 3 etapas completadas, el camino natural es:

1. **TypeScript + Node.js** — Prisma, Fastify/Express tipado, Zod para validación
2. **TypeScript + React** — Props tipadas, hooks con generics, context tipado
3. **Patrones de arquitectura en TS** — Hexagonal, repositorios, servicios
4. **Librerías que valen la pena leer por dentro** — Zod, tRPC, Hono

El orden importa: no saltes a frameworks hasta tener sólida la Etapa 1 completa.
