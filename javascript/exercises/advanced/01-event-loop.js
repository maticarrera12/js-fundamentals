// ============================================================
// DESAFÍOS
// ============================================================

// 1. Predecí el orden EXACTO de los logs sin ejecutar. Después verificá:
//    setTimeout(() => console.log('a'))
//    Promise.resolve().then(() => {
//        console.log('b')
//        setTimeout(() => console.log('c'))
//        return Promise.resolve()
//    }).then(() => console.log('d'))
//    console.log('e')
// Tu predicción acá, y luego la verificación:


// 2. Escribí una función "yieldToBrowser()" que devuelva una Promise
//    que se resuelve en la PRÓXIMA macrotask, y usala para partir
//    un loop que sume los primeros 10 millones de números en chunks.
// Tu código acá:


// 3. Explicá con tus palabras (en un comentario) por qué esto
//    congela la página pero la versión con setTimeout no:
//    function bad() { queueMicrotask(bad) }
//    function ok()  { setTimeout(ok, 0) }
// Tu explicación acá:
