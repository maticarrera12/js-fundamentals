// las funciones son bloques de código reutilizables que realizan una tarea específica, se pueden definir con la palabra clave function seguida del nombre de la función, los parámetros entre paréntesis y el bloque de código entre llaves.

// Declaración de una función

function greet(name) {
  console.log(`Hola, ${name}!`);
}

// Llamada a la función

greet("Matias"); // imprime "Hola, Matias!"

// pueden no tener parametros, en ese caso se llaman funciones sin parámetros o funciones anónimas, y se pueden asignar a variables o pasar como argumentos a otras funciones.

// Función sin parámetros

function sayHello() {
  console.log("Hello!");
}   

sayHello();

// Función anónima asignada a una variable

const sayHi = function() {
  console.log("Hi!");
}

sayHi();

// funcion anonima pasada como argumento a otra función

function executeFunction(func) {
  func();
}
executeFunction(function() {
  console.log("Function executed!");
});

// Las funciones también pueden devolver valores utilizando la palabra clave return, lo que permite que el resultado de la función sea utilizado en otras partes del código.
function add(a, b) {
  return a + b;
}

const sum = add(5, 3); // sum tendrá el valor de 8
console.log(sum); // imprime 8

// arrow functions o funciones flecha son una forma más concisa de escribir funciones en JavaScript, utilizando la sintaxis de flecha (=>) para definir la función.

const multiply = (a, b) => {
  return a * b;
}
const product = multiply(4, 6); // product tendrá el valor de 24
console.log(product); // imprime 24

// si la función tiene una sola expresión, se puede omitir el bloque de código y la palabra clave return, lo que hace que la función sea aún más concisa.

const divide = (a, b) => a / b;
const quotient = divide(10, 2); // quotient tendrá el valor de 5
console.log(quotient); // imprime 5

// valores por defecto en funciones, se pueden asignar valores por defecto a los parámetros de una función, lo que permite que la función se ejecute incluso si no se proporcionan argumentos para esos parámetros.

function greetWithDefault(name = "Guest") {
  console.log(`Hello, ${name}!`);
}
greetWithDefault(); // imprime "Hello, Guest!"
greetWithDefault("Maria"); // imprime "Hello, Maria!"

// funcion anidada es una función definida dentro de otra función, lo que permite organizar el código y crear funciones auxiliares que solo son accesibles dentro de la función principal.

function outerFunction() {
  console.log("This is the outer function.");
  function innerFunction() {
    console.log("This is the inner function.");
  }
  innerFunction(); // Llamada a la función anidada
}
outerFunction();
// imprime "This is the outer function." seguido de "This is the inner function."

// Lo que se encuentra dentro de la función innerFunction solo es accesible desde la función outerFunction, lo que ayuda a mantener el código organizado y evita conflictos de nombres con otras funciones en el ámbito global. Se les podria pasar parametros a las funciones anidadas, y estas pueden acceder a las variables de la función principal, lo que se conoce como cierre o closure.

// funcion de orden superior es una función que puede tomar otra función como argumento o devolver una función como resultado, lo que permite crear funciones más flexibles y reutilizables.

function higherOrderFunction(func, param) {
  func(param); // Llamada a la función pasada como argumento
}
higherOrderFunction((message) => console.log(message), "some parameter");


// forEach es un método de los arrays que permite ejecutar una función para cada elemento del array, lo que facilita la iteración sobre los elementos sin necesidad de usar un bucle tradicional.

const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number) => {
  console.log(number + 1); // Imprime cada número del array incrementado en 1
});

// se aplica tambien para sets y maps, aunque con una sintaxis ligeramente diferente.

const mySet = new Set([1, 2, 3]);
mySet.forEach((value) => {
  console.log(value); // Imprime cada valor del set
});

const myMap = new Map([["key1", "value1"], ["key2", "value2"]]);
myMap.forEach((value, key) => {
  console.log(`${key}: ${value}`); // Imprime cada clave y valor del map
});