// la herencia de clases es una forma de crear una nueva clase a partir de una clase existente, la nueva clase hereda las propiedades y métodos de la clase existente, y puede agregar nuevas propiedades y métodos o modificar los existentes.

class Champion {
    constructor(name, role, difficulty) {
        this.name = name;
        this.role = role;
        this.difficulty = difficulty;
    }
    // MÉTODO NORMAL (de instancia): vive en cada objeto creado con "new".
    // Se llama con: zed.goToLane()
    // Usa "this" porque actúa sobre ESE campeón concreto (this.name = "Zed").
    goToLane() {
        return `${this.name} va a su carril`;
    }

    // MÉTODOS ESTÁTICOS (static):
    // - Pertenecen a la CLASE (Champion), NO a cada instancia (zed, yasuo).
    // - Se llaman con: Champion.getGameInfo()  (sin "new", sin objeto).
    // - NO usan "this" de una instancia; si necesitan datos, los reciben por parámetro.
    // - Sirven para cosas generales o utilidades: info del juego, comparar campeones, etc.
    //
    // Método normal  →  zed.goToLane()              →  "Zed va a su carril"
    // Método static  →  Champion.getGameInfo()      →  info de LoL en general

    static getGameInfo() {
        return "League of Legends - 5v5 MOBA";
    }

    // Recibe dos campeones como parámetros en lugar de usar "this"
     static compareDifficulty(champ1, champ2) {
        return `${champ1.name} (${champ1.difficulty}) vs ${champ2.name} (${champ2.difficulty})`;
    }
}

class Assassin extends Champion {
    constructor(name, role, difficulty, speciality) {
        super(name, role, difficulty); // super es una función que llama al constructor de la clase padre
        this.speciality = speciality;
    }
    useSpeciality() {
        return `${this.name} usa su especialidad ${this.speciality}`;
    }
}

const zed = new Assassin("Zed", "Mid", "Alta", "Dano explosivo");
const yasuo = new Assassin("Yasuo", "Mid", "Alta", "Viento");

// --- Métodos de INSTANCIA (necesitas crear el objeto con "new") ---
console.log(zed.goToLane());        // "Zed va a su carril"
console.log(zed.useSpeciality());   // "Zed usa su especialidad Dano explosivo"

// --- Métodos ESTÁTICOS (llamas a la clase directamente, sin "new") ---
console.log(Champion.getGameInfo());                    // info general de LoL
console.log(Champion.compareDifficulty(zed, yasuo));    // compara dos campeones

// Esto NO funciona: zed.getGameInfo()  →  Error, getGameInfo no existe en zed
// Assassin también hereda los static de Champion: Assassin.getGameInfo() también vale

