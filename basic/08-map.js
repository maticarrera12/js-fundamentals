// es una coleccion de pares clave-valor, donde cada clave es única y se asocia a un valor, se puede usar para almacenar datos relacionados, como un objeto, pero con la ventaja de que las claves pueden ser de cualquier tipo de dato, no solo cadenas de texto, como en los objetos. se recomienda su uso para almacenar datos relacionados y realizar operaciones de búsqueda, inserción y eliminación de elementos de manera eficiente.

let myMap = new Map();
myMap = new Map([["name", "Matias"], ["age", 25], ["website", "https://mcarreradev.com"]]); // crea un Map con los pares clave-valor especificados, se recomienda su uso para almacenar datos relacionados y realizar operaciones de búsqueda, inserción y eliminación de elementos de manera eficientezxz.
console.log(myMap);
// metodos comunes
console.log(myMap.size); // devuelve el número de elementos en el Map
console.log(myMap.has("name")); // devuelve true si el Map contiene la clave "name", de lo contrario devuelve false
console.log(myMap.get("name")); // devuelve el valor asociado a la clave "name", de lo contrario devuelve undefined
console.log(myMap.set("name", "Matias Carrera")); // agrega un nuevo par clave-valor al Map, si la clave ya existe, actualiza su valor, devuelve el Map actualizado
console.log(myMap.delete("age")); // elimina el par clave-valor con la clave "age" del Map, devuelve true si el elemento fue eliminado, de lo contrario devuelve false
console.log(myMap.clear()); // elimina todos los elementos del Map, devuelve undefined
myMap = new Map([["name", "Matias"], ["age", 25], ["website", "https://mcarreradev.com"]]);
console.log(myMap.keys()); // devuelve un iterable con las claves del Map
console.log(myMap.values()); // devuelve un iterable con los valores del Map
console.log(myMap.entries()); // devuelve un iterable con los pares clave-valor del Map