// API -> Application Programming Interface 

// Las APIs son un conjunto de reglas y protocolos que permiten que diferentes aplicaciones se comuniquen entre sí.

// es un contrato para que dos sistemas puedan interactuar, definiendo cómo se deben solicitar los datos y cómo se deben entregar.                                       
// Las APIs pueden ser públicas (disponibles para cualquier desarrollador) o privadas (limitadas a ciertos usuarios o aplicaciones).

// Manejo de APIs

// APIs REST son las que utilizan el protocolo HTTP para realizar operaciones CRUD (Create, Read, Update, Delete) sobre recursos. Suelen usar JSON como formato de intercambio de datos y URL para identificar los recursos. No importan el lenguaje de programación o la plataforma, siempre que se sigan las reglas del protocolo HTTP.

// Metodos HTTP

// Los mas comunes son GET (obtener datos), POST (crear nuevos datos), PUT (actualizar datos existentes) y DELETE (eliminar datos).

// Codigos de respuesta HTTP
// Los mas comunes son:
// 200 OK: La solicitud se ha procesado correctamente.
// 201 Created: La solicitud se ha procesado correctamente y se ha creado un nuevo recurso.
// 400 Bad Request: La solicitud no se ha podido procesar debido a un error del cliente (por ejemplo, datos inválidos).
// 401 Unauthorized: La solicitud requiere autenticación o la autenticación ha fallado.
// 403 Forbidden: El servidor ha entendido la solicitud, pero se niega a autorizarla.
// 404 Not Found: El recurso solicitado no se ha encontrado en el servidor.
// 500 Internal Server Error: El servidor ha encontrado un error inesperado que le impide cumplir con la solicitud.
// 503 Service Unavailable: El servidor no está disponible temporalmente, generalmente debido a mantenimiento o sobrecarga.

// El rango de los 200 son respuestas exitosas, los 400 son errores del cliente y los 500 son errores del servidor.


// Consumos de APIs

// Fetch es una función nativa de JavaScript que se utiliza para realizar solicitudes HTTP a servidores web. Permite enviar solicitudes y recibir respuestas de manera asíncrona, lo que significa que el código puede continuar ejecutándose mientras se espera la respuesta del servidor. Devuelve una promesa que se resuelve con la respuesta de la solicitud, lo que facilita el manejo de datos y errores de manera eficiente. Es comúnmente utilizado para interactuar con APIs RESTful y obtener datos en formato JSON.

// Vamos a usar la API de JSONPlaceholder, que es una API de prueba que proporciona datos ficticios para realizar pruebas y prototipos. Nos permite hacer solicitudes GET, POST, PUT y DELETE a diferentes recursos como posts, comments, albums, photos, etc.

fetch('https://jsonplaceholder.typicode.com/posts/1')
.then(res => {
    return res.json(); // convierte la respuesta a formato JSON
})
.then(data => {
    console.log(data);
})
.catch(err => {
    console.error('Error:', err);
})
.finally(() => {
    console.log('Solicitud finalizada');
});


// También podemos usar async/await para manejar las promesas de manera más legible:

async function getPost(){

    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error('Error:', err);
    }
}

getPost();

// Solicitud POST


async function createPost(){

    try {

        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error('Error:', err);
    }
}

createPost();