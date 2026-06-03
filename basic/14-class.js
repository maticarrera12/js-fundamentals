// las clases son un objeto complejo, que nos permite crear objetos con propiedades y métodos, es una forma de organizar nuestro código y reutilizarlo, los valores los damos cuando los instanciamos. 

class Champion {
    constructor(name, role, difficulty) {
        this.name = name;
        this.role = role;
        this.difficulty = difficulty;
    }
    getInfo() {
        return `El campeón ${this.name} es un ${this.role} y su dificultad es ${this.difficulty}`;
    }
}

const seraphine = new Champion("Seraphine", "Mago", "Baja");
console.log(seraphine.getInfo());

// valores por defecto en el constructor

class ChampionTwo { 
    constructor(name, role = "desconocido", difficulty = "desconocida") {
        this.name = name;
        this.role = role;
        this.difficulty = difficulty;
    }
    getInfo() {
        return `El campeón ${this.name} es un ${this.role} y su dificultad es ${this.difficulty}`;
    }
}
const teemo = new ChampionTwo("Teemo");
console.log(teemo.getInfo());

// acceso a propiedades

console.log(teemo.name);

// cambiar un valor de una propiedad
teemo.role = "Troll";
console.log(teemo.getInfo());

// propiedades privadas, no se pueden acceder desde fuera de la clase, solo desde dentro de la clase, se definen con el símbolo # antes del nombre de la propiedad

class ChampionThree {
    #name;
    #role;
    #difficulty;
    constructor(name, role, difficulty) {
        this.#name = name;
        this.#role = role;
        this.#difficulty = difficulty;
    }
  
}
const yasuo = new ChampionThree("Yasuo", "Asesino", "Alta");
console.log(yasuo.name); // undefined, no se puede acceder a la propiedad privada ni modificarla desde fuera de la clase

// getter y setter, son métodos que nos permiten acceder y modificar las propiedades privadas de una clase, se definen con la palabra get y set antes del nombre del método

class ChampionFour {    
    #name;
    #role
    #difficulty;
    constructor(name, role, difficulty) {
        this.#name = name;
        this.#role = role;
        this.#difficulty = difficulty;
    }
    get name() {
        return this.#name;
    }
    set role(newRole) {
        this.#role = newRole;
    }   
}

const leeSin = new ChampionFour("Lee Sin", "Luchador", "Alta");
console.log(leeSin.name); // Lee Sin, podemos acceder a la propiedad privada a través del getter pero no podemos modificarla.
leeSin.role = "Asesino"; // podemos modificar la propiedad privada a través del setter pero no podemos acceder a ella directamente.
console.log(leeSin.role);


