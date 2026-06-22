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

function getInputValue(selector: string): string | null {
    const selected = document.querySelector(selector)
    if (selected === null) return null
    if (!(selected instanceof HTMLInputElement)) return null
    return selected.value
}

// 2. Definí un type "ThemeConfig" con: primaryColor, secondaryColor (strings),
//    borderRadius, fontSize (numbers).
//    Creá un objeto defaultTheme usando satisfies ThemeConfig.
//    Verificá que podés llamar .toUpperCase() en defaultTheme.primaryColor
//    sin narrowear (eso prueba que satisfies preservó el tipo string).
// Tu código acá:

type ThemeConfig = {
    primaryColor: string
    secondaryColor: string
    borderRadius: number
    fontSize: number
}

const defaultTheme = {
    primaryColor: '#00ff33',
    secondaryColor: '#ff3300',
    borderRadius: 24,
    fontSize: 14
} satisfies ThemeConfig

defaultTheme.primaryColor.toUpperCase()