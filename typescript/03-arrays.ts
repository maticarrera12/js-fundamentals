// ============================================================
// 03 - ARRAYS, TUPLAS Y ENUMS
// ============================================================
// Tres herramientas para colecciones con diferente nivel de rigidez:
// arrays (flexible), tuplas (longitud y tipos fijos por posición),
// enums (conjunto acotado de constantes con nombre).
// ============================================================


// --- Arrays ---
// Dos sintaxis equivalentes:

const roles: string[]    = ['admin', 'editor', 'viewer']
const ids: Array<number> = [1, 2, 3]  // forma genérica — mismo resultado

// Arrays con union types:
const mixed: (string | number)[] = ['uno', 2, 'tres', 4]

// En la mayoría de casos TS infiere el tipo del array:
const languages = ['TypeScript', 'Rust', 'Go']  // inferido: string[]


// --- Readonly arrays ---
// Previenen mutación: push, pop, sort, splice, etc. no están disponibles.
// Útiles para configuraciones, constantes y props de componentes.

const PERMISSIONS: readonly string[]  = ['read', 'write', 'delete']
const PORTS: ReadonlyArray<number>    = [80, 443, 3000]

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
