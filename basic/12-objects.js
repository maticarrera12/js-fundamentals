// los objetos son estructuras de datos que permiten almacenar y organizar información en forma de pares clave-valor. Un objeto puede contener propiedades (datos) y métodos (funciones) que operan sobre esos datos. Los objetos son fundamentales en la programación orientada a objetos y se utilizan para modelar entidades del mundo real, como personas, vehículos, productos, etc.

// sintaxis

let person = {
    name: "Sebastian",
    age: 30,
};

// representa una estructura mas compleja que los maps y arrays, ya que pueden contener diferentes tipos de datos y funciones, lo que los hace ideales para modelar objetos del mundo real con múltiples atributos y comportamientos.

// los objetos también pueden contener otros objetos, lo que permite crear estructuras de datos anidadas y complejas. Esto es especialmente útil para representar relaciones entre diferentes entidades, como una persona que tiene una dirección, donde la dirección es un objeto dentro del objeto persona.

// la instancia es unica

// acceso a las propiedades de un objeto se puede realizar utilizando la notación de punto (objeto.propiedad) o la notación de corchetes (objeto["propiedad"]). La notación de punto es más común y se utiliza cuando el nombre de la propiedad es un identificador válido, mientras que la notación de corchetes es útil cuando el nombre de la propiedad contiene caracteres especiales o espacios.

person.name; // accede a la propiedad name utilizando la notación de punto
person["age"]; // accede a la propiedad age utilizando la notación de corchetes

// modificacion de las propiedades de un objeto se puede realizar asignando un nuevo valor a la propiedad utilizando la notación de punto o la notación de corchetes.

person.name = "Malala";
console.log(person)

// eliminacion de propiedades

delete person.age; // elimina la propiedad age del objeto person
console.log(person)

// agregar propiedad

person.gender = "female"
console.log(person)


let personTwo = {
    name: "Juancito",
    age: 25,
    walk: function() {
        console.log("Camina el tipo, miralo");
    },
    job: {
        title: "Periodista",
        company: "TyC Sports",
        exp: 5,
        work: function() {
            console.log(`como labura ${personTwo.name }, ya tiene experiencia de ${this.exp} años`);
        }
    }
};

personTwo.walk();
personTwo.job.work();
console.log(personTwo.job.title);

// igualdad de objects

let personThree = {
    name: "Juancito",
    age: 25,
    walk: function() {
        console.log("Camina el tipo, miralo");
    },
    job: {
        title: "Periodista",
        company: "TyC Sports",
        exp: 5,        work: function() {
            console.log(`como labura ${personThree.name}, ya tiene experiencia de ${this.exp} años`);
        }
    }
};

console.log(personTwo === personThree); // false, porque son objetos diferentes en memoria
console.log(personTwo.name === personThree.name); // true, porque las propiedades name tienen el mismo valor


// los objetos se guardan en memoria como referencias, lo que significa que cuando se asigna un objeto a una variable, en realidad se está asignando una referencia al objeto en lugar de una copia del objeto. Esto tiene implicaciones importantes para la igualdad de objetos y la manipulación de objetos en JavaScript.

// iteracion de objetos se puede realizar utilizando un bucle for...in, que itera sobre las propiedades enumerables de un objeto. En cada iteración, se obtiene la clave de la propiedad y se puede acceder al valor correspondiente utilizando la notación de corchetes.

for (let key in personTwo) {
    console.log(key);
    console.log(personTwo[key]);
}

// también se puede utilizar el método Object.keys() para obtener un array de las claves de un objeto y luego iterar sobre ese array utilizando un bucle for...of o el método forEach().

const keys = Object.keys(personTwo);
keys.forEach((key) => {
    console.log(key);
    console.log(personTwo[key]);
});

