// ============================================================
// 07 - REGULAR EXPRESSIONS (REGEX)
// ============================================================
// Las expresiones regulares son patrones para buscar, validar
// y transformar texto. Están en todos los lenguajes — es una
// habilidad transferible muy valiosa.
// ============================================================

// Dos formas de crear una regex:
const literal  = /hello/i;              // literal — la más común
const dynamic  = new RegExp('hello', 'i'); // constructor — cuando el patrón es una variable

// Flags:
// g — global: busca TODAS las coincidencias, no solo la primera
// i — case insensitive: ignora mayúsculas/minúsculas
// m — multiline: ^ y $ matchean inicio/fin de cada LÍNEA


// --- test y match ---

console.log(/hello/i.test('Hello World')); // true
console.log(/hello/i.test('goodbye'));     // false

const str = 'Hello hello HELLO';
console.log(str.match(/hello/gi)); // ['Hello', 'hello', 'HELLO']


// --- Caracteres especiales ---

// .   → cualquier carácter excepto newline
// \d  → dígito [0-9]
// \w  → carácter de palabra [a-zA-Z0-9_]
// \s  → espacio en blanco (space, tab, newline)
// \D, \W, \S → inversos de los anteriores

// ^  → inicio del string
// $  → fin del string

console.log(/^\d+$/.test('12345'));  // true  — solo dígitos, nada más
console.log(/^\d+$/.test('123ab')); // false — tiene letras


// --- Cuantificadores ---
// *     → 0 o más
// +     → 1 o más
// ?     → 0 o 1 (opcional)
// {n}   → exactamente n
// {n,}  → n o más
// {n,m} → entre n y m

console.log(/colou?r/.test('color'));   // true — u es opcional
console.log(/colou?r/.test('colour')); // true

// Greedy (por defecto) vs Lazy (con ?):
// greedy toma todo lo que puede, lazy toma lo mínimo posible

const html = '<b>texto en negrita</b> y <i>cursiva</i>';
console.log(html.match(/<.+>/)[0]);   // '<b>texto en negrita</b> y <i>cursiva</i>' — greedy
console.log(html.match(/<.+?>/)[0]);  // '<b>'                                       — lazy


// --- Grupos y captura ---

const dateStr = '2024-01-15';

// grupos posicionales con ()
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
if (dateMatch) {
    const [, year, month, day] = dateMatch; // índice 0 es el match completo
    console.log(year, month, day); // '2024' '01' '15'
}

// grupos con nombre (?<nombre>...) — más legible y robusto
const named = dateStr.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(named?.groups); // { year: '2024', month: '01', day: '15' }


// --- replace con regex ---

const text = 'Hola Mundo hola mundo';
console.log(text.replace(/hola/gi, 'Hey')); // 'Hey Mundo Hey mundo'

// con función como reemplazo — muy poderoso:
const kebab = 'background-color';
const camel = kebab.replace(/-(\w)/g, (_, char) => char.toUpperCase());
console.log(camel); // 'backgroundColor'


// --- split con regex ---

const csv = 'uno,dos,,tres,  cuatro';
console.log(csv.split(/,\s*/)); // ['uno', 'dos', '', 'tres', 'cuatro']


// --- matchAll ---
// Devuelve un iterador con todos los matches, incluyendo grupos de captura.
// Requiere flag g.

const emails = 'dev: dev@mail.com, admin: admin@site.org';
const emailRegex = /(\w+)@([\w.]+)/g;

for (const match of emails.matchAll(emailRegex)) {
    console.log('email completo:', match[0]);
    console.log('usuario:', match[1]);
    console.log('dominio:', match[2]);
}


// --- Casos de uso comunes ---

// Validar email (simplificado — un regex de email completo es monstruoso):
const isValidEmail = (email) => /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email);
console.log(isValidEmail('user@example.com')); // true
console.log(isValidEmail('no-es-email'));       // false

// Extraer hashtags:
const tweet = 'Aprendiendo #JavaScript y #TypeScript hoy';
console.log(tweet.match(/#\w+/g)); // ['#JavaScript', '#TypeScript']

// Validar contraseña (mínimo 8 chars, una mayúscula, un número):
const isStrongPassword = (pwd) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
console.log(isStrongPassword('debil'));       // false
console.log(isStrongPassword('Fuerte123'));   // true

// Sanitizar input — remover HTML tags:
const dirty = '<script>alert("xss")</script>Hola';
const clean = dirty.replace(/<[^>]*>/g, '');
console.log(clean); // 'Hola'
