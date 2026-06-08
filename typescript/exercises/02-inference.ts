// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función genérica "safeExecute<T>" que reciba () => T,
//    la ejecute en un try/catch, y devuelva:
//    { ok: true; value: T } si funciona
//    { ok: false; error: string } si lanza
//    Usá unknown en el catch para tipar el error de forma segura.
// Tu código acá:


type Result<T> = { ok: true; value: T } | { ok: false; error: string }

function safeExecute<T>(fn: () => T): Result<T> {
    try {
        const result = fn()
        return {
            ok: true,
            value: result
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                ok: false,
                error: err.message
            }
        }

        return {
            ok: false,
            error: "Unknown error"
        }
    }
}

safeExecute(() => 42)


// 2. Tenés este objeto:
//    const theme = { primary: '#007bff', secondary: '#6c757d', fontSize: 16 }
//    Sin crear un type manualmente, usá typeof para tipar una función
//    "applyTheme(theme: ???)". Luego usá ReturnType para tipar su resultado.
// Tu código acá:

const theme = {
    primary: '#007bff',
    secondary: '#6c757d',
    fontSize: 16
}

function applyTheme(themeValue: typeof theme): string {
    return `Aplicando theme`
}

type ThemeResult = ReturnType<typeof applyTheme>




// 3. Definí AppEvent como union de:
//    - { type: 'login';  userId: number }
//    - { type: 'logout'; userId: number }
//    - { type: 'error';  message: string }
//    Escribí "processEvent(event: AppEvent): string" con exhaustiveness checking.
//    Verificá que si agregás un nuevo evento sin manejar el case, TS da error.
// Tu código acá:

type Login = { type: 'login'; userId: number }
type Logout = { type: 'logout'; userId: number }
type ErrorCase = { type: 'error'; message: string }
type AppEvent = Login | Logout | ErrorCase 
// | { type: "register"; userId: number }

function processEvent(event: AppEvent): string {
    switch (event.type) {
        case "login":
            return event.userId.toString()
            break
        case "logout":
            return event.userId.toString()
            break
        case "error":
            return event.message
            break
        default: {
            // const _exhaustive: never = event
            // return _exhaustive
            return "Error"
        }
    }
}

export { }
