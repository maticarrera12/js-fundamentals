// son datos inmutables, representan un solo valor, no se pueden cambiar, no tienen métodos, se pueden comparar con ===, se pueden concatenar con +, se pueden convertir a otros tipos de datos con funciones como Number(), String(), Boolean(), etc.

// string --> cadena de caracteres, se pueden usar comillas simples, dobles o backticks, se pueden concatenar con +, se pueden usar plantillas literales con backticks y ${} para insertar variables o expresiones
let myString = "Hello World";
console.log(myString);

// number --> números enteros o decimales, se pueden usar operadores aritméticos como +, -, *, /, %, **, etc., se pueden convertir a otros tipos de datos con funciones como String(), Boolean(), etc.
let myNumber = 4;
let myDecimal = 3.14;
console.log(myNumber);
console.log(myDecimal);

// boolean --> valores de verdad, pueden ser true o false, se pueden usar operadores lógicos como &&, ||, !, etc., se pueden convertir a otros tipos de datos con funciones como String(), Number() etc.
let myBoolean = true;
console.log(myBoolean);

// null --> valor nulo, representa la ausencia de valor, se puede usar para indicar que una variable no tiene un valor asignado, se puede comparar con ===.
let myNull = null;
console.log(myNull);

// undefined --> valor indefinido, representa una variable que ha sido declarada pero no se le ha asignado un valor, se puede comparar con ===.
let myUndefined;
console.log(myUndefined);

// symbol --> valor único e inmutable, se puede usar para crear identificadores únicos, no se pueden comparar con ===, se pueden convertir a string con String() o toString(), pero no se pueden convertir a otros tipos de datos.
let mySymbol = Symbol("mySymbol");
console.log(mySymbol);

// bigInt --> números enteros grandes, se pueden usar para representar números que exceden el límite de los números normales, se pueden usar operadores aritméticos como +, -, *, /, %, **, etc., se pueden convertir a otros tipos de datos con funciones como String(), Boolean(), etc.
let myBigInt = 9007199254740991n;
console.log(myBigInt);
let myBigInt2 = BigInt("9007199254740991");
console.log(myBigInt2);
