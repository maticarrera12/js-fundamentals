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