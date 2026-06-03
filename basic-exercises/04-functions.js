// crear una funcion que reciba dos numeros y devuelva su suma

const add = (a,b)=>{
    return a + b
}

const resultAdd = add(7,2)
console.log(resultAdd);

// Crea una funcion que reciba un array de numeros y devuelva el mayor de ellos

const arrayNums = [6, 8, 10, 3, 12, 6, 7]
valueMax = arrayNums[0] 

function returnMax(params){
    for(i = 0;i < params.length; i++){
        if(valueMax < params[i]){
            valueMax = params[i]
        }else{
            valueMax = valueMax
        }
    }
    return valueMax
}

const maxNum = returnMax(arrayNums)
console.log(maxNum);


// crea una funcion que reciba un string y devuelva el numero de vocales



acc = 0;
const myString = "Hola mundo";


const vocalCount = (array) => {
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
return acc
}

const resultCount = vocalCount(myString)
console.log(resultCount);


// crea una funcion que reciba una array de strings y devuelva un nuevo array con las strings en mayusculas

const myArrayString = ["Hola", "mundo"]
const newArrayString = []
function uppercaseString(params){
    for(const element of params){
        newArrayString.push(element.toUpperCase())
    }
    return newArrayString
}

const resultArray = uppercaseString(myArrayString)
console.log(resultArray);

// crea una funcion que reciba un numero y devuelva true si es primo y false si no lo es

function isPrimo(params){
    for(i = 2; i < params; i ++){
        if(params % i === 0 ){
            return false        
        }
    }

    return true
}

const resultPrimo = isPrimo(2)
console.log(resultPrimo);

// crea una funcion que reciba dos arrays y devuelve un array que contenga los elementos comunes entre ambos


const myArrayStringTwo = [ "mundo","soy", "Hola", "Matias"]
let myArrayStringThree = []

 const addEqual = (param1,param2) => {
    for(const elementOne of param1){
        for(const elementTwo of param2){
            if(elementOne === elementTwo){
                myArrayStringThree.push(elementOne)
            }
        }
    }
    return myArrayStringThree
 }

const resultAddEqual = addEqual(myArrayString, myArrayStringTwo)
console.log(resultAddEqual);


// crea una funcion que reciba un array de numeros y devuelve la suma de todos los numeros pares

acc = 0
function addPair(params){
    for(i = 0;i < params.length; i++){
        if(params[i] % 2 === 0){
            acc += params[i]       
        }
    }
    return acc
}

const resultAddPair = addPair(arrayNums)
console.log(resultAddPair);

// crea una funcion que reciba un array de numero y devuevla un nuevo array con cada numero elevado al cuadrado

const numbers = [1, 2, 3, 4, 5];
const numbers2 = []

function fExponential(params){  
    params.forEach((number) => {
        numbers2.push(number ** 2)
    })
    return numbers2
        }

const resultExponential = fExponential(numbers)
console.log(resultExponential);

// crea una funcion que reciba una cadena de texto y devuelva la misma cadena con las palabras en orden inverso

function reverseWords(str) {
    let palabraActual = "";
    let resultado = "";

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char !== " ") {
            palabraActual += char;
        } else {
            // terminó una palabra
            resultado = palabraActual + " " + resultado;
            palabraActual = "";
        }
    }

    // agregar la última palabra (porque no hay espacio al final)
    resultado = palabraActual + " " + resultado;

    return resultado.trim();
}

const myStringThree = "Hola mundo cruel";
console.log(reverseWords(myStringThree));


// crea una funcion que calcule el factorial de un numero dado

function factorial(params){
    let  acc = params
    let i = params - 1
    for(i = params - 1; i > 0; i--){
        acc *= i
    }
    return acc
}

const resultFactorial = factorial(6)
console.log(resultFactorial);



