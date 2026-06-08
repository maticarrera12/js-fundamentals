// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función genérica "safeExecute<T>" que reciba () => T,
//    la ejecute en un try/catch, y devuelva:
//    { ok: true; value: T } si funciona
//    { ok: false; error: string } si lanza
//    Usá unknown en el catch para tipar el error de forma segura.
// Tu código acá:


// 2. Tenés este objeto:
//    const theme = { primary: '#007bff', secondary: '#6c757d', fontSize: 16 }
//    Sin crear un type manualmente, usá typeof para tipar una función
//    "applyTheme(theme: ???)". Luego usá ReturnType para tipar su resultado.
// Tu código acá:


// 3. Definí AppEvent como union de:
//    - { type: 'login';  userId: number }
//    - { type: 'logout'; userId: number }
//    - { type: 'error';  message: string }
//    Escribí "processEvent(event: AppEvent): string" con exhaustiveness checking.
//    Verificá que si agregás un nuevo evento sin manejar el case, TS da error.
// Tu código acá:

export {}
