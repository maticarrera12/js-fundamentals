// ============================================================
// 20 - SCOPE Y THIS
// ============================================================
// Dos de los conceptos más malentendidos de JavaScript.
// Sin entender scope y this, el comportamiento del lenguaje
// parece arbitrario. Con esto claro, casi todo tiene sentido.
// ============================================================


// --- SCOPE ---
// Scope = desde dónde se puede "ver" una variable.
// JavaScript usa LEXICAL SCOPE: el scope se define por dónde
// está ESCRITO el código, no por dónde se llama.

const globalVar = 'soy global'; // accesible desde cualquier lado

function showScope() {
    const localVar = 'soy local';
    console.log(globalVar); // ✓ sube al scope global
    console.log(localVar);  // ✓ existe en este scope
}
// console.log(localVar); ❌ ReferenceError — no existe acá

// Block scope: let y const respetan los bloques { }
{
    let blockVar = 'solo acá';
    const blockConst = 'también acá';
}
// console.log(blockVar); ❌ ReferenceError

// var IGNORA block scope (solo respeta function scope):
{
    var leaked = 'me escapé del bloque';
}
console.log(leaked); // funciona — var es function-scoped, no block-scoped


// --- Scope chain ---
// Cuando JS busca una variable, sube por la cadena de scopes
// hasta encontrarla o llegar al global.

const level1 = 'nivel 1';

function outer() {
    const level2 = 'nivel 2';

    function inner() {
        const level3 = 'nivel 3';
        console.log(level1); // inner → outer → global ✓
        console.log(level2); // inner → outer ✓
        console.log(level3); // inner ✓
    }

    inner();
    // console.log(level3); ❌ outer no puede ver hacia adentro
}


// --- Closures ---
// Una closure es una función que "recuerda" las variables del scope
// donde fue CREADA, incluso después de que ese scope dejó de ejecutarse.
// No es magia — es la scope chain funcionando en el tiempo.

function makeCounter(start = 0) {
    let count = start; // queda "atrapado" en la closure

    return {
        increment() { count++ },
        decrement() { count-- },
        value()     { return count }
    };
}

const counter  = makeCounter(10);
counter.increment();
counter.increment();
console.log(counter.value()); // 12

const counter2 = makeCounter(); // instancia INDEPENDIENTE — su propio count
counter2.increment();
console.log(counter2.value()); // 1 — no comparte estado con counter

// Uso real de closures: encapsular estado privado sin clases
function createLogger(prefix) {
    const history = [];
    return {
        log(msg)     { history.push(msg); console.log(`[${prefix}] ${msg}`); },
        getHistory() { return [...history]; }
    };
}

const logger = createLogger('APP');
logger.log('inicio');
logger.log('usuario conectado');
console.log(logger.getHistory()); // ['inicio', 'usuario conectado']


// --- THIS ---
// this refiere al objeto "dueño" del contexto de ejecución actual.
// Su valor depende de CÓMO se llama la función, no de dónde está definida.
// Excepción: arrow functions (ver abajo).

// En un método: this = el objeto antes del punto
const person = {
    name: 'Matias',
    greet() {
        console.log(`Hola, soy ${this.name}`);
    }
};
person.greet(); // "Hola, soy Matias" — this = person

// Perdiendo el this (error muy común):
const fn = person.greet;
// fn(); // this = undefined (strict mode) o global (non-strict)

// Arrow functions: this es LÉXICO — hereda el this del contexto donde
// fue DEFINIDA. No tienen su propio this, nunca.

const team = {
    name: 'Dev Team',
    members: ['Ana', 'Luis', 'Matias'],

    printMembers() {
        // this = team ✓
        this.members.forEach(member => {
            // arrow hereda el this del método → sigue siendo team ✓
            console.log(`${member} → ${this.name}`);
        });
    },

    printMembersBroken() {
        this.members.forEach(function(member) {
            // función normal → pierde el this del método
            // console.log(this.name); // undefined en strict, 'global' en non-strict
        });
    }
};
team.printMembers();


// --- call, apply, bind ---
// Permiten controlar manualmente qué valor tiene this.

function introduce(greeting, punctuation) {
    console.log(`${greeting}, soy ${this.name}${punctuation}`);
}

const user = { name: 'Carlos' };

// call: llama inmediatamente. Args individuales.
introduce.call(user, 'Hola', '!');    // "Hola, soy Carlos!"

// apply: llama inmediatamente. Args como array.
introduce.apply(user, ['Hey', '...']); // "Hey, soy Carlos..."

// bind: NO llama. Devuelve una nueva función con this fijo.
const boundIntroduce = introduce.bind(user);
boundIntroduce('Buenas', '?');         // "Buenas, soy Carlos?"

// bind también fija argumentos parcialmente:
const formalIntroduce = introduce.bind(user, 'Buenos días');
formalIntroduce('.');                  // "Buenos días, soy Carlos."
