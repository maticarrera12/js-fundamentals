//nombres de variables con lowercamelcase, 
// var --> forma original de declarar variables, se le puede cambiar el valor y el tipo de dato, se puede redeclarar la variable, tiene un scope global o de función, no se recomienda su uso
var helloWorld = "Hello World";
console.log(helloWorld);
// hoisting: las variables declaradas con var se elevan al inicio del scope, pero su valor no se asigna hasta la línea donde se declara, lo que puede causar errores si se intenta acceder a la variable antes de su declaración
// el hoisting es un comportamiento de JavaScript donde las declaraciones de variables y funciones se mueven al inicio de su scope antes de que se ejecute el código, lo que puede causar confusión si no se entiende cómo funciona


//let --> forma moderna de declarar variables, se le puede cambiar el valor pero no el tipo de dato, no se puede redeclarar la variable, tiene un scope de bloque, se recomienda su uso
let myName = "John";
console.log(myName);
// el scope de bloque significa que la variable solo existe dentro del bloque de código donde se declara, como un if, for, while, etc.


// const --> no se le puede cambiar el valor ni el tipo de dato, no se puede redeclarar la variable, tiene un scope de bloque, se recomienda su uso para valores constantes, puede cambiar si son referencias a objetos o arrays, pero no se puede reasignar la variable a otro valor
const MY_AGE = 30;
console.log(MY_AGE);
// el scope de bloque significa que la variable solo existe dentro del bloque de código donde se declara, como un if, for, while, etc.