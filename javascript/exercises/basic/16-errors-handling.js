// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una clase "HttpError" que extienda Error con:
//    - statusCode (number)
//    - isClientError() → true si statusCode es 4xx
//    - isServerError() → true si statusCode es 5xx
//    Usala en una función "handleResponse(statusCode)" que lance
//    HttpError para 4xx y 5xx, y devuelva 'ok' para 2xx.
// Tu código acá:


// 2. Escribí una función "safeJSON(str)" que intente parsear un string
//    como JSON y devuelva { ok: true, data } si funciona
//    o { ok: false, error: message } si falla.
//    No debe lanzar nunca — el error queda en el objeto de resultado.
// Tu código acá:
