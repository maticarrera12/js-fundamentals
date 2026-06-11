// ============================================================
// 08 - UTILITY TYPES
// ============================================================
// TypeScript trae tipos utilitarios built-in para derivar
// nuevos tipos a partir de tipos existentes. Son transformaciones
// comunes que de otra forma harías a mano (y con más chance de error).
//
// Ya usaste ReturnType en 02-inference. Acá vemos el panorama completo.
// ============================================================

interface User {
    id: number
    name: string
    email: string
    age: number
}


// --- Partial<T> ---
// Hace todos los campos opcionales.
// Caso de uso típico: payload de una operación UPDATE donde
// solo enviás los campos que cambiaron.

type PartialUser = Partial<User>
// { id?: number; name?: string; email?: string; age?: number }

function updateUser(id: number, fields: Partial<User>) {
    console.log(`Updating user ${id}`, fields)
}
updateUser(1, { name: 'Carlos' })       // ok — solo name
updateUser(1, { age: 30, email: 'x@x' }) // ok — age y email


// --- Required<T> ---
// Lo contrario: hace todos los campos obligatorios.
// Útil cuando sabés que después de cierto proceso todos existen.

interface Config {
    host?: string
    port?: number
    timeout?: number
}

type StrictConfig = Required<Config>
// { host: string; port: number; timeout: number } — sin opcionales


// --- Readonly<T> ---
// Todos los campos pasan a ser de solo lectura (no se pueden reasignar).
// Útil para objetos de configuración o valores que no deben mutar.

type ReadonlyUser = Readonly<User>

const readonlyUser: ReadonlyUser = { id: 1, name: 'Matias', email: 'x', age: 25 }
// readonlyUser.name = 'Carlos'  ❌ error: no se puede modificar


// --- Pick<T, K> ---
// Crea un tipo nuevo con SOLO las keys que especificás.
// Ideal para proyecciones: cuando la API devuelve menos campos.

type UserPreview = Pick<User, 'id' | 'name'>
// { id: number; name: string }

function toUserPreview(user: User): UserPreview {
    return { id: user.id, name: user.name }
}


// --- Omit<T, K> ---
// Lo contrario de Pick: excluye las keys que especificás.
// Ideal para DTOs de creación (sin id, porque lo genera el backend).

type CreateUserDTO = Omit<User, 'id'>
// { name: string; email: string; age: number }

function createUserDTO(data: CreateUserDTO): User {
    return { ...data, id: Math.floor(Math.random() * 10000) }
}


// --- Record<K, V> ---
// Crea un tipo de objeto donde las keys son K y los valores V.
// Reemplaza al index signature [key: string]: Value cuando las
// keys son un conjunto acotado conocido.

type Role = 'admin' | 'editor' | 'viewer'

type PermissionsByRole = Record<Role, string[]>

const permissions: PermissionsByRole = {
    admin:  ['read', 'write', 'delete'],
    editor: ['read', 'write'],
    viewer: ['read'],
}
// Si olvidás algún role, TS te avisa.
// permissions.superuser  ← error: 'superuser' no existe en Role


// --- ReturnType<T> ---
// Extrae el tipo de retorno de una función.
// Útil cuando no querés definir el tipo manualmente pero sí usarlo.

function createSession(userId: number) {
    return {
        userId,
        token: crypto.randomUUID(),
        expiresAt: new Date()
    }
}

type Session = ReturnType<typeof createSession>
// { userId: number; token: string; expiresAt: Date }
// Si la función cambia, Session se actualiza automáticamente.


// --- Parameters<T> ---
// Extrae los tipos de los parámetros como una tupla.
// Útil para wrappers que necesitan los mismos parámetros que otra función.

function login(email: string, password: string, rememberMe: boolean): void {
    console.log(`Login: ${email}`)
}

type LoginParams = Parameters<typeof login>
// [email: string, password: string, rememberMe: boolean]

function loginWithAudit(...args: LoginParams): void {
    console.log('Audit: login attempt')
    login(...args)
}


// --- NonNullable<T> ---
// Quita null y undefined del tipo.

type MaybeString = string | null | undefined
type DefinitelyString = NonNullable<MaybeString>
// string


// ============================================================
// EJERCICIOS
// ============================================================

// Usá este tipo base para todos los ejercicios:
interface Product {
    id: number
    name: string
    price: number
    description: string
    inStock: boolean
}

// 1. Usando Omit y Required, creá un tipo "CreateProductDTO":
//    sin id, con todos los campos obligatorios EXCEPTO description
//    (que debe ser opcional).
//    Tip: vas a necesitar combinar Omit + Partial o intersection types.
// Tu código acá:


// 2. Usando Pick, creá "ProductSummary" con id, name y price.
//    Escribí una función "toProductSummary" que convierta Product → ProductSummary.
//    Luego usala para mapear un Product[] → ProductSummary[].
// Tu código acá:


// 3. Usando Record, creá un tipo "ProductStore" que mapee
//    id (string) → Product. Escribí dos funciones:
//    - addProduct(store: ProductStore, product: Product): ProductStore
//    - getProduct(store: ProductStore, id: string): Product | undefined
// Tu código acá:


// 4. Usando ReturnType, extraé el tipo de retorno de fetchProduct
//    y usalo para tipar el resultado de una función que procesa ese valor.
function fetchProduct() {
    return {
        id: 1,
        name: 'Zapatillas',
        price: 99.99,
        currency: 'USD' as const,
    }
}
// Tu código acá:

export {}
