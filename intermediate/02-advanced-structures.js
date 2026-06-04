// Estructuras avanzadas de datos

// Arrays avanzados

// Metodos funcionales de arrays

// forEach --> itera sobre cada elemento del array y ejecuta una funcion para cada elemento.

const numbers = [1, 2, 3, 4, 5];
numbers.forEach(number => {
    console.log(number);
});


// Map --> crea un nuevo array con el resultado de la funcion aplicada a cada elemento.

const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers);

// Filter --> crea un nuevo array con los elementos que pasan la condicion de la funcion.

const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers);

// Reduce --> reduce el array a un solo valor, aplicando una funcion a cada elemento y acumulando el resultado.

const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

// Manipulacion de arrays

// flat --> crea un nuevo array con los elementos de los subarrays concatenados.

const nestedArray = [1, [2, 3], [4, 5]];
const flatArray = nestedArray.flat();
console.log(flatArray);

// flatMap --> crea un nuevo array con el resultado de la funcion aplicada a cada elemento y luego aplana el resultado.

let phrases = ["Hello", "World", "JavaScript", "is", "fun"];
let flatPhrases = phrases.flatMap(phrase => phrase.split(" "));
console.log(flatPhrases);

// Ordenacion de arrays

let unsorted = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

// sort --> ordena los elementos del array segun la funcion comparadora.
let sorted = unsorted.sort((a, b) => a - b);
console.log(sorted);


// reverse --> invierte el orden de los elementos del array.

const reversedNumbers = numbers.reverse();
console.log(reversedNumbers);

// slice --> crea un nuevo array con los elementos desde el indice inicio hasta el indice fin.

const slicedNumbers = numbers.slice(0, 3);
console.log(slicedNumbers);

// Busqueda de elementos

// includes --> devuelve true si el array contiene el elemento, false en caso contrario.

const includesNumber = numbers.includes(3);
console.log(includesNumber);

// find --> devuelve el primer elemento que cumple la condicion de la funcion.

const foundNumber = numbers.find(number => number > 3);
console.log(foundNumber);

// findIndex --> devuelve el indice del primer elemento que cumple la condicion de la funcion.

const foundIndex = numbers.findIndex(number => number > 3);
console.log(foundIndex);

// lastIndexOf --> devuelve el indice del ultimo elemento que cumple la condicion de la funcion.

const lastFoundIndex = numbers.lastIndexOf(3);
console.log(lastFoundIndex);


// Sets --> son colecciones de valores unicos y no ordenados.

const numberSet = new Set([1, 2, 3, 4, 5]);
console.log(numberSet);

// Sets avanzados

// add --> agrega un elemento al set.

numberSet.add(6);
console.log(numberSet);

// delete --> elimina un elemento del set.

numberSet.delete(6);
console.log(numberSet);

// has --> devuelve true si el set contiene el elemento, false en caso contrario.

const hasNumber = numberSet.has(3);
console.log(hasNumber);

// size --> devuelve el numero de elementos del set.

const size = numberSet.size;
console.log(size);

// union --> devuelve un nuevo set con los elementos de los dos sets.

const numberSet2 = new Set([6, 7, 8, 9, 10]);

const unionSet = numberSet.union(numberSet2);
console.log(unionSet);

// intersection --> devuelve un nuevo set con los elementos comunes a los dos sets.

const intersectionSet = numberSet.intersection(numberSet2);
console.log(intersectionSet);

// difference --> devuelve un nuevo set con los elementos que no son comunes a los dos sets.

const differenceSet = numberSet.difference(numberSet2);
console.log(differenceSet);

// subsets --> devuelve true si el set es subconjunto de otro set, false en caso contrario.

const isSubset = numberSet.isSubset(numberSet2);
console.log(isSubset);

// supersets --> devuelve true si el set es superconjunto de otro set, false en caso contrario.

const isSuperset = numberSet.isSuperset(numberSet2);
console.log(isSuperset);

// conversion a array --> devuelve un nuevo array con los elementos del set.

const arrayFromSet = Array.from(numberSet);
console.log(arrayFromSet);

// o

console.log([...numberSet]);

// conversion a string --> devuelve una cadena de texto con los elementos del set.

const stringFromSet = numberSet.toString();
console.log(stringFromSet);

// conversion a json --> devuelve una cadena de texto con los elementos del set.

const jsonFromSet = numberSet.toJSON();
console.log(jsonFromSet);

// iteracion sobre sets

numberSet.forEach(number => {
    console.log(number);
});


// Maps avanzados

let myMap = new Map()[
    ["name  ", "Matias"],
    ["age", 20],
    ["city", "Buenos Aires"]
];

console.log(myMap);

// forEach --> itera sobre cada elemento del map y ejecuta una funcion para cada elemento.

myMap.forEach((value, key) => {
    console.log(key, value);
});


// conversion a array --> devuelve un nuevo array con las claves y valores del map.

const arrayFromMap = Array.from(myMap);
console.log(arrayFromMap);


// Map a Objeto 

const myObject = Object.fromEntries(myMap);
console.log(myObject);

// objeto a map --> devuelve un nuevo map con las claves y valores del objeto.

const myMapFromObject = new Map(Object.entries(myObject));
console.log(myMapFromObject);