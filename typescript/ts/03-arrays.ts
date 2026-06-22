// ============================================================
// 03 - ARRAYS, TUPLAS Y ENUMS
// ============================================================
// Tres herramientas para colecciones con diferente nivel de rigidez:
// arrays (flexible), tuplas (longitud y tipos fijos por posición),
// enums (conjunto acotado de constantes con nombre).
// ============================================================


// --- Arrays ---
// Dos sintaxis equivalentes:

const roles: string[] = ['admin', 'editor', 'viewer']
const ids: Array<number> = [1, 2, 3]  // forma genérica — mismo resultado

// Arrays con union types:
const mixed: (string | number)[] = ['uno', 2, 'tres', 4]

// En la mayoría de casos TS infiere el tipo del array:
const languages = ['TypeScript', 'Rust', 'Go']  // inferido: string[]


// --- Readonly arrays ---
// Previenen mutación: push, pop, sort, splice, etc. no están disponibles.
// Útiles para configuraciones, constantes y props de componentes.

const PERMISSIONS: readonly string[] = ['read', 'write', 'delete']
const PORTS: ReadonlyArray<number>   = [80, 443, 3000]

// PERMISSIONS.push('admin')  ❌ error: no se puede mutar
// PERMISSIONS[0] = 'x'       ❌ error: no se puede reasignar

// Diferencia clave:
// readonly string[] → los elementos siguen siendo string (tipo amplio)
// as const          → los elementos son literales exactos (tipo estrecho)


// --- as const ---
// Convierte el array en una tupla readonly de literales.
// Útil cuando necesitás usar los valores como tipos.

const ROUTES = ['/', '/users', '/settings', '/profile'] as const
// tipo: readonly ['/', '/users', '/settings', '/profile']

// Extraer el union type de los valores — sin duplicar la lista:
type Route = typeof ROUTES[number]
// '/' | '/users' | '/settings' | '/profile'
// Si ROUTES cambia, Route se actualiza automáticamente.


// --- Tuplas ---
// Arrays con longitud y tipos fijos en cada posición.
// Cada posición tiene un significado específico.

type RGB   = [number, number, number]
type Entry = [key: string, value: number]  // labels opcionales para documentación

const red: RGB     = [255, 0, 0]
const entry: Entry = ['score', 100]
const [key, score] = entry  // key: string, score: number

// Tupla con rest al final (longitud variable después de la parte fija):
type AtLeastOne = [string, ...number[]]
const data: AtLeastOne = ['label', 1, 2, 3]

// Ejemplo real — useState de React:
type State<T> = [T, (value: T) => void]
// const [language, setLanguage]: State<string> = useState('JavaScript')


// --- Matrices (array de arrays) ---
// Útil para grids, tableros, coordenadas.

type CellValue = 'X' | 'O' | ''
type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue]
]

const board: GameBoard = [
    ['X', 'X', 'O'],
    ['O', 'O', 'X'],
    ['X', 'X', 'O']
]


// --- Enums ---
// Conjunto de constantes con nombre. TS los compila a un objeto JS en runtime.
// Usá valores string (no numéricos) para que el output sea legible en logs.

enum ErrorType {
    NotFound     = 'NOT_FOUND',
    Unauthorized = 'UNAUTHORIZED',
    Forbidden    = 'FORBIDDEN',
    Internal     = 'INTERNAL'
}

function handleError(type: ErrorType): string {
    switch (type) {
        case ErrorType.NotFound:     return 'Recurso no encontrado'
        case ErrorType.Unauthorized: return 'Sin credenciales'
        case ErrorType.Forbidden:    return 'Sin permisos'
        case ErrorType.Internal:     return 'Error interno'
    }
}

// Enum numérico — el valor se auto-incrementa desde 0:
enum Priority {
    Low,      // 0
    Medium,   // 1
    High,     // 2
    Critical  // 3
}
// Priority.High === 2
// Priority[2] === 'High'  ← los numéricos tienen lookup inverso


