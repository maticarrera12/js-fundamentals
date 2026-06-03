/*
 * EJERCICIO:
 * - Muestra ejemplos de creación de todas las estructuras soportadas por defecto
 *   en tu lenguaje.
 * - Utiliza operaciones de inserción, borrado, actualización y ordenación.
 */



// En JavaScript, las estructuras de datos más comunes son los arrays y los objetos.

// Array

let myArray = [1, 2, 3, 4, 5];

// Inserción

myArray.push(6);

// Borrado

myArray.splice(2, 1);

// Actualización

myArray[0] = 0;

// Ordenación

myArray.sort((a, b) => a - b);
console.log(myArray);

// Objeto

let myObject = {
  name: "John",
  phone: "1234567890",
};

// Inserción

myObject.email = "john@gmail.com";

// Borrado

delete myObject.phone;

// Actualización

myObject.name = "Peter";
console.log(myObject);

// sets

let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);
console.log(mySet);
mySet.delete(2);
console.log(mySet);
mySet.has(1);
// mySet.clear();
console.log(mySet);

// delete mySet; // Elimina el set completo

// maps

let myMap = new Map();
myMap.set("name", "John");
myMap.set("phone", "1234567890");
console.log(myMap);
myMap.delete("phone");
console.log(myMap);
myMap.has("name");
// myMap.clear();
console.log(myMap);

// delete myMap; // Elimina el mapa completo

