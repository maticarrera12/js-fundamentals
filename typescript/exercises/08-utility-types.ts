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
