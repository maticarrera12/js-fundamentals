// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

interface Account {
    id: number
    owner: string
    balance: number
    notes?: string
}

// C1. Pick. Escribí "AccountPreview" con SOLO "id" y "owner".
//     Esperado: { id: number; owner: string }
// Tu código acá:

type AccountPreview = Pick<Account, "id" | "owner">


// C2. Omit. Escribí "AccountWithoutBalance" que sea Account
//     sin la key "balance".
//     Esperado: { id: number; owner: string; notes?: string }
// Tu código acá:

type AccountWithoutBalance = Omit<Account, "balance">


// C3. Partial y Required. Escribí "PartialAccount" (Account con
//     todos los campos opcionales) y "StrictAccount" (Account
//     con todos los campos obligatorios, incluido "notes").
// Tu código acá:

type PartialAccount = Partial<Account>
type StrictAccount = Required<Account>


// C4. Record + ReturnType. Escribí "AccountsById", un Record
//     que mapee id (number) → Account. Después escribí una
//     función "createAccount" que devuelva un objeto Account
//     literal, y extraé su tipo de retorno con ReturnType en
//     un type "NewAccount".
// Tu código acá:

type AccountById = Record<number, Account>

function createAccount(): Account{
    return { id: 12,
    owner: 'matias',
    balance: 100,
}
}

type NewAccount = ReturnType<typeof createAccount>


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

type CreateProductDTO = Omit<Required<Product>, 'id'>



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
