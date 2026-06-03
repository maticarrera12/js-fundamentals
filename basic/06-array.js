let myArray = []
let myArray2 = new Array()

console.log(myArray);
console.log(myArray2);


myArray = [1]
myArray2 = new Array(1) // reserva espacio para 1 elemento, pero no lo asigna, por lo que el array queda con un elemento vacío, no se recomienda su uso

console.log(myArray);
console.log(myArray2);

myArray = [1, 2, 3]
myArray2 = new Array(1,2,3,4) // crea un array con los elementos especificados, se recomienda su uso

console.log(myArray);
console.log(myArray2);

myArray = ["Matias", "Carrera", "mcarreradev"]
myArray2 = new Array("Matias", "Carrera", "mcarreradev")

console.log(myArray);
console.log(myArray2);

// metodos comunes
console.log(myArray.length); // devuelve la longitud del array
console.log(myArray[0]); // devuelve el primer elemento del arrayy
console.log(myArray[3]); // devuelve undefined, ya que no existe un cuarto elemento en el array
console.log(myArray.push("new element")); // agrega un nuevo elemento al final del array
console.log(myArray.pop()); // elimina el último elemento del array y lo devuelve, en este caso devuelve "new element"
console.log(myArray.unshift("first element")); // agrega un nuevo elemento al principio del array
console.log(myArray.shift()); // elimina el primer elemento del array y lo devuelve, en este caso devuelve "first element"
console.log(myArray.splice(1, 0, "new element")); // agrega un nuevo elemento en la posición 1 del array, sin eliminar ningún elemento
console.log(myArray.splice(1, 1)); // elimina el elemento en la posición 1 del array, sin agregar ningún elemento
console.log(myArray.slice(1, 3)); // devuelve un nuevo array con los elementos desde la posición 1 hasta la posición 3 (sin incluir la posición 3)
console.log(myArray.slice(1,2, "nueva entrada")); // devuelve un nuevo array con los elementos desde la posición 1 hasta la posición 2 (sin incluir la posición 2), el tercer argumento no es válido para el método slice, se ignora
console.log(myArray.indexOf("Carrera")); // devuelve el índice del primer elemento que coincide con "Carrera", de lo contrario devuelve -1
console.log(myArray.includes("Matias")); // devuelve true si el array contiene el elemento "Matias", de lo contrario devuelve false
console.log(myArray.join(", ")); // devuelve una cadena de texto con los elementos del array separados por ", "
console.log(myArray.reverse()); // invierte el orden de los elementos del array
console.log(myArray.concat(myArray2)); // une dos arrays y devuelve un nuevo array con los elementos de ambos
console.log(myArray.indexOf("Carrera")); // devuelve el índice del primer elemento que coincide con "Carrera", de lo contrario devuelve -1
console.log(myArray.find((element) => element === "Carrera")); // devuelve el primer elemento que cumple con la condición, de lo contrario devuelve undefined
console.log(myArray.filter((element) => element === "Carrera")); // devuelve un nuevo array con los elementos que cumplen con la condición, de lo contrario devuelve un array vacío
console.log(myArray.map((element) => element.toUpperCase())); // devuelve un nuevo array con los resultados de la función de callback aplicada a cada elemento del array
console.log(myArray.reduce((accumulator, element) => accumulator + element, 0)); // el método reduce() se utiliza para aplicar una función de callback a un acumulador y a cada elemento del array (de izquierda a derecha) para reducirlo a un único valor, devuelve el valor resultante de la reducción del array
console.log(myArray.sort()); // el método sort() se utiliza para ordenar los elementos de un array, devuelve el array ordenado, por defecto ordena los elementos como cadenas de texto, pero se puede especificar una función de comparación para ordenar los elementos de otra manera  
