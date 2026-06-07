// ============================================================
// 15 - HERENCIA DE CLASES
// ============================================================
// extends conecta la cadena de prototipos entre dos clases.
// La clase hija hereda todo de la padre y puede agregar o sobreescribir.
// super llama al constructor o a los métodos del padre.
// Los métodos static pertenecen a la clase, no a las instancias.
// ============================================================


// --- extends y super ---
// super() en el constructor del hijo llama al del padre — es OBLIGATORIO
// antes de usar `this` en una clase que extiende otra.

class Animal {
    constructor(name, type) {
        this.name = name
        this.type = type
    }

    makeSound() {
        return `${this.name} hace un sonido`
    }

    getInfo() {
        return `${this.name} — ${this.type}`
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'mamífero')  // llama al constructor de Animal
        this.breed = breed       // propiedad propia de Dog
    }

    fetch(item) {
        return `${this.name} trae: ${item}`
    }

    // Override: sobreescribir un método del padre
    makeSound() {
        const base = super.makeSound()  // podés llamar al método del padre
        return `${base} → ¡Guau! (${this.breed})`
    }
}

const rex = new Dog('Rex', 'Labrador')
console.log(rex.getInfo())        // heredado de Animal — 'Rex — mamífero'
console.log(rex.fetch('pelota'))  // propio de Dog
console.log(rex.makeSound())      // override que extiende el de Animal


// --- Múltiples niveles de herencia ---

class GoldenRetriever extends Dog {
    constructor(name) {
        super(name, 'Golden Retriever')
        this.friendly = true
    }

    greet() {
        return `${this.name} mueve la cola y salta de alegría`
    }
}

const buddy = new GoldenRetriever('Buddy')
console.log(buddy.getInfo())     // hereda de Animal
console.log(buddy.makeSound())   // hereda el override de Dog
console.log(buddy.greet())       // propio de GoldenRetriever
console.log(buddy instanceof Dog)    // true
console.log(buddy instanceof Animal) // true


// --- Métodos estáticos ---
// static: pertenecen a la CLASE, no a las instancias.
// Se llaman con AnimalUtils.metodo(), no con rex.metodo().
// No tienen acceso a `this` de instancia — solo a la propia clase.
// Útiles para fábricas, utilidades o datos que son del dominio, no del objeto.

class AnimalUtils extends Animal {
    // Método de instancia: actúa sobre el objeto concreto (usa this)
    describe() {
        return `[Instancia] ${this.name}: ${this.type}`
    }

    // Método estático: utilidad de la clase (no necesita instancia)
    static getKingdom() {
        return 'Animalia'
    }

    // Recibe objetos como parámetros porque no tiene acceso a instancias
    static compare(a1, a2) {
        return `${a1.name} (${a1.type}) vs ${a2.name} (${a2.type})`
    }

    // Factory: crea instancias desde datos externos
    static fromData({ name, type }) {
        return new AnimalUtils(name, type)
    }
}

const max = new AnimalUtils('Max', 'reptil')

console.log(max.describe())                        // instancia: OK
console.log(AnimalUtils.getKingdom())               // estático: OK
console.log(AnimalUtils.compare(rex, buddy))        // estático: OK
// console.log(max.getKingdom())                    ❌ TypeError — no existe en la instancia

const cat = AnimalUtils.fromData({ name: 'Misu', type: 'felino' })
console.log(cat.getInfo())


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una jerarquía: Vehicle → Car → ElectricCar
//    - Vehicle: brand, year, start() y stop()
//    - Car: doors (4 por defecto), honk()
//    - ElectricCar: batteryLevel (0-100), charge(amount), override start() que verifica que batteryLevel > 0
//    Probá que instanceOf funciona en todos los niveles.
// Tu código acá:


// 2. Agregá un método estático "ElectricCar.compare(car1, car2)"
//    que compare dos autos eléctricos por batteryLevel
//    y devuelva cuál tiene más carga.
// Tu código acá:
