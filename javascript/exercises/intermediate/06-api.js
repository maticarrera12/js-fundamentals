// ============================================================
// EJERCICIOS
// ============================================================

// 1. Usando la ApiClient de arriba (o tu propia versión), hacé un CRUD
//    completo sobre https://jsonplaceholder.typicode.com/todos:
//    - GET  /todos/1        → obtener un todo
//    - POST /todos          → crear uno nuevo con title y completed
//    - PATCH /todos/1       → marcar como completado
//    - DELETE /todos/1      → eliminar
// Tu código acá:


// 2. Extendé ApiClient para que acepte un interceptor de errores:
//    new ApiClient(url, { onError: (err) => ... })
//    El interceptor se llama en vez del throw cuando hay un error HTTP.
//    Implementá también un retry automático de hasta 3 veces para errores 5xx.
// Tu código acá:


// 3. Hacé una función "fetchAll(ids)" que reciba un array de IDs,
//    los consulte en paralelo a /posts/{id}, y devuelva los resultados
//    en el MISMO ORDEN que los IDs originales (Promise.all preserva el orden).
//    Si alguno falla, que el resultado de ese ID sea null en vez de romper todo.
// Tu código acá:
