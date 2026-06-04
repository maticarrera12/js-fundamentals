// Crea una funcion que retorne otra funcion

function createGreeting(name) {
    return function (message) {
        return `${message}, ${name}!`;
    }
}

const greet = createGreeting("Matias");
console.log(greet("Hello"));

// Implementa una funcion currificada que multiplique 3 numeros

function multiply(a) {
    return function (b) {
        return function (c) {
            return a * b * c;
        }
    }
}

const multiplyByThree = multiply(3);
console.log(multiplyByThree(4)(5));

// crea una funcion recursiva que calcule la potencia de un numero elevado a un exponente

function power(base, exponent) {
    if (exponent === 0) {
        return 1;
    }
    return base * power(base, exponent - 1);
}

console.log(power(2, 3));

// Crea una funcion createCounter() qie reciba un valor inicial y retorne un objeto con metodos increment(), decrement() y getValue(), utilizando un closure para mantener el estado 

function createCounter(initialValue) {
    let count = initialValue;
    return {
        increment: function () {
            count++;
        },
        decrement: function () {
            count--;
        },
        getValue: function () {
            return count;
        }
    }
}

const counter = createCounter(10);
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getValue());

// Crea una funcion sumManyTimes(multiplier, ...numbers) que primero sume todos los parametros rest y luego multiplique el resultado por multiplier

function sumManyTimes(multiplier, ...numbers) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum * multiplier;
}

console.log(sumManyTimes(2, 1, 2, 3, 4, 5));

// Crea un callback que se invoque con el resultado de la suma de todos los numeros que se le pasen a una funcion



// Desarrolla una funcion parcial

function partialAdd(a) {
    return function (b) {
        return a + b;
    }
}

const add5 = partialAdd(5);
console.log(add5(10));

// implementa un retorno implicito

function add(a, b) {
    return a + b;
}

console.log(add(1, 2));

// haz uso del this lexico

function greetThis() {
    console.log(this.name);
}

greetThis.call({ name: "Matias" });
