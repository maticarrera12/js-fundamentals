let mySet = new Set();

mySet = new Set(["Matias", "Carrera", "Matias", "https://mcarreradev.com"]); // un Set es una colección de valores únicos, no permite valores duplicados, exactamente iguales, por lo que el segundo "Matias" no se agrega al Set. no esta ordenado, no se puede acceder a los elementos por su índice, se puede iterar sobre los elementos del Set utilizando un bucle for...of o el método forEach() del Set. se recomienda su uso para almacenar valores únicos y realizar operaciones de conjunto como la unión, intersección, diferencia, etc.

console.log(mySet);

//metodos comunes 
console.log(mySet.size); // devuelve el número de elementos en el Set
console.log(mySet.has("Matias")); // devuelve true si el Set contiene el elemento "Matias", de lo contrario devuelve false
console.log(mySet.add("new element")); // agrega un nuevo elemento al Set, devuelve el Set actualizado
console.log(mySet.delete("Carrera")); // elimina el elemento "Carrera" del Set, devuelve true si el elemento fue eliminado, de lo contrario devuelve false
console.log(mySet.clear()); // elimina todos los elementos del Set, devuelve undefined
mySet = new Set(["Matias", "Carrera", "Matias", "https://mcarreradev.com"]);

// convertitr un Set a un Array
let myArray = Array.from(mySet); // convierte el Set a un Array, devuelve un nuevo Array con los elementos del Set
console.log(myArray);

// convertitr un Array a un Set
mySet = new Set(myArray);   
console.log(mySet);