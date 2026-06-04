// Promagacion asincrona

// codigo sincrono

console.log("inicio");
for (let i = 0; i < 5; i++) {
    console.log(i);
}
console.log("fin");


// event loop (bucle de eventos) --> es un mecanismo que permite a JavaScript manejar múltiples tareas de manera eficiente sin bloquear el hilo principal de ejecución.

// Componentes del event loop:

// - Call stack (pila de llamadas) --> es una estructura de datos que almacena las funciones que se están ejecutando en un momento dado. Cuando una función es llamada, se agrega a la pila de llamadas y cuando la función termina, se elimina de la pila.

// - Task queue (cola de tareas) --> es una estructura de datos que almacena las tareas que están esperando para ser ejecutadas. Cuando el call stack está vacío, el event loop toma la primera tarea de la task queue y la ejecuta.

// - Web APIs --> son APIs proporcionadas por el navegador que permiten a JavaScript interactuar con el entorno del navegador, como el DOM, el almacenamiento local, las solicitudes HTTP, etc. Cuando una tarea es ejecutada por una Web API, se agrega a la task queue para ser ejecutada cuando el call stack esté vacío.

// Flujo del event loop:

// 1. El código sincrono se ejecuta en el call stack.
// 2. Cuando se encuentra una tarea asincrona, se delega a una Web API o Node.js para su ejecución.
// 3. Una vez que la tarea asincrona ha terminado, se agrega a la task queue.
// 4. El event loop verifica si el call stack está vacío y si hay tareas en la task queue. Si es así, toma la primera tarea de la task queue y la ejecuta en el call stack.
// 5. Este proceso se repite hasta que no haya más tareas en la task queue.

// callbacks --> es una función que se pasa como argumento a otra función y se ejecuta después de que la tarea asincrona ha terminado.

// setTimeout --> es una función que se utiliza para ejecutar una función después de un cierto tiempo.

setTimeout(() => {
    console.log("Tarea asincrona ejecutada después de 2 segundos");
}, 2000);

// Problema del callback hell --> es una situación en la que se tienen múltiples callbacks anidados, lo que puede hacer que el código sea difícil de leer y mantener.

function step1(callback) {
    setTimeout(() => {
        console.log("Paso 1 completado");
        callback();
    }, 1000);
}

function step2(callback) {
    setTimeout(() => {
        console.log("Paso 2 completado");
        callback();
    }, 1000);
}

function step3(callback) {
    setTimeout(() => {
        console.log("Paso 3 completado");
        callback();
    }, 1000);
}

step1(() => {
    step2(() => {
        step3(() => {
            console.log("Todos los pasos completados");
        });
    });
});


// Promesas --> es un objeto que representa la eventual finalización o fracaso de una operación asincrona y su valor resultante. Las promesas tienen tres estados: pendiente, cumplida y rechazada.

const promise = new Promise((resolve, reject) => {
 setTimeout(() => {
    const ok = true; // Simulamos una operación asincrona que puede tener éxito o fracaso
    if (ok) {
        resolve("La operación asincrona se ha completado con éxito");
    } else {
        reject("La operación asincrona ha fallado");
    }
 }, 4000);
})

promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log("La promesa ha sido resuelta o rechazada");
    });

// Encadenamiento de promesas --> es una técnica que permite ejecutar múltiples operaciones asincronas de manera secuencial, donde cada operación depende del resultado de la operación anterior.

function stepOne() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Paso One completado");
            resolve();
        }, 1000);
    });
}

function stepTwo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Paso Two completado");
            resolve();
        }, 1000);
    });
}

function stepThree() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Paso Three completado");
            resolve();
        }, 1000);
    });
}

stepOne()
    .then(() => stepTwo())
    .then(() => stepThree())
    .then(() => {
        console.log("Todos los pasos letrados completados");
    })
    .catch(error => {
        console.error(error);
    });     

// Async/Await --> es una sintaxis que permite escribir código asincrono de manera más legible y fácil de entender, utilizando palabras clave como async y await.async es una palabra clave que se utiliza para declarar una función asincrona, mientras que await se utiliza para esperar a que una promesa se resuelva o rechace antes de continuar con la ejecución del código.


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function process(){
    console.log("Proceso iniciado");
    await wait(2000);
    console.log("Proceso completado después de 2 segundos");
}

process();