// ============================================================
// 03 - OBJETOS AVANZADOS
// ============================================================
// Todo en JS hereda de Object. Entender la cadena de prototipos
// es entender cómo funciona la herencia en el lenguaje.
// Los métodos estáticos de Object te dan control total sobre
// la estructura y mutabilidad de los objetos.
// ============================================================


// --- Prototipos ---
// Cada objeto tiene una referencia interna a otro objeto: su prototipo.
// Cuando buscás una propiedad que no existe en el objeto, JS la busca
// en el prototipo, luego en el prototipo del prototipo, etc.
// Eso es la "cadena de prototipos" (prototype chain).

const animal = {
    type: 'Animal',
    describe() {
        return `Soy un ${this.type}`
    }
}

const dog = {
    type: 'Perro',
    bark() {
        return 'Guau!'
    }
}

// __proto__ está obsoleto — usá Object.getPrototypeOf para leer
// y Object.setPrototypeOf para modificar (aunque es costoso en performance)
Object.setPrototypeOf(dog, animal)
// dog.describe() → busca en dog (no está), busca en animal (está) ✓
console.log(dog.describe())  // 'Soy un Perro' — this es dog


// --- Object.create ---
// Crea un objeto con un prototipo específico.
// Era la forma estándar de herencia antes de las clases.

const vehicle = {
    start() {
        return `${this.brand} arrancando...`
    },
    stop() {
        return `${this.brand} apagado`
    }
}

const car = Object.create(vehicle)
car.brand = 'Toyota'
car.wheels = 4
console.log(car.start())   // 'Toyota arrancando...' — heredado de vehicle
console.log(car.hasOwnProperty('brand'))  // true — propia
console.log(car.hasOwnProperty('start'))  // false — heredada


// --- Object.assign ---
// Copia propiedades de uno o más objetos origen al destino.
// Cuidado: es una COPIA SUPERFICIAL (shallow copy).
// Si hay objetos anidados, se copia la referencia, no el valor.

const defaults = { theme: 'dark', lang: 'es', fontSize: 16 }
const userPrefs = { theme: 'light', fontSize: 18 }

// El primer argumento es el destino — siempre usá {} para no mutar los originales
const config = Object.assign({}, defaults, userPrefs)
// { theme: 'light', lang: 'es', fontSize: 18 }

// Hoy en día, spread es más legible y hace lo mismo:
const config2 = { ...defaults, ...userPrefs }


// --- Object.freeze y Object.seal ---
//
// freeze → congela el objeto COMPLETAMENTE.
//          No se pueden agregar, eliminar ni modificar propiedades.
//          También es shallow — objetos anidados no quedan congelados.
//
// seal  → sella la estructura del objeto.
//          No se pueden agregar ni eliminar propiedades,
//          PERO sí se pueden modificar las existentes.
//          Diferencia clave: freeze bloquea TODO, seal solo la estructura.

const frozen = Object.freeze({ host: 'localhost', port: 3000 })
frozen.port = 8080   // silencioso en non-strict, error en strict — no cambia nada
console.log(frozen.port)  // 3000

const sealed = Object.seal({ name: 'Matias', age: 25 })
sealed.age = 26        // ✓ modificar una existente está permitido
sealed.email = 'x'     // ✗ agregar una nueva no está permitido
console.log(sealed.age)   // 26
console.log(sealed.email) // undefined


// --- Object.defineProperty ---
// Control fino sobre cómo se comporta una propiedad.
// Configurás: writable, enumerable y configurable.

const person = { name: 'Matias' }

Object.defineProperty(person, 'id', {
    value: 42,
    writable: false,     // no se puede reasignar
    enumerable: false,   // no aparece en for...in ni Object.keys
    configurable: false  // no se puede eliminar ni redefinir
})

console.log(person.id)           // 42
console.log(Object.keys(person)) // ['name'] — id no aparece
person.id = 99                   // sin efecto (writable: false)

// Caso de uso real: agregar getters/setters con lógica de validación
Object.defineProperty(person, 'age', {
    get() { return this._age },
    set(value) {
        if (value < 0 || value > 150) throw new RangeError('Edad inválida')
        this._age = value
    },
    enumerable: true,
    configurable: true
})

person.age = 25
console.log(person.age)  // 25


// --- Object.keys / values / entries ---
// Los tres métodos más usados para iterar objetos.
// Solo devuelven propiedades PROPIAS (no heredadas) y enumerables.

const product = { id: 1, name: 'Zapatillas', price: 9999, stock: 5 }

console.log(Object.keys(product))    // ['id', 'name', 'price', 'stock']
console.log(Object.values(product))  // [1, 'Zapatillas', 9999, 5]
console.log(Object.entries(product)) // [['id', 1], ['name', 'Zapatillas'], ...]

// Con destructuring en entries es muy expresivo:
for (const [key, value] of Object.entries(product)) {
    console.log(`${key}: ${value}`)
}

// Transformar un objeto: Object.fromEntries + entries
const discounted = Object.fromEntries(
    Object.entries(product)
        .filter(([key]) => key !== 'stock')
        .map(([key, value]) => [key, key === 'price' ? value * 0.9 : value])
)


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá un objeto "configStore" usando Object.create(null)
//    (sin prototipo — útil como diccionario puro).
//    Usá Object.defineProperty para agregar una propiedad "version"
//    que sea read-only y no enumerable.
//    Verificá que no aparece en Object.keys pero sí podés leerla.
// Tu código acá:


// 2. Dado este array de usuarios:
//    const users = [
//      { id: 1, name: 'Ana', role: 'admin' },
//      { id: 2, name: 'Luis', role: 'user' },
//      { id: 3, name: 'Mara', role: 'user' },
//    ]
//    Usando Object.fromEntries + map, convertilo en un objeto
//    donde la clave es el id y el valor es el usuario completo.
//    { 1: { id: 1, name: 'Ana', ... }, 2: {...}, 3: {...} }
// Tu código acá:


// 3. Implementá una función "deepFreeze(obj)" que congele
//    un objeto y todos sus objetos anidados recursivamente.
//    Object.freeze solo hace shallow freeze — tu función debe
//    hacer que ningún nivel sea mutable.
// Tu código acá:
