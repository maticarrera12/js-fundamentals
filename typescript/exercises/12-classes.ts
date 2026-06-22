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
