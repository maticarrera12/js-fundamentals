// ============================================================
// 04 - CLASES AVANZADAS
// ============================================================
// Las clases de ES6 son sintaxis sobre el sistema de prototipos.
// Este archivo cubre los patrones avanzados: abstracción,
// polimorfismo, mixins, patrones de diseño y encapsulamiento real.
// ============================================================


// --- Clase base y herencia ---
// extends conecta la cadena de prototipos.
// super() en el constructor llama al constructor del padre — obligatorio.

class Animal {
    constructor(name, sound) {
        this.name  = name
        this.sound = sound
    }

    makeSound() {
        return `${this.name} hace ${this.sound}`
    }

    toString() {
        return `[Animal: ${this.name}]`
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, 'Guau')  // llama al constructor de Animal
        this.tricks = []
    }

    learn(trick) {
        this.tricks.push(trick)
        return this
    }

    // Override del método padre
    makeSound() {
        const base = super.makeSound()  // podés llamar al método del padre
        return `${base}! (${this.tricks.length} trucos aprendidos)`
    }
}

const rex = new Dog('Rex')
rex.learn('sentarse').learn('dar la pata')  // encadenado gracias al return this
console.log(rex.makeSound())


// --- Clases abstractas (patrón) ---
// JavaScript no tiene abstract nativo — se simula con new.target.
// new.target dentro de un constructor apunta a la clase que fue llamada con new.
// Si coincide con la propia clase, está siendo instanciada directamente.

class Shape {
    constructor(color) {
        if (new.target === Shape) {
            throw new Error('Shape es abstracta — usá una subclase')
        }
        this.color = color
    }

    // "Método abstracto" — fuerza a las subclases a implementarlo
    area() {
        throw new Error(`${this.constructor.name} debe implementar area()`)
    }

    describe() {
        return `${this.constructor.name} de color ${this.color}, área: ${this.area()}`
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color)
        this.radius = radius
    }
    area() { return Math.PI * this.radius ** 2 }
}

class Rectangle extends Shape {
    constructor(color, width, height) {
        super(color)
        this.width = width
        this.height = height
    }
    area() { return this.width * this.height }
}

// new Shape('red')  ❌ Error: Shape es abstracta
const shapes = [new Circle('rojo', 5), new Rectangle('azul', 4, 6)]
shapes.forEach(s => console.log(s.describe()))  // polimorfismo


// --- Mixins ---
// JS solo tiene herencia simple (una clase extiende una sola).
// Los mixins permiten "mezclar" comportamiento de múltiples fuentes.
// Patrón: función que recibe una clase y devuelve una clase extendida.

const Serializable = (Base) => class extends Base {
    serialize() {
        return JSON.stringify(this)
    }
    static deserialize(json) {
        return Object.assign(new this(), JSON.parse(json))
    }
}

const Validatable = (Base) => class extends Base {
    validate() {
        return Object.values(this).every(v => v !== null && v !== undefined)
    }
}

class User {
    constructor(name, email) {
        this.name  = name
        this.email = email
    }
}

// Aplicar múltiples mixins:
class RichUser extends Serializable(Validatable(User)) {}

const user = new RichUser('Matias', 'mati@example.com')
console.log(user.validate())   // true
console.log(user.serialize())  // '{"name":"Matias","email":"mati@example.com"}'


// --- Singleton ---
// Patrón de diseño: garantiza que solo exista una instancia de la clase.
// Se usa para cosas como una conexión a base de datos o el store de la app.

class AppConfig {
    static #instance = null  // privado + estático

    #settings

    constructor(settings) {
        if (AppConfig.#instance) {
            return AppConfig.#instance  // devuelve la instancia existente
        }
        this.#settings = settings
        AppConfig.#instance = this
    }

    get(key) {
        return this.#settings[key]
    }

    static reset() {
        AppConfig.#instance = null  // útil para tests
    }
}

const config1 = new AppConfig({ env: 'production', debug: false })
const config2 = new AppConfig({ env: 'development', debug: true })

console.log(config1 === config2)       // true — misma instancia
console.log(config1.get('env'))        // 'production' — la primera gana


// --- Encapsulamiento: Symbol vs campos privados (#) ---
// Symbol: "semiprivado" — queda oculto en iteración normal
//         pero se puede acceder con la referencia al Symbol.
// #:      verdaderamente privado — SyntaxError al intentar acceder desde afuera.

const _id = Symbol('id')

class UserWithSymbol {
    constructor(name) {
        this.name  = name
        this[_id]  = crypto.randomUUID()  // "oculto" pero accesible si tenés el Symbol
    }
    getId() { return this[_id] }
}

class UserWithPrivate {
    #id  // debe declararse antes del constructor

    constructor(name) {
        this.name = name
        this.#id  = crypto.randomUUID()  // verdaderamente privado
    }
    getId() { return this.#id }
}

const u1 = new UserWithSymbol('Mati')
console.log(u1[_id])    // accesible — solo "oculto"

const u2 = new UserWithPrivate('Mati')
// console.log(u2.#id)  ❌ SyntaxError — no existe afuera de la clase


// --- Proxy ---
// Envuelve un objeto e intercepta sus operaciones: get, set, has, delete, etc.
// Útil para validación, logging, acceso controlado o datos reactivos.

function createValidatedAccount(initialBalance) {
    const target = { balance: initialBalance, owner: '' }

    const handler = {
        get(obj, prop) {
            console.log(`[Proxy] leyendo: ${prop}`)
            return obj[prop]
        },
        set(obj, prop, value) {
            if (prop === 'balance' && typeof value !== 'number') {
                throw new TypeError('balance debe ser un número')
            }
            if (prop === 'balance' && value < 0) {
                throw new RangeError('balance no puede ser negativo')
            }
            obj[prop] = value
            return true  // obligatorio en set — indica éxito
        }
    }

    return new Proxy(target, handler)
}

const account = createValidatedAccount(1000)
account.balance = 1500     // ok
console.log(account.balance)  // [Proxy] leyendo: balance → 1500
// account.balance = -100  ❌ RangeError


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una jerarquía de clases para figuras 3D:
//    - Shape3D (abstracta) con método volume() abstracto y describe()
//    - Sphere extends Shape3D — volume: (4/3)πr³
//    - Cube extends Shape3D   — volume: lado³
//    - Cylinder extends Shape3D — volume: πr²h
//    Verificá que new Shape3D() lanza error.
// Tu código acá:


// 2. Implementá un mixin "Timestamped" que agregue:
//    - createdAt: Date al construirse
//    - updatedAt: Date que se actualiza cada vez que cambia una propiedad (usá Proxy)
//    Aplicalo a una clase "Task" con title y status.
// Tu código acá:


// 3. Creá una clase "EventEmitter" con:
//    - on(event, handler): registra un handler
//    - off(event, handler): desregistra un handler
//    - emit(event, ...args): llama todos los handlers del evento
//    Los handlers deben guardarse en un Map privado (#handlers).
// Tu código acá:
