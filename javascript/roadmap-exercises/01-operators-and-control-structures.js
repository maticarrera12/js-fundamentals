/*
 * EJERCICIO:
 * - Crea ejemplos utilizando todos los tipos de operadores de tu lenguaje:
 *   Aritméticos, lógicos, de comparación, asignación, identidad, pertenencia, bits...
 *   (Ten en cuenta que cada lenguaje puede poseer unos diferentes)
 * - Utilizando las operaciones con operadores que tú quieras, crea ejemplos
 *   que representen todos los tipos de estructuras de control que existan
 *   en tu lenguaje:
 *   Condicionales, iterativas, excepciones...
 * - Debes hacer print por consola del resultado de todos los ejemplos.
 *
 * DIFICULTAD EXTRA (opcional):
 * Crea un programa que imprima por consola todos los números comprendidos
 * entre 10 y 55 (incluidos), pares, y que no son ni el 16 ni múltiplos de 3.
 *
 * Seguro que al revisar detenidamente las posibilidades has descubierto algo nuevo.
 */

// Operadores aritméticos
let a = 10;
let b = 5;
console.log(a + b); // Suma
console.log(a - b); // Resta
console.log(a * b); // Multiplicación
console.log(a / b); // División
console.log(a % b); // Módulo
console.log(a ** b); // Exponenciación

// Operadores de comparación

console.log(a > b); // Mayor que
console.log(a < b); // Menor que
console.log(a >= b); // Mayor o igual que
console.log(a <= b); // Menor o igual que
console.log(a == b); // Igualdad
console.log(a === b); // Igualdad estricta
console.log(a != b); // Desigualdad
console.log(a !== b); // Desigualdad estricta

// Operadores lógicos
console.log(a > 5 && b < 10); // AND lógico
console.log(a > 5 || b < 3); // OR lógico
console.log(!(a > 5)); // NOT lógico

// Estructuras de control

//if-else
if (a > b) {
  console.log("a es mayor que b");
} else if (a < b) {
  console.log("a es menor que b");
}
else {
  console.log("a es igual a b");
}

// for
for (let i = 0; i < 5; i++) {
  console.log(i);
}

//while
let j = 0;
while (j < 5) {
  console.log(j);
  j++;
}

// do-while
let k = 0;  
do {
  console.log(k);
  k++;
} while (k < 5);

// Excepciones
try {
  let result = a / 0; // Esto no lanzará una excepción en JavaScript, pero en otros lenguajes sí podría hacerlo.
  console.log(result);
} catch (error) {
  console.error("Error: " + error.message);
}

// DIFICULTAD EXTRA
for (let num = 10; num <= 55; num++) {
  if (num % 2 === 0 && num !== 16 && num % 3 !== 0) {
    console.log(num);
    }
}


