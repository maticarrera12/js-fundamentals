// desestructuracion es la capacidad de extraer datos de un array o un objeto y asignarlos a variables individuales

// desestructurando arrays
const numbers = [1, 2, 3, 4, 5];
const [first, second, third] = numbers;
console.log(first); // 1

// desestructurando arrays con valores por defecto
const [a = 0, b, c, d, e, f = 0] = numbers;
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
console.log(d); // 4
console.log(e); // 5
console.log(f); // 0

// notamos que no podemos cambiarle el valor a una variable que ya tiene un valor asignado, pero si podemos asignarle un valor a una variable que no tiene un valor asignado

// ignorar valores

const [firstNumber, , thirdNumber] = numbers;
console.log(firstNumber); // 1
console.log(thirdNumber); // 3

// desestructurando objetos
const character = {
  name: 'Warwick',
  city: 'Zaun'
};
const {  city, name, role = 'Bruiser' } = character; // el orden no importa, lo importante es el nombre de la propiedad del objeto 
console.log(name); // Warwick
console.log(city); // Zaun
console.log(role); // Bruiser

// sintaxis objects con nuevos nombres de variables
const { name: characterName, city: characterCity } = character;
console.log(characterName); // Warwick

// objeto anidado
let characterTwo = {
    name: "Tahm Kench",
    build: "Tank",
    position: {
        adc: "Definitivamente no",
        support: "Vos confia",
        jungle: "La W es para gankear",
        top: "Al frente como reja negra",
        mid: "Si sos el barba rinde"
    }
}

const { position: { adc, support, jungle, top, mid } } = characterTwo;
console.log(adc);

// spread operator arrays

const numbersTwo = [6, 7, 8, 9, 10];
const allNumbers = [...numbers, ...numbersTwo];
console.log(allNumbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// spread operator objetos
const characterThree = {
    name: "Garen",
    role: "Fighter"
}
const characterThreeExpanded = {
    ...characterThree,
    city: "Demacia"
}
console.log(characterThreeExpanded); // { name: 'Garen', role: 'Fighter', city: 'Demacia' }