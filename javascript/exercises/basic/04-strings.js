

// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado: 
const title = 'Hola Mundo Esto Es JS'
//    Convertilo a "slug" de URL e imprimí el resultado:
//    minúsculas y espacios reemplazados por '-' → "hola-mundo-esto-es-js"
//    (Tip: .toLowerCase() y .replaceAll(' ', '-'))
// Tu código acá:
console.log(title.toLowerCase().replaceAll(' ', '-'));



// 2. Dado: 
const text = 'Este texto es bastante largo'
const maxLength = 10
const dots = '...' // esto lo agregue yo para resolverlo
//    Si text supera maxLength caracteres, imprimí los primeros maxLength
//    seguidos de '...'. Si no, imprimí text tal cual.
//    (Tip: .length, .slice() y el operador ternario)
// Tu código acá:

let result = text.length > maxLength ? text.slice(0, maxLength).concat(dots) : text

console.log(result);



// 3. Dado: 
const data = 'nombre:Matias,edad:25,ciudad:BsAs'
//    Usando solo métodos de string (.indexOf() y .slice()), extraé e
//    imprimí el valor del nombre: lo que está entre 'nombre:' y la coma.
//    Resultado esperado: "Matias"
// Tu código acá:

let name = data.indexOf(':')
let coma = data.indexOf(',')
let nameCutted = data.slice(name + 1, coma)
console.log(nameCutted);

