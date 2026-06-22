// ============================================================
// 16 - TIPADO ESTRUCTURAL: CÓMO PIENSA TYPESCRIPT
// ============================================================
// Este archivo no enseña sintaxis nueva — enseña el MODELO MENTAL.
// La mayoría de los errores "raros" de TS dejan de ser raros
// cuando entendés tres cosas: tipado estructural, asignabilidad
// como teoría de conjuntos, y varianza en funciones.
// ============================================================


// --- Tipado estructural vs nominal ---
// En Java/C# (tipado nominal), dos tipos son compatibles si DECLARASTE
// la relación (extends/implements). En TS, son compatibles si tienen
// la misma FORMA. El nombre del tipo no importa — importa la estructura.

interface Point2D {
    x: number
    y: number
}

class Vector {
    constructor(public x: number, public y: number) {}
}

function printPoint(p: Point2D): void {
    console.log(`(${p.x}, ${p.y})`)
}

printPoint(new Vector(1, 2))      // ✓ Vector tiene x e y — compatible
printPoint({ x: 3, y: 4 })        // ✓ literal con la forma correcta

// Vector nunca declaró "implements Point2D" — no hace falta.
// Esto es lo que hace que TS funcione tan bien con JS: el JS real
// se escribe pasando objetos con formas, no jerarquías de clases.


// --- Asignabilidad: pensá en conjuntos ---
// Un tipo es un CONJUNTO de valores posibles.
//   'hello'           → conjunto de 1 valor
//   string            → conjunto infinito de strings
//   string | number   → la UNIÓN de dos conjuntos
//   A & B             → la INTERSECCIÓN (valores que cumplen ambos)
//
// "T es asignable a U" significa: el conjunto T está CONTENIDO en U.

let specific: 'hello' = 'hello'
let general: string = specific    // ✓ 'hello' ⊂ string
// specific = general             ❌ string ⊄ 'hello'

// Por eso un objeto con MÁS propiedades es asignable a uno con menos:
// más propiedades = conjunto más chico (más restricciones).
interface Named { name: string }

const fullUser = { name: 'Matias', age: 25, admin: true }
const named: Named = fullUser     // ✓ fullUser cumple todo lo que Named pide


// --- Excess property checking ---
// PERO: si pasás el literal DIRECTO, TS se pone estricto.
// Un literal "fresco" con propiedades extra casi siempre es un typo.

interface ButtonProps {
    label: string
    onClick?: () => void
}

function renderButton(props: ButtonProps): void {}

// Vía variable intermedia: pasa (asignabilidad estructural normal)
const propsVar = { label: 'Save', onclick: () => {} }  // typo: onclick
renderButton(propsVar)  // ✓ compila... y el typo vive silencioso

// Literal directo: TS lo agarra
// renderButton({ label: 'Save', onclick: () => {} })
// ❌ 'onclick' does not exist... Did you mean 'onClick'?

// Lección: pasá literales directos cuando puedas — TS chequea más fuerte.


// --- Widening: cómo TS decide el tipo de tus literales ---
// let → TS "ensancha" al tipo general (vas a reasignar)
// const → conserva el literal (no puede cambiar)

let mutableStatus = 'active'        // string
const fixedStatus = 'active'        // 'active'

// En objetos, las propiedades se ensanchan AUNQUE uses const,
// porque las propiedades sí son mutables:
const config = { env: 'prod' }      // { env: string }
// Por eso existe as const — congela todo el árbol:
const frozenConfig = { env: 'prod' } as const  // { readonly env: 'prod' }


// --- La jerarquía: unknown arriba, never abajo ---
// unknown → el conjunto UNIVERSAL: todo valor es asignable a unknown
// never   → el conjunto VACÍO: never es asignable a todo, nada es asignable a él
// any     → fuera del sistema: desactiva el chequeo en ambas direcciones

const anything: unknown = 42          // ✓ todo entra en unknown
// const num: number = anything       ❌ unknown no baja sin narrowing

declare const impossible: never
const n: number = impossible          // ✓ never es subtipo de TODO
const s: string = impossible          // ✓ (el conjunto vacío está en todos lados)

// Esto explica cosas que ya viste:
// - exhaustiveness checking (02): si manejaste todos los casos, queda never
// - filtrar keys con never (09): never en un union DESAPARECE (X | never = X)
type Cleaned = string | never         // string


// --- Unions e intersections de OBJETOS (la confusión clásica) ---
// "& parece AND de propiedades, | parece OR" — pero pensalo en VALORES:

type WithName = { name: string }
type WithAge = { age: number }

// Intersección: valores que cumplen AMBOS contratos → tiene AMBAS props
type Both = WithName & WithAge
const both: Both = { name: 'Matias', age: 25 }

// Unión: valores que cumplen AL MENOS UNO → solo podés ACCEDER a lo común
declare const either: WithName | WithAge
// either.name   ❌ podría ser un WithAge
// either.age    ❌ podría ser un WithName
// Para usar una unión de objetos, primero narroweás ('name' in either, etc.)


// --- Varianza: compatibilidad de funciones ---
// La parte menos intuitiva de TS. Dos preguntas:
//
// ¿Cuándo puedo usar una función A donde se espera una función B?
//
// RETORNOS — covariantes (misma dirección):
//   una función que devuelve Dog sirve donde se espera () => Animal.
//   (devolvés algo MÁS específico: quien recibe Animal está feliz)
//
// PARÁMETROS — contravariantes (dirección INVERTIDA):
//   una función que acepta Animal sirve donde se espera (dog: Dog) => void.
//   (aceptás algo MÁS general: cualquier Dog que te pasen lo bancás)

interface Animal { name: string }
interface Dog extends Animal { breed: string }

type AnimalHandler = (animal: Animal) => void
type DogHandler = (dog: Dog) => void

declare const handleAnimal: AnimalHandler
declare const handleDog: DogHandler

const h1: DogHandler = handleAnimal   // ✓ acepta más de lo necesario
// const h2: AnimalHandler = handleDog
// ❌ handleDog usa .breed — le pueden pasar un Cat y explota en runtime

// Con strictFunctionTypes (incluido en strict) TS chequea esto bien
// para funciones... pero los MÉTODOS de interfaces son bivariantes
// (más permisivos) por razones históricas de compatibilidad con el DOM.


// --- Brechas del tipado estructural ---
// Dos tipos con la misma forma son INTERCAMBIABLES — aunque
// semánticamente sean cosas muy distintas:

type UserId = string
type OrderId = string

function cancelOrder(orderId: OrderId): void {}

const userId: UserId = 'user-123'
cancelOrder(userId)  // ✓ compila... y es un BUG de lógica

// TS no puede distinguirlos: ambos son el conjunto "string".
// La solución son los branded types — los ves en el archivo 17.


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

interface Shape {
    width: number
    height: number
}

// C1. Estructural vs nominal. Declará una clase "Rectangle" con
//     constructor(public width: number, public height: number) {}
//     SIN "implements Shape". Escribí una función "area(s: Shape): number"
//     que devuelva width * height, y llamala con un "new Rectangle(2, 3)".
//     Pregunta: ¿hace falta "implements Shape" para que compile? ¿Por qué?
// Tu código acá:


// C2. Asignabilidad como conjuntos. Declará:
//       let wide: number
//       const narrow: 5 = 5
//     Asigná narrow a wide. Después intentá asignar wide a narrow y
//     comentá el error que tira TS (no lo borres, comentalo con //).
//     Esperado: narrow → wide compila; wide → narrow NO compila.
// Tu código acá:


// C3. Excess property checking directo. Pasale a "area" un objeto
//     LITERAL con una propiedad de más, por ejemplo "depth: 1".
//     Comentá la línea cuando veas el error. Después arreglalo
//     pasando el mismo objeto pero a través de una variable intermedia.
// Tu código acá:


// C4. unknown vs never. Declará "declare const x: unknown" y
//     "declare const y: never". Intentá:
//       const a: Shape = x   ❌ (comentalo)
//       const b: Shape = y   ✓
//     Explicá en un comentario por qué "never" sí entra y "unknown" no.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Sin ejecutar nada, respondé y DESPUÉS verificá con el compilador:
//    a) ¿{ a: string; b: number } es asignable a { a: string }?
//    b) ¿{ a: string } es asignable a { a: string; b?: number }?
//    c) ¿string[] es asignable a readonly string[]? ¿Y al revés?
// Tus respuestas y verificación acá:


// 2. Creá una función "processItems(items: string[], log: (item: string) => void)".
//    Intentá pasarle como log:
//    a) una función (item: unknown) => void
//    b) una función (item: 'a' | 'b') => void
//    Explicá en un comentario POR QUÉ una compila y la otra no (varianza).
// Tu código acá:


// 3. Reproducí el bug de excess property checking:
//    definí una interface con una prop opcional, creá un objeto con esa
//    prop mal escrita en una variable intermedia, y pasalo a una función.
//    Después arreglalo usando "satisfies" en la variable intermedia.
// Tu código acá:

export {}
