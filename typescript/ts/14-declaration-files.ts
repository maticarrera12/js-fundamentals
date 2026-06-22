// ============================================================
// 14 - DECLARATION FILES (.d.ts)
// ============================================================
// Los archivos .d.ts son la "interfaz pública" de un módulo.
// Describen qué tipos tiene el código, sin contener lógica.
//
// Los ves todo el tiempo cuando instalás librerías:
// el paquete @types/node, @types/react, etc. son paquetes
// de solo .d.ts files que le enseñan a TS cómo es esa librería.
// ============================================================


// ============================================================
// PARTE 1: Cómo leerlos (lo que ya usás sin saber)
// ============================================================

// Cuando hacés:
// import fs from 'node:fs'

// TS busca el .d.ts de 'fs' en @types/node.
// Ese archivo describe exactamente qué hace fs.readFileSync,
// qué parámetros acepta, qué devuelve.

// Podés ver cualquier .d.ts en VSCode:
// Ctrl+Click sobre un tipo o función importada → abre el .d.ts


// ============================================================
// PARTE 2: Cuándo necesitás escribir uno
// ============================================================

// Caso 1: tenés un archivo .js sin tipos y querés tipar sin convertirlo
// Caso 2: publicás una librería en npm y querés que los usuarios tengan tipos
// Caso 3: usás una librería que no tiene @types y querés tipos mínimos


// ============================================================
// PARTE 3: Sintaxis básica
// ============================================================

// Un .d.ts solo tiene declaraciones, sin implementación:

// Así se vería utils.d.ts para este hipotético utils.js:
//
// export function formatDate(date: Date, locale?: string): string
// export function clamp(value: number, min: number, max: number): number
// export const VERSION: string

// Las implementaciones están en el .js. El .d.ts solo describe los tipos.


// ============================================================
// PARTE 4: Declaraciones ambient (declare)
// ============================================================

// "declare" le dice a TS "esto existe en runtime, confiá en mí"
// sin importar de dónde venga.

// Variables globales (ej: definidas por un script externo):
declare const __APP_VERSION__: string
declare const __DEV__: boolean

// Los bundlers como Vite/webpack inyectan estas variables.
// Sin el declare, TS no sabe que existen.

// Módulos sin tipos (cuando no hay @types):
// declare module 'some-untyped-library' {
//     export function doSomething(value: string): number
//     export const config: Record<string, unknown>
// }


// ============================================================
// PARTE 5: Augmentation — extender tipos existentes
// ============================================================

// A veces necesitás agregarle propiedades a tipos de librerías
// sin modificar su código fuente. Se llama "declaration merging".

// Ejemplo: agregar una propiedad a Request de Express:
declare global {
    namespace Express {
        interface Request {
            userId?: number
            role?: 'admin' | 'user'
        }
    }
}

// Ahora en cualquier handler de Express, req.userId está tipado.

// Ejemplo: agregar métodos a tipos built-in (hacelo con cuidado):
declare global {
    interface Array<T> {
        first(): T | undefined
        last(): T | undefined
    }
}

// Si implementás estos métodos en runtime, TS sabe de ellos.


// ============================================================
// PARTE 6: Cómo generarlos automáticamente
// ============================================================

// Si en tsconfig tenés "declaration": true,
// al compilar TS genera un .d.ts por cada .ts automáticamente.
//
// src/utils.ts     → dist/utils.js + dist/utils.d.ts
//
// Esto es lo que hacés cuando publicás una librería en npm:
// publicás el .js compilado + los .d.ts generados.
// Los usuarios instalan tu paquete y tienen tipos completos.


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

// C1. declare const. Declará una variable ambient "BUILD_ID: string"
//     (como si un bundler la inyectara en runtime) y usala en una
//     línea de código sin importarla.
// Tu código acá:


// C2. declare module mínimo. Escribí la declaración ambient para
//     un módulo sin tipos llamado 'left-pad' que expone una sola
//     función: leftPad(value: string, length: number): string.
// Tu código acá:


// C3. Declaration merging sobre un tipo propio. Declará dos veces
//     la misma interface "Account" en bloques separados —una con
//     "id: number", otra con "owner: string"— y comprobá que TS
//     las fusiona en un solo tipo con ambas propiedades.
//     Esperado: const acc: Account = { id: 1, owner: 'Matias' }
// Tu código acá:


// C4. Pensalo, no lo escribas todavía: si quisieras agregarle un
//     método "first()" a Array<T> a nivel global (como en la PARTE 5),
//     ¿con qué keyword + bloque envolvés la declaración? Escribí
//     solo la firma del método dentro de ese bloque.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá un archivo "globals.d.ts" en este directorio con:
//    - Una variable global: ENVIRONMENT: 'development' | 'production' | 'test'
//    - Una variable global: API_BASE_URL: string
//    Luego usalas en este archivo sin importarlas (son globales).
// Tu código acá (la implementación que usa las variables):


// 2. Creá un archivo "math-utils.d.ts" que declare los tipos de
//    estas funciones (sin implementarlas):
//    - add(a, b): suma dos números
//    - multiply(a, b): multiplica dos números
//    - factorial(n): calcula el factorial, devuelve number
//    - isPrime(n): devuelve boolean
//    - clamp(value, min, max): limita un número entre min y max
// Tu código acá:


// 3. Investigá: abrí con Ctrl+Click cualquier tipo de una
//    librería instalada (si tenés alguna) o de 'node:path',
//    'node:fs', etc. Encontrá en qué .d.ts está definido
//    y copiá acá la firma de al menos 2 funciones que uses seguido.
// Tu hallazgo acá:

export {}