

// ============================================================
// EJERCICIOS
// ============================================================

// 1. Declará tres variables usando const, let y var. Intentá reasignarlas.
//    ¿Cuál da error? ¿Cuál no? Explicá por qué con un comentario.
// Tu código acá:
const constante = [1,2,3]
let myVariable = [4,5,6]
var oldVar = [7,8,9]

//constante = [4,5,6] // no se puede
myVariable = [7,8,9]
oldVar = [10,11,12]

console.log(myVariable);
console.log(oldVar);

// 2. La const NO congela el objeto, solo bloquea la REFERENCIA (lo viste arriba).
//    Partí de esta línea ya escrita:
const config = { host: 'localhost', port: 3000, debug: true }
//    a) Cambiá config.debug a false. ¿Funciona? ¿Por qué?
//    b) Intentá reasignar config = {}. ¿Qué pasa? ¿Por qué?
//    (La sintaxis de objetos la vemos en detalle en 07-objects. Acá solo
//     te interesa el comportamiento de const, no dominar objetos todavía.)
// Tu código acá:

config.debug = false
console.log(config.debug); // se puede reasignar el value de una key
config = {} // no se puede reasignar las keys
console.log(config);


