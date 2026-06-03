// loops

// los loops son estructuras de control que permiten repetir un bloque de código mientras se cumpla una condición, o un número determinado de veces, o para iterar sobre los elementos de una estructura de datos. En JavaScript, existen varios tipos de loops, como for, while, do...while, for...of, etc.


// for loop --> se utiliza para repetir un bloque de código un número determinado de veces, se compone de tres partes: la inicialización, la condición y la actualización.

for (let i = 0; i <= 5; i++) {
    console.log(`Soy el numero ${i}`); // imprime los números del 1 al 5
}

const numbers = [1, 2, 3, 4, 5]

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]); // imprime los elementos del array numbers
}

// while loop --> se utiliza para repetir un bloque de código mientras se cumpla una condición, se compone de dos partes: la condición y el bloque de código a ejecutar, se evalua antes de cada iteracion.

let i = 0

while (i <= 5) {
    console.log(`Soy el numero ${i}`); // imprime los números del 1 al 5
    i++
}

// Bucle infinto

// while (true) {
//     console.log("Esto es un bucle infinito"); // imprime esto para siempre no lo descomentes
// }

// do while loop --> se utiliza para repetir un bloque de código al menos una vez, y luego mientras se cumpla una condición, se compone de dos partes: el bloque de código a ejecutar y la condición, se evalua despues de cada iteracion.

let j = 0
do {
    console.log(`Soy el numero ${j}`); // imprime los números del 1 al 5
    j++
} while (j <= 5)

// for...of loop --> se utiliza para iterar sobre los elementos de un array o cualquier objeto iterable, se compone de dos partes: la variable que representa el elemento actual y el objeto iterable. Una estructura de datos o un tipo de dato.

const myArray = ["a", "b", "c", "d", "e"]
const myMap = new Map([["key1", "value1"], ["key2", "value2"], ["key3", "value3"]])
const mySet = new Set(["a", "b", "c", "d", "e"])

const myString = "Hello World"

for (const char of myString) {
    console.log(char); // imprime los caracteres de la cadena myString
}

for (const element of myArray) {
    console.log(element); // imprime los elementos del array myArray
}

for (const [key, value] of myMap) {
    console.log(`${key}: ${value}`); // imprime las claves y valores del mapa myMap
}

for (const element of mySet) {
    console.log(element); // imprime los elementos del conjunto mySet
}

// pueden usar let, const o var para declarar la variable que representa el elemento actual, pero se recomienda usar const para evitar errores de reasignación.


// etiquetas para break y continue --> se pueden usar para controlar el flujo de un loop, break se utiliza para salir completamente del loop, mientras que continue se utiliza para saltar a la siguiente iteración del loop. Se deben usar con precaución para evitar confusión en el código.
outerLoop: for (let i = 0; i < 3; i++) {
    innerLoop: for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outerLoop; // sale completamente del loop externo
        }
        console.log(`i: ${i}, j: ${j}`); // imprime los valores de i y j
    }
}

// buenas practicas para usar loops
// 1. Evitar bucles infinitos, asegurarse de que la condición de salida se cumpla en algún momento.
// 2. Usar el tipo de loop adecuado para cada situación, por ejemplo, usar for...of para iterar sobre arrays o objetos iterables, y usar while o do...while para repetir un bloque de código mientras se cumpla una condición.
// 3. Evitar modificar la variable de control dentro del bloque de código del loop, ya que puede causar errores difíciles de depurar.
// 4. Usar nombres de variables descriptivos para la variable de control y cualquier otra variable utilizada dentro del loop, para mejorar la legibilidad del código.
// 5. Evitar anidar demasiados loops, ya que puede hacer que el código sea difícil de entender y mantener. En su lugar, considerar dividir el código en funciones más pequeñas y reutilizables.
// 6. break y continue --> se pueden usar para controlar el flujo de un loop, break se utiliza para salir completamente del loop, mientras que continue se utiliza para saltar a la siguiente iteración del loop. Se deben usar con precaución para evitar confusión en el código.