// ============================================================
// EJERCICIOS
// ============================================================

// 1. Convertí el "callback hell" de los tres pasos de arriba
//    en una cadena de promesas. Luego, reescribilo una vez más
//    usando async/await. Comparalos — ¿cuál es más legible?
// Tu código acá:


// 2. Escribí una función "withTimeout(promise, ms)" que devuelva
//    una promesa que rechace con 'Timeout' si la promesa original
//    no se resuelve en ms milisegundos.
//    Pista: usá Promise.race.
// Tu código acá:


// 3. Dado un array de IDs de usuarios [1, 2, 3, 4, 5],
//    cargalos en PARALELO usando Promise.all + fetch a jsonplaceholder.
//    Luego cargalos en SECUENCIA (uno por uno) usando un bucle con await.
//    Medí el tiempo de cada enfoque con console.time / console.timeEnd.
// Tu código acá:
