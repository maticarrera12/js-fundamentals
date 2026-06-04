// funciones avanzdas

// ciudadanos de primera clase son aquellos que se pueden asignar a variables, pasarse como argumentos a otras funciones y retornar como resultado de otras funciones. 


// yo podria pasar la funcion como argumento a otra funcion, guardarlo en una variable y retornarla como resultado de otra funcion.

const greet = function (name) {
    console.log(`Hello, ${name}!`);
}

greet("Mati");

function processGreeting(greetFunction, name) {
    greetFunction(name);
}

function returnGreet() {
    return greet;
}

processGreeting(greet, "Matias");
returnGreet();
console.log(returnGreet());
const greet2 = returnGreet();
greet2("Matias");

// estas son las 3 caracteristicas de los ciudadanos de primera clase.
// 1. se pueden asignar a variables
// 2. se pueden pasar como argumentos a otras funciones
// 3. se pueden retornar como resultado de otras funciones

// los ciudadanos de primera clase son muy importantes en javascript porque nos permiten crear funciones que se comporten como variables y que se puedan reutilizar en diferentes partes del codigo.

// arrow function

// con retorno implicito 


const add = (a, b) => a + b;
console.log(add(1, 2));

// this lexico
// las funciones flecha no tienen su propio this, sino que heredan el this del contexto en el que se definen.

const handler = {
    name: "Matias",
    greeting: function () {
        console.log(`Chiao, ${this.name}!`);
    },
    arrowGreeting: () => {
        console.log(`Chiao, ${this.name}!`);
    },
}

handler.greeting();
handler.arrowGreeting(); // da undefined porque no tiene su propio this, sino que hereda el this del contexto en el que se define.

// IIFE (Immediately Invoked Function Expression)
// es una funcion que se ejecuta inmediatamente despues de ser definida. necesita de los ; para que se ejecute en las funciones anteriores y de los () para que se ejecute la funcion.

// IIFE - Clasico

(function () {
    console.log("IIFE clasico!");
})();

// IIFE - Arrow

(() => {
    console.log("IIFE flecha!");
})();
 

// recordemos que hoy en dia en Javascript no es necesario usar ";" para terminar las sentencias, pero es una buena practica hacerlo para evitar errores de sintaxis.

// parametros rest - ...args. es un array que contiene los parametros restantes de la funcion.

function multiply(...numbers) {
    return numbers.reduce((acc, curr) => acc * curr, 1);
}

console.log(multiply(1, 2, 3, 4, 5));

// tambien podemos iterar sobre los parametros restantes con un bucle for of.

function addTwo(...numbers) {
    let result = 1;
    for (const number of numbers) {
        result += number;
    }
    return result;
}

console.log(addTwo(1, 2, 3, 4, 5));

// operador spread - propaga los elementos de un array
// si tiene mas no es problema, si le meto menos si lo es.

const numbers = [1, 2, 3, 4, 5];
function addThree(a, b, c) {
    return a + b + c;
}

console.log(addThree(...numbers));

// Closures ocurre cuando una funcion que es interna a una fucnicone accede a variables de la funcion externa.

function createCounter() {
    let count = 0;
    return function() {
        count++;
        console.log(`Count: ${count}`);
        
    }
}

const counter = createCounter();
counter();
counter();

// la funcion interna accede al contexto de la funcion externa manteniendo el estado de la variable despues de ejecutarse. la instancia primigenia la tenemos guardada tenemos el contexto de la funcion externa pero ejecutamos la funcion interna y se crea una nueva instancia con el estado de la variable count. Encapsulamos datos sin contaminar el contexto global. Conserva el Scope de la funcion externa.

// Recusrividad es una funcion que se llama a si misma.

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(5));

// la funcion factorial se llama a si misma hasta que n es 0.

// funciones parciales, la idea de dividir una funcion en varias funciones mas pequeñas que se pueden llamar independientemente. Retornando una funcion que espera parametros para completar la funcion original.

function partialAdd(a) {
    return function(b, c) {
        return a + b + c;
    }
}

const add5 = partialAdd(5);
console.log(add5(10, 20));

// la funcion partialAdd retorna una funcion que espera un parametro para completar la funcion original.

// sirve por ejemplo para crear funciones que se pueden reutilizar en diferentes partes del codigo.

// Currying transofrmar una funcion que recibe varios paramentros es una nueva funcion que recibe un parametro a la vez.

function curry(a) {
    return function(a) {
        return function(b) {
            return function(c) {
                return a + b + c;
            }
        }
    }
}

const addAB = curry(1)(2)
const addC = addAB(3)
console.log(addC(4));


// callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan despues de que la funcion principal haya terminado.

function processData(data, callback){
    const result = add(...data)
    callback(result)
}

function processResult(result){
    console.log(result);
    
}

function processResult2(result){
    console.log(`The result is ${result}`);
    
}

processData([1,2], processResult)
processData([1,2], processResult2)

processData([1,2], (result) => {
    console.log(`The result is ${result} como arrow function`);
});