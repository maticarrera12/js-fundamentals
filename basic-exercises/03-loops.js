// Imprimir del 1 al 20

for (let i = 1; i < 21; i++) {
  console.log(i);
}

// Imprimir la suma de los números del 1 al 100

let i = 0;
let acc = 0;
while (i < 100) {
  i++;
  acc += i;
}
console.log(acc);

// Todos los numero pares del 1 al 50

for (let i = 0; i < 51; i++) {
  if (i % 2 == 0) {
    console.log(i);
  }
}

// Dado un array de nombres, usar un bucle para imprimir cada nombre en la consola

const myArray = ["Matias", "Andres", "Valentina", "Belen"];
for (const elements of myArray) {
  console.log(elements);
}

// Escribi un bucle que cuente el numero de voales en una cadena de texto

acc = 0;
const myString = "Hola mundo";

for (const elements of myString) {
  if (
    elements == "a" ||
    elements == "e" ||
    elements == "i" ||
    elements == "o" ||
    elements == "u"
  ) {
    acc += 1;
  }
}
console.log(acc);

// Dado un array de numeros un bucle para multiplicar todos los numeros y mostrar el producto

accTwo = 1;
const myNums = [2,5,6,12,18,19];
let j = 0;
while (j < myNums.length) {
  j++;
  accTwo *= j;
}
console.log(accTwo);

// escribir un bucle qe imprima la tabla de multiplicar por 5

for (i = 1; i < 11; i++) {
  console.log(`5 por ${i} = ${5 * i}`);
}

// usa un bucle para invertir una cadea de texto

let k = 0;
for (k = myString.length - 1; k > -1; k--) {
  console.log(myString[k]);
}

// usa un bucle para generar los primeros diez numeros de la secuencia fibonacci

let l = 0; 
let a = 0; 
let b = 1; 
for (l = 0; l < 20; l++) { 
    c = a 
    a = b + c
    b = c
    console.log(a);  
 }

 // dado un array de numero, usa uin bucle para crear un nuevo array que contenga los numero mayores a 10
let newNums = []
for(const elementTwo of myNums){
    if(elementTwo > 10){
        newNums.push(elementTwo)
    }
}
console.log(newNums);
