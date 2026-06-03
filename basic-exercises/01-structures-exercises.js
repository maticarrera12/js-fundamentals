// Crea un array con los nombres de cinco animales y muéstralo por consola.
let myArray = ["Vaca", "Perro", "Gato", "Caballo", "Cebra"]
console.log(myArray);

// Agrega un nuevo animal al principio del array y otro al final, luego muéstralo por consola.

myArray.unshift("Jirafa")
myArray.push("Conejo")
console.log(myArray)

// Elimina el tercer animal del array y muéstralo por consola.

myArray.splice(2, 1)
console.log(myArray)

// Crea un Set con los nombres de cinco libros y muéstralo por consola.

let mySet = new Set(["Los arboles mueren de pie", "Casa tomada", "El amor en los tiempos del cólera", "Cien años de soledad", "El túnel"])
console.log(mySet)

// Agrega dos nuevos libros al Set y muéstralo por consola.

mySet.add("La casa de los espíritus")
mySet.add("El amor en los tiempos del cólera") 
console.log(mySet)

// Elimina un libro del Set y muéstralo por consola.

mySet.delete("Casa tomada")
console.log(mySet)

// Crea un Map que asocie el numero de mes a su nombre.

let myMap = new Map();
myMap = new Map([[0, "Enero"], [1, "Febrero"], [2, "Marzo"], [3, "Abril"], [4, "Mayo"], [5, "Junio"], [6, "Julio"], [7, "Agosto"], [8, "Septiembre"], [9, "Octubre"], [10, "Noviembre"], [11, "Diciembre"]]);
console.log(myMap)

// Comprueba si el mes 5 está en el Map y muéstralo por consola.

console.log(myMap.get(5));

// Agrega una nueva entrada al Map que asocie el nombre de una estación del año a los meses que la componen, luego muéstralo por consola.

myMap.set("verano", ["Diciembre", "Enero", "Febrero"])
console.log(myMap) 

// Crea un array, transforma el array en un Set y luego en un Map, mostrando el resultado por consola en cada paso.

let myArray2 = ["Matias", "Carrera", "mcarreradev"]
let mySet2 = new Set(myArray2) 
let myMap2 = new Map(mySet2.entries())
console.log(myMap2)


