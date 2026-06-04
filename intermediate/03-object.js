// Objetos Avanzados

// Prototipos y Herencia

// Prototipos --> son objetos que se utilizan como base para crear otros objetos. Ya no se usan tanto como antes. En la actualidad se usan mas los prototypes de las clases.

let person = {
    name: "Matias",
    age: 25,
    greet: function() {
        console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
    }
}

console.log(person.__proto__);
console.log(Object.getPrototypeOf(person));

person.myAge = function() {
    console.log("My age is " + this.age);
    
}

console.log(person.myAge());

// Herencia --> es la capacidad de un objeto para heredar propiedades y metodos de otro objeto.

let programmer = Object.create(person);
programmer.language = "JavaScript";


// metodos estaticos y de instancia --> los metodos estaticos son metodos que se pueden llamar sin instanciar el objeto, mientras que los metodos de instancia son metodos que se pueden llamar solo si se ha instanciado el objeto.

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
}

let newPerson = new Person("Matias", 25);
newPerson.greet();

// metodos avanzados

// assign --> copia las propiedades de un objeto a otro.

let person2 = {
    name: "Juan",
    age: 30,
}

let person3 = Object.assign(person2, { city: "Buenos Aires" });
console.log(person3);

// freeze --> congela un objeto, no se pueden agregar, modificar o eliminar propiedades.

let person4 = Object.freeze(person3);
person4.city = "Rosario";
console.log(person4);

// seal --> congela un objeto, no se pueden agregar, modificar o eliminar propiedades, pero se pueden modificar las propiedades existentes.

let person5 = Object.seal(person4);
person5.city = "Cordoba";
console.log(person5);

// defineProperty --> define una nueva propiedad en un objeto.

let person6 = Object.defineProperty(person5, "city", { value: "Buenos Aires" });
console.log(person6);

// defineProperties --> define varias propiedades en un objeto.

let person7 = Object.defineProperties(person6, {
    city: { value: "Buenos Aires" },
    country: { value: "Argentina" },
    language: { value: "Spanish", writable: false }
});
console.log(person7);



