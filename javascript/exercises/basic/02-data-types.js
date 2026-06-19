// ============================================================
// EJERCICIOS
// ============================================================

// 1. Usá typeof para inspeccionar cada uno de los 7 tipos primitivos.
//    ¿Cuál te parece raro? Explicá por qué con un comentario.
// Tu código acá:

console.log(typeof 'string');
console.log(typeof 9);
console.log(typeof true);
console.log(typeof null); // es un objeto
console.log(typeof undefined);
let mySymbol = Symbol('id')
console.log(typeof mySymbol);
console.log(typeof 234234234n);



// 2. Diferencia entre null y undefined en código real:
//    a) Declará "let a" sin asignarle valor y mostrá typeof a.
//    b) Declará "let b = null" y mostrá typeof b.
//       ¿Cuál de los dos resultados te sorprende? Explicalo en un comentario.
//    c) En un comentario, resumí cuándo usás null (una ausencia que ponés
//       vos a propósito) vs cuándo aparece undefined (la que deja JS).
// Tu código acá:

let a
console.log(typeof a);
let b = null
console.log(typeof b);// nuevamente null es un objeto



