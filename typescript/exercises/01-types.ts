// ============================================================
// EJERCICIOS
// ============================================================

// 1. Definí un type alias "Product" con:
//    - id: number
//    - name: string
//    - category: 'electronics' | 'clothing' | 'food' | 'books'
//    - price: number
//    - inStock: boolean (opcional, default true)
//    Escribí una función "describeProduct" que reciba Product
//    y devuelva un string descriptivo.
// Tu código acá:

type Product = {
    id: number
    name: string
    category: 'electronics' | 'clothing' | 'food' | 'books'
    price: number
    inStock?: boolean
}

function describeProduct(product: Product): string{
    const stock = product.inStock ?? true
    return `El ${product.name}, tiene ID:${product.id}, su categoria es ${product.category} con precio:${product.price} y ${stock ? 'Tiene stock' : "No tiene stock"}`;      
}

console.log( describeProduct({name: 'Heladera', id: 123, category: "electronics", price: 120000, inStock: true}));



// 2. Escribí una función "parseValue" que reciba string | number | boolean
//    y devuelva siempre un string:
//    - string → en mayúsculas
//    - number → con 2 decimales ("3.14")
//    - boolean → "sí" o "no"
// Tu código acá:

function parseValue(value: string | number | boolean): string{
    if(typeof value === 'string'){
        return value.toUpperCase()
    }else if(typeof value === 'number'){
        return value.toFixed(2)
    }else if(typeof value === 'boolean'){
        if(value === true){
            return "Si"
        }else{
            return "No"
        }
    }else{
        return "Formato invalido"
    }
}

console.log(parseValue(5));
// mejor resuelto

// function parseValue(value: string | number | boolean): string {
//     if (typeof value === "string") {
//         return value.toUpperCase()
//     }

//     if (typeof value === "number") {
//         return value.toFixed(2)
//     }

//     return value ? "Sí" : "No"
// }



// 3. Definí un type "ApiConfig" con: url (string), method (HttpMethod),
//    timeout (number, opcional), headers (Record<string, string>, opcional).
//    Escribí una función "logRequest" que reciba ApiConfig y loguee la petición.
// Tu código acá:

type HttpMethod =  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type ApiConfig = {
    url: string
    method: HttpMethod
    timeout?: number
    headers?: Record<string, string>
}

function logRequest(apiConfig: ApiConfig): void{
    console.log(    `URL: ${apiConfig.url} \n method: ${apiConfig.method} \n timeout: ${apiConfig.timeout ? apiConfig.timeout : 0} \n headers: \n ${apiConfig.headers ? Object.entries(apiConfig.headers).map(([key, value]) => {return `${key}: ${value}`}).join('\n')
    : "Sin headers"}`);
}

logRequest({
    url: "https://api.myapp.com/users",
    method: "GET",
    timeout: 5000,
    headers: {
        Authorization: "Bearer abc123xyz",
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})


export {}
