// ============================================================
// 21 - JSON
// ============================================================
// JSON (JavaScript Object Notation) es el formato estándar
// para intercambiar datos en la web. Es texto plano que
// representa estructuras de datos.
// Lo vas a usar en cada proyecto que haga comunicación con APIs.
// ============================================================


// --- JSON.stringify ---
// Convierte un valor JavaScript a string JSON.

const user = {
    id: 1,
    name: 'Matias',
    age: 25,
    active: true,
    address: { city: 'Buenos Aires', zip: '1234' },
    tags: ['dev', 'js']
};

const json = JSON.stringify(user);
console.log(json);         // string compacto
console.log(typeof json);  // 'string'

// JSON.stringify ignora silenciosamente:
const withExtras = {
    name: 'Matias',
    fn: () => 'hola',  // funciones  → ignoradas
    sym: Symbol('x'),  // symbols    → ignorados
    undef: undefined,  // undefined  → ignorado
    age: 25
};
console.log(JSON.stringify(withExtras)); // '{"name":"Matias","age":25}'

// Segundo parámetro — replacer: qué propiedades incluir
const filtered = JSON.stringify(user, ['id', 'name']);
console.log(filtered); // '{"id":1,"name":"Matias"}'

// Tercer parámetro — indentación: para legibilidad
const pretty = JSON.stringify(user, null, 2);
console.log(pretty);
// {
//   "id": 1,
//   "name": "Matias",
//   ...
// }


// --- JSON.parse ---
// Convierte un string JSON de vuelta a un valor JavaScript.

const parsed = JSON.parse(json);
console.log(parsed.name);   // 'Matias'
console.log(typeof parsed); // 'object'

// Segundo parámetro — reviver: transformar valores al parsear
const withDates = '{"name":"Matias","createdAt":"2024-01-15T10:00:00.000Z"}';
const parsedWithDate = JSON.parse(withDates, (key, value) => {
    if (key === 'createdAt') return new Date(value);
    return value;
});
console.log(parsedWithDate.createdAt instanceof Date); // true


// --- Siempre manejá errores al parsear ---
// JSON.parse lanza SyntaxError si el string no es JSON válido.

function safeJsonParse(text) {
    try {
        return { data: JSON.parse(text), error: null };
    } catch (e) {
        return { data: null, error: e.message };
    }
}

console.log(safeJsonParse('{"valid": true}')); // { data: { valid: true }, error: null }
console.log(safeJsonParse('esto no es json')); // { data: null, error: '...' }


// --- toJSON ---
// Si un objeto tiene un método toJSON(), stringify lo usa
// para determinar qué se serializa. Útil para controlar la exposición de datos.

class Product {
    constructor(id, name, price, _internalCode) {
        this.id = id;
        this.name = name;
        this.price = price;
        this._internalCode = _internalCode;
    }

    toJSON() {
        // _internalCode no se incluye — no queremos exponerlo
        return { id: this.id, name: this.name, price: this.price };
    }
}

const product = new Product(1, 'Zapatillas', 99.99, 'SKU-XYZ');
console.log(JSON.stringify(product)); // no incluye _internalCode


// --- structuredClone ---
// La forma correcta de hacer deep clone en JS moderno.
// El truco JSON.parse(JSON.stringify(x)) tiene limitaciones: pierde Date, Map, Set, etc.

const original = {
    name: 'Matias',
    scores: [1, 2, 3],
    date: new Date()
};

// ❌ Forma vieja — Date se convierte a string
const badClone = JSON.parse(JSON.stringify(original));
console.log(badClone.date instanceof Date); // false — quedó como string

// ✅ Forma moderna
const goodClone = structuredClone(original);
goodClone.scores.push(99);
console.log(goodClone.date instanceof Date); // true
console.log(original.scores);               // [1, 2, 3] — no se modificó
