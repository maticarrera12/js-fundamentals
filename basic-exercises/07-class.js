// Crea una clase Person que reciba dos propiedades mediante su constructor.
// Agrega un método de instancia que utilice esas propiedades y muestre información del objeto.
// Agrega un método estático relacionado con la clase y ejecútalo sin crear una instancia.
// Crea una clase Student que herede de Person.
// Sobrescribe el método de instancia de Person para que Student muestre información adicional.
// Convierte las propiedades de Person en propiedades privadas.
// Implementa getters y setters para acceder y modificar dichas propiedades privadas.
// Crea una instancia de Student y:
// utiliza los setters para asignar valores,
// utiliza los getters para obtenerlos,
// invoca el método heredado y sobrescrito,
// e invoca el método estático de la clase padre.

class Person{
    #name;
    #age;
    constructor(name, age){
        this.#name = name
        this.#age = age
    }

    giveInfo(){
        return `Name: ${this.name}, Age:${this.age}`
    }

      static compareAge(person1, person2) {
        return `${person1.name} (${person1.age}) vs ${person2.name} (${person2.age})`;
    }
    get name(){
        return this.#name
    }
    set name(newName){
        this.#name = newName
    }
    get age(){
        return this.#age
    }
    set age(newAge){
        this.#age = newAge
    }
}

class Student extends Person{
    constructor(name, age, studentId){
        super(name,age);
        this.studentId = studentId
    }
    giveInfo(){
        return `Name: ${this.name}, Age:${this.age}, StudentId: ${this.studentId}`
    }
}

const juan = new Student("Juan", 18, 97873)
const mateo = new Student("Mateo", 21, 432124)
console.log(juan.giveInfo());
console.log(mateo.giveInfo());

console.log(Person.compareAge(juan,mateo));

juan.name= "Juan Gabriel"
juan.age = 28
console.log(juan.name)