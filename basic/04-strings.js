let myName = "Matias";
let greeting = "Hello, " + myName + "!";
console.log(greeting); // "Hello, Matias!"

console.log(greeting.length); // 15, devuelve la longitud de la cadena de texto
console.log(greeting.toUpperCase()); // "HELLO, MATIAS!", convierte la cadena de texto a mayúsculas
console.log(greeting.toLowerCase()); // "hello, matias!", convierte la cadena de texto a minúsculas
console.log(greeting.includes("Matias")); // true, devuelve true si la cadena de texto contiene la subcadena "Matias", de lo contrario devuelve false
console.log(greeting[0]); // "H", devuelve el primer carácter de la cadena de texto
console.log(greeting[7]); // "M", devuelve el octavo carácter de la cadena de texto
console.log(greeting.indexOf("Matias")); // 7, devuelve el índice de la primera aparición de la subcadena "Matias" en la cadena de texto, de lo contrario devuelve -1
console.log(greeting.includes("Matias")); // true, devuelve true si la cadena de texto contiene la subcadena "Matias", de lo contrario devuelve false
console.log(greeting.slice(7, 13)); // "Matias", devuelve una parte de la cadena de texto desde el índice 7 hasta el índice 13 (sin incluir el índice 13)
console.log(greeting.replace("Matias", "World")); // "Hello, World!", devuelve una nueva cadena de texto con la primera aparición de "Matias" reemplazada por "World"
console.log(greeting.split(", ")); // ["Hello", "Matias!"], devuelve un array de subcadenas de texto divididas por la cadena ", "
console.log(greeting.startsWith("Hello")); // true, devuelve true si la cadena de texto comienza con la subcadena "Hello", de lo contrario devuelve false
console.log(greeting.endsWith("!")); // true, devuelve true si la cadena de texto termina con el carácter "!", de lo contrario devuelve false
codepoints: ["H", "e", "l", "l", "o", ",", " ", "M", "a", "t", "i", "a", "s", "!"]

console.log(greeting.trim()) // "Hello, Matias!", devuelve una nueva cadena de texto con los espacios en blanco al principio y al final eliminados
console.log(greeting.repeat(3)) // "Hello, Matias!Hello, Matias!Hello, Matias!", devuelve una nueva cadena de texto repetida el número de veces especificado