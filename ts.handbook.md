### Bloque 1: fundamentos (días 1-2)

- [x]  **The Basics** — entender qué problema resuelve TS, type checking, error reporting
- [x]  **Everyday Types** — string, number, boolean, arrays, tuples, any, unknown, void, tipos literales
- [x]  **Narrowing** — type guards, typeof, instanceof, in, discriminated unions

### Bloque 2: funciones y objetos (día 3)

- [ ]  **More on Functions** — call signatures, construct signatures, generic functions, overloads
- [ ]  **Object Types** — interfaces vs types, propiedades opcionales, readonly, index signatures, extending types, intersection types, generics en interfaces

### Bloque 3: type manipulation (días 4-7)

Esto es donde TS se vuelve potente. Vale la pena darle tiempo.

- [ ]  **Generics** — la base de todo lo avanzado
- [ ]  **Keyof Type Operator**
- [ ]  **Typeof Type Operator**
- [ ]  **Indexed Access Types**
- [ ]  **Conditional Types** — incluye distributive, `infer`
- [ ]  **Mapped Types**
- [ ]  **Template Literal Types**

### Bloque 4: misceláneos prácticos (día 8)

- [ ]  **Classes** — pasada rápida si ya entendés clases en JS
- [ ]  **Modules** — pasada rápida si ya entendés ESM
- [ ]  **Utility Types** — Partial, Required, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, Parameters, Awaited, etc.

**Reference** (la otra sección grande): es referencia, no tutorial. La consultás cuando necesitás algo puntual, no la leés lineal.

**Declaration Files**: solo si vas a publicar librerías o escribir tipos para JS sin tipos. No es tu caso ahora.

**Project References**: para monorepos grandes. No te aplica.

**JSX**: cuando llegues a React lo tocás.

**Fase 1: Videos de Midu (2-3 días)**

Los dos videos completos. Te dan la base con voz en español y tu nivel.

**Fase 2: Handbook oficial para llenar huecos (3-4 días)**

Después de Midu, vas al handbook en inglés (con el contexto en español ya consolidado) y leés solo las secciones que Midu no cubrió:

- More on Functions (overloads, generic functions)
- Object Types (extending, intersection avanzado)
- Generics (todo el capítulo)
- Type Manipulation completo (keyof, typeof, indexed access, conditional, mapped, template literals)
- Utility Types

Como ya tenés la base en español, leer estas secciones en inglés se vuelve mucho más fácil.

**Fase 3: Aplicación en biblio (3-4 días)**

Migrás biblio a TS estricto. Acá aprendés más que con cualquier doc.