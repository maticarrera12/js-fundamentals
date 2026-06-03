/*
 * EJERCICIO:
 * Muestra ejemplos de todas las operaciones que puedes realizar con cadenas de caracteres
 * en tu lenguaje. Algunas de esas operaciones podrían ser (busca todas las que puedas):
 * - Acceso a caracteres específicos, subcadenas, longitud, concatenación, repetición,
 *   recorrido, conversión a mayúsculas y minúsculas, reemplazo, división, unión,
 *   interpolación, verificación...
 *
*/

let str1 = "Hello, World!";

// Acceso a caracteres específicos
console.log(str1[0]); // H
console.log(str1.charAt(7)); // W
// Subcadenas
console.log(str1.substring(0, 5));
// Longitud
console.log(str1.length);
// Concatenación
let str2 = " How are you?";
console.log(str1 + str2);
// Repetición
console.log(str1.repeat(2));
// Conversión a mayúsculas y minúsculas
console.log(str1.toUpperCase());
console.log(str1.toLowerCase());
// Reemplazo
console.log(str1.replace("World", "Everyone"));
// División
console.log(str1.split(","));
// Unión
let arr = ["Hello", "World"];
console.log(arr.join(", "));
// Interpolación
let name = "Alice";
console.log(`Hello, ${name}!`);
// Verificación
console.log(str1.includes("World"));