// --- const enum ---
// Se REEMPLAZA en compile time por el valor literal.
// El objeto del enum no existe en runtime → menos código JS.
// Limitación: no podés iterarlo ni usarlo en contextos donde
// se necesite el objeto (como @types de librerías externas).

const enum DirectionMode {
    Up    = 'UP',
    Down  = 'DOWN',
    Left  = 'LEFT',
    Right = 'RIGHT'
}

function movementDirection(dir: DirectionMode): void {
    console.log(dir)  // en el JS compilado: console.log('UP')
}
movementDirection(DirectionMode.Up)

// Cuándo usar cuál:
// enum regular → cuando el código se consume desde fuera del módulo
// const enum   → cuando es solo uso interno, querés menos output JS


// --- Alternativa moderna: objeto as const ---
// Cada vez más equipos evitan los enums: son sintaxis EXTRA que TS
// compila a JS (no son "tipos borrables"), y eso complica herramientas
// modernas como el type-stripping de Node 22+ o esbuild.
// El reemplazo: un objeto as const + un tipo extraído de él.

const ERROR_CODE = {
    NotFound:     'NOT_FOUND',
    Unauthorized: 'UNAUTHORIZED',
    Forbidden:    'FORBIDDEN',
    Internal:     'INTERNAL',
} as const

// Una sola fuente de verdad: el tipo se DERIVA del objeto.
type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE]
// 'NOT_FOUND' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL'

function reportError(code: ErrorCode): void {
    console.log(`Error: ${code}`)
}

reportError(ERROR_CODE.NotFound)  // con el objeto (como un enum)
reportError('NOT_FOUND')          // o con el literal directo — más flexible que enum

// Ventajas sobre enum:
// - Es JavaScript puro con un cast — cero magia del compilador
// - Acepta tanto el literal como la referencia al objeto
// - El union resultante se integra natural con narrowing y mapped types


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

type Track = {
    title: string
    durationSeconds: number
}

// C1. Tupla fija. Definí "Pair" como [string, number]. Creá una
//     constante "firstTrack: Pair" con un título y su duración.
//     Desestructurá "firstTrack" en dos variables "title" y "seconds".
// Tu código acá:


// C2. Readonly array. Declará "GENRES: readonly string[]" con al menos
//     tres géneros musicales. Escribí "hasGenre(genre: string): boolean"
//     que use GENRES.includes(genre). Confirmá que GENRES.push(...) da error.
// Tu código acá:


// C3. as const + indexed type. Definí "PLAYLIST_NAMES" como array as const
//     con tres nombres de playlist. Extraé "PlaylistName" usando
//     "typeof PLAYLIST_NAMES[number]".
//     Esperado para PlaylistName: union de los 3 literales que pusiste.
// Tu código acá:


// C4. Enum básico. Definí un enum "PlaybackState" con: Playing, Paused,
//     Stopped. Escribí "describeState(state: PlaybackState): string"
//     con un switch que devuelva una descripción para cada valor.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Definí una tupla "Coordinate" con [latitude: number, longitude: number].
//    Escribí una función "distance(a: Coordinate, b: Coordinate): number"
//    que calcule la distancia euclidiana entre dos puntos.
// Tu código acá:


// 2. Usando as const, definí un array TRAFFIC_LIGHTS con los colores del semáforo.
//    Extraé el tipo "TrafficLight" de ese array (debe ser union de literales).
//    Escribí una función que reciba TrafficLight y devuelva la acción: avanzar, frenar, etc.
// Tu código acá:


// 3. Definí un enum "JobRole" con: Frontend, Backend, Fullstack, DevOps, QA, Designer.
//    Definí un type "Employee" con name (string), role (JobRole) y seniority ('junior' | 'mid' | 'senior').
//    Escribí una función que reciba Employee[] y devuelva los empleados agrupados
//    por rol: Record<JobRole, Employee[]>.
// Tu código acá:

export {}
