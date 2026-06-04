// clases avanzadas --> son una forma de crear objetos de manera mas sencilla y organizada.

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
    }
}

let person = new Person("Matias", 25);
person.greet()

person.sayAge = function () {
    console.log("My age is " + this.age);
}

person.sayAge()

// abstraccion --> es la capacidad de un objeto para representar un concepto o idea de manera simplificada y abstracta.

class Animal {
    constructor(name) {
        if (new.target === Animal) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this.name = name;
    }
    makeSound() {
        throw new Error("El metodo makeSound es abstracto y debe ser implementado en la subclase");
    }
}

// Polimorfismo --> es la capacidad de un objeto para tomar diferentes formas o comportamientos.

class Dog extends Animal {
    makeSound() {
        console.log("El perro hace Guau Guau");
    }
}

let dog = new Dog("Buddy");
dog.makeSound()

class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    makeSound() {
        console.log("El gato hace Miau Miau");
    }
}

let cat = new Cat("Whiskers");
cat.makeSound()

// mixins --> es una forma de agregar funcionalidades a una clase sin necesidad de heredar de otra clase. 

const canFly = {
    fly() {
        console.log(`${this.name} is flying!`);
    }
}

class Bird extends Animal {
    constructor(name) {
        super(name);
    }
}

Object.assign(Bird.prototype, canFly);

let bird = new Bird("Tweety");
bird.fly()

// singleton --> es un patrón de diseño que se utiliza para garantizar que una clase tenga una única instancia y proporcionar un punto de acceso global a esa instancia. 

class Session {

    constructor(name) {
        if (Session.instance) {
            return Session.instance;
        }
        this.name = name;
        Session.instance = this;
    }
}

const session1 = new Session("Matias Carrera");
const session2 = new Session("Enrique Segoviano");
console.log(session1.name); // Matias Carrera
console.log(session2.name); // Matias Carrera
console.log(session1 === session2); // true


// Symbols --> son un tipo de dato primitivo que se utiliza para crear identificadores únicos e inmutables.


const ID  = Symbol("id")

class User {
    constructor(name){
        this.name = name;
        this[ID] = Math.random().toString(36).substr(2, 9);
    }
    getID() {
        return this[ID];
    }
}

const user1 = new User("Matias");
console.log(user1.name);
// console.log(user1.ID); // undefined
console.log(user1.getID()); // es semiprivada
console.log(user1[ID]);// es semiprivada

// instanceOf

class Car {

}

const car = new Car()

console.log(car instanceof Car);

// create

const anotherCar = Object.create(Car.prototype);
console.log(anotherCar instanceof Car);

// Proxy --> es un objeto que envuelve a otro objeto y permite interceptar y modificar su comportamiento. Como para aplicar seguridad, validaciones, etc.

const proxy = {
    get(target, prop) {
        console.log(`Getting property ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
       if(prop === "balance" && value < 0) {
        console.log("No se puede establecer un balance negativo");
        return false;
       }
       console.log(`Setting property ${prop} to ${value}`);
       target[prop] = value;
       return true;
    }
}

class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }

}
const account = new Proxy(new BankAccount(1000), proxy);
console.log(account.balance); // 1000

account.balance = -500; // No se puede establecer un balance negativo



