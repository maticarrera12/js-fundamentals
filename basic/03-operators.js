// operadores aritmeticos

console.log(2 + 3); // suma
console.log(5 - 2); // resta
console.log(4 * 6); // multiplicación
console.log(10 / 2); // división
console.log(10 % 3); // módulo o residuo
console.log(2 ** 3); // potencia

// incremeto y decremento

let x = 5;
x++; // x = x + 1
console.log(x); // 6
x--; // x = x - 1
console.log(x); // 5

// operadores de asignacion

let y = 10;
y += 5; // y = y + 5
console.log(y); // 15
y -= 3; // y = y - 3
console.log(y); // 12
y *= 2; // y = y * 2
console.log(y); // 24
y /= 4; // y = y / 4
console.log(y); // 6
y %= 5; // y = y % 5
console.log(y); // 1
y **= 3; // y = y ** 3
console.log(y); // 1

// operadores de comparacion

console.log(5 == "5"); // igualdad, compara el valor, devuelve true
console.log(5 === "5"); // identidad, compara el valor y el tipo de dato, devuelve false
console.log(5 != "5"); // desigualdad, compara el valor, devuelve false
console.log(5 !== "5"); // no identidad, compara el valor y el tipo de dato, devuelve true
console.log(5 > 3); // mayor que, devuelve true
console.log(5 < 3); // menor que, devuelve false
console.log(5 >= 5); // mayor o igual que, devuelve true
console.log(5 <= 4); // menor o igual que, devuelve false   

console.log(0 == false); // igualdad, compara el valor, devuelve true
console.log(0 === false); // identidad, compara el valor y el tipo de dato, devuelve false
console.log("" == false); // igualdad, compara el valor, devuelve true
console.log("" === false); // identidad, compara el valor y el tipo de dato, devuelve false
console.log(0 == ""); // igualdad, compara el valor, devuelve true
console.log(0 === ""); // identidad, compara el valor y el tipo de dato, devuelve false
console.log(null == undefined); // igualdad, compara el valor, devuelve true
console.log(null === undefined); // identidad, compara el valor y el tipo de dato, devuelve false


// truthy values: son valores que se consideran verdaderos en un contexto booleano, como true, cualquier número diferente de 0, cualquier cadena de texto no vacía, etc.
// falsy values: son valores que se consideran falsos en un contexto booleano, como false, 0, "", null, undefined, NaN, etc.

// operadores logicos

console.log(true && false); // AND, devuelve true si ambos operandos son true, de lo contrario devuelve false
console.log(true || false); // OR, devuelve true si al menos uno de los operandos es true, de lo contrario devuelve false
console.log(!true); // NOT, devuelve el valor contrario del operando, en este caso devuelve false   

// operadores ternarios
// el operador ternario es una forma abreviada de escribir un if-else, tiene la sintaxis: condicion ? valorSiTrue : valorSiFalse
let age = 18;
let isAdult = age >= 18 ? "Yes" : "No";
console.log(isAdult); // "Yes"
