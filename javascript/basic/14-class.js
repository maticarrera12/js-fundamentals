// ============================================================
// 14 - CLASES
// ============================================================
// Las clases son sintaxis moderna sobre el sistema de prototipos de JS.
// Permiten organizar datos y comportamiento en una unidad cohesiva.
// constructor inicializa el estado, los métodos definen el comportamiento.
// ============================================================


// --- Sintaxis básica ---

class Task {
    constructor(title, priority, done = false) {
        this.title    = title
        this.priority = priority
        this.done     = done
    }

    complete() {
        this.done = true
        return this  // encadenable
    }

    getInfo() {
        const status = this.done ? '✓' : '○'
        return `[${status}] ${this.title} (${this.priority})`
    }

    toString() {
        return `[Task: ${this.title}]`
    }
}

const task = new Task('Aprender TypeScript', 'alta')
console.log(task.getInfo())
console.log(task.toString())

// Podés agregar propiedades desde afuera (aunque no es ideal):
task.deadline = '2025-12-31'


// --- Parámetros con valores por defecto ---

class Item {
    constructor(name, price, category = 'general', inStock = true) {
        this.name     = name
        this.price    = price
        this.category = category
        this.inStock  = inStock
    }

    describe() {
        const stock = this.inStock ? 'disponible' : 'sin stock'
        return `${this.name} — $${this.price} (${this.category}, ${stock})`
    }
}

const sword = new Item('Infinity Edge', 3400, 'offensive')
console.log(sword.describe())


// --- Campos privados (#) ---
// Los campos con # son verdaderamente privados: solo existen dentro de la clase.
// Intentar accederlos desde afuera es SyntaxError — no solo undefined.
// Deben declararse antes del constructor.

class BankAccount {
    #balance      // campo privado
    #owner

    constructor(owner, initialBalance = 0) {
        this.#owner   = owner
        this.#balance = initialBalance
    }

    deposit(amount) {
        if (amount <= 0) throw new Error('El monto debe ser positivo')
        this.#balance += amount
        return this
    }

    withdraw(amount) {
        if (amount > this.#balance) throw new Error('Saldo insuficiente')
        this.#balance -= amount
        return this
    }

    get balance() { return this.#balance }  // getter para leer
    get owner()   { return this.#owner }
}

const account = new BankAccount('Matias', 1000)
account.deposit(500).withdraw(200)  // encadenado por el return this
console.log(account.balance)        // 1300
// console.log(account.#balance)    ❌ SyntaxError


// --- Getters y Setters ---
// get: accedés a la propiedad como si fuera un campo normal (sin ()).
// set: asignás con = pero la lógica de validación corre internamente.

class Temperature {
    #celsius

    constructor(celsius) {
        this.#celsius = celsius
    }

    get fahrenheit() {
        return this.#celsius * 9 / 5 + 32
    }

    get celsius() {
        return this.#celsius
    }

    set celsius(value) {
        if (value < -273.15) throw new RangeError('Temperatura por debajo del cero absoluto')
        this.#celsius = value
    }
}

const temp = new Temperature(100)
console.log(temp.fahrenheit)  // 212 — se lee como propiedad, no como método
console.log(temp.celsius)     // 100

temp.celsius = 0
console.log(temp.fahrenheit)  // 32


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una clase "Stack" (pila) con:
//    - un array privado #items
//    - push(item): agrega al tope
//    - pop(): quita y devuelve el tope (lanza error si está vacía)
//    - peek(): devuelve el tope sin quitarlo
//    - getter size que devuelve la cantidad de elementos
//    - getter isEmpty
// Tu código acá:


// 2. Creá una clase "Circle" con:
//    - campo privado #radius
//    - setter radius que valide que sea mayor a 0
//    - getters para area (πr²) y perimeter (2πr)
//    - método scale(factor) que multiplique el radio y devuelva this (encadenable)
// Tu código acá:
