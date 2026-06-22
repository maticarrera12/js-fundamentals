// ============================================================
// 01 - EL SISTEMA DE TIPOS
// ============================================================
// TypeScript agrega anotaciones de tipo sobre JavaScript.
// El compilador verifica esas anotaciones en build time —
// el error aparece antes de que el código se ejecute.
// ============================================================


// --- Primitivos ---
// Tres tipos principales + dos menos comunes.
// TS los infiere automáticamente — solo anotás cuando no puede.

let name: string  = 'Matías'
let age: number   = 25
let active: boolean = true

// bigint: números que superan el límite de number (2^53)
const big: bigint = 9007199254740991n

// symbol: identificador único e irrepetible
const uid: symbol = Symbol('uid')


// --- Funciones ---
// Anotás los parámetros y el tipo de retorno.
// TS puede inferir el retorno, pero anotarlo es buena práctica en funciones públicas.

function greet(name: string): string {
    return `Hola, ${name.toUpperCase()}!`
}

// Parámetro opcional con ?  (puede ser undefined)
// Parámetro con default      (TS infiere el tipo del valor)
// El retorno se infiere: { name: string; role: string; bio: string | undefined }
// Nunca anotes `object` como retorno — no dice NADA sobre la forma del objeto.
function createUser(name: string, role: string = 'user', bio?: string) {
    return { name, role, bio }
}

// Funciones asíncronas: el retorno siempre es Promise<T>
async function fetchText(url: string): Promise<string> {
    const res = await fetch(url)
    return res.text()
}

// Funciones como tipos: describí la firma completa, nunca uses Function
// Function es el `any` de las funciones — no da info de parámetros ni retorno
type Transformer = (input: string) => string
const toUpper: Transformer = (s) => s.toUpperCase()


// --- Objetos ---
// Describís la forma del objeto inline o con un type alias.

function printCoord(pt: { x: number; y: number; label?: string }): void {
    console.log(`(${pt.x}, ${pt.y}) ${pt.label ?? ''}`)
}
printCoord({ x: 3, y: 7 })
printCoord({ x: 0, y: 0, label: 'origen' })


// --- Record<K, V> ---
// Cuando el objeto tiene claves dinámicas pero todas del mismo tipo de valor.
// Record<K, V> es azúcar para { [key: K]: V } — más legible

type Headers = Record<string, string>  // todas las claves string, todos los valores string

const httpHeaders: Headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
}

// También funciona con keys literales — restringe exactamente qué claves existen
type Scores = Record<'math' | 'english' | 'history', number>

const studentScores: Scores = {
    math: 90,
    english: 85,
    history: 78,
}
// studentScores.science = 70  ❌ 'science' no es una key válida


// --- Type alias ---
// Nombre reutilizable para cualquier tipo, no solo objetos.

type Point = {
    x: number
    y: number
}

type ID = string | number  // funciona con cualquier tipo


// --- Union types ---
// Una variable puede ser uno de varios tipos.
// Solo podés usar métodos que existan en TODOS los tipos del union.

function formatId(id: string | number): string {
    if (typeof id === 'string') {
        return id.toUpperCase()  // TS sabe que es string acá
    }
    return String(id)            // TS sabe que es number acá
}

function processInputOne(input: string | string[]): string {
    if (Array.isArray(input)) return input.join(', ')
    return input
}


// --- Tipos literales ---
// En vez de "cualquier string", especificás exactamente qué valores son válidos.
// Por sí solos no tienen mucho valor — combinados con unions son poderosos.

type Direction  = 'north' | 'south' | 'east' | 'west'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

function move(dir: Direction, steps: number): void {
    console.log(`Moviéndose ${steps} pasos hacia el ${dir}`)
}
move('north', 3)
// move('up', 3)  ❌ error: 'up' no es Direction válido


// --- null y undefined ---
// Con strict: true, son tipos separados — tenés que manejarlos explícitamente.
// Sin strictNullChecks podés asignar null a cualquier tipo, lo cual causa bugs.

function getLength(text: string | null): number {
    if (text === null) return 0
    return text.length  // TS sabe que text es string acá
}

// Operador ! (non-null assertion): "confío en que no es null"
// Si te equivocás, el error es en runtime — usalo con criterio.
// Se indica que el texto no es null o undefined.
function getUpperCase(text: string | null): string {
    return text!.toUpperCase()
}


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

type Book = {
    title: string
    pages: number
    available: boolean
}

// C1. Primitivos. Declará tres variables: "bookTitle" (string),
//     "totalPages" (number) y "isAvailable" (boolean), anotando
//     el tipo explícitamente aunque TS lo pueda inferir solo.
// Tu código acá:


// C2. Función con parámetro opcional. Escribí "describeBook(book: Book,
//     note?: string): string" que devuelva el título y, si "note" vino,
//     lo agregue al final del string.
// Tu código acá:


// C3. Union + narrowing. Escribí "formatPages(value: string | number): string"
//     que devuelva "${value} páginas" si es number, o el string tal cual
//     en mayúsculas si es string. Usá "typeof" para narrowear.
// Tu código acá:


// C4. Tipo literal. Definí "BookStatus" como union de los literales
//     'available' | 'borrowed' | 'lost'. Escribí "nextStatus(status:
//     BookStatus): BookStatus" que devuelva 'borrowed' si recibe
//     'available', y 'available' en cualquier otro caso.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Definí un type alias "Product" con:
//    - id: number
//    - name: string
//    - category: 'electronics' | 'clothing' | 'food' | 'books'
//    - price: number
//    - inStock: boolean (opcional, default true)
//    Escribí una función "describeProduct" que reciba Product
//    y devuelva un string descriptivo.
// Tu código acá:


// 2. Escribí una función "parseValue" que reciba string | number | boolean
//    y devuelva siempre un string:
//    - string → en mayúsculas
//    - number → con 2 decimales ("3.14")
//    - boolean → "sí" o "no"
// Tu código acá:


// 3. Definí un type "ApiConfig" con: url (string), method (HttpMethod),
//    timeout (number, opcional), headers (Record<string, string>, opcional).
//    Escribí una función "logRequest" que reciba ApiConfig y loguee la petición.
// Tu código acá:

export {}
