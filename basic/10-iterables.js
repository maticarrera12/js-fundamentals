// los iterables son objetos que pueden ser iterados, es decir, que se pueden recorrer elemento por elemento, como los arrays, las cadenas de texto, los mapas y los conjuntos. Los iterables se pueden usar con el bucle for...of para iterar sobre sus elementos.

// Ejercicios con iterables
// Dado un array de numeros, usar un bucle para sumar todos los numeros y mostrar el resultado

let acc = 0;
const myNums = [1, 2, 3, 4, 5];
let i = 0;
for (i = 0; i < myNums.length; i++) {
  acc += myNums[i];
}
console.log(acc);

// Symbol.iterator es un método que se utiliza para definir el comportamiento de un objeto iterable, es decir, cómo se deben iterar sus elementos. Este método devuelve un objeto que tiene un método next() que devuelve el siguiente elemento del iterable y un valor booleano que indica si se ha llegado al final del iterable o no. El bucle for...of utiliza este método para iterar sobre los elementos de un iterable.

let range = {
  from: 1,
  to: 5
};

// 1. Una llamada a for..of inicializa una llamada a esto:
range[Symbol.iterator] = function() {

  // ... devuelve el objeto iterador:
  // 2. En adelante, for..of trabaja solo con el objeto iterador debajo, pidiéndole los siguientes valores
  return {
    current: this.from,
    last: this.to,

    // 3. next() es llamado en cada iteración por el bucle for..of
    next() {
      // 4. debe devolver el valor como un objeto {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// ¡Ahora funciona!
for (let num of range) {
  alert(num); // 1, luego 2, 3, 4, 5
}

// Técnicamente, podríamos fusionarlos y usar el range mismo como iterador para simplificar el código.

// De esta manera:

let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, luego 2, 3, 4, 5
}

// String es iterable

// Iterables y simil-array son objetos que tienen una propiedad length y propiedades con índices, pero no tienen métodos de array como push, pop, etc. Un ejemplo de un objeto simil-array es el objeto arguments que se encuentra dentro de las funciones, que contiene los argumentos pasados a la función. Aunque no es un array, se puede iterar sobre él con un bucle for...of o convertirlo en un array con Array.from().

// Array.from (obj[, mapFn, thisArg]) crea un verdadero Array de un obj iterable o array-like, y luego podemos usar métodos de matriz en él. Los argumentos opcionales mapFn y thisArg nos permiten aplicar una función a cada elemento.