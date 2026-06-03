// Crea un objeto con 3 propiedades

let character = {
    name: "Talon",
    role: "Assasain",
    position: "Mid"
}

// Accede y muestra su valor

console.log( character.name);
console.log( character.position);
console.log( character.role);

// Agrega una propiedad

character.build = "Letality"

// Borra una de las 3 primeras propiedades

delete character.position

console.log(character);

// Agrega una funcion e invocala

character.objetive = function(){
    console.log("Por favor, deletea al adc");
}

character.objetive()

// Itera las propiedades del objeto

for(const key in character){
    console.log(key + ":" +character[key]);
}

// Crea un objeto anidado

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

console.log(characterTwo.position.adc);
console.log(characterTwo.position.support);
console.log(characterTwo.position.jungle);
console.log(characterTwo.position.top);
console.log(characterTwo.position.mid);

// Comproba si los dos objetos son iguales
console.log(character == characterTwo);
console.log(character === characterTwo);

// comproba si dos propiedades diferentes son iguales

console.log(character.name == characterTwo.build);

