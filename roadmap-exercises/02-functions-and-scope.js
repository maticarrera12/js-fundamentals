/*
 * EJERCICIO:
 * - Crea ejemplos de funciones básicas que representen las diferentes
 *   posibilidades del lenguaje:
 *   Sin parámetros ni retorno, con uno o varios parámetros, con retorno...
 * - Comprueba si puedes crear funciones dentro de funciones.
 * - Utiliza algún ejemplo de funciones ya creadas en el lenguaje.
 * - Pon a prueba el concepto de variable LOCAL y GLOBAL.
 * - Debes hacer print por consola del resultado de todos los ejemplos.
 *   (y tener en cuenta que cada lenguaje puede poseer más o menos posibilidades)
 *
 * DIFICULTAD EXTRA (opcional):
 * Crea una función que reciba dos parámetros de tipo cadena de texto y retorne un número.
 * - La función imprime todos los números del 1 al 100. Teniendo en cuenta que:
 *   - Si el número es múltiplo de 3, muestra la cadena de texto del primer parámetro.
 *   - Si el número es múltiplo de 5, muestra la cadena de texto del segundo parámetro.
 *   - Si el número es múltiplo de 3 y de 5, muestra las dos cadenas de texto concatenadas.
 *   - La función retorna el número de veces que se ha impreso el número en lugar de los textos.
 *
 * Presta especial atención a la sintaxis que debes utilizar en cada uno de los casos.
 * Cada lenguaje sigue una convenciones que debes de respetar para que el código se entienda.
 */

// Función sin parámetros ni retorno
function greet() {
  console.log("Hello, World!");
}
greet();

// Función con parámetros y sin retorno
function greetPerson(name) {
  console.log(`Hello, ${name}!`);
}
greetPerson("Alice");

// Función con parámetros y con retorno
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));

// Función dentro de función
function outerFunction() {
  console.log("This is the outer function.");
  function innerFunction() {
    console.log("This is the inner function.");
  }
  innerFunction();
}
outerFunction();


// arrow function
const arrowFunction = (x, y) => x * y;
console.log(arrowFunction(4, 5));


// variable global
let globalVar = "I am a global variable";
function testScope() {
  // variable local
  let localVar = "I am a local variable";
  console.log(globalVar); // Accede a la variable global
  console.log(localVar); // Accede a la variable local
}
testScope();
console.log(globalVar); // Accede a la variable global
try{
    console.log(localVar); // Error: localVar is not defined, no se puede acceder a la variable local fuera de su función.
} catch (error) {
    console.error(error.message);
}

// función ya creada en el lenguaje
console.log(Math.sqrt(16)); // Función matemática para calcular la raíz cuadrada
console.log(Math.max(5, 10, 3)); // Función matemática para encontrar el valor máximo

// función para el ejercicio de dificultad extra
function fizzBuzz(text1, text2) {
  let count = 0;
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log(text1 + text2);
    } else if (i % 3 === 0) {
      console.log(text1);
    } else if (i % 5 === 0) {
      console.log(text2);
    } else {
      console.log(i);
      count++;
    }
  }
  return count;
}
console.log(fizzBuzz("Fizz", "Buzz"));
