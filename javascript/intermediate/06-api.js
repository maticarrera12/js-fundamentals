// ============================================================
// 06 - CONSUMO DE APIs
// ============================================================
// Una API REST es un contrato: define cómo dos sistemas intercambian datos.
// Fetch es la herramienta nativa para hacer esas peticiones desde JS.
// Este archivo cubre el ciclo completo: GET, POST, PUT/PATCH, DELETE,
// manejo de errores y autenticación.
// ============================================================


// --- Conceptos base ---
//
// API REST: usa HTTP como protocolo, JSON como formato, URLs como identificadores.
//
// Métodos HTTP:
//   GET    → leer un recurso (sin body)
//   POST   → crear un recurso nuevo
//   PUT    → reemplazar un recurso completo
//   PATCH  → actualizar parcialmente un recurso
//   DELETE → eliminar un recurso
//
// Códigos de respuesta:
//   2xx → éxito       (200 OK, 201 Created, 204 No Content)
//   3xx → redirección
//   4xx → error del cliente (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
//   5xx → error del servidor (500 Internal, 503 Unavailable)
//
// IMPORTANTE: fetch() solo rechaza la Promesa por errores de RED.
// Un 404 o 500 NO es un error de fetch — el código resuelve con res.ok = false.
// Siempre chequeá res.ok antes de leer el body.


// --- GET con .then ---
// La forma más simple. Para leer, no hace falta configurar nada.

fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()  // res.json() devuelve otra Promise
    })
    .then(post => console.log('Post:', post))
    .catch(err => console.error('Error:', err.message))
    .finally(() => console.log('Petición finalizada'))


// --- GET con async/await ---
// Más legible para múltiples operaciones secuenciales.

async function getPost(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return await res.json()
    } catch (err) {
        console.error('Error al obtener post:', err.message)
        return null
    }
}


// --- POST: crear un recurso ---
// Siempre especificá method, Content-Type y body serializado con JSON.stringify.

async function createPost(title, body, userId) {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body, userId })
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const newPost = await res.json()
        console.log('Post creado:', newPost)
        return newPost
    } catch (err) {
        console.error('Error al crear post:', err.message)
    }
}


// --- PUT y PATCH: actualizar ---
// PUT reemplaza el recurso completo — enviás todo el objeto.
// PATCH actualiza solo los campos que mandás.

async function updatePostTitle(id, newTitle) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return await res.json()
    } catch (err) {
        console.error('Error al actualizar:', err.message)
    }
}


// --- DELETE ---

async function deletePost(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        console.log(`Post ${id} eliminado`)
        return true
    } catch (err) {
        console.error('Error al eliminar:', err.message)
        return false
    }
}


// --- Cliente HTTP reutilizable ---
// En vez de repetir el boilerplate en cada llamada, encapsulalo.

class ApiClient {
    #baseUrl
    #defaultHeaders

    constructor(baseUrl, headers = {}) {
        this.#baseUrl = baseUrl
        this.#defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers
        }
    }

    async #request(path, options = {}) {
        const res = await fetch(`${this.#baseUrl}${path}`, {
            ...options,
            headers: { ...this.#defaultHeaders, ...options.headers }
        })

        if (!res.ok) {
            const error = new Error(`HTTP ${res.status}: ${res.statusText}`)
            error.status = res.status
            throw error
        }

        // 204 No Content — no hay body que parsear
        if (res.status === 204) return null
        return res.json()
    }

    get(path)              { return this.#request(path) }
    post(path, data)       { return this.#request(path, { method: 'POST',  body: JSON.stringify(data) }) }
    put(path, data)        { return this.#request(path, { method: 'PUT',   body: JSON.stringify(data) }) }
    patch(path, data)      { return this.#request(path, { method: 'PATCH', body: JSON.stringify(data) }) }
    delete(path)           { return this.#request(path, { method: 'DELETE' }) }
}

const api = new ApiClient('https://jsonplaceholder.typicode.com')
// api.get('/posts/1').then(console.log)


// --- Autenticación ---
// La mayoría de las APIs reales requieren algún tipo de credencial en el header.

// API Key: se pasa en la cabecera como header personalizado o como query param
async function getWithApiKey(endpoint) {
    const API_KEY = process.env.MY_API_KEY  // NUNCA hardcodees una key real en el código
    try {
        const res = await fetch(endpoint, {
            headers: { 'X-API-Key': API_KEY }
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return await res.json()
    } catch (err) {
        console.error('Error:', err.message)
    }
}

// Bearer token (OAuth / JWT): se pasa en el header Authorization
async function getWithBearerToken(endpoint, token) {
    const res = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

// JWT (JSON Web Token): es un token firmado que contiene claims.
// Formato: header.payload.signature (codificado en base64)
// Se usa exactamente igual que un Bearer token — la diferencia es interna al servidor.


// --- Versionado de APIs ---
// Las APIs se versionan para que los clientes puedan migrar gradualmente.
// Formato más común: prefijo en la URL.

// v1: https://api.example.com/v1/users
// v2: https://api.example.com/v2/users  ← puede tener una estructura diferente

const v1 = new ApiClient('https://api.example.com/v1')
const v2 = new ApiClient('https://api.example.com/v2')


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
