// ============================================================
// 12 - OBJETOS
// ============================================================
// Un objeto es una colección de pares clave-valor.
// Es la estructura de datos central de JavaScript —
// casi todo en JS es un objeto o actúa como uno.
// Los objetos se pasan por REFERENCIA, no por valor.
// ============================================================


// --- Creación ---

const person = {
    name: 'Matias',
    age: 25,
    city: 'Buenos Aires'
}

// Shorthand: cuando la variable tiene el mismo nombre que la propiedad
const name = 'Matias'
const age  = 25
const user = { name, age }  // equivalente a { name: name, age: age }


// --- Acceso a propiedades ---
// Notación de punto: cuando la clave es un identificador válido
// Notación de corchetes: para claves dinámicas o con caracteres especiales

console.log(person.name)       // 'Matias'
console.log(person['city'])    // 'Buenos Aires'

const key = 'age'
console.log(person[key])       // 25 — clave dinámica


// --- Agregar, modificar y eliminar ---

person.email = 'mati@example.com'  // agregar propiedad
person.age = 26                    // modificar propiedad
delete person.city                 // eliminar propiedad

console.log(person)


// --- Métodos (funciones como propiedades) ---
// Cuando una función es propiedad de un objeto, es un método.
// this dentro del método apunta al objeto que lo contiene.

const car = {
    brand: 'Toyota',
    model: 'Corolla',
    fuel: 100,
    drive(km) {
        const consumed = km * 0.08
        this.fuel -= consumed
        return `${this.brand} ${this.model} recorrió ${km}km. Combustible: ${this.fuel.toFixed(1)}L`
    },
    canTravel(km) {
        return this.fuel >= km * 0.08
    }
}

console.log(car.drive(200))       // 'Toyota Corolla recorrió 200km. Combustible: 84.0L'
console.log(car.canTravel(1000))  // false


// --- Objetos anidados ---

const product = {
    id: 1,
    name: 'Laptop',
    price: 85000,
    specs: {
        ram: '16GB',
        storage: '512GB SSD',
        display: {
            size: '15.6"',
            resolution: '1920x1080'
        }
    }
}

console.log(product.specs.ram)                // '16GB'
console.log(product.specs.display.resolution) // '1920x1080'


// --- Referencia vs copia ---
// Los objetos se PASAN por referencia — dos variables pueden apuntar al mismo objeto.
// Asignar a una nueva variable NO crea una copia — es el mismo objeto en memoria.

const original = { x: 1 }
const reference = original     // misma referencia
reference.x = 99
console.log(original.x)        // 99 — original también cambió

// Para copiar, usá spread (shallow copy). El spread a fondo se ve en 13:
const copy = { ...original }
copy.x = 1
console.log(original.x)        // 99 — original no cambió

// Igualdad de objetos: dos objetos son === solo si son la misma referencia
console.log(original === reference)  // true  — misma referencia
console.log(original === copy)       // false — referencias distintas
console.log(original.x === copy.x)  // false — 99 vs 1


// --- Iterar propiedades ---

const config = { host: 'localhost', port: 3000, debug: true }

// Object.keys → array de claves
for (const key of Object.keys(config)) {
    console.log(`${key}: ${config[key]}`)
}

// Object.entries → array de [clave, valor] — más expresivo
for (const [key, value] of Object.entries(config)) {
    console.log(`${key}: ${value}`)
}

// Verificar si una propiedad existe:
console.log('host' in config)               // true — incluye heredadas
console.log(Object.hasOwn(config, 'host'))  // true — solo propias (moderno)


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "merge(obj1, obj2)" que combine dos objetos.
//    Las propiedades de obj2 deben sobrescribir las de obj1 si hay conflicto.
//    Hacelo sin mutar ninguno de los dos originales.
// Tu código acá:


// 2. Dado el objeto product de arriba, usá Object.entries y reduce
//    para construir un nuevo objeto donde cada clave sea la misma
//    pero todos los valores string estén en mayúsculas.
//    (las specs anidadas pueden quedar igual por ahora)
// Tu código acá:


// 3. Implementá una función "pick(obj, keys)" que devuelva un nuevo objeto
//    con solo las propiedades cuyas claves están en el array keys.
//    pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) → { a: 1, c: 3 }
// Tu código acá:
