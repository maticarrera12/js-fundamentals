// ============================================================
// 12 - CLASES EN TYPESCRIPT
// ============================================================
// Las clases de TS extienden las de JS con modificadores de
// acceso, propiedades tipadas, clases abstractas y más.
// Si conocés clases de JS, acá agregás las capas de seguridad
// que el sistema de tipos habilita.
// ============================================================


// --- Modificadores de acceso ---
// public:    accesible desde cualquier lado (es el default)
// private:   solo accesible dentro de la clase
// protected: accesible dentro de la clase y sus subclases

class BankAccount {
    public owner: string
    private balance: number
    protected accountNumber: string

    constructor(owner: string, initialBalance: number) {
        this.owner = owner
        this.balance = initialBalance
        this.accountNumber = crypto.randomUUID()
    }

    public deposit(amount: number): void {
        this.balance += amount
    }

    public getBalance(): number {
        return this.balance
    }

    // balance no es accesible desde afuera:
    // account.balance  ❌ error
}

const account = new BankAccount('Matias', 1000)
account.deposit(500)
console.log(account.getBalance()) // 1500
// account.balance  ❌ error: 'balance' es private


// --- Parameter properties (shorthand) ---
// En vez de declarar la propiedad + asignar en el constructor,
// TS permite hacerlo directamente en la firma del constructor.

class Point {
    constructor(
        public x: number,
        public y: number,
        private label: string = 'point'
    ) {}

    toString(): string {
        return `${this.label}(${this.x}, ${this.y})`
    }
}

const p = new Point(3, 4)
console.log(p.toString()) // point(3, 4)


// --- readonly ---
// Solo se puede asignar en la declaración o en el constructor.

class User {
    readonly id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
}

const user = new User(1, 'Matias')
user.name = 'Carlos'  // ok
// user.id = 2         ❌ error: 'id' es readonly


// --- Implementar interfaces ---
// "implements" fuerza a la clase a cumplir un contrato.
// A diferencia de "extends", no hereda comportamiento.

interface Serializable {
    serialize(): string
    deserialize(data: string): void
}

interface Printable {
    print(): void
}

class Document implements Serializable, Printable {
    constructor(public title: string, public content: string) {}

    serialize(): string {
        return JSON.stringify({ title: this.title, content: this.content })
    }

    deserialize(data: string): void {
        const parsed = JSON.parse(data)
        this.title = parsed.title
        this.content = parsed.content
    }

    print(): void {
        console.log(`${this.title}\n${this.content}`)
    }
}


// --- Clases abstractas ---
// No se pueden instanciar directamente.
// Definen una estructura que las subclases DEBEN implementar.
// Diferencia con interface: pueden tener implementación concreta.

abstract class Shape {
    abstract getArea(): number    // sin implementación — obligatorio en subclase
    abstract getName(): string

    // Método concreto — disponible para todas las subclases:
    describe(): string {
        return `${this.getName()} con área ${this.getArea().toFixed(2)}`
    }
}

class Circle extends Shape {
    constructor(private radius: number) { super() }

    getArea(): number {
        return Math.PI * this.radius ** 2
    }

    getName(): string {
        return 'Círculo'
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) { super() }

    getArea(): number {
        return this.width * this.height
    }

    getName(): string {
        return 'Rectángulo'
    }
}

// const s = new Shape()  ❌ error: no se puede instanciar una clase abstracta
const circle = new Circle(5)
console.log(circle.describe())     // Círculo con área 78.54
const rect = new Rectangle(4, 6)
console.log(rect.describe())       // Rectángulo con área 24.00


// --- Static members ---
// Pertenecen a la clase, no a las instancias.

class IdGenerator {
    private static nextId = 1

    static generate(): number {
        return IdGenerator.nextId++
    }

    static reset(): void {
        IdGenerator.nextId = 1
    }
}

const id1 = IdGenerator.generate() // 1
const id2 = IdGenerator.generate() // 2
// No necesitás hacer new IdGenerator()


// --- Clases genéricas ---
// Ya las viste en 07-generics. Acá el resumen aplicado a un caso real.

class Repository<T extends { id: number }> {
    private items: T[] = []

    save(item: T): void {
        const index = this.items.findIndex(i => i.id === item.id)
        if (index >= 0) {
            this.items[index] = item
        } else {
            this.items.push(item)
        }
    }

    findById(id: number): T | undefined {
        return this.items.find(i => i.id === id)
    }

    findAll(): T[] {
        return [...this.items]
    }
}

const userRepo = new Repository<User>()
userRepo.save(new User(1, 'Matias'))
const found = userRepo.findById(1) // found es User | undefined


// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

// C1. Modificadores de acceso. Escribí una clase "Wallet" con:
//     - "owner" público
//     - "balance" privado, inicializado en el constructor
//     - un método "getBalance(): number" que devuelva balance
//     Esperado: new Wallet('Matias', 100).getBalance() → 100
//               wallet.balance ❌ no debe compilar desde afuera
// Tu código acá:


// C2. Parameter properties. Reescribí la misma clase "Wallet" pero
//     usando el shorthand del constructor (sin declarar las
//     propiedades aparte ni asignarlas a mano).
// Tu código acá:


// C3. Clase abstracta. Escribí "PaymentMethod" abstracta con:
//     - método abstracto "getFee(): number"
//     - método concreto "describe(): string" que use getFee()
//     Implementala con una clase "CreditCard" que devuelva un fee fijo.
//     Esperado: new CreditCard().describe() usa el fee de CreditCard.
// Tu código acá:


// C4. implements. Escribí una interface "Loggable" con un método
//     "log(): void". Escribí una clase "Transaction" que la
//     implemente y tenga una propiedad "amount: number".
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una clase abstracta "Animal" con:
//    - Propiedad protected "name"
//    - Método abstracto "makeSound(): string"
//    - Método concreto "describe(): string" que use name y makeSound()
//    Implementala con Dog y Cat.
// Tu código acá:


// 2. Creá una clase "EventEmitter<T>" genérica donde T es un
//    objeto que mapea nombre de evento → tipo del payload.
//    Debe tener:
//    - on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void
//    - emit<K extends keyof T>(event: K, data: T[K]): void
//    Tip: guardá los handlers en un Map o un objeto.
// Tu código acá:


// 3. Creá una clase "Stack<T>" (como en 07-generics pero más completa):
//    - push, pop, peek, isEmpty, size
//    - Un método "toArray(): T[]" que devuelva copia del stack
//    - El constructor puede recibir elementos iniciales opcionales
//    Asegurate de que pop/peek retornen T | undefined correctamente.
// Tu código acá:

export {}
