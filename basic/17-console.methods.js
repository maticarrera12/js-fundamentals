// console es un objeto global que proporciona acceso a la consola de depuración del navegador o del entorno de ejecución (como Node.js).

// Métodos de console

// console.log() es el método más comúnmente utilizado para imprimir mensajes en la consola. Se puede usar para mostrar información, depurar código o simplemente para verificar el valor de una variable.

console.log("Hola, mundo!");
console.log("El valor de x es:", 42);

// console.error() se utiliza para imprimir mensajes de error en la consola. Es útil para destacar errores o problemas en el código.

console.error("Este es un mensaje de error");

console.error("Se ha producido un error", new Error("Error de ejemplo"));

// console.warn() se utiliza para imprimir mensajes de advertencia en la consola. Es útil para señalar posibles problemas o situaciones que podrían requerir atención.

console.warn("Este es un mensaje de advertencia");

// console.info() se utiliza para imprimir mensajes informativos en la consola. Es útil para proporcionar información adicional o detalles sobre el estado del programa.

console.info("Este es un mensaje informativo");

// console.table() se utiliza para mostrar datos tabulares en la consola. Es útil para visualizar arrays o objetos de manera más legible.

const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

console.table(users);

// con clave valor

const user = { name: "Alice", age: 30, email: "alice@example.com" };
console.table(user);

// group y groupEnd se utilizan para agrupar mensajes relacionados en la consola. Esto puede ayudar a organizar la salida y hacerla más legible.
console.group("Información del usuario");
console.log("Nombre:", user.name);
console.log("Edad:", user.age);
console.log("Email:", user.email);
console.groupEnd();
console.log("Este mensaje no está dentro del grupo");

// console.time() y console.timeEnd() se utilizan para medir el tiempo que tarda en ejecutarse un bloque de código. Esto es útil para identificar cuellos de botella o mejorar el rendimiento.

console.time("Tiempo de ejecución");
for (let i = 0; i < 10000; i++) {
  // Simulación de una tarea que consume tiempo
}
console.timeEnd("Tiempo de ejecución"); //  se usa el mismo texto para identificar el bloque de código que se está midiendo

// assert se utiliza para realizar afirmaciones en el código. Si la afirmación es falsa, se imprimirá un mensaje de error en la consola.

console.assert(1 === 1, "Esto no se mostrará porque la afirmación es verdadera");
console.assert(1 === 2, "Esto se mostrará porque la afirmación es falsa");

// count se utiliza para contar el número de veces que se ha llamado a un bloque de código específico. Es útil para rastrear la frecuencia de eventos o acciones.

function myFunction() {
  console.count("myFunction ha sido llamada");
  // Código de la función
}

myFunction();
myFunction();
myFunction();
console.countReset("myFunction ha sido llamada"); // Reinicia el contador para "myFunction ha sido llamada"
myFunction();

// trace se utiliza para imprimir una traza de pila en la consola. Esto es útil para depurar y entender el flujo de ejecución del código.

function functionA() {
  functionB();
}
function functionB() {
  functionC();
}
function functionC() {
  console.trace("Traza de pila");
}

functionA();

 // clear se utiliza para limpiar la consola. Esto es útil para eliminar mensajes anteriores y comenzar con una consola limpia.


// console.clear(); 