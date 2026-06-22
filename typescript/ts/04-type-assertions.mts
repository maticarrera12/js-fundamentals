// ============================================================
// 04 - TYPE ASSERTIONS
// ============================================================
// A veces vos sabés más que TypeScript sobre el tipo de un valor.
// Las assertions son la forma de decirle al compilador: "confiá en mí".
// Aparecen principalmente con valores que vienen de afuera del
// sistema de tipos: el DOM, respuestas de API, JSON.parse.
// ============================================================


// --- as ---
// Le decís a TS que trate el valor como un tipo más específico.

// getElementById devuelve HTMLElement | null — no sabe qué elemento es
const canvas = document.getElementById('canvas') as HTMLCanvasElement

// TS permite la assertion porque HTMLCanvasElement es más específico que HTMLElement.
// Si el elemento no existe o no es un canvas → error en RUNTIME, no en compile time.

// Assertions inválidas: TS rechaza tipos sin superposición posible
// const num = 'hello' as number  ❌ Conversion may be a mistake

// Para forzarlo igual (caso extremo, señal de algo mal):
// const forced = 'hello' as unknown as number  — pasa por unknown para saltar el check


// --- Cuándo es correcto usar as ---

// 1. DOM: TS no puede saber el tipo exacto del elemento en compile time
const form  = document.querySelector('#login-form') as HTMLFormElement
const input = document.querySelector('input[name="email"]') as HTMLInputElement

// 2. Mejor que as: narrowear con instanceof — es seguro en runtime también
const element = document.getElementById('canvas')
if (element instanceof HTMLCanvasElement) {
    const ctx = element.getContext('2d')  // TS sabe que es HTMLCanvasElement ✓
}

// 3. JSON.parse devuelve any — as le da forma al resultado
type ServerConfig = { host: string; port: number; debug: boolean }
const config = JSON.parse('{"host":"localhost","port":3000,"debug":true}') as ServerConfig
// Cuidado: si el JSON no coincide con ServerConfig, el error es silencioso en runtime


// --- as const ---
// Convierte el valor en un tipo literal readonly.
// No cambia CUÁL es el tipo — cambia qué TAN específico es.

// Sin as const: method es inferido como string (demasiado amplio)
// Con as const: method es inferido como el literal 'GET'
const method = 'GET' as const
// tipo: 'GET'   (no string)

// En objetos: cada propiedad se vuelve literal y readonly
const request = {
    url: 'https://api.github.com',
    method: 'GET',
    version: 2
} as const
// request.method es 'GET', no string
// request.version es 2, no number
// Ninguna propiedad se puede reasignar


// --- satisfies ---
// Operador moderno (TS 4.9+).
// Verifica que el valor cumpla el tipo SIN cambiar el tipo inferido.
//
// El problema que resuelve:
// - Con `:` el tipo anotado reemplaza al inferido → podés perder info
// - Con `as` no se valida → podés olvidar propiedades requeridas
// - Con `satisfies` validás Y conservás el tipo exacto

type Palette = {
    red:   string | [number, number, number]
    green: string | [number, number, number]
    blue:  string | [number, number, number]
}

// Con anotación `:` → el tipo de cada propiedad es string | [number, number, number]
// No podés llamar .toUpperCase() en green sin narrowear, aunque claramente es string.

// Con satisfies → TS valida contra Palette pero preserva el tipo real de cada valor:
const palette = {
    red:   [255, 0, 0],
    green: '#00ff00',
    blue:  [0, 0, 255]
} satisfies Palette

palette.red[0]            // ✓ TS sabe que red es [number, number, number]
palette.green.toUpperCase() // ✓ TS sabe que green es string
// Si olvidás 'blue' → error de validación ✓


// --- Fetch tipado (caso real) ---
// Este es el patrón que usás en toda app que consume APIs.
// Nota: el archivo es .mts para habilitar top-level await (ESModule).

export type GithubRepo = {
    id: number
    name: string
    full_name: string
    stargazers_count: number
    language: string | null
}

export type GithubSearchResponse = {
    total_count: number
    incomplete_results: boolean
    items: GithubRepo[]
}

const API_URL = 'https://api.github.com/search/repositories?q=typescript&sort=stars'

const res = await fetch(API_URL)

if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
}

// res.json() devuelve Promise<any> — as le da forma conocida
const data = await res.json() as GithubSearchResponse

const topRepos = data.items
    .slice(0, 3)
    .map(repo => ({
        name: repo.full_name,
        stars: repo.stargazers_count,
        language: repo.language ?? 'Unknown'
    }))

console.log(topRepos)

// Próximo paso: usá Zod para VALIDAR el tipo en runtime, no solo asumirlo.
// as le dice a TS qué esperar — no verifica que el valor realmente coincida.


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

type Modal = {
    title: string
    open: boolean
}

// C1. as simple. Escribí "getModalElement(): HTMLDivElement" que use
//     document.getElementById('modal') y haga "as HTMLDivElement"
//     sobre el resultado (asumí que siempre existe).
// Tu código acá:


// C2. instanceof vs as. Escribí "getModalTitle(): string | null" que
//     use document.querySelector('.modal-title') y, en vez de "as",
//     narrowee con "instanceof HTMLElement" antes de leer ".textContent".
// Tu código acá:


// C3. as const sobre un literal. Declará "modalSize = 'medium' as const".
//     Confirmá que el tipo inferido es el literal 'medium', no string.
//     Después declará "modalSizeWide: string = 'medium'" SIN as const
//     y notá la diferencia de tipo entre ambas.
// Tu código acá:


// C4. satisfies básico. Creá un objeto "defaultModal" con title: 'Aviso'
//     y open: false, usando "satisfies Modal". Verificá que podés
//     llamar .toUpperCase() en defaultModal.title sin narrowear.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "getInputValue(selector: string): string | null"
//    que use querySelector para obtener un input del DOM y devuelva su value.
//    Manejá: el elemento no existe, y el elemento existe pero no es un input.
//    Usá instanceof para el narrowing, no as.
// Tu código acá:


// 2. Definí un type "ThemeConfig" con: primaryColor, secondaryColor (strings),
//    borderRadius, fontSize (numbers).
//    Creá un objeto defaultTheme usando satisfies ThemeConfig.
//    Verificá que podés llamar .toUpperCase() en defaultTheme.primaryColor
//    sin narrowear (eso prueba que satisfies preservó el tipo string).
// Tu código acá:
